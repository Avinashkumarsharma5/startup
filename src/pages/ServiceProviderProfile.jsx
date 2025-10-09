import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Upload,
  History,
  User,
  Video,
  Image,
  Star,
  MessageCircle,
  DollarSign,
  Edit3,
  CheckCircle,
  Instagram,
  Youtube,
  Globe,
  Phone,
  Mail,
  MapPin,
  Download,
  Filter,
  Search,
  Plus,
  Trash2,
  Pin,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Share2,
  ThumbsUp,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Shield,
  FileText,
  Check,
  XCircle,
  Clock as ClockIcon
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Utility component for scrollbar-hiding (for better tab navigation on mobile)
const ScrollbarHide = ({ children, className }) => (
  <div className={`overflow-x-auto ${className}`} style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <style jsx global>{`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <div className="flex" style={{ width: 'max-content' }}>
      {children}
    </div>
  </div>
);

export default function ServiceProviderProfile({ role, vendorData }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [availability, setAvailability] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Mock data (unchanged)
  const upcomingBookings = vendorData?.upcomingBookings || [
    { id: 1, customer: "Ravi Kumar", service: "Diwali Puja", date: "2024-10-25", time: "10:00 AM", status: "confirmed", amount: 1500 },
    { id: 2, customer: "Priya Sharma", service: "Griha Pravesh", date: "2024-10-28", time: "2:00 PM", status: "pending", amount: 2000 }
  ];

  const bookingHistory = vendorData?.bookingHistory || [
    { id: 1, customer: "Amit Patel", service: "Wedding Ceremony", date: "2024-10-15", amount: 5000, status: "completed" },
    { id: 2, customer: "Sneha Reddy", service: "Birthday Puja", date: "2024-10-12", amount: 1200, status: "cancelled" }
  ];

  const reviews = vendorData?.reviews || [
    { id: 1, customer: "Rajesh Mehta", rating: 5, comment: "Excellent service! Very professional.", date: "2024-10-18" },
    { id: 2, customer: "Anita Singh", rating: 4, comment: "Good experience, timely service.", date: "2024-10-10" }
  ];

  const earningsData = [
    { month: 'Jan', earnings: 40000, bookings: 12 },
    { month: 'Feb', earnings: 45000, bookings: 15 },
    { month: 'Mar', earnings: 38000, bookings: 11 },
    { month: 'Apr', earnings: 52000, bookings: 18 },
    { month: 'May', earnings: 48000, bookings: 16 },
    { month: 'Jun', earnings: 55000, bookings: 20 }
  ];

  const servicePackages = [
    { id: 1, name: "Basic Puja Package", price: 1000, duration: "2 hours", includes: ["All essential items", "Basic guidance"] },
    { id: 2, name: "Premium Puja Package", price: 2500, duration: "4 hours", includes: ["All items", "Expert guidance", "Prasad kit"] }
  ];

  // Translations (unchanged)
  const translations = {
    english: {
      tabs: {
        upcoming: "Upcoming Bookings",
        history: "Booking History",
        posts: "Posts & Updates",
        earnings: "Earnings & Analytics",
        reviews: "Reviews & Ratings",
        gallery: "Media Gallery",
        availability: "Availability",
        chat: "Messages",
        services: "Service Packages",
        documents: "Documents"
      }
    },
    hindi: {
      tabs: {
        upcoming: "आगामी बुकिंग",
        history: "बुकिंग इतिहास",
        posts: "पोस्ट और अपडेट",
        earnings: "आय और विश्लेषण",
        reviews: "समीक्षाएं और रेटिंग",
        gallery: "मीडिया गैलरी",
        availability: "उपलब्धता",
        chat: "संदेश",
        services: "सेवा पैकेज",
        documents: "दस्तावेज़"
      }
    }
  };

  const t = translations[language];

  const tabs = [
    { key: "upcoming", label: t.tabs.upcoming, icon: Clock },
    { key: "history", label: t.tabs.history, icon: History },
    { key: "posts", label: t.tabs.posts, icon: Edit3 },
    { key: "earnings", label: t.tabs.earnings, icon: DollarSign },
    { key: "reviews", label: t.tabs.reviews, icon: Star },
    { key: "gallery", label: t.tabs.gallery, icon: Image },
    { key: "availability", label: t.tabs.availability, icon: Calendar },
    { key: "chat", label: t.tabs.chat, icon: MessageCircle },
    { key: "services", label: t.tabs.services, icon: Settings },
    { key: "documents", label: t.tabs.documents, icon: FileText }
  ];

  // File upload handlers (unchanged)
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setImages(prev => [...prev, ...selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }))]);
    setSelectedFiles([]);
    setIsUploading(false);
  };

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([{
        id: Date.now(),
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        comments: [],
        isPinned: false
      }, ...posts]);
      setNewPost("");
    }
  };

  const togglePinPost = (postId) => {
    setPosts(posts.map(post => ({
      ...post,
      isPinned: post.id === postId ? !post.isPinned : post.isPinned
    })));
  };

  // Calculate average rating (unchanged)
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-amber-50 to-rose-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        
        {/* Header Controls (Mobile/Desktop Adjusted) */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}
            >
              {darkMode ? <Bell className="w-5 h-5 text-amber-400" /> : <Bell className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
              className={`p-2 rounded-full flex items-center gap-1 sm:gap-2 ${darkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'english' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Profile Header (Responsive Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-xl overflow-hidden mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="bg-gradient-to-r from-amber-600 to-rose-600 h-32 relative">
            <button
              onClick={() => setShowEditProfile(true)}
              className="absolute top-4 right-4 bg-white/90 text-amber-700 p-2 rounded-full hover:scale-110 transition-transform"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="px-4 sm:px-6 pb-6 -mt-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="relative mb-4 md:mb-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-2xl border-4 border-white">
                  {vendorData?.name?.[0] || "SP"}
                </div>
                {vendorData?.verified && (
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Name and Type */}
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">{vendorData?.name || "Service Provider"}</h1>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-800'}`}>
                        {vendorData?.vendorType || role}
                      </span>
                      {vendorData?.verified && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating Summary */}
                  <div className="text-left sm:text-center mt-2 sm:mt-0">
                    <div className="flex items-center gap-1 sm:justify-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {reviews.length} reviews
                    </div>
                  </div>
                </div>

                {/* Contact Info (Responsive Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-sm">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{vendorData?.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{vendorData?.phone || "Phone not set"}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{vendorData?.email || "Email not set"}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  <button className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                    <Youtube className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-500 text-white rounded-full hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticky Tabs (Horizontal Scroll on Mobile) */}
        <div className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl mb-6 transition-colors`}>
          <ScrollbarHide className="scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </ScrollbarHide>
        </div>

        {/* Tab Content (Main Content Area) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Upcoming Bookings (Responsive List) */}
            {activeTab === "upcoming" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    Upcoming Bookings
                  </h2>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                    </div>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      <span className="hidden sm:inline">Calendar View</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className={`p-4 rounded-xl border-l-4 ${
                      booking.status === 'confirmed' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                      booking.status === 'pending' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                      'border-red-500 bg-red-50 dark:bg-red-900/20'
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <h3 className="font-semibold">{booking.customer}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{booking.service}</p>
                          <div className="flex items-center gap-4 text-sm flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </span>
                            <span className="font-bold text-amber-600">₹{booking.amount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3 sm:mt-0 flex-wrap sm:flex-nowrap">
                          {booking.status === 'pending' && (
                            <>
                              <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                Confirm
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                                Cancel
                              </button>
                            </>
                          )}
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking History (Responsive Table with Scroll) */}
            {activeTab === "history" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <History className="w-5 h-5 text-amber-600" />
                    Booking History
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-sm sm:text-base`}>
                        <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap">Customer</th>
                        <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap">Service</th>
                        <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap">Date</th>
                        <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap">Amount</th>
                        <th className="text-left py-3 px-2 sm:px-4 whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                      {bookingHistory.map((booking) => (
                        <tr key={booking.id}>
                          <td className="py-3 px-2 sm:px-4 whitespace-nowrap">{booking.customer}</td>
                          <td className="py-3 px-2 sm:px-4 whitespace-nowrap">{booking.service}</td>
                          <td className="py-3 px-2 sm:px-4 whitespace-nowrap">{booking.date}</td>
                          <td className="py-3 px-2 sm:px-4 font-semibold whitespace-nowrap">₹{booking.amount}</td>
                          <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20' :
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/20' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Posts & Updates (Adjusted Post Area) */}
            {activeTab === "posts" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="mb-6">
                  <textarea
                    className={`w-full border rounded-xl p-4 resize-none text-sm ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    rows={4}
                    placeholder="Share an update about your services, promotions, or announcements..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-3">
                    <div className="flex gap-3">
                      <button className="p-2 text-gray-500 hover:text-amber-600 rounded-full bg-gray-50 dark:bg-gray-700/50">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-amber-600 rounded-full bg-gray-50 dark:bg-gray-700/50">
                        <Video className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handlePost}
                      className="px-6 py-2 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors w-full sm:w-auto text-sm"
                    >
                      Post Update
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Pinned Posts */}
                  {posts.filter(post => post.isPinned).map((post) => (
                    <div key={post.id} className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Pin className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-600">Pinned Post</span>
                      </div>
                      <p className="mb-3 text-sm">{post.content}</p>
                      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
                        <span>{post.timestamp.toLocaleDateString()}</span>
                        <div className="flex gap-3 sm:gap-4">
                          <button className="flex items-center gap-1 hover:text-amber-600">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-amber-600">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments.length}
                          </button>
                          <button
                            onClick={() => togglePinPost(post.id)}
                            className="text-amber-600 hover:text-amber-700"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Regular Posts */}
                  {posts.filter(post => !post.isPinned).map((post) => (
                    <div key={post.id} className={`p-4 rounded-xl border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <p className="mb-3 text-sm">{post.content}</p>
                      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
                        <span>{post.timestamp.toLocaleDateString()}</span>
                        <div className="flex gap-3 sm:gap-4">
                          <button className="flex items-center gap-1 hover:text-amber-600">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-amber-600">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments.length}
                          </button>
                          <button
                            onClick={() => togglePinPost(post.id)}
                            className="hover:text-amber-600"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings & Analytics (Responsive Grid and Charts) */}
            {activeTab === "earnings" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* Card 1 */}
                  <div className={`p-3 sm:p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                        <p className="text-lg sm:text-2xl font-bold">₹1,25,000</p>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className={`p-3 sm:p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                        <p className="text-lg sm:text-2xl font-bold">92</p>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className={`p-3 sm:p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</p>
                        <p className="text-lg sm:text-2xl font-bold">85</p>
                      </div>
                    </div>
                  </div>
                  {/* Card 4 */}
                  <div className={`p-3 sm:p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                        <p className="text-lg sm:text-2xl font-bold">7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Earnings Chart */}
                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className="font-semibold mb-4">Monthly Earnings</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={earningsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip contentStyle={{ background: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bookings by Service Chart */}
                  <div className={`p-4 rounded-xl border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className="font-semibold mb-4">Bookings by Service</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={earningsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip contentStyle={{ background: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }} />
                        <Bar dataKey="bookings" fill="#ec4899" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews & Ratings (Responsive Layout) */}
            {activeTab === "reviews" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  {/* Rating Summary */}
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Based on {reviews.length} reviews
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter */}
                  <div className="flex gap-3 w-full md:w-auto">
                    <select className={`w-full md:w-auto px-3 py-2 rounded-lg border text-sm ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      <option>All Reviews</option>
                      <option>Positive (4-5 stars)</option>
                      <option>Negative (1-3 stars)</option>
                      <option>Recent</option>
                    </select>
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className={`p-4 rounded-xl border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                        <div>
                          <h4 className="font-semibold">{review.customer}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 mt-2 sm:mt-0">{review.date}</span>
                      </div>
                      <p className="mb-3 text-sm">{review.comment}</p>
                      <div className="flex gap-3">
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Reply
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery (Responsive Grid) */}
            {activeTab === "gallery" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold">Media Gallery</h2>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <select className={`w-full sm:w-auto px-3 py-2 rounded-lg border text-sm ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      <option>All Categories</option>
                      <option>Decor</option>
                      <option>Catering</option>
                      <option>Puja Services</option>
                      <option>Events</option>
                    </select>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm w-full sm:w-auto"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Media
                    </button>
                  </div>
                </div>

                {/* Upload Area */}
                {selectedFiles.length > 0 && (
                  <div className="mb-6 p-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                    <div className="space-y-2 mb-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded-lg text-sm">
                          <div className="flex items-center gap-3 truncate">
                            <Image className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 flex-shrink-0" />
                            <div className="truncate">
                              <p className="font-medium truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 text-red-600 hover:text-red-700 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={uploadFiles}
                        disabled={isUploading}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                      >
                        {isUploading ? 'Uploading...' : 'Upload All'}
                      </button>
                      <button
                        onClick={() => setSelectedFiles([])}
                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Drag & Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                    darkMode 
                      ? 'border-gray-600 hover:border-amber-500' 
                      : 'border-gray-300 hover:border-amber-400'
                  }`}
                >
                  <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-base sm:text-lg font-semibold mb-2">Drag & drop files here</p>
                  <p className="text-gray-500 text-sm">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF, MP4 • Max 5MB per file</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                  {images.map((image) => (
                    <div key={image.id} className="relative group aspect-square">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="p-2 bg-white rounded-full m-1 hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white rounded-full m-1 hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Image Preview Modal (Responsive) */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="relative max-w-full max-h-full sm:max-w-4xl sm:max-h-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.name}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      style={{ maxHeight: '90vh' }}
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Availability (Responsive Grid) */}
            {activeTab === "availability" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold">Set Your Availability</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm w-full sm:w-auto">
                    <Calendar className="w-4 h-4" />
                    Sync with Google Calendar
                  </button>
                </div>

                {/* Days of the Week */}
                <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-6 text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center">
                      <div className={`font-semibold p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                        day === 'Sun' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 
                        'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  {[
                    "09:00 AM - 11:00 AM",
                    "11:00 AM - 01:00 PM", 
                    "02:00 PM - 04:00 PM",
                    "04:00 PM - 06:00 PM",
                    "06:00 PM - 08:00 PM"
                  ].map((slot) => (
                    <div key={slot} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3 text-sm sm:text-base">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span>{slot}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat/Messages (Responsive Layout) */}
            {activeTab === "chat" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex h-96">
                  {/* Conversations List (Hidden on Mobile, Visible on Desktop) */}
                  <div className={`hidden md:block w-1/3 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} pr-4 overflow-y-auto`}>
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      {['Ravi Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy'].map((name, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-semibold">{name}</div>
                          <div className="text-sm text-gray-500 truncate">Hello, I'm interested in your services...</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Area (Full Width on Mobile, 2/3 Width on Desktop) */}
                  <div className="flex-1 md:pl-4 flex flex-col">
                    <div className="border-b pb-3 mb-4">
                      <div className="font-semibold">Ravi Kumar</div>
                      <div className="text-sm text-gray-500">Online</div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {/* Incoming Message */}
                      <div className="flex justify-start">
                        <div className={`max-w-[75%] sm:max-w-xs p-3 rounded-xl text-sm ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <p>Hello! I'm interested in booking a Diwali puja</p>
                          <span className="text-xs text-gray-500 block mt-1">10:30 AM</span>
                        </div>
                      </div>
                      {/* Outgoing Message */}
                      <div className="flex justify-end">
                        <div className="max-w-[75%] sm:max-w-xs p-3 rounded-xl bg-amber-600 text-white text-sm">
                          <p>Hi Ravi! I'm available for Diwali puja. What date are you looking for?</p>
                          <span className="text-xs text-amber-200 block mt-1">10:31 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className={`flex-1 border rounded-lg p-3 text-sm ${
                          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                      <button className="px-4 sm:px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm flex-shrink-0">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Service Packages (Responsive Card Grid) */}
            {activeTab === "services" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold">Service Packages</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4" />
                    Add New Package
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {servicePackages.map((pkg) => (
                    <div key={pkg.id} className={`border rounded-xl p-4 ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-amber-600 mb-3">₹{pkg.price}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Duration: {pkg.duration}
                      </div>
                      <ul className="space-y-2 mb-4 text-sm">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm">
                          Edit
                        </button>
                        <button className="px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white text-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents (Responsive List) */}
            {activeTab === "documents" && (
              <div className={`rounded-2xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold">Documents & Verification</h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vendorData?.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                      vendorData?.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vendorData?.verificationStatus === 'verified' ? 'Verified' :
                       vendorData?.verificationStatus === 'pending' ? 'Under Review' : 'Not Verified'}
                    </span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm w-full sm:w-auto justify-center">
                      <Upload className="w-4 h-4" />
                      Upload Documents
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'PAN Card', status: 'verified', uploaded: true },
                    { name: 'Aadhaar Card', status: 'verified', uploaded: true },
                    { name: 'Business License', status: 'pending', uploaded: true },
                    { name: 'GST Certificate', status: 'not_uploaded', uploaded: false }
                  ].map((doc, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-gray-400 flex-shrink-0" />
                          <div>
                            <div className="font-semibold">{doc.name}</div>
                            <div className={`text-sm ${
                              doc.status === 'verified' ? 'text-green-600' :
                              doc.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {doc.status === 'verified' ? 'Verified' :
                               doc.status === 'pending' ? 'Under Review' : 'Not Uploaded'}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          {doc.uploaded ? (
                            <>
                              <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                Download
                              </button>
                              <button className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm dark:text-white dark:border-gray-600">
                                Replace
                              </button>
                            </>
                          ) : (
                            <button className="w-full px-3 py-1 bg-amber-600 text-white rounded-lg text-sm">
                              Upload
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}