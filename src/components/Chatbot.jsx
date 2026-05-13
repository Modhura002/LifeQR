import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';



const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm LifeQR AI. How can I assist you with your health or the LifeQR app today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat',
        {
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMessage
          ]
        }
      );

      const aiResponse = response.data.choices[0].message;
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      let errorMessage = "Sorry, I encountered an error. Please try again later.";
      if (error.response?.data?.error) {
        errorMessage = `Error: ${error.response.data.error}`;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-4 w-[350px] sm:w-[400px] h-[500px] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">LifeQR AI</h3>
                  <p className="text-xs text-blue-100">Medical & Platform Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-primary'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : msg.isError 
                          ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-2 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-primary flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none shadow-sm flex items-center space-x-2">
                      <Loader2 size={16} className="text-primary animate-spin" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about health or LifeQR..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
