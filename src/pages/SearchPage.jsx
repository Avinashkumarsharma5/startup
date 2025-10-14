import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
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

// Enhanced Mock Data
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
    color: "from-purple-500 to-pink-500",
    count: data.events.length
  },
  { 
    key: "pandits", 
    label: "Pandits", 
    icon: User, 
    color: "from-blue-500 to-cyan-500",
    count: data.pandits.length
  },
  { 
    key: "kits", 
    label: "Puja Kits", 
    icon: Package, 
    color: "from-green-500 to-emerald-500",
    count: data.kits.length
  },
  { 
    key: "decorations", 
    label: "Decorations", 
    icon: Flower2, 
    color: "from-orange-500 to-red-500",
    count: data.decorations.length
  },
  { 
    key: "bookings", 
    label: "Bookings", 
    icon: BookOpen, 
    color: "from-indigo-500 to-purple-500",
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
  const number = parseInt(parts[1]) || 999;
  const unit = parts[2] || '';
  if (unit.toLowerCase().startsWith('day')) return number * 24 * 60;
  if (unit.toLowerCase().startsWith('hour')) return number * 60;
  return number; // Assume minutes if unit is missing or small
};

// =================================================================
// 1. Custom Hook: useSanskaraaSearch
// =================================================================

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
  const [location, setLocation] = useState("Detecting location...");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(9);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const loadMoreRef = useRef(null);

  // Save to search history
  const saveToHistory = useCallback((searchQuery) => {
    if (!searchQuery.trim()) return;
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  }, [searchHistory]);

  // Toggle Wishlist
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

  // Voice Search Mock (Web API cannot be guaranteed or run in this environment)
  const startVoiceSearch = () => {
    if (!isOnline) {
      showToast("Voice search requires internet connection.", "warning");
      return;
    }
    
    setIsListening(true);
    setLoading(true);
    showToast("Listening...", "info");
    
    // Simulate speech recognition result after a short delay
    setTimeout(() => {
        const mockTranscript = "Diwali Puja"; // Example result
        setQuery(mockTranscript);
        saveToHistory(mockTranscript);
        setIsListening(false);
        setLoading(false);
        showToast(`Searching for: ${mockTranscript}`, "success");
    }, 1500);
  };
  
  // Enhanced Geolocation Mock
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation("Location access not supported");
      showToast("Location access not supported.", "error");
      return;
    }
    setLoading(true);
    
    // Using a fallback mechanism for the single-file environment
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, this would be a geocoding API call
        setTimeout(() => {
          setLocation("Mumbai, Maharashtra (Precise)");
          setLoading(false);
          showToast("Location detected successfully!", "success");
        }, 1000);
      },
      (error) => {
        setLocation("Connaught Place, Delhi (Default)"); 
        setLoading(false);
        showToast("Location access denied. Using default.", "warning");
      },
      { timeout: 5000 }
    );
  }, [showToast]);

  // Filter and sort items (The heavy logic)
  const filteredItems = useMemo(() => {
    let results = allItemsData.filter(item => {
      // Category filter
      const matchesCategory = activeCategory === "all" || item.mainCategory === activeCategory;
        
      // Search query
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.originalCategory?.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
      // Rating filter
      const matchesRating = !filters.rating || item.rating >= parseFloat(filters.rating);
        
      // Price filter
      let matchesPrice = true;
      if (filters.price) {
        const priceRange = filters.price.split('-');
        const min = parseInt(priceRange[0]);
        const max = priceRange[1] === '+' ? Infinity : parseInt(priceRange[1]);
        matchesPrice = item.price >= min && (max ? item.price <= max : true);
      }
        
      // Features filter
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

    // Apply sorting
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
  
  // Filter/Sort change effect: reset visible items
  useEffect(() => {
    setVisibleItems(9);
  }, [query, activeCategory, filters]);

  // Initial Load (History, Wishlist, Location, Online status)
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedWishlist) setWishlist(new Set(JSON.parse(savedWishlist)));
    
    detectLocation();

    // Online/Offline detection setup
    const handleOnline = () => { setIsOnline(true); showToast("You're back online!", "success"); };
    const handleOffline = () => { setIsOnline(false); showToast("You're offline. Some features may not work.", "warning"); };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [detectLocation, showToast]); 

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);
  
  // Infinite scroll
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

  // Filter handlers
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


// =================================================================
// 2. Helper Components (Toast, Shimmer, Card, Filter, Modal)
// =================================================================

// Toast Container Component
const ToastContainer = ({ toasts }) => (
  <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-[90vw] sm:max-w-xs">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`px-6 py-3 rounded-lg shadow-xl text-white font-medium transform transition-all duration-300 animate-in slide-in-from-right ${
          toast.type === "success" ? "bg-green-500" :
          toast.type === "error" ? "bg-red-500" :
          toast.type === "warning" ? "bg-yellow-500" : "bg-gray-900"
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
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

// Enhanced Card Component
const ServiceCard = ({ item, onBook, onViewDetails, isWishlisted, onToggleWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-semibold text-gray-900">{rating}</span>
    </div>
  );

  const renderDeliveryInfo = () => {
    if (item.deliveryTime) {
      return (
        <div className="flex items-center gap-1 text-gray-600 text-sm">
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
      <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
      {item.originalPrice && (
        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
      )}
      {item.originalPrice && (
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
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
          <span key={index} className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const renderSocialProof = () => {
    if (item.bookedToday > 5) {
      return (
        <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit">
          <Zap className="w-3 h-3" />
          <span>🔥 {item.bookedToday} booked today</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-gray-200 group cursor-pointer"
      onClick={() => onViewDetails(item)} // Make the whole card clickable for details
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
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Featured
            </span>
          )}
          {item.trendingScore > 90 && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
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
            <BookmarkCheck className="w-4 h-4 text-red-500 fill-current" />
          ) : (
            <Bookmark className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Vendor Info */}
        {item.vendor && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{item.vendor.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.vendor.rating}</span>
                  {item.vendor.verified && <Shield className="w-3 h-3 text-blue-400" />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight flex-1 pr-2">{item.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
            {renderStars(item.rating)}
          </div>
        </div>

        {/* Category and Specialization */}
        <div className="text-gray-600 text-sm mb-2">
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
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {renderPrice()}
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium hidden sm:block"
            >
              View
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onBook(item);
              }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 text-sm font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Offers */}
        {item.offers && item.offers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span className="font-medium">{item.offers[0]}</span>
              {item.offers.length > 1 && (
                <span className="text-gray-500">+{item.offers.length - 1} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Section Component
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
        {isFilterActive() && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(filtersList).map(([section, options]) => (
          <div key={section} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <button 
              onClick={() => toggleSection(section)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-medium text-gray-900 capitalize">
                {section === 'sort' ? 'Sort By' : section}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === section ? 'rotate-180' : ''}`} />
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
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                    ) : (
                      <input
                        type="radio"
                        name={section}
                        value={option.id}
                        checked={filters[section] === option.id}
                        onChange={(e) => onFilterChange(section, e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    )}
                    <span className="text-gray-700">{option.label}</span>
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

// Trending Section Component
const TrendingSection = ({ items, onBook, onViewDetails, onToggleWishlist, wishlist }) => {
  const trendingItems = useMemo(() => {
    return items
      .filter(item => item.trendingScore >= 90)
      .slice(0, 3);
  }, [items]);

  if (trendingItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 mb-8 border border-orange-100">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-900">🔥 Trending Now</h3>
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold hidden sm:inline-block">
          Hot
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingItems.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  #{index + 1}
                </span>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  {item.trendingScore}% trending
                </span>
              </div>
              <button
                onClick={() => onToggleWishlist(item.id)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label={wishlist.has(item.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlist.has(item.id) ? (
                  <BookmarkCheck className="w-4 h-4 text-red-500 fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span>{item.category}</span>
              <span>•</span>
              <span>{item.deliveryTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                )}
              </div>
            </div>
            {item.bookedToday > 0 && (
              <div className="mt-2 text-xs text-orange-600">
                {item.bookedToday} people booked today
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Recommended Section Component
const RecommendedSection = ({ items, onBook, onViewDetails, onToggleWishlist, wishlist }) => {
  const recommendedItems = useMemo(() => {
    // Mix of featured, high-rated, and trending items
    return items
      .filter(item => item.featured || item.rating >= 4.5 || item.trendingScore >= 85)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, [items]);

  if (recommendedItems.length === 0) return null;

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Recommended For You
        </h3>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
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

// Quick Booking Modal
const QuickBookModal = ({ item, isOpen, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
      setSelectedTime('10:00 AM');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md animate-in slide-in-from-bottom sm:slide-in-from-top-10 duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Quick Book</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 border rounded-lg text-sm ${
                      selectedTime === slot 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
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
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};


// =================================================================
// 3. Main Component: ZomatoStyleSearchPage
// =================================================================

export default function ZomatoStyleSearchPage() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [quickBookItem, setQuickBookItem] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast system (kept here as it manages the local UI state of toasts)
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // Use the custom hook for all core logic
  const {
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
    displayedItems,
    loadMoreRef,
    startVoiceSearch,
    saveToHistory,
    toggleWishlist,
    detectLocation,
    allItemCount,
  } = useSanskaraaSearch(showToast); 

  // Handlers (remain in the component for presentation/modals)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Online Status */}
          {!isOnline && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 text-sm">You're offline. Some features may be limited.</span>
            </div>
          )}

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Sanskaraa</span>
            </div>
            
            {/* Location & Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-gray-900 max-w-[120px] sm:max-w-xs"
                aria-label="Change location"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{location}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="User profile">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-xl shadow-md border border-gray-200 px-4 py-2 sm:py-3 hover:border-gray-300 transition-colors">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Search for puja, pandits, kits, decorations..."
                className="flex-1 outline-none text-gray-900 placeholder-gray-500 text-base sm:text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveToHistory(query)}
                aria-label="Search services"
              />
              <div className="flex items-center gap-2 ml-2">
                {isListening ? (
                  <div className="animate-pulse text-red-500 flex items-center gap-1 sm:gap-2">
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-xs sm:text-sm">Listening...</span>
                  </div>
                ) : (
                  <button
                    onClick={startVoiceSearch}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition"
                    title="Voice Search"
                    aria-label="Start voice search"
                  >
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-gray-500 flex items-center gap-1 flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
                Popular:
              </span>
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    saveToHistory(tag);
                  }}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors border border-transparent hover:border-gray-300 flex-shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Suggestions (conditional rendering based on query) */}
            {query && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-30 border border-gray-200">
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
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{term}</span>
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
        {/* Category Tabs - Scrollable for mobile */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Services Tab */}
          <button
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === "all" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
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
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
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
          {/* Filters Sidebar (Hidden on small screens) */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSection 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Results</span>
                  <span className="font-semibold">{filteredItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Filters</span>
                  <span className="font-semibold">
                    {Object.values(filters).filter(f => 
                      Array.isArray(f) ? f.length > 0 : f !== null && f !== '' && f !== 'rating'
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>In Wishlist</span>
                  <span className="font-semibold">{wishlist.size}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {activeCategory === "all" ? "All Services" : categories.find(c => c.key === activeCategory)?.label}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {filteredItems.length} services found {query && `for "${query}"`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 text-sm font-medium"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {/* Sort Info */}
                <div className="text-sm text-gray-600 hidden sm:block">
                  Sorted by: <span className="font-semibold">
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
                
                {/* Load More Trigger (visible only when there are more items to load) */}
                {filteredItems.length > displayedItems.length && (
                  <div ref={loadMoreRef} className="flex justify-center mt-8">
                    <div className={`text-gray-500 flex items-center gap-2 ${loading ? 'animate-pulse' : ''}`}>
                      <Loader className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Loading more services...' : 'Scroll down to load more'}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Recommendations Section */}
            <RecommendedSection 
              items={filteredItems}
              onBook={handleBook}
              onViewDetails={handleViewDetails}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[8000] lg:hidden animate-in fade-in" onClick={() => setShowFilters(false)}>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                  <X className="w-6 h-6" />
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
            <div className="p-4 sticky bottom-0 bg-white shadow-lg border-t border-gray-200">
                <button
                    onClick={() => setShowFilters(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 font-semibold"
                >
                    Show {filteredItems.length} Results
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[8000] flex items-center justify-center p-4" onClick={() => setShowLocationModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md animate-in slide-in-from-bottom sm:slide-in-from-top-10 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-lg">Choose Location</h3>
            </div>
            <div className="p-6">
              <input
                type="text"
                placeholder="Enter your location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4 focus:ring-blue-500 focus:border-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="space-y-2 mb-4">
                <button
                  onClick={detectLocation}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 rounded-lg border border-gray-200 text-left"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <Navigation className="w-5 h-5 text-blue-500" />
                  )}
                  <span>Use Current Location</span>
                </button>
                {["Connaught Place, Delhi", "Karol Bagh, Delhi", "Noida", "Gurgaon"].map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationModal(false);
                      showToast(`Location set to ${loc}`, "info");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold"
              >
                Confirm Location
              </button>
            </div>
          </div>
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