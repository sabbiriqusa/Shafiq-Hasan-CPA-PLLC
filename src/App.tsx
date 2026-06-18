import React, { useState, useEffect } from "react";
import {
  MapPin,
  User,
  Briefcase,
  Cpu,
  Percent,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Clock,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Home,
  FileText,
  Quote,
  ArrowUpRight,
  Info,
  Check,
  CheckCircle2,
  Sparkles,
  Users,
  ExternalLink,
  Search,
  MessageSquare,
  ShieldCheck,
  Star,
  X,
  Menu,
  Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import TaxCalculator from "./components/TaxCalculator";
import ChatBot from "./components/ChatBot";
import ConsultationWizard from "./components/ConsultationWizard";
import HomePage from "./components/HomePage";
import ServicesPage from "./components/ServicesPage";
import CalculatorsPage from "./components/CalculatorsPage";
import AboutPage from "./components/AboutPage";
import SolutionsPage from "./components/SolutionsPage";
import ArticlesPage from "./components/ArticlesPage";
import ContactPage from "./components/ContactPage";
import ConsultationPage from "./components/ConsultationPage";
import GuidesPage from "./components/GuidesPage";
import TaxCenterPage from "./components/TaxCenterPage";
import MiscPage from "./components/MiscPage";

// Data
import {
  servicesData,
  teamMembersData,
  taxProblemsData,
  testimonialsData,
  blogPostsData,
  DALLAS_SKYLINE,
  SHAFIQ_HASAN_PORTRAIT,
  faqItems
} from "./data";

import { Service, TeamMember, BlogPost } from "./types";

export default function App() {
  // Navigation active anchors state
  const [activeTab, setActiveTab] = useState("home");
  const [activeFaq, setActiveFaq] = useState<number | null>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Interaction Modals States
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedConsultationCategory, setSelectedConsultationCategory] = useState("");

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [selectedTalentDetail, setSelectedTalentDetail] = useState<TeamMember | null>(null);
  const [selectedBlogDetail, setSelectedBlogDetail] = useState<BlogPost | null>(null);

  // Search filter for Services and Blog posts
  const [searchQuery, setSearchQuery] = useState("");

  // Sub-navigation selection states
  const [selectedGuideId, setSelectedGuideId] = useState("property-tax");
  const [selectedTaxCenterId, setSelectedTaxCenterId] = useState("calculators");
  const [selectedMiscId, setSelectedMiscId] = useState("faq");

  // Contact Form State
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccessMsg, setContactSuccessMsg] = useState("");
  const [submittingContact, setSubmittingContact] = useState(false);
  const [submittedQueries, setSubmittedQueries] = useState<any[]>([]);

  // Blog feedback comments system (Local Persistence)
  const [blogComments, setBlogComments] = useState<{ [blogId: string]: Array<{ name: string; text: string; date: string }> }>({});
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Load previous queries and comments
  useEffect(() => {
    // Contact Queries
    fetch("/api/admin/queries")
      .then(r => r.json())
      .then(data => {
        if (data.queries) setSubmittedQueries(data.queries);
      })
      .catch(e => console.warn("Could not load backend queries: ", e));

    // Blog Comments from local Storage
    const savedComments = localStorage.getItem("shafiq_blog_comments");
    if (savedComments) {
      setBlogComments(JSON.parse(savedComments));
    }
  }, []);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  // Submit Contact Inquiry Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;

    setSubmittingContact(true);
    setContactSuccessMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage
        })
      });

      if (!response.ok) throw new Error("Server rejected inquiry.");

      const data = await response.json();
      if (data.success) {
        setContactSuccessMsg("Query submitted successfully! Our Richardson office will email you in 1-2 hours.");
        setContactEmail("");
        setContactPhone("");
        setContactMessage("");

        // Refresh queries registry
        const qRes = await fetch("/api/admin/queries");
        const qData = await qRes.json();
        if (qData.queries) setSubmittedQueries(qData.queries);
      }
    } catch (err) {
      // Local fallback submission
      const localQuery = {
        id: `q_loc_${Date.now()}`,
        email: contactEmail,
        phone: contactPhone || "Not Provided",
        message: contactMessage,
        createdAt: new Date().toISOString()
      };
      const updated = [localQuery, ...submittedQueries];
      setSubmittedQueries(updated);
      setContactSuccessMsg("Submitted successfully (Stored on client profile fallback).");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
    } finally {
      setSubmittingContact(false);
    }
  };

  // Submit comments for a blog post
  const handleCommentSubmit = (e: React.FormEvent, blogId: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      name: newCommentName,
      text: newCommentText,
      date: new Date().toLocaleDateString()
    };

    const currentBlogComments = blogComments[blogId] || [];
    const updated = {
      ...blogComments,
      [blogId]: [...currentBlogComments, newComment]
    };

    setBlogComments(updated);
    localStorage.setItem("shafiq_blog_comments", JSON.stringify(updated));
    setNewCommentName("");
    setNewCommentText("");
  };

  // Helper mapping string to Lucide icon
  const renderIcon = (name: string, className = "w-6 h-6 text-[#a3e635]") => {
    switch (name) {
      case "User": return <User className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Percent": return <Percent className={className} />;
      case "Home": return <Home className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Clock": return <Clock className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      default: return <Percent className={className} />;
    }
  };

  // Filter content
  const filteredServices = servicesData.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredBlogs = blogPostsData.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerScheduler = (categoryName: string) => {
    setSelectedConsultationCategory(categoryName);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafdfa] text-gray-800 font-sans selection:bg-[#a3e635] selection:text-[#0b2512] scroll-smooth">
      
      {/* 1. Header Navigation Bar (Elite Dark-Emerald Design with Grid Pattern) */}
      <header className="sticky top-0 z-50 w-full bg-[#0c2415] text-white border-b border-emerald-950/40 shadow-xl transition-all duration-300 select-none">
        
        {/* Sublime grid pattern on background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,230,53,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.035)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3 shrink-0 group relative z-10">
            <button className="bg-emerald-950 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg border border-[#a3e635]/35 group-hover:scale-105 active:scale-95 transition-transform duration-250 cursor-pointer text-left" onClick={() => setActiveTab("home")}>
              <Percent className="w-5.5 h-5.5 text-[#a3e635] stroke-[2.5]" />
            </button>
            <button className="flex flex-col cursor-pointer text-left font-sans" onClick={() => { setActiveTab("home"); setOpenDropdown(null); }}>
              <span className="font-display font-black text-white text-base sm:text-[17px] tracking-tight leading-tight block group-hover:text-[#a3e635] transition-colors duration-200">
                Shafiq Hasan CPA PLLC
              </span>
              <span className="text-[9px] uppercase font-bold tracking-[0.165em] text-[#a3e635] font-mono block mt-0.5 leading-none">
                Certified Public Accountant
              </span>
            </button>
          </div>

          {/* Nav Links - Desktop with premium dropdown mechanics */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-white/95 relative z-15">
            {/* Home link */}
            <motion.button
              onClick={() => { setActiveTab("home"); setOpenDropdown(null); }}
              whileHover={{ scale: 1.04, y: -0.5 }}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === "home" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
              }`}
            >
              Home
            </motion.button>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => { setActiveTab("services"); setOpenDropdown(openDropdown === "services" ? null : "services"); }}
                className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  activeTab === "services" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
                }`}
              >
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-1 w-64 bg-[#0a1c18] border border-white/15 rounded-2xl shadow-2xl p-3 space-y-1 text-left z-50 overflow-hidden"
                  >
                    {[
                      { label: "For Individuals", desc: "Elite personalized tax shielding & Dallas protests", tag: "individual" },
                      { label: "For Businesses", desc: "Form 1120S S-Corp & State Franchise matrices", tag: "business" },
                      { label: "QuickBooks Service", desc: "Certified ProAdvisor cleanups & automated payrolls", tag: "quickbooks" },
                      { label: "Tax & VAT Consultation", desc: "Economic nexuses & EU VAT OSS configurations", tag: "tax" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab("services");
                          setSearchQuery(item.tag);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#a3e635]/15 hover:text-[#a3e635] text-white/95 transition-all text-left duration-150 cursor-pointer font-sans"
                      >
                        <div className="font-bold flex items-center gap-1">
                          {item.label} <ArrowUpRight className="w-3 h-3 text-[#a3e635] opacity-80" />
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 leading-normal font-medium">{item.desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Misc Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("misc")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => { setActiveTab("misc"); setOpenDropdown(openDropdown === "misc" ? null : "misc"); }}
                className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  activeTab === "misc" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
                }`}
              >
                Misc <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "misc" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openDropdown === "misc" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-1 w-64 bg-[#0a1c18] border border-white/15 rounded-2xl shadow-2xl p-3 space-y-1 text-left z-50 overflow-hidden"
                  >
                    {[
                      { label: "FAQ Helpdesk", desc: "Answers regarding corporate ledger & tax fixes", sub: "faq" },
                      { label: "Onboarding Kit", desc: "Our 5-step integration protocol for new clients", sub: "onboarding" },
                      { label: "Document Checklist", desc: "Interactive listing for Individual & Business preps", sub: "docs" },
                      { label: "CTA FinCEN Mandates", desc: "Mandatory corporate BOI registration warnings", sub: "cta" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab("misc");
                          setSelectedMiscId(item.sub);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#a3e635]/15 hover:text-[#a3e635] text-white/95 transition-all text-left duration-150 cursor-pointer font-sans"
                      >
                        <div className="font-bold flex items-center gap-1">
                          {item.label} <ArrowUpRight className="w-3 h-3 text-[#a3e635] opacity-80" />
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 leading-normal font-medium">{item.desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guides Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("guides")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => { setActiveTab("guides"); setOpenDropdown(openDropdown === "guides" ? null : "guides"); }}
                className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  activeTab === "guides" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
                }`}
              >
                Guides <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "guides" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openDropdown === "guides" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-1 w-64 bg-[#0a1c18] border border-white/15 rounded-2xl shadow-2xl p-3 space-y-1 text-left z-50 overflow-hidden"
                  >
                    {[
                      { label: "Texas Property Tax Protest", desc: "Lower home valuations in Dallas & Collin CAD", sub: "property-tax" },
                      { label: "S-Corp Tax Shield", desc: "Legally optimize self-employment FICA taxes", sub: "scorp" },
                      { label: "Cross-Border & EU VAT", desc: "Compliance nexuses for Amazon & Shopify", sub: "vat" },
                      { label: "IRS Audits & Letters", desc: "Understand letters and audit defense protocol", sub: "audit" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab("guides");
                          setSelectedGuideId(item.sub);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#a3e635]/15 hover:text-[#a3e635] text-white/95 transition-all text-left duration-150 cursor-pointer font-sans"
                      >
                        <div className="font-bold flex items-center gap-1">
                          {item.label} <ArrowUpRight className="w-3 h-3 text-[#a3e635] opacity-80" />
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 leading-normal font-medium">{item.desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tax Center Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("taxcenter")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => { setActiveTab("tax-center"); setOpenDropdown(openDropdown === "taxcenter" ? null : "taxcenter"); }}
                className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  activeTab === "tax-center" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
                }`}
              >
                Tax Center <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "taxcenter" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openDropdown === "taxcenter" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-1 w-64 bg-[#0a1c18] border border-white/15 rounded-2xl shadow-2xl p-3 space-y-1 text-left z-50 overflow-hidden"
                  >
                    {[
                      { label: "Tax Estimators", desc: "Interactive dividend shields & home protests estimators", sub: "calculators" },
                      { label: "Dates & Deadlines", desc: "Important IRS & Texas Franchise schedules", sub: "calendar" },
                      { label: "IRS / Protest Forms", desc: "Common files and appointment representation forms", sub: "forms" },
                      { label: "Tax Brackets Table", desc: "Federal indicators & Texas Franchise targets", sub: "rates" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab("tax-center");
                          setSelectedTaxCenterId(item.sub);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#a3e635]/15 hover:text-[#a3e635] text-white/95 transition-all text-left duration-150 cursor-pointer font-sans"
                      >
                        <div className="font-bold flex items-center gap-1">
                          {item.label} <ArrowUpRight className="w-3 h-3 text-[#a3e635] opacity-80" />
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 leading-normal font-medium">{item.desc}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Link */}
            <motion.button
              onClick={() => { setActiveTab("about"); setOpenDropdown(null); }}
              whileHover={{ scale: 1.04, y: -0.5 }}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === "about" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
              }`}
            >
              About
            </motion.button>

            {/* Contact Link */}
            <motion.button
              onClick={() => { setActiveTab("contact"); setOpenDropdown(null); }}
              whileHover={{ scale: 1.04, y: -0.5 }}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                activeTab === "contact" ? "bg-[#a3e635] text-[#0b2512] font-extrabold shadow-md" : "hover:bg-white/10 text-white"
              }`}
            >
              Contact
            </motion.button>
          </nav>

          {/* Right Action Button & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10">
            {/* Free Consultation Button */}
            <motion.button
              id="header-free-consultation-btn"
              onClick={() => {
                setActiveTab("consultation");
                triggerScheduler("Free Consultation Inquiry");
                setOpenDropdown(null);
              }}
              whileHover={{ scale: 1.03, y: -0.5 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#bef264] hover:bg-[#a3e635] text-[#0c2415] text-xs font-black px-4.5 py-2.5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer font-sans border border-lime-300/10"
            >
              <span className="sm:inline block">Free Consultation</span>
              <Headphones className="w-3.5 h-3.5 text-[#0c2415]" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-all text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white font-bold" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

        </div>

        {/* Animated Mobile Menu with sub-categorizations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-[#0a1c18]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden shadow-2xl font-sans"
            >
              <div className="px-5 py-6 space-y-3.5 max-h-[80vh] overflow-y-auto">
                {/* Core Pages */}
                <button
                  onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-xl text-sm font-bold tracking-tight cursor-pointer ${
                    activeTab === "home" ? "bg-[#a3e635] text-[#0b2512]" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Home
                </button>

                {/* Services Section */}
                <div className="border-l border-white/10 pl-3 py-1 space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-extrabold uppercase px-1">Services Dropdown:</span>
                  {[
                    { label: "For Individuals", tag: "individual" },
                    { label: "For Businesses", tag: "business" },
                    { label: "QuickBooks support", tag: "quickbooks" },
                    { label: "VAT & Global Consultancy", tag: "tax" }
                  ].map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("services");
                        setSearchQuery(sub.tag);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 px-2 text-xs font-semibold text-zinc-400 hover:text-emerald-300 cursor-pointer"
                    >
                      ↳ {sub.label}
                    </button>
                  ))}
                </div>

                {/* Misc Section */}
                <div className="border-l border-white/10 pl-3 py-1 space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-extrabold uppercase px-1">Misc Dropdown:</span>
                  {[
                    { label: "FAQ Helpdesk", code: "faq" },
                    { label: "New Client Onboarding", code: "onboarding" },
                    { label: "Intake Document Checklist", code: "docs" },
                    { label: "Texas Corporate CTA BOI Filing", code: "cta" }
                  ].map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("misc");
                        setSelectedMiscId(sub.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 px-2 text-xs font-semibold text-zinc-400 hover:text-emerald-300 cursor-pointer"
                    >
                      ↳ {sub.label}
                    </button>
                  ))}
                </div>

                {/* Guides Section */}
                <div className="border-l border-white/10 pl-3 py-1 space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-extrabold uppercase px-1">Guides Dropdown:</span>
                  {[
                    { label: "Texas Property tax Appeals", code: "property-tax" },
                    { label: "FICA S-Corp Dividend Shields", code: "scorp" },
                    { label: "Amazon & Shopify economic VAT", code: "vat" },
                    { label: "Survive standard IRS Correspondence", code: "audit" }
                  ].map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("guides");
                        setSelectedGuideId(sub.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 px-2 text-xs font-semibold text-zinc-400 hover:text-emerald-300 cursor-pointer"
                    >
                      ↳ {sub.label}
                    </button>
                  ))}
                </div>

                {/* Tax Center Section */}
                <div className="border-l border-white/10 pl-3 py-1 space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-extrabold uppercase px-1">Tax Center Dropdown:</span>
                  {[
                    { label: "Interactive Estimators Suite", code: "calculators" },
                    { label: "Important Tax Deadlines Calendar", code: "calendar" },
                    { label: "Download essential IRS Form PDFs", code: "forms" },
                    { label: "Margin Brackets Reference Tables", code: "rates" }
                  ].map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("tax-center");
                        setSelectedTaxCenterId(sub.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 px-2 text-xs font-semibold text-zinc-400 hover:text-emerald-300 cursor-pointer"
                    >
                      ↳ {sub.label}
                    </button>
                  ))}
                </div>

                {/* Bottom Links */}
                <button
                  onClick={() => { setActiveTab("about"); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-xl text-sm font-bold tracking-tight cursor-pointer ${
                    activeTab === "about" ? "bg-[#a3e635] text-[#0b2512]" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Meet Our Team
                </button>
                <button
                  onClick={() => { setActiveTab("contact"); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-xl text-sm font-bold tracking-tight cursor-pointer ${
                    activeTab === "contact" ? "bg-[#a3e635] text-[#0b2512]" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Pages Swapping Main Board Box */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomePage
              key="view-home"
              setActiveTab={setActiveTab}
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "services" && (
            <ServicesPage
              key="view-services"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSelectedServiceDetail={setSelectedServiceDetail}
              setActiveTab={setActiveTab}
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "calculators" && (
            <CalculatorsPage
              key="view-calculators"
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "about" && (
            <AboutPage
              key="view-about"
              setSelectedTalentDetail={setSelectedTalentDetail}
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "solutions" && (
            <SolutionsPage
              key="view-solutions"
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "articles" && (
            <ArticlesPage
              key="view-articles"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSelectedBlogDetail={setSelectedBlogDetail}
            />
          )}

          {activeTab === "contact" && (
            <ContactPage
              key="view-contact"
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              contactMessage={contactMessage}
              setContactMessage={setContactMessage}
              contactSuccessMsg={contactSuccessMsg}
              submittingContact={submittingContact}
              submittedQueries={submittedQueries}
              handleContactSubmit={handleContactSubmit}
            />
          )}

          {activeTab === "consultation" && (
            <ConsultationPage
              key="view-consultation"
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "guides" && (
            <GuidesPage
              key="view-guides"
              activeGuideId={selectedGuideId}
              setActiveGuideId={setSelectedGuideId}
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "tax-center" && (
            <TaxCenterPage
              key="view-tax-center"
              activeSubSectionId={selectedTaxCenterId}
              setActiveSubSectionId={setSelectedTaxCenterId}
              triggerScheduler={triggerScheduler}
            />
          )}

          {activeTab === "misc" && (
            <MiscPage
              key="view-misc"
              activeSubSectionId={selectedMiscId}
              setActiveSubSectionId={setSelectedMiscId}
              triggerScheduler={triggerScheduler}
            />
          )}
        </AnimatePresence>
      </main>









      {/* 6. Section 4: "Your Tax Problems, Our Solution" (Dark glowing neon section) */}
      <section id="tax-problems-section" className="relative py-24 bg-black text-white overflow-hidden">
        
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 right-[5%] w-[350px] h-[350px] bg-emerald-700/20 rounded-full blur-[100px] glow-ambient z-0"></div>
        <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] bg-lime-600/10 rounded-full blur-[100px] glow-ambient z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/25 px-3 py-1 rounded-full font-mono">
              One Stop Tax Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Your Tax Problems, Our Solution
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-400">
              Texas real estate taxes are rising, appraisal districts utilize bulk calculations, and global VAT shipping causes immense delays. Secure absolute resolution.
            </p>
          </div>

          {/* Grid representing key tax problems */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {taxProblemsData.map((prob) => (
              <div
                key={prob.id}
                className="bg-neutral-900/60 hover:bg-[#0b2512]/35 border border-zinc-800/80 hover:border-[#a3e635]/20 p-6 sm:p-8 rounded-3xl transition-all shadow-lg flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#a3e635]/10 rounded-xl flex items-center justify-center text-[#a3e635] border border-[#a3e635]/15 font-bold text-lg">
                    %
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#a3e635] transition-all">
                    {prob.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-800 text-[10px] text-zinc-400 leading-relaxed block bg-white/5 -mx-8 -mb-8 p-4 rounded-b-3xl">
                  <strong className="text-zinc-200 block mb-0.5 font-bold uppercase tracking-wider">CPA Texas Relief:</strong>
                  {prob.stateImpact}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-center mt-16">
            <button
              onClick={() => triggerScheduler("Tax dispute consulting")}
              className="bg-white hover:bg-[#a3e635] text-emerald-950 font-bold text-xs px-8 py-3.5 rounded-full transition-all cursor-pointer shadow-xl shadow-white/5"
            >
              Book a call
            </button>
          </div>

        </div>
      </section>

      {/* 8. Section 6: "When Tax Knowledge is super power" (Blog Posts) */}
      <section id="blogs-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-150">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512]/80 bg-[#a3e635]/10 px-2.5 py-1 rounded-full font-mono">
              Knowledge Base
            </span>
            <h2 className="text-3xl font-display font-extrabold text-[#0b2512] tracking-tight">
              When Tax Knowledge is super power
            </h2>
          </div>
          <button
            onClick={() => triggerScheduler("CPA Research Request")}
            className="self-start sm:self-center bg-neutral-900 hover:bg-[#0b2512] text-white font-bold text-xs px-6 py-3 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            Read All <ChevronRight className="w-4 h-4 text-[#a3e635]" />
          </button>
        </div>

        {/* Blog Post cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 hover:border-emerald-800/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col justify-between group"
            >
              {/* Cover picture */}
              <div className="h-48 relative overflow-hidden bg-gray-50 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#0b2512] text-[#a3e635] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#a3e635]/20">
                  {post.readTime}
                </div>
              </div>

              {/* Title & info list */}
              <div className="p-6 flex-1 space-y-3.5">
                <h3 className="text-base font-display font-bold text-gray-900 group-hover:text-emerald-800 transition-all leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Footer Author metadata */}
              <div className="p-6 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#0b2512] text-[10px] text-white flex items-center justify-center rounded-full font-bold">
                    SH
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-900">{post.author}</h5>
                    <p className="text-[9px] text-gray-400">{post.authorRole} · {post.date}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBlogDetail(post)}
                  className="text-[10px] font-bold bg-[#0b2512] text-[#a3e635] px-2.5 py-1 rounded-lg hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  Read Post <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {filteredBlogs.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400 text-xs">
              No matching publications found. Try clearing your search filters!
            </div>
          )}
        </div>

      </section>

      {/* 9. Section 7: "Just Leave Us a Message to Trusted CPA Firm Shafiq Hasan" (Contact form) */}
      <section id="message-section" className="py-24 bg-white border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side column: credentials */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512]/80 bg-[#a3e635]/25 px-2.5 py-1 rounded-full font-mono">
                  Dallas Richardson Location
                </span>
                <h2 className="text-3xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
                  Just Leave Us a Message <br />
                  <span className="text-gray-500 font-normal">to Trusted CPA Firm Shafiq Hasan</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed pt-2">
                  Have a question about IRS filings, multi-state physical nexus limits, European sales taxes, or Texas appraisal disputes? Submit our form or call directly.
                </p>
              </div>

              {/* Direct channels widgets */}
              <div className="space-y-5 text-sm">
                
                <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
                  <Mail className="w-5 h-5 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase">Chat to us:</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Our friendly team is here to help.</p>
                    <a href="mailto:info@shafiqhasancpa.com" className="font-semibold text-emerald-800 hover:underline block text-xs mt-1">
                      info@shafiqhasancpa.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
                  <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase">Visit us:</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Come say hello at our Dallas office.</p>
                    <p className="font-semibold text-gray-900 text-xs mt-1 leading-normal">
                      2650 11th Ave, Greeley, Richardson, Dallas, TX 75080
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
                  <Phone className="w-5 h-5 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase">Call us:</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Mon-Fri from 8am to 5pm (CST).</p>
                    <a href="tel:214-256-4111" className="font-semibold text-emerald-800 hover:underline block text-xs mt-1">
                      214-256-4111
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right side container: Lime-accented Contact Form */}
            <div className="lg:col-span-7 bg-[#a3e635] text-emerald-950 p-8 rounded-3xl shadow-xl flex flex-col justify-between border-2 border-[#a3e635] relative">
              <div className="block space-y-6">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-emerald-950">
                    Have you got something in your mind?
                  </h3>
                  <p className="text-xs text-[#06180b]/80">
                    Provide your credentials and specific tax requests. Our senior CPAs will perform initial evaluations within 2 hours.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2">
                      Your business email address:
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="ex - abc@gmail.com"
                      className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 px-4 py-3 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2">
                      Direct phone number (optional):
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="ex - (555) 555-1234"
                      className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 px-4 py-3 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2">
                      Describe your tax or consultation request:
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Please note business size, entity status or property location..."
                      className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 p-4 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60 resize-none leading-relaxed"
                    />
                  </div>

                  {contactSuccessMsg && (
                    <div className="p-3 bg-emerald-950 text-white rounded-xl font-bold flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                      <span>{contactSuccessMsg}</span>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-950/70">
                      🔒 Secured AES 256 data standards
                    </span>
                    <button
                      id="btn-contact-query-submit"
                      type="submit"
                      disabled={submittingContact}
                      className="bg-emerald-950 hover:bg-black text-[#a3e635] font-bold px-7 py-3 rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                      {submittingContact ? "Submitting..." : "Submit Query"}{" "}
                      <ChevronRight className="w-4 h-4 text-[#a3e635]" />
                    </button>
                  </div>
                </form>

                {/* Self-check submitted ledger so the user gets instant verification */}
                {submittedQueries.length > 0 && (
                  <div className="border-t border-emerald-950/15 pt-5 block">
                    <span className="text-[10px] font-bold uppercase text-[#0b2512] block tracking-wider mb-2.5">
                      Your prior active support registrations:
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {submittedQueries.map((q) => (
                        <div key={q.id} className="p-2.5 bg-emerald-950/5 border border-emerald-950/10 rounded-xl flex justify-between items-center text-[10px]">
                          <div>
                            <span className="font-bold text-[#06180b]">{q.email}</span>
                            <p className="text-emerald-900 truncate max-w-sm font-light italic">&quot;{q.message}&quot;</p>
                          </div>
                          <span className="bg-emerald-950 text-[#a3e635] py-0.5 px-2 rounded-full font-bold uppercase tracking-wider text-[8px] block shrink-0">
                            Sent
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* FAQ Badge */}
          <div className="bg-white border border-gray-300 rounded-[6px] px-3 py-1 text-xs font-bold font-mono tracking-wider text-gray-900 mb-6 uppercase inline-block shadow-sm">
            FAQ
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black font-display text-center leading-tight tracking-tight mb-12 max-w-2xl">
            Our Clients normally asked; Everything you need to know
          </h2>
          
          {/* Accordion list */}
          <div className="w-full space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border border-gray-150 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "bg-[#f8faf9] border-[#0c2415]/15 shadow-sm" : "bg-[#f7f8f8] hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-[15px] tracking-tight leading-snug">
                      {item.question}
                    </span>
                    <span className="transition-transform duration-300 text-gray-700 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-900" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
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
                        <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-650 leading-relaxed font-normal border-t border-gray-150/50 pt-3">
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
      </section>

      {/* Footer Area */}
      <footer className="bg-transparent block font-sans relative">
        {/* Soft elegant gradient rounded outer shell */}
        <div className="mx-4 sm:mx-6 lg:mx-8 mb-6 rounded-t-[50px] relative overflow-hidden bg-gradient-to-br from-[#dbf9eb] via-[#ecfbf7] to-[#e4f2fe] border-t border-x border-white/40 shadow-xl">
          
          {/* Professional subtle grid-pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
              backgroundSize: "32px 32px"
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-16 md:py-20 block">
            
            {/* Top row - 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-900 border-b border-black/5 pb-16">
              
              {/* Column 1 - Shafiq Hasan capsule & bio */}
              <div className="space-y-6">
                
                {/* White capsule badge */}
                <div className="bg-white rounded-full py-1.5 pl-1.5 pr-4 inline-flex items-center gap-3 shadow-md border border-black/[0.03] group hover:shadow-lg transition-all">
                  <div className="relative">
                    <img
                      src={SHAFIQ_HASAN_PORTRAIT}
                      alt="Shafiq Hasan, Certified Public Accountant"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 text-[10px] bg-white rounded-full leading-none p-0.5 shadow-sm border border-black/[0.05]" title="American CPA Licensed">
                      🇺🇸
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0c2415] leading-tight">
                      Shafiq Hasan
                    </span>
                    <span className="text-[9px] font-medium text-zinc-500 leading-none">
                      Certified Public Accountant
                    </span>
                  </div>
                </div>
                
                {/* Descriptive brand statement */}
                <p className="text-xs text-neutral-700 leading-relaxed font-normal max-w-sm">
                  Shafiq Hasan CPA PLLC is a full-service CPA firm in Richardson, TX, offering affordable accounting and financial services for business owners, executives, and independent professionals, with a focus on personal service and client satisfaction.
                </p>
              </div>
              
              {/* Column 2 - About Us */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold tracking-wide text-[#0c2415] uppercase font-display">
                  About us
                </h4>
                <ul className="space-y-3.5 text-xs text-neutral-600 font-medium">
                  <li>
                    <a href="#services-section" className="hover:text-black hover:underline transition-all">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#consultation-form" className="hover:text-black hover:underline transition-all" onClick={(e) => { e.preventDefault(); triggerScheduler("General Tax Consultation"); }}>
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="#contact-section" className="hover:text-black hover:underline transition-all">
                      Request Access
                    </a>
                  </li>
                  <li>
                    <a href="#consultation-form" className="hover:text-black hover:underline transition-all" onClick={(e) => { e.preventDefault(); triggerScheduler("Business Advisory Engagement"); }}>
                      Partnership
                    </a>
                  </li>
                  <li>
                    <a href="#problems-section" className="hover:text-black hover:underline transition-all">
                      Tax Center
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Column 3 - Resources */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold tracking-wide text-[#0c2415] uppercase font-display">
                  Resources
                </h4>
                <ul className="space-y-3.5 text-xs text-neutral-600 font-medium">
                  <li>
                    <a href="#consultation-form" className="hover:text-black hover:underline transition-all" onClick={(e) => { e.preventDefault(); triggerScheduler("Client Onboarding Support"); }}>
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#consultation-form" className="hover:text-black hover:underline transition-all" onClick={(e) => { e.preventDefault(); triggerScheduler("Tax Diagnostics Demo"); }}>
                      Book a Demo
                    </a>
                  </li>
                  <li>
                    <span className="cursor-help hover:text-black hover:underline transition-all inline-flex items-center gap-1.5" onClick={() => alert("Current servers are operating nominally. All TCAD interfaces secured.")}>
                      Server Status
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    </span>
                  </li>
                  <li>
                    <a href="#blog-section" className="hover:text-black hover:underline transition-all">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#credentials-section" className="hover:text-black hover:underline transition-all">
                      Link
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Column 4 - Get in Touch & WhatsApp */}
              <div className="space-y-5">
                <h4 className="text-sm font-semibold tracking-wide text-[#0c2415] uppercase font-display">
                  Get in Touch
                </h4>
                <ul className="space-y-3.5 text-xs text-neutral-650">
                  <li>
                    <a href="#contact-section" className="hover:text-black hover:underline transition-all">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#consultation-form" className="hover:text-black hover:underline transition-all" onClick={(e) => { e.preventDefault(); triggerScheduler("General Advisory Intake"); }}>
                      Link
                    </a>
                  </li>
                  <li>
                    <a href="#credentials-section" className="hover:text-black hover:underline transition-all">
                      Link
                    </a>
                  </li>
                  
                  {/* WhatsApp click-to-chat row */}
                  <li>
                    <a 
                      href="https://wa.me/12142564111" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold hover:underline transition-all group"
                      title="Connect on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-600 group-hover:scale-110 transition-transform">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.233c-.124-.207-.456-.331-.952-.579-.496-.248-2.338-1.155-2.697-1.287-.358-.133-.62-.199-.878.199-.257.398-.999 1.258-1.226 1.514-.227.257-.455.289-.951.041-.497-.248-2.099-.773-3.998-2.467-1.478-1.321-2.477-2.952-2.766-3.449-.29-.497-.031-.766.217-1.012.223-.222.497-.579.745-.869.248-.29.33-.497.496-.828.166-.331.083-.62-.041-.869-.124-.248-.878-2.115-1.205-2.902-.319-.769-.643-.666-.878-.678-.227-.012-.488-.014-.746-.014-.257 0-.678.096-1.031.478-.352.383-1.346 1.315-1.346 3.207 0 1.892 1.378 3.716 1.572 3.974.195.258 2.71 4.139 6.565 5.799.917.395 1.633.631 2.19.809.923.292 1.763.25 2.428.152.741-.11 2.28-.932 2.6-1.785.32-.853.32-1.583.224-1.785z"/>
                      </svg>
                      <span>Connect WhatsApp</span>
                    </a>
                  </li>
                </ul>
                
                {/* Styled Social icons */}
                <div className="flex gap-2.5 pt-1 flex-wrap">
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-[#1877f2] hover:bg-[#1565c0] flex items-center justify-center shadow-sm hover:shadow transition-all text-white group"
                    title="Follow on Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* X (formerly Twitter) */}
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-black hover:bg-neutral-900 flex items-center justify-center shadow-sm hover:shadow transition-all text-white group"
                    title="Follow on X"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-[#ff0000] hover:bg-[#cc0000] flex items-center justify-center shadow-sm hover:shadow transition-all text-white group"
                    title="Watch on YouTube"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837z M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* Dedicated WhatsApp Green Round Social Icon */}
                  <a 
                    href="https://wa.me/12142564111" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center shadow-sm hover:shadow transition-all text-white group"
                    title="Direct WhatsApp Messenger"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12.004 0C5.378 0 0 5.377 0 12.003c0 2.118.553 4.106 1.517 5.842L0 24l6.335-1.662c1.746.953 3.71 1.493 5.792 1.493 6.627 0 11.944-5.304 11.944-11.93C23.945 5.377 18.63 0 12.004 0zm0 21.84c-1.92 0-3.8-.517-5.46-1.492l-.391-.233-3.753.985 1.002-3.66-.255-.407c-1.07-1.702-1.636-3.684-1.636-5.748C1.511 6.2 6.223 1.488 12.004 1.488c5.782 0 10.493 4.712 10.493 10.51 0 5.796-4.713 10.509-10.493 10.509z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
            </div>
            
            {/* Copyright & registration footnote bottom bar */}
            <div className="pt-8 text-center text-[11px] text-neutral-600 font-medium">
              Copyright © 2008-2026, Shafiq Hasan ® is a registered trademark
            </div>
            
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Connect Button */}
      <div className="fixed bottom-24 right-6 md:bottom-6 md:right-32 z-50 font-sans">
        <a
          href="https://wa.me/12142564111"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-5 rounded-full shadow-2xl focus:outline-none border-2 border-white/60 cursor-pointer transition-all hover:scale-105 active:scale-95 group font-bold text-xs"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-11.233c-.124-.207-.456-.331-.952-.579-.496-.248-2.338-1.155-2.697-1.287-.358-.133-.62-.199-.878.199-.257.398-.999 1.258-1.226 1.514-.227.257-.455.289-.951.041-.497-.248-2.099-.773-3.998-2.467-1.478-1.321-2.477-2.952-2.766-3.449-.29-.497-.031-.766.217-1.012.223-.222.497-.579.745-.869.248-.29.33-.497.496-.828.166-.331.083-.62-.041-.869-.124-.248-.878-2.115-1.205-2.902-.319-.769-.643-.666-.878-.678-.227-.012-.488-.014-.746-.014-.257 0-.678.096-1.031.478-.352.383-1.346 1.315-1.346 3.207 0 1.892 1.378 3.716 1.572 3.974.195.258 2.71 4.139 6.565 5.799.917.395 1.633.631 2.19.809.923.292 1.763.25 2.428.152.741-.11 2.28-.932 2.6-1.785.32-.853.32-1.583.224-1.785z"/>
          </svg>
          Chat WhatsApp
        </a>
      </div>

      {/* Floating AI chatbot component */}
      <ChatBot />

      {/* Calendar consultation scheduling overlay wizard */}
      <ConsultationWizard
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultCategory={selectedConsultationCategory}
      />

      {/* Service Detail Dynamic Modal */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 bg-[#0b2512]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden block font-sans"
            >
              <div className="bg-[#0b2512] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {renderIcon(selectedServiceDetail.iconName, "w-5 h-5 text-[#a3e635]")}
                  <h3 className="text-sm font-bold font-display">{selectedServiceDetail.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-gray-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {selectedServiceDetail.detailedDescription}
                </p>

                <div>
                  <h4 className="text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2">Strategic action checklist:</h4>
                  <div className="space-y-2">
                    {selectedServiceDetail.tags.map((tag, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-gray-700">
                        <Check className="w-4 h-4 text-lime-600 shrink-0" />
                        <span>Professional execution of <strong className="font-semibold text-gray-900">{tag}</strong> configurations.</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl block text-xs">
                  <span className="font-bold text-[#0b2512]">Advisory Billing Schedule:</span>
                  <p className="text-gray-500 mt-1">Value-added rates customizable depending on operations scale. Filing estimates are calculated prior to engagements.</p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-150 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedServiceDetail(null)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-xs px-4"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cat = selectedServiceDetail.title;
                    setSelectedServiceDetail(null);
                    triggerScheduler(cat);
                  }}
                  className="bg-[#0b2512] text-[#a3e635] text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Schedule Trial Advice 🎧
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Talent Dossier Dynamic Modal */}
      <AnimatePresence>
        {selectedTalentDetail && (
          <div className="fixed inset-0 bg-[#0b2512]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden block font-sans"
            >
              <div className="bg-[#0b2512] text-white p-5 flex justify-between items-center">
                <span className="text-[#a3e635] text-xs font-mono font-bold tracking-wider">CPA Credentials Dossier</span>
                <button
                  onClick={() => setSelectedTalentDetail(null)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-gray-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedTalentDetail.image}
                    alt={selectedTalentDetail.name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{selectedTalentDetail.name}</h3>
                    <p className="text-xs text-emerald-800 font-semibold">{selectedTalentDetail.role}</p>
                    <p className="text-[10px] text-gray-400">Dallas Board Registered CPA Expert</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-gray-600 leading-relaxed p-3.5 bg-gray-50 border border-gray-150 rounded-2xl">
                    <h4 className="font-bold text-[#0b2512] mb-1">Executive Summary:</h4>
                    {selectedTalentDetail.description}
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">Primary Licensure & Skillsets:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTalentDetail.specialties.map((spec, i) => (
                        <span key={i} className="text-[9px] bg-emerald-950 text-[#a3e635] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-150 flex gap-3 justify-end bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setSelectedTalentDetail(null)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-xs"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const valName = selectedTalentDetail.name;
                    setSelectedTalentDetail(null);
                    triggerScheduler(`Advisory call with ${valName}`);
                  }}
                  className="bg-[#0b2512] text-[#a3e635] text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Book Priority Call
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Detail Reader & Feedback comments modal */}
      <AnimatePresence>
        {selectedBlogDetail && (
          <div className="fixed inset-0 bg-[#0b2512]/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col font-sans"
            >
              {/* Header */}
              <div className="bg-[#0b2512] text-white p-5 flex justify-between items-center">
                <span className="text-[10px] bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/25 uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded-full">
                  CPA Executive publication
                </span>
                <button
                  onClick={() => setSelectedBlogDetail(null)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-gray-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Visual Cover */}
                <div className="h-56 rounded-2xl overflow-hidden bg-gray-55 shadow-sm relative">
                  <img
                    src={selectedBlogDetail.image}
                    alt={selectedBlogDetail.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h4 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white tracking-tight drop-shadow-sm leading-snug">
                    {selectedBlogDetail.title}
                  </h4>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-xs text-gray-500 border-b border-gray-150 pb-4">
                  <div className="w-8 h-8 bg-[#0b2512] text-[10px] text-white flex items-center justify-center rounded-full font-bold shadow-md">
                    SH
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{selectedBlogDetail.author}</h5>
                    <p className="text-[10px] text-gray-400">{selectedBlogDetail.authorRole} · {selectedBlogDetail.date} · {selectedBlogDetail.readTime}</p>
                  </div>
                </div>

                {/* Article context */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 border border-gray-150 rounded-2xl">
                  {selectedBlogDetail.content}
                </p>

                {/* Feedback feedback Comments section */}
                <div className="border-t border-gray-150 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#0b2512] flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> Client Comments & Feedback:
                  </h4>

                  {/* Comments lists */}
                  <div className="space-y-3">
                    {(blogComments[selectedBlogDetail.id] || []).length === 0 ? (
                      <p className="text-xs text-gray-400 px-1 py-2 italic">No review comment has been registered on this file. Be the first to add feedback!</p>
                    ) : (
                      (blogComments[selectedBlogDetail.id] || []).map((cmt, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-gray-150/70 text-xs">
                          <header className="flex justify-between font-bold text-gray-900 mb-1">
                            <span>{cmt.name}</span>
                            <span className="text-[10px] text-zinc-400 font-normal">{cmt.date}</span>
                          </header>
                          <p className="text-gray-600 font-normal leading-relaxed">{cmt.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add feedback card */}
                  <form onSubmit={(e) => handleCommentSubmit(e, selectedBlogDetail.id)} className="space-y-3 bg-emerald-950/5 border border-emerald-900/10 p-4 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold text-emerald-900 block tracking-wider">Leave Public Feedback comment:</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        required
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="Your name / Corporation name..."
                        className="px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b2512] text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Comment text (must be related to tax advisory)..."
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b2512] text-xs resize-none"
                    />
                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="bg-[#0b2512] hover:bg-neutral-900 text-[#a3e635] text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer"
                      >
                        Publish Feedback
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              <div className="p-4 border-t border-gray-150 bg-gray-50 flex gap-3 justify-between items-center sm:flex-row flex-col">
                <span className="text-[10px] text-gray-400">Published by Shafiq Hasan CPA technical publications desk</span>
                <button
                  type="button"
                  onClick={() => setSelectedBlogDetail(null)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
