import React from "react";
import { motion } from "motion/react";
import TaxCalculator from "./TaxCalculator";

interface CalculatorsPageProps {
  key?: string;
  triggerScheduler: (categoryName: string) => void;
}

export default function CalculatorsPage({ triggerScheduler }: CalculatorsPageProps) {
  return (
    <motion.div
      key="view-calculators"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/20 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          Texas Appraisal Protests & Dividend Matrix
        </span>
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">
          Instant Tax Reduction & Savings Estimator
        </h1>
        <p className="max-w-xl mx-auto text-xs text-gray-500 leading-relaxed font-normal">
          Accurately forecast residential and commercial property appraisal assessment reductions inside Dallas & Collin County, or structure self-employed S-Corp payroll shields.
        </p>
      </div>

      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm">
        <TaxCalculator />
      </div>

      <div className="mt-12 bg-[#0b2512] text-white p-8 rounded-[40px] border border-[#a3e635]/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-left">
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#a3e635] font-mono block">CPA texas appraisal support</span>
          <h3 className="text-lg font-bold font-display">Need Representation at Richardson Board Protests?</h3>
          <p className="text-xs text-zinc-350 leading-relaxed font-normal">Under Texas Tax Code, we formalize physical appraisals complaints, aggregate comparable market rosters, and argue adjustments before the Appraisal Review Board (ARB).</p>
        </div>
        <button
          type="button"
          onClick={() => triggerScheduler("Dallas appraisal protest")}
          className="bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer shrink-0"
        >
          Secure Representation Spots
        </button>
      </div>
    </motion.div>
  );
}
