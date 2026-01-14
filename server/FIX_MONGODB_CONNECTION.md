# Fix MongoDB Connection Issue

## Problem

The MongoDB connection is failing with DNS resolution error:

```
querySrv ENOTFOUND _mongodb._tcp.math-center.zfkzsyt.mongodb.net
```

## Root Cause

The MongoDB Atlas cluster hostname in your connection string doesn't exist or is incorrect.

## Solution

### Option 1: Get Correct Connection String from MongoDB Atlas (Recommended)

1. **Log in to MongoDB Atlas**: https://cloud.mongodb.com
2. **Select your cluster** (or create a new one if needed)
3. **Click "Connect"** button
4. **Choose "Connect your application"**
5. **Copy the connection string** - it should look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database?retryWrites=true&w=majority
   ```
6. **Update your `.env` file**:
   ```env
   DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/math_center?retryWrites=true&w=majority
   ```
   ⚠️ **Important**: Replace `username`, `password`, and `cluster0.xxxxx.mongodb.net` with your actual values

### Option 2: Use Local MongoDB

If you have MongoDB installed locally:

1. **Start MongoDB service**:

   ```powershell
   # Check if MongoDB is running
   Get-Service MongoDB

   # Start if not running
   Start-Service MongoDB
   ```

2. **Update `.env` file**:
   ```env
   DB_URL=mongodb://localhost:27017/math_center
   ```

### Option 3: Fix Current Connection String

If your cluster exists but the hostname is wrong, try:

1. Check if the cluster name should be `cluster0` instead of `math-center`:

   ```env
   DB_URL=mongodb+srv://lamaner:ejvneSCQRRcTMgYm@cluster0.zfkzsyt.mongodb.net/math_center?retryWrites=true&w=majority&appName=math-center
   ```

2. Or check your Atlas dashboard for the exact cluster hostname

## Verify Connection

After updating `.env`, test the connection:

```powershell
cd server
node test-db-connection.js
```

You should see:

```
✅ Successfully connected to MongoDB!
```

## Additional Checks

### MongoDB Atlas Network Access

- Ensure your IP address is whitelisted in MongoDB Atlas
- Go to: Network Access → Add IP Address
- Or use `0.0.0.0/0` for development (not recommended for production)

### MongoDB Atlas Database User

- Verify the username `lamaner` exists in your Atlas cluster
- Check Database Access → Users
- Ensure the user has proper permissions

## Current Connection String (for reference)

```
mongodb+srv://lamaner:ejvneSCQRRcTMgYm@math-center.zfkzsyt.mongodb.net/math_center?retryWrites=true&w=majority&appName=math-center
```

**Issue**: The hostname `math-center.zfkzsyt.mongodb.net` doesn't resolve via DNS.
