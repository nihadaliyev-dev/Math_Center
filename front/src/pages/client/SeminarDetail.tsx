import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, User, ArrowLeft, FileText } from "lucide-react";
import { getOne } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";

interface EventItem {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  organizer?: string;
  eventType?: "Event" | "Seminar" | "Conference";
}

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const [seminar, setSeminar] = useState<EventItem | null>(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      if (!id) return;
      try {
        const response = await getOne<{ data: EventItem }>(Endpoints.events, id);
        setSeminar(response.data || null);
      } catch (error) {
        console.error("Failed to load seminar detail", error);
        setSeminar(null);
      }
    };

    fetchSeminar();
  }, [id]);

  if (!seminar || seminar.eventType !== "Seminar") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            {i18n.language === "az" ? "Seminar tapılmadı" : "Seminar not found"}
          </h2>
          <Link to="/elmi-fealiyyet/seminarlar" className="text-blue-600 hover:text-blue-800">
            {i18n.language === "az" ? "Geri qayıt" : "Go back"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/elmi-fealiyyet/seminarlar" className="inline-flex items-center gap-2 text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          {i18n.language === "az" ? "Seminarlara qayıt" : "Back to seminars"}
        </Link>

        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h1 className="text-3xl font-extrabold text-[#0D1F4F] mb-6">{seminar.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(seminar.startDate).toLocaleString()} - {new Date(seminar.endDate).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {seminar.location || "-"}
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <User className="w-4 h-4" />
              {seminar.organizer || "-"}
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <FileText className="w-4 h-4 mt-1" />
            <p>{seminar.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetail;
