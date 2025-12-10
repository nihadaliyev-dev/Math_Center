import i18n from "@/i18n/config";
import type { News } from "@/types/newsType";
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/services/api";

const SeminarCard: React.FC<News> = ({ title, coverImage, createdAt, id }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { day, month, time };
  };

  const { day, month, time } = formatDate(createdAt ? createdAt : Date.now());

  // Handle image URL - if it's a relative path, prefix with API_BASE_URL
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "/mathematics_research_lab_logo.jpg";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    if (imageUrl.startsWith("/uploads/")) {
      return `${API_BASE_URL}${imageUrl}`;
    }
    return imageUrl;
  };

  // Safely get title based on current language with fallbacks
  const getTitle = () => {
    if (!title) return "Untitled";
    
    // If title is a string, return it directly
    if (typeof title === "string") {
      return title;
    }
    
    // If title is an object with language keys
    if (typeof title === "object") {
      const currentLang = i18n.language || "az";
      const langKey = currentLang.startsWith("az") ? "az" : currentLang.startsWith("en") ? "en" : "az";
      
      // Try current language first
      if (title[langKey as keyof typeof title]) {
        return title[langKey as keyof typeof title] as string;
      }
      
      // Fallback to az
      if (title.az) {
        return title.az;
      }
      
      // Fallback to en
      if (title.en) {
        return title.en;
      }
      
      // Fallback to first available value
      const firstKey = Object.keys(title)[0];
      if (firstKey && title[firstKey as keyof typeof title]) {
        return title[firstKey as keyof typeof title] as string;
      }
    }
    
    return "Untitled";
  };

  const displayTitle = getTitle();

  return (
    <Link to={`/xeberler/${id}`} className="group block h-full">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover-lift hover-glow h-full flex flex-col shadow-sm">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
          <img
            src={getImageUrl(coverImage)}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/mathematics_research_lab_logo.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Date Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <div className="text-2xl font-bold text-[#0D1F4F] leading-none">
              {day}
            </div>
            <div className="text-xs text-gray-600 uppercase font-semibold mt-1">
              {month}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Time Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{time}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800 leading-snug line-clamp-3 mb-3 flex-1 group-hover:text-[#0D1F4F] transition-colors duration-300">
            {displayTitle}
          </h3>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#0D1F4F] group-hover:gap-3 transition-all duration-300">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#0D1F4F] via-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
};

export default SeminarCard;
