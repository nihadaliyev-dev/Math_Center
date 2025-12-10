# Fix PowerShell Execution Policy for Current User
# This script sets the execution policy to allow local scripts to run

Write-Host "🔧 Fixing PowerShell Execution Policy..." -ForegroundColor Cyan

# Check current execution policy
$CurrentPolicy = Get-ExecutionPolicy -Scope CurrentUser
Write-Host "Current execution policy: $CurrentPolicy" -ForegroundColor Yellow

# Set execution policy to RemoteSigned for current user only
# This allows local scripts to run, but requires downloaded scripts to be signed
try {
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    Write-Host "✅ Execution policy updated successfully!" -ForegroundColor Green
    Write-Host "   New policy: RemoteSigned (CurrentUser)" -ForegroundColor Gray
    Write-Host "`n💡 This allows:" -ForegroundColor Yellow
    Write-Host "   - Local scripts to run without signing" -ForegroundColor Gray
    Write-Host "   - Downloaded scripts must be signed (more secure)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error updating execution policy:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`n💡 Try running PowerShell as Administrator" -ForegroundColor Yellow
    exit 1
}

# Verify the change
$NewPolicy = Get-ExecutionPolicy -Scope CurrentUser
Write-Host "`n✅ Verification: Current execution policy is now: $NewPolicy" -ForegroundColor Green

Write-Host "`n🚀 You can now run:" -ForegroundColor Cyan
Write-Host "   .\setup-windows-autostart.ps1" -ForegroundColor Gray
Write-Host "   pm2 start ..." -ForegroundColor Gray

