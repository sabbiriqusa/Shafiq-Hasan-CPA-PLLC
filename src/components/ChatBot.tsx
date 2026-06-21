import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Cpu, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<"chat" | "whatsapp" | null>(null);
  
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
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      <AnimatePresence>
        {!isOpen && (
          <div
            className="flex flex-col items-end gap-3.5"
            onMouseEnter={() => setIsMainHovered(true)}
            onMouseLeave={() => {
              setIsMainHovered(false);
              setHoveredOption(null);
            }}
          >
            {/* The Stack of Options - Appears on Hover of the support hub */}
            <AnimatePresence>
              {isMainHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.85 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col items-end gap-2.5 pb-2"
                >
                  {/* Option 1: WhatsApp */}
                  <motion.a
                    href="https://wa.me/12142564111"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredOption("whatsapp")}
                    onMouseLeave={() => setHoveredOption(null)}
                    animate={{
                      width: hoveredOption === "whatsapp" ? 175 : 46,
                      borderRadius: hoveredOption === "whatsapp" ? "24px" : "9999px"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-center justify-start bg-[#25D366] hover:bg-[#20ba5a] text-white h-11 shadow-xl border-2 border-white/60 cursor-pointer overflow-hidden select-none pr-1"
                    style={{ width: 46 }}
                  >
                    <div className="flex items-center justify-center shrink-0 w-10 h-10 ml-0.5">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.233c-.124-.207-.456-.331-.952-.579-.496-.248-2.338-1.155-2.697-1.287-.358-.133-.62-.199-.878.199-.257.398-.999 1.258-1.226 1.514-.227.257-.455.289-.951.041-.497-.248-2.099-.773-3.998-2.467-1.478-1.321-2.477-2.952-2.766-3.449-.29-.497-.031-.766.217-1.012.223-.222.497-.579.745-.869.248-.29.33-.497.496-.828.166-.331.083-.62-.041-.869-.124-.248-.878-2.115-1.205-2.902-.319-.769-.643-.666-.878-.678-.227-.012-.488-.014-.746-.014-.257 0-.678.096-1.031.478-.352.383-1.346 1.315-1.346 3.207 0 1.892 1.378 3.716 1.572 3.974.195.258 2.71 4.139 6.565 5.799.917.395 1.633.631 2.19.809.923.292 1.763.25 2.428.152.741-.11 2.28-.932 2.6-1.785.32-.853.32-1.583.224-1.785z"/>
                      </svg>
                    </div>
                    {hoveredOption === "whatsapp" && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-bold whitespace-nowrap pr-4 text-white"
                      >
                        Chat WhatsApp
                      </motion.span>
                    )}
                  </motion.a>

                  {/* Option 2: AI CPA Chatbox */}
                  <motion.button
                    onMouseEnter={() => setHoveredOption("chat")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={() => setIsOpen(true)}
                    animate={{
                      width: hoveredOption === "chat" ? 175 : 46,
                      borderRadius: hoveredOption === "chat" ? "24px" : "9999px"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-center justify-start bg-[#0b2512] hover:bg-[#1a4a26] text-white h-11 shadow-xl border-2 border-[#a3e635] cursor-pointer overflow-hidden select-none pr-1 focus:outline-none"
                    style={{ width: 46 }}
                  >
                    <div className="flex items-center justify-center shrink-0 w-10 h-10 ml-0.5 text-[#a3e635]">
                      <MessageSquare className="w-5 h-5 ml-0.5" />
                    </div>
                    {hoveredOption === "chat" && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-bold text-white whitespace-nowrap pr-4"
                      >
                        CPA Tax Chatbox
                      </motion.span>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Live Assistant Master Floating Trigger Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-sky-600 text-white px-4 py-3 rounded-full shadow-2xl border-2 border-white/60 cursor-pointer select-none"
            >
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
              </div>
              <span className="text-xs font-bold tracking-wider uppercase pr-1">
                {isMainHovered ? "Select Advisor" : "Contact Advisors"}
              </span>
            </motion.div>
          </div>
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
