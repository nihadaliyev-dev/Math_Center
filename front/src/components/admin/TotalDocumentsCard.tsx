import { useState, useEffect } from "react";
import { Box, TrendingUp, TrendingDown } from "lucide-react";
import ApexChart from "./TotalDocumentsChart";
import { getDocumentStats } from "@/services/researchService";
import type { DocumentStats } from "@/types/researchTypes";

const TotalDocumentsCard = () => {
  const [documentStats, setDocumentStats] = useState<DocumentStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocumentStats();
  }, []);

  const fetchDocumentStats = async () => {
    try {
      const data = await getDocumentStats();
      setDocumentStats(data);
    } catch (error) {
      console.error("Error fetching document stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !documentStats) {
    return (
      <div className="rounded-[2rem] bg-white px-[2.5rem] py-[2rem] animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const researchPercentage = (
    (documentStats.researchPapers / documentStats.totalDocuments) *
    100
  ).toFixed(1);
  const reportsPercentage = (
    (documentStats.reportsAndReviews / documentStats.totalDocuments) *
    100
  ).toFixed(1);
  const otherPercentage = (
    (documentStats.otherDocuments / documentStats.totalDocuments) *
    100
  ).toFixed(1);

  return (
    <div className="rounded-[2rem] bg-white px-[2.5rem] py-[2rem] h-full">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg">Personal Statistics</span>
        </div>
        <div>
          <Box />
        </div>
      </div>
      <div>
        <div className="text-sm font-light text-[#212121]">
          Publication trend
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-light text-[#212121]">
            {documentStats.trend > 0 ? "+" : ""}
            {documentStats.trend.toFixed(1)}%
          </div>
          {documentStats.trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
        </div>
        <div className="text-sm font-light text-[#212121]">
          Compared to last month • {documentStats.totalDocuments} total
          documents
        </div>
      </div>
      <div className="py-[1rem]">
        <ApexChart monthlyData={documentStats.monthlyData} />
      </div>
      <ul className="flex flex-col gap-[0.5rem]">
        <li className="flex items-center justify-between">
          <span className="font-light text-sm">Research Papers</span>
          <span className="text-[#21212150] text-sm">
            {researchPercentage}% ({documentStats.researchPapers})
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-light text-sm">Reports & Reviews</span>
          <span className="text-[#21212150] text-sm">
            {reportsPercentage}% ({documentStats.reportsAndReviews})
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-light text-sm">Other Documents</span>
          <span className="text-[#21212150] text-sm">
            {otherPercentage}% ({documentStats.otherDocuments})
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TotalDocumentsCard;
