import { Endpoints } from "@/enums/endpoints";

// Use environment variable or default to local development
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
