import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Gear, CloudArrowDown, Question } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { StatusIndicator, ConnectionStatus } from '@/components/StatusIndicator'
import { ContentEntryCard } from '@/components/ContentEntryCard'
import { ConfigDialog } from '@/components/ConfigDialog'
import { SetupGuideDialog } from '@/components/SetupGuideDialog'
import { contentfulService, ContentfulConfig, ContentfulEntry } from '@/lib/contentful'
import { toast } from 'sonner'

function App() {
  const [config, setConfig] = useKV<ContentfulConfig | null>('contentful-config', null)
  const [entries, setEntries] = useState<ContentfulEntry[]>([])
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [isLoading, setIsLoading] = useState(false)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [setupDialogOpen, setSetupDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const testConnection = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    const result = await contentfulService.testConnection()
    if (result.success) {
      setStatus('connected')
      toast.success('Connected to Contentful')
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Connection failed')
      toast.error('Connection failed', {
        description: result.error,
      })
    }
  }, [])

  useEffect(() => {
    if (config) {
      contentfulService.configure(config)
      testConnection()
    }
  }, [config, testConnection])

  useEffect(() => {
    if (!config) {
      setStatus('disconnected')
    }
  }, [config])

  const handleSaveConfig = useCallback((newConfig: ContentfulConfig) => {
    setConfig(newConfig)
    toast.success('Configuration saved')
  }, [setConfig])

  const fetchContent = async () => {
    if (!config) {
      toast.error('Please configure Contentful first')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    try {
      const fetchedEntries = await contentfulService.fetchEntries()
      setEntries(fetchedEntries)
      toast.success(`Fetched ${fetchedEntries.length} entries`)
    } catch (error: any) {
      setErrorMessage(error.message)
      toast.error('Failed to fetch content', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Contentful CMS Tester</h1>
              <p className="text-muted-foreground mt-1">
                Test your Contentful integration and explore your content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSetupDialogOpen(true)}>
                <Question className="mr-2" />
                Setup Guide
              </Button>
              <Button variant="outline" size="sm" onClick={() => setConfigDialogOpen(true)}>
                <Gear className="mr-2" />
                Configure
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <StatusIndicator status={status} message={errorMessage} />
            <Button
              onClick={fetchContent}
              disabled={!config || isLoading}
              className="sm:w-auto w-full"
            >
              {isLoading ? (
                <>
                  <CloudArrowDown className="mr-2 animate-bounce" />
                  Fetching...
                </>
              ) : (
                <>
                  <CloudArrowDown className="mr-2" />
                  Fetch Content
                </>
              )}
            </Button>
          </div>
        </header>

        {!config && (
          <Alert>
            <Question className="h-4 w-4" />
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription>
              Get started by configuring your Contentful API credentials. Don't have a content
              model yet? Check out the Setup Guide for step-by-step instructions.
            </AlertDescription>
          </Alert>
        )}

        {errorMessage && status === 'error' && (
          <Alert variant="destructive">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <main>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Content Entries ({entries.length})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <ContentEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ) : config && !isLoading ? (
            <Alert>
              <AlertTitle>No Content Found</AlertTitle>
              <AlertDescription>
                Your Contentful space doesn't have any published entries yet. Create some content
                in your Contentful dashboard or check out the Setup Guide for help.
              </AlertDescription>
            </Alert>
          ) : null}
        </main>
      </div>

      <ConfigDialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={handleSaveConfig}
      />

      <SetupGuideDialog open={setupDialogOpen} onOpenChange={setSetupDialogOpen} />
    </div>
  )
}

export default App