const RepositoryModel = require("../models/repositoryModel");

class RepositoryService {
  // Create a new repository
  async createRepository(repositoryData) {
    try {
      const repository = new RepositoryModel(repositoryData);
      await repository.save();
      return repository;
    } catch (error) {
      throw error;
    }
  }

  // Get all repositories
  async getAllRepositories(filters = {}) {
    try {
      const repositories = await RepositoryModel.find(filters)
        .populate("owner", "fullName email")
        .sort({ lastModified: -1 });
      return repositories;
    } catch (error) {
      throw error;
    }
  }

  // Get repositories by owner
  async getUserRepositories(ownerId) {
    try {
      const repositories = await RepositoryModel.find({ owner: ownerId }).sort({
        lastModified: -1,
      });

      return repositories.map((repo) => ({
        id: repo._id,
        name: repo.name,
        category: repo.category,
        isPublic: repo.isPublic,
        fileCount: repo.fileCount,
        lastModified: this.getRelativeTime(repo.lastModified),
        size: repo.size,
      }));
    } catch (error) {
      throw error;
    }
  }

  // Get repository by ID
  async getRepositoryById(id) {
    try {
      const repository = await RepositoryModel.findById(id).populate(
        "owner",
        "fullName email"
      );
      return repository;
    } catch (error) {
      throw error;
    }
  }

  // Update repository
  async updateRepository(id, updateData) {
    try {
      updateData.lastModified = new Date();
      const repository = await RepositoryModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      return repository;
    } catch (error) {
      throw error;
    }
  }

  // Update repository visibility
  async updateRepositoryVisibility(id, isPublic) {
    try {
      const repository = await RepositoryModel.findByIdAndUpdate(
        id,
        { isPublic, lastModified: new Date() },
        { new: true }
      );
      return repository;
    } catch (error) {
      throw error;
    }
  }

  // Delete repository
  async deleteRepository(id) {
    try {
      const repository = await RepositoryModel.findByIdAndDelete(id);
      return repository;
    } catch (error) {
      throw error;
    }
  }

  getRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  }
}

module.exports = new RepositoryService();

