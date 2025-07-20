# 🚀 Portfolio Deployment Guide

This guide will help you deploy your portfolio to GitHub and host it online.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Your portfolio files ready

## 🔄 Step-by-Step Deployment

### Step 1: Initialize Git Repository

Open PowerShell in your portfolio directory and run:

```powershell
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial portfolio commit"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it `portfolio` or `your-name-portfolio`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README (we already have files)
7. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub's "push existing repository" section:

```powershell
# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### Step 5: Prepare for GitHub Pages

Since GitHub Pages looks for `index.html`, rename your main file:

```powershell
# Rename portfolio-preview.html to index.html
Rename-Item "portfolio-preview.html" "index.html"

# Commit the change
git add .
git commit -m "Rename main file to index.html for GitHub Pages"
git push
```

### Step 6: Access Your Live Website

After a few minutes, your portfolio will be live at:
```
https://YOUR-USERNAME.github.io/portfolio
```

## 🔧 Alternative Hosting Options

### Netlify (Recommended for ease of use)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your portfolio repository
5. Leave build settings empty (we're using static HTML)
6. Click "Deploy site"
7. Your site will be live instantly with a custom netlify URL
8. Optional: Add custom domain in site settings

### Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your portfolio repository
5. Leave all settings as default
6. Click "Deploy"
7. Your site will be live with a vercel URL

### Traditional Web Hosting

1. Download your files from GitHub
2. Upload `index.html` and `resume.pdf` to your web host
3. Access via your domain

## 🔄 Making Updates

To update your live portfolio:

```powershell
# Make your changes to index.html or other files

# Stage changes
git add .

# Commit changes
git commit -m "Update portfolio content"

# Push to GitHub
git push
```

Your live site will update automatically within a few minutes.

## 🐛 Troubleshooting

### Portfolio not loading on GitHub Pages
- Ensure your main file is named `index.html`
- Check that GitHub Pages is enabled in repository settings
- Wait 5-10 minutes for changes to propagate

### Resume not loading
- Ensure `resume.pdf` is in the same directory as `index.html`
- Check file path in your HTML (should be `./resume.pdf`)

### Images or styles not working
- Use relative paths (start with `./` or just the filename)
- Avoid absolute paths or file:// URLs

## 🎯 Best Practices

1. **Keep it simple**: Use relative paths for all resources
2. **Test locally**: Open `index.html` in your browser before deploying
3. **Regular commits**: Make small, frequent commits with descriptive messages
4. **SEO optimization**: Add meta tags for better search engine visibility
5. **Performance**: Optimize images and minimize file sizes

## 📱 Mobile Testing

Test your portfolio on different devices:
- Use browser developer tools
- Test on actual mobile devices
- Check loading speed on slower connections

## 🔒 Security

- Never commit sensitive information
- Use `.gitignore` for private files
- Keep personal information limited to what you want public

---

🎉 **Congratulations!** Your portfolio is now live and accessible to potential employers and clients worldwide!
