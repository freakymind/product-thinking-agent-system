'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { STAGES, type StageId } from '@/lib/types'

interface PreviousContextSummaryProps {
  currentStageId: StageId
  artifacts: Record<string, unknown>
}

export function PreviousContextSummary({ currentStageId, artifacts }: PreviousContextSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const currentIndex = STAGES.findIndex(s => s.id === currentStageId)
  const previousStages = STAGES.slice(0, currentIndex)
  const completedPreviousStages = previousStages.filter(stage => artifacts[stage.id])
  
  if (completedPreviousStages.length === 0) {
    return null
  }

  const formatArtifactSummary = (stageId: StageId, artifact: unknown): string => {
    if (!artifact || typeof artifact !== 'object') return 'No output available'
    
    try {
      switch (stageId) {
        case 'context':
          const ctx = artifact as any
          return `Building ${ctx.project_name || 'project'} for ${ctx.target_market?.primary_audience || 'users'} in ${ctx.business_area?.industry || 'industry'}`
        
        case 'intake':
          const signals = artifact as any
          const signalCount = signals.raw_signals?.length || 0
          return `Captured ${signalCount} user signal${signalCount !== 1 ? 's' : ''} about pain points and problems`
        
        case 'problemFraming':
          const problem = artifact as any
          return problem.problem_statement?.pain || 'Problem statement defined'
        
        case 'userJTBD':
          const jtbd = artifact as any
          return `User job: ${jtbd.jtbd?.job || 'Job to be done identified'}`
        
        case 'problemValidation':
          const validation = artifact as any
          return `Recommendation: ${validation.recommendation || 'Unknown'} - ${validation.reasoning?.substring(0, 80) || ''}...`
        
        case 'solutionShaping':
          const solution = artifact as any
          return `Selected approach: ${solution.recommended_option || 'Solution approach defined'}`
        
        case 'dataSchema':
          const schema = artifact as any
          const entityCount = schema.data_schema?.length || 0
          return `Defined ${entityCount} data entit${entityCount !== 1 ? 'ies' : 'y'}`
        
        case 'featureDefinition':
          const features = artifact as any
          const featureCount = features.features?.length || 0
          return `Defined ${featureCount} feature${featureCount !== 1 ? 's' : ''}`
        
        case 'prioritization':
          const priority = artifact as any
          const topFeature = priority.ranked_features?.[0]?.name
          return topFeature ? `Top priority: ${topFeature}` : 'Features prioritized'
        
        default:
          return 'Output generated'
      }
    } catch {
      return 'Output available'
    }
  }

  return (
    <div className="mx-4 mt-3 mb-2">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 h-auto hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">
              Previous Work Summary ({completedPreviousStages.length} agent{completedPreviousStages.length !== 1 ? 's' : ''})
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
        
        {isExpanded && (
          <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
            {completedPreviousStages.map((stage) => {
              const artifact = artifacts[stage.id]
              const summary = formatArtifactSummary(stage.id, artifact)
              
              return (
                <div 
                  key={stage.id}
                  className="flex items-start gap-2 p-2 rounded-lg bg-muted/30"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">
                      {STAGES.findIndex(s => s.id === stage.id) + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">
                      {stage.agentName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {summary}
                    </p>
                  </div>
                </div>
              )
            })}
            <p className="text-[10px] text-muted-foreground text-center pt-1">
              This agent has reviewed all previous work and will reference it
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
