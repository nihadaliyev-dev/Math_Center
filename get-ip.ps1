# Quick IP Address Finder Script
# Shows both local and public IP addresses

Write-Host "=== Server IP Address Information ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Local IP Addresses:" -ForegroundColor Yellow
$LocalIPs = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object {$_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"} |
    Select-Object IPAddress, InterfaceAlias

if ($LocalIPs) {
    $LocalIPs | Format-Table -AutoSize
} else {
    Write-Host "No valid local IP addresses found" -ForegroundColor Red
}

Write-Host "Public IP Address:" -ForegroundColor Yellow
try {
    $PublicIP = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing -TimeoutSec 5).Content
    Write-Host $PublicIP -ForegroundColor Green
} catch {
    Write-Host "Could not determine public IP (check internet connection)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Server Access URLs ===" -ForegroundColor Cyan
$PrimaryLocalIP = ($LocalIPs | Select-Object -First 1).IPAddress
if ($PrimaryLocalIP) {
    Write-Host "Local Network:  http://$PrimaryLocalIP:3000" -ForegroundColor Green
}
Write-Host "Localhost:       http://localhost:3000" -ForegroundColor Green
Write-Host "127.0.0.1:       http://127.0.0.1:3000" -ForegroundColor Green
if ($PublicIP) {
    Write-Host "Public Internet: http://$PublicIP:3000" -ForegroundColor Yellow
    Write-Host "                (Requires port forwarding on router)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Network Adapter Details ===" -ForegroundColor Cyan
Get-NetIPConfiguration | Where-Object {$_.IPv4Address} | Format-Table InterfaceAlias, IPv4Address, InterfaceDescription -AutoSize

