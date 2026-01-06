# Domain Setup Guide - mrc.asoiu.edu.az

## ✅ Fixed Issues

1. **Vite Configuration** - Added `mrc.asoiu.edu.az` to allowed hosts
2. **CORS Configuration** - Added domain to allowed origins in server
3. **Production Setup** - Verified Express serves built frontend files

## 🔧 Important: Use Production Build, Not Dev Server

**⚠️ CRITICAL:** For production with a domain, you MUST:
- Use the **production build** served by Express (port 3000)
- NOT use the Vite dev server (port 5173)

The Vite dev server is only for development. In production, Express serves the built static files.

## 📋 Setup Steps

### 1. Update Environment Variables

**Server `.env` file:**
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://mrc.asoiu.edu.az
# ... other variables
```

**Frontend `.env.production` file:**
```env
VITE_API_BASE_URL=https://mrc.asoiu.edu.az
# OR if using reverse proxy:
# VITE_API_BASE_URL=https://mrc.asoiu.edu.az/api
```

### 2. Build Frontend for Production

```powershell
cd front
npm run build
```

This creates the `dist` folder with production files.

### 3. Start Server in Production Mode

```powershell
cd server
# Make sure NODE_ENV=production in .env
npm start
# OR with PM2:
pm2 start server.js --name "math-center-server" --env production
```

### 4. Verify Configuration

- ✅ Server runs on port 3000
- ✅ Frontend is built (check `front/dist` folder exists)
- ✅ `NODE_ENV=production` in server `.env`
- ✅ CORS allows `mrc.asoiu.edu.az`
- ✅ `FRONTEND_URL` set in server `.env`

## 🌐 Domain Configuration

### Option A: Direct Port Access

Point DNS to your server IP and access via:
- `http://mrc.asoiu.edu.az:3000` (HTTP)
- `https://mrc.asoiu.edu.az:3000` (HTTPS, requires SSL certificate)

### Option B: Reverse Proxy (Recommended)

Use IIS or Nginx to:
- Listen on port 80/443 (standard HTTP/HTTPS)
- Proxy requests to `http://localhost:3000`
- Handle SSL certificates

**IIS Configuration:**
1. Install URL Rewrite module
2. Create reverse proxy rule:
   - Inbound: `mrc.asoiu.edu.az`
   - Outbound: `http://localhost:3000`

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name mrc.asoiu.edu.az;

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

## 🔍 Troubleshooting

### Error: "Blocked request. This host is not allowed"

**If using Vite dev server (development only):**
- The fix is already applied in `vite.config.ts`
- Restart dev server: `npm run dev`

**For production:**
- Don't use Vite dev server!
- Use production build served by Express
- Make sure `NODE_ENV=production`

### CORS Errors

- Verify `mrc.asoiu.edu.az` is in `allowedOrigins` in `server/app.js` ✅ (Already fixed)
- Check `FRONTEND_URL` in server `.env`
- Restart server after changes

### Frontend Not Loading

1. Check if `front/dist` folder exists
2. Verify build completed: `cd front && npm run build`
3. Check server logs for errors
4. Verify Express is serving static files (check `server/app.js` lines 72-75)

### API Calls Failing

1. Check `VITE_API_BASE_URL` in `front/.env.production`
2. Rebuild frontend after changing `.env.production`
3. Check browser console for CORS errors
4. Verify server CORS configuration

## ✅ Verification Checklist

- [ ] Server `.env` has `NODE_ENV=production`
- [ ] Server `.env` has `FRONTEND_URL=https://mrc.asoiu.edu.az`
- [ ] Frontend `.env.production` has `VITE_API_BASE_URL=https://mrc.asoiu.edu.az`
- [ ] Frontend is built: `front/dist` folder exists
- [ ] Server is running in production mode
- [ ] CORS allows `mrc.asoiu.edu.az` (already fixed in code)
- [ ] DNS points to server IP
- [ ] Port 3000 is accessible (or reverse proxy configured)
- [ ] SSL certificate installed (for HTTPS)

## 🚀 Quick Deploy Command

```powershell
# 1. Update environment files (manually edit .env files)

# 2. Build and start
cd front
npm run build
cd ..\server
pm2 restart math-center-server --update-env
```

## 📝 Notes

- The Vite dev server fix is for development only
- Production MUST use the built files served by Express
- Always rebuild frontend after changing `.env.production`
- Restart server after changing server `.env`

