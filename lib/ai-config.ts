/**
 * ============================================================================
 * INTERNAL REQUIREMENTS DISCOVERY TOOL - CONFIGURATION
 * ============================================================================
 * 
 * This file contains all system configuration. Set these values once during
 * initial setup. No runtime settings UI is provided - all configuration is
 * done here.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. API KEY CONFIGURATION
 *    Set your API key as an environment variable:
 *    - For OpenAI: OPENAI_API_KEY=sk-...
 *    - For Anthropic: ANTHROPIC_API_KEY=sk-ant-...
 *    - The system will automatically use these keys
 * 
 * 2. MODEL SELECTION
 *    Update PRIMARY_MODEL and FAST_MODEL below with your preferred models
 * 
 * 3. ADVANCED SETTINGS
 *    Adjust temperature, max tokens, and other parameters as needed
 * 
 * ============================================================================
 */

// ============================================================================
// MAIN CONFIGURATION - EDIT THESE VALUES
// ============================================================================

/**
 * PRIMARY MODEL
 * Main model used for all agent conversations and artifact generation.
 * 
 * Recommended options:
 * - "openai/gpt-4o"              - Best overall balance (default)
 * - "openai/gpt-4o-mini"         - Faster, more cost-effective
 * - "anthropic/claude-sonnet-4"  - Strong alternative to GPT-4o
 * - "anthropic/claude-opus-4.5"  - Most capable for complex reasoning
 */
export const PRIMARY_MODEL = 'openai/gpt-4o'

/**
 * FAST MODEL
 * Used for quick operations and simple responses.
 * Can be set to same as PRIMARY_MODEL for consistency.
 */
export const FAST_MODEL = 'openai/gpt-4o-mini'

// ============================================================================
// ADVANCED CONFIGURATION
// ============================================================================

/**
 * TEMPERATURE SETTINGS
 * Controls response creativity and randomness.
 * - Lower (0.0-0.3): More deterministic, focused outputs
 * - Medium (0.4-0.7): Balanced creativity and consistency
 * - Higher (0.8-2.0): More creative and varied responses
 */
export const TEMPERATURE = {
  structured: 0.3,  // For artifact generation and structured outputs
  balanced: 0.7,    // For general agent conversations
  creative: 0.9,    // For brainstorming and exploration
} as const

/**
 * MAX TOKENS
 * Controls maximum response length.
 */
export const MAX_TOKENS = {
  short: 1024,    // Quick responses and confirmations
  medium: 2048,   // Standard conversation responses
  long: 4096,     // Comprehensive artifact generation
} as const

/**
 * FEATURE FLAGS
 * Enable or disable specific system features.
 */
export const FEATURES = {
  streamingResponses: true,      // Enable real-time response streaming
  contextMemory: true,           // Preserve conversation context across agents
  autoSaveProgress: true,        // Automatically save session progress
  exportFormats: ['markdown', 'pdf', 'json'] as const,  // Available export formats
} as const

/**
 * SYSTEM LIMITS
 * Configure operational limits.
 */
export const LIMITS = {
  minExchangesForArtifact: 3,    // Minimum Q&A exchanges before generating artifact
  minCharsForArtifact: 100,      // Minimum total user input characters
  maxContextLength: 16000,       // Maximum context window size
  sessionTimeout: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
} as const

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility)
// ============================================================================

export const AI_MODELS = {
  primary: PRIMARY_MODEL,
  fast: FAST_MODEL,
  reasoning: PRIMARY_MODEL, // Use primary for reasoning tasks
} as const

// Agent-specific model assignments (all use primary model)
export const AGENT_MODELS = {
  context: PRIMARY_MODEL,
  intake: PRIMARY_MODEL,
  problemFraming: PRIMARY_MODEL,
  userJTBD: PRIMARY_MODEL,
  problemValidation: PRIMARY_MODEL,
  solutionShaping: PRIMARY_MODEL,
  dataSchema: PRIMARY_MODEL,
  featureDefinition: PRIMARY_MODEL,
  prioritization: PRIMARY_MODEL,
  aiStrategy: PRIMARY_MODEL,
} as const

// Type exports
export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS]
export type AgentType = keyof typeof AGENT_MODELS
