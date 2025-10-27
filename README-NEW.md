# Contentful CMS Tester

A React application for testing and exploring your Contentful CMS integration. Perfect for quickly verifying your Contentful setup and visualizing your content structure.

---

## 🚀 Quick Links

- **[🏠 Run Locally](./LOCAL-SETUP.md)** - Simple guide to run on your computer
- **[🌐 Deploy Online](./DEPLOYMENT.md)** - Deploy to Vercel, Netlify, AWS, etc.
- **[⚙️ Contentful Setup](./SETUP.md)** - Configure your Contentful credentials

---

## ✨ Features

- 🔌 **Easy Configuration** - Simple dialog to enter your Contentful API credentials
- 📊 **Content Visualization** - View all your entries with expandable field details
- ✅ **Connection Testing** - Real-time connection status indicator
- 📖 **Setup Guide** - Built-in step-by-step guide for Contentful setup
- 💾 **Persistent Settings** - Your credentials are saved between sessions
- 🎨 **Beautiful UI** - Clean, modern interface built with shadcn/ui

---

## ⚡ Quick Start

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173/ in your browser.

**Need more help?** See **[LOCAL-SETUP.md](./LOCAL-SETUP.md)** for detailed instructions.

---

### Deploy to Production

**Easiest option - Vercel (free):**

```bash
npm install -g vercel
vercel
```

**Other options:** See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Netlify, GitHub Pages, Docker, AWS, etc.

---

## 📋 How to Use

1. **Get Contentful Credentials**
   - Sign up at [contentful.com](https://www.contentful.com)
   - Go to Settings → API keys
   - Copy your Space ID and Access Token

2. **Configure the App**
   - Click "Configure" button
   - Paste your credentials
   - Save

3. **Fetch Your Content**
   - Click "Fetch Content"
   - View your entries!

**Full setup guide:** [SETUP.md](./SETUP.md)

---

## 🏗️ Project Structure

```
spark-template/
├── src/
│   ├── App.tsx              # Main application component
│   ├── components/          # React components
│   │   ├── ConfigDialog.tsx
│   │   ├── ContentEntryCard.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── ui/              # shadcn components
│   ├── lib/
│   │   ├── contentful.ts    # Contentful API service
│   │   └── utils.ts
│   └── index.css            # Styles and theme
├── create-content-model.mjs # Script to generate content models
├── Dockerfile               # Docker container config
├── docker-compose.yml       # Docker Compose config
├── netlify.toml             # Netlify deployment config
├── vercel.json              # Vercel deployment config
├── start.sh / start.bat     # Easy start scripts
├── build.sh / build.bat     # Production build scripts
├── LOCAL-SETUP.md           # Local development guide
├── DEPLOYMENT.md            # Deployment guide
└── SETUP.md                 # Contentful configuration guide
```

---

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Contentful SDK** - CMS integration

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
npm run dev -- --port 3000
```

### Build Issues

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Connection Errors

- Verify your Contentful credentials
- Check you're using the Content Delivery API token
- Ensure your content is published (not draft)

**More help:** See [LOCAL-SETUP.md](./LOCAL-SETUP.md#troubleshooting)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code |

---

## 🎯 Creating Content Models

Use the included script to automatically create content models in Contentful:

```bash
node create-content-model.mjs
```

You'll need your Contentful Management API token. See [SETUP.md](./SETUP.md) for details.

---

## 🔒 Security Notes

- API credentials are stored in browser local storage
- Never commit credentials to version control
- Content Delivery API tokens are safe for client-side use
- Use environment variables for production

---

## 📚 Documentation

- **[Local Setup Guide](./LOCAL-SETUP.md)** - Running on your computer
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploying to production
- **[Contentful Setup](./SETUP.md)** - Configuring Contentful
- **[Contentful Docs](https://www.contentful.com/developers/docs/)** - Official documentation

---

## 🤝 Need Help?

- Check the [LOCAL-SETUP.md](./LOCAL-SETUP.md) troubleshooting section
- Review the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Visit [Contentful Documentation](https://www.contentful.com/developers/docs/)
- Open an issue on GitHub

---

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

**Ready to get started? 🚀**

Run `npm install && npm run dev` or see [LOCAL-SETUP.md](./LOCAL-SETUP.md) for detailed instructions!
