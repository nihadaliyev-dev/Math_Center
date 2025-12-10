const documentService = require("../services/documentService");
const { formatMongoData } = require("../utils/formatMongoData");

class DocumentController {
  // Create a new document
  async createDocument(req, res, next) {
    try {
      const document = await documentService.createDocument(req.body);
      res.status(201).json({
        success: true,
        message: req.t("document_created_success"),
        data: formatMongoData(document),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all documents
  async getAllDocuments(req, res, next) {
    try {
      const documents = await documentService.getAllDocuments(req.query);
      res.status(200).json({
        success: true,
        data: formatMongoData(documents),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get document by ID
  async getDocumentById(req, res, next) {
    try {
      const document = await documentService.getDocumentById(req.params.id);
      if (!document) {
        return res.status(404).json({
          success: false,
          message: req.t("document_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        data: formatMongoData(document),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update document
  async updateDocument(req, res, next) {
    try {
      const document = await documentService.updateDocument(
        req.params.id,
        req.body
      );
      if (!document) {
        return res.status(404).json({
          success: false,
          message: req.t("document_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("document_updated_success"),
        data: formatMongoData(document),
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete document
  async deleteDocument(req, res, next) {
    try {
      const document = await documentService.deleteDocument(req.params.id);
      if (!document) {
        return res.status(404).json({
          success: false,
          message: req.t("document_not_found"),
        });
      }
      res.status(200).json({
        success: true,
        message: req.t("document_deleted_success"),
      });
    } catch (error) {
      next(error);
    }
  }

  // Search documents
  async searchDocuments(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }
      const documents = await documentService.searchDocuments(q);
      res.status(200).json({
        success: true,
        data: formatMongoData(documents),
      });
    } catch (error) {
      next(error);
    }
  }

  // Get document statistics
  async getDocumentStats(req, res, next) {
    try {
      const stats = await documentService.getDocumentStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get latest draft
  async getLatestDraft(req, res, next) {
    try {
      const draft = await documentService.getLatestDraft();
      res.status(200).json({
        success: true,
        data: draft,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload document file
  async uploadDocument(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const fileUrl = `/uploads/documents/${req.file.filename}`;
      const fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + " MB";

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: {
          fileUrl,
          fileName: req.file.filename,
          originalName: req.file.originalname,
          fileSize,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload image file
  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const imageUrl = `/uploads/images/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          imageUrl,
          fileName: req.file.filename,
          originalName: req.file.originalname,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload both document and image
  async uploadFiles(req, res, next) {
    try {
      const files = req.files;
      const result = {};

      if (files && files.document && files.document[0]) {
        const docFile = files.document[0];
        result.document = {
          fileUrl: `/uploads/documents/${docFile.filename}`,
          fileName: docFile.filename,
          originalName: docFile.originalname,
          fileSize: (docFile.size / (1024 * 1024)).toFixed(2) + " MB",
        };
      }

      if (files && files.image && files.image[0]) {
        const imgFile = files.image[0];
        result.image = {
          imageUrl: `/uploads/images/${imgFile.filename}`,
          fileName: imgFile.filename,
          originalName: imgFile.originalname,
        };
      }

      if (Object.keys(result).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DocumentController();
