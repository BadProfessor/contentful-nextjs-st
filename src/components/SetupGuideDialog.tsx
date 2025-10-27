import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle } from '@phosphor-icons/react'

interface SetupGuideDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SetupGuideDialog({ open, onOpenChange }: SetupGuideDialogProps) {
  const exampleContentModel = {
    name: 'Blog Post',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
      },
      {
        id: 'author',
        name: 'Author',
        type: 'Symbol',
        required: false,
      },
      {
        id: 'publishDate',
        name: 'Publish Date',
        type: 'Date',
        required: false,
      },
      {
        id: 'excerpt',
        name: 'Excerpt',
        type: 'Text',
        required: false,
      },
      {
        id: 'body',
        name: 'Body',
        type: 'RichText',
        required: true,
      },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Contentful Setup Guide</DialogTitle>
          <DialogDescription>
            Step-by-step guide to create your first content model in Contentful
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                  1
                </span>
                Create a Contentful Account
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                If you don't have one, sign up at{' '}
                <a
                  href="https://www.contentful.com/sign-up/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  contentful.com/sign-up
                </a>
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                  2
                </span>
                Get Your API Keys
              </h3>
              <div className="text-sm text-muted-foreground ml-8 space-y-2">
                <p>In your Contentful dashboard:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to Settings → API keys</li>
                  <li>Click "Add API key"</li>
                  <li>Copy your Space ID and Content Delivery API access token</li>
                  <li>Use these in the "Configure Contentful" dialog</li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                  3
                </span>
                Create a Content Model
              </h3>
              <div className="text-sm text-muted-foreground ml-8 space-y-2">
                <p>Create your first content type:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to Content model tab</li>
                  <li>Click "Add content type"</li>
                  <li>Give it a name (e.g., "Blog Post")</li>
                  <li>Add fields to your content type</li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                  4
                </span>
                Example Content Model
              </h3>
              <Alert className="ml-8">
                <AlertTitle className="text-sm">Blog Post Example</AlertTitle>
                <AlertDescription>
                  <pre className="text-xs mt-2 bg-muted p-3 rounded overflow-x-auto">
                    <code>{JSON.stringify(exampleContentModel, null, 2)}</code>
                  </pre>
                </AlertDescription>
              </Alert>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                  5
                </span>
                Add Sample Content
              </h3>
              <div className="text-sm text-muted-foreground ml-8 space-y-2">
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to Content tab</li>
                  <li>Click "Add entry"</li>
                  <li>Select your content type</li>
                  <li>Fill in the fields</li>
                  <li>Click "Publish"</li>
                </ol>
              </div>
            </div>

            <Separator />

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-sm text-green-800">Ready to Test!</AlertTitle>
              <AlertDescription className="text-xs text-green-700">
                Once you've created and published content, configure this app with your API keys
                and click "Fetch Content" to see your entries.
              </AlertDescription>
            </Alert>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
