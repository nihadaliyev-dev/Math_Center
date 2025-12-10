import React, { useState, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  getMathematicalCategories,
  getTimeEntries,
} from "@/services/researchService";
import type { MathematicalCategory, TimeEntry } from "@/types/researchTypes";

const TimeTrackingCard: React.FC = () => {
  const [categories, setCategories] = useState<MathematicalCategory[]>([]);
  const [, setTimeEntries] = useState<TimeEntry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<
    "Day" | "Week" | "Month" | "Year"
  >("Day");

  useEffect(() => {
    fetchCategories();
    fetchTimeEntries();
  }, [currentDate]);

  const fetchCategories = async () => {
    try {
      const data = await getMathematicalCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTimeEntries = async () => {
    try {
      const dateStr = currentDate.toISOString().split("T")[0];
      const data = await getTimeEntries(dateStr);
      setTimeEntries(data);
    } catch (error) {
      console.error("Error fetching time entries:", error);
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (selectedView) {
      case "Day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "Week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "Month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
      case "Year":
        newDate.setFullYear(
          newDate.getFullYear() + (direction === "next" ? 1 : -1)
        );
        break;
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimelinePosition = (index: number, total: number) => {
    const baseHeight = 10; // Starting position percentage
    const availableHeight = 80; // Available height percentage
    const spacing = availableHeight / Math.max(total - 1, 1);
    return baseHeight + index * spacing;
  };

  return (
    <div className="flex flex-col gap-[0.5rem] rounded-[2rem] px-[2rem] py-[1.5rem] bg-white h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.5rem]">
          <CalendarDays />
          <span className="text-sm">
            {formatDate(currentDate).toUpperCase()}
          </span>
          <div className="flex gap-[0.25rem]">
            <button
              onClick={() => navigateDate("prev")}
              className="cursor-pointer hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="w-[1rem]" />
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="cursor-pointer hover:text-gray-700 transition-colors"
            >
              <ChevronRight className="w-[1rem]" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-[0.25rem]">
          {(["Day", "Week", "Month", "Year"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`text-sm rounded-full px-[1.25rem] py-[0.5rem] cursor-pointer hover:shadow-sm transition-all ${
                selectedView === view ? "bg-[#fbfbfb]" : ""
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#21212180] rounded-full"></div>

      <div className="flex gap-[2rem] flex-1">
        <ul className="flex flex-col justify-center gap-[2rem] text-sm font-normal min-w-[200px]">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </li>
          ))}
        </ul>

        <div className="flex w-[70%] relative py-[5%] min-h-[300px]">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="border-l-[1px] border-dotted border-[#21212150] w-[12.5%] h-full relative"
            >
              <div className="text-xs text-gray-500 absolute -bottom-6 -left-3">
                {String(index * 3).padStart(2, "0")}:00
              </div>
              {categories.map((category, catIndex) => {
                const shouldShow = (index + catIndex) % 3 === 0 && index < 6;
                const topPosition = getTimelinePosition(
                  catIndex,
                  categories.length
                );

                if (!shouldShow) return null;

                return (
                  <div
                    key={`${category.id}-${index}`}
                    className="absolute data flex items-center justify-between text-[#fbfbfb] text-xs py-[0.25rem] pl-[1rem] pr-[0.5rem] bg-black rounded-full min-w-max"
                    style={{
                      top: `${topPosition}%`,
                      left: "10px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{category.timeSpent.toFixed(1)}h</span>
                    </div>
                    <div className="avatars flex items-center gap-[0.1rem] ml-2">
                      <div className="avatar rounded-full overflow-hidden w-[1.5rem] h-[1.5rem]">
                        <img
                          src="/avatar.png"
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingCard;
