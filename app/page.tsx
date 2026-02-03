'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSessionStore } from '@/lib/session-store'
import { Button } from '@/components/ui/button'
import { STAGES } from '@/lib/types'
import { ArrowRight, Bot, Sparkles, Zap, Play, Settings, RefreshCw, Plus, Target, AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Footer from '@/components/footer'

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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Requirements Platform</span>
          </div>
          <div className="flex items-center gap-3">
            {session && (
              <>
                <Button variant="outline" size="sm" onClick={handleNewFeature} className="bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  New Session
                </Button>
                <Button variant="outline" size="sm" onClick={handleCompleteReset} className="bg-transparent text-muted-foreground hover:text-destructive">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
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
        {/* Hero Section - Enterprise */}
        <section className="relative overflow-hidden py-20 px-6">
          {/* Subtle background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4 text-balance">
                AI-Powered Requirements Engineering
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Transform product ideas into structured requirements through guided conversations with specialized AI agents. Each agent focuses on a specific domain to ensure comprehensive, validated output.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {session ? (
                  <>
                    <Button size="lg" onClick={() => router.push('/agents')} className="h-12 px-8 text-base">
                      Continue Session
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleNewFeature} className="h-12 px-8 text-base bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </>
                ) : (
                  <Button size="lg" onClick={handleGetStarted} className="h-12 px-8 text-base">
                    Start New Session
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-y border-border/50 bg-card/20 py-12 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">10</p>
              <p className="text-sm text-muted-foreground">Specialized Agents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">100%</p>
              <p className="text-sm text-muted-foreground">Structured Output</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">0</p>
              <p className="text-sm text-muted-foreground">Manual Handoffs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground mb-1">JSON</p>
              <p className="text-sm text-muted-foreground">Export Format</p>
            </div>
          </div>
        </section>

        {/* Agents Overview */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Agent Workflow
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ten specialized agents guide you through a structured requirements discovery process.
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
                    className="rounded-lg border border-border/50 bg-card/30 p-5 hover:border-border transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded bg-muted text-xs font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colors.bg)}>
                        <IconComponent className={cn('h-5 w-5', colors.text)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-semibold uppercase tracking-wide mb-0.5', colors.text)}>
                          {stage.agentName}
                        </p>
                        <h3 className="text-sm font-semibold text-foreground">{stage.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {stage.description}
                    </p>
                    
                    <div className="pt-2 border-t border-border/30">
                      <p className="text-xs text-muted-foreground/70">
                        <span className="font-medium text-foreground">Output: </span>
                        {stage.deliverable}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

      </main>

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
