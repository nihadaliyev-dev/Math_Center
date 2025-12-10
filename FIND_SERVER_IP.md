# How to Find Your Server IP Address

## Quick Commands

### Find Local IP Address (Internal Network)

**PowerShell:**
```powershell
# Get all IP addresses
Get-NetIPAddress -AddressFamily IPv4 | Select-Object IPAddress, InterfaceAlias

# Get primary IP address (usually the active network adapter)
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"}).IPAddress

# Simple one-liner for main IP
ipconfig | findstr /i "IPv4"
```

**Command Prompt (CMD):**
```cmd
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

### Find Public IP Address (Internet)

**PowerShell:**
```powershell
# Method 1: Using Invoke-WebRequest
(Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content

# Method 2: Using curl (if available)
curl https://api.ipify.org

# Method 3: Alternative service
(Invoke-WebRequest -Uri "https://ifconfig.me" -UseBasicParsing).Content
```

**Command Prompt (CMD):**
```cmd
curl https://api.ipify.org
```

**Browser:**
- Visit: https://whatismyipaddress.com/
- Or: https://api.ipify.org

## Detailed Information

### View All Network Adapters

```powershell
Get-NetIPConfiguration | Format-Table InterfaceAlias, IPv4Address, IPv6Address
```

### Find IP by Network Adapter Name

```powershell
# For Ethernet
Get-NetIPAddress -InterfaceAlias "Ethernet*" -AddressFamily IPv4

# For Wi-Fi
Get-NetIPAddress -InterfaceAlias "Wi-Fi*" -AddressFamily IPv4
```

## For Server Deployment

### Local Network Access

If you want to access the server from other devices on the same network:

1. **Find your local IP:**
   ```powershell
   ipconfig | findstr /i "IPv4"
   ```
   Example output: `IPv4 Address. . . . . . . . . . . : 192.168.1.100`

2. **Access from other devices:**
   - Use: `http://192.168.1.100:3000`
   - Make sure Windows Firewall allows port 3000

### Public Internet Access

If you want to access from the internet:

1. **Find your public IP:**
   ```powershell
   (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content
   ```

2. **Configure:**
   - Port forwarding on your router (port 3000 → server IP)
   - Windows Firewall rules
   - Your domain DNS (if you have one)

## Quick Reference Script

Save this as `get-ip.ps1`:

```powershell
Write-Host "=== Server IP Address Information ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Local IP Addresses:" -ForegroundColor Yellow
Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object {$_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"} |
    Select-Object IPAddress, InterfaceAlias | Format-Table -AutoSize

Write-Host "Public IP Address:" -ForegroundColor Yellow
try {
    $PublicIP = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content
    Write-Host $PublicIP -ForegroundColor Green
} catch {
    Write-Host "Could not determine public IP" -ForegroundColor Red
}

Write-Host ""
Write-Host "Server URL (if running on port 3000):" -ForegroundColor Yellow
$LocalIP = (Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object {$_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"}).IPAddress | Select-Object -First 1
Write-Host "Local:  http://$LocalIP:3000" -ForegroundColor Green
Write-Host "Public: http://$PublicIP:3000" -ForegroundColor Green
```

Run it:
```powershell
.\get-ip.ps1
```

## Common IP Address Ranges

- **127.0.0.1** or **localhost** - Only accessible from the same computer
- **192.168.x.x** or **10.x.x.x** - Local network (LAN) IP
- **169.254.x.x** - Auto-assigned when DHCP fails (not usable)
- **Public IP** - Accessible from internet (if router configured)

## For Your Application

Once you know your IP:

1. **Update CORS in `server/app.js`** if accessing from different origin
2. **Update `front/.env.production`** with the API URL:
   ```env
   VITE_API_BASE_URL=http://YOUR_IP:3000
   ```
3. **Configure Windows Firewall:**
   ```powershell
   New-NetFirewallRule -DisplayName "Math Center Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
   ```

