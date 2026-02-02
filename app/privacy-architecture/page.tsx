import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Database, Zap, CheckCircle2, Eye, Server, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'

export default function PrivacyArchitecturePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold">Privacy Architecture</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-6">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Zero-Knowledge Architecture</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Privacy-First Architecture
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A technical deep dive into how Agent PM keeps your data completely private through browser-only storage and direct API integration.
          </p>
        </div>

        {/* Architecture Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Option 1 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                  <Lock className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Your Own API Keys</h3>
                  <p className="text-sm text-muted-foreground">Maximum privacy & control</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">Keys stored only in browser localStorage</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">Direct API calls: Browser → LLM Provider</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">We never see your keys or data</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">You control billing & access</p>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20">
                  <Zap className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Vercel AI Gateway</h3>
                  <p className="text-sm text-muted-foreground">Zero setup required</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">Works immediately, no configuration</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">Routes through Vercel infrastructure</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">We don't log or store conversations</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">Supports multiple LLM providers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Diagram */}
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="font-bold text-foreground mb-6 text-center">Data Flow (Your API Keys)</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-foreground">Your Browser</p>
                <p className="text-xs text-muted-foreground">localStorage only</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-emerald-500" />
                <span className="text-xs font-medium text-muted-foreground">HTTPS</span>
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-emerald-500" />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-8 w-8 text-emerald-400" />
                </div>
                <p className="text-sm font-semibold text-foreground">LLM Provider</p>
                <p className="text-xs text-muted-foreground">OpenAI, Anthropic, etc.</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Eye className="h-4 w-4 text-red-400" />
                <span className="text-muted-foreground">Agent PM servers</span>
                <span className="text-red-400 font-semibold">= Not in the path</span>
              </div>
            </div>
          </div>
        </section>

        {/* Storage Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">What Gets Stored Where</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3 mb-3">
                <Database className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Browser localStorage</h3>
                  <p className="text-sm text-muted-foreground mb-3">Stored on YOUR device only</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>All conversation messages</li>
                    <li>Generated artifacts (requirements, schemas, features)</li>
                    <li>Session state and progress</li>
                    <li>Your API keys (if provided)</li>
                    <li>Application preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-5">
              <div className="flex items-start gap-3 mb-3">
                <Server className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Servers</h3>
                  <p className="text-sm text-muted-foreground mb-3">Stateless - serve app code only</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li><strong className="text-foreground">No database</strong> - we don't store user data</li>
                    <li><strong className="text-foreground">No logging</strong> - conversations not recorded</li>
                    <li><strong className="text-foreground">No authentication</strong> - no accounts to breach</li>
                    <li>Only serve HTML, CSS, JavaScript files</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Verify Our Claims</h2>
          
          <div className="grid gap-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">1. Check Network Activity</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Open DevTools (F12) → Network tab → Start a conversation
              </p>
              <div className="rounded bg-muted p-3 font-mono text-xs">
                You'll see: <span className="text-emerald-400">api.openai.com</span> or <span className="text-emerald-400">api.anthropic.com</span>
                <br />
                You won't see: requests to our servers with your data
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">2. Inspect localStorage</h3>
              <p className="text-sm text-muted-foreground mb-2">
                DevTools → Console → Run this command:
              </p>
              <div className="rounded bg-muted p-3 font-mono text-xs">
                localStorage.getItem('product-coach-session')
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You'll see all your data stored locally in JSON format
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">3. Review the Code</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Check these files in the codebase:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">/lib/session-store.ts</code> - localStorage logic</li>
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">/app/api/chat/[stage]/route.ts</code> - API route (no DB)</li>
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">/lib/ai-config.ts</code> - LLM configuration</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">4. Monitor API Usage</h3>
              <p className="text-sm text-muted-foreground">
                When using your own keys, check your OpenAI/Anthropic dashboard. You'll see API calls originating from your IP address, not ours. This proves direct browser-to-LLM communication.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technical Implementation</h2>
          
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Frontend</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Next.js 16 (App Router)</li>
                  <li>• Browser localStorage API</li>
                  <li>• Direct fetch() calls to LLM APIs</li>
                  <li>• No external analytics or tracking</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Backend</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Stateless API routes</li>
                  <li>• No database connections</li>
                  <li>• No session storage</li>
                  <li>• Vercel AI SDK for LLM routing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Try It?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience truly private product requirement generation. Your ideas stay yours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Get Started
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="lg" className="bg-transparent">
                Read Privacy Policy
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
