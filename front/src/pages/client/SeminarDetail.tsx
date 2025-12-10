import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Calendar, MapPin, User, ArrowLeft, FileText } from "lucide-react";

type SeminarEvent = {
  date: string;
  time: string;
  location: string;
  speaker: string;
  summaryHtml: string;
};

type SeminarCategory = {
  id: number;
  title: string;
  data: SeminarEvent[];
};

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const seminars = t("seminars", {
    returnObjects: true,
  }) as SeminarCategory[];

  const seminar = seminars.find((s) => String(s.id) === String(id));

  if (!seminar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("seminar_detail.not_found")}
          </h2>
          <Link
            to="/elmi-fealiyyet/seminarlar"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Geri qayıt")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up">
            <Link
              to="/elmi-fealiyyet/seminarlar"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("seminar_detail.all_seminars")}
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold">
              {seminar.title}
            </h1>
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
        <div className="max-w-5xl mx-auto space-y-6">
          {seminar.data.map((event, index) => (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                {/* Speaker */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {event.speaker}
                  </h2>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        {t("seminar_detail.date_time")}
                      </p>
                      <p className="font-semibold">
                        {event.date} | {event.time}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          {t("seminar_detail.location")}
                        </p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t("seminar_detail.summary")}
                    </h3>
                  </div>
                  <div
                    className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: event.summaryHtml }}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}

          {/* Back Button */}
          <AnimatedSection animation="fade-up">
            <div className="flex justify-center pt-8">
              <Link
                to="/elmi-fealiyyet/seminarlar"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0D1F4F] to-[#1a2d5f] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("seminar_detail.all_seminars")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetail;
