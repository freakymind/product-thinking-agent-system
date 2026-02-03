'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { ChatInterface } from '@/components/chat-interface'
import { ArtifactViewer } from '@/components/artifact-viewer'
import { ProgressStepper } from '@/components/progress-stepper'
import { Button } from '@/components/ui/button'
import { STAGES, type StageId } from '@/lib/types'
import { ArrowLeft, ArrowRight, Sparkles, Home } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function FlowPage() {
  const { stage } = useParams<{ stage: string }>()
  const router = useRouter()
  const { session, createSession, setCurrentStage, completeStage, setArtifact, setMessages } = useSessionStore()
  
  const stageId = stage as StageId
  const currentStageData = STAGES.find(s => s.id === stageId)
  const currentIndex = STAGES.findIndex(s => s.id === stageId)
  const prevStage = currentIndex > 0 ? STAGES[currentIndex - 1] : null
  const nextStage = currentIndex < STAGES.length - 1 ? STAGES[currentIndex + 1] : null
  
  // Check if all previous stages are completed
  const previousStagesComplete = STAGES.slice(0, currentIndex).every(s => 
    session?.completedStages.includes(s.id)
  )
  
  // Create session if none exists
  useEffect(() => {
    if (!session) {
      createSession()
    }
  }, [session, createSession])
  
  // Validate stage exists and ATLAS is complete for non-ATLAS agents
  useEffect(() => {
    if (!currentStageData) {
      router.push('/')
      return
    }
    
    // For non-ATLAS agents, ensure ATLAS is complete
    if (session && stageId !== 'context') {
      const atlasComplete = session.artifacts['context'] !== undefined
      if (!atlasComplete) {
        router.push('/flow/context')
      }
    }
  }, [currentStageData, router, session, stageId])
  
  if (!currentStageData || !session) {
    return null
  }
  
  const artifact = session.artifacts[stageId]
  const isStageComplete = session.completedStages.includes(stageId)
  
  // Get previous stage artifact for context requirement message
  const prevStageArtifact = prevStage ? session.artifacts[prevStage.id] : null
  const hasPreviousContext = currentIndex === 0 || prevStageArtifact !== undefined
  
  const handleArtifactGenerated = (newArtifact: unknown) => {
    setArtifact(stageId, newArtifact)
    // Auto-complete this stage
    if (!session.completedStages.includes(stageId)) {
      completeStage(stageId)
    }
  }
  
  return (
    <div className="flex h-screen flex-col bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
      </div>

      {/* Header */}
      <header className="relative shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-lg z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <Home className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 ring-1 ring-violet-500/30">
                <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <h1 className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{currentStageData.name}</h1>
                <p className="text-xs text-muted-foreground">{currentStageData.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/agents')}
            >
              All Agents
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/progress')}
            >
              Progress
            </Button>
            {session.completedStages.length > 1 && (
              <Button
                size="sm"
                onClick={() => router.push('/export')}
                className="group shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 group-hover:animate-spin" />
                Generate Requirements
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <div className="relative flex-1 border-r border-border/50 animate-fadeIn">
          <ChatInterface
            stageId={stageId}
            artifacts={session.artifacts}
            onArtifactGenerated={handleArtifactGenerated}
          />
        </div>
        
        {/* Artifact Panel */}
        <div className="relative w-[480px] bg-card/20 backdrop-blur-sm animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <ArtifactViewer stageId={stageId} artifact={artifact} />
        </div>
      </div>
    </div>
  )
}
