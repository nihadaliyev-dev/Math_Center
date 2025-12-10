import SeminarCard from "@/components/client/NewsCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Endpoints } from "@/enums/endpoints";
import { getAll } from "@/services/commonRequest";
import type { News } from "@/types/newsType";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  RefreshCw,
  Newspaper,
  Filter,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";

const SeminarList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleSeminars, setVisibleSeminars] = useState<News[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [noNewsOnSelectedDate, setNoNewsOnSelectedDate] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await getAll<{ news: News[] }>(Endpoints.news);
        setNews(resp.news || []);
        setFilteredNews(resp.news || []);
        setVisibleSeminars((resp.news || []).slice(0, 8));
        setShowMore((resp.news || []).length > 8);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = news.filter((seminar) =>
      seminar.title[i18n.language as keyof typeof seminar.title]
        ?.toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
    setVisibleSeminars(filtered.slice(0, 8));
    setShowMore(filtered.length > 8);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const filtered = news.filter((seminar) => {
        const seminarDate = new Date(
          seminar.createdAt ? seminar.createdAt : Date.now()
        );
        return (
          seminarDate.getDate() === selectedDate.getDate() &&
          seminarDate.getMonth() === selectedDate.getMonth() &&
          seminarDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      if (filtered.length === 0) {
        setNoNewsOnSelectedDate(true);
      } else {
        setNoNewsOnSelectedDate(false);
      }

      setFilteredNews(filtered);
      setVisibleSeminars(filtered.slice(0, 8));
      setShowMore(filtered.length > 8);
    } else {
      setFilteredNews(news);
      setVisibleSeminars(news.slice(0, 8));
      setShowMore(news.length > 8);
      setNoNewsOnSelectedDate(false);
    }
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSearchQuery("");
    setFilteredNews(news);
    setVisibleSeminars(news.slice(0, 8));
    setShowMore(news.length > 8);
    setNoNewsOnSelectedDate(false);
  };

  const loadMoreSeminars = () => {
    const nextSeminars = filteredNews.slice(
      visibleSeminars.length,
      visibleSeminars.length + 8
    );
    setVisibleSeminars((prev) => [...prev, ...nextSeminars]);

    if (visibleSeminars.length + nextSeminars.length >= filteredNews.length) {
      setShowMore(false);
    }
  };

  const hasActiveFilters = date !== undefined || searchQuery !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Newspaper className="w-5 h-5" />
              <span className="text-sm font-medium">Latest Updates</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t("xeberler")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Stay informed with the latest news and developments from our
              research center
            </p>
          </AnimatedSection>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <AnimatedSection animation="scale-up">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <input
                  type="text"
                  placeholder={t("axtarış")}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1F4F] focus:border-transparent transition-all duration-300 text-gray-700 placeholder:text-gray-400"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Date Picker */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full lg:w-[280px] justify-start text-left font-normal border-2 rounded-xl py-3.5 ${
                        date
                          ? "border-[#0D1F4F] text-[#0D1F4F]"
                          : "border-gray-200 text-gray-500"
                      } hover:border-[#0D1F4F] transition-all duration-300`}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{t("tarix_secin")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl" align="end">
                    <Calendar
                      mode="single"
                      selected={date ?? undefined}
                      onSelect={handleDateChange}
                    />
                  </PopoverContent>
                </Popover>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <Button
                    onClick={handleResetFilters}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-500 hover:text-red-500 rounded-xl px-4 py-3.5 transition-all duration-300"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Active filters:
                </span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-[#0D1F4F] px-3 py-1 rounded-full text-sm font-medium">
                    Search: "{searchQuery}"
                  </span>
                )}
                {date && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-[#0D1F4F] px-3 py-1 rounded-full text-sm font-medium">
                    Date: {format(date, "PPP")}
                  </span>
                )}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <AnimatedSection animation="fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {hasActiveFilters
                  ? `${filteredNews.length} ${t("xeberler")}`
                  : t("butun_xeberler")}
              </h2>
              {!loading && (
                <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                  {filteredNews.length}{" "}
                  {filteredNews.length === 1 ? "result" : "results"}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* No Results Message */}
        {noNewsOnSelectedDate && (
          <AnimatedSection animation="scale-up">
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t("tarixde_xeber_yoxdur")}
              </h3>
              <p className="text-gray-500 mb-6">
                Try selecting a different date
              </p>
              <Button
                onClick={handleResetFilters}
                className="bg-[#0D1F4F] hover:bg-[#1a2d5f]"
              >
                Clear filters
              </Button>
            </div>
          </AnimatedSection>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl h-96 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <AnimatedSection animation="scale-up">
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Error Loading News
              </h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#0D1F4F] hover:bg-[#1a2d5f]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </AnimatedSection>
        )}

        {/* News Grid */}
        {!loading && !error && visibleSeminars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleSeminars.map((seminar, index) => (
              <AnimatedSection
                key={seminar.id}
                animation="fade-up"
                delay={index * 50}
              >
                <SeminarCard
                  id={seminar.id}
                  title={seminar.title}
                  coverImage={seminar.coverImage}
                  createdAt={seminar.createdAt}
                  updatedAt={seminar.updatedAt}
                />
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          visibleSeminars.length === 0 &&
          !noNewsOnSelectedDate && (
            <AnimatedSection animation="scale-up">
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <Newspaper className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No News Found
                </h3>
                <p className="text-gray-500">Check back later for updates</p>
              </div>
            </AnimatedSection>
          )}

        {/* Load More Button */}
        {showMore && (
          <AnimatedSection animation="fade-in" className="text-center mt-12">
            <Button
              onClick={loadMoreSeminars}
              className="bg-[#0D1F4F] hover:bg-[#1a2d5f] text-white px-10 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {t("daha_cox_yukle")}
              <RefreshCw className="w-5 h-5 ml-2" />
            </Button>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default SeminarList;
