import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Calendar, User, Package, Flower2, BookOpen, Star,
  MapPin, Filter, X, Clock, Mic, Loader, ChevronDown, Eye,
  Heart, Share, Phone, MessageCircle, Bookmark, BookmarkCheck,
  TrendingUp, Zap, Crown, ThumbsUp, Gift, Sparkles, Play,
  ChevronLeft, ChevronRight, Plus, Minus, CheckCircle,
  Award, Users, Camera, Tent, Building2, Lightbulb, Utensils,
  Shield, PhoneCall, Video, Music, Car, Palette
} from "lucide-react";

// --------------------------- Mock data ---------------------------
const servicesData = {
  decorations: [
    {
      id: 1,
      name: "Traditional Mandap Decoration",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
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
      ],
      description: "Beautiful traditional mandap decoration with fresh flowers and traditional elements for your special day.",
      inclusions: ["Fresh Flower Decoration", "Traditional Fabric Draping", "Lighting Setup", "On-site Support"]
    },
    {
      id: 2,
      name: "Floral Stage Decoration",
      img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      rating: 4.5,
      price: 18000,
      reviews: 89,
      category: "Floral",
      location: "Mumbai",
      trending: true,
      description: "Elegant floral stage decoration perfect for weddings and corporate events.",
      inclusions: ["Fresh Flower Arrangements", "Stage Backdrop", "Floral Garlands", "Setup & Teardown"]
    },
  ],
  lighting: [
    {
      id: 3,
      name: "LED Wedding Lighting",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      rating: 4.6,
      price: 12000,
      reviews: 67,
      category: "LED",
      location: "Bangalore",
      discount: 10,
      description: "Professional LED lighting setup to create the perfect ambiance for your event.",
      inclusions: ["LED Spotlights", "Color Lighting", "DMX Control", "Technical Support"]
    },
  ],
  catering: [
    {
      id: 4,
      name: "Premium Vegetarian Catering",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
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
      ],
      description: "Delicious vegetarian catering with traditional and contemporary dishes for all your guests.",
      inclusions: ["5 Main Courses", "3 Appetizers", "Desserts", "Serving Staff", "Utensils"]
    },
  ],
  tents: [
    {
      id: 5,
      name: "Premium Wedding Tent",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      rating: 4.4,
      price: 35000,
      reviews: 72,
      category: "Premium",
      location: "Pune",
      description: "Spacious and elegant wedding tents with climate control and beautiful interiors.",
      inclusions: ["Weather-proof Tent", "AC Setup", "Flooring", "Lighting", "Setup & Removal"]
    },
  ],
  venues: [
    {
      id: 6,
      name: "Luxury Wedding Hall",
      img: "https://images.unsplash.com/photo-1519677100203-0f0c8da7f8c1?w=400&h=300&fit=crop",
      rating: 4.9,
      price: 150000,
      reviews: 156,
      category: "Luxury",
      location: "Delhi",
      trending: true,
      description: "Grand luxury wedding hall with modern amenities and traditional architecture.",
      inclusions: ["Main Hall", "Parking Space", "Dressing Rooms", "Basic Sound System", "Security"]
    },
  ],
  photography: [
    {
      id: 7,
      name: "Wedding Photography & Videography",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      rating: 4.8,
      price: 45000,
      reviews: 203,
      category: "Premium",
      location: "Mumbai",
      description: "Capture your special moments with our professional photography and videography team.",
      inclusions: ["8 Hours Coverage", "2 Photographers", "1 Videographer", "100+ Edited Photos", "5 Min Highlight Video"]
    },
  ],
  entertainment: [
    {
      id: 8,
      name: "Live DJ & Music",
      img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
      rating: 4.5,
      price: 25000,
      reviews: 89,
      category: "DJ",
      location: "Bangalore",
      description: "Professional DJ services with latest sound equipment and vast music library.",
      inclusions: ["5 Hours Performance", "Sound System", "Light Effects", "Music Requests", "MC Services"]
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
  { key: "photography", label: "Photography", icon: Camera, color: "from-indigo-500 to-indigo-600" },
  { key: "entertainment", label: "Entertainment", icon: Music, color: "from-teal-500 to-teal-600" },
];

const packagesData = [
  {
    id: 1,
    name: "Wedding Combo",
    services: ["Mandap Decoration", "Premium Catering", "Photography", "Lighting"],
    price: 89999,
    originalPrice: 104999,
    savings: 15000,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 2,
    name: "Grih Pravesh Combo",
    services: ["Puja Setup", "Decoration", "Catering", "Tent"],
    price: 45999,
    originalPrice: 54999,
    savings: 9000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    rating: 4.6,
    reviews: 45
  },
  {
    id: 3,
    name: "Festival Special",
    services: ["Decoration", "Lighting", "Sound System", "Catering"],
    price: 32999,
    originalPrice: 39999,
    savings: 7000,
    image: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400&h=250&fit=crop",
    rating: 4.7,
    reviews: 67
  }
];

// --------------------------- Small components ---------------------------

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
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
      case "photography": return Camera;
      case "entertainment": return Music;
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

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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

const PackageCard = ({ pkg, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Package Deal
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
          <Star className="w-3 h-3 fill-white" />
          <span>{pkg.rating}</span>
          <span>({pkg.reviews})</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-amber-900 text-lg mb-2">{pkg.name}</h3>
        
        <div className="space-y-2 mb-4">
          {pkg.services.map((service, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-amber-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {service}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-amber-800">₹{pkg.price.toLocaleString()}</span>
            <span className="text-red-500 text-sm ml-2 line-through">
              ₹{pkg.originalPrice.toLocaleString()}
            </span>
            <div className="text-green-600 text-sm font-medium">
              Save ₹{pkg.savings.toLocaleString()}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBook(pkg)}
          className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-colors font-semibold"
        >
          View Package Details
        </motion.button>
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
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=400&fit=crop",
      color: "from-amber-400 to-orange-500",
      buttonText: "Book Now"
    },
    {
      id: 2,
      title: "Premium Catering Services",
      subtitle: "Delicious vegetarian meals for your events",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=400&fit=crop",
      color: "from-green-400 to-emerald-500",
      buttonText: "Explore Catering"
    },
    {
      id: 3,
      title: "Luxury Venues",
      subtitle: "Find the perfect venue for your special day",
      image: "https://images.unsplash.com/photo-1519677100203-0f0c8da7f8c1?w=1200&h=400&fit=crop",
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

// --------------------------- Trust Badges ---------------------------
const TrustBadges = () => (
  <div className="flex flex-wrap gap-6 justify-center py-8 border-t border-amber-200 mt-12">
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <Shield className="w-5 h-5 text-green-500" />
      <div>
        <div className="font-semibold">100% Secure Booking</div>
        <div className="text-amber-600 text-xs">Safe & protected payments</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <PhoneCall className="w-5 h-5 text-blue-500" />
      <div>
        <div className="font-semibold">24/7 Support</div>
        <div className="text-amber-600 text-xs">Always here to help</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <Award className="w-5 h-5 text-amber-500" />
      <div>
        <div className="font-semibold">Verified Vendors</div>
        <div className="text-amber-600 text-xs">Quality assured services</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <CheckCircle className="w-5 h-5 text-purple-500" />
      <div>
        <div className="font-semibold">Easy Cancellation</div>
        <div className="text-amber-600 text-xs">Flexible booking options</div>
      </div>
    </div>
  </div>
);

// --------------------------- Main Services Page ---------------------------
export default function ServicesPage() {
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
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.className = "fixed top-20 right-4 bg-amber-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-16">
      {/* Main Content starts below navbar (pt-16 for fixed navbar) */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Search and Categories Section */}
        <div className="bg-white shadow-sm rounded-2xl p-6 mb-8 border border-amber-100">
          <div className="relative mb-6">
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

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
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

        {/* Hero Banner */}
        <HeroBanner />

        {/* Packages Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-800">Popular Packages</h2>
            <button className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2">
              View All Packages
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesData.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} onBook={handleBook} />
            ))}
          </div>
        </section>

        {/* Filters and Results Section */}
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

        {/* Services Grid */}
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

        {/* Recently Viewed Section */}
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

        {/* Trust Badges */}
        <TrustBadges />
      </div>

      {/* Service Detail Modal */}
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

      {/* Mobile Filter Button */}
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

// --------------------------- Service Detail Modal ---------------------------
function ServiceDetailModal({ service, onClose, onBook, onToggleWishlist, isWishlisted }) {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);

  const modalTabs = [
    { key: "overview", label: "Overview", icon: Eye },
    { key: "inclusions", label: "Inclusions", icon: CheckCircle },
    { key: "vendors", label: "Vendors", icon: Users },
    { key: "reviews", label: "Reviews", icon: Star },
    { key: "policies", label: "Policies", icon: BookOpen }
  ];

  const TabIcon = modalTabs.find(tab => tab.key === activeTab)?.icon || Eye;

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
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-shrink-0">
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

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-amber-900 mb-2">{service.name}</h2>
                <div className="flex items-center gap-4 text-sm text-amber-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-amber-800">{service.rating}</span>
                    <span>({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>
                  {service.trending && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-800">₹{service.price.toLocaleString()}</div>
                {service.unit && <div className="text-amber-600">{service.unit}</div>}
                {service.discount && (
                  <div className="text-red-500 text-sm line-through">
                    ₹{Math.round(service.price / (1 - service.discount/100)).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-amber-200 mb-6">
              <div className="flex space-x-4 overflow-x-auto">
                {modalTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 pb-3 px-1 font-medium capitalize whitespace-nowrap ${
                        activeTab === tab.key
                          ? "text-amber-600 border-b-2 border-amber-600"
                          : "text-amber-400 hover:text-amber-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <p className="text-amber-700 leading-relaxed">
                    {service.description || "Premium service with excellent quality and customer satisfaction."}
                  </p>
                  {service.customization && (
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-3">Customization Options</h4>
                      <div className="space-y-3">
                        {service.customization.map(option => (
                          <div key={option.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                            <span className="text-amber-600 font-medium">{option.name}</span>
                            <span className="text-amber-800">{option.options.join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-amber-800 mb-3">What's Included</h4>
                  <ul className="space-y-2">
                    {(service.inclusions || ["Professional Service", "Quality Materials", "On-time Delivery"]).map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-amber-700 p-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "vendors" && service.vendors && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-amber-800 mb-3">Available Vendors</h4>
                  {service.vendors.map(vendor => (
                    <div key={vendor.id} className="p-4 border border-amber-200 rounded-lg hover:border-amber-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-amber-800 text-lg">{vendor.name}</h5>
                          <div className="flex items-center gap-4 text-sm text-amber-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span>{vendor.rating} • {vendor.completedEvents} events</span>
                            </div>
                            <div className={`flex items-center gap-1 ${vendor.available ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-2 h-2 rounded-full ${vendor.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <span>{vendor.available ? 'Available Now' : 'Currently Busy'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-amber-600">Response time</div>
                          <div className="font-semibold text-amber-800">{vendor.responseTime}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium">
                          Contact Vendor
                        </button>
                        <button
                          onClick={() => setSelectedVendor(vendor)}
                          className="flex-1 px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                        >
                          Select Vendor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center p-4 bg-amber-50 rounded-2xl">
                      <div className="text-3xl font-bold text-amber-800">{service.rating}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(service.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-amber-200"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-amber-600 text-sm mt-1">{service.reviews} reviews</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-700">Customer reviews and ratings will be displayed here. Real photos from previous events can help you make better decisions.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "policies" && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Cancellation Policy</h4>
                    <p className="text-amber-700 text-sm">
                      Free cancellation up to 48 hours before the event. 50% refund for cancellations within 24-48 hours. No refund for cancellations within 24 hours of the event.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Quality Guarantee</h4>
                    <p className="text-green-700 text-sm">
                      We guarantee the quality of all our services. If you're not satisfied with the service quality, we'll work to make it right or provide a partial refund.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="border-t border-amber-200 bg-white p-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            {service.unit && (
              <div className="flex items-center gap-3">
                <span className="text-amber-700 font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center hover:bg-amber-50"
                  >
                    <Minus className="w-4 h-4 text-amber-600" />
                  </button>
                  <span className="w-8 text-center font-medium text-amber-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center hover:bg-amber-50"
                  >
                    <Plus className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex gap-3 flex-1 justify-end">
              <button className="px-6 py-3 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors font-medium flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => onBook(service)}
                className="px-8 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-semibold flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}