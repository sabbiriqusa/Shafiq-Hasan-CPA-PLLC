import React, { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp, Search, Pin, MessageSquare } from "lucide-react";
import { googleReviewsData } from "../data";
import { GoogleReview } from "../types";

export default function FloatingGoogleReviews() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false); // Keeps the window unfolded/pinned
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");

  const filteredReviews = useMemo(() => {
    return googleReviewsData.filter((r) => {
      const matchesSearch =
        r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.serviceTag.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === "all" || r.rating === ratingFilter;
      return matchesSearch && matchesRating;
    });
  }, [searchTerm, ratingFilter]);

  // Handle clicking outside to auto-close ONLY if not pinned
  React.useEffect(() => {
    if (!isOpen || isPinned) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#floating-google-reviews-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, isPinned]);

  return (
    <div 
      id="floating-google-reviews-container" 
      className="fixed bottom-6 left-6 z-50 font-sans"
    >
      {/* 1. Extended Detailed Window */}
      {(isOpen || isPinned) && (
        <div className="absolute bottom-16 left-0 w-[360px] sm:w-[380px] max-w-[calc(100vw-2.5rem)] bg-white dark:bg-[#0c152a] rounded-[24px] border border-gray-200 dark:border-slate-800 shadow-[0_12px_45px_rgba(0,0,0,0.15)] p-4 flex flex-col gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header row in screenshot: Google initial/logo, Rating, counts and chevron */}
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              {/* Distinctive multicolored Google G logo */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0 select-none">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-gray-900 dark:text-white leading-none">4.9</span>
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-transparent" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] tracking-wider text-gray-400 dark:text-zinc-500 font-extrabold uppercase block mt-0.5">
                  50 Verified Clients Reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Keep Unfolded Pin Button */}
              <button 
                onClick={() => setIsPinned(!isPinned)}
                className={`p-1.5 rounded-lg transition-all border ${
                  isPinned 
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                    : "text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-slate-800 border-transparent"
                }`}
                title={isPinned ? "Click to unpin (will auto-hide on click outside)" : "Click to pin open on website"}
              >
                <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-amber-500" : ""}`} />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPinned(false);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="Collapse reviews window"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inline Live Search and Stars Select Filters */}
          <div className="space-y-2 py-0.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Client Reviews (e.g. audit, tax)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-900/60 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 max-w-full custom-scrollbar">
              <button
                onClick={() => setRatingFilter("all")}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-md shrink-0 transition-all ${
                  ratingFilter === "all"
                    ? "bg-[#0ea5e9] text-white"
                    : "bg-gray-100 dark:bg-slate-800 dark:text-slate-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-slate-750"
                }`}
              >
                All ({googleReviewsData.length})
              </button>
              <button
                onClick={() => setRatingFilter(5)}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-md shrink-0 transition-all ${
                  ratingFilter === 5
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-slate-800 dark:text-slate-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                5 ⭐ ({googleReviewsData.filter(r => r.rating === 5).length})
              </button>
              <button
                onClick={() => setRatingFilter(4)}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-md shrink-0 transition-all ${
                  ratingFilter === 4
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-slate-800 dark:text-slate-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                4 ⭐ ({googleReviewsData.filter(r => r.rating === 4).length})
              </button>
              <button
                onClick={() => setRatingFilter(3)}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-md shrink-0 transition-all ${
                  ratingFilter === 3
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-slate-800 dark:text-slate-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                3 ⭐ ({googleReviewsData.filter(r => r.rating === 3).length})
              </button>
            </div>
          </div>

          {/* Reviews Scrolling Area as shown in screenshot */}
          <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1 custom-scrollbar text-left">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-gray-400 font-semibold">No reviews matching specifications.</p>
                <p className="text-[10px] text-gray-500">Try modifying your query.</p>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800/60 rounded-xl hover:border-sky-400/30 dark:hover:border-sky-900/30 transition-all relative group"
                >
                  {/* Row headers */}
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-slate-800 text-[#0284c7] dark:text-sky-300 font-bold text-[9px] flex items-center justify-center select-none shrink-0 uppercase">
                        {rev.avatarChar}
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">
                          {rev.author}
                        </h4>
                        <span className="text-[8px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                          {rev.serviceTag}
                        </span>
                      </div>
                    </div>

                    {/* Google G stamp on review */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-transparent" />
                        ))}
                      </div>
                      <span className="text-[8px] text-gray-400 dark:text-zinc-500 font-medium block mt-0.5">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal italic pr-4">
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  <div className="absolute bottom-2.5 right-2.5 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-50 dark:bg-slate-900/60 p-2 rounded-xl text-center border border-gray-100 dark:border-slate-800">
            <span className="text-[8px] sm:text-[9px] text-[#38bdf8] font-black uppercase tracking-wider block">
              ⭐ Premium accounting solutions registered & corporate tax plc
            </span>
          </div>
        </div>
      )}

      {/* 2. Floating Pill Button on the left side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white dark:bg-[#0c152a] text-gray-900 dark:text-white py-2.5 px-4 rounded-full shadow-2xl focus:outline-none border border-gray-150 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 cursor-pointer transition-all hover:scale-105 active:scale-95 text-xs font-extrabold"
        title="Check public reviews"
      >
        <span className="w-5 h-5 bg-white dark:bg-transparent rounded-full flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </span>
        <span className="font-extrabold tracking-tight">Google Reviews</span>
        
        {isOpen || isPinned ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        )}
      </button>
    </div>
  );
}
