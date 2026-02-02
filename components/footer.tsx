import Link from 'next/link'
import { Bot } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
                <Bot className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-xl font-bold text-foreground">Agent PM</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Transform ideas into production-ready requirements with 10 specialized AI agents. 
              No orchestration needed—agents collaborate autonomously to build comprehensive PRDs.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-architecture" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  Privacy Architecture ↗
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                  Licensing & Pricing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground mb-1">
              © {new Date().getFullYear()} Agent PM. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Free for personal use · <Link href="/licensing" className="underline hover:text-foreground">Commercial license required</Link> for business use
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with agentic AI architecture
          </p>
        </div>
      </div>
    </footer>
  )
}
