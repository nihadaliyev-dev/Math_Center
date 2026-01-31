const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        index: true
    },
    section: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Can be string (text), object (image data), etc.
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'html', 'json'],
        default: 'text'
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

// Compound index to ensure unique content per key in a section of a page
contentBlockSchema.index({ page: 1, section: 1, key: 1 }, { unique: true });

const ContentBlock = mongoose.model('ContentBlock', contentBlockSchema);

module.exports = ContentBlock;
