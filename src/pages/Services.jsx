import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mic,
  Star,
  StarHalf,
  Bookmark,
  BookmarkCheck,
  PhoneCall,
  CalendarDays,
  MessageSquare,
  PlayCircle,
  Gift,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  PartyPopper,
  Camera,
  Tent,
  Building2,
  Lightbulb,
  Utensils,
  Filter,
  X,
  Share,
  Award,
  TrendingUp,
  Zap,
  MapPin,
  Clock,
  Loader,
  ChevronDown,
  Eye,
  Crown,
  ThumbsUp,
  Menu,
  User,
  LogOut,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  Map,
  Users,
  FileText,
  BarChart3,
  Shield,
  Globe,
  Headphones,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";

// Authentication Context
const AuthContext = React.createContext();

// Main Component
export default function ServicesPage() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // State variables
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [wishlist, setWishlist] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [city, setCity] = useState("Your City");
  const [reviews, setReviews] = useState({});
  const [coins, setCoins] = useState(250);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingFlow, setBookingFlow] = useState({
    step: 0, // 0: not started, 1: service selection, 2: customization, 3: vendor selection, 4: date/time, 5: payment
    selectedService: null,
    selectedVendor: null,
    selectedDate: null,
    customization: {},
    paymentMethod: 'card',
  });
  const [notifications, setNotifications] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('services'); // For profile section

  // Enhanced filters
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    location: "",
    availability: "all",
    eventType: "",
    vendorRating: 0,
  });

  // Refs
  const adRef = useRef(null);
  const recognitionRef = useRef(null);
  const filtersRef = useRef(null);
  const coinAnimationRef = useRef(null);

  // Check screen size and adjust layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Reverse geocode to get city name
          setCity("Nearby");
        },
        (error) => {
          console.log("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Load services data
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const servicesData = [
          {
            id: 1,
            title: "Decoration",
            desc: "Traditional & theme-based decoration services.",
            icon: <PartyPopper className="w-5 h-5" />,
            basePrice: 4999,
            category: "Wedding",
            rating: 4.7,
            reviewCount: 128,
            popularity: 95,
            tags: ["Popular", "Trending"],
            images: [
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
            ],
            vendors: [
              { id: "d1", name: "Royal Decor Co.", rating: 4.8, available: true, responseTime: "15 min", completedEvents: 245 },
              { id: "d2", name: "Floral Fantasy", rating: 4.6, available: false, responseTime: "30 min", completedEvents: 189 },
            ],
            stock: 5,
            customizationOptions: [
              { id: "theme", name: "Theme", options: ["Traditional", "Modern", "Vintage", "Bohemian"], default: "Traditional" },
              { id: "flowers", name: "Flower Type", options: ["Roses", "Marigolds", "Orchids", "Mixed"], default: "Mixed" }
            ]
          },
          {
            id: 2,
            title: "Lighting",
            desc: "Festive and wedding lighting solutions.",
            icon: <Lightbulb className="w-5 h-5" />,
            basePrice: 2999,
            category: "Wedding",
            rating: 4.5,
            reviewCount: 86,
            popularity: 88,
            tags: ["Limited"],
            images: [
              "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            ],
            vendors: [
              { id: "l1", name: "Shine & Co.", rating: 4.5, available: true, responseTime: "20 min", completedEvents: 178 },
              { id: "l2", name: "Glow Events", rating: 4.4, available: true, responseTime: "25 min", completedEvents: 132 },
            ],
            stock: 12,
            customizationOptions: [
              { id: "type", name: "Lighting Type", options: ["LED", "Fairy Lights", "Spotlights", "Traditional"], default: "LED" },
              { id: "color", name: "Color Theme", options: ["Warm White", "Multicolor", "Gold", "Silver"], default: "Warm White" }
            ]
          },
          {
            id: 3,
            title: "Catering",
            desc: "Pure veg catering with regional specialities.",
            icon: <Utensils className="w-5 h-5" />,
            basePrice: 199,
            unit: "/plate",
            category: "Food",
            rating: 4.8,
            reviewCount: 245,
            popularity: 97,
            tags: ["Popular", "Best Value"],
            images: [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            ],
            vendors: [
              { id: "c1", name: "Sharma Caterers", rating: 4.8, available: true, responseTime: "10 min", completedEvents: 421 },
              { id: "c2", name: "Gupta Caterers", rating: 4.6, available: true, responseTime: "15 min", completedEvents: 356 },
              { id: "c3", name: "Verma Caterers", rating: 4.7, available: false, responseTime: "30 min", completedEvents: 289 },
            ],
            stock: 3,
            customizationOptions: [
              { id: "cuisine", name: "Cuisine Type", options: ["North Indian", "South Indian", "Continental", "Chinese"], default: "North Indian" },
              { id: "meal", name: "Meal Type", options: ["Lunch", "Dinner", "Both"], default: "Both" }
            ]
          },
          {
            id: 4,
            title: "Tents",
            desc: "Waterproof and stylish tent setups.",
            icon: <Tent className="w-5 h-5" />,
            basePrice: 8999,
            category: "Wedding",
            rating: 4.4,
            reviewCount: 72,
            popularity: 82,
            tags: ["Recommended"],
            images: [
              "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
            ],
            vendors: [
              { id: "t1", name: "Deluxe Tent House", rating: 4.5, available: true, responseTime: "25 min", completedEvents: 198 },
              { id: "t2", name: "Royal Tent Decor", rating: 4.4, available: true, responseTime: "30 min", completedEvents: 154 },
            ],
            stock: 8,
            customizationOptions: [
              { id: "size", name: "Tent Size", options: ["Small (50 people)", "Medium (100 people)", "Large (200 people)", "X-Large (300+ people)"], default: "Medium (100 people)" },
              { id: "style", name: "Tent Style", options: ["Traditional", "Modern", "Premium", "Royal"], default: "Traditional" }
            ]
          },
          {
            id: 5,
            title: "Videography",
            desc: "Professional wedding & event videography.",
            icon: <Camera className="w-5 h-5" />,
            basePrice: 14999,
            category: "Media",
            rating: 4.9,
            reviewCount: 156,
            popularity: 91,
            tags: ["Premium", "Trending"],
            images: [
              "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
            ],
            vendors: [
              { id: "v1", name: "Pixel Studio", rating: 4.9, available: true, responseTime: "15 min", completedEvents: 267 },
              { id: "v2", name: "Wedding Films", rating: 4.8, available: true, responseTime: "20 min", completedEvents: 201 },
            ],
            stock: 6,
            customizationOptions: [
              { id: "package", name: "Package", options: ["Basic (5 min video)", "Standard (15 min video + photos)", "Premium (30 min video + photos + drone)"], default: "Standard (15 min video + photos)" },
              { id: "deliverables", name: "Deliverables", options: ["Digital copy only", "Digital + USB", "Digital + USB + Album"], default: "Digital copy only" }
            ]
          },
          {
            id: 6,
            title: "Marriage Halls",
            desc: "Spacious halls for events & weddings.",
            icon: <Building2 className="w-5 h-5" />,
            basePrice: 49999,
            category: "Venue",
            rating: 4.6,
            reviewCount: 189,
            popularity: 93,
            tags: ["Popular"],
            images: [
              "https://images.unsplash.com/photo-1542320511-71a51b5d49c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
            ],
            vendors: [
              { id: "h1", name: "Sanskaraa Palace", rating: 4.7, available: true, responseTime: "10 min", completedEvents: 325 },
              { id: "h2", name: "Grand Royale Hall", rating: 4.6, available: true, responseTime: "15 min", completedEvents: 278 },
            ],
            stock: 4,
            customizationOptions: [
              { id: "capacity", name: "Hall Capacity", options: ["Up to 100 guests", "100-200 guests", "200-500 guests", "500+ guests"], default: "100-200 guests" },
              { id: "amenities", name: "Amenities", options: ["Basic", "Standard", "Premium", "Luxury"], default: "Standard" }
            ]
          },
        ];
        
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Video ads
  const adsVideos = useMemo(
    () => [
      "https://player.vimeo.com/external/444435392.sd.mp4?s=57c5a9b1c4daea0b2b729e3d2e3d1b1b0c8b3b0a&profile_id=164&oauth2_token_id=57447761",
      "https://player.vimeo.com/external/454194889.sd.mp4?s=7d80d18d5b9e57b386b5c5b5b5b5b5b5b5b5b5b5&profile_id=164&oauth2_token_id=57447761",
    ],
    []
  );

  // Reels data
  const reels = [
    {
      id: "r1",
      src: "https://player.vimeo.com/external/444435392.sd.mp4?s=57c5a9b1c4daea0b2b729e3d2e3d1b1b0c8b3b0a&profile_id=164&oauth2_token_id=57447761",
      title: "Wedding snippets",
      views: "12.4K",
    },
    {
      id: "r2",
      src: "https://player.vimeo.com/external/454194889.sd.mp4?s=7d80d18d5b9e57b386b5c5b5b5b5b5b5b5b5b5&profile_id=164&oauth2_token_id=57447761",
      title: "Lighting highlights",
      views: "8.7K",
    },
  ];

  // Seasonal tags
  const seasonal = [
    { id: "s1", tag: "Navratri", color: "bg-amber-200 text-amber-800" },
    { id: "s2", tag: "Wedding Season", color: "bg-amber-200 text-amber-800" },
    { id: "s3", tag: "Festive Offers", color: "bg-amber-200 text-amber-800" },
  ];

  // Packages data
  const packages = [
    {
      id: "p1",
      name: "Classic Wedding Pack",
      includes: ["Decoration", "Lighting", "Catering"],
      price: 89999,
      savePercent: 14,
    },
    {
      id: "p2",
      name: "Royal Grand Pack",
      includes: ["Decoration", "Lighting", "Catering", "Videography", "Tents"],
      price: 199999,
      savePercent: 18,
    },
  ];

  // Filter and sort services
  const filtered = useMemo(() => {
    let result = services.filter((s) => {
      const matchQ = `${s.title} ${s.desc}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchC = category ? s.category === category : true;
      const matchR = s.rating >= minRating;
      const matchPrice = s.basePrice >= filters.priceRange[0] && s.basePrice <= filters.priceRange[1];
      const matchVendorRating = s.vendors.some(v => v.rating >= filters.vendorRating);
      
      return matchQ && matchC && matchR && matchPrice && matchVendorRating;
    });

    // Apply sorting
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        // Default sorting (by popularity)
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [services, query, category, minRating, sortBy, filters]);

  // Recommended services (AI-powered)
  const recommended = useMemo(() => {
    // In a real app, this would come from an API based on user behavior
    const picks = new Set();
    
    // Basic logic: if user is viewing wedding services, recommend related items
    if (filtered.some((f) => f.category === "Wedding")) {
      picks.add("Lighting");
      picks.add("Tents");
      picks.add("Catering");
    }
    
    // If user is viewing venues, recommend catering and decoration
    if (filtered.some((f) => f.title === "Marriage Halls")) {
      picks.add("Catering");
      picks.add("Decoration");
      picks.add("Videography");
    }
    
    return services.filter((s) => picks.has(s.title));
  }, [filtered, services]);

  // Voice recognition setup
  const [listening, setListening] = useState(false);
  const setupRecognition = () => {
    const Sr = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Sr) return null;
    const rec = new Sr();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      setQuery(text);
      setListening(false);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    return rec;
  };

  const onVoice = () => {
    if (!recognitionRef.current) recognitionRef.current = setupRecognition();
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      alert("Voice search not supported in this browser.");
    }
  };

  // Video ad controls
  useEffect(() => {
    const v = adRef.current;
    if (!v) return;
    const handleEnd = () => setCurrentAd((p) => (p + 1) % adsVideos.length);
    v.addEventListener("ended", handleEnd);
    return () => v.removeEventListener("ended", handleEnd);
  }, [adsVideos.length]);

  // Authentication functions
  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate login process
    if (otp === "123456") { // Mock OTP verification
      const userData = {
        id: 1,
        name: "Rahul Sharma",
        phone: phoneNumber,
        email: "rahul@example.com",
        coins: 500,
        bookings: [],
        wishlist: [],
      };
      setUser(userData);
      setIsLoggedIn(true);
      setAuthModalOpen(false);
      setOtpSent(false);
      setOtp("");
      setPhoneNumber("");
      showToast("Login successful! Welcome back!");
    } else {
      showToast("Invalid OTP. Please try again.", "error");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    // Simulate OTP sending
    setOtpSent(true);
    showToast("OTP sent to your phone number");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    showToast("Logged out successfully");
  };

  // Service interaction handlers
  const handleBook = (s) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      setAuthMode('login');
      showToast("Please login to book services", "error");
      return;
    }
    
    setBookingFlow({
      step: 1,
      selectedService: s,
      selectedVendor: null,
      selectedDate: null,
      customization: {},
      paymentMethod: 'card',
    });
    
    setCoins((c) => c + 50);
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 2000);
    
    showToast(`Starting booking for: ${s.title}`);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== service.id);
      return [service, ...filtered.slice(0, 4)];
    });
  };

  const toggleWishlist = (serviceId) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      setAuthMode('login');
      showToast("Please login to save to wishlist", "error");
      return;
    }
    
    setWishlist(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
    
    showToast(wishlist[serviceId] ? "Removed from wishlist" : "Added to wishlist");
  };

  const addReview = (id, r) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      setAuthMode('login');
      showToast("Please login to add reviews", "error");
      return;
    }
    
    setReviews((prev) => ({ ...prev, [id]: [...(prev[id] || []), r] }));
    setCoins((c) => c + 10);
    showToast("Review posted! +10 coins rewarded");
  };

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg.trim();
    setChatLog((l) => [...l, { from: "you", text: msg }, { from: "bot", text: "Thanks! A vendor will reply shortly." }]);
    setChatMsg("");
  };

  const applyCoupon = () => {
    if (appliedCoupon.toUpperCase() === "WEDDING20") {
      setCouponSuccess(true);
      showToast("Coupon applied! 20% discount on your booking");
    } else {
      showToast("Invalid coupon code", "error");
    }
  };

  const shareService = (service) => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: `Check out this ${service.title} service on Sanskaraa`,
        url: window.location.href,
      })
      .then(() => showToast("Shared successfully!"))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  // Booking flow functions
  const proceedToCustomization = (service) => {
    setBookingFlow(prev => ({
      ...prev,
      step: 2,
      selectedService: service,
    }));
    setShowDetailModal(false);
  };

  const proceedToVendorSelection = (customization) => {
    setBookingFlow(prev => ({
      ...prev,
      step: 3,
      customization,
    }));
  };

  const proceedToDateTimeSelection = (vendor) => {
    setBookingFlow(prev => ({
      ...prev,
      step: 4,
      selectedVendor: vendor,
    }));
  };

  const proceedToPayment = (dateTime) => {
    setBookingFlow(prev => ({
      ...prev,
      step: 5,
      selectedDate: dateTime,
    }));
  };

  const completeBooking = (paymentData) => {
    // Simulate booking completion
    showToast("Booking confirmed! Thank you for your order.");
    setBookingFlow({
      step: 0,
      selectedService: null,
      selectedVendor: null,
      selectedDate: null,
      customization: {},
      paymentMethod: 'card',
    });
    
    // Add to user's bookings
    if (user) {
      const newBooking = {
        id: Date.now(),
        service: bookingFlow.selectedService,
        vendor: bookingFlow.selectedVendor,
        date: bookingFlow.selectedDate,
        customization: bookingFlow.customization,
        status: 'confirmed',
        total: bookingFlow.selectedService.basePrice,
      };
      
      // In a real app, this would update the user in the database
      setUser(prev => ({
        ...prev,
        bookings: [...prev.bookings, newBooking],
        coins: prev.coins + 50, // Reward coins for booking
      }));
      
      setCoins(prev => prev + 50);
    }
  };

  // Utility functions
  const rupee = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  
  const stars = (n) => {
    const full = Math.floor(n);
    const half = n - full >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {half && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
          <Star key={i + full} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const showToast = (message, type = "success") => {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-[-100px] ${
      type === "success" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
    }`;
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-[-100px]");
      toast.classList.add("translate-y-0");
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      toast.classList.remove("translate-y-0");
      toast.classList.add("translate-y-[-100px]");
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  // Skeleton loading component
  const ServiceSkeleton = () => (
    <div className="rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 shadow-sm animate-pulse">
      <div className="h-40 bg-amber-200"></div>
      <div className="p-4">
        <div className="h-6 bg-amber-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-amber-200 rounded w-full mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-amber-200 rounded w-1/3"></div>
          <div className="h-9 bg-amber-200 rounded-xl w-1/3"></div>
        </div>
      </div>
    </div>
  );

  // Language options
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'bn', name: 'Bengali' },
    { code: 'mr', name: 'Marathi' },
  ];

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login: handleLogin, logout: handleLogout }}>
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 transition-colors duration-300 overflow-x-hidden">
        {/* Toast container (for programmatic toasts) */}
        <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2"></div>
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="fixed top-4 left-4 z-40 p-2 rounded-full bg-amber-100 border border-amber-200 shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-amber-800" />
          </button>
        )}
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && isMobile && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 z-30 bg-amber-50 p-4 shadow-lg overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-amber-800">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-amber-800" />
                </button>
              </div>
              
              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-amber-100 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-amber-800">{user.name}</div>
                      <div className="text-xs text-amber-600">{user.phone}</div>
                    </div>
                  </div>
                  
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> My Bookings
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> Wishlist
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Notifications
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payments
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Help & Support
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setAuthModalOpen(true);
                      setAuthMode('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800"
                  >
                    Login / Sign Up
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-amber-100 text-amber-800">
                    Help & Support
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Bar */}
        <header className="sticky top-0 z-30 backdrop-blur bg-amber-100/70 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between mt-12">
            <div className="flex items-center gap-2 mt-8">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h1 className="font-bold text-lg text-amber-800">Sanskaraa Services</h1>
              <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">Coins: {coins}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="px-2 py-1.5 rounded-xl border border-amber-200 text-sm bg-white text-amber-800 flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>{languageOptions.find(l => l.code === language)?.name || 'English'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {showLanguageSelector && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-amber-200 z-40"
                    >
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLanguageSelector(false);
                            showToast(`Language changed to ${lang.name}`);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-amber-100 text-amber-800' : 'text-amber-600 hover:bg-amber-50'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button className={`px-3 py-1.5 rounded-xl border text-sm ${chatOpen ? "bg-amber-700 text-white" : "bg-white border-amber-200 text-amber-800"}`} onClick={() => setChatOpen((v) => !v)}>
                <MessageSquare className="inline w-4 h-4 mr-1" /> {!isMobile && 'Chat'}
              </button>
              <a href="tel:+911234567890" className="px-3 py-1.5 rounded-xl border border-amber-200 text-sm bg-white text-amber-800">
                <PhoneCall className="inline w-4 h-4 mr-1" /> {!isMobile && 'Call'}
              </a>
              
              {isLoggedIn ? (
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-full bg-amber-100 border border-amber-200"
                >
                  <User className="w-4 h-4 text-amber-700" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setAuthModalOpen(true);
                    setAuthMode('login');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-700 text-white text-sm hover:bg-amber-800"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Sticky Search & Filters */}
        <div ref={filtersRef} className="sticky top-[64px] z-20 bg-amber-50 border-b border-amber-200 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
              <div className="relative flex-1 w-full">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search (e.g., hall, catering, lights)"
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white text-amber-800"
                />
                <Search className="w-4 h-4 text-amber-500 absolute right-3 top-3" />
              </div>
              
              <div className="flex gap-2 w-full lg:w-auto">
                <button onClick={onVoice} className={`px-3 py-2.5 rounded-xl border ${listening ? "bg-amber-100 border-amber-300" : "bg-white border-amber-200"}`}>
                  <Mic className={`w-4 h-4 ${listening ? "text-amber-600 animate-pulse" : "text-amber-600"}`} />
                </button>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-2.5 rounded-xl border border-amber-200 bg-white text-amber-800 flex items-center gap-1"
                >
                  <Filter className="w-4 h-4" /> Filters
                  {showFilters ? <ChevronDown className="w-4 h-4 transform rotate-180" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-amber-800">Category</label>
                    <select value={category || ""} onChange={(e) => setCategory(e.target.value || null)} className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">
                      <option value="">All Categories</option>
                      {[...new Set(services.map((s) => s.category))].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-amber-800">Min Rating</label>
                    <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">
                      <option value={0}>Any rating</option>
                      <option value={4}>4.0+</option>
                      <option value={4.5}>4.5+</option>
                      <option value={4.8}>4.8+</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-amber-800">Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">
                      <option value="popularity">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-amber-800">Price Range</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-600">₹{filters.priceRange[0]}</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100000" 
                        step="1000"
                        value={filters.priceRange[1]} 
                        onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                        className="flex-1"
                      />
                      <span className="text-xs text-amber-600">₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-amber-800">Vendor Rating</label>
                    <select value={filters.vendorRating} onChange={(e) => setFilters(prev => ({ ...prev, vendorRating: Number(e.target.value) }))} className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">
                      <option value={0}>Any rating</option>
                      <option value={4}>4.0+</option>
                      <option value={4.5}>4.5+</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hero: Video Ads + Search */}
        <section className="max-w-7xl mx-auto px-4 pt-5 grid lg:grid-cols-3 gap-6">
          <motion.div layout className="lg:col-span-2 rounded-2xl overflow-hidden bg-black/90 relative shadow">
            <video
              ref={adRef}
              key={currentAd}
              src={adsVideos[currentAd]}
              className="w-full h-48 md:h-64 lg:h-[380px] object-cover"
              autoPlay
              muted
              playsInline
              controls={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="text-white/90 text-sm">Auto-playing ads • {currentAd + 1}/{adsVideos.length}</div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => setCurrentAd((p) => (p - 1 + adsVideos.length) % adsVideos.length)}
                  aria-label="Prev ad"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => setCurrentAd((p) => (p + 1) % adsVideos.length)}
                  aria-label="Next ad"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div layout className="rounded-2xl p-4 bg-amber-50 shadow border border-amber-200 transition-colors duration-300">
            <div className="font-semibold flex items-center gap-2 mb-2 text-amber-800">
              <Search className="w-4 h-4" /> Find a service
            </div>
            
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-600" />
                <input 
                  type="date" 
                  className="flex-1 px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800" 
                  value={eventDate} 
                  onChange={(e) => setEventDate(e.target.value)} 
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <input 
                  className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium text-amber-800 mb-2">Apply Coupon</div>
              <div className="flex gap-2">
                <input
                  value={appliedCoupon}
                  onChange={(e) => {
                    setAppliedCoupon(e.target.value);
                    setCouponSuccess(false);
                  }}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                />
                <button 
                  onClick={applyCoupon}
                  disabled={couponSuccess}
                  className={`px-3 py-2 rounded-xl text-sm ${couponSuccess ? "bg-amber-600 text-white" : "bg-amber-700 text-white"}`}
                >
                  {couponSuccess ? "Applied!" : "Apply"}
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-amber-600">Tip: Set date & city to check availability on vendor cards.</div>
          </motion.div>
        </section>

        {/* Seasonal / Trending chips */}
        <section className="max-w-7xl mx-auto px-4 mt-6 flex flex-wrap gap-2">
          {seasonal.map((s) => (
            <span key={s.id} className={`text-xs px-2 py-1 rounded-full ${s.color} border border-amber-300`}>{s.tag}</span>
          ))}
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-amber-800">All Services</h2>
            <span className="text-sm text-amber-600">{filtered.length} results</span>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <motion.div 
                  key={s.id} 
                  layout
                  className="rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 shadow-sm group hover:shadow-md transition-all duration-300 relative"
                  whileHover={{ y: isMobile ? 0 : -5 }}
                >
                  {/* Service Tags */}
                  <div className="absolute top-2 left-2 z-10 flex gap-1 flex-wrap max-w-[70%]">
                    {s.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-amber-200 text-amber-800 flex items-center gap-1 mb-1">
                        {tag === "Popular" && <TrendingUp className="w-3 h-3" />}
                        {tag === "Limited" && <Zap className="w-3 h-3" />}
                        {tag === "Recommended" && <ThumbsUp className="w-3 h-3" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Low Stock Warning */}
                  {s.stock < 5 && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-200 text-amber-800 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Only {s.stock} left
                      </span>
                    </div>
                  )}
                  
                  <div className="relative">
                    <img src={s.images[0]} alt={s.title} className="w-full h-40 object-cover" />
                    
                    {/* Hover Overlay with CTA */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 flex-col sm:flex-row">
                      <button 
                        onClick={() => handleViewDetails(s)}
                        className="px-3 py-1.5 rounded-xl text-sm bg-white text-amber-800 hover:bg-amber-100 mb-2 sm:mb-0"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleBook(s)}
                        className="px-3 py-1.5 rounded-xl text-sm bg-amber-700 text-white hover:bg-amber-800"
                      >
                        Book Now
                      </button>
                    </div>
                    
                    <button
                      onClick={() => toggleWishlist(s.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                    >
                      {wishlist[s.id] ? <BookmarkCheck className="w-5 h-5 text-amber-700" /> : <Bookmark className="w-5 h-5 text-amber-600" />}
                    </button>
                    
                    <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded bg-black/50 text-white flex items-center gap-1">
                      {stars(s.rating)} <span className="ml-1">{s.rating.toFixed(1)}</span>
                      <span className="ml-1">({s.reviewCount})</span>
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 font-semibold text-amber-800">
                      <span className="p-1.5 rounded-xl bg-amber-100 text-amber-700">{s.icon}</span>
                      {s.title}
                    </div>
                    <p className="text-sm text-amber-600 mt-1 line-clamp-2">{s.desc}</p>
                    <div className="mt-2 flex items-center justify-between flex-col sm:flex-row gap-2">
                      <div className="text-sm">
                        <span className="font-bold text-amber-800">{rupee(s.basePrice)}</span>
                        {s.unit && <span className="text-amber-600"> {s.unit}</span>}
                      </div>
                      <button onClick={() => handleViewDetails(s)} className="px-3 py-1.5 rounded-xl text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 w-full sm:w-auto text-center">
                        Details
                      </button>
                    </div>

                    {/* Vendor mini carousel */}
                    <div className="mt-3">
                      <div className="text-xs text-amber-600 mb-1">Vendors</div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {s.vendors.map((v) => (
                          <div key={v.id} className="min-w-[180px] p-2 rounded-xl border border-amber-200 bg-amber-100 flex-shrink-0">
                            <div className="flex items-center justify-between text-sm font-medium">
                              <span className="text-amber-800 truncate max-w-[80px]">{v.name}</span>
                              <span className="flex items-center gap-1">{stars(v.rating)}<span>{v.rating}</span></span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${v.available ? "bg-amber-200 text-amber-800" : "bg-amber-200 text-amber-800"}`}>
                                {v.available ? "Available" : "Booked"}
                              </span>
                              <button className="px-2 py-1 text-xs rounded-lg bg-amber-700 text-white">Ask</button>
                            </div>
                            {eventDate && (
                              <div className="mt-2 text-[11px] text-amber-700 bg-amber-200 px-2 py-1 rounded">
                                Likely available on {eventDate} in {city}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="mt-3">
                      <details className="rounded-xl bg-amber-100 border border-amber-200 p-2">
                        <summary className="text-sm font-medium cursor-pointer text-amber-800">Ratings & Reviews</summary>
                        <div className="mt-2 space-y-2">
                          {(reviews[s.id] || []).map((r, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="text-sm p-2 rounded-lg bg-white border border-amber-200"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-amber-800">{r.name}</span>
                                <span className="flex items-center gap-1">{stars(r.stars)}<span>{r.stars.toFixed(1)}</span></span>
                              </div>
                              <p className="text-amber-600 text-sm mt-1">{r.msg}</p>
                            </motion.div>
                          ))}
                          <ReviewForm onSubmit={(r) => addReview(s.id, r)} />
                        </div>
                      </details>
                    </div>
                    
                    {/* Share Button */}
                    <div className="mt-3 flex justify-end">
                      <button 
                        onClick={() => shareService(s)}
                        className="text-xs flex items-center gap-1 text-amber-600 hover:text-amber-800"
                      >
                        <Share className="w-3 h-3" /> Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mt-8">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-amber-800">
              <Eye className="w-5 h-5" /> Recently Viewed
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentlyViewed.map((r) => (
                <div key={r.id} className="min-w-[240px] rounded-2xl border border-amber-200 bg-amber-50 p-3 flex-shrink-0">
                  <div className="font-semibold flex items-center gap-2 text-amber-800">
                    <span className="p-1.5 rounded-xl bg-amber-100 text-amber-700">{r.icon}</span>
                    {r.title}
                  </div>
                  <p className="text-sm text-amber-600 mt-1 line-clamp-2">{r.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-800">{rupee(r.basePrice)}</span>
                    <button onClick={() => handleViewDetails(r)} className="px-3 py-1.5 rounded-xl text-sm bg-amber-700 text-white hover:bg-amber-800">
                      View Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Smart Packages */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-amber-800">
            <Gift className="w-5 h-5" /> Smart Packages
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {packages.map((p) => (
              <div key={p.id} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-amber-800">{p.name}</div>
                    <div className="text-sm text-amber-600">Includes: {p.includes.join(", ")}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-200 text-amber-800">Save {p.savePercent}%</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold text-amber-800">{rupee(p.price)}</div>
                  <button className="px-3 py-1.5 rounded-xl text-sm bg-amber-700 text-white hover:bg-amber-800">Book Package</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mt-8">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-amber-800">
              <HeartHandshake className="w-5 h-5" /> You may also need
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recommended.map((r) => (
                <div key={r.id} className="min-w-[240px] rounded-2xl border border-amber-200 bg-amber-50 p-3 flex-shrink-0">
                  <div className="font-semibold flex items-center gap-2 text-amber-800">
                    <span className="p-1.5 rounded-xl bg-amber-100 text-amber-700">{r.icon}</span>
                    {r.title}
                  </div>
                  <p className="text-sm text-amber-600 mt-1 line-clamp-2">{r.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-800">{rupee(r.basePrice)}</span>
                    <button onClick={() => handleBook(r)} className="px-3 py-1.5 rounded-xl text-sm bg-amber-700 text-white hover:bg-amber-800">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reels / Shorts */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-amber-800">
            <PlayCircle className="w-5 h-5" /> Reels & Highlights
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {reels.map((r) => (
              <div key={r.id} className="min-w-[220px] rounded-2xl overflow-hidden border border-amber-200 bg-black/90 flex-shrink-0">
                <video src={r.src} playsInline controls muted className="w-[220px] h-[360px] object-cover" />
                <div className="p-2 flex justify-between items-center">
                  <div className="text-white/90 text-sm">{r.title}</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {r.views}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDetailModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-amber-50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-amber-800">{selectedService.title}</h2>
                      <p className="text-amber-600 mt-1">{selectedService.desc}</p>
                    </div>
                    <button 
                      onClick={() => setShowDetailModal(false)}
                      className="p-2 rounded-full bg-amber-100 text-amber-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <img src={selectedService.images[0]} alt={selectedService.title} className="w-full h-48 md:h-60 object-cover rounded-xl" />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-amber-800">Pricing</h3>
                        <p className="text-xl md:text-2xl font-bold text-amber-800">{rupee(selectedService.basePrice)} {selectedService.unit && <span className="text-lg">{selectedService.unit}</span>}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-amber-800">Rating</h3>
                        <div className="flex items-center gap-2">
                          {stars(selectedService.rating)}
                          <span className="text-amber-600">{selectedService.rating.toFixed(1)} ({selectedService.reviewCount} reviews)</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-amber-800">Availability</h3>
                        <p className="text-amber-600">{selectedService.stock > 5 ? "Good availability" : "Limited availability"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-amber-800 mb-3">Vendors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedService.vendors.map((v) => (
                        <div key={v.id} className="p-3 rounded-xl border border-amber-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-amber-800">{v.name}</span>
                            <span className="flex items-center gap-1">{stars(v.rating)}<span>{v.rating}</span></span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded-full ${v.available ? "bg-amber-200 text-amber-800" : "bg-amber-200 text-amber-800"}`}>
                              {v.available ? "Available" : "Booked"}
                            </span>
                            <button className="px-3 py-1 text-xs rounded-lg bg-amber-700 text-white">Contact</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                    <button 
                      onClick={() => proceedToCustomization(selectedService)}
                      className="flex-1 px-4 py-3 rounded-xl bg-amber-700 text-white hover:bg-amber-800 font-semibold"
                    >
                      Book Now
                    </button>
                    <button 
                      onClick={() => toggleWishlist(selectedService.id)}
                      className="px-4 py-3 rounded-xl border border-amber-200 text-amber-800 flex items-center justify-center"
                    >
                      {wishlist[selectedService.id] ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking Flow Modals */}
        <AnimatePresence>
          {bookingFlow.step > 0 && (
            <BookingFlow 
              bookingFlow={bookingFlow} 
              setBookingFlow={setBookingFlow}
              proceedToCustomization={proceedToCustomization}
              proceedToVendorSelection={proceedToVendorSelection}
              proceedToDateTimeSelection={proceedToDateTimeSelection}
              proceedToPayment={proceedToPayment}
              completeBooking={completeBooking}
            />
          )}
        </AnimatePresence>

        {/* Authentication Modal */}
        <AnimatePresence>
          {authModalOpen && (
            <AuthModal 
              authMode={authMode}
              setAuthMode={setAuthMode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              otp={otp}
              setOtp={setOtp}
              otpSent={otpSent}
              setOtpSent={setOtpSent}
              handleLogin={handleLogin}
              handleSendOtp={handleSendOtp}
              setAuthModalOpen={setAuthModalOpen}
            />
          )}
        </AnimatePresence>

        {/* Chat Drawer */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-4 right-4 w-80 rounded-2xl border border-amber-200 bg-amber-50 shadow-xl overflow-hidden z-40"
              style={{ maxWidth: 'calc(100vw - 2rem)' }}
            >
              <div className="px-3 py-2 border-b border-amber-200 font-semibold flex items-center gap-2 text-amber-800">
                <MessageSquare className="w-4 h-4"/> Instant Chat (demo)
              </div>
              <div className="h-64 p-3 space-y-2 overflow-auto">
                {chatLog.map((m, i) => (
                  <div key={i} className={`text-sm max-w-[80%] px-3 py-2 rounded-2xl ${m.from === "you" ? "bg-amber-700 text-white ml-auto" : "bg-amber-100"}`}>{m.text}</div>
                ))}
                {chatLog.length === 0 && (
                  <div className="text-xs text-amber-600">
                    <div className="font-medium mb-2">Suggested questions:</div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => setChatMsg("Check availability for Decoration on 20th Oct")}
                        className="text-xs block w-full text-left p-2 rounded-lg bg-amber-100 hover:bg-amber-200"
                      >
                        Check availability for Decoration on 20th Oct
                      </button>
                      <button 
                        onClick={() => setChatMsg("Get quote for Marriage Hall")}
                        className="text-xs block w-full text-left p-2 rounded-lg bg-amber-100 hover:bg-amber-200"
                      >
                        Get quote for Marriage Hall
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-amber-200 flex gap-2">
                <input 
                  value={chatMsg} 
                  onChange={(e) => setChatMsg(e.target.value)} 
                  placeholder="Type message..." 
                  className="flex-1 px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                />
                <button onClick={sendChat} className="px-3 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800">Send</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <footer className="max-w-7xl mx-auto px-4 my-10">
          <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-200 to-amber-100 border border-amber-300 text-center">
            <div className="font-semibold text-lg flex items-center justify-center gap-2 text-amber-800">
              <Gift className="w-5 h-5" /> Sign up & get 200 Sanskaraa Coins
            </div>
            <p className="text-sm text-amber-600 mt-1">Use coins for discounts on any service or package.</p>
            <div className="mt-3 flex items-center justify-center gap-2 flex-col sm:flex-row">
              <button 
                onClick={() => {
                  setAuthModalOpen(true);
                  setAuthMode('register');
                }}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800 mb-2 sm:mb-0"
              >
                Create account
              </button>
              <button className="px-4 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">Know more</button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-amber-800 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-amber-600">
                <li><a href="#" className="hover:text-amber-800">About Us</a></li>
                <li><a href="#" className="hover:text-amber-800">Careers</a></li>
                <li><a href="#" className="hover:text-amber-800">Blog</a></li>
                <li><a href="#" className="hover:text-amber-800">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-amber-800 mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-amber-600">
                <li><a href="#" className="hover:text-amber-800">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-800">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-800">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-800">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-amber-800 mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-amber-600">
                <li><a href="#" className="hover:text-amber-800">Wedding</a></li>
                <li><a href="#" className="hover:text-amber-800">Corporate</a></li>
                <li><a href="#" className="hover:text-amber-800">Birthday</a></li>
                <li><a href="#" className="hover:text-amber-800">Anniversary</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-amber-800 mb-3">Connect</h3>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"><Youtube className="w-4 h-4" /></a>
              </div>
              <div className="mt-4">
                <p className="text-sm text-amber-600">Download our app</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs flex items-center gap-1">
                    <Download className="w-3 h-3" /> Android
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs flex items-center gap-1">
                    <Download className="w-3 h-3" /> iOS
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-amber-600 text-center mt-8">© {new Date().getFullYear()} Sanskaraa. All rights reserved.</div>
        </footer>

        {/* Coin Animation */}
        <AnimatePresence>
          {showCoinAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-4 left-4 z-50 bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              ref={coinAnimationRef}
            >
              <Sparkles className="w-4 h-4" /> +50 Coins!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
}

// Authentication Modal Component
function AuthModal({ 
  authMode, setAuthMode, phoneNumber, setPhoneNumber, otp, setOtp, 
  otpSent, setOtpSent, handleLogin, handleSendOtp, setAuthModalOpen 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => setAuthModalOpen(false)}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-amber-50 rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-amber-800">
              {authMode === 'login' ? 'Login' : 'Create Account'}
            </h2>
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="p-1 rounded-full bg-amber-100 text-amber-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={otpSent ? handleLogin : handleSendOtp}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Phone Number</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="flex-1 px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                    required
                    disabled={otpSent}
                  />
                </div>
              </div>
              
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                    required
                  />
                  <p className="text-xs text-amber-600 mt-1">We've sent a 6-digit code to your phone</p>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-amber-700 text-white hover:bg-amber-800 font-semibold"
              >
                {otpSent ? 'Verify & Login' : 'Send OTP'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-amber-600">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setOtpSent(false);
                }}
                className="text-amber-700 font-medium hover:underline"
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-amber-200">
            <p className="text-xs text-amber-600 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Booking Flow Component
function BookingFlow({ 
  bookingFlow, setBookingFlow, proceedToCustomization, proceedToVendorSelection, 
  proceedToDateTimeSelection, proceedToPayment, completeBooking 
}) {
  const [customization, setCustomization] = useState({});
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  
  const handleCustomizationChange = (optionId, value) => {
    setCustomization(prev => ({
      ...prev,
      [optionId]: value
    }));
  };
  
  const renderStep = () => {
    switch(bookingFlow.step) {
      case 1: // Service selection (already handled by main modal)
        return null;
        
      case 2: // Customization
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-800 mb-4">Customize your {bookingFlow.selectedService.title}</h2>
            
            <div className="space-y-4">
              {bookingFlow.selectedService.customizationOptions.map(option => (
                <div key={option.id}>
                  <label className="block text-sm font-medium text-amber-800 mb-1">{option.name}</label>
                  <select
                    value={customization[option.id] || option.default}
                    onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                  >
                    {option.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setBookingFlow(prev => ({ ...prev, step: 1 }))}
                className="px-4 py-2 rounded-xl border border-amber-200 text-amber-800"
              >
                Back
              </button>
              <button 
                onClick={() => proceedToVendorSelection(customization)}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white"
              >
                Next: Choose Vendor
              </button>
            </div>
          </div>
        );
        
      case 3: // Vendor selection
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-800 mb-4">Choose a Vendor</h2>
            
            <div className="space-y-4">
              {bookingFlow.selectedService.vendors.map(vendor => (
                <div 
                  key={vendor.id} 
                  className={`p-4 rounded-xl border ${selectedVendor?.id === vendor.id ? 'border-amber-500 bg-amber-50' : 'border-amber-200'}`}
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-amber-800">{vendor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {stars(vendor.rating)}
                        <span className="text-amber-600 text-sm">{vendor.rating} • {vendor.completedEvents} events</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedVendor?.id === vendor.id ? 'bg-amber-500 border-amber-500' : 'border-amber-300'}`}></div>
                  </div>
                  <div className="mt-2 text-sm text-amber-600">
                    Avg. response time: {vendor.responseTime}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setBookingFlow(prev => ({ ...prev, step: 2 }))}
                className="px-4 py-2 rounded-xl border border-amber-200 text-amber-800"
              >
                Back
              </button>
              <button 
                onClick={() => selectedVendor && proceedToDateTimeSelection(selectedVendor)}
                disabled={!selectedVendor}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white disabled:opacity-50"
              >
                Next: Select Date & Time
              </button>
            </div>
          </div>
        );
        
      case 4: // Date & Time selection
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-800 mb-4">Select Date & Time</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setBookingFlow(prev => ({ ...prev, step: 3 }))}
                className="px-4 py-2 rounded-xl border border-amber-200 text-amber-800"
              >
                Back
              </button>
              <button 
                onClick={() => selectedDate && selectedTime && proceedToPayment(`${selectedDate} ${selectedTime}`)}
                disabled={!selectedDate || !selectedTime}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white disabled:opacity-50"
              >
                Next: Payment
              </button>
            </div>
          </div>
        );
        
      case 5: // Payment
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-800 mb-4">Payment</h2>
            
            <div className="bg-amber-100 p-4 rounded-xl mb-4">
              <h3 className="font-medium text-amber-800">Order Summary</h3>
              <div className="mt-2 text-sm text-amber-600">
                <div>{bookingFlow.selectedService.title} - {rupee(bookingFlow.selectedService.basePrice)}</div>
                <div className="mt-1">Vendor: {bookingFlow.selectedVendor.name}</div>
                <div className="mt-1">Date: {new Date(bookingFlow.selectedDate).toLocaleString()}</div>
                <div className="mt-2 font-medium">Total: {rupee(bookingFlow.selectedService.basePrice)}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Wallet</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setBookingFlow(prev => ({ ...prev, step: 4 }))}
                className="px-4 py-2 rounded-xl border border-amber-200 text-amber-800"
              >
                Back
              </button>
              <button 
                onClick={() => completeBooking({ paymentMethod, cardDetails })}
                className="px-4 py-2 rounded-xl bg-amber-700 text-white"
              >
                Pay Now
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => setBookingFlow(prev => ({ ...prev, step: 0 }))}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-amber-50 rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {renderStep()}
      </motion.div>
    </motion.div>
  );
}

// Review Form Component
function ReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [stars, setStars] = useState(5);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !msg.trim()) return;
        onSubmit({ name: name.trim(), msg: msg.trim(), stars });
        setName("");
        setMsg("");
        setStars(5);
      }}
      className="mt-2 p-2 rounded-lg bg-white border border-amber-200"
    >
      <div className="text-xs font-medium mb-1 text-amber-800">Add a review</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800 text-sm"
        />
        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800 text-sm"
        >
          {[5, 4.5, 4, 3.5, 3].map((s) => (
            <option key={s} value={s}>
              {s} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Share your experience..."
        className="w-full mt-2 px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800 text-sm"
        rows={2}
      />
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="px-3 py-1.5 rounded-xl bg-amber-700 text-white text-sm hover:bg-amber-800"
        >
          Post
        </button>
      </div>
    </form>
  );
}