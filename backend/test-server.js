require('dotenv').config();

console.log('🔧 Testing Server Configuration');
console.log('===============================\n');

// Check environment variables
console.log('Environment Variables:');
console.log('- PORT:', process.env.PORT || '5000 (default)');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');

// Test if required modules can be loaded
console.log('\n📦 Testing Module Imports:');
try {
  const express = require('express');
  console.log('- Express: ✅ Loaded');
} catch (error) {
  console.log('- Express: ❌ Failed -', error.message);
}

try {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  console.log('- Google Generative AI: ✅ Loaded');
} catch (error) {
  console.log('- Google Generative AI: ❌ Failed -', error.message);
}

try {
  const chatbotController = require('./controllers/chatbotController');
  console.log('- Chatbot Controller: ✅ Loaded');
} catch (error) {
  console.log('- Chatbot Controller: ❌ Failed -', error.message);
}

try {
  const chatbotRoutes = require('./routes/chatbot');
  console.log('- Chatbot Routes: ✅ Loaded');
} catch (error) {
  console.log('- Chatbot Routes: ❌ Failed -', error.message);
}

console.log('\n🎯 Next Steps:');
if (!process.env.GEMINI_API_KEY) {
  console.log('1. Add your GEMINI_API_KEY to the .env file');
  console.log('2. Get your API key from: https://aistudio.google.com/');
}
console.log('3. Start the server with: npm start');
console.log('4. Test the chatbot endpoint: http://localhost:5000/api/chatbot/status');
