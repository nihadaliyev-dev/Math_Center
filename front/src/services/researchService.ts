import type {
  MathematicalCategory,
  DocumentStats,
  DraftDocument,
  Repository,
  UserData,
  LeaderboardEntry,
  TimeEntry,
} from "@/types/researchTypes";
import instance from "./instance";
import { endpoints } from "./api";

export const getMathematicalCategories = async (): Promise<
  MathematicalCategory[]
> => {
  try {
    const response = await instance.get(`${endpoints.dashboard}/categories`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching mathematical categories:", error);
    throw error;
  }
};

export const getDocumentStats = async (): Promise<DocumentStats> => {
  try {
    const response = await instance.get(`${endpoints.documents}/stats`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching document stats:", error);
    throw error;
  }
};

export const getLatestDraft = async (): Promise<DraftDocument | null> => {
  try {
    const response = await instance.get(`${endpoints.documents}/latest-draft`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching latest draft:", error);
    return null;
  }
};

export const getUserRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await instance.get(`${endpoints.repositories}/user`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw error;
  }
};

export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await instance.get(`${endpoints.dashboard}/user-data`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const response = await instance.get(`${endpoints.researchers}/leaderboard`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

export const getTimeEntries = async (date: string): Promise<TimeEntry[]> => {
  try {
    const response = await instance.get(
      `${endpoints.dashboard}/time-entries?date=${date}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching time entries:", error);
    throw error;
  }
};

// ============================================================================
// Additional API functions for future implementation
// ============================================================================

// Update repository visibility
// export const updateRepositoryVisibility = async (repoId: string, isPublic: boolean): Promise<void> => {
//   try {
//     await instance.put(`/admin/repositories/${repoId}/visibility`, { isPublic });
//   } catch (error) {
//     console.error('Error updating repository visibility:', error);
//     throw error;
//   }
// };

// Mark notification as read
// export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
//   try {
//     await instance.put(`/admin/notifications/${notificationId}/read`);
//   } catch (error) {
//     console.error('Error marking notification as read:', error);
//     throw error;
//   }
// };

// Get dashboard statistics
// export const getDashboardStats = async (): Promise<any> => {
//   try {
//     const response = await instance.get('/admin/dashboard/stats');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     throw error;
//   }
// };

// Search across admin panel
// export const searchAdmin = async (query: string): Promise<any> => {
//   try {
//     const response = await instance.get(`/admin/search?q=${encodeURIComponent(query)}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error performing search:', error);
//     throw error;
//   }
// };
