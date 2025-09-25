import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Star, MapPin, Filter, ChevronDown, Clock, 
  Heart, Share, Phone, Calendar, User, Package, 
  Flower2, BookOpen, ChevronRight, Sparkles, Zap,
  Crown, Award, Truck, Shield, CheckCircle, X,
  Mic, Loader, ArrowRight, Bookmark, BookmarkCheck
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
      tags: ["Popular", "Bestseller"],
      deliveryTime: "Within 24 hours",
      distance: "2.5 km",
      offers: ["10% off on first booking", "Free consultation"],
      featured: true,
      reviews: 124,
      vendor: {
        name: "Vedic Traditions",
        rating: 4.7,
        verified: true
      }
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
      tags: ["Trending"],
      deliveryTime: "Same day",
      distance: "1.8 km",
      offers: ["Free prasad"],
      featured: true
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
      tags: ["Expert", "Verified"],
      responseTime: "15 min",
      languages: ["Hindi", "Sanskrit", "English"],
      availability: "Available Today",
      distance: "3.2 km",
      featured: true,
      vendor: {
        name: "Sharma Pandit Services",
        rating: 4.9,
        verified: true
      }
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
      responseTime: "20 min"
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
      tags: ["Complete Kit", "Bestseller"],
      deliveryTime: "30 minutes",
      distance: "1.5 km",
      offers: ["Free delivery", "Extra items included"],
      featured: true
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
      deliveryTime: "45 minutes"
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
      featured: true
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
      deliveryTime: "1 day advance"
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
    { id: "distance", label: "Distance: Near to Far" }
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
    { id: "popular", label: "Popular" }
  ]
};

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

// Enhanced Card Component
const ServiceCard = ({ item, category, onBook, onViewDetails, isWishlisted, onToggleWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold text-gray-900">{rating}</span>
      </div>
    );
  };

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

  const renderPrice = () => {
    return (
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
  };

  const renderTags = () => {
    if (!item.tags) return null;
    return (
      <div className="flex gap-1 flex-wrap">
        {item.tags.map((tag, index) => (
          <span key={index} className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-gray-200 group">
      <div className="relative">
        {/* Image */}
        {!imageLoaded && <div className="h-48 bg-gray-100 rounded-t-2xl animate-pulse"></div>}
        <img 
          src={item.img} 
          alt={item.name}
          className={`h-48 w-full object-cover rounded-t-2xl ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.featured && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Featured
            </span>
          )}
          {item.offers && item.offers.length > 0 && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {item.offers.length} Offers
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(item.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
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

        {/* Tags */}
        {renderTags()}

        {/* Delivery Info */}
        {renderDeliveryInfo()}

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-3">
          {renderPrice()}
          <div className="flex gap-2">
            <button 
              onClick={() => onViewDetails(item)}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium"
            >
              View
            </button>
            <button 
              onClick={() => onBook(item)}
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
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isFilterActive = () => {
    return Object.values(filters).some(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter !== null && filter !== ''
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
        {/* Sort By */}
        <div>
          <button 
            onClick={() => toggleSection('sort')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Sort By</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'sort' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'sort' && (
            <div className="mt-2 space-y-2">
              {filtersList.sort.map(option => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.id}
                    checked={filters.sort === option.id}
                    onChange={(e) => onFilterChange('sort', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <button 
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Rating</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'rating' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'rating' && (
            <div className="mt-2 space-y-2">
              {filtersList.rating.map(option => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={option.id}
                    checked={filters.rating === option.id}
                    onChange={(e) => onFilterChange('rating', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button 
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Price Range</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'price' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'price' && (
            <div className="mt-2 space-y-2">
              {filtersList.price.map(option => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value={option.id}
                    checked={filters.price === option.id}
                    onChange={(e) => onFilterChange('price', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <button 
            onClick={() => toggleSection('features')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Features</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'features' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'features' && (
            <div className="mt-2 space-y-2">
              {filtersList.features.map(option => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.features?.includes(option.id) || false}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...(filters.features || []), option.id]
                        : (filters.features || []).filter(f => f !== option.id);
                      onFilterChange('features', newFeatures);
                    }}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ZomatoStyleSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    sort: "rating",
    rating: null,
    price: null,
    features: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [location, setLocation] = useState("Connaught Place, Delhi");
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Load search history
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save to search history
  const saveToHistory = (searchQuery) => {
    if (!searchQuery.trim()) return;
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Voice search simulation
  const startVoiceSearch = () => {
    setIsListening(true);
    setLoading(true);
    setTimeout(() => {
      const sampleQueries = ["Wedding pandits", "Puja kits", "Event decoration", "Griha pravesh"];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setQuery(randomQuery);
      setIsListening(false);
      setLoading(false);
      saveToHistory(randomQuery);
    }, 2000);
  };

  // Combined all items
  const allItems = useMemo(() => {
    return Object.entries(data).flatMap(([category, items]) =>
      items.map(item => ({ ...item, category, type: category }))
    );
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let results = allItems.filter(item => {
      // Category filter
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      
      // Search query
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                          item.category?.toLowerCase().includes(query.toLowerCase()) ||
                          item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      // Rating filter
      const matchesRating = !filters.rating || item.rating >= parseFloat(filters.rating);
      
      // Price filter
      let matchesPrice = true;
      if (filters.price) {
        const [min, max] = filters.price.split('-').map(p => p === '+' ? Infinity : parseInt(p));
        matchesPrice = item.price >= min && (max ? item.price <= max : true);
      }
      
      // Features filter
      let matchesFeatures = true;
      if (filters.features.length > 0) {
        if (filters.features.includes('verified') && !item.vendor?.verified) matchesFeatures = false;
        if (filters.features.includes('discount') && !item.originalPrice) matchesFeatures = false;
        if (filters.features.includes('popular') && !item.tags?.includes('Popular')) matchesFeatures = false;
      }

      return matchesCategory && matchesQuery && matchesRating && matchesPrice && matchesFeatures;
    });

    // Apply sorting
    switch(filters.sort) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "delivery":
        // Sort by delivery time (simplified)
        results.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime) || 999;
          const bTime = parseInt(b.deliveryTime) || 999;
          return aTime - bTime;
        });
        break;
      case "distance":
        // Sort by distance (simplified)
        results.sort((a, b) => {
          const aDist = parseFloat(a.distance) || 999;
          const bDist = parseFloat(b.distance) || 999;
          return aDist - bDist;
        });
        break;
    }

    return results;
  }, [allItems, query, activeCategory, filters]);

  // Handlers
  const handleBook = (item) => {
    showToast(`Starting booking for ${item.name}`);
    // Navigate to booking page
  };

  const handleViewDetails = (item) => {
    showToast(`Viewing details for ${item.name}`);
    // Open detail modal or navigate to detail page
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
        showToast("Removed from wishlist");
      } else {
        newWishlist.add(itemId);
        showToast("Added to wishlist");
      }
      return newWishlist;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sort: "rating",
      rating: null,
      price: null,
      features: []
    });
  };

  const showToast = (message) => {
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const navigateCategory = (category) => {
    switch(category) {
      case "events": navigate("/EventsPage"); break;
      case "pandits": navigate("/PanditBooking"); break;
      case "kits": navigate("/pujakits"); break;
      case "decorations": navigate("/services"); break;
      case "bookings": navigate("/BookingsPage"); break;
      default: break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Sanskaraa</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{location}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 hover:border-gray-300 transition-colors">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Search for puja, pandits, kits, decorations..."
                className="flex-1 outline-none text-gray-900 placeholder-gray-500 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveToHistory(query)}
              />
              <div className="flex items-center gap-2 ml-2">
                {isListening ? (
                  <div className="animate-pulse text-red-500">
                    <Loader className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <button
                    onClick={startVoiceSearch}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                    title="Voice Search"
                  >
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Suggestions */}
            {query && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-10 border border-gray-200">
                <div className="p-2">
                  <div className="flex items-center justify-between px-2 py-1 text-sm text-gray-500">
                    <span>Recent searches</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  {searchHistory.map((term, index) => (
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeCategory === "all" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            <Sparkles className="w-4 h-4" />
            All Services
            <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs ml-1">
              {allItems.length}
            </span>
          </button>
          
          {categories.map(({ key, label, icon: Icon, color, count }) => (
            <button
              key={key}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
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
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
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
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === "all" ? "All Services" : categories.find(c => c.key === activeCategory)?.label}
                </h2>
                <p className="text-gray-600">
                  {filteredItems.length} services found {query && `for "${query}"`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <div className="text-sm text-gray-600">
                  Sorted by: <span className="font-semibold">
                    {filtersList.sort.find(s => s.id === filters.sort)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    category={item.category}
                    onBook={handleBook}
                    onViewDetails={handleViewDetails}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.has(item.id)}
                  />
                ))}
              </div>
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
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
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
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">Choose Location</h3>
            <input
              type="text"
              placeholder="Enter your location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="space-y-2">
              {["Connaught Place, Delhi", "Karol Bagh, Delhi", "Noida", "Gurgaon"].map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}