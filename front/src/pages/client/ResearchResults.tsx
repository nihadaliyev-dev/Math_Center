import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Award, Sparkles, ExternalLink, FileText } from "lucide-react";

const ResearchResults = () => {
  const { t } = useTranslation();

  const researchItems = [
    {
      textKey: "research_results.research_1",
      linkKey: "research_results.research_1_link",
      url: "https://arxiv.org/abs/2505.15150",
    },
    {
      textKey: "research_results.research_2",
      linkKey: "research_results.research_2_link",
      url: "https://arxiv.org/abs/2505.15150",
    },
    {
      textKey: "research_results.research_3",
      linkKey: "research_results.research_3_link",
      url: "https://arxiv.org/abs/2505.15163",
    },
    {
      textKey: "research_results.research_5",
      linkKey: "research_results.research_5_link",
      url: "https://arxiv.org/abs/2503.02766",
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
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("Tədqiqat Nəticələri")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("research_results.main_title")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Elmi tədqiqatlarımızın son nəticələri")}
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
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Description */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("Haqqında")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("research_results.description")}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Research Items */}
          <div className="space-y-6">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {t("Nəşrlər")}
              </h2>
            </AnimatedSection>

            {researchItems.map((item, index) => (
              <AnimatedSection
                key={index}
                animation="scale-up"
                delay={index * 100}
              >
                <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {t(item.textKey)}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group-hover:gap-3 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t(item.linkKey)}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchResults;
