import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck, 
  HelpCircle, 
  Building2, 
  Percent, 
  ArrowUpRight 
} from "lucide-react";

interface GuidesPageProps {
  key?: string;
  activeGuideId?: string;
  setActiveGuideId?: (id: string) => void;
  triggerScheduler: (categoryName: string) => void;
}

export default function GuidesPage({ activeGuideId = "property-tax", setActiveGuideId, triggerScheduler }: GuidesPageProps) {
  const [selectedGuide, setSelectedGuide] = useState<string>(activeGuideId);

  useEffect(() => {
    if (activeGuideId) {
      setSelectedGuide(activeGuideId);
    }
  }, [activeGuideId]);

  const guides = [
    {
      id: "property-tax",
      title: "Texas Property Tax Protest",
      category: "Real Estate",
      duration: "10 min read",
      badge: "Richardson / Dallas CAD Spec",
      icon: <Building2 className="w-5 h-5 text-emerald-800" />,
      description: "How to protest and lower inflated local property appraisals under Collin & Dallas Central Appraisal Districts.",
      steps: [
        "File your notice of protest before May 15th or 30 days after receiving your value notice (usually in mid-April) using Collin or Dallas CAD online portals.",
        "Request the Appraisal District's evidence pack ('HEARING EVIDENCE PACKAGE') online to see exactly which comps they used to value your home.",
        "Gather local sales comps on websites or consult us. Document physical home repairs needed (foundation cracks, roofing damage) with clear photo evidence.",
        "Attend the informal hearing with a staff appraiser first. Often, they will offer a 5% to 15% reduction immediately when presented with photos and repair bids.",
        "If the informal hearing is unsuccessful, prepare for the formal Appraisal Review Board (ARB) hearing. We can represent you officially as licensed agents."
      ],
      secrets: "Many appraisal districts use general computer mass modeling that completely ignores interior damage. Photo logs of foundation cracks can easily trim $30,000 to $70,000 off your taxable appraised value!"
    },
    {
      id: "scorp",
      title: "S-Corp Tax Shield Benefits",
      category: "Business Structure",
      duration: "8 min read",
      badge: "Self-Employment Shield",
      icon: <ShieldCheck className="w-5 h-5 text-[#84cc16]" />,
      description: "Reduce your 15.3% self-employment FICA taxes by structuring your business dividends legally.",
      steps: [
        "Incorporate your business as an LLC or C-Corp in Texas, then file IRS Form 2553 to request treatment as an S-Corporation.",
        "Establish a reasonable salary policy. The IRS requires S-Corp shareholder-employees to be paid 'reasonable compensation' reported on Form W-2.",
        "The remainder of company profits can be paid out as shareholder distributions (dividends), which are entirely exempt from the 15.3% FICA payroll tax.",
        "Run an accurate quarterly cost-benefit calculation. Generally, once net business income exceeds $60,000, S-Corp tax savings easily outweigh administrative costs.",
        "Ensure compliant quarterly payroll filing, Texas franchise declarations (public information reports), and IRS Form 1120-S filings."
      ],
      secrets: "Assuming a net profit of $100,000, a sole proprietorship pays ~$15,300 in self-employment taxes. As an S-Corp, with a $50,000 reasonable salary, you save up to $7,650 annually of pure tax shield!"
    },
    {
      id: "vat",
      title: "Cross-Border & EU VAT Matrix",
      category: "Global Sales",
      duration: "12 min read",
      badge: "Shopify & Amazon Sellers",
      icon: <Percent className="w-5 h-5 text-emerald-800" />,
      description: "Avoid dual-taxation traps and comply automatically with European and State-to-State Sales Tax Nexus limits.",
      steps: [
        "Monitor your economic nexus thresholds in foreign states. For example, many US states trigger local filing once sales exceed $100,000 or 200 separate transactions.",
        "If selling into the European Union or United Kingdom, understand that VAT registers at the physical port of entry unless utilizing the Import One-Stop Shop (IOSS).",
        "Adopt EU VAT compliance under VAT One-Stop Shop (VAT OSS) to file a single quarterly return for all 27 EU member states.",
        "Configure Shopify or Amazon physical inventory routing so you don't inadvertently create local VAT registration requirements in multiple EU hubs.",
        "Maximize your import duty tax recovery processes to recoup double VAT paid during raw material entry into international ports."
      ],
      secrets: "Always separate customs valuation from VAT calculations. Double-check your shipping terms (DDP vs DAP) on customs paperwork to ensure your customers are not hit with unexpected tax bills on arrival!"
    },
    {
      id: "audit",
      title: "IRS Audits & Letters",
      category: "Resolution",
      duration: "15 min read",
      badge: "Official Correspondence",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      description: "How to survive an IRS audit or letter inquiry (CP2000) without panic or unnecessary compliance settlements.",
      steps: [
        "Read the exact notice code (e.g., CP2000 for income mismatch, CP504 for intent to levy) at the top or bottom right corner of your IRS letter.",
        "Verify the details carefully. Do not immediately pay the general tax demand. Over 40% of standard correspondence audits have errors or double-counts.",
        "Collect complete, structured documentation: bank letters, Form 1099s, expense receipts, and mileage logs matching the flagged category.",
        "Structure your response packet systematically. Draft an official point-by-point disputation letter referencing supporting tax code provisions.",
        "Submit via certified mail or secure IRS upload. For complex issues, grant us Power of Attorney (Form 2848) so we can negotiate directly with IRS appraisers."
      ],
      secrets: "Never give an auditor more documents than they explicitly ask for in the Information Document Request (IDR). Over-sharing invites additional scrutiny and expands the scope of the audit!"
    }
  ];

  const currentGuide = guides.find(g => g.id === selectedGuide) || guides[0];

  const handleGuideClick = (guideId: string) => {
    setSelectedGuide(guideId);
    if (setActiveGuideId) {
      setActiveGuideId(guideId);
    }
  };

  return (
    <div id="guides-desktop-view" className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Spark Badge */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100 font-mono">
            <BookOpen className="w-3.5 h-3.5" /> Professional Knowledge Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-black text-gray-950 tracking-tight">
            Elite Tax Guides & Real Strategies
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-gray-500">
            Actionable expertise curated by Shafiq Hasan, CPA. Discover legal tax shelters, protest techniques, and optimization strategies to protect equity.
          </p>
        </div>

        {/* Content Box with left navigation list and right details board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Guide Selector Rail */}
          <div className="lg:col-span-4 space-y-3.5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono mb-2 px-1">
              Select Strategic Dossier:
            </p>
            {guides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => handleGuideClick(guide.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                  selectedGuide === guide.id
                    ? "bg-[#0b2512] border-transparent text-white shadow-lg"
                    : "bg-[#fafdfa] border-gray-100 hover:border-emerald-800/10 hover:bg-neutral-50"
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-all ${
                  selectedGuide === guide.id ? "bg-white" : "bg-white border border-gray-100"
                }`}>
                  {guide.icon}
                </div>

                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      selectedGuide === guide.id ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-800"
                    }`}>
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold">{guide.duration}</span>
                  </div>
                  <h3 className="font-bold text-sm tracking-tight leading-snug group-hover:text-emerald-500 transition-colors">
                    {guide.title}
                  </h3>
                </div>

                {selectedGuide === guide.id && (
                  <motion.div
                    layoutId="active-guide-indicator"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    <ArrowRight className="w-5 h-5 text-[#a3e635]" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGuide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-gray-150 rounded-3xl p-6 md:p-10 shadow-sm"
              >
                {/* Header Information */}
                <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {currentGuide.badge}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900 tracking-tight">
                      {currentGuide.title}
                    </h2>
                    <p className="text-gray-500 font-medium text-xs sm:text-sm">
                      {currentGuide.description}
                    </p>
                  </div>

                  <button
                    onClick={() => triggerScheduler(`Guide Consultation: ${currentGuide.title}`)}
                    className="inline-flex items-center gap-1 bg-[#0b2512] hover:bg-neutral-800 text-white font-bold text-[11px] px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all self-start md:self-center cursor-pointer font-sans shrink-0 uppercase tracking-wider"
                  >
                    Discuss This <ArrowUpRight className="w-3.5 h-3.5 text-[#a3e635]" />
                  </button>
                </div>

                {/* Steps Section */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase font-bold tracking-widest text-[#0b2512]/90 font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#84cc16]" /> Recommended Action Plan:
                  </h3>

                  <div className="space-y-4">
                    {currentGuide.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold font-mono flex items-center justify-center shrink-0 border border-emerald-100">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-medium pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Inside Secret Panel */}
                  <div className="mt-8 bg-zinc-50 border border-emerald-800/10 rounded-2xl p-5 md:p-6 flex gap-4 items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50/20 to-transparent rounded-full -mr-12 -mt-12"></div>
                    <div className="p-2 sm:p-2.5 bg-yellow-100 rounded-xl text-yellow-800 shrink-0 mt-0.5">
                      <HelpCircle className="w-5 h-5 font-bold" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] uppercase font-bold text-emerald-950 font-mono tracking-wider">
                        ★ Inside Pro-Advisor Tip
                      </h4>
                      <p className="text-xs sm:text-[13px] leading-relaxed text-gray-600 font-semibold italic">
                        "{currentGuide.secrets}"
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
