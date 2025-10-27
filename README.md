# Contentful CMS Tester

A professional React application for testing and exploring your Contentful CMS integration. Built with React, TypeScript, and Tailwind CSS, this tool provides an intuitive interface for connecting to your Contentful space, fetching content entries, and visualizing your content model.

![Contentful CMS Tester](https://img.shields.io/badge/React-19.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-blue)

## ✨ Features

- 🔌 **Easy Configuration** - Simple dialog to configure your Contentful API credentials
- 🔍 **Content Exploration** - Fetch and display all entries from your Contentful space
- 📊 **Visual Status Indicators** - Real-time connection status with clear error messages
- 📖 **Setup Guide** - Built-in step-by-step guide for creating your first content model
- 🎨 **Beautiful UI** - Clean, professional interface with shadcn/ui components
- 💾 **Persistent Storage** - Credentials saved locally for convenience
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Contentful account (free tier available at [contentful.com](https://www.contentful.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/contentful-cms-tester.git
cd contentful-cms-tester
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🔧 Configuration

### Getting Your Contentful Credentials

1. Log in to your [Contentful](https://app.contentful.com) account
2. Navigate to **Settings → API keys**
3. Create a new API key or select an existing one
4. Copy the following values:
   - **Space ID**: Your Contentful space identifier
   - **Content Delivery API Access Token**: Your API access token
   - **Environment**: Usually `master` (default)

### Configuring the App

1. Click the **Configure** button in the top right
2. Enter your Contentful credentials
3. Click **Save Configuration**
4. The app will automatically test your connection

## 📖 Creating Your First Content Model

If you're new to Contentful, follow the built-in Setup Guide:

1. Click the **Setup Guide** button
2. Follow the step-by-step instructions to:
   - Create a new content type (e.g., "Blog Post")
   - Add fields to your content type
   - Publish your content type
   - Create and publish your first entry

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Contentful SDK** - API integration
- **Phosphor Icons** - Beautiful icon system
- **Sonner** - Toast notifications
- **Framer Motion** - Smooth animations

## 📁 Project Structure

```
contentful-cms-tester/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── ConfigDialog.tsx
│   │   ├── ContentEntryCard.tsx
│   │   ├── SetupGuideDialog.tsx
│   │   └── StatusIndicator.tsx
│   ├── lib/               # Utilities and services
│   │   ├── contentful.ts  # Contentful API service
│   │   └── utils.ts       # Helper functions
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles and theme
│   └── main.tsx           # Application entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Customization

### Theme Colors

Colors are defined in `src/index.css` using CSS custom properties. Modify the `:root` section to customize:

```css
:root {
  --primary: oklch(0.45 0.15 250);
  --secondary: oklch(0.75 0.10 280);
  --accent: oklch(0.70 0.15 210);
  /* ...more colors */
}
```

### Adding More Features

The app is built with extensibility in mind:

- **Filtering**: Add content type filters in `App.tsx`
- **Search**: Implement entry search in the Contentful service
- **Editing**: Add inline editing capabilities with the Contentful Management API
- **Preview**: Add content preview functionality

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Push `dist/` to `gh-pages` branch
- **Any static host**: Upload the `dist/` folder

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) component library
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Powered by [Contentful CMS](https://www.contentful.com/)

## 📞 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the built-in Setup Guide
- Visit [Contentful Documentation](https://www.contentful.com/developers/docs/)

---

Made with ❤️ by [Your Name]
