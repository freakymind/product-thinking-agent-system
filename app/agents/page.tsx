'use client'

import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { STAGES } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Compass, Ear, Frame, Users, ShieldCheck, Lightbulb, Database, Puzzle, Trophy, Zap, CheckCircle2, Lock, ArrowLeft } from 'lucide-react'
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
}

export default function AgentsPage() {
  const router = useRouter()
  const { session } = useSessionStore()
  
  if (!session) {
    router.push('/')
    return null
  }
  
  const atlasCompleted = session.completedStages.includes('context')
  const atlasAgent = STAGES[0]
  const otherAgents = STAGES.slice(1)
  
  const handleAgentClick = (stageId: string) => {
    if (stageId === 'context' || atlasCompleted) {
      router.push(`/flow/${stageId}`)
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
            <div>
              <h1 className="text-lg font-bold">Agent Hub</h1>
              <p className="text-xs text-muted-foreground">Choose an agent to explore specific aspects</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto px-6 py-12">
        {/* Progress Summary */}
        <div className="mb-8 p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Discovery Progress</h2>
              <p className="text-sm text-muted-foreground">
                {session.completedStages.length} of {STAGES.length} agents completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round((session.completedStages.length / STAGES.length) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(session.completedStages.length / STAGES.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* ATLAS - Mandatory First Agent */}
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">Start Here</h2>
            <p className="text-sm text-muted-foreground">ATLAS is mandatory - establish project context first</p>
          </div>
          
          <AgentCard
            stage={atlasAgent}
            isComplete={atlasCompleted}
            isLocked={false}
            onClick={() => handleAgentClick(atlasAgent.id)}
          />
        </div>
        
        {/* Other Agents - Available after ATLAS */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1">Explore Agents</h2>
            <p className="text-sm text-muted-foreground">
              {atlasCompleted 
                ? 'Talk to any agent in any order. Revisit completed agents anytime to refine or add more detail.'
                : 'Complete ATLAS first to unlock these agents'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherAgents.map((stage) => {
              const isComplete = session.completedStages.includes(stage.id)
              return (
                <AgentCard
                  key={stage.id}
                  stage={stage}
                  isComplete={isComplete}
                  isLocked={!atlasCompleted}
                  onClick={() => handleAgentClick(stage.id)}
                />
              )
            })}
          </div>
        </div>
        
        {/* Export Section */}
        {atlasCompleted && session.completedStages.length > 1 && (
          <div className="mt-12 p-8 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Ready to Generate Requirements
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You've completed {session.completedStages.length} agent{session.completedStages.length !== 1 ? 's' : ''}. 
                  {session.completedStages.length >= 5 ? ' Excellent coverage!' : ' Consider talking to more agents for comprehensive requirements.'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Generate a PRD from current agent insights. You can revisit agents and regenerate anytime.
                </p>
              </div>
              <Button size="lg" onClick={() => router.push('/export')}>
                Generate Requirements
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
        'group relative w-full p-6 rounded-xl border text-left transition-all',
        'hover:shadow-lg hover:scale-[1.02]',
        isLocked && 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none',
        !isLocked && 'cursor-pointer',
        colors.border,
        isComplete ? 'bg-card/50' : 'bg-card hover:bg-card/80'
      )}
    >
      {isLocked && (
        <div className="absolute top-3 right-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      
      {isComplete && !isLocked && (
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <CheckCircle2 className={cn('h-5 w-5', colors.text)} />
          <span className="text-[10px] text-muted-foreground">Click to revisit</span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
          colors.bg
        )}>
          <IconComponent className={cn('h-6 w-6', colors.text)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">{stage.agentName}</h3>
          <p className="text-xs text-muted-foreground mb-2">{stage.name}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stage.description}
          </p>
        </div>
      </div>
    </button>
  )
}
