import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Menu, X, Mic, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import sanskaraaLogo from "../../assets/images/sanskaraa-logo.png";

export default function Navbar({ onMicClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

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
      className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-8 fixed w-full z-50 border-b border-orange-300"
    >
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="sm:hidden text-white focus:outline-none p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
    <img
      src={sanskaraaLogo}
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:scale-110 transition-transform" />

          {/* Voice Assistant Button */}
          <button
            onClick={onMicClick}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-orange-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Mic size={16} className="sm:w-5 sm:h-5" />
          </button>

          <img
            src="https://randomuser.me/api/portraits/lego/0.jpg"
            alt="Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white hover:scale-110 transition-transform cursor-pointer"
            onClick={() => navigate("/UserProfile")}
          />
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="sm:hidden mt-3 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <ul className="flex flex-col gap-2 text-white font-medium p-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="block hover:text-orange-100 transition-colors py-2 px-3 rounded-md hover:bg-white/10" 
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
                className="w-full text-left flex items-center gap-2 hover:text-orange-100 py-2 px-3 rounded-md hover:bg-white/10"
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
