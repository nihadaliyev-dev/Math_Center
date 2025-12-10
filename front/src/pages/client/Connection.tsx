import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Mail, Link as LinkIcon } from "lucide-react";

const Connection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t("Əlaqə")}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0D1F4F] to-indigo-600 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-1">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0D1F4F] to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {t("Ünvan: ")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t(
                      "Bakı Dövlət Universiteti, əsas bina 3-cü mərtəbə, Rəqəmsal Araşdırmalar Laboratoriyası, Bakı şəhəri, akademik Zahid Xəlilov küçəsi, 33, AZ 1148"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {t("Mail ünvanı: ")}
                  </h3>
                  <a
                    href="mailto:mrl@asoiu.edu.az"
                    className="text-lg text-[#0D1F4F] hover:text-indigo-600 transition-colors duration-300 font-medium inline-flex items-center gap-2 group"
                  >
                    <span>mrl@asoiu.edu.az</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {t("Qeydiyyat: ")}
                  </h3>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScppsrMBkNY4OJjMVt58WmTCFKMKVJLHaArDjncTl8nDDRHHw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0D1F4F] to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <span>{t("Qeydiyyat Linki")}</span>
                    <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Map Section (Optional - can be added later) */}
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {t("Bizə necə çatmaq olar?")}
            </h3>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
              <iframe
                className="border-none w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4526557394706!2d49.849104677149484!3d40.376659271445995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da84d07764f%3A0xabaa0431ef903b77!2sFrench-Azerbaijani%20University!5e0!3m2!1str!2saz!4v1761289605641!5m2!1str!2saz"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Connection;
