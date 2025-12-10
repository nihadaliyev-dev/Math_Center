const {
  getAll,
  getById,
  post,
  deleteOne,
  updateOne,
  getTotalCount,
} = require("../services/advertisementService");
const { formatMongoData } = require("../utils/formatMongoData");

// GET all advertisements
exports.getAdvertisements = async (req, res, next) => {
  try {
    const { search = "", sortBy = "createdAt", order = "desc" } = req.query;

    const allowedSortFields = ["title", "createdAt"];
    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";
    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    const filter = {};
    if (search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const ads = await getAll({
      sortBy: safeSortBy,
      order: sortOrder,
      filter,
    });

    res.status(200).json({
      advertisements: formatMongoData(ads),
    });
  } catch (error) {
    next(error);
  }
};

// GET advertisement by ID
exports.getAdvertisementById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ad = await getById(id);
    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.status(200).json(formatMongoData(ad));
  } catch (error) {
    next(error);
  }
};

// POST advertisement
exports.createAdvertisement = async (req, res, next) => {
  try {
    const { title, titleInEng, coverImage } = req.body;

    if (!title || !coverImage) {
      return res
        .status(400)
        .json({ message: "Title and coverImage are required" });
    }

    const newAd = await post({ title, titleInEng, coverImage });

    res.status(201).json(formatMongoData(newAd));
  } catch (error) {
    next(error);
  }
};

// DELETE advertisement
exports.deleteAdvertisement = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await deleteOne(id);
    if (!deleted) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.status(200).json(formatMongoData(deleted));
  } catch (error) {
    next(error);
  }
};

// UPDATE advertisement
exports.updateAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, titleInEng, coverImage } = req.body;

    const updated = await updateOne(id, { title, titleInEng, coverImage });

    if (!updated) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    res.status(200).json(formatMongoData(updated));
  } catch (error) {
    next(error);
  }
};
