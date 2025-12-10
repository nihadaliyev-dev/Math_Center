# PM2 Startup Script for Windows
# This script starts PM2 and restores saved processes
# Use this with Windows Task Scheduler for auto-start on boot

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# Start PM2 daemon if not running
$pm2Running = pm2 ping 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Starting PM2 daemon..." -ForegroundColor Yellow
    pm2 kill 2>$null
    Start-Sleep -Seconds 2
}

# Navigate to server directory and start PM2 processes
Set-Location server
pm2 start ../ecosystem.config.js --env production

# Restore saved PM2 processes
pm2 resurrect

Write-Host "PM2 processes started successfully!" -ForegroundColor Green
pm2 status

