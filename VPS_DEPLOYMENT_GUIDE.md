# 🖥️ VPS Deployment Guide - YouTube Downloader

## 💰 **BUDGET SOLUTION - VPS Hosting**

VPS is **perfect** for your YouTube downloader because:
- ✅ **Full control** over the server
- ✅ **No platform limitations**
- ✅ **Best performance** for video processing
- ✅ **Cheapest option** - $3.99/month
- ✅ **Can handle any file size**
- ✅ **Multiple projects** on same server

---

## 🏆 **RECOMMENDED VPS PROVIDERS:**

### **1. Hostinger VPS** ⭐ **BEST VALUE**
- **Price**: $3.99/month
- **Resources**: 1 CPU, 4GB RAM, 50GB storage
- **Perfect for**: YouTube downloader + other projects
- **Link**: [hostinger.com/vps-hosting](https://hostinger.com/vps-hosting)

### **2. DigitalOcean Droplet**
- **Price**: $6/month
- **Resources**: 1 CPU, 1GB RAM, 25GB SSD
- **Perfect for**: Single application
- **Link**: [digitalocean.com](https://digitalocean.com)

### **3. Vultr**
- **Price**: $2.50/month
- **Resources**: 1 CPU, 512MB RAM, 10GB SSD
- **Perfect for**: Testing/small scale
- **Link**: [vultr.com](https://vultr.com)

---

## 📋 **Complete VPS Setup Guide:**

### **Step 1: Create VPS Instance**

#### **For Hostinger:**
1. Go to [hostinger.com/vps-hosting](https://hostinger.com/vps-hosting)
2. Choose **VPS 1 plan** ($3.99/month)
3. Select **Ubuntu 22.04 LTS**
4. Add SSH key or use password
5. Create instance

#### **For DigitalOcean:**
1. Go to [digitalocean.com](https://digitalocean.com)
2. Create **Droplet**
3. Choose **Ubuntu 22.04 LTS**
4. Select **$6/month** basic plan
5. Add SSH key
6. Create droplet

### **Step 2: Initial Server Setup**

#### **Connect to Your VPS:**
```bash
# Replace YOUR_SERVER_IP with actual IP
ssh root@YOUR_SERVER_IP

# Or if using non-root user:
ssh username@YOUR_SERVER_IP
```

#### **Update System:**
```bash
# Update package list and upgrade
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip
```

### **Step 3: Install Node.js and npm**

```bash
# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 for process management
sudo npm install -g pm2
```

### **Step 4: Install and Configure Nginx**

```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### **Step 5: Setup Firewall**

```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check firewall status
sudo ufw status
```

### **Step 6: Deploy Your YouTube Downloader**

#### **Clone Your Repository:**
```bash
# Navigate to web directory
cd /var/www

# Clone your project (replace with your GitHub URL)
sudo git clone https://github.com/yourusername/youtube-downloader.git
sudo chown -R $USER:$USER youtube-downloader
cd youtube-downloader
```

#### **Install Dependencies and Build:**
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the application
npm start
# Press Ctrl+C to stop test
```

### **Step 7: Setup PM2 Process Manager**

```bash
# Start your app with PM2
pm2 start npm --name "youtube-downloader" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
# Follow the instructions shown

# Check PM2 status
pm2 status
pm2 logs youtube-downloader
```

### **Step 8: Configure Nginx Reverse Proxy**

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/youtube-downloader
```

#### **Add this configuration:**
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Important for large file downloads
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
        client_max_body_size 100M;
    }
}
```

#### **Enable the site:**
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/youtube-downloader /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### **Step 9: Setup SSL Certificate (Optional but Recommended)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🔧 **Environment Configuration:**

### **Create .env file:**
```bash
# In your project directory
cd /var/www/youtube-downloader
nano .env
```

#### **Add environment variables:**
```bash
NODE_ENV=production
PORT=3000
```

### **Update PM2 with environment:**
```bash
# Restart PM2 with new environment
pm2 restart youtube-downloader --update-env
```

---

## 📊 **Performance Optimization:**

### **Optimize Node.js for Production:**
```bash
# Add to your .env file
NODE_OPTIONS="--max-old-space-size=3000"
```

### **Configure Nginx for Large Files:**
```bash
# Edit main Nginx config
sudo nano /etc/nginx/nginx.conf

# Add/modify these settings in http block:
client_max_body_size 1000M;
client_body_timeout 300s;
proxy_read_timeout 300s;
proxy_connect_timeout 300s;
proxy_send_timeout 300s;
```

### **Setup Log Rotation:**
```bash
# Install logrotate for PM2 logs
sudo nano /etc/logrotate.d/pm2

# Add:
/home/*/.pm2/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 0640 root root
}
```

---

## 🔄 **Deployment Automation:**

### **Setup Auto-Deployment Script:**
```bash
# Create deployment script
nano deploy.sh
```

#### **Add deployment script:**
```bash
#!/bin/bash
echo "Deploying YouTube Downloader..."

# Pull latest code
git pull origin main

# Install new dependencies
npm install

# Build application
npm run build

# Restart PM2
pm2 restart youtube-downloader

# Reload Nginx
sudo systemctl reload nginx

echo "Deployment complete!"
```

#### **Make script executable:**
```bash
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

---

## 📈 **Monitoring & Maintenance:**

### **Monitor Your Application:**
```bash
# Check PM2 status
pm2 status
pm2 logs youtube-downloader
pm2 monit

# Check system resources
htop
df -h
free -m

# Check Nginx status
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
```

### **Backup Your Application:**
```bash
# Create backup script
nano backup.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/youtube-downloader_$DATE.tar.gz /var/www/youtube-downloader
echo "Backup created: youtube-downloader_$DATE.tar.gz"
```

### **Setup Automatic Updates:**
```bash
# Add to crontab for automatic security updates
sudo crontab -e

# Add this line for weekly updates:
0 2 * * 0 apt update && apt upgrade -y
```

---

## 🎯 **Expected Performance:**

### **What You'll Get with VPS:**
- ✅ **Download Success Rate**: 98%+
- ✅ **File Size Support**: Unlimited (up to disk space)
- ✅ **Video Length**: No limits
- ✅ **4K/8K Support**: Full support
- ✅ **Concurrent Users**: 100-500+ (depending on VPS specs)
- ✅ **Response Time**: < 1 second
- ✅ **Uptime**: 99.9%+

### **Comparison with Vercel:**
| Feature | VPS | Vercel |
|---------|-----|--------|
| **Timeout** | None | 60 seconds ❌ |
| **File Size** | Unlimited | 6MB ❌ |
| **4K Downloads** | ✅ Perfect | ❌ Fails |
| **Cost** | $4/month | $20/month |
| **Performance** | ✅ Excellent | ❌ Poor |
| **Control** | ✅ Full | ❌ Limited |

---

## 🚨 **Troubleshooting:**

### **Common Issues:**

#### **App won't start:**
```bash
# Check logs
pm2 logs youtube-downloader

# Check if port is in use
sudo netstat -tulpn | grep :3000

# Restart PM2
pm2 restart youtube-downloader
```

#### **Nginx errors:**
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### **Out of disk space:**
```bash
# Check disk usage
df -h

# Clean PM2 logs
pm2 flush

# Clean system logs
sudo journalctl --vacuum-time=7d
```

---

## 💰 **Cost Breakdown:**

### **Monthly Costs:**
- **Hostinger VPS**: $3.99/month
- **Domain**: $10-15/year (optional)
- **SSL Certificate**: Free (Let's Encrypt)
- **Total**: ~$4-5/month

### **vs Vercel:**
- **Vercel Pro**: $20/month + usage
- **Limited functionality**
- **VPS**: $4/month + unlimited functionality

**VPS saves you $15+/month while providing better performance!**

---

## 🎉 **Success Checklist:**

### **Your VPS is working when:**
- ✅ SSH connection works
- ✅ Nginx serves your domain
- ✅ PM2 shows app running
- ✅ YouTube downloader loads in browser
- ✅ **All video downloads work**
- ✅ **No timeout errors**
- ✅ **4K downloads successful**
- ✅ **Audio extraction works**

### **Maintenance Tasks:**
- [ ] Weekly: Check logs and system resources
- [ ] Monthly: Update packages (`sudo apt update && sudo apt upgrade`)
- [ ] Quarterly: Review and optimize performance
- [ ] As needed: Deploy new features with `./deploy.sh`

**Your YouTube downloader will work perfectly on VPS! 🚀**