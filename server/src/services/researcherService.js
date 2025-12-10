const ResearcherModel = require("../models/researcherModel");

class ResearcherService {
  // Create a new researcher
  async createResearcher(researcherData) {
    try {
      const researcher = new ResearcherModel(researcherData);
      await researcher.save();
      return researcher;
    } catch (error) {
      throw error;
    }
  }

  // Get all researchers
  async getAllResearchers(filters = {}) {
    try {
      const researchers = await ResearcherModel.find(filters).sort({
        createdAt: -1,
      });
      return researchers;
    } catch (error) {
      throw error;
    }
  }

  // Get researcher by ID
  async getResearcherById(id) {
    try {
      const researcher = await ResearcherModel.findById(id);
      return researcher;
    } catch (error) {
      throw error;
    }
  }

  // Update researcher
  async updateResearcher(id, updateData) {
    try {
      const researcher = await ResearcherModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      return researcher;
    } catch (error) {
      throw error;
    }
  }

  // Delete researcher
  async deleteResearcher(id) {
    try {
      const researcher = await ResearcherModel.findByIdAndDelete(id);
      return researcher;
    } catch (error) {
      throw error;
    }
  }

  // Search researchers
  async searchResearchers(query) {
    try {
      const researchers = await ResearcherModel.find({
        $or: [
          { fullName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { affiliation: { $regex: query, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
      return researchers;
    } catch (error) {
      throw error;
    }
  }

  // Get leaderboard
  async getLeaderboard(limit = 10) {
    try {
      const researchers = await ResearcherModel.find()
        .sort({ contributions: -1 })
        .limit(limit);

      return researchers.map((researcher, index) => ({
        id: researcher._id,
        name: researcher.fullName,
        avatar: researcher.avatar,
        rating: this.calculateRating(researcher.contributions),
        rank: index + 1,
        documentsCount: researcher.contributions,
      }));
    } catch (error) {
      throw error;
    }
  }

  // Calculate rating based on contributions
  calculateRating(contributions) {
    if (contributions >= 80) return 4.9;
    if (contributions >= 60) return 4.7;
    if (contributions >= 40) return 4.5;
    if (contributions >= 20) return 4.2;
    return 4.0;
  }
}

module.exports = new ResearcherService();


