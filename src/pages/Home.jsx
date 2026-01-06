import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";


import {
  Search,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  User,
  Users,          
  MapPin,         
  Calendar,
  Package,
  Sparkles,
  Bookmark,
  Menu,
  ShoppingCart,
  Mic,
  Phone,
  MessageCircle,
  Gift,
  Star,
  Clock,
  X,
  ChevronDown,
  ShieldCheck,
  Briefcase,
  ShoppingBag
} from "lucide-react";



import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sanskrit shlokas and quotes for different times of day
const dailyShlokas = {
  morning: [
    "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्।",
    "कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले स्थितो ब्रह्मा प्रभाते करदर्शनम्॥",
    "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत। क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति॥"
  ],
  afternoon: [
    "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
    "असंखेयाः समुद्रस्य शीकराः पर्वतस्य च। उपमा लोकरक्षितुर्नास्ति तुल्यः प्रभुर्हरिः॥"
  ],
  evening: [
    "शांति मंत्र: ॐ द्यौ: शान्तिरन्तरिक्षं शान्ति: पृथिवी शान्तिराप: शान्तिरोषधय: शान्ति:।",
    "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥"
  ],
  night: [
    "शुभरात्रि, ध्यान और आशीर्वाद",
    "करजये वसते लक्ष्मी, करमध्ये सरस्वती, करमूले तु गोविन्दः, प्रभाते करदर्शनम्।",
    "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्विनावधीतमस्तु मा विद्विषावहै। ॐ शान्तिः शान्तिः शान्तिः॥"
  ]
};

// Sample events data
const upcomingEvents = [
  { id: 1, name: "Ganesh Chaturthi", date: "2025-09-12", type: "festival" },
  { id: 2, name: "Satyanarayan Puja", date: "2025-08-25", type: "booking" },
  { id: 3, name: "Navratri", date: "2025-09-30", type: "festival" },
  { id: 4, name: "Griha Pravesh", date: "2025-08-20", type: "booking" }
];

// Sample testimonials
const testimonials = [
  { id: 1, name: "Rajesh Kumar", rating: 5, review: "Excellent service, very satisfied with the puja arrangements.", image: "" },
  { id: 2, name: "Priya Singh", rating: 4, review: "Pandit ji was very knowledgeable and punctual.", image: "" },
  { id: 3, name: "Vikram Mehta", rating: 5, review: "The puja kit was complete and of good quality.", image: "" }
];

// Sample offers
const specialOffers = [
  { id: 1, title: "Ganesh Puja Kits", discount: "20% off", expiry: "2025-09-10", image: "images/ganesh puja 1.jpeg" },
  { id: 2, title: "Navratri Special", discount: "15% off", expiry: "2025-09-25", image: "images/sanskaraa1.png" },
  { id: 3, title: "Wedding Puja Package", discount: "25% off", expiry: "2025-10-15", image: "images/sadi1.jpg" }
];

// Sample past bookings
const pastBookings = [
  { id: 1, name: "Satyanarayan Puja", date: "2025-07-15", status: "completed" },
  { id: 2, name: "Griha Pravesh", date: "2025-06-20", status: "completed" }
];

// ----------------- Countdown Timer -----------------
function CountdownTimer({ targetDate, size = "medium" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const sizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base"
  };

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className={`text-red-600 font-medium ${sizes[size]}`}>
        Expired
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${sizes[size]}`}>
      <div className="bg-amber-500 text-white px-1 sm:px-2 py-1 rounded font-mono font-bold text-xs sm:text-sm">
        {String(timeLeft.days).padStart(2, '0')}d
      </div>
      :
      <div className="bg-amber-500 text-white px-1 sm:px-2 py-1 rounded font-mono font-bold text-xs sm:text-sm">
        {String(timeLeft.hours).padStart(2, '0')}h
      </div>
      :
      <div className="bg-amber-500 text-white px-1 sm:px-2 py-1 rounded font-mono font-bold text-xs sm:text-sm">
        {String(timeLeft.minutes).padStart(2, '0')}m
      </div>
      :
      <div className="bg-amber-500 text-white px-1 sm:px-2 py-1 rounded font-mono font-bold text-xs sm:text-sm">
        {String(timeLeft.seconds).padStart(2, '0')}s
      </div>
    </div>

    
  );
}


// ----------------- Filter & Sort System -----------------
function FilterSortSystem({ type, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    sortBy: 'popular'
  });

  const filterOptions = {
    pujaKits: {
      categories: ['All', 'Festival', 'Daily Puja', 'Special Occasion', 'Wedding'],
      priceRanges: ['All', 'Under ₹500', '₹500-₹1000', '₹1000-₹2000', 'Above ₹2000'],
      sortOptions: [
        { value: 'popular', label: 'Most Popular' },
        { value: 'latest', label: 'Latest' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' }
      ]
    },
    events: {
      categories: ['All', 'Festival', 'Booking', 'Upcoming', 'Live'],
      sortOptions: [
        { value: 'popular', label: 'Most Popular' },
        { value: 'latest', label: 'Latest' },
        { value: 'ending', label: 'Ending Soon' }
      ]
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const currentOptions = filterOptions[type] || filterOptions.pujaKits;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-2">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg border border-orange-200 shadow-sm hover:bg-orange-50 transition-colors flex-1 sm:flex-none"
        >
          <span className="text-sm font-medium">Filters & Sort</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        <select 
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="bg-white px-2 sm:px-3 py-2 rounded-lg border border-orange-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 w-32 sm:w-auto"
        >
          {currentOptions.sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 bg-white p-3 sm:p-4 rounded-lg border border-orange-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                {currentOptions.categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                {currentOptions.priceRanges?.map(range => (
                  <option key={range} value={range.toLowerCase()}>{range}</option>
                )) || (
                  <option value="all">All</option>
                )}
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ----------------- Skeleton Loader -----------------
function SkeletonLoader({ type = "card" }) {
  if (type === "card") {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded mt-3"></div>
      </div>
    );
  }

  if (type === "banner") {
    return (
      <div className="rounded-2xl bg-gray-200 h-48 sm:h-72 animate-pulse"></div>
    );
  }

  if (type === "testimonial") {
    return (
      <div className="inline-block w-72 bg-white rounded-2xl p-5 shadow-md border border-orange-200 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  return null;
}

// ----------------- Dynamic Greeting Component -----------------
function DynamicGreeting() {
  const [greeting, setGreeting] = useState("");
  const [shloka, setShloka] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let timeOfDay;
      
      if (hour >= 5 && hour < 12) {
        timeOfDay = "morning";
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = "afternoon";
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        timeOfDay = "evening";
        setGreeting("Good evening");
      } else {
        timeOfDay = "night";
        setGreeting("Good night");
      }

      const shlokas = dailyShlokas[timeOfDay];
      const randomIndex = Math.floor(Math.random() * shlokas.length);
      setShloka(shlokas[randomIndex]);
    };

    const loadUserName = () => {
      try {
        const stored = localStorage.getItem("loggedInUser");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserName(parsed?.name || parsed?.email?.split("@")[0] || "Sanskaraa Seeker");
        } else {
          setUserName("Sanskaraa Seeker");
        }
      } catch (error) {
        console.error("Failed to parse user info:", error);
        setUserName("Sanskaraa Seeker");
      }
    };

    updateGreeting();
    loadUserName();

    const interval = setInterval(updateGreeting, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 sm:mt-12"
    >
      <p className="text-gray-600 text-base sm:text-lg mt-12">
        {greeting}{userName ? `, ${userName}` : ""}
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#800000]">
        Wishing you a blessed day ahead 
      </h2>
      <p className="mt-2 text-xs sm:text-sm md:text-base text-amber-800 bg-amber-100 p-2 sm:p-3 rounded-lg ">
        {shloka}
      </p>
    </motion.div>
  );
}

// ----------------- Daily Panchang Widget -----------------
function PanchangWidget() {
  const [panchang, setPanchang] = useState({
    tithi: "Shukla Paksha Dwadashi",
    nakshatra: "Uttara Phalguni",
    yoga: "Vyaghata",
    muhurat: "09:00 AM - 11:30 AM"
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 bg-white rounded-xl p-3 sm:p-4 shadow-md border border-orange-200"
    >
      <h3 className="font-semibold text-[#800000] text-center mb-2 text-sm sm:text-base">Today's Panchang</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
        <div className="text-center sm:text-left">
          <span className="font-medium block sm:inline">Tithi:</span> {panchang.tithi}
        </div>
        <div className="text-center sm:text-left">
          <span className="font-medium block sm:inline">Nakshatra:</span> {panchang.nakshatra}
        </div>
        <div className="text-center sm:text-left">
          <span className="font-medium block sm:inline">Yoga:</span> {panchang.yoga}
        </div>
        <div className="text-center sm:text-left">
          <span className="font-medium block sm:inline">Muhurat:</span> {panchang.muhurat}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------- Search Bar with Voice -----------------
function AnimatedSearch({ onVoiceSearch }) {
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    }
  };

  const handleVoiceClick = () => {
    if (onVoiceSearch) onVoiceSearch();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-4"
    >
      <div className="flex items-center bg-[#FFF7E0] rounded-full px-3 sm:px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400 transition-all shadow-sm">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
        <input
          type="text"
          placeholder="Search pujas, pandits..."
          className="ml-2 bg-transparent outline-none text-gray-700 w-full placeholder-gray-400 text-sm sm:text-base"
          onKeyDown={handleSearch}
        />
        <button
          onClick={handleVoiceClick}
          className="p-1 sm:p-1.5 hover:bg-amber-100 rounded-full transition-colors"
        >
          <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
        </button>
      </div>
    </motion.div>
  );
}

// ----------------- Hero Banner -----------------
function HeroBanner() {
  const slides = [
    {
      img: "/images/grrih1.png",
      title: "Griha Pravesh Puja",
      subtitle: "Sacred beginnings with blessings",
    },
    {
      img: "/images/havan.jpg",
      title: "Satyanarayan Puja",
      subtitle: "Invoke prosperity & harmony",
    },
    {
      img: "/images/decor2.png",
      title: "Wedding Rituals",
      subtitle: "Memorable sacred unions",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      4500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-4 sm:mt-6 h-52 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <img
          src={slides[index].img}
          alt={slides[index].title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white max-w-[80%]">
          <p className="text-xs sm:text-sm text-amber-300 tracking-widest uppercase">
            {slides[index].subtitle}
          </p>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
            {slides[index].title}
          </h2>
        </div>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-amber-400" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


// ----------------- Services -----------------
function ServicesSection() {
  const navigate = useNavigate();

  const services = [
    { name: "Rentals", icon: Calendar, path: "/EventsPage", color: "from-[#FFD700] to-[#FFA500]" },
    { name: "Book Pandit", icon: User, path: "/panditbooking", color: "from-[#FFB703] to-[#FB8500]" },
    { name: "Puja Kits", icon: Package, path: "/pujakits", color: "from-[#F4C430] to-[#D4AF37]" },
    { name: "Services", icon: Sparkles, path: "/services", color: "from-[#FFD700] to-[#FFAA00]" },
    { name: "Essentials", icon: ShoppingBag, path: "/SanskaraaShopApp", color: "from-[#FFC857] to-[#E09F3E]" },
    { name: "Event Management", icon: Briefcase, path: "/eventmanagement", color: "from-[#FFA500] to-[#FF7A00]" },
  ];

  return (
    <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <motion.button
            key={service.name}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(service.path)}
            className="
              group relative overflow-hidden
              rounded-2xl sm:rounded-3xl
              bg-gradient-to-b from-[#FFFDF5] to-[#FFF1CC]
              border border-[#FFD700]/40
              p-4 sm:p-5
              shadow-[0_8px_30px_rgba(128,0,0,0.12)]
              hover:shadow-[0_18px_50px_rgba(255,215,0,0.45)]
              transition-all duration-500
            "
          >
            {/* ✨ Gold glow ring */}
            <div className="absolute inset-0 rounded-[inherit] ring-1 ring-transparent group-hover:ring-[#FFD700]/70 transition-all duration-500 pointer-events-none" />

            {/* 🔆 Icon Container */}
            <div
              className={`
                mx-auto mb-3
                w-12 h-12 sm:w-14 sm:h-14
                rounded-full
                flex items-center justify-center
                bg-gradient-to-br ${service.color}
                shadow-lg
                group-hover:scale-110
                transition-transform duration-500
              `}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#1a0505]" />
            </div>

            {/* 🏷️ Title */}
            <p className="font-semibold text-center text-[#1a0505] text-xs sm:text-sm md:text-base tracking-wide">
              {service.name}
            </p>

            {/* ✨ Hover Shine */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                translate-x-[-100%] group-hover:translate-x-[100%]
                transition-transform duration-[1200ms]
                pointer-events-none
              "
            />
          </motion.button>
        );
      })}
    </div>
  );
}


// ----------------- Upcoming Events (Now Services) -----------------
function UpcomingEvents() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Book Pandit Ji",
      img: "images/panditji 3.png",
      route: "/panditbooking",
      badge: "Popular",
    },
    {
      id: 2,
      name: "Puja Samagri Packages",
      img: "images/pujakit2.jpg",
      route: "/pujakits",
    },
    {
      id: 9,
      name: "Puja Samagri Items",
      img: "images/pujakit.jpg",
      route: "/pujakits",
    },
    {
      id: 3,
      name: "Decoration",
      img: "images/decor3.png",
      route: "/services",
    },
    {
      id: 4,
      name: "Catering",
      img: "images/catring03.png",
      route: "/services",
    },
    {
      id: 5,
      name: "Photography",
      img: "images/photography2.png",
      route: "/services",
    },
    {
      id: 6,
      name: "Venue Booking",
      img: "images/hall02.png",
      route: "/services",
    },
    {
      id: 7,
      name: "Invitation Cards",
      img: "images/invitation01.png",
      route: "/sanskaraashopapp",
      badge: "New",
    },
    {
      id: 8,
      name: "Video Invitation",
      img: "images/invitation02.png",
      route: "/sanskaraashopapp",
    },
  ];

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7A1A1A]">
          Our Services
        </h3>
        <button
          onClick={() => navigate("/services")}
          className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition"
        >
          View All →
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
        <div className="flex gap-7">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260 }}
              onClick={() => navigate(service.route)}
              className="min-w-[120px] sm:min-w-[150px] cursor-pointer text-center group"
            >
              {/* Image Wrapper */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full 
                bg-gradient-to-br from-amber-200 to-amber-400 p-[2px] shadow-lg">

                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Badge */}
                {service.badge && (
                  <span className="absolute -top-1 -right-1 text-[10px] px-2 py-0.5 rounded-full 
                    bg-[#7A1A1A] text-white font-bold shadow">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="mt-3 text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                {service.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ----------------- Enhanced Upcoming Events with Loading -----------------
function EnhancedUpcomingEvents() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="mt-6">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[220px] sm:min-w-[260px] bg-white rounded-2xl p-4 shadow-md border border-orange-200 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-9 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <UpcomingEvents />;
}

function PersonalizedRecommendations() {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      title: "Satyanarayan Puja",
      reason: "Most booked house puja",
      type: "Puja",
      rating: 4.8,
      img: "images/ganesh puja 1.jpeg",
      video: "images/Satyanarayan_Puja_Ceremony_Video_Generation.mp4",
    },
    {
      id: 2,
      title: "Griha Pravesh Puja Kit",
      reason: "Trending this week",
      type: "Puja Kit",
      discount: "15% OFF",
      img: "images/sanskaraa kit2.png",
      video: "images/Premium_Griha_Pravesh_Puja_Kit_Video.mp4",
    },
    {
      id: 3,
      title: "Pandit Rajesh Kumar",
      reason: "Expert in wedding rituals",
      type: "Pandit",
      rating: 4.9,
      location: "Delhi",
      img: "images/panditji 2.png",
      video: "images/Wedding_Pandit_Ji_Profile_Video.mp4",
    },
    {
      id: 4,
      title: "Floral Stage Decoration",
      reason: "Wedding favourite",
      type: "Decoration",
      img: "images/flowerdeco1.png",
      video: "images/Elegant_Indian_Wedding_Floral_Stage.mp4",
    },
    {
      id: 5,
      title: "Garden Wedding Venue",
      reason: "Outdoor premium venue",
      type: "Venue",
      location: "Mumbai",
      img: "images/hall03.png",
      video: "images/Luxurious_Indian_Wedding_Venue_Video.mp4",
    },
    {
      id: 6,
      title: "Wedding Photography",
      reason: "Candid + cinematic",
      type: "Photography",
      img: "images/photography1.png",
      video: "images/Luxury_Indian_Wedding_Showreel_Generated.mp4",
    },
  ];

  const handleViewDetails = (rec) => {
    const routes = {
      Puja: "/panditbooking",
      Pandit: "/panditbooking",
      "Puja Kit": "/pujakits",
      Decoration: "/decoration",
      Venue: "/venues",
      Photography: "/photography",
    };
    navigate(routes[rec.type], { state: { rec } });
  };

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg sm:text-xl font-semibold text-[#7A1A1A]">
          Recommended for you
        </h3>
        <Sparkles className="w-4 h-4 text-[#C9A24D]" />
      </div>

      {/* Cards */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="
                w-64 sm:w-72
                bg-[#FFFDF7]
                border border-[#E8C871]/40
                rounded-2xl
                shadow-sm
                hover:shadow-lg
                transition
                flex-shrink-0
                overflow-hidden
                group
              "
            >
              {/* 🎬 VIDEO */}
              <div className="relative h-44 sm:h-60 overflow-hidden">
                <video
                  src={rec.video}
                  poster={rec.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="
                    w-full h-full object-cover
                    scale-100 group-hover:scale-105
                    transition-transform duration-700
                  "
                  onError={(e) => (e.currentTarget.poster = rec.img)}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Discount badge */}
                {rec.discount && (
                  <span className="absolute top-2 right-2 bg-[#7A1A1A] text-white text-[11px] px-2 py-0.5 rounded">
                    {rec.discount}
                  </span>
                )}

                {/* Play hint */}
                <div className="absolute bottom-2 left-2 text-[11px] text-white/80 flex items-center gap-1">
                  ▶ Preview
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-[170px]">
                <span className="text-[11px] text-[#A68A3A] font-medium mb-1">
                  {rec.type}
                </span>

                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                  {rec.title}
                </h4>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {rec.reason}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  {rec.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#C9A24D]" />
                      {rec.rating}
                    </span>
                  )}
                  {rec.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rec.location}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleViewDetails(rec)}
                  className="
                    mt-auto
                    text-sm font-medium
                    text-[#7A1A1A]
                    border border-[#7A1A1A]/40
                    py-1.5 rounded-lg
                    hover:bg-[#7A1A1A]
                    hover:text-white
                    transition
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




// ----------------- Promo Banner -----------------
function GaneshPromo() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate to Pandit Booking Page
    navigate("/PanditBooking", {
      state: {
        promo: "Ganesh Chaturthi Puja",
        type: "festival",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 sm:mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 justify-between shadow-lg"
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <img
          src="images/ganesh puja 1.jpeg"
          alt="Ganesh Ji"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full"
        />
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#800000]">
          Ganesh Chaturthi Puja
        </h3>
      </div>

      {/* ✅ Button triggers navigation */}
      <button
        onClick={handleBookNow}
        className="self-start sm:self-auto bg-[#800000] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-[#A52A2A] transition-colors text-xs sm:text-sm md:text-base"
      >
        Book Now
      </button>
    </motion.div>
  );
}

// ----------------- Pandit Availability -----------------
function PanditAvailability() {
  const [panditAvailable, setPanditAvailable] = useState(true);

  // 📞 Your contact number
  const phoneNumber = "6201486202";

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleScheduleCall = () => {
    // You can later integrate Calendly or WhatsApp Scheduling here
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-orange-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000]">Sanskaraa Assistance</h3>
        <div className="flex items-center">
          <div
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 ${
              panditAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-xs sm:text-sm">
            {panditAvailable ? "Available" : "Busy"}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
        Connect with our expert pandits for guidance and booking assistance.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {/* ✅ Call Now Button */}
        <button
          onClick={handleCallNow}
          className="self-start inline-flex items-center gap-1 sm:gap-2 bg-amber-100 text-amber-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-amber-200 transition-colors text-xs sm:text-sm"
        >
          <Phone size={14} className="sm:w-4 sm:h-4" />
          Call Now
        </button>

        {/* ✅ Schedule Call Button */}
        <button
          onClick={handleScheduleCall}
          className="self-start inline-flex items-center justify-center bg-[#800000] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-[#A52A2A] transition-colors text-xs sm:text-sm"
        >
          Schedule Call
        </button>
      </div>
    </div>
  );
}



function EnhancedPanditProfile() {
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();

  const phoneNumber = "6201486202";

  const panditData = {
    name: "Pandit Ram Sharma",
    image: "images/panditji 3.png",
    specialization: "Satyanarayan • Griha Pravesh • Vivah",
    rating: 4.8,
    totalReviews: 47,
    verified: true,
    experience: "12+ Years",
    languages: ["Hindi", "English", "Sanskrit"],
    reviews: [
      {
        id: 1,
        user: "Priya Singh",
        rating: 5,
        comment:
          "Extremely knowledgeable. The puja felt calm, divine and perfectly guided.",
        date: "15 July 2025",
      },
      {
        id: 2,
        user: "Rajesh Kumar",
        rating: 4,
        comment:
          "Very professional and polite. Explained every mantra clearly.",
        date: "10 July 2025",
      },
    ],
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleBookNow = () => {
    navigate("/PanditBooking", { state: { fromProfile: panditData } });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl sm:text-2xl font-semibold text-[#7A1A1A] mb-4">
        Pandit Ji Profile
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#FFF6DE] to-[#FFFDF7] rounded-2xl shadow-xl border border-[#E8C871]/40 overflow-hidden"
      >
        {/* 🕉️ Image Section */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <img
            src={panditData.image}
            alt="Pandit Ji"
            className="w-full h-full object-cover object-top scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Verified Ribbon */}
          {panditData.verified && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow text-xs font-medium text-green-700">
              <ShieldCheck size={14} />
              Verified Pandit
            </div>
          )}
        </div>

        {/* 📜 Content */}
        <div className="p-5 space-y-4">
          {/* Name & Rating */}
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                {panditData.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {panditData.specialization}
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold">{panditData.rating}</span>
              </div>
              <p className="text-xs text-gray-500">
                {panditData.totalReviews} reviews
              </p>
            </div>
          </div>

          {/* Experience & Languages */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>📿 {panditData.experience} Experience</span>
            <span>🗣️ {panditData.languages.join(", ")}</span>
          </div>

          {/* Reviews Toggle */}
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="w-full py-2 rounded-lg border border-[#E8C871] text-[#7A1A1A] font-medium hover:bg-[#FFF1C1] transition"
          >
            {showReviews ? "Hide Reviews" : "View Reviews"}
          </button>

          {/* Reviews */}
          <AnimatePresence>
            {showReviews && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {panditData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl p-3 shadow border border-amber-100"
                  >
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">{review.user}</p>
                      <span className="text-xs text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-xl hover:bg-gray-100 transition font-medium"
            >
              <Phone size={16} />
              Call
            </button>

            <button
              onClick={handleBookNow}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7A1A1A] to-[#A52A2A] text-white py-2 rounded-xl shadow hover:scale-[1.02] transition font-medium"
            >
              <Calendar size={16} />
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}




// ----------------- Testimonials Section -----------------
function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTestimonialsData(testimonials);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="mt-4 sm:mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-3">Testimonials</h3>
        <div className="overflow-x-auto whitespace-nowrap pb-4 sm:pb-6 space-x-3 sm:space-x-6 -mx-4 sm:-mx-6 px-4 sm:px-6">
          {[1, 2, 3].map(i => (
            <SkeletonLoader key={i} type="testimonial" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-3">Testimonials</h3>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 sm:pb-6 space-x-3 sm:space-x-6 -mx-4 sm:-mx-6 px-4 sm:px-6">
        {testimonialsData.map(testimonial => (
          <div 
            key={testimonial.id} 
            className="inline-block align-top w-64 sm:w-72 md:w-80 lg:w-96 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-md border border-orange-200"
          >
            <div className="flex items-center mb-3 sm:mb-4 md:mb-5">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 md:mr-6"
              />
              <div className="min-w-0">
                <h4 className="font-medium text-gray-800 truncate text-sm sm:text-base md:text-lg leading-tight">
                  {testimonial.name}
                </h4>
                <div className="flex mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-xs sm:text-sm md:text-[15px] text-gray-700 leading-relaxed">
              <p className="break-words whitespace-normal hyphens-auto">"{testimonial.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Enhanced Festival Offers (Upgraded) -----------------
function EnhancedFestivalOffers() {
  return (
    <section className="mt-6 sm:mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000]">
          🎉 Special Festival Offers
        </h3>
        <span className="text-xs sm:text-sm text-gray-500">
          Limited Time
        </span>
      </div>

      {/* Scroll Container */}
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-4 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-hide">
        {specialOffers.map((offer) => {
          const isExpired = new Date(offer.expiry) < new Date();

          return (
            <div
              key={offer.id}
              className={`
                inline-block align-top w-64 sm:w-72 lg:w-80
                rounded-2xl p-[1px]
                ${isExpired ? 'bg-gray-200' : 'bg-gradient-to-br from-orange-300 via-red-200 to-yellow-200'}
              `}
            >
              {/* Card */}
              <div
                className={`
                  bg-white rounded-2xl p-3 sm:p-4 h-full
                  transition-all duration-300
                  ${!isExpired && 'hover:-translate-y-1 hover:shadow-xl'}
                `}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className={`w-full h-28 sm:h-32 object-cover rounded-xl ${
                      isExpired && 'grayscale'
                    }`}
                  />

                  {/* Discount Badge */}
                  <span
                    className={`
                      absolute top-2 right-2 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full
                      ${isExpired
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-[#800000] text-white'}
                    `}
                  >
                    {offer.discount}
                  </span>

                  {/* Expired Overlay */}
                  {isExpired && (
                    <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">
                        Offer Expired
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h4 className="mt-3 font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                  {offer.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Valid till {new Date(offer.expiry).toLocaleDateString()}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                  <CountdownTimer targetDate={offer.expiry} size="small" />

                  <button
                    disabled={isExpired}
                    className={`
                      text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg
                      transition-all duration-200
                      ${isExpired
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#800000] text-white hover:bg-[#A52A2A] hover:shadow-md'}
                    `}
                  >
                    {isExpired ? 'Expired' : 'Grab Offer'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


// ----------------- Quick Actions Floating Buttons -----------------

function QuickActions() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp Support",
      color: "bg-green-500",
      action: () =>
        window.open(
          "https://wa.me/916201486202?text=Hello%20Sanskaraa%20Support!%20I%20need%20assistance.",
          "_blank"
        ),
    },
    {
      icon: Gift,
      label: "Request Puja",
      color: "bg-amber-500",
      action: () => navigate("/panditbooking"),
    },
    {
      icon: Sparkles,
      label: "Donate",
      color: "bg-[#800000]",
      action: () => toast.info("🙏 Donation feature coming soon!"),
    },
  ];

  useEffect(() => {
    const closeOnOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-3 sm:left-4 bottom-24 sm:bottom-28 md:bottom-32 z-50"
    >
      <div className="absolute inset-0 -z-10 blur-2xl bg-[#800000]/20 rounded-full" />

      <div className="flex flex-col items-start gap-2 sm:gap-3">
        <AnimatePresence>
          {expanded &&
            actions.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.08,
                }}
                className="flex items-center gap-2 bg-white rounded-full shadow-xl px-3 py-2"
              >
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:block">
                  {item.label}
                </span>

                <button
                  onClick={() => {
                    setExpanded(false);
                    item.action();
                  }}
                  className={`${item.color} rounded-full p-2 text-white hover:scale-110 transition-transform active:scale-95`}
                  aria-label={item.label}
                >
                  <item.icon size={16} />
                </button>
              </motion.div>
            ))}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setExpanded((v) => !v)}
          className="relative rounded-full p-3 sm:p-3.5 bg-[#800000] text-white shadow-xl hover:bg-[#A52A2A] transition-colors"
          aria-label="Quick Actions"
        >
          {!expanded && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#800000]/30" />
          )}
          {expanded ? <X size={20} /> : <Sparkles size={20} />}
        </motion.button>
      </div>
    </div>
  );
}




// ----------------- Voice Search Modal -----------------
function VoiceSearchModal({ isOpen, onClose, onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const startListening = () => {
    setIsListening(true);
    setTranscript("Listening...");
    
    // Simulate voice recognition
    setTimeout(() => {
      const commands = [
        "Book Satyanarayan Puja",
        "Book Pandit for Griha Pravesh",
        "Buy Puja Kit",
        "Schedule Call with Pandit"
      ];
      
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(`You said: ${randomCommand}`);
      setIsListening(false);
      
      // Auto-close after result
      setTimeout(() => onResult(randomCommand), 1500);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript("Voice search stopped");
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <div className="text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className={`p-3 sm:p-4 rounded-full ${isListening ? 'bg-red-100 animate-pulse' : 'bg-gray-100'} transition-colors`}>
              <Mic className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
          </div>
          
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">Voice Search</h3>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base min-h-[20px]">
            {transcript || "Click the mic and speak your command"}
          </p>
          
          <div className="flex gap-2 sm:gap-3 justify-center">
            {!isListening ? (
              <button 
                onClick={startListening}
                className="bg-[#800000] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-medium flex items-center gap-1 sm:gap-2 hover:bg-[#A52A2A] transition-colors text-xs sm:text-sm"
              >
                <Mic size={16} className="sm:w-4 sm:h-4" /> Start Listening
              </button>
            ) : (
              <button 
                onClick={stopListening}
                className="bg-gray-500 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-medium hover:bg-gray-600 transition-colors text-xs sm:text-sm"
              >
                Stop
              </button>
            )}
            <button 
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ----------------- Main Enhanced Home Component ---------------
export default function EnhancedHome() {
  const navigate = useNavigate();
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleVoiceSearch = () => {
    setVoiceModalOpen(true);
  };

  const handleVoiceResult = (command) => {
    setVoiceModalOpen(false);
    toast.success(`Command recognized: ${command}`);

    if (command.includes("Satyanarayan")) {
      navigate("/puja-booking", { state: { pujaType: "Satyanarayan" } });
    } else if (command.includes("Griha Pravesh")) {
      navigate("/puja-booking", { state: { pujaType: "Griha Pravesh" } });
    } else if (command.includes("Puja Kit")) {
      navigate("/pujakits");
    }
  };

  return (
    <>
      {/* ✅ SEO */}
      <Helmet>
        <title>Sanskaraa – Book Pandit Ji, Puja Kits & Event Services Online</title>

        <meta
          name="description"
          content="Book Pandit Ji, Puja Kits, Griha Pravesh Puja, Wedding Rituals, Decoration & Event Management services online with Sanskaraa."
        />

        <meta
          name="keywords"
          content="Pandit booking, Puja kits, Griha Pravesh puja, Satyanarayan puja, Wedding rituals, Event management, Sanskaraa"
        />

        <meta property="og:title" content="Sanskaraa – Sacred Services Made Easy" />
        <meta
          property="og:description"
          content="India’s trusted platform for Pandit booking, Puja kits & event rituals."
        />
        <meta property="og:image" content="/images/sanskaraa1.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ✅ UI */}
      <main className="min-h-screen pb-20 sm:pb-24 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] font-sans text-gray-800 relative">
        {/* SEO H1 */}
        <h1 className="sr-only">
          Sanskaraa – Book Pandit Ji, Puja Kits & Event Services Online
        </h1>

        <ToastContainer position="top-right" autoClose={3000} />

        <DynamicGreeting />
        <PanchangWidget />
        <AnimatedSearch onVoiceSearch={handleVoiceSearch} />

        <HeroBanner />
        <ServicesSection />

        <EnhancedUpcomingEvents />
        <PersonalizedRecommendations />
        <GaneshPromo />
        <PanditAvailability />
        <EnhancedPanditProfile />
        <TestimonialsSection />
        <EnhancedFestivalOffers />

        <QuickActions />

        <VoiceSearchModal
          isOpen={voiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
          onResult={handleVoiceResult}
        />
      </main>
    </>
  );
}
