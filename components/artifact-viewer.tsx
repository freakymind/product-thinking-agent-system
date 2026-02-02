'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { StageId } from '@/lib/types'
import { Copy, Check, ChevronDown, ChevronRight, FileJson, Table } from 'lucide-react'

interface ArtifactViewerProps {
  stageId: StageId
  artifact: unknown
}

export function ArtifactViewer({ stageId, artifact }: ArtifactViewerProps) {
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'formatted' | 'json'>('formatted')

  if (!artifact) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p className="text-center">
          Complete the conversation and generate the artifact<br />
          to see the structured output here.
        </p>
      </div>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(artifact, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">Generated Artifact</h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-0.5">
            <button
              onClick={() => setViewMode('formatted')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                viewMode === 'formatted' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Table className="h-3 w-3 inline mr-1" />
              Formatted
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                viewMode === 'json' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <FileJson className="h-3 w-3 inline mr-1" />
              JSON
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'json' ? (
          <pre className="text-xs font-mono bg-secondary/50 rounded-lg p-4 overflow-x-auto">
            {JSON.stringify(artifact, null, 2)}
          </pre>
        ) : (
          <FormattedView stageId={stageId} data={artifact} />
        )}
      </div>
    </div>
  )
}

function FormattedView({ stageId, data }: { stageId: StageId; data: unknown }) {
  const obj = data as Record<string, unknown>
  
  return (
    <div className="space-y-4">
      {Object.entries(obj).map(([key, value]) => (
        <FieldRenderer key={key} fieldKey={key} value={value} />
      ))}
    </div>
  )
}

function FieldRenderer({ fieldKey, value, depth = 0 }: { fieldKey: string; value: unknown; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)
  
  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return (
      <div className={cn('rounded-lg border border-border bg-card p-3', depth > 0 && 'ml-4')}>
        <dt className="text-xs font-medium text-muted-foreground mb-1">{formatKey(fieldKey)}</dt>
        <dd className="text-sm text-foreground">{String(value)}</dd>
      </div>
    )
  }

  if (Array.isArray(value)) {
    return (
      <div className={cn('rounded-lg border border-border bg-card overflow-hidden', depth > 0 && 'ml-4')}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-3 hover:bg-secondary/50 transition-colors"
        >
          <span className="text-sm font-medium text-foreground">{formatKey(fieldKey)}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{value.length} items</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>
        {isExpanded && (
          <div className="border-t border-border p-3 space-y-2">
            {value.map((item, index) => (
              <div key={index}>
                {typeof item === 'object' && item !== null ? (
                  <div className="rounded-lg border border-border/50 bg-secondary/30 p-3 space-y-2">
                    {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
                      <FieldRenderer key={k} fieldKey={k} value={v} depth={depth + 1} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md bg-secondary/50 px-3 py-2 text-sm">
                    {String(item)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (typeof value === 'object') {
    return (
      <div className={cn('rounded-lg border border-border bg-card overflow-hidden', depth > 0 && 'ml-4')}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-3 hover:bg-secondary/50 transition-colors"
        >
          <span className="text-sm font-medium text-foreground">{formatKey(fieldKey)}</span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {isExpanded && (
          <div className="border-t border-border p-3 space-y-2">
            {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
              <FieldRenderer key={k} fieldKey={k} value={v} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}
