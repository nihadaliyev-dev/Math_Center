import React, { useMemo, useState, useEffect } from "react";
import {
  CalendarClock,
  MapPin,
  Globe2,
  User,
  Users,
  Plus,
  Search,
} from "lucide-react";
import { getAll, post, put, remove } from "@/services/commonRequest";
import { Endpoints } from "@/enums/endpoints";

interface EventItem {
  id?: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: "Online" | "On-Campus";
  organizer?: string;
  speakers?: string[];
  registrationLink?: string;
  coverImage?: string;
  tags?: string[];
  status?: "Draft" | "Published" | "Cancelled";
  createdAt?: number;
  updatedAt?: string;
}

const EventsManagement: React.FC = () => {
  const [items, setItems] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAll<{ data: EventItem[] }>(Endpoints.events);
      console.log(response);
      setItems(response.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const upcoming = useMemo(
    () => items.filter((e) => new Date(e.startDate) >= new Date()),
    [items]
  );
  const past = useMemo(
    () => items.filter((e) => new Date(e.startDate) < new Date()),
    [items]
  );

  const filteredUpcoming = upcoming.filter((e) =>
    e.title?.toLowerCase().includes(query.toLowerCase())
  );
  const filteredPast = past.filter((e) =>
    e.title?.toLowerCase().includes(query.toLowerCase())
  );

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    try {
      if (editing.id) {
        // Update existing event
        const updated = await put<EventItem, Partial<EventItem>>(
          Endpoints.events,
          editing.id,
          editing
        );
        setItems((prev) =>
          prev.map((x) => (x.id === editing.id ? { ...x, ...updated } : x))
        );
      } else {
        // Create new event
        const created = await post<EventItem, Partial<EventItem>>(
          Endpoints.events,
          editing
        );
        setItems((prev) => [created, ...prev]);
      }
      setEditing(null);
      fetchEvents(); // Refresh the list
    } catch (err) {
      console.error("Error saving event:", err);
      alert("Failed to save event");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await remove<EventItem>(Endpoints.events, id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event");
    }
  };

  const EventCard: React.FC<{ ev: EventItem }> = ({ ev }) => (
    <div className="rounded-xl border p-4 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{ev.title || "Untitled Event"}</h4>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
          {ev.status || "Draft"}
        </span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
        {ev.description || "No description"}
      </p>
      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
        <span className="flex items-center gap-1">
          <CalendarClock className="w-3 h-3" />
          {new Date(ev.startDate).toLocaleString()} –{" "}
          {new Date(ev.endDate).toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          {ev.location === "Online" ? (
            <Globe2 className="w-3 h-3" />
          ) : (
            <MapPin className="w-3 h-3" />
          )}
          {ev.location || "TBA"}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {ev.organizer || "Unknown"}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {ev.speakers?.length || 0} speakers
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {ev.tags?.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            {t}
          </span>
        )) || <span className="text-xs text-gray-400">No tags</span>}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setEditing(ev)}
          className="px-3 py-1 text-sm rounded-lg border"
        >
          Edit
        </button>
        <button
          onClick={() => ev.id && handleDelete(ev.id)}
          className="px-3 py-1 text-sm rounded-lg border text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="rounded-[2rem] bg-white p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 space-y-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
          <button onClick={fetchEvents} className="ml-4 underline">
            Retry
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Events Management</h1>
        <button
          onClick={() =>
            setEditing({
              title: "",
              description: "",
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              location: "Online",
              organizer: "",
              speakers: [],
              tags: [],
              status: "Draft",
            })
          }
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white"
        >
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 w-full md:w-80">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUpcoming.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
          {filteredUpcoming.length === 0 && (
            <div className="text-gray-500 text-sm">No upcoming events</div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Past Events Archive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPast.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
          {filteredPast.length === 0 && (
            <div className="text-gray-500 text-sm">No past events</div>
          )}
        </div>
      </section>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={onSave}
            className="bg-white w-full max-w-3xl rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {editing.id ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Title</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.title || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Organizer</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.organizer || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, organizer: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.startDate.slice(0, 16)}
                  onChange={(e) =>
                    setEditing({ ...editing, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs mb-1">End Date</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.endDate.slice(0, 16)}
                  onChange={(e) =>
                    setEditing({ ...editing, endDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Location</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.location}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value as any })
                  }
                >
                  <option>Online</option>
                  <option>On-Campus</option>
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
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Speakers (comma separated)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.speakers?.join(", ") || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      speakers: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Registration Link</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.registrationLink || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, registrationLink: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Cover Image URL</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.coverImage || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, coverImage: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">
                  Tags (comma separated)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={editing.tags?.join(", ") || ""}
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
                <label className="block text-xs mb-1">Description</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 h-32"
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
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
                className="px-4 py-2 rounded-lg bg-black text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventsManagement;
