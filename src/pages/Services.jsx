import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Calendar, User, Package, Flower2, BookOpen, Star,
  MapPin, Filter, X, Clock, Mic, Loader, ChevronDown, Eye,
  Heart, Share, Phone, MessageCircle, Bookmark, BookmarkCheck,
  TrendingUp, Zap, Crown, ThumbsUp, Gift, Sparkles, Play,
  ChevronLeft, ChevronRight, Plus, Minus, CheckCircle,
  Award, Users, Camera, Tent, Building2, Lightbulb, Utensils
} from "lucide-react";

// --------------------------- Mock data ---------------------------
const servicesData = {
  decorations: [
    {
      id: 1,
      name: "Traditional Mandap Decoration",
      img: "src/assets/images/decor2.png",
      rating: 4.7,
      price: 25000,
      reviews: 128,
      category: "Mandap",
      location: "Delhi",
      discount: 15,
      trending: true,
      tags: ["Popular", "Trending"],
      vendors: [
        { id: "d1", name: "Royal Decor Co.", rating: 4.8, available: true, responseTime: "15 min", completedEvents: 245 },
        { id: "d2", name: "Floral Fantasy", rating: 4.6, available: false, responseTime: "30 min", completedEvents: 189 },
      ],
      customization: [
        { id: "theme", name: "Theme", options: ["Traditional", "Modern", "Vintage", "Bohemian"], default: "Traditional" },
        { id: "flowers", name: "Flower Type", options: ["Roses", "Marigolds", "Orchids", "Mixed"], default: "Mixed" }
      ]
    },
    {
      id: 2,
      name: "Floral Stage Decoration",
      img: "src/assets/images/decor3.png",
      rating: 4.5,
      price: 18000,
      reviews: 89,
      category: "Floral",
      location: "Mumbai",
      trending: true
    },
  ],
  lighting: [
    {
      id: 3,
      name: "LED Wedding Lighting",
      img: "src/assets/images/ganesh puja 1.jpeg",
      rating: 4.6,
      price: 12000,
      reviews: 67,
      category: "LED",
      location: "Bangalore",
      discount: 10
    },
  ],
  catering: [
    {
      id: 4,
      name: "Premium Vegetarian Catering",
      img: "src/assets/images/catering1.jpg",
      rating: 4.8,
      price: 499,
      unit: "/plate",
      reviews: 245,
      category: "Vegetarian",
      location: "Delhi",
      tags: ["Best Value"],
      vendors: [
        { id: "c1", name: "Sharma Caterers", rating: 4.8, available: true, responseTime: "10 min", completedEvents: 421 },
        { id: "c2", name: "Gupta Caterers", rating: 4.6, available: true, responseTime: "15 min", completedEvents: 356 },
      ]
    },
  ],
  tents: [
    {
      id: 5,
      name: "Premium Wedding Tent",
      img: "src/assets/images/grrih prews 1.png",
      rating: 4.4,
      price: 35000,
      reviews: 72,
      category: "Premium",
      location: "Pune"
    },
  ],
  venues: [
    {
      id: 6,
      name: "Luxury Wedding Hall",
      img: "src/assets/images/havan.jpg",
      rating: 4.9,
      price: 150000,
      reviews: 156,
      category: "Luxury",
      location: "Delhi",
      trending: true
    },
  ]
};

const categories = [
  { key: "all", label: "All Services", icon: Sparkles, color: "from-blue-500 to-blue-600" },
  { key: "decorations", label: "Decorations", icon: Flower2, color: "from-green-500 to-green-600" },
  { key: "lighting", label: "Lighting", icon: Lightbulb, color: "from-purple-500 to-purple-600" },
  { key: "catering", label: "Catering", icon: Utensils, color: "from-orange-500 to-orange-600" },
  { key: "tents", label: "Tents", icon: Tent, color: "from-pink-500 to-pink-600" },
  { key: "venues", label: "Venues", icon: Building2, color: "from-red-500 to-red-600" },
];

// --------------------------- Small components ---------------------------

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse mt-10">
    <div className="w-full h-48 bg-amber-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-amber-200 rounded w-3/4"></div>
      <div className="h-3 bg-amber-200 rounded w-1/2"></div>
      <div className="h-3 bg-amber-200 rounded w-1/4"></div>
      <div className="h-10 bg-amber-200 rounded-xl"></div>
    </div>
  </div>
);

const ServiceCard = ({ service, category, onBook, onViewDetails, onToggleWishlist, isWishlisted }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = () => {
    switch(category) {
      case "decorations": return Flower2;
      case "lighting": return Lightbulb;
      case "catering": return Utensils;
      case "tents": return Tent;
      case "venues": return Building2;
      default: return Sparkles;
    }
  };

  const Icon = getCategoryIcon();

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                ? "fill-amber-200 text-amber-400"
                : "text-amber-200"
            }`}
          />
        ))}
        <span className="text-sm text-amber-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {!imageLoaded && <div className="w-full h-48 bg-amber-100 animate-pulse"></div>}
        <img
          src={service.img}
          alt={service.name}
          className={`w-full h-48 object-cover ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2 ">
          <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Icon className="w-3 h-3" />
            {category}
          </span>
          {service.discount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {service.discount}% OFF
            </span>
          )}
          {service.trending && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        <button
          onClick={() => onToggleWishlist(service.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg transition-all duration-200"
        >
          {isWishlisted ? (
            <BookmarkCheck className="w-5 h-5 text-amber-600" fill="currentColor" />
          ) : (
            <Bookmark className="w-5 h-5 text-amber-600" />
          )}
        </button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails(service)}
                className="px-4 py-2 bg-white text-amber-800 rounded-full font-medium hover:bg-amber-50 transition-colors"
              >
                Quick View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBook(service)}
                className="px-4 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors"
              >
                Book Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-amber-900 text-lg line-clamp-2 flex-1">{service.name}</h3>
          <button
            onClick={() => onToggleWishlist(service.id)}
            className="p-1 hover:bg-amber-100 rounded-full transition-colors ml-2"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-amber-400"}`} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          {renderStars(service.rating)}
          <span className="text-amber-600 text-sm">({service.reviews} reviews)</span>
        </div>

        {service.location && (
          <div className="flex items-center gap-1 text-amber-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{service.location}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-amber-800">₹{service.price.toLocaleString()}</span>
            {service.unit && <span className="text-amber-600 text-sm ml-1">{service.unit}</span>}
            {service.discount && (
              <span className="text-red-500 text-sm ml-2 line-through">
                ₹{Math.round(service.price / (1 - service.discount/100)).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(service)}
            className="flex-1 px-4 py-2 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors font-medium"
          >
            Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBook(service)}
            className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
          >
            Book Now
          </motion.button>
        </div>

        {service.vendors && (
          <div className="mt-3 pt-3 border-t border-amber-100">
            <div className="text-xs text-amber-600 mb-2">Available Vendors:</div>
            <div className="flex gap-2 overflow-x-auto">
              {service.vendors.slice(0, 2).map(vendor => (
                <div key={vendor.id} className="flex items-center gap-2 bg-amber-50 px-2 py-1 rounded-lg min-w-max">
                  <div className={`w-2 h-2 rounded-full ${vendor.available ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-xs font-medium text-amber-800">{vendor.name}</span>
                  <span className="text-xs text-amber-600">{vendor.rating}★</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --------------------------- Hero Banner ---------------------------
const HeroBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Wedding Season Special",
      subtitle: "Get 20% off on all wedding services",
      image: "/images/wedding-banner.jpg",
      color: "from-amber-400 to-orange-500",
      buttonText: "Book Now"
    },
    {
      id: 2,
      title: "Premium Catering Services",
      subtitle: "Delicious vegetarian meals for your events",
      image: "/images/catering-banner.jpg",
      color: "from-green-400 to-emerald-500",
      buttonText: "Explore Catering"
    },
    {
      id: 3,
      title: "Luxury Venues",
      subtitle: "Find the perfect venue for your special day",
      image: "/images/venue-banner.jpg",
      color: "from-purple-400 to-pink-500",
      buttonText: "View Venues"
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} bg-opacity-80`}></div>
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            >
              {banner.title}
            </motion.h2>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl opacity-90 mb-6"
            >
              {banner.subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 py-3 bg-white text-amber-800 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-lg"
            >
              {banner.buttonText}
            </motion.button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentBanner ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  );
};

// --------------------------- Main Page ---------------------------
export default function EnhancedServicesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 500000,
    location: "",
    vendorRating: 0,
    availability: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCounts, setVisibleCounts] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const savedHistory = localStorage.getItem('servicesSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        setSearchHistory([]);
      }
    }
  }, []);

  const saveToHistory = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setSearchHistory(prev => {
      const updatedHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5);
      localStorage.setItem('servicesSearchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      const sampleQueries = ["Wedding decoration", "Catering services", "Venue booking", "Lighting solutions"];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setQuery(randomQuery);
      setIsListening(false);
      saveToHistory(randomQuery);
    }, 1200);
  };

  const allServices = useMemo(() => {
    return Object.entries(servicesData).flatMap(([category, services]) =>
      services.map(service => ({ ...service, serviceCategory: category }))
    );
  }, []);

  const filteredResults = useMemo(() => {
    let results = allServices.filter(service => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || service.name.toLowerCase().includes(q) ||
                          (service.category && service.category.toLowerCase().includes(q)) ||
                          (service.serviceCategory && service.serviceCategory.toLowerCase().includes(q));

      const matchesCategory = activeCategory === "all" || activeCategory === service.serviceCategory;
      const matchesRating = (service.rating || 0) >= (filters.minRating || 0);
      const matchesPrice = (service.price || 0) <= (filters.maxPrice || Infinity);
      const matchesLocation = !filters.location || (service.location && service.location.toLowerCase().includes(filters.location.toLowerCase()));

      const matchesAvailability = filters.availability === "all" ||
                                   (filters.availability === "available" && service.vendors?.some(v => v.available)) ||
                                   (filters.availability === "trending" && service.trending);

      return matchesQuery && matchesCategory && matchesRating && matchesPrice && matchesLocation && matchesAvailability;
    });

    switch(sortBy) {
      case "price-low":
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popularity":
        results.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return results;
  }, [allServices, query, activeCategory, filters, sortBy]);

  const categorizedResults = useMemo(() => {
    const grouped = {};
    filteredResults.forEach(service => {
      const cat = service.serviceCategory;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(service);
    });
    return grouped;
  }, [filteredResults]);

  const handleBook = (service) => {
    showToast(`Starting booking process for ${service.name}`);
    // TODO: navigate to booking page or open booking modal
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== service.id);
      return [service, ...filtered].slice(0, 8);
    });
  };

  const toggleWishlist = (serviceId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(serviceId)) {
        newWishlist.delete(serviceId);
        showToast("Removed from wishlist");
      } else {
        newWishlist.add(serviceId);
        showToast("Added to wishlist");
      }
      return newWishlist;
    });
  };

  const resetFilters = () => {
    setFilters({
      minRating: 0,
      maxPrice: 500000,
      location: "",
      vendorRating: 0,
      availability: "all"
    });
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-amber-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 mt-16">
      <div className="bg-white shadow-sm sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto p-4">
          <div className="relative mb-4">
            <div className="flex items-center bg-white rounded-2xl shadow-lg px-4 py-3 border border-amber-200">
              <Search className="text-amber-600 w-5 h-5 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for wedding services, catering, venues..."
                className="w-full outline-none text-amber-800 placeholder-amber-500 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveToHistory(query)}
              />
              <div className="flex items-center space-x-2 ml-2">
                {isListening ? (
                  <div className="animate-pulse text-amber-600">
                    <Loader className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <button
                    onClick={startVoiceSearch}
                    className="p-2 hover:bg-amber-100 rounded-full transition"
                    title="Voice Search"
                  >
                    <Mic className="w-5 h-5 text-amber-600" />
                  </button>
                )}
              </div>
            </div>

            {query && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10">
                <div className="bg-white shadow-lg rounded-2xl mt-3 border border-amber-200">
                  <div className="p-2">
                    <div className="flex items-center justify-between px-2 py-1 text-sm text-amber-600 border-b">
                      <span>Recent Searches</span>
                      <Clock className="w-4 h-4" />
                    </div>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-amber-50 rounded-lg flex items-center space-x-2"
                        onClick={() => {
                          setQuery(term);
                          saveToHistory(term);
                        }}
                      >
                        <Search className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-800">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide mt-8">
            {categories.map(({ key, label, icon: Icon, color }) => (
              <button
                key={key}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                    : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
                }`}
                onClick={() => setActiveCategory(key)}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 mt-8">
        <HeroBanner />

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl shadow-lg border border-amber-200 hover:bg-amber-50 transition"
          >
            <Filter className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-amber-800">Filters</span>
            {Object.values(filters).some(val =>
              val !== 0 && val !== "" && val !== 500000 && val !== "all"
            ) && (
              <span className="bg-amber-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-amber-600">
              {filteredResults.length} services found
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-amber-200 bg-white text-amber-800 text-sm"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-amber-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-amber-800">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                Reset All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-amber-600">{filters.minRating}+</span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters(f => ({ ...f, minRating: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Max Price: ₹{filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(f => ({ ...f, maxPrice: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(f => ({ ...f, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-800"
                >
                  <option value="all">All Services</option>
                  <option value="available">Available Now</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <>
              {activeCategory === "all" ? (
                Object.entries(categorizedResults).map(([category, services]) => (
                  services.length > 0 && (
                    <div key={category} className="fade-in">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-amber-800 capitalize">
                          {category} Services
                        </h2>
                        <span className="text-amber-600 text-sm">
                          {services.length} services
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.slice(0, visibleCounts[category] || 4).map((service) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            category={category}
                            onBook={handleBook}
                            onViewDetails={handleViewDetails}
                            onToggleWishlist={toggleWishlist}
                            isWishlisted={wishlist.has(service.id)}
                          />
                        ))}
                      </div>
                      {services.length > (visibleCounts[category] || 4) && (
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={() => setVisibleCounts(prev => ({
                              ...prev,
                              [category]: (prev[category] || 4) + 4
                            }))}
                            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                          >
                            Load More {category} Services
                          </button>
                        </div>
                      )}
                    </div>
                  )
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResults.slice(0, visibleCounts[activeCategory] || 12).map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      category={activeCategory}
                      onBook={handleBook}
                      onViewDetails={handleViewDetails}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.has(service.id)}
                    />
                  ))}
                </div>
              )}

              {activeCategory !== "all" && filteredResults.length > (visibleCounts[activeCategory] || 12) && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setVisibleCounts(prev => ({
                      ...prev,
                      [activeCategory]: (prev[activeCategory] || 12) + 8
                    }))}
                    className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-semibold"
                  >
                    Load More Services
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-amber-700 mb-2">No services found</h3>
              <p className="text-amber-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>

        {recentlyViewed.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-amber-800 mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5" /> Recently Viewed Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  category={service.serviceCategory}
                  onBook={handleBook}
                  onViewDetails={handleViewDetails}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.has(service.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {showDetailModal && selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setShowDetailModal(false)}
            onBook={handleBook}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.has(selectedService.id)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

// --------------------------- Service Detail Modal (keeps inside same file) ---------------------------
function ServiceDetailModal({ service, onClose, onBook, onToggleWishlist, isWishlisted }) {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={service.img}
            alt={service.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition"
          >
            <X className="w-5 h-5 text-amber-800" />
          </button>
          <button
            onClick={() => onToggleWishlist(service.id)}
            className="absolute top-4 left-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition"
          >
            {isWishlisted ? (
              <BookmarkCheck className="w-5 h-5 text-red-500" fill="currentColor" />
            ) : (
              <Bookmark className="w-5 h-5 text-amber-600" />
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-amber-900">{service.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-amber-800">{service.rating}</span>
                </div>
                <span className="text-amber-600">({service.reviews} reviews)</span>
                <span className="text-amber-600">•</span>
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="text-amber-600">{service.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-800">₹{service.price.toLocaleString()}</div>
              {service.unit && <div className="text-amber-600">{service.unit}</div>}
            </div>
          </div>

          <div className="border-b border-amber-200 mb-4">
            <div className="flex space-x-4">
              {["details", "vendors", "reviews"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 font-medium capitalize ${
                    activeTab === tab
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-amber-400 hover:text-amber-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            {activeTab === "details" && (
              <div className="space-y-4">
                <p className="text-amber-700">{service.description || "Premium service with excellent quality and customer satisfaction."}</p>
                {service.customization && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Customization Options</h4>
                    <div className="space-y-2">
                      {service.customization.map(option => (
                        <div key={option.id} className="flex items-center justify-between">
                          <span className="text-amber-600">{option.name}</span>
                          <span className="text-amber-800 font-medium">{option.options.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "vendors" && service.vendors && (
              <div className="space-y-4">
                {service.vendors.map(vendor => (
                  <div key={vendor.id} className="p-4 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-amber-800">{vendor.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-amber-600">
                      <span>Response time: {vendor.responseTime}</span>
                      <span>{vendor.completedEvents} events completed</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600">
                        Contact
                      </button>
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="px-3 py-1 border border-amber-300 text-amber-700 rounded-lg text-sm hover:bg-amber-50"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <p className="text-amber-600">Customer reviews will be displayed here.</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onBook(service)}
              className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-semibold"
            >
              Book Now
            </button>
            <button className="px-6 py-3 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
