const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Simple chatbot responses without Gemini API
const simpleResponses = {
  'hello': 'Hello! I\'m Civix Assistant. How can I help you with civic engagement today?',
  'how do i report an issue': 'To report an issue, click on the "Report Issue" button and fill out the form with details and photos.',
  'how can i track my issues': 'You can track your reported issues in your profile dashboard under "My Reports".',
  'what types of issues can i report': 'You can report various civic issues like potholes, broken streetlights, garbage collection problems, water leaks, and more.',
  'default': 'I\'m here to help with civic engagement! You can ask me about reporting issues, tracking reports, or general platform questions.'
};

// Chatbot routes
app.get('/api/chatbot/status', (req, res) => {
  res.json({
    success: true,
    data: {
      available: true,
      model: 'simple-chatbot',
      features: [
        'Civic issue reporting guidance',
        'Platform usage help',
        'Community engagement tips',
        'Status tracking assistance'
      ]
    }
  });
});

app.post('/api/chatbot/chat', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Simple response logic
    const lowerMessage = message.toLowerCase();
    let response = simpleResponses.default;
    
    for (const [key, value] of Object.entries(simpleResponses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Response generated successfully',
      data: {
        response: response,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again.'
    });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Simple chatbot server is running!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Simple chatbot server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET  /test');
  console.log('- GET  /api/chatbot/status');
  console.log('- POST /api/chatbot/chat');
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});
