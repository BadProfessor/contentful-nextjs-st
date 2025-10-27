# Contentful CMS Tester

A React application for testing and exploring your Contentful CMS integration. Perfect for quickly verifying your Contentful setup and visualizing your content structure.

## Features

- 🔌 **Easy Configuration** - Simple dialog to enter your Contentful API credentials
- 📊 **Content Visualization** - View all your entries with expandable field details
- ✅ **Connection Testing** - Real-time connection status indicator
- 📖 **Setup Guide** - Built-in step-by-step guide for Contentful setup
- 💾 **Persistent Settings** - Your credentials are saved between sessions
- 🎨 **Beautiful UI** - Clean, modern interface built with shadcn/ui

## Quick Start

### 1. Get Your Contentful Credentials

1. Sign up or log in at [contentful.com](https://www.contentful.com)
2. Navigate to **Settings → API keys**
3. Create a new API key or use an existing one
4. Copy your:
   - **Space ID**
   - **Content Delivery API - access token**

### 2. Configure the App

1. Click **"Configure"** in the app header
2. Paste your Space ID and Access Token
3. Set environment (default: "master")
4. Click **"Save Configuration"**

### 3. Fetch Your Content

Click **"Fetch Content"** to load and display all entries from your Contentful space.

## Setting Up Content Models

If you don't have any content models yet, follow these steps:

### Option 1: Using the Built-in Setup Guide

1. Click **"Setup Guide"** in the app header
2. Follow the step-by-step instructions
3. Use the example content model provided

### Option 2: Manual Setup in Contentful

1. In Contentful dashboard, go to **Content model** tab
2. Click **"Add content type"**
3. Name it (e.g., "Blog Post", "Product", "Author")
4. Add fields:
   - **Title** (Short text, Symbol)
   - **Slug** (Short text, Symbol)
   - **Body** (Rich text or Long text)
   - **Author** (Short text)
   - **Publish Date** (Date & time)
   - **Featured Image** (Media)
5. Click **"Save"**

### Example Content Model Structure

Here's a simple blog post content model you can recreate:

```json
{
  "name": "Blog Post",
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Symbol"
    },
    {
      "id": "publishDate",
      "name": "Publish Date",
      "type": "Date"
    },
    {
      "id": "excerpt",
      "name": "Excerpt",
      "type": "Text"
    },
    {
      "id": "body",
      "name": "Body",
      "type": "RichText",
      "required": true
    }
  ]
}
```

## Creating Sample Content

After creating a content model:

1. Go to **Content** tab in Contentful
2. Click **"Add entry"**
3. Select your content type
4. Fill in the fields
5. Click **"Publish"** (important!)
6. Create 2-3 more entries to test

## Troubleshooting

### "Connection Error" Message

- **Invalid credentials**: Double-check your Space ID and Access Token
- **Wrong environment**: Verify your environment name (usually "master")
- **Network issues**: Check your internet connection

### "No Content Found" Message

- Make sure you've **published** your entries (not just saved as drafts)
- Verify you're looking at the correct environment
- Check that your content model has entries

### Content Not Displaying

- Ensure you're using the **Content Delivery API** token (not Preview or Management API)
- Verify your entries are published
- Try refreshing the connection

## Content Model Script

If you want to programmatically create content models, you can use the Contentful Management API. Here's a Node.js script template:

### Prerequisites

```bash
npm install contentful-management
```

### Script: `create-content-model.js`

```javascript
const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: 'YOUR_MANAGEMENT_API_TOKEN'
})

async function createBlogPostModel() {
  const space = await client.getSpace('YOUR_SPACE_ID')
  const environment = await space.getEnvironment('master')

  const contentType = await environment.createContentTypeWithId('blogPost', {
    name: 'Blog Post',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [{ unique: true }]
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
        required: false
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
      }
    ]
  })

  await contentType.publish()
  console.log('Blog Post content type created and published!')
}

createBlogPostModel().catch(console.error)
```

### How to Use the Script

1. Get your **Management API token** from Contentful (Settings → API keys → Management tokens)
2. Replace `YOUR_MANAGEMENT_API_TOKEN` and `YOUR_SPACE_ID`
3. Run: `node create-content-model.js`

## API Reference

### Contentful Configuration

```typescript
interface ContentfulConfig {
  spaceId: string          // Your Contentful space ID
  accessToken: string      // Content Delivery API access token
  environment?: string     // Environment name (default: "master")
}
```

### Entry Structure

```typescript
interface ContentfulEntry {
  id: string              // Unique entry ID
  contentType: string     // Content model ID
  createdAt: string       // ISO date string
  updatedAt: string       // ISO date string
  fields: Record<string, any>  // Dynamic field data
}
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Contentful SDK** - CMS integration
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Vite** - Build tool

## Security Notes

- Your API credentials are stored locally in the browser
- Never commit your Contentful tokens to version control
- Use environment variables for production deployments
- The Content Delivery API token is read-only and safe for client-side use

## Need Help?

- 📚 [Contentful Documentation](https://www.contentful.com/developers/docs/)
- 🎓 [Contentful Tutorials](https://www.contentful.com/developers/docs/tutorials/)
- 💬 [Contentful Community](https://www.contentful.com/developers/community/)

---

Built with ❤️ using React and Contentful
