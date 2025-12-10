# Fix PowerShell Execution Policy Issue

## Problem

You're seeing this error:
```
cannot be loaded because running scripts is disabled on this system
```

This happens because Windows PowerShell blocks script execution by default for security.

## Quick Fix (Recommended)

### Option 1: Run the Fix Script (Easiest)

```powershell
# First, you need to bypass the policy temporarily to run the fix script
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

Then you can run all other scripts normally.

### Option 2: Use the Automated Fix Script

If you can run scripts with bypass, use our fix script:

```powershell
powershell -ExecutionPolicy Bypass -File .\fix-execution-policy.ps1
```

### Option 3: Manual Fix

Run this command in PowerShell (as Administrator if needed):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` when prompted.

## What Each Policy Means

- **Restricted** (default) - No scripts can run
- **RemoteSigned** (recommended) - Local scripts run, downloaded scripts must be signed
- **Unrestricted** - All scripts run (less secure)
- **Bypass** - No restrictions (use only temporarily)

## Recommended: RemoteSigned

This is the best balance of security and functionality:
- ✅ Allows your local scripts to run
- ✅ Requires downloaded scripts to be signed
- ✅ Only affects your user account (not system-wide)

## Temporary Bypass (One-Time Use)

If you just need to run a script once without changing policy:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-windows-autostart.ps1
```

Or for PM2 commands, use `cmd` instead:

```cmd
pm2 start .\ecosystem.config.js --env production
```

## Verify Fix

After setting the policy, verify it worked:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

Should show: `RemoteSigned`

## For PM2 Specifically

If PM2 still doesn't work after fixing execution policy, you can:

1. **Use CMD instead of PowerShell:**
   ```cmd
   pm2 start .\ecosystem.config.js --env production
   ```

2. **Or use npx:**
   ```powershell
   npx pm2 start .\ecosystem.config.js --env production
   ```

3. **Or use full path:**
   ```powershell
   & "C:\Users\Sayt\AppData\Roaming\npm\pm2.cmd" start .\ecosystem.config.js --env production
   ```

## Summary

**Quickest solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

Then run your scripts normally!

