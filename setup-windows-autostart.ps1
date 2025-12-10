# Windows Auto-Start Setup Script for PM2
# This script creates a Windows Task Scheduler task to start PM2 on boot

Write-Host "🔧 Setting up Windows Auto-Start for PM2..." -ForegroundColor Cyan

# Check if running with proper execution policy
$ExecutionPolicy = Get-ExecutionPolicy -Scope CurrentUser
if ($ExecutionPolicy -eq "Restricted") {
    Write-Host "⚠️  PowerShell execution policy is Restricted!" -ForegroundColor Yellow
    Write-Host "   This script needs to run scripts. Fixing execution policy..." -ForegroundColor Yellow
    try {
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force -ErrorAction Stop
        Write-Host "✅ Execution policy updated" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not update execution policy." -ForegroundColor Red
        Write-Host "   Please run as Administrator or use:" -ForegroundColor Yellow
        Write-Host "   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" -ForegroundColor Yellow
        exit 1
    }
}

# Get the current directory (project root)
$ProjectRoot = $PSScriptRoot
$StartScript = Join-Path $ProjectRoot "start-pm2.ps1"

# Check if start script exists
if (-not (Test-Path $StartScript)) {
    Write-Host "❌ Error: start-pm2.ps1 not found!" -ForegroundColor Red
    Write-Host "   Make sure you're running this from the project root directory." -ForegroundColor Yellow
    exit 1
}

# Get Node.js path
$NodePath = (Get-Command node).Source
$NodeDir = Split-Path -Parent $NodePath

# Task name
$TaskName = "MathCenter-PM2-Startup"

# Check if task already exists
$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($ExistingTask) {
    Write-Host "⚠️  Task already exists. Removing old task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# Create the scheduled task
Write-Host "📝 Creating scheduled task..." -ForegroundColor Cyan

# PowerShell command to execute
$Action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$StartScript`"" `
    -WorkingDirectory $ProjectRoot

# Trigger: At startup
$Trigger = New-ScheduledTaskTrigger -AtStartup

# Settings
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable:$false `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1)

# Principal (run as current user, highest privileges)
$Principal = New-ScheduledTaskPrincipal `
    -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive `
    -RunLevel Highest

# Register the task
try {
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Principal $Principal `
        -Description "Auto-start PM2 for Math Center application on Windows boot" | Out-Null
    
    Write-Host "✅ Scheduled task created successfully!" -ForegroundColor Green
    Write-Host "`n📋 Task Details:" -ForegroundColor Cyan
    Write-Host "   Name: $TaskName" -ForegroundColor Gray
    Write-Host "   Trigger: At startup" -ForegroundColor Gray
    Write-Host "   Script: $StartScript" -ForegroundColor Gray
    
    Write-Host "`n💡 To test the task:" -ForegroundColor Yellow
    Write-Host "   Start-ScheduledTask -TaskName `"$TaskName`"" -ForegroundColor Gray
    
    Write-Host "`n💡 To remove the task:" -ForegroundColor Yellow
    Write-Host "   Unregister-ScheduledTask -TaskName `"$TaskName`" -Confirm:`$false" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Error creating scheduled task:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`n💡 Try running PowerShell as Administrator" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✅ Auto-start setup complete!" -ForegroundColor Green
Write-Host "   PM2 will automatically start when Windows boots." -ForegroundColor Gray

