# YouTube Downloader - Deployment Guide

## 🚀 Quick Setup

This is a modern YouTube video downloader built with Next.js, featuring a beautiful glassmorphism UI and full download functionality.

### 📋 Requirements

- Node.js 18+
- npm or yarn
- 2GB+ RAM recommended for video processing

### 🛠️ Installation

1. **Download the project files**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your app will be live with a Vercel URL

### Option 2: Shared Web Hosting

#### For cPanel/shared hosting:

1. **Build the application**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload files**:
   - Upload the `out/` folder contents to your hosting's `public_html` or `www` directory
   - Note: API routes won't work on static hosting - you'll need Node.js hosting

#### For Node.js hosting providers:

1. **Prepare for production**:
   ```bash
   npm run build
   ```

2. **Set environment variables**:
   ```bash
   export NODE_ENV=production
   export PORT=3000
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

### Option 3: VPS/Dedicated Server

1. **Install PM2 (Process Manager)**:
   ```bash
   npm install -g pm2
   ```

2. **Build and start**:
   ```bash
   npm run build
   pm2 start npm --name "youtube-downloader" -- start
   pm2 startup
   pm2 save
   ```

3. **Setup Nginx reverse proxy** (optional):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:
```env
# Optional: Add any API keys or configurations here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Performance Optimization

For better performance on shared hosting:
- Enable gzip compression
- Set up CDN for static assets
- Monitor server resources during video processing

## 📱 Testing

Test the application with these YouTube URLs:
- Short video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Long video: Any standard YouTube video URL

## 🚨 Important Notes

- **Legal Compliance**: Only download content you have permission to download
- **Resource Usage**: Video downloads consume bandwidth and storage
- **Hosting Requirements**: Ensure your hosting supports Node.js if using API features
- **CORS**: Some hosting providers may require CORS configuration

## 🛠️ Troubleshooting

### Common Issues:

1. **"ytdl-core" errors**:
   - Update to latest version: `npm update ytdl-core`
   - Some videos may be restricted by YouTube

2. **Build errors**:
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Performance issues**:
   - Increase server memory allocation
   - Consider implementing download queuing for high traffic

### Support

If you encounter issues:
1. Check the browser console for errors
2. Verify the YouTube URL is valid and public
3. Ensure your hosting supports Node.js (for API functionality)

## 📊 Features

✅ **Modern UI**: Glassmorphism design with Inter font
✅ **Mobile Responsive**: Works on all devices
✅ **Video Preview**: Shows thumbnail, title, duration, and author
✅ **Multiple Formats**: Choose from available quality options
✅ **Progress Indicators**: Beautiful loading animations
✅ **Error Handling**: User-friendly error messages
✅ **Legal Disclaimer**: Built-in usage guidelines

---

**Live URL**: Your app will be available at your chosen domain/URL after deployment.

**Setup Time**: ~5-10 minutes for most hosting providers.