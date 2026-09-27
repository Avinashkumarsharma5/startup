import React, { useEffect, useMemo, useState } from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../../lib/firebase";
import { getCurrentUserProfile, getMoreMenuItems, getVendorApplicationForUser, getRoleFromProfile } from "../../lib/roleAccess";
import toast from "react-hot-toast";

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [profile, setProfile] = useState(null);
  const [vendorApplication, setVendorApplication] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setProfile(null);
        setVendorApplication(null);
        return;
      }

      try {
        const userProfile = (await getCurrentUserProfile()) || { uid: user.uid, role: "CUSTOMER" };
        const application = await getVendorApplicationForUser(user.uid);
        setProfile(userProfile);
        setVendorApplication(application);
      } catch (error) {
        console.error("Unable to load navigation role:", error);
        setProfile(null);
        setVendorApplication(null);
      }
    });

    return () => unsubscribe();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("loggedInUser");
      setShowMore(false);
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: Search },
    { name: "Kits", path: "/pujakits", icon: Package },
    { name: "Bookings", path: "/BookingsPage", icon: Bookmark },
  ];

  const moreItems = useMemo(
    () => getMoreMenuItems({ profile, vendorApplication, logoutAction: handleLogout }),
    [profile, vendorApplication]
  );

  return (
    <>
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
                  isActive ? "text-white scale-105" : "text-white/80 hover:text-white hover:scale-105"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-xs mt-1 truncate">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-200 min-w-0 flex-1"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-xs mt-1 truncate">More</span>
          </button>
        </div>
      </div>

      {showMore && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50" onClick={() => setShowMore(false)}>
          <div className="bg-white rounded-t-xl sm:rounded-t-2xl w-full max-w-md p-4 sm:p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-center text-[#800000] mb-4">
                {profile ? "Quick Access" : "More"}
              </h2>
              <div className="space-y-2">
                {moreItems.map((item) =>
                  item.action ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setShowMore(false);
                        item.action();
                      }}
                      className="w-full rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-700"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setShowMore(false)}
                      className="block rounded-xl border border-orange-100 bg-orange-50 px-3 py-3 text-sm font-semibold text-[#800000]"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
