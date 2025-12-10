# Windows Server Deployment Guide

This guide will help you deploy the Mathematics Research Center application to a Windows Server.

## Prerequisites

- ✅ Node.js and npm installed
- ✅ PM2 installed globally (`npm install -g pm2`)
- ✅ Git installed
- ✅ MongoDB installed and running (or MongoDB Atlas connection string)
- ✅ Windows Server with appropriate permissions

## Step 1: Clone the Repository

```powershell
# Navigate to your desired deployment directory
cd C:\inetpub\wwwroot  # or your preferred location

# Clone your repository
git clone <your-github-repo-url> math_center
cd math_center
```

## Step 2: Set Up Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory:

```powershell
cd server
notepad .env
```

Add the following content (replace with your actual values):

```env
NODE_ENV=production
PORT=3000
DB_URL=mongodb://localhost:27017/math_center
# OR for MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/math_center?retryWrites=true&w=majority

DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET_KEY=your_super_secret_jwt_key_min_32_characters_long
REGISTRATION_SECRET=your_registration_secret_key_2024
```

### Client Environment Variables

Create a `.env.production` file in the `front` directory:

```powershell
cd ..\front
notepad .env.production
```

Add the following content (replace with your domain):

```env
VITE_API_BASE_URL=http://your-domain.com:3000
# OR if using reverse proxy:
# VITE_API_BASE_URL=https://your-domain.com/api
```

## Step 3: Install Dependencies

### Install Server Dependencies

```powershell
cd server
npm install --production
```

### Install Client Dependencies

```powershell
cd ..\front
npm install
```

## Step 4: Build the Client Application

```powershell
cd front
npm run build
```

This will create a `dist` folder with the production-ready static files.

## Step 5: Configure Server for Production

The server needs to serve the built client files. Update the server configuration if needed.

## Step 6: Set Up PM2 for Process Management

### Create PM2 Ecosystem File

Create `ecosystem.config.js` in the root directory (see the file created for you).

### Start the Server with PM2

```powershell
cd server
pm2 start ecosystem.config.js --env production
```

Or use the simple command:

```powershell
pm2 start server.js --name "math-center-server" --env production
```

### Save PM2 Configuration

```powershell
pm2 save
pm2 startup
```

Follow the instructions to set up PM2 to start on Windows boot.

## Step 7: Configure Windows Firewall

Allow traffic on the ports you're using:

```powershell
# Allow port 3000 (server)
New-NetFirewallRule -DisplayName "Math Center Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow

# Allow port 80 (HTTP) if using reverse proxy
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Allow port 443 (HTTPS) if using SSL
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

## Step 8: Domain Configuration (When Domain is Ready)

### Option A: Using IIS as Reverse Proxy

1. Install IIS and URL Rewrite module
2. Create a new site in IIS
3. Configure reverse proxy to forward requests to `http://localhost:3000`
4. Set up SSL certificate for HTTPS

### Option B: Using Nginx (if installed)

Configure Nginx to serve the frontend and proxy API requests to the Node.js server.

### Option C: Direct Port Access

Simply point your domain to the server's IP and configure DNS:

- `your-domain.com` → Server IP (port 80/443)
- API: `your-domain.com:3000` or via reverse proxy

## Step 9: Update CORS Configuration

When you have your domain, update `server/app.js` to include your domain in the `allowedOrigins` array.

## Step 10: Verify Deployment

1. Check if server is running:

   ```powershell
   pm2 status
   pm2 logs math-center-server
   ```

2. Test the API:

   ```powershell
   curl http://localhost:3000
   ```

3. Test the frontend (if served by server):
   ```powershell
   curl http://localhost:3000
   ```

## Useful PM2 Commands

```powershell
# View all processes
pm2 list

# View logs
pm2 logs math-center-server

# Restart application
pm2 restart math-center-server

# Stop application
pm2 stop math-center-server

# Delete application
pm2 delete math-center-server

# Monitor resources
pm2 monit
```

## Troubleshooting

### Server won't start

- Check MongoDB connection
- Verify environment variables are set correctly
- Check port 3000 is not in use: `netstat -ano | findstr :3000`

### Client build fails

- Ensure all dependencies are installed
- Check Node.js version compatibility

### CORS errors

- Update `allowedOrigins` in `server/app.js` with your domain
- Ensure environment variable `NODE_ENV=production` is set

## Next Steps After Domain Assignment

1. Update `.env.production` with actual domain
2. Rebuild frontend: `cd front && npm run build`
3. Update CORS in `server/app.js`
4. Restart PM2: `pm2 restart math-center-server`
5. Configure SSL certificate for HTTPS
6. Set up reverse proxy (IIS/Nginx) if needed
