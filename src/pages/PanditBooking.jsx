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
  MessageSquare,
  Shield,
  Award,
  PhoneCall,
  FileText,
  User,
  Sparkles,
  IndianRupee,
  Clock3,
  Eye,
  RotateCcw,
  Home,
  Baby,
  Heart as HeartIcon,
  Users,
  Calendar as CalendarIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Temple icon replacement - using Sparkles as fallback
const Temple = Sparkles;

// --- START: SHARED COMPONENTS & UTILITIES ---

// WhatsApp Integration Function
const sendWhatsAppMessage = (bookingDetails, puja) => {
  const {
    service,
    date,
    time,
    address,
    includeSamagri,
    additionalNotes,
    bookingId
  } = bookingDetails;

  const totalAmount = puja.price + (includeSamagri ? puja.samagriPrice : 0);
  
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const message = `🪷 *Puja Booking Confirmed* 🪷

📅 *Booking Details:*
• *Puja Type:* ${puja.name}
• *Service:* ${service}
• *Date:* ${formattedDate}
• *Time:* ${time}
• *Address:* ${address}

💰 *Payment Summary:*
• Puja Charges: ₹${puja.price}
• Samagri Kit: ${includeSamagri ? `₹${puja.samagriPrice}` : 'Not Included'}
• *Total Amount:* ₹${totalAmount}

📋 *Additional Notes:* ${additionalNotes || 'None'}

🆔 *Booking ID:* ${bookingId}

_We wish you a blessed and prosperous puja!_
_For any queries, contact support._`;

  const encodedMessage = encodeURIComponent(message);
  
  const supportNumber = "916201486202"; 
  const whatsappUrl = `https://wa.me/${supportNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

// Toast Component
const Toast = ({ message, type = "success", onClose, bookingId, bookingDetails, puja }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleResendWhatsApp = () => {
    if (bookingDetails && puja) {
      sendWhatsAppMessage(bookingDetails, puja);
    }
  };

  const Icon = type === "success" ? CheckCircle : X;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 p-6 rounded-xl shadow-2xl ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } text-white flex items-start gap-4 min-w-96 max-w-md`}
    >
      <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-bold text-lg">{message}</p>
        {bookingId && (
          <p className="text-sm opacity-90 mt-1">
            Booking ID: <span className="font-mono font-bold">{bookingId}</span>
          </p>
        )}
        <p className="text-sm opacity-90 mt-2">
          Booking details sent to your WhatsApp
        </p>
        <div className="flex gap-3 mt-3">
          <button 
            onClick={handleResendWhatsApp}
            className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Resend WhatsApp
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
// 🌸 Premium Skeleton Loading – Sanskaraa Style
const PujaCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg p-6">
      
      {/* 🔮 Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Wishlist / Icon */}
        <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Description */}
      <div className="space-y-3 mb-5">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};


// 🛡️ Premium Trust Badges – Sanskaraa Style
const TrustBadges = () => {
  return (
    <div className="mt-10 border-t border-amber-200 pt-8">
      <div className="flex flex-wrap justify-center gap-6">

        {/* Badge 1 */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-amber-900">
              Verified Pujas
            </div>
            <div className="text-xs text-amber-600">
              Authentic & Traditional
            </div>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-amber-900">
              Quality Guarantee
            </div>
            <div className="text-xs text-amber-600">
              Satisfaction Assured
            </div>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
            <PhoneCall className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-amber-900">
              24/7 Support
            </div>
            <div className="text-xs text-amber-600">
              Always Here to Help
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// 🌸 Premium Puja Detail Modal – Sanskaraa
const PujaDetailModal = ({ puja, isOpen, onClose, onBookNow }) => {
  if (!isOpen || !puja) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Ghar ke Sanskaar": return <Home className="w-5 h-5" />;
      case "Bacchon ke Sanskaar": return <Baby className="w-5 h-5" />;
      case "Vivah Sanskar": return <HeartIcon className="w-5 h-5" />;
      case "Pitrakarya": return <Users className="w-5 h-5" />;
      case "Festival Pujas": return <CalendarIcon className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{puja.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full text-sm">
                {getCategoryIcon(puja.category)}
                <span className="text-amber-700 font-medium">{puja.category}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                {puja.rating} ({puja.reviews})
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image + Trust */}
            <div className="flex items-center gap-5">
              <img
                src={puja.img}
                alt={puja.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-amber-200"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Shield className="w-4 h-4" /> Verified Puja
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Award className="w-4 h-4" /> Experienced Pandit
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <Clock className="w-4 h-4" /> {puja.duration || "2–3 hours"}
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h4 className="font-semibold text-gray-900 mb-2">About this Puja</h4>
              <p className="text-gray-700 leading-relaxed">{puja.description}</p>
            </section>

            {/* Benefits */}
            <section>
              <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {puja.benefits.map((b, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT – Sticky Booking */}
          <div className="lg:sticky lg:top-6 space-y-5">
            <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-5">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-amber-700">
                  ₹{puja.price}
                </div>
                <div className="text-xs text-amber-600">Per Ceremony</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Samagri</span>
                  <span className="font-semibold">₹{puja.samagriPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-semibold">{puja.completedPujas}+</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onBookNow(puja);
                  onClose();
                }}
                className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Book This Puja
              </button>
            </div>

            {/* Help */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-semibold mb-2">Need Help?</p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    window.open("https://wa.me/916201486202", "_blank")
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Blessing */}
        <div className="text-center text-xs text-amber-700 italic pb-4">
          “Ārambh se Sampūrṇ tak – Sanskaraa aapke saath”
        </div>
      </motion.div>
    </div>
  );
};


// 🧾 Premium Booking Summary Panel – Sanskaraa
const BookingSummaryPanel = ({ puja, bookingData, currentStep }) => {
  const totalAmount =
    puja.price + (bookingData.includeSamagri ? puja.samagriPrice : 0);

  const formattedDate = bookingData.date
    ? new Date(bookingData.date).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={`rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm ${
        currentStep < 4 ? "sticky top-4" : ""
      }`}
    >
      {/* Header */}
      <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
        <IndianRupee className="w-5 h-5 text-amber-700" />
        Booking Summary
      </h4>

      {/* Info */}
      <div className="space-y-3 text-sm">
        {/* Puja */}
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Puja</span>
          <span className="font-semibold text-gray-900">
            {puja.name}
          </span>
        </div>

        {/* Service */}
        <div className="flex justify-between">
          <span className="text-gray-600">Service</span>
          <span className="font-semibold">{bookingData.service}</span>
        </div>

        {/* Date & Time */}
        <div className="flex justify-between">
          <span className="text-gray-600">Date & Time</span>
          <span
            className={`font-semibold text-right ${
              bookingData.date && bookingData.time
                ? "text-gray-900"
                : "text-red-500"
            }`}
          >
            {bookingData.date && bookingData.time
              ? `${formattedDate} • ${bookingData.time}`
              : "Select Date & Time"}
          </span>
        </div>

        {/* Address */}
        <div className="flex justify-between">
          <span className="text-gray-600">Address</span>
          <span
            className={`font-semibold text-right max-w-[60%] ${
              bookingData.address
                ? "line-clamp-2 text-gray-900"
                : "text-red-500"
            }`}
          >
            {bookingData.address || "Enter Address"}
          </span>
        </div>

        {/* Trust */}
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-xl mt-2">
          <Shield className="w-4 h-4" />
          Verified Pandit • Authentic Rituals
        </div>

        {/* Price */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Puja Charges</span>
            <span>₹{puja.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Samagri Kit</span>
            <span
              className={`font-medium ${
                bookingData.includeSamagri
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {bookingData.includeSamagri
                ? `+ ₹${puja.samagriPrice}`
                : "Not Included"}
            </span>
          </div>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center pt-3 border-t border-amber-300">
          <span className="text-gray-900 font-bold text-base">TOTAL</span>
          <span className="text-amber-700 font-bold text-xl">
            ₹{totalAmount}
          </span>
        </div>
      </div>

      {/* Footer Blessing */}
      <p className="text-xs text-center text-amber-700 italic mt-4">
        “Secure • Transparent • Traditional”
      </p>
    </div>
  );
};

// --- END: SHARED COMPONENTS & UTILITIES ---

export default function PujaBooking() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ 
    service: "", 
    category: "", 
    minPrice: 700,
    maxPrice: 40000, // ✅ FIXED: Increased to show all pujas
    minRating: 0,
    availability: ""
  });
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [selectedPujaDetail, setSelectedPujaDetail] = useState(null);
  const [showPujaDetail, setShowPujaDetail] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationError, setValidationError] = useState(""); 

  // Format price for display with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Complete Puja Data with ALL 39 pujas
  const pujaList = useMemo(() => [
    // 🏡 Ghar ke Sanskaar (1-10)
    {
      id: 1,
      name: "Griha Pravesh / गृह प्रवेश",
      price: 5100,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.8,
      reviews: 45,
      description: "Sacred house warming ceremony to bring peace, prosperity and positive energy to your new home.",
      samagriPrice: 300,
      completedPujas: 250,
      duration: "1 Day",
      pandit: 2,
      requirements: "Kalash, Coconut, Flowers, Fruits",
      benefits: ["Peace & Prosperity", "Positive Energy", "Family Harmony"],
    },
    {
      id: 2,
      name: "Navagraha Shanti / नवग्रह शांति",
      price: 1500,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.7,
      reviews: 28,
      description: "Planetary peace ceremony to balance the nine planets and remove obstacles.",
      samagriPrice: 500,
      completedPujas: 180,
      duration: "1 Day",
      pandit: 1,
      requirements: "9 Grains, 9 Flowers, Havan Samagri",
      benefits: ["Planetary Harmony", "Obstacle Removal", "Success in Endeavors"],
    },
    {
      id: 3,
      name: "Sundarkand Path / सुंदरकांड पाठ",
      price: 15000,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.5,
      reviews: 38,
      description: "Recitation of Sundarkand for success, protection and removal of obstacles.",
      samagriPrice: 250,
      completedPujas: 180,
      duration: "1 Day",
      pandit: 3,
      requirements: "Dj Box, Mic",
      benefits: ["Music setup", "PanditJi", "Singer"],
    },
    {
      id: 4,
      name: "Ramayan Path / रामायण पाठ",
      price: 21000,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.6,
      reviews: 42,
      description: "Complete recitation of Ramayana for peace, prosperity and family harmony.",
      samagriPrice: 300,
      completedPujas: 95,
      duration: "7 Days",
      pandit: 4,
      requirements: "Dj Box, Mic",
      benefits: ["Music setup", "PanditJi", "Singer"],
    },
    {
      id: 5,
      name: "Satyanarayan Katha / सत्यनारायण कथा",
      price: 1500,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.9,
      reviews: 67,
      description: "Divine storytelling ceremony for peace, prosperity and fulfillment of wishes.",
      samagriPrice: 350,
      completedPujas: 320,
      duration: "2.5 Hours",
      pandit: 2,
      requirements: "Panchamrit, Fruits, Flowers",
      benefits: ["Wish Fulfillment", "Family Unity", "Divine Blessings"],
    },
    {
      id: 6,
      name: "Lakshmi Puja / लक्ष्मी पूजा",
      price: 1500,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.7,
      reviews: 89,
      description: "Goddess Lakshmi worship for wealth, prosperity and abundance.",
      samagriPrice: 200,
      completedPujas: 450,
      duration: "1.5 Hours",
      pandit: 1,
      requirements: "Lakshmi Idol, Coins, Flowers",
      benefits: ["Wealth & Prosperity", "Financial Stability", "Abundance"],
    },
    {
      id: 7,
      name: "Ganesh Puja / गणेश पूजा",
      price: 1500,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.8,
      reviews: 76,
      description: "Lord Ganesha worship for wisdom, success and obstacle removal.",
      samagriPrice: 250,
      completedPujas: 380,
      duration: "1.5 Hours",
      pandit: 1,
      requirements: "Ganesh Idol, Modak, Flowers",
      benefits: ["Wisdom & Knowledge", "Success in Endeavors", "Obstacle Removal"],
    },
    {
      id: 8,
      name: "Navratri Puja / नवरात्रि पूजा",
      price: 5100,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.6,
      reviews: 54,
      description: "Powerful Durga Saptashati recitation for protection and strength.",
      samagriPrice: 300,
      completedPujas: 120,
      duration: "3 Hours",
      pandit: 2,
      requirements: "Durga Saptashati Book, Red Cloth",
      benefits: ["Divine Protection", "Strength & Courage", "Negative Energy Removal"],
    },
    {
      id: 9,
      name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ",
      price: 1500,
      category: "Ghar ke Sanskaar",
      img: "images/grihprewespan01.png",
      rating: 4.9,
      reviews: 210,
      description: "Hanuman Chalisa recitation for protection, strength and courage.",
      samagriPrice: 150,
      completedPujas: 680,
      duration: "2 Hours",
      pandit: 1,
      requirements: "Hanuman Chalisa Book, Sindoor",
      benefits: ["Protection from Evil", "Strength & Courage", "Quick Results"],
    },

    // 👶 Bacchon ke Sanskaar (10–14)
    {
      id: 10,
      name: "Annaprashan / अन्नप्राशन",
      price: 1100,
      category: "Bacchon ke Sanskaar",
      img: "images/bachhosans02.png",
      rating: 4.7,
      reviews: 38,
      description: "First rice eating ceremony for babies with traditional rituals.",
      samagriPrice: 250,
      completedPujas: 95,
      duration: "1.5 Hours",
      requirements: "Rice, Honey, Ghee, Fruits",
      benefits: ["Good Health", "Proper Growth", "Divine Blessings"],
    },
    {
      id: 11,
      name: "Mundan Sanskar / मुंडन संस्कार",
      price: 1000,
      category: "Bacchon ke Sanskaar",
      img: "images/bachhosans02.png",
      rating: 4.6,
      reviews: 42,
      description: "First hair cutting ceremony for children with Vedic rituals.",
      samagriPrice: 200,
      completedPujas: 78,
      duration: "2 Hours",
      requirements: "Scissors, Bowl, Flowers",
      benefits: ["Purification", "Healthy Growth", "Divine Protection"],
    },
    {
      id: 12,
      name: "Janamdin Puja / जन्मदिन पूजा",
      price: 900,
      category: "Bacchon ke Sanskaar",
      img: "images/bachhosans02.png",
      rating: 4.8,
      reviews: 67,
      description: "Special birthday puja for children's health and prosperity.",
      samagriPrice: 180,
      completedPujas: 210,
      duration: "1 Hour",
      requirements: "Birth Details, Cake, Flowers",
      benefits: ["Good Health", "Long Life", "Prosperity"],
    },

    // 💑 Vivah Sanskar (13–22)
    {
      id: 13,
      name: "Vivah / विवाह",
      price: 21000,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.9,
      reviews: 89,
      description: "Complete wedding ceremony with all Vedic rituals and mantras.",
      samagriPrice: 800,
      completedPujas: 95,
      duration: "6–8 Hours",
      requirements: "Wedding Mandap, Sacred Fire Setup",
      benefits: ["Complete Ceremony", "All Rituals", "Family Unity"],
    },
    {
      id: 14,
      name: "Roka / रोका समारोह",
      price: 2000,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.7,
      reviews: 34,
      description: "Engagement ceremony with traditional rituals and blessings.",
      samagriPrice: 500,
      completedPujas: 45,
      duration: "2–3 Hours",
      requirements: "Ring, Sweets, Flowers",
      benefits: ["Official Commitment", "Family Approval", "Divine Blessings"],
    },
    {
      id: 15,
      name: "Sagai / सगाई",
      price: 2100,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.6,
      reviews: 28,
      description: "Formal engagement ceremony with exchange of gifts and blessings.",
      samagriPrice: 400,
      completedPujas: 52,
      duration: "2 Hours",
      requirements: "Rings, Sweets, Garland",
      benefits: ["Formal Commitment", "Family Bonding", "Divine Approval"],
    },
    {
      id: 16,
      name: "Haldi / हल्दी रस्म",
      price: 2100,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.8,
      reviews: 76,
      description: "Traditional turmeric ceremony for purification and glow.",
      samagriPrice: 200,
      completedPujas: 120,
      duration: "1.5 Hours",
      requirements: "Turmeric, Oil, Flowers",
      benefits: ["Purification", "Beautiful Glow", "Auspicious Beginning"],
    },
    {
      id: 17,
      name: "Mehendi / मेहंदी",
      price: 2100,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.7,
      reviews: 63,
      description: "Henna ceremony with traditional songs and rituals.",
      samagriPrice: 300,
      completedPujas: 88,
      duration: "3–4 Hours",
      requirements: "Henna, Decorations, Music",
      benefits: ["Beauty Enhancement", "Joyful Celebration", "Traditional Art"],
    },
    {
      id: 18,
      name: "Reception / रिसेप्शन",
      price: 1100,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.8,
      reviews: 58,
      description: "Grand reception ceremony to welcome the newly married couple.",
      samagriPrice: 600,
      completedPujas: 42,
      duration: "3–4 Hours",
      requirements: "Stage, Decorations, Sound System",
      benefits: ["Grand Welcome", "Social Celebration", "Blessings Gathering"],
    },
    {
      id: 19,
      name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा",
      price: 2100,
      category: "Vivah Sanskar",
      img: "images/vivahsans03.png",
      rating: 4.7,
      reviews: 45,
      description: "Special puja to celebrate wedding anniversary with blessings.",
      samagriPrice: 350,
      completedPujas: 78,
      duration: "1.5 Hours",
      requirements: "Couple's Photo, Flowers, Sweets",
      benefits: ["Marital Bliss", "Long-lasting Relationship", "Divine Blessings"],
    },

    // ⚰ Pitrakarya (20–23)
    {
      id: 20,
      name: "Antim Sanskar / अंतिम संस्कार",
      price: 15000,
      category: "Pitrakarya",
      img: "images/pitrkry01.png",
      rating: 4.9,
      reviews: 34,
      description: "Final rites ceremony performed with Vedic rituals and mantras.",
      samagriPrice: 600,
      completedPujas: 56,
      duration: "3–4 Hours",
      requirements: "Sacred Fire Setup, Pinda, Flowers",
      benefits: ["Soul Liberation", "Family Closure", "Peaceful Transition"],
    },
    {
      id: 21,
      name: "Pind Daan / पिंडदान",
      price: 2100,
      category: "Pitrakarya",
      img: "images/pitrkry01.png",
      rating: 4.7,
      reviews: 28,
      description: "Offering rituals for departed ancestors for their peace.",
      samagriPrice: 500,
      completedPujas: 42,
      duration: "2–3 Hours",
      requirements: "Rice Balls, Black Sesame, Water",
      benefits: ["Ancestors Peace", "Family Blessings", "Karma Cleansing"],
    },
    {
      id: 22,
      name: "Shraddh / श्राद्ध पूजा",
      price: 2100,
      category: "Pitrakarya",
      img: "images/pitrkry01.png",
      rating: 4.6,
      reviews: 39,
      description: "Annual ceremony to pay homage to departed ancestors.",
      samagriPrice: 400,
      completedPujas: 67,
      duration: "2 Hours",
      requirements: "Ancestors Details, Rice, Flowers",
      benefits: ["Ancestors Blessings", "Family Protection", "Peace to Souls"],
    },
    {
      id: 23,
      name: "Tehravin / तेरहवीं संस्कार",
      price: 1200,
      category: "Pitrakarya",
      img: "images/pitrkry01.png",
      rating: 4.7,
      reviews: 35,
      description: "Thirteenth day ceremony after departure for family peace.",
      samagriPrice: 350,
      completedPujas: 48,
      duration: "1.5 Hours",
      requirements: "Family Members, Pinda, Holy Water",
      benefits: ["Family Peace", "Completion of Mourning", "New Beginning"],
    },

    // 📿 Festival Pujas (24–30)
    {
      id: 24,
      name: "Karwa Chauth Puja / करवा चौथ पूजा",
      price: 1500,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.8,
      reviews: 156,
      description: "Special puja for married women observing Karwa Chauth fast for husband's long life.",
      samagriPrice: 250,
      completedPujas: 340,
      duration: "1 Hour",
      requirements: "Karwa, Matthi, Sindoor, Story Book",
      benefits: ["Husband's Long Life", "Marital Bliss", "Family Happiness"],
    },
    {
      id: 25,
      name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा",
      price: 2100,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.9,
      reviews: 234,
      description: "Special Diwali puja for wealth, prosperity and removal of obstacles.",
      samagriPrice: 400,
      completedPujas: 450,
      duration: "2 Hours",
      requirements: "Lakshmi-Ganesh Idols, Diyas, Sweets",
      benefits: ["Wealth & Prosperity", "Obstacle Removal", "Auspicious Beginning"],
    },
    {
      id: 26,
      name: "Navratri Puja / नवरात्रि पूजा",
      price: 11000,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.8,
      reviews: 195,
      description: "Nine nights goddess worship for power, protection and blessings.",
      samagriPrice: 350,
      completedPujas: 320,
      duration: "9 Days",
      requirements: "Goddess Idol, Kalash, Flowers",
      benefits: ["Divine Power", "Protection from Evil", "Spiritual Growth"],
    },
    {
      id: 27,
      name: "Saraswati Puja / सरस्वती पूजा",
      price: 2100,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.7,
      reviews: 145,
      description: "Goddess of knowledge worship for wisdom, education and arts.",
      samagriPrice: 300,
      completedPujas: 230,
      duration: "1.5 Hours",
      requirements: "Saraswati Idol, Books, Musical Instruments",
      benefits: ["Knowledge & Wisdom", "Academic Success", "Creative Skills"],
    },
    {
      id: 28,
      name: "Chhath Puja / छठ पूजा",
      price: 2500,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.8,
      reviews: 189,
      description: "Ancient sun god worship for health, prosperity and offspring.",
      samagriPrice: 350,
      completedPujas: 270,
      duration: "4 Days",
      requirements: "Bamboo Basket, Fruits, Sugarcane",
      benefits: ["Health & Longevity", "Progeny Blessings", "Family Prosperity"],
    },
    {
      id: 29,
      name: "Janmashtami Puja / जन्माष्टमी पूजा",
      price: 1100,
      category: "Festival Pujas",
      img: "images/karwachauth.png",
      rating: 4.9,
      reviews: 278,
      description: "Lord Krishna birth celebration with midnight puja and festivities.",
      samagriPrice: 350,
      completedPujas: 420,
      duration: "2 Hours",
      requirements: "Krishna Idol, Butter, Flute",
      benefits: ["Divine Love", "Joy & Happiness", "Spiritual Bliss"],
    },

    // 🛕 Temple / Special Pujas (30–36)
    {
      id: 30,
      name: "Rudrabhishek / रुद्राभिषेक (Normal)",
      price: 5100,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.9,
      reviews: 156,
      description: "Powerful Shiva abhishekam for health, wealth and spiritual growth.",
      samagriPrice: 600,
      completedPujas: 120,
      duration: "3 Hours",
      requirements: "Shiva Lingam, Milk, Honey, Bilva Leaves",
      benefits: ["Health & Wealth", "Spiritual Growth", "Negative Energy Removal"],
    },
    {
      id: 31,
      name: "Rudrabhishek / रुद्राभिषेक (Sangitmaye)",
      price: 11000,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.9,
      reviews: 156,
      description: "Musical Rudrabhishek with bhajans and devotional chanting for divine energy.",
      samagriPrice: 600,
      completedPujas: 120,
      duration: "3 Hours",
      requirements: "Shiva Lingam, Milk, Honey, Bilva Leaves",
      benefits: ["Spiritual Bliss", "Musical Devotion", "Divine Blessings"],
    },
    {
      id: 32,
      name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप",
      price: 35000,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.9,
      reviews: 134,
      description: "Powerful mantra chanting for longevity and freedom from diseases.",
      samagriPrice: 15000,
      completedPujas: 89,
      duration: "5 Days",
      requirements: "Specific Yantra, Rudraksha Mala, Sacred Fire",
      benefits: ["Longevity", "Disease Freedom", "Death Fear Removal"],
    },
    {
      id: 33,
      name: "Bhumi Pujan / भूमि पूजन",
      price: 1500,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.8,
      reviews: 98,
      description: "Land worship ceremony before construction for prosperity.",
      samagriPrice: 500,
      completedPujas: 76,
      duration: "2.5 Hours",
      requirements: "Land Deed, Kalash, Grains",
      benefits: ["Construction Safety", "Property Prosperity", "Positive Energy"],
    },
    {
      id: 34,
      name: "Upanayan Sanskar / उपनयन संस्कार",
      price: 1700,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.8,
      reviews: 67,
      description: "Sacred thread ceremony for spiritual initiation of young boys.",
      samagriPrice: 400,
      completedPujas: 53,
      duration: "2 Hours",
      requirements: "Sacred Thread, Deer Skin, Guru Dakshina",
      benefits: ["Spiritual Initiation", "Knowledge Beginning", "Cultural Heritage"],
    },
    {
      id: 35,
      name: "Kalash Sthapana / कलश स्थापना",
      price: 2500,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.7,
      reviews: 89,
      description: "Sacred pot installation ceremony for positive energy flow.",
      samagriPrice: 350,
      completedPujas: 78,
      duration: "1.5 Hours",
      requirements: "Brass Pot, Coconut, Mango Leaves",
      benefits: ["Positive Energy", "Divine Presence", "Ceremony Foundation"],
    },
    {
      id: 36,
      name: "Ayushya Homam / आयुष्य हवन",
      price: 1500,
      category: "Temple / Special Pujas",
      img: "images/temple.png",
      rating: 4.8,
      reviews: 102,
      description: "Long life fire ritual for health, longevity and well-being.",
      samagriPrice: 400,
      completedPujas: 95,
      duration: "2 Hours",
      requirements: "Sacred Fire Setup, Ghee, Medicinal Herbs",
      benefits: ["Long Life", "Good Health", "Disease Protection"],
    },

    // 🧾 Others / Custom Options (37–39)
    {
      id: 37,
      name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज",
      price: 1500,
      category: "Others / Custom Options",
      img: "images/temple.png",
      rating: 4.8,
      reviews: 23,
      description: "Customized puja package tailored to your specific needs and requirements.",
      samagriPrice: 800,
      completedPujas: 35,
      duration: "1 Day",
      requirements: "Specific Requirements Discussed",
      benefits: ["Personalized Solution", "Flexible Timing", "Custom Rituals"],
    },
    {
      id: 38,
      name: "Online Puja Seva / ऑनलाइन पूजा सेवा",
      price: 1100,
      category: "Others / Custom Options",
      img: "images/temple.png",
      rating: 4.7,
      reviews: 45,
      description: "Live online puja service for devotees who cannot visit physically.",
      samagriPrice: 500,
      completedPujas: 68,
      duration: "1 Hour",
      requirements: "Stable Internet, Webcam",
      benefits: ["Remote Participation", "Live Darshan", "Convenient"],
    },
    {
      id: 39,
      name: "Customized Event Plan / कस्टम इवेंट प्लान",
      price: 1500,
      category: "Others / Custom Options",
      img: "images/temple.png",
      rating: 4.9,
      reviews: 32,
      description: "Complete event planning and management for special occasions.",
      samagriPrice: 1000,
      completedPujas: 28,
      duration: "Per Day Basis",
      requirements: "Event Details, Budget, Guest Count",
      benefits: ["Stress-free Planning", "Professional Management", "Memorable Event"],
    },
  ], []);

  // Generate time slots from 5:00 AM to 9:00 PM
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 5; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const time12hr = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        timeSlots.push(time12hr);
      }
    }
    return timeSlots;
  };

  const allTimeSlots = generateTimeSlots();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("pujaFavorites");
    const savedRecentlyViewed = localStorage.getItem("recentlyViewedPujas");
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    
    if (!localStorage.getItem("pujaBookings")) {
      localStorage.setItem('pujaBookings', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pujaFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recentlyViewedPujas", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const allServices = useMemo(() => [...new Set(pujaList.map(p => p.name))], [pujaList]);
  const allCategories = useMemo(() => [...new Set(pujaList.map(p => p.category))], [pujaList]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleFavorite = (pujaId) => {
    setFavorites(prev => 
      prev.includes(pujaId) 
        ? prev.filter(id => id !== pujaId)
        : [...prev, pujaId]
    );
  };

  const filteredPujas = useMemo(() => {
    return pujaList.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = (
        (!filters.service || p.name === filters.service) &&
        (!filters.category || p.category === filters.category) &&
        p.price >= filters.minPrice &&
        p.price <= filters.maxPrice &&
        p.rating >= filters.minRating
      );

      return matchesSearch && matchesFilters;
    });
  }, [pujaList, filters, searchQuery]);

  const sortedPujas = useMemo(() => {
    return [...filteredPujas].sort((a, b) => {
      switch(sortBy) {
        case "rating": return b.rating - a.rating;
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "reviews": return b.reviews - a.reviews;
        default: return 0;
      }
    });
  }, [filteredPujas, sortBy]);

  const handleBookNow = (puja) => {
    setSelectedPuja(puja);
    setBookingStep(1);
    setBookingData({ 
      pujaId: puja.id, 
      service: puja.name, 
      date: "", 
      time: "", 
      address: "",
      includeSamagri: false,
      additionalNotes: ""
    });
    setValidationError(""); 

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== puja.id);
      return [puja, ...filtered].slice(0, 4);
    });
  };

  const handleViewDetails = (puja) => {
    setSelectedPujaDetail(puja);
    setShowPujaDetail(true);
    
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== puja.id);
      return [puja, ...filtered].slice(0, 4);
    });
  };

  const handleBookingNext = () => {
    setValidationError(""); 

    if (bookingStep === 2) {
      if (!bookingData.date || !bookingData.time) {
        setValidationError("Please select both date and time for your puja.");
        return;
      }
    }
    if (bookingStep === 3) {
      if (!bookingData.address || bookingData.address.trim().length < 10) {
        setValidationError("Please enter your complete address (at least 10 characters).");
        return;
      }
    }
    setBookingStep(prev => prev + 1);
  };

  const handleBookingBack = () => {
    setValidationError(""); 
    setBookingStep(prev => prev - 1);
  };

  const handleBookingComplete = () => {
    const newBookingId = `BK${Date.now().toString().slice(-8)}`;
    setBookingId(newBookingId);
    
    const completeBookingData = {
      ...bookingData,
      bookingId: newBookingId
    };

    const bookings = JSON.parse(localStorage.getItem('pujaBookings') || '[]');
    const selectedPujaData = pujaList.find(p => p.id === selectedPuja.id);
    const newBooking = {
      id: newBookingId,
      puja: selectedPuja,
      ...completeBookingData,
      totalAmount: selectedPujaData.price + (bookingData.includeSamagri ? selectedPujaData.samagriPrice : 0),
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };
    
    localStorage.setItem('pujaBookings', JSON.stringify([newBooking, ...bookings]));
    
    sendWhatsAppMessage(completeBookingData, selectedPuja);
    
    setShowToast(true);
    
    setTimeout(() => {
      setBookingStep(0);
      setSelectedPuja(null);
    }, 5000);
  };

  const navigateToMyBookings = () => {
    navigate('/bookingspage');
  };

  const navigateToFavorites = () => {
    navigate('/favorites');
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Ghar ke Sanskaar": return <Home className="w-4 h-4" />;
      case "Bacchon ke Sanskaar": return <Baby className="w-4 h-4" />;
      case "Vivah Sanskar": return <HeartIcon className="w-4 h-4" />;
      case "Pitrakarya": return <Users className="w-4 h-4" />;
      case "Festival Pujas": return <CalendarIcon className="w-4 h-4" />;
      case "Temple / Special Pujas": return <Temple className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Get tomorrow's date for calendar min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden overflow-y-auto">
      
  {/* ================= HERO SECTION ================= */}
<section className="relative bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-white py-20 px-4 text-center overflow-hidden">
  {/* Soft glow */}
  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#fde68a,_transparent_60%)]"></div>

  <div className="relative max-w-6xl mx-auto">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Sparkles className="w-9 h-9 text-amber-300 animate-pulse" />
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
        Book Puja Services
      </h1>
    </div>

    <p className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-2">
      Traditional Pujas & Sacred Ceremonies
    </p>

    <p className="text-sm sm:text-base text-amber-200 mb-10">
      पूजा बुकिंग • Verified Pandits • Transparent Pricing
    </p>

    {/* Search + Filter */}
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 border border-white/20 max-w-4xl mx-auto">
      <div className="flex-1 w-full relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300 w-5 h-5" />
        <input
          type="text"
          placeholder="Search puja, ritual, festival…"
          className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-800 focus:ring-2 focus:ring-amber-500 outline-none text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        onClick={() => setShowFilters(true)}
        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg justify-center w-full sm:w-auto"
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>
    </div>
  </div>
</section>

{/* ================= STICKY FILTER BAR ================= */}
{showFilters && (
  <motion.div
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-amber-200 shadow-lg"
  >
    <div className="max-w-7xl mx-auto p-5 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5 text-amber-600" />
          Refine Your Puja
        </h3>
        <button
          onClick={() => setShowFilters(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={filters.service}
          onChange={(e) => handleFilterChange("service", e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="">All Pujas</option>
          {allServices.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="">All Categories</option>
          {allCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="reviews">Most Booked</option>
        </select>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div>
          <label className="block text-sm font-medium mb-2">
            Price ₹{formatPrice(filters.minPrice)} – ₹{formatPrice(filters.maxPrice)}
          </label>
          <input
            type="range"
            min="700"
            max="40000"
            step="100"
            value={filters.maxPrice}
            onChange={(e) =>
              handleFilterChange("maxPrice", parseInt(e.target.value))
            }
            className="w-full accent-amber-600"
          />
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
            onChange={(e) =>
              handleFilterChange("minRating", parseFloat(e.target.value))
            }
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setFilters({
              service: "",
              category: "",
              minPrice: 700,
              maxPrice: 40000,
              minRating: 0,
              availability: "",
            });
            setSearchQuery("");
          }}
          className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </div>
  </motion.div>
)}


{/* ================= MAIN CONTENT ================= */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">

  {/* Header Row */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
      <Temple className="w-6 h-6 text-amber-600" />
      Available Pujas
      <span className="text-sm font-normal text-gray-500">
        ({sortedPujas.length})
      </span>
    </h2>

    {/* Quick Actions */}
    <div className="flex gap-3">
      <button
        onClick={navigateToMyBookings}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-sm hover:border-amber-400 hover:text-amber-600 transition"
      >
        <FileText className="w-4 h-4" />
        My Bookings
      </button>

      <button
        onClick={navigateToFavorites}
        className="relative flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-sm hover:border-red-400 hover:text-red-500 transition"
      >
        <Heart
          className="w-4 h-4"
          fill={favorites.length ? "currentColor" : "none"}
        />
        Favorites
        {favorites.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {favorites.length}
          </span>
        )}
      </button>
    </div>
  </div>

  {/* ================= GRID ================= */}
  {loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <PujaCardSkeleton key={i} />
      ))}
    </div>
  ) : sortedPujas.length > 0 ? (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {sortedPujas.map((puja) => (
        <motion.div
          layout
          key={puja.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm hover:shadow-xl transition"
        >
          {/* Card Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={puja.img}
                  alt={puja.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
                  {getCategoryIcon(puja.category)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {puja.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  {puja.rating} ({puja.reviews})
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleFavorite(puja.id)}
              className={`p-2 rounded-xl transition ${
                favorites.includes(puja.id)
                  ? "bg-red-50 text-red-500"
                  : "text-gray-400 hover:text-red-500 hover:bg-gray-50"
              }`}
            >
              <Heart
                size={18}
                fill={favorites.includes(puja.id) ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* Card Body */}
          <div className="space-y-3 mb-5">
            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              {getCategoryIcon(puja.category)}
              {puja.category}
            </span>

            <p className="text-sm text-gray-600 line-clamp-2">
              {puja.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock3 className="w-4 h-4" />
              {puja.duration}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-amber-600">
              ₹{formatPrice(puja.price)}
              <span className="text-sm text-gray-500 font-normal">
                {" "} / ceremony
              </span>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              Samagri +₹{formatPrice(puja.samagriPrice)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleViewDetails(puja)}
              className="flex-1 border border-amber-600 text-amber-600 py-2 rounded-xl text-sm font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Details
            </button>

            <button
              onClick={() => handleBookNow(puja)}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  ) : (
    /* Empty State */
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        No Pujas Found
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Try adjusting your search or filters to find the perfect puja.
      </p>
      <button
        onClick={() => {
          setFilters({
            service: "",
            category: "",
            minPrice: 700,
            maxPrice: 40000,
            minRating: 0,
            availability: "",
          });
          setSearchQuery("");
        }}
        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Reset Filters
      </button>
    </div>
  )}

  {/* ================= RECENTLY VIEWED ================= */}
  {recentlyViewed.length > 0 && (
    <div className="mt-20">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Clock className="w-6 h-6 text-amber-600" />
        Recently Viewed
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((puja) => (
          <div
            key={puja.id}
            className="bg-white rounded-2xl p-4 border border-amber-100 hover:shadow-lg transition"
          >
            <img
              src={puja.img}
              alt={puja.name}
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-amber-200 mb-3"
            />
            <h4 className="text-sm font-semibold text-center line-clamp-2 mb-2">
              {puja.name}
            </h4>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-amber-600 text-sm">
                ₹{formatPrice(puja.price)}
              </span>
              <button
                onClick={() => handleBookNow(puja)}
                className="bg-amber-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-amber-700 transition"
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
        {selectedPuja && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Book {selectedPuja.name}
                        </h2>
                        <button
                            onClick={() => {
                                setBookingStep(0);
                                setSelectedPuja(null);
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

                    {/* Validation Error Message */}
                    {validationError && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 flex items-center gap-2"
                        >
                            <X className="w-5 h-5" />
                            <span className="block sm:inline font-medium">{validationError}</span>
                        </motion.div>
                    )}

                    {/* Step 1: Service Selection */}
                    {bookingStep === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Step 1: Confirm Service
                            </h3>
                            <div className="grid gap-4">
                                <div className="p-4 border-2 border-amber-300 rounded-xl bg-amber-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {selectedPuja.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Duration: {selectedPuja.duration}
                                            </p>
                                        </div>
                                        <span className="text-lg font-bold text-amber-600">
                                            ₹{formatPrice(selectedPuja.price)}
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
                                Step 2: Select Date & Time
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-1 bg-white">
                                        <input
                                            type="date"
                                            min={getTomorrowDate()}
                                            className="w-full p-3 border-none focus:ring-0 focus:outline-none text-gray-700"
                                            value={bookingData.date}
                                            onChange={(e) => {
                                                setBookingData(prev => ({ 
                                                    ...prev, 
                                                    date: e.target.value 
                                                }));
                                                setValidationError("");
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Select any date from tomorrow onwards
                                    </p>
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Select Time <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={bookingData.time}
                                        onChange={(e) => {
                                            setBookingData(prev => ({ ...prev, time: e.target.value }));
                                            setValidationError("");
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-700"
                                    >
                                        <option value="">Choose your preferred time</option>
                                        {allTimeSlots.map(timeSlot => (
                                            <option key={timeSlot} value={timeSlot}>
                                                {timeSlot}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Available: 5:00 AM to 9:00 PM
                                    </p>
                                </div>
                            </div>

                            {/* Selected Schedule Display */}
                            {(bookingData.date || bookingData.time) && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-green-800 mb-2">Your Selected Schedule</h4>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                        {bookingData.date && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-green-600" />
                                                <span className="font-medium">
                                                    {new Date(bookingData.date).toLocaleDateString('en-IN', { 
                                                        weekday: 'long', 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {bookingData.time && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-green-600" />
                                                <span className="font-medium">{bookingData.time}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={handleBookingBack}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleBookingNext}
                                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                                        bookingData.date && bookingData.time
                                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={!bookingData.date || !bookingData.time}
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
                                Step 3: Enter Location & Options
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Complete Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter your complete address with landmark..."
                                        rows={4}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white resize-none"
                                        value={bookingData.address}
                                        onChange={(e) => {
                                            setBookingData(prev => ({ ...prev, address: e.target.value }));
                                            setValidationError(""); 
                                        }}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Please provide complete address for puja arrangements
                                    </p>
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
                                            All necessary puja items delivered to your doorstep (+₹{formatPrice(selectedPuja.samagriPrice)})
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
                                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                                        bookingData.address && bookingData.address.length >= 10
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
                                Step 4: Confirm Booking
                            </h3>
                            
                            {/* Payment Method Selection */}
                            <div className="bg-white border border-gray-300 rounded-xl p-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 border-2 border-amber-500 rounded-lg bg-amber-50">
                                        <input
                                            type="radio"
                                            id="payOnDelivery"
                                            name="paymentMethod"
                                            value="payOnDelivery"
                                            checked={true}
                                            onChange={() => {}}
                                            className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                                        />
                                        <label htmlFor="payOnDelivery" className="flex-1">
                                            <div className="font-semibold text-gray-900">Cash on Delivery</div>
                                            <div className="text-sm text-gray-600">
                                                Pay after puja completion - No advance payment required
                                            </div>
                                        </label>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50 opacity-50">
                                        <input
                                            type="radio"
                                            id="onlinePayment"
                                            name="paymentMethod"
                                            value="onlinePayment"
                                            disabled
                                            className="w-5 h-5 text-gray-400"
                                        />
                                        <label htmlFor="onlinePayment" className="flex-1">
                                            <div className="font-semibold text-gray-500">Online Payment</div>
                                            <div className="text-sm text-gray-500">
                                                Pay securely online (Coming Soon)
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-700 font-medium">
                                        Please review the Booking Summary on the side one last time. By confirming, you agree to our terms and conditions.
                                    </p>
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
                                    <MessageSquare className="w-5 h-5" />
                                    Confirm & Send WhatsApp
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Booking Summary Column */}
                <div className="lg:col-span-1">
                    {selectedPuja && (
                        <BookingSummaryPanel 
                            puja={selectedPuja} 
                            bookingData={bookingData}
                            currentStep={bookingStep}
                        />
                    )}
                </div>
            </motion.div>
        </div> 
        )}
      </AnimatePresence>

      {/* Puja Detail Modal */}
      <PujaDetailModal
        puja={selectedPujaDetail}
        isOpen={showPujaDetail}
        onClose={() => setShowPujaDetail(false)}
        onBookNow={handleBookNow}
      />

      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message={`Your ${selectedPuja?.name} puja is confirmed!`}
            type="success"
            bookingId={bookingId}
            bookingDetails={{
              ...bookingData,
              bookingId: bookingId
            }}
            puja={selectedPuja}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}