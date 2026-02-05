import { z } from 'zod'

// Agent definitions for the product thinking flow (9 AI agents)
export const STAGES = [
  { 
    id: 'context', 
    name: 'Project Strategist',
    agentName: 'ATLAS',
    icon: 'compass',
    color: 'slate',
    description: 'Establishes business context and project scope',
    intro: 'Before we dive into problems and solutions, I need to understand your world. Tell me about your business, your market, and what you are trying to achieve.',
    thinkAbout: [
      'What is the name and purpose of this project?',
      'What industry or business domain are you in?',
      'Who is your target market or customer segment?',
      'What are the key business goals or constraints?',
    ],
    deliverable: 'Project context including business area, target market, goals, and constraints.',
  },
  { 
    id: 'intake', 
    name: 'Signal Collector',
    agentName: 'IRIS',
    icon: 'ear',
    color: 'violet',
    description: 'Captures raw signals and strips solution language',
    intro: 'I specialize in listening. Tell me what users are saying, doing, and complaining about. I will help you extract pure problem signals without jumping to solutions.',
    thinkAbout: [
      'What are users actually saying or doing?',
      'What complaints or frustrations have you heard?',
      'What workarounds are users currently using?',
      'How often does this problem occur?',
    ],
    deliverable: 'A list of raw signals with sources, observations, frequency, and current workarounds.',
  },
  { 
    id: 'problemFraming', 
    name: 'Problem Architect',
    agentName: 'CLARA',
    icon: 'frame',
    color: 'blue',
    description: 'Structures problems into clear statements',
    intro: 'I turn chaos into clarity. Give me your raw signals and I will help you craft a precise problem statement that answers WHO, WHAT context, and WHAT pain.',
    thinkAbout: [
      'Who exactly experiences this problem? (specific role/persona)',
      'In what situation does the problem occur?',
      'What goes wrong because of this problem?',
      'What is the measurable impact? (time, money, errors)',
    ],
    deliverable: 'A clear problem statement with who, context, pain, and measurable impact.',
  },
  { 
    id: 'userJTBD', 
    name: 'User Analyst',
    agentName: 'MAYA',
    icon: 'users',
    color: 'teal',
    description: 'Uncovers jobs-to-be-done and user goals',
    intro: 'I study human motivation. Let me help you understand what users are really trying to accomplish - not what features they ask for, but the outcomes they need.',
    thinkAbout: [
      'What job is the user trying to get done?',
      'How does the user define success?',
      'What constraints limit how they can do this job?',
      'What happens when the job is done poorly?',
    ],
    deliverable: 'A persona with constraints and a JTBD with success metrics.',
  },
  { 
    id: 'problemValidation', 
    name: 'Critical Evaluator',
    agentName: 'VANCE',
    icon: 'shield-check',
    color: 'amber',
    description: 'Validates problems and kills weak ideas',
    intro: 'I am your skeptic. Not every problem deserves a solution. I will challenge your assumptions and help you decide: Proceed, Pivot, or Kill.',
    thinkAbout: [
      'How severe is this problem? (hair-on-fire vs nice-to-have)',
      'How frequently does it occur?',
      'What alternatives already exist?',
      'Would users pay to solve this?',
    ],
    deliverable: 'A validation assessment with a Proceed/Pivot/Kill recommendation.',
  },
  { 
    id: 'solutionShaping', 
    name: 'Solution Explorer',
    agentName: 'NOVA',
    icon: 'lightbulb',
    color: 'pink',
    description: 'Explores multiple solution approaches',
    intro: 'I see possibilities. Before you commit, let me show you multiple paths forward. Each option has trade-offs - I will help you choose wisely.',
    thinkAbout: [
      'What are at least 2 different ways to solve this?',
      'What assumptions does each approach make?',
      'What are the risks and trade-offs?',
      'Which approach best fits user constraints?',
    ],
    deliverable: 'Multiple solution options with a recommended approach and reasoning.',
  },
  { 
    id: 'dataSchema', 
    name: 'Data Architect',
    agentName: 'AXON',
    icon: 'database',
    color: 'cyan',
    description: 'Designs data models and configurations',
    intro: 'I think in structures. Every solution needs data. I will help you define entities, fields, and what should be configurable versus fixed.',
    thinkAbout: [
      'What data entities does this solution need?',
      'What fields are required for each entity?',
      'What should customers be able to configure?',
      'What must remain system-controlled?',
    ],
    deliverable: 'Data schema, configuration options, and sample data.',
  },
  { 
    id: 'featureDefinition', 
    name: 'Feature Designer',
    agentName: 'FLUX',
    icon: 'puzzle',
    color: 'emerald',
    description: 'Converts ideas into buildable features',
    intro: 'I make things concrete. Abstract ideas become specific, testable features with clear acceptance criteria. No ambiguity allowed.',
    thinkAbout: [
      'What specific user actions does this enable?',
      'What value does the user get from each feature?',
      'How will we verify each feature works? (acceptance criteria)',
      'What dependencies exist between features?',
    ],
    deliverable: 'A list of features with user value, acceptance criteria, and dependencies.',
  },
  { 
    id: 'prioritization', 
    name: 'Priority Oracle',
    agentName: 'PRIME',
    icon: 'trophy',
    color: 'orange',
    description: 'Ranks features using RICE framework',
    intro: 'I bring order to chaos. Using the RICE framework, I will help you create an objective ranking for what to build first. No more gut feelings.',
    thinkAbout: [
      'How many users will each feature reach?',
      'What impact will each feature have?',
      'How confident are you in your estimates?',
      'What is the effort required for each?',
    ],
    deliverable: 'A ranked list of features with RICE scores.',
  },
  { 
    id: 'aiStrategy', 
    name: 'AI Strategist',
    agentName: 'SAGE',
    icon: 'zap',
    color: 'purple',
    description: 'Identifies AI opportunities and recommends models',
    intro: 'I see where AI can transform your solution. After reviewing your requirements, I will suggest where machine learning, LLMs, or AI models can add intelligence, automation, or personalization.',
    thinkAbout: [
      'Where can AI add value to your solution?',
      'Which features could benefit from ML or LLMs?',
      'What specific models or AI capabilities are needed?',
      'What data or training requirements exist?',
    ],
    deliverable: 'AI opportunities with specific model recommendations and implementation guidance.',
  },
  { 
    id: 'testScenarios', 
    name: 'Test Engineer',
    agentName: 'GHERKIN',
    icon: 'check-circle',
    color: 'green',
    description: 'Converts requirements into Cucumber testable scenarios',
    intro: 'I transform requirements into testable specifications. Using Cucumber and Gherkin syntax, I will help you create comprehensive test scenarios with Given-When-Then format.',
    thinkAbout: [
      'What are the key user flows that need testing?',
      'What edge cases and error conditions exist?',
      'What validation rules need verification?',
      'How should the system behave in different scenarios?',
    ],
    deliverable: 'Cucumber feature files with Gherkin scenarios including happy paths, edge cases, and data-driven tests.',
  },
] as const

export type StageId = typeof STAGES[number]['id']

// Session state for tracking progress
export interface SessionState {
  id: string
  currentStage: StageId
  completedStages: StageId[]
  artifacts: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

// Schemas for structured outputs from each stage

// Agent 1: Project Context
export const ProjectContextSchema = z.object({
  project_name: z.string().describe('Name of the project or initiative'),
  project_description: z.string().describe('Brief description of what this project is about'),
  business_area: z.object({
    industry: z.string().describe('Industry or sector (e.g., Healthcare, Fintech, E-commerce)'),
    domain: z.string().describe('Specific domain within the industry'),
    company_stage: z.string().describe('Startup, Growth, Enterprise, etc.'),
  }),
  target_market: z.object({
    primary_audience: z.string().describe('Primary target customer/user'),
    market_size: z.string().describe('Estimated market size or opportunity'),
    geography: z.string().describe('Geographic focus'),
  }),
  business_goals: z.array(z.string()).describe('Key business objectives for this project'),
  constraints: z.object({
    budget: z.string().nullable().describe('Budget constraints if any'),
    timeline: z.string().nullable().describe('Timeline constraints if any'),
    technical: z.array(z.string()).describe('Technical constraints or requirements'),
    regulatory: z.array(z.string()).describe('Regulatory or compliance requirements'),
  }),
  competitors: z.array(z.object({
    name: z.string(),
    strengths: z.string(),
    weaknesses: z.string(),
  })).describe('Key competitors in this space'),
})

// Agent 2: Raw Input/Intake
export const RawSignalSchema = z.object({
  source: z.string().describe('Where this signal came from (user interview, support ticket, etc)'),
  observation: z.string().describe('Observable behavior or problem, NOT a solution'),
  frequency: z.string().describe('How often this occurs'),
  workaround: z.string().describe('What the user does today to work around this'),
})

export const RawSignalsSchema = z.object({
  raw_signals: z.array(RawSignalSchema),
})

// Agent 2: Problem Framing
export const ProblemFrameSchema = z.object({
  problem_statement: z.object({
    who: z.string().describe('Who specifically experiences this problem'),
    context: z.string().describe('In what situation does the problem occur'),
    pain: z.string().describe('What goes wrong because of this problem'),
    impact: z.object({
      time_lost: z.string().nullable(),
      error_rate: z.string().nullable(),
      cost: z.string().nullable(),
      other: z.string().nullable(),
    }).describe('Measurable impact of the problem'),
  }),
})

// Agent 3: User & JTBD
export const PersonaSchema = z.object({
  role: z.string().describe('User role/title'),
  constraints: z.array(z.string()).describe('User constraints (non-technical, time-constrained, etc)'),
})

export const JTBDSchema = z.object({
  job: z.string().describe('What job is the user trying to get done'),
  success_metrics: z.array(z.string()).describe('How the user defines success'),
})

export const UserResearchSchema = z.object({
  persona: PersonaSchema,
  jtbd: JTBDSchema,
})

// Agent 4: Problem Validation
export const ProblemValidationSchema = z.object({
  problem_validation: z.object({
    frequency: z.string().describe('How often does this occur (High/Medium/Low)'),
    severity: z.string().describe('How painful is this (High/Medium/Low)'),
    alternatives: z.array(z.string()).describe('What alternatives exist today'),
    must_have: z.boolean().describe('Is this a must-have solution'),
  }),
  recommendation: z.enum(['Proceed', 'Pivot', 'Kill']),
  reasoning: z.string(),
})

// Agent 5: Solution Shaping
export const SolutionOptionSchema = z.object({
  name: z.string(),
  assumptions: z.array(z.string()).describe('What assumptions does this option make'),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
})

export const SolutionShapingSchema = z.object({
  solution_options: z.array(SolutionOptionSchema).min(2),
  recommended_option: z.string(),
  reasoning: z.string(),
})

// Agent 6: Data & Configuration
export const DataFieldSchema = z.object({
  name: z.string(),
  type: z.string().describe('string, decimal, date, boolean, etc'),
})

export const DataEntitySchema = z.object({
  name: z.string(),
  fields: z.array(DataFieldSchema),
})

export const SampleDataEntrySchema = z.object({
  entity_name: z.string().describe('Name of the entity this sample belongs to'),
  sample_values: z.array(z.object({
    field_name: z.string(),
    value: z.string(),
  })).describe('Sample field values for this entity'),
})

export const DataSchemaOutputSchema = z.object({
  data_schema: z.array(DataEntitySchema),
  configurations: z.object({
    user_configurable: z.array(z.string()).describe('What customers can configure'),
    system_configurable: z.array(z.string()).describe('What must remain system-controlled'),
  }),
  sample_data: z.array(SampleDataEntrySchema).describe('Sample data for each entity'),
})

// Agent 7: Feature Definition
export const FeatureSchema = z.object({
  name: z.string(),
  user_value: z.string().describe('What value does the user get'),
  acceptance_criteria: z.array(z.string()).describe('Specific, testable criteria'),
  dependencies: z.array(z.string()),
})

export const FeatureDefinitionSchema = z.object({
  features: z.array(FeatureSchema),
})

// Agent 8: Prioritization
export const RankedFeatureSchema = z.object({
  name: z.string(),
  score: z.number().describe('RICE score'),
})

export const PrioritizationSchema = z.object({
  framework: z.literal('RICE'),
  ranked_features: z.array(RankedFeatureSchema),
})

// Agent 9: AI Strategy
export const AIOpportunitySchema = z.object({
  feature_area: z.string().describe('Which feature or area this applies to'),
  ai_capability: z.string().describe('What AI capability (NLP, Computer Vision, Recommendation, Generation, etc)'),
  use_case: z.string().describe('Specific use case for AI'),
  recommended_models: z.array(z.object({
    model_type: z.string().describe('LLM, ML model, or AI service'),
    specific_model: z.string().describe('e.g., GPT-4, Claude, BERT, custom ML model'),
    rationale: z.string().describe('Why this model fits'),
  })),
  implementation_approach: z.string().describe('How to implement this AI capability'),
  data_requirements: z.array(z.string()).describe('What data is needed'),
  estimated_impact: z.string().describe('Expected impact on user experience'),
})

export const AIStrategySchema = z.object({
  ai_opportunities: z.array(AIOpportunitySchema),
  overall_ai_strategy: z.string().describe('High-level AI strategy summary'),
  priority_recommendations: z.array(z.string()).describe('Which AI opportunities to pursue first'),
})

// Agent 10: Test Scenarios (Cucumber/Gherkin)
export const GherkinScenarioStepSchema = z.object({
  keyword: z.enum(['Given', 'When', 'Then', 'And', 'But']),
  text: z.string().describe('Step description'),
})

export const GherkinScenarioSchema = z.object({
  scenario_type: z.enum(['Scenario', 'Scenario Outline']),
  title: z.string().describe('Scenario title'),
  steps: z.array(GherkinScenarioStepSchema),
  examples: z.array(z.object({
    parameters: z.array(z.string()),
    data_rows: z.array(z.array(z.string())),
  })).optional().describe('For Scenario Outline - example data tables'),
})

export const GherkinFeatureSchema = z.object({
  feature_name: z.string(),
  user_story: z.object({
    as_a: z.string().describe('User role'),
    i_want: z.string().describe('User goal'),
    so_that: z.string().describe('Business value'),
  }),
  background: z.array(GherkinScenarioStepSchema).optional().describe('Common preconditions'),
  scenarios: z.array(GherkinScenarioSchema),
})

export const TestScenariosSchema = z.object({
  features: z.array(GherkinFeatureSchema),
  coverage_summary: z.string().describe('Overview of test coverage'),
  test_data_requirements: z.array(z.string()).describe('Test data needed'),
})

// Type exports
export type ProblemFrame = z.infer<typeof ProblemFrameSchema>
export type Persona = z.infer<typeof PersonaSchema>
export type JTBD = z.infer<typeof JTBDSchema>
export type UserResearch = z.infer<typeof UserResearchSchema>
export type ProblemValidation = z.infer<typeof ProblemValidationSchema>
export type SolutionOption = z.infer<typeof SolutionOptionSchema>
export type SolutionShaping = z.infer<typeof SolutionShapingSchema>
export type DataField = z.infer<typeof DataFieldSchema>
export type DataEntity = z.infer<typeof DataEntitySchema>
export type DataSchemaOutput = z.infer<typeof DataSchemaOutputSchema>
export type Feature = z.infer<typeof FeatureSchema>
export type FeatureDefinition = z.infer<typeof FeatureDefinitionSchema>
export type RankedFeature = z.infer<typeof RankedFeatureSchema>
export type Prioritization = z.infer<typeof PrioritizationSchema>
export type AIOpportunity = z.infer<typeof AIOpportunitySchema>
export type AIStrategy = z.infer<typeof AIStrategySchema>
export type RawSignals = z.infer<typeof RawSignalsSchema>
export type ProjectContext = z.infer<typeof ProjectContextSchema>
export type GherkinScenarioStep = z.infer<typeof GherkinScenarioStepSchema>
export type GherkinScenario = z.infer<typeof GherkinScenarioSchema>
export type GherkinFeature = z.infer<typeof GherkinFeatureSchema>
export type TestScenarios = z.infer<typeof TestScenariosSchema>
