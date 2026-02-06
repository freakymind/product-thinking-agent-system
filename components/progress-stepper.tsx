'use client'

import React from "react"

import { cn } from '@/lib/utils'
import type { StageId } from '@/lib/types'
import { STAGES } from '@/lib/types'
import { Check, Compass, Ear, Frame, Users, ShieldCheck, Lightbulb, Database, Puzzle, Trophy, Bot, Zap, CheckCircle2 } from 'lucide-react'

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
const COLOR_MAP: Record<string, { bg: string; text: string; activeBg: string }> = {
  slate: { bg: 'bg-slate-500/20', text: 'text-slate-300', activeBg: 'bg-slate-500' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', activeBg: 'bg-violet-500' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', activeBg: 'bg-blue-500' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', activeBg: 'bg-teal-500' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', activeBg: 'bg-amber-500' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', activeBg: 'bg-pink-500' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', activeBg: 'bg-cyan-500' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', activeBg: 'bg-emerald-500' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', activeBg: 'bg-orange-500' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', activeBg: 'bg-purple-500' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400', activeBg: 'bg-green-500' },
}

interface ProgressStepperProps {
  currentStage: StageId
  completedStages: StageId[]
  onStageClick?: (stage: StageId) => void
}

export function ProgressStepper({ currentStage, completedStages, onStageClick }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {STAGES.map((stage, index) => {
        const isCompleted = completedStages.includes(stage.id)
        const isCurrent = currentStage === stage.id
        const isClickable = isCompleted || isCurrent || completedStages.length >= index
        const IconComponent = ICON_MAP[stage.icon] || Bot
        const colors = COLOR_MAP[stage.color] || COLOR_MAP.violet
        
        return (
          <div key={stage.id} className="flex items-center">
            <button
              onClick={() => isClickable && onStageClick?.(stage.id)}
              disabled={!isClickable}
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all',
                isCompleted && `${colors.activeBg} text-white`,
                isCurrent && !isCompleted && `${colors.bg} ${colors.text} ring-2 ring-current`,
                !isCompleted && !isCurrent && 'bg-secondary text-muted-foreground',
                isClickable && 'cursor-pointer hover:scale-110',
                !isClickable && 'cursor-not-allowed opacity-50'
              )}
              title={`${stage.agentName} - ${stage.name}`}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : <IconComponent className="h-4 w-4" />}
            </button>
            {index < STAGES.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-3 md:w-6',
                  isCompleted ? colors.activeBg : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
