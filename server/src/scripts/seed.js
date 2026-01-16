const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const UserModel = require('../models/userModel');
const NewsModel = require('../models/newsModel');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        // --- SEED ADMIN USER ---
        const existingAdmin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL });
        if (!existingAdmin) {
            console.log('🌱 Seeding Admin User...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);

            await UserModel.create({
                email: process.env.ADMIN_EMAIL || 'admin000@gmail.com',
                password: hashedPassword,
                role: 'admin',
                isSuperAdmin: true
            });
            console.log('✅ Admin User created successfully');
        } else {
            console.log('ℹ️ Admin User already exists');
        }

        // --- SEED NEWS ---
        const count = await NewsModel.countDocuments();
        if (count === 0) {
            console.log('🌱 Seeding News...');
            const sampleNews = [
                {
                    title: { az: "Riyaziyyat Mərkəzi Açıldı", en: "Math Center Opened" },
                    content: "Math Center has been officially opened at ASOIU.",
                    coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    status: "Published",
                    category: "Updates",
                    author: "Admin",
                    tags: ["ASOIU", "Math"]
                },
                {
                    title: { az: "Yeni Tədqiqat Qrantı", en: "New Research Grant" },
                    content: "We have received a new grant for mathematical research.",
                    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    status: "Published",
                    category: "Research",
                    author: "Admin",
                    tags: ["Grant", "Research"]
                }
            ];
            await NewsModel.insertMany(sampleNews);
            console.log('✅ Sample News created successfully');
        } else {
            console.log('ℹ️ News data already exists');
        }

        console.log('✨ Seeding complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
