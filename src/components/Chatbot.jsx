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

  // Helper function to format basic markdown-like text (bold & newlines & simple lists)
  const formatMessage = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-1.5"></div>;
      
      // Parse basic bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      });

      const isListItem = /^[*-]\s|\d+\.\s/.test(line.trim());
      
      return (
        <span key={i} className={`block leading-relaxed ${isListItem ? 'ml-3 mt-1' : 'mb-2'} last:mb-0`}>
          {formattedLine}
        </span>
      );
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[88px] right-4 sm:right-6 z-[60] bg-slate-50/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden w-[320px] sm:w-[380px] h-[450px] max-h-[calc(100vh-180px)] min-h-[250px] flex flex-col font-sans origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-3 sm:p-4 text-white flex justify-between items-center shadow-md relative z-10 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                  <Bot size={20} className="text-indigo-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] sm:text-lg tracking-wide leading-tight">LifeQR AI</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-[10px] sm:text-[11px] font-medium text-indigo-200 uppercase tracking-wider">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} className="text-slate-300" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 sm:space-x-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mt-1 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white' 
                        : 'bg-white border border-slate-200 text-indigo-600'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-[13px] sm:text-[14px] shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-[4px]' 
                        : msg.isError 
                          ? 'bg-red-50 text-red-700 border border-red-100 rounded-tl-[4px]'
                          : 'bg-white text-slate-700 border border-slate-100 rounded-tl-[4px]'
                    }`}>
                      {/* Formatted Content */}
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-2 sm:space-x-3 max-w-[80%]">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 text-indigo-400 flex items-center justify-center shadow-sm">
                      <Bot size={14} />
                    </div>
                    <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white border border-slate-100 rounded-tl-[4px] shadow-sm flex items-center space-x-2 text-slate-500">
                      <Loader2 size={14} className="animate-spin text-indigo-500" />
                      <span className="text-[12px] sm:text-[13px] font-medium tracking-wide">AI is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 relative z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] shrink-0">
              <div className="relative flex items-center shadow-sm rounded-xl bg-slate-50 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="w-full pl-3 pr-10 py-2.5 sm:py-3 bg-transparent focus:outline-none text-[13px] sm:text-[14px] text-slate-800 disabled:opacity-50 placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 sm:p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <Send size={15} className="ml-0.5" />
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
        className="fixed bottom-6 right-4 sm:right-6 z-[60] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

export default Chatbot;

