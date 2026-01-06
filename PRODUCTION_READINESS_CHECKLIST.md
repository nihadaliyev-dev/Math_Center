# Production Readiness Checklist

## Mathematics Research Center - mrc.asoiu.edu.az

## ✅ Completed Configuration

### 1. Domain Configuration

- [x] Domain added to Vite `allowedHosts`: `mrc.asoiu.edu.az`
- [x] Domain added to CORS `allowedOrigins` in `server/app.js`
- [x] Domain added to robots.txt allow list
- [x] Domain added to .htaccess allow list

### 2. Security Files Created

- [x] `front/public/robots.txt` - SEO and crawler configuration
- [x] `front/public/.htaccess` - Apache server configuration
- [x] `server/public/.htaccess` - API server configuration

### 3. Security Headers

- [x] Helmet.js configured with production security headers
- [x] Content Security Policy (CSP) configured
- [x] HSTS enabled for HTTPS
- [x] XSS Protection enabled
- [x] MIME type sniffing prevention

### 4. CORS Configuration

- [x] Production domain allowed
- [x] HTTPS and HTTP variants configured
- [x] Credentials enabled
- [x] Proper headers configured

## 📋 Pre-Production Checklist

### Environment Variables

**Server `.env` file must have:**

```env
NODE_ENV=production
PORT=3000
DB_URL=mongodb://... (or MongoDB Atlas connection string)
JWT_SECRET_KEY=<strong_random_string_min_32_chars>
FRONTEND_URL=https://mrc.asoiu.edu.az
ADMIN_EMAIL=admin@asoiu.edu.az
ADMIN_PASSWORD=<secure_password>
REGISTRATION_SECRET=<random_secret>
```

**Frontend `.env.production` file must have:**

```env
VITE_API_BASE_URL=https://mrc.asoiu.edu.az
```

### Build Process

- [ ] Frontend built: `cd front && npm run build`
- [ ] Verify `front/dist` folder exists with all files
- [ ] Verify `robots.txt` is in `front/dist`
- [ ] Verify `.htaccess` is in `front/dist` (if using Apache)

### Server Configuration

- [ ] Server running in production mode: `NODE_ENV=production`
- [ ] PM2 process running: `pm2 status`
- [ ] MongoDB connection working
- [ ] Port 3000 accessible
- [ ] Windows Firewall allows port 3000

### DNS & SSL

- [ ] DNS A record points to server IP
- [ ] Domain resolves correctly: `nslookup mrc.asoiu.edu.az`
- [ ] SSL certificate installed (for HTTPS)
- [ ] HTTPS redirect configured (uncomment in .htaccess)
- [ ] Certificate auto-renewal configured

### Security

- [ ] Strong JWT_SECRET_KEY (32+ characters, random)
- [ ] Strong ADMIN_PASSWORD
- [ ] .env files NOT committed to Git
- [ ] Database credentials secure
- [ ] Rate limiting enabled (already in code)
- [ ] File upload limits configured
- [ ] Admin routes protected

### Performance

- [ ] Frontend assets minified
- [ ] Images optimized
- [ ] Gzip compression enabled (in .htaccess or server)
- [ ] Browser caching configured
- [ ] CDN configured (optional)

### Monitoring & Logging

- [ ] PM2 logs configured
- [ ] Error logging working
- [ ] Server health check endpoint (optional)
- [ ] Uptime monitoring (optional)

### Backup

- [ ] MongoDB backup strategy
- [ ] File uploads backup
- [ ] Environment files backed up securely
- [ ] Backup restoration tested

## 🚀 Deployment Steps

### 1. Final Build

```powershell
# Build frontend
cd front
npm run build

# Verify build
Test-Path dist/index.html
Test-Path dist/robots.txt
```

### 2. Update Environment

```powershell
# Server .env
cd server
notepad .env
# Set NODE_ENV=production
# Set FRONTEND_URL=https://mrc.asoiu.edu.az

# Frontend .env.production
cd ..\front
notepad .env.production
# Set VITE_API_BASE_URL=https://mrc.asoiu.edu.az
```

### 3. Rebuild with New Environment

```powershell
cd front
npm run build
```

### 4. Restart Server

```powershell
cd ..\server
pm2 restart math-center-server --update-env
```

### 5. Verify

- [ ] Visit https://mrc.asoiu.edu.az
- [ ] Check browser console for errors
- [ ] Test API endpoints
- [ ] Test admin login
- [ ] Check robots.txt: https://mrc.asoiu.edu.az/robots.txt

## 🔍 Post-Deployment Verification

### Functionality Tests

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] API calls succeed
- [ ] Admin login works
- [ ] File uploads work
- [ ] Images display correctly
- [ ] Forms submit correctly

### Security Tests

- [ ] HTTPS redirects work
- [ ] CORS blocks unauthorized domains
- [ ] Admin routes require authentication
- [ ] Rate limiting works
- [ ] Security headers present (check with browser dev tools)

### SEO Tests

- [ ] robots.txt accessible
- [ ] Meta tags present
- [ ] Sitemap accessible (if created)
- [ ] No console errors

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] Assets cached
- [ ] No 404 errors

## ⚠️ Important Notes

### .htaccess Files

- These files work with **Apache** web server
- If using **IIS** (Windows), use `web.config` instead
- If using **Nginx**, configure in nginx.conf
- If using **Express directly** (no reverse proxy), .htaccess won't work

### robots.txt

- Automatically copied to `dist` folder during build
- Accessible at: `https://mrc.asoiu.edu.az/robots.txt`
- Update sitemap URL when sitemap is created

### SSL Certificate

- Uncomment HTTPS redirect in .htaccess after SSL is installed
- Use Let's Encrypt for free SSL
- Configure auto-renewal

### Domain Allow Lists

- robots.txt: Allows crawlers for the domain
- .htaccess: Restricts access to only allowed domains
- CORS: Allows API requests from the domain
- Vite: Allows dev server access from the domain

## 🐛 Troubleshooting

### robots.txt not accessible

- Check if file is in `front/dist` after build
- Verify Express serves static files from `dist`
- Check file permissions

### .htaccess not working

- Verify Apache mod_rewrite is enabled
- Check Apache error logs
- If using IIS, convert to web.config
- If using Nginx, configure in nginx.conf

### CORS errors

- Verify domain in `allowedOrigins` array
- Check `FRONTEND_URL` in server .env
- Restart server after changes

### Security headers not showing

- Check Helmet configuration
- Verify `NODE_ENV=production`
- Check browser dev tools Network tab

## 📝 Maintenance

### Regular Tasks

- [ ] Monitor PM2 logs weekly
- [ ] Check server resources monthly
- [ ] Update dependencies quarterly
- [ ] Review security headers annually
- [ ] Backup database daily
- [ ] Test restore procedure monthly

### Updates

- Always test in staging first
- Update environment variables before deployment
- Rebuild frontend after .env.production changes
- Restart server after server .env changes

## ✅ Production Ready!

Once all items are checked, your application is ready for production!
