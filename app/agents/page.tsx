'use client'

import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { STAGES } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Compass, Ear, Frame, Users, ShieldCheck, Lightbulb, Database, Puzzle, Trophy, Zap, CheckCircle2, Lock, ArrowLeft, Sparkles, ArrowRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const ICON_MAP = {
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

const COLOR_MAP = {
  slate: { bg: 'bg-slate-500/10', text: 'text-slate-500', border: 'border-slate-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-500', border: 'border-violet-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-500', border: 'border-teal-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
}

export default function AgentsPage() {
  const router = useRouter()
  const { session, hasHydrated } = useSessionStore()
  
  // Wait for Zustand store to hydrate from localStorage
  if (!hasHydrated) {
    return null // Wait for persist middleware to rehydrate
  }
  
  if (!session) {
    router.push('/')
    return null
  }
  
  const atlasCompleted = session.completedStages.includes('context')
  const atlasAgent = STAGES[0]
  const otherAgents = STAGES.slice(1)
  
  const handleAgentClick = (stageId: string) => {
    // ATLAS is always accessible, other agents unlock after ATLAS completion
    if (stageId === 'context' || atlasCompleted) {
      router.push(`/flow/${stageId}`)
    }
  }
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Agent Hub</h1>
              <p className="text-xs text-muted-foreground">Choose an agent to explore specific aspects</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="relative container max-w-7xl mx-auto px-6 py-12">
        {/* Progress Summary */}
        <div className="mb-8 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm animate-fadeIn shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                Discovery Progress
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h2>
              <p className="text-sm text-muted-foreground">
                {session.completedStages.length} of {STAGES.length} agents completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {Math.round((session.completedStages.length / STAGES.length) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          <div className="h-3 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${(session.completedStages.length / STAGES.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* ATLAS - Mandatory First Agent */}
        <div className="mb-12">
          <div className="mb-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-3">
              <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-semibold text-violet-400">REQUIRED FIRST</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Start Here</h2>
            <p className="text-sm text-muted-foreground">ATLAS establishes project context and unlocks all other agents</p>
          </div>
          
          <AgentCard
            stage={atlasAgent}
            isComplete={atlasCompleted}
            isLocked={false}
            onClick={() => handleAgentClick(atlasAgent.id)}
          />
        </div>
        
        {/* Other Agents - Available after ATLAS */}
        <div className="relative">
          {/* Animated workflow lines in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-violet-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite'}} />
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite 1s'}} />
            <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite 2s'}} />
          </div>

          <div className="relative mb-6 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-3">
              {atlasCompleted ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-400">UNLOCKED</span>
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">LOCKED</span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-1">Explore Agents</h2>
            <p className="text-sm text-muted-foreground">
              {atlasCompleted 
                ? 'Talk to any agent in any order. Revisit completed agents anytime to refine or add more detail.'
                : 'Complete ATLAS first to unlock these agents'}
            </p>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherAgents.map((stage, index) => {
              const isComplete = session.completedStages.includes(stage.id)
              const isLocked = !atlasCompleted
              return (
                <div
                  key={stage.id}
                  className="animate-fadeIn"
                  style={{
                    animationDelay: `${0.3 + index * 0.05}s`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <AgentCard
                    stage={stage}
                    isComplete={isComplete}
                    isLocked={isLocked}
                    onClick={() => handleAgentClick(stage.id)}
                  />
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Export Section */}
        {atlasCompleted && session.completedStages.length > 1 && (
          <div className="mt-12 p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm animate-fadeIn shadow-xl hover:shadow-2xl transition-all" style={{animationDelay: '0.5s'}}>
            {/* Animated pulse ring */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-0 animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary animate-pulse" />
                  <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Ready to Generate Requirements
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You've completed <span className="font-bold text-foreground">{session.completedStages.length}</span> agent{session.completedStages.length !== 1 ? 's' : ''}. 
                  {session.completedStages.length >= 5 ? ' 🎉 Excellent coverage!' : ' Consider talking to more agents for comprehensive requirements.'}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Generate a PRD from current agent insights. You can revisit agents and regenerate anytime.
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={() => router.push('/export')}
                className="group h-12 px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                Generate Requirements
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function AgentCard({ 
  stage, 
  isComplete, 
  isLocked, 
  onClick 
}: { 
  stage: typeof STAGES[number]
  isComplete: boolean
  isLocked: boolean
  onClick: () => void
}) {
  const IconComponent = ICON_MAP[stage.icon as keyof typeof ICON_MAP]
  const colors = COLOR_MAP[stage.color as keyof typeof COLOR_MAP]
  
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        'group relative w-full p-6 rounded-2xl border text-left transition-all duration-300',
        'hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1',
        isLocked && 'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0 hover:shadow-none',
        !isLocked && 'cursor-pointer',
        colors.border,
        isComplete ? 'bg-card/60 backdrop-blur-sm' : 'bg-card/80 backdrop-blur-sm hover:bg-card/90'
      )}
    >
      {/* Animated glow effect on hover */}
      {!isLocked && (
        <div className={cn(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl',
          colors.bg
        )} />
      )}

      {/* Running indicator for unlocked cards */}
      {!isLocked && !isComplete && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 rounded-t-2xl" 
             style={{animation: 'slideRight 2s ease-in-out infinite'}} />
      )}
      
      {isLocked && (
        <div className="absolute top-4 right-4">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      
      {isComplete && !isLocked && (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <CheckCircle2 className={cn('h-5 w-5 animate-pulse', colors.text)} />
          </div>
          <span className="text-[10px] text-muted-foreground bg-card/80 px-2 py-0.5 rounded-full">Revisit</span>
        </div>
      )}
      
      <div className="relative flex items-start gap-4">
        <div className={cn(
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          colors.bg
        )}>
          <IconComponent className={cn('h-7 w-7 transition-all', colors.text)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold mb-1 text-foreground group-hover:text-foreground transition-colors">{stage.agentName}</h3>
          <p className="text-xs font-medium mb-2" style={{color: `var(--${stage.color}-500)`}}>{stage.name}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stage.description}
          </p>
        </div>
      </div>
    </button>
  )
}
