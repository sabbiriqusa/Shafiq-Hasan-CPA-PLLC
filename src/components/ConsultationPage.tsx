import React from "react";
import { motion } from "motion/react";
import { Check, Clock } from "lucide-react";

interface ConsultationPageProps {
  key?: string;
  triggerScheduler: (categoryName: string) => void;
}

export default function ConsultationPage({ triggerScheduler }: ConsultationPageProps) {
  return (
    <motion.div
      key="view-consultation"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-4xl mx-auto px-4 font-sans text-left"
    >
      <div className="text-center space-y-4 mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/20 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          Advisory Intake Suite
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0b2512] tracking-tight text-center leading-none">
          Free Consultation Booking
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-500 leading-relaxed font-normal text-center">
          Provide credentials verification, select an available physical audit date in June 2026, and claim a customized complimentary tax diagnostics session.
        </p>
      </div>

      {/* Instructions Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm">
          <span className="text-[11px] font-bold text-[#0b2512] uppercase tracking-wider block mb-3 font-mono">✓ What to Prepare For Your Session</span>
          <ul className="space-y-3.5 text-xs text-gray-650 font-normal">
            <li className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>Prior-year Corporate accounting worksheets & personal tax schedules.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>Collin or Dallas Central Appraisal District (CAD) protest valuation warnings.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>Active QuickBooks ledgers & payroll dividend logs.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#0b2512] to-black rounded-3xl p-6 text-white border border-white/5 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[#a3e635] text-[10px] font-bold font-mono tracking-widest uppercase block mb-2">CPA SLA Audit response</span>
            <h4 className="text-sm font-bold">2-Hour Intake Evaluation Check</h4>
            <p className="text-[11px] text-zinc-350 mt-1 leading-relaxed font-normal">Experienced CPAs review comparative sales registries before scheduled sessions to fast-track assessments reductions arguments.</p>
          </div>
          <div className="text-[9px] bg-white/10 text-zinc-350 p-2.5 rounded-xl border border-white/5 block font-mono text-left">
            Board Licensed Firm: PLLC-01002-TX
          </div>
        </div>
      </div>

      {/* Booking desk panel block */}
      <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-[#0b2512] text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#a3e635]" />
            <div>
              <h3 className="text-sm font-bold font-display">Texas Virtual Advisory Desk</h3>
              <p className="text-[9px] text-[#a3e635]/80 font-mono">Central Time (CST)</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-900 border border-white/10 text-white rounded-full px-3 py-1 font-bold">Complimentary</span>
        </div>

        <div className="p-8 space-y-6 text-center">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold max-w-md mx-auto">
            Select your preferred specialization focus, date, and priority hours by triggering our central reservation desk form below.
          </p>
          
          <div className="py-4">
            <button
              type="button"
              onClick={() => triggerScheduler("General Tax Inquiry")}
              className="bg-[#0b2512] hover:bg-[#1a4e25] text-[#a3e635] font-extrabold text-xs px-8 py-3.5 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105"
            >
              Open Interactive Scheduler Form 🎧
            </button>
          </div>
          
          <p className="text-[11px] text-gray-400">All submitted scheduling receipts persist automatically in your client sessions logs.</p>
        </div>
      </div>
    </motion.div>
  );
}
