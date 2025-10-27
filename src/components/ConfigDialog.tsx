import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from '@phosphor-icons/react'
import type { ContentfulConfig } from '@/lib/contentful'

interface ConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (config: ContentfulConfig) => void
}

export function ConfigDialog({ open, onOpenChange, onSave }: ConfigDialogProps) {
  const [config] = useKV<ContentfulConfig | null>('contentful-config', null)
  const [spaceId, setSpaceId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [environment, setEnvironment] = useState('master')

  useEffect(() => {
    if (config) {
      setSpaceId(config.spaceId || '')
      setAccessToken(config.accessToken || '')
      setEnvironment(config.environment || 'master')
    }
  }, [config, open])

  const handleSave = () => {
    if (!spaceId || !accessToken) return

    onSave({
      spaceId: spaceId.trim(),
      accessToken: accessToken.trim(),
      environment: environment.trim() || 'master',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Contentful</DialogTitle>
          <DialogDescription>
            Enter your Contentful Space ID and Content Delivery API access token
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Find these in your Contentful dashboard under Settings → API keys
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="space-id">Space ID *</Label>
            <Input
              id="space-id"
              placeholder="your_space_id"
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-token">Content Delivery API Access Token *</Label>
            <Input
              id="access-token"
              type="password"
              placeholder="your_access_token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Environment</Label>
            <Input
              id="environment"
              placeholder="master"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Default: master</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!spaceId || !accessToken}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
