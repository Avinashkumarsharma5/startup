import React, { useState } from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const [role, setRole] = useState(null); // "vendor", "pandit", "shopkeeper"
  const [vendorType, setVendorType] = useState(null); // decorator, caterer, etc.

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: Search },
    { name: "Kits", path: "/pujakits", icon: Package },
    { name: "Bookings", path: "/BookingsPage", icon: Bookmark },
  ];

  // Registration Form Component
  const RegistrationForm = ({ type }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // 🚀 yaha aap backend API call karke data save karoge
      localStorage.setItem("isServiceProvider", "true");
      alert("🎉 Registration successful!");
      setRole(null);
      setVendorType(null);
      setShowMore(false); // modal close
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold text-[#5C3A21] mb-4">
          Register as {type === "pandit" ? "Pandit Ji" : type === "shopkeeper" ? "Shopkeeper" : vendorType}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Full Name" className="border p-2 rounded-lg" required />
          <input type="tel" placeholder="Phone Number" className="border p-2 rounded-lg" required />
          <input type="email" placeholder="Email Address" className="border p-2 rounded-lg" required />
          <input type="text" placeholder="Location/City" className="border p-2 rounded-lg" required />

          {type === "pandit" && (
            <textarea placeholder="Specialized Pujas (e.g. Satyanarayan, Grih Pravesh)" className="border p-2 rounded-lg" />
          )}

          {type === "shopkeeper" && (
            <textarea placeholder="Products (e.g. Puja Kits, Flowers, Samagri)" className="border p-2 rounded-lg" />
          )}

          {type === "vendor" && vendorType && (
            <textarea placeholder={`Services offered as ${vendorType}`} className="border p-2 rounded-lg" />
          )}

          <button type="submit" className="bg-[#FFD700] text-[#5C3A21] font-bold py-2 rounded-lg hover:bg-[#FFC107]">
            Submit Registration
          </button>
        </form>

        <button
          onClick={() => {
            setRole(null);
            setVendorType(null);
          }}
          className="mt-4 text-gray-600 underline"
        >
          Back
        </button>
      </div>
    );
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

      {/* More Options Modal */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-6 shadow-lg">
            {!role ? (
              <>
                <h2 className="text-lg font-semibold text-center text-[#5C3A21] mb-4">
                  Explore Sanskaraa
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setRole("vendor")}
                    className="w-full bg-[#FFD700] text-[#5C3A21] font-semibold py-2 px-4 rounded-xl text-center hover:bg-[#FFC107]"
                  >
                    Continue as a Vendor
                  </button>
                  <button
                    onClick={() => setRole("pandit")}
                    className="w-full bg-[#5C3A21] text-white font-semibold py-2 px-4 rounded-xl text-center hover:bg-[#70442A]"
                  >
                    Journey as Pandit Ji
                  </button>
                  <button
                    onClick={() => setRole("shopkeeper")}
                    className="w-full bg-[#8B4513] text-white font-semibold py-2 px-4 rounded-xl text-center hover:bg-[#A0522D]"
                  >
                    Journey as Shopkeeper
                  </button>

                  {/* ✅ My Profile button only if registered */}
                  {localStorage.getItem("isServiceProvider") === "true" && (
                    <Link
                      to="/service-provider/profile"
                      onClick={() => setShowMore(false)}
                      className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-xl text-center hover:bg-green-700"
                    >
                      My Profile
                    </Link>
                  )}
                </div>
              </>
            ) : role === "vendor" && !vendorType ? (
              <>
                <h2 className="text-lg font-semibold text-center text-[#5C3A21] mb-4">
                  Choose Your Vendor Service
                </h2>
                <div className="flex flex-col gap-3">
                  {["Decorator", "Caterer", "Videographer", "Hall Booking"].map((service) => (
                    <button
                      key={service}
                      onClick={() => setVendorType(service)}
                      className="w-full bg-[#FFD700] text-[#5C3A21] font-semibold py-2 px-4 rounded-xl text-center hover:bg-[#FFC107]"
                    >
                      {service}
                    </button>
                  ))}
                </div>
                <button onClick={() => setRole(null)} className="mt-4 text-gray-600 underline">
                  Back
                </button>
              </>
            ) : (
              <RegistrationForm type={role} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
