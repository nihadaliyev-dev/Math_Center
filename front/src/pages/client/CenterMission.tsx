import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Target, Sparkles, Users, Globe, BookOpen } from "lucide-react";

const CenterMission = () => {
  const { t } = useTranslation();

  const goals = [
    {
      icon: Target,
      text: t(
        "Riyaziyyatın nəzəri və tətbiqi sahələrində mükəmməlliyi təşviq etmək."
      ),
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      text: t(
        "Riyaziyyatın digər elmi, texnoloji və mühəndislik fənləri ilə birləşdirən multidissiplinar əməkdaşlığa dəstək olmaq."
      ),
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Globe,
      text: t(
        "Azərbaycanın elmi icmasının tədqiqat potensialını gücləndirmək və qlobal tədqiqat şəbəkəsi ilə güclü əlaqələr qurmaq."
      ),
      color: "from-green-500 to-teal-600",
    },
    {
      icon: BookOpen,
      text: t(
        "Tədqiqatçıların peşəkar inkişafına dəstək olmaq və əməkdaşlıq təşəbbüsləri, seminarlar və akademik proqramlar vasitəsilə bilik mübadiləsini asanlaşdırmaq."
      ),
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">{t("Missiya")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("Laboratoriyanın Missiyası")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t(
                "Fundamental və multidissiplinar riyaziyyat tədqiqatlarının inkişafı"
              )}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Introduction */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("Haqqımızda")}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t(
                      "2024-cü ildə təsis edilmiş Riyaziyyat Tədqiqat Lab (MRL), fundamental və multidissiplinar riyaziyyat tədqiqatlarının inkişafına həsr olunmuş aparıcı tədqiqat institutudur. Missiyamız, riyaziyyatı müxtəlif sahələrlə əlaqələndirərək yeniliyi təşviq etmək, tədqiqatçılar arasında riyazi bacarıqları inkişaf etdirmək və riyaziyyat elmlərində qabaqcıl tədqiqatların inkişafına dəstək olmaqdır."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Goals Section */}
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("BIMS aşağıdakı məqsədləri həyata keçirir:")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal, index) => (
                <AnimatedSection
                  key={index}
                  animation="scale-up"
                  delay={index * 100}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover-lift h-full">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <goal.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{goal.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Partnership Section */}
          <AnimatedSection animation="fade-up">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("Əməkdaşlıq")}</h2>
                  <p className="text-lg text-blue-50 leading-relaxed">
                    {t(
                      "İnstitut, Azərbaycan Dövlət Neft və Sənaye Universitetinin (ADNSU) Tədqiqat, İnkişaf və İnnovasiya üzrə Mükəmməllik Mərkəzinin (TIIMM) nəzdində yerləşən Rəqəmsal Tədqiqat Laboratoriyasının (DRL) ayrılmaz bir hissəsidir və universitetin tədqiqatlarının inkişafı, o cümlədən beynəlxalq elmi əməkdaşlığı təşviq etmək öhdəliyində mühüm rol oynayır."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default CenterMission;
