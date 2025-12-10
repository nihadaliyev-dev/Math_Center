import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Endpoints } from "@/enums/endpoints";
import { getAll } from "@/services/commonRequest";
import type { Advertisement } from "@/types/advertisementType";
import type { News } from "@/types/newsType";
import {
  MousePointer,
  Sparkles,
  TrendingUp,
  Bell,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NewsCard from "@/components/client/NewsCard";
import { NewsGridSkeleton } from "@/components/ui/LoadingSkeleton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ParticleBackground from "@/components/ui/ParticleBackground";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [seminars, setSeminars] = useState<News[]>([]);
  const [announcements, setAnnouncements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [newsData, adsData] = await Promise.all([
          getAll<{ news: News[] }>(Endpoints.news).catch(() => ({ news: [] })),
          getAll<{ advertisements: Advertisement[] }>(
            Endpoints.advertisements
          ).catch(() => ({ advertisements: [] })),
        ]);

        setSeminars(newsData.news || []);
        setAnnouncements((adsData.advertisements || []).reverse());
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleDateString(i18n.language, { month: "short" });
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
  };

  const menuItems = [
    {
      label: "xos_gelmisiniz",
      link: "/haqqimizda/xos-gelmisiniz",
      icon: Sparkles,
    },
    {
      label: "merkezin_missiyasi",
      link: "/haqqimizda/merkezin-missiyasi",
      icon: TrendingUp,
    },
    {
      label: "Elmi Məsləhət şurası",
      link: "/haqqimizda/elmi-meslehet-surasi",
      icon: MousePointer,
    },
    {
      label: "Tədqiqat Proqramları",
      link: "/elmi-fealiyyet/tedqiqat-proqramlari",
      icon: MousePointer,
    },
    { label: "Müraciət", link: "/haqqimizda/muraciet", icon: MousePointer },
    { label: "elaqe", link: "/elaqe", icon: MousePointer },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Section with Particles */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] animate-gradient">
        <ParticleBackground particleCount={60} />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4 py-16">
          <div className="text-center text-white animate-scale-in">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <span className="text-sm font-medium text-white/90">
                Welcome to
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                MATHEMATICS
              </span>
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 opacity-95">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
                RESEARCH CENTER
              </span>
            </h2>

            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t(
                "Advancing mathematical knowledge through cutting-edge research and collaboration"
              )}
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to={"/haqqimizda/merkezin-missiyasi"}>
                <Button className="bg-white text-[#0D1F4F] hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("daha_cox")}
                </Button>
              </Link>
              <Link to={"/elaqe"}>
                <Button
                  variant="outline"
                  className="border-2 border-white/70 text-[#0D1F4F] hover:bg-white/2 hover:text-white/70 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-xl hover:border-white transition-all duration-300"
                >
                  {t("elaqe")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Quick Links Sidebar */}
        <AnimatedSection animation="slide-right" className="lg:col-span-1">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm sticky top-24">
            <CardHeader className="bg-gradient-to-br from-[#0D1F4F] to-[#2d4478] text-white p-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MousePointer className="w-5 h-5" />
                {t("haqqimizda")}
              </h3>
            </CardHeader>
            <CardContent className="p-0">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group block border-b border-gray-100 last:border-b-0"
                >
                  <div className="px-6 py-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#0D1F4F] transition-colors">
                      {t(`${item.label}`)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0D1F4F] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* News Section */}
        <AnimatedSection animation="fade-up" className="lg:col-span-2">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#0D1F4F]" />
                  {t("xeberler")}
                </h2>
                <Link
                  to={"/xeberler"}
                  className="text-sm text-[#0D1F4F] hover:text-blue-600 font-semibold flex items-center gap-1 group"
                >
                  {t("butun_xeberler")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 rounded-2xl h-80 animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-[#0D1F4F]"
                  >
                    Retry
                  </Button>
                </div>
              ) : seminars.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No news available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {seminars.slice(0, 4).map((seminar, index) => (
                    <div
                      key={seminar.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="animate-slide-up"
                    >
                      <NewsCard
                        id={seminar.id}
                        coverImage={seminar.coverImage}
                        title={seminar.title}
                        createdAt={seminar.createdAt ?? Date.now()}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Announcements Section */}
        <AnimatedSection animation="slide-left" className="lg:col-span-1">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm sticky top-24">
            <CardHeader className="bg-gradient-to-br from-[#0D1F4F] to-[#2d4478] text-white p-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t("elanlar")}
              </h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    </div>
                  ))
                ) : announcements.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No announcements</p>
                  </div>
                ) : (
                  announcements.slice(0, 6).map((announcement, index) => (
                    <Link
                      key={announcement.id}
                      to={`/elanlar/${announcement.id}`}
                      className="block group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center rounded-full bg-blue-100 text-[#0D1F4F] px-2.5 py-1 text-xs font-semibold">
                              {formatDate(announcement.createdAt ?? Date.now())}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 group-hover:text-[#0D1F4F] transition-colors">
                            {
                              announcement.title[
                                i18n.language as keyof typeof announcement.title
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
            {!loading && announcements.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Link to={"/elanlar"} className="block">
                  <Button className="w-full bg-[#0D1F4F] hover:bg-[#1a2d5f] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                    {t("butun_elanlar")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;
