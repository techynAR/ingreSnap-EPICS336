import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GeminiService } from '../services/geminiService';
import { findBestMatch, processQuery, isGreeting, getGreetingResponse, findIngredientInDatabase } from '../utils/chatUtils';
import { FAQ } from '../data/faq';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let response: string;
      const processedQuery = processQuery(userMessage);

      // Check for ingredient information first
      const ingredientMatch = findIngredientInDatabase(userMessage);
      if (ingredientMatch.found) {
        response = ingredientMatch.response;
      }
      // Handle greetings
      else if (isGreeting(processedQuery)) {
        response = getGreetingResponse();
      }
      // Try Gemini API with better error handling
      else {
        try {
          const geminiService = GeminiService.getInstance();
          
          // Add error checking for API key
          if (!import.meta.env.VITE_GEMINI_API_KEY) {
            throw new Error('Gemini API key not configured');
          }

          const prompt = {
            contents: [{
              parts: [{
                text: `You are a helpful assistant for the ingreSnap website. Respond to this user query about ingredients, the website, or contact information. If they ask about contacting us, provide the email aryan@techynar.com. If they ask about the website or team, suggest visiting the About page. Keep responses concise and friendly.

User query: ${userMessage}`
              }]
            }]
          };

          const result = await geminiService.model.generateContent(prompt);
          if (!result || !result.response) {
            throw new Error('Empty response from Gemini API');
          }
          
          response = result.response.text();
          
          // Validate response is not empty
          if (!response || response.trim().length === 0) {
            throw new Error('Empty response text from Gemini API');
          }
        } catch (error) {
          console.error('Gemini API error:', error);
          // Only use fallback if it's a network or API error
          if (error instanceof Error && error.message.includes('API')) {
            response = findBestMatch(processedQuery, FAQ);
          } else {
            throw error; // Re-throw other errors
          }
        }
      }

      // Handle navigation to About page if mentioned
      if (response.toLowerCase().includes('about page')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response + "\n\nI can take you to the About page if you'd like. Just click the link below.",
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Chat processing error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-emerald-500 p-4 flex justify-between items-center">
              <h3 className="text-white font-medium">ingreSnap Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.content.toLowerCase().includes('about page') && message.role === 'assistant' && (
                      <button
                        onClick={() => {
                          navigate('/about');
                          setIsOpen(false);
                        }}
                        className="mt-2 text-emerald-300 hover:text-emerald-200 flex items-center gap-1 text-sm"
                      >
                        Visit About Page
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about ingredients or contact info..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
