'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StageId, SessionState } from './types'
import { STAGES } from './types'
import type { UIMessage } from 'ai'

// Track conversation progress per agent
type ConversationProgress = {
  started: boolean
  userMessageCount: number
  totalUserChars: number
}

interface SessionStore {
  // Session state
  session: SessionState | null
  messages: Record<StageId, UIMessage[]>
  conversationProgress: Record<StageId, ConversationProgress>
  
  // Actions
  createSession: () => void
  setCurrentStage: (stage: StageId) => void
  completeStage: (stage: StageId) => void
  setArtifact: (key: string, value: unknown) => void
  getArtifact: (key: string) => unknown | undefined
  setMessages: (stage: StageId, messages: UIMessage[]) => void
  updateConversationProgress: (stage: StageId, progress: Partial<ConversationProgress>) => void
  resetSession: () => void
  resetFeatureFlow: () => void // Reset all except ATLAS context
  resetCompletely: () => void // Reset everything including ATLAS
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
})

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,
      messages: createEmptyMessages(),
      conversationProgress: createEmptyProgress(),
      
      createSession: () => {
        const newSession: SessionState = {
          id: crypto.randomUUID(),
          currentStage: 'context',
          completedStages: [],
          artifacts: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set({ session: newSession, messages: createEmptyMessages() })
      },
      
      setCurrentStage: (stage) => {
        const session = get().session
        if (!session) return
        set({
          session: {
            ...session,
            currentStage: stage,
            updatedAt: new Date(),
          },
        })
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
      
      getArtifact: (key: string) => {
        const session = get().session
        return session?.artifacts[key]
      },
      
      setMessages: (stage, messages) => {
        set((state) => ({
          messages: { ...state.messages, [stage]: messages },
        }))
      },
      
      updateConversationProgress: (stage, progress) => {
        set((state) => ({
          conversationProgress: {
            ...state.conversationProgress,
            [stage]: { ...state.conversationProgress[stage], ...progress },
          },
        }))
      },
      
      resetSession: () => {
        set({ session: null, messages: createEmptyMessages(), conversationProgress: createEmptyProgress() })
      },
      
      // Reset feature flow but keep ATLAS context
      resetFeatureFlow: () => {
        const session = get().session
        if (!session) return
        
        const atlasArtifact = session.artifacts['context']
        const messages = get().messages
        const atlasMessages = messages['context']
        const progress = get().conversationProgress
        const atlasProgress = progress['context']
        
        set({
          session: {
            ...session,
            currentStage: 'intake', // Start from IRIS
            completedStages: ['context'], // Keep ATLAS as complete
            artifacts: { context: atlasArtifact }, // Only keep ATLAS artifact
            updatedAt: new Date(),
          },
          messages: { ...createEmptyMessages(), context: atlasMessages },
          conversationProgress: { ...createEmptyProgress(), context: atlasProgress },
        })
      },
      
      // Complete reset including ATLAS
      resetCompletely: () => {
        set({ session: null, messages: createEmptyMessages(), conversationProgress: createEmptyProgress() })
      },
    }),
    {
      name: 'product-coach-session',
    }
  )
)
