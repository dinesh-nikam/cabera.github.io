"use client";

import {
  LayoutDashboard,
  Car,
  Users,
  LineChart,
  Ticket,
  Tag,
  Building2,
  FileText,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Ticket },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/leads", label: "Leads", icon: Building2 },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: LineChart },
  { href: "/admin/seo-pages", label: "SEO Pages", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface/50 backdrop-blur-lg h-screen sticky top-0 p-4 hidden md:block">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-luxury-400 text-background"
                  : "text-text-secondary hover:bg-luxury-400/10 hover:text-luxury-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
