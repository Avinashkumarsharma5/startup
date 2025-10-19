import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
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
  Mic,
  Phone,
  MessageCircle,
  Gift,
  Star,
  Clock,
  X,
  ChevronDown
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
  { id: 1, name: "Rajesh Kumar", rating: 5, review: "Excellent service, very satisfied with the puja arrangements.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Priya Singh", rating: 4, review: "Pandit ji was very knowledgeable and punctual.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Vikram Mehta", rating: 5, review: "The puja kit was complete and of good quality.", image: "https://randomuser.me/api/portraits/men/67.jpg" }
];

// Sample offers
const specialOffers = [
  { id: 1, title: "Ganesh Puja Kits", discount: "20% off", expiry: "2025-09-10", image: "src/assets/images/ganesh puja 1.jpeg" },
  { id: 2, title: "Navratri Special", discount: "15% off", expiry: "2025-09-25", image: "src/assets/images/sanskaraa1.png" },
  { id: 3, title: "Wedding Puja Package", discount: "25% off", expiry: "2025-10-15", image: "src/assets/images/sadi1.jpg" }
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

      // Select a random shloka for the time of day
      const shlokas = dailyShlokas[timeOfDay];
      const randomIndex = Math.floor(Math.random() * shlokas.length);
      setShloka(shlokas[randomIndex]);
    };

    updateGreeting();
    // Update every hour
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
      <p className="text-gray-600 text-sm sm:text-base mt-12">{greeting},</p>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#800000] ">Avinash Sharma</h2>
      <p className="mt-2 text-xs sm:text-sm md:text-base text-amber-800 bg-amber-100 p-2 sm:p-3 rounded-lg ">{shloka}</p>
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
        />
        <button onClick={onVoiceSearch} className="p-1 sm:p-1.5 hover:bg-amber-100 rounded-full transition-colors">
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
      id: 1,
      img: "src/assets/images/grrih prews 1.png",
      title: "Griha Pravesh Puja",
      subtitle: "Sacred beginnings with blessings",
    },
    {
      id: 2,
      img: "src/assets/images/havan.jpg",
      title: "Satyanarayan Puja",
      subtitle: "Invoke prosperity & harmony",
    },
    {
      id: 3,
      img: "src/assets/images/decor2.png",
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
      className="relative mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className="flex w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="w-full shrink-0 relative h-48 sm:h-72 md:h-96">
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-3 sm:left-5 bottom-3 sm:bottom-5 text-white drop-shadow-md max-w-[85%] sm:max-w-[60%]">
              <p className="text-xs sm:text-sm opacity-90">{s.subtitle}</p>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 sm:p-2.5 shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500" />
      </button>
      <button
        onClick={next}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 sm:p-2.5 shadow-md hover:bg-white transition-colors"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              index === i ? "w-4 sm:w-6 h-1.5 bg-orange-500" : "w-2 h-1.5 bg-white/60"
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
    { name: "Book Event", icon: Calendar, path: "/EventsPage" },
    { name: "Book Pandit", icon: User, path: "/panditbooking" },
    { name: "Puja Kits", icon: Package, path: "/pujakits" },
    { name: "Services", icon: Sparkles, path: "/services" },
  ];

  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={service.name}
            onClick={() => navigate(service.path)}
            className="bg-[#FFF7E0] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow hover:shadow-lg border border-orange-200 transition"
          >
            <Icon className="mx-auto w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-500" />
            <p className="font-medium text-gray-800 mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base">{service.name}</p>
          </motion.button>
        );
      })}
    </div>
  );
}

// ----------------- Upcoming Events Section -----------------
function UpcomingEvents() {
  const navigate = useNavigate();

  // Calculate days until event
  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000]">Upcoming Events</h3>
        <button 
          onClick={() => navigate('/bookings')}
          className="text-xs sm:text-sm md:text-base text-orange-600 font-medium hover:text-orange-700 transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-3 sm:space-x-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
        {upcomingEvents.map(event => (
          <div 
            key={event.id} 
            className="inline-block align-top w-48 sm:w-56 md:w-64 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md border border-orange-200"
          >
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-800 truncate text-sm sm:text-base">{event.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {new Date(event.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
              {event.type === 'festival' && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full shrink-0 ml-2">
                  Festival
                </span>
              )}
            </div>
            
            <div className="mt-2 sm:mt-3 flex items-center">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mr-1" />
              <span className="text-xs sm:text-sm font-medium text-amber-700">
                {getDaysUntil(event.date)} days left
              </span>
            </div>
            
            <button className="mt-2 sm:mt-3 w-full bg-amber-100 text-amber-800 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-amber-200 transition-colors">
              {event.type === 'festival' ? 'Learn More' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Enhanced Upcoming Events with Loading -----------------
function EnhancedUpcomingEvents() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(upcomingEvents);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="mt-4 sm:mt-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-3 sm:space-x-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="inline-block w-48 sm:w-64">
              <SkeletonLoader type="card" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <UpcomingEvents />;
}

// ----------------- Personalized Recommendations -----------------
function PersonalizedRecommendations() {
  const recommendations = [
    { 
      id: 1, 
      title: "Satyanarayan Puja", 
      reason: "Based on your past bookings",
      type: "puja",
      rating: 4.8,
      bookings: 124
    },
    { 
      id: 2, 
      title: "Griha Pravesh Kit", 
      reason: "Popular this week",
      type: "kit",
      discount: "15% OFF"
    },
    { 
      id: 3, 
      title: "Pandit Rajesh Kumar", 
      reason: "Highly rated for wedding ceremonies",
      type: "pandit",
      rating: 4.9,
      specialization: "Wedding Rituals"
    }
  ];

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000]">Recommended For You</h3>
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
      </div>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-3 sm:space-x-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
        {recommendations.map(rec => (
          <div 
            key={rec.id} 
            className="inline-block align-top w-56 sm:w-64 md:w-72 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md border border-orange-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-800 text-sm sm:text-base flex-1 pr-2">{rec.title}</h4>
              {rec.discount && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full shrink-0">
                  {rec.discount}
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-amber-600 mb-2 sm:mb-3">{rec.reason}</p>
            
            <div className="flex items-center justify-between">
              {rec.rating && (
                <div className="flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs sm:text-sm text-gray-700 ml-1">{rec.rating}</span>
                  {rec.bookings && (
                    <span className="text-xs text-gray-500 ml-2 hidden sm:inline">({rec.bookings} bookings)</span>
                  )}
                </div>
              )}
              
              <button className="bg-amber-100 text-amber-800 text-xs px-2 sm:px-3 py-1.5 rounded-lg font-medium hover:bg-amber-200 transition-colors">
                {rec.type === 'pandit' ? 'View Profile' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Promo Banner -----------------
function GaneshPromo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 sm:mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 justify-between shadow-lg"
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <img
          src="https://images.unsplash.com/photo-1566618432041-6f0e1438dffd?w=100&h=100&fit=crop"
          alt="Ganesh Ji"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full"
        />
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#800000]">
          Ganesh Chaturthi Puja
        </h3>
      </div>
      <button className="self-start sm:self-auto bg-[#800000] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-[#A52A2A] transition-colors text-xs sm:text-sm md:text-base">
        Book Now
      </button>
    </motion.div>
  );
}

// ----------------- Pandit Availability -----------------
function PanditAvailability() {
  const [panditAvailable, setPanditAvailable] = useState(true);
  
  return (
    <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-orange-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#800000]">Pandit Assistance</h3>
        <div className="flex items-center">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 ${panditAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs sm:text-sm">{panditAvailable ? 'Available' : 'Busy'}</span>
        </div>
      </div>
      
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
        Connect with our expert pandits for guidance and booking assistance.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-amber-100 text-amber-800 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-amber-200 transition-colors text-xs sm:text-sm">
          <Phone size={14} className="sm:w-4 sm:h-4" />
          Call Now
        </button>
        <button className="flex-1 bg-[#800000] text-white py-1.5 sm:py-2 rounded-lg font-medium hover:bg-[#A52A2A] transition-colors text-xs sm:text-sm">
          Schedule Call
        </button>
      </div>
    </div>
  );
}

// ----------------- Personalized Dashboard -----------------
function DashboardSection() {
  const navigate = useNavigate();
  const [loyaltyPoints] = useState(350);

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-3">Your Dashboard</h3>
      
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-orange-200">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h4 className="font-medium text-gray-800 text-sm sm:text-base">Loyalty Points</h4>
          <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {loyaltyPoints} points
          </span>
        </div>
        
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
          Earn 50 points for every booking. Redeem points for discounts on future pujas.
        </p>
        
        <div className="mb-4 sm:mb-5">
          <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Past Bookings</h4>
          <div className="space-y-2">
            {pastBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                <div>
                  <p className="text-xs sm:text-sm font-medium">{booking.name}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(booking.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/bookings')}
          className="w-full bg-amber-100 text-amber-800 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-amber-200 transition-colors text-xs sm:text-sm"
        >
          View All Bookings
        </button>
      </div>
    </div>
  );
}

// ----------------- Enhanced Pandit Profile -----------------
function EnhancedPanditProfile() {
  const [showReviews, setShowReviews] = useState(false);
  
  const panditData = {
    name: "Pandit Ram Sharma",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&h=300&fit=crop",
    specialization: "Satyanarayan, Griha Pravesh, Marriage",
    rating: 4.8,
    totalReviews: 47,
    verified: true,
    experience: "12+ years",
    languages: ["Hindi", "English", "Sanskrit"],
    reviews: [
      {
        id: 1,
        user: "Priya Singh",
        rating: 5,
        comment: "Very knowledgeable and punctual. Explained everything beautifully.",
        date: "2025-07-15",
        verified: true
      },
      {
        id: 2,
        user: "Rajesh Kumar",
        rating: 4,
        comment: "Good service, would recommend for family ceremonies.",
        date: "2025-07-10",
        verified: true
      }
    ]
  };

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-3 sm:mb-5">Pandit Ji Profile</h3>
      <div className="bg-[#FFF7E0] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md border border-orange-200 space-y-3 sm:space-y-4">
        <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">
          <img
            src={panditData.image}
            alt="Pandit Ji"
            className="w-full h-32 sm:h-40 md:h-48 object-cover"
          />
        </div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{panditData.name}</p>
              {panditData.verified && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</span>
              )}
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{panditData.specialization}</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-sm sm:text-base">{panditData.rating}</span>
            </div>
            <p className="text-xs text-gray-600">{panditData.totalReviews} reviews</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
          <span>📅 {panditData.experience} experience</span>
          <span className="text-right">🗣️ {panditData.languages.join(", ")}</span>
        </div>

        <button 
          onClick={() => setShowReviews(!showReviews)}
          className="w-full text-center text-orange-600 font-medium py-1.5 sm:py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-xs sm:text-sm"
        >
          {showReviews ? 'Hide' : 'Show'} Reviews
        </button>

        {showReviews && (
          <div className="space-y-2 sm:space-y-3">
            {panditData.reviews.map(review => (
              <div key={review.id} className="bg-white p-2 sm:p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{review.user}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 sm:gap-3 md:gap-4 justify-between">
          <button className="flex-1 border border-gray-400 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-gray-700 hover:bg-gray-100 text-xs sm:text-sm transition-colors">
            Call
          </button>
          <button className="flex-1 bg-[#800000] text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded hover:bg-[#A52A2A] text-xs sm:text-sm transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------- Enhanced Puja Kits with Filtering -----------------
function EnhancedPujaKits() {
  const [kits, setKits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setKits([
        { title: "Grih Pravesh Kit", price: "₹999" },
        { title: "Satyanarayan Kit", price: "₹799" },
        { title: "Ganesh Puja Kit", price: "₹599" },
        { title: "Navratri Special Kit", price: "₹1299" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters) => {
    console.log('Applied filters:', filters);
    // Implement actual filtering logic here
  };

  if (loading) {
    return (
      <div className="mt-4 sm:mt-6">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
        <FilterSortSystem type="pujaKits" onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map(i => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-2">Puja Kits</h3>
      <FilterSortSystem type="pujaKits" onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {kits.map((kit) => (
          <motion.div
            key={kit.title}
            whileHover={{ scale: 1.03 }}
            className="bg-[#FFF7E0] p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md border border-orange-200 transition"
          >
            <h4 className="font-medium text-gray-800 text-sm sm:text-base">{kit.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{kit.price}</p>
            <button className="mt-2 sm:mt-3 w-full bg-[#800000] text-white py-1.5 sm:py-2 rounded hover:bg-[#A52A2A] text-xs sm:text-sm transition-colors">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
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

// ----------------- Enhanced Festival Offers -----------------
function EnhancedFestivalOffers() {
  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#800000] mb-3">Special Offers</h3>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-3 sm:space-x-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
        {specialOffers.map(offer => {
          const isExpired = new Date(offer.expiry) < new Date();
          
          return (
            <div 
              key={offer.id} 
              className="inline-block align-top w-56 sm:w-64 md:w-72 lg:w-80 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md border border-orange-200"
            >
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-lg mb-2 sm:mb-3"
              />
              
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800 flex-1 pr-2 text-xs sm:text-sm md:text-base">{offer.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  isExpired ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-800'
                }`}>
                  {offer.discount}
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Limited time offer</p>
              
              <div className="flex items-center justify-between">
                <CountdownTimer targetDate={offer.expiry} size="small" />
                <button 
                  disabled={isExpired}
                  className={`text-xs font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg ${
                    isExpired 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#800000] text-white hover:bg-[#A52A2A]'
                  }`}
                >
                  {isExpired ? 'Expired' : 'Grab Offer'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------- Quick Actions Floating Buttons -----------------
function QuickActions() {
  const [expanded, setExpanded] = useState(false);
  
  const actions = [
    { icon: MessageCircle, label: "WhatsApp Support", color: "bg-green-500" },
    { icon: Gift, label: "Request Puja", color: "bg-amber-500" },
    { icon: Sparkles, label: "Donate", color: "bg-[#800000]" },
  ];

  const handleAction = (index) => {
    setExpanded(false);
    // Add actual functionality here
    if (index === 0) window.open('https://wa.me/1234567890', '_blank');
    else if (index === 1) toast.info("Puja request feature coming soon!");
    else if (index === 2) toast.success("Donation portal launching soon!");
  };

  return (
    <div className="fixed left-2 sm:left-4 bottom-24 sm:bottom-28 md:bottom-32 z-50 flex flex-col items-center gap-2 sm:gap-3">
      {expanded && actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 bg-white rounded-full shadow-lg pl-2 pr-3 sm:pl-3 sm:pr-4 py-1.5 sm:py-2"
        >
          <span className="text-xs font-medium whitespace-nowrap hidden sm:block">{action.label}</span>
          <button 
            onClick={() => handleAction(index)}
            className={`${action.color} rounded-full p-1.5 sm:p-2 text-white hover:opacity-90 transition-opacity`}
          >
            <action.icon size={16} className="sm:w-4 sm:h-4" />
          </button>
        </motion.div>
      ))}
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)}
        className="rounded-full p-2.5 sm:p-3 md:p-3.5 bg-[#800000] text-white shadow-lg hover:bg-[#A52A2A] transition-colors"
      >
        {expanded ? <X size={18} className="sm:w-5 sm:h-5" /> : <Sparkles size={18} className="sm:w-5 sm:h-5" />}
      </motion.button>
    </div>
  );
}

// ----------------- Floating Cart with Badge -----------------
function FloatingCart({ itemCount }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <button
        onClick={() => navigate("/cart")}
        className="bg-[#800000] text-white rounded-full p-2.5 sm:p-3 md:p-3.5 shadow-lg hover:bg-[#A52A2A] transition-colors relative"
      >
        <ShoppingCart size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </motion.div>
  );
}

// ----------------- Bottom Navbar -----------------
function BottomNavbar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: HomeIcon, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "kits", icon: Package, label: "Kits" },
    { id: "bookings", icon: Bookmark, label: "Bookings" },
    { id: "more", icon: Menu, label: "More" },
  ];

  const handleNavigation = (itemId) => {
    setActiveTab(itemId);
    switch (itemId) {
      case "home":
        navigate("/");
        break;
      case "bookings":
        navigate("/bookings");
        break;
      case "kits":
        navigate("/pujakits");
        break;
      case "search":
        // Focus search or navigate to search page
        document.querySelector('input[type="text"]')?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFF7E0] shadow-lg rounded-t-xl sm:rounded-t-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 z-50 border-t border-orange-200">
      <div className="flex justify-between items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className="flex flex-col items-center min-w-[50px] sm:min-w-[56px]"
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isActive ? "text-[#800000]" : "text-gray-600"}`} />
              <span className={`text-[10px] sm:text-[11px] md:text-xs mt-0.5 ${isActive ? "text-[#800000] font-medium" : "text-gray-600"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
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

// ----------------- Main Enhanced Home Component -----------------
export default function EnhancedHome() {
  const navigate = useNavigate();
  const [cartItems] = useState(2);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleVoiceSearch = () => {
    setVoiceModalOpen(true);
  };

  const handleVoiceResult = (command) => {
    setVoiceModalOpen(false);
    toast.success(`Command recognized: ${command}`);
    
    // Navigate based on command
    if (command.includes("Satyanarayan")) {
      navigate("/puja-booking", { state: { pujaType: "Satyanarayan" } });
    } else if (command.includes("Griha Pravesh")) {
      navigate("/puja-booking", { state: { pujaType: "Griha Pravesh" } });
    } else if (command.includes("Puja Kit")) {
      navigate("/pujakits");
    } else if (command.includes("Schedule Call")) {
      // Logic to schedule call
      toast.info("Call scheduling feature coming soon!");
    }
  };

  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
    // Implement actual filtering logic based on filters
    toast.info(`Filters applied: ${JSON.stringify(filters)}`);
  };

  return (
    <main className="min-h-screen pb-20 sm:pb-24 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] font-sans text-gray-800 relative">
      {/* Toast Notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <DynamicGreeting />
      <PanchangWidget />
      <AnimatedSearch onVoiceSearch={handleVoiceSearch} />
      
      <HeroBanner />
      <ServicesSection />
      
      {/* Enhanced Sections */}
      <EnhancedUpcomingEvents />
      <PersonalizedRecommendations />
      <GaneshPromo />
      <PanditAvailability />
      <DashboardSection />
      <EnhancedPanditProfile />
      <EnhancedPujaKits />
      <TestimonialsSection />
      <EnhancedFestivalOffers />

      <QuickActions />
      <FloatingCart itemCount={cartItems} />
      <BottomNavbar />
      
      <VoiceSearchModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </main>
  );
}