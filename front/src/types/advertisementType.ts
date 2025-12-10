export type Advertisement = {
  id?: string;
  title: {
    az: string;
    en: string;
  };
  coverImage: string;
  createdAt?: number;
  updatedAt?: string;
};