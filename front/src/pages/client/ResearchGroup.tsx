import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Users, Sparkles, User, Lightbulb, Target, Award } from "lucide-react";

const ResearchGroup = () => {
  const { t } = useTranslation();

  const groups = t("research_group.groups", {
    returnObjects: true,
  }) as Array<{
    title: string;
    leader: string;
    role: string;
    description: string;
    leaderInfo?: string;
  }>;

  const groupIcons = [
    { icon: Lightbulb, color: "from-yellow-400 to-orange-500" },
    { icon: Target, color: "from-blue-400 to-cyan-500" },
    { icon: Award, color: "from-purple-400 to-pink-500" },
    { icon: Users, color: "from-green-400 to-teal-500" },
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
              <span className="text-sm font-medium">
                {t("Tədqiqat Qrupları")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("research_group.title")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Müxtəlif sahələrdə ixtisaslaşmış tədqiqat komandalarımız")}
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
          {/* Introduction Card */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("research_group.description.groups_title")}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t("research_group.description.intro")}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Research Groups */}
          <div className="space-y-8">
            {groups.map((group, index) => {
              const iconData = groupIcons[index % groupIcons.length];
              const IconComponent = iconData.icon;

              return (
                <AnimatedSection
                  key={index}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon Section */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${iconData.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0D1F4F] transition-colors">
                          {group.title}
                        </h3>

                        <p className="text-gray-700 leading-relaxed mb-4">
                          {group.description}
                        </p>

                        {/* Leader Info */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600 font-medium mb-1">
                                {t("Rəhbər")}
                              </p>
                              <p className="text-lg font-bold text-[#0D1F4F]">
                                {group.leader}
                              </p>
                              <p className="text-sm text-gray-600">
                                {group.role}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Leader Info */}
                        {group.leaderInfo && (
                          <div className="border-l-4 border-purple-500 pl-4 py-2">
                            <p className="text-gray-700 leading-relaxed italic">
                              {group.leaderInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Call to Action */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl shadow-xl p-8 text-center text-white">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">
                  {t("Bizə qoşulun!")}
                </h3>
                <p className="text-lg text-white/90 mb-6">
                  {t(
                    "Tədqiqat qruplarımızdan birinə qoşulmaq istəyirsiniz? Bizimlə əlaqə saxlayın."
                  )}
                </p>
                <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {t("Ətraflı məlumat")}
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ResearchGroup;
