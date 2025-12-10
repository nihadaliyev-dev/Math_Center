import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppWindow,
  Clock,
  FileText,
  Home,
  Newspaper,
  Settings2,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/news", label: "News", icon: Newspaper },
    { path: "/admin/events", label: "Events", icon: Clock },
    { path: "/admin/documents", label: "Documents", icon: FileText },
    { path: "/admin/researchers", label: "Researchers", icon: Users },
    { path: "/admin/site-content", label: "Site Content", icon: AppWindow },
    { path: "/admin/settings", label: "Settings", icon: Settings2 },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  // TODO: Fetch user data from API
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await instance.get('/admin/profile');
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   };
  //   fetchUserProfile();
  // }, []);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-dvh bg-gradient-to-br from-amber-50 via-white to-slate-100 p-2 lg:p-4 bg-[url('adminHero.jpg')] bg-cover w-full">
        <div className="fixed w-full h-full top-0 left-0 backdrop-blur-2xl pointer-events-none"></div>

        <div className="relative flex gap-2 lg:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed lg:sticky top-2 lg:top-4 left-2 lg:left-0 z-40 backdrop-blur-md bg-white/90 shadow-xl border flex flex-col justify-between p-4 lg:p-5 rounded-3xl w-[280px] lg:w-[280px] h-[calc(100dvh-1rem)] lg:h-[calc(100dvh-2rem)] transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-[300px] lg:translate-x-0"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 w-full p-2 mb-4">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  className="w-full h-full object-contain"
                  src={"mathematics_research_lab_logo_icon.png"}
                  alt="Logo Icon"
                />
              </div>
              <div className="flex-1 min-w-0">
                <img
                  className="w-full h-auto"
                  src={"mathematics_research_lab_logo_text.png"}
                  alt="Logo Text"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 py-3 px-4 rounded-2xl transition-all duration-200 ${
                          active
                            ? "bg-black text-white shadow-md"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* User Profile Section */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer mb-2">
                <div className="rounded-full overflow-hidden w-10 h-10 flex-shrink-0 bg-gray-200">
                  <img
                    src={"avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    admin@math-lab.com
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl hover:bg-red-50 text-red-600 transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
