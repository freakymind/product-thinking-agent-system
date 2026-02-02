'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { ArrowLeft, Bot } from 'lucide-react'

export default function TermsPage() {
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
          <h1 className="text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Agent PM, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Permission is granted to use Agent PM for commercial or personal purposes, subject to the following restrictions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>You may not modify or copy the materials or software</li>
                <li>You may not attempt to reverse engineer the system</li>
                <li>You may not remove any proprietary notations from the materials</li>
                <li>You may not transfer the materials to another person or entity</li>
              </ul>
              <p className="text-muted-foreground">
                The materials and outputs you create (PRDs, requirements documents) are yours to use as you see fit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Availability</h2>
            <p className="text-muted-foreground">
              Agent PM is provided "as is" without any guarantees of availability, accuracy, or uptime. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">AI-Generated Content</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Agent PM uses AI models to generate requirements and recommendations. You acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>AI-generated content may contain errors or inaccuracies</li>
                <li>You are responsible for reviewing and validating all outputs</li>
                <li>We do not guarantee the quality, correctness, or completeness of AI-generated content</li>
                <li>AI recommendations (including AI strategy suggestions) should be validated by domain experts</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Your Content:</strong> You retain all rights to the requirements, ideas, and documents you create using Agent PM.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Our Platform:</strong> The Agent PM platform, including its agent architecture, prompts, and system design, is proprietary and protected by copyright.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Uses</h2>
            <p className="text-muted-foreground">
              You may not use Agent PM to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Generate content that is illegal, harmful, or violates others' rights</li>
              <li>Attempt to overwhelm or abuse the service</li>
              <li>Reverse engineer or extract the agent prompts or system architecture</li>
              <li>Use automated tools to scrape or extract data from the service</li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
            <p className="text-muted-foreground">
              The materials and AI-generated content on Agent PM are provided on an "as is" basis. Agent PM makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall Agent PM or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Agent PM, even if Agent PM or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Modifications</h2>
            <p className="text-muted-foreground">
              Agent PM may revise these terms of service at any time without notice. By using Agent PM, you agree to be bound by the current version of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us through the feedback form on our main site.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
