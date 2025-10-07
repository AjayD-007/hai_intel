"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { auditData, faq } from '../data/reportData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: faq.find(f => f.patterns.includes('hi'))?.reply || "Hi! I'm your Lighthouse Performance Assistant. Ask me about the performance report for haiintel.com!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string | null>(null); // 👈 New!
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingMessage]); // 👈 Added streamingMessage

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Load chat state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('chatWidgetOpen');
    if (savedState === 'true') {
      setIsOpen(true);
    }
  }, []);

  // Save chat state to localStorage
  useEffect(() => {
    localStorage.setItem('chatWidgetOpen', isOpen.toString());
  }, [isOpen]);

  // Small helper to match FAQ phrases
  const findFaqReply = (query: string) => {
    const lower = query.toLowerCase();
    for (const entry of faq) {
      for (const p of entry.patterns) {
        if (lower.includes(p)) return entry.reply;
      }
    }
    return null;
  };

  // Smart response generator based on keywords using shared auditData
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Check FAQ first
    const faqReply = findFaqReply(query);
    if (faqReply) return faqReply;

    // Performance score queries
    if (lowerQuery.includes('performance score') || lowerQuery.includes('overall score')) {
      const mobile = auditData.mobile.performance;
      const desktop = auditData.desktop.performance;
      return `Overall Performance — Mobile: **${mobile}/100**, Desktop: **${desktop}/100**. Desktop is currently above target; mobile has the most room for improvement.`;
    }

    if (lowerQuery.includes('accessibility')) {
      return `Accessibility — Mobile: **${auditData.mobile.accessibility}/100**, Desktop: **${auditData.desktop.accessibility}/100**. Focus on contrast and ARIA labeling for the biggest wins.`;
    }

    if (lowerQuery.includes('seo')) {
      return `SEO looks solid: Desktop and Mobile score **${auditData.desktop.seo}/100** and **${auditData.mobile.seo}/100** respectively.`;
    }

    if (lowerQuery.includes('best practice')) {
      return `Best Practices are healthy — both platforms show **${auditData.desktop.bestPractices}/100** for desktop.`;
    }

    if (lowerQuery.includes('lcp') || lowerQuery.includes('largest contentful paint')) {
      return `Largest Contentful Paint (LCP) can be improved by addressing render-blocking JS/CSS, optimizing hero images, and server response time. Try lazy-loading non-critical assets and inlining critical CSS.`;
    }

    if (lowerQuery.includes('fcp') || lowerQuery.includes('first contentful paint')) {
      return `First Contentful Paint (FCP) improvements often mirror LCP actions: optimize server response, defer non-critical JS, and preconnect to key origins.`;
    }

    if (lowerQuery.includes('cls') || lowerQuery.includes('cumulative layout shift')) {
      return `Cumulative Layout Shift (CLS) is typically improved by reserving size for images and embeds and avoiding inserting content above existing content.`;
    }

    if (lowerQuery.includes('tti') || lowerQuery.includes('time to interactive')) {
      return `Time to Interactive (TTI) can be reduced by breaking up long tasks, code splitting, and reducing JavaScript execution time.`;
    }

    if (lowerQuery.includes('improve') || lowerQuery.includes('optimization') || lowerQuery.includes('opportunities')) {
      return `Top opportunities include: 1) Eliminate render-blocking resources 2) Properly size and lazy-load images 3) Minify and split JS bundles 4) Implement caching strategies.`;
    }

    if (lowerQuery.includes('diagnostic') || lowerQuery.includes('issue') || lowerQuery.includes('problem')) {
      return `Key diagnostics: reduce unused JS, avoid enormous network payloads, and serve images in next-gen formats.`;
    }

    if (lowerQuery.includes('image')) {
      return `Use next-gen image formats like AVIF/WebP, serve responsive images with srcset, and lazy-load offscreen images to reduce payload.`;
    }

    if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) {
      return `Reduce unused JS, defer non-critical scripts, and use tree-shaking to strip unused code. Consider splitting vendor bundles.`;
    }

    if (lowerQuery.includes('help') || lowerQuery.includes('what can you')) {
      return `I can explain Lighthouse scores (Performance, Accessibility, Best Practices, SEO), Core Web Vitals (LCP, FCP, CLS, TTI), and provide prioritized suggestions.`;
    }

    return `I don't have a specific answer for that, but I can help with Lighthouse scores, Core Web Vitals, and optimization suggestions. Try asking about the performance score or "LCP".`;
  };

  // ✨ Updated: Word-by-word streaming response
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setStreamingMessage(''); // Start streaming

    const fullResponse = generateResponse(inputValue);
    const words = fullResponse.split(' ');
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        setStreamingMessage(prev => prev ? `${prev} ${words[index]}` : words[index]);
        index++;
      } else {
        clearInterval(interval);
        // Finalize message
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: fullResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setStreamingMessage(null);
      }
    }, 30 + Math.random() * 100); // Natural typing rhythm
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-primary-foreground)'
            }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'var(--color-card)',
              color: 'var(--color-card-foreground)'
            }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[70vh] rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div style={{ background: 'var(--gradient-primary)', color: 'var(--color-primary-foreground)' }} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Lighthouse Assistant</h3>
                  <p className="text-xs" style={{ color: 'var(--color-primary-foreground)' }}>Performance insights</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Render completed messages */}
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                      message.sender === 'user'
                        ? 'rounded-br-sm'
                        : 'rounded-bl-sm'
                    }`}
                    style={
                      message.sender === 'user'
                        ? { background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }
                        : { background: 'var(--color-popover)', color: 'var(--color-popover-foreground)' }
                    }
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Render streaming message (if any) */}
              {streamingMessage !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="max-w-[80%] px-4 py-2 rounded-2xl rounded-bl-sm whitespace-pre-wrap"
                    style={{
                      background: 'var(--color-popover)',
                      color: 'var(--color-popover-foreground)',
                    }}
                  >
                    <p className="text-sm leading-relaxed">
                      {streamingMessage}
                      <span className="ml-0.5 animate-pulse">▌</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about performance..."
                  className="flex-1 px-4 py-2 rounded-lg focus:outline-none transition-shadow"
                  style={{ background: 'var(--color-popover)', color: 'var(--color-popover-foreground)' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                  style={{
                    background: 'var(--color-intelligence-blue)',
                    color: 'var(--color-intelligence-blue-foreground)'
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;