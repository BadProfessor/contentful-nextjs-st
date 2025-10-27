# GitHub Publishing Guide

This guide will help you publish your Contentful CMS Tester to GitHub.

## Prerequisites

- Git installed on your machine
- A GitHub account
- Your code ready in the local directory

## Step-by-Step Instructions

### 1. Verify Git is Initialized

Your project already has a `.git` directory, so Git is already initialized.

### 2. Review What Will Be Committed

Check which files will be included (and excluded) in your repository:

```bash
git status
```

The `.gitignore` file is already configured to exclude:
- `node_modules/`
- `dist/` and build artifacts
- Environment files (`.env`)
- Editor files
- Spark-specific files

### 3. Stage Your Changes

Add all files to be committed:

```bash
git add .
```

Or add specific files/directories:

```bash
git add src/
git add package.json
git add README.md
git add index.html
git add vite.config.ts
git add tailwind.config.js
git add tsconfig.json
```

### 4. Commit Your Code

Create your first commit:

```bash
git commit -m "Initial commit: Contentful CMS Tester application"
```

### 5. Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the repository details:
   - **Repository name**: `contentful-cms-tester` (or your preferred name)
   - **Description**: "A professional React application for testing and exploring Contentful CMS integration"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
4. Click **"Create repository"**

### 6. Connect Your Local Repository to GitHub

GitHub will show you commands. Use the "push an existing repository" section:

```bash
git remote add origin https://github.com/YOUR-USERNAME/contentful-cms-tester.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### 7. Verify the Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create contentful-cms-tester --public --source=. --remote=origin --push
```

## Important Notes

### Files That Should NOT Be Committed

Make sure these are in your `.gitignore` (they already are):
- `node_modules/` - npm packages (large, can be reinstalled)
- `.env` - environment variables with secrets
- `dist/` - build output
- `.vercel/` - deployment metadata
- `packages/` - local packages
- `.spark-workbench-id` - Spark-specific files

### Files That SHOULD Be Committed

Essential files for your repository:
- ✅ `src/` - Your source code
- ✅ `package.json` - Dependency list
- ✅ `package-lock.json` - Locked dependency versions
- ✅ `README.md` - Documentation
- ✅ `index.html` - Entry HTML file
- ✅ `vite.config.ts` - Build configuration
- ✅ `tailwind.config.js` - Styling configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `components.json` - shadcn config
- ✅ `LICENSE` - License file

### Updating Your README

Before publishing, update the README.md:

1. Replace `[Your Name]` in the footer with your actual name
2. Update the clone URL with your actual GitHub username:
   ```markdown
   git clone https://github.com/YOUR-USERNAME/contentful-cms-tester.git
   ```

## After Publishing

### Add Topics to Your Repository

On your GitHub repository page:
1. Click the ⚙️ icon next to "About"
2. Add topics: `react`, `typescript`, `contentful`, `cms`, `vite`, `tailwindcss`

### Enable GitHub Pages (Optional)

To host a live demo:
1. Go to **Settings → Pages**
2. Select your branch (usually `main`)
3. Select `/dist` folder (after running `npm run build`)
4. Click **Save**

### Create a Release (Optional)

1. Go to **Releases → Create a new release**
2. Tag: `v1.0.0`
3. Title: "Initial Release"
4. Describe features and usage
5. Publish release

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. **HTTPS**: Use a personal access token instead of password
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use the token as your password when pushing

2. **SSH**: Set up SSH keys
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   cat ~/.ssh/id_ed25519.pub
   ```
   - Copy the output and add it to GitHub → Settings → SSH keys
   - Use SSH URL: `git@github.com:YOUR-USERNAME/contentful-cms-tester.git`

### Large File Issues

If you accidentally try to commit large files:
```bash
git reset HEAD~1
git clean -fd
```

Then update `.gitignore` and try again.

## Next Steps

After publishing:
1. ⭐ Star your own repository (why not!)
2. 📝 Write a detailed description in the "About" section
3. 🔗 Add a link to a live demo if deployed
4. 📣 Share with the community
5. 🐛 Open issues for planned improvements
6. 🤝 Welcome contributors

---

Need help? Check the [GitHub documentation](https://docs.github.com/en/get-started) or open an issue in your repository!
