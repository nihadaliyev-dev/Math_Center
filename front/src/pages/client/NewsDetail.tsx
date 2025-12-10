import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import type { News } from "@/types/newsType";
import { useEffect, useState } from "react";
import { Endpoints } from "@/enums/endpoints";
import { getAll, getOne } from "@/services/commonRequest";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  TrendingUp,
  User,
  Tag,
} from "lucide-react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { API_BASE_URL } from "@/services/api";

// Add MathJax script for LaTeX rendering
declare global {
  interface Window {
    MathJax: any;
  }
}

const NewsDetail: React.FC = () => {
  const [news, setNews] = useState<News | null>(null);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts or ID changes
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchNews = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const resp = await getOne<News>(Endpoints.news, id);
        console.log("News data received:", resp);
        console.log("News content:", resp?.content);
        setNews(resp);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news details");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Load MathJax for LaTeX rendering
  useEffect(() => {
    // Check if MathJax is already loaded
    if (!window.MathJax) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      script.id = "MathJax-script";
      
      // Configure MathJax before loading
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
          processEnvironments: true
        },
        options: {
          ignoreHtmlClass: 'news-content',
          processHtmlClass: 'math-content'
        }
      };
      
      document.head.appendChild(script);

      script.onload = () => {
        if (window.MathJax) {
          window.MathJax.typesetPromise?.();
        }
      };
    } else {
      // Re-render MathJax when content changes
      setTimeout(() => {
        if (window.MathJax) {
          window.MathJax.typesetPromise?.();
        }
      }, 100);
    }
  }, [news]);

  // Scroll to top when navigating between news articles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    getAll<{ news: News[] }>(Endpoints.news)
      .then((resp) => {
        setAllNews(resp.news || []);
      })
      .catch((error) => {
        console.error("Error fetching all news:", error);
      });
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNavigateToNews = (newsId: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/xeberler/${newsId}`);
  };

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

  // Format content with proper HTML handling and line breaks
  const formatContent = (content: string | undefined | null) => {
    // Handle empty or null content
    if (!content || typeof content !== "string") {
      return "<p class='text-gray-500 italic'>No content available</p>";
    }
    
    const trimmedContent = content.trim();
    if (trimmedContent === "") {
      return "<p class='text-gray-500 italic'>No content available</p>";
    }
    
    // Escape HTML to prevent XSS attacks, but preserve structure
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    let formatted = trimmedContent;
    
    // Escape HTML content
    formatted = escapeHtml(formatted);
    
    // Convert line breaks to <br /> tags
    formatted = formatted.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    formatted = formatted.replace(/\n/g, "<br />");
    
    // Split into paragraphs (double line breaks or more)
    const paragraphs = formatted.split(/(<br \/>\s*){2,}/);
    
    // Wrap each paragraph in <p> tags and join
    const wrappedParagraphs = paragraphs
      .map((para) => {
        const cleaned = para.trim();
        if (!cleaned || cleaned === "") return "";
        // Remove trailing breaks from each paragraph
        return `<p>${cleaned.replace(/(<br \/>)+$/, "").replace(/^(<br \/>)+/, "")}</p>`;
      })
      .filter((p) => p !== "")
      .join("");
    
    return wrappedParagraphs || "<p>No content available</p>";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0D1F4F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "News not found"}</p>
          <Button
            onClick={() => navigate("/xeberler")}
            className="bg-[#0D1F4F]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  // Safely get title based on current language with fallbacks
  const getTitle = () => {
    if (!news?.title) return "Untitled";
    
    // If title is a string, return it directly
    if (typeof news.title === "string") {
      return news.title;
    }
    
    // If title is an object with language keys
    if (typeof news.title === "object") {
      const currentLang = i18n.language || "az";
      const langKey = currentLang.startsWith("az") ? "az" : currentLang.startsWith("en") ? "en" : "az";
      
      // Try current language first
      if (news.title[langKey as keyof typeof news.title]) {
        return news.title[langKey as keyof typeof news.title] as string;
      }
      
      // Fallback to az
      if (news.title.az) {
        return news.title.az;
      }
      
      // Fallback to en
      if (news.title.en) {
        return news.title.en;
      }
      
      // Fallback to first available value
      const firstKey = Object.keys(news.title)[0];
      if (firstKey && news.title[firstKey as keyof typeof news.title]) {
        return news.title[firstKey as keyof typeof news.title] as string;
      }
    }
    
    return "Untitled";
  };

  const title = getTitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            onClick={() => navigate("/xeberler")}
            variant="outline"
            className="border-2 border-gray-200 hover:border-[#0D1F4F] hover:bg-blue-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("butun_xeberlere_bax")}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-up">
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Cover Image */}
                <div className="relative h-[400px] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  <img
                    src={getImageUrl(news.coverImage)}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/mathematics_research_lab_logo.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(news.createdAt ?? Date.now())}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(news.createdAt ?? Date.now())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    {news.author && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {news.author}
                        </span>
                      </div>
                    )}
                    {news.category && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {news.category}
                      </span>
                    )}
                    {news.status && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          news.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : news.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {news.status}
                      </span>
                    )}
                  </div>

                  {/* Share Button */}
                  <div className="flex items-center justify-end mb-6">
                    <Button
                      variant="outline"
                      className="border-2 border-gray-200 hover:border-[#0D1F4F] hover:bg-blue-50"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: title,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Article Content */}
                  <div className="mb-8">
                    <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                      <div
                        className="news-content math-content prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: formatContent(news.content),
                        }}
                        style={{ minHeight: "50px" }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  {news.tags && news.tags.length > 0 && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-gray-400" />
                        {news.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </AnimatedSection>
          </div>

          {/* Sidebar - Latest News */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="slide-left">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
                <div className="bg-gradient-to-br from-[#0D1F4F] to-[#2d4478] text-white p-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {t("son_xeberler")}
                  </h2>
                </div>

                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {allNews.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => item.id && handleNavigateToNews(item.id)}
                      className="p-4 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex gap-3">
                        {item.coverImage && (
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={getImageUrl(item.coverImage)}
                              alt={
                                item.title && typeof item.title === "object"
                                  ? (item.title[i18n.language as keyof typeof item.title] as string) || item.title.az || item.title.en || "News"
                                  : typeof item.title === "string"
                                  ? item.title
                                  : "News"
                              }
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "/mathematics_research_lab_logo.jpg";
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 group-hover:text-[#0D1F4F] transition-colors line-clamp-2 mb-2 text-sm">
                            {item.title && typeof item.title === "object"
                              ? (item.title[i18n.language as keyof typeof item.title] as string) || item.title.az || item.title.en || "Untitled"
                              : typeof item.title === "string"
                              ? item.title
                              : "Untitled"}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatDate(item.createdAt ?? Date.now())}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
