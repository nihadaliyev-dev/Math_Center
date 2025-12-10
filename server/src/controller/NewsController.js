const {
  getAll,
  getById,
  post,
  deleteOne,
  updateOne,
} = require("../services/newsService");
const { formatMongoData } = require("../utils/formatMongoData");

// Upload image for news
exports.uploadNewsImage = async (req, res, next) => {
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
};

// GET all news
exports.getNews = async (req, res, next) => {
  try {
    const { search = "", sortBy = "createdAt", order = "desc" } = req.query;

    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    const filter = {};
    if (search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const news = await getAll().then((items) => items);

    res.status(200).json({
      news: formatMongoData(news),
    });
  } catch (error) {
    next(error);
  }
};

// GET single news by ID
exports.getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id);
    if (!item) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(formatMongoData(item));
  } catch (error) {
    next(error);
  }
};

// POST - create new news
exports.createNews = async (req, res, next) => {
  try {
    const {
      title,
      coverImage,
      content,
      author,
      slug,
      category,
      status,
      publishDate,
      tags,
    } = req.body;

    if (!title || !coverImage) {
      return res
        .status(400)
        .json({ message: "Title and coverImage are required" });
    }

    const newsData = {
      title,
      coverImage,
      content,
      author,
      slug,
      category,
      status,
      publishDate,
      tags,
    };

    const created = await post(newsData);

    res.status(201).json(formatMongoData(created));
  } catch (error) {
    next(error);
  }
};

// PUT - update existing news
exports.updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      coverImage,
      content,
      author,
      slug,
      category,
      status,
      publishDate,
      tags,
    } = req.body;

    const updateData = {
      title,
      coverImage,
      content,
      author,
      slug,
      category,
      status,
      publishDate,
      tags,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updated = await updateOne(id, updateData);

    if (!updated) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(formatMongoData(updated));
  } catch (error) {
    next(error);
  }
};

// DELETE - remove news
exports.deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOne(id);
    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(formatMongoData(deleted));
  } catch (error) {
    next(error);
  }
};
