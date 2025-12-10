import React from "react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  User,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

interface SectionProps {
  title: string;
  items: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

const OlcayCoskunProfile: React.FC = () => {
  const { t } = useTranslation();

  const adminItems = t("profile.sections.admin.items", {
    returnObjects: true,
  }) as string[];
  const awardsItems = t("profile.sections.awards.items", {
    returnObjects: true,
  }) as string[];
  const projectsItems = t("profile.sections.projects.items", {
    returnObjects: true,
  }) as string[];
  const publicationsItems = t("profile.sections.publications.items", {
    returnObjects: true,
  }) as string[];
  const studentsCurrentItems = t("profile.sections.studentsCurrent.items", {
    returnObjects: true,
  }) as string[];
  const studentsGradsItems = t("profile.sections.studentsGrads.items", {
    returnObjects: true,
  }) as string[];
  const postdocsItems = t("profile.sections.postdocs.items", {
    returnObjects: true,
  }) as string[];
  const studentArticlesItems = t("profile.sections.studentArticles.items", {
    returnObjects: true,
  }) as string[];

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
          <AnimatedSection animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">{t("Profil")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {t("profile.name")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              {t("profile.role")}
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Bio Section */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <p className="text-gray-700 leading-relaxed">
                {t("profile.bio.prefix")}
                <strong className="text-[#0D1F4F]">
                  {t("profile.bio.highlight")}
                </strong>
                {t("profile.bio.suffix")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Briefcase}
              title={t("profile.sections.admin.title")}
              items={adminItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Award}
              title={t("profile.sections.awards.title")}
              items={awardsItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title={t("profile.sections.projects.title")}
              items={projectsItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title={t("profile.sections.publications.title")}
              items={publicationsItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={GraduationCap}
              title={t("profile.sections.studentsCurrent.title")}
              items={studentsCurrentItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={GraduationCap}
              title={t("profile.sections.studentsGrads.title")}
              items={studentsGradsItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={User}
              title={t("profile.sections.postdocs.title")}
              items={postdocsItems}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title={t("profile.sections.studentArticles.title")}
              items={studentArticlesItems}
            />
          </AnimatedSection>

          {/* Links Section */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#0D1F4F] mb-4 flex items-center gap-3">
                <LinkIcon className="w-5 h-5" />
                {t("profile.ids.title", "İdentifikatorlar")}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {t("profile.ids.scopus")}:
                    </p>
                    <a
                      href="https://www.scopus.com/authid/detail.uri?authorId=17345043600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      https://www.scopus.com/authid/detail.uri?authorId=17345043600
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {t("profile.ids.orcid")}:
                    </p>
                    <a
                      href="https://orcid.org/0000-0001-7649-560X"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      https://orcid.org/0000-0001-7649-560X
                    </a>
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

const Section: React.FC<SectionProps> = ({ title, items, icon: Icon }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-lg font-bold text-[#0D1F4F] mb-4 flex items-center gap-3">
      {Icon && <Icon className="w-5 h-5" />}
      {title}
    </h2>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
          <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default OlcayCoskunProfile;
