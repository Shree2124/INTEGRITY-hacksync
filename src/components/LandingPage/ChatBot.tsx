"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Chat } from "@google/genai";
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

const SYSTEM_INSTRUCTION = `You are "Integrity Sahayak", the AI assistant for Project INTEGRITY. 
Your tone is Professional, Patriotic, and Helpful.
Keep answers under 50 words.

Knowledge Base:
1. **Mission**: To crowdsource infrastructure auditing using AI.
2. **Process**: Snap a photo -> AI Analyzes -> Report sent to authorities.
3. **Anonymity**: Fully encrypted. No personal data shared with contractors.
4. **Emergency**: For life-threatening issues, dial 100 instantly.`;

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

  // Ref to persist chat session
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatSession.current) {
      // NOTE: Ideally, move API calls to a Server Action to protect your Key
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
      });
      chatSession.current = ai.chats.create({
        model: "gemini-2.0-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    initChat();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: textToSend }]);
    setIsLoading(true);

    try {
      if (chatSession.current) {
        const result = await chatSession.current.sendMessage({
          message: textToSend,
        });
        const responseText = result.text || "I apologize, the server is busy.";
        setMessages((prev) => [...prev, { role: "model", text: responseText }]);
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Connection interrupted. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-90vw sm:w-96 h-96 rounded-2xl shadow-2xl flex flex-col mb-4 border border-slate-200 overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                      alt="Emblem"
                      className="w-6 h-6 invert opacity-90"
                    />
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
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setMessages([
                      { role: "model", text: "Chat cleared. How can I help?" },
                    ])
                  }
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Reset Chat"
                >
                  <RefreshCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {/* Date Stamp */}
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
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>

                  {/* Bubble */}
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
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts (Only show if chat is short) */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
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
            <div className="p-3 bg-white border-t border-slate-100">
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
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 w-11 shadow-md shadow-blue-200"
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
            className="group relative flex items-center justify-center"
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
