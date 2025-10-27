import { useState } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { ContentfulEntry } from '@/lib/contentful'

interface ContentEntryCardProps {
  entry: ContentfulEntry
}

export function ContentEntryCard({ entry }: ContentEntryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const fieldEntries = Object.entries(entry.fields)

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null'
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    return String(value)
  }

  const truncateValue = (value: string, maxLength: number = 100): string => {
    if (value.length <= maxLength) return value
    return value.substring(0, maxLength) + '...'
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-medium">{entry.contentType}</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            {entry.id.substring(0, 8)}
          </Badge>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground mt-2">
          <span>Created: {new Date(entry.createdAt).toLocaleDateString()}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Updated: {new Date(entry.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Fields ({fieldEntries.length})
            </span>
            {fieldEntries.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="h-6 px-2"
              >
                {expanded ? (
                  <>
                    <CaretUp className="mr-1" /> Collapse
                  </>
                ) : (
                  <>
                    <CaretDown className="mr-1" /> Expand
                  </>
                )}
              </Button>
            )}
          </div>

          {fieldEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No fields</p>
          ) : expanded ? (
            <ScrollArea className="h-[300px] w-full rounded-md border p-3">
              <div className="space-y-3">
                {fieldEntries.map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="font-mono text-xs font-medium text-primary">{key}</div>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      <code>{formatValue(value)}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-2">
              {fieldEntries.slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-mono text-xs font-medium text-primary min-w-[100px]">
                    {key}:
                  </span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">
                    {truncateValue(formatValue(value))}
                  </span>
                </div>
              ))}
              {fieldEntries.length > 3 && (
                <span className="text-xs text-muted-foreground italic">
                  +{fieldEntries.length - 3} more fields
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
