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
  const { session, createSession, completeStage, setArtifact } = useSessionStore()
  
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
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <Home className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground">{currentStageData.name}</h1>
                <p className="text-xs text-muted-foreground">{currentStageData.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/progress')}
              className="bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Progress
            </Button>
            {session.completedStages.length > 1 && (
              <Button
                size="sm"
                onClick={() => router.push('/export')}
              >
                Generate Requirements
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <div className="flex-1 border-r border-border">
          <ChatInterface
            stageId={stageId}
            artifacts={session.artifacts}
            onArtifactGenerated={handleArtifactGenerated}
          />
        </div>
        
        {/* Artifact Panel */}
        <div className="w-[480px] bg-card/30">
          <ArtifactViewer stageId={stageId} artifact={artifact} />
        </div>
      </div>
    </div>
  )
}
