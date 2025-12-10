import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Sun, Sparkles, Calendar, Users, BookOpen, Award } from "lucide-react";

const SummerSchool = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Calendar,
      title: t("Zəngin Proqram"),
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Users,
      title: t("Beynəlxalq İştirakçılar"),
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: t("Praktik Təlimlər"),
      color: "from-green-400 to-teal-500",
    },
    {
      icon: Award,
      title: t("Sertifikatlaşdırma"),
      color: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Sun className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">{t("Yay Məktəbi")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("summer_school.title")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Riyaziyyat sahəsində intensiv təlim proqramı")}
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

      {/* Features Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="scale-up"
              delay={index * 100}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover-lift text-center group">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  {feature.title}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Sun className="w-8 h-8 text-white animate-spin-slow" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {t("summer_school.title")}
                    </h2>
                    <p className="text-white/90">{t("2025")}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6">
                    {/* Main Description */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <div className="flex items-start gap-4">
                        <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {t("summer_school.description")}
                        </p>
                      </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-6 h-6 text-purple-600" />
                          <h3 className="text-lg font-bold text-purple-900">
                            {t("Müddət")}
                          </h3>
                        </div>
                        <p className="text-gray-700">
                          {t("2-4 həftə intensiv təlim")}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-6 h-6 text-green-600" />
                          <h3 className="text-lg font-bold text-green-900">
                            {t("İştirakçılar")}
                          </h3>
                        </div>
                        <p className="text-gray-700">
                          {t("Yerli və beynəlxalq tələbələr")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("Qeydiyyat tezliklə açılacaq")}
              </h3>
              <p className="text-white/90 mb-6">
                {t(
                  "Yay məktəbi haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın"
                )}
              </p>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {t("Əlaqə saxla")}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default SummerSchool;
