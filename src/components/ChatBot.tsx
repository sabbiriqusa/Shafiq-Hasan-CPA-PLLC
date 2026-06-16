import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Cpu, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am the AI Assistant for Shafiq Hasan CPA PLLC. I specialize in Texas Real Property tax protest projections, S-Corp self-employment tax shielding, and global VAT compliance setups. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setErrorStatus(null);
    const userMsg: ChatMessage = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error("Could not reach backend tax server.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      console.error("Chat failure:", err);
      setErrorStatus("Could not fetch remote AI advisor. Providing local rules instead.");
      // Fallback local support response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I am experiencing network problems connecting with our central servers. However, I can still advise that our Richardson branch schedules free 15-minute consultations at 214-256-4111 or via the contact sheet below! Let me know if you would like me to detail our fees or physical location."
        }]);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const selectQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const suggestionPrompts = [
    "How do I protest Dallas property taxes?",
    "Tell me about S-Corp self-employment tax shields.",
    "Do you handle QuickBooks cleanup?",
    "Need VAT advice for European shipping."
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat-toggle-floating-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-[#0b2512] hover:bg-[#1a4a26] text-white p-4 rounded-full shadow-2xl focus:outline-none border-2 border-[#a3e635] cursor-pointer group"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-[#a3e635]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            </div>
            <span className="hidden md:inline text-xs font-semibold pr-1 tracking-wider text-white">
              CPA Tax Chatbox
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="cpachatform"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white text-gray-800 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0b2512] text-white p-4 block relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-emerald-950/80 border border-[#a3e635]/55 rounded-xl flex items-center justify-center text-[#a3e635]">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                      Shafiq Hasan CPA Bot <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
                    </h4>
                    <p className="text-[10px] text-gray-300">Live Richardson Advisory Agent</p>
                  </div>
                </div>
                <button
                  id="btn-close-chatbot"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/80">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-[#0b2512] text-white rounded-tr-none px-4"
                        : "bg-white text-gray-900 border border-gray-100 rounded-tl-none pr-4"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-150 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-800 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-950 rounded-full animate-bounce delay-300"></span>
                    <span className="text-[10px] text-gray-400 font-medium">Shafiq&apos;s Assistant is drafting...</span>
                  </div>
                </div>
              )}

              {errorStatus && (
                <div className="p-2.5 bg-red-50 border border-red-100 rounded-xl text-[10px] text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorStatus}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts if queue empty / helper options */}
            {messages.length === 1 && (
              <div className="p-3 bg-gray-55/75 border-t border-b border-gray-100 bg-white">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1.5 px-1">
                  How can we support you?
                </span>
                <div className="flex flex-wrap gap-1 px-1">
                  {suggestionPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => selectQuickPrompt(p)}
                      className="text-[10px] bg-gray-50 hover:bg-lime-50 hover:text-emerald-900 border border-gray-200 hover:border-lime-300 px-2.5 py-1.5 rounded-lg text-gray-600 transition-all font-medium text-left cursor-pointer flex items-center gap-0.5"
                    >
                      {p} <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask our CPA Bot about tax shielding..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#0b2512]"
              />
              <button
                id="btn-chatbot-submit-form"
                type="submit"
                className="bg-[#0b2512] hover:bg-[#1a4a26] text-white p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center shadow-lg hover:shadow-emerald-900/10"
              >
                <Send className="w-4 h-4 text-[#a3e635]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
