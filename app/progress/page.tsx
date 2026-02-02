'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { StageCard } from '@/components/stage-card'
import { Button } from '@/components/ui/button'
import { STAGES } from '@/lib/types'
import { ArrowLeft, RotateCcw, Download, Plus, RefreshCw } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function ProgressPage() {
  const router = useRouter()
  const { session, setCurrentStage, resetSession, resetFeatureFlow, resetCompletely } = useSessionStore()
  
  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">No Active Session</h1>
          <p className="text-muted-foreground mb-6">Start a new session to track your progress.</p>
          <Button onClick={() => router.push('/')}>
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }
  
  const handleStageSelect = (stageId: typeof STAGES[number]['id']) => {
    setCurrentStage(stageId)
    router.push(`/flow/${stageId}`)
  }
  
  const handleNewFeature = () => {
    if (confirm('Start a new feature using the same project context from ATLAS?')) {
      resetFeatureFlow()
      router.push('/flow/intake')
    }
  }
  
  const handleCompleteReset = () => {
    if (confirm('This will clear ALL progress including your ATLAS project context. Are you sure?')) {
      resetCompletely()
      router.push('/')
    }
  }
  
  const completedCount = session.completedStages.length
  const totalCount = STAGES.length
  const progressPercentage = (completedCount / totalCount) * 100
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            {session.artifacts['context'] && (
              <Button variant="outline" size="sm" onClick={handleNewFeature}>
                <Plus className="h-4 w-4 mr-2" />
                New Feature
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleCompleteReset} className="text-destructive hover:text-destructive">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Progress Overview */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground mb-6">
            Track your journey through all 9 agents
          </p>
          
          {/* Progress Bar */}
          <div className="relative h-3 rounded-full bg-muted overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalCount} agents complete
            </span>
            <span className="text-sm font-semibold text-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage) => (
            <StageCard
              key={stage.id}
              stageId={stage.id}
              currentStage={session.currentStage}
              completedStages={session.completedStages}
              artifacts={session.artifacts}
              onSelect={handleStageSelect}
            />
          ))}
        </div>

        {/* Export Section */}
        {completedCount === totalCount && (
          <div className="mt-12 rounded-xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              All Agents Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              You've completed all 9 agents. Export your PRD to share with your team.
            </p>
            <Button size="lg" onClick={() => router.push('/export')}>
              <Download className="h-5 w-5 mr-2" />
              Export PRD
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
