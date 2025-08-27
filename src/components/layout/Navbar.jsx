import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Services", path: "/services" },
    { name: "Store", path: "/pujakits" },
    { name: "Pandit Booking", path: "/panditbooking" },
    { name: "Event", path: "/EventsPage" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-[#5C3A21] to-[#8B4513] shadow-md py-4 px-4 sm:px-6 md:px-8 fixed w-full z-50 border-b-2 border-[#FFD700]"
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <button
            className="sm:hidden text-[#FFD700] focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo placeholder */}
          {/* <GradientLogo /> */}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 text-[#FFD700] font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-[#FFC107] transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] cursor-pointer hover:scale-110 transition-transform" />
          <img
            src="https://randomuser.me/api/portraits/lego/0.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#FFD700] hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="sm:hidden mt-4 flex flex-col gap-3 text-[#FFD700] font-medium"
        >
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-[#FFC107] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
