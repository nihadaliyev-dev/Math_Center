import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Sparkles,
  Users,
  Award,
  TrendingUp,
  Target,
  Heart,
} from "lucide-react";

const Welcome = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Users,
      text: "Dynamic research community",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Award,
      text: "Academic excellence",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: TrendingUp,
      text: "Innovative discoveries",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Target,
      text: "Focused research goals",
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
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Welcome</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t("xos_gelmisiniz")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Mathematics Research Laboratory - Where Innovation Meets
              Excellence
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

      {/* Highlights Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-sm font-semibold text-gray-700">
                  {highlight.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-xl font-medium text-gray-800 border-l-4 border-[#0D1F4F] pl-6 py-2">
                      {t(
                        "Riyaziyyat Tədqiqat Laboratoriyasına (MRL) xoş gəlmisiniz. RTL riyaziyyat, əməkdaşlıq və innovasiyalar sahəsində tədqiqatlar aparmağa çalışan bir cəmiyyətdir."
                      )}
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 my-8">
                      <div className="flex items-start gap-4">
                        <Sparkles className="w-8 h-8 text-[#0D1F4F] flex-shrink-0 mt-1" />
                        <p className="text-lg">
                          {t(
                            "Biz Riyaziyyatın elm və texnologiyadakı bütün tərəqqinin əsası olduğuna inanırıq və yeni tətbiq sahələri ilə əlaqədar olaraq cəbr və ədədlər nəzəriyyəsində problemlərin həlli yollarının tapılması istiqamətində riyaziyyatı araşdırırıq."
                          )}
                        </p>
                      </div>
                    </div>

                    <p>
                      {t(
                        "Laboratoriyamız riyaziyyata marağı olan tədqiqatçılar, məsələn, tələbələr, doktorantlar, baş tədqiqatçılar və qonaq alimlər üçün dinamik və dəstəkləyici tədqiqat mühiti təklif etmək niyyəti ilə yaradılmışdır. Bu cür şəxslərin hamısı ümumi məqsədə öz töhfələrini verəcəklər: riyaziyyatın sərhədlərini genişləndirmək. Seminarlar, seminarlar silsiləsi və konfranslar maraqlı yeni ideyalar və fənlər arasında əlaqələr üçün təşkil edilir."
                      )}
                    </p>

                    <p>
                      {t(
                        "Biz, həmçinin akademik azadlıq və məkan yaradırıq ki, hər hansı bir tədqiqatçımız fərdi maraq doğuran mövzuları araşdırmaq şansına malik olsun. Biz tədqiqat və müasir qurğular üçün yaxşı maliyyə vəsaitindən istifadə etməklə, yeni kəşflərə dəstəyi təmin edirik."
                      )}
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 my-8">
                      <p className="text-lg italic">
                        {t(
                          "Direktor olaraq, Belə çiçəklənən bir cəmiyyətlə fəxr edirəm. Bu, həqiqətən də ideya axınının sərbəst şəkildə formalaşdığı, əməkdaşlıqların artdığı və hamının riyaziyyat elmlərinə mənalı töhfələr vermək üçün səylərini sərf etdiyi bir yerə çevrilir."
                        )}
                      </p>
                    </div>

                    <p>
                      {t(
                        "Sizi tədqiqat laboratoriyamızın adından salamlayıram, tədbirlərdə iştirak etməyə dəvət edirəm və bizimlə əlaqə saxlamağınızı təklif edirəm. Əgər, siz tədqiqatçısınızsa, tələbəsinizsə və ya riyaziyyatla maraqlanırsınızsa, RTL sizin üçün doğru məkandır."
                      )}
                    </p>

                    <p className="text-xl font-semibold text-[#0D1F4F] border-t border-gray-200 pt-6 mt-8">
                      {t(
                        "Böyük araşdırmalar aparmaq və əməkdaşlıq edərək cəmiyyətə böyük töhfələr vermək naminə sərhədləri keçməyə davam edək."
                      )}
                    </p>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-lg font-bold text-gray-800">
                        {t("Olcay Coşkun")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Director, Mathematics Research Laboratory
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
