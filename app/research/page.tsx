'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingDown, AlertTriangle, DollarSign, Clock, Target, CheckCircle2, XCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function ResearchPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Button variant="ghost" onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5 mb-6">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Research-Backed Insights</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            The Hidden Cost of{' '}
            <span className="text-destructive">Poor Requirements</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most product failures don't happen in development—they happen before a single line of code is written.
          </p>
        </div>

        {/* Key Stats */}
        <section className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <DollarSign className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-4xl font-bold text-foreground mb-2">$1M+</p>
            <p className="text-sm text-muted-foreground">Average cost of requirement defects in large projects</p>
          </div>
          
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-center">
            <Clock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-foreground mb-2">40-60%</p>
            <p className="text-sm text-muted-foreground">Of project delays traced back to poor requirements</p>
          </div>
          
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 text-center">
            <TrendingDown className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-foreground mb-2">70%</p>
            <p className="text-sm text-muted-foreground">Of failed projects cite inadequate requirements</p>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Why Requirements Fail</h2>
          
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/20 p-3">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ambiguity & Vagueness</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    "Make it user-friendly" or "improve performance" mean different things to different people. 
                    Vague requirements lead to misalignment between stakeholders, designers, and engineers.
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    Result: Rework costs increase by 100x when caught after deployment vs. during requirements phase
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/20 p-3">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Unvalidated Assumptions</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Teams assume they know what users need without talking to them. They build features based on 
                    internal opinions rather than external evidence.
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    Result: 64% of features are rarely or never used (Standish Group, 2020)
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/20 p-3">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Skipping Critical Questions</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Rushing to implementation without understanding the job-to-be-done, validating market size, 
                    or prioritizing features based on impact.
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    Result: 45% of product features miss their business objectives (ProductPlan, 2021)
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-destructive/20 p-3">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Structured Methodology</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Ad-hoc requirement gathering leads to incomplete documentation, missing edge cases, 
                    and poor traceability from user needs to features.
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    Result: Requirements defects cost 4-5x more to fix than design defects, 10x more than code defects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Impact */}
        <section className="mb-16 rounded-xl border border-destructive/30 bg-destructive/5 p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Real-World Impact</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Financial Waste</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Standish Group's CHAOS Report found that organizations waste <strong>$260 billion annually</strong> on 
                failed IT projects, with poor requirements being the #1 cause. For every dollar spent on requirements, 
                you save $10-$100 in later rework.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Timeline Delays</h3>
              <p className="text-muted-foreground leading-relaxed">
                McKinsey research shows that large IT projects run 45% over budget and 7% over time on average, while 
                delivering 56% less value than predicted. Requirements volatility (changing requirements mid-project) 
                is cited as the leading cause.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Product Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                A study by the Project Management Institute found that <strong>47% of unsuccessful projects</strong> fail 
                because of poor requirements management. These products ship with missing features, wrong features, 
                or features that don't solve the actual user problem.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Team Morale</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building the wrong thing demoralizes teams. Engineers waste time implementing features that get scrapped. 
                Designers create experiences that miss the mark. Product managers lose credibility when launches fail.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Solution: Rigorous Discovery</h2>
          
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Structured Methodology</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Following a proven framework ensures you ask the right questions in the right order. 
                    From context to prioritization, each step builds on the last.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Challenge Assumptions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Having dedicated agents that push back on vague answers forces clarity. 
                    Validation agents explicitly ask "Is this worth building?" before committing resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Evidence Over Opinions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Collecting user signals, defining JTBD, and RICE scoring features creates an 
                    evidence-based foundation that reduces subjective decision-making.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Documented & Traceable</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Structured output means every requirement traces back to a user need, problem statement, 
                    and business goal. No orphaned features or mystery decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-16 rounded-xl border border-border bg-card/50 p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Research Sources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Standish Group CHAOS Report (2020) - IT Project Success Rates</li>
            <li>• McKinsey & Company (2021) - Delivering Large-Scale IT Projects on Time, on Budget, and on Value</li>
            <li>• Project Management Institute (PMI) - Pulse of the Profession Report</li>
            <li>• ProductPlan State of Product Management Report (2021)</li>
            <li>• IEEE Software Engineering Standards - Requirements Engineering Best Practices</li>
            <li>• Capers Jones - Software Engineering Best Practices (2010)</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-12">
          <Target className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Build Better Requirements
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use Agent PM's structured discovery process to avoid these costly mistakes. 
            9 specialized agents ensure you ask the right questions before building.
          </p>
          <Button size="lg" onClick={() => router.push('/')}>
            Start Your Discovery Process
          </Button>
        </section>
      </main>
    </div>
  )
}
