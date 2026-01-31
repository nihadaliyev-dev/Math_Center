import React from 'react';
import { useEditable } from '../../context/EditableContext';
import { Pencil, Save, X } from 'lucide-react';
// Assuming we have a button component from shadcn/ui or similar, but using regular buttons for speed if uncertain.
// Or verifying existing Button component.
// Let's use simple HTML buttons with Tailwind for now to avoid dependency issues, 
// unless I check the Button component first. 
// I'll stick to standard tailwind classes.

const AdminToolbar: React.FC = () => {
    const { isEditing, toggleEditing, saveChanges, hasUnsavedChanges } = useEditable();
    
    // Check if user is admin. 
    // We need to access Auth Context or LocalStorage.
    // For now, let's look at localStorage 'user' or 'token'.
    const userStr = localStorage.getItem('user');
    let isAdmin = false;
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.role === 'admin' || user.isSuperAdmin) {
                isAdmin = true;
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (!isAdmin) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
            {isEditing && hasUnsavedChanges && (
                 <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            )}

            <button 
                onClick={toggleEditing}
                className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-xl transition-all font-medium ${
                    isEditing 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white ring-4 ring-blue-200' 
                    : 'bg-black/80 hover:bg-black text-white backdrop-blur-sm'
                }`}
            >
                {isEditing ? (
                    <>
                        <X size={18} />
                        Exit Editing
                    </>
                ) : (
                    <>
                        <Pencil size={18} />
                        Editing View
                    </>
                )}
            </button>


        </div>
    );
};

export default AdminToolbar;
