import React from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: Search },
    { name: "Kits", path: "/pujakits", icon: Package },
    { name: "Bookings", path: "/bookings", icon: Bookmark },
    { name: "More", path: "/more", icon: Menu },
  ];

  return (
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
      </div>
    </div>
  );
}
