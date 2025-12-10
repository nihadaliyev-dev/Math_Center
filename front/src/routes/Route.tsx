import type { ReactNode } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import Home from "../pages/client/Home";
import News from "../pages/client/News";
import Advertisements from "../pages/client/Advertisements";
import NewsDetail from "../pages/client/NewsDetail";
import AdvertisementDetail from "../pages/client/AdvertisementDetail";
import ColleaguesErtan from "@/pages/client/ColleaguesErtan";
import ColleaguesTurker from "@/pages/client/ColleaguesTurker";
import ColleaguesOlcay from "@/pages/client/ColleaguesOlcay";
import NotFound from "@/pages/client/NotFound";
import ClientLayout from "../layout/ClientLayout";
import Welcome from "../pages/client/Welcome";
import CenterMission from "../pages/client/CenterMission";
import SceintificAdvisory from "../pages/client/SceintificAdvisory";
import Colleagues from "../pages/client/Colleagues";
import Visitors from "../pages/client/Visitors";
import ResearchGroup from "../pages/client/ResearchGroup";
import ResearchPrograms from "../pages/client/ResearchPrograms";
import AllEvents from "../pages/client/AllEvents";
import Seminars from "../pages/client/Seminars";
import Conferences from "../pages/client/Conferences";
import SeminarDetail from "../pages/client/SeminarDetail";
import SummerSchool from "../pages/client/SummerSchool";
import ResearchResults from "../pages/client/ResearchResults";
import AppealToRector from "../pages/client/AppealToRector";
import Connection from "../pages/client/Connection";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import NewsManagement from "../pages/admin/NewsManagement";
import EventsManagement from "../pages/admin/EventsManagement";
import DocumentsPage from "../pages/admin/DocumentsPage";
import ResearchersPage from "../pages/admin/ResearchersPage";
import SiteContentPage from "../pages/admin/SiteContentPage";
import SettingsPage from "../pages/admin/SettingsPage";
import AuthLayout from "../layout/AuthLayout";
import AdminLayout from "../layout/AdminLayout";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const admin = localStorage.getItem("token");
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const ROUTES: RouteObject[] = [
  // client layout
  {
    element: <ClientLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "xeberler",
        element: <News />,
      },
      {
        path: "xeberler/:id",
        element: <NewsDetail />,
      },
      {
        path: "elanlar",
        element: <Advertisements />,
      },
      {
        path: "elanlar/:id",
        element: <AdvertisementDetail />,
      },
      {
        path: "haqqimizda/",
        children: [
          {
            path: "xos-gelmisiniz",
            element: <Welcome />,
          },
          {
            path: "merkezin-missiyasi",
            element: <CenterMission />,
          },
          {
            path: "elmi-meslehet-surasi",
            element: <SceintificAdvisory />,
          },
          {
            path: "emekdaslar",
            element: <Colleagues />,
          },
          {
            path: "emekdaslar/olcay-coskun",
            element: <ColleaguesOlcay />,
          },
          {
            path: "emekdaslar/turker-biyikoglu",
            element: <ColleaguesTurker />,
          },
          {
            path: "emekdaslar/ertan-elma",
            element: <ColleaguesErtan />,
          },
          {
            path: "ziyaretciler",
            element: <Visitors />,
          },
        ],
      },
      {
        path: "elmi-fealiyyet/",
        children: [
          {
            path: "tedqiqat-qrupu",
            element: <ResearchGroup />,
          },
          {
            path: "tedqiqat-proqramlari",
            element: <ResearchPrograms />,
          },
          {
            path: "tedbirler",
            element: <AllEvents />,
          },
          {
            path: "seminarlar",
            element: <Seminars />,
          },
          {
            path: "seminarlar/:id",
            element: <SeminarDetail />,
          },
          {
            path: "konfranslar",
            element: <Conferences />,
          },
          {
            path: "yay-mektebi",
            element: <SummerSchool />,
          },
          {
            path: "tedqiqat-neticeleri",
            element: <ResearchResults />,
          },
        ],
      },
      {
        path: "rektora-muraciet",
        element: <AppealToRector />,
      },
      {
        path: "elaqe",
        element: <Connection />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // admin layout
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "news",
        element: (
          <ProtectedRoute>
            <NewsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "events",
        element: (
          <ProtectedRoute>
            <EventsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "documents",
        element: (
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "researchers",
        element: (
          <ProtectedRoute>
            <ResearchersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "site-content",
        element: (
          <ProtectedRoute>
            <SiteContentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // admin login page
  {
    element: <AuthLayout />,
    path: "/admin/login",
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
    ],
  },
];

export default ROUTES;
