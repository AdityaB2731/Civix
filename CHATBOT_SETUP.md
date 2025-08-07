# Civix Gemini Chatbot Setup Guide

## Overview
This guide will help you set up the Gemini AI-powered chatbot for the Civix civic engagement platform.

## Prerequisites
1. Google AI Studio account (for Gemini API access)
2. Node.js and npm installed
3. Civix project cloned and dependencies installed

## Setup Steps

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to "Get API key" in the left sidebar
4. Create a new API key or use an existing one
5. Copy the API key (it starts with "AIza...")

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Existing variables (keep your current values)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# ... other existing variables

# Add this new variable for Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with the API key you obtained from Google AI Studio.

### 3. Install Dependencies
The Gemini AI SDK should already be installed. If not, run:

```bash
cd backend
npm install @google/generative-ai
```

### 4. Start the Application
1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd ../
   npm start
   ```

### 5. Test the Chatbot
1. Open your browser and navigate to the Civix application
2. Look for the chat bubble icon in the bottom-right corner
3. Click on it to open the chatbot
4. Try asking questions like:
   - "How do I report an issue?"
   - "What types of issues can I report?"
   - "How can I track my reported issues?"

## Features

### AI-Powered Responses
- The chatbot uses Google's Gemini 2.0 Flash model
- Context-aware conversations with conversation history
- Civix-specific knowledge and guidance

### User Experience
- Real-time typing indicators
- Suggested questions for quick access
- Error handling with user-friendly messages
- Dark mode support
- Responsive design

### Security
- API key stored securely in environment variables
- Input sanitization and validation
- Rate limiting protection
- CSRF protection bypassed for chatbot endpoints

## API Endpoints

### POST /api/chatbot/chat
Send a message to the chatbot and get an AI response.

**Request Body:**
```json
{
  "message": "How do I report an issue?",
  "conversationHistory": [
    {
      "text": "Hello",
      "isBot": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response generated successfully",
  "data": {
    "response": "To report an issue on Civix...",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### GET /api/chatbot/status
Check if the chatbot service is available.

**Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "model": "gemini-2.0-flash",
    "features": [
      "Civic issue reporting guidance",
      "Platform usage help",
      "Community engagement tips",
      "Status tracking assistance"
    ]
  }
}
```

## Troubleshooting

### Common Issues

1. **"API key is missing" error**
   - Ensure `GEMINI_API_KEY` is set in your `.env` file
   - Restart the backend server after adding the environment variable

2. **"Chatbot service is currently unavailable"**
   - Check if your API key is valid
   - Verify you have sufficient quota in Google AI Studio
   - Check the backend console for detailed error messages

3. **Frontend can't connect to chatbot**
   - Ensure the backend server is running
   - Check if the frontend is making requests to the correct backend URL
   - Verify CORS configuration in the backend

4. **Slow response times**
   - This is normal for AI models
   - Consider implementing response caching for common questions
   - Monitor your API usage in Google AI Studio

### Debug Mode
To see detailed error messages, set `NODE_ENV=development` in your `.env` file.

## Customization

### Modifying Chatbot Context
Edit the `CIVIX_CONTEXT` variable in `backend/controllers/chatbotController.js` to customize the chatbot's knowledge and personality.

### Adding New Features
- Implement conversation persistence in a database
- Add user authentication for personalized responses
- Integrate with issue tracking system for real-time updates
- Add multilingual support

## Support
If you encounter issues:
1. Check the browser console for frontend errors
2. Check the backend console for server errors
3. Verify your API key and quota in Google AI Studio
4. Review the troubleshooting section above

## Security Notes
- Never commit your API key to version control
- Use environment variables for all sensitive configuration
- Monitor your API usage to avoid unexpected charges
- Consider implementing rate limiting for production use
