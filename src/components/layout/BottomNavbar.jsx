/* ----------------- Bottom Navbar ----------------- */
import React from "react";
import { Home as HomeIcon, Search, Package, Bookmark, Menu } from "lucide-react";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#5C3A21] to-[#8B4513] shadow-lg rounded-t-2xl px-6 py-3 z-50 border-t-2 border-[#FFD700]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center text-[#FFD700]">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </div>
        <div className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-colors">
          <Package className="w-6 h-6" />
          <span className="text-xs">Kits</span>
        </div>
        <div className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-colors">
          <Bookmark className="w-6 h-6" />
          <span className="text-xs">Bookings</span>
        </div>
        <div className="flex flex-col items-center text-[#FFD700]/80 hover:text-[#FFC107] transition-colors">
          <Menu className="w-6 h-6" />
          <span className="text-xs">More</span>
        </div>
      </div>
    </div>
  );
}
