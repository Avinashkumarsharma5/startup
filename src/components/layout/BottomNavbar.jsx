import React, { useState } from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import VendorRegistration from "./VendorRegistration";

export default function BottomNavbar() {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const [role, setRole] = useState(null);
  const [vendorType, setVendorType] = useState(null);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: Search },
    { name: "Kits", path: "/pujakits", icon: Package },
    { name: "Bookings", path: "/bookings", icon: Bookmark },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#5C3A21] to-[#8B4513] shadow-lg rounded-t-2xl px-6 py-3 z-50 border-t-2 border-[#FFD700]">
        <div className="flex justify-around items-center max-w-4xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center transition-all duration-200 ${isActive ? "text-[#FFD700] scale-110" : "text-[#FFD700]/80 hover:text-[#FFC107] hover:scale-105"}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}

          <button onClick={() => setShowMore(!showMore)} className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-all duration-200">
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
                <h2 className="text-lg font-semibold text-center text-[#5C3A21] mb-4">Explore Sanskaraa</h2>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setRole("vendor")} className="w-full bg-[#FFD700] text-[#5C3A21] font-semibold py-2 px-4 rounded-xl hover:bg-[#FFC107]" title="Register as vendor to sell services">
                    Continue as a Vendor
                  </button>
                  <button onClick={() => setRole("pandit")} className="w-full bg-[#5C3A21] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#70442A]">
                    Journey as Pandit Ji
                  </button>
                  <button onClick={() => setRole("shopkeeper")} className="w-full bg-[#8B4513] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#A0522D]">
                    Journey as Shopkeeper
                  </button>
                  {localStorage.getItem("isServiceProvider") === "true" && (
                    <Link to="/service-provider/profile" onClick={() => setShowMore(false)} className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-xl text-center hover:bg-green-700">
                      My Profile
                    </Link>
                  )}
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <button className="w-full bg-gray-100 text-black py-2 rounded-xl hover:bg-gray-200">Events</button>
                  <button className="w-full bg-gray-100 text-black py-2 rounded-xl hover:bg-gray-200">Offers</button>
                  <button className="w-full bg-gray-100 text-black py-2 rounded-xl hover:bg-gray-200">Help & Support</button>
                  <button className="w-full bg-gray-100 text-black py-2 rounded-xl hover:bg-gray-200">Feedback</button>
                </div>
              </>
            ) : (
              <VendorRegistration role={role} vendorType={vendorType} setRole={setRole} setVendorType={setVendorType} setShowMore={setShowMore} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
