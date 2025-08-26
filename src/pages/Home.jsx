import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  User,
  Calendar,
  Package,
  Sparkles,
  Bookmark,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { link } from "framer-motion/client";
import EventsPage from "./EventsPage";

/* ----------------- Search Bar ----------------- */
function AnimatedSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-6"
    >
      <div className="flex items-center bg-[#FFF7E0] rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400 transition-all shadow-sm">
        <Search className="w-5 h-5 text-orange-500" />
        <input
          type="text"
          placeholder="Search pujas, pandits..."
          className="ml-2 bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
        />
      </div>
    </motion.div>
  );
}

/* ----------------- Hero Banner ----------------- */
function HeroBanner() {
  const slides = [
    {
      id: 1,
      img: "https://tse4.mm.bing.net/th/id/OIP.6edUbnuA_BxJrjfBY11BSAHaEO?w=1200&h=686&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Griha Pravesh Puja",
      subtitle: "Sacred beginnings with blessings",
    },
    {
      id: 2,
      img: "https://tse3.mm.bing.net/th/id/OIP.K5DFatDkEfxEGeCEe0Z8ygHaEO?w=1344&h=768&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Satyanarayan Puja",
      subtitle: "Invoke prosperity & harmony",
    },
    {
      id: 3,
      img: "https://as2.ftcdn.net/v2/jpg/05/44/08/21/1000_F_544082192_7efjldpSJLEM7EnlxmFqYX2C4VwG80Z3.jpg",
      title: "Wedding Rituals",
      subtitle: "Memorable sacred unions",
    },
  ];

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const start = () => {
    stop();
    timerRef.current = setInterval(next, 4000);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    start();
    return stop;
  }, []);

  return (
    <div
      className="relative mt-6 rounded-3xl overflow-hidden shadow-lg"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className="flex w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="w-full shrink-0 relative h-64 sm:h-72 md:h-80">
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-5 bottom-5 text-white drop-shadow-md">
              <p className="text-sm opacity-90">{s.subtitle}</p>
              <h3 className="text-xl sm:text-2xl font-bold">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-2 shadow-md hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-2 shadow-md hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              index === i ? "w-6 bg-orange-500" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------- Services ----------------- */
import { useNavigate } from "react-router-dom"; // <-- Add this

function ServicesSection() {
  const navigate = useNavigate(); // <-- Create navigate function

  const services = [
    { name: "Book Event", icon: Calendar, path: "/EventsPage" },
    { name: "Book Pandit", icon: User, path: "/panditbooking" },
    { name: "Puja Kits", icon: Package, path: "/pujakits" },
    { name: "services", icon: Sparkles, path: "/services" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={service.name}
            onClick={() => navigate(service.path)} // <-- Now works
            className="bg-[#FFF7E0] rounded-2xl p-4 text-center shadow hover:shadow-lg border border-orange-200 transition"
          >
            <Icon className="mx-auto w-7 h-7 text-orange-500" />
            <p className="font-medium text-gray-800 mt-2">{service.name}</p>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ----------------- Promo Banner ----------------- */
function GaneshPromo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-5 flex items-center justify-between shadow-lg"
    >
      <div className="flex items-center gap-4">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.rUHDO5E0p0FGE7EIKxElpwHaHb?pid=Api&P=0&h=180"
          alt="Ganesh Ji"
          className="w-14 h-14"
        />
        <h3 className="text-lg font-bold text-[#800000]">
          Ganesh Chaturthi Puja
        </h3>
      </div>
      <button className="bg-[#800000] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A52A2A]">
        Book Now
      </button>
    </motion.div>
  );
}

/* ----------------- Pandit Profile ----------------- */
function PanditProfile() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-5">Pandit Ji Profile</h3>
      <div className="bg-[#FFF7E0] rounded-2xl p-20 shadow-md border border-orange-200 space-y-4">
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.InT1MAwd-CrF5LOkyF34XQHaFB?pid=Api&P=0&h=180"
            alt="Pandit Ji"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-base font-semibold text-gray-800">Pandit Ram Sharma</p>
        <p className="text-sm text-gray-600">
          Specializes in Satyanarayan, Griha Pravesh, Marriage
        </p>
        <div className="flex justify-between">
          <button className="border border-gray-400 px-4 py-1 rounded text-gray-700 hover:bg-gray-100">
            Call
          </button>
          <button className="bg-[#800000] text-white px-4 py-1 rounded hover:bg-[#A52A2A]">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Puja Kits ----------------- */
function PujaKits() {
  const kits = [
    { title: "Grih Pravesh Kit", price: "₹999" },
    { title: "Satyanarayan Kit", price: "₹799" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-2">Puja Kits</h3>
      <div className="grid grid-cols-2 gap-4">
        {kits.map((kit) => (
          <motion.div
            key={kit.title}
            whileHover={{ scale: 1.03 }}
            className="bg-[#FFF7E0] p-4 rounded-2xl shadow-md border border-orange-200 transition"
          >
            <h4 className="font-medium text-gray-800">{kit.title}</h4>
            <p className="text-sm text-gray-600">{kit.price}</p>
            <button className="mt-3 w-full bg-[#800000] text-white py-2 rounded hover:bg-[#A52A2A]">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ----------------- Bottom Navbar ----------------- */
function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFF7E0] shadow-lg rounded-t-2xl px-6 py-3 z-50 border-t border-orange-200">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center text-[#800000]">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Search className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Package className="w-6 h-6" />
          <span className="text-xs">Kits</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Bookmark className="w-6 h-6" />
          <span className="text-xs">Bookings</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Menu className="w-6 h-6" />
          <span className="text-xs">More</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Floating Cart ----------------- */
function FloatingCart() {
  return (
    <motion.div
      className="fixed bottom-20 right-5 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <button className="bg-[#800000] text-white rounded-full p-3 shadow-lg hover:bg-[#A52A2A]">
        <ShoppingCart size={22} />
      </button>
    </motion.div>
  );
}

/* ----------------- Main Home ----------------- */
export default function Home() {
  return (
    <main className="min-h-screen pb-24 p-6 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] font-sans text-gray-800 relative mt-5
    ">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <p className="text-gray-600 text-sm">Good morning,</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#800000]">Avinash Sharma</h2>
      </motion.div>

      <AnimatedSearch />
      <HeroBanner />
      <ServicesSection />
      <GaneshPromo />
      <PanditProfile />
      <PujaKits />

      <FloatingCart />
      <BottomNavbar />
    </main>
  );
}
