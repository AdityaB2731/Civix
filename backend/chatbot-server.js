const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Import the chatbot controller
const { chatWithGemini, getChatbotStatus } = require('./controllers/chatbotController');

// Chatbot routes
app.get('/api/chatbot/status', async (req, res) => {
  try {
    await getChatbotStatus(req, res);
  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/chatbot/chat', async (req, res) => {
  try {
    await chatWithGemini(req, res);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Chatbot server is running!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Chatbot server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET  /test');
  console.log('- GET  /api/chatbot/status');
  console.log('- POST /api/chatbot/chat');
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});
