import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Filter, 
  X, 
  Calendar, 
  MessageCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Map,
  Phone,
  Mail,
  Share,
  IndianRupee,
  Clock3,
  User,
  Home,
  Sparkles,
  Download,
  MessageSquare,
  RotateCcw,
  Shield,
  Award,
  PhoneCall,
  FileText,
  BookOpen,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Toast Component
const Toast = ({ message, type = "success", onClose, bookingId }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 p-6 rounded-xl shadow-2xl ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white flex items-start gap-4 min-w-96 max-w-md`}
    >
      <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-bold text-lg">{message}</p>
        {bookingId && (
          <p className="text-sm opacity-90 mt-1">
            Booking ID: <span className="font-mono font-bold">{bookingId}</span>
          </p>
        )}
        <p className="text-sm opacity-90 mt-2">
          {type === "success" 
            ? "You will receive confirmation via WhatsApp shortly." 
            : "Please try again or contact support."}
        </p>
        <div className="flex gap-3 mt-3">
          <button 
            onClick={() => window.open(`https://wa.me/?text=My Pandit Booking ID: ${bookingId}`, '_blank')}
            className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Share on WhatsApp
          </button>
          <button 
            onClick={onClose}
            className="bg-white/20 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton Loading Component
const PanditCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
    </div>
    <div className="space-y-3 mb-4">
      <div className="h-3 bg-gray-300 rounded"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="h-6 bg-gray-300 rounded w-20"></div>
      <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
    </div>
  </div>
);

// Trust Badges Component
const TrustBadges = () => (
  <div className="flex flex-wrap justify-center gap-6 py-8 border-t border-amber-200 mt-8">
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <Shield className="w-5 h-5 text-green-500" />
      <div>
        <div className="font-semibold">Verified Pandits</div>
        <div className="text-xs text-amber-600">ID & Background Checked</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <Award className="w-5 h-5 text-blue-500" />
      <div>
        <div className="font-semibold">Quality Guarantee</div>
        <div className="text-xs text-amber-600">Satisfaction Assured</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm text-amber-700">
      <PhoneCall className="w-5 h-5 text-purple-500" />
      <div>
        <div className="font-semibold">24/7 Support</div>
        <div className="text-xs text-amber-600">Always Here to Help</div>
      </div>
    </div>
  </div>
);

// Pandit Detail Modal Component
const PanditDetailModal = ({ pandit, isOpen, onClose, onBookNow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {pandit.name} {pandit.verified && "✅"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-6">
              <img
                src={pandit.image}
                alt={pandit.name}
                className="w-24 h-24 rounded-xl object-cover border-2 border-amber-200"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {pandit.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{pandit.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" />
                    <span>{pandit.experience} years experience</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-semibold text-gray-900">
                    {pandit.rating} ({pandit.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-700">{pandit.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    {pandit.specialization}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {pandit.languages.map((lang, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Info */}
          <div className="space-y-6">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-amber-600">
                  ₹{pandit.price}
                </div>
                <div className="text-sm text-amber-600">per ceremony</div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-semibold">{pandit.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Pujas:</span>
                  <span className="font-semibold">{pandit.completedPujas}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onBookNow(pandit);
                  onClose();
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors mt-4"
              >
                Book Now
              </button>
            </div>

            {/* Contact Options */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Pandit</h4>
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function PanditBooking() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ 
    service: "", 
    location: "", 
    language: "",
    minPrice: 1000,
    maxPrice: 5000,
    minRating: 0,
    minExperience: 0,
    availability: ""
  });
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [selectedPanditDetail, setSelectedPanditDetail] = useState(null);
  const [showPanditDetail, setShowPanditDetail] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Enhanced Dummy Pandit Data with Dynamic Pricing
  const panditList = useMemo(() => [
    { 
      id: 1, 
      name: "Pandit Rajesh Sharma", 
      specialization: "Satyanarayan Puja", 
      experience: 12, 
      price: 1500, 
      samagriPrice: 300,
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=300&fit=crop",
      city: "Varanasi",
      rating: 4.8,
      reviews: 45,
      languages: ["Hindi", "Sanskrit"],
      availability: {
        dates: ["2024-01-15", "2024-01-16", "2024-01-18"],
        timeSlots: {
          "2024-01-15": ["09:00 AM", "02:00 PM"],
          "2024-01-16": ["11:00 AM", "05:00 PM"],
          "2024-01-18": ["07:00 AM", "02:00 PM"]
        }
      },
      description: "Expert in Vedic rituals with deep knowledge of ancient scriptures. Specializes in Satyanarayan Puja and other daily rituals.",
      verified: true,
      responseTime: "Within 15 minutes",
      completedPujas: 250,
      bio: "15+ years of experience in Vedic rituals. Trained under renowned gurus in Varanasi. Specializes in all types of pujas and ceremonies."
    },
    { 
      id: 2, 
      name: "Pandit Anil Joshi", 
      specialization: "Grih Pravesh", 
      experience: 8, 
      price: 1200, 
      samagriPrice: 400,
      image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=300&fit=crop",
      city: "Delhi",
      rating: 4.6,
      reviews: 32,
      languages: ["Hindi", "English"],
      availability: {
        dates: ["2024-01-17", "2024-01-19", "2024-01-20"],
        timeSlots: {
          "2024-01-17": ["09:00 AM", "05:00 PM"],
          "2024-01-19": ["11:00 AM", "02:00 PM"],
          "2024-01-20": ["07:00 AM", "05:00 PM"]
        }
      },
      description: "Specializes in house warming ceremonies with modern approach. Fluent in English for international clients.",
      verified: true,
      responseTime: "Within 30 minutes",
      completedPujas: 120,
      bio: "Expert in Grih Pravesh and Vastu Puja. Known for modern approach while maintaining traditional values."
    },
    { 
      id: 3, 
      name: "Pandit Suresh Mishra", 
      specialization: "Maha Mrityunjaya Jaap", 
      experience: 15, 
      price: 2000, 
      samagriPrice: 600,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop",
      city: "Prayagraj",
      rating: 4.9,
      reviews: 67,
      languages: ["Hindi", "Sanskrit"],
      availability: {
        dates: ["2024-01-15", "2024-01-16", "2024-01-22"],
        timeSlots: {
          "2024-01-15": ["07:00 AM", "11:00 AM"],
          "2024-01-16": ["09:00 AM", "02:00 PM"],
          "2024-01-22": ["05:00 PM"]
        }
      },
      description: "Renowned for powerful healing and protection rituals. Expert in Maha Mrityunjaya Jaap and Rudrabhishek.",
      verified: true,
      responseTime: "Within 20 minutes",
      completedPujas: 180,
      bio: "Specialist in healing rituals and protective pujas. 15+ years of dedicated service in spiritual healing."
    }
  ], []);

  // Get available time slots for selected date and pandit
  const getAvailableTimeSlots = (panditId, selectedDate) => {
    const pandit = panditList.find(p => p.id === panditId);
    if (!pandit || !selectedDate) return [];
    return pandit.availability.timeSlots[selectedDate] || [];
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("panditFavorites");
    const savedRecentlyViewed = localStorage.getItem("recentlyViewedPandits");
    const savedBookings = localStorage.getItem("panditBookings");
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    
    // Initialize bookings if not exists
    if (!savedBookings) {
      localStorage.setItem('panditBookings', JSON.stringify([]));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("panditFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recentlyViewedPandits", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const allServices = useMemo(() => [...new Set(panditList.map(p => p.specialization))], [panditList]);
  const allLocations = useMemo(() => [...new Set(panditList.map(p => p.city))], [panditList]);
  const allLanguages = useMemo(() => [...new Set(panditList.flatMap(p => p.languages))], [panditList]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleFavorite = (panditId) => {
    setFavorites(prev => 
      prev.includes(panditId) 
        ? prev.filter(id => id !== panditId)
        : [...prev, panditId]
    );
  };

  // Enhanced filter and search logic
  const filteredPandits = useMemo(() => {
    return panditList.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = (
        (!filters.service || p.specialization === filters.service) &&
        (!filters.location || p.city === filters.location) &&
        (!filters.language || p.languages.includes(filters.language)) &&
        p.price >= filters.minPrice &&
        p.price <= filters.maxPrice &&
        p.rating >= filters.minRating &&
        p.experience >= filters.minExperience &&
        (!filters.availability || p.availability.dates.includes(filters.availability))
      );

      return matchesSearch && matchesFilters;
    });
  }, [panditList, filters, searchQuery]);

  const sortedPandits = useMemo(() => {
    return [...filteredPandits].sort((a, b) => {
      switch(sortBy) {
        case "rating": return b.rating - a.rating;
        case "experience": return b.experience - a.experience;
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "reviews": return b.reviews - a.reviews;
        default: return 0;
      }
    });
  }, [filteredPandits, sortBy]);

  const handleBookNow = (pandit) => {
    setSelectedPandit(pandit);
    setBookingStep(1);
    setBookingData({ 
      panditId: pandit.id, 
      service: pandit.specialization, 
      date: "", 
      time: "", 
      address: "",
      includeSamagri: false,
      additionalNotes: ""
    });

    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== pandit.id);
      return [pandit, ...filtered].slice(0, 4);
    });
  };

  const handleViewDetails = (pandit) => {
    setSelectedPanditDetail(pandit);
    setShowPanditDetail(true);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== pandit.id);
      return [pandit, ...filtered].slice(0, 4);
    });
  };

  const handleBookingNext = () => {
    // Validate current step before proceeding
    if (bookingStep === 2 && (!bookingData.date || !bookingData.time)) {
      alert("Please select both date and time before proceeding.");
      return;
    }
    if (bookingStep === 3 && !bookingData.address) {
      alert("Please enter your address before proceeding.");
      return;
    }
    setBookingStep(prev => prev + 1);
  };

  const handleBookingBack = () => {
    setBookingStep(prev => prev - 1);
  };

  const handleBookingComplete = () => {
    const newBookingId = `BK${Date.now().toString().slice(-8)}`;
    setBookingId(newBookingId);
    setShowToast(true);
    
    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('panditBookings') || '[]');
    const selectedPanditData = panditList.find(p => p.id === selectedPandit.id);
    const newBooking = {
      id: newBookingId,
      pandit: selectedPandit,
      ...bookingData,
      totalAmount: selectedPanditData.price + (bookingData.includeSamagri ? selectedPanditData.samagriPrice : 0),
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };
    localStorage.setItem('panditBookings', JSON.stringify([newBooking, ...bookings]));
    
    setTimeout(() => {
      setBookingStep(0);
      setSelectedPandit(null);
    }, 5000);
  };

  const navigateToMyBookings = () => {
    navigate('/my-bookings');
  };

  const navigateToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-amber-800 to-amber-600 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-amber-300" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Book Pandit Ji for Your Puja
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-amber-100">
            Verified & Experienced Pandits – Anytime, Anywhere
          </p>
          <p className="text-sm sm:text-base mb-10 text-amber-200">
            पंडित जी बुकिंग सेक्शन • 100% Verified • Best Prices Guaranteed
          </p>

          {/* Enhanced Search Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 mt-8 border border-white/20 max-w-4xl mx-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pandits by name, city, or puja type..."
                className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition text-sm font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none justify-center"
              >
                <Filter className="w-5 h-5" /> 
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filters Bar */}
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-white shadow-2xl p-4 sm:p-6 border-b border-amber-200"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Refine Your Search
              </h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Puja Type</label>
                <select
                  value={filters.service}
                  onChange={(e) => handleFilterChange('service', e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white border-gray-300 text-gray-700"
                >
                  <option value="">All Pujas</option>
                  {allServices.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white border-gray-300 text-gray-700"
                >
                  <option value="">All Cities</option>
                  {allLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white border-gray-300 text-gray-700"
                >
                  <option value="">All Languages</option>
                  {allLanguages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Availability Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Available On</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white border-gray-300 text-gray-700"
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white border-gray-300 text-gray-700"
                >
                  <option value="rating">Rating</option>
                  <option value="experience">Experience</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Range Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
                </label>
                <div className="flex gap-4 items-center">
                  <span className="text-xs text-gray-500">₹1000</span>
                  <div className="flex-1 space-y-2">
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="500"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                      className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="500"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                      className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-gray-500">₹5000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Min Rating: {filters.minRating}★
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Min Experience: {filters.minExperience} years
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={filters.minExperience}
                  onChange={(e) => handleFilterChange('minExperience', parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setFilters({
                    service: "", 
                    location: "", 
                    language: "",
                    minPrice: 1000,
                    maxPrice: 5000,
                    minRating: 0,
                    minExperience: 0,
                    availability: ""
                  });
                  setSearchQuery("");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-amber-600" />
            Available Pandits
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({sortedPandits.length} found)
            </span>
          </h2>
          
          {/* Active Filters Chips */}
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                Search: "{searchQuery}"
                <X 
                  size={14}
                  className="cursor-pointer hover:text-red-500 transition-colors" 
                  onClick={() => setSearchQuery("")} 
                />
              </span>
            )}
            {Object.entries(filters).map(([key, value]) => {
              if (value && key !== 'minPrice' && key !== 'maxPrice' && key !== 'minRating' && key !== 'minExperience') {
                return (
                  <span key={key} className="bg-amber-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {key}: {value}
                    <X 
                      size={14}
                      className="cursor-pointer hover:text-red-500 transition-colors" 
                      onClick={() => handleFilterChange(key, '')} 
                    />
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Pandit Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PanditCardSkeleton key={i} />
            ))}
          </div>
        ) : sortedPandits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPandits.map((pandit) => (
              <motion.div
                key={pandit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 transform hover:scale-[1.02] border border-amber-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={pandit.image}
                      alt={pandit.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-amber-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-800">{pandit.name}</h3>
                        {pandit.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" title="Verified Pandit" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {pandit.rating} ({pandit.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(pandit.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(pandit.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(pandit.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pandit.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock3 className="w-4 h-4" />
                    <span>{pandit.experience} years experience • {pandit.completedPujas}+ pujas</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{pandit.description}</p>
                  
                  {/* Response Time */}
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Clock className="w-4 h-4" />
                    <span>{pandit.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{pandit.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/ceremony</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(pandit)}
                    className="flex-1 border border-amber-600 text-amber-600 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleBookNow(pandit)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Results Found */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No Pandits Found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find the perfect pandit for your puja.
            </p>
            <button
              onClick={() => {
                setFilters({
                  service: "", 
                  location: "", 
                  language: "",
                  minPrice: 1000,
                  maxPrice: 5000,
                  minRating: 0,
                  minExperience: 0,
                  availability: ""
                });
                setSearchQuery("");
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-600" />
              Recently Viewed Pandits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((pandit) => (
                <div
                  key={pandit.id}
                  className="bg-white rounded-xl p-4 border border-amber-100 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={pandit.image}
                    alt={pandit.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-gray-800">{pandit.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{pandit.specialization}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-amber-600">
                      ₹{pandit.price}
                    </span>
                    <button
                      onClick={() => handleBookNow(pandit)}
                      className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-700 transition"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <TrustBadges />
      </div>

      {/* Enhanced Booking Modal */}
      <AnimatePresence>
        {selectedPandit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Book {selectedPandit.name}
                </h2>
                <button
                  onClick={() => {
                    setBookingStep(0);
                    setSelectedPandit(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Booking Steps */}
              <div className="flex mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      bookingStep >= step 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`flex-1 h-1 ${
                        bookingStep > step ? 'bg-amber-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Service Selection */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select Service
                  </h3>
                  <div className="grid gap-4">
                    <div className="p-4 border-2 border-amber-300 rounded-xl bg-amber-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {selectedPandit.specialization}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedPandit.description}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-amber-600">
                          ₹{selectedPandit.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleBookingNext}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue to Date & Time
                  </button>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select Date & Time
                  </h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <select
                        value={bookingData.date}
                        onChange={(e) => {
                          setBookingData(prev => ({ 
                            ...prev, 
                            date: e.target.value,
                            time: "" // Reset time when date changes
                          }));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select Date</option>
                        {selectedPandit.availability.dates.map(date => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-IN', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {bookingData.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Time Slots
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {getAvailableTimeSlots(selectedPandit.id, bookingData.date).map(timeSlot => (
                            <button
                              key={timeSlot}
                              onClick={() => setBookingData(prev => ({ ...prev, time: timeSlot }))}
                              className={`p-3 rounded-lg border text-center transition-colors ${
                                bookingData.time === timeSlot
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'border-gray-300 hover:border-amber-500'
                              }`}
                            >
                              {timeSlot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBookingBack}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBookingNext}
                      disabled={!bookingData.date || !bookingData.time}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        bookingData.date && bookingData.time
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Address & Additional Details */}
              {bookingStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enter Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complete Address
                      </label>
                      <textarea
                        placeholder="Enter your complete address with landmark..."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white resize-none"
                        value={bookingData.address}
                        onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 border border-amber-300 rounded-xl bg-amber-50">
                      <input
                        type="checkbox"
                        id="includeSamagri"
                        className="w-5 h-5 text-amber-600 focus:ring-amber-500 rounded"
                        checked={bookingData.includeSamagri}
                        onChange={(e) => setBookingData(prev => ({ ...prev, includeSamagri: e.target.checked }))}
                      />
                      <label htmlFor="includeSamagri" className="text-sm text-gray-700 flex-1">
                        <div className="font-semibold">Include Puja Samagri Kit</div>
                        <div className="text-xs text-gray-600">
                          All necessary puja items delivered to your doorstep (+₹{selectedPandit.samagriPrice})
                        </div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        placeholder="Any special requirements or instructions..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white resize-none"
                        value={bookingData.additionalNotes}
                        onChange={(e) => setBookingData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBookingBack}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBookingNext}
                      disabled={!bookingData.address}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        bookingData.address
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {bookingStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Confirm Booking
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pandit:</span>
                      <span className="font-semibold">{selectedPandit.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold">{bookingData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-semibold">
                        {new Date(bookingData.date).toLocaleDateString('en-IN')} at {bookingData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samagri Kit:</span>
                      <span className="font-semibold">
                        {bookingData.includeSamagri ? `Included (+₹${selectedPandit.samagriPrice})` : 'Not Included'}
                      </span>
                    </div>
                    {bookingData.additionalNotes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Instructions:</span>
                        <span className="font-semibold text-right max-w-[60%]">{bookingData.additionalNotes}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-amber-600">
                          ₹{selectedPandit.price + (bookingData.includeSamagri ? selectedPandit.samagriPrice : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <div className="font-semibold">Cancellation Policy</div>
                        <div>Free cancellation up to 24 hours before the puja. 50% refund for cancellations within 12-24 hours.</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBookingBack}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBookingComplete}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pandit Detail Modal */}
      <PanditDetailModal
        pandit={selectedPanditDetail}
        isOpen={showPanditDetail}
        onClose={() => setShowPanditDetail(false)}
        onBookNow={handleBookNow}
      />

      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message={`Your puja with ${selectedPandit?.name} is confirmed!`}
            type="success"
            bookingId={bookingId}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}