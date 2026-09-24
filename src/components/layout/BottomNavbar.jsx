import React, { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  Search,
  Package,
  Bookmark,
  Menu,
  User,
  LayoutDashboard,
  Users,
  BarChart3,
  CalendarCheck,
  Store,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [role, setRole] = useState(null);
  const [serviceProviderType, setServiceProviderType] = useState(null);

  useEffect(() => {
    try {
      const storedProfile = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      setRole(String(storedProfile?.role || "").toUpperCase() || null);
    } catch (error) {
      console.error("Unable to load navigation role:", error);
      setRole(null);
    }
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: Search },
    { name: "Kits", path: "/pujakits", icon: Package },
    { name: "Bookings", path: "/BookingsPage", icon: Bookmark },
  ];

  const openVendorProfile = () => {
    setShowMore(false);
    navigate("/service-provider/profile");
  };

  const quickLinks = [
    { name: "My Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Pandit Booking", path: "/pandit-booking", icon: CalendarCheck },
    { name: "Vendor Dashboard", path: "/vendor/dashboard", icon: Store },
    { name: "Vendor Registration", path: "/vendor-registration", icon: Users },
    ...(role && ["ADMIN", "SUPER_ADMIN", "STAFF"].includes(role)
      ? [
          { name: "Admin Leads", path: "/admin/leads", icon: Users },
          { name: "Vendor Approvals", path: "/admin/vendors", icon: Store },
          { name: "Admin Analytics", path: "/admin/analytics", icon: BarChart3 },
        ]
      : []),
  ];

  return (
    <>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg rounded-t-xl sm:rounded-t-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 z-50 border-t border-orange-300">
        <div className="flex justify-around items-center max-w-4xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "text-white scale-105"
                    : "text-white/80 hover:text-white hover:scale-105"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-xs mt-1 truncate">{item.name}</span>
              </Link>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-200 min-w-0 flex-1"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-xs mt-1 truncate">More</span>
          </button>
        </div>
      </div>

      {/* More Modal */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50" onClick={() => setShowMore(false)}>
          <div className="bg-white rounded-t-xl sm:rounded-t-2xl w-full max-w-md p-4 sm:p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-center text-[#800000] mb-3">
                Sanskaraa Quick Access
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMore(false)}
                      className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-3 text-xs font-semibold text-[#800000] transition hover:bg-orange-100"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {!role ? (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-center text-[#800000] mb-4 sm:mb-6">
                  Explore Sanskaraa
                </h2>
                <div className="flex flex-col gap-3">
                  {/* Vendor Registration */}
                  <button
                    onClick={() => setRole("vendor")}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Continue as Vendor
                  </button>

                  {/* Vendor Profile */}
                  <button
                    onClick={openVendorProfile}
                    className="w-full bg-[#800000] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#A52A2A] flex items-center justify-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" /> Vendor Profile
                  </button>
                </div>
              </>
            ) : !serviceProviderType ? (
              <>
                <h3 className="text-center font-semibold mb-4 text-[#800000]">Select Service Provider Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Pandit Ji","Shopkeeper","Decorator","Caterer","Astrologer"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setServiceProviderType(type)}
                      className="w-full bg-orange-100 text-[#800000] py-2 px-3 rounded-lg font-medium hover:bg-orange-200 transition-colors text-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to="/vendor-registration"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-orange-600 block text-center transition-colors"
                onClick={() => setShowMore(false)}
              >
                Fill Registration Form
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
