import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  UserCheck, 
  Briefcase, 
  ClipboardList, 
  FileCheck, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldAlert, 
  CheckSquare, 
  Square,
  Building2,
  Percent
} from "lucide-react";
import { faqItems } from "../data";

interface MiscPageProps {
  key?: string;
  activeSubSectionId?: string;
  setActiveSubSectionId?: (id: string) => void;
  triggerScheduler: (categoryName: string) => void;
}

export default function MiscPage({ activeSubSectionId = "faq", setActiveSubSectionId, triggerScheduler }: MiscPageProps) {
  const [activeTab, setActiveTab] = useState<string>(activeSubSectionId);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [docType, setDocType] = useState<"individual" | "business">("individual");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeSubSectionId) {
      setActiveTab(activeSubSectionId);
    }
  }, [activeSubSectionId]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (setActiveSubSectionId) {
      setActiveSubSectionId(tabId);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const toggleDocCheck = (id: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Onboarding milestones
  const onboardingSteps = [
    {
      title: "Discovery Consultation",
      description: "We host an introductory call to review your current bookkeeping structure, outstanding IRS letter notifications, or local appraisal values.",
      icon: <HelpCircle className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Fee Proposal & Scope Agreement",
      description: "A comprehensive engagement letter outlining the fixed service fees. No surprise billings or unannounced hourly charges.",
      icon: <ClipboardList className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Secure Portal Intake",
      description: "We deploy individual secure portals unique to your profile. You safely drop brokerage statements, previous returns, and P&L sheets.",
      icon: <Building2 className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "Formal Analysis & Review Meeting",
      description: "Our certified experts draft your returns or protest dossiers and invite you for a virtual screen-share review to audit every line item.",
      icon: <UserCheck className="w-5 h-5 text-emerald-800" />
    },
    {
      title: "IRS / County E-Filing",
      description: "Upon signing off, we e-file reports. We manage ongoing correspondence with agents so your peace of mind remains completely sound.",
      icon: <FileCheck className="w-5 h-5 text-emerald-800" />
    }
  ];

  // Checklist items
  const docChecklists = {
    individual: [
      { id: "i1", text: "IRS Form W-2 (Wage earned statement from employers)" },
      { id: "i2", text: "Forms 1099-NEC / 1099-MISC (Contractor or self-employed proceeds)" },
      { id: "i3", text: "Form 1099-B (Consolidated brokerage or stock transaction logs)" },
      { id: "i4", text: "Form 1098 (Mortgage Interest offset for Dallas / Collin homes)" },
      { id: "i5", text: "Latest local Central Appraisal District (CAD) home value notice" },
      { id: "i6", text: "Property damage/repair quotes (if protesting appraisal values)" },
      { id: "i7", text: "Charitable contribution receipts & digital logs" }
    ],
    business: [
      { id: "b1", text: "Pristine Profit & Loss Statement (matching tax-year period)" },
      { id: "b2", text: "Complete balance sheet reflecting bank assets & debts" },
      { id: "b3", text: "December bank feed statement summaries & corporate credit reconciles" },
      { id: "b4", text: "Form 941 (Employer Quarterly Payroll returns, if hiring staff)" },
      { id: "b5", text: "Form 1099-K (Merchant processing statements from Stripe, PayPal, or Amazon)" },
      { id: "b6", text: "State Franchise Tax filings & historical reports" },
      { id: "b7", text: "Capital asset acquisition invoices for Section 179 depreciation deductions" }
    ]
  };

  return (
    <div id="misc-center-view" className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center space-y-4 mb-10">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100 font-mono">
            <ClipboardList className="w-3.5 h-3.5 text-emerald-800" /> Resource Hub & Onboarding
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-black text-gray-950 tracking-tight">
            Frequently Asked Questions & Kits
          </h1>
          <p className="max-w-xl mx-auto text-sm text-gray-500">
            Find immediate answers on bookkeeping cleanups, explore our new client onboarding roadmap, lock in tax checklists, or view CTA filing warnings.
          </p>
        </div>

        {/* Tab Controls Menu */}
        <div className="flex flex-wrap justify-center gap-1.5 bg-neutral-100 p-1 rounded-2xl max-w-2xl mx-auto mb-12 border border-gray-150">
          {[
            { id: "faq", label: "FAQ Helpdesk", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "onboarding", label: "Onboarding Kit", icon: <UserCheck className="w-4 h-4" /> },
            { id: "docs", label: "Document Checklist", icon: <ClipboardList className="w-4 h-4" /> },
            { id: "cta", label: "CTA FinCEN Mandates", icon: <ShieldAlert className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === item.id 
                  ? "bg-white text-emerald-950 shadow-md border border-gray-100" 
                  : "text-zinc-600 hover:text-emerald-950 hover:bg-white/40"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Switcher Board Box */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* FAQ HELPDESK */}
            {activeTab === "faq" && (
              <motion.div
                key="faq-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto space-y-4"
              >
                <h3 className="text-sm uppercase font-mono font-bold text-gray-400 tracking-widest mb-2 text-center">
                  ✨ TAX ADVISOR RESOLUTION DESK
                </h3>

                <div className="bg-[#fafdfa] border border-gray-150 rounded-3xl p-5 md:p-8 space-y-4 shadow-sm">
                  {faqItems.map((item, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div 
                        key={index} 
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 font-sans"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex justify-between items-center text-left py-2 font-bold text-[#0c2415] text-sm md:text-base hover:text-emerald-800 transition-colors cursor-pointer"
                        >
                          <span className="pr-4">{item.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-[#a3e635] shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs sm:text-sm text-gray-500 pt-2 leading-relaxed font-semibold">
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-8">
                  <p className="text-gray-500 text-xs font-semibold mb-3">
                    Have any other specific personal or international corporate tax queries?
                  </p>
                  <button 
                    onClick={() => triggerScheduler("General FAQ Query")}
                    className="inline-flex items-center gap-1 bg-[#0b2512] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full cursor-pointer shadow-md font-sans"
                  >
                    Ping Certified CPA <ArrowRight className="w-3.5 h-3.5 text-[#a3e635]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ONBOARDING KIT */}
            {activeTab === "onboarding" && (
              <motion.div
                key="onboarding-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm">
                  <div className="text-center space-y-2 mb-10">
                    <h3 className="text-base font-bold font-display text-gray-900 tracking-tight">
                      New Client Integration Blueprint
                    </h3>
                    <p className="text-xs text-gray-500">
                      Our frictionless 5-step roadmap designed to set up your S-Corp salary, start ledger cleanups, or launch appraisal protests.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                    {/* Visual process connection line */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gray-150 z-0"></div>

                    {onboardingSteps.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-3.5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-150 shadow-sm group-hover:border-[#0b2512] group-hover:bg-[#a3e635]/10 flex items-center justify-center transition-all duration-300">
                          {step.icon}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-black text-gray-400">
                            STEP 0{idx + 1}
                          </span>
                          <h4 className="font-bold text-gray-950 text-xs tracking-tight">
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-gray-505 leading-relaxed font-semibold">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-150 pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50/50 p-6 rounded-2xl">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-emerald-950">
                        Ready to launch Step 01?
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Schedule a free 15-minute diagnostic appointment with a licensed Houston/Dallas tax associate.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerScheduler("New Client Onboarding Request")}
                      className="bg-[#0b2512] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer shrink-0"
                    >
                      Initialize Collaboration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DOCUMENT CHECKLIST */}
            {activeTab === "docs" && (
              <motion.div
                key="docs-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm">
                  
                  {/* Select Category */}
                  <div className="flex border-b border-gray-100 pb-5 mb-6 justify-between items-center gap-4 flex-col sm:flex-row">
                    <div>
                      <h3 className="font-display font-black text-lg text-gray-950">
                        Required Filing Documents Checklist (Tax Year 2025/2026)
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold mt-0.5">
                        Toggle your tax bracket profile below to populate required file lists instantly.
                      </p>
                    </div>

                    <div className="inline-flex bg-neutral-100 p-0.5 rounded-xl border border-gray-150 font-sans shrink-0">
                      <button
                        onClick={() => setDocType("individual")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          docType === "individual" ? "bg-white text-emerald-950 shadow-sm" : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        Individual Filers
                      </button>
                      <button
                        onClick={() => setDocType("business")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          docType === "business" ? "bg-white text-emerald-950 shadow-sm" : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        S-Corp & Corporations
                      </button>
                    </div>
                  </div>

                  {/* Checklist loop */}
                  <div className="space-y-3.5">
                    {docChecklists[docType].map((item) => {
                      const isChecked = !!checkedDocs[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleDocCheck(item.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 cursor-pointer hover:bg-zinc-50 ${
                            isChecked ? "bg-emerald-50/20 border-emerald-800/10" : "bg-white border-gray-100"
                          }`}
                        >
                          <div className="shrink-0 transition-all text-[#0b2512]">
                            {isChecked ? (
                              <CheckSquare className="w-5.5 h-5.5 text-emerald-800" />
                            ) : (
                              <Square className="w-5.5 h-5.5 text-gray-300" />
                            )}
                          </div>
                          <span className={`text-xs md:text-sm font-semibold transition-all ${
                            isChecked ? "line-through text-gray-400" : "text-gray-800"
                          }`}>
                            {item.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-bold">
                      Completed: {Object.keys(checkedDocs).filter(k => k.startsWith(docType === "individual" ? "i" : "b") && checkedDocs[k]).length} of {docChecklists[docType].length} items
                    </span>
                    <button
                      onClick={() => setCheckedDocs({})}
                      className="text-emerald-800 hover:underline font-bold"
                    >
                      Reset Checklist
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA MANIFEST */}
            {activeTab === "cta" && (
              <motion.div
                key="cta-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-9 shadow-sm space-y-6">
                  
                  {/* Warning Header */}
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5 md:p-6 flex gap-4">
                    <ShieldAlert className="w-7 h-7 text-red-700 shrink-0 select-none animate-bounce" />
                    <div className="space-y-1.5">
                      <span className="text-red-700 text-[10px] font-mono tracking-widest font-black uppercase">
                        ⚠️ FINCEN REGULATORY ALERT (CRITICAL MANDATE)
                      </span>
                      <h3 className="font-display font-black text-red-950 text-base md:text-lg">
                        Texas S-Corps & LLCs Must Submit BOI Reports
                      </h3>
                      <p className="text-xs text-red-700 leading-relaxed font-semibold">
                        Under the federal Corporate Transparency Act, almost all existing business units formed before January 1, 2224, must file an active Beneficial Ownership Information (BOI) registration to avoid highly punitive federal non-compliance charges.
                      </p>
                    </div>
                  </div>

                  {/* Mandate description */}
                  <div className="space-y-4">
                    <h4 className="font-black text-[#0c2415] text-sm md:text-base">
                      Why does this require immediate diagnostic attention?
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                      The Financial Crimes Enforcement Network (FinCEN) initiated this mandate to prevent shell corporate laundering. Non-compliance results in statutory civil penalties of up to <strong className="text-red-700">$500 per day</strong> for each ongoing violation, with possible criminal citations for intentional omission.
                    </p>

                    <div className="border border-gray-150 rounded-2xl p-5 bg-neutral-50 space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gray-400 block">
                        📋 STRICT REQUIREMENTS FOR CORPORATIONS:
                      </span>
                      <ul className="space-y-2 text-xs text-gray-600 list-disc pl-5 font-semibold leading-relaxed">
                        <li>Filing must name any beneficial owner possessing over 25% ownership equity or exerting major operating control.</li>
                        <li>Required submissions must attach formal state-issued identity documents (Texas driver's license or active US passport scans).</li>
                        <li>Newly structured business units formed today have only <strong className="text-[#0b2512] font-black">90 statutory days</strong> from State filing registration to submit BOI coordinates.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-[#0b2512]">
                        Do you require professional CTA filing assistance?
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase font-mono">
                        Our compliance agents handle the portal submissions completely.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerScheduler("FinCEN BOI CTA Filing support")}
                      className="bg-[#0b2512] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer"
                    >
                      File BOI Document Officially
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
