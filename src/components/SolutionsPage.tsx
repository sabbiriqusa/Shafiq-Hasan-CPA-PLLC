import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { taxProblemsData, faqItems } from "../data";

interface SolutionsPageProps {
  key?: string;
  triggerScheduler: (category: string) => void;
}

export default function SolutionsPage({ triggerScheduler }: SolutionsPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <motion.div
      key="view-solutions"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 bg-black text-white overflow-hidden relative font-sans"
    >
      <div className="absolute top-1/4 right-[5%] w-[300px] h-[300px] bg-emerald-800/10 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] bg-lime-600/5 rounded-full blur-[100px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-3.5 py-1.5 rounded-full font-mono">
            Professional Safe-harbor diagnostics
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Your Tax Problems, Our Solution
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-450 font-normal leading-relaxed">
            Unresolved IRS notice letters, bookkeeping backlogs, property tax assessments leaps, or unfiled amended corporate returns. Secure complete resolutions.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {taxProblemsData.map((prob) => (
            <div
              key={prob.id}
              className="bg-neutral-905/85 hover:bg-[#0b2512]/20 border border-zinc-800 hover:border-[#a3e635]/20 p-6 sm:p-8 rounded-3xl transition-all shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4 text-left">
                <div className="w-10 h-10 bg-[#a3e635]/15 rounded-xl flex items-center justify-center text-[#a3e635] border border-[#a3e635]/20 font-bold block text-lg font-mono">
                  %
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#a3e635] transition-all">
                  {prob.title}
                </h3>
                <p className="text-xs text-zinc-455 font-normal leading-relaxed">
                  {prob.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-805 text-[10px] text-zinc-350 leading-relaxed block bg-white/5 -mx-8 -mb-8 p-4 rounded-b-3xl text-left">
                <strong className="text-zinc-200 block mb-1 font-mono tracking-widest uppercase text-[9px]">CPA Texas Relief:</strong>
                {prob.stateImpact}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Center */}
        <div className="mt-24 border-t border-zinc-800 pt-20 max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-white/5 px-3 py-1 rounded font-mono">CPA FAQ Center</span>
            <h3 className="text-2xl font-display font-extrabold text-white">Client Questions & Safe Harbor Safeguards</h3>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "bg-neutral-900/40 border-lime-500/15" : "bg-neutral-900/10 hover:bg-white/5"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-zinc-100 text-xs sm:text-sm">
                      {item.question}
                    </span>
                    <span className="transition-transform duration-300 shrink-0 text-zinc-400">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#a3e635]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs text-zinc-350 font-normal leading-relaxed text-left border-t border-zinc-800/60 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-12 pt-6">
          <button onClick={() => triggerScheduler("CPA Legal Safe-harbor inquiries")} className="bg-[#a3e635] hover:bg-white text-emerald-950 font-extrabold text-xs px-8 py-3.5 rounded-full cursor-pointer shadow-lg">
            Book Incident Intake 🎧
          </button>
        </div>
      </div>
    </motion.div>
  );
}
