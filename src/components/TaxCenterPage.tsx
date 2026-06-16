import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  Calendar, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Download, 
  ExternalLink, 
  Percent, 
  Building 
} from "lucide-react";
import TaxCalculator from "./TaxCalculator";

interface TaxCenterPageProps {
  key?: string;
  activeSubSectionId?: string;
  setActiveSubSectionId?: (id: string) => void;
  triggerScheduler: (categoryName: string) => void;
}

export default function TaxCenterPage({ activeSubSectionId = "calculators", setActiveSubSectionId, triggerScheduler }: TaxCenterPageProps) {
  const [activeTab, setActiveTab] = useState<string>(activeSubSectionId);

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

  // Important Dates array
  const taxCalendar = [
    {
      date: "March 15, 2026",
      title: "S-Corp & Partnership returns",
      forms: "Forms 1120-S, 1065",
      type: "Corporate Deadline",
      urgency: "high",
      description: "Crucial date to submit flow-through business taxes or file for a 6-month extension to preserve local S-Corp division rights."
    },
    {
      date: "April 15, 2026",
      title: "Individual Tax Day / Q1 Estimated payments",
      forms: "Form 1040, 1040-ES",
      type: "Federal Filing",
      urgency: "critical",
      description: "Standard personal returns must be filed and taxes paid, or file Form 4868 to secure an extension. Also Q1 voucher deadline."
    },
    {
      date: "May 15, 2026",
      title: "Texas Property Tax Protest Filing",
      forms: "Form 50-132, Local CAD Portals",
      type: "Property Appraisal",
      urgency: "critical",
      description: "Universal deadline to officially lodge an appeal contesting appraisal valuation for Collin CAD and Dallas CAD houses."
    },
    {
      date: "June 15, 2026",
      title: "Texas Franchise Tax returns & Q2 Estimated pay",
      forms: "Form 05-158, Form 1040-ES",
      type: "State Franchise / Q2",
      urgency: "high",
      description: "State franchise reports due for businesses operating in Texas, alongside personal federal second-quarter prepayments."
    },
    {
      date: "September 15, 2026",
      title: "Extended S-Corp Returns & Q3 Estimated pay",
      forms: "Form 1120-S, Form 1040-ES",
      type: "Extended Filings",
      urgency: "high",
      description: "Final cutoff date for S-Corporation and Partnership returns that requested the 6-month extension in March."
    }
  ];

  // Forms list
  const stateForms = [
    {
      code: "IRS Form 1040",
      title: "US Individual Income Tax Return",
      format: "PDF Document",
      url: "https://www.irs.gov/pub/irs-pdf/f1040.pdf",
      description: "The primary form filed by high-income families, doctors, and real estate professionals in Texas."
    },
    {
      code: "IRS Form 2553",
      title: "Election by a Small Business Corporation",
      format: "PDF Document",
      url: "https://www.irs.gov/pub/irs-pdf/f2553.pdf",
      description: "Required to file an S-Corp election status with the IRS for active Texas LLC and business entities."
    },
    {
      code: "IRS Form 2848",
      title: "Power of Attorney & Representative Declaration",
      format: "PDF Document",
      url: "https://www.irs.gov/pub/irs-pdf/f2848.pdf",
      description: "Grants us safe, secure permission to communicate directly with the IRS or local tax officers on your behalf."
    },
    {
      code: "Texas CAD 50-132",
      title: "Property Appraisal Notice of Protest Form",
      format: "PDF Document",
      url: "https://comptroller.texas.gov/taxes/property-tax/forms/50-132.pdf",
      description: "Off-portal physical form to mail to Dallas CAD/Collin CAD if online appraisal protest portal fails."
    }
  ];

  return (
    <div id="tax-center-view" className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card Block */}
        <div className="text-center space-y-4 mb-10">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100 font-mono">
            <Percent className="w-3.5 h-3.5 text-emerald-800 animate-pulse" /> Live Client Tax Center
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-black text-gray-950 tracking-tight">
            Compliance Tools & Tax Resource Hub
          </h1>
          <p className="max-w-xl mx-auto text-sm text-gray-500">
            Access our live calculators, review critical Texas and Federal tax deadline calendars, and download required official IRS forms easily.
          </p>
        </div>

        {/* Floating Switcher Controls */}
        <div className="flex flex-wrap justify-center gap-1.5 bg-neutral-100 p-1 rounded-2xl max-w-2xl mx-auto mb-12 border border-gray-150">
          {[
            { id: "calculators", label: "Tax Estimators", icon: <Calculator className="w-4 h-4" /> },
            { id: "calendar", label: "Dates & Deadlines", icon: <Calendar className="w-4 h-4" /> },
            { id: "forms", label: "IRS / Protest Forms", icon: <FileText className="w-4 h-4" /> },
            { id: "rates", label: "Tax Brackets Table", icon: <TrendingUp className="w-4 h-4" /> }
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

        {/* Tab content area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "calculators" && (
              <motion.div
                key="tab-calculators"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="max-w-6xl mx-auto p-4 bg-zinc-50 border border-gray-150 rounded-3xl">
                  <div className="p-6 md:p-8 bg-gradient-to-br from-[#0b2512] to-black rounded-2xl text-white mb-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e635]/10 rounded-full blur-2xl"></div>
                    <div className="space-y-2">
                      <span className="text-[#a3e635] text-[10px] font-mono tracking-widest uppercase font-bold">
                        ★ Live Assessment Estimators
                      </span>
                      <h2 className="text-xl md:text-2xl font-display font-black text-white">
                        Run our customized tax-savings simulator
                      </h2>
                      <p className="text-xs text-zinc-300 max-w-xl">
                        Simulate how much custom home damage documentation could drop your Dallas CAD real appraisal, or test how S-Corp dividends shield your sole-proprietor business margins.
                      </p>
                    </div>
                    <button 
                      onClick={() => triggerScheduler("Calculator Consultation")}
                      className="bg-[#a3e635] hover:bg-white hover:text-[#0b2512] text-emerald-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer font-sans shrink-0 border border-white/10"
                    >
                      Book Free Analysis
                    </button>
                  </div>

                  {/* Calculator wrapper */}
                  <TaxCalculator />
                </div>
              </motion.div>
            )}

            {activeTab === "calendar" && (
              <motion.div
                key="tab-calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-100">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-gray-950">
                        IRS & State Filing Dates (Filing Year 2026)
                      </h3>
                      <p className="text-xs text-gray-500">
                        Strict due dates under federal regulations and Collin / Dallas Central Appraisal District rules.
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-150">
                    {taxCalendar.map((item, idx) => (
                      <div key={idx} className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 group">
                        <div className="space-y-1.5 md:max-w-lg">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-[#0b2512] bg-[#a3e635]/20 font-mono px-2.5 py-0.5 rounded-full">
                              {item.date}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">
                              {item.type}
                            </span>
                            {item.urgency === "critical" && (
                              <span className="text-[9px] uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 font-extrabold px-2 py-0.5 rounded animate-pulse">
                                CRITICAL
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-[#0c2415] text-sm md:text-base group-hover:text-emerald-800 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end justify-between self-stretch shrink-0">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-mono">
                            {item.forms}
                          </span>
                          <button
                            onClick={() => triggerScheduler(`Consultation Request for Deadline: ${item.title}`)}
                            className="text-[11px] font-bold text-zinc-400 hover:text-emerald-800 flex items-center gap-1 self-end mt-2 hover:underline cursor-pointer"
                          >
                            Set Alert Notification <Clock className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "forms" && (
              <motion.div
                key="tab-forms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {stateForms.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#a3e635] bg-[#0b2512]/10 font-bold px-1.5 py-0.5 rounded font-mono">
                          {item.format}
                        </span>
                      </div>
                      <h4 className="font-black text-gray-950 text-sm md:text-base group-hover:text-emerald-800 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-[#0b2512] cursor-pointer hover:underline"
                      >
                        Download PDF Form <Download className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-zinc-400 font-bold flex items-center gap-0.5 hover:text-zinc-650"
                      >
                        Official IRS Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}

                <div className="col-span-1 md:col-span-2 bg-[#0b2512]/5 border border-[#a3e635]/25 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-2">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-sm md:text-base text-emerald-950 flex items-center gap-2">
                      <Building className="w-5 h-5 text-emerald-800" /> Need official county representation forms?
                    </h4>
                    <p className="text-xs text-gray-600 max-w-xl font-medium">
                      If you require a dedicated appointment of representation (Form 50-162) to assign us as your property protest agents for local Texas appraisal hearings, we can populate it instantly.
                    </p>
                  </div>
                  <button
                    onClick={() => triggerScheduler("Property Protest Representation Form Request")}
                    className="bg-[#0b2512] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl cursor-pointer shadow-md shrink-0 border border-[#a3e635]/20 font-sans"
                  >
                    Request Representation
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "rates" && (
              <motion.div
                key="tab-rates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-100">
                      <Percent className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-gray-950">
                        Federal Individual Tax Bracket Reference (2025/2026 Summary)
                      </h3>
                      <p className="text-xs text-gray-500">
                        Personal marginal tax rates used to estimate individual liabilities before strategic deductions.
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-100 rounded-2xl overflow-hidden font-sans">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-neutral-50 text-neutral-500 border-b border-gray-150 font-bold uppercase tracking-wider text-[10px]">
                          <th className="px-5 py-3">Tax Rate</th>
                          <th className="px-5 py-3">Single Taxable Income</th>
                          <th className="px-5 py-3">Married Jointly Income</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                        <tr>
                          <td className="px-5 py-3.5 font-bold text-emerald-800">10%</td>
                          <td className="px-5 py-3.5 font-mono">$0 to $11,925</td>
                          <td className="px-5 py-3.5 font-mono">$0 to $23,850</td>
                        </tr>
                        <tr className="bg-zinc-50/50">
                          <td className="px-5 py-3.5 font-bold text-emerald-800">12%</td>
                          <td className="px-5 py-3.5 font-mono">$11,926 to $48,475</td>
                          <td className="px-5 py-3.5 font-mono">$23,851 to $96,950</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3.5 font-bold text-emerald-800">22%</td>
                          <td className="px-5 py-3.5 font-mono">$48,476 to $103,350</td>
                          <td className="px-5 py-3.5 font-mono">$96,951 to $206,700</td>
                        </tr>
                        <tr className="bg-zinc-50/50">
                          <td className="px-5 py-3.5 font-bold text-emerald-800">24%</td>
                          <td className="px-5 py-3.5 font-mono">$103,351 to $197,300</td>
                          <td className="px-5 py-3.5 font-mono">$206,701 to $394,600</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3.5 font-bold text-emerald-800">32%</td>
                          <td className="px-5 py-3.5 font-mono">$197,301 to $250,525</td>
                          <td className="px-5 py-3.5 font-mono">$394,601 to $501,050</td>
                        </tr>
                        <tr className="bg-zinc-50/50 flex-col">
                          <td className="px-5 py-3.5 font-bold text-emerald-800">35%+</td>
                          <td className="px-5 py-3.5 font-mono">Over $250,526</td>
                          <td className="px-5 py-3.5 font-mono">Over $501,051</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-5 bg-[#0b2512]/5 rounded-2xl border border-dashed border-emerald-800/10 text-xs text-gray-500 leading-relaxed font-medium">
                    <span className="font-bold text-[#0c2415] block mb-1">💡 Important Texas State Note:</span>
                    Texas imposes <strong className="font-bold">zero personal state income tax</strong>. However, businesses face the Texas Franchise Tax, which features a zero-tax liability for companies earning below the <strong className="text-emerald-800 font-bold">$2.47M</strong> statutory threshold (though filing a No-Tax-Due information report is still legally mandatory!).
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
