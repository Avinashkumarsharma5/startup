import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react"; // bell icon

/* ----------------- Logo ----------------- */
function GradientLogo() {
  return (
    <div className="flex items-center">
      <img
        src="/assets/logo-icon.png"
        alt="Sanskaraa"
        className="h-9 w-9 sm:h-10 sm:w-10 mr-2 object-contain"
      />
      <span className="text-lg sm:text-xl font-bold text-[#FFD700]">
        Sanskaraa
      </span>
    </div>
  );
}

/* ----------------- Navbar ----------------- */
export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-[#5C3A21] to-[#8B4513] shadow-md py-4 px-6 flex justify-between items-center border-b-2 border-[#FFD700]"
    >
      {/* Logo */}
      <GradientLogo />

      {/* Nav Links */}
      <ul className="hidden sm:flex space-x-6 text-[#FFD700] font-medium">
        <li className="cursor-pointer hover:text-[#FFC107] transition-colors">Services</li>
        <li className="cursor-pointer hover:text-[#FFC107] transition-colors">Store</li>
        <li className="cursor-pointer hover:text-[#FFC107] transition-colors">Pandit Booking</li>
        <li className="cursor-pointer hover:text-[#FFC107] transition-colors">Event</li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] cursor-pointer hover:scale-110 transition-transform" />
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-[#FFD700] hover:scale-110 transition-transform"
        />
      </div>
    </motion.nav>
  );
}
