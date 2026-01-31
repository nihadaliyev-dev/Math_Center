const ContentBlock = require('../models/contentBlockModel');

/**
 * Get all content blocks for a specific page
 * GET /api/content/:page
 */
const getContent = async (req, res) => {
    try {
        const { page } = req.params;
        const contentBlocks = await ContentBlock.find({ page });

        // Transform into a structured object for easier frontend consumption
        // Structure: { [section]: { [key]: content } }
        const formattedContent = contentBlocks.reduce((acc, block) => {
            if (!acc[block.section]) {
                acc[block.section] = {};
            }
            acc[block.section][block.key] = block.content;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: formattedContent
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch content',
            error: error.message
        });
    }
};

/**
 * Update or create a content block
 * POST /api/content
 * Body: { page, section, key, content, type }
 */
const updateContent = async (req, res) => {
    try {
        const { page, section, key, content, type } = req.body;

        if (!page || !section || !key || content === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const updatedBlock = await ContentBlock.findOneAndUpdate(
            { page, section, key },
            {
                content,
                type: type || 'text',
                lastUpdatedBy: req.user?.userId
            },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedBlock,
            message: 'Content updated successfully'
        });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update content',
            error: error.message
        });
    }
};

module.exports = {
    getContent,
    updateContent
};
