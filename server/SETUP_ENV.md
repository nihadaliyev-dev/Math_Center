# Setting Up Environment Variables

## Problem

You're seeing this error:
```
❌ DB connection failed: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

This means the `.env` file is missing or `DB_URL` is not set.

## Quick Fix

### Step 1: Create .env file

```powershell
cd server
Copy-Item .env.example .env
```

If `.env.example` doesn't exist, create `.env` manually:

```powershell
notepad .env
```

### Step 2: Add Required Variables

Copy this template and fill in your values:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
# For local MongoDB:
DB_URL=mongodb://localhost:27017/math_center

# OR for MongoDB Atlas (replace with your connection string):
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/math_center?retryWrites=true&w=majority

DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Admin Account
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# Security (IMPORTANT: Use strong, random values)
JWT_SECRET_KEY=your_super_secret_jwt_key_min_32_characters_long_change_this
REGISTRATION_SECRET=your_registration_secret_key_2024

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Step 3: Required Variables

**Minimum required for server to start:**
- `DB_URL` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens (use a long random string)

**Example for local MongoDB:**
```env
DB_URL=mongodb://localhost:27017/math_center
JWT_SECRET_KEY=my_super_secret_key_12345678901234567890
```

**Example for MongoDB Atlas:**
```env
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/math_center?retryWrites=true&w=majority
JWT_SECRET_KEY=my_super_secret_key_12345678901234567890
```

### Step 4: Verify

After creating `.env`, restart your server:

```powershell
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:3000
```

## Common Issues

### MongoDB Not Running

If MongoDB is not running locally:
- Start MongoDB service, or
- Use MongoDB Atlas (cloud)

### Invalid Connection String

Make sure your `DB_URL` is correct:
- Local: `mongodb://localhost:27017/math_center`
- Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### File Not Found

Make sure `.env` is in the `server` directory, not the root directory.

## Generate Secure Keys

For `JWT_SECRET_KEY`, use a long random string. You can generate one:

**PowerShell:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Node.js:**
```javascript
require('crypto').randomBytes(32).toString('hex')
```

## Next Steps

Once `.env` is configured:
1. Start MongoDB (if using local)
2. Run `npm run dev`
3. Server should connect successfully

