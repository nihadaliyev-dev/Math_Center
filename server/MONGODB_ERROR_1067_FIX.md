# How to Fix MongoDB "System Error 1067" on Windows

## CRITICAL: Why this is happening now?
You mentioned **"This server ran earlier."**

The most likely reason it is crashing **now** is:
1.  An older, compatible version (like 4.x) was running in the background.
2.  MongoDB was **updated** to version 8.2 (either automatically or manually), but the **service hadn't restarted yet**.
3.  When you restarted the computer/server, it tried to load the **new** version (8.2).
4.  This new version **requires** a newer CPU feature (AVX) that your processor might not have.
5.  Result: It crashes immediately with `Illegal Instruction (0xC000001D)`.

---

## THE SOLUTION: Downgrade to MongoDB 4.4
Since your hardware cannot run version 8.2, you must go back to version 4.4.

### Step 1: Uninstall Current MongoDB
1. Open **Control Panel** > **Programs and Features**.
2. Find **MongoDB 8.2.x**.
3. Right-click and **Uninstall**.
4. Go to `C:\Program Files\MongoDB\Server\` and **delete the `8.2` folder**.

### Step 2: Install MongoDB 4.4
1. Go to the [MongoDB Community Download Page](https://www.mongodb.com/try/download/community).
2. on the right side, look for "Version".
3. Select a **4.4.x** version (e.g., 4.4.18).
   - *Note: Do not select 5.0, 6.0, 7.0 or 8.0.*
4. Download the **MSI**.
5. Install it:
   - Choose "Complete".
   - **Check "Install MongoD as a Service"**.
   - Use the default data directory (or point it to your existing one if compatible, but a clean start is safer).

### Step 3: Verify It Works
1. Open PowerShell.
2. Type `net start MongoDB`.
3. It should start successfully.

---

## Alternative: Verify if your CPU supports AVX
If you want to be 100% sure before uninstalling:
1. Open PowerShell on the server.
2. Run this command:
   ```powershell
   Get-CimInstance -ClassName Win32_Processor | Select-Object -Property Name
   ```
3. Google the processor name + "AVX support". 
   - If it says "No AVX", then **you MUST use MongoDB 4.4**.
