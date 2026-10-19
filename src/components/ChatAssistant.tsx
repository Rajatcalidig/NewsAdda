"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm an AI assistant trained on Rajat's resume and portfolio. Ask me anything about his experience, tech stack, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Mock API response
    setTimeout(() => {
      const mockResponses = [
        "That's a great question! Rajat has extensive experience with Next.js and Python.",
        "Rajat specializes in building practical AI solutions, such as bridging the gap between LLM research and production.",
        "He has 8 years of experience working across 3 different companies as a Full-Stack and AI Engineer.",
        "Rajat is currently exploring LangGraph and Multi-Agent Systems!",
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3.5 sm:p-4 bg-orange-500 text-neutral-950 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={22} className="sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[82vh] flex flex-col bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl shadow-black overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-neutral-900/50 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white font-mono text-sm uppercase tracking-widest">
                AI Assistant
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-neutral-400">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === "user"
                    ? "bg-neutral-800 border-neutral-700 text-white"
                    : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-neutral-800 text-white rounded-tr-sm"
                    : "bg-orange-500/10 text-neutral-200 border border-orange-500/10 rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-orange-500/10 border-orange-500/20 text-orange-500">
                <Bot size={16} />
              </div>
              <div className="bg-orange-500/10 border border-orange-500/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-900/50 border-t border-neutral-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about my experience..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 text-neutral-400 hover:text-orange-500 disabled:opacity-50 disabled:hover:text-neutral-400 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}
