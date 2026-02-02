import { streamText, convertToModelMessages, Output } from 'ai'
import { PRIMARY_MODEL as MODEL, TEMPERATURE, MAX_TOKENS } from '@/lib/ai-config'
import { AGENT_PROMPTS, BASE_SYSTEM_PROMPT } from '@/lib/agent-prompts'
import type { StageId } from '@/lib/types'
import {
  ProjectContextSchema,
  RawSignalsSchema,
  ProblemFrameSchema,
  UserResearchSchema,
  ProblemValidationSchema,
  SolutionShapingSchema,
  DataSchemaOutputSchema,
  FeatureDefinitionSchema,
  PrioritizationSchema,
  AIStrategySchema,
} from '@/lib/types'

// Map stages to their Zod schemas
const STAGE_SCHEMAS = {
  context: ProjectContextSchema,
  intake: RawSignalsSchema,
  problemFraming: ProblemFrameSchema,
  userJTBD: UserResearchSchema,
  problemValidation: ProblemValidationSchema,
  solutionShaping: SolutionShapingSchema,
  dataSchema: DataSchemaOutputSchema,
  featureDefinition: FeatureDefinitionSchema,
  prioritization: PrioritizationSchema,
  aiStrategy: AIStrategySchema,
} as const

export async function POST(
  request: Request,
  { params }: { params: Promise<{ stage: string }> }
) {
  try {
    const { stage } = await params
    const { messages, artifacts, generateArtifact, allMessages } = await request.json()

    // Validate stage
    if (!AGENT_PROMPTS[stage as StageId]) {
      return new Response(JSON.stringify({ error: 'Invalid stage' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const stageId = stage as StageId
    const agentPrompt = AGENT_PROMPTS[stageId]
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n${agentPrompt}`

    // Build context from previous artifacts with agent names
    const AGENT_NAMES: Record<string, string> = {
      context: 'ATLAS (Project Context)',
      intake: 'IRIS (Signal Collector)',
      problemFraming: 'CLARA (Problem Architect)',
      userJTBD: 'MAYA (User Analyst)',
      problemValidation: 'VANCE (Critical Evaluator)',
      solutionShaping: 'NOVA (Solution Explorer)',
      dataSchema: 'AXON (Data Architect)',
      featureDefinition: 'FLUX (Feature Designer)',
      prioritization: 'PRIME (Priority Oracle)',
      aiStrategy: 'SAGE (AI Strategist)',
    }
    
    let contextPrompt = ''
    // ATLAS is the FIRST agent - it never gets context from previous agents
    if (stageId !== 'context' && (artifacts || allMessages)) {
      contextPrompt = '\n\n' + '='.repeat(70) + '\n'
      contextPrompt += '🔍 HANDOFF BRIEF - WHAT\'S BEEN DISCUSSED\n'
      contextPrompt += '='.repeat(70) + '\n\n'
      contextPrompt += 'You\'re joining an ongoing product discovery. Read what the user has already explained to other agents.\n'
      contextPrompt += 'Reference specific things they mentioned. Ask probing questions based on YOUR expertise.\n\n'
      
      // Include previous conversation history
      if (allMessages && typeof allMessages === 'object') {
        for (const [agentStage, msgs] of Object.entries(allMessages)) {
          if (agentStage === stageId || !msgs || !Array.isArray(msgs) || msgs.length === 0) continue
          
          const agentName = AGENT_NAMES[agentStage as string] || agentStage
          const userMessages = msgs.filter((m: any) => m.role === 'user')
          
          if (userMessages.length > 0) {
            contextPrompt += `━━━ Conversation with ${agentName} ━━━\n`
            contextPrompt += 'User explained:\n'
            userMessages.forEach((msg: any, idx: number) => {
              const text = msg.parts?.find((p: any) => p.type === 'text')?.text || ''
              if (text && text !== 'Begin' && text !== 'Let me try again') {
                contextPrompt += `${idx + 1}. "${text}"\n`
              }
            })
            contextPrompt += '\n'
          }
        }
      }
      
      // Include final artifacts
      if (artifacts && Object.keys(artifacts).length > 0) {
        contextPrompt += '━━━ Generated Artifacts ━━━\n'
        for (const [key, value] of Object.entries(artifacts)) {
          const agentName = AGENT_NAMES[key] || key
          contextPrompt += `\n${agentName} Output:\n`
          contextPrompt += `${JSON.stringify(value, null, 2)}\n`
        }
      }
      
      contextPrompt += '\n' + '='.repeat(70) + '\n'
      contextPrompt += '✅ END OF HANDOFF - Reference what they\'ve already told you, then ask YOUR questions\n'
      contextPrompt += '='.repeat(70) + '\n'
    }

    // If generating artifact, use structured output
    if (generateArtifact) {
      const result = streamText({
        model: MODEL,
        system: systemPrompt + contextPrompt + '\n\nNow generate the structured artifact based on our conversation.',
        messages: await convertToModelMessages(messages),
        output: Output.object({ schema: STAGE_SCHEMAS[stageId] }),
        temperature: TEMPERATURE.structured,
        maxOutputTokens: MAX_TOKENS.long,
      })

      return result.toUIMessageStreamResponse()
    }

    // Regular conversation
    const result = streamText({
      model: MODEL,
      system: systemPrompt + contextPrompt,
      messages: await convertToModelMessages(messages),
      temperature: TEMPERATURE.balanced,
      maxOutputTokens: MAX_TOKENS.medium,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
