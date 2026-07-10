import React from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, ExternalLink, ChevronRight, CheckCircle2 } from "lucide-react";

interface QueryItem {
  id: string;
  email: string;
  message: string;
  timestamp: string;
}

interface ContactPageProps {
  key?: string;
  contactEmail: string;
  setContactEmail: (email: string) => void;
  contactPhone: string;
  setContactPhone: (phone: string) => void;
  contactMessage: string;
  setContactMessage: (msg: string) => void;
  contactSuccessMsg: string;
  submittingContact: boolean;
  submittedQueries: QueryItem[];
  handleContactSubmit: (e: React.FormEvent) => void;
}

export default function ContactPage({
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  contactMessage,
  setContactMessage,
  contactSuccessMsg,
  submittingContact,
  submittedQueries,
  handleContactSubmit
}: ContactPageProps) {
  return (
    <motion.div
      key="view-contact"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/20 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          📍 Richardson office quarters
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
          Get in Touch with our Certified Public Board
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-550 leading-relaxed font-normal">
          Submit active filings paperwork schedules, S-Corp diagnostic summaries, or physical property letters directly for immediate assessment previews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left coordinates and Vector map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="block space-y-4">
            <h3 className="text-lg font-bold text-gray-955 font-display">Richardson HQ Direct Channels:</h3>
            <p className="text-xs text-gray-500 font-normal leading-relaxed">Our physical audit desks are open on Central Standard hours (CST) Monday to Friday.</p>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
              <Mail className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono text-[9px]">Business Support Desk:</h4>
                <a href="mailto:info@shafiqhasancpa.com" className="font-semibold text-emerald-800 hover:underline block text-xs mt-1">
                  info@shafiqhasancpa.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
              <MapPin className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono text-[9px]">Come Say Hello:</h4>
                <p className="font-semibold text-gray-900 text-xs mt-1 leading-normal">
                  2650 11th Ave, Richardson, Dallas, TX 75080
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-150 rounded-2xl hover:bg-gray-50/50 transition-all">
              <Phone className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest font-mono text-[9px]">Direct Telephone Dial:</h4>
                <a href="tel:214-256-4111" className="font-semibold text-emerald-800 hover:underline block text-xs mt-1">
                  214-256-4111
                </a>
              </div>
            </div>
          </div>

          {/* GPS Coordinates Plate */}
          <div className="bg-[#0b2512] rounded-3xl overflow-hidden p-6 text-white border border-[#a3e635]/15 shadow-2xl relative min-h-[300px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage: `radial-gradient(circle, #a3e635 1px, transparent 1px)`,
                backgroundSize: "16px 16px"
              }}
            />
            <div>
              <span className="text-[#a3e635] text-[10px] font-bold font-mono tracking-widest uppercase block mb-1">GPS Richardson Center</span>
              <h3 className="text-base font-bold font-display">TCAD Assessment Zone</h3>
              <p className="text-[11px] text-zinc-350 font-normal">County District Precinct 4</p>
            </div>
            
            <div className="my-4 relative overflow-hidden rounded-2xl border border-white/10 h-[220px] w-full bg-emerald-950/40">
              <iframe
                title="Richardson HQ Office Location Map"
                src="https://maps.google.com/maps?q=2650%2011th%20Ave,%20Richardson,%20Dallas,%20TX%2075080&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between z-10 pt-3 border-t border-white/10 text-xs">
              <span className="text-[10px] text-zinc-400 max-w-[180px] leading-tight font-normal">Opposite Richardson Civic Circle.</span>
              <a 
                href="https://maps.google.com/?q=2650+11th+Ave,+Richardson,+Dallas,+TX+75080"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-[10px] py-1.5 px-4.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                Open Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right input forms */}
        <div className="lg:col-span-7 bg-[#a3e635] text-emerald-950 p-6 sm:p-8 rounded-[40px] shadow-xl flex flex-col justify-between border-2 border-[#a3e635] relative">
          <div className="block space-y-6">
            <div>
              <h3 className="text-xl font-display font-extrabold text-emerald-950">
                Have you got something in your mind?
              </h3>
              <p className="text-xs text-[#06180b]/80 leading-normal font-normal">
                Provide your verified email and tax details. Our senior CPAs will review valuation adjustments and email assessments inside 2 hours.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs text-left">
              <div>
                <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2 font-mono">
                  Your business email address:
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="ex - abc@gmail.com"
                  className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 px-4 py-3 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2 font-mono">
                  Direct phone number (optional):
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="ex - (555) 555-1234"
                  className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 px-4 py-3 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0b2512] uppercase tracking-wider mb-2 font-mono">
                  Describe your tax or consultation request:
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Please note business size, entity status or property location..."
                  className="w-full bg-white/70 hover:bg-white focus:bg-white text-emerald-950 p-4 rounded-xl focus:outline-none border border-transparent focus:border-emerald-950 transition-all placeholder-[#0b2512]/60 resize-none leading-relaxed font-semibold animate-none"
                />
              </div>

              {contactSuccessMsg && (
                <div className="p-3 bg-emerald-950 text-white rounded-xl font-bold flex items-center gap-1.5 animate-pulse text-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                  <span>{contactSuccessMsg}</span>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center sm:flex-row flex-col gap-4">
                <span className="text-[10px] text-emerald-950/70 font-semibold">
                  🔒 Secured AES 256 data standards
                </span>
                <button
                  id="btn-contact-query-submit"
                  type="submit"
                  disabled={submittingContact}
                  className="bg-emerald-950 hover:bg-black text-[#a3e635] font-bold px-7 py-3 rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
                >
                  {submittingContact ? "Submitting..." : "Submit Query"}{" "}
                  <ChevronRight className="w-4 h-4 text-[#a3e635]" />
                </button>
              </div>
            </form>

            {/* Inquiries list */}
            {submittedQueries.length > 0 && (
              <div className="border-t border-emerald-950/15 pt-5 block text-left">
                <span className="text-[10px] font-bold uppercase text-[#0b2512] block tracking-wider mb-2.5 font-mono">
                  Your active support registrations:
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {submittedQueries.map((q) => (
                    <div key={q.id} className="p-2.5 bg-emerald-950/5 border border-emerald-950/10 rounded-xl flex justify-between items-center text-[10px]">
                      <div>
                        <span className="font-bold text-[#06180b]">{q.email}</span>
                        <p className="text-emerald-950/80 truncate max-w-xs font-light italic mt-0.5">&quot;{q.message}&quot;</p>
                      </div>
                      <span className="bg-emerald-950 text-[#a3e635] py-0.5 px-2 rounded-full font-bold uppercase tracking-wider text-[8px] block shrink-0">
                        Transmitted
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
