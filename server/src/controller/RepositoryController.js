const repositoryService = require("../services/repositoryService");
const { formatMongoData } = require("../utils/formatMongoData");

class RepositoryController {
  // Create a new repository
  async createRepository(req, res, next) {
    try {
      const repository = await repositoryService.createRepository(req.body);
      res.status(201).json({
        success: true,
        message: req.t("repository_created_success"),
        data: formatMongoData(repository),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all repositories
  async getAllRepositories(req, res, next) {
    try {
      const repositories = await repositoryService.getAllRepositories(
        req.query
      );
      res.status(200).json({
        success: true,
        data: formatMongoData(repositories),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user repositories
  async getUserRepositories(req, res, next) {
    try {
      const ownerId = req.params.userId || req.user?.userId;
      if (!ownerId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }
      const repositories = await repositoryService.getUserRepositories(ownerId);
      res.status(200).json({
        success: true,
        data: repositories,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get repository by ID
  async getRepositoryById(req, res, next) {
    try {
      const repository = await repositoryService.getRepositoryById(
        req.params.id
      );
      if (!repository) {
        return res.status(404).json({
          success: false,
          message: req.t("repository_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        data: formatMongoData(repository),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update repository
  async updateRepository(req, res, next) {
    try {
      const repository = await repositoryService.updateRepository(
        req.params.id,
        req.body
      );
      if (!repository) {
        return res.status(404).json({
          success: false,
          message: req.t("repository_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("repository_updated_success"),
        data: formatMongoData(repository),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update repository visibility
  async updateRepositoryVisibility(req, res, next) {
    try {
      const { isPublic } = req.body;
      const repository = await repositoryService.updateRepositoryVisibility(
        req.params.id,
        isPublic
      );
      if (!repository) {
        return res.status(404).json({
          success: false,
          message: req.t("repository_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("repository_visibility_updated"),
        data: formatMongoData(repository),
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete repository
  async deleteRepository(req, res, next) {
    try {
      const repository = await repositoryService.deleteRepository(
        req.params.id
      );
      if (!repository) {
        return res.status(404).json({
          success: false,
          message: req.t("repository_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("repository_deleted_success"),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RepositoryController();
