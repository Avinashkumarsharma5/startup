import React, { useState, useEffect } from "react";
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
  Share
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PanditBooking() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ 
    service: "", 
    location: "", 
    language: "",
    minPrice: 1000,
    maxPrice: 5000,
    minRating: 0
  });
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("panditFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("panditFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Pandit Data
  const pandits = [
    {
      id: 1,
      name: "Pandit Ramesh Sharma",
      experience: "15+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.8,
      reviews: 120,
      location: "Varanasi",
      services: ["Griha Pravesh", "Maha Mrityunjaya Jaap"],
      price: 2100,
      image: "https://randomuser.me/api/portraits/men/92.jpg",
      address: "Varanasi, UP",
      contact: "+91 9876543210",
      email: "ramesh.sharma@example.com",
      verified: true,
      availability: ["Monday", "Wednesday", "Friday", "Sunday"],
      description: "Expert in Vedic rituals with extensive knowledge of ancient scriptures.",
      reviewsList: [
        { user: "Rajesh Kumar", rating: 5, comment: "Excellent service, very knowledgeable" },
        { user: "Priya Singh", rating: 4.5, comment: "Great experience, would recommend" },
        { user: "Amit Verma", rating: 5, comment: "Perfect ceremony, very satisfied" }
      ]
    },
    {
      id: 2,
      name: "Pandit Suresh Mishra",
      experience: "10+ years",
      languages: ["Hindi", "English"],
      rating: 4.6,
      reviews: 90,
      location: "Delhi",
      services: ["Satyanarayan Katha", "Marriage Ceremony"],
      price: 1800,
      image: "https://randomuser.me/api/portraits/men/72.jpg",
      address: "Delhi, India",
      contact: "+91 9123456780",
      email: "suresh.mishra@example.com",
      verified: true,
      availability: ["Tuesday", "Thursday", "Saturday"],
      description: "Specializes in wedding ceremonies and Satyanarayan Katha.",
      reviewsList: [
        { user: "Neha Gupta", rating: 4, comment: "Good service, punctual" },
        { user: "Rahul Sharma", rating: 5, comment: "Wonderful ceremony" }
      ]
    },
    {
      id: 3,
      name: "Pandit Mahesh Tiwari",
      experience: "12+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.7,
      reviews: 110,
      location: "Mumbai",
      services: ["Marriage Ceremony", "Griha Pravesh"],
      price: 2000,
      image: "https://randomuser.me/api/portraits/men/73.jpg",
      address: "Mumbai, MH",
      contact: "+91 9988776655",
      email: "mahesh.tiwari@example.com",
      verified: false,
      availability: ["Monday", "Wednesday", "Friday", "Sunday"],
      description: "Experienced in both traditional and modern ceremony formats.",
      reviewsList: [
        { user: "Sanjay Patel", rating: 4.5, comment: "Professional service" },
        { user: "Meera Desai", rating: 5, comment: "Excellent knowledge of rituals" }
      ]
    },
    {
      id: 4,
      name: "Pandit Dinesh Pathak",
      experience: "20+ years",
      languages: ["Hindi", "English"],
      rating: 4.9,
      reviews: 150,
      location: "Jaipur",
      services: ["Maha Mrityunjaya Jaap", "Satyanarayan Katha"],
      price: 2500,
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      address: "Jaipur, RJ",
      contact: "+91 9871122334",
      email: "dinesh.pathak@example.com",
      verified: true,
      availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      description: "Senior pandit with expertise in complex Vedic rituals.",
      reviewsList: [
        { user: "Vikram Singh", rating: 5, comment: "Exceptional service" },
        { user: "Anjali Mehta", rating: 5, comment: "Highly recommended" }
      ]
    },
    {
      id: 5,
      name: "Pandit Rajesh Dubey",
      experience: "8+ years",
      languages: ["Hindi"],
      rating: 4.5,
      reviews: 70,
      location: "Lucknow",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: 1500,
      image: "https://randomuser.me/api/portraits/men/16.jpg",
      address: "Lucknow, UP",
      contact: "+91 9811223344",
      email: "rajesh.dubey@example.com",
      verified: false,
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      description: "Young and enthusiastic pandit with modern approach to traditions.",
      reviewsList: [
        { user: "Alok Verma", rating: 4, comment: "Good service at reasonable price" },
        { user: "Sunita Devi", rating: 4.5, comment: "Satisfied with the ceremony" }
      ]
    },
    {
      id: 6,
      name: "Pandit Manoj Pandey",
      experience: "18+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.8,
      reviews: 140,
      location: "Prayagraj",
      services: ["Maha Mrityunjaya Jaap", "Marriage Ceremony"],
      price: 2300,
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      address: "Prayagraj, UP",
      contact: "+91 9877766554",
      email: "manoj.pandey@example.com",
      verified: true,
      availability: ["Wednesday", "Friday", "Sunday"],
      description: "Expert in Maha Mrityunjaya Jaap and other powerful rituals.",
      reviewsList: [
        { user: "Ravi Shankar", rating: 5, comment: "Life-changing experience" },
        { user: "Pooja Mishra", rating: 4.5, comment: "Very spiritual ceremony" }
      ]
    },
    {
      id: 7,
      name: "Pandit Keshav Shastri",
      experience: "11+ years",
      languages: ["Hindi", "English"],
      rating: 4.6,
      reviews: 95,
      location: "Pune",
      services: ["Satyanarayan Katha", "Griha Pravesh"],
      price: 1900,
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      address: "Pune, MH",
      contact: "+91 9922334455",
      email: "keshav.shastri@example.com",
      verified: true,
      availability: ["Monday", "Thursday", "Saturday"],
      description: "Balances traditional values with modern convenience.",
      reviewsList: [
        { user: "Nitin Kulkarni", rating: 4, comment: "Good service" },
        { user: "Sneha Joshi", rating: 5, comment: "Perfect for our housewarming" }
      ]
    },
    {
      id: 8,
      name: "Pandit Vinod Mishra",
      experience: "16+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.7,
      reviews: 130,
      location: "Hyderabad",
      services: ["Marriage Ceremony", "Maha Mrityunjaya Jaap"],
      price: 2200,
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      address: "Hyderabad, TS",
      contact: "+91 9900112233",
      email: "vinod.mishra@example.com",
      verified: true,
      availability: ["Tuesday", "Friday", "Sunday"],
      description: "Specializes in wedding ceremonies with traditional authenticity.",
      reviewsList: [
        { user: "Arun Reddy", rating: 4.5, comment: "Beautiful wedding ceremony" },
        { user: "Lakshmi Nair", rating: 5, comment: "Traditional and authentic" }
      ]
    },
    {
      id: 9,
      name: "Pandit Harish Tripathi",
      experience: "14+ years",
      languages: ["Hindi", "English", "Sanskrit"],
      rating: 4.9,
      reviews: 160,
      location: "Bhopal",
      services: ["Griha Pravesh", "Satyanarayan Katha"],
      price: 2400,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      address: "Bhopal, MP",
      contact: "+91 9876541230",
      email: "harish.tripathi@example.com",
      verified: true,
      availability: ["Monday", "Wednesday", "Saturday"],
      description: "Multilingual pandit with extensive experience in various rituals.",
      reviewsList: [
        { user: "Mohan Agrawal", rating: 5, comment: "Excellent in all aspects" },
        { user: "Sarita Jain", rating: 5, comment: "Highly knowledgeable" }
      ]
    },
    {
      id: 10,
      name: "Pandit Prakash Joshi",
      experience: "9+ years",
      languages: ["Hindi", "English"],
      rating: 4.5,
      reviews: 85,
      location: "Udaipur",
      services: ["Marriage Ceremony", "Satyanarayan Katha"],
      price: 1700,
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      address: "Udaipur, RJ",
      contact: "+91 9811225566",
      email: "prakash.joshi@example.com",
      verified: false,
      availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      description: "Brings youthful energy to traditional ceremonies.",
      reviewsList: [
        { user: "Vijay Singh", rating: 4, comment: "Good value for money" },
        { user: "Reena Meena", rating: 4.5, comment: "Nice ceremony" }
      ]
    },
    {
      id: 11,
      name: "Pandit Ravi Verma",
      experience: "13+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.7,
      reviews: 105,
      location: "Chennai",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: 2100,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      address: "Chennai, TN",
      contact: "+91 9876554433",
      email: "ravi.verma@example.com",
      verified: true,
      availability: ["Monday", "Wednesday", "Friday"],
      description: "Expert in South Indian style ceremonies with Sanskrit proficiency.",
      reviewsList: [
        { user: "Karthik Iyer", rating: 4.5, comment: "Good knowledge of rituals" },
        { user: "Priya Raman", rating: 5, comment: "Perfect for our needs" }
      ]
    },
    {
      id: 12,
      name: "Pandit Sanjay Gupta",
      experience: "12+ years",
      languages: ["Hindi", "English"],
      rating: 4.6,
      reviews: 92,
      location: "Kolkata",
      services: ["Satyanarayan Katha", "Maha Mrityunjaya Jaap"],
      price: 2000,
      image: "https://randomuser.me/api/portraits/men/23.jpg",
      address: "Kolkata, WB",
      contact: "+91 9911223344",
      email: "sanjay.gupta@example.com",
      verified: true,
      availability: ["Tuesday", "Thursday", "Sunday"],
      description: "Specializes in Bengali tradition ceremonies with modern touch.",
      reviewsList: [
        { user: "Amitabh Das", rating: 4, comment: "Satisfactory service" },
        { user: "Mousumi Roy", rating: 5, comment: "Great experience" }
      ]
    },
    {
      id: 13,
      name: "Pandit Anil Sharma",
      experience: "17+ years",
      languages: ["Hindi"],
      rating: 4.8,
      reviews: 135,
      location: "Bangalore",
      services: ["Marriage Ceremony", "Griha Pravesh"],
      price: 2250,
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      address: "Bangalore, KA",
      contact: "+91 9877766553",
      email: "anil.sharma@example.com",
      verified: true,
      availability: ["Monday", "Wednesday", "Friday", "Saturday"],
      description: "Experienced with IT professional families and modern ceremonies.",
      reviewsList: [
        { user: "Rajiv Menon", rating: 5, comment: "Professional and punctual" },
        { user: "Deepa Nair", rating: 4.5, comment: "Good understanding of modern needs" }
      ]
    },
    {
      id: 14,
      name: "Pandit Deepak Tiwari",
      experience: "15+ years",
      languages: ["Hindi", "Sanskrit"],
      rating: 4.7,
      reviews: 128,
      location: "Chandigarh",
      services: ["Maha Mrityunjaya Jaap", "Satyanarayan Katha"],
      price: 2150,
      image: "https://randomuser.me/api/portraits/men/25.jpg",
      address: "Chandigarh, CH",
      contact: "+91 9888776655",
      email: "deepak.tiwari@example.com",
      verified: true,
      availability: ["Tuesday", "Thursday", "Saturday"],
      description: "Expert in powerful healing and protection rituals.",
      reviewsList: [
        { user: "Simran Singh", rating: 5, comment: "Very effective ceremonies" },
        { user: "Harpreet Kaur", rating: 4.5, comment: "Satisfied with service" }
      ]
    },
    {
      id: 15,
      name: "Pandit Ashok Pandey",
      experience: "19+ years",
      languages: ["Hindi", "English", "Sanskrit"],
      rating: 4.9,
      reviews: 165,
      location: "Ahmedabad",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: 2500,
      image: "https://randomuser.me/api/portraits/men/26.jpg",
      address: "Ahmedabad, GJ",
      contact: "+91 9876541122",
      email: "ashok.pandey@example.com",
      verified: true,
      availability: ["Monday", "Wednesday", "Friday", "Sunday"],
      description: "Senior expert with comprehensive knowledge of all rituals.",
      reviewsList: [
        { user: "Narendra Patel", rating: 5, comment: "Best in the business" },
        { user: "Sarika Shah", rating: 5, comment: "Exceptional service quality" }
      ]
    }
  ];

  const allServices = [...new Set(pandits.flatMap(p => p.services))];
  const allLocations = [...new Set(pandits.map(p => p.location))];
  const allLanguages = [...new Set(pandits.flatMap(p => p.languages))];

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

  const filteredPandits = pandits.filter(p => {
    return (
      (!filters.service || p.services.includes(filters.service)) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.language || p.languages.includes(filters.language)) &&
      p.price >= filters.minPrice &&
      p.price <= filters.maxPrice &&
      p.rating >= filters.minRating
    );
  });

  const sortedPandits = [...filteredPandits].sort((a, b) => {
    switch(sortBy) {
      case "rating": return b.rating - a.rating;
      case "experience": return b.experience.localeCompare(a.experience);
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      default: return 0;
    }
  });

  const handleBookNow = (pandit) => {
    setSelectedPandit(pandit);
    setBookingStep(1);
    setBookingData({ panditId: pandit.id, service: "", date: "", time: "", address: "" });
  };

  const handleBookingNext = () => {
    setBookingStep(prev => prev + 1);
  };

  const handleBookingBack = () => {
    setBookingStep(prev => prev - 1);
  };

  const handleBookingComplete = () => {
    alert("Booking successful! You will receive a confirmation shortly.");
    setBookingStep(0);
    setSelectedPandit(null);
  };

  const handleViewProfile = (pandit) => {
    navigate("/PanditProfile", { state: { pandit } });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-orange-100'} transition-colors duration-300`}>
      {/* Header Section */}
      <section className={`relative ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-amber-800 to-yellow-900'} text-white py-20 px-6 text-center`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Rooted in Dharma, Guided by Devotion
          </h1>
          <p className="text-lg md:text-xl mb-10">
            Find Verified Pandits for Every Ritual and Ceremony
          </p>

          <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search pandits by name or city..."
                className="w-full border px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-amber-700 hover:bg-yellow-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              <Filter size={20} /> Filters
            </button>
            <button 
              onClick={toggleDarkMode}
              className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition"
            >
              {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6 rounded-lg mx-4 mt-4`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-gray-500">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Service</label>
              <select
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">All Services</option>
                {allServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">All Locations</option>
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
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">All Languages</option>
                {allLanguages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Minimum Rating: {filters.minRating}★
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Chips */}
      <div className="px-6 py-4 flex flex-wrap gap-2">
        {filters.service && (
          <span className={`${darkMode ? 'bg-gray-700' : 'bg-amber-100'} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
            Service: {filters.service}
            <X size={14} onClick={() => handleFilterChange('service', '')} className="cursor-pointer" />
          </span>
        )}
        {filters.location && (
          <span className={`${darkMode ? 'bg-gray-700' : 'bg-amber-100'} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
            Location: {filters.location}
            <X size={14} onClick={() => handleFilterChange('location', '')} className="cursor-pointer" />
          </span>
        )}
        {filters.language && (
          <span className={`${darkMode ? 'bg-gray-700' : 'bg-amber-100'} px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
            Language: {filters.language}
            <X size={14} onClick={() => handleFilterChange('language', '')} className="cursor-pointer" />
          </span>
        )}
      </div>

      {/* Pandits Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPandits.map((p) => (
          <div
            key={p.id}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative`}
          >
            {/* Verified Badge */}
            {p.verified && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <CheckCircle size={12} /> Verified
              </div>
            )}

            {/* Favorite Heart */}
            <button 
              onClick={() => toggleFavorite(p.id)}
              className={`absolute top-4 left-4 ${
                favorites.includes(p.id) ? 'text-red-500' : 'text-gray-400'
              } hover:text-red-500 transition-colors`}
            >
              <Heart size={22} fill={favorites.includes(p.id) ? 'currentColor' : 'none'} />
            </button>

            <div className="flex gap-4 items-center mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-sm opacity-75">{p.experience}</p>
                <p className="text-sm opacity-75">{p.languages.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-yellow-500 mb-3">
              <Star size={18} fill="currentColor" /> {p.rating} ({p.reviews} reviews)
            </div>

            <p className="flex items-center gap-2 opacity-75 mb-3">
              <MapPin size={18} /> {p.location}
            </p>

            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {p.services.slice(0, 2).map((s, idx) => (
                  <span key={idx} className={`${darkMode ? 'bg-gray-700' : 'bg-amber-100'} px-2 py-1 rounded text-sm`}>
                    {s}
                  </span>
                ))}
                {p.services.length > 2 && (
                  <span className="text-sm opacity-75">+{p.services.length - 2} more</span>
                )}
              </div>
            </div>

            <p className="font-semibold text-amber-600 mb-4">₹{p.price} / service</p>

            <div className="flex justify-between items-center mt-auto gap-2">
              <button
                onClick={() => handleBookNow(p)}
                className="bg-amber-700 hover:bg-yellow-900 text-white px-4 py-2 rounded-lg transition"
              >
                Book Now
              </button>

              <button
                onClick={() => handleViewProfile(p)}
                className="border border-amber-700 text-amber-700 hover:bg-amber-50 px-4 py-2 rounded-lg transition"
              >
                Profile
              </button>

              <button className="text-gray-500 hover:text-blue-500 transition">
                <MessageCircle size={22} />
              </button>
            </div>

            {/* Expandable Section */}
            <button
              onClick={() => setExpandedCard(expandedCard === p.id ? null : p.id)}
              className="mt-4 text-sm text-amber-700 flex items-center gap-1"
            >
              {expandedCard === p.id ? (
                <>
                  <ChevronUp size={16} /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show More
                </>
              )}
            </button>

            {expandedCard === p.id && (
              <div className="mt-4 space-y-3">
                <h4 className="font-semibold">Recent Reviews</h4>
                {p.reviewsList.slice(0, 2).map((review, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="flex items-center gap-2">
                      <Star size={14} fill="currentColor" className="text-yellow-500" />
                      <span className="font-medium">{review.rating}</span>
                      <span>by {review.user}</span>
                    </div>
                    <p className="opacity-75">{review.comment}</p>
                  </div>
                ))}
                <p className="text-sm opacity-75">Availability: {p.availability.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Booking Modal */}
      {selectedPandit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Book {selectedPandit.name}</h2>
              <button onClick={() => setBookingStep(0)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose Service</h3>
                <div className="grid gap-2">
                  {selectedPandit.services.map(service => (
                    <button
                      key={service}
                      onClick={() => {
                        setBookingData(prev => ({ ...prev, service }));
                        handleBookingNext();
                      }}
                      className={`p-4 rounded-lg border text-left ${
                        darkMode ? 'border-gray-700 hover:border-amber-600' : 'border-gray-300 hover:border-amber-500'
                      } transition`}
                    >
                      <span className="font-medium">{service}</span>
                      <p className="text-sm opacity-75">₹{selectedPandit.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Date & Time</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg"
                      onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Time</label>
                    <select
                      className="w-full p-3 border rounded-lg"
                      onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                    >
                      <option value="">Select Time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={handleBookingBack} className="px-6 py-2 border rounded-lg">
                    Back
                  </button>
                  <button onClick={handleBookingNext} className="px-6 py-2 bg-amber-700 text-white rounded-lg">
                    Next
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Enter Address</h3>
                <textarea
                  placeholder="Enter your complete address"
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                  onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                />
                <div className="flex justify-between mt-6">
                  <button onClick={handleBookingBack} className="px-6 py-2 border rounded-lg">
                    Back
                  </button>
                  <button onClick={handleBookingNext} className="px-6 py-2 bg-amber-700 text-white rounded-lg">
                    Next
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Confirm Booking</h3>
                <div className="space-y-2">
                  <p><strong>Pandit:</strong> {selectedPandit.name}</p>
                  <p><strong>Service:</strong> {bookingData.service}</p>
                  <p><strong>Date:</strong> {bookingData.date}</p>
                  <p><strong>Time:</strong> {bookingData.time}</p>
                  <p><strong>Address:</strong> {bookingData.address}</p>
                  <p><strong>Total:</strong> ₹{selectedPandit.price}</p>
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={handleBookingBack} className="px-6 py-2 border rounded-lg">
                    Back
                  </button>
                  <button onClick={handleBookingComplete} className="px-6 py-2 bg-green-600 text-white rounded-lg">
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}