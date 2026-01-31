const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controller/ContentController');
const protectRoute = require('../middlewares/protectRoute');

// Public route to get content
router.get('/:page', getContent);

// Protected route to update content (Admin only)
router.post('/', protectRoute('admin'), updateContent);

module.exports = router;
