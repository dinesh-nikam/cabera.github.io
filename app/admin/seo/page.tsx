import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const seoPages = [
  {
    id: 1,
    slug: "pune-to-mumbai-cab",
    title: "Pune to Mumbai Cab Service",
    status: "PUBLISHED",
    views: 1245,
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    slug: "hinjewadi-cab-service",
    title: "Hinjewadi Cab Service",
    status: "PUBLISHED",
    views: 892,
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    slug: "pune-airport-taxi",
    title: "Pune Airport Taxi",
    status: "DRAFT",
    views: 0,
    lastUpdated: "Today",
  },
];

export default function AdminSEOPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">SEO Pages</h1>
          <p className="text-text-secondary">Manage programmatic SEO pages</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder="Search pages..."
          className="input-luxury pl-12 w-full"
        />
      </div>

      <div className="card-luxury overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr className="text-left">
              <th className="p-4 font-medium">Page</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Views</th>
              <th className="p-4 font-medium">Last Updated</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seoPages.map((page) => (
              <tr
                key={page.id}
                className="border-b border-white/5 hover:bg-luxury-400/5 transition-colors"
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium">{page.title}</p>
                    <p className="text-sm text-text-secondary">/{page.slug}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      page.status === "PUBLISHED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="p-4">{page.views.toLocaleString()}</td>
                <td className="p-4 text-sm">{page.lastUpdated}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-luxury-400/10 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-luxury-400/10 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-red-500/10 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
