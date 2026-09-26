import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  Settings,
  ShieldCheck,
  Store,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, isFirebaseConfigured, signOut } from "../lib/firebase";
import { fetchAdminDashboardData, formatDashboardDate } from "../lib/adminDashboard";

const cardStyles = [
  "border-amber-200 bg-amber-50 text-amber-800",
  "border-blue-200 bg-blue-50 text-blue-800",
  "border-violet-200 bg-violet-50 text-violet-800",
  "border-emerald-200 bg-emerald-50 text-emerald-800",
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      setData(await fetchAdminDashboardData());
    } catch (loadError) {
      console.error("Unable to load admin dashboard:", loadError);
      setError(loadError.message || "Dashboard data could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = async () => {
    try {
      if (isFirebaseConfigured) await signOut(auth);
      localStorage.removeItem("loggedInUser");
      navigate("/login", { replace: true });
    } catch (logoutError) {
      console.error("Admin logout failed:", logoutError);
      toast.error("Unable to logout. Please try again.");
    }
  };

  const links = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Leads", path: "/admin/leads", icon: Users },
    { label: "Vendor Approvals", path: "/admin/vendors", icon: Store },
    { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { label: "Services", path: "/services", icon: Settings },
  ];

  if (loading) return <div className="min-h-screen bg-[#FFF9F2] p-8 text-slate-700">Loading admin dashboard...</div>;
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] p-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <h1 className="text-xl font-bold">Dashboard unavailable</h1>
          <p className="mt-2 text-sm">{error}</p>
          <button type="button" onClick={loadDashboard} className="mt-4 rounded-full bg-[#7A1A1A] px-4 py-2 text-sm font-semibold text-white">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    ["Total Leads", data.stats.totalLeads],
    ["New Leads", data.stats.newLeads],
    ["Total Bookings", data.stats.totalBookings],
    ["Confirmed Bookings", data.stats.confirmedBookings],
    ["Total Customers", data.stats.totalCustomers],
    ["Total Vendors", data.stats.totalVendors],
    ["Pending Approvals", data.stats.pendingVendors],
    ["Revenue", `₹${data.revenue.toLocaleString("en-IN")}`],
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-slate-800">
      <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed left-4 top-4 z-40 rounded-xl bg-[#7A1A1A] p-2 text-white lg:hidden">
        {sidebarOpen ? <X /> : <Menu />}
      </button>
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-64 border-r border-[#E8D19B] bg-[#7A1A1A] p-5 text-white transition-transform lg:translate-x-0`}>
        <div className="mb-8 flex items-center gap-3">
          <img src="/images/sanskaraa-logo.png" alt="Sanskaraa" className="h-10 w-10 rounded-full bg-white p-1" />
          <div><p className="font-bold">Sanskaraa</p><p className="text-xs text-orange-200">Admin Console</p></div>
        </div>
        <nav className="space-y-2">
          {links.map(({ label, path, icon: Icon }) => (
            <Link key={path} to={path} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-orange-100 hover:bg-white/10 hover:text-white">
              <Icon className="h-5 w-5" /> {label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={handleLogout} className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-orange-100 hover:bg-white/10 hover:text-white">
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </aside>

      <main className="lg:ml-64">
        <header className="flex items-center justify-between border-b border-[#E8D19B] bg-white px-5 py-4 pl-16 lg:pl-8">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24D]">Admin Dashboard</p><h1 className="text-2xl font-bold text-[#7A1A1A]">Good day, Admin</h1></div>
          <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-slate-500" /><button type="button" onClick={loadDashboard} className="rounded-full border border-slate-200 p-2"><RefreshCw className="h-4 w-4" /></button><div className="rounded-full bg-[#7A1A1A] px-3 py-2 text-sm font-semibold text-white">ADMIN</div></div>
        </header>

        <div className="p-5 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map(([label, value], index) => (
              <div key={label} className={`rounded-2xl border p-4 ${cardStyles[index % cardStyles.length]}`}>
                <p className="text-sm font-medium opacity-80">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <DashboardList title="Recent Leads" icon={Users} rows={data.recentLeads} empty="No leads yet." render={(row) => <><b>{row.name || "Unnamed lead"}</b><span>{row.service || "General enquiry"} · {row.status || "NEW"}</span><small>{formatDashboardDate(row.createdAt)}</small></>} />
            <DashboardList title="Recent Bookings" icon={CalendarCheck} rows={data.recentBookings} empty="No bookings yet." render={(row) => <><b>{row.service || row.name || "Booking"}</b><span>{row.bookingStatus || row.status || "PENDING"}</span><small>{formatDashboardDate(row.createdAt)}</small></>} />
            <DashboardList title="Pending Vendor Approvals" icon={ShieldCheck} rows={data.pendingVendors} empty="No pending approvals." render={(row) => <><b>{row.name || "Unnamed vendor"}</b><span>{row.vendorType || "Vendor"}</span><small>{formatDashboardDate(row.submittedAt)}</small></>} />
            <DashboardList title="Today's Follow-ups" icon={Bell} rows={data.followUpsToday} empty="No follow-ups today." render={(row) => <><b>{row.name || "Lead"}</b><span>{row.service || "Enquiry"}</span><small>{row.nextFollowUpAt || "Today"}</small></>} />
          </div>

          <div className="mt-8 rounded-2xl border border-[#E8D19B] bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-[#7A1A1A]">Quick Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[["Manage Leads", "/admin/leads"], ["Approve Vendors", "/admin/vendors"], ["Manage Bookings", "/admin/bookings"], ["View Analytics", "/admin/analytics"], ["Manage Services", "/services"]].map(([label, path]) => <Link key={path} to={path} className="rounded-xl bg-[#FFF7E2] px-4 py-3 text-center text-sm font-semibold text-[#7A1A1A] hover:bg-[#FBE9B5]">{label}</Link>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardList({ title, icon: Icon, rows, empty, render }) {
  return (
    <section className="rounded-2xl border border-[#E8D19B] bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#7A1A1A]"><Icon className="h-5 w-5" /> {title}</h2>
      <div className="space-y-3">
        {rows.length ? rows.map((row) => <div key={row.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm">{render(row)}</div>) : <p className="text-sm text-slate-500">{empty}</p>}
      </div>
    </section>
  );
}
