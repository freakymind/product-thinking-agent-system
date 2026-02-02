'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Key, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function SettingsPage() {
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('gpt-4')
  const [temperature, setTemperature] = useState('0.7')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('llm_api_key', apiKey)
      localStorage.setItem('llm_model', model)
      localStorage.setItem('llm_temperature', temperature)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  // Load from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('llm_api_key')
      const savedModel = localStorage.getItem('llm_model')
      const savedTemp = localStorage.getItem('llm_temperature')
      
      if (savedKey) setApiKey(savedKey)
      if (savedModel) setModel(savedModel)
      if (savedTemp) setTemperature(savedTemp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">LLM Configuration</h1>
          <p className="text-muted-foreground">
            Configure your LLM provider settings. These credentials are stored locally in your browser.
          </p>
        </div>

        <div className="space-y-6">
          {/* API Key Section */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">API Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your OpenAI or compatible API key
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Deterministic (0)</span>
                  <span>Creative (2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Advanced Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Streaming Responses</p>
                  <p className="text-xs text-muted-foreground">Enable real-time response streaming</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Context Memory</p>
                  <p className="text-xs text-muted-foreground">Remember conversation context</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
            {saved && (
              <span className="text-sm text-emerald-500 font-medium">Saved successfully!</span>
            )}
          </div>

          {/* Warning */}
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
            <p className="text-sm text-amber-400">
              <strong>Privacy Note:</strong> Your API keys are stored locally in your browser and never sent to our servers. They are only used to make direct API calls to your chosen LLM provider.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
