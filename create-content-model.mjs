/**
 * Contentful Content Model Generator Script
 * 
 * This script helps you create content models in Contentful programmatically.
 * 
 * PREREQUISITES:
 * 1. Install contentful-management: npm install contentful-management
 * 2. Get your Management API token from Contentful dashboard (Settings → API keys → Management tokens)
 * 
 * USAGE:
 * 1. Replace YOUR_MANAGEMENT_API_TOKEN with your actual token
 * 2. Replace YOUR_SPACE_ID with your space ID
 * 3. Uncomment the content model you want to create (or create your own)
 * 4. Run: node create-content-model.mjs
 */

import contentful from 'contentful-management'

const CONFIG = {
  managementToken: 'YOUR_MANAGEMENT_API_TOKEN',
  spaceId: 'YOUR_SPACE_ID',
  environment: 'master'
}

const client = contentful.createClient({
  accessToken: CONFIG.managementToken
})

// ==================== CONTENT MODEL TEMPLATES ====================

const BLOG_POST_MODEL = {
  id: 'blogPost',
  name: 'Blog Post',
  displayField: 'title',
  description: 'A blog post with title, author, body, and metadata',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [{ size: { min: 1, max: 200 } }]
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { unique: true },
        { regexp: { pattern: '^[a-z0-9-]+$' } }
      ]
    },
    {
      id: 'author',
      name: 'Author',
      type: 'Symbol',
      required: false
    },
    {
      id: 'publishDate',
      name: 'Publish Date',
      type: 'Date',
      required: false
    },
    {
      id: 'featuredImage',
      name: 'Featured Image',
      type: 'Link',
      linkType: 'Asset',
      required: false
    },
    {
      id: 'excerpt',
      name: 'Excerpt',
      type: 'Text',
      required: false,
      validations: [{ size: { max: 300 } }]
    },
    {
      id: 'body',
      name: 'Body',
      type: 'RichText',
      required: true
    },
    {
      id: 'tags',
      name: 'Tags',
      type: 'Array',
      items: { type: 'Symbol' },
      required: false
    },
    {
      id: 'published',
      name: 'Published',
      type: 'Boolean',
      required: false
    }
  ]
}

const PRODUCT_MODEL = {
  id: 'product',
  name: 'Product',
  displayField: 'name',
  description: 'An e-commerce product',
  fields: [
    {
      id: 'name',
      name: 'Product Name',
      type: 'Symbol',
      required: true
    },
    {
      id: 'sku',
      name: 'SKU',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      required: true
    },
    {
      id: 'price',
      name: 'Price',
      type: 'Number',
      required: true,
      validations: [{ range: { min: 0 } }]
    },
    {
      id: 'images',
      name: 'Images',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Asset'
      },
      required: false
    },
    {
      id: 'inStock',
      name: 'In Stock',
      type: 'Boolean',
      required: false
    },
    {
      id: 'categories',
      name: 'Categories',
      type: 'Array',
      items: { type: 'Symbol' },
      required: false
    }
  ]
}

const AUTHOR_MODEL = {
  id: 'author',
  name: 'Author',
  displayField: 'name',
  description: 'Content author profile',
  fields: [
    {
      id: 'name',
      name: 'Full Name',
      type: 'Symbol',
      required: true
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    {
      id: 'email',
      name: 'Email',
      type: 'Symbol',
      required: false,
      validations: [
        {
          regexp: {
            pattern: '^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$'
          }
        }
      ]
    },
    {
      id: 'bio',
      name: 'Biography',
      type: 'Text',
      required: false
    },
    {
      id: 'avatar',
      name: 'Avatar',
      type: 'Link',
      linkType: 'Asset',
      required: false
    },
    {
      id: 'socialLinks',
      name: 'Social Links',
      type: 'Object',
      required: false
    }
  ]
}

// ==================== HELPER FUNCTIONS ====================

async function createContentType(model) {
  try {
    console.log(`\n📦 Creating content type: ${model.name}...`)
    
    const space = await client.getSpace(CONFIG.spaceId)
    const environment = await space.getEnvironment(CONFIG.environment)
    
    const contentType = await environment.createContentTypeWithId(model.id, {
      name: model.name,
      displayField: model.displayField,
      description: model.description || '',
      fields: model.fields
    })
    
    await contentType.publish()
    
    console.log(`✅ Successfully created and published: ${model.name}`)
    console.log(`   Content Type ID: ${model.id}`)
    console.log(`   Fields: ${model.fields.map(f => f.id).join(', ')}`)
    
    return contentType
  } catch (error) {
    console.error(`❌ Error creating ${model.name}:`, error.message)
    throw error
  }
}

async function createSampleEntry(contentTypeId, data) {
  try {
    console.log(`\n📝 Creating sample entry for ${contentTypeId}...`)
    
    const space = await client.getSpace(CONFIG.spaceId)
    const environment = await space.getEnvironment(CONFIG.environment)
    
    const entry = await environment.createEntry(contentTypeId, {
      fields: data
    })
    
    await entry.publish()
    
    console.log(`✅ Successfully created and published sample entry`)
    console.log(`   Entry ID: ${entry.sys.id}`)
    
    return entry
  } catch (error) {
    console.error(`❌ Error creating sample entry:`, error.message)
    throw error
  }
}

// ==================== MAIN EXECUTION ====================

async function main() {
  console.log('🚀 Contentful Content Model Generator')
  console.log('=====================================\n')
  
  if (CONFIG.managementToken === 'YOUR_MANAGEMENT_API_TOKEN' || CONFIG.spaceId === 'YOUR_SPACE_ID') {
    console.error('❌ ERROR: Please update the CONFIG object with your actual credentials!')
    console.log('\n📝 To get your credentials:')
    console.log('   1. Log in to Contentful dashboard')
    console.log('   2. Go to Settings → API keys')
    console.log('   3. Create or select a Management API token')
    console.log('   4. Copy your Space ID and Management token')
    console.log('   5. Update the CONFIG object in this script')
    process.exit(1)
  }
  
  try {
    // Verify credentials
    console.log('🔑 Verifying credentials...')
    const space = await client.getSpace(CONFIG.spaceId)
    console.log(`✅ Connected to space: ${space.name}`)
    
    // UNCOMMENT THE MODELS YOU WANT TO CREATE:
    
    // Create Blog Post content model
    // await createContentType(BLOG_POST_MODEL)
    
    // Create Product content model
    // await createContentType(PRODUCT_MODEL)
    
    // Create Author content model
    // await createContentType(AUTHOR_MODEL)
    
    // OPTIONAL: Create sample entries
    // Uncomment after creating the Blog Post model
    /*
    await createSampleEntry('blogPost', {
      title: { 'en-US': 'My First Blog Post' },
      slug: { 'en-US': 'my-first-blog-post' },
      author: { 'en-US': 'John Doe' },
      publishDate: { 'en-US': new Date().toISOString() },
      excerpt: { 'en-US': 'This is an exciting first post!' },
      body: {
        'en-US': {
          nodeType: 'document',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Welcome to my blog! This is the first post.',
                  marks: []
                }
              ]
            }
          ]
        }
      },
      tags: { 'en-US': ['welcome', 'first-post'] },
      published: { 'en-US': true }
    })
    */
    
    console.log('\n✨ All done!')
    console.log('\n📚 Next steps:')
    console.log('   1. Check your Contentful space to see the new content models')
    console.log('   2. Create some entries in the Contentful dashboard')
    console.log('   3. Use the Contentful CMS Tester app to fetch and view your content')
    
  } catch (error) {
    console.error('\n💥 Fatal error:', error.message)
    process.exit(1)
  }
}

// Run the script
main()
