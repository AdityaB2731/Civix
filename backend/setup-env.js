const fs = require('fs');
const path = require('path');

console.log('🔧 Civix Environment Setup');
console.log('==========================\n');

// Check if .env file already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    console.log('Please add the following line to your existing .env file:\n');
    console.log('GEMINI_API_KEY=your_gemini_api_key_here\n');
    return;
}

// Create .env file content
const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/civix
POSTGRES_URI=postgresql://username:password@localhost:5432/civix

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
`;

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Edit the .env file and replace the placeholder values');
    console.log('2. Get your Gemini API key from: https://aistudio.google.com/');
    console.log('3. Replace "your_gemini_api_key_here" with your actual API key');
    console.log('4. Update other variables as needed for your setup');
    console.log('\n🔑 To get your Gemini API key:');
    console.log('   - Visit https://aistudio.google.com/');
    console.log('   - Sign in with your Google account');
    console.log('   - Click "Get API key" in the left sidebar');
    console.log('   - Create a new API key or use an existing one');
    console.log('   - Copy the key (starts with "AIza...")');
    console.log('\n🧪 Test your setup with: node test-gemini.js');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Please create a .env file manually in the backend directory with the following content:');
    console.log('\n' + envContent);
}
