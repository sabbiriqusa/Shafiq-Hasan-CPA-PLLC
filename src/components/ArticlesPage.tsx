import React from "react";
import { motion } from "motion/react";
import { Search, ArrowUpRight } from "lucide-react";
import { blogPostsData } from "../data";
import { BlogPost } from "../types";

interface ArticlesPageProps {
  key?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedBlogDetail: (post: BlogPost | null) => void;
}

export default function ArticlesPage({ searchQuery, setSearchQuery, setSelectedBlogDetail }: ArticlesPageProps) {
  
  const filteredBlogs = blogPostsData.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="view-articles"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b2512] bg-[#a3e635]/15 px-3.5 py-1.5 rounded-full border border-emerald-100 font-mono">
          Certified technical Publications & updates
        </span>
        <h1 className="text-3xl font-display font-extrabold text-[#0b2512] tracking-tight">
          When Tax Knowledge is super power
        </h1>
        <p className="max-w-2xl mx-auto text-xs text-gray-500 font-normal leading-relaxed">
          Read our technical research guides covering Dallas property appraisals deadlines, IRS distributions protocols, and international VAT thresholds.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-150 rounded-2xl py-3 px-4 shadow-sm max-w-xl mx-auto mb-16 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter articles content..."
          className="w-full text-xs text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
        />
      </div>

      {/* Blogs list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-150 hover:border-emerald-800/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="h-48 relative overflow-hidden bg-gray-50 shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0b2512] text-[#a3e635] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#a3e635]/20 font-mono">
                {post.readTime}
              </div>
            </div>

            <div className="p-6 flex-1 space-y-3.5 text-left">
              <h3 className="text-base font-display font-bold text-gray-905 group-hover:text-emerald-800 transition-all leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-3">
                {post.content}
              </p>
            </div>

            <div className="p-6 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7.5 h-7.5 bg-[#0b2512] text-[10px] text-white flex items-center justify-center rounded-full font-bold">
                  SH
                </div>
                <div className="text-left">
                  <h5 className="text-[11px] font-bold text-gray-900 leading-tight">{post.author}</h5>
                  <p className="text-[9px] text-gray-400 leading-none">{post.authorRole} · {post.date}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBlogDetail(post)}
                className="text-[10px] font-bold bg-[#0b2512] text-[#a3e635] px-3 py-1.5 rounded-lg hover:underline cursor-pointer flex items-center gap-0.5"
              >
                Read Post <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400 text-xs block bg-gray-50 rounded-3xl border border-dashed border-gray-250">
            No matching technical articles found.
          </div>
        )}
      </div>
    </motion.div>
  );
}
