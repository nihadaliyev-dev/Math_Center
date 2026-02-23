import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getAll } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";

interface EventItem {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  location?: string;
  eventType?: "Event" | "Seminar" | "Conference";
  status?: "Draft" | "Published" | "Cancelled";
}

const Conferences = () => {
  const { i18n } = useTranslation();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await getAll<{ data: EventItem[] }>(Endpoints.events);
        setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to fetch conferences", error);
      }
    };

    fetchConferences();
  }, []);

  const conferences = useMemo(
    () => events.filter((e) => e.status === "Published" && e.eventType === "Conference"),
    [events]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#0D1F4F] mb-8">
          {i18n.language === "az" ? "Konfranslar" : "Conferences"}
        </h1>

        {conferences.length === 0 ? (
          <div className="text-gray-600">
            {i18n.language === "az" ? "Konfrans tapılmadı" : "No conferences found"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conferences.map((conference, index) => (
              <AnimatedSection key={conference.id} animation="scale-up" delay={index * 60}>
                <div className="bg-white rounded-2xl p-6 border shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{conference.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">{conference.description}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(conference.startDate).toLocaleDateString()} • {conference.location || "-"}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conferences;
