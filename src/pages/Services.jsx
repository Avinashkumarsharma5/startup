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
} from "lucide-react";

export default function ServicesPage() {
  // State variables
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [wish, setWish] = useState({});
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

  // Refs
  const adRef = useRef(null);
  const recognitionRef = useRef(null);
  const filtersRef = useRef(null);
  const coinAnimationRef = useRef(null);

  // Load services data
  useEffect(() => {
    // Simulate API fetch
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Simulate network request
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
              "https://images.unsplash.com/photo-1546778313-8e3a6a8e8b0c?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "d1", name: "Royal Decor Co.", rating: 4.8, available: true },
              { id: "d2", name: "Floral Fantasy", rating: 4.6, available: false },
            ],
            stock: 5
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
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "l1", name: "Shine & Co.", rating: 4.5, available: true },
              { id: "l2", name: "Glow Events", rating: 4.4, available: true },
            ],
            stock: 12
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
              "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "c1", name: "Sharma Caterers", rating: 4.8, available: true },
              { id: "c2", name: "Gupta Caterers", rating: 4.6, available: true },
              { id: "c3", name: "Verma Caterers", rating: 4.7, available: false },
            ],
            stock: 3
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
              "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "t1", name: "Deluxe Tent House", rating: 4.5, available: true },
              { id: "t2", name: "Royal Tent Decor", rating: 4.4, available: true },
            ],
            stock: 8
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
              "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "v1", name: "Pixel Studio", rating: 4.9, available: true },
              { id: "v2", name: "Wedding Films", rating: 4.8, available: true },
            ],
            stock: 6
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
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
            ],
            vendors: [
              { id: "h1", name: "Sanskaraa Palace", rating: 4.7, available: true },
              { id: "h2", name: "Grand Royale Hall", rating: 4.6, available: true },
            ],
            stock: 4
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
      "https://cdn.coverr.co/videos/coverr-wedding-bouquet-5196/1080p.mp4",
      "https://cdn.coverr.co/videos/coverr-golden-festive-lights-6428/1080p.mp4",
      "https://cdn.coverr.co/videos/coverr-pretty-wedding-cake-0496/1080p.mp4",
    ],
    []
  );

  // Reels data
  const reels = [
    {
      id: "r1",
      src: "https://cdn.coverr.co/videos/coverr-a-beautiful-wedding-ceremony-8799/1080p.mp4",
      title: "Wedding snippets",
      views: "12.4K",
    },
    {
      id: "r2",
      src: "https://cdn.coverr.co/videos/coverr-glittering-party-4341/1080p.mp4",
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
      return matchQ && matchC && matchR;
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
  }, [services, query, category, minRating, sortBy]);

  // Recommended services
  const recommended = useMemo(() => {
    const picks = new Set();
    if (filtered.some((f) => f.title === "Decoration")) {
      picks.add("Lighting");
      picks.add("Tents");
    }
    if (filtered.some((f) => f.title === "Marriage Halls")) {
      picks.add("Catering");
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

  // Service interaction handlers
  const handleBook = (s) => {
    setCoins((c) => c + 50);
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 2000);
    
    // Show success toast
    showToast(`Booked: ${s.title} — reward +50 Sanskaraa Coins!`);
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

  const addReview = (id, r) => {
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
      showToast("Share feature not supported in this browser");
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
      </div>
    );
  };

  const showToast = (message, type = "success") => {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-[-100px] ${
      type === "success" ? "bg-amber-500 text-white" : "bg-amber-700 text-white"
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
        document.body.removeChild(toast);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 transition-colors duration-300 overflow-x-hidden">
      {/* Toast container (for programmatic toasts) */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2"></div>
      
      
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-amber-100/70 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between mt-12">
          <div className="flex items-center gap-2 mt-6">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h1 className="font-bold text-lg text-amber-800">Sanskaraa Services</h1>
            <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">Coins: {coins}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className={`px-3 py-1.5 rounded-xl border text-sm ${chatOpen ? "bg-amber-700 text-white" : "bg-white border-amber-200 text-amber-800"}`} onClick={() => setChatOpen((v) => !v)}>
              <MessageSquare className="inline w-4 h-4 mr-1" /> Chat
            </button>
            <a href="tel:+911234567890" className="px-3 py-1.5 rounded-xl border border-amber-200 text-sm bg-white text-amber-800">
              <PhoneCall className="inline w-4 h-4 mr-1" /> Call
            </a>
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
                className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden"
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
                    <option value="4.8">4.8+</option>
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
            className="w-full h-64 lg:h-[380px] object-cover"
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
                whileHover={{ y: -5 }}
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
                    onClick={() => setWish((w) => ({ ...w, [s.id]: !w[s.id] }))}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                  >
                    {wish[s.id] ? <BookmarkCheck className="w-5 h-5 text-amber-700" /> : <Bookmark className="w-5 h-5 text-amber-600" />}
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
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-800">{selectedService.title}</h2>
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
                    <img src={selectedService.images[0]} alt={selectedService.title} className="w-full h-60 object-cover rounded-xl" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-amber-800">Pricing</h3>
                      <p className="text-2xl font-bold text-amber-800">{rupee(selectedService.basePrice)} {selectedService.unit && <span className="text-lg">{selectedService.unit}</span>}</p>
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
                    onClick={() => handleBook(selectedService)}
                    className="flex-1 px-4 py-3 rounded-xl bg-amber-700 text-white hover:bg-amber-800 font-semibold"
                  >
                    Book Now
                  </button>
                  <button 
                    onClick={() => setWish((w) => ({ ...w, [selectedService.id]: !w[selectedService.id] }))}
                    className="px-4 py-3 rounded-xl border border-amber-200 text-amber-800 flex items-center justify-center"
                  >
                    {wish[selectedService.id] ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
            <button className="px-4 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800 mb-2 sm:mb-0">Create account</button>
            <button className="px-4 py-2 rounded-xl border border-amber-200 bg-white text-amber-800">Know more</button>
          </div>
        </div>
        <div className="text-xs text-amber-600 text-center mt-4">© {new Date().getFullYear()} Sanskaraa. All rights reserved.</div>
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
  );
}

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