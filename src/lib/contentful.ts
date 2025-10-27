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

  configure(config: ContentfulConfig) {
    this.config = config
  }

  isConfigured(): boolean {
    return this.config !== null
  }

  private getBaseUrl(): string {
    if (!this.config) {
      throw new Error('Client not configured')
    }
    const environment = this.config.environment || 'master'
    return `https://cdn.contentful.com/spaces/${this.config.spaceId}/environments/${environment}`
  }

  private async fetchFromContentful(endpoint: string): Promise<any> {
    if (!this.config) {
      throw new Error('Client not configured')
    }

    const url = `${this.getBaseUrl()}${endpoint}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Contentful API error: ${response.status} - ${errorText}`)
    }

    return response.json()
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.config) {
      return { success: false, error: 'Client not configured' }
    }

    try {
      const url = `https://cdn.contentful.com/spaces/${this.config.spaceId}`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        return { 
          success: false, 
          error: `Connection failed: ${response.status} - ${errorText}` 
        }
      }

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to connect to Contentful',
      }
    }
  }

  async fetchEntries(): Promise<ContentfulEntry[]> {
    if (!this.config) {
      throw new Error('Contentful client not configured')
    }

    try {
      const data = await this.fetchFromContentful('/entries?limit=100')

      return data.items.map((entry: any) => ({
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
    if (!this.config) {
      throw new Error('Contentful client not configured')
    }

    try {
      const data = await this.fetchFromContentful('/content_types')
      return data.items
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch content types')
    }
  }
}

export const contentfulService = new ContentfulService()
