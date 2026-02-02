/**
 * Centralized AI Configuration
 * 
 * ============================================================================
 * HOW TO CONFIGURE YOUR OWN LLM PROVIDER
 * ============================================================================
 * 
 * OPTION 1: Use Vercel AI Gateway (Default - No Setup Required)
 * - Works automatically in v0 environment
 * - Supported providers: OpenAI, Anthropic, Google, AWS Bedrock, Fireworks
 * - Model format: "provider/model-name" (e.g., "openai/gpt-4o", "anthropic/claude-sonnet-4")
 * 
 * OPTION 2: Use Your Own API Key
 * - Set environment variable: OPENAI_API_KEY, ANTHROPIC_API_KEY, etc.
 * - The AI SDK will automatically detect and use your API key
 * - Model format remains the same: "openai/gpt-4o"
 * 
 * OPTION 3: Use Custom Provider (e.g., Azure OpenAI, self-hosted)
 * - Install the provider package: npm install @ai-sdk/azure
 * - Import and configure in this file
 * - Update the MODEL_STRING below
 * 
 * ============================================================================
 */

// ============================================================================
// MAIN CONFIGURATION - CHANGE THESE VALUES
// ============================================================================

/**
 * PRIMARY MODEL
 * This is the main model used for all coaching conversations and artifact generation.
 * 
 * Recommended options:
 * - "openai/gpt-4o"           - Best overall (default)
 * - "openai/gpt-4o-mini"      - Faster, cheaper, good for testing
 * - "anthropic/claude-sonnet-4"   - Alternative to GPT-4o
 * - "anthropic/claude-opus-4.5" - Most capable Anthropic model
 */
export const PRIMARY_MODEL = 'openai/gpt-4o'

/**
 * FAST MODEL (optional)
 * Used for quick operations like classification or simple responses.
 * Set to same as PRIMARY_MODEL if you want consistent behavior.
 */
export const FAST_MODEL = 'openai/gpt-4o-mini'

// ============================================================================
// ADVANCED CONFIGURATION
// ============================================================================

// Temperature settings for different use cases
export const TEMPERATURE = {
  // Lower temperature for structured, consistent outputs (artifact generation)
  structured: 0.3,
  // Balanced for general conversation (coaching)
  balanced: 0.7,
  // Higher for creative exploration
  creative: 0.9,
} as const

// Max tokens configuration
export const MAX_TOKENS = {
  short: 1024,    // Quick responses
  medium: 2048,   // Regular conversation
  long: 4096,     // Artifact generation
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
