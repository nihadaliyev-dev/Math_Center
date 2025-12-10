/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./instance";
import type { AxiosResponse } from "axios";

type ApiResponse<T> = Promise<T>;

// Helper function to get language from localStorage
const getLangFromLocalStorage = (): string => {
  const lang = localStorage.getItem("i18nextLng");
  return lang || "az"; // Default to 'az' (Azerbaijani) if no language is set
};

export const getAll = async <T>(endpoint: string): ApiResponse<T> => {
  try {
    const lang = getLangFromLocalStorage(); // Get language from localStorage
    const response: AxiosResponse<T> = await instance.get(endpoint, {
      params: { lang },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data.");
  }
};

export const getOne = async <T>(
  endpoint: string,
  id: string | number
): ApiResponse<T> => {
  try {
    const lang = getLangFromLocalStorage(); // Get language from localStorage
    const response: AxiosResponse<T> = await instance.get(`${endpoint}/${id}`, {
      params: { lang },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch item.");
  }
};

export const post = async <T, D>(
  endpoint: string,
  data: D,
  options?: object
): ApiResponse<T> => {
  try {
    const lang = getLangFromLocalStorage(); // Get language from localStorage
    const response: AxiosResponse<T> = await instance.post(endpoint, data, {
      params: { lang },
      ...options,
    });
    return response.data;
  } catch (error: any) {
    console.error("API POST Error:", error.response?.data || error.message);
    const errorData = error.response?.data;
    let errorMessage = "Failed to create item.";

    if (errorData) {
      if (errorData.errors) {
        errorMessage = errorData.errors;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const put = async <T, D>(
  endpoint: string,
  id: string | number,
  data: D
): ApiResponse<T> => {
  try {
    const lang = getLangFromLocalStorage(); // Get language from localStorage
    const response: AxiosResponse<T> = await instance.put(
      `${endpoint}/${id}`,
      data,
      {
        params: { lang },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("API PUT Error:", error.response?.data || error.message);
    const errorData = error.response?.data;
    let errorMessage = "Failed to update item.";

    if (errorData) {
      if (errorData.errors) {
        errorMessage = errorData.errors;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const remove = async <T>(
  endpoint: string,
  id: string | number
): ApiResponse<T> => {
  try {
    const lang = getLangFromLocalStorage(); // Get language from localStorage
    const response: AxiosResponse<T> = await instance.delete(
      `${endpoint}/${id}`,
      {
        params: { lang },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete item.");
  }
};
