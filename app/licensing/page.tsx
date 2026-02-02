'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { Check, X, ArrowLeft, Sparkles, Users, Building2, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LicensingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/')}
            className="bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-muted-foreground">Fair & Transparent Pricing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Choose Your License
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Free for personal use. Pay for commercial use. Simple, transparent, fair.
            </p>
          </div>

          {/* License Comparison */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Personal */}
            <div className="rounded-2xl border border-border bg-card/30 p-8">
              <div className="mb-6">
                <Zap className="h-10 w-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Personal</h3>
                <div className="text-4xl font-bold text-foreground mb-2">Free</div>
                <p className="text-sm text-muted-foreground">Forever</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">All 10 AI agents</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Unlimited requirements</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Use your own API keys</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Export to Markdown/JSON</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Privacy-first architecture</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Commercial use</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Team features</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/">Start Free</Link>
              </Button>
            </div>

            {/* Team */}
            <div className="rounded-2xl border-2 border-violet-500/50 bg-card/30 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <Users className="h-10 w-10 text-violet-400 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Team</h3>
                <div className="text-4xl font-bold text-foreground mb-2">$299</div>
                <p className="text-sm text-muted-foreground">per year, up to 10 users</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Everything in Personal</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Commercial use rights</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Up to 10 team members</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Shared workspaces (coming soon)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Priority email support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Early access to new agents</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <a href="mailto:license@agentpm.com?subject=Team License Inquiry">
                  Get Team License
                </a>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-border bg-card/30 p-8">
              <div className="mb-6">
                <Building2 className="h-10 w-10 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-foreground mb-2">Custom</div>
                <p className="text-sm text-muted-foreground">Let's talk</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Everything in Team</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Unlimited users</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Self-hosted option</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">SSO/SAML integration</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Custom agents</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">SLA + priority support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Training & onboarding</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="mailto:enterprise@agentpm.com?subject=Enterprise Inquiry">
                  Contact Sales
                </a>
              </Button>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What counts as commercial use?
                </h3>
                <p className="text-muted-foreground">
                  If you're using Agent PM to create requirements for products/services you sell, for client work, or within a for-profit company, that's commercial use and requires a paid license.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I try it before buying?
                </h3>
                <p className="text-muted-foreground">
                  Yes! The free personal license includes all features. Use it to evaluate. When you're ready for commercial use, purchase a license.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-muted-foreground">
                  Yes, 30-day money-back guarantee. If it doesn't work for you, email us for a full refund.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What if I'm building an open source project?
                </h3>
                <p className="text-muted-foreground">
                  Open source projects qualify for the free personal license, even if you have sponsors or donations. The project itself must be open source.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I modify the code with a commercial license?
                </h3>
                <p className="text-muted-foreground">
                  Yes, commercial licenses include modification rights for internal use. You cannot resell or redistribute the modified code.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card/30 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Why not just make it fully open source?
                </h3>
                <p className="text-muted-foreground">
                  We want to keep developing Agent PM full-time. The agent prompts, orchestration methodology, and continuous innovation have real value. This model lets us give it away for personal use while sustaining development through commercial licensing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center rounded-2xl border border-border bg-card/30 p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Questions about licensing?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're here to help. Reach out and we'll find the right license for your needs.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <a href="mailto:license@agentpm.com">
                  Email: license@agentpm.com
                </a>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/about">
                  Learn More About Agent PM
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
