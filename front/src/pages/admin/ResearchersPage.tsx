import React, { useMemo, useState, useRef, useEffect } from "react";
import { UserPlus, Award, Mail, Image as ImageIcon, X } from "lucide-react";
import instance from "@/services/instance";
import { API_BASE_URL } from "@/services/api";

interface Researcher {
  id?: string;
  fullName: string;
  email: string;
  affiliation: string;
  role: "Admin" | "Editor" | "Researcher";
  orcid?: string;
  joinedDate: string;
  contributions: number;
  bio?: string;
  avatar?: string;
  password?: string; // For creating/updating admin account
}

const ResearchersPage: React.FC = () => {
  const [list, setList] = useState<Researcher[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Researcher | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  // Fetch researchers from API
  useEffect(() => {
    fetchResearchers();
  }, []);

  const fetchResearchers = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`${API_BASE_URL}/researchers`);
      if (response.data.success && response.data.data) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch researchers:", error);
      // Keep using empty array as fallback
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(
    () =>
      list.filter(
        (r) =>
          r.fullName.toLowerCase().includes(query.toLowerCase()) ||
          r.email.toLowerCase().includes(query.toLowerCase()) ||
          r.affiliation?.toLowerCase().includes(query.toLowerCase())
      ),
    [list, query]
  );

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await instance.post(
        `${API_BASE_URL}/researchers/upload/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success && editing) {
        setEditing({
          ...editing,
          avatar: response.data.data.avatarUrl,
        });
        setPreviewImage(`${API_BASE_URL}${response.data.data.avatarUrl}`);
      }
      return response.data.data;
    } catch (error: any) {
      console.error("Image upload error:", error);
      alert(error.response?.data?.message || "Upload failed");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    handleImageUpload(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedImage(null);
    if (editing) {
      setEditing({ ...editing, avatar: undefined });
    }
    if (imageFileRef.current) {
      imageFileRef.current.value = "";
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    // Validate password for new researchers
    if (
      !editing.id &&
      (!editing.password || editing.password.trim().length < 6)
    ) {
      alert(
        "Password is required and must be at least 6 characters for new admin accounts"
      );
      return;
    }

    try {
      setUploading(true);
      const researcherData: any = {
        ...editing,
        avatar: editing.avatar,
        joinedDate: editing.joinedDate || new Date().toISOString(),
      };

      // Only include password if provided (for updates, empty password means keep current)
      if (editing.id) {
        // Update: only send password if it's provided
        if (editing.password && editing.password.trim() !== "") {
          researcherData.password = editing.password;
        } else {
          // Remove password field if empty for updates
          delete researcherData.password;
        }
      } else {
        // Create: password is required
        researcherData.password = editing.password;
      }

      if (editing.id) {
        // Update existing researcher
        const response = await instance.put(
          `${API_BASE_URL}/researchers/${editing.id}`,
          researcherData
        );
        if (response.data.success) {
          setList((prev) =>
            prev.map((x) => (x.id === editing.id ? response.data.data : x))
          );
          alert("Researcher updated successfully!");
        }
      } else {
        // Create new researcher
        const response = await instance.post(
          `${API_BASE_URL}/researchers`,
          researcherData
        );
        if (response.data.success) {
          setList((prev) => [response.data.data, ...prev]);
          alert("Researcher and admin account created successfully!");
        }
      }
      setEditing(null);
      setPreviewImage(null);
      setSelectedImage(null);
      fetchResearchers();
    } catch (error: any) {
      console.error("Save error:", error);
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors
            .map((e: any) => `${e.field}: ${e.message}`)
            .join(", ")
        : error.response?.data?.message || "Failed to save researcher";
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const roleCount = useMemo(
    () => ({
      Admin: list.filter((r) => r.role === "Admin").length,
      Editor: list.filter((r) => r.role === "Editor").length,
      Researcher: list.filter((r) => r.role === "Researcher").length,
    }),
    [list]
  );

  const topContributors = useMemo(
    () =>
      [...list].sort((a, b) => b.contributions - a.contributions).slice(0, 3),
    [list]
  );

  return (
    <div className="rounded-[2rem] bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Researcher Management</h1>
        <button
          onClick={() => {
            setEditing({
              fullName: "",
              email: "",
              affiliation: "",
              role: "Admin",
              joinedDate: new Date().toISOString(),
              contributions: 0,
              password: "",
            });
            setPreviewImage(null);
            setSelectedImage(null);
          }}
          className="px-4 py-2 rounded-full bg-black text-white flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Admin/Researcher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-gray-600 mb-1">Role Summary</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Admins</span>
              <span className="font-semibold">{roleCount.Admin}</span>
            </div>
            <div className="flex justify-between">
              <span>Editors</span>
              <span className="font-semibold">{roleCount.Editor}</span>
            </div>
            <div className="flex justify-between">
              <span>Researchers</span>
              <span className="font-semibold">{roleCount.Researcher}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border p-4 md:col-span-2">
          <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Top Contributors
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topContributors.map((r) => (
              <div key={r.id} className="rounded-lg border p-3">
                <div className="font-medium text-sm">{r.fullName}</div>
                <div className="text-xs text-gray-500">{r.affiliation}</div>
                <div className="text-xs mt-2">
                  Contributions:{" "}
                  <span className="font-semibold">{r.contributions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search researchers by name or email"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Affiliation</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Contributions</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading researchers...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No researchers found
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    {r.avatar && (
                      <img
                        src={
                          r.avatar.startsWith("http")
                            ? r.avatar
                            : `${API_BASE_URL}${r.avatar}`
                        }
                        alt={r.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    {r.fullName}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {r.email}
                  </td>
                  <td className="p-3">{r.affiliation || "-"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        r.role === "Admin"
                          ? "bg-red-100 text-red-700"
                          : r.role === "Editor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {r.role}
                    </span>
                  </td>
                  <td className="p-3">
                    {r.joinedDate
                      ? new Date(r.joinedDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3">{r.contributions || 0}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing({
                            ...r,
                            password: "", // Clear password when editing (user needs to enter new one if they want to change)
                          });
                          if (r.avatar) {
                            setPreviewImage(
                              r.avatar.startsWith("http")
                                ? r.avatar
                                : `${API_BASE_URL}${r.avatar}`
                            );
                          }
                        }}
                        className="px-3 py-1 text-sm rounded-lg border"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!r.id) {
                            setList((prev) =>
                              prev.filter((x) => x.id !== r.id)
                            );
                            return;
                          }
                          if (
                            window.confirm(
                              "Are you sure you want to delete this researcher?"
                            )
                          ) {
                            try {
                              const response = await instance.delete(
                                `${API_BASE_URL}/researchers/${r.id}`
                              );
                              if (response.data.success) {
                                setList((prev) =>
                                  prev.filter((x) => x.id !== r.id)
                                );
                                alert(
                                  response.data.message ||
                                    "Researcher deleted successfully"
                                );
                                // Refresh the list to sync with backend
                                fetchResearchers();
                              }
                            } catch (error: any) {
                              console.error(
                                "Failed to delete researcher:",
                                error
                              );
                              const errorMessage =
                                error.response?.data?.message ||
                                "Failed to delete researcher";
                              alert(errorMessage);
                              // Refresh the list even on error to sync state
                              fetchResearchers();
                            }
                          }
                        }}
                        className="px-3 py-1 text-sm rounded-lg border text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={onSave}
            className="bg-white w-full max-w-xl rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editing.id ? "Edit" : "Add"} Researcher
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setPreviewImage(null);
                  setSelectedImage(null);
                }}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Full Name</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.fullName}
                  onChange={(e) =>
                    setEditing({ ...editing, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.email}
                  onChange={(e) =>
                    setEditing({ ...editing, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">
                  Password {!editing.id && "(Required for admin registration)"}
                  {editing.id && "(Leave empty to keep current password)"}
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.password || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, password: e.target.value })
                  }
                  placeholder={
                    editing.id
                      ? "Leave empty to keep current"
                      : "Min 6 characters"
                  }
                  minLength={6}
                  required={!editing.id}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {!editing.id
                    ? "Creating admin account - password is required"
                    : "Update password (leave empty to keep current)"}
                </p>
              </div>
              <div>
                <label className="block text-xs mb-1">Affiliation</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.affiliation}
                  onChange={(e) =>
                    setEditing({ ...editing, affiliation: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Role</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.role}
                  onChange={(e) =>
                    setEditing({ ...editing, role: e.target.value as any })
                  }
                >
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Researcher</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">ORCID ID</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.orcid || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, orcid: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Contributions</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.contributions}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      contributions: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Bio / Research Interests
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  value={editing.bio || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, bio: e.target.value })
                  }
                  placeholder="Research interests, bio, etc."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Avatar/Profile Image
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="researcher-avatar-upload"
                  />
                  <label
                    htmlFor="researcher-avatar-upload"
                    className="flex-1 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-600 flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {selectedImage?.name || editing.avatar
                      ? selectedImage?.name || "Image uploaded"
                      : "Choose avatar image"}
                  </label>
                  {(editing.avatar || previewImage) && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-2 py-2 border rounded-lg hover:bg-red-50 text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {(previewImage || editing.avatar) && (
                  <div className="mt-2 rounded-lg overflow-hidden border">
                    <img
                      src={
                        previewImage ||
                        (editing.avatar?.startsWith("http")
                          ? editing.avatar
                          : `${API_BASE_URL}${editing.avatar}`)
                      }
                      alt="Avatar preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResearchersPage;
