const DocumentModel = require("../models/documentModel");
const ResearcherModel = require("../models/researcherModel");
const EventModel = require("../models/eventModel");
const NewsModel = require("../models/newsModel");
const UserModel = require("../models/userModel");

class DashboardService {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const totalUsers = await ResearcherModel.countDocuments();
      const totalDocuments = await DocumentModel.countDocuments();
      const totalEvents = await EventModel.countDocuments();
      const totalNews = await NewsModel.countDocuments();

      // Calculate recent activity (last 24 hours)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const recentActivity = await DocumentModel.countDocuments({
        lastEdited: { $gte: yesterday },
      });

      // Calculate user growth (last 30 days vs previous 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const recentUsers = await ResearcherModel.countDocuments({
        joinedDate: { $gte: thirtyDaysAgo },
      });

      const previousUsers = await ResearcherModel.countDocuments({
        joinedDate: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
      });

      const userGrowth =
        previousUsers > 0
          ? ((recentUsers - previousUsers) / previousUsers) * 100
          : 0;

      return {
        totalUsers,
        totalDocuments,
        totalEvents,
        totalNews,
        recentActivity,
        userGrowth: parseFloat(userGrowth.toFixed(1)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Get user data for profile card
  async getUserData(userId) {
    try {
      // First check if it's an admin user
      const adminUser = await UserModel.findById(userId);
      if (adminUser) {
        // For admin users, get their document count
        const totalDocuments = await DocumentModel.countDocuments({
          author: userId,
        });

        return {
          id: adminUser._id,
          name: adminUser.username || adminUser.email.split("@")[0],
          avatar: adminUser.avatar || "/avatar.png",
          dataUsed: "N/A",
          totalDocuments: totalDocuments || 0,
          rating: 5.0, // Admin gets max rating
          rank: 1, // Admin is always rank 1
        };
      }

      // Otherwise, check if it's a researcher
      const researcher = await ResearcherModel.findById(userId);
      if (!researcher) throw new Error("User not found");

      // Get user's rank based on contributions
      const allResearchers = await ResearcherModel.find()
        .sort({ contributions: -1 })
        .select("_id contributions");

      const rank =
        allResearchers.findIndex(
          (r) => r._id.toString() === userId.toString()
        ) + 1;

      // Calculate rating based on contributions
      const rating = this.calculateRating(researcher.contributions);

      return {
        id: researcher._id,
        name: researcher.fullName,
        avatar: researcher.avatar,
        dataUsed: "2.3 GB", // This would come from actual file storage calculation
        totalDocuments: researcher.contributions,
        rating,
        rank,
      };
    } catch (error) {
      throw error;
    }
  }

  calculateRating(contributions) {
    if (contributions >= 80) return 4.9;
    if (contributions >= 60) return 4.85;
    if (contributions >= 40) return 4.7;
    if (contributions >= 20) return 4.5;
    return 4.0;
  }
}

module.exports = new DashboardService();
