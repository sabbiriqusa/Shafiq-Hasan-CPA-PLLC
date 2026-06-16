import React, { useState, useEffect } from "react";
import { Calendar, Clock, X, Check, Globe, Sliders, ChevronRight, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

interface LocalSavedBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  notes: string;
  createdAt: string;
}

export default function ConsultationWizard({ isOpen, onClose, defaultCategory }: ConsultationWizardProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(defaultCategory || "Dallas appraisal protest");
  const [selectedDate, setSelectedDate] = useState("2026-06-22");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [briefNotes, setBriefNotes] = useState("");
  const [savedBookings, setSavedBookings] = useState<LocalSavedBooking[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const data = localStorage.getItem("shafiq_saved_consultations");
    if (data) {
      setSavedBookings(JSON.parse(data));
    }
  }, []);

  // Reset wizard steps and bind default service on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (defaultCategory) {
        setSelectedService(defaultCategory);
      }
    }
  }, [isOpen, defaultCategory]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newBooking: LocalSavedBooking = {
      id: `bk_${Date.now()}`,
      name,
      email,
      phone,
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedTime,
      notes: briefNotes,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem("shafiq_saved_consultations", JSON.stringify(updated));
    setStep(3); // success view
  };

  const removeBooking = (id: string) => {
    const updated = savedBookings.filter(b => b.id !== id);
    setSavedBookings(updated);
    localStorage.setItem("shafiq_saved_consultations", JSON.stringify(updated));
  };

  const availableServices = [
    "Dallas appraisal protest",
    "S-Corp self-employment tax shields",
    "European VAT / US Sales Tax setup",
    "QuickBooks reconciliation & cleanup",
    "Full-service Personal / Corporate filing"
  ];

  const timeslots = ["09:00 AM", "10:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];
  const dates = ["2026-06-22", "2026-06-23", "2026-06-24", "2026-06-25", "2026-06-26"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-[#0b2512]/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-[#0b2512] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#a3e635]" />
                <div>
                  <h3 className="text-base font-bold">Free Consultation Booking</h3>
                  <p className="text-[10px] text-gray-300">Central Standard Time (Dallas/Richardson)</p>
                </div>
              </div>
              <button
                id="btn-close-wizard-modal"
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Toggle for Registered Bookings */}
            {savedBookings.length > 0 && (
              <div className="bg-lime-50/70 border-b border-gray-150 px-5 py-2.5 flex justify-between items-center text-xs">
                <span className="text-[#0b2512] font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4 text-lime-600" /> You have {savedBookings.length} scheduled consultation(s)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowHistory(!showHistory);
                    setStep(1);
                  }}
                  className="font-bold text-emerald-800 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  {showHistory ? "Back to Scheduler" : "View My Sessions"}
                </button>
              </div>
            )}

            {showHistory ? (
              /* consultation sessions history list */
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                <h4 className="text-sm font-bold text-[#0b2512] mb-3">Your Secured Booking Receipts</h4>
                <div className="space-y-3">
                  {savedBookings.map((b) => (
                    <div key={b.id} className="p-4 border border-gray-150 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-emerald-950 text-[#a3e635] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {b.service}
                          </span>
                          <h5 className="text-xs font-bold text-gray-900 mt-2">{b.name}</h5>
                          <p className="text-[11px] text-gray-500">{b.email} · {b.phone}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBooking(b.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 hover:underline cursor-pointer font-semibold"
                        >
                          Cancel Appointment
                        </button>
                      </div>

                      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-200/60 text-[11px] text-gray-700">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-800" /> {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-800" /> {b.timeSlot} (CST)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* booking calendar wizards stepper */
              <div className="p-6 flex-1 overflow-y-auto">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Step 1 of 2</span>
                      <h4 className="text-sm font-bold text-gray-900 mt-0.5">Select Service Category & Central Date</h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Requested CPA Consultant Specialization
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white text-gray-700 focus:ring-1 focus:ring-emerald-900"
                        >
                          {availableServices.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Dates list */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Select Day in June 2026
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {dates.map((d) => {
                            const dateNum = d.split("-")[2];
                            const isSelected = selectedDate === d;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDate(d)}
                                className={`py-2 px-1 text-center rounded-xl text-xs flex flex-col justify-center items-center cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-[#0b2512] text-[#a3e635] shadow-lg shadow-[#0b2512]/15 font-bold"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                              >
                                <span className="text-[9px] uppercase font-medium">Jun</span>
                                <span className="text-sm">{dateNum}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Select Consultation Time Slot (USA Chicago CST)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeslots.map((t) => {
                            const isSelected = selectedTime === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setSelectedTime(t)}
                                className={`py-2 rounded-xl text-xs text-center cursor-pointer transition-all border ${
                                  isSelected
                                    ? "bg-gradient-to-br from-emerald-900 to-black text-white font-bold border-transparent"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> Sessions are virtual (Zoom or Phone)
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-[#0b2512] hover:bg-[#154622] text-white py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        Profile Details <ChevronRight className="w-4 h-4 text-[#a3e635]" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Step 2 of 2</span>
                      <h4 className="text-sm font-bold text-gray-900 mt-0.5 font-sans">Provide Owner Contact Verification</h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name:</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ex - John Doe"
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0b2512]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Your Personal Email:</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ex - company@gmail.com"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0b2512]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Direct Phone Number:</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="ex - (214) 555-0100"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0b2512]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Brief Description / Notes:</label>
                        <textarea
                          rows={2}
                          value={briefNotes}
                          onChange={(e) => setBriefNotes(e.target.value)}
                          placeholder="Help us review your accounts structure prior to the call..."
                          className="w-full px-3.5 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#0b2512] resize-none"
                        />
                      </div>
                    </div>

                    {/* Summary badge */}
                    <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl block text-[11px] text-gray-700">
                      <div className="flex font-semibold text-gray-900 mb-1 items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-800" /> Summary Proposal:
                      </div>
                      <p>
                        Specialized <span className="font-bold text-emerald-950">{selectedService}</span> on{" "}
                        <span className="font-bold text-emerald-950">{selectedDate}</span> at{" "}
                        <span className="font-bold text-emerald-950">{selectedTime} (Central Time)</span>.
                      </p>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-gray-500 hover:text-gray-700 font-bold text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#0b2512] hover:bg-[#164722] text-[#a3e635] px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/10 cursor-pointer"
                      >
                        Secure Free Spot
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-lime-50 rounded-full flex items-center justify-center mx-auto border border-lime-300">
                      <Check className="w-8 h-8 text-lime-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">Appointment Authorized!</h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
                        Thank you, {name}. A Zoom invitation has been routed to <strong>{email}</strong>. Shafiq Hasan CPA PLLC will review your brief comments.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          onClose();
                        }}
                        className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl py-2 px-6 text-xs font-bold cursor-pointer transition-all"
                      >
                        Awesome, Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
