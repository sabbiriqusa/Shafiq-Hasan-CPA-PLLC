import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

const app = express();
const PORT = 3000;

// Improve security by hiding Express headers
app.disable("x-powered-by");

// Compression middleware to speed up download speeds of heavy assets
app.use(compression());

// Security Hardened headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://*.googleapis.com", "https://*.gstatic.com", "https://*.google.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*.googleapis.com", "https://*.google.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.google.com", "https://*.gstatic.com", "https://*.googleapis.com"],
        connectSrc: ["'self'", "https://*.googleapis.com", "https://*.gstatic.com", "https://*.google.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        frameAncestors: ["'self'", "*"], // Crucial to load preview seamlessly in AI Studio iframe
      },
    },
    frameguard: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Middleware
app.use(express.json());

// In-memory logs of client queries (for the session)
interface ContactQuery {
  id: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "reviewed";
  createdAt: string;
}

const contactQueries: ContactQuery[] = [];

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: Contact Query Submission
app.post("/api/contact", (req, res) => {
  const { email, phone, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  const newQuery: ContactQuery = {
    id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    email,
    phone: phone || "Not Provided",
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  contactQueries.push(newQuery);
  res.json({ success: true, query: newQuery });
});

// API: Get contact queries list (Admin dashboard context)
app.get("/api/admin/queries", (req, res) => {
  res.json({ queries: contactQueries });
});

// Lazy-initialized Gemini API client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Fallback response engine for when the Gemini key is not configured yet
function getRuleBasedResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `Hello! Welcome to Shafiq Hasan CPA PLLC. I am your AI Tax Assistant. How can I assist you with your tax planning, business consultations, VAT/sales tax, or QuickBooks needs today?`;
  }
  
  if (msg.includes("property tax") || msg.includes("protest") || msg.includes("richardson") || msg.includes("dallas")) {
    return `Texas has some of the highest property taxes in the nation, and Richardson/Dallas County homeowners saw rapid appraisal rises recently. 
At Shafiq Hasan CPA, we help you file protests with the Dallas Central Appraisal District (DCAD) or Collin Central Appraisal District (CCAD). 
Our strategy includes:
1. Analyzing market sales comparables (Comps) in your neighborhood.
2. Identifying physical/functional equity adjustments (e.g. foundations, outdated interiors).
3. Submitting full evidentiary packages for formal or informal ARB hearings.
On average, protesting can shave 5% to 15% off your commercial or residential tax appraisals! Let me know if you would like me to help calculate your potential property tax protest savings.`;
  }
  
  if (msg.includes("vat") || msg.includes("value added tax") || msg.includes("sales tax")) {
    return `VAT and Sales tax are critical concerns for US companies selling globally (to EU/UK) and foreign entities entering the US market. 
Shafiq Hasan CPA specializes in:
- US Sales and Use Tax compliance, nexus determinations (Wayfair rule), and county-level filings.
- European & UK VAT compliance for American e-commerce sellers including registered Agent representation, VAT OSS filings, and import VAT recovery.
Would you like to discuss setting up sales tax calculation systems such as Avalara or TaxJar in your business?`;
  }

  if (msg.includes("quickbooks") || msg.includes("qb")) {
    return `QuickBooks is the lifeblood of business bookkeeping, but complex setups can cause massive headaches. 
As Certified QuickBooks ProAdvisors, we help with:
- Custom Chart of Accounts mapping.
- Bank feed reconciliation and cleaning up duplicate historical transactions.
- Class and Location tracking for multiunit businesses.
- Payroll and 1099 filings integration.
Let us take the stress out of your books! You can schedule a free QuickBooks cleanup evaluation directly through our consultation tool above.`;
  }

  if (msg.includes("individual") || msg.includes("personal") || msg.includes("income tax") || msg.includes("irs")) {
    return `Personal income tax filing shouldn't be a generic exercise. For individuals (especially business owners, executives, and dual-status residents in Texas), we optimize:
- Schedule C optimizations for 1099 independent contractors.
- Itemized deductions including real estate investments and mortgage interest.
- High-net-worth tax shielding and IRA/401(k) structuring before the December 31st deadline.
We file directly with the IRS electronically, ensuring maximum accuracy and fast refunds.`;
  }

  if (msg.includes("business") || msg.includes("corporate") || msg.includes("incorporate") || msg.includes("s-corp")) {
    return `Choosing the right entity (LLC, S-Corp, C-Corp, or Partnership) can save thousands in self-employment taxes. 
We provide comprehensive corporate accounting, including Form 1120-S, Form 1065, Texas Franchise Tax reports, and VAT-equivalent state taxes. 
If your business is making more than $60,000 in net profit, structure optimization like filing an S-Corp election can reduce self-employment tax by up to 15.3% on distributions!`;
  }
  
  if (msg.includes("cost") || msg.includes("price") || msg.includes("fee") || msg.includes("free")) {
    return `We believe in transparent, affordable, and value-based pricing. 
- **Free Initital Consultation**: We offer a 15-minute phone or Zoom consultation completely free!
- **Tax Protests & VAT Advisory**: Customizable depending on scale.
- **Bookkeeping & QuickBooks Cleanups**: Pricing depends on transaction volume and past accounts state.
Please submit the contact form with your specific project size, and we will get back to you within 2 hour business time!`;
  }

  return `Thank you for reaching out to Shafiq Hasan CPA PLLC. Under the leadership of Shafiq Hasan, our Richardson, Dallas team is trained to deliver state-of-the-art accounting. 
I can help guide you on:
- Individual and Corporate Income Tax (Form 1040, 1120S)
- Local Texas Real Estate Property Tax Appraisals & Protesting
- European VAT registration and USA Multi-State Sales Tax Nexus Compliance
- QuickBooks cleanup, bank reconciliation, and accounting strategy

How can we help your business or personal wealth grow today? (You can also type 'Protest', 'VAT', or 'QuickBooks' for specialized insights!)`;
}

// API: AI Chatbot Proxy using server-side Gemini
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
  }

  // Get the latest message
  const userMessage = messages[messages.length - 1]?.content || "";
  
  const aiClient = getGeminiClient();
  if (!aiClient) {
    // If key of Gemini is offline or mock, return rule-based helpful response instantly
    const textResponse = getRuleBasedResponse(userMessage);
    return res.json({
      role: "assistant",
      content: textResponse,
      isMock: true,
    });
  }

  try {
    // Build context history
    const contextHistory = messages.map(m => {
      return `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`;
    }).join("\n");

    const prompt = `
System Context:
You are the interactive AI Tax Assistant representing Shafiq Hasan CPA PLLC, an elite Certified Public Accountant firm based in Richardson (Dallas), Texas.
The lead CPA is Mr. Shafiq Hasan. We serve companies and individuals in America and internationally, specialized in:
1. Individual and Business Tax Solutions (IRS forms, deductions, S-Corp filing optimizations).
2. Texas Property Tax evaluation and protesting (reducing high appraisal values).
3. United States Multi-State Sales Tax Nexus compliance & European VAT/import accounting for companies.
4. QuickBooks Setup, Reconciliation, and general Advisory.

Instructions:
- Provide highly professional, mathematically precise, confident, and warm advisory insights.
- Restrict your focus entirely to professional CPA tax advice, business consultations, Dallas local market context, and services of Shafiq Hasan CPA.
- Keep responses concise, clear, and action-oriented. Suggest using our calculator, booking a call, or filling our contact form.
- Sound like an expert tax consultant from Texas. Helpful and extremely clean.

Conversation Context:
${contextHistory}

Assistant:`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const botReply = response.text || "I was unable to formulate a response. How else may I assist you with your tax filing?";

    res.json({
      role: "assistant",
      content: botReply,
      isMock: false,
    });
  } catch (error: any) {
    console.error("Gemini API Error in backend proxy:", error);
    // Robust graceful fallback
    const ruleBased = getRuleBasedResponse(userMessage);
    res.json({
      role: "assistant",
      content: `${ruleBased}\n\n*(Note: Running in high-reliability advisory fallback mode)*`,
      error: error?.message || "Internal GenAI error proxying.",
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CPA Server is running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer();
