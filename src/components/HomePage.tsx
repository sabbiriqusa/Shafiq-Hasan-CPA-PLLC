import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ChevronRight, Phone, TrendingUp, Cpu, Globe, Quote, Star, ShieldCheck, ArrowUpRight, ArrowRight, Folder, FolderOpen, Download, Lock, Unlock, Sparkles } from "lucide-react";
import { 
  testimonialsData, 
  googleReviewsData,
  DALLAS_SKYLINE, 
  SHAFIQ_HASAN_PORTRAIT, 
  INDIVIDUAL_SERVICE_IMG, 
  BUSINESS_SERVICE_IMG, 
  QUICKBOOK_SERVICE_IMG, 
  TAX_SERVICE_IMG 
} from "../data";

const vaultFiles = [
  {
    id: "protest",
    name: "TX Property Protest Kit 2026.pdf",
    type: "PDF Document",
    category: "PROPERTY TAX",
    size: "2.4 MB",
    badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    description: "Step-by-step documentation to protesting taxable home appraisals under Dallas & Collin county CAD boards.",
    interactiveTitle: "Live Property Tax Protest Estimator",
    interactiveFields: [
      { label: "Assessed CAD Value ($)", defaultValue: 450000, key: "cadValue" },
      { label: "Realistic Market Value ($)", defaultValue: 395000, key: "marketValue" }
    ],
    calculate: (inputs: any) => {
      const diff = Math.max(0, inputs.cadValue - inputs.marketValue);
      const estimatedTaxSavings = diff * 0.022; // Typical Texas rate of 2.2%
      return {
        metricLabel: "Estimated Protest Savings",
        metricValue: `$${estimatedTaxSavings.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        footnote: `Based on an average Texas property tax rate of 2.2% on the drop value of $${diff.toLocaleString()}.`
      };
    }
  },
  {
    id: "scorp",
    name: "S-Corp Dividend Planner v4.xlsx",
    type: "Excel Sheet",
    category: "CORPORATE TAX",
    size: "1.8 MB",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    description: "Formula spreadsheet to program shareholder salary vs distributions to minimize self-employment taxes.",
    interactiveTitle: "S-Corp FICA Defense Calculator",
    interactiveFields: [
      { label: "Total Net Business Income ($)", defaultValue: 130000, key: "netIncome" },
      { label: "Planned Shareholder W2 Salary ($)", defaultValue: 65000, key: "salary" }
    ],
    calculate: (inputs: any) => {
      const distributionRatio = Math.max(0, inputs.netIncome - inputs.salary);
      const savedFicaTax = distributionRatio * 0.153; // 15.3% self-employment tax on distributions
      return {
        metricLabel: "Estimated FICA Tax Saved",
        metricValue: `$${savedFicaTax.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        footnote: `Instead of paying 15.3% SE tax on the full $${inputs.netIncome.toLocaleString()} as a sole proprietorship, you only pay W2 taxes on $${inputs.salary.toLocaleString()}.`
      };
    }
  },
  {
    id: "checklist",
    name: "QBO Ledger Sync Checklist.docx",
    type: "Word Guide",
    category: "QUICKBOOKS",
    size: "920 KB",
    badgeColor: "bg-blue-400/20 text-blue-300 border-blue-400/30",
    description: "Pre-audit verification steps for seamless bank feeds and balance sheet adjustments in QuickBooks Online.",
    interactiveTitle: "QuickBooks Health Checklist Maker",
    interactiveFields: [
      { label: "Uncategorized Expenses ($)", defaultValue: 12500, key: "uncat" },
      { label: "Undeposited Funds Balance ($)", defaultValue: 4200, key: "undepos" }
    ],
    calculate: (inputs: any) => {
      const score = Math.max(10, 100 - Math.floor((inputs.uncat + inputs.undepos) / 200));
      return {
        metricLabel: "Ledger Health Score",
        metricValue: `${score}/100`,
        footnote: `A lower health score indicates high uncleared assets resting in holding accounts. Request a free diagnostic cleanup.`
      };
    }
  },
  {
    id: "vat",
    name: "International VAT Nexus Map.pdf",
    type: "PDF Document",
    category: "E-COMMERCE NEXUS",
    size: "3.1 MB",
    badgeColor: "bg-purple-400/20 text-[#c084fc] border-[#c084fc]/30",
    description: "International threshold guides for Texas corporations selling goods and digital licenses internationally.",
    interactiveTitle: "VAT Economic Sales Nexus Scan",
    interactiveFields: [
      { label: "Annual EU Digital Sales ($)", defaultValue: 28000, key: "euSales" },
      { label: "Annual UK Physical Sales ($)", defaultValue: 95000, key: "ukSales" }
    ],
    calculate: (inputs: any) => {
      const euStatus = inputs.euSales > 10000 ? "NEXUS TRIGGERED" : "Safe (< €10,000 threshold)";
      const ukStatus = inputs.ukSales > 85000 ? "NEXUS TRIGGERED" : "Safe (< £85,000 threshold)";
      return {
        metricLabel: "Nexus Assessment",
        metricValue: euStatus === "NEXUS TRIGGERED" || ukStatus === "NEXUS TRIGGERED" ? "Nexus Risk: High" : "Nexus Risk: Safe",
        footnote: `EU OSS digital limit is €10,000. UK VAT threshold is £85,000. Consultation highly recommended to organize foreign filing.`
      };
    }
  }
];

interface VaultPreviewProps {
  selectedId: string;
  onBack: () => void;
}

function VaultFilePreviewer({ selectedId, onBack }: VaultPreviewProps) {
  const fileObj = vaultFiles.find(f => f.id === selectedId);
  if (!fileObj) return null;

  const [vals, setVals] = React.useState<any>(() => {
    const init: any = {};
    fileObj.interactiveFields.forEach(f => {
      init[f.key] = f.defaultValue;
    });
    return init;
  });

  const calcResult = fileObj.calculate(vals);

  return (
    <div className="space-y-6">
      <div>
        <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 border rounded-full ${fileObj.badgeColor}`}>
          {fileObj.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-3 truncate tracking-tight">{fileObj.name}</h3>
        <p className="text-xs text-zinc-400 mt-1 mb-4 select-all font-mono">{fileObj.type} • {fileObj.size} • Verified secure</p>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl font-normal">{fileObj.description}</p>
      </div>

      {/* Interactive Form Emulator */}
      <div className="border border-white/5 bg-white/[0.01] p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">{fileObj.interactiveTitle}</h4>
          
          {fileObj.interactiveFields.map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-semibold font-sans">{field.label}</label>
              <input
                type="number"
                value={vals[field.key]}
                onChange={(e) => setVals({ ...vals, [field.key]: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#06180a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#a3e635] text-right font-mono"
              />
            </div>
          ))}
        </div>

        <div className="p-5 bg-emerald-950/20 border border-[#a3e635]/20 rounded-xl text-center flex flex-col justify-center items-center h-full min-h-[140px]">
          <span className="text-[10px] font-mono tracking-widest text-[#a3e635]/80 uppercase font-bold">{calcResult.metricLabel}</span>
          <span className="text-3xl font-extrabold text-white mt-1.5 select-all filter drop-shadow-[#a3e635]/20 tracking-tight font-display">{calcResult.metricValue}</span>
          <p className="text-[10px] text-zinc-500 mt-3 max-w-[220px] leading-relaxed">{calcResult.footnote}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" /> Full template download free for retainer clients
        </span>
        <button
          onClick={() => {
            alert(`Direct downloading for ${fileObj.name} will compile latest Texas codes into a secure folder format. Proceeding...`);
          }}
          className="py-2.5 px-5 bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-xs rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" /> Download Full Packet
        </button>
      </div>
    </div>
  );
}

interface HomePageProps {
  key?: string;
  setActiveTab: (tab: string) => void;
  triggerScheduler: (category: string) => void;
}

export default function HomePage({ setActiveTab, triggerScheduler }: HomePageProps) {
  // Google Reviews Search and Filter States
  const [reviewSearch, setReviewSearch] = React.useState("");
  const [reviewRatingFilter, setReviewRatingFilter] = React.useState<number | "all">("all");

  const filteredReviews = React.useMemo(() => {
    return googleReviewsData.filter((review) => {
      const matchesSearch = 
        review.author.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        review.text.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        review.serviceTag.toLowerCase().includes(reviewSearch.toLowerCase());
      const matchesRating = reviewRatingFilter === "all" || review.rating === reviewRatingFilter;
      return matchesSearch && matchesRating;
    });
  }, [reviewSearch, reviewRatingFilter]);

  // 1. Dynamic Mouse Follower Tracker & Locator for the Hero Area
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0, opacity: 0, active: false });
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const workspaceRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, opacity: 0, active: false }));
  };

  // 2. Custom Typewriter Effect for the Location Badge
  const [typedLocation, setTypedLocation] = React.useState("");
  React.useEffect(() => {
    const locationText = "Richardson, Dallas, Texas office";
    let index = 0;
    let isDeleting = false;
    let text = "";
    let timeoutId: any;

    const tick = () => {
      if (!isDeleting) {
        text = locationText.slice(0, index + 1);
        index++;
        setTypedLocation(text);
        if (index === locationText.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 5000); // Pause on fully typed for 5s
        } else {
          timeoutId = setTimeout(tick, 70);
        }
      } else {
        text = locationText.slice(0, index - 1);
        index--;
        setTypedLocation(text);
        if (index === 0) {
          isDeleting = false;
          timeoutId = setTimeout(tick, 1000); // Pause on empty for 1s
        } else {
          timeoutId = setTimeout(tick, 40);
        }
      }
    };

    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  // 3. Certified Public Accountant Type-reveal Animation
  const [typedTitlePart1, setTypedTitlePart1] = React.useState("");
  const [typedTitlePart2, setTypedTitlePart2] = React.useState("");
  const [isPart2Finished, setIsPart2Finished] = React.useState(false);

  React.useEffect(() => {
    const part1 = "Certified Public";
    const part2 = "Accountant";
    let index1 = 0;
    let index2 = 0;
    let timerId: any;

    const typePart1 = () => {
      if (index1 < part1.length) {
        setTypedTitlePart1(part1.slice(0, index1 + 1));
        index1++;
        timerId = setTimeout(typePart1, 80);
      } else {
        timerId = setTimeout(typePart2, 150);
      }
    };

    const typePart2 = () => {
      if (index2 < part2.length) {
        setTypedTitlePart2(part2.slice(0, index2 + 1));
        index2++;
        timerId = setTimeout(typePart2, 100);
      } else {
        setIsPart2Finished(true);
      }
    };

    timerId = setTimeout(typePart1, 600);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  // 4. Hero Active Category Hover State (for dynamic interactive descriptions)
  const [activeHeroCategory, setActiveHeroCategory] = React.useState<"all" | "financial" | "growth" | "tax" | "quickbooks">("all");

  // Hover states for premium glassmorphic interactive focal effects
  const [hoveredServiceIdx, setHoveredServiceIdx] = React.useState<number | null>(null);
  const [hoveredTalentIdx, setHoveredTalentIdx] = React.useState<number | null>(null);

  // States for the interactive "Digital File Manager" Vault
  const [isFileVaultOpen, setIsFileVaultOpen] = React.useState(false);
  const [hoveredVaultIdx, setHoveredVaultIdx] = React.useState<number | null>(null);
  const [selectedVaultFile, setSelectedVaultFile] = React.useState<string | null>(null);

  const getHeroDescriptionText = () => {
    switch (activeHeroCategory) {
      case "financial":
        return "Tailored wealth management, private retirement scheduling, cash flow optimizations, S-Corp salary shields, and long-term estate tax liability mitigations.";
      case "growth":
        return "Comprehensive corporate architectural restructuring, performance indicators tracking, and business scalability plans geared for fast-growth Texas startups.";
      case "tax":
        return "Proactive federal filing strategies, multi-jurisdiction compliance, and appraisal CAD representation before Dallas & Collin county boards for annual property savings.";
      case "quickbooks":
        return "Experienced configuration of QuickBooks Online, live trial balance analysis, automatic recurring entries setup, and catchup ledger reconciliations by certified experts.";
      default:
        return "A full-service CPA firm in Texas, offering reliable, affordable solutions for business owners, executives, and professionals. Specializing in property tax appraisal protests, S-Corp dividends scheduling, and international VAT consultation.";
    }
  };

  return (
    <motion.div
      key="view-home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <section 
        id="hero-section" 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative text-slate-800 overflow-hidden min-h-[580px] flex items-center bg-transparent border-b border-sky-100"
      >
        {/* Dynamic Interactive Background Design / Animations */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Texas Skyline Background - Made highly transparent for perfect readability and text highlight */}
          <img
            src={DALLAS_SKYLINE}
            alt="Richardson Dallas Downtown Skyline background"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-105 select-none"
            referrerPolicy="no-referrer"
          />
          {/* Light gradient fade-out which keeps the background skyline highly visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0fbf7]/95 via-[#f0fbf7]/70 to-[#f0fbf7]/30 z-10"></div>
          <div className="absolute inset-0 grid-overlay opacity-20 z-20"></div>

          {/* Gorgeous Glowing Rounded Shape (Blob) floating up & down behind the design - Made highly visible and defined */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 right-[20%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-sky-400/60 via-emerald-300/50 to-sky-300/50 blur-[45px] z-10 pointer-events-none select-none opacity-90"
          />

          {/* Live Financial Wave & Cyber Net Floating Animations (Realistic background design, made highly visible with beautiful custom gradients) */}
          <svg className="absolute bottom-0 w-full h-[320px] opacity-[0.95] z-25" viewBox="0 0 1440 320" fill="none">
            {/* Wave Grid 1 */}
            <motion.path
              d="M0,160 C320,240 640,80 960,220 C1280,360 1440,180 1440,180 L1440,320 L0,320 Z"
              fill="url(#wave-gradient-glow)"
              animate={{
                d: [
                   "M0,160 C320,240 640,80 960,220 C1280,360 1440,180 1440,180 L1440,320 L0,320 Z",
                   "M0,180 C320,200 640,120 960,190 C1280,260 1440,210 1440,210 L1440,320 L0,320 Z",
                   "M0,160 C320,240 640,80 960,220 C1280,360 1440,180 1440,180 L1440,320 L0,320 Z"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Wave Path 2 (Bright custom moving ribbon) */}
            <motion.path
              d="M0,90 Q360,30 720,190 T1440,110"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeDasharray="6, 12"
              fill="none"
              opacity="0.75"
              animate={{
                strokeDashoffset: [0, -60],
                d: [
                  "M0,90 Q360,30 720,190 T1440,110",
                  "M0,110 Q360,60 720,150 T1440,130",
                  "M0,90 Q360,30 720,190 T1440,110"
                ]
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="wave-gradient-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cyber glowing dust dots blinking in background */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-sky-400 rounded-full filter blur-[1px] animate-ping opacity-35" style={{ animationDuration: "3s" }}></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-emerald-400 rounded-full filter blur-[0.5px] animate-ping opacity-45" style={{ animationDuration: "5s", animationDelay: "1s" }}></div>
        </div>

        {/* Tactical interactive custom pointer "marker" */}
        {mousePos.active && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300 z-15 hidden md:block"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: "translate(-50%, -50%)",
              opacity: mousePos.opacity
            }}
          >
            {/* Outer sonar ping */}
            <div className="absolute -left-10 -top-10 w-20 h-20 rounded-full border border-sky-450/45 animate-ping" style={{ animationDuration: "1.8s" }}></div>
            {/* Dashed tech reticle */}
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full border border-dashed border-sky-400/50 animate-spin" style={{ animationDuration: "10s" }}></div>
            {/* Core focus dot */}
            <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.8)] flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            {/* Floating tactical holographic pixel location panel */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-sky-600 whitespace-nowrap bg-white/90 py-1 px-2 rounded border border-sky-200 backdrop-blur-sm shadow-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              LOC: {Math.round(mousePos.x)}X, {Math.round(mousePos.y)}Y
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 relative z-30 w-full">
          <div className="max-w-3xl block space-y-6 flex flex-col gap-6">
            
            {/* Location Badge (with custom typing state + cursor block) */}
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-750 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-sky-500 animate-bounce" />
              <span>{typedLocation}</span>
              <span className="inline-block w-1 h-3 bg-sky-500 ml-0.5 animate-pulse"></span>
            </div>

            {/* "Certified Public Accountant" heading containing beautiful sequential typed cursor animation - styled clearly in slate/sky */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.1] min-h-[90px] sm:min-h-[120px] md:min-h-[150px]">
              {typedTitlePart1}
              {!typedTitlePart2 && typedTitlePart1.length < "Certified Public".length && (
                <span className="inline-block w-1.5 h-8 md:h-12 bg-sky-500 ml-1.5 animate-pulse" />
              )}
              <br />
              <span className="text-sky-600 drop-shadow-sm inline-flex items-center">
                {typedTitlePart2}
                {typedTitlePart1.length >= "Certified Public".length && (
                  <span className="inline-block w-1.5 h-8 md:h-12 bg-sky-500 ml-1.5 animate-pulse" />
                )}
              </span>
            </h1>

            {/* Sub-Section Tags: Glass-Effect capsules tweaked for clean light-mode legibility and interactive hover glow */}
            <div 
              onMouseLeave={() => setActiveHeroCategory("all")}
              className="text-xs sm:text-sm font-bold tracking-wider font-mono text-slate-700 flex flex-wrap gap-x-4 gap-y-3.5 items-center font-sans"
            >
              <motion.span
                whileHover={{
                  scale: 1.12,
                  rotate: -3,
                  y: -5,
                  backgroundColor: "rgba(224, 242, 254, 0.9)",
                  borderColor: "rgba(14, 165, 233, 0.8)",
                  boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                }}
                onMouseEnter={() => setActiveHeroCategory("financial")}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                }}
                className="flex items-center gap-1 bg-white/70 backdrop-blur-md py-1.5 px-3 rounded-md border border-sky-100 select-none cursor-pointer text-slate-800 transition-all duration-300"
              >
                Financial Plan
              </motion.span>
              
              <span className="text-sky-450 opacity-60 selection:bg-transparent font-sans text-xs">•</span>
              
              <motion.span
                whileHover={{
                  scale: 1.12,
                  rotate: 3,
                  y: -5,
                  backgroundColor: "rgba(224, 242, 254, 0.9)",
                  borderColor: "rgba(14, 165, 233, 0.8)",
                  boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                }}
                onMouseEnter={() => setActiveHeroCategory("growth")}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                }}
                className="flex items-center gap-1 bg-white/70 backdrop-blur-md py-1.5 px-3 rounded-md border border-sky-100 select-none cursor-pointer text-slate-800 transition-all duration-300"
              >
                Business Growth
              </motion.span>
              
              <span className="text-sky-450 opacity-60 selection:bg-transparent font-sans text-xs">•</span>
              
              <motion.span
                whileHover={{
                  scale: 1.12,
                  rotate: -3,
                  y: -5,
                  backgroundColor: "rgba(224, 242, 254, 0.9)",
                  borderColor: "rgba(14, 165, 233, 0.8)",
                  boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                }}
                onMouseEnter={() => setActiveHeroCategory("tax")}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                }}
                className="flex items-center gap-1 bg-white/70 backdrop-blur-md py-1.5 px-3 rounded-md border border-sky-100 select-none cursor-pointer text-slate-800 transition-all duration-300"
              >
                Tax Solution
              </motion.span>
              
              <span className="text-sky-450 opacity-60 selection:bg-transparent font-sans text-xs">•</span>
              
              <motion.span
                whileHover={{
                  scale: 1.12,
                  rotate: 3,
                  y: -5,
                  backgroundColor: "rgba(224, 242, 254, 0.9)",
                  borderColor: "rgba(14, 165, 233, 0.8)",
                  boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)",
                }}
                onMouseEnter={() => setActiveHeroCategory("quickbooks")}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                }}
                className="flex items-center gap-1 bg-white/70 backdrop-blur-md py-1.5 px-3 rounded-md border border-sky-100 select-none cursor-pointer text-slate-800 transition-all duration-300"
              >
                QuickBooks Service
              </motion.span>
            </div>

            {/* Short Description: Highly readable color on light themes with soft fade-in on interactions */}
            <div className="relative min-h-[84px] md:min-h-[72px] flex items-center justify-start pt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeHeroCategory}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={isPart2Finished ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-sm sm:text-base leading-relaxed text-slate-700 max-w-2xl font-medium font-sans"
                >
                  {getHeroDescriptionText()}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Action Buttons: Redesigned for maximum visibility, vibrant colors and perfect contrast */}
            <div className="grid grid-cols-1 sm:flex items-center gap-4 pt-4 font-sans relative z-30">
              <button
                id="hero-email-me-btn"
                onClick={() => {
                  setActiveTab("consultation");
                  triggerScheduler("General Advisory Booking");
                }}
                className="bg-sky-600 hover:bg-sky-700 border-2 border-sky-600 hover:border-sky-700 text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 text-center cursor-pointer shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transform active:scale-95"
              >
                Book Consultation <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>

              <a
                href="tel:214-256-4111"
                className="bg-white hover:bg-sky-50 text-sky-700 hover:text-sky-850 font-bold text-sm px-6 py-3.5 rounded-full transition-all border-2 border-sky-400 hover:border-sky-500 text-center flex items-center justify-center gap-2 cursor-pointer transform active:scale-95 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4 text-sky-500 animate-pulse" />
                <span className="text-sky-700">214-256-4111</span>
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* 1. Our Brilliant Services that Serve You */}
      <section 
        id="brilliant-services" 
        className="py-24 bg-[#021008] relative overflow-hidden font-sans border-b border-emerald-950/40"
      >
        {/* Apple UI style background glowing elements */}
        <div className="absolute inset-0 grid-overlay opacity-[0.07] select-none pointer-events-none"></div>
        <div className="absolute top-[25%] left-[-15%] w-[450px] h-[450px] bg-[#a3e635]/10 rounded-full filter blur-[140px] pointer-events-none select-none"></div>
        <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-emerald-500/10 rounded-full filter blur-[140px] pointer-events-none select-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Header Row: Left Title & Right Advisory Copy */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-3 py-1 rounded-full font-mono">
                Advanced Advisory & Service Suite
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-xl">
                Our Brilliant Services <br className="hidden sm:inline" />
                that Serve You
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-normal">
              A high-end, transparent advisory structure crafted to deliver maximum tax efficiency, proactive QuickBooks systems auditing, and strategic financial planning.
            </p>
          </div>

          {/* Elegant premium slide fade-in-up without 90 degree clock hand rotation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* 4 Cards Grid */}
            <div 
              onMouseLeave={() => setHoveredServiceIdx(null)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              id="services-container-grid"
            >
              
              {/* Card 1: For Individuals */}
              <div 
                id="service-card-individual"
                onMouseEnter={() => setHoveredServiceIdx(0)}
                onClick={() => {
                  setActiveTab("services");
                  triggerScheduler("Individual Tax Consultation Request");
                }}
                className={`bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative group cursor-pointer ${
                  hoveredServiceIdx === 0 
                  ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                  : "border-white/10 opacity-100"
                }`}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-2.5 py-1 rounded-full font-mono">
                      Personal Advisory
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">For Individuals</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
                    Custom property appraisal protests, private retirement asset caching representation, strategic S-Corp dividend setups, and multi-state compliance planning.
                  </p>
                </div>
                <div className="mt-auto -mx-8 -mb-11 sm:-mx-10 select-none flex justify-center pt-2">
                  <img
                    src={INDIVIDUAL_SERVICE_IMG}
                    alt="For Individuals mobile finance dashboard illustration"
                    className="w-full max-w-[340px] h-[200px] object-cover rounded-t-[20px] shadow-2xl border border-white/20 filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Card 2: For Business */}
              <div 
                id="service-card-business"
                onMouseEnter={() => setHoveredServiceIdx(1)}
                onClick={() => {
                  setActiveTab("services");
                  triggerScheduler("Corporate Advisory Engagement");
                }}
                className={`bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative group cursor-pointer ${
                  hoveredServiceIdx === 1 
                  ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                  : "border-white/10 opacity-100"
                }`}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-2.5 py-1 rounded-full font-mono">
                      Enterprise Strategy
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">For Business</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
                    Proactive federal tax mitigations, structural entity reorganization schemas, regular franchise audits, payroll architectures, and executive consultation dashboards.
                  </p>
                </div>
                <div className="mt-auto -mx-8 -mb-11 sm:-mx-10 select-none flex justify-center pt-2">
                  <img
                    src={BUSINESS_SERVICE_IMG}
                    alt="For Business plans folder desk workspace illustration"
                    className="w-full max-w-[340px] h-[200px] object-cover rounded-t-[20px] shadow-2xl border border-white/20 filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Card 3: QuickBooks */}
              <div 
                id="service-card-quickbooks"
                onMouseEnter={() => setHoveredServiceIdx(2)}
                onClick={() => {
                  setActiveTab("services");
                  triggerScheduler("QuickBooks Setup Session");
                }}
                className={`bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative group cursor-pointer ${
                  hoveredServiceIdx === 2 
                  ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                  : "border-white/10 opacity-100"
                }`}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-2.5 py-1 rounded-full font-mono">
                      Systems Integration
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">QuickBooks</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
                    Seamless ledger syncing, custom Chart of Accounts configurations, automated transaction rules programming, and comprehensive trial balance catchups.
                  </p>
                </div>
                <div className="mt-auto -mx-8 -mb-11 sm:-mx-10 select-none flex justify-center pt-2">
                  <img
                    src={QUICKBOOK_SERVICE_IMG}
                    alt="QuickBook online ledger system interface chart illustration"
                    className="w-full max-w-[340px] h-[200px] object-cover rounded-t-[20px] shadow-2xl border border-white/20 filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Card 4: Tech & Tax Service */}
              <div 
                id="service-card-techservice"
                onMouseEnter={() => setHoveredServiceIdx(3)}
                onClick={() => {
                  setActiveTab("services");
                  triggerScheduler("Tech & Tax System Audit");
                }}
                className={`bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative group cursor-pointer ${
                  hoveredServiceIdx === 3 
                  ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                  : "border-white/10 opacity-100"
                }`}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-2.5 py-1 rounded-full font-mono">
                      Tech & Tax Auditing
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">Tech & Tax Service</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
                    Cross-border sales tax compliance, custom API integrations for transaction mapping, secure digital portal management, and real-time ledger tracking audits.
                  </p>
                </div>
                <div className="mt-auto -mx-8 -mb-11 sm:-mx-10 select-none flex justify-center pt-2">
                  <img
                    src={TAX_SERVICE_IMG}
                    alt="Tax service calculator appraisal sheet illustration"
                    className="w-full max-w-[340px] h-[200px] object-cover rounded-t-[20px] shadow-2xl border border-white/20 filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Trigger Button See All Services */}
          <div className="flex justify-center mt-14">
            <button
               onClick={() => setActiveTab("services")}
               className="inline-flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-xs sm:text-sm tracking-tight px-10 py-4 rounded-full transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              See All Services <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>
          </div>

        </div>
      </section>

      {/* 1.5. Interactive Client Resource Vault (Digital File Manager) */}
      <section 
        id="client-file-vault"
        className="py-24 bg-[#020d06] relative overflow-hidden font-sans border-b border-emerald-950/40"
      >
        {/* Apple-style layout decorations */}
        <div className="absolute inset-0 grid-overlay opacity-[0.05] select-none pointer-events-none"></div>
        <div className="absolute top-[15%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full filter blur-[130px] pointer-events-none select-none"></div>
        <div className="absolute bottom-[15%] left-[-10%] w-[400px] h-[400px] bg-[#a3e635]/8 rounded-full filter blur-[130px] pointer-events-none select-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-3 py-1 rounded-full font-mono">
                Complimentary Tools Drawer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-xl">
                Client Resource Vault <br className="hidden sm:inline" />
                & File Manager
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-normal">
              An active digital repository. Click the master file manager below with your mouse pointer to open the lock and watch resources explode outward with fluid Vettex physics.
            </p>
          </div>

          {/* Core File Explorer Outer Frame */}
          <div className="bg-white/[0.01] backdrop-blur-xl border border-white/10 rounded-[36px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 sm:p-10 relative">
            
            {/* Window control pills */}
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs font-mono text-zinc-500 ml-4">Secure File Dispatcher v2.05</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Panel: Master File Manager Disc Controller */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] border border-white/5 rounded-[28px] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-[#a3e635]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Padlock status */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <span className={`w-1.5 h-1.5 rounded-full ${isFileVaultOpen ? "bg-[#a3e635] animate-pulse" : "bg-red-400"}`}></span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                    {isFileVaultOpen ? "Unlocked" : "Locked"}
                  </span>
                </div>

                {/* Animated Interactive Folder Core (Rectangular Premium Shape) */}
                <motion.div
                  onClick={() => {
                    setIsFileVaultOpen(!isFileVaultOpen);
                    setSelectedVaultFile(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-44 h-32 cursor-pointer group/folder mt-6 mb-4"
                >
                  {/* Outer back flap */}
                  <div className="absolute inset-0 bg-emerald-950/20 border border-[#a3e635]/30 rounded-2xl rounded-tl-none group-hover/folder:border-[#a3e635]/60 group-hover/folder:bg-[#a3e635]/10 transition-all duration-300"></div>
                  
                  {/* Folder Tab on top-left */}
                  <div className="absolute -top-3 left-0 w-20 h-4 bg-[#0a2310] border-t border-l border-r border-[#a3e635]/30 group-hover/folder:border-[#a3e635]/50 rounded-t-lg text-[8px] font-mono font-bold tracking-widest text-[#a3e635]/80 flex items-center justify-center">
                    SYS_DRAWER
                  </div>

                  {/* Laser glow sheets of papers that lift up */}
                  <motion.div 
                    animate={{ y: isFileVaultOpen ? -14 : -2 }}
                    className="absolute left-4 right-4 top-2 h-14 bg-white/95 rounded-lg border border-white/20 p-2.5 text-left shadow-lg overflow-hidden flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full"></div>
                      <div className="w-10 h-1 bg-zinc-300 rounded"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-14 h-1 bg-zinc-200 rounded"></div>
                      <div className="w-12 h-1 bg-zinc-200 rounded"></div>
                    </div>
                  </motion.div>

                  {/* Front flap overlay */}
                  <motion.div 
                    animate={{ rotateX: isFileVaultOpen ? -18 : 0, skewX: isFileVaultOpen ? -4 : 0 }}
                    style={{ transformOrigin: "bottom" }}
                    className="absolute inset-x-0 bottom-0 top-3 bg-gradient-to-b from-emerald-900/90 to-emerald-950/90 border border-[#a3e635]/40 rounded-xl rounded-tl-none group-hover/folder:border-[#a3e635]/60 shadow-lg flex flex-col items-center justify-center gap-1"
                  >
                    <AnimatePresence mode="wait">
                      {isFileVaultOpen ? (
                        <motion.div
                          key="folder-open-visual"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="text-[#a3e635] flex flex-col items-center gap-1"
                        >
                          <FolderOpen className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.35)]" />
                          <span className="text-[8px] font-mono tracking-widest font-extrabold text-[#a3e635]/70">UNLOCKED</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="folder-closed-visual"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="text-zinc-400 group-hover/folder:text-zinc-200 flex flex-col items-center gap-1"
                        >
                          <Folder className="w-8 h-8" />
                          <span className="text-[8px] font-mono tracking-widest font-extrabold text-zinc-500">LOCKED</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Mini physical lock badge */}
                  <div className="absolute bottom-2 right-2 bg-[#020d06] p-1 rounded-md border border-[#a3e635]/25">
                    {isFileVaultOpen ? (
                      <Unlock className="w-3 h-3 text-[#a3e635]" />
                    ) : (
                      <Lock className="w-3 h-3 text-zinc-400" />
                    )}
                  </div>
                </motion.div>

                <h4 className="text-base sm:text-lg font-bold text-white mt-4 mb-2">
                  Company File Manager
                </h4>
                <p className="text-xs text-zinc-400 max-w-[200px] leading-relaxed mb-6 font-normal">
                  {isFileVaultOpen 
                    ? "Vault unlocked! Drag paper system files into the sandbox desk to run estimator calculators." 
                    : "Click folder with mouse pointer to deploy dynamic compliance packets instantly."}
                </p>

                <button
                  onClick={() => {
                    setIsFileVaultOpen(!isFileVaultOpen);
                    setSelectedVaultFile(null);
                  }}
                  className="w-full py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isFileVaultOpen ? "text-[#a3e635] animate-spin" : "text-zinc-400"}`} />
                  {isFileVaultOpen ? "Collapse Vault" : "Deploy Document Packet"}
                </button>
              </div>

              {/* Right Panel: Sleek double layout containing Folder files list and Sandbox Desktop */}
              <div className="lg:col-span-8 flex flex-col justify-between relative min-h-[380px]">
                
                <AnimatePresence mode="wait">
                  {!isFileVaultOpen ? (
                    // Initial Closed State Guide layout
                    <motion.div
                      key="closed-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white/[0.01] border border-dashed border-white/5 rounded-[28px]"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mb-4 animate-pulse">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-zinc-300">File System Inactive</h4>
                      <p className="text-xs text-zinc-500 max-w-sm mt-2 leading-relaxed">
                        To maintain high performance and avoid visual clutter, click the File Manager folder disk on the left. Highly aligned planning resource spreadsheets will trigger out.
                      </p>
                    </motion.div>
                  ) : (
                    // Interactive Drag and Drop Workspace with split columns
                    <motion.div
                      key="active-workspace"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full h-full"
                      ref={workspaceRef}
                    >
                      
                      {/* Sub-panel 1: Draggable Files pile */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between px-2 pb-2">
                          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">DRAGGABLE DOCS</span>
                          <span className="text-[9px] font-mono text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded">4 FILES LOADED</span>
                        </div>

                        <div className="flex flex-col gap-4">
                          {vaultFiles.map((fileObj, idx) => {
                            const isSelected = selectedVaultFile === fileObj.id;
                            return (
                              <motion.div
                                key={fileObj.id}
                                drag
                                dragConstraints={workspaceRef}
                                dragElastic={0.2}
                                dragTransition={{ bounceStiffness: 600, bounceDamping: 18 }}
                                onDragEnd={(e, info) => {
                                  // If dragged sufficiently, trigger load
                                  if (Math.abs(info.offset.x) > 20 || Math.abs(info.offset.y) > 20) {
                                    setSelectedVaultFile(fileObj.id);
                                  }
                                }}
                                onClick={() => setSelectedVaultFile(fileObj.id)}
                                whileDrag={{ scale: 1.05, zIndex: 40, boxShadow: "0 15px 30px rgba(163,230,53,0.25)" }}
                                whileHover={{ scale: 1.02 }}
                                className={`bg-white/[0.02] backdrop-blur-md border rounded-[20px] rounded-tl-none p-5 flex flex-col justify-between shadow-lg relative group cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
                                  isSelected 
                                    ? "border-[#a3e635] bg-[#a3e635]/5 shadow-[0_0_15px_rgba(163,230,53,0.1)]" 
                                    : "border-white/10 hover:border-[#a3e635]/40"
                                }`}
                              >
                                {/* Rectangular tab design resembling real folder tabs (no underscores underneath names) */}
                                <div className={`absolute -top-[16px] left-0 h-[17px] px-3 border-t border-r border-l rounded-t-lg text-[8px] font-mono font-bold flex items-center justify-center tracking-wider ${
                                  isSelected
                                    ? "bg-[#04160a] border-[#a3e635] text-[#a3e635]"
                                    : "bg-[#020d06] border-white/10 text-zinc-400 group-hover:text-zinc-200"
                                }`}>
                                  DOC_SYS // {fileObj.category}
                                </div>

                                <div className="mt-1 text-left">
                                  <div className="flex items-center justify-between gap-2 mb-1.5 pt-1">
                                    <span className="text-[10px] font-mono text-zinc-400 font-medium">{fileObj.type}</span>
                                    <span className="text-[10px] font-mono text-zinc-500">{fileObj.size}</span>
                                  </div>
                                  <h4 className="text-sm font-bold text-white transition-colors group-hover:text-[#a3e635] line-clamp-1">{fileObj.name}</h4>
                                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">{fileObj.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                  <span className="text-[9px] font-mono text-[#a3e635]/80 uppercase tracking-widest font-bold">DRAG OR CLICK</span>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping"></span>}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sub-panel 2: Active Desk Simulator Sandbox */}
                      <div className="flex flex-col h-full min-h-[380px]">
                        <div className="flex items-center justify-between px-2 pb-2">
                          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">ACTIVE SANDBOX DESK</span>
                          {selectedVaultFile && (
                            <button 
                              onClick={() => setSelectedVaultFile(null)}
                              className="text-[9px] font-mono text-amber-300 hover:text-white transition-colors uppercase font-bold"
                            >
                              Clear Desk [X]
                            </button>
                          )}
                        </div>

                        <div className="border-2 border-dashed border-white/10 hover:border-[#a3e635]/30 rounded-[24px] bg-white/[0.01] p-5 h-full flex flex-col justify-center relative overflow-hidden transition-all duration-300">
                          <AnimatePresence mode="wait">
                            {!selectedVaultFile ? (
                              <motion.div
                                key="sandbox-empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-10 flex flex-col items-center justify-center h-full"
                              >
                                <div className="w-16 h-16 rounded-2xl bg-[#a3e635]/5 border border-[#a3e635]/20 flex items-center justify-center text-[#a3e635] mb-4 animate-bounce" style={{ animationDuration: "3.5s" }}>
                                  <Sparkles className="w-7 h-7" />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-300 tracking-tight">Active Simulator Desk Ready</h4>
                                <p className="text-[11px] text-zinc-500 max-w-[220px] mt-2 leading-relaxed">
                                  Pickup any document card on the left and drag-drop it here (or simply click) to evaluate Texas compliance rates.
                                </p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key={`sandbox-active-${selectedVaultFile}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="h-full flex flex-col justify-between text-left"
                              >
                                <VaultFilePreviewer selectedId={selectedVaultFile} onBack={() => setSelectedVaultFile(null)} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. Meet our Talents Who work for you */}
      <section 
        id="talents-team-grid" 
        className="py-24 bg-[#011409] relative overflow-hidden font-sans border-b border-emerald-950/40"
      >
        {/* Abstract Apple-style background grid & ambient light spot */}
        <div className="absolute inset-0 grid-overlay opacity-[0.05] select-none pointer-events-none"></div>
        <div className="absolute top-[30%] right-[-10%] w-[380px] h-[380px] bg-[#a3e635]/8 rounded-full filter blur-[120px] pointer-events-none select-none"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[380px] h-[380px] bg-emerald-700/10 rounded-full filter blur-[120px] pointer-events-none select-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/15 px-3 py-1 rounded-full font-mono">
                Executive Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-xl">
                Meet our Talents <br className="hidden sm:inline" />
                Who work for you
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-normal">
              Our team consists of distinguished specialists, strategic planners, and certified specialists dedicated to secure client bookkeeping.
            </p>
          </div>

          {/* Premium slide fade-in-up without 90 degree clock hand rotation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Split team grid layout */}
            <div 
              onMouseLeave={() => setHoveredTalentIdx(null)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              id="team-container-grid"
            >              {/* Left Card: 5 columns in grid - Founder Card */}
              <div 
                id="talent-card-founder"
                onMouseEnter={() => setHoveredTalentIdx(0)}
                onClick={() => {
                  setActiveTab("about");
                  triggerScheduler("Founder Advisory Booking");
                }}
                className={`lg:col-span-5 bg-white/[0.02] backdrop-blur-md border rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 relative group cursor-pointer ${
                  hoveredTalentIdx === 0 
                  ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                  : "border-white/10 opacity-100"
                }`}
              >
                <div className="space-y-6">
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={SHAFIQ_HASAN_PORTRAIT}
                      alt="Shafiq Hasan CPA Founder"
                      className="w-full h-[280px] object-cover rounded-2xl shadow-sm border border-white/10 filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-bold text-[#a3e635] flex items-center gap-1">Request consultation <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">Shafik Hassan</h3>
                    <div className="text-[#a3e635] font-mono font-bold text-xs">FOUNDER & SENIOR MEMBER</div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal pt-2">
                      Distinguished CPA with a track record of executive-level consultation, S-Corp scaling, and proactive local tax planning in Richardson, Texas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Cards Grid: 7 columns in grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Member 1: Abdullah Mia */}
                <div 
                  id="talent-card-member1"
                  onMouseEnter={() => setHoveredTalentIdx(1)}
                  className={`bg-white/[0.02] backdrop-blur-md border rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 relative group cursor-pointer ${
                    hoveredTalentIdx === 1 
                    ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                    : "border-white/10 opacity-100"
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
                    alt="Abdullah Mia Tax Consultant"
                    className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/20 filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="text-base sm:text-lg font-bold text-white mt-4 transition-colors group-hover:text-[#a3e635]">Abdullah Mia</h4>
                  <div className="text-xs text-[#a3e635] font-mono mt-1 font-bold">TAX EXPERT</div>
                  <p className="text-[11px] text-zinc-400 mt-2 max-w-[200px]">Federal and multi-jurisdictional compliance analyst.</p>
                </div>

                {/* Member 2: Shakil Adnan Khan */}
                <div 
                  id="talent-card-member2"
                  onMouseEnter={() => setHoveredTalentIdx(2)}
                  className={`bg-white/[0.02] backdrop-blur-md border rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 relative group cursor-pointer ${
                    hoveredTalentIdx === 2 
                    ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                    : "border-white/10 opacity-100"
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
                    alt="Shakil Adnan Khan QuickBooks Pro"
                    className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/20 filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="text-base sm:text-lg font-bold text-white mt-4 transition-colors group-hover:text-[#a3e635]">Shakil Adnan Khan</h4>
                  <div className="text-xs text-[#a3e635] font-mono mt-1 font-bold">QUICKBOOK EXPERT</div>
                  <p className="text-[11px] text-zinc-400 mt-2 max-w-[200px]">Advanced ledgers reconciler and balance analyst.</p>
                </div>

                {/* Member 3: Ashraf Hossain */}
                <div 
                  id="talent-card-member3"
                  onMouseEnter={() => setHoveredTalentIdx(3)}
                  className={`bg-white/[0.02] backdrop-blur-md border rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 relative group cursor-pointer ${
                    hoveredTalentIdx === 3 
                    ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                    : "border-white/10 opacity-100"
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200"
                    alt="Ashraf Hossain Finance Director"
                    className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/20 filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="text-base sm:text-lg font-bold text-white mt-4 transition-colors group-hover:text-[#a3e635]">Ashraf Hossain</h4>
                  <div className="text-xs text-[#a3e635] font-mono mt-1 font-bold">FINANCE MANAGER</div>
                  <p className="text-[11px] text-zinc-400 mt-2 max-w-[200px]">Asset caching structures and trust planning specialist.</p>
                </div>

                {/* Member 4: Atikur Rahman Khan */}
                <div 
                  id="talent-card-member4"
                  onMouseEnter={() => setHoveredTalentIdx(4)}
                  className={`bg-white/[0.02] backdrop-blur-md border rounded-[28px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 relative group cursor-pointer ${
                    hoveredTalentIdx === 4 
                    ? "border-[#a3e635]/65 bg-white/[0.08] -translate-y-2 scale-[1.02] shadow-[0_20px_50px_rgba(163,230,53,0.2)] z-10" 
                    : "border-white/10 opacity-100"
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
                    alt="Atikur Rahman Khan Business Architect"
                    className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/20 filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="text-base sm:text-lg font-bold text-white mt-4 transition-colors group-hover:text-[#a3e635]">Atikur Rahman Khan</h4>
                  <div className="text-xs text-[#a3e635] font-mono mt-1 font-bold">BUSINESS STRATEGIST</div>
                  <p className="text-[11px] text-zinc-400 mt-2 max-w-[200px]">Strategic operations architect for multi-million startups.</p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Trigger Button About us */}
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setActiveTab("about")}
              className="inline-flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-xs sm:text-sm tracking-tight px-10 py-4 rounded-full transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              About us <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials Segment */}
      <section className="py-24 bg-[#fafdfa] font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/15 px-3 py-1 rounded-full font-mono">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight">
              Great People chose Shafiq Hasan for Accountancy Problems
            </h2>
            <p className="max-w-xl mx-auto text-xs text-gray-500">
              See how corporate operators and real estate holding firms achieve compliant growth under our representation. Hover anywhere to pause and read.
            </p>
          </div>

          {/* Scrolling Testimonial Marquees - restored to full width */}
          <div className="w-full mt-10 space-y-8 select-none group-pause relative flex flex-col justify-center">
              
              {/* Row 1: Right to Left */}
              <div className="w-full overflow-hidden flex relative py-2">
                {/* Fade masks to look elegant */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafdfa] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafdfa] to-transparent z-10 pointer-events-none"></div>
                
                <div className="animate-marquee [--marquee-duration:35s] flex gap-6 pr-6">
                  {testimonialsData.slice(0, 9).map((test, index) => (
                    <div
                      key={`${test.id}-r1-${index}`}
                      className="w-[320px] sm:w-[380px] shrink-0 bg-white border border-gray-150 p-6 sm:p-7 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-[#a3e635]/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Quote className="w-6 h-6 text-[#a3e635]" />
                          <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(test.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-transparent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic font-normal">
                          &ldquo;{test.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-3">
                        <img
                          src={test.avatar}
                          alt={`${test.author}, testimonial`}
                          className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 shrink-0 border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{test.author}</h4>
                          <p className="text-[10px] text-gray-500 font-semibold truncate">{test.role} · {test.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate row 1 for seamless infinite looping */}
                  {testimonialsData.slice(0, 9).map((test, index) => (
                    <div
                      key={`${test.id}-r1-dup-${index}`}
                      className="w-[320px] sm:w-[380px] shrink-0 bg-white border border-gray-150 p-6 sm:p-7 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-[#a3e635]/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Quote className="w-6 h-6 text-[#a3e635]" />
                          <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(test.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-transparent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic font-normal">
                          &ldquo;{test.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-3">
                        <img
                          src={test.avatar}
                          alt={`${test.author}, testimonial`}
                          className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 shrink-0 border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{test.author}</h4>
                          <p className="text-[10px] text-gray-500 font-semibold truncate">{test.role} · {test.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Right to Left */}
              <div className="w-full overflow-hidden flex relative py-2">
                {/* Fade masks to look elegant */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafdfa] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafdfa] to-transparent z-10 pointer-events-none"></div>
                
                <div className="animate-marquee [--marquee-duration:42s] flex gap-6 pr-6">
                  {testimonialsData.slice(9, 18).map((test, index) => (
                    <div
                      key={`${test.id}-r2-${index}`}
                      className="w-[320px] sm:w-[380px] shrink-0 bg-white border border-gray-150 p-6 sm:p-7 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-[#a3e635]/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Quote className="w-6 h-6 text-[#a3e635]" />
                          <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(test.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-transparent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic font-normal">
                          &ldquo;{test.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-3">
                        <img
                          src={test.avatar}
                          alt={`${test.author}, testimonial`}
                          className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 shrink-0 border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{test.author}</h4>
                          <p className="text-[10px] text-gray-500 font-semibold truncate">{test.role} · {test.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate row 2 for seamless infinite looping */}
                  {testimonialsData.slice(9, 18).map((test, index) => (
                    <div
                      key={`${test.id}-r2-dup-${index}`}
                      className="w-[320px] sm:w-[380px] shrink-0 bg-white border border-gray-150 p-6 sm:p-7 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:border-[#a3e635]/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Quote className="w-6 h-6 text-[#a3e635]" />
                          <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(test.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-transparent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic font-normal">
                          &ldquo;{test.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-3">
                        <img
                          src={test.avatar}
                          alt={`${test.author}, testimonial`}
                          className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 shrink-0 border border-gray-250"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{test.author}</h4>
                          <p className="text-[10px] text-gray-500 font-semibold truncate">{test.role} · {test.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          <div className="flex justify-center mt-12">
            <button onClick={() => setActiveTab("consultation")} className="inline-flex items-center gap-2 bg-[#0b2512] hover:bg-neutral-900 text-[#a3e635] font-bold text-xs px-8 py-3.5 rounded-full cursor-pointer shadow-lg transition-transform duration-200 active:scale-95">
              Schedule With Shafiq Hasan 🎧
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-150/60 block font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-400 text-xs font-mono font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#a3e635] shrink-0" />
            <span>Texas State Board Licensed Firm #01002</span>
          </div>
          <div>Certified QuickBooks ProAdvisor</div>
          <div>CST timezone coverage</div>
          <button onClick={() => setActiveTab("solutions")} className="flex items-center gap-1 text-emerald-800 cursor-pointer font-bold hover:underline">
            <span>Regulatory Disclosures</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
