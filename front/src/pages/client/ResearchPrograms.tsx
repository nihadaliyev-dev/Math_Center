import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BookOpen, Sparkles, Users } from "lucide-react";

interface ResearchProgramItem {
  title: string;
  content: string;
}

interface ResearchProgramSection {
  heading: string;
  items: ResearchProgramItem[];
}

const ResearchPrograms = () => {
  const { t } = useTranslation();

  const researchPrograms = t("research_programs", {
    returnObjects: true,
  }) as ResearchProgramSection[];

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
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("Tədqiqat Proqramları")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("seminarlar_silsilesi")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Elmi tədqiqat və inkişaf proqramlarımız")}
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
        <div className="max-w-5xl mx-auto space-y-8">
          {researchPrograms.map((section, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0D1F4F] mb-4">
                      {section.heading}
                    </h3>
                    <div className="space-y-4">
                      {section.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-gray-700 leading-relaxed"
                        >
                          <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p>
                            {item.title && (
                              <strong className="text-[#0D1F4F]">
                                {item.title}{" "}
                              </strong>
                            )}
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPrograms;
