const { PORT, DB_URL } = require("./config");
const mongoose = require("mongoose");

const connectToDB = (app) => {
    // Validate DB_URL exists
    if (!DB_URL) {
        console.error("❌ DB_URL is not defined in .env file");
        console.error("💡 Please check your .env file and ensure DB_URL is set");
        process.exit(1);
    }

    // Mask password in connection string for logging
    const maskedUrl = DB_URL.replace(/(:\/\/[^:]+:)([^@]+)(@)/, "$1****$3");

    console.log(`🔗 Attempting to connect to MongoDB...`);
    console.log(`   Connection string: ${maskedUrl}`);

    // Connection options for better error handling
    const connectionOptions = {
        serverSelectionTimeoutMS: 10000, // 10 seconds timeout
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority'
    };

    mongoose.connect(DB_URL, connectionOptions).then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.error("❌ DB connection failed:", err.message);
        
        // Provide helpful error messages based on error type
        if (err.message.includes("ENOTFOUND") || err.message.includes("querySrv")) {
            console.error("\n💡 DNS Resolution Error - Possible issues:");
            console.error("   1. Check if your MongoDB connection string is correct");
            console.error("   2. For MongoDB Atlas, ensure the cluster exists and is accessible");
            console.error("   3. Verify your internet connection");
            console.error("   4. Check if the cluster name in the connection string matches your Atlas cluster");
            console.error("\n   Example format for MongoDB Atlas:");
            console.error("   DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority");
            console.error("\n   Example format for local MongoDB:");
            console.error("   DB_URL=mongodb://localhost:27017/math_center");
        } else if (err.message.includes("authentication failed")) {
            console.error("\n💡 Authentication Error:");
            console.error("   Check your username and password in the connection string");
        } else if (err.message.includes("ECONNREFUSED")) {
            console.error("\n💡 Connection Refused:");
            console.error("   Make sure MongoDB is running (if local) or check your network connection");
        }
        
        console.error(`\n   Full error: ${err.message}`);
        process.exit(1);
    });
};

module.exports = connectToDB;
