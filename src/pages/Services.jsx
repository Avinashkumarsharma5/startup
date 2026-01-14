import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search, Package, Flower2, Star,
  MapPin, Filter, X, Heart, Phone, MessageCircle,
  TrendingUp, Gift, Sparkles, Plus,
  Award, Users, Camera, Building2, Utensils,
  Shield, PhoneCall, Music, ShoppingBag, ArrowRight,
  SlidersHorizontal, Facebook, Instagram, Twitter, Headphones, User, Menu, ChevronDown,
  Calendar, Clock, UserCheck, CheckCircle,
  Truck, RotateCcw, ShieldCheck, Share2, Mail,
  ShoppingCart, Trash2, Minus, Eye, ChevronLeft, ChevronRight
} from "lucide-react";

// --------------------------- Theme Constants ---------------------------
const THEME = {
  royalRed: "#800000",
  hoverRed: "#A52A2A",
  gold: "#FFD700",
  accentOrange: "#FFA500",
  lightGold: "#FFF7E0",
  goldGradient: "linear-gradient(to right, #FFD700, #FFA500)",
  bgGradient: "linear-gradient(to bottom right, #FFF7E0, #FFE8B2, #FFD7A3)",
  darkBg: "#1a0505",
  offWhite: "#FAF9F6"
};

// --------------------------- Services Data ---------------------------
// --------------------------- Services Data ---------------------------
const servicesData = {
  venues: [
    {
      id: 1,
      name: "Luxury Wedding Hall",
      rating: 4.9,
      price: 150000,
      reviews: 156,
      category: "Luxury",
      location: "Ranchi",
      trending: true,
      discount: 15,

      media: [
        { type: "video", src: "images/Luxury_Wedding_Hall.mp4" },
        { type: "image", src: "images/hall01.png" },
        { type: "image", src: "images/hall02.png" },
        { type: "video", src: "images/Luxury_Wedding_Hall.mp4" }
      ]
    },
    {
      id: 2,
      name: "Garden Wedding Venue",
      rating: 4.7,
      price: 120000,
      reviews: 89,
      category: "Outdoor",
      location: "Ranchi",

      media: [
        { type: "image", src: "images/hall03.png" },
        { type: "video", src: "images/Luxurious_Indian_Wedding_Venue_Video.mp4" },
        { type: "image", src: "images/hall04.png" }
      ]
    },
  ],

  decorations: [
    {
      id: 3,
      name: "Royal Mandap Decor",
      rating: 4.7,
      price: 25000,
      reviews: 128,
      category: "Mandap",
      location: "Ranchi",
      discount: 10,
      trending: true,

      media: [
        { type: "video", src: "images/Royal_Indian_Wedding_Mandap_Video.mp4" },
        { type: "image", src: "images/decor3.png" },
        { type: "image", src: "images/decor2.png" },
        { type: "video", src: "videos/mandap-close.mp4" }
      ]
    },
    {
      id: 4,
      name: "Floral Stage Decoration",
      rating: 4.5,
      price: 18000,
      reviews: 89,
      category: "Floral",
      location: "Ranchi",

      media: [
        { type: "image", src: "images/decor2.png" },
        { type: "video", src: "images/Elegant_Indian_Wedding_Floral_Stage.mp4"}
      ]
    },
  ],

  catering: [
    {
      id: 5,
      name: "Premium Vegetarian",
      rating: 4.8,
      price: 499,
      unit: "/plate",
      reviews: 245,
      category: "Vegetarian",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Premium_Vegetarian_Catering_Video_Generated.mp4" },
        { type: "image", src: "images/catring01.png" },
        { type: "image", src: "images/catring02.png" }
      ]
    },
    {
      id: 6,
      name: "Non-Veg Feast",
      rating: 4.7,
      price: 699,
      unit: "/plate",
      reviews: 178,
      category: "Non-Veg",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Luxurious_Non_Vegetarian_Catering_Video.mp4" },
        { type: "image", src: "images/catring03.png" }
      ]
    },
  ],

  photography: [
    {
      id: 7,
      name: "Cinematic Weddings",
      rating: 4.9,
      price: 45000,
      reviews: 203,
      category: "Premium",
      location: "Ranchi",
      trending: true,

      media: [
        { type: "video", src: "images/Luxury_Indian_Wedding_Showreel_Generated.mp4" },
        { type: "image", src: "images/photography2.png" },
        { type: "video", src: "videos/prewedding.mp4" }
      ]
    },
  ],

  entertainment: [
    {
      id: 8,
      name: "DJ Night",
      rating: 4.5,
      price: 25000,
      category: "DJ",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Premium_DJ_Entertainment_Video_Generated.mp4" },
        { type: "image", src: "images/dj1.png" }
      ]
    },
    {
      id: 9,
      name: "Live Orchestra",
      rating: 4.6,
      price: 50000,
      category: "Band",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Luxury_Wedding_Orchestra_Performance_Video.mp4" },
        { type: "image", src: "images/dj2.png" }
      ]
    },
  ],

  artist: [
    {
      id: 10,
      name: "Wedding Anchor",
      rating: 4.8,
      price: 35000,
      category: "Anchor",
      location: "Ranchi",
      trending: true,

      media: [
        { type: "video", src: "images/Luxury_Indian_Wedding_Anchor_Showreel.mp4" },
        { type: "image", src: "images/ankar.png" }
      ]
    },
    {
      id: 11,
      name: "Folk Dancers",
      rating: 4.7,
      price: 45000,
      category: "Dance",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Indian_Folk_Dance_Performance_Video.mp4" },
        { type: "image", src: "images/folk-dance.png" }
      ]
    },
  ],

  other: [
    {
      id: 20,
      name: "Full Planning",
      rating: 4.9,
      price: 100000,
      category: "Planning",
      location: "Ranchi",
      trending: true,

      media: [
        { type: "video", src: "images/Luxury_Indian_Wedding_Showreel_Video.mp4" },
        { type: "image", src: "images/planning.png" }
      ]
    },
    {
      id: 21,
      name: "Bridal Makeup",
      rating: 4.8,
      price: 25000,
      location: "Ranchi",
      category: "Beauty",

      media: [
        { type: "video", src: "images/Bridal_Makeup_Showreel_Video_Generated.mp4" },
        { type: "image", src: "images/Bridal-Makeup.png" }
      ]
    },
    {
      id: 22,
      name: "Mehndi Art",
      rating: 4.7,
      price: 15000,
      category: "Beauty",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Luxury_Mehndi_Art_Showreel_Video.mp4" },
        { type: "image", src: "images/Mehndi-Art.png" }
      ]
    },
    {
      id: 23,
      name: "Car Decor",
      rating: 4.5,
      price: 8000,
      category: "Decor",
      location: "Ranchi",

      media: [
        { type: "video", src: "images/Premium_Indian_Wedding_Car_Showreel.mp4" },
        { type: "image", src: "images/car-decor.png" }
      ]
    },
  ]
};


// --------------------------- Categories ---------------------------
const categories = [
  {
    key: "all",
    label: "All Services",
    image: "images/lightdeco1.png"
  },
  {
    key: "venues",
    label: "Venues",
    image: "images/hall02.png"
  },
  {
    key: "decorations",
    label: "Decor",
    image: "images/decor3.png"
  },
  {
    key: "catering",
    label: "Catering",
    image: "images/catring03.png"
  },
  {
    key: "photography",
    label: "Photography",
    image: "images/photography3.png"
  },
  {
    key: "entertainment",
    label: "Entertainment",
    image: "images/folk-dance.png"
  },
  {
    key: "artist",
    label: "Artist",
    image: "images/ankar.png"
  },
  {
    key: "other",
    label: "Other",
    image: "images/car-decor.png"
  }
];


// --------------------------- Toast Context ---------------------------
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(toast => toast.id !== id));
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-20 right-2 sm:top-24 sm:right-4 z-[100] space-y-2 max-w-[90vw] sm:max-w-xs pointer-events-none">
    <AnimatePresence>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </AnimatePresence>
  </div>
);

const Toast = ({ toast, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, toast.duration); return () => clearTimeout(timer); }, [onClose, toast.duration]);
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }}
      className="pointer-events-auto p-3 rounded-xl shadow-xl bg-white border-l-4 border-[#800000] flex items-center gap-3 text-sm font-medium text-gray-800 min-w-[250px]"
    >
      <Sparkles size={16} className="text-[#FFD700] flex-shrink-0" />
      <span className="text-xs sm:text-sm">{toast.message}</span>
    </motion.div>
  );
};

// --------------------------- Booking Flow Components ---------------------------
const BookingWizardModal = ({ service, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    message: ''
  });

  const { addToast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.eventDate) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const message = `🎊 *NEW SERVICE ENQUIRY - Sanskaraa Weddings* 🎊

*Service Details:*
🏷️ Service: ${service.name}
💰 Starting Price: ₹${service.price.toLocaleString()}${service.unit || ''}
⭐ Rating: ${service.rating}/5
📍 Category: ${service.category}

*Customer Details:*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || 'Not provided'}

*Event Details:*
🎉 Event Type: ${formData.eventType || 'Not specified'}
📅 Event Date: ${formData.eventDate}
👥 Guest Count: ${formData.guestCount || 'Not specified'}
📍 Location: ${formData.location || 'Not specified'}

💬 Additional Message: ${formData.message || 'No additional message'}

_This enquiry was sent via Sanskaraa Weddings Platform_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "916201486202";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    onSuccess({
      service,
      customer: formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });

    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      location: '',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-xl sm:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 mt-8 sm:mt-12">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#800000] truncate">Book {service.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600">Complete your booking in simple steps</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-4 sm:mt-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                  step >= stepNum 
                    ? 'bg-[#800000] text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle size={14} className="sm:w-4 sm:h-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-6 sm:w-12 h-1 mx-1 sm:mx-2 ${
                    step > stepNum ? 'bg-[#800000]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Personal Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Event Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => handleInputChange('eventType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Reception">Reception</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => handleInputChange('guestCount', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      placeholder="Approximate number of guests"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Event Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base"
                      placeholder="City or venue address"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Final Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Additional Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm sm:text-base resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>

                  {/* Service Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Service Summary</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Starting Price:</span>
                        <span className="font-medium text-[#800000]">₹{service.price.toLocaleString()}{service.unit || ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{service.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100">
          <div className="flex justify-between gap-2 sm:gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-3 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base flex-1"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-3 sm:px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors text-sm sm:text-base flex-1"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-3 sm:px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors text-sm sm:text-base flex items-center justify-center gap-2 flex-1"
              >
                <MessageCircle size={16} className="sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap text-xs sm:text-sm">Send via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BookingSuccessModal = ({ booking, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  const { customer = {}, service = {} } = booking;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-serif font-bold text-[#800000] mb-2">
            Enquiry Sent Successfully
          </h2>

          <p className="text-gray-600 text-sm mb-1">
            Thank you <b>{customer.name}</b> for choosing
          </p>
          <p className="text-lg font-semibold text-[#800000] mb-5">
            {service.name}
          </p>

          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
            <div className="flex gap-2">
              <UserCheck className="w-4 h-4 text-[#800000]" />
              Our executive will contact you shortly
            </div>
            <div className="flex gap-2">
              <Phone className="w-4 h-4 text-[#800000]" />
              {customer.phone}
            </div>
            <div className="flex gap-2">
              <Calendar className="w-4 h-4 text-[#800000]" />
              {customer.eventDate}
            </div>
          </div>

          <div className="mt-5 bg-[#FFF7E0] border border-[#FFD700] rounded-xl p-3 text-sm text-[#800000]">
            📞 Need urgent help? Call <b>+91 6201486202</b>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white font-semibold"
          >
            Continue Browsing
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const ServiceDetailModal = ({ service, isOpen, onClose, onBookNow }) => {
  const [index, setIndex] = useState(0);
  const media = service?.media || [];

  useEffect(() => setIndex(0), [service]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!isOpen || !service) return null;

  const prev = () => setIndex((p) => (p === 0 ? media.length - 1 : p - 1));
  const next = () => setIndex((p) => (p === media.length - 1 ? 0 : p + 1));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[2.5rem]
          bg-gradient-to-b from-[#FFFDF4] via-white to-[#FFF1C1]
          shadow-[0_50px_150px_rgba(255,215,0,0.35)] border border-[#FFD700]/40"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center shadow"
          >
            <X className="text-[#800000]" />
          </button>

          <div className="relative h-72 lg:h-[420px] rounded-t-[2.5rem] overflow-hidden">
            {media[index]?.type === "video" ? (
  <video
    src={media[index].src}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    poster="/images/fallback-service.jpg"
    className="w-full h-full object-cover bg-black"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
) : (

              <img
                src={media[index]?.src}
                alt={service.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}

            {media.length > 1 && (
              <>
                <button onClick={prev} className="nav-arrow left-4">
                  <ChevronLeft />
                </button>
                <button onClick={next} className="nav-arrow right-4">
                  <ChevronRight />
                </button>
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-serif font-bold">{service.name}</h2>
              <div className="flex gap-3 text-sm mt-1">
                <Star className="w-4 h-4 fill-[#FFD700]" />
                {service.rating}
                <MapPin className="w-4 h-4 text-[#FFD700]" />
                {service.location || "India"}
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#800000] mb-2">
                About Service
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {service.description ||
                  "A premium service curated with tradition and executed with luxury."}
              </p>
            </div>

            <div className="bg-white/90 rounded-2xl p-6 border border-[#FFD700]/40 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-600 text-sm">Starting From</span>
                <span className="text-3xl font-bold text-[#800000]">
                  ₹{service.price.toLocaleString()}
                  {service.unit && (
                    <span className="text-sm text-stone-400 ml-1">
                      {service.unit}
                    </span>
                  )}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onBookNow(service)}
                className="w-full py-4 rounded-full bg-gradient-to-r
                from-[#800000] via-[#A52A2A] to-[#800000]
                text-white font-bold shadow-[0_20px_60px_rgba(128,0,0,0.5)]"
              >
                Book Premium Service
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


/* ================= FLOATING PARTICLES (OPTIMIZED) ================= */
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 12 + 12,
        delay: Math.random() * 8,
        symbol: Math.random() > 0.5 ? "✿" : "✦",
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-120%", opacity: [0, 0.35, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          className="absolute text-[#FFD700]/30 font-serif"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

/* ================= COUNT UP (SMOOTH RAF) ================= */
const CountUp = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1800;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className="text-center select-none group">
      <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FFD700] font-serif transition-transform duration-300 group-hover:scale-110">
        {count}+
      </div>
      <div className="text-stone-300 text-xs sm:text-sm uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};

/* ================= SKELETON CARD (PREMIUM LOADER) ================= */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse border border-[#FFD700]/20 h-full flex flex-col">
    <div className="h-36 sm:h-44 lg:h-52 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
    <div className="p-4 space-y-3 flex-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="flex justify-between items-center pt-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  </div>
);

/* ================= SUPPORT FLOATING BUTTON (SMART & PREMIUM) ================= */
const SupportFloatingButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 items-end"
          >
            <a
              href="https://wa.me/916201486202"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold shadow-xl hover:scale-105 transition"
            >
              WhatsApp
              <MessageCircle size={16} />
            </a>

            <a
              href="tel:+916201486202"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-xl hover:scale-105 transition"
            >
              Call Now
              <Phone size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
        ring-4 ring-[#FFD700]/40 transition-all duration-300
        ${open ? "bg-stone-800" : "bg-[#800000]"}`}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="text-white w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="support"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Headphones className="text-[#FFD700] w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const ServiceCard = ({
  service,
  onBook,
  onToggleWishlist,
  isWishlisted,
  onViewDetails,
}) => {
  const imageMedia = service.media?.find((m) => m.type === "image");
  const videoMedia = service.media?.find((m) => m.type === "video");

  return (
   <motion.div
  whileHover={{ y: -6 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="
    group relative h-full flex flex-col overflow-hidden
    rounded-2xl lg:rounded-[2.5rem]
    bg-gradient-to-b from-white to-[#FFF7E0]
    border border-[#FFD700]/30
    shadow-xl
    hover:shadow-2xl
    will-change-transform
  "
>

      {/* 🌟 Glow Border */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-transparent group-hover:ring-[#FFD700]/70 pointer-events-none transition-all duration-700" />

      {/* 👑 Badge */}
      <div className="absolute top-3 right-3 z-30">
        <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase
          bg-gradient-to-r from-[#FFD700] to-[#FFA500]
          text-[#1a0505] rounded-full shadow-lg">
          Sanskaraa
        </span>
      </div>

{/* ================= MEDIA ================= */}
<div
  onClick={onViewDetails}
  className="relative h-60 lg:h-72 overflow-hidden cursor-pointer"
>
  {videoMedia ? (
    <video
      src={videoMedia.src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={imageMedia?.src || "/images/fallback-service.jpg"}
      className="absolute inset-0 w-full h-full object-cover bg-black"
      onError={(e) => {
        // fallback to image if video fails
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <img
      src={imageMedia?.src || "/images/fallback-service.jpg"}
      alt={service.name}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/images/fallback-service.jpg";
      }}
    />
  )}

  {/* 🎬 Overlay (DOES NOT BLOCK VIDEO) */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/80 via-[#1a0505]/30 to-transparent pointer-events-none" />

  {/* ✨ Shine */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/20 to-transparent
      translate-x-[-100%] group-hover:translate-x-[100%]
      transition-transform duration-[1200ms]
      pointer-events-none
    "
  />

  {/* ❤️ Wishlist (clickable) */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    onClick={(e) => {
      e.stopPropagation();
      onToggleWishlist(service.id);
    }}
    className="
      absolute top-3 left-3 z-30
      w-9 h-9 rounded-full
      bg-white/20 backdrop-blur-xl
      border border-white/40
      flex items-center justify-center
      shadow-xl
    "
  >
    <Heart
      className={`w-5 h-5 transition-all duration-300 ${
        isWishlisted
          ? "fill-[#800000] text-[#800000] scale-110"
          : "text-white group-hover:text-[#FFD700]"
      }`}
    />
  </motion.button>

  {/* ℹ️ Bottom Info */}
  <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end text-white pointer-events-none">
    <div>
      <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase
        bg-white/20 backdrop-blur border border-white/30 rounded text-[#FFD700]">
        {service.category}
      </span>
      <div className="flex items-center gap-1 mt-1 text-[10px] opacity-90">
        <MapPin size={12} className="text-[#FFD700]" />
        {service.location || "India"}
      </div>
    </div>

    <div className="flex items-center gap-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500]
      px-2 py-1 rounded-full text-[#1a0505] shadow-lg">
      <Star size={12} className="fill-[#1a0505]" />
      <span className="text-xs font-bold">{service.rating}</span>
    </div>
  </div>
</div>


      {/* ================= CONTENT ================= */}
      <div className="relative flex flex-col flex-1 p-4 lg:p-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1
          bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full opacity-70" />

        <h3
          onClick={onViewDetails}
          className="mt-2 font-serif font-bold text-base lg:text-lg xl:text-xl
          text-[#1a0505] group-hover:text-[#800000]
          transition-colors cursor-pointer line-clamp-2"
        >
          {service.name}
        </h3>

        <p className="mt-1 text-xs lg:text-sm text-stone-600 line-clamp-2">
          {service.description ||
            "Crafted with tradition, executed with luxury."}
        </p>

        {/* 💰 Price + CTA */}
        <div className="mt-auto pt-4 border-t border-dashed border-[#FFD700]/40 flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#800000]/70 font-bold">
              Starting From
            </p>
            <p className="text-lg lg:text-xl font-bold text-[#800000]">
              ₹{service.price.toLocaleString()}
              {service.unit && (
                <span className="text-xs font-normal text-stone-400 ml-1">
                  {service.unit}
                </span>
              )}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(service)}
            className="
              px-4 py-2 rounded-full
              bg-gradient-to-r from-[#800000] via-[#A52A2A] to-[#800000]
              text-white text-xs font-bold tracking-wide
              shadow-[0_8px_30px_rgba(128,0,0,0.4)]
              hover:shadow-[0_12px_40px_rgba(255,215,0,0.6)]
              transition-all
            "
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};



const HeroSection = ({ query, setQuery, location, setLocation }) => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 220]);
  const bgOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] xl:min-h-[95vh] overflow-hidden bg-[#1a0505] flex items-center justify-center px-3 sm:px-6 mt-10">

      {/* ===== Background ===== */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0 ">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&fit=crop"
          className="w-full h-full object-cover "
          alt="Wedding"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#FAF9F6]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />
      </motion.div>

      <FloatingParticles />

      {/* ===== App Logo ===== */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 left-0 w-full flex justify-center z-20"
      >
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-xl mt-8">
          <div className="w-8 h-8 bg-[#800000] rounded-full overflow-hidden border border-[#FFD700]/50">
            <img src="images/sanskaraa-logo.png" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-serif font-bold text-white">
            Sanskaraa
          </span>
        </div>
      </motion.div>

      {/* ===== Main Content ===== */}
      <div className="relative z-10 max-w-4xl w-full text-center mt-20 sm:mt-24">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-[11px] tracking-widest uppercase"
        >
          India’s Premium Event Managment Platform
        </motion.span>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight drop-shadow-xl"
        >
          Tradition Meets <span className="text-[#FFD700] italic">Luxury</span>
        </motion.h1>

        {/* ===== Search Card (App Feel) ===== */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#FFD700]/40 overflow-hidden"
        >

          {/* Location */}
          <div className="flex items-center px-4 py-3 border-b border-[#FFD700]/20">
            <MapPin size={18} className="text-[#800000] mr-3" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent outline-none font-semibold text-[#800000]"
            >
              <option>All Cities</option>
              <option>Live Location</option>
              <option>Ranchi</option>
              <option>Hazribagh</option>
              <option>Patna</option>
              <option>Gaya</option>
            </select>
            <ChevronDown size={16} className="text-[#800000]/60" />
          </div>

          {/* Search */}
          <div className="flex items-center px-4 py-4 gap-3">
            <Search size={18} className="text-[#800000]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search venues, decor, catering..."
              className="flex-1 bg-transparent outline-none text-[#1a0505] placeholder-[#800000]/50 font-medium"
            />
            <button className="bg-gradient-to-br from-[#800000] to-[#A52A2A] text-white px-6 py-2 rounded-xl font-semibold shadow-lg active:scale-95 transition">
              Search
            </button>
          </div>
        </motion.div>

        {/* ===== Trending Chips ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 flex flex-wrap justify-center gap-2 text-xs"
        >
          <span className="text-[#FFD700] opacity-80">Trending:</span>
          {["Banquet Halls", "Bridal Makeup", "Pre-Wedding Shoot", "Mehndi"].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full bg-white/10 border border-[#FFD700]/30 text-[#FFD700] hover:bg-white/20 transition"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


const FilterBar = ({
  activeCategory,
  setActiveCategory,
  categories
}) => {
  return (
    <div className="sticky top-[64px] z-40 mb-8 px-2 sm:px-4">
      
      {/* ================= CATEGORY THUMBNAILS ================= */}
      <div className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide py-3">

        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="group flex flex-col items-center gap-2 min-w-[88px] sm:min-w-[104px]"
            >
              {/* ===== Thumbnail ===== */}
              <div
                className={`
                  relative
                  w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                  rounded-full overflow-hidden
                  border-2 transition-all duration-300 ease-out
                  ${isActive
                    ? "border-[#800000] scale-110 shadow-xl ring-2 ring-[#FFD700]/70"
                    : "border-[#FFD700]/30 group-hover:scale-105 grayscale-[40%]"
                  }
                `}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isActive ? "grayscale-0" : "group-hover:grayscale-0"
                  }`}
                />

                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-[#FFD700]/10" />
                )}
              </div>

              {/* ===== Name (FIXED VISIBILITY) ===== */}
              <span
                className="
                  text-xs sm:text-sm font-semibold text-center tracking-wide
                  text-black
                "
              >
                {cat.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};






// --------------------------- Main App Component ---------------------------
export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Cities");
  const [wishlist, setWishlist] = useState(new Set());
  const [sortOption, setSortOption] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);

  // Booking flow states
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const allServices = useMemo(() => {
    return Object.entries(servicesData).flatMap(([cat, items]) => 
        items.map(item => ({...item, serviceCategory: cat}))
    );
  }, []);

  const filteredServices = useMemo(() => {
    let result = allServices.filter(s => {
        const matchesCat = activeCategory === 'all' || s.serviceCategory === activeCategory;
        const matchesQuery = !query || s.name.toLowerCase().includes(query.toLowerCase());
        const matchesLoc = location === "All Cities" || s.location === location;
        return matchesCat && matchesQuery && matchesLoc;
    });

    switch(sortOption) {
      case "price-low": return result.sort((a,b) => a.price - b.price);
      case "price-high": return result.sort((a,b) => b.price - a.price);
      case "trending": return result.sort((a,b) => (b.trending ? 1 : -1));
      default: return result.sort((a,b) => b.rating - a.rating);
    }
  }, [activeCategory, query, location, allServices, sortOption]);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingWizard(true);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const handleBookingSuccess = (booking) => {
    setLatestBooking(booking);
    setShowBookingSuccess(true);
  };

  return (
    <ToastProvider>
      <div 
        className="min-h-screen font-sans text-[#1a0505] selection:bg-[#FFD700] selection:text-[#800000] pt-2 sm:pt-4"
        style={{
            background: "radial-gradient(circle at top, rgba(232,200,113,0.12), transparent 40%), radial-gradient(circle at bottom, rgba(122,26,26,0.08), transparent 50%), #FAF9F6"
        }}
      >
        
        {/* Support Floating Button */}
        <SupportFloatingButton />

        {/* Hero Section */}
        <HeroSection 
            query={query} 
            setQuery={setQuery} 
            location={location}
            setLocation={setLocation}
        />

        <main className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 xl:px-6 relative z-20 pb-12 sm:pb-16 lg:pb-20 -mt-8 sm:-mt-12 lg:-mt-16">
            
            {/* Services Grid */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 lg:mb-8 px-1">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-[#800000] mb-1 sm:mb-12">
                      {activeCategory === 'all' ? "Curated Services" : `${categories.find(c => c.key === activeCategory)?.label}`}
                    </h2>
                    <p className="text-stone-500 text-xs sm:text-sm lg:text-base">
                      Handpicked vendors verified for quality & tradition.
                    </p>
                  </div>
                </div>

                {/* Integrated Filter & Category Bar */}
                <FilterBar 
                    onSortChange={setSortOption} 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    categories={categories}
                />
                
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
                    {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
                  </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
                        {filteredServices.map(service => (
                            <ServiceCard 
                                key={service.id} 
                                service={service} 
                                isWishlisted={wishlist.has(service.id)}
                                onToggleWishlist={toggleWishlist}
                                onBook={handleBookNow}
                                onViewDetails={() => handleViewDetails(service)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 sm:py-16 lg:py-20 xl:py-24 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-dashed border-[#FFD700]/30 shadow-sm">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#FFF7E0] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-5">
                            <Search size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#FFD700]" />
                          </div>
                          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif font-bold text-[#800000] mb-1 sm:mb-2">
                            No services found
                          </h3>
                          <p className="text-stone-500 text-xs sm:text-sm lg:text-base px-3 sm:px-4">
                            Try adjusting your search or filters to find what you need.
                          </p>
                    </div>
                )}
            </section>

            {/* Trust Section */}
            <section className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 relative rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden bg-[#1a0505] shadow-2xl border-t border-[#FFD700]/20">
                {/* Decorative Wave SVGs */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
                  <svg className="relative block w-full h-8 sm:h-10 lg:h-12 xl:h-16 text-[#FAF9F6]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
                  </svg>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

                <div className="relative z-20 px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-16 py-8 sm:py-10 lg:py-12 xl:py-16 text-center sm:text-left grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
                    <div className="lg:col-span-1">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 mx-auto lg:mx-0 shadow-lg shadow-[#FFD700]/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Shield className="text-[#1a0505] w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                        Why Sanskaraa?
                      </h3>
                      <p className="text-[#FFD700] text-xs sm:text-sm leading-relaxed opacity-90">
                        We don't just plan events; we curate timeless memories rooted in tradition and executed with modern perfection.
                      </p>
                    </div>
                    
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                     <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <CountUp end={2500} label="Weddings Planned" />
                     </div>
                     <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <CountUp end={120} label="Verified Vendors" />
                     </div>
                     <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <CountUp end={15} label="Cities Covered" />
                     </div>
                  </div>
                </div>
            </section>
        </main>


        {/* Modals */}
        <ServiceDetailModal
          service={selectedService}
          isOpen={showServiceDetails}
          onClose={() => setShowServiceDetails(false)}
          onBookNow={handleBookNow}
        />

        <BookingWizardModal
          service={selectedService}
          isOpen={showBookingWizard}
          onClose={() => setShowBookingWizard(false)}
          onSuccess={handleBookingSuccess}
        />

        <BookingSuccessModal
          booking={latestBooking}
          isOpen={showBookingSuccess}
          onClose={() => setShowBookingSuccess(false)}
        />
      </div>
    </ToastProvider>
  );
}