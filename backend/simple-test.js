const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/api/chatbot/status', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      available: true, 
      message: 'Chatbot status endpoint working!' 
    } 
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Simple test server running at http://localhost:${PORT}`);
});
