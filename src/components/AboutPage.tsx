import React from "react";
import { motion } from "motion/react";
import { teamMembersData } from "../data";
import { TeamMember } from "../types";

interface AboutPageProps {
  key?: string;
  setSelectedTalentDetail: (member: TeamMember | null) => void;
  triggerScheduler: (category: string) => void;
}

export default function AboutPage({ setSelectedTalentDetail, triggerScheduler }: AboutPageProps) {
  return (
    <motion.div
      key="view-about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          Elite Board Licentiates
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight">
          Meet our Talents Who work for you
        </h1>
        <p className="max-w-xl mx-auto text-xs text-gray-500 font-normal leading-relaxed">
          A highly integrated, local-state credentialed public advisors board designed to shield business cash holdings and secure maximum credits.
        </p>
      </div>

      {/* Master Founder Profile card - Shafiq Hasan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 bg-gradient-to-br from-[#0b2512] to-black text-white rounded-[40px] overflow-hidden shadow-2xl border border-white/5 relative flex flex-col md:flex-row group">
          <div className="md:w-1/2 relative min-h-[350px] md:min-h-full">
            <img
              src={teamMembersData[0].image}
              alt="Shafiq Hasan, CPA Founder"
              className="w-full h-full object-cover group-hover:scale-103 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b2512]/70 z-10 md:hidden"></div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2512] to-transparent h-24 z-10 md:hidden"></div>
          </div>

          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between relative z-20">
            <div className="space-y-4 text-left">
              <span className="text-[#a3e635] text-[10px] uppercase tracking-wider font-bold block font-mono">
                ★ FOUNDER & LICENSED LEAD CPA PARTNER
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {teamMembersData[0].name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Certified Public Accountant in Texas with over 20 years of real corporate accounting negotiations, Dallas County appraisal reduction victories, and international VAT optimization.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {teamMembersData[0].specialties.map((spec, i) => (
                  <span key={i} className="text-[8px] bg-white/10 text-zinc-200 border border-white/5 font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setSelectedTalentDetail(teamMembersData[0])}
                className="w-full sm:w-auto bg-[#a3e635] hover:bg-white text-emerald-950 font-bold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer text-center"
              >
                Read Qualifications Dossier
              </button>
              <button
                onClick={() => triggerScheduler("Shafiq Hasan direct consultation")}
                className="text-xs font-semibold text-zinc-350 hover:text-white block py-2 cursor-pointer"
              >
                Book Primary Meeting Time
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Roster rest of Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembersData.slice(1).map((member) => (
          <div
            key={member.id}
            className="bg-white border border-gray-150 rounded-3xl p-6 hover:shadow-xl hover:border-emerald-800/10 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3.5 text-left">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm shrink-0 bg-gray-50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-gray-950 group-hover:text-emerald-800 transition-all">
                    {member.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{member.role}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed text-left">
                {member.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {member.specialties.map((s, i) => (
                  <span key={i} className="text-[8px] bg-gray-50 text-gray-450 border border-gray-200 font-mono tracking-wide uppercase px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedTalentDetail(member)}
                className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Read Dossier Brief
              </button>
              <button
                onClick={() => triggerScheduler(member.name)}
                className="text-[11px] text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                Schedule Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
