const express = require("express");
const router = express.Router();
const documentController = require("../controller/DocumentController");
const protectRoute = require("../middlewares/protectRoute");
const {
  validateDocument,
  validateDocumentUpdate,
} = require("../middlewares/documentValidator");
const {
  uploadDocument,
  uploadImage,
  uploadFiles,
} = require("../middlewares/uploadMiddleware");

// All document routes require authentication
router.use(protectRoute());

// File upload routes
router.post("/upload/document", uploadDocument, documentController.uploadDocument);
router.post("/upload/image", uploadImage, documentController.uploadImage);
router.post("/upload/files", uploadFiles, documentController.uploadFiles);

// Document CRUD routes
router.post("/", validateDocument, documentController.createDocument);
router.get("/", documentController.getAllDocuments);
router.get("/search", documentController.searchDocuments);
router.get("/stats", documentController.getDocumentStats);
router.get("/latest-draft", documentController.getLatestDraft);
router.get("/:id", documentController.getDocumentById);
router.put("/:id", validateDocumentUpdate, documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
