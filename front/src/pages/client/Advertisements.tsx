import React, { useEffect, useState } from "react";
import { CalendarIcon, Search, Bell, RefreshCw, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Advertisement } from "@/types/advertisementType";
import { getAll } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";

const AnnouncementsSection: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState<
    Advertisement[]
  >([]);
  const [visibleAds, setVisibleAds] = useState<Advertisement[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [noAdsOnSelectedDate, setNoAdsOnSelectedDate] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true);
        const resp = await getAll<{ advertisements: Advertisement[] }>(
          Endpoints.advertisements
        );
        const ads = (resp.advertisements || []).reverse();
        setAdvertisements(ads);
        setFilteredAdvertisements(ads);
        setVisibleAds(ads.slice(0, 8));
        setShowMore(ads.length > 8);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setError("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = advertisements.filter((ad) =>
      ad.title[i18n.language as keyof typeof ad.title]
        ?.toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredAdvertisements(filtered);
    setVisibleAds(filtered.slice(0, 8));
    setShowMore(filtered.length > 8);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const filtered = advertisements.filter((ad) => {
        const adDate = new Date(ad.createdAt ?? Date.now());
        return (
          adDate.getDate() === selectedDate.getDate() &&
          adDate.getMonth() === selectedDate.getMonth() &&
          adDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      setNoAdsOnSelectedDate(filtered.length === 0);
      setFilteredAdvertisements(filtered);
      setVisibleAds(filtered.slice(0, 8));
      setShowMore(filtered.length > 8);
    } else {
      setFilteredAdvertisements(advertisements);
      setVisibleAds(advertisements.slice(0, 8));
      setShowMore(advertisements.length > 8);
      setNoAdsOnSelectedDate(false);
    }
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSearchQuery("");
    setFilteredAdvertisements(advertisements);
    setVisibleAds(advertisements.slice(0, 8));
    setShowMore(advertisements.length > 8);
    setNoAdsOnSelectedDate(false);
  };

  const loadMore = () => {
    const nextAds = filteredAdvertisements.slice(
      visibleAds.length,
      visibleAds.length + 8
    );
    setVisibleAds((prev) => [...prev, ...nextAds]);

    if (visibleAds.length + nextAds.length >= filteredAdvertisements.length) {
      setShowMore(false);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/elanlar/${id}`);
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
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Announcements</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t("elanlar")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Stay updated with important announcements and notices from our
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
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1F4F] focus:border-transparent transition-all duration-300 text-gray-700"
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

                {hasActiveFilters && (
                  <Button
                    onClick={handleResetFilters}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-500 hover:text-red-500 rounded-xl px-4 py-3.5"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

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
        <div className="mb-8">
          <AnimatedSection animation="fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {hasActiveFilters
                  ? `${filteredAdvertisements.length} ${t("elanlar")}`
                  : t("butun_elanlar")}
              </h2>
              {!loading && (
                <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                  {filteredAdvertisements.length}{" "}
                  {filteredAdvertisements.length === 1 ? "result" : "results"}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-40 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        )}

        {error && (
          <AnimatedSection animation="scale-up">
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#0D1F4F]"
              >
                Try Again
              </Button>
            </div>
          </AnimatedSection>
        )}

        {noAdsOnSelectedDate && (
          <AnimatedSection animation="scale-up">
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No announcements on this date
              </h3>
              <Button
                onClick={handleResetFilters}
                className="bg-[#0D1F4F] mt-4"
              >
                Clear filters
              </Button>
            </div>
          </AnimatedSection>
        )}

        {!loading && !error && visibleAds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleAds.map((ad, index) => (
              <AnimatedSection
                key={ad.id}
                animation="fade-up"
                delay={index * 50}
              >
                <div
                  onClick={() => ad.id && handleCardClick(ad.id)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover-lift hover-glow cursor-pointer group"
                >
                  <div className="flex">
                    <div className="w-48 h-32 flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                      <img
                        src={ad.coverImage}
                        alt="Announcement"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/mathematics_research_lab_logo.jpg";
                        }}
                      />
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0D1F4F] transition-colors leading-relaxed mb-2">
                        {ad.title[i18n.language as keyof typeof ad.title]}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-blue-50 px-3 py-1.5 rounded-full">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span className="font-medium">
                            {formatDate(ad.createdAt ?? Date.now())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          visibleAds.length === 0 &&
          !noAdsOnSelectedDate && (
            <AnimatedSection animation="scale-up">
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Bell className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Announcements Found
                </h3>
                <p className="text-gray-500">Check back later for updates</p>
              </div>
            </AnimatedSection>
          )}

        {showMore && (
          <AnimatedSection animation="fade-in" className="text-center mt-12">
            <Button
              onClick={loadMore}
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

export default AnnouncementsSection;
