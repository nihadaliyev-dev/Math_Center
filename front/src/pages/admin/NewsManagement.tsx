import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Calendar,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { getAll, post, put, remove } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";
import type { News } from "@/types/newsType";
import { toast } from "sonner";
import instance from "@/services/instance";
import { API_BASE_URL } from "@/services/api";

// Types
interface NewsItemForm {
  id?: string;
  title: {
    az: string;
    en: string;
  };
  slug?: string;
  author?: string;
  category?: "Awards" | "Research" | "Updates" | "Other";
  status?: "Draft" | "Published" | "Archived";
  coverImage?: string;
  content?: string;
  publishDate?: string;
  tags?: string[];
  viewCount?: number;
  createdAt?: number;
  updatedAt?: string;
}

const categories = ["All", "Awards", "Research", "Updates", "Other"] as const;

const NewsManagement: React.FC = () => {
  const [items, setItems] = useState<NewsItemForm[]>([]);
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] =
    useState<(typeof categories)[number]>("All");
  const [editing, setEditing] = useState<NewsItemForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  // Fetch news from API
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAll<{ news: News[] }>(Endpoints.news);
      setItems(response.news || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news articles");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return items.filter(
      (n) =>
        (catFilter === "All" || n.category === catFilter) &&
        (n.title?.az?.toLowerCase().includes(query.toLowerCase()) ||
          n.title?.en?.toLowerCase().includes(query.toLowerCase()) ||
          n.tags?.join(" ").toLowerCase().includes(query.toLowerCase()))
    );
  }, [items, query, catFilter]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      toast.loading("Uploading image...", { id: "image-upload" });
      const formData = new FormData();
      formData.append("image", file);

      const response = await instance.post(
        `${API_BASE_URL}/news/upload/image`,
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
          coverImage: response.data.data.imageUrl,
        });
        setPreviewImage(`${API_BASE_URL}${response.data.data.imageUrl}`);
        toast.success("Image uploaded successfully!", { id: "image-upload" });
      }
      return response.data.data;
    } catch (error: any) {
      console.error("Image upload error:", error);
      toast.error(
        `Error: ${error.response?.data?.message || "Upload failed"}`,
        { id: "image-upload" }
      );
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
      setEditing({ ...editing, coverImage: "" });
    }
    if (imageFileRef.current) {
      imageFileRef.current.value = "";
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    try {
      // Validate required fields
      if (!editing.title?.az || !editing.title?.en) {
        toast.error("Validation Error", {
          description: "Please fill in both Azerbaijani and English titles",
          duration: 4000,
        });
        return;
      }

      if (!editing.coverImage && !previewImage) {
        toast.error("Validation Error", {
          description: "Please upload a cover image",
          duration: 4000,
        });
        return;
      }

      // Send all fields to the backend
      const payload = {
        title: editing.title,
        coverImage: editing.coverImage,
        content: editing.content || "",
        author: editing.author || "",
        slug: editing.slug || "",
        category: editing.category || "Other",
        status: editing.status || "Draft",
        publishDate: editing.publishDate || new Date().toISOString(),
        tags: editing.tags || [],
      };

      console.log("Sending payload:", payload);

      // Show loading toast
      const loadingToast = toast.loading(
        editing.id ? "Updating article..." : "Creating article..."
      );

      if (editing.id) {
        // Update existing news
        const updated = await put<News, typeof payload>(
          Endpoints.news,
          editing.id,
          payload
        );
        setItems((prev) =>
          prev.map((x) => (x.id === editing.id ? { ...x, ...updated } : x))
        );
        toast.success("Success!", {
          description: "News article updated successfully!",
          duration: 4000,
        });
      } else {
        // Create new news
        const created = await post<News, typeof payload>(
          Endpoints.news,
          payload
        );
        setItems((prev) => [created, ...prev]);
        toast.success("Success!", {
          description: "News article created successfully!",
          duration: 4000,
        });
      }

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      setEditing(null);
      setPreviewImage(null);
      setSelectedImage(null);
      fetchNews(); // Refresh the list
    } catch (err: any) {
      console.error("Error saving news:", err);
      const errorMessage = err.message || "Failed to save news article";
      toast.error("Error", {
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    // Create a custom confirmation toast
    toast(
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-slate-900">Delete Article</p>
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this article? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss();
              const loadingToast = toast.loading("Deleting article...");
              try {
                await remove<News>(Endpoints.news, id);
                setItems((prev) => prev.filter((x) => x.id !== id));
                toast.dismiss(loadingToast);
                toast.success("Deleted!", {
                  description: "Article has been deleted successfully",
                  duration: 3000,
                });
              } catch (err) {
                console.error("Error deleting news:", err);
                toast.dismiss(loadingToast);
                toast.error("Error", {
                  description: "Failed to delete news article",
                  duration: 4000,
                });
              }
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
        closeButton: false,
      }
    );
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center min-h-[500px] border border-slate-200">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 font-medium">Loading news articles...</p>
          <p className="text-slate-500 text-sm mt-2">Fetching from database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section with Scientific Design */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 shadow-2xl border border-blue-800/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
                <FileText className="w-5 h-5 text-blue-300" />
              </div>
              News Management
            </h1>
            <p className="text-blue-200/70 text-sm">
              Manage research news and publications • {items.length} total
              articles
            </p>
          </div>
          <button
            onClick={() =>
              setEditing({
                title: { az: "", en: "" },
                slug: "",
                author: "Admin User",
                category: "Research",
                status: "Draft",
                content: "",
                tags: [],
                viewCount: 0,
              })
            }
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            <span>Create Article</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title, content, or tags..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  catFilter === c
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-white/10 text-blue-200 hover:bg-white/20 border border-blue-400/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">
              Failed to load articles
            </h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchNews}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* News Cards Grid - Modern Scientific Design */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FileText className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            No articles found
          </h3>
          <p className="text-slate-600 mb-6">
            {query || catFilter !== "All"
              ? "Try adjusting your search or filters"
              : "Create your first news article to get started"}
          </p>
          <button
            onClick={() =>
              setEditing({
                title: { az: "", en: "" },
                slug: "",
                author: "Admin User",
                category: "Research",
                status: "Draft",
                content: "",
                tags: [],
                viewCount: 0,
              })
            }
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-300 p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              {n.coverImage && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={n.coverImage}
                    alt={n.title?.en || "Cover"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )}

              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-3">
                {n.status === "Published" ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    Published
                  </span>
                ) : n.status === "Draft" ? (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    Draft
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    Archived
                  </span>
                )}
                {n.category && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {n.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {n.title?.az || n.title?.en || "Untitled Article"}
              </h3>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {n.publishDate || n.createdAt
                      ? new Date(
                          n.publishDate || n.createdAt!
                        ).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{n.viewCount || 0}</span>
                </div>
              </div>

              {/* Tags */}
              {n.tags && n.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {n.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                  {n.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      +{n.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setEditing(n);
                    if (n.coverImage) {
                      if (n.coverImage.startsWith("http")) {
                        setPreviewImage(n.coverImage);
                      } else {
                        setPreviewImage(`${API_BASE_URL}${n.coverImage}`);
                      }
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => n.id && handleDelete(n.id)}
                  className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={onSave}
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {editing.id ? "Edit Article" : "Create New Article"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Title Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-blue-500"></div>
                  Article Title
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Azerbaijani 🇦🇿
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                      value={editing.title?.az || ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          title: {
                            ...editing.title,
                            az: e.target.value,
                            en: editing.title?.en || "",
                          },
                        })
                      }
                      placeholder="Məqalənin Azərbaycan dilində başlığı"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      English 🇬🇧
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                      value={editing.title?.en || ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          title: {
                            ...editing.title,
                            en: e.target.value,
                            az: editing.title?.az || "",
                          },
                        })
                      }
                      placeholder="Article title in English"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">Slug</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.slug}
                  onChange={(e) =>
                    setEditing({ ...editing, slug: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Author</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.author}
                  onChange={(e) =>
                    setEditing({ ...editing, author: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Category</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as any })
                  }
                >
                  <option>Awards</option>
                  <option>Research</option>
                  <option>Updates</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Status</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as any })
                  }
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Publish Date</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.publishDate?.slice(0, 16) || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, publishDate: e.target.value })
                  }
                />
              </div>
              {/* Cover Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-cyan-500"></div>
                  Cover Image
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Image
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={imageFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="news-image-upload"
                    />
                    <label
                      htmlFor="news-image-upload"
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-all bg-slate-50 hover:bg-white text-sm text-slate-700 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      {selectedImage?.name || editing.coverImage
                        ? selectedImage?.name || "Image uploaded"
                        : "Choose image file"}
                    </label>
                    {(editing.coverImage || previewImage) && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-3 py-3 border border-slate-300 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {!editing.coverImage && (
                    <p className="mt-2 text-sm text-slate-500">
                      Or provide a URL for the article's cover image
                    </p>
                  )}
                  {!previewImage && !editing.coverImage && (
                    <input
                      type="text"
                      className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                      value={editing.coverImage || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, coverImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  )}
                </div>
                {(previewImage || editing.coverImage) && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={
                        previewImage ||
                        (editing.coverImage?.startsWith("http")
                          ? editing.coverImage
                          : `${API_BASE_URL}${editing.coverImage}`)
                      }
                      alt="Cover preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Tags (comma separated)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.tags?.join(",") || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Content (Markdown / LaTeX)
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 h-40"
                  value={editing.content}
                  onChange={(e) =>
                    setEditing({ ...editing, content: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Use LaTeX inline like $a^2+b^2=c^2$ (render with MathJax
                  in the reader UI).
                </p>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-slate-50 p-6 -mx-8 -mb-8 rounded-b-3xl border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setPreviewImage(null);
                  setSelectedImage(null);
                }}
                className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {editing.id ? "Update Article" : "Create Article"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
