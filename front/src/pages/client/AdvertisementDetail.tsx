import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getAll, getOne } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";
import { ArrowLeft, Calendar, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { Advertisement } from "@/types/advertisementType";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";

const AdvertisementDetail: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [allAdvertisements, setAllAdvertisements] = useState<Advertisement[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchAdvertisement = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const resp = await getOne<Advertisement>(Endpoints.advertisements, id);
        setAdvertisement(resp);
      } catch (error) {
        console.error("Error fetching advertisement:", error);
        setError("Failed to load advertisement details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisement();
  }, [id]);

  useEffect(() => {
    getAll<{ advertisements: Advertisement[] }>(Endpoints.advertisements)
      .then((resp) => {
        setAllAdvertisements(resp.advertisements.reverse());
      })
      .catch((error) => {
        console.error("Error fetching all advertisements:", error);
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

  const handleNavigateToAdvertisement = (adId: string) => {
    navigate(`/elanlar/${adId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0D1F4F] mx-auto mb-4"></div>
          <p className="text-gray-600">{t("yuklenir")}</p>
        </div>
      </div>
    );
  }

  if (error || !advertisement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Advertisement not found"}
          </p>
          <Button onClick={() => navigate("/elanlar")} className="bg-[#0D1F4F]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("butun_elanlar")}
          </Button>
        </div>
      </div>
    );
  }

  const title =
    advertisement.title[i18n.language as keyof typeof advertisement.title];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Button
          onClick={() => navigate("/elanlar")}
          variant="outline"
          className="border-2 border-gray-200 hover:border-[#0D1F4F] hover:bg-blue-50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("Bütün Elanlara bax")}
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Advertisement Content */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-up">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Title and Date */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    {title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0D1F4F]" />
                      <span>
                        {formatDate(
                          advertisement.createdAt
                            ? advertisement.createdAt
                            : Date.now()
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0D1F4F]" />
                      <span>
                        {formatTime(
                          advertisement.createdAt
                            ? advertisement.createdAt
                            : Date.now()
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                {advertisement.coverImage && (
                  <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={advertisement.coverImage}
                      alt={title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/mathematics_research_lab_logo.jpg";
                      }}
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Latest Advertisements Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="fade-in" delay={200}>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0D1F4F] to-indigo-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {t("son_xeberler")}
                  </h2>
                </div>

                <div className="space-y-4">
                  {allAdvertisements?.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        item.id && handleNavigateToAdvertisement(item.id)
                      }
                      className="group cursor-pointer p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <h3 className="font-semibold text-gray-800 group-hover:text-[#0D1F4F] transition-colors line-clamp-2 mb-2 text-sm">
                        {item.title[i18n.language as keyof typeof item.title]}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(
                          item.createdAt ? item.createdAt : Date.now()
                        )}
                      </p>
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

export default AdvertisementDetail;
