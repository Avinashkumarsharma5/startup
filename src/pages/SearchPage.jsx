import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion"; 
// Mock useNavigate for a standalone environment. In a real project, this would be uncommented.
// import { useNavigate } from "react-router-dom"; 
const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);

import { 
  Search, Star, MapPin, Filter, ChevronDown, Clock, 
  Heart, Share, Phone, Calendar, User, Package, 
  Flower2, BookOpen, ChevronRight, Sparkles, Zap,
  Crown, Award, Truck, Shield, CheckCircle, X,
  Mic, Loader, ArrowRight, Bookmark, BookmarkCheck,
  TrendingUp, Navigation, Wifi, WifiOff
} from "lucide-react";

// Themed Color Palette Mapping based on the Home Page's aesthetic (Maroon, Amber, Cream)
const THEME_COLORS = {
  primary: '#800000',      // Deep Maroon (Main CTA, Strong Text) - Matches Home theme
  secondary: '#4D0000',    // Darker Maroon (Headers)
  background: '#FFF7E0',   // Light Cream (Main Background) - Matches Home theme
  dark: '#4D0000',         // Darker Maroon (Dark sections/Hover)
  gold: '#FFD700',         // Gold (Star/Accent)
  text: '#4D0000',         // Dark Maroon (Primary Text)
  textSecondary: '#6B4226',// Warm Brown/Gray (Subtitles/Secondary Text)
  border: '#FFDAB9',       // Peach/Orange-200 (Soft Border)
  success: '#38761D',      // Darker Green
  error: '#CC0000',        // Red
  // Utility for gradients
  saffronStart: '#FF8C00', // Dark Orange Start
  saffronEnd: '#FFD700',   // Gold End
  hoverPrimary: '#A52A2A', // Lighter Maroon Hover
  hoverGold: '#FFA500',    // Orange Hover
};


// Enhanced Mock Data (Unchanged)
const data = {
  events: [
    { 
      id: 1, 
      name: "Griha Pravesh Puja", 
      img: "https://images.unsplash.com/photo-1581578731547-c8a5333ee6e3?w=400", 
      rating: 4.5, 
      price: 2000, 
      originalPrice: 2500,
      time: "2 hours", 
      category: "Home Ceremony",
      tags: ["Popular", "Bestseller", "Trending"],
      deliveryTime: "Within 24 hours",
      distance: "2.5 km",
      offers: ["10% off on first booking", "Free consultation"],
      featured: true,
      reviews: 124,
      vendor: {
        name: "Vedic Traditions",
        rating: 4.7,
        verified: true
      },
      trendingScore: 95,
      bookedToday: 12
    },
    { 
      id: 2, 
      name: "Satyanarayan Katha", 
      img: "https://images.unsplash.com/photo-1605484477140-1c8f35b2e7e7?w=400", 
      rating: 4.8, 
      price: 1500, 
      originalPrice: 1800,
      time: "3 hours", 
      category: "Religious",
      tags: ["Trending", "Popular"],
      deliveryTime: "Same day",
      distance: "1.8 km",
      offers: ["Free prasad"],
      featured: true,
      trendingScore: 92,
      bookedToday: 8
    },
    { 
      id: 9, 
      name: "Diwali Lakshmi Puja", 
      img: "https://images.unsplash.com/photo-1602777926691-3ef55cdf7c7f?w=400", 
      rating: 4.9, 
      price: 1800, 
      originalPrice: 2200,
      time: "2.5 hours", 
      category: "Festival",
      tags: ["Seasonal", "Trending"],
      deliveryTime: "1 day advance",
      distance: "3.1 km",
      offers: ["Free diya kit", "15% off early booking"],
      featured: true,
      trendingScore: 98,
      bookedToday: 25
    },
  ],
  pandits: [
    { 
      id: 3, 
      name: "Pandit Sharma Ji", 
      img: "https://images.unsplash.com/photo-1581578731547-c8a5333ee6e3?w=400", 
      rating: 4.9, 
      price: 2500, 
      originalPrice: 3000,
      experience: "15+ years", 
      specialization: "Vedic Rituals",
      tags: ["Expert", "Verified", "Trending"],
      responseTime: "15 min",
      languages: ["Hindi", "Sanskrit", "English"],
      availability: "Available Today",
      distance: "3.2 km",
      featured: true,
      vendor: {
        name: "Sharma Pandit Services",
        rating: 4.9,
        verified: true
      },
      trendingScore: 94,
      bookedToday: 6
    },
    { 
      id: 4, 
      name: "Pandit Mishra Ji", 
      img: "https://images.unsplash.com/photo-1605484477140-1c8f35b2e7e7?w=400", 
      rating: 4.6, 
      price: 2200, 
      experience: "12+ years", 
      specialization: "Wedding Ceremonies",
      tags: ["Senior"],
      responseTime: "20 min",
      trendingScore: 87,
      bookedToday: 3
    },
  ],
  kits: [
    { 
      id: 5, 
      name: "Premium Ganesh Puja Kit", 
      img: "https://images.unsplash.com/photo-1581578731547-c8a5333ee6e3?w=400", 
      rating: 4.4, 
      price: 1200, 
      originalPrice: 1500,
      items: 25, 
      category: "Festival",
      tags: ["Complete Kit", "Bestseller", "Popular"],
      deliveryTime: "30 minutes",
      distance: "1.5 km",
      offers: ["Free delivery", "Extra items included"],
      featured: true,
      trendingScore: 89,
      bookedToday: 15
    },
    { 
      id: 6, 
      name: "Navratri Special Kit", 
      img: "https://images.unsplash.com/photo-1605484477140-1c8f35b2e7e7?w=400", 
      rating: 4.3, 
      price: 1800, 
      items: 30, 
      category: "Festival",
      tags: ["Seasonal"],
      deliveryTime: "45 minutes",
      trendingScore: 82,
      bookedToday: 7
    },
  ],
  decorations: [
    { 
      id: 7, 
      name: "Luxury Mandap Decoration", 
      img: "https://images.unsplash.com/photo-1581578731547-c8a5333ee6e3?w=400", 
      rating: 4.7, 
      price: 25000, 
      originalPrice: 30000,
      type: "Premium", 
      category: "Wedding",
      tags: ["Luxury", "Trending"],
      deliveryTime: "2 days advance",
      distance: "5 km",
      offers: ["Free setup", "10% off on booking"],
      featured: true,
      trendingScore: 91,
      bookedToday: 4
    },
    { 
      id: 8, 
      name: "Floral Stage Decoration", 
      img: "https://images.unsplash.com/photo-1605484477140-1c8f35b2e7e7?w=400", 
      rating: 4.5, 
      price: 15000, 
      type: "Standard", 
      category: "Event",
      tags: ["Fresh Flowers"],
      deliveryTime: "1 day advance",
      trendingScore: 85,
      bookedToday: 2
    },
  ],
};

const categories = [
  { 
    key: "events", 
    label: "Events", 
    icon: Calendar, 
    color: `from-[${THEME_COLORS.saffronStart}] to-[${THEME_COLORS.saffronEnd}]`,
    count: data.events.length
  },
  { 
    key: "pandits", 
    label: "Pandits", 
    icon: User, 
    color: "from-blue-500 to-cyan-500", // Using a different palette for contrast
    count: data.pandits.length
  },
  { 
    key: "kits", 
    label: "Puja Kits", 
    icon: Package, 
    color: "from-green-500 to-emerald-500", // Using a different palette for contrast
    count: data.kits.length
  },
  { 
    key: "decorations", 
    label: "Decorations", 
    icon: Flower2, 
    color: `from-[${THEME_COLORS.primary}] to-[${THEME_COLORS.gold}]`,
    count: data.decorations.length
  },
  { 
    key: "bookings", 
    label: "Bookings", 
    icon: BookOpen, 
    color: "from-indigo-500 to-purple-500", // Using a different palette for contrast
    count: 12
  },
];

const filtersList = {
  sort: [
    { id: "rating", label: "Rating: High to Low" },
    { id: "price_low", label: "Price: Low to High" },
    { id: "price_high", label: "Price: High to Low" },
    { id: "delivery", label: "Fastest Delivery" },
    { id: "distance", label: "Distance: Near to Far" },
    { id: "trending", label: "Trending First" }
  ],
  rating: [
    { id: "4.5", label: "4.5+ Excellent" },
    { id: "4.0", label: "4.0+ Very Good" },
    { id: "3.5", label: "3.5+ Good" },
    { id: "3.0", label: "3.0+ Average" }
  ],
  price: [
    { id: "0-1000", label: "Under ₹1000" },
    { id: "1000-2500", label: "₹1000 - ₹2500" },
    { id: "2500-5000", label: "₹2500 - ₹5000" },
    { id: "5000-10000", label: "₹5000 - ₹10000" },
    { id: "10000+", label: "Above ₹10000" }
  ],
  features: [
    { id: "verified", label: "Verified Only" },
    { id: "discount", label: "Great Offers" },
    { id: "fast_delivery", label: "Fast Delivery" },
    { id: "popular", label: "Popular" },
    { id: "trending", label: "Trending" }
  ]
};

const popularTags = ["Diwali", "Wedding", "Housewarming", "Ganpati", "Navratri", "Satyanarayan", "Griha Pravesh", "Mundan", "Engagement"];

// Utility to combine all data and add metadata for filtering
const allItemsData = Object.entries(data).flatMap(([mainCategory, items]) =>
  items.map(item => ({
    ...item,
    mainCategory,
    originalCategory: item.category,
    type: mainCategory
  }))
);

// Helper function for safe delivery time parsing
const parseDeliveryTime = (timeString) => {
  if (!timeString) return 999;
  const parts = timeString.split(' ');
  const number = parseInt(parts[0]) || 999;
  const unit = parts.length > 1 ? parts[1].toLowerCase() : '';
  
  if (unit.startsWith('day')) return number * 24 * 60;
  if (unit.startsWith('hour')) return number * 60;
  
  if (timeString.toLowerCase().includes('hour') && number !== 999) return number * 60;
  if (timeString.toLowerCase().includes('minute') && number !== 999) return number;
  
  return number < 100 && parts.length > 1 ? number : 999; 
};

// 1. Custom Hook: useSanskaraaSearch 
const useSanskaraaSearch = (showToast) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState(() => ({
    sort: "rating",
    rating: null,
    price: null,
    features: []
  }));
  const [searchHistory, setSearchHistory] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [location, setLocation] = useState("Connaught Place, Delhi (Default)");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(9);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const loadMoreRef = useRef(null);

  const saveToHistory = useCallback((searchQuery) => {
    if (!searchQuery.trim()) return;
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  }, [searchHistory]);

  const toggleWishlist = useCallback((itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
        showToast("Removed from wishlist", "info");
      } else {
        newWishlist.add(itemId);
        showToast("Added to wishlist", "success");
      }
      return newWishlist;
    });
  }, [showToast]);

  const startVoiceSearch = () => {
    if (!isOnline) {
      showToast("Voice search requires internet connection.", "warning");
      return;
    }
    
    setIsListening(true);
    setLoading(true);
    showToast("Listening...", "info");
    
    setTimeout(() => {
        const mockTranscript = "Diwali Puja";
        setQuery(mockTranscript);
        saveToHistory(mockTranscript);
        setIsListening(false);
        setLoading(false);
        showToast(`Searching for: ${mockTranscript}`, "success");
    }, 1500);
  };
  
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation("Location access not supported");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setLocation("Mumbai, Maharashtra (Precise)");
        }, 1000);
      },
      (error) => {
        setLocation("Connaught Place, Delhi (Default)"); 
      },
      { timeout: 5000 }
    );
  }, []);

  const filteredItems = useMemo(() => {
    let results = allItemsData.filter(item => {
      const matchesCategory = activeCategory === "all" || item.mainCategory === activeCategory;
        
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.originalCategory?.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
      const matchesRating = !filters.rating || item.rating >= parseFloat(filters.rating);
        
      let matchesPrice = true;
      if (filters.price && filters.price.length > 0) {
        const priceFilters = Array.isArray(filters.price) ? filters.price : [filters.price];
        matchesPrice = priceFilters.some(priceFilter => {
          const priceRange = priceFilter.split('-');
          const min = parseInt(priceRange[0]);
          const max = priceRange[1] === '+' ? Infinity : parseInt(priceRange[1]);
          return item.price >= min && (max ? item.price <= max : true);
        });
      }
        
      let matchesFeatures = true;
      if (filters.features.length > 0) {
        if (filters.features.includes('verified') && !item.vendor?.verified) matchesFeatures = false;
        if (filters.features.includes('discount') && !item.originalPrice) matchesFeatures = false;
        if (filters.features.includes('popular') && !item.tags?.includes('Popular')) matchesFeatures = false;
        if (filters.features.includes('trending') && (item.trendingScore || 0) < 85) matchesFeatures = false;
        if (filters.features.includes('fast_delivery') && parseDeliveryTime(item.deliveryTime) > 60) matchesFeatures = false;
      }

      return matchesCategory && matchesQuery && matchesRating && matchesPrice && matchesFeatures;
    });

    switch(filters.sort) {
      case "rating": results.sort((a, b) => b.rating - a.rating); break;
      case "price_low": results.sort((a, b) => a.price - b.price); break;
      case "price_high": results.sort((a, b) => b.price - a.price); break;
      case "delivery": results.sort((a, b) => parseDeliveryTime(a.deliveryTime) - parseDeliveryTime(b.deliveryTime)); break;
      case "distance": results.sort((a, b) => (parseFloat(a.distance) || 999) - (parseFloat(b.distance) || 999)); break;
      case "trending": results.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0)); break;
      default: results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [query, activeCategory, filters]);
  
  useEffect(() => {
    setVisibleItems(9);
  }, [query, activeCategory, filters]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedWishlist) setWishlist(new Set(JSON.parse(savedWishlist)));
    
    detectLocation();

    const handleOnline = () => { setIsOnline(true); showToast("You're back online!", "success"); };
    const handleOffline = () => { setIsOnline(false); showToast("You're offline. Some features may not work.", "warning"); };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [detectLocation, showToast]); 

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && visibleItems < filteredItems.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + 6, filteredItems.length));
            setLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, filteredItems.length, loading]);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ sort: "rating", rating: null, price: null, features: [] });
    showToast("Filters cleared", "info");
  }, [showToast]);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filters,
    handleFilterChange,
    clearFilters,
    searchHistory,
    location,
    isListening,
    loading,
    wishlist,
    isOnline,
    filteredItems,
    displayedItems: filteredItems.slice(0, visibleItems),
    loadMoreRef,
    startVoiceSearch,
    saveToHistory,
    toggleWishlist,
    detectLocation,
    allItemCount: allItemsData.length,
  };
};

// 2. Helper Components (Themed)

// Toast Container Component
const ToastContainer = ({ toasts }) => (
  <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-[90vw] sm:max-w-xs">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`px-6 py-3 rounded-lg shadow-xl text-white font-medium transform transition-all duration-300 animate-in slide-in-from-right ${
          toast.type === "success" ? `bg-[${THEME_COLORS.success}]` :
          toast.type === "error" ? `bg-[${THEME_COLORS.error}]` :
          toast.type === "warning" ? "bg-amber-500" : `bg-[${THEME_COLORS.dark}]`
        }`}
      >
        <div className="flex items-center gap-2">
          {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
          {toast.type === "error" && <X className="w-4 h-4" />}
          {toast.type === "warning" && <Award className="w-4 h-4" />}
          {toast.message}
        </div>
      </div>
    ))}
  </div>
);

// Shimmer Card Component
const ShimmerCard = () => (
  <div className={`bg-white rounded-2xl shadow-sm border border-[${THEME_COLORS.border}] overflow-hidden animate-pulse`}>
    <div className={`h-48 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100`}></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
      </div>
  </div>
);

// Themed Service Card Component
const ServiceCard = ({ item, onBook, onViewDetails, isWishlisted, onToggleWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      <Star className={`w-4 h-4 fill-[${THEME_COLORS.gold}] text-[${THEME_COLORS.gold}]`} />
      <span className={`text-sm font-semibold text-[${THEME_COLORS.text}]`}>{rating}</span>
    </div>
  );

  const renderDeliveryInfo = () => {
    if (item.deliveryTime) {
      return (
        <div className={`flex items-center gap-1 text-[${THEME_COLORS.textSecondary}] text-sm`}>
          <Clock className="w-3 h-3" />
          <span>{item.deliveryTime}</span>
          {item.distance && <span>• {item.distance}</span>}
        </div>
      );
    }
    return null;
  };

  const renderPrice = () => (
    <div className="flex items-center gap-2">
      <span className={`text-lg font-bold text-[${THEME_COLORS.text}]`}>₹{item.price}</span>
      {item.originalPrice && (
        <span className={`text-sm text-[${THEME_COLORS.textSecondary}] line-through`}>₹{item.originalPrice}</span>
      )}
      {item.originalPrice && (
        <span className={`text-xs font-semibold text-[${THEME_COLORS.success}] bg-green-50 px-1.5 py-0.5 rounded`}>
          {Math.round((1 - item.price/item.originalPrice) * 100)}% OFF
        </span>
      )}
    </div>
  );

  const renderTags = () => {
    if (!item.tags) return null;
    return (
      <div className="flex gap-1 flex-wrap mb-2">
        {item.tags.map((tag, index) => (
          <span key={index} className={`text-xs font-medium bg-amber-100 text-[${THEME_COLORS.text}] px-2 py-1 rounded-full`}>
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const renderSocialProof = () => {
    if (item.bookedToday > 5) {
      return (
        <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
          <Zap className="w-3 h-3" />
          <span>🔥 {item.bookedToday} booked today</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-[${THEME_COLORS.border}] hover:shadow-lg transition-all duration-300 hover:border-amber-500 group cursor-pointer`}
      onClick={() => onViewDetails(item)}
    >
      <div className="relative">
        {/* Image */}
        {!imageLoaded && !imageError && <div className="h-48 bg-gray-100 rounded-t-2xl animate-pulse"></div>}
        {imageError ? (
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <img 
            src={item.img} 
            alt={item.name}
            className={`h-48 w-full object-cover rounded-t-2xl ${imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.featured && (
            <span className={`bg-gradient-to-r from-[${THEME_COLORS.saffronStart}] to-[${THEME_COLORS.saffronEnd}] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
              <Crown className="w-3 h-3" />
              Featured
            </span>
          )}
          {item.trendingScore > 90 && (
            <span className={`bg-[${THEME_COLORS.secondary}] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <BookmarkCheck className={`w-4 h-4 text-[${THEME_COLORS.error}] fill-current`} />
          ) : (
            <Bookmark className={`w-4 h-4 text-[${THEME_COLORS.textSecondary}]`} />
          )}
        </button>

        {/* Vendor Info */}
        {item.vendor && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className={`bg-[${THEME_COLORS.dark}] bg-opacity-80 text-white px-3 py-2 rounded-xl`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{item.vendor.name}</span>
                <div className="flex items-center gap-1">
                  <Star className={`w-3 h-3 fill-[${THEME_COLORS.gold}] text-[${THEME_COLORS.gold}]`} />
                  <span>{item.vendor.rating}</span>
                  {item.vendor.verified && <Shield className="w-3 h-3 text-cyan-400" />}
              </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-[${THEME_COLORS.text}] text-lg leading-tight flex-1 pr-2`}>{item.name}</h3>
          <div className={`flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full`}>
            {renderStars(item.rating)}
          </div>
        </div>

        {/* Category and Specialization */}
        <div className={`text-[${THEME_COLORS.textSecondary}] text-sm mb-2`}>
          {item.category || item.specialization || item.type}
          {item.experience && ` • ${item.experience}`}
          {item.items && ` • ${item.items} items`}
          {item.time && ` • ${item.time}`}
        </div>

        {/* Tags & Proof */}
        {renderTags()}
        {renderSocialProof()}

        {/* Delivery Info */}
        {renderDeliveryInfo()}

        {/* Price and CTA */}
        <div className={`flex items-center justify-between mt-3 pt-3 border-t border-[${THEME_COLORS.border}]`}>
          {renderPrice()}
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className={`px-3 py-2 border border-[${THEME_COLORS.border}] text-[${THEME_COLORS.textSecondary}] rounded-xl hover:bg-gray-50 text-sm font-medium hidden sm:block`}
            >
              View
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onBook(item);
              }}
              className={`px-4 py-2 bg-[${THEME_COLORS.primary}] text-white rounded-xl hover:bg-[${THEME_COLORS.hoverPrimary}] text-sm font-semibold transition-colors`}
            >
              Book Now
            </button>
          </div>
          </div>

        {/* Offers */}
        {item.offers && item.offers.length > 0 && (
          <div className={`mt-3 pt-3 border-t border-[${THEME_COLORS.border}]`}>
            <div className={`flex items-center gap-2 text-xs text-[${THEME_COLORS.textSecondary}]`}>
              <Zap className={`w-3 h-3 text-orange-500`} />
              <span className="font-medium">{item.offers[0]}</span>
              {item.offers.length > 1 && (
                <span className={`text-[${THEME_COLORS.textSecondary}]`}>+{item.offers.length - 1} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Themed Filter Section Component
const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const [expandedSection, setExpandedSection] = useState('sort');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isFilterActive = () => {
    return Object.values(filters).some(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter !== null && filter !== '' && filter !== 'rating'
    );
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-[${THEME_COLORS.border}] p-4 sm:p-6`}>
      <div className={`flex items-center justify-between mb-4 text-[${THEME_COLORS.text}]`}>
        <h3 className="font-semibold text-lg">Filters</h3>
        {isFilterActive() && (
          <button 
            onClick={onClearFilters}
            className={`text-sm text-orange-600 hover:text-orange-800 font-medium`}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(filtersList).map(([section, options]) => (
          <div key={section} className={`border-b border-[${THEME_COLORS.border}] pb-4 last:border-b-0 last:pb-0`}>
            <button 
              onClick={() => toggleSection(section)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className={`font-medium text-[${THEME_COLORS.text}] capitalize`}>
                {section === 'sort' ? 'Sort By' : section}
              </span>
              <ChevronDown className={`w-4 h-4 text-[${THEME_COLORS.textSecondary}] transition-transform ${expandedSection === section ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === section && (
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-2">
                {options.map(option => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    {section === 'features' || section === 'price' ? (
                      <input
                        type="checkbox"
                        checked={filters[section]?.includes(option.id) || false}
                        onChange={(e) => {
                          const newOptions = e.target.checked
                            ? [...(filters[section] || []), option.id]
                            : (filters[section] || []).filter(f => f !== option.id);
                          onFilterChange(section, newOptions);
                        }}
                        className={`text-[${THEME_COLORS.primary}] focus:ring-amber-500 rounded border-gray-300`}
                      />
                    ) : (
                      <input
                        type="radio"
                        name={section}
                        value={option.id}
                        checked={filters[section] === option.id}
                        onChange={(e) => onFilterChange(section, e.target.value)}
                        className={`text-[${THEME_COLORS.primary}] focus:ring-amber-500 border-gray-300`}
                      />
                    )}
                    <span className={`text-[${THEME_COLORS.textSecondary}]`}>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Themed Trending Section Component
const TrendingSection = ({ items, onBook, onViewDetails, onToggleWishlist, wishlist }) => {
  const trendingItems = useMemo(() => {
    return items
      .filter(item => item.trendingScore >= 90)
      .slice(0, 3);
  }, [items]);

  if (trendingItems.length === 0) return null;

  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-6 mb-8 border border-[${THEME_COLORS.border}] shadow-md`}>
      <div className="flex items-center gap-2 mb-4">
        <Zap className={`w-5 h-5 text-orange-500`} />
        <h3 className={`text-lg font-bold text-[${THEME_COLORS.secondary}]`}>🔥 Trending Now</h3>
        <span className={`bg-[${THEME_COLORS.primary}] text-white px-2 py-1 rounded-full text-xs font-semibold hidden sm:inline-block`}>
          Hot
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingItems.map((item, index) => (
          <div key={item.id} className={`bg-white rounded-xl p-4 shadow-sm border border-[${THEME_COLORS.border}] hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`bg-gradient-to-r from-[${THEME_COLORS.saffronStart}] to-[${THEME_COLORS.saffronEnd}] text-white text-xs font-bold px-2 py-1 rounded`}>
                  #{index + 1}
                </span>
                <span className={`text-xs font-semibold text-[${THEME_COLORS.primary}] bg-amber-100 px-2 py-1 rounded`}>
                  {item.trendingScore}% trending
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleWishlist(item.id); }}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label={wishlist.has(item.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlist.has(item.id) ? (
                  <BookmarkCheck className={`w-4 h-4 text-[${THEME_COLORS.error}] fill-current`} />
                ) : (
                  <Bookmark className={`w-4 h-4 text-[${THEME_COLORS.textSecondary}]`} />
                )}
              </button>
            </div>
            <h4 className={`font-semibold text-[${THEME_COLORS.text}] mb-2`}>{item.name}</h4>
            <div className={`flex items-center gap-4 text-sm text-[${THEME_COLORS.textSecondary}] mb-3`}>
              <span>{item.category}</span>
              <span>•</span>
              <span>{item.deliveryTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold text-[${THEME_COLORS.text}]`}>₹{item.price}</span>
                {item.originalPrice && (
                  <span className={`text-sm text-[${THEME_COLORS.textSecondary}] line-through`}>₹{item.originalPrice}</span>
                )}
              </div>
            </div>
            {item.bookedToday > 0 && (
              <div className={`mt-2 text-xs text-[${THEME_COLORS.primary}]`}>
                {item.bookedToday} people booked today
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Themed Recommended Section Component (Confirmed correct props passing)
const RecommendedSection = ({ items, onBook, onViewDetails, onToggleWishlist, wishlist }) => {
  const recommendedItems = useMemo(() => {
    return items
      .filter(item => item.featured || item.rating >= 4.5 || item.trendingScore >= 85)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, [items]);

  if (recommendedItems.length === 0) return null;

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold text-[${THEME_COLORS.secondary}] flex items-center gap-2`}>
          <Sparkles className={`w-5 h-5 text-orange-500`} />
          Recommended For You
        </h3>
        <button className={`text-orange-600 hover:text-orange-800 font-medium text-sm flex items-center gap-1`}>
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendedItems.map(item => (
          <ServiceCard
            key={item.id}
            item={item}
            onBook={onBook}
            onViewDetails={onViewDetails}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlist.has(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Themed Quick Booking Modal
const QuickBookModal = ({ item, isOpen, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
      setSelectedTime('10:00 AM');
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9000] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl w-full max-w-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 border-b border-[${THEME_COLORS.border}]`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold text-[${THEME_COLORS.secondary}]`}>Quick Book</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className={`w-5 h-5 text-[${THEME_COLORS.text}]`} />
            </button>
          </div>
          </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 className={`font-semibold text-[${THEME_COLORS.text}]`}>{item.name}</h4>
              <p className={`text-sm text-[${THEME_COLORS.textSecondary}]`}>{item.category || item.type}</p>
              <p className={`text-lg font-bold text-[${THEME_COLORS.text}]`}>₹{item.price}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-[${THEME_COLORS.text}] mb-2`}>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full px-3 py-2 border border-[${THEME_COLORS.border}] rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500`}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium text-[${THEME_COLORS.text}] mb-2`}>Select Time</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 border rounded-lg text-sm ${
                      selectedTime === slot 
                        ? `border-[${THEME_COLORS.primary}] bg-amber-100 text-[${THEME_COLORS.primary}] font-semibold` 
                        : `border-[${THEME_COLORS.border}] text-[${THEME_COLORS.textSecondary}] hover:border-amber-500`
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 border-t border-[${THEME_COLORS.border}] flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 border border-[${THEME_COLORS.border}] text-[${THEME_COLORS.textSecondary}] rounded-lg hover:bg-gray-50 font-medium`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedDate && selectedTime) {
                onConfirm(item, selectedDate, selectedTime);
                onClose();
              }
            }}
            disabled={!selectedDate || !selectedTime}
            className={`flex-1 px-4 py-2 bg-[${THEME_COLORS.primary}] text-white rounded-lg hover:bg-[${THEME_COLORS.hoverPrimary}] disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors`}
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// 3. Main Component: Themed ZomatoStyleSearchPage
export default function ZomatoStyleSearchPage() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [quickBookItem, setQuickBookItem] = useState(null);

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filters,
    handleFilterChange,
    clearFilters,
    searchHistory,
    isListening,
    loading,
    wishlist,
    isOnline,
    filteredItems,
    displayedItems,
    loadMoreRef,
    startVoiceSearch,
    saveToHistory,
    toggleWishlist,
    allItemCount,
  } = useSanskaraaSearch(showToast); 

  const handleBook = (item) => {
    setQuickBookItem(item);
  };

  const handleQuickBookConfirm = (item, date, time) => {
    showToast(`Booking confirmed for ${item.name} on ${date} at ${time}`, "success");
  };

  const handleViewDetails = (item) => {
    showToast(`Viewing details for ${item.name}`, "info");
    // navigate('/details/' + item.id);
  };

  return (
    <div className={`min-h-screen bg-[${THEME_COLORS.background}]`}>
      {/* Header - Themed */}
      <header className={`bg-white shadow-sm border-b border-[${THEME_COLORS.border}] sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Online Status */}
          {!isOnline && (
            <div className={`bg-amber-100 border border-orange-200 rounded-lg p-3 mb-4 flex items-center gap-2`}>
              <WifiOff className={`w-4 h-4 text-orange-500`} />
              <span className={`text-[${THEME_COLORS.textSecondary}] text-sm`}>You're offline. Some features may be limited.</span>
            </div>
          )}

          {/* Search Bar (Themed to match Home) */}
          <div className="relative">
            <div className={`flex items-center bg-[${THEME_COLORS.background}] rounded-xl shadow-md border border-orange-200 px-4 py-2 sm:py-3 hover:border-amber-500 transition-colors`}>
              <Search className={`text-orange-500 w-5 h-5 mr-3`} />
              <input
                type="text"
                placeholder="Search pujas, pandits, kits, decorations..."
                className={`flex-1 outline-none bg-transparent text-[${THEME_COLORS.text}] placeholder-gray-600 text-base sm:text-lg`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveToHistory(query)}
                aria-label="Search services"
              />
              <div className="flex items-center gap-2 ml-2">
                {isListening ? (
                  <div className={`animate-pulse text-[${THEME_COLORS.error}] flex items-center gap-1 sm:gap-2`}>
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-xs sm:text-sm">Listening...</span>
                  </div>
                ) : (
                  <button
                    onClick={startVoiceSearch}
                    className={`p-1 sm:p-2 hover:bg-gray-100 rounded-full transition text-orange-500`}
                    title="Voice Search"
                    aria-label="Start voice search"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              <span className={`text-sm text-[${THEME_COLORS.textSecondary}] flex items-center gap-1 flex-shrink-0`}>
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Popular:
              </span>
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    saveToHistory(tag);
                  }}
                  className={`text-sm bg-gray-100 hover:bg-orange-100 text-[${THEME_COLORS.textSecondary}] px-3 py-1 rounded-full transition-colors border border-transparent flex-shrink-0`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Suggestions */}
            {query && searchHistory.length > 0 && (
              <div className={`absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-30 border border-[${THEME_COLORS.border}]`}>
                <div className="p-2">
                  {searchHistory.filter(term => term.toLowerCase().includes(query.toLowerCase())).map((term, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                      onClick={() => {
                        setQuery(term);
                        saveToHistory(term);
                      }}
                    >
                      <Clock className={`w-4 h-4 text-[${THEME_COLORS.textSecondary}]`} />
                      <span className={`text-[${THEME_COLORS.text}]`}>{term}</span>
                    </button>
                  ))}
              </div>
            </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Tabs - Themed */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Services Tab */}
          <button
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === "all" 
                ? `bg-[${THEME_COLORS.primary}] text-white shadow-lg` 
                : `bg-white text-[${THEME_COLORS.textSecondary}] border border-[${THEME_COLORS.border}] hover:border-amber-500`
            }`}
            onClick={() => setActiveCategory("all")}
          >
            <Sparkles className="w-4 h-4" />
            All
            <span className="hidden sm:inline-block">Services</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ml-1 ${
              activeCategory === "all" ? "bg-white bg-opacity-20" : "bg-gray-100"
            }`}>
              {allItemCount}
            </span>
          </button>
          
          {/* Other Categories */}
          {categories.map(({ key, label, icon: Icon, color, count }) => (
            <button
              key={key}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === key 
                  ? `bg-gradient-to-r ${color} text-white shadow-lg` 
                  : `bg-white text-[${THEME_COLORS.textSecondary}] border border-[${THEME_COLORS.border}] hover:border-amber-500`
              }`}
              onClick={() => setActiveCategory(key)}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ml-1 ${
                activeCategory === key ? "bg-white bg-opacity-20" : "bg-gray-100"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar (Themed) */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSection 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
            
            {/* Quick Stats (Themed) */}
            <div className={`bg-white rounded-2xl shadow-sm border border-[${THEME_COLORS.border}] p-4 mt-4`}>
              <h4 className={`font-semibold text-[${THEME_COLORS.secondary}] mb-3`}>Quick Stats</h4>
              <div className={`space-y-2 text-sm text-[${THEME_COLORS.textSecondary}]`}>
                <div className="flex justify-between">
                  <span>Total Results</span>
                  <span className={`font-semibold text-[${THEME_COLORS.text}]`}>{filteredItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Filters</span>
                  <span className={`font-semibold text-[${THEME_COLORS.text}]`}>
                    {Object.values(filters).filter(f => 
                      Array.isArray(f) ? f.length > 0 : f !== null && f !== '' && f !== 'rating'
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>In Wishlist</span>
                  <span className={`font-semibold text-[${THEME_COLORS.text}]`}>{wishlist.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold text-[${THEME_COLORS.secondary}]`}>
                  {activeCategory === "all" ? "All Services" : categories.find(c => c.key === activeCategory)?.label}
                </h2>
                <p className={`text-sm sm:text-base text-[${THEME_COLORS.textSecondary}]`}>
                  {filteredItems.length} services found {query && `for "${query}"`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setShowFilters(true)}
                  className={`lg:hidden flex items-center gap-2 px-4 py-2 border border-[${THEME_COLORS.border}] rounded-xl text-[${THEME_COLORS.textSecondary}] hover:bg-gray-50 text-sm font-medium`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {/* Sort Info */}
                <div className={`text-sm text-[${THEME_COLORS.textSecondary}] hidden sm:block`}>
                  Sorted by: <span className={`font-semibold text-[${THEME_COLORS.text}]`}>
                    {filtersList.sort.find(s => s.id === filters.sort)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Trending Section */}
            <TrendingSection 
              items={filteredItems}
              onBook={handleBook}
              onViewDetails={handleViewDetails}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />

            {/* Services Grid */}
            {loading && displayedItems.length === 0 ? ( 
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            ) : displayedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedItems.map((item) => (
                    <ServiceCard
                      key={item.id}
                      item={item}
                      onBook={handleBook}
                      onViewDetails={handleViewDetails}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.has(item.id)}
                    />
                  ))}
                </div>
                
                {/* Load More Trigger */}
                {filteredItems.length > displayedItems.length && (
                  <div ref={loadMoreRef} className="flex justify-center mt-8">
                    <div className={`text-[${THEME_COLORS.textSecondary}] flex items-center gap-2 ${loading ? 'animate-pulse' : ''}`}>
                      <Loader className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Loading more services...' : 'Scroll down to load more'}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-md border border-[${THEME_COLORS.border}]">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-xl font-semibold text-[${THEME_COLORS.secondary}] mb-2`}>No services found</h3>
                <p className={`text-[${THEME_COLORS.textSecondary}] mb-6`}>Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className={`px-6 py-2 bg-[${THEME_COLORS.primary}] text-white rounded-xl hover:bg-[${THEME_COLORS.hoverPrimary}] font-semibold transition-colors`}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Recommendations Section (Show from all data if the filter result is empty) */}
            {activeCategory === "all" && filteredItems.length === 0 ? (
              <RecommendedSection 
                items={allItemsData}
                onBook={handleBook}
                onViewDetails={handleViewDetails}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            ) : (
              <RecommendedSection 
                items={filteredItems}
                onBook={handleBook}
                onViewDetails={handleViewDetails}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[8000] lg:hidden animate-in fade-in" onClick={() => setShowFilters(false)}>
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white overflow-y-auto shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-4 border-b border-[${THEME_COLORS.border}] sticky top-0 bg-white z-10`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold text-lg text-[${THEME_COLORS.secondary}]`}>Filters</h3>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                  <X className={`w-6 h-6 text-[${THEME_COLORS.text}]`} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterSection 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
            {/* Action button for mobile filter */}
            <div className={`p-4 sticky bottom-0 bg-white shadow-lg border-t border-[${THEME_COLORS.border}]`}>
                <button
                    onClick={() => setShowFilters(false)}
                    className={`w-full px-4 py-2 bg-[${THEME_COLORS.primary}] text-white rounded-xl hover:bg-[${THEME_COLORS.hoverPrimary}] font-semibold transition-colors`}
                >
                    Show {filteredItems.length} Results
                </button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Quick Book Modal */}
      <QuickBookModal
        item={quickBookItem}
        isOpen={!!quickBookItem}
        onClose={() => setQuickBookItem(null)}
        onConfirm={handleQuickBookConfirm}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}