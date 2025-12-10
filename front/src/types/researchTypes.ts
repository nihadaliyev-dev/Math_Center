export interface MathematicalCategory {
  id: string;
  name: string;
  timeSpent: number; // in hours
  color: string;
}

export interface DocumentStats {
  totalDocuments: number;
  researchPapers: number;
  reportsAndReviews: number;
  otherDocuments: number;
  trend: number; // percentage change
  monthlyData: Array<{
    month: string;
    count: number;
  }>;
}

export interface DraftDocument {
  id: string;
  name: string;
  size: string;
  lastEdited: string;
  type: 'research' | 'report' | 'other';
  author: string;
}

export interface Repository {
  id: string;
  name: string;
  category: string;
  isPublic: boolean;
  fileCount: number;
  lastModified: string;
  size: string;
}

export interface UserData {
  id: string;
  name: string;
  avatar: string;
  dataUsed: string;
  totalDocuments: number;
  rating: number;
  rank: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  rank: number;
  documentsCount: number;
}

export interface TimeEntry {
  category: string;
  hours: number;
  date: string;
  author: string;
}