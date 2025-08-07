const express = require('express');
const router = express.Router();
const { chatWithGemini, getChatbotStatus } = require('../controllers/chatbotController');
const { asyncHandler } = require('../utils/asyncHandler');

// Get chatbot status
router.get('/status', asyncHandler(getChatbotStatus));

// Chat with Gemini AI
router.post('/chat', asyncHandler(chatWithGemini));

module.exports = router;
