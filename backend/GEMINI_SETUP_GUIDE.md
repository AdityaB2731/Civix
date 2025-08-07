# Quick Gemini API Setup Guide

## ✅ Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://aistudio.google.com/](https://aistudio.google.com/)
2. **Sign In**: Use your Google account to sign in
3. **Get API Key**: 
   - Click on "Get API key" in the left sidebar
   - Create a new API key or use an existing one
   - Copy the API key (it starts with "AIza...")

## ✅ Step 2: Add API Key to .env File

The `.env` file has been created automatically. Now you need to:

1. **Open the .env file** in the `backend` directory
2. **Find this line**:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. **Replace** `your_gemini_api_key_here` with your actual API key
4. **Save the file**

Example:
```
GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
```

## ✅ Step 3: Test the Setup

Run this command to test if everything is working:

```bash
node test-gemini.js
```

You should see:
- ✅ API key found
- ✅ Gemini model initialized
- ✅ Gemini API is working!
- A response about civic engagement

## ✅ Step 4: Start the Application

1. **Start the backend**:
   ```bash
   npm run dev
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   cd ../
   npm start
   ```

3. **Test the chatbot**:
   - Look for the chat bubble in the bottom-right corner
   - Click it to open the chatbot
   - Try asking: "How do I report an issue?"

## 🔧 Troubleshooting

### "API key is missing" error
- Make sure you added the API key to the `.env` file
- Restart the backend server after adding the key

### "Invalid API key" error
- Check if your API key is correct
- Make sure you have sufficient quota in Google AI Studio

### Frontend errors
- The React import error should now be fixed
- If you still see errors, restart both frontend and backend

## 🎉 You're Done!

Your Gemini-powered chatbot is now ready to use! The chatbot will:
- Answer questions about Civix platform
- Help with civic engagement
- Provide guidance on issue reporting
- Maintain conversation context

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the backend console for server errors
3. Verify your API key in Google AI Studio
4. Make sure both frontend and backend are running
