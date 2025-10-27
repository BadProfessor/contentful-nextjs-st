import { createClient, Entry } from 'contentful'

export interface ContentfulConfig {
  spaceId: string
  accessToken: string
  environment?: string
}

export interface ContentfulEntry {
  id: string
  contentType: string
  createdAt: string
  updatedAt: string
  fields: Record<string, any>
}

export class ContentfulService {
  private config: ContentfulConfig | null = null
  private client: any = null

  configure(config: ContentfulConfig) {
    this.config = config
    this.client = createClient({
      space: config.spaceId,
      accessToken: config.accessToken,
      environment: config.environment || 'master',
    })
  }

  isConfigured(): boolean {
    return this.client !== null
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.client) {
      return { success: false, error: 'Client not configured' }
    }

    try {
      await this.client.getSpace()
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to connect to Contentful',
      }
    }
  }

  async fetchEntries(): Promise<ContentfulEntry[]> {
    if (!this.client) {
      throw new Error('Contentful client not configured')
    }

    try {
      const response = await this.client.getEntries({ limit: 100 })

      return response.items.map((entry: Entry<any>) => ({
        id: entry.sys.id,
        contentType: entry.sys.contentType.sys.id,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        fields: entry.fields,
      }))
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch entries')
    }
  }

  async fetchContentTypes(): Promise<any[]> {
    if (!this.client) {
      throw new Error('Contentful client not configured')
    }

    try {
      const response = await this.client.getContentTypes()
      return response.items
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch content types')
    }
  }
}

export const contentfulService = new ContentfulService()
