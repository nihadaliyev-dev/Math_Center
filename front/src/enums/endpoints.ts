export const Endpoints = {
  news: "/news",
  advertisements: "/advertisements",
  auth: "/auth",
  documents: "/documents",
  researchers: "/researchers",
  events: "/events",
  repositories: "/repositories",
  dashboard: "/admin/dashboard",
} as const;

type Endpoints = keyof typeof Endpoints;
