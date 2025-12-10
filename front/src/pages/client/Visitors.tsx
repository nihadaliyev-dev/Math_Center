import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Users,
  Sparkles,
  Calendar,
  User,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const Visitors = () => {
  const { t } = useTranslation();

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
              <span className="text-sm font-medium">{t("Qonaqlar")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("visitors.title")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Beynəlxalq tədqiqatçılarımız")}
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
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction Cards */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("visitors.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t("visitors.introduction")}
                  </p>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#0D1F4F]">
                        {t("visitors.short_term_visitors_label")}:
                      </span>{" "}
                      {t("visitors.short_term_visitors")}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#0D1F4F]">
                        {t("visitors.long_term_visitors_label")}:
                      </span>{" "}
                      {t("visitors.long_term_visitors")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Visitors Section Title */}
          <AnimatedSection animation="fade-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t("visitors.visitors_title")}
              </h2>
              <p className="text-gray-600">{t("Son ziyarətçilər")}</p>
            </div>
          </AnimatedSection>

          {/* Visitor Card */}
          <AnimatedSection animation="scale-up">
            <Link
              to="https://yilmazdeniz.bilkent.edu.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/3 relative overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                    <img
                      src="https://bdu.info.az/storage/52196/conversions/Photo-248x300-thumb.jpg"
                      alt="Deniz Yılmaz"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-[#0D1F4F]" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0D1F4F] transition-colors">
                      Deniz Yılmaz
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-[#0D1F4F]" />
                        </div>
                        <p className="font-semibold">January 20–24, 2025</p>
                      </div>

                      <div className="flex items-start gap-3 text-gray-700">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-600 mb-1">
                            {t("visitors.research_interests_label")}:
                          </p>
                          <p className="text-sm">
                            Finite groups, Representation theory, Block theory,
                            Biset functors
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <p>
                          <span className="font-semibold text-sm text-gray-600">
                            {t("visitors.host_label")}:
                          </span>{" "}
                          Olcay Coşkun
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#0D1F4F] rounded-lg text-sm font-medium group-hover:bg-blue-100 transition-colors">
                      <span>{t("visitors.hosted_by")}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
