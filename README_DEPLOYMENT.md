# 🚀 Complete Deployment Guide for Windows Server

This guide explains how to deploy the Mathematics Research Center application to a Windows Server, from cloning the repository to making it publicly accessible with a domain.

## 📋 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Environment Configuration](#environment-configuration)
3. [Building and Starting](#building-and-starting)
4. [Domain Configuration](#domain-configuration)
5. [Maintenance](#maintenance)

---

## 🔧 Initial Setup

### Step 1: Clone Your GitHub Repository

```powershell
# Navigate to your deployment directory (e.g., C:\inetpub\wwwroot or C:\Projects)
cd C:\inetpub\wwwroot

# Clone the repository
git clone <your-github-repo-url> math_center

# Navigate into the project
cd math_center
```

### Step 2: Verify Prerequisites

Make sure you have:
- ✅ Node.js installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ PM2 installed globally (`npm install -g pm2`)
- ✅ MongoDB running (local or Atlas connection string)
- ✅ Git installed

---

## ⚙️ Environment Configuration

### Step 3: Configure Server Environment

Create `server/.env` file:

```powershell
cd server
Copy-Item .env.example .env
notepad .env
```

**Required variables:**
```env
NODE_ENV=production
PORT=3000

# MongoDB Connection
# For local MongoDB:
DB_URL=mongodb://localhost:27017/math_center
# OR for MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/math_center?retryWrites=true&w=majority

DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Admin Account (for initial setup)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password_here

# Security Keys (IMPORTANT: Use strong, random values)
JWT_SECRET_KEY=generate_a_random_32_character_string_here
REGISTRATION_SECRET=another_random_secret_key_2024

# Frontend URL (update this when domain is ready)
FRONTEND_URL=http://localhost:5173
```

### Step 4: Configure Client Environment

Create `front/.env.production` file:

```powershell
cd ..\front
Copy-Item .env.production.example .env.production
notepad .env.production
```

**For initial setup (before domain):**
```env
VITE_API_BASE_URL=http://localhost:3000
```

**After domain is ready:**
```env
VITE_API_BASE_URL=https://your-domain.com
# OR if using reverse proxy with /api prefix:
# VITE_API_BASE_URL=https://your-domain.com/api
```

---

## 🏗️ Building and Starting

### Option A: Automated Deployment (Recommended)

Run the deployment script:

```powershell
cd ..  # Back to project root
.\deploy.ps1
```

This script will:
- Install all dependencies
- Build the frontend
- Start the server with PM2
- Configure logging

### Option B: Manual Deployment

```powershell
# 1. Install server dependencies
cd server
npm install --production

# 2. Install client dependencies
cd ..\front
npm install

# 3. Build the frontend
npm run build

# 4. Start server with PM2
cd ..\server
pm2 start ../ecosystem.config.js --env production

# 5. Save PM2 configuration
pm2 save
pm2 startup  # Follow instructions to set up auto-start
```

### Step 5: Configure Windows Firewall

Allow traffic on port 3000:

```powershell
New-NetFirewallRule -DisplayName "Math Center Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### Step 6: Verify Deployment

```powershell
# Check PM2 status
pm2 status

# View logs
pm2 logs math-center-server

# Test the server
curl http://localhost:3000
```

You should see the application running at `http://your-server-ip:3000`

---

## 🌐 Domain Configuration

### Step 7: Update Configuration for Domain

When your domain is ready (e.g., `mathcenter.example.com`):

#### 7.1 Update Server Environment

Edit `server/.env`:
```env
FRONTEND_URL=https://mathcenter.example.com
```

#### 7.2 Update Client Environment

Edit `front/.env.production`:
```env
VITE_API_BASE_URL=https://mathcenter.example.com
```

#### 7.3 Update CORS in Server Code

Edit `server/app.js`, add your domain to `allowedOrigins`:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://mathcenter.example.com",  // Add your domain here
  process.env.FRONTEND_URL,
].filter(Boolean);
```

#### 7.4 Rebuild and Restart

```powershell
# Rebuild frontend with new environment
cd front
npm run build

# Restart server
cd ..\server
pm2 restart math-center-server
```

### Step 8: Set Up Reverse Proxy (Recommended)

You have several options:

#### Option A: IIS with URL Rewrite

1. Install IIS and URL Rewrite module
2. Create a new site pointing to your domain
3. Configure reverse proxy to forward to `http://localhost:3000`
4. Set up SSL certificate

#### Option B: Nginx (if installed)

Configure Nginx to:
- Serve static files from `front/dist`
- Proxy API requests to `http://localhost:3000`

#### Option C: Direct Access

Point your domain DNS A record to your server's IP address and access via `http://your-domain.com:3000` (or configure port forwarding)

---

## 🔄 Maintenance

### Common PM2 Commands

```powershell
# View all processes
pm2 list

# View logs (real-time)
pm2 logs math-center-server

# View logs (last 100 lines)
pm2 logs math-center-server --lines 100

# Restart application
pm2 restart math-center-server

# Stop application
pm2 stop math-center-server

# Start application
pm2 start math-center-server

# Delete application
pm2 delete math-center-server

# Monitor resources (CPU, Memory)
pm2 monit

# Save current process list
pm2 save
```

### Updating the Application

```powershell
# 1. Pull latest changes
git pull origin main

# 2. Update dependencies (if package.json changed)
cd server
npm install --production
cd ..\front
npm install

# 3. Rebuild frontend
npm run build

# 4. Restart server
cd ..\server
pm2 restart math-center-server
```

### Creating Admin User

```powershell
cd server
node src/utils/createAdmin.js
```

### Database Seeding (if needed)

```powershell
cd server
node src/utils/seedDatabase.js
```

---

## 🐛 Troubleshooting

### Server Won't Start

1. **Check MongoDB connection:**
   ```powershell
   # Test MongoDB connection
   mongo --eval "db.version()"
   ```

2. **Check port availability:**
   ```powershell
   netstat -ano | findstr :3000
   ```

3. **Check environment variables:**
   ```powershell
   cd server
   # Verify .env file exists and has correct values
   type .env
   ```

4. **View detailed error logs:**
   ```powershell
   pm2 logs math-center-server --err
   ```

### Frontend Build Fails

1. **Clear cache and reinstall:**
   ```powershell
   cd front
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm install
   npm run build
   ```

### CORS Errors

- Verify `FRONTEND_URL` in `server/.env` matches your domain
- Check `allowedOrigins` in `server/app.js` includes your domain
- Ensure `NODE_ENV=production` is set

### Can't Access from Browser

1. **Check Windows Firewall:**
   ```powershell
   Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*Math Center*"}
   ```

2. **Check PM2 is running:**
   ```powershell
   pm2 status
   ```

3. **Test locally first:**
   ```powershell
   curl http://localhost:3000
   ```

---

## 📝 Important Notes

1. **Security:**
   - Never commit `.env` files to Git
   - Use strong, random values for `JWT_SECRET_KEY`
   - Keep `ADMIN_PASSWORD` secure
   - Enable HTTPS in production

2. **Backups:**
   - Regularly backup your MongoDB database
   - Keep backups of your `.env` files (securely)
   - Version control your code (Git)

3. **Performance:**
   - Monitor with `pm2 monit`
   - Consider using a reverse proxy for better performance
   - Enable gzip compression in your web server

4. **Updates:**
   - Keep Node.js and dependencies updated
   - Monitor for security updates
   - Test updates in a staging environment first

---

## 🎯 Quick Reference

**Initial Deployment:**
```powershell
git clone <repo-url> math_center
cd math_center
cd server && Copy-Item .env.example .env && notepad .env
cd ..\front && Copy-Item .env.production.example .env.production && notepad .env.production
cd .. && .\deploy.ps1
```

**After Domain Assignment:**
```powershell
# Update .env files with domain
# Rebuild frontend
cd front && npm run build
# Restart server
cd ..\server && pm2 restart math-center-server
```

**Daily Operations:**
```powershell
pm2 status              # Check status
pm2 logs math-center-server  # View logs
pm2 restart math-center-server  # Restart if needed
```

---

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs math-center-server`
2. Verify environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check Windows Firewall rules
5. Verify port 3000 is not blocked

Good luck with your deployment! 🚀

