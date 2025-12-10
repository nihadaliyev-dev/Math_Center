# Windows Server Deployment Script
# Run this script from the project root directory

Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if PM2 is installed
if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  PM2 is not installed globally. Installing..." -ForegroundColor Yellow
    npm install -g pm2
}

# Step 1: Install Server Dependencies
Write-Host "`n📦 Installing server dependencies..." -ForegroundColor Cyan
Set-Location server
if (-not (Test-Path "node_modules")) {
    npm install --production
} else {
    Write-Host "   Dependencies already installed, skipping..." -ForegroundColor Gray
}
Set-Location ..

# Step 2: Install Client Dependencies
Write-Host "`n📦 Installing client dependencies..." -ForegroundColor Cyan
Set-Location front
if (-not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "   Dependencies already installed, skipping..." -ForegroundColor Gray
}
Set-Location ..

# Step 3: Check for environment files
Write-Host "`n🔍 Checking environment configuration..." -ForegroundColor Cyan
if (-not (Test-Path "server\.env")) {
    Write-Host "⚠️  server\.env file not found!" -ForegroundColor Yellow
    Write-Host "   Please create server\.env file based on server\.env.example" -ForegroundColor Yellow
    Write-Host "   Copy the example file: Copy-Item server\.env.example server\.env" -ForegroundColor Yellow
}

if (-not (Test-Path "front\.env.production")) {
    Write-Host "⚠️  front\.env.production file not found!" -ForegroundColor Yellow
    Write-Host "   Please create front\.env.production file based on front\.env.production.example" -ForegroundColor Yellow
    Write-Host "   Copy the example file: Copy-Item front\.env.production.example front\.env.production" -ForegroundColor Yellow
}

# Step 4: Build Client
Write-Host "`n🏗️  Building client application..." -ForegroundColor Cyan
Set-Location front
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Client build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Step 5: Create logs directory for PM2
Write-Host "`n📁 Creating logs directory..." -ForegroundColor Cyan
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

# Step 6: Stop existing PM2 process if running
Write-Host "`n🛑 Stopping existing PM2 processes..." -ForegroundColor Cyan
pm2 stop math-center-server 2>$null
pm2 delete math-center-server 2>$null

# Step 7: Start server with PM2
Write-Host "`n🚀 Starting server with PM2..." -ForegroundColor Cyan
Set-Location server
pm2 start ../ecosystem.config.js --env production
Set-Location ..

# Step 8: Save PM2 configuration
Write-Host "`n💾 Saving PM2 configuration..." -ForegroundColor Cyan
pm2 save

# Note: pm2 startup doesn't work on Windows
Write-Host "`n💡 Windows Auto-Start Setup:" -ForegroundColor Yellow
Write-Host "   Run: .\setup-windows-autostart.ps1" -ForegroundColor Gray
Write-Host "   (This will create a Windows Task Scheduler task)" -ForegroundColor Gray

# Step 9: Display status
Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host "`n📊 PM2 Status:" -ForegroundColor Cyan
pm2 status

Write-Host "`n📝 Useful commands:" -ForegroundColor Yellow
Write-Host "   View logs: pm2 logs math-center-server" -ForegroundColor Gray
Write-Host "   Restart: pm2 restart math-center-server" -ForegroundColor Gray
Write-Host "   Stop: pm2 stop math-center-server" -ForegroundColor Gray
Write-Host "   Monitor: pm2 monit" -ForegroundColor Gray

Write-Host "`n⚠️  Don't forget to:" -ForegroundColor Yellow
Write-Host "   1. Configure Windows Firewall for port 3000" -ForegroundColor Gray
Write-Host "   2. Update CORS settings in server/app.js with your domain" -ForegroundColor Gray
Write-Host "   3. Update front/.env.production with your API URL" -ForegroundColor Gray
Write-Host "   4. Rebuild frontend after updating .env.production" -ForegroundColor Gray

