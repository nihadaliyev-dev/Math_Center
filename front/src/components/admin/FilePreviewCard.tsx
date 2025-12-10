import React, { useState, useEffect } from "react";
import { FileText, Clock } from "lucide-react";
import { getLatestDraft } from "@/services/researchService";
import type { DraftDocument } from "@/types/researchTypes";

const FilePreviewCard: React.FC = () => {
  const [latestDraft, setLatestDraft] = useState<DraftDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestDraft();
  }, []);

  const fetchLatestDraft = async () => {
    try {
      const data = await getLatestDraft();
      setLatestDraft(data);
    } catch (error) {
      console.error("Error fetching latest draft:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "📄";
      case "docx":
      case "doc":
        return "📝";
      case "tex":
        return "📊";
      case "txt":
        return "📄";
      default:
        return "📄";
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "research":
        return "text-blue-400";
      case "report":
        return "text-green-400";
      case "other":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="rounded-[2rem] relative text-white animate-pulse">
        <div className="rounded-[2rem] overflow-hidden absolute -z-10 object-cover h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
        <div className="z-10 px-[2rem] py-[1.5rem] flex flex-col justify-between h-full">
          <div className="flex gap-[0.5rem] items-center text-lg">
            <FileText />
            <span>File Preview</span>
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] relative text-white h-full">
      <div className="rounded-[2rem] overflow-hidden absolute -z-10 object-cover h-full bg-white">
        <video
          src="adminDarkBg.mp4"
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
        />
      </div>
      <div className="z-10 px-[2rem] py-[1.5rem] flex flex-col justify-between h-full">
        <div className="flex gap-[0.5rem] items-center text-lg">
          <FileText />
          <span>File Preview</span>
        </div>

        {latestDraft ? (
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getFileIcon(latestDraft.name)}</span>
              <div className="flex-1">
                <div className="font-medium text-base mb-1">
                  {latestDraft.name}
                </div>
                <div className="text-sm text-gray-300 flex items-center gap-4">
                  <span>{latestDraft.size}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Edited {latestDraft.lastEdited}
                  </span>
                </div>
                <div
                  className={`text-xs mt-1 ${getFileTypeColor(
                    latestDraft.type
                  )} capitalize`}
                >
                  {latestDraft.type} Document
                </div>
              </div>
            </div>

            <div className="w-full h-[3px] rounded-full bg-[#fbfbfb30]"></div>

            <div className="flex items-center gap-[0.5rem]">
              <div className="rounded-full overflow-hidden w-[3rem] h-[3rem] border-2 border-white/20">
                <img
                  src="/avatar.png"
                  alt={latestDraft.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{latestDraft.author}</div>
                <div className="text-xs text-gray-300">Author</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="text-6xl mb-4 opacity-50">📄</div>
            <div className="text-lg font-medium mb-2">No active drafts</div>
            <div className="text-sm text-gray-300 max-w-[200px]">
              You're not currently working on any documents. Start creating to
              see your latest draft here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreviewCard;
