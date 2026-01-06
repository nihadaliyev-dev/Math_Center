import { Endpoints } from "@/enums/endpoints";

// Determine API base URL:
// - In all environments, prefer VITE_API_BASE_URL if set
// - In development, fall back to http://localhost:3000
// - In production (build), fall back to current origin to avoid hardcoded localhost
const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:3000";
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export const API_BASE_URL: string = getApiBaseUrl();

type endpointType = {
  news: string;
  advertisements: string;
  auth: string;
  documents: string;
  researchers: string;
  events: string;
  repositories: string;
  dashboard: string;
};

export const endpoints: endpointType = {
  news: Endpoints.news,
  advertisements: Endpoints.advertisements,
  auth: Endpoints.auth,
  documents: Endpoints.documents,
  researchers: Endpoints.researchers,
  events: Endpoints.events,
  repositories: Endpoints.repositories,
  dashboard: Endpoints.dashboard,
};
