import React, { useState, useRef, useEffect } from 'react';
import { useEditable } from '../../context/EditableContext';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists based on components.json

interface EditableContentProps {
  page: string;
  section: string;
  itemKey: string;
  initialContent: string;
  tag?: React.ElementType;
  className?: string;
  type?: 'text' | 'image' | 'textarea';
}

export const EditableContent: React.FC<EditableContentProps> = ({
  page,
  section,
  itemKey,
  initialContent,
  tag: Tag = 'div',
  className,
  type = 'text'
}) => {
  const { isEditing, content, updateContent } = useEditable();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Get current value from context or fallback to initial
  // content structure is { [page]: { [section]: { [key]: value } } }
  const currentValue = content[page]?.[section]?.[itemKey] || initialContent;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.innerHTML !== currentValue) {
        if (document.activeElement !== elementRef.current) {
            elementRef.current.innerHTML = currentValue;
        }
    }
  }, [currentValue]);
  
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    setIsFocused(false);
    if (e.currentTarget.textContent !== currentValue) {
      updateContent(page, section, itemKey, e.currentTarget.textContent, type);
    }
  };

  if (!isEditing) {
    if (type === 'image') {
        return <img src={currentValue} className={className} alt={itemKey} />;
    }
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: currentValue }} />;
  }

  // Editing Mode
  if (type === 'image') {
      return (
          <div 
            className={cn("relative group inline-block", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
              <img src={currentValue} className={cn(className, "border-2 border-transparent group-hover:border-blue-500 transition-all")} alt={itemKey} />
              {isHovered && (
                  <button 
                    className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg"
                    onClick={(e) => {
                        e.preventDefault();
                        const url = prompt("Enter new image URL:", currentValue);
                        if (url) updateContent(page, section, itemKey, url, 'image');
                    }}
                  >
                      <Pencil size={16} />
                  </button>
              )}
          </div>
      )
  }

  return (
    <div 
      className={cn("relative group inline-block w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tag
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={cn(
          "outline-none transition-all",
          isFocused ? "bg-blue-50/50 ring-2 ring-blue-400 rounded px-1" : "border-2 border-transparent border-dashed",
          !isFocused && isHovered ? "border-blue-400 rounded px-1 bg-blue-50/20" : ""
        )}
      />
      {/* 
        We don't show the pencil for text because the border/bg feedback is enough 
        and the pencil can block text. But we can add it if requested. 
        User asked for "shows a pen (✏️) icon on hover". 
      */}
      {!isFocused && isHovered && (
          <div className="absolute -top-3 -right-3 z-10 pointer-events-none">
              <div className="bg-blue-600 text-white p-1 rounded-full shadow-sm">
                  <Pencil size={12} />
              </div>
          </div>
      )}
    </div>
  );
};
