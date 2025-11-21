import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Menu,
  X,
  Mic,
  Home,
  ShoppingBag,
  Users,
  Sparkles,
  User,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export default function Navbar({ onMicClick, notificationCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileInitial, setProfileInitial] = useState("S");
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Get initial letter from stored user
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const source = parsed?.name || parsed?.email || "";
        if (source) {
          setProfileInitial(source.trim().charAt(0).toUpperCase());
          return;
        }
      }
    } catch (error) {
      console.error("Failed to read user data:", error);
    }
    setProfileInitial("S");
  }, []);

  // Hide on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 10 && currentY > lastScrollY) {
        setHideOnScroll(true); // scrolling down → hide
      } else {
        setHideOnScroll(false); // scrolling up → show
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Unable to log out. Please try again.");
      return;
    } finally {
      localStorage.removeItem("loggedInUser");
    }

    toast.success("Logged out successfully");
    setShowProfileMenu(false);
    navigate("/login");
  };

  const menuItems = [
    { name: "Services", path: "/services" },
    { name: "Store", path: "/pujakits" },
    { name: "Pandit Booking", path: "/panditbooking" },
    { name: "Event", path: "/EventsPage" },
  ];

  const bottomNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Users },
    { name: "Store", path: "/pujakits", icon: ShoppingBag },
    { name: "Pandit", path: "/panditbooking", icon: Sparkles },
    { name: "Profile", path: "/UserProfile", icon: User },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* TOP NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hideOnScroll ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 backdrop-blur-md shadow-lg border-b border-orange-300/60 py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Mobile Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile Menu Button */}
              <button
                className="sm:hidden text-white focus:outline-none p-1"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
                  <img
                    src="/images/sanskaraa-logo.png"
                    alt="Sanskaraa Logo"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <span className="text-white font-bold text-lg sm:text-xl tracking-wide">
                  Sanskaraa
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden sm:flex space-x-4 md:space-x-6 text-white font-medium">
              {menuItems.map((item) => {
                const active = isActivePath(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`relative text-sm md:text-base px-2 py-1 rounded-md transition-colors
                        ${
                          active
                            ? "text-yellow-200"
                            : "text-white hover:text-orange-100"
                        }
                        after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px]
                        after:bg-white after:transition-all after:duration-300
                        ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}
                      `}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Notifications with badge */}
              <div className="relative">
                <Link to="/notifications">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:scale-110 transition-transform" />
                </Link>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full px-0.5">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </div>

              {/* Voice Assistant Button (desktop + tablet) */}
              <button
                onClick={onMicClick}
                className="hidden sm:flex w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-orange-500 items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Mic size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-orange-500 border-2 border-white flex items-center justify-center font-semibold hover:scale-110 transition-transform cursor-pointer shadow-sm"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  {profileInitial}
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-orange-100 py-2 text-sm z-50">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/UserProfile");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-700"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-orange-50 text-red-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu (under top navbar) */}
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="sm:hidden mt-2 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <ul className="flex flex-col gap-1 text-white font-medium p-3">
                {menuItems.map((item) => {
                  const active = isActivePath(item.path);
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`block py-2 px-3 rounded-md transition-colors ${
                          active
                            ? "bg-white/20 text-yellow-200"
                            : "hover:bg-white/10 hover:text-orange-100"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => {
                      onMicClick();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2 py-2 px-3 rounded-md hover:bg-white/10 hover:text-orange-100"
                  >
                    <Mic size={16} /> Voice Assistant
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* FLOATING MIC BUTTON (MOBILE ONLY) */}
      <button
        onClick={onMicClick}
        className="sm:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-orange-500 shadow-xl flex items-center justify-center active:scale-95 transition-transform"
      >
        <Mic className="w-6 h-6 text-white" />
      </button>

      {/* BOTTOM NAVBAR (MOBILE ONLY) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] z-40">
        <ul className="flex justify-between items-center px-2 py-1">
          {bottomNavItems.map((item) => {
            const active = isActivePath(item.path);
            const Icon = item.icon;
            return (
              <li key={item.name} className="flex-1">
                <Link
                  to={item.path}
                  className="flex flex-col items-center justify-center py-1.5 gap-0.5 text-[11px]"
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      active
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span
                    className={`${
                      active
                        ? "text-orange-600 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
