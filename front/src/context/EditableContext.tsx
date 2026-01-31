import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

interface ContentData {
  [section: string]: {
    [key: string]: any;
  };
}

interface EditableContextType {
  isEditing: boolean;
  toggleEditing: () => void;
  content: ContentData;
  updateContent: (page: string, section: string, key: string, value: any, type?: string) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  refreshContent: (page: string) => Promise<void>;
}

const EditableContext = createContext<EditableContextType | undefined>(undefined);

export const useEditable = () => {
  const context = useContext(EditableContext);
  if (!context) {
    throw new Error('useEditable must be used within an EditableProvider');
  }
  return context;
};

interface EditableProviderProps {
  children: React.ReactNode;
}

export const EditableProvider: React.FC<EditableProviderProps> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<ContentData>({});
  const [unsavedChanges, setUnsavedChanges] = useState<{ page: string, section: string, key: string, value: any, type: string }[]>([]);

  // Function to fetch content for a page
  const refreshContent = useCallback(async (page: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/${page}`);
      if (response.data.success) {
        // Merge fetched content with existing content state
        // We only overwrite if we strictly fetched for a specific page, 
        // but for now, let's just assume we load page content into a larger store or replace it.
        // Actually, for a multi-page app, we might want to store by page too.
        // But the previous plan's structure was nested by section.
        // Let's keep it simple: We load the *current* page's content.
        // Ideally, the 'content' state should be { [page]: { [section]: { [key]: val } } }
        // Refactoring to support multipage properly.
        
        setContent(prev => ({
          ...prev,
          [page]: response.data.data
        }));
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }, []);

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  const updateContent = (page: string, section: string, key: string, value: any, type: string = 'text') => {
    // Optimistically update local state
    setContent(prev => ({
      ...prev,
      [page]: {
        ...(prev[page] || {}),
        [section]: {
          ...(prev[page]?.[section] || {}),
          [key]: value
        }
      }
    }));

    // Add to unsaved changes
    setUnsavedChanges(prev => {
        // Remove existing change for same key if exists
        const filtered = prev.filter(c => !(c.page === page && c.section === section && c.key === key));
        return [...filtered, { page, section, key, value, type }];
    });
  };

  const saveChanges = async () => {
    try {
      if (unsavedChanges.length === 0) return;

      // Process all changes
      // In a real app, we might want a bulk update endpoint.
      // For now, loop requests (simple but not efficient).
      // Or we can assume the backend handles individual updates.
      // Let's do sequential updates to ensure order.
      
      const token = localStorage.getItem('token'); 
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      for (const change of unsavedChanges) {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content`, change, config);
      }

      setUnsavedChanges([]);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Check console for details.');
    }
  };

  return (
    <EditableContext.Provider value={{
      isEditing,
      toggleEditing,
      content,
      updateContent,
      saveChanges,
      hasUnsavedChanges: unsavedChanges.length > 0,
      refreshContent
    }}>
      {children}
    </EditableContext.Provider>
  );
};
