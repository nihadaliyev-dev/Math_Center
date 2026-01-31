const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    // Check if ID is provided and is a valid ObjectId
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
        // Return 404 if it looks like a filename (contains dot) or just generic 400
        // We use 404 because if someone requests /news/image.jpg, it's effectively "not found"
        return res.status(404).json({
            success: false,
            message: 'Resource not found (Invalid ID format)'
        });
    }

    // Additional check: valid ObjectId must be 24 hex characters
    // mongoose.isValid() is sometimes loose (e.g. accepts 12 chars), so strictly check length/hex
    if (id && !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(404).json({
            success: false,
            message: 'Resource not found (Invalid ID format)'
        });
    }

    next();
};

module.exports = validateObjectId;
