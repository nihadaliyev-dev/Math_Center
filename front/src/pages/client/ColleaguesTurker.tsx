import { t } from "i18next";
import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { User, BookOpen, Award, Briefcase, Globe } from "lucide-react";

interface SectionProps {
  title: string;
  items: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

const TurkerBiyikogluProfile: React.FC = () => {
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
              TÜRKER BIYIKOĞLU
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              {t("Qraf Nəzəriyyəsi Və Onun Tətbiqləri Qrupu - Baş Elmi Işçi")}
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
                Tədqiqat maraqlarıma{" "}
                <strong className="text-[#0D1F4F]">Qraf Nəzəriyyəsi</strong>,
                Qraf Modelləşdirmə və Qraf Tətbiqləri daxildir.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={User}
              title={t("Qısa məlumat")}
              items={[
                t(
                  "2000-ci ildə TU Grazdan (Avstriya) Gerhard J Woegingerin rəhbərliyi altında riyaziyyat üzrə bakalavr və magistratura diplom dərəcəsini və 2003-cü ildə Vyana Universitetində (Avstriya) Peter F. Stadler və Josef Leydoldun rəhbərliyi altında doktorantura dərəcəsini almışam."
                ),
                t(
                  "Mən Leypsiqdəki (Almaniya) Maks Plank adına Riyaziyyat İnstitutunda iki il, Katolik de Louvain Universitetinin (Belçika) Riyaziyyat Mühəndisliyi Departamentində bir il doktoranturadan sonra elmi işçi kimi fəaliyyət göstərmişəm."
                ),
                t(
                  "İstanbulda İşık Universitetinin Riyaziyyat kafedrasında və İzmirdə İzmir Texnologiya İnstitutunun Riyaziyyat kafedrasında altı ildən çox dosent vəzifəsində çalışmışam."
                ),
                t(
                  "Son yeddi il Ankarada iki startap şirkətində baş elmi işçi kimi fəaliyyət göstərmişəm."
                ),
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Award}
              title="Mükafatlar"
              items={[
                "Türk Matematik Vakfı (Turkish Mathematical Foundation) - Masatoshi Gündüz İkeda Research Award, 2015",
                "Distinguished Young Scholar Award, Turkish Academy of Sciences, 2009 (TUBA-GEBIP/2009)",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Briefcase}
              title="Fondla Tədqiqat Layihələri"
              items={[
                '"Geometric representations and symmetries of graphs, maps and other discrete structures and applications in science" (GReGAS) supported by TUBITAK and the European Science Foundation (EUROCORES Programme EUROGIGA), 2011-2014, Principal Researcher. Lale Ozkahya (post-doc)',
                '"Castelnuovo-Mumford Regularity of Graphs and Topology of Decycling Complexes" supported by TUBITAK, 2012-2014. This is a joint project with Yusuf Civan (Suleyman Demirel University, Isparta, Turkey).',
                '"Bionetalign: Global Alignment of Biochemical Networks Regularity for Functional Orthology" supported by TUBITAK 2012-2014. This is a joint project with Cesim Erten (Kadir Has University Istanbul, Turkey).',
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title="Nəşrlər"
              items={[
                "T. Biyikoglu, J. Leydold and P. F. Stadler, Laplacian Eigenvectors of Graphs, Lecture Notes in Mathematics 1915, Springer (2007).",
                "Alkan, T. Biyikoglu, M. Demange and C. Erten, Structure of conflict graphs in constraint alignment problems and algorithms, Discrete Mathematics & Theoretical Computer Science, 21 no.4 Sep 11 (2019).",
                "Biyikoglu and Y. Civan, Prime Graphs, Matching and the Castelnuovo-Mumford Regularity, J. Commutative Algebra, 11: 1-27 (2019).",
                "Biyikoglu and Y. Civan, Castelnuovo-Mumford Regularity of Graphs, Combinatorica, 38: 1353-1383 (2018).",
                "Biyikoglu and Y. Civan, Vertex Decomposable Graphs, Codismantlability, Cohen-Macaulayness and Castelnuovo-Mumford Regularity, Electronic Journal of Combinatorics, 21: #P1.1 (2014).",
                "Abaka, T. Biyikoglu, C. Erten, CAMPways: constrained alignment framework for the comparative analysis of a pair of metabolic pathways, Bioinformatics, 29: 145-153 (2013).",
                "Biyikoglu and Y. Civan, Four-cycled graphs with topological applications, Annals of Combinatorics, 16: 37-56 (2012).",
                "Biyikoglu and J. Leydold, Dendrimers are the unique chemical trees with maximum spectral radius, MATCH Communications in Mathematical and in Computer Chemistry, 68: 851-854 (2012).",
                "Biyikoglu and J. Leydold, Graphs of given order and size and minimum algebraic connectivity, Linear Algebra and its Applications, 436: 2067-2077 (2012).",
                "Biyikoglu, S. Simic, Z. Stanic, Some Notes on Spectra of Cographs, Ars Combinatoria, 100: 421-434 (2011).",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Globe}
              title="Konfransın materialları"
              items={[
                "Baksi, O. Kaya and T. Biyikoglu, Enabling Cooperation, Resource Allocation and Receiver Selection Across Cells: Complementary Fractional Frequency Reuse. IEEE PIMRC 2013, London, UK, Sept. 2013.",
                "Baksi, O. Kaya, T. Biyikoglu, Optimal and Near-optimal Partner Selection Algorithms in Cooperative OFDMA, IEEE WCNC 2012, Paris, France, April 2012.",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title="Preprints"
              items={[
                "Biyikoglu and Y. Civan, Bounding the collapsibility number of simplicial complexes and graphs, Preprint (2023). [pdf]",
                "Biyikoglu and Y. Civan, Projective dimension of (hyper)graphs and the Castelnuovo-Mumford regularity of bipartite graphs, Preprint (2016). [pdf]",
                "Biyikoglu and Y. Civan, A note on the recognition of codismantlable graphs and posets, Preprint (2016). [pdf]",
                "T. Biyikoglu and Y. Civan, Bounding Castelnuovo-Mumford regularity of graphs via Lozin's transformation, Preprint (2013). [pdf]",
                "T. Biyikoglu, and J Leydold, Semiregular Trees with Minimal Index, Preprint (2009). [pdf]",
                "T. Biyikoglu, M. Hellmuth, J Leydold, Largest Laplacian Eigenvalue and Degree Sequences of Trees, Preprint (2007). [pdf]",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={BookOpen}
              title="Hazırlıq Mərhələsində Olan Məqalələr"
              items={[
                "Biyikoglu, Y. Civan, M. Demir and H. G¨uler, Helly number, domination and homology, submitted (2024).",
                "Allmer, T. Biyikoglu and C. Has, De Novo Sequencing of Tandem Mass Spectra using a Novel Graph Modeling Approach, in preparation",
                "M. Atay and T. Biyikoglu, Graph entropy, degree assortativity, and hierarchical structures in networks, in preparation.",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Briefcase}
              title="Sənaye Tədqiqatları"
              items={[
                "2015-2017-ci illərdə konsaltinq şirkətinin qurucularından biri olmuşam. Biz Türkiyə su elektrik stansiyası sektoru üçün xüsusi tədqiqata əsaslanan buxar axınını proqnozlaşdırma modelləri və məhsulları hazırlamışıq.",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Globe}
              title="Seminar və Konfranslar"
              items={[
                "Monthly Istanbul Discrete Mathematics Meetings, Istanbul Center for Mathematical Sciences, Bo˘gazi¸ci University, 2009-2012 (with T. Ekim).",
                "Workshop on Graph Theory and its Applications I, II, III, Istanbul, 2010, 2011 and 2012 (with T. Ekim).",
              ]}
            />
          </AnimatedSection>

          <AnimatedSection animation="fade-up">
            <Section
              icon={Award}
              title="Xidmət"
              items={[
                'Türkiyənin məşhur riyaziyyat jurnalının qonaq redaktoru journal "Matematik Dünyası", 2017–2020.',
              ]}
            />
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

export default TurkerBiyikogluProfile;
