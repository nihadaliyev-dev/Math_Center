import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Upload,
  FolderPlus,
  BookOpen,
  Image as ImageIcon,
  FileText,
  X,
} from "lucide-react";
import instance from "@/services/instance";
import { API_BASE_URL } from "@/services/api";

interface DocumentItem {
  id?: string;
  title: string;
  abstract: string;
  authors: string[];
  fileType: "PDF" | "DOCX" | "LaTeX" | "Markdown";
  category: "Algebra" | "Topology" | "Applied Math" | "Analysis" | "Other";
  tags: string[];
  uploadDate: string;
  lastEdited: string;
  publicationStatus: "Draft" | "Peer-reviewed" | "Published";
  doi?: string;
  visibility: "Public" | "Internal";
  versionHistory: Array<{ version: string; date: string; note?: string }>;
  fileUrl?: string;
  fileSize?: string;
  imageUrl?: string;
}

const seedDocs: DocumentItem[] = [
  {
    id: "d1",
    title: "On the Structure of Finite Groups",
    abstract: "We study properties of finite groups with emphasis on ...",
    authors: ["Nihad Aliyev"],
    fileType: "PDF",
    category: "Algebra",
    tags: ["groups", "algebra"],
    uploadDate: new Date().toISOString(),
    lastEdited: new Date().toISOString(),
    publicationStatus: "Draft",
    doi: "",
    visibility: "Internal",
    versionHistory: [
      { version: "v1", date: new Date().toISOString(), note: "Initial upload" },
    ],
  },
];

const DocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState<DocumentItem[]>(seedDocs);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<DocumentItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const documentFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const filtered = useMemo(
    () =>
      docs.filter(
        (d) =>
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.join(" ").toLowerCase().includes(query.toLowerCase())
      ),
    [docs, query]
  );

  const handleDocumentUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress("Uploading document...");
      const formData = new FormData();
      formData.append("document", file);

      const response = await instance.post(
        `${API_BASE_URL}/documents/upload/document`,
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
          fileUrl: response.data.data.fileUrl,
          fileSize: response.data.data.fileSize,
        });
        setUploadProgress("Document uploaded successfully!");
      }
      return response.data.data;
    } catch (error: any) {
      console.error("Document upload error:", error);
      setUploadProgress(
        `Error: ${error.response?.data?.message || "Upload failed"}`
      );
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress("Uploading image...");
      const formData = new FormData();
      formData.append("image", file);

      const response = await instance.post(
        `${API_BASE_URL}/documents/upload/image`,
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
          imageUrl: response.data.data.imageUrl,
        });
        setPreviewImage(`${API_BASE_URL}${response.data.data.imageUrl}`);
        setUploadProgress("Image uploaded successfully!");
      }
      return response.data.data;
    } catch (error: any) {
      console.error("Image upload error:", error);
      setUploadProgress(
        `Error: ${error.response?.data?.message || "Upload failed"}`
      );
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "document") {
      setSelectedDocument(file);
      handleDocumentUpload(file);
    } else {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedImage(null);
    if (editing) {
      setEditing({ ...editing, imageUrl: undefined });
    }
    if (imageFileRef.current) {
      imageFileRef.current.value = "";
    }
  };

  const removeDocument = () => {
    setSelectedDocument(null);
    if (editing) {
      setEditing({ ...editing, fileUrl: undefined, fileSize: undefined });
    }
    if (documentFileRef.current) {
      documentFileRef.current.value = "";
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    try {
      setUploading(true);
      const documentData = {
        ...editing,
        fileUrl: editing.fileUrl,
        imageUrl: editing.imageUrl,
        fileSize: editing.fileSize,
      };

      if (editing.id) {
        // Update existing document
        const response = await instance.put(
          `${API_BASE_URL}/documents/${editing.id}`,
          documentData
        );
        if (response.data.success) {
          setDocs((prev) =>
            prev.map((x) => (x.id === editing.id ? response.data.data : x))
          );
        }
      } else {
        // Create new document
        const response = await instance.post(
          `${API_BASE_URL}/documents`,
          documentData
        );
        if (response.data.success) {
          setDocs((prev) => [response.data.data, ...prev]);
        }
      }
      setEditing(null);
      setPreviewImage(null);
      setSelectedDocument(null);
      setSelectedImage(null);
    } catch (error: any) {
      console.error("Save error:", error);
      alert(error.response?.data?.message || "Failed to save document");
    } finally {
      setUploading(false);
    }
  };

  const openEditModal = (doc: DocumentItem) => {
    setEditing(doc);
    if (doc.imageUrl) {
      setPreviewImage(`${API_BASE_URL}${doc.imageUrl}`);
    }
    if (doc.fileUrl) {
      setSelectedDocument({ name: "Existing document" } as File);
    }
  };

  // Fetch documents from API on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await instance.get(`${API_BASE_URL}/documents`);
        if (response.data.success && response.data.data) {
          setDocs(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        // Keep using seedDocs as fallback
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="rounded-[2rem] bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Documents / Research Papers</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-full bg-black text-white flex items-center gap-2"
            onClick={() => {
              setEditing({
                title: "",
                abstract: "",
                authors: [],
                fileType: "PDF",
                category: "Algebra",
                tags: [],
                uploadDate: new Date().toISOString(),
                lastEdited: new Date().toISOString(),
                publicationStatus: "Draft",
                visibility: "Internal",
                versionHistory: [],
              });
              setPreviewImage(null);
              setSelectedDocument(null);
              setSelectedImage(null);
              setUploadProgress("");
            }}
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
          <button className="px-4 py-2 rounded-full border flex items-center gap-2">
            <FolderPlus className="w-4 h-4" /> Import
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, tags, authors..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="rounded-xl border p-4 hover:shadow-sm transition"
          >
            {d.imageUrl && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img
                  src={`${API_BASE_URL}${d.imageUrl}`}
                  alt={d.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <h4 className="font-semibold">{d.title}</h4>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  d.publicationStatus === "Published"
                    ? "bg-green-100 text-green-700"
                    : d.publicationStatus === "Peer-reviewed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {d.publicationStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {d.abstract}
            </p>
            <div className="text-xs text-gray-500 mt-2">
              {d.authors.join(", ")}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span>{d.fileType}</span>
              <span>•</span>
              <span>{d.category}</span>
              <span>•</span>
              <span>Edited {new Date(d.lastEdited).toLocaleString()}</span>
            </div>
            {d.fileUrl && (
              <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                <FileText className="w-3 h-3" />
                <span>Document: {d.fileSize || "Available"}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {d.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditModal(d)}
                className="px-3 py-1 text-sm rounded-lg border"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (!d.id) {
                    setDocs((prev) => prev.filter((x) => x.id !== d.id));
                    return;
                  }
                  if (
                    window.confirm(
                      "Are you sure you want to delete this document?"
                    )
                  ) {
                    try {
                      const response = await instance.delete(
                        `${API_BASE_URL}/documents/${d.id}`
                      );
                      if (response.data.success) {
                        setDocs((prev) => prev.filter((x) => x.id !== d.id));
                      }
                    } catch (error) {
                      console.error("Failed to delete document:", error);
                      alert("Failed to delete document");
                    }
                  }
                }}
                className="px-3 py-1 text-sm rounded-lg border text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500">No documents found</div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={onSave}
            className="bg-white w-full max-w-3xl rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editing.id ? "Edit Document" : "Upload Document"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setPreviewImage(null);
                  setSelectedDocument(null);
                  setSelectedImage(null);
                  setUploadProgress("");
                }}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Title</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">DOI / Reference ID</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.doi || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, doi: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs mb-1">File Type</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.fileType}
                  onChange={(e) =>
                    setEditing({ ...editing, fileType: e.target.value as any })
                  }
                >
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>LaTeX</option>
                  <option>Markdown</option>
                </select>
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
                  <option>Algebra</option>
                  <option>Topology</option>
                  <option>Applied Math</option>
                  <option>Analysis</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Authors (comma separated)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.authors.join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      authors: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Abstract</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 h-28"
                  value={editing.abstract}
                  onChange={(e) =>
                    setEditing({ ...editing, abstract: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Tags (comma separated)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.tags.join(", ")}
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
              <div>
                <label className="block text-xs mb-1">Publication Status</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.publicationStatus}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      publicationStatus: e.target.value as any,
                    })
                  }
                >
                  <option>Draft</option>
                  <option>Peer-reviewed</option>
                  <option>Published</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Visibility</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.visibility}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      visibility: e.target.value as any,
                    })
                  }
                >
                  <option>Public</option>
                  <option>Internal</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Document File</label>
                <div className="flex items-center gap-2">
                  <input
                    ref={documentFileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.tex,.md"
                    onChange={(e) => handleFileChange(e, "document")}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="flex-1 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-600"
                  >
                    {selectedDocument?.name || editing.fileUrl ? (
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {selectedDocument?.name || "Document uploaded"}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Choose document file (PDF, DOCX, LaTeX, Markdown)
                      </span>
                    )}
                  </label>
                  {editing.fileUrl && (
                    <button
                      type="button"
                      onClick={removeDocument}
                      className="px-2 py-2 border rounded-lg hover:bg-red-50 text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editing.fileSize && (
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {editing.fileSize}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Image/Thumbnail</label>
                <div className="flex items-center gap-2">
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "image")}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex-1 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-600"
                  >
                    {selectedImage?.name || editing.imageUrl ? (
                      <span className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        {selectedImage?.name || "Image uploaded"}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Choose image file
                      </span>
                    )}
                  </label>
                  {(editing.imageUrl || previewImage) && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-2 py-2 border rounded-lg hover:bg-red-50 text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {(previewImage || editing.imageUrl) && (
                  <div className="mt-2 rounded-lg overflow-hidden border">
                    <img
                      src={
                        previewImage ||
                        (editing.imageUrl
                          ? `${API_BASE_URL}${editing.imageUrl}`
                          : "")
                      }
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            {uploadProgress && (
              <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                {uploadProgress}
              </div>
            )}
            <div className="rounded-lg border p-3">
              <div className="text-xs text-gray-600 mb-2">Version History</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {editing.versionHistory.map((v) => (
                  <div key={v.version} className="text-xs flex justify-between">
                    <span>
                      {v.version} — {new Date(v.date).toLocaleString()}
                    </span>
                    <span className="text-gray-500">{v.note}</span>
                  </div>
                ))}
                {editing.versionHistory.length === 0 && (
                  <div className="text-xs text-gray-500">No versions yet.</div>
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

export default DocumentsPage;
