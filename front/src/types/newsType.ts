export type News = {
  id?: string;
  title: {
    az: string;
    en: string;
  };
  slug?: string;
  author?: string;
  category?: "Awards" | "Research" | "Updates" | "Other";
  status?: "Draft" | "Published" | "Archived";
  coverImage: string;
  content?: string;
  publishDate?: string;
  tags?: string[];
  viewCount?: number;
  createdAt?: number;
  updatedAt?: string;
};
