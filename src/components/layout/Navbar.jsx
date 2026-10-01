import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Menu, X, Mic } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, subscribeToAuthState } from "../../lib/supabaseAuth";
import { requireSupabase } from "../../lib/supabase";
import { getCurrentUserProfile, getRoleFromProfile, getVendorApplicationForUser } from "../../lib/roleAccess";
import toast from "react-hot-toast";

export default function Navbar({ onMicClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileInitial, setProfileInitial] = useState("S");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileRole, setProfileRole] = useState("");
  const [profileDestination, setProfileDestination] = useState({ path: "/userprofile", label: "View Profile" });
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (_event, session) => {
      const user = session?.user;
      if (!user) {
        setProfileInitial("S");
        setIsAdmin(false);
        setProfileRole("");
        setProfileDestination({ path: "/userprofile", label: "View Profile" });
        return;
      }

      try {
        const profile = await getCurrentUserProfile();
        const role = getRoleFromProfile(profile);
        setProfileRole(role);
        const application = await getVendorApplicationForUser(user.id);
        const applicationStatus = String(application?.status || profile?.vendorApplicationStatus || "").toUpperCase();
        const name = profile?.name || user.user_metadata?.name || user.email || "S";
        setProfileInitial(name.trim().charAt(0).toUpperCase());
        setIsAdmin(["ADMIN", "SUPER_ADMIN", "STAFF"].includes(role));
        setProfileDestination(role === "VENDOR" || applicationStatus === "APPROVED"
          ? { path: "/vendor/dashboard", label: "Vendor Dashboard" }
          : ["PENDING", "REJECTED"].includes(applicationStatus)
            ? { path: "/vendor-registration", label: "Vendor Application Status" }
            : { path: "/userprofile", label: "View Profile" });
      } catch (error) {
        console.error("Failed to read user data:", error);
        setProfileInitial("S");
        setIsAdmin(false);
        setProfileRole("");
        setProfileDestination({ path: "/userprofile", label: "View Profile" });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    let channel;
    const unsubscribe = subscribeToAuthState(async (_event, session) => {
      if (channel) { await requireSupabase().removeChannel(channel); channel = null; }
      const user = session?.user;
      if (!user) { if (active) setUnreadCount(0); return; }
      const client = requireSupabase();
      const refreshCount = async () => {
        const { count, error } = await client.from("notifications").select("id", { count: "exact", head: true }).eq("recipient_id", user.id).eq("is_read", false);
        if (error) { console.error("Could not refresh unread notification count:", error); return; }
        if (active) setUnreadCount(count || 0);
      };
      await refreshCount();
      channel = client.channel(`navbar-notifications:${user.id}`).on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `recipient_id=eq.${user.id}` }, refreshCount).subscribe();
    });
    return () => { active = false; unsubscribe(); if (channel) void requireSupabase().removeChannel(channel); };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Unable to log out. Please try again.");
      return;
    } finally {
    }

    toast.success("Logged out successfully");
    setShowProfileMenu(false);
    navigate("/login");
  };

  const menuItems = [
    { name: "Services", path: "/services" },
    { name: "Store", path: "/pujakits" },
    { name: "Pandit Booking", path: "/panditbooking" },
    { name: "Event", path: "/EventsPage" },
    { name: "Support", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-8 fixed w-full z-50 border-b border-orange-300"
    >
      <div className="flex items-center justify-between">

        {/* Logo + Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="sm:hidden text-white focus:outline-none p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/images/sanskaraa-logo.png"
                alt="Sanskaraa Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">Sanskaraa</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex space-x-4 md:space-x-6 text-white font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-orange-100 transition-colors text-sm md:text-base px-2 py-1 rounded-md hover:bg-white/10"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link to="/notifications">
            <span className="relative block">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:scale-110 transition-transform" />
              {unreadCount > 0 && <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-red-600 px-1 text-center text-[10px] font-bold leading-4 text-white">{unreadCount > 99 ? "99+" : unreadCount}</span>}
            </span>
          </Link>

          <button
            onClick={onMicClick}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-orange-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Mic size={16} className="sm:w-5 sm:h-5" />
          </button>

          {/* Profile Section */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-orange-500 border-2 border-white flex items-center justify-center font-semibold hover:scale-110 transition-transform cursor-pointer"
              onClick={() => navigate(profileDestination.path)}
            >
              {profileInitial}
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 top-full pt-2 w-44 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-orange-100 py-2 text-sm">

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate(profileDestination.path);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-700"
                  >
                    {profileDestination.label}
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/admin/dashboard");
                        }}
                        className="w-full text-left px-4 py-2 font-semibold text-[#7A1A1A] hover:bg-orange-50"
                      >
                        Admin Dashboard
                      </button>
                      {["ADMIN", "SUPER_ADMIN"].includes(profileRole) && <button
                        onClick={() => { setShowProfileMenu(false); navigate("/admin/vendors"); }}
                        className="w-full text-left px-4 py-2 font-semibold text-[#7A1A1A] hover:bg-orange-50"
                      >Vendor Approvals</button>}
                      {["ADMIN", "SUPER_ADMIN", "STAFF"].includes(profileRole) && <button
                        onClick={() => { setShowProfileMenu(false); navigate("/admin/leads"); }}
                        className="w-full text-left px-4 py-2 font-semibold text-[#7A1A1A] hover:bg-orange-50"
                      >Admin Leads</button>}
                      {profileRole === "SUPER_ADMIN" && <button
                        onClick={() => { setShowProfileMenu(false); navigate("/admin/users"); }}
                        className="w-full text-left px-4 py-2 font-semibold text-[#7A1A1A] hover:bg-orange-50"
                      >User Roles</button>}
                      {["ADMIN", "SUPER_ADMIN"].includes(profileRole) && <button
                        onClick={() => { setShowProfileMenu(false); navigate("/admin/analytics"); }}
                        className="w-full text-left px-4 py-2 font-semibold text-[#7A1A1A] hover:bg-orange-50"
                      >Analytics</button>}
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 text-red-600"
                  >
                    Log Out
                  </button>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden mt-3 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <ul className="flex flex-col gap-2 text-white font-medium p-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block hover:text-orange-100 py-2 px-3 rounded-md hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  onMicClick();
                  setMobileOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 py-2 px-3 hover:bg-white/10"
              >
                <Mic size={16} /> Voice Assistant
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
