'use client'

import React from "react"

import { cn } from '@/lib/utils'
import type { StageId } from '@/lib/types'
import { STAGES } from '@/lib/types'
import { CheckCircle2, ArrowRight, Lock, Compass, Ear, Frame, Users, ShieldCheck, Lightbulb, Database, Puzzle, Trophy, Bot, Zap } from 'lucide-react'

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
const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  slate: { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/40', glow: 'shadow-slate-500/20' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', glow: 'shadow-violet-500/20' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30', glow: 'shadow-teal-500/20' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20' },
}

interface StageCardProps {
  stageId: StageId
  currentStage: StageId
  completedStages: StageId[]
  artifacts: Record<string, unknown>
  onSelect: (stage: StageId) => void
}

export function StageCard({ stageId, currentStage, completedStages, artifacts, onSelect }: StageCardProps) {
  const stage = STAGES.find(s => s.id === stageId)
  if (!stage) return null
  
  const hasArtifact = artifacts[stageId] !== undefined
  const isCompleted = completedStages.includes(stageId) || hasArtifact
  const isCurrent = currentStage === stageId
  const stageIndex = STAGES.findIndex(s => s.id === stageId)
  
  // A stage is locked if:
  // 1. It's not the first stage AND
  // 2. The previous stage doesn't have an artifact
  const prevStageId = stageIndex > 0 ? STAGES[stageIndex - 1].id : null
  const prevHasArtifact = prevStageId ? artifacts[prevStageId] !== undefined : true
  const isLocked = stageIndex > 0 && !prevHasArtifact && !hasArtifact
  
  const IconComponent = ICON_MAP[stage.icon] || Bot
  const colors = COLOR_MAP[stage.color] || COLOR_MAP.violet
  
  const handleClick = () => {
    if (!isLocked) {
      onSelect(stageId)
    }
  }
  
  return (
    <button
      onClick={handleClick}
      disabled={isLocked}
      className={cn(
        'group relative flex flex-col items-start gap-4 rounded-xl border p-5 text-left transition-all',
        isCurrent && `${colors.border} bg-card ring-1 ring-primary/20 shadow-lg ${colors.glow}`,
        isCompleted && !isCurrent && 'border-border/50 bg-card/80 hover:border-primary/30',
        !isCompleted && !isCurrent && !isLocked && 'border-border bg-card hover:border-primary/20 hover:bg-card/80',
        isLocked && 'cursor-not-allowed border-border/30 bg-muted/20 opacity-50'
      )}
    >
      {/* Agent Avatar */}
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'relative flex h-12 w-12 items-center justify-center rounded-xl transition-all',
              colors.bg,
              isCurrent && 'shadow-lg'
            )}
          >
            <IconComponent className={cn('h-6 w-6', colors.text)} />
            {isCurrent && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', colors.bg)} />
                <span className={cn('relative inline-flex h-3 w-3 rounded-full', colors.bg)} />
              </span>
            )}
            {isCompleted && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </span>
            )}
            {isLocked && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                <Lock className="h-3 w-3 text-muted-foreground" />
              </span>
            )}
          </div>
          <div>
            <p className={cn('text-xs font-medium uppercase tracking-wider', colors.text)}>
              {stage.agentName}
            </p>
            <h3 className="font-semibold text-card-foreground">{stage.name}</h3>
          </div>
        </div>
        {isCurrent && (
          <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
        )}
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
      
      {/* Status indicator */}
      <div className="flex w-full items-center justify-between pt-2 border-t border-border/50">
        <span className={cn(
          'text-xs font-medium',
          isCompleted && 'text-emerald-400',
          isCurrent && colors.text,
          !isCompleted && !isCurrent && 'text-muted-foreground'
        )}>
          {isCompleted ? 'Completed' : isCurrent ? 'Active' : isLocked ? 'Locked' : 'Ready'}
        </span>
        <span className="text-xs text-muted-foreground">
          Agent {stageIndex + 1}/10
        </span>
      </div>
    </button>
  )
}
