'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StageId, SessionState, Session, RawSignals, Artifact, UIMessage } from './types'
import { STAGES } from './types'

// Track conversation progress per agent
type ConversationProgress = {
  started: boolean
  userMessageCount: number
  totalUserChars: number
}

interface SessionStore {
  session: Session | null
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  createSession: (projectName: string, rawSignals: RawSignals) => void
  addMessage: (stage: StageId, message: UIMessage) => void
  setArtifact: (stage: StageId, artifact: Artifact) => void
  completeStage: (stage: StageId) => void
  updateProgress: (stage: StageId, userMessage: string) => void
}

const createEmptyMessages = (): Record<StageId, UIMessage[]> => ({
  context: [],
  intake: [],
  problemFraming: [],
  userJTBD: [],
  problemValidation: [],
  solutionShaping: [],
  dataSchema: [],
  featureDefinition: [],
  prioritization: [],
  aiStrategy: [],
  testScenarios: [],
})

const createEmptyProgress = (): Record<StageId, ConversationProgress> => ({
  context: { started: false, userMessageCount: 0, totalUserChars: 0 },
  intake: { started: false, userMessageCount: 0, totalUserChars: 0 },
  problemFraming: { started: false, userMessageCount: 0, totalUserChars: 0 },
  userJTBD: { started: false, userMessageCount: 0, totalUserChars: 0 },
  problemValidation: { started: false, userMessageCount: 0, totalUserChars: 0 },
  solutionShaping: { started: false, userMessageCount: 0, totalUserChars: 0 },
  dataSchema: { started: false, userMessageCount: 0, totalUserChars: 0 },
  featureDefinition: { started: false, userMessageCount: 0, totalUserChars: 0 },
  prioritization: { started: false, userMessageCount: 0, totalUserChars: 0 },
  aiStrategy: { started: false, userMessageCount: 0, totalUserChars: 0 },
  testScenarios: { started: false, userMessageCount: 0, totalUserChars: 0 },
})

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      
      createSession: (projectName: string, rawSignals: RawSignals) => {
        const newSession: Session = {
          id: crypto.randomUUID(),
          currentStage: 'context',
          completedStages: [],
          artifacts: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set({ session: newSession })
      },
      
      addMessage: (stage, message) => {
        // Messages are handled in chat-interface component state
        // This is a placeholder for future message persistence
      },
      
      updateProgress: (stage, userMessage) => {
        // Progress tracking placeholder
      },
      
      completeStage: (stage) => {
        const session = get().session
        if (!session) return
        
        const completedStages = session.completedStages.includes(stage)
          ? session.completedStages
          : [...session.completedStages, stage]
        
        // Auto-advance to next stage
        const currentIndex = STAGES.findIndex(s => s.id === stage)
        const nextStage = STAGES[currentIndex + 1]?.id || stage
        
        set({
          session: {
            ...session,
            completedStages,
            currentStage: nextStage,
            updatedAt: new Date(),
          },
        })
      },
      
      setArtifact: (key, value) => {
        const session = get().session
        if (!session) return
        set({
          session: {
            ...session,
            artifacts: { ...session.artifacts, [key]: value },
            updatedAt: new Date(),
          },
        })
      },
    }),
    {
      name: 'product-coach-session',
      onRehydrateStorage: () => (state) => {
        // Set hasHydrated to true after rehydration completes
        state?.setHasHydrated(true)
      },
    }
  )
)
