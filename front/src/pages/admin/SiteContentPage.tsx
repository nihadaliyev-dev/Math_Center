import React, { useState } from "react";
import {
  Monitor,
  Link as LinkIcon,
  Palette,
  Eye,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface FooterLink {
  label: string;
  url: string;
}

const SiteContentPage: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState("Mathematics Research Center");
  const [heroImage, setHeroImage] = useState("");
  const [ctaText, setCtaText] = useState("Explore Research");
  const [about, setAbout] = useState(
    "Our center focuses on algebra, topology, and applied mathematics..."
  );
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
    { label: "University", url: "https://example.edu" },
  ]);
  const [contact, setContact] = useState({
    email: "info@example.com",
    phone: "+994 50 000 00 00",
    address: "Baku, Azerbaijan",
  });
  const [theme, setTheme] = useState<"Light" | "Dark" | "Institutional">(
    "Light"
  );

  // TODO API: load/save homepage/about/footer/contact/theme settings

  const addFooterLink = () =>
    setFooterLinks((prev) => [...prev, { label: "", url: "" }]);

  return (
    <div className="rounded-[2rem] bg-white p-6 space-y-6">
      <h1 className="text-xl font-semibold">Site Content & Appearance</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Homepage Hero Settings
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Title</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Call to Action</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Hero Image URL</label>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3">About Page Editor</div>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-40"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </section>

          <section className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Footer Links Editor
            </div>
            <div className="space-y-2">
              {footerLinks.map((l, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Label"
                    value={l.label}
                    onChange={(e) =>
                      setFooterLinks((prev) =>
                        prev.map((x, i) =>
                          i === idx ? { ...x, label: e.target.value } : x
                        )
                      )
                    }
                  />
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="URL"
                    value={l.url}
                    onChange={(e) =>
                      setFooterLinks((prev) =>
                        prev.map((x, i) =>
                          i === idx ? { ...x, url: e.target.value } : x
                        )
                      )
                    }
                  />
                </div>
              ))}
              <button
                onClick={addFooterLink}
                className="mt-2 px-3 py-1 rounded-lg border"
              >
                Add Link
              </button>
            </div>
          </section>

          <section className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3">
              Contact Info Editor
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Homepage Preview
            </div>
            <div className="rounded-lg overflow-hidden border bg-gray-50">
              <div className="p-3 text-xs text-gray-500">{heroTitle}</div>
              <div className="h-24 bg-gray-200 flex items-center justify-center text-xs">
                {heroImage ? "Image preview" : "No image"}
              </div>
              <div className="p-3 text-xs">CTA: {ctaText}</div>
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Theme
            </div>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
            >
              <option>Light</option>
              <option>Dark</option>
              <option>Institutional</option>
            </select>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3">Banner Manager</div>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Upload hero images (URL)"
            />
          </div>
        </aside>
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded-lg border">Discard</button>
        <button className="px-4 py-2 rounded-lg bg-black text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SiteContentPage;
