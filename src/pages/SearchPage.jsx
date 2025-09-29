import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

// Toast Container Component
const ToastContainer = ({ toasts }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 animate-in slide-in-from-right ${
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
const ServiceCard = ({ item, category, onBook, onViewDetails, isWishlisted, onToggleWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const renderSocialProof = () => {
    if (item.bookedToday > 5) {
      return (
        <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
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
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
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
          {item.trendingScore > 90 && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
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

        {/* Social Proof */}
        {item.bookedToday > 5 && (
          <div className="absolute bottom-3 left-3 right-3">
            {renderSocialProof()}
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
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium"
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
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isFilterActive = () => {
    return Object.values(filters).some(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter !== null && filter !== '' && filter !== 'rating'
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
        {Object.entries(filtersList).map(([section, options]) => (
          <div key={section}>
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
              <div className="mt-2 space-y-2">
                {options.map(option => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    {section === 'features' ? (
                      <input
                        type="checkbox"
                        checked={filters[section]?.includes(option.id) || false}
                        onChange={(e) => {
                          const newFeatures = e.target.checked
                            ? [...(filters[section] || []), option.id]
                            : (filters[section] || []).filter(f => f !== option.id);
                          onFilterChange(section, newFeatures);
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
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8 border border-orange-100">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-900">🔥 Trending Now</h3>
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
              <button 
                onClick={() => onBook(item)}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600"
              >
                Book
              </button>
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
    <div className="mt-12">
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
            category={item.category}
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

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
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
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 border rounded-lg text-sm ${
                      selectedTime === slot 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
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

// Main Component
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
  const [location, setLocation] = useState("Detecting location...");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(9);
  const [quickBookItem, setQuickBookItem] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const loadMoreRef = useRef(null);

  // Combined all items
  const allItems = useMemo(() => {
    return Object.entries(data).flatMap(([category, items]) =>
      items.map(item => ({ ...item, category, type: category }))
    );
  }, []);

  // Filter and sort items - MOVED BEFORE useEffect THAT USES IT
  const filteredItems = useMemo(() => {
    let results = allItems.filter(item => {
      // Category filter
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      
      // Search query
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
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
        if (filters.features.includes('trending') && item.trendingScore < 85) matchesFeatures = false;
        if (filters.features.includes('fast_delivery')) {
          const deliveryTime = parseInt(item.deliveryTime);
          if (isNaN(deliveryTime) || deliveryTime > 60) matchesFeatures = false;
        }
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
        results.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime) || 999;
          const bTime = parseInt(b.deliveryTime) || 999;
          return aTime - bTime;
        });
        break;
      case "distance":
        results.sort((a, b) => {
          const aDist = parseFloat(a.distance) || 999;
          const bDist = parseFloat(b.distance) || 999;
          return aDist - bDist;
        });
        break;
      case "trending":
        results.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
        break;
    }

    return results;
  }, [allItems, query, activeCategory, filters]);

  const displayedItems = filteredItems.slice(0, visibleItems);

  // Toast system
  const showToast = (message, type = "info") => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast("You're back online!", "success");
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      showToast("You're offline. Some features may not work.", "warning");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load search history and wishlist from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedWishlist) setWishlist(new Set(JSON.parse(savedWishlist)));
    
    // Auto-detect location
    detectLocation();
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  // Infinite scroll - FIXED: Now filteredItems is defined before this useEffect
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

  // Save to search history
  const saveToHistory = (searchQuery) => {
    if (!searchQuery.trim()) return;
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Real Web Speech API for voice search
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast("Voice search not supported in this browser", "error");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US,hi-IN'; // English and Hindi support

    setIsListening(true);
    setLoading(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      saveToHistory(transcript);
      setIsListening(false);
      setLoading(false);
      showToast(`Searching for: ${transcript}`, "success");
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setLoading(false);
      showToast("Voice search failed. Please try again.", "error");
    };

    recognition.onend = () => {
      setIsListening(false);
      setLoading(false);
    };

    recognition.start();
  };

  // Enhanced Geolocation
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Location access not supported");
      return;
    }

    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using a free geocoding service
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocation(data.city || data.locality || "Your Location");
          showToast("Location detected successfully!", "success");
        } catch (error) {
          setLocation("Connaught Place, Delhi"); // Fallback
          showToast("Using default location", "info");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLocation("Connaught Place, Delhi"); // Fallback
        setLoading(false);
        showToast("Location access denied. Using default.", "warning");
      },
      { timeout: 10000 }
    );
  };

  // Handlers
  const handleBook = (item) => {
    setQuickBookItem(item);
  };

  const handleQuickBookConfirm = (item, date, time) => {
    showToast(`Booking confirmed for ${item.name} on ${date} at ${time}`, "success");
    // Here you would typically make an API call to confirm the booking
  };

  const handleViewDetails = (item) => {
    showToast(`Viewing details for ${item.name}`, "info");
    // Navigate to detail page or open detail modal
  };

  const toggleWishlist = (itemId) => {
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
    showToast("Filters cleared", "info");
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
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 mt-8 ">
          {/* Online Status */}
          {!isOnline && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 text-sm">You're offline. Some features may be limited.</span>
            </div>
          )}

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 mt-8">
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
                <span className="text-sm font-medium max-w-32 truncate">{location}</span>
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
                  <div className="animate-pulse text-red-500 flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Listening...</span>
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

            {/* Auto-complete Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-gray-500 flex items-center gap-1">
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
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors border border-transparent hover:border-gray-300"
                >
                  {tag}
                </button>
              ))}
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
              onClick={() => navigateCategory(key)}
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

            {/* Trending Section */}
            <TrendingSection 
              items={allItems}
              onBook={handleBook}
              onViewDetails={handleViewDetails}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />

            {/* Services Grid */}
            {loading ? (
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
                      category={item.category}
                      onBook={handleBook}
                      onViewDetails={handleViewDetails}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.has(item.id)}
                    />
                  ))}
                </div>
                
                {/* Load More Trigger */}
                {visibleItems < filteredItems.length && (
                  <div ref={loadMoreRef} className="flex justify-center mt-8">
                    <div className="animate-pulse text-gray-500 flex items-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      Loading more services...
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
              items={allItems}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-lg">Choose Location</h3>
            </div>
            <div className="p-6">
              <input
                type="text"
                placeholder="Enter your location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="space-y-2 mb-4">
                <button
                  onClick={detectLocation}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  <Navigation className="w-5 h-5 text-blue-500" />
                  <span>Use Current Location</span>
                </button>
                {["Connaught Place, Delhi", "Karol Bagh, Delhi", "Noida", "Gurgaon"].map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationModal(false);
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