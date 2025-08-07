import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiChevronDown, FiLoader } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  // Suggested questions for Civix platform
  const suggestedQuestionsData = [
    'How do I report an issue?',
    'How can I track my reported issues?',
    'What types of issues can I report?',
    'How do I upvote an issue?',
    'Who can see my reports?',
    'How long does it take to resolve issues?'
  ];

  // Initialize with welcome message and suggested questions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: 'Hello! I\'m Civix Assistant, powered by AI. I can help you with civic engagement, issue reporting, and platform guidance. How can I assist you today?',
          isBot: true,
          timestamp: new Date().toISOString()
        }
      ]);
      setSuggestedQuestions(suggestedQuestionsData.slice(0, 3));
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      text: messageText,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setSuggestedQuestions([]);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        text: msg.text,
        isBot: msg.isBot
      }));

      const response = await axios.post('http://localhost:3001/api/chatbot/chat', {
        message: messageText,
        conversationHistory
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const botMessage = {
          text: response.data.data.response,
          isBot: true,
          timestamp: response.data.data.timestamp
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again or check your connection.',
        isBot: true,
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get response from chatbot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Civix AI Assistant</h3>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className="max-w-[85%]">
                  <div 
                    className={`p-3 rounded-lg ${
                      message.isBot 
                        ? message.isError
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.isBot 
                        ? 'text-gray-500 dark:text-gray-400' 
                        : 'text-blue-100'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <FiLoader className="animate-spin text-blue-500" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Suggested questions */}
            {suggestedQuestions.length > 0 && !isLoading && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  Quick questions:
                </div>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left mb-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Civix..."
                disabled={isLoading}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center group"
        >
          <FiMessageSquare size={24} />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;