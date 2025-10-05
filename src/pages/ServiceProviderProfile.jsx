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

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

import { motion, AnimatePresence } from "framer-motion";



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



  // Mock data

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



  // Translations

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



  // File upload handlers

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



  // Calculate average rating

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;



  return (

    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-amber-50 to-rose-50'} transition-colors`}>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">

        {/* Header Controls */}

        <div className="flex justify-between items-center mb-6">

          <div className="flex gap-4">

            <button

              onClick={() => setDarkMode(!darkMode)}

              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}

            >

              {darkMode ? <Bell className="w-5 h-5 text-amber-400" /> : <Bell className="w-5 h-5 text-gray-600" />}

            </button>

            <button

              onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}

              className={`p-2 rounded-full flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}

            >

              <Globe className="w-4 h-4" />

              <span className="text-sm">{language === 'english' ? 'हिंदी' : 'English'}</span>

            </button>

          </div>

        </div>



        {/* Profile Header */}

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

          

          <div className="px-6 pb-6 -mt-16">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

              {/* Profile Picture */}

              <div className="relative">

                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl border-4 border-white">

                  {vendorData?.name?.[0] || "SP"}

                </div>

                {vendorData?.verified && (

                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">

                    <CheckCircle className="w-5 h-5" />

                  </div>

                )}

              </div>



              {/* Profile Info */}

              <div className="flex-1">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  <div>

                    <h1 className="text-2xl font-bold">{vendorData?.name || "Service Provider"}</h1>

                    <div className="flex items-center gap-2 mt-1">

                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-800'}`}>

                        {vendorData?.vendorType || role}

                      </span>

                      {vendorData?.verified && (

                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">

                          <CheckCircle className="w-3 h-3" />

                          Verified

                        </span>

                      )}

                    </div>

                  </div>



                  {/* Rating Summary */}

                  <div className="text-center">

                    <div className="flex items-center gap-1 justify-center">

                      <Star className="w-5 h-5 text-yellow-400 fill-current" />

                      <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>

                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">

                      {reviews.length} reviews

                    </div>

                  </div>

                </div>



                {/* Contact Info */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                  <div className="flex items-center gap-2">

                    <MapPin className="w-4 h-4 text-gray-500" />

                    <span>{vendorData?.location || "Location not set"}</span>

                  </div>

                  <div className="flex items-center gap-2">

                    <Phone className="w-4 h-4 text-gray-500" />

                    <span>{vendorData?.phone || "Phone not set"}</span>

                  </div>

                  <div className="flex items-center gap-2">

                    <Mail className="w-4 h-4 text-gray-500" />

                    <span>{vendorData?.email || "Email not set"}</span>

                  </div>

                </div>



                {/* Social Links */}

                <div className="flex gap-3 mt-4">

                  <button className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:scale-110 transition-transform">

                    <Instagram className="w-4 h-4" />

                  </button>

                  <button className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">

                    <Youtube className="w-4 h-4" />

                  </button>

                  <button className="p-2 bg-green-500 text-white rounded-full hover:scale-110 transition-transform">

                    <Phone className="w-4 h-4" />

                  </button>

                  <button className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">

                    <Globe className="w-4 h-4" />

                  </button>

                </div>

              </div>

            </div>

          </div>

        </motion.div>



        {/* Sticky Tabs */}

        <div className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl mb-6 transition-colors`}>

          <div className="flex overflow-x-auto scrollbar-hide">

            {tabs.map((tab) => (

              <button

                key={tab.key}

                onClick={() => setActiveTab(tab.key)}

                className={`flex items-center gap-2 py-4 px-6 font-semibold whitespace-nowrap border-b-2 transition-colors ${

                  activeTab === tab.key

                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'

                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'

                }`}

              >

                <tab.icon className="w-4 h-4" />

                {tab.label}

              </button>

            ))}

          </div>

        </div>



        {/* Tab Content */}

        <AnimatePresence mode="wait">

          <motion.div

            key={activeTab}

            initial={{ opacity: 0, x: 20 }}

            animate={{ opacity: 1, x: 0 }}

            exit={{ opacity: 0, x: -20 }}

            transition={{ duration: 0.3 }}

          >

            {/* Upcoming Bookings */}

            {activeTab === "upcoming" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold flex items-center gap-2">

                    <Clock className="w-5 h-5 text-amber-600" />

                    Upcoming Bookings

                  </h2>

                  <div className="flex gap-3">

                    <div className="relative">

                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      <input

                        type="text"

                        placeholder="Search bookings..."

                        className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}

                      />

                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">

                      <Calendar className="w-4 h-4" />

                      Calendar View

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

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-semibold">{booking.customer}</h3>

                          <p className="text-sm text-gray-600 dark:text-gray-400">{booking.service}</p>

                          <div className="flex items-center gap-4 mt-2 text-sm">

                            <span className="flex items-center gap-1">

                              <Calendar className="w-4 h-4" />

                              {booking.date}

                            </span>

                            <span className="flex items-center gap-1">

                              <Clock className="w-4 h-4" />

                              {booking.time}

                            </span>

                            <span className="font-semibold">₹{booking.amount}</span>

                          </div>

                        </div>

                        <div className="flex gap-2">

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



            {/* Booking History */}

            {activeTab === "history" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold flex items-center gap-2">

                    <History className="w-5 h-5 text-amber-600" />

                    Booking History

                  </h2>

                  <div className="flex gap-3">

                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">

                      <Download className="w-4 h-4" />

                      Export CSV

                    </button>

                  </div>

                </div>



                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>

                        <th className="text-left py-3">Customer</th>

                        <th className="text-left py-3">Service</th>

                        <th className="text-left py-3">Date</th>

                        <th className="text-left py-3">Amount</th>

                        <th className="text-left py-3">Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      {bookingHistory.map((booking) => (

                        <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">

                          <td className="py-3">{booking.customer}</td>

                          <td className="py-3">{booking.service}</td>

                          <td className="py-3">{booking.date}</td>

                          <td className="py-3 font-semibold">₹{booking.amount}</td>

                          <td className="py-3">

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



            {/* Posts & Updates */}

            {activeTab === "posts" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="mb-6">

                  <textarea

                    className={`w-full border rounded-xl p-4 resize-none ${

                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'

                    }`}

                    rows={4}

                    placeholder="Share an update about your services, promotions, or announcements..."

                    value={newPost}

                    onChange={(e) => setNewPost(e.target.value)}

                  />

                  <div className="flex justify-between items-center mt-3">

                    <div className="flex gap-3">

                      <button className="p-2 text-gray-500 hover:text-amber-600">

                        <Image className="w-5 h-5" />

                      </button>

                      <button className="p-2 text-gray-500 hover:text-amber-600">

                        <Video className="w-5 h-5" />

                      </button>

                    </div>

                    <button

                      onClick={handlePost}

                      className="px-6 py-2 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"

                    >

                      Post Update

                    </button>

                  </div>

                </div>



                <div className="space-y-4">

                  {posts.filter(post => post.isPinned).map((post) => (

                    <div key={post.id} className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50 dark:bg-amber-900/20">

                      <div className="flex items-center gap-2 mb-2">

                        <Pin className="w-4 h-4 text-amber-600" />

                        <span className="text-sm font-semibold text-amber-600">Pinned Post</span>

                      </div>

                      <p className="mb-3">{post.content}</p>

                      <div className="flex justify-between items-center text-sm text-gray-500">

                        <span>{post.timestamp.toLocaleDateString()}</span>

                        <div className="flex gap-4">

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



                  {posts.filter(post => !post.isPinned).map((post) => (

                    <div key={post.id} className={`p-4 rounded-xl border ${

                      darkMode ? 'border-gray-700' : 'border-gray-200'

                    }`}>

                      <p className="mb-3">{post.content}</p>

                      <div className="flex justify-between items-center text-sm text-gray-500">

                        <span>{post.timestamp.toLocaleDateString()}</span>

                        <div className="flex gap-4">

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



            {/* Earnings & Analytics */}

            {activeTab === "earnings" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'

                  }`}>

                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-green-100 rounded-lg">

                        <DollarSign className="w-6 h-6 text-green-600" />

                      </div>

                      <div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>

                        <p className="text-2xl font-bold">₹1,25,000</p>

                      </div>

                    </div>

                  </div>



                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'

                  }`}>

                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-blue-100 rounded-lg">

                        <Calendar className="w-6 h-6 text-blue-600" />

                      </div>

                      <div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>

                        <p className="text-2xl font-bold">92</p>

                      </div>

                    </div>

                  </div>



                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'

                  }`}>

                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-green-100 rounded-lg">

                        <Check className="w-6 h-6 text-green-600" />

                      </div>

                      <div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>

                        <p className="text-2xl font-bold">85</p>

                      </div>

                    </div>

                  </div>



                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'

                  }`}>

                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-red-100 rounded-lg">

                        <XCircle className="w-6 h-6 text-red-600" />

                      </div>

                      <div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>

                        <p className="text-2xl font-bold">7</p>

                      </div>

                    </div>

                  </div>

                </div>



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700' : 'border-gray-200'

                  }`}>

                    <h3 className="font-semibold mb-4">Monthly Earnings</h3>

                    <ResponsiveContainer width="100%" height={300}>

                      <LineChart data={earningsData}>

                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />

                        <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />

                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />

                        <Tooltip />

                        <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} />

                      </LineChart>

                    </ResponsiveContainer>

                  </div>



                  <div className={`p-4 rounded-xl border ${

                    darkMode ? 'border-gray-700' : 'border-gray-200'

                  }`}>

                    <h3 className="font-semibold mb-4">Bookings by Service</h3>

                    <ResponsiveContainer width="100%" height={300}>

                      <BarChart data={earningsData}>

                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />

                        <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />

                        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />

                        <Tooltip />

                        <Bar dataKey="bookings" fill="#ec4899" />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>

              </div>

            )}



            {/* Reviews & Ratings */}

            {activeTab === "reviews" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

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



                  <div className="flex gap-3">

                    <select className={`px-3 py-2 rounded-lg border ${

                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'

                    }`}>

                      <option>All Reviews</option>

                      <option>Positive (4-5 stars)</option>

                      <option>Negative (1-3 stars)</option>

                      <option>Recent</option>

                    </select>

                  </div>

                </div>



                <div className="space-y-4">

                  {reviews.map((review) => (

                    <div key={review.id} className={`p-4 rounded-xl border ${

                      darkMode ? 'border-gray-700' : 'border-gray-200'

                    }`}>

                      <div className="flex justify-between items-start mb-3">

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

                        <span className="text-sm text-gray-500">{review.date}</span>

                      </div>

                      <p className="mb-3">{review.comment}</p>

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



            {/* Media Gallery */}

            {activeTab === "gallery" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">Media Gallery</h2>

                  <div className="flex gap-3">

                    <select className={`px-3 py-2 rounded-lg border ${

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

                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"

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

                        <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded-lg">

                          <div className="flex items-center gap-3">

                            <Image className="w-8 h-8 text-gray-400" />

                            <div>

                              <p className="font-medium">{file.name}</p>

                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                            </div>

                          </div>

                          <button

                            onClick={() => removeFile(index)}

                            className="p-1 text-red-600 hover:text-red-700"

                          >

                            <Trash2 className="w-4 h-4" />

                          </button>

                        </div>

                      ))}

                    </div>

                    <div className="flex gap-3">

                      <button

                        onClick={uploadFiles}

                        disabled={isUploading}

                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"

                      >

                        {isUploading ? 'Uploading...' : 'Upload All'}

                      </button>

                      <button

                        onClick={() => setSelectedFiles([])}

                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"

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

                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${

                    darkMode 

                      ? 'border-gray-600 hover:border-amber-500' 

                      : 'border-gray-300 hover:border-amber-400'

                  }`}

                >

                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />

                  <p className="text-lg font-semibold mb-2">Drag & drop files here</p>

                  <p className="text-gray-500">or click to browse</p>

                  <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, PDF, MP4 • Max 5MB per file</p>

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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                  {images.map((image) => (

                    <div key={image.id} className="relative group">

                      <img

                        src={image.url}

                        alt={image.name}

                        className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"

                        onClick={() => setSelectedImage(image)}

                      />

                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">

                        <button className="p-2 bg-white rounded-full m-1 hover:scale-110 transition-transform">

                          <Eye className="w-4 h-4" />

                        </button>

                        <button className="p-2 bg-white rounded-full m-1 hover:scale-110 transition-transform">

                          <Trash2 className="w-4 h-4" />

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}



            {/* Image Preview Modal */}

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

                    className="relative max-w-4xl max-h-full"

                    onClick={(e) => e.stopPropagation()}

                  >

                    <img

                      src={selectedImage.url}

                      alt={selectedImage.name}

                      className="max-w-full max-h-full object-contain rounded-lg"

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



            {/* Availability */}

            {activeTab === "availability" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">Set Your Availability</h2>

                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

                    <Calendar className="w-4 h-4" />

                    Sync with Google Calendar

                  </button>

                </div>



                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">

                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (

                    <div key={day} className="text-center">

                      <div className={`font-semibold p-3 rounded-lg ${

                        day === 'Sun' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 

                        'bg-gray-100 dark:bg-gray-700'

                      }`}>

                        {day}

                      </div>

                    </div>

                  ))}

                </div>



                <div className="space-y-3">

                  {[

                    "09:00 AM - 11:00 AM",

                    "11:00 AM - 01:00 PM", 

                    "02:00 PM - 04:00 PM",

                    "04:00 PM - 06:00 PM",

                    "06:00 PM - 08:00 PM"

                  ].map((slot) => (

                    <div key={slot} className="flex items-center justify-between p-3 border rounded-lg">

                      <div className="flex items-center gap-3">

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



            {/* Chat/Messages */}

            {activeTab === "chat" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex h-96">

                  {/* Conversations List */}

                  <div className={`w-1/3 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} pr-4`}>

                    <div className="relative mb-4">

                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      <input

                        type="text"

                        placeholder="Search conversations..."

                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${

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



                  {/* Chat Area */}

                  <div className="flex-1 pl-4 flex flex-col">

                    <div className="border-b pb-3 mb-4">

                      <div className="font-semibold">Ravi Kumar</div>

                      <div className="text-sm text-gray-500">Online</div>

                    </div>



                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">

                      <div className="flex justify-start">

                        <div className={`max-w-xs p-3 rounded-xl ${

                          darkMode ? 'bg-gray-700' : 'bg-gray-100'

                        }`}>

                          <p>Hello! I'm interested in booking a Diwali puja</p>

                          <span className="text-xs text-gray-500 block mt-1">10:30 AM</span>

                        </div>

                      </div>

                      <div className="flex justify-end">

                        <div className="max-w-xs p-3 rounded-xl bg-amber-600 text-white">

                          <p>Hi Ravi! I'm available for Diwali puja. What date are you looking for?</p>

                          <span className="text-xs text-amber-200 block mt-1">10:31 AM</span>

                        </div>

                      </div>

                    </div>



                    <div className="flex gap-3">

                      <input

                        type="text"

                        placeholder="Type your message..."

                        className={`flex-1 border rounded-lg p-3 ${

                          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'

                        }`}

                      />

                      <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

                        Send

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )}



            {/* Service Packages */}

            {activeTab === "services" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">Service Packages</h2>

                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

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

                      <ul className="space-y-2 mb-4">

                        {pkg.includes.map((item, index) => (

                          <li key={index} className="flex items-center gap-2 text-sm">

                            <Check className="w-4 h-4 text-green-500" />

                            {item}

                          </li>

                        ))}

                      </ul>

                      <div className="flex gap-2">

                        <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

                          Edit

                        </button>

                        <button className="px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white">

                          <Trash2 className="w-4 h-4" />

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}



            {/* Documents */}

            {activeTab === "documents" && (

              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">Documents & Verification</h2>

                  <div className="flex items-center gap-2">

                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${

                      vendorData?.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :

                      vendorData?.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :

                      'bg-red-100 text-red-800'

                    }`}>

                      {vendorData?.verificationStatus === 'verified' ? 'Verified' :

                       vendorData?.verificationStatus === 'pending' ? 'Under Review' : 'Not Verified'}

                    </span>

                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">

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

                      <div className="flex justify-between items-center">

                        <div className="flex items-center gap-3">

                          <FileText className="w-8 h-8 text-gray-400" />

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

                        {doc.uploaded ? (

                          <div className="flex gap-2">

                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">

                              Download

                            </button>

                            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">

                              Replace

                            </button>

                          </div>

                        ) : (

                          <button className="px-3 py-1 bg-amber-600 text-white rounded-lg text-sm">

                            Upload

                          </button>

                        )}

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