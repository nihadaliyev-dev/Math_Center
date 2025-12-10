# Quick Start Guide - Windows Server Deployment

## 🚀 Fast Deployment (5 Steps)

### 1. Clone Repository
```powershell
git clone <your-github-repo-url> math_center
cd math_center
```

### 2. Create Environment Files

**Server:**
```powershell
cd server
Copy-Item .env.example .env
notepad .env
# Edit with your MongoDB connection, JWT secret, etc.
```

**Client:**
```powershell
cd ..\front
Copy-Item .env.production.example .env.production
notepad .env.production
# Edit with your API URL (use localhost:3000 for now, update later with domain)
```

### 3. Run Deployment Script
```powershell
cd ..
.\deploy.ps1
```

Or manually:

```powershell
# Install dependencies
cd server
npm install --production
cd ..\front
npm install
npm run build
cd ..

# Start with PM2
cd server
pm2 start ../ecosystem.config.js --env production
pm2 save
```

### 4. Configure Firewall
```powershell
New-NetFirewallRule -DisplayName "Math Center Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### 5. Test
- Open browser: `http://your-server-ip:3000`
- Check PM2: `pm2 status`
- View logs: `pm2 logs math-center-server`

## 📋 When Domain is Ready

1. **Update Environment Files:**
   - `server/.env` - Add `FRONTEND_URL=https://your-domain.com`
   - `front/.env.production` - Update `VITE_API_BASE_URL`

2. **Update CORS in `server/app.js`:**
   - Add your domain to `allowedOrigins` array

3. **Rebuild Frontend:**
   ```powershell
   cd front
   npm run build
   ```

4. **Restart Server:**
   ```powershell
   pm2 restart math-center-server
   ```

5. **Configure Reverse Proxy (IIS/Nginx)** to point domain to `http://localhost:3000`

## 🔧 Common Commands

```powershell
# PM2 Management
pm2 status                    # View all processes
pm2 logs math-center-server   # View logs
pm2 restart math-center-server # Restart
pm2 stop math-center-server   # Stop
pm2 monit                     # Monitor resources

# Rebuild after changes
cd front
npm run build
pm2 restart math-center-server
```

## ⚠️ Important Notes

- MongoDB must be running and accessible
- Port 3000 must be open in Windows Firewall
- Update CORS settings before going live with domain
- Use strong JWT_SECRET_KEY in production
- Keep `.env` files secure and never commit them

