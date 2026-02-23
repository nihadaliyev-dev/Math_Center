import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "@/services/api";
import instance from "@/services/instance";

interface Researcher {
  id: string;
  fullName: string;
  email: string;
  affiliation?: string;
  bio?: string;
  role?: string;
  avatar?: string;
}

const ResearcherDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Researcher | null>(null);

  useEffect(() => {
    const fetchResearcher = async () => {
      if (!id) return;
      try {
        const response = await instance.get(`${API_BASE_URL}/researchers/${id}`);
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch researcher detail", error);
      }
    };

    fetchResearcher();
  }, [id]);

  if (!data) {
    return <div className="p-10 text-center text-gray-600">Researcher not found</div>;
  }

  const avatarUrl = data.avatar
    ? data.avatar.startsWith("http")
      ? data.avatar
      : `${API_BASE_URL}${data.avatar}`
    : "/mathematics_research_lab_logo.jpg";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/haqqimizda/emekdaslar" className="text-blue-600 hover:text-blue-800">
          ← Back to members
        </Link>

        <div className="bg-white border rounded-2xl p-8 mt-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={avatarUrl} alt={data.fullName} className="w-40 h-40 rounded-full object-cover" />
            <div>
              <h1 className="text-3xl font-bold">{data.fullName}</h1>
              <p className="text-gray-600 mt-2">{data.role || "Researcher"}</p>
              <p className="text-gray-600">{data.affiliation || "-"}</p>
              <p className="mt-3">{data.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-700">{data.bio || "No biography added yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDetail;
