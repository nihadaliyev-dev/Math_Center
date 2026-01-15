# MongoDB Setup Guide for Windows Server

This guide explains how to install and configure MongoDB Community Server on Windows.

## 1. Download MongoDB
1. Go to the [MongoDB Community Server Download page](https://www.mongodb.com/try/download/community).
2. Select **Version**: Current Stable (e.g., 7.0 or higher).
3. Select **Platform**: Windows x64.
4. Select **Package**: MSI.
5. Click **Download**.

## 2. Install MongoDB
1. Run the downloaded `.msi` installer.
2. Click **Next**.
3. Accept the license agreement and click **Next**.
4. Choose **Complete** as the setup type.
5. **Important**: Select **"Install MongoD as a Service"**. 
   - This ensures MongoDB runs automatically when the server starts.
   - Keep the default data directory (`C:\Program Files\MongoDB\Server\X.X\data\`) or choose a custom one.
6. (Optional) Uncheck "Install MongoDB Compass" if you prefer a different GUI or want a lighter installation.
7. Click **Install**.
8. Click **Finish** once completed.

## 3. Verify Installation
1. Open PowerShell or Command Prompt as Administrator.
2. Type `mongod --version` to verify the installation.
   - *Note: You may need to add the MongoDB bin folder (e.g., `C:\Program Files\MongoDB\Server\7.0\bin`) to your System PATH environment variable if the command is not found.*

## 4. Manage the Service
MongoDB runs as a Windows Service labeled `MongoDB`.
- **Start**: `net start MongoDB`
- **Stop**: `net stop MongoDB`
- **Restart**: `net stop MongoDB` followed by `net start MongoDB`

## 5. Configure Your Application
Update your `.env` file in the `server/` directory to connect to the local instance:

```env
# Local MongoDB Connection String
DB_URL=mongodb://127.0.0.1:27017/math_center

# If using authentication (optional for local dev, recommended for production):
# DB_URL=mongodb://username:password@127.0.0.1:27017/math_center?authSource=admin
```

## 6. (Optional) Create a Database User
If you want to secure your local database:
1. Open the MongoDB Shell (`mongosh`).
2. Switch to the admin database: `use admin`
3. Create a root user:
   ```javascript
   db.createUser({
     user: "admin",
     pwd: "securepassword",
     roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
   })
   ```
4. Update your `DB_URL` to include the credentials.
