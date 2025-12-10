import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Users, Presentation, Globe, Calendar } from "lucide-react";

const Conferences = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Users,
      title: t("Konfranslar"),
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Presentation,
      title: t("Seminarlar"),
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Globe,
      title: t("Beynəlxalq Əməkdaşlıq"),
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Calendar,
      title: t("Tədbirlər"),
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t("KONFRANSLAR")}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0D1F4F] to-indigo-600 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <AnimatedSection
              key={index}
              animation="scale-up"
              delay={index * 100}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift text-center">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${highlight.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <highlight.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">
                  {highlight.title}
                </h3>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0D1F4F] mb-2">
                    {t("Konfranslar")}
                  </h2>
                </div>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {t(
                  "Bu böyük tədbirlərdə aparıcı beynəlxalq tədqiqatçılar və institutun üzvləri məruzələr təqdim edir. Konfranslar riyaziyyatda son nailiyyətləri müzakirə etmək, fikir mübadiləsi aparmaq və xarici tədqiqatçılarla əlaqə yaratmaq imkanı verir. Institut həmçinin mühüm məruzəçilərə səyahət, yaşayış və gündəlik xərclər üzrə subsidiya təqdim edir."
                )}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0D1F4F] mb-2">
                    {t("Seminarlar")}
                  </h2>
                </div>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {t(
                  "Konfranslardan fərqli olaraq, seminarlar kiçik və daha çox diqqət mərkəzindədirlər; seminarlar müəyyən bir riyazi sahəyə dərindən diqqət yetirmək üçün 5-10 seçilmiş tədqiqatçını bir araya gətirirlər. Adətən 2-3 gün davam edən müddətdə iştirakçılara nəinki intensiv əməkdaşlıq etməyə, həm də müəyyən həllər tapmaq üçün praktiki tədqiqatlar aparmağa imkan verir."
                )}
              </p>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="bg-gradient-to-br from-[#0D1F4F] via-indigo-700 to-purple-800 rounded-2xl shadow-xl p-12 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">
                {t("Tədbirlərimizə Qatılın")}
              </h3>
              <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
                {t(
                  "Riyaziyyat sahəsində qabaqcıl tədqiqatlar və əməkdaşlıq üçün bizimlə birləşin"
                )}
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0D1F4F] rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Calendar className="w-5 h-5" />
                <span>{t("Gələcək Tədbirlər")}</span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Conferences;
