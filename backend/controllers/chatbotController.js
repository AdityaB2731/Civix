require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing! Check your .env file.");
}

// Initialize genAI with the correct API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Civix-specific context for the chatbot
const CIVIX_CONTEXT = `You are Civix Assistant, a helpful AI assistant for the Civix civic engagement platform. 

Civix is a platform that helps citizens report and track civic issues in their communities. Users can:
- Report issues like potholes, broken streetlights, garbage collection problems, water leaks, etc.
- Track the status of their reported issues
- Upvote issues reported by other community members
- View community reports and their status

Your role is to help users understand how to use the platform, answer questions about civic engagement, and provide guidance on reporting issues effectively.

Key features to mention:
- Issue reporting with photo uploads
- Status tracking (Open, In Progress, Resolved)
- Community upvoting system
- Profile management
- Real-time notifications

Always be helpful, friendly, and encourage civic participation. If you don't know something specific about the platform, suggest they check the FAQ or contact support.`;

const chatWithGemini = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        if (!apiKey) {
            return res.status(500).json({
                success: false,
                message: 'Chatbot service is currently unavailable. Please try again later.'
            });
        }

        // Build conversation history for context
        let fullPrompt = CIVIX_CONTEXT + "\n\n";
        
        if (conversationHistory.length > 0) {
            fullPrompt += "Previous conversation:\n";
            conversationHistory.forEach(msg => {
                fullPrompt += `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}\n`;
            });
            fullPrompt += "\n";
        }
        
        fullPrompt += `User: ${message}\nAssistant:`;

        // Generate response using Gemini
        const result = await model.generateContent(fullPrompt);
        const response = result.response.candidates[0].content.parts[0].text;

        res.status(200).json({
            success: true,
            message: 'Response generated successfully',
            data: {
                response: response.trim(),
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Chatbot Error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, I encountered an error. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getChatbotStatus = async (req, res) => {
    try {
        const isAvailable = !!apiKey;
        
        res.status(200).json({
            success: true,
            data: {
                available: isAvailable,
                model: 'gemini-2.0-flash',
                features: [
                    'Civic issue reporting guidance',
                    'Platform usage help',
                    'Community engagement tips',
                    'Status tracking assistance'
                ]
            }
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to check chatbot status'
        });
    }
};

module.exports = {
    chatWithGemini,
    getChatbotStatus
};
