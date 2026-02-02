'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { ArrowLeft, Bot } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
              <Bot className="h-5 w-5 text-violet-400" />
            </div>
            <span className="text-xl font-bold text-foreground">Agent PM</span>
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
          <h1 className="text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy-First Architecture</h2>
            <p className="text-muted-foreground mb-4">
              Agent PM is built with a <strong className="text-foreground">zero-knowledge architecture</strong>. Your product ideas and requirements never touch our servers. Here's how it works:
            </p>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Two Privacy Options</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Option 1: Use Your Own API Keys (Maximum Privacy)</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Go to Settings and enter your OpenAI, Anthropic, or compatible API key</li>
                    <li>Your key is stored ONLY in your browser's localStorage</li>
                    <li>API calls go <strong className="text-foreground">directly from your browser to the LLM provider</strong></li>
                    <li>We never see your API key, prompts, or responses</li>
                    <li>You control the billing and can revoke access anytime</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Option 2: Use Vercel AI Gateway (Default)</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Works automatically with no setup required</li>
                    <li>Prompts route through Vercel's infrastructure</li>
                    <li>We do not log, access, or store your conversations</li>
                    <li>Supports: OpenAI, Anthropic, Google, AWS Bedrock, Fireworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Where Your Data Lives</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">100% Browser-Based Storage:</strong> All your conversations, requirements, agent artifacts, and session data are stored exclusively in your browser's localStorage. This means:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Data never leaves your device (except API calls to LLM providers)</li>
                <li>We cannot access, view, or retrieve your data</li>
                <li>Clear your browser data = permanent deletion</li>
                <li>Export your PRDs anytime for local backups</li>
              </ul>
              
              <p className="text-muted-foreground mt-4">
                <strong className="text-foreground">No Server-Side Storage:</strong> We operate a <strong className="text-foreground">stateless architecture</strong>. Our servers only serve the application code (HTML, CSS, JavaScript). They never receive, process, or store your requirements or conversations.
              </p>
              
              <p className="text-muted-foreground mt-4">
                <strong className="text-foreground">Direct API Integration:</strong> When using your own API keys, your browser makes direct HTTPS calls to your chosen LLM provider (OpenAI, Anthropic, etc.). The request flow is: Your Browser → LLM Provider → Your Browser. We are not in the middle.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data We Collect</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Analytics:</strong> We use Vercel Analytics to understand basic usage patterns (page views, navigation) to improve the product. This data is anonymized and does not include your conversations or requirements.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Cookies:</strong> We use minimal cookies for theme preferences (dark/light mode) and session management. No tracking cookies are used.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Vercel:</strong> Hosts our application and provides analytics.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Anthropic Claude:</strong> Powers the AI agents. Messages are processed according to Anthropic's privacy policy and are not used to train models.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Access:</strong> All your data is accessible directly in your browser. You can view, export, or delete it at any time.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Deletion:</strong> Clear your browser's localStorage or use the "Reset All" button in the app to permanently delete all your data.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Portability:</strong> Export your PRDs and requirements as Markdown or JSON files at any time.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Verify Our Claims</h2>
            <p className="text-muted-foreground mb-3">
              Don't just take our word for it. You can verify our privacy claims:
            </p>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">1. Check Browser Network Tab</p>
                <p className="text-sm text-muted-foreground">
                  Open DevTools → Network. You'll see API calls going directly to api.openai.com or api.anthropic.com (when using your keys). No data sent to our servers.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">2. Inspect localStorage</p>
                <p className="text-sm text-muted-foreground">
                  Open DevTools → Console → Type: <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage.getItem('product-coach-session')</code>
                  <br />You'll see all your data is stored locally in your browser.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">3. Review Source Code</p>
                <p className="text-sm text-muted-foreground">
                  The codebase is visible in v0.dev. Check /app/api/chat/[stage]/route.ts for API logic and /lib/session-store.ts for storage. No databases in sight.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">4. Monitor Your API Usage</p>
                <p className="text-sm text-muted-foreground">
                  When using your own keys, check your OpenAI/Anthropic dashboard. You'll see API calls from your IP address, not ours.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Security</h2>
            <p className="text-muted-foreground mb-3">
              We use industry-standard security practices including HTTPS encryption, secure headers, and regular security updates.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              <li><strong className="text-foreground">HTTPS Everywhere:</strong> All connections are encrypted</li>
              <li><strong className="text-foreground">No Authentication Required:</strong> No account creation means no password breaches</li>
              <li><strong className="text-foreground">Client-Side Only:</strong> Your data never transits our servers</li>
              <li><strong className="text-foreground">Regular Updates:</strong> Security patches applied promptly</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Since data is stored locally in your browser, the security of your data also depends on your device security. Use device encryption, strong passwords, and keep your OS updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy or how your data is handled, please contact us through the feedback form on our main site.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
