import React, { useState } from "react";
import { DollarSign, ShieldCheck, Scale, Info, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type CalculatorTab = "property" | "scorp" | "vat";

export default function TaxCalculator() {
  const [activeTab, setActiveTab ] = useState<CalculatorTab>("property");

  // Property Tax Estimator State
  const [appraisedValue, setAppraisedValue] = useState<number>(450000);
  const [targetReduction, setTargetReduction] = useState<number>(10); // percentage reduction requested
  const [taxRate, setTaxRate] = useState<number>(2.25); // Standard Dallas/Richardson county rate (2.1% - 2.5%)

  // S-Corp State
  const [netBusinessProfit, setNetBusinessProfit] = useState<number>(95000);
  const [reasonableSalary, setReasonableSalary] = useState<number>(55000);

  // VAT/Sales Tax State
  const [salesAmount, setSalesAmount] = useState<number>(1200);
  const [region, setRegion] = useState<"US-TX" | "US-CA" | "EU-GER" | "UK">("US-TX");

  // Calculations
  const calcPropertySavings = () => {
    const originalTax = (appraisedValue * taxRate) / 100;
    const proposedAppraisal = appraisedValue * (1 - targetReduction / 100);
    const newTax = (proposedAppraisal * taxRate) / 100;
    const annualSavings = originalTax - newTax;
    const monthlyEscrowSavings = annualSavings / 12;
    return {
      originalTax,
      newTax,
      annualSavings,
      monthlyEscrowSavings,
      proposedAppraisal
    };
  };

  const calcScorpSavings = () => {
    // Under sole proprietor, 15.3% self-employment tax is charged on roughly 92.35% of net profit
    const solePropTax = netBusinessProfit * 0.9235 * 0.153;
    
    // Under S-Corp, FICA tax (15.3%) is ONLY charged on the self-employment salary segment
    const sCorpFicaTax = reasonableSalary * 0.153;
    
    // Remaining profit is taken as S-Corp distribution (0% Self Employment tax)
    const netSavings = Math.max(0, solePropTax - sCorpFicaTax);
    
    return {
      solePropTax,
      sCorpFicaTax,
      netSavings,
      distribution: Math.max(0, netBusinessProfit - reasonableSalary)
    };
  };

  const getTaxRuleData = (reg: typeof region) => {
    switch (reg) {
      case "US-TX":
        return { rate: 6.25, name: "Texas State Sales Tax", info: "Origin state, no physical tax on virtual goods unless SaaS is taxed. Wayfair economic sales nexus at $500,000 threshold." };
      case "US-CA":
        return { rate: 7.25, name: "California State Sales Tax", info: "District sales taxes apply dynamically up to 10.25%. Wayfair economic sales nexus at $500,000 threshold." };
      case "EU-GER":
        return { rate: 19.0, name: "German standard VAT (Mehrwertsteuer)", info: "Subject to EU-wide OSS threshold of €10,000. Under UK/EU tax rules, transactional import VAT is calculated directly at customs checkout." };
      case "UK":
        return { rate: 20.0, name: "United Kingdom standard VAT", info: "Subject to £85,000 domestic registration ceiling, but zero-threshold for overseas electronic sellers." };
    }
  };

  const activeRegion = getTaxRuleData(region);
  const vatCalculated = (salesAmount * activeRegion.rate) / 100;
  const totalWithTax = salesAmount + vatCalculated;

  const propertyRes = calcPropertySavings();
  const scorpRes = calcScorpSavings();

  return (
    <div id="interactive-tax-calculator" className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/70 p-2 gap-1 md:flex-row flex-col">
        <button
          id="btn-tab-property"
          onClick={() => setActiveTab("property")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
            activeTab === "property"
              ? "bg-[#0b2512] text-white shadow-md shadow-[#0b2512]/10"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Scale className="w-4 h-4" />
          Dallas Appraisal Protest
        </button>
        <button
          id="btn-tab-scorp"
          onClick={() => setActiveTab("scorp")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
            activeTab === "scorp"
              ? "bg-[#0b2512] text-white shadow-md shadow-[#0b2512]/10"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          S-Corp Tax Shield
        </button>
        <button
          id="btn-tab-vat"
          onClick={() => setActiveTab("vat")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
            activeTab === "vat"
              ? "bg-[#0b2512] text-white shadow-md shadow-[#0b2512]/10"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          VAT & State Sales Tax
        </button>
      </div>

      {/* Calculations Area */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "property" && (
            <motion.div
              key="property-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Inputs */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Dallas County Appraisal Protest</h3>
                  <p className="text-xs text-gray-500">Texas property appraisals run extremely high. Estimate how a protest drops your annual cash outlays.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Appraised Property Value: ${appraisedValue.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={150000}
                      max={1500000}
                      step={10000}
                      value={appraisedValue}
                      onChange={(e) => setAppraisedValue(Number(e.target.value))}
                      className="w-full accent-[#a3e635] bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>$150k</span>
                      <span>$750k</span>
                      <span>$1.5M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Target Appraisal Reduction: {targetReduction}%
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={25}
                      step={1}
                      value={targetReduction}
                      onChange={(e) => setTargetReduction(Number(e.target.value))}
                      className="w-full accent-[#a3e635] bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>3% (Average)</span>
                      <span>15% (Optimistic)</span>
                      <span>25% (High Defect)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Annual Municipal Tax Rate (%):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.05"
                        min="1"
                        max="4"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        className="w-40 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#0b2512]"
                      />
                      <button
                        onClick={() => setTaxRate(2.24)}
                        className="text-[11px] px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                      >
                        Reset to Dallas (2.24%)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="md:col-span-6 bg-gradient-to-br from-neutral-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635]/80 bg-[#a3e635]/10 px-2.5 py-1 rounded-full">
                    Estimated Annual Tax Shield
                  </span>
                  <div className="mt-4">
                    <h4 className="text-4xl font-extrabold text-[#a3e635]">
                      ${Math.round(propertyRes.annualSavings).toLocaleString()}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">provisional cash saved per year</p>
                  </div>

                  <div className="border-t border-white/10 mt-6 pt-4 space-y-2.5 text-xs text-gray-200">
                    <div className="flex justify-between">
                      <span>Original Escrow Outgo:</span>
                      <span className="font-semibold">${Math.round(propertyRes.originalTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#a3e635]">
                      <span>New Projected Tax Bill:</span>
                      <span className="font-semibold">${Math.round(propertyRes.newTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Mortage Relief:</span>
                      <span className="font-semibold">+ ${Math.round(propertyRes.monthlyEscrowSavings)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appraisal Reduced to:</span>
                      <span className="font-semibold text-gray-300">${Math.round(propertyRes.proposedAppraisal).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 bg-white/5 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-[11px] text-[#a3e635]/90">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#a3e635]" /> Perfect for Collin/Dallas Central Appraisal Districts
                  </span>
                  <a href="#message-section" className="font-semibold hover:underline flex items-center gap-0.5">
                    Protest Now <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "scorp" && (
            <motion.div
              key="scorp-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Inputs */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">LLC vs. S-Corporation Optimization</h3>
                  <p className="text-xs text-gray-500">Sole Proprietors pay 15.3% Self-Employment tax on full receipts. An S-Corp split shields corporate dividends.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Net Positional Business Profit: ${netBusinessProfit.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={40000}
                      max={250000}
                      step={5000}
                      value={netBusinessProfit}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setNetBusinessProfit(val);
                        if (reasonableSalary > val) setReasonableSalary(Math.round(val * 0.6));
                      }}
                      className="w-full accent-[#a3e635] bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>$40,000</span>
                      <span>$145,000</span>
                      <span>$250,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Proposed W-2 Reasonable Salary: ${reasonableSalary.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={20000}
                      max={Math.min(180000, netBusinessProfit)}
                      step={5000}
                      value={reasonableSalary}
                      onChange={(e) => setReasonableSalary(Number(e.target.value))}
                      className="w-full accent-[#a3e635] bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>$20,000</span>
                      <span>Salary Cap (60%: ${Math.round(netBusinessProfit * 0.6).toLocaleString()})</span>
                      <span>${netBusinessProfit.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-lime-50/70 border border-lime-200/50 rounded-xl">
                    <h5 className="text-[11px] font-bold text-emerald-950 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600" /> IRS &quot;Reasonable Salary&quot; Rule
                    </h5>
                    <p className="text-[10px] leading-relaxed text-[#0b2512]/95">
                      The IRS requires owner-employees to receive a standard salary matching market levels before extracting tax-free S-Corp disbursements. Setting your salary representing 40-60% of total revenue is typical.
                    </p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="md:col-span-6 bg-gradient-to-br from-neutral-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635]/80 bg-[#a3e635]/10 px-2.5 py-1 rounded-full">
                    S-Corp FICA Tax Savings
                  </span>
                  <div className="mt-4">
                    <h4 className="text-4xl font-extrabold text-[#a3e635]">
                      ${Math.round(scorpRes.netSavings).toLocaleString()}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 font-mono">shielded from 15.3% self-employment checkouts</p>
                  </div>

                  <div className="border-t border-white/10 mt-6 pt-4 space-y-2.5 text-xs text-gray-200">
                    <div className="flex justify-between">
                      <span>Sole Prop FICA Settle:</span>
                      <span className="font-semibold text-red-300">${Math.round(scorpRes.solePropTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected S-Corp FICA:</span>
                      <span className="font-semibold">${Math.round(scorpRes.sCorpFicaTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#a3e635]">
                      <span>Tax-Free Shielded Dividends:</span>
                      <span className="font-semibold">${Math.round(scorpRes.distribution).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 bg-white/5 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-[11px] text-[#a3e635]/90">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#a3e635]" /> Perfect for growing Texas tech startups, LLCs & contractors
                  </span>
                  <a href="#message-section" className="font-semibold hover:underline flex items-center gap-0.5">
                    Structure S-Corp <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vat" && (
            <motion.div
              key="vat-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Inputs */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">State Sales Tax & European VAT router</h3>
                  <p className="text-xs text-gray-500">Calculate local US multi-state rates or EU/UK VAT liability, ensuring correct nexus checks.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Target Destination Region:
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as any)}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#0b2512]"
                    >
                      <option value="US-TX">Texas (Local State - 6.25%)</option>
                      <option value="US-CA">California (Standard State - 7.25%)</option>
                      <option value="EU-GER">Germany (European Import - 19.0%)</option>
                      <option value="UK">United Kingdom (UK VAT - 20.0%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Transactional Order Value: ${salesAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={12000}
                      step={50}
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(Number(e.target.value))}
                      className="w-full accent-[#a3e635] bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>$50</span>
                      <span>$6,000</span>
                      <span>$12,000</span>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl text-[10px] text-gray-600 flex gap-2">
                    <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">Tax Nexus Alert:</span> {activeRegion.info}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="md:col-span-6 bg-gradient-to-br from-neutral-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635]/80 bg-[#a3e635]/10 px-2.5 py-1 rounded-full">
                    {activeRegion.name}
                  </span>
                  <div className="mt-4">
                    <h4 className="text-4xl font-extrabold text-[#a3e635]">
                      ${vatCalculated.toFixed(2)}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">Calculated transactional tax amount</p>
                  </div>

                  <div className="border-t border-white/10 mt-6 pt-4 space-y-2.5 text-xs text-gray-200">
                    <div className="flex justify-between">
                      <span>Base Selling Sum:</span>
                      <span className="font-semibold">${salesAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regional Rate:</span>
                      <span className="font-semibold text-[#a3e635]">{activeRegion.rate}%</span>
                    </div>
                    <div className="flex justify-between text-white/50 border-t border-white/5 pt-2">
                      <span>Combined Customer Total:</span>
                      <span className="font-bold text-white">${totalWithTax.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 bg-white/5 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-[11px] text-[#a3e635]/90">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#a3e635]" /> Full e-commerce billing & QuickBooks mapping available
                  </span>
                  <a href="#message-section" className="font-semibold hover:underline flex items-center gap-0.5">
                    Connect API <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
