import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon, // 👈 FIX: Rename icon
  Heart,
  MessageSquare,
  User,
  Calendar,
  Star,
  Package,
  Sparkles,
} from "lucide-react";

/* ----------------- Logo ----------------- */
function GradientLogo() {
  return (
    <div className="flex items-center">
      <img
        src="sanskaraa-logo.png"
        alt="Sanskaraa"
        className="h-9 w-9 sm:h-10 sm:w-10 mr-2 object-contain"
      />
      <span className="text-lg sm:text-xl font-bold text-gray-800">
        Sanskaraa
      </span>
    </div>
  );
}

/* ----------------- Navbar ----------------- */
function HeaderNavbar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between flex-wrap gap-4"
    >
      <GradientLogo />
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border border-gray-200 hover:scale-110 transition-transform"
        />
      </div>
    </motion.div>
  );
}

/* ----------------- Search Bar ----------------- */
function AnimatedSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-4"
    >
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400 transition-all">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search pujas, pandits..."
          className="ml-2 bg-transparent outline-none text-gray-600 w-full
          focus:placeholder-opacity-50 transition-all duration-300"
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
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
      title: "Fresh Morning Mix",
      subtitle: "Start your day with calm energy",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop",
      title: "Focus Beats",
      subtitle: "Lo-fi tunes to get in flow",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=1600&auto=format&fit=crop",
      title: "Evening Unwind",
      subtitle: "Relax & recharge",
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
      className="relative mt-6 rounded-3xl overflow-hidden bg-gray-100"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* Slides */}
      <div
        className="flex w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className="w-full shrink-0">
            <div className="relative h-52 sm:h-64 md:h-72">
              <img
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out ${
                  i === index ? "scale-100" : "scale-105"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white drop-shadow">
                <p className="text-xs sm:text-sm opacity-90">{s.subtitle}</p>
                <h3 className="text-lg sm:text-2xl font-semibold leading-tight">
                  {s.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-2 shadow hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-2 shadow hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === i ? "w-6 bg-white" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------- Services ----------------- */
function ServicesSection() {
  const services = [
    { name: "Book Event", icon: Calendar },
    { name: "Book Pandit", icon: User },
    { name: "Puja Kits", icon: Package },
    { name: "Decoration", icon: Sparkles },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            key={s.name}
            className="bg-amber-50 rounded-xl p-4 text-center shadow hover:shadow-md transition"
          >
            <Icon className="mx-auto w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
            <p className="font-medium text-gray-700 mt-2">{s.name}</p>
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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 bg-gradient-to-r from-amber-400 to-orange-300 rounded-2xl p-5 flex items-center justify-between shadow-md"
    >
      <div className="flex items-center gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Ganesh Ji"
          className="w-14 h-14 sm:w-16 sm:h-16"
        />
        <h3 className="text-lg font-bold text-brown-800">
          Ganesh Chaturthi Puja
        </h3>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition">
        Book Now
      </button>
    </motion.div>
  );
}

/* ----------------- Specials ----------------- */
function SpecialSections() {
  const specials = [
    { title: "Pandit Ji Profiles", desc: "Expert in Marriage", icon: User },
    { title: "Seasonal Offers", desc: "Wedding combo", icon: Star },
  ];
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Special Sections</h3>
      <div className="grid grid-cols-2 gap-4">
        {specials.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={s.title}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition border"
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mb-2" />
              <h4 className="font-medium">{s.title}</h4>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------- Bottom Navbar ----------------- */
function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl px-6 py-3 z-50">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center text-blue-600">
          <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <Search className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs">Search</span>
        </div>
        <div className="relative flex flex-col items-center text-gray-600">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="absolute -top-2 right-0 bg-red-500 text-white text-[10px] px-1 rounded-full">
            99+
          </span>
          <span className="text-xs mt-1">Favorites</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs">Inbox</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <User className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs">Account</span>
        </div>
      </div>
    </div>
  );
}



/* ----------------- Home Page ----------------- */
export default function Home() {
  return (
    <>
      <div className="p-4 bg-white rounded-3xl shadow-sm">
        {/* Navbar */}
        <HeaderNavbar />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <p className="text-gray-500 text-sm">Good morning,</p>
          <h2 className="text-2xl font-bold">Avinash Sharma</h2>
        </motion.div>

        {/* Search */}
        <AnimatedSearch />

        {/* Hero */}
        <HeroBanner />

        {/* Sections */}
        <ServicesSection />
        <GaneshPromo />
        <SpecialSections />
      </div>

      {/* Footer Navbar last me */}
      <BottomNavbar />
    </>
  );
}
