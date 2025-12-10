# Windows PM2 Auto-Start Setup

## ⚠️ Important: PM2 Startup on Windows

The `pm2 startup` command **does not work on Windows**. This command is designed for Linux/Unix systems (systemd, upstart, etc.).

## ✅ Solution: Windows Task Scheduler

Use Windows Task Scheduler to automatically start PM2 when Windows boots.

### Quick Setup (Automated)

Run the setup script:

```powershell
.\setup-windows-autostart.ps1
```

This will:
- Create a Windows Task Scheduler task
- Configure it to run at Windows startup
- Set it to run with highest privileges
- Use the `start-pm2.ps1` script to start PM2

### Manual Setup

If you prefer to set it up manually:

1. **Open Task Scheduler:**
   ```powershell
   taskschd.msc
   ```

2. **Create Basic Task:**
   - Right-click "Task Scheduler Library" → "Create Basic Task"
   - Name: `MathCenter-PM2-Startup`
   - Description: `Auto-start PM2 for Math Center application`

3. **Set Trigger:**
   - Select "When the computer starts"

4. **Set Action:**
   - Select "Start a program"
   - Program/script: `powershell.exe`
   - Add arguments: `-NoProfile -ExecutionPolicy Bypass -File "C:\path\to\math_center\start-pm2.ps1"`
   - Start in: `C:\path\to\math_center`

5. **Configure Settings:**
   - Check "Run whether user is logged on or not"
   - Check "Run with highest privileges"
   - Check "Allow task to be run on demand"
   - Under "If the task fails, restart every": 1 minute, up to 3 times

6. **Finish:**
   - Click "Finish"
   - Enter your Windows password if prompted

### Verify Setup

1. **Test the task:**
   ```powershell
   Start-ScheduledTask -TaskName "MathCenter-PM2-Startup"
   ```

2. **Check PM2 status:**
   ```powershell
   pm2 status
   ```

3. **View task in Task Scheduler:**
   - Open Task Scheduler
   - Find "MathCenter-PM2-Startup" in the list
   - Check "Last Run Result" should be "0x0" (success)

### Remove Auto-Start

If you need to remove the auto-start:

```powershell
Unregister-ScheduledTask -TaskName "MathCenter-PM2-Startup" -Confirm:$false
```

## Alternative: Startup Folder Method

You can also add a shortcut to the Windows Startup folder:

```powershell
$StartupFolder = [System.Environment]::GetFolderPath("Startup")
$ScriptPath = Join-Path $PSScriptRoot "start-pm2.ps1"
$ShortcutPath = Join-Path $StartupFolder "MathCenter-PM2.lnk"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$ScriptPath`""
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.Save()

Write-Host "Shortcut created in Startup folder: $StartupFolder" -ForegroundColor Green
```

**Note:** This method only works if the user is logged in, while Task Scheduler works even when no user is logged in.

## Troubleshooting

### Task doesn't run on startup

1. **Check Task Scheduler:**
   - Open Task Scheduler
   - Find your task
   - Check "Last Run Result" for errors
   - Check "History" tab for detailed logs

2. **Verify script path:**
   - Make sure the path to `start-pm2.ps1` is correct
   - Use absolute paths, not relative paths

3. **Check execution policy:**
   ```powershell
   Get-ExecutionPolicy
   # If Restricted, run:
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. **Run manually to test:**
   ```powershell
   .\start-pm2.ps1
   ```

### PM2 processes don't restore

Make sure you've saved your PM2 configuration:

```powershell
pm2 save
```

This creates a `~/.pm2/dump.pm2` file that stores your process list.

### Permission errors

Run PowerShell as Administrator when:
- Creating the scheduled task
- If you get permission errors

## What the Scripts Do

### `start-pm2.ps1`
- Starts PM2 daemon if not running
- Navigates to server directory
- Starts PM2 processes from `ecosystem.config.js`
- Restores saved PM2 processes
- Shows PM2 status

### `setup-windows-autostart.ps1`
- Creates a Windows Task Scheduler task
- Configures it to run at startup
- Sets proper permissions and settings
- Links to `start-pm2.ps1` script

## Summary

✅ **Use:** `.\setup-windows-autostart.ps1`  
❌ **Don't use:** `pm2 startup` (doesn't work on Windows)

The Task Scheduler method is more reliable and works even when no user is logged in, making it perfect for server deployments.

