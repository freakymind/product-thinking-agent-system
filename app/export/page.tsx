'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { Button } from '@/components/ui/button'
import { STAGES } from '@/lib/types'
import { Download, Copy, Check, ArrowLeft, FileText, Home } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function ExportPage() {
  const router = useRouter()
  const { session } = useSessionStore()
  const [copied, setCopied] = useState(false)
  const [prdContent, setPrdContent] = useState('')
  
  useEffect(() => {
    if (!session) {
      router.push('/')
      return
    }
    
    // Check if ATLAS is complete (mandatory)
    if (!session.artifacts['context']) {
      router.push('/progress')
      return
    }
    
    // Generate PRD content from whatever agents are completed
    const content = generatePRD(session.artifacts)
    setPrdContent(content)
  }, [session, router])
  
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(prdContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handleDownload = () => {
    const blob = new Blob([prdContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product-requirements.md'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(session?.artifacts, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product-requirements.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  if (!session) return null
  
  const completedCount = session.completedStages.length
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <Home className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Export PRD</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/progress')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Progress
            </Button>
            <Button variant="outline" onClick={handleCopyMarkdown}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy Markdown
            </Button>
            <Button variant="outline" onClick={handleDownloadJSON}>
              <Download className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PRD
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground mb-1">Stages Completed</p>
            <p className="text-2xl font-bold text-foreground">{completedCount} / {STAGES.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground mb-1">Artifacts Generated</p>
            <p className="text-2xl font-bold text-foreground">{Object.keys(session.artifacts).length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
            <p className="text-2xl font-bold text-foreground">
              {new Date(session.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Info about regeneration */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Based on {completedCount} completed agent{completedCount !== 1 ? 's' : ''}:</strong> {Object.keys(session.artifacts).map(id => STAGES.find(s => s.id === id)?.agentName).filter(Boolean).join(', ')}
          </p>
          {completedCount < STAGES.length && (
            <p className="text-xs text-muted-foreground">
              You can talk to more agents and regenerate this document anytime to include additional insights.
            </p>
          )}
        </div>

        {/* PRD Preview */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-3 bg-secondary/30">
            <h2 className="font-semibold text-foreground">Product Requirements Document</h2>
          </div>
          <div className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-xs bg-secondary/30 rounded-lg p-4 overflow-x-auto">
                {prdContent}
              </pre>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  )
}

function generatePRD(artifacts: Record<string, unknown>): string {
  const sections: string[] = []
  
  sections.push('# Product Requirements Document')
  sections.push(`\nGenerated: ${new Date().toLocaleDateString()}`)
  sections.push('\n---\n')
  
  // 0. Project Context (ATLAS)
  if (artifacts.context) {
    const context = artifacts.context as Record<string, unknown>
    sections.push('## Project Context\n')
    if (context.project_name) sections.push(`**Project:** ${context.project_name}`)
    if (context.description) sections.push(`**Description:** ${context.description}`)
    if (context.industry) sections.push(`**Industry:** ${context.industry}`)
    if (context.target_customer) sections.push(`**Target Customer:** ${context.target_customer}`)
    
    if (Array.isArray(context.business_goals)) {
      sections.push('\n**Business Goals:**')
      context.business_goals.forEach((goal: string) => sections.push(`- ${goal}`))
    }
    
    if (context.constraints) {
      const constraints = context.constraints as Record<string, string>
      sections.push('\n**Constraints:**')
      if (constraints.budget) sections.push(`- Budget: ${constraints.budget}`)
      if (constraints.timeline) sections.push(`- Timeline: ${constraints.timeline}`)
      if (constraints.technical) sections.push(`- Technical: ${constraints.technical}`)
      if (constraints.regulatory) sections.push(`- Regulatory: ${constraints.regulatory}`)
    }
    
    if (Array.isArray(context.competitors)) {
      sections.push('\n**Competitors:**')
      context.competitors.forEach((comp: Record<string, string>) => {
        sections.push(`- ${comp.name}: ${comp.strengths} / ${comp.weaknesses}`)
      })
    }
    sections.push('\n---\n')
  }
  
  // 1. Raw Signals (Intake)
  if (artifacts.intake) {
    const intake = artifacts.intake as Record<string, unknown>
    sections.push('## 1. Raw Signals\n')
    if (Array.isArray(intake.raw_signals)) {
      intake.raw_signals.forEach((signal: Record<string, unknown>, i: number) => {
        sections.push(`### Signal ${i + 1}\n`)
        if (signal.source) sections.push(`- **Source:** ${signal.source}`)
        if (signal.observation) sections.push(`- **Observation:** ${signal.observation}`)
        if (signal.frequency) sections.push(`- **Frequency:** ${signal.frequency}`)
        if (signal.workaround) sections.push(`- **Workaround:** ${signal.workaround}`)
        sections.push('\n')
      })
    }
  }
  
  // 2. Problem Statement (Problem Framing)
  if (artifacts.problemFraming) {
    const framing = artifacts.problemFraming as Record<string, unknown>
    sections.push('\n## 2. Problem Statement\n')
    const ps = framing.problem_statement as Record<string, unknown>
    if (ps) {
      if (ps.who) sections.push(`- **Who:** ${ps.who}`)
      if (ps.context) sections.push(`- **Context:** ${ps.context}`)
      if (ps.pain) sections.push(`- **Pain:** ${ps.pain}`)
      if (ps.impact) {
        const impact = ps.impact as Record<string, string>
        sections.push('\n**Impact:**')
        if (impact.time_lost) sections.push(`  - Time Lost: ${impact.time_lost}`)
        if (impact.error_rate) sections.push(`  - Error Rate: ${impact.error_rate}`)
        if (impact.cost) sections.push(`  - Cost: ${impact.cost}`)
        if (impact.other) sections.push(`  - Other: ${impact.other}`)
      }
    }
    sections.push('\n')
  }
  
  // 3. User & JTBD
  if (artifacts.userJTBD) {
    const research = artifacts.userJTBD as Record<string, unknown>
    sections.push('\n## 3. User & Jobs-to-be-Done\n')
    
    if (research.persona) {
      const p = research.persona as Record<string, unknown>
      sections.push('### Persona\n')
      if (p.role) sections.push(`**Role:** ${p.role}\n`)
      if (Array.isArray(p.constraints)) {
        sections.push('**Constraints:**')
        p.constraints.forEach((c: string) => sections.push(`- ${c}`))
      }
      sections.push('\n')
    }
    
    if (research.jtbd) {
      const jtbd = research.jtbd as Record<string, unknown>
      sections.push('### Job-to-be-Done\n')
      if (jtbd.job) sections.push(`**Job:** ${jtbd.job}\n`)
      if (Array.isArray(jtbd.success_metrics)) {
        sections.push('**Success Metrics:**')
        jtbd.success_metrics.forEach((m: string) => sections.push(`- ${m}`))
      }
      sections.push('\n')
    }
  }
  
  // 4. Problem Validation
  if (artifacts.problemValidation) {
    const validation = artifacts.problemValidation as Record<string, unknown>
    sections.push('\n## 4. Problem Validation\n')
    
    const pv = validation.problem_validation as Record<string, unknown>
    if (pv) {
      if (pv.frequency) sections.push(`- **Frequency:** ${pv.frequency}`)
      if (pv.severity) sections.push(`- **Severity:** ${pv.severity}`)
      if (pv.must_have !== undefined) sections.push(`- **Must Have:** ${pv.must_have ? 'Yes' : 'No'}`)
      if (Array.isArray(pv.alternatives)) {
        sections.push('\n**Alternatives:**')
        pv.alternatives.forEach((a: string) => sections.push(`- ${a}`))
      }
    }
    
    if (validation.recommendation) sections.push(`\n**Recommendation:** ${validation.recommendation}`)
    if (validation.reasoning) sections.push(`\n**Reasoning:** ${validation.reasoning}`)
    sections.push('\n')
  }
  
  // 5. Solution Options
  if (artifacts.solutionShaping) {
    const solution = artifacts.solutionShaping as Record<string, unknown>
    sections.push('\n## 5. Solution Options\n')
    
    if (Array.isArray(solution.solution_options)) {
      solution.solution_options.forEach((opt: Record<string, unknown>) => {
        sections.push(`### ${opt.name}\n`)
        if (Array.isArray(opt.assumptions)) {
          sections.push('**Assumptions:**')
          opt.assumptions.forEach((a: string) => sections.push(`- ${a}`))
        }
        if (Array.isArray(opt.pros)) {
          sections.push('\n**Pros:**')
          opt.pros.forEach((p: string) => sections.push(`- ${p}`))
        }
        if (Array.isArray(opt.cons)) {
          sections.push('\n**Cons:**')
          opt.cons.forEach((c: string) => sections.push(`- ${c}`))
        }
        sections.push('\n')
      })
    }
    
    if (solution.recommended_option) sections.push(`**Recommended:** ${solution.recommended_option}`)
    if (solution.reasoning) sections.push(`\n**Reasoning:** ${solution.reasoning}`)
    sections.push('\n')
  }
  
  // 6. Data Schema
  if (artifacts.dataSchema) {
    const schema = artifacts.dataSchema as Record<string, unknown>
    sections.push('\n## 6. Data Model & Configuration\n')
    
    if (Array.isArray(schema.data_schema)) {
      sections.push('### Entities\n')
      schema.data_schema.forEach((entity: Record<string, unknown>) => {
        sections.push(`#### ${entity.name}\n`)
        if (Array.isArray(entity.fields)) {
          sections.push('| Field | Type |')
          sections.push('|-------|------|')
          entity.fields.forEach((f: Record<string, unknown>) => {
            sections.push(`| ${f.name} | ${f.type} |`)
          })
        }
        sections.push('\n')
      })
    }
    
    if (schema.configurations) {
      const config = schema.configurations as Record<string, string[]>
      sections.push('### Configurations\n')
      if (Array.isArray(config.user_configurable)) {
        sections.push('**User Configurable:**')
        config.user_configurable.forEach((c: string) => sections.push(`- ${c}`))
      }
      if (Array.isArray(config.system_configurable)) {
        sections.push('\n**System Configurable:**')
        config.system_configurable.forEach((c: string) => sections.push(`- ${c}`))
      }
      sections.push('\n')
    }
    
    if (Array.isArray(schema.sample_data)) {
      sections.push('\n### Sample Data\n')
      schema.sample_data.forEach((entry: Record<string, unknown>) => {
        sections.push(`#### ${entry.entity_name}\n`)
        if (Array.isArray(entry.sample_values)) {
          entry.sample_values.forEach((sv: Record<string, string>) => {
            sections.push(`- **${sv.field_name}:** ${sv.value}`)
          })
        }
        sections.push('\n')
      })
    }
  }
  
  // 7. Features
  if (artifacts.featureDefinition) {
    const features = artifacts.featureDefinition as Record<string, unknown>
    sections.push('\n## 7. Features\n')
    
    if (Array.isArray(features.features)) {
      features.features.forEach((f: Record<string, unknown>) => {
        sections.push(`### ${f.name}\n`)
        if (f.user_value) sections.push(`**User Value:** ${f.user_value}\n`)
        if (Array.isArray(f.acceptance_criteria)) {
          sections.push('**Acceptance Criteria:**')
          f.acceptance_criteria.forEach((ac: string) => sections.push(`- [ ] ${ac}`))
        }
        if (Array.isArray(f.dependencies) && f.dependencies.length > 0) {
          sections.push('\n**Dependencies:**')
          f.dependencies.forEach((d: string) => sections.push(`- ${d}`))
        }
        sections.push('\n')
      })
    }
  }
  
  // 8. Prioritization
  if (artifacts.prioritization) {
    const priority = artifacts.prioritization as Record<string, unknown>
    sections.push('\n## 8. Prioritization (RICE)\n')
    
    if (priority.framework) sections.push(`**Framework:** ${priority.framework}\n`)
    
    if (Array.isArray(priority.ranked_features)) {
      sections.push('| Rank | Feature | Score |')
      sections.push('|------|---------|-------|')
      priority.ranked_features.forEach((f: Record<string, unknown>, i: number) => {
        sections.push(`| ${i + 1} | ${f.name} | ${f.score} |`)
      })
      sections.push('\n')
    }
  }
  
  // 9. AI Strategy
  if (artifacts.aiStrategy) {
    const aiStrat = artifacts.aiStrategy as Record<string, unknown>
    sections.push('\n## 9. AI Strategy\n')
    
    if (aiStrat.overall_ai_strategy) {
      sections.push(`**Strategy:** ${aiStrat.overall_ai_strategy}\n`)
    }
    
    if (Array.isArray(aiStrat.ai_opportunities)) {
      sections.push('\n### AI Opportunities\n')
      aiStrat.ai_opportunities.forEach((opp: Record<string, unknown>) => {
        sections.push(`#### ${opp.feature_area}\n`)
        if (opp.ai_capability) sections.push(`**AI Capability:** ${opp.ai_capability}`)
        if (opp.use_case) sections.push(`**Use Case:** ${opp.use_case}\n`)
        
        if (Array.isArray(opp.recommended_models)) {
          sections.push('**Recommended Models:**')
          opp.recommended_models.forEach((model: Record<string, unknown>) => {
            sections.push(`- **${model.model_type}:** ${model.specific_model}`)
            if (model.rationale) sections.push(`  - ${model.rationale}`)
          })
        }
        
        if (opp.implementation_approach) sections.push(`\n**Implementation:** ${opp.implementation_approach}`)
        
        if (Array.isArray(opp.data_requirements) && opp.data_requirements.length > 0) {
          sections.push('\n**Data Requirements:**')
          opp.data_requirements.forEach((req: string) => sections.push(`- ${req}`))
        }
        
        if (opp.estimated_impact) sections.push(`\n**Expected Impact:** ${opp.estimated_impact}`)
        sections.push('\n')
      })
    }
    
    if (Array.isArray(aiStrat.priority_recommendations)) {
      sections.push('### Priority AI Recommendations\n')
      aiStrat.priority_recommendations.forEach((rec: string, i: number) => {
        sections.push(`${i + 1}. ${rec}`)
      })
    }
  }
  
  return sections.join('\n')
}
