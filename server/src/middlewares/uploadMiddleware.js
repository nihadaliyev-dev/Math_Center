const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads");
const documentsDir = path.join(uploadsDir, "documents");
const imagesDir = path.join(uploadsDir, "images");

[uploadsDir, documentsDir, imagesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for documents (PDF, DOCX, etc.)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `document-${uniqueSuffix}${ext}`);
  },
});

// Configure storage for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

// File filter for documents
const documentFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/x-latex",
    "text/markdown",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, DOCX, LaTeX, and Markdown files are allowed."
      ),
      false
    );
  }
};

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only image files (JPEG, PNG, GIF, WEBP) are allowed."
      ),
      false
    );
  }
};

// Create multer instances
const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for documents
  },
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
  },
});

// Middleware to upload both document and image
const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Determine destination based on field name
      if (file.fieldname === "document") {
        cb(null, documentsDir);
      } else if (file.fieldname === "image") {
        cb(null, imagesDir);
      } else {
        cb(new Error("Invalid field name"), null);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const prefix = file.fieldname === "document" ? "document" : "image";
      cb(null, `${prefix}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "document") {
      documentFilter(req, file, cb);
    } else if (file.fieldname === "image") {
      imageFilter(req, file, cb);
    } else {
      cb(new Error("Invalid field name"), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB for documents, 10MB will be enforced by image filter
  },
}).fields([
  { name: "document", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

module.exports = {
  uploadDocument: uploadDocument.single("document"),
  uploadImage: uploadImage.single("image"),
  uploadFiles,
};
