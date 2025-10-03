import React, { useState } from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [role, setRole] = useState(null);
  const [serviceProviderType, setServiceProviderType] = useState(null);

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

  return (
    <>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#5C3A21] to-[#8B4513] shadow-lg rounded-t-2xl px-6 py-3 z-50 border-t-2 border-[#FFD700]">
        <div className="flex justify-around items-center max-w-4xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center transition-all duration-200 ${
                  isActive
                    ? "text-[#FFD700] scale-110"
                    : "text-[#FFD700]/80 hover:text-[#FFC107] hover:scale-105"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>

      {/* More Modal */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-6 shadow-lg">
            {!role ? (
              <>
                <h2 className="text-lg font-semibold text-center text-[#5C3A21] mb-4">
                  Explore Sanskaraa
                </h2>
                <div className="flex flex-col gap-3">
                  {/* Vendor Registration */}
                  <button
                    onClick={() => setRole("vendor")}
                    className="w-full bg-[#FFD700] text-[#5C3A21] py-2 px-4 rounded-xl font-semibold hover:bg-[#FFC107]"
                  >
                    Continue as Vendor
                  </button>

                  {/* Vendor Profile */}
                  <button
                    onClick={openVendorProfile}
                    className="w-full bg-[#5C3A21] text-white py-2 px-4 rounded-xl font-semibold hover:bg-[#70442A] flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" /> Vendor Profile
                  </button>
                </div>
              </>
            ) : !serviceProviderType ? (
              <>
                <h3 className="text-center font-semibold mb-3">Select Service Provider Type</h3>
                {["Pandit Ji","Shopkeeper","Decorator","Caterer","Astrologer"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setServiceProviderType(type)}
                    className="w-full bg-[#FFD700]/70 text-[#5C3A21] py-2 px-4 rounded-xl font-semibold hover:bg-[#FFC107]"
                  >
                    {type}
                  </button>
                ))}
              </>
            ) : (
              <Link
                to="/vendor-registration"
                className="w-full bg-[#FFD700] text-[#5C3A21] py-2 px-4 rounded-xl font-semibold hover:bg-[#FFC107] block text-center"
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
