'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { ArrowLeft, Bot, Cpu, Network, Sparkles, Zap, Lock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
              <Bot className="h-5 w-5 text-violet-400" />
            </div>
            <span className="text-xl font-bold text-foreground">Product Requirements</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            About This Tool
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            An internal product thinking system that helps teams develop comprehensive requirements through guided discovery conversations with specialized AI agents.
          </p>
        </div>

        {/* The Purpose */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why We Built This</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Product teams often rush to solutions without thoroughly exploring the problem space. This tool provides a structured framework for discovery, helping teams think through requirements systematically before committing to implementation.
            </p>
            <p className="text-muted-foreground">
              Traditional requirements processes are manual, time-consuming, and inconsistent. Different PMs follow different frameworks, leading to incomplete documentation and missed critical thinking steps.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">How The System Works</h2>
          
          <div className="space-y-6">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
                  <Network className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Specialized Discovery Agents</h3>
                  <p className="text-muted-foreground">
                    The system includes 10 specialized agents, each focusing on a specific aspect of product thinking—from problem identification and user research to technical architecture, success metrics, and testable specifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20">
                  <Cpu className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Context Flow</h3>
                  <p className="text-muted-foreground">
                    Each agent receives context from previous conversations, building a cumulative understanding of your project. No need to repeat information—the system maintains context across all discovery sessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Structured Artifacts</h3>
                  <p className="text-muted-foreground">
                    Each agent produces structured outputs like problem statements, user research frameworks, technical specifications, and success metrics. These artifacts are automatically compiled into a comprehensive requirements document.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Export & Documentation</h3>
                  <p className="text-muted-foreground">
                    Generate comprehensive requirements documents in multiple formats. The system synthesizes all agent outputs into production-ready documentation for your development team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Storage */}
        <section className="mb-16">
          <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                <Lock className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Local Data Storage</h3>
                <p className="text-muted-foreground mb-4">
                  This tool stores all data locally in your browser. Your conversations, requirements, and project data remain on your device. Configure your own AI provider API keys to maintain complete control over data flow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Agents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">The 10 Agents</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'ATLAS', role: 'Project Context', desc: 'Understands your business, users, and constraints' },
              { name: 'IRIS', role: 'Signal Collector', desc: 'Captures raw user problems and complaints' },
              { name: 'CLARA', role: 'Problem Architect', desc: 'Frames precise, actionable problem statements' },
              { name: 'MAYA', role: 'User Analyst', desc: 'Identifies jobs-to-be-done and user motivations' },
              { name: 'VANCE', role: 'Critical Evaluator', desc: 'Validates if the problem is worth solving' },
              { name: 'NOVA', role: 'Solution Explorer', desc: 'Explores multiple solutions before committing' },
              { name: 'AXON', role: 'Data Architect', desc: 'Designs data models and schemas' },
              { name: 'FLUX', role: 'Feature Designer', desc: 'Defines buildable features with success criteria' },
              { name: 'PRIME', role: 'Priority Oracle', desc: 'Ranks features using RICE framework' },
              { name: 'SAGE', role: 'AI Strategist', desc: 'Identifies AI opportunities and recommends models' },
              { name: 'GHERKIN', role: 'Test Engineer', desc: 'Converts requirements into Cucumber testable scenarios' },
            ].map((agent) => (
              <div key={agent.name} className="rounded-lg border border-border/50 bg-card/20 p-4">
                <p className="font-bold text-foreground mb-1">{agent.name}</p>
                <p className="text-sm text-violet-400 mb-2">{agent.role}</p>
                <p className="text-sm text-muted-foreground">{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Technology Stack</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">AI Models:</strong> Powered by Claude 3.7 Sonnet through Vercel AI SDK, with structured generation using Zod schemas for type-safe artifacts.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Architecture:</strong> Built on Next.js 16 with React 19, using server-side streaming for real-time agent responses and client-side state management with Zustand.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Storage:</strong> Session data persists in browser localStorage, ensuring privacy—your conversations never leave your device until you explicitly export.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-violet-500/10 p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Try It Yourself
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience autonomous agent collaboration. Start with ATLAS and watch the system build your requirements.
          </p>
          <Link href="/">
            <Button size="lg">
              Get Started
              <Bot className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
