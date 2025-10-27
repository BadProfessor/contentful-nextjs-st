# 🚀 How to Run This App Locally

This is a **step-by-step guide** for running the Contentful CMS Tester on your computer.

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Node.js

**Download and install Node.js** from: https://nodejs.org/

- Choose the **LTS version** (recommended)
- Run the installer and follow the instructions
- Restart your computer after installation

**Verify installation:**
Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:

```bash
node --version
npm --version
```

You should see version numbers. If you do, Node.js is installed! ✅

---

### 2️⃣ Install Project Dependencies

**Navigate to the project folder** in your terminal:

```bash
cd path/to/spark-template
```

**Install all required packages:**

```bash
npm install
```

This will take a few minutes. You'll see lots of text - that's normal!

---

### 3️⃣ Start the App

**Run the development server:**

```bash
npm run dev
```

You'll see something like:

```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

**Open your browser** and go to: **http://localhost:5173/**

🎉 **The app is now running!**

---

## 🛑 How to Stop the App

In the terminal where the app is running, press:

**`Ctrl + C`** (Windows/Linux) or **`Cmd + C`** (Mac)

---

## 🎨 Using the App

1. Click **"Configure"** button in the top right
2. Enter your Contentful credentials:
   - Space ID
   - Access Token (Content Delivery API)
   - Environment (usually "master")
3. Click **"Save Configuration"**
4. Click **"Fetch Content"** to load your data

---

## 🐛 Troubleshooting

### "Port 5173 is already in use"

The port is being used by another program. Try:

```bash
npm run dev -- --port 3000
```

Then open: http://localhost:3000/

---

### "npm: command not found" or "node: command not found"

Node.js is not installed or not in your PATH.

**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. Restart your terminal
3. Try again

---

### App shows errors or won't load

1. **Delete `node_modules` and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear cache:**
   ```bash
   npm cache clean --force
   ```

3. **Try again:**
   ```bash
   npm run dev
   ```

---

### "Network Error" in the app

This means the app can't connect to Contentful.

**Check:**
- Your Space ID and Access Token are correct
- You're using the **Content Delivery API** token (not Preview or Management)
- Your internet connection is working
- You're using the correct environment name

---

## 📝 Easy Start Scripts

### Windows Users

**Double-click** `start.bat` in the project folder

This script will:
- Check if Node.js is installed
- Install dependencies
- Start the development server

---

### Mac/Linux Users

**Run** `start.sh` in the terminal:

```bash
chmod +x start.sh
./start.sh
```

This script will:
- Check if Node.js is installed
- Install dependencies
- Start the development server

---

## 📦 Building for Production

To create a production-ready version:

```bash
npm run build
```

This creates a `dist` folder with optimized files.

**Preview the production build:**

```bash
npm run preview
```

---

## 🌐 Deploying to the Internet

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment instructions to:
- Vercel (free, easiest)
- Netlify (free)
- GitHub Pages (free)
- Docker (anywhere)
- AWS S3 (enterprise)

---

## 🔄 Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

## 📚 Additional Resources

- **App Usage Guide**: [SETUP.md](./SETUP.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main Documentation**: [README.md](./README.md)
- **Contentful Docs**: https://www.contentful.com/developers/docs/

---

## ❓ Still Need Help?

**Common questions:**

### "What is npm?"
npm is the Node Package Manager. It comes with Node.js and installs code libraries.

### "What is localhost?"
localhost (127.0.0.1) is your own computer. Port 5173 is just a number that identifies the app.

### "Do I need to deploy to use it?"
No! You can use it locally on your computer. Deploy only if you want others to access it.

### "Where are my credentials stored?"
In your browser's local storage. They never leave your computer unless you deploy the app.

---

**You're all set! 🎉**

Run `npm run dev` and start testing your Contentful integration!
