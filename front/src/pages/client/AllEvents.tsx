import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Calendar, MapPin, User, Tag } from "lucide-react";
import { getAll } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";

type EventType = "Event" | "Seminar" | "Conference";

interface EventItem {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  organizer?: string;
  eventType?: EventType;
  status?: "Draft" | "Published" | "Cancelled";
}

const AllEvents = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAll<{ data: EventItem[] }>(Endpoints.events);
        setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const publishedEvents = useMemo(
    () => events.filter((e) => e.status === "Published"),
    [events]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <h1 className="text-4xl font-extrabold text-[#0D1F4F] mb-3">
            {t("butun_tedbirler")}
          </h1>
          <p className="text-gray-600 mb-8">
            {i18n.language === "az"
              ? "Admin paneldən idarə olunan bütün tədbirlər"
              : "All events managed from the admin panel"}
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="text-gray-600">{t("Yüklənir...")}</div>
        ) : publishedEvents.length === 0 ? (
          <div className="text-gray-600">
            {i18n.language === "az" ? "Tədbir tapılmadı" : "No events found"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedEvents.map((event, index) => (
              <AnimatedSection key={event.id} animation="scale-up" delay={index * 50}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {event.eventType || "Event"}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-3 line-clamp-3">{event.description}</p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location || "-"}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {event.organizer || "-"}
                    </div>
                  </div>

                  {event.eventType === "Seminar" && (
                    <Link
                      className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
                      to={`/elmi-fealiyyet/seminarlar/${event.id}`}
                    >
                      <Tag className="w-4 h-4" />
                      {i18n.language === "az" ? "Ətraflı" : "Details"}
                    </Link>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
