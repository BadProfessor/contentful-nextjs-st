# Deployment Guide

This guide covers how to run the Contentful CMS Tester locally and deploy it to production.

## 🚀 Quick Start - Run Locally

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- A **Contentful account** with API credentials

### Step 1: Install Node.js

If you don't have Node.js installed:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Install it following the installer instructions
4. Verify installation by opening a terminal and running:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Clone or Download This Project

If you have the project folder, navigate to it in your terminal:

```bash
cd path/to/spark-template
```

### Step 3: Install Dependencies

Run this command in the project folder:

```bash
npm install
```

This will download all the required packages (may take a few minutes).

### Step 4: Start the Development Server

```bash
npm run dev
```

You should see output like:

```
VITE v6.3.5  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Open in Your Browser

Open your browser and go to: **http://localhost:5173/**

The app is now running! You can configure it with your Contentful credentials.

### Step 6: Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with optimized static files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Vercel** is a free hosting platform perfect for React apps.

#### Steps:

1. **Sign up** at [vercel.com](https://vercel.com) (free account)
2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
3. **Deploy**:
   ```bash
   vercel
   ```
4. Follow the prompts (accept defaults)
5. Your app will be live at a URL like: `https://your-app.vercel.app`

#### Or Deploy via GitHub:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

**No configuration needed!** Vercel auto-detects Vite projects.

---

### Option 2: Netlify

**Netlify** is another free hosting option.

#### Steps:

1. **Sign up** at [netlify.com](https://www.netlify.com) (free account)
2. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```
3. **Build your app**:
   ```bash
   npm run build
   ```
4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
5. Follow prompts and set publish directory to: `dist`

#### Or Deploy via GitHub:

1. Push your code to GitHub
2. Go to [netlify.com](https://www.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy"

---

### Option 3: GitHub Pages (Free)

Deploy to GitHub Pages for free static hosting.

#### Setup:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts** with your repo name:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your GitHub repo settings
   - Navigate to "Pages"
   - Select "gh-pages" branch
   - Save

Your app will be at: `https://your-username.github.io/your-repo-name/`

---

### Option 4: Docker Container

Use Docker to containerize and deploy anywhere.

#### Using the provided Dockerfile:

1. **Build the Docker image**:
   ```bash
   docker build -t contentful-cms-tester .
   ```

2. **Run the container**:
   ```bash
   docker run -p 8080:80 contentful-cms-tester
   ```

3. **Access the app**: http://localhost:8080

#### Deploy to Docker Hub:

```bash
docker tag contentful-cms-tester your-dockerhub-username/contentful-cms-tester
docker push your-dockerhub-username/contentful-cms-tester
```

---

### Option 5: AWS S3 + CloudFront

For enterprise deployment on AWS.

#### Prerequisites:
- AWS account
- AWS CLI installed and configured

#### Steps:

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Create S3 bucket**:
   ```bash
   aws s3 mb s3://your-bucket-name
   ```

3. **Upload files**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

4. **Enable static website hosting**:
   ```bash
   aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
   ```

5. **Set bucket policy for public access**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

6. **(Optional) Add CloudFront CDN** for HTTPS and better performance

---

## 🔒 Environment Variables

If you need to set default Contentful credentials (not recommended for security), create a `.env` file:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

**⚠️ Warning**: Never commit `.env` files with real credentials to version control!

For production, use your hosting platform's environment variable settings:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **GitHub Pages**: Not recommended (client-side only)

---

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 5173 is already in use":

```bash
# Kill the process using the port (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Build Fails

1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

3. Update dependencies:
   ```bash
   npm update
   ```

### App Not Loading After Deployment

- Verify the `base` path in `vite.config.ts` matches your deployment URL
- Check browser console for errors (F12)
- Ensure all files in `dist` folder were uploaded
- Clear your browser cache

---

## 📊 Performance Tips

- The app is a static site after building - very fast and cheap to host
- Uses Vite for optimized builds with code splitting
- All API calls are made client-side to Contentful's CDN
- No backend server required

---

## 🔄 Continuous Deployment

### GitHub Actions for Vercel:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📝 Next Steps After Deployment

1. **Configure Contentful** credentials in the deployed app
2. **Test the connection** to ensure it works in production
3. **Share the URL** with your team
4. **Monitor usage** via your hosting platform's analytics

---

## 💡 Need Help?

- Check the main [README.md](./README.md) for app usage
- Review [SETUP.md](./SETUP.md) for Contentful configuration
- Open an issue if you encounter problems

---

**Your app is now ready for deployment! 🎉**
