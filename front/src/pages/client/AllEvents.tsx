import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Calendar, MapPin, Clock, Users, Award, Lightbulb } from "lucide-react";
import { useState } from "react";

const eventKeys = [
  "event1",
  "event2",
  "event3",
  "event4",
  "event5",
  "event6",
  "event7",
  "event8",
  "event9",
  "event10",
  "event11",
  "event12",
  "event13",
  "event14",
  "event15",
  "event16",
  "event17",
  "event18",
  "event19",
  "event20",
  "event21",
  "event22",
];

const eventIcons = [Calendar, MapPin, Clock, Users, Award, Lightbulb];

const AllEvents = () => {
  const { t } = useTranslation();
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const getRandomIcon = (index: number) => {
    const Icon = eventIcons[index % eventIcons.length];
    return Icon;
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
      "from-indigo-500 to-purple-600",
    ];
    return gradients[index % gradients.length];
  };

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
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Events & Activities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t("butun_tedbirler")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our comprehensive collection of research events, seminars,
              and academic activities
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedSection animation="scale-up" delay={0}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">
                    {eventKeys.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Total Events
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={100}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">500+</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Participants
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover-lift">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">50+</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Research Topics
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0D1F4F] via-blue-500 to-indigo-500 transform -translate-x-1/2 hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {eventKeys.map((eventKey, index) => {
                const Icon = getRandomIcon(index);
                const isExpanded = expandedEvent === index;
                const isEven = index % 2 === 0;

                return (
                  <AnimatedSection
                    key={index}
                    animation={isEven ? "slide-right" : "slide-left"}
                    delay={index * 30}
                  >
                    <div
                      className={`relative flex items-center ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } gap-8`}
                    >
                      {/* Content Card */}
                      <div
                        className={`flex-1 ${
                          isEven
                            ? "md:text-right md:pr-12"
                            : "md:text-left md:pl-12"
                        }`}
                      >
                        <div
                          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover-lift hover-glow cursor-pointer transition-all duration-300"
                          onClick={() =>
                            setExpandedEvent(isExpanded ? null : index)
                          }
                        >
                          <div
                            className={`flex items-start gap-4 ${
                              isEven ? "md:flex-row-reverse" : "md:flex-row"
                            }`}
                          >
                            {/* Icon */}
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${getGradientClass(
                                index
                              )} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Text Content */}
                            <div
                              className={`flex-1 ${
                                isEven ? "md:text-right" : "md:text-left"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-[#0D1F4F] rounded-full text-xs font-semibold">
                                  Event #{index + 1}
                                </span>
                              </div>

                              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                {t(`events.${eventKey}`)}
                              </p>

                              {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Duration: 2-3 hours</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>Mathematics Research Center</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Node */}
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#0D1F4F] shadow-lg z-10" />

                      {/* Spacer for even spacing */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <AnimatedSection animation="scale-up">
          <div className="bg-gradient-to-br from-[#0D1F4F] via-[#1a2d5f] to-[#2d4478] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in Participating?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join us in our upcoming events and be part of groundbreaking
              mathematical research
            </p>
            <button className="bg-white text-[#0D1F4F] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-xl">
              Contact Us
            </button>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default AllEvents;
