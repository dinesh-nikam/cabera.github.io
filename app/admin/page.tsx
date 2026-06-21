import { KpiCard } from "@/components/admin/kpi-card";
import { BookingsChart } from "@/components/admin/bookings-chart";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { RecentBookings } from "@/components/admin/recent-bookings";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
        <p className="text-text-secondary">
          Overview of your cab booking platform
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Bookings"
          value="1,248"
          change="+12%"
          trend="up"
        />
        <KpiCard title="Revenue" value="₹8.4L" change="+8%" trend="up" />
        <KpiCard title="Active Drivers" value="42" change="+5%" trend="up" />
        <KpiCard title="New Leads" value="86" change="-3%" trend="down" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingsChart />
        <RevenueChart />
      </div>

      {/* Recent Bookings */}
      <RecentBookings />
    </div>
  );
}
