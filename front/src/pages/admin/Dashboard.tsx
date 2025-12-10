import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellRingIcon,
  Clock,
  Mail,
  Search,
  Sun,
  Video,
  LogOut,
} from "lucide-react";
import TotalDocumentsCard from "@/components/admin/TotalDocumentsCard";
import TimeTrackingCard from "@/components/admin/TimeTrackingCard";
import FilePreviewCard from "@/components/admin/FilePreviewCard";
import RepositoryCard from "@/components/admin/RepositoryCard";
import UserDataCard from "@/components/admin/UserDataCard";
import { API_BASE_URL } from "@/services/api";

// API Integration types (to be implemented)
interface DashboardStats {
  totalUsers: number;
  totalDocuments: number;
  totalEvents: number;
  totalNews: number;
  recentActivity: number;
  userGrowth: number;
}

interface Notification {
  id: string;
  type: "info" | "warning" | "success";
  message: string;
  timestamp: Date;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [_dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDocuments: 0,
    totalEvents: 0,
    totalNews: 0,
    recentActivity: 0,
    userGrowth: 0,
  });
  const [weatherTemp, setWeatherTemp] = useState(23);
  const [weatherCondition, setWeatherCondition] = useState("Sunny");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
    fetchWeather();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data.data);
      } else {
        // Fallback to mock data
        setDashboardStats({
          totalUsers: 156,
          totalDocuments: 47,
          totalEvents: 12,
          totalNews: 28,
          recentActivity: 89,
          userGrowth: 12.5,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Fallback to mock data
      setDashboardStats({
        totalUsers: 156,
        totalDocuments: 47,
        totalEvents: 12,
        totalNews: 28,
        recentActivity: 89,
        userGrowth: 12.5,
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard/notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(
          data.data.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }))
        );
      } else {
        // Fallback to mock data
        setNotifications([
          {
            id: "1",
            type: "info",
            message: "New user registered",
            timestamp: new Date(),
            read: false,
          },
          {
            id: "2",
            type: "success",
            message: "Document published successfully",
            timestamp: new Date(),
            read: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Fallback to mock data
      setNotifications([
        {
          id: "1",
          type: "info",
          message: "New user registered",
          timestamp: new Date(),
          read: false,
        },
        {
          id: "2",
          type: "success",
          message: "Document published successfully",
          timestamp: new Date(),
          read: false,
        },
      ]);
    }
  };

  const fetchWeather = async () => {
    try {
      // const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Baku&appid=YOUR_API_KEY&units=metric');
      // const data = await response.json();
      // setWeatherTemp(Math.round(data.main.temp));
      // setWeatherCondition(data.weather[0].main);

      // Mock data for now
      setWeatherTemp(23);
      setWeatherCondition("Sunny");
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      // navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
      console.log("Searching for:", searchQuery);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col z-10 pl-4 lg:pl-8 w-full overflow-hidden">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 py-4 lg:py-6">
        {/* Title */}
        <div className="font-normal text-3xl lg:text-4xl text-[#212121]">
          <p>Dashboard</p>
          <p className="text-sm font-light text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Action Bar - Responsive */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-4 w-full lg:w-auto">
          {/* Video Call Button - Hidden on mobile */}
          <div className="hidden xl:flex items-center gap-[0.25rem] rounded-full bg-white dark:bg-black pr-[1rem] shadow-sm">
            <button className="cursor-pointer rounded-full p-[1rem] lg:p-[1.25rem] bg-black text-white hover:bg-gray-800 transition-colors">
              <Video className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <span className="text-xs lg:text-sm">Video call</span>
          </div>

          {/* Time & Weather Widget */}
          <div className="rounded-full flex items-center bg-white dark:bg-black text-[#212121] dark:text-[#fbfbfb] shadow-sm">
            <div className="hover:bg-[#fafafa] hover:shadow-sm flex flex-col px-3 lg:px-[1.25rem] py-[0.5rem] gap-[0rem] items-center rounded-full transition-all duration-200">
              <Clock className="w-4 h-4 lg:w-[1.25rem] lg:h-[1.25rem]" />
              <span className="text-xs lg:text-sm">
                {currentTime.toLocaleTimeString().slice(0, 5)}
              </span>
            </div>
            <div className="hover:bg-[#fafafa] hover:shadow-sm gap-[0.25rem] flex px-3 lg:px-[1.25rem] py-[0.65rem] rounded-full -ml-[0.5rem] lg:-ml-[1rem] transition-all duration-200">
              <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
              <div className="flex flex-col justify-center py-[0.25rem]">
                <span className="text-base lg:text-lg font-medium leading-[1.125rem]">
                  {weatherTemp}°
                </span>
                <span className="text-xs lg:text-sm font-light leading-[.875rem]">
                  {weatherCondition}
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Collapsible on mobile */}
          <form
            onSubmit={handleSearch}
            className="rounded-full flex items-center gap-[0.5rem] bg-white shadow-sm w-full lg:w-auto min-w-[200px] lg:min-w-[250px]"
          >
            <button
              type="submit"
              className="rounded-full p-3 lg:p-[1.25rem] bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <input
              className="flex-1 outline-none px-2 py-2 lg:py-3 text-xs lg:text-sm pr-4"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Notifications & Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-black rounded-full p-3 lg:p-[1.25rem] text-[#fbfbfb] cursor-pointer hover:bg-gray-800 transition-colors relative"
              >
                <BellRingIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            !notif.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mail - Hidden on small screens */}
            <button className="hidden md:block bg-white rounded-full p-3 lg:p-[1.25rem] text-[#212121] cursor-pointer hover:bg-gray-100 transition-colors shadow-sm">
              <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="bg-red-500 rounded-full p-3 lg:p-[1.25rem] text-white cursor-pointer hover:bg-red-600 transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Quick Stats Section */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-4 mb-6 lg:mb-8">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          accent="blue"
          right={<Users className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Documents"
          value={dashboardStats.totalDocuments}
          accent="yellow"
          right={<FileText className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Events"
          value={dashboardStats.totalEvents}
          accent="gray"
          right={<Calendar className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
        <StatCard
          title="News Articles"
          value={dashboardStats.totalNews}
          accent="blue"
          right={<Activity className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Activity (24h)"
          value={dashboardStats.recentActivity}
          accent="yellow"
          right={<TrendingUp className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Growth Rate"
          value={`${dashboardStats.userGrowth}%`}
          sublabel="vs last month"
          accent="blue"
          right={<TrendingUp className="w-5 h-5" />}
          className="hover:shadow-md transition-shadow"
        />
      </div> */}

      {/* Main Dashboard Grid - Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 pb-6">
        {/* Time Tracking - Full width on mobile, spans 2 cols on 2xl */}
        <div className="xl:col-span-2 2xl:col-span-2 min-h-[400px]">
          <TimeTrackingCard />
        </div>

        {/* Total Documents */}
        <div className="min-h-[400px]">
          <TotalDocumentsCard />
        </div>

        {/* File Preview */}
        <div className="min-h-[350px] z-10">
          <FilePreviewCard />
        </div>

        {/* Repository Card */}
        <div className="min-h-[400px]">
          <RepositoryCard />
        </div>

        {/* User Data Card */}
        <div className="min-h-[400px]">
          <UserDataCard />
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-4 text-center text-xs text-gray-500">
        <p>Mathematics Research Lab Admin Dashboard v1.0</p>
        <p className="mt-1">
          Last updated: {currentTime.toLocaleDateString()} at{" "}
          {currentTime.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
