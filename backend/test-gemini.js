require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Test the Gemini API integration
const testGemini = async () => {
    try {
        // Check if API key is available
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("❌ GEMINI_API_KEY is missing! Check your .env file.");
            console.log("Please add GEMINI_API_KEY=your_api_key_here to your .env file");
            return;
        }

        console.log("✅ API key found");
        
        // Initialize genAI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log("✅ Gemini model initialized");

        // Test with a simple prompt
        const testPrompt = "Hello! Can you give me a brief introduction about civic engagement?";
        console.log(`\n🤖 Testing with prompt: "${testPrompt}"`);

        const result = await model.generateContent(testPrompt);
        const response = result.response.candidates[0].content.parts[0].text;

        console.log("\n✅ Gemini API is working!");
        console.log("\n📝 Response:");
        console.log(response);

        console.log("\n🎉 Gemini chatbot integration test passed!");
        console.log("\nYou can now start your server and test the chatbot in the frontend.");

    } catch (error) {
        console.error("❌ Test failed:", error.message);
        
        if (error.message.includes("API key")) {
            console.log("\n💡 Make sure your API key is valid and has sufficient quota.");
        } else if (error.message.includes("network")) {
            console.log("\n💡 Check your internet connection.");
        }
        
        console.log("\n🔧 Troubleshooting:");
        console.log("1. Verify your GEMINI_API_KEY in .env file");
        console.log("2. Check if you have sufficient quota in Google AI Studio");
        console.log("3. Ensure you have a stable internet connection");
    }
};

// Run the test
console.log("🧪 Testing Gemini API Integration...\n");
testGemini();
