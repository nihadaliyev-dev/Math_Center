import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getAll } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";

interface EventItem {
  id: string;
  title: string;
  description?: string;
  eventType?: "Event" | "Seminar" | "Conference";
  status?: "Draft" | "Published" | "Cancelled";
}

const Seminars: React.FC = () => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Seminar">("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAll<{ data: EventItem[] }>(Endpoints.events);
        setItems(response.data || []);
      } catch (error) {
        console.error("Failed to fetch seminars", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const visibleItems = useMemo(() => {
    const published = items.filter((e) => e.status === "Published");
    if (filter === "All") return published;
    return published.filter((e) => e.eventType === "Seminar");
  }, [items, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#0D1F4F] mb-3">
          {i18n.language === "az" ? "Seminarlar" : "Seminars"}
        </h1>

        <div className="flex gap-2 mb-8">
          {(["All", "Seminar"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border ${
                filter === f ? "bg-[#0D1F4F] text-white" : "bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : visibleItems.length === 0 ? (
          <div className="text-gray-600">
            {i18n.language === "az" ? "Məlumat tapılmadı" : "No data found"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleItems.map((item, index) => (
              <AnimatedSection key={item.id} animation="scale-up" delay={index * 60}>
                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {item.eventType || "Event"}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-3">{item.description}</p>

                  {item.eventType === "Seminar" && (
                    <Link
                      to={`/elmi-fealiyyet/seminarlar/${item.id}`}
                      className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                    >
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

export default Seminars;
