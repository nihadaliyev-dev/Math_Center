const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { DB_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/config");

// Import Models
const UserModel = require("../models/userModel");
const ResearcherModel = require("../models/researcherModel");
const CategoryModel = require("../models/categoryModel");
const DocumentModel = require("../models/documentModel");
const RepositoryModel = require("../models/repositoryModel");
const TimeEntryModel = require("../models/timeEntryModel");
const NotificationModel = require("../models/notificationModel");
const NewsModel = require("../models/newsModel");
const EventModel = require("../models/eventModel");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    await mongoose.connect(DB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Promise.all([
      UserModel.deleteMany({}),
      ResearcherModel.deleteMany({}),
      CategoryModel.deleteMany({}),
      DocumentModel.deleteMany({}),
      RepositoryModel.deleteMany({}),
      TimeEntryModel.deleteMany({}),
      NotificationModel.deleteMany({}),
      NewsModel.deleteMany({}),
      EventModel.deleteMany({}),
    ]);
    console.log("✅ Cleared existing data");

    // 1. Create Admin User
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD || "admin123", 10);
    const adminUser = await UserModel.create({
      email: ADMIN_EMAIL || "admin@mathcenter.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log(`✅ Admin user created: ${adminUser.email}`);

    // 2. Create Categories for Time Tracking
    console.log("📁 Creating categories...");
    const categories = await CategoryModel.insertMany([
      {
        name: "Algebraic Modeling",
        timeSpent: 12.5,
        color: "#FF6B6B",
      },
      {
        name: "Complex Analysis Results",
        timeSpent: 8.2,
        color: "#4ECDC4",
      },
      {
        name: "Applied Math Experiments",
        timeSpent: 15.7,
        color: "#45B7D1",
      },
      {
        name: "AI-Math Integration",
        timeSpent: 6.3,
        color: "#96CEB4",
      },
      {
        name: "Thesis Draft",
        timeSpent: 22.1,
        color: "#FFEAA7",
      },
      {
        name: "Number Theory Research",
        timeSpent: 10.4,
        color: "#A29BFE",
      },
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // 3. Create Researchers
    console.log("👨‍🔬 Creating researchers...");
    const researchers = await ResearcherModel.insertMany([
      {
        fullName: "Dr. Sarah Mitchell",
        email: "sarah.mitchell@mathcenter.com",
        affiliation: "MIT Mathematics Department",
        role: "Admin",
        orcid: "0000-0001-2345-6789",
        contributions: 89,
        bio: "Specializing in algebraic topology and differential geometry. Published over 50 research papers.",
        avatar: "/avatars/sarah.png",
        joinedDate: new Date("2020-01-15"),
      },
      {
        fullName: "Prof. Ahmed Hassan",
        email: "ahmed.hassan@mathcenter.com",
        affiliation: "Stanford University",
        role: "Editor",
        orcid: "0000-0002-3456-7890",
        contributions: 67,
        bio: "Expert in complex analysis and mathematical physics.",
        avatar: "/avatars/ahmed.png",
        joinedDate: new Date("2020-06-20"),
      },
      {
        fullName: "Dr. Elena Kozlova",
        email: "elena.kozlova@mathcenter.com",
        affiliation: "Cambridge Mathematics Institute",
        role: "Researcher",
        orcid: "0000-0003-4567-8901",
        contributions: 52,
        bio: "Research focus on applied mathematics and computational methods.",
        avatar: "/avatars/elena.png",
        joinedDate: new Date("2021-03-10"),
      },
      {
        fullName: "Dr. James Chen",
        email: "james.chen@mathcenter.com",
        affiliation: "Caltech",
        role: "Researcher",
        orcid: "0000-0004-5678-9012",
        contributions: 45,
        bio: "Working on number theory and cryptography applications.",
        avatar: "/avatars/james.png",
        joinedDate: new Date("2021-09-01"),
      },
      {
        fullName: "Dr. Maria Rodriguez",
        email: "maria.rodriguez@mathcenter.com",
        affiliation: "Princeton University",
        role: "Researcher",
        orcid: "0000-0005-6789-0123",
        contributions: 38,
        bio: "Specializing in probability theory and stochastic processes.",
        avatar: "/avatars/maria.png",
        joinedDate: new Date("2022-02-14"),
      },
    ]);
    console.log(`✅ Created ${researchers.length} researchers`);

    // 4. Create Documents
    console.log("📄 Creating documents...");
    const documents = await DocumentModel.insertMany([
      {
        title: "Advanced Topological Analysis of Manifolds",
        abstract:
          "This paper explores the topological properties of high-dimensional manifolds using novel analytical techniques.",
        authors: ["Dr. Sarah Mitchell", "Prof. Ahmed Hassan"],
        fileType: "PDF",
        category: "Topology",
        tags: ["topology", "manifolds", "differential geometry"],
        publicationStatus: "Published",
        doi: "10.1234/math.2024.001",
        visibility: "Public",
        fileUrl: "/documents/topology-analysis.pdf",
        fileSize: "3.2 MB",
        uploadDate: new Date("2024-01-15"),
        lastEdited: new Date("2024-01-20"),
      },
      {
        title: "Number Theory Applications in Cryptography",
        abstract:
          "Exploring the practical applications of number theory in modern cryptographic systems.",
        authors: ["Dr. James Chen"],
        fileType: "PDF",
        category: "Algebra",
        tags: ["number theory", "cryptography", "algorithms"],
        publicationStatus: "Peer-reviewed",
        visibility: "Public",
        fileUrl: "/documents/number-theory-crypto.pdf",
        fileSize: "2.8 MB",
        uploadDate: new Date("2024-02-10"),
        lastEdited: new Date("2024-02-15"),
      },
      {
        title: "Stochastic Processes in Financial Mathematics",
        abstract:
          "A comprehensive study of stochastic differential equations and their applications in finance.",
        authors: ["Dr. Maria Rodriguez"],
        fileType: "PDF",
        category: "Applied Math",
        tags: ["stochastic processes", "finance", "probability"],
        publicationStatus: "Published",
        doi: "10.1234/math.2024.002",
        visibility: "Public",
        fileUrl: "/documents/stochastic-finance.pdf",
        fileSize: "4.1 MB",
        uploadDate: new Date("2024-03-05"),
        lastEdited: new Date("2024-03-08"),
      },
      {
        title: "Complex Analysis in Quantum Mechanics",
        abstract:
          "Investigating the role of complex analysis in quantum mechanical frameworks.",
        authors: ["Prof. Ahmed Hassan", "Dr. Elena Kozlova"],
        fileType: "LaTeX",
        category: "Analysis",
        tags: ["complex analysis", "quantum mechanics", "physics"],
        publicationStatus: "Draft",
        visibility: "Internal",
        fileUrl: "/documents/complex-quantum.tex",
        fileSize: "1.9 MB",
        uploadDate: new Date("2024-04-01"),
        lastEdited: new Date(),
      },
      {
        title: "Computational Methods for Differential Equations",
        abstract:
          "Novel computational approaches for solving partial differential equations.",
        authors: ["Dr. Elena Kozlova"],
        fileType: "PDF",
        category: "Applied Math",
        tags: ["computational math", "PDEs", "numerical methods"],
        publicationStatus: "Peer-reviewed",
        visibility: "Public",
        fileUrl: "/documents/computational-pde.pdf",
        fileSize: "3.5 MB",
        uploadDate: new Date("2024-03-20"),
        lastEdited: new Date("2024-03-25"),
      },
    ]);
    console.log(`✅ Created ${documents.length} documents`);

    // 5. Create Repositories
    console.log("📚 Creating repositories...");
    const repositories = await RepositoryModel.insertMany([
      {
        name: "Calculus Research",
        category: "Mathematical Analysis",
        isPublic: true,
        fileCount: 23,
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        size: "45.2 MB",
        owner: researchers[0]._id,
      },
      {
        name: "Linear Algebra Projects",
        category: "Algebra",
        isPublic: false,
        fileCount: 18,
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        size: "32.1 MB",
        owner: researchers[0]._id,
      },
      {
        name: "Statistics & Probability",
        category: "Applied Mathematics",
        isPublic: true,
        fileCount: 31,
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        size: "67.8 MB",
        owner: researchers[4]._id,
      },
      {
        name: "Topology Research Archive",
        category: "Topology",
        isPublic: true,
        fileCount: 42,
        lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        size: "89.5 MB",
        owner: researchers[1]._id,
      },
    ]);
    console.log(`✅ Created ${repositories.length} repositories`);

    // 6. Create Time Entries
    console.log("⏱️  Creating time entries...");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeEntries = await TimeEntryModel.insertMany([
      {
        category: "Algebraic Modeling",
        hours: 3.5,
        date: today,
        author: "Dr. Sarah Mitchell",
        userId: adminUser._id,
      },
      {
        category: "Complex Analysis Results",
        hours: 2.0,
        date: today,
        author: "Prof. Ahmed Hassan",
        userId: adminUser._id,
      },
      {
        category: "Applied Math Experiments",
        hours: 4.2,
        date: today,
        author: "Dr. Elena Kozlova",
        userId: adminUser._id,
      },
      {
        category: "AI-Math Integration",
        hours: 1.5,
        date: today,
        author: "Dr. James Chen",
        userId: adminUser._id,
      },
      {
        category: "Thesis Draft",
        hours: 5.8,
        date: today,
        author: "Dr. Maria Rodriguez",
        userId: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${timeEntries.length} time entries`);

    // 7. Create Notifications
    console.log("🔔 Creating notifications...");
    const notifications = await NotificationModel.insertMany([
      {
        type: "success",
        message:
          "New document 'Advanced Topological Analysis' has been published",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        userId: adminUser._id,
      },
      {
        type: "info",
        message: "Dr. James Chen joined the research team",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: false,
        userId: adminUser._id,
      },
      {
        type: "warning",
        message: "Repository 'Linear Algebra Projects' needs review",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        userId: adminUser._id,
      },
      {
        type: "info",
        message: "System maintenance scheduled for next week",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        read: true,
        userId: adminUser._id,
      },
    ]);
    console.log(`✅ Created ${notifications.length} notifications`);

    // 8. Create News Articles
    console.log("📰 Creating news articles...");
    const newsArticles = await NewsModel.insertMany([
      {
        title: {
          en: "Breakthrough in Topology Research",
          az: "Topologiya Tədqiqatında Yeni Nailiyyət",
        },
        coverImage: "/news/topology-breakthrough.jpg",
      },
      {
        title: {
          en: "New Mathematical Center Opening",
          az: "Yeni Riyaziyyat Mərkəzinin Açılışı",
        },
        coverImage: "/news/center-opening.jpg",
      },
    ]);
    console.log(`✅ Created ${newsArticles.length} news articles`);

    // 9. Create Events
    console.log("📅 Creating events...");
    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 30); // 30 days from now
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 45); // 45 days from now
    const futureDate3 = new Date();
    futureDate3.setDate(futureDate3.getDate() + 15); // 15 days from now
    const futureDate4 = new Date();
    futureDate4.setDate(futureDate4.getDate() + 60); // 60 days from now

    const events = await EventModel.insertMany([
      {
        title: "International Mathematics Conference 2025",
        description:
          "Join us for the annual international mathematics conference featuring top researchers from around the world. This year's theme focuses on breakthrough discoveries in topology, number theory, and applied mathematics.",
        startDate: futureDate2,
        endDate: new Date(futureDate2.getTime() + 2 * 24 * 60 * 60 * 1000),
        location: "On-Campus",
        organizer: "Mathematics Research Center",
        speakers: [
          "Dr. Sarah Mitchell",
          "Prof. Ahmed Hassan",
          "Dr. Elena Kozlova",
        ],
        registrationLink: "https://mathcenter.com/events/conf2025",
        coverImage:
          "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800",
        tags: ["conference", "international", "research"],
        status: "Published",
      },
      {
        title: "Workshop: Advanced Calculus Techniques",
        description:
          "A hands-on workshop covering advanced techniques in differential and integral calculus. Perfect for graduate students and researchers looking to deepen their understanding of calculus applications.",
        startDate: futureDate3,
        endDate: futureDate3,
        location: "Online",
        organizer: "Mathematics Research Center",
        speakers: ["Dr. James Chen"],
        registrationLink: "https://mathcenter.com/events/calculus-workshop",
        coverImage:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        tags: ["workshop", "calculus", "online"],
        status: "Published",
      },
      {
        title: "Seminar: Quantum Computing and Mathematics",
        description:
          "Explore the fascinating intersection of quantum computing and advanced mathematics. Learn how linear algebra, group theory, and complex analysis play crucial roles in quantum algorithms.",
        startDate: futureDate1,
        endDate: futureDate1,
        location: "Online",
        organizer: "Mathematics Research Center",
        speakers: ["Prof. Ahmed Hassan", "Dr. Elena Kozlova"],
        registrationLink: "https://mathcenter.com/events/quantum-seminar",
        coverImage:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        tags: ["seminar", "quantum computing", "online"],
        status: "Published",
      },
      {
        title: "Summer School: Machine Learning for Mathematicians",
        description:
          "A comprehensive two-week summer school program introducing mathematical foundations of machine learning. Topics include optimization theory, statistical learning, and deep learning architectures.",
        startDate: futureDate4,
        endDate: new Date(futureDate4.getTime() + 14 * 24 * 60 * 60 * 1000),
        location: "On-Campus",
        organizer: "Mathematics Research Center",
        speakers: [
          "Dr. James Chen",
          "Dr. Maria Rodriguez",
          "Dr. Sarah Mitchell",
        ],
        registrationLink: "https://mathcenter.com/events/ml-summer-school",
        coverImage:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
        tags: ["summer school", "machine learning", "AI"],
        status: "Published",
      },
    ]);
    console.log(`✅ Created ${events.length} events`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Admin Users: 1`);
    console.log(`   - Researchers: ${researchers.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Documents: ${documents.length}`);
    console.log(`   - Repositories: ${repositories.length}`);
    console.log(`   - Time Entries: ${timeEntries.length}`);
    console.log(`   - Notifications: ${notifications.length}`);
    console.log(`   - News Articles: ${newsArticles.length}`);
    console.log(`   - Events: ${events.length} (all upcoming)`);
    console.log("\n📝 Admin Login Credentials:");
    console.log(`   Email: ${ADMIN_EMAIL || "admin@mathcenter.com"}`);
    console.log(`   Password: ${ADMIN_PASSWORD || "admin123"}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
