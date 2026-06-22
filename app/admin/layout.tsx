import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#admin-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-luxury-400 text-background px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main
          id="admin-content"
          className="flex-1 p-6 overflow-auto"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
