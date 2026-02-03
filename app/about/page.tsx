'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, Bot, Cpu, Network, Sparkles, Zap, Lock } from 'lucide-react'
import Footer from '@/components/footer' // Import the Footer component

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Requirements Platform</span>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Platform Overview
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI-powered requirements engineering platform using specialized agents for structured, validated product specifications.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">The Problem We Solve</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Most product failures aren't due to bad ideas—they fail because of poor requirements. Teams rush to solutions without understanding the problem, skip validation, and build features based on assumptions rather than evidence.
            </p>
            <p className="text-muted-foreground">
              Traditional requirements processes are manual, time-consuming, and inconsistent. Different PMs follow different frameworks, leading to incomplete documentation and missed critical thinking steps.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">How Agentic AI Works</h2>
          
          <div className="space-y-6">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
                  <Network className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Autonomous Collaboration</h3>
                  <p className="text-muted-foreground">
                    Unlike traditional chatbots that need constant prompting, Agent PM uses 10 specialized agents that work autonomously. Each agent is an expert in one domain—signal collection, problem framing, validation, solution design, etc.
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">Context Handoffs</h3>
                  <p className="text-muted-foreground">
                    When you talk to an agent, it automatically receives everything previous agents discovered. No copy-paste, no re-explaining—agents read each other's work and build on it. This creates a cumulative intelligence that gets smarter with each conversation.
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">Structured Generation</h3>
                  <p className="text-muted-foreground">
                    Each agent generates structured artifacts (not just chat responses). These artifacts—problem statements, JTBD frameworks, RICE scores, data schemas—become building blocks for your final PRD. The system synthesizes them into a comprehensive requirements document.
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">AI Strategy Integration</h3>
                  <p className="text-muted-foreground">
                    After requirements are complete, SAGE (our AI Strategist) analyzes your solution and recommends where AI/ML can add value. It suggests specific models (GPT-4, Claude, BERT, etc.), implementation approaches, and data requirements—making AI integration part of your planning, not an afterthought.
                  </p>
                </div>
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

      </main>
    </div>
  )
}
