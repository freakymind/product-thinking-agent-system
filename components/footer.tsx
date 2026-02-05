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
              <span className="text-xl font-bold text-foreground">Requirements Discovery Tool</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Internal product thinking system. Nine specialized AI agents guide teams through structured requirements discovery and documentation.
            </p>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About This Tool
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Agent Hub
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          
          {/* System */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">System</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Progress
                </Link>
              </li>
              <li>
                <Link href="/export" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Export
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              Internal Requirements Discovery Tool · Version 1.0
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by AI-guided discovery framework
          </p>
        </div>
      </div>
    </footer>
  )
}
