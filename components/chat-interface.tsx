'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { StageId } from '@/lib/types'
import { STAGES } from '@/lib/types'
import { useSessionStore } from '@/lib/session-store'
import { Send, Loader2, Sparkles, User, Compass, Ear, Frame, Users, ShieldCheck, Lightbulb, Database, Puzzle, Trophy, Bot, Zap, CheckCircle2 } from 'lucide-react'
import { StageIntro } from '@/components/stage-intro'
import { PreviousContextSummary } from '@/components/previous-context-summary'

// Map icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  ear: Ear,
  frame: Frame,
  users: Users,
  'shield-check': ShieldCheck,
  lightbulb: Lightbulb,
  database: Database,
  puzzle: Puzzle,
  trophy: Trophy,
  zap: Zap,
  'check-circle': CheckCircle2,
}

// Map color names to Tailwind classes
const COLOR_MAP: Record<string, { bg: string; text: string; border?: string }> = {
  slate: { bg: 'bg-slate-500/20', text: 'text-slate-300' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/20' },
}

interface ChatInterfaceProps {
  stageId: StageId
  artifacts: Record<string, unknown>
  onArtifactGenerated: (artifact: unknown) => void
}

import type { UIMessage } from 'ai'

// Minimum user responses required before allowing artifact generation
// Each agent requires meaningful conversation - users can't just skip through
const MIN_EXCHANGES_REQUIRED = 5 // Increased from 3 to ensure proper engagement
const MIN_USER_CHARS_REQUIRED = 200 // Increased from 100 to ensure detailed answers

export function ChatInterface({ stageId, artifacts, onArtifactGenerated }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [isGeneratingArtifact, setIsGeneratingArtifact] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Track if conversation has started
  const [hasStarted, setHasStarted] = useState(false)
  
  // Get agent info for this stage
  const stage = STAGES.find(s => s.id === stageId)
  const stageIndex = STAGES.findIndex(s => s.id === stageId)
  const IconComponent = stage ? (ICON_MAP[stage.icon] || Bot) : Bot
  const colors = stage ? (COLOR_MAP[stage.color] || COLOR_MAP.violet) : COLOR_MAP.violet
  
  // Check if THIS stage already has an artifact (user completed it before)
  const hasExistingArtifact = Boolean(artifacts[stageId])
  
  // Check if previous required stages have artifacts
  const previousStages = STAGES.slice(0, stageIndex)
  const missingPreviousArtifacts = previousStages.filter(s => !artifacts[s.id])
  const hasPreviousContext = stageIndex === 0 || missingPreviousArtifacts.length === 0
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat/${stageId}`,
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          artifacts,
          generateArtifact: false,
        },
      }),
    }),
    onError: (err) => {
      console.error('Chat error:', err)
      setError('Failed to connect. Please try again.')
    },
  })

  const isLoading = status === 'streaming' || status === 'submitted'
  const hasError = status === 'error' || error !== null
  
  // Count user messages and characters (excluding trigger messages)
  const userMessages = messages.filter(m => {
    if (m.role !== 'user') return false
    const text = m.parts.find(p => p.type === 'text')?.text || ''
    // Exclude trigger messages that just start the conversation
    return text !== 'Begin' && text !== 'Let me try again' && !text.startsWith('Hello ')
  })
  const userMessageCount = userMessages.length
  const totalUserChars = userMessages.reduce((total, m) => {
    return total + m.parts.reduce((partTotal, p) => {
      if (p.type === 'text') return partTotal + p.text.length
      return partTotal
    }, 0)
  }, 0)
  
  // Check if user has provided enough meaningful input for artifact generation
  const canGenerateArtifact = hasStarted && userMessageCount >= MIN_EXCHANGES_REQUIRED && totalUserChars >= MIN_USER_CHARS_REQUIRED
  
  // Effective message count and character count
  const effectiveMessageCount = userMessageCount
  const effectiveCharCount = totalUserChars
  const hasEnoughExchanges = effectiveMessageCount >= MIN_EXCHANGES_REQUIRED
  
  // Auto-start conversation when component loads
  useEffect(() => {
    if (!hasStarted && !hasExistingArtifact) {
      // Small delay to allow UI to render
      const timer = setTimeout(() => {
        setError(null)
        setHasStarted(true)
        // Trigger agent to start with context review and first question
        sendMessage({ text: 'Begin' })
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [hasStarted, hasExistingArtifact, stageId, sendMessage])
  
  // Retry after error
  const handleRetry = () => {
    setError(null)
    sendMessage({ text: 'Let me try again' })
  }

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleGenerateArtifact = async () => {
    if (!hasStarted) {
      alert(`Please start a conversation with ${stage?.agentName} first.`)
      return
    }
    if (effectiveMessageCount < MIN_EXCHANGES_REQUIRED) {
      alert(`Please answer at least ${MIN_EXCHANGES_REQUIRED} questions from ${stage?.agentName} before generating the artifact.`)
      return
    }
    if (effectiveCharCount < MIN_USER_CHARS_REQUIRED) {
      alert(`Please provide more detailed responses. You've written ${effectiveCharCount} characters but need at least ${MIN_USER_CHARS_REQUIRED} to generate a quality artifact.`)
      return
    }
    
    setIsGeneratingArtifact(true)
    try {
      const response = await fetch(`/api/chat/${stageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          artifacts,
          generateArtifact: true,
        }),
      })
      
      if (!response.ok) throw new Error('Failed to generate artifact')
      
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')
      
      const decoder = new TextDecoder()
      let fullContent = ''
      let jsonContent = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += decoder.decode(value, { stream: true })
      }
      
      // Parse the SSE stream - accumulate text-delta chunks to build JSON
      const lines = fullContent.split('\n')
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim()
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            
            // Accumulate text deltas - this is how structured output is streamed
            if (parsed.type === 'text-delta' && parsed.delta) {
              jsonContent += parsed.delta
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
      
      // Parse the accumulated JSON content
      if (jsonContent) {
        try {
          const artifact = JSON.parse(jsonContent)
          onArtifactGenerated(artifact)
          return
        } catch (e) {
          console.error('Failed to parse artifact JSON:', e)
        }
      }
      
      alert('Failed to extract artifact from response. Please try again.')
    } catch (error) {
      console.error('[v0] Error generating artifact:', error)
      alert('Failed to generate artifact. Please try again.')
    } finally {
      setIsGeneratingArtifact(false)
    }
  }

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Compact Agent Header */}
        <div className="border-b border-border bg-card/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', colors.bg)}>
              <IconComponent className={cn('h-5 w-5', colors.text)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={cn('font-bold', colors.text)}>{stage?.agentName}</span>
                <span className="text-xs text-muted-foreground">· {stage?.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{stage?.description}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
        
        {messages
          .filter((m, i) => !(i === 0 && m.role === 'user' && m.parts.some(p => p.type === 'text' && p.text === 'Start coaching session')))
          .map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-2.5 items-end',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', colors.bg)}>
                <IconComponent className={cn('h-4 w-4', colors.text)} />
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted/50 text-foreground rounded-bl-sm'
              )}
            >
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return (
                    <div key={index} className="text-sm whitespace-pre-wrap leading-relaxed">
                      {part.text}
                    </div>
                  )
                }
                return null
              })}
            </div>
            {message.role === 'user' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-2.5 items-end">
            <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', colors.bg)}>
              <IconComponent className={cn('h-4 w-4 animate-pulse', colors.text)} />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stage?.agentName} is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
        
        {/* Error display */}
        {hasError && (
          <div className="mx-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <p className="text-xs text-destructive mb-2 text-center">{error || 'Connection failed'}</p>
            <Button size="sm" variant="outline" onClick={handleRetry} className="w-full bg-transparent">
              Retry
            </Button>
          </div>
        )}
      </div>

      {/* Generate Artifact Button - Only show after user has started conversation with THIS agent */}
      {hasStarted && effectiveMessageCount > 0 && (
        <div className="px-3 pb-3 pt-2">
          <Button
            variant={canGenerateArtifact ? "default" : "outline"}
            className={cn("w-full", !canGenerateArtifact && "bg-transparent")}
            onClick={handleGenerateArtifact}
            disabled={isGeneratingArtifact || isLoading || !canGenerateArtifact}
            size="sm"
          >
            {isGeneratingArtifact ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                Generating...
              </>
            ) : canGenerateArtifact ? (
              <>
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Generate Output
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 mr-2 opacity-50" />
                {!hasEnoughExchanges 
                  ? `${MIN_EXCHANGES_REQUIRED - effectiveMessageCount} more answer${MIN_EXCHANGES_REQUIRED - effectiveMessageCount !== 1 ? 's' : ''} needed`
                  : `${effectiveCharCount}/${MIN_USER_CHARS_REQUIRED} characters`
                }
              </>
            )}
          </Button>
        </div>
      )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-card/30">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Chat with ${stage?.agentName}...`}
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-shadow"
                disabled={isLoading || !hasStarted}
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              className="h-10 w-10 rounded-xl shrink-0" 
              disabled={!input.trim() || isLoading || !hasStarted}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Progress indicator */}
          {hasStarted && effectiveMessageCount > 0 && (
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {effectiveMessageCount}/{MIN_EXCHANGES_REQUIRED} responses · {effectiveCharCount}/{MIN_USER_CHARS_REQUIRED} chars
              </span>
              {canGenerateArtifact && (
                <span className={cn('font-medium', colors.text)}>Ready to generate ✓</span>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Right Sidebar - Agent Info & Context */}
      <div className="w-80 border-l border-border bg-card/20 flex flex-col overflow-hidden">
        {/* Agent Details */}
        <div className="p-4 border-b border-border bg-card/50">
          <div className="flex items-start gap-3 mb-3">
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset', colors.bg, colors.text)}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className={cn('font-bold text-sm', colors.text)}>{stage?.agentName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{stage?.intro}</p>
            </div>
          </div>
          
          {/* Output expectation */}
          <div className={cn('px-3 py-2 rounded-lg border text-xs', colors.border, colors.bg)}>
            <div className="flex items-start gap-2">
              <Sparkles className={cn('h-3.5 w-3.5 shrink-0 mt-0.5', colors.text)} />
              <div>
                <span className="font-medium text-foreground">Output: </span>
                <span className="text-muted-foreground">{stage?.deliverable}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Context */}
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-xs font-semibold text-foreground mb-3">Previous Agents</h4>
          
          {previousStages.filter(s => artifacts[s.id]).length === 0 ? (
            <p className="text-xs text-muted-foreground">No previous agents completed yet.</p>
          ) : (
            <div className="space-y-2">
              {previousStages.filter(s => artifacts[s.id]).map((prevStage) => {
                const prevArtifact = artifacts[prevStage.id]
                const prevColors = COLOR_MAP[prevStage.color] || COLOR_MAP.violet
                const PrevIcon = ICON_MAP[prevStage.icon] || Bot
                
                return (
                  <div key={prevStage.id} className="p-3 rounded-lg border border-border bg-background/50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={cn('h-6 w-6 rounded-md flex items-center justify-center', prevColors.bg)}>
                        <PrevIcon className={cn('h-3.5 w-3.5', prevColors.text)} />
                      </div>
                      <span className="text-xs font-semibold">{prevStage.agentName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {formatArtifactSummary(prevStage.id, prevArtifact)}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
          
          {/* Warnings */}
          {!hasPreviousContext && missingPreviousArtifacts.length > 0 && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-400 font-semibold mb-1">⚠️ Missing Context</p>
              <p className="text-xs text-muted-foreground">
                Complete {missingPreviousArtifacts.map(s => s.agentName).join(', ')} first.
              </p>
            </div>
          )}
          
          {hasExistingArtifact && !hasStarted && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 font-semibold mb-1">✓ Already Complete</p>
              <p className="text-xs text-muted-foreground">
                Start a new conversation to regenerate.
              </p>
            </div>
          )}
        </div>

        {/* Generate Button in Sidebar */}
        {hasStarted && effectiveMessageCount > 0 && (
          <div className="p-3 border-t border-border bg-card/50">
            <Button
              variant={canGenerateArtifact ? "default" : "outline"}
              className={cn("w-full", !canGenerateArtifact && "bg-transparent")}
              onClick={handleGenerateArtifact}
              disabled={isGeneratingArtifact || isLoading || !canGenerateArtifact}
              size="sm"
            >
              {isGeneratingArtifact ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : canGenerateArtifact ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  Generate Output
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-2 opacity-50" />
                  {!hasEnoughExchanges 
                    ? `${MIN_EXCHANGES_REQUIRED - effectiveMessageCount} more needed`
                    : `${effectiveCharCount}/${MIN_USER_CHARS_REQUIRED} chars`
                  }
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to safely convert any value to string
function safeString(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'object') {
    // For objects, try to extract a meaningful string
    const obj = value as any
    if (obj.name) return String(obj.name)
    if (obj.title) return String(obj.title)
    if (obj.description) return String(obj.description)
    return JSON.stringify(value)
  }
  return String(value)
}

// Helper function to format artifact summaries
function formatArtifactSummary(stageId: StageId, artifact: unknown): string {
  if (!artifact || typeof artifact !== 'object') return 'No output available'
  
  try {
    const data = artifact as any
    
    switch (stageId) {
      case 'context':
        return `Building ${safeString(data.project_name) || 'project'} for ${safeString(data.target_customer) || 'users'} in ${safeString(data.industry) || 'industry'}`
      
      case 'intake':
        const signalCount = Array.isArray(data.raw_signals) ? data.raw_signals.length : 0
        return `Captured ${signalCount} user signal${signalCount !== 1 ? 's' : ''} about pain points`
      
      case 'problemFraming':
        return safeString(data.problem_statement) || 'Problem statement defined'
      
      case 'userJTBD':
        return `Job: ${safeString(data.job_statement) || 'Job to be done identified'}`
      
      case 'problemValidation':
        return `${safeString(data.recommendation) || 'Validated'} - ${safeString(data.severity) || ''} severity`
      
      case 'solutionShaping':
        return `Approach: ${safeString(data.recommended_solution) || 'Solution defined'}`
      
      case 'dataSchema':
        const entityCount = Array.isArray(data.entities) ? data.entities.length : 0
        return `${entityCount} data entit${entityCount !== 1 ? 'ies' : 'y'} defined`
      
      case 'featureDefinition':
        const featureCount = Array.isArray(data.features) ? data.features.length : 0
        return `${featureCount} feature${featureCount !== 1 ? 's' : ''} defined`
      
      case 'prioritization':
        const topFeature = data.prioritized_features?.[0]?.feature_name
        return topFeature ? `Top: ${safeString(topFeature)}` : 'Features prioritized'
      
      case 'aiStrategy':
        const opportunityCount = Array.isArray(data.ai_opportunities) ? data.ai_opportunities.length : 0
        return `${opportunityCount} AI opportunit${opportunityCount !== 1 ? 'ies' : 'y'} identified`
      
      default:
        return 'Output generated'
    }
  } catch (error) {
    console.error('Error formatting artifact summary:', error)
    return 'Output available'
  }
}
