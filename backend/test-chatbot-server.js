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

// Import chatbot routes
const chatbotRoutes = require('./routes/chatbot.js');

// Use chatbot routes
app.use('/api/chatbot', chatbotRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test server is running!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log('Environment variables:');
  console.log('PORT:', process.env.PORT);
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
});
