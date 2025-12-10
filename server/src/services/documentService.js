const DocumentModel = require("../models/documentModel");

class DocumentService {
  // Create a new document
  async createDocument(documentData) {
    try {
      const document = new DocumentModel(documentData);
      await document.save();
      return document;
    } catch (error) {
      throw error;
    }
  }

  // Get all documents with optional filters
  async getAllDocuments(filters = {}) {
    try {
      const documents = await DocumentModel.find(filters).sort({
        createdAt: -1,
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  // Get document by ID
  async getDocumentById(id) {
    try {
      const document = await DocumentModel.findById(id);
      return document;
    } catch (error) {
      throw error;
    }
  }

  // Update document
  async updateDocument(id, updateData) {
    try {
      updateData.lastEdited = new Date();
      const document = await DocumentModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return document;
    } catch (error) {
      throw error;
    }
  }

  // Delete document
  async deleteDocument(id) {
    try {
      const document = await DocumentModel.findByIdAndDelete(id);
      return document;
    } catch (error) {
      throw error;
    }
  }

  // Search documents
  async searchDocuments(query) {
    try {
      const documents = await DocumentModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
          { authors: { $in: [new RegExp(query, "i")] } },
        ],
      }).sort({ createdAt: -1 });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  // Get document statistics
  async getDocumentStats() {
    try {
      const totalDocuments = await DocumentModel.countDocuments();
      const researchPapers = await DocumentModel.countDocuments({
        fileType: "PDF",
      });
      const reportsAndReviews = await DocumentModel.countDocuments({
        publicationStatus: "Peer-reviewed",
      });
      const otherDocuments =
        totalDocuments - researchPapers - reportsAndReviews;

      // Get documents from last month and current month for trend
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const lastMonthCount = await DocumentModel.countDocuments({
        createdAt: { $gte: lastMonth },
      });

      const trend =
        lastMonthCount > 0
          ? ((totalDocuments - lastMonthCount) / lastMonthCount) * 100
          : 0;

      // Get monthly data for last 6 months
      const monthlyData = [];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const currentDate = new Date();

      for (let i = 5; i >= 0; i--) {
        const startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        const endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i + 1,
          0
        );

        const count = await DocumentModel.countDocuments({
          createdAt: { $gte: startDate, $lte: endDate },
        });

        monthlyData.push({
          month: months[startDate.getMonth()],
          count,
        });
      }

      return {
        totalDocuments,
        researchPapers,
        reportsAndReviews,
        otherDocuments,
        trend,
        monthlyData,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get latest draft
  async getLatestDraft() {
    try {
      const draft = await DocumentModel.findOne({
        publicationStatus: "Draft",
      }).sort({ lastEdited: -1 });

      if (!draft) return null;

      return {
        id: draft._id,
        name: draft.title + "." + draft.fileType.toLowerCase(),
        size: draft.fileSize || "2.4 MB",
        lastEdited: this.getRelativeTime(draft.lastEdited),
        type: this.getDocumentType(draft.category),
        author: draft.authors[0] || "Unknown",
      };
    } catch (error) {
      throw error;
    }
  }

  getDocumentType(category) {
    if (["Algebra", "Topology", "Analysis"].includes(category))
      return "research";
    if (category === "Applied Math") return "report";
    return "other";
  }

  getRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  }
}

module.exports = new DocumentService();


