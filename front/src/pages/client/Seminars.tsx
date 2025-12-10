import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Users, Sparkles, ArrowRight } from "lucide-react";

const Seminars: React.FC = () => {
  const { t } = useTranslation();

  const seminars = [
    {
      id: 1,
      titleKey: "seminar_page.categories.short_term",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
    },
    {
      id: 2,
      titleKey: "seminar_page.categories.algebra",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      titleKey: "seminar_page.categories.mathematics",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: 4,
      titleKey: "seminar_page.categories.number_theory",
      color: "from-green-400 to-teal-500",
      bgColor: "bg-green-50",
    },
    {
      id: 5,
      titleKey: "seminar_page.categories.discrete_structures",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-50",
    },
    {
      id: 6,
      titleKey: "seminar_page.categories.geometry_topology",
      color: "from-teal-400 to-cyan-600",
      bgColor: "bg-teal-50",
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
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">{t("Seminarlar")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("seminar_page.title")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Müxtəlif mövzularda keçirilən elmi seminarlarımız")}
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seminars.map((seminar, index) => (
              <AnimatedSection
                key={seminar.id}
                animation="scale-up"
                delay={index * 100}
              >
                <Link
                  to={`/elmi-fealiyyet/seminarlar/${seminar.id}`}
                  className="group block"
                >
                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    {/* Gradient Background Effect */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${seminar.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    <div className="relative flex items-center gap-4">
                      {/* Icon Circle */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${seminar.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0D1F4F] transition-colors duration-300 mb-2">
                          {t(seminar.titleKey)}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all duration-300">
                          <span className="text-sm font-medium">
                            {t("Ətraflı")}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seminars;
