'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { Button } from '@/components/ui/button'
import { STAGES } from '@/lib/types'
import { ArrowRight, Bot, Sparkles, CheckCircle2, Zap, Clock, Target, FileText, Play, Settings, RefreshCw, Plus, AlertTriangle } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Map icon names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: require('lucide-react').Compass,
  ear: require('lucide-react').Ear,
  frame: require('lucide-react').Frame,
  users: require('lucide-react').Users,
  'shield-check': require('lucide-react').ShieldCheck,
  lightbulb: require('lucide-react').Lightbulb,
  database: require('lucide-react').Database,
  puzzle: require('lucide-react').Puzzle,
  trophy: require('lucide-react').Trophy,
  zap: Zap,
}

// Map color names to Tailwind classes with glow effects
const COLOR_MAP: Record<string, { bg: string; text: string; glow: string }> = {
  slate: { bg: 'bg-slate-500/10', text: 'text-slate-300', glow: 'shadow-slate-500/50' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-violet-500/50' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'shadow-blue-500/50' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', glow: 'shadow-teal-500/50' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'shadow-amber-500/50' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'shadow-pink-500/50' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/50' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'shadow-orange-500/50' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
}

export default function HomePage() {
  const router = useRouter()
  const { session, createSession, resetFeatureFlow, resetCompletely } = useSessionStore()
  
  const handleStart = () => {
    if (!session) {
      createSession()
    }
    router.push('/agents')
  }
  
  const handleNewFeature = () => {
    resetFeatureFlow()
    router.push('/agents')
  }
  
  const handleCompleteReset = () => {
    if (confirm('This will clear ALL progress including your project context. Are you sure?')) {
      resetCompletely()
    }
  }
  
  const handleGetStarted = () => {
    // Placeholder for handleGetStarted logic
    router.push('/agents')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
              <Bot className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground">Agent PM</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/research">
              <Button variant="ghost" size="sm" className="bg-transparent">
                Research
              </Button>
            </Link>
            {session && (
              <>
                <Button variant="outline" size="sm" onClick={() => router.push('/progress')} className="bg-transparent">
                  View Progress
                </Button>
                <Button variant="outline" size="sm" onClick={handleNewFeature} className="bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  New Feature
                </Button>
                <Button variant="outline" size="sm" onClick={handleCompleteReset} className="bg-transparent text-destructive hover:text-destructive">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset All
                </Button>
              </>
            )}
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="bg-transparent">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Agentic AI Animation */}
        <section className="relative overflow-hidden py-24 md:py-32 px-6">
          {/* Animated background with moving particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
            
            {/* Animated connection lines between agents */}
            <svg className="absolute inset-0 w-full h-full opacity-20" style={{animation: 'fadeInOut 6s ease-in-out infinite'}}>
              <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5" style={{animation: 'dash 3s linear infinite'}} />
              <line x1="80%" y1="30%" x2="80%" y2="70%" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="5,5" style={{animation: 'dash 3s linear infinite 0.5s'}} />
              <line x1="80%" y1="70%" x2="20%" y2="70%" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="5,5" style={{animation: 'dash 3s linear infinite 1s'}} />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="100%" stopColor="rgb(34, 211, 238)" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                </linearGradient>
                <linearGradient id="gradient3" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 mb-8 backdrop-blur-sm animate-slideInDown">
              <Bot className="h-4 w-4 text-violet-400 animate-bounce" />
              <span className="text-sm text-muted-foreground">10 Specialized Agentic AI Systems</span>
              <Zap className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance leading-tight animate-fadeIn">
              Product requirements built by
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradientShift">
                autonomous AI agents
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed animate-fadeIn" style={{animationDelay: '0.2s'}}>
              Watch specialized agents collaborate autonomously—each expert tackles one domain, shares context, and builds on previous insights to transform vague ideas into production-ready requirements.
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-12 text-sm text-muted-foreground animate-fadeIn" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Agents Running</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                <span>Context Flowing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400" style={{animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'}} />
                <span>Requirements Building</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {session ? (
                <>
                  <Button size="lg" onClick={() => router.push('/agents')} className="h-14 px-10 text-base group">
                    <Play className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    Continue Session
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleNewFeature} className="h-14 px-10 text-base bg-transparent">
                    <Plus className="h-5 w-5 mr-2" />
                    New Feature
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={handleGetStarted} className="h-14 px-10 text-base group">
                    <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                    Start Building Requirements
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Free for personal use · <Link href="/licensing" className="underline hover:text-foreground">Commercial license</Link> for business
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Stats with animated counters */}
        <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm py-12 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-4xl font-bold text-foreground">10</p>
                <Bot className="h-5 w-5 text-violet-400 group-hover:animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">Autonomous Agents</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-4xl font-bold text-foreground">100%</p>
                <Zap className="h-5 w-5 text-amber-400 group-hover:animate-bounce" />
              </div>
              <p className="text-sm text-muted-foreground">Auto Context Flow</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-4xl font-bold text-foreground">0</p>
                <Target className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm text-muted-foreground">Manual Handoffs</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-4xl font-bold text-foreground">∞</p>
                <Sparkles className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">Deep Insights</p>
            </div>
          </div>
        </section>

        {/* Agents Grid with Running Animations */}
        <section className="py-24 px-6 relative">
          {/* Animated workflow lines in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-violet-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite'}} />
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite 1s'}} />
            <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" style={{animation: 'slideDown 4s ease-in-out infinite 2s'}} />
          </div>
          
          <div className="mx-auto max-w-7xl relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-violet-400" style={{animation: 'blink 1.5s ease-in-out infinite'}} />
                  <div className="h-2 w-2 rounded-full bg-cyan-400" style={{animation: 'blink 1.5s ease-in-out infinite 0.3s'}} />
                  <div className="h-2 w-2 rounded-full bg-emerald-400" style={{animation: 'blink 1.5s ease-in-out infinite 0.6s'}} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Autonomous Collaboration</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Meet Your Agentic AI Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each agent runs independently, shares discoveries, and builds on previous work—no human orchestration needed.
              </p>
            </div>
            
            {/* Animated Agent Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {STAGES.map((stage, index) => {
                const IconComponent = ICON_MAP[stage.icon] || Bot
                const colors = COLOR_MAP[stage.color] || COLOR_MAP.violet
                
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6',
                      'transition-all duration-500 hover:scale-105 hover:border-foreground/20',
                      'hover:shadow-2xl cursor-pointer overflow-hidden',
                      colors.glow
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    {/* Running indicator */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100" 
                         style={{animation: 'slideRight 2s ease-in-out infinite'}} />
                    
                    {/* Pulse effect on hover */}
                    <div className={cn(
                      'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                      'bg-gradient-to-br from-transparent via-foreground/5 to-transparent',
                      'animate-pulse'
                    )} />
                    
                    {/* Active status indicator */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className={cn('h-1.5 w-1.5 rounded-full animate-ping', colors.text)} />
                        <span className={cn('text-xs font-medium', colors.text)}>Running</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      {/* Agent Number Badge */}
                      <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-border text-xs font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      
                      {/* Icon with glow */}
                      <div className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl mb-4 transition-all duration-300',
                        'group-hover:scale-110 group-hover:shadow-lg',
                        colors.bg,
                        colors.glow
                      )}>
                        <IconComponent className={cn('h-8 w-8', colors.text)} />
                      </div>
                      
                      {/* Agent Name */}
                      <div className="mb-3">
                        <p className={cn('text-sm font-bold uppercase tracking-wider mb-1', colors.text)}>
                          {stage.agentName}
                        </p>
                        <h3 className="text-xl font-semibold text-foreground">{stage.name}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {stage.intro}
                      </p>
                      
                      {/* Output */}
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">Delivers:</span> {stage.deliverable}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-24 px-6 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Why Agent PM?
                </h2>
                <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                  Most product ideas fail not because they're bad, but because they're poorly defined. Teams skip critical thinking steps and build the wrong thing.
                </p>
                <Link href="/research" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Learn why poor requirements cost millions →</span>
                </Link>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Challenge Assumptions</p>
                      <p className="text-muted-foreground">Probing questions force you to validate your thinking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Structured Output</p>
                      <p className="text-muted-foreground">Machine-readable JSON ready for engineering tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Kill Weak Ideas Early</p>
                      <p className="text-muted-foreground">Validation agent tells you to Proceed, Pivot, or Kill</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform">
                  <Clock className="h-10 w-10 text-violet-400 mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-1">Hours</p>
                  <p className="text-sm text-muted-foreground">Not weeks for a complete PRD</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform">
                  <Target className="h-10 w-10 text-teal-400 mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-1">Focused</p>
                  <p className="text-sm text-muted-foreground">Each agent masters one domain</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform">
                  <Sparkles className="h-10 w-10 text-amber-400 mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-1">Smart</p>
                  <p className="text-sm text-muted-foreground">Context flows automatically</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform">
                  <FileText className="h-10 w-10 text-emerald-400 mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-1">Ready</p>
                  <p className="text-sm text-muted-foreground">Export PRD for engineering</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to build better products?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with your first agent. No credit card required.
            </p>
            <Button size="lg" onClick={handleStart} className="h-14 px-10 text-base">
              Start Building Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out forwards;
        }
        
        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
