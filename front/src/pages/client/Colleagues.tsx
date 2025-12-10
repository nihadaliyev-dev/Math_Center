import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TeamMemberCard from "../../components/client/TeamMemberCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Users, Sparkles } from "lucide-react";
import instance from "@/services/instance";
import { API_BASE_URL } from "@/services/api";

interface Researcher {
  id?: string;
  fullName: string;
  email: string;
  affiliation?: string;
  role: "Admin" | "Editor" | "Researcher";
  orcid?: string;
  joinedDate?: string;
  contributions?: number;
  bio?: string;
  avatar?: string;
}

const Team: React.FC = () => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearchers();
  }, []);

  const fetchResearchers = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`${API_BASE_URL}/researchers`);
      if (response.data.success && response.data.data) {
        const researchers: Researcher[] = response.data.data;
        // Map researchers to team member format
        const mappedMembers = researchers.map((researcher) => ({
          name: researcher.fullName,
          role: researcher.role === "Admin" ? t("Rehber") : t("Tədqiqatçı"),
          email: researcher.email,
          researchInterests: researcher.bio || t("Tədqiqat maraqları müəyyən edilməyib"),
          imageUrl: researcher.avatar
            ? researcher.avatar.startsWith("http")
              ? researcher.avatar
              : `${API_BASE_URL}${researcher.avatar}`
            : "/mathematics_research_lab_logo.jpg",
          link: `haqqimizda/emekdaslar/${researcher.id || researcher.fullName.toLowerCase().replace(/\s+/g, "-")}`,
        }));
        setTeamMembers(mappedMembers);
      }
    } catch (error) {
      console.error("Failed to fetch researchers:", error);
      // Keep empty array as fallback
    } finally {
      setLoading(false);
    }
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
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">{t("Komanda")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t("Əməkdaşlar")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t("Tədqiqat laboratoriyamızın rəhbər heyəti və tədqiqatçıları")}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <AnimatedSection animation="fade-up" className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("Komandamız")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t(
                      "Riyaziyyat sahəsində mütəxəssis olan alimlər və tədqiqatçılardan ibarət komandamız ilə tanış olun."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Team Members Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">{t("Yüklənir...")}</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t("Əməkdaş tapılmadı")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <AnimatedSection
                  key={member.link || index}
                  animation="scale-up"
                  delay={index * 100}
                >
                  <TeamMemberCard {...member} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
