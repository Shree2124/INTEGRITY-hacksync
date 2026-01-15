"use client";
import React, { useState, useRef, useEffect } from "react";
// UPDATED: Using the standard official package
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  RefreshCcw,
  User,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION ---
const SYSTEM_INSTRUCTION = `You are "Integrity Sahayak", the AI assistant for Project INTEGRITY. 
Your tone is Professional, Patriotic, and Helpful.
Keep answers strictly under 50 words.
Do not use markdown formatting like bold or italics, just plain text.

Knowledge Base:
1. Mission: To crowdsource infrastructure auditing using AI.
2. Process: Snap a photo -> AI Analyzes -> Report sent to authorities.
3. Anonymity: Fully encrypted. No personal data shared with contractors.
4. Emergency: For life-threatening issues, dial 100 instantly.`;

// UPDATED: 'gemini-pro' is the most stable model for v1beta keys
const MODEL_NAME = "gemini-2.5-flash"; 

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I file a report?",
  "Is my identity hidden?",
  "What is Project Integrity?",
  "Track my complaint status",
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Jai Hind! I am Integrity Sahayak. How can I assist you in auditing our nation's infrastructure today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // We use 'any' here to avoid TypeScript conflicts with different SDK versions
  const chatSession = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // --- INITIALIZE CHAT ---
  const initChat = async () => {
    if (chatSession.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("API Key is missing! Check .env.local");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Get the model
      const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
      });

      // Start the chat
      chatSession.current = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }],
          },
          {
            role: "model",
            parts: [{ text: "Understood. I am Integrity Sahayak. I will answer briefly and professionally." }],
          }
        ],
      });
    } catch (error) {
      console.error("Failed to initialize AI:", error);
    }
  };

  // --- HANDLE SEND ---
  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    // 1. Update UI immediately
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: textToSend }]);
    setIsLoading(true);

    try {
      // 2. Ensure chat is initialized
      if (!chatSession.current) {
        await initChat();
      }

      // 3. Send Message
      if (chatSession.current) {
        const result = await chatSession.current.sendMessage(textToSend);
        const response = await result.response;
        const responseText = response.text(); 
        
        setMessages((prev) => [...prev, { role: "model", text: responseText }]);
      } else {
        throw new Error("Chat session could not be initialized");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Connection error. Please check your API Key or try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- HANDLE RESET ---
  const handleReset = () => {
    chatSession.current = null;
    setMessages([
      {
        role: "model",
        text: "Chat cleared. I am ready for your next query.",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-[90vw] sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 border border-slate-200 overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg relative overflow-hidden shrink-0">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">
                    Integrity Sahayak
                  </h3>
                  <p className="text-[10px] text-blue-300 font-mono flex items-center gap-1">
                    <Sparkles size={8} /> AI Powered
                  </p>
                </div>
              </div>
              <div className="flex gap-2 relative z-10">
                <button
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                  title="Reset Chat"
                >
                  <RefreshCcw size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                  title="Close Chat"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              <div className="flex justify-center">
                <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>

              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white border border-blue-200 text-blue-600 text-xs rounded-full hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your query here..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-11 shadow-md shadow-blue-200 shrink-0"
                >
                  <Send
                    size={18}
                    className={isLoading ? "opacity-0" : "opacity-100"}
                  />
                  {isLoading && (
                    <span className="absolute animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                  )}
                </Button>
              </form>
              <div className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={10} />
                Secure & Encrypted Session. AI can make errors.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center cursor-pointer"
          >
            {/* Pulsing Rings */}
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 delay-1000"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>

            <div className="bg-slate-900 text-white p-4 rounded-full shadow-2xl border border-slate-700 relative z-10 flex items-center gap-2 pr-6">
              <MessageSquare className="w-6 h-6 text-blue-400 fill-current" />
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold leading-none">
                  Need Help?
                </span>
                <span className="text-[10px] text-slate-400 leading-none">
                  Ask Sahayak
                </span>
              </div>
            </div>

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};