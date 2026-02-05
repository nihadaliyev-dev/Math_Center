import React, { createContext, useContext, useState, useCallback } from "react";
import instance from "@/services/instance";

interface PageContent {
  [section: string]: {
    [key: string]: any;
  };
}

interface ContentData {
  [page: string]: PageContent;
}

interface EditableContextType {
  isEditing: boolean;
  toggleEditing: () => void;
  content: ContentData;
  updateContent: (
    page: string,
    section: string,
    key: string,
    value: any,
    type?: string
  ) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  refreshContent: (page: string) => Promise<void>;
}

const EditableContext = createContext<EditableContextType | undefined>(
  undefined
);

export const useEditable = () => {
  const context = useContext(EditableContext);
  if (!context) {
    throw new Error("useEditable must be used within an EditableProvider");
  }
  return context;
};

interface EditableProviderProps {
  children: React.ReactNode;
}

export const EditableProvider: React.FC<EditableProviderProps> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<ContentData>({});
  const [unsavedChanges, setUnsavedChanges] = useState<
    { page: string; section: string; key: string; value: any; type: string }[]
  >([]);

  // Function to fetch content for a page
  const refreshContent = useCallback(async (page: string) => {
    try {
      const response = await instance.get<{
        success: boolean;
        data: PageContent;
      }>(`/content/${page}`);

      if (response.data.success) {
        setContent((prev) => ({
          ...prev,
          [page]: response.data.data,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  }, []);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const updateContent = (
    page: string,
    section: string,
    key: string,
    value: any,
    type: string = "text"
  ) => {
    // Optimistically update local state
    setContent((prev) => ({
      ...prev,
      [page]: {
        ...(prev[page] || {}),
        [section]: {
          ...(prev[page]?.[section] || {}),
          [key]: value,
        },
      },
    }));

    // Add to unsaved changes
    setUnsavedChanges((prev) => {
      // Remove existing change for same key if exists
      const filtered = prev.filter(
        (c) => !(c.page === page && c.section === section && c.key === key)
      );
      return [...filtered, { page, section, key, value, type }];
    });
  };

  const saveChanges = async () => {
    try {
      if (unsavedChanges.length === 0) return;

      // Sequentially persist all pending changes via protected content endpoint
      for (const change of unsavedChanges) {
        await instance.post("/content", change);
      }

      setUnsavedChanges([]);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Check console for details.");
    }
  };

  return (
    <EditableContext.Provider
      value={{
        isEditing,
        toggleEditing,
        content,
        updateContent,
        saveChanges,
        hasUnsavedChanges: unsavedChanges.length > 0,
        refreshContent,
      }}
    >
      {children}
    </EditableContext.Provider>
  );
};
