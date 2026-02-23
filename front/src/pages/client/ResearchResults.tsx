import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import instance from "@/services/instance";
import { API_BASE_URL } from "@/services/api";
import { ExternalLink, FileText } from "lucide-react";

interface DocumentItem {
  id: string;
  title: string;
  abstract: string;
  fileUrl?: string;
  publicationStatus: "Draft" | "Peer-reviewed" | "Published";
  visibility: "Public" | "Internal";
}

const ResearchResults = () => {
  const { i18n } = useTranslation();
  const [docs, setDocs] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await instance.get(`${API_BASE_URL}/documents`);
        if (response.data.success) {
          setDocs(response.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    };

    fetchDocs();
  }, []);

  const publicPublished = useMemo(
    () => docs.filter((d) => d.visibility === "Public" && d.publicationStatus === "Published"),
    [docs]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-extrabold text-[#0D1F4F] mb-3">
          {i18n.language === "az" ? "Tədqiqat Nəticələri" : "Research Outputs"}
        </h1>
        <p className="text-gray-600 mb-8">
          {i18n.language === "az"
            ? "Admin paneldən dinamik idarə olunan nəticələr"
            : "Dynamically managed from admin panel"}
        </p>

        {publicPublished.length === 0 ? (
          <div className="text-gray-600">
            {i18n.language === "az" ? "Nəticə tapılmadı" : "No research outputs found"}
          </div>
        ) : (
          <div className="space-y-4">
            {publicPublished.map((doc, index) => (
              <AnimatedSection key={doc.id} animation="fade-up" delay={index * 70}>
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 mt-1 text-blue-600" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{doc.title}</h3>
                      <p className="text-gray-600 mt-2">{doc.abstract}</p>
                      {doc.fileUrl && (
                        <a
                          href={`${API_BASE_URL}${doc.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {i18n.language === "az" ? "Faylı aç" : "Open file"}
                        </a>
                      )}
                    </div>
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

export default ResearchResults;
