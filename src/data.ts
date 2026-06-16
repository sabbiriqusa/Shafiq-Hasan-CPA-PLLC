import { Service, TeamMember, TaxProblem, Testimonial, BlogPost, FAQItem } from "./types";

// Generated Image Paths from active session
export const DALLAS_SKYLINE = "/src/assets/images/dallas_skyline_1781632263259.jpg";
export const SHAFIQ_HASAN_PORTRAIT = "/src/assets/images/shafiq_hasan_1781632281576.jpg";
export const TAX_CHART_ILLUSTRATION = "/src/assets/images/tax_planning_chart_1781632301674.jpg";

export const INDIVIDUAL_SERVICE_IMG = "/src/assets/images/individual_service_1781639252977.jpg";
export const BUSINESS_SERVICE_IMG = "/src/assets/images/business_service_1781639271862.jpg";
export const QUICKBOOK_SERVICE_IMG = "/src/assets/images/quickbook_service_1781639291735.jpg";
export const TAX_SERVICE_IMG = "/src/assets/images/tax_service_1781639310789.jpg";

export const servicesData: Service[] = [
  {
    id: "s1",
    category: "individual",
    title: "For Individuals",
    shortDescription: "Personalized, elite tax planning with high-contrast local Texas appraisal evaluations and dual-status filing support.",
    detailedDescription: "Our personal wealth and tax optimization services go far beyond simple annual filings. We assist executives, medical professionals, real estate investors, and high-net-worth families with structural shielding, estate planning, and Richardson/Dallas real property appraisal protests. Our target is maximizing your deductions while maintaining flawless IRS compliance.",
    iconName: "User",
    tags: ["Form 1040", "Itemized Deductions", "Retirement Planning", "Cryptocurrency Tax"]
  },
  {
    id: "s2",
    category: "business",
    title: "For Business",
    shortDescription: "Corporate structure consultation, S-Corp election optimizations, multi-state sales tax nexus, and Texas franchise tax returns.",
    detailedDescription: "Navigate form 1120, 1120-S, 1065, and multi-state nexus filing requirements without stress. We help small and medium companies minimize self-employment tax liabilities, design bulletproof expense categories, and comply with state franchise tax obligations. Ideal for American corporations and cross-border companies selling into the US market.",
    iconName: "Briefcase",
    tags: ["S-Corp Election", "Form 1120-S", "Texas Franchise Tax", "Sales Tax Nexus"]
  },
  {
    id: "s3",
    category: "quickbooks",
    title: "QuickBook Service",
    shortDescription: "Certified QuickBooks ProAdvisor reconciliation, ledger cleanups, bank feed restructuring, and custom chart of accounts.",
    detailedDescription: "As Certified QuickBooks ProAdvisors, we resolve historical bookkeeping messes, reconcile bank transactions, map complex charts of accounts, and establish seamless automation with invoicing and payroll providers. Stop stressing over monthly close outputs and let us deliver pristine, audit-ready balance sheets.",
    iconName: "Cpu",
    tags: ["ProAdvisor Support", "Ledger Cleanup", "Payroll Setup", "1099 Filing"]
  },
  {
    id: "s4",
    category: "tax",
    title: "Tax Service & VAT Consultation",
    shortDescription: "Global value-added-tax advisory, European compliance for US sellers, and foreign entity sales tax routing.",
    detailedDescription: "VAT can be double-taxed if wrong. We design compliance matrices for Amazon FBA/Shopify sellers in Europe and configure European sales taxes (VAT OSS) with import-duty recovery systems. For foreign companies selling in the US, we establish local registration, physical/economic nexus monitoring, and state tax withholding compliance.",
    iconName: "Percent",
    tags: ["EU VAT OSS", "UK VAT Filings", "Nexus Analysis", "Import Duties Mapping"]
  }
];

export const teamMembersData: TeamMember[] = [
  {
    id: "t1",
    name: "Shafiq Hasan, CPA",
    role: "Founder & Lead Principal CPA",
    description: "Bringing over 20 years of premier accounting expertise to Richardson, Shafiq Hasan has navigated complex corporate structures, multi-million dollar property tax negotiations, and intricate global VAT consultations. Known for dedicated, warm advocacy, Shafiq ensures your numbers work seamlessly for your life goals.",
    image: SHAFIQ_HASAN_PORTRAIT,
    specialties: ["IRS Representation", "Texas Appraisals", "S-Corp Structuring", "International Tax Sync"]
  },
  {
    id: "t2",
    name: "Abdullah Mia",
    role: "Senior Tax Consultant",
    description: "A seasoned veteran of corporate federal filing and Texas Central Appraisal District (CAD) protests.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    specialties: ["Dallas Property Protests", "Form 1120S", "State Filings"]
  },
  {
    id: "t3",
    name: "Shakil Adnan Khan",
    role: "Certified QuickBooks ProAdvisor",
    description: "Expert in systematic ledger optimization, accounting systems automation, and complex bank reconciliations.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    specialties: ["QuickBooks Restructuring", "Payroll Integration", "Class Tracking"]
  },
  {
    id: "t4",
    name: "Ashraf Hossain",
    role: "Finance Manager",
    description: "Overseeing liquidity analysis, capital budget projections, and complex international trade advisory matrices.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    specialties: ["M&A Due Diligence", "Cash Flow Forecast", "Capital Allocation"]
  },
  {
    id: "t5",
    name: "Atiku Rahman Khan",
    role: "Business Strategist",
    description: "Advising multi-unit retail brands and fast-growing tech startups on scaling operations and tax shield compliance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    specialties: ["Entity Selection", "Series LLCs Setup", "Sales Tax Strategy"]
  }
];

export const taxProblemsData: TaxProblem[] = [
  {
    id: "tp1",
    title: "High Property Taxes in Dallas",
    description: "Dallas County property values have soared. Unchecked appraisals lead to astronomical tax liabilities.",
    stateImpact: "Appraisal reduction lowers personal mortgage escrow and cash flow pressure.",
    iconName: "Home"
  },
  {
    id: "tp2",
    title: "Rising Dallas/Richardson Appraisals",
    description: "The Collin and Dallas Central Appraisal Districts utilize mass models that consistently over-value local properties.",
    stateImpact: "Individual protests based on interior damage are key to restoring equitable evaluations.",
    iconName: "TrendingUp"
  },
  {
    id: "tp3",
    title: "Complex International and State Tax Codes",
    description: "Selling cross-border triggers multi-tiered VAT and local state tax (nexus) regulations which are highly punitive.",
    stateImpact: "Strategic setup routes sales through jurisdictions with lower margins or exempt statuses.",
    iconName: "FileText"
  },
  {
    id: "tp4",
    title: "IRS Delays / Backlogs",
    description: "Persistent IRS wait times lock up cash and drag out dispute resolution processes for months.",
    stateImpact: "CPA e-filing channels and direct agency lines bypass bottleneck queues, yielding quick refunds.",
    iconName: "Clock"
  },
  {
    id: "tp5",
    title: "Underfunded Public Services",
    description: "Local school and municipal districts inflate rates to protect revenues, passing the cost strictly to taxpayers.",
    stateImpact: "Claiming qualified homestead, senior, and veteran exemptions offsets structural hikes.",
    iconName: "AlertTriangle"
  },
  {
    id: "tp6",
    title: "Unfair Business Tax Breaks",
    description: "Fortune 500 conglomerates get elite shields. Small local business owners must pay maximum tax if unguided.",
    stateImpact: "S-Corporations salary-to-distribution strategies unlock premium federal tax benefits.",
    iconName: "ShieldAlert"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "te1",
    quote: "Shafiq Hasan saved our Richardson retail operation over $24,000 in Dallas property appraisal disputes. His representation has allowed us to invest back into hiring staff and expanding local services. Highly recommend!",
    author: "Abdullah Mahmud",
    role: "Business Owner",
    company: "Dallas Retail Group LLC",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te2",
    quote: "Our cross-border e-commerce business was drowning in European VAT compliance letters. Shakil Adnan and Shafiq designed an integrated solution in QuickBooks that handles both Texas sales tax and European Union VAT OSS flawlessly.",
    author: "Jessica Thornton",
    role: "VP of Finance",
    company: "Global Nexus Shopify Store",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te3",
    quote: "The cleanest QuickBooks cleanup we've ever experienced. We had three years of un-reconciled bank lines from an old project. Within a week, the accounts were completely balanced and fully prepped for IRS Form 1065.",
    author: "Marcus Lin, CPA",
    role: "Director of Operations",
    company: "Lone Star Logistics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te4",
    quote: "Shafiq's consulting saved our Collin County medical practice over $18,000 in unnecessary state tax filings this year. Prompt, expert, and highly supportive counseling.",
    author: "Dr. Amara Vance",
    role: "Lead Partner",
    company: "Legacy Crest Medical",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te5",
    quote: "The S-Corp distribution restructuring strategy proposed during our audit saved us from paying thousands in self-employment taxes. Unbelievably precise insights.",
    author: "Tyler Henderson",
    role: "Founder",
    company: "Plano Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te6",
    quote: "Flawless QuickBooks Online ledger rebuild after an external bookkeeper made a total mess. Our balances now match our bank feeds perfectly. Highly recommend!",
    author: "Karen Brewster",
    role: "CFO",
    company: "Richardson Creative Agency",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te7",
    quote: "Superb corporate tax guidance on franchise tax exceptions. They understand the nuances of Texas tax laws inside and out, specifically for new LLCs.",
    author: "David Chen",
    role: "Co-Founder",
    company: "Blue Dot Hospitality",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te8",
    quote: "Shafiq has been our family's trusted advisory for six years. He does more than file tax forms; he actively protests our home appraisal tax assessments in Dallas County.",
    author: "Samira Shah",
    role: "Homeowner",
    company: "Far North Dallas Estate",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te9",
    quote: "Excellent experience handling our multi-state sales tax nexus configuration. We can sell across state borders confident of our compliance status.",
    author: "Raymond Vance",
    role: "Controller",
    company: "Apex E-Commerce Group",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te10",
    quote: "No more stressing over monthly reconciliations or QuickBooks anomalies. Their ProAdvisor service is consistent, expert, and exceptionally organized.",
    author: "Linda Montgomery",
    role: "CEO",
    company: "Montgomery Builders",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te11",
    quote: "Saved us from an expensive IRS correspondence error regarding corporate distributions. Their prompt audit assistance resolved it in under two weeks.",
    author: "Brandon Wu",
    role: "CEO",
    company: "Lone Star Tech Partners",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te12",
    quote: "They handle our payroll processing and quarterly filings with absolute precision. Extremely reliable service that lets me focus entirely on operations.",
    author: "Vanessa Alvarez",
    role: "Operations Manager",
    company: "Richardson Care Clinics",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te13",
    quote: "Our property value assessment was adjusted down by $85,000 thanks to their meticulous ARB hearing preparation. A game-changer for our cash flow.",
    author: "Gary Nielsen",
    role: "Property Investor",
    company: "Nielsen Realty Holdings",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te14",
    quote: "Their international VAT advisory helped us set up VAT OSS registration for selling digital licenses inside the EU. Truly world-class consulting.",
    author: "Kenji Sato",
    role: "Operations Lead",
    company: "SaasFlow International",
    avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te15",
    quote: "Exceptional support with S-Corp conversion paperwork. They handled everything from IRS elections to payroll setups seamlessly.",
    author: "Sarah Jenkins",
    role: "Founder",
    company: "West Lake Consulting",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te16",
    quote: "Highly intelligent tax professionals who really care about your business's bottom line. Their proactive planning is worth every penny of the retainer.",
    author: "Jeremy Cole",
    role: "Executive Director",
    company: "North Texas Logistics",
    avatar: "https://images.unsplash.com/photo-1502767089025-6572583495b3?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te17",
    quote: "The team at Capital CPA is simply the best in Richardson. Honest, thorough, and highly responsive to any sudden IRS letters.",
    author: "Michael Fletcher",
    role: "Owner",
    company: "Fletcher Custom Homes",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  },
  {
    id: "te18",
    quote: "A masterclass in bookkeeping and ledger optimization. Our balance sheets are finally pristine and ready for investors.",
    author: "Elena Rostova",
    role: "CFO",
    company: "Innovate Dallas Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    rating: 5
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "b1",
    title: "How to Protest High Property Taxes in Richardson (Step-by-Step)",
    slug: "protest-property-taxes-richardson",
    content: "Texas property taxes are calculated as a percentage of your home's appraised market value. To lower this, you must file a protest with the Dallas Central Appraisal District (DCAD) or Collin Appraisal District by May 15th (or 30 days after receiving your assessment notice). In this guide, we break down how to extract comparable asset data, draft an interior deficiency log (such as foundation crack logs), and present a cohesive appraisal package at the Appraisal Review Board (ARB). Having a certified CPA represent your claim mathematically increases approval chances by up to 80%!",
    image: TAX_CHART_ILLUSTRATION,
    author: "Shafiq Hasan, CPA",
    authorRole: "Founder",
    date: "15 Nov, 2026",
    commentCount: 5,
    readTime: "6 min read"
  },
  {
    id: "b2",
    title: "Navigating S-Corp Elections: How to Save 15.3% on Self-Employment Tax",
    slug: "scorp-election-sales-tax-safety",
    content: "If your LLC is earning over $60,000 in net positive profits, tax-proactive CPAs advise registering an S-Corporation tax election with the IRS. Under a standard LLC, you pay a heavy 15.3% self-employment (FICA) tax on every single dollar of net profit. By filing IRS Form 2553 to opt into S-Corp status, you can pay yourself a 'Reasonable Salary' and treat the remaining surplus as distributions, which are completely exempt from self-employment taxes. This represents substantial household cash-flow optimization.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400",
    author: "Senior Tax Team",
    authorRole: "Technical Advisory",
    date: "12 Oct, 2026",
    commentCount: 3,
    readTime: "8 min read"
  },
  {
    id: "b3",
    title: "US Sales Tax vs. European VAT: A Guide for Modern E-Commerce Operators",
    slug: "us-sales-tax-eu-vat-guide",
    content: "A common mistake by rapidly scaling US brands is assuming that state sales tax behaves like European VAT. European VAT is a value-added transactional levy charged at every exchange tier of the supply chain, whereas US state sales tax is purely a single-tier consumption levy initiated at the final consumer checkout base. This guide clarifies how to map economic nexus (Wayfair limits), manage sales certificates, register for European Union Import One-Stop-Shop (IOSS), and reconcile cross-border sales inside QuickBooks Pro.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600&h=400",
    author: "Atiku Rahman",
    authorRole: "Global Strategist",
    date: "28 Sep, 2026",
    commentCount: 8,
    readTime: "11 min read"
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "My company's books are a nightmare. I don't even know where to start.",
    answer: "We specialize in complete bookkeeping cleanups. We will systematically map out your accounts, sort through messy historical transactions, reconcile old statements, and deliver clean, organized financial reports so you can make confident business decisions."
  },
  {
    question: "I'm spending all my time managing payroll for my employees.",
    answer: "We offer payroll solutions that meet your business's needs and enable you to spend time doing what you do best--running your company."
  },
  {
    question: "I use QuickBooks, but I'm not sure I'm getting the most out of the software.",
    answer: "As Certified QuickBooks ProAdvisors, we assess your setup, streamline daily workflows, correct diagnostic issues, and train your staff to maximize the powerful reporting and automation features of the platform."
  },
  {
    question: "I made a mistake on my taxes.",
    answer: "Don't panic. Tax rules are complex, and errors are common. We can file an amended return to correct the mistake, handle IRS correspondence on your behalf, and secure the best possible resolution for any outstanding liabilities."
  },
  {
    question: "I need help planning my family's financial future.",
    answer: "We offer comprehensive personal tax planning and wealth advisory. We help structure your assets, plan for retirement, optimize estate transfers, and protest rising real property appraisals to safeguard your family's hard-earned wealth."
  }
];
