require("dotenv").config();
const mongoose = require("mongoose");
const { DB_URL } = require("./src/config/config");

console.log("🔍 MongoDB Connection Diagnostic Tool\n");

// Check if DB_URL exists
if (!DB_URL) {
    console.error("❌ DB_URL is not defined in .env file");
    process.exit(1);
}

// Mask password for display
const maskedUrl = DB_URL.replace(/(:\/\/[^:]+:)([^@]+)(@)/, "$1****$3");
console.log(`📋 Connection String (masked): ${maskedUrl}\n`);

// Validate connection string format
console.log("🔍 Validating connection string format...");

if (DB_URL.startsWith("mongodb+srv://")) {
    console.log("   ✓ Using MongoDB Atlas (SRV) connection");
    
    // Extract parts for validation
    const match = DB_URL.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/);
    if (match) {
        const [, username, password, host, database] = match;
        console.log(`   ✓ Username: ${username}`);
        console.log(`   ✓ Host: ${host}`);
        console.log(`   ✓ Database: ${database}`);
        
        // Check if host looks correct (should contain cluster name)
        if (!host.includes("cluster") && !host.includes("mongodb.net")) {
            console.warn(`   ⚠️  Host '${host}' might be incorrect. Should be like 'cluster0.xxxxx.mongodb.net'`);
        }
    } else {
        console.error("   ❌ Connection string format appears incorrect");
        console.error("   Expected format: mongodb+srv://username:password@cluster.mongodb.net/database");
    }
} else if (DB_URL.startsWith("mongodb://")) {
    console.log("   ✓ Using standard MongoDB connection");
    
    const match = DB_URL.match(/mongodb:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/);
    if (match) {
        const [, username, password, host, database] = match;
        console.log(`   ✓ Host: ${host}`);
        console.log(`   ✓ Database: ${database}`);
    } else {
        // Try without auth
        const match2 = DB_URL.match(/mongodb:\/\/([^/]+)\/([^?]+)/);
        if (match2) {
            const [, host, database] = match2;
            console.log(`   ✓ Host: ${host}`);
            console.log(`   ✓ Database: ${database}`);
        }
    }
} else {
    console.error("   ❌ Invalid connection string format");
    console.error("   Should start with 'mongodb://' or 'mongodb+srv://'");
}

console.log("\n🔗 Attempting to connect...");

const connectionOptions = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

mongoose.connect(DB_URL, connectionOptions)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB!");
        console.log(`   Database: ${mongoose.connection.db.databaseName}`);
        console.log(`   Host: ${mongoose.connection.host}`);
        mongoose.disconnect().then(() => {
            console.log("\n✅ Connection test completed successfully");
            process.exit(0);
        });
    })
    .catch((err) => {
        console.error("\n❌ Connection failed!");
        console.error(`   Error: ${err.message}\n`);
        
        if (err.message.includes("ENOTFOUND") || err.message.includes("querySrv")) {
            console.error("💡 DNS Resolution Error - Troubleshooting steps:");
            console.error("   1. Verify your MongoDB Atlas cluster exists and is running");
            console.error("   2. Check if the cluster name in your connection string matches Atlas");
            console.error("   3. Ensure your IP address is whitelisted in MongoDB Atlas");
            console.error("   4. Try pinging the hostname to check DNS resolution");
            console.error("   5. For local MongoDB, ensure the service is running");
        } else if (err.message.includes("authentication failed")) {
            console.error("💡 Authentication Error:");
            console.error("   Check your username and password in the connection string");
        } else if (err.message.includes("ECONNREFUSED")) {
            console.error("💡 Connection Refused:");
            console.error("   - If using local MongoDB, ensure it's running");
            console.error("   - Check firewall settings");
            console.error("   - Verify the port number is correct");
        }
        
        process.exit(1);
    });
