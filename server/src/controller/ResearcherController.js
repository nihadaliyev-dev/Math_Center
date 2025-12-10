const researcherService = require("../services/researcherService");
const { formatMongoData } = require("../utils/formatMongoData");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

class ResearcherController {
  // Upload avatar image for researcher
  async uploadResearcherAvatar(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const avatarUrl = `/uploads/images/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully",
        data: {
          avatarUrl,
          fileName: req.file.filename,
          originalName: req.file.originalname,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // Create a new researcher and admin user account
  async createResearcher(req, res, next) {
    try {
      const { password, ...researcherData } = req.body;

      // Create researcher
      const researcher = await researcherService.createResearcher(researcherData);

      // If password is provided, create user account
      if (password && password.trim() !== "") {
        // Check if user with this email already exists
        const existingUser = await UserModel.findOne({ email: researcher.email });
        
        if (!existingUser) {
          // Hash password
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          // Create user account with admin role
          const user = await UserModel.create({
            email: researcher.email,
            password: hashedPassword,
            role: "admin",
            isSuperAdmin: false,
            researcherId: researcher._id,
          });
        } else {
          // Update existing user to link to researcher
          existingUser.researcherId = researcher._id;
          if (password && password.trim() !== "") {
            const saltRounds = 10;
            existingUser.password = await bcrypt.hash(password, saltRounds);
          }
          await existingUser.save();
        }
      } else {
        // Link to existing user if password not provided
        const existingUser = await UserModel.findOne({ email: researcher.email });
        if (existingUser) {
          existingUser.researcherId = researcher._id;
          await existingUser.save();
        }
      }

      res.status(201).json({
        success: true,
        message: "Researcher and admin account created successfully",
        data: formatMongoData(researcher),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all researchers (including all admin users)
  async getAllResearchers(req, res, next) {
    try {
      // Get all researchers
      const researchers = await researcherService.getAllResearchers(req.query);
      
      // Also get all admin users that might not be in researchers collection
      const adminUsers = await UserModel.find({ role: "admin" })
        .populate("researcherId")
        .exec();

      // Create a map of researchers by email
      const researcherMap = new Map();
      researchers.forEach((r) => {
        researcherMap.set(r.email.toLowerCase(), r);
      });

      // Add admin users that don't have researcher records
      // Only show users that have researcherId (linked to a researcher record)
      // or users that are not superadmins (regular admins should be visible)
      // Exclude users that have been marked to hide from researchers list
      adminUsers.forEach((user) => {
        // Skip if user is marked to hide from researchers list
        if (user.hideFromResearchers) {
          return;
        }
        
        const email = user.email.toLowerCase();
        if (!researcherMap.has(email)) {
          // Only show admin users if:
          // 1. They have a researcherId (meaning they have a researcher profile), OR
          // 2. They are not superadmins (regular admins should appear)
          // Superadmins without researcherId should create a researcher profile to appear
          if (user.researcherId || !user.isSuperAdmin) {
            // Create a researcher entry from user data
            researcherMap.set(email, {
              _id: user._id,
              fullName: user.email.split("@")[0], // Use email prefix as name
              email: user.email,
              affiliation: "",
              role: "Admin",
              contributions: 0,
              joinedDate: user.createdAt,
              avatar: "/avatar.png",
              bio: "",
              isUserAccount: true, // Flag to indicate this came from user account
            });
          }
        }
      });

      const allResearchers = Array.from(researcherMap.values());
      const formattedData = formatMongoData(allResearchers);
      
      res.status(200).json({
        success: true,
        data: formattedData,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get researcher by ID
  async getResearcherById(req, res, next) {
    try {
      const researcher = await researcherService.getResearcherById(
        req.params.id
      );
      if (!researcher) {
        return res.status(404).json({
          success: false,
          message: "Researcher not found",
        });
      }
      res.status(200).json({
        success: true,
        data: formatMongoData(researcher),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update researcher
  async updateResearcher(req, res, next) {
    try {
      const { password, ...researcherData } = req.body;
      
      const researcher = await researcherService.updateResearcher(
        req.params.id,
        researcherData
      );
      if (!researcher) {
        return res.status(404).json({
          success: false,
          message: "Researcher not found",
        });
      }

      // Update user password if provided
      if (password && password.trim() !== "") {
        const user = await UserModel.findOne({ email: researcher.email });
        if (user) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(password, saltRounds);
          user.researcherId = researcher._id;
          await user.save();
        } else {
          // Create user account if doesn't exist
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          await UserModel.create({
            email: researcher.email,
            password: hashedPassword,
            role: "admin",
            isSuperAdmin: false,
            researcherId: researcher._id,
          });
        }
      } else {
        // Ensure user is linked to researcher
        const user = await UserModel.findOne({ email: researcher.email });
        if (user) {
          user.researcherId = researcher._id;
          await user.save();
        }
      }

      res.status(200).json({
        success: true,
        message: "Researcher updated successfully",
        data: formatMongoData(researcher),
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete researcher (don't delete user account, just unlink)
  async deleteResearcher(req, res, next) {
    try {
      const { id } = req.params;

      // First, try to find and delete from researchers collection
      let researcher = await researcherService.getResearcherById(id);
      
      if (researcher) {
        // Found in researchers collection, delete it
        await researcherService.deleteResearcher(id);
        
        // Unlink researcher from user account (but don't delete user)
        if (researcher.email) {
          const user = await UserModel.findOne({ email: researcher.email });
          if (user) {
            user.researcherId = null;
            await user.save();
          }
        }

        return res.status(200).json({
          success: true,
          message: "Researcher deleted successfully",
        });
      }

      // If not found in researchers, check if it's a user account ID
      const user = await UserModel.findById(id);
      if (user) {
        // This is a user account
        if (user.researcherId) {
          // User has a linked researcher record, delete that
          const linkedResearcher = await researcherService.getResearcherById(user.researcherId.toString());
          if (linkedResearcher) {
            await researcherService.deleteResearcher(user.researcherId.toString());
          }
          user.researcherId = null;
          await user.save();
          
          return res.status(200).json({
            success: true,
            message: "Researcher record deleted successfully",
          });
        } else {
          // User account without researcher record
          // Mark it to hide from researchers list so it won't appear anymore
          user.hideFromResearchers = true;
          await user.save();
          
          return res.status(200).json({
            success: true,
            message: "Researcher entry removed successfully",
          });
        }
      }

      // Not found in either collection
      return res.status(404).json({
        success: false,
        message: "Researcher not found",
      });
    } catch (error) {
      next(error);
    }
  }

  // Search researchers
  async searchResearchers(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }
      const researchers = await researcherService.searchResearchers(q);
      res.status(200).json({
        success: true,
        data: formatMongoData(researchers),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get leaderboard
  async getLeaderboard(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const leaderboard = await researcherService.getLeaderboard(limit);
      res.status(200).json({
        success: true,
        data: leaderboard,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResearcherController();


