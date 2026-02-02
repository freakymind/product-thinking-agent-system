'use client'

import { cn } from "@/lib/utils"

import React from "react"

import { useState } from 'react'
import { STAGES, type StageId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Compass, Ear, Frame, Users, ShieldCheck, Database, Puzzle, Trophy, Bot, Zap, Play } from 'lucide-react'

// Map icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  ear: Ear,
  frame: Frame,
  users: Users,
  'shield-check': ShieldCheck,
  lightbulb: Database,
  database: Database,
  puzzle: Puzzle,
  trophy: Trophy,
}

// Map color names to Tailwind classes
const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  slate: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
}

interface StageIntroProps {
  stageId: StageId
  hasStarted: boolean
}

export function StageIntro({ stageId, hasStarted }: StageIntroProps) {
  const [isExpanded, setIsExpanded] = useState(!hasStarted)
  const stage = STAGES.find(s => s.id === stageId)
  
  if (!stage) return null
  
  const stageNumber = STAGES.findIndex(s => s.id === stageId) + 1
  const IconComponent = ICON_MAP[stage.icon] || Bot
  const colors = COLOR_MAP[stage.color] || COLOR_MAP.violet
  
  // Compact header when started and collapsed
  if (hasStarted && !isExpanded) {
    return (
      <div className="border-b border-border bg-card/30 px-4 py-2.5">
        <button 
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-between w-full group"
        >
          <div className="flex items-center gap-3">
            <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', colors.bg)}>
              <IconComponent className={cn('h-4 w-4', colors.text)} />
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-semibold', colors.text)}>{stage.agentName}</span>
              <span className="text-xs text-muted-foreground">· {stage.name}</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    )
  }
  
  // Full intro view
  return (
    <div className="border-b border-border bg-gradient-to-b from-card/50 to-transparent">
      <div className="px-4 py-4 space-y-4">
        
        {/* Collapsible header when started */}
        {hasStarted && (
          <button 
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-3 w-3" />
            Collapse
          </button>
        )}
        
        {/* Agent Header - Compact */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'relative flex h-10 w-10 items-center justify-center rounded-xl',
            colors.bg,
            'ring-1 ring-inset',
            colors.border
          )}>
            <IconComponent className={cn('h-5 w-5', colors.text)} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-1 ring-border text-[9px] font-bold text-muted-foreground">
              {stageNumber}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-bold', colors.text)}>{stage.agentName}</span>
              <span className="text-xs text-muted-foreground">· {stage.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
          </div>
        </div>
        
        {/* Introduction text */}
        <p className="text-sm text-foreground/80 leading-relaxed px-1">
          {stage.intro}
        </p>
        
        {/* Quick tips - Horizontal scrollable pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {stage.thinkAbout.slice(0, 3).map((item, i) => (
            <div 
              key={i}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 rounded-full text-xs border',
                colors.border,
                colors.bg,
                'text-muted-foreground'
              )}
            >
              {item}
            </div>
          ))}
        </div>
        
        {/* Output expectation - Compact */}
        <div className={cn(
          'flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs',
          colors.border,
          colors.bg
        )}>
          <Zap className={cn('h-3.5 w-3.5 shrink-0 mt-0.5', colors.text)} />
          <div>
            <span className="font-medium text-foreground">Output: </span>
            <span className="text-muted-foreground">{stage.deliverable}</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}
