import React from "react";
import { motion } from "motion/react";
import { Search, ChevronRight, ArrowUpRight, User, Briefcase, Cpu, Percent, Home as HomeIcon, TrendingUp, FileText, Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import { servicesData } from "../data";

interface Service {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDescription: string;
  detailedDescription: string;
  tags: string[];
}

interface ServicesPageProps {
  key?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedServiceDetail: (service: Service | null) => void;
  setActiveTab: (tab: string) => void;
  triggerScheduler: (category: string) => void;
}

export default function ServicesPage({
  searchQuery,
  setSearchQuery,
  setSelectedServiceDetail,
  setActiveTab,
  triggerScheduler
}: ServicesPageProps) {
  
  const renderIcon = (name: string, className = "w-6 h-6 text-[#a3e635]") => {
    switch (name) {
      case "User": return <User className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Percent": return <Percent className={className} />;
      case "Home": return <HomeIcon className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Clock": return <Clock className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      default: return <Percent className={className} />;
    }
  };

  const filteredServices = servicesData.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      key="view-services"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/15 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          ★ Certified public accounting Suite
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Our Brilliant Services that Serve You
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
          Expert tax allocations, physical properties appraisal reductions, multi-state physical nexus diagnostics, and comprehensive QuickBooks cleanups.
        </p>
      </div>

      {/* Dynamic Search Bar */}
      <div className="bg-white border border-gray-150 rounded-2xl py-3 px-4 shadow-sm max-w-2xl mx-auto mb-16 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter CPA advisory items by keywords: S-Corp, Valuation, IRS, QuickBooks..."
          className="w-full text-xs text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 block shrink-0 cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-gray-150 hover:border-emerald-800/10 rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between group relative"
          >
            <div className="absolute top-4 right-4 bg-gray-50 group-hover:bg-emerald-50 text-gray-400 group-hover:text-emerald-800 p-2.5 rounded-2xl transition-all">
              {renderIcon(service.iconName, "w-6 h-6 text-emerald-800")}
            </div>

            <div className="space-y-4 pr-12">
              <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-gray-400 block pb-1">
                {service.category} Advisory
              </span>
              <h3 className="text-xl font-display font-bold text-gray-950 text-left">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 font-normal text-left">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {service.tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] bg-gray-50 text-gray-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-gray-150">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-105 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedServiceDetail(service)}
                className="text-xs font-bold text-emerald-800 hover:text-[#0b2512] flex items-center gap-1 group/btn hover:underline cursor-pointer"
              >
                Explore Details <ChevronRight className="w-4 h-4 text-[#a3e635] group-hover/btn:translate-x-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={() => triggerScheduler(service.title)}
                className="text-xs font-bold text-gray-750 hover:text-emerald-800 cursor-pointer"
              >
                Book Advice
              </button>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-2 text-center py-16 text-gray-400 text-xs block bg-gray-50 rounded-3xl border border-dashed border-gray-250">
            No matching public services found. Modify keywords of search query filters!
          </div>
        )}
      </div>

      {/* Centered trigger support */}
      <div className="flex flex-col items-center justify-center mt-16 text-center space-y-4 border-t border-gray-100 pt-12">
        <p className="text-xs text-gray-500 font-normal leading-loose">Need a bespoke accounting design for unusual commercial business legal entities?</p>
        <button
          onClick={() => setActiveTab("consultation")}
          className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-[#0b2512] text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer animate-pulse"
        >
          Schedule Trial Advice <ArrowUpRight className="w-3.5 h-3.5 text-[#a3e635]" />
        </button>
      </div>
    </motion.div>
  );
}
