import React, { useState, useEffect, useMemo, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Search, Package, Flower2, Star,
  MapPin, Filter, X, Heart, Phone, MessageCircle,
  TrendingUp, Gift, Sparkles, Plus,
  Award, Users, Camera, Building2, Utensils,
  Shield, PhoneCall, Music, ShoppingBag, ArrowRight,
  SlidersHorizontal, Facebook, Instagram, Twitter, Headphones, User, Menu, ChevronDown,
  Calendar, Clock, UserCheck, CheckCircle
} from "lucide-react";

// --------------------------- Theme Constants ---------------------------
const THEME = {
  royalRed: "#800000",      // Primary Brand
  hoverRed: "#A52A2A",      // Hover State
  gold: "#FFD700",          // Amber Gold Shade
  accentOrange: "#FFA500",  // Accent Bright Orange
  lightGold: "#FFF7E0",     // Light Gold / Cream
  goldGradient: "linear-gradient(to right, #FFD700, #FFA500)",
  bgGradient: "linear-gradient(to bottom right, #FFF7E0, #FFE8B2, #FFD7A3)",
  darkBg: "#1a0505",
  offWhite: "#FAF9F6"
};

// --------------------------- Toast Context ---------------------------
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(toast => toast.id !== id));
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-24 right-4 z-[90] space-y-2 max-w-[90vw] sm:max-w-xs pointer-events-none">
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
      className="pointer-events-auto p-3 rounded-xl shadow-xl bg-white border-l-4 border-[#800000] flex items-center gap-3 text-sm font-medium text-gray-800"
    >
      <Sparkles size={16} className="text-[#FFD700]" />
      <span>{toast.message}</span>
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
    // Validate form
    if (!formData.name || !formData.phone || !formData.eventDate) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    // Create WhatsApp message
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

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "916201486202";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success
    onSuccess({
      service,
      customer: formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });

    // Reset and close
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#800000]">Book {service.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Complete your booking in simple steps</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                  <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 ${
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
          <div className="flex justify-between gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base flex-1"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-4 sm:px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors text-sm sm:text-base flex-1"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-4 sm:px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors text-sm sm:text-base flex items-center justify-center gap-2 flex-1"
              >
                <MessageCircle size={16} className="sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Send via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BookingSuccessModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-6 lg:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
        >
          <CheckCircle size={32} className="sm:w-10 sm:h-10 text-green-600" />
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#800000] mb-3 sm:mb-4">
          Enquiry Submitted Successfully!
        </h2>

        <p className="text-gray-600 mb-2 text-sm sm:text-base">
          Thank you <strong>{booking.customer.name}</strong> for your interest in
        </p>
        <p className="font-semibold text-[#800000] mb-4 sm:mb-6 text-base sm:text-lg">{booking.service.name}</p>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="sm:w-4 sm:h-4 text-[#800000]" />
              <span>Our executive will contact you within 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="sm:w-4 sm:h-4 text-[#800000]" />
              <span>On your number: {booking.customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="sm:w-4 sm:h-4 text-[#800000]" />
              <span>Event Date: {booking.customer.eventDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF7E0] border border-[#FFD700] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-[#800000] font-medium">
            📞 Need immediate assistance? Call us at <strong>+91 62014 86202</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors font-semibold text-sm sm:text-base"
        >
          Continue Browsing
        </button>
      </motion.div>
    </motion.div>
  );
};

const ServiceDetailModal = ({ service, isOpen, onClose, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#800000] truncate">{service.name}</h2>
              <div className="flex items-center gap-2 sm:gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star size={14} className="sm:w-4 sm:h-4 text-[#FFD700] fill-current" />
                  <span className="font-semibold text-sm sm:text-base">{service.rating}</span>
                  <span className="text-gray-600 text-xs sm:text-sm">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="sm:w-4 sm:h-4 text-[#800000]" />
                  <span className="text-gray-600 text-xs sm:text-sm">{service.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Image Gallery */}
            <div>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
                <img 
                  src={service.img} 
                  alt={service.name}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Service Details</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {service.description || "Experience premium service with attention to detail and traditional craftsmanship."}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {service.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Premium Quality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Professional Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Timely Delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Customizable</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">Pricing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Starting Price</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#800000]">
                      ₹{service.price.toLocaleString()}
                      {service.unit && <span className="text-xs sm:text-sm font-normal ml-1">{service.unit}</span>}
                    </span>
                  </div>
                  {service.discount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-xs sm:text-sm">Discount</span>
                      <span className="text-green-600 font-semibold text-xs sm:text-sm">{service.discount}% OFF</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
            <button
              onClick={() => onBookNow(service)}
              className="flex-1 py-2 sm:py-3 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} className="sm:w-5 sm:h-5" />
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --------------------------- Enhanced Responsive Components ---------------------------

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-100%", opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          className="absolute text-[#FFD700]/20 font-serif"
          style={{ 
            left: `${Math.random() * 100}%`, 
            fontSize: `${Math.random() * 16 + 8}px` 
          }}
        >
          {Math.random() > 0.5 ? '✿' : '✦'}
        </motion.div>
      ))}
    </div>
  );
};

const CountUp = ({ end, label }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center group cursor-default">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFD700] mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
        {count}+
      </div>
      <div className="text-stone-300 text-xs sm:text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm h-full flex flex-col animate-pulse border border-[#FFD700]/20">
    <div className="h-48 sm:h-60 bg-gray-100"></div>
    <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
      <div className="h-5 sm:h-6 bg-gray-100 rounded w-3/4"></div>
      <div className="h-3 sm:h-4 bg-gray-100 rounded w-1/2"></div>
      <div className="flex justify-between mt-4 sm:mt-6">
         <div className="h-5 sm:h-6 bg-gray-100 rounded w-1/3"></div>
         <div className="h-8 bg-gray-100 rounded-full w-1/4"></div>
      </div>
    </div>
  </div>
);

const SupportFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-6 z-[90] flex flex-col items-end gap-3 sm:gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-2 sm:gap-3 items-end mb-2">
            <motion.a
              href="https://wa.me/916201486202" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2 sm:gap-3 bg-[#25D366] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-xl hover:bg-[#128C7E] transition-colors group text-xs sm:text-sm"
            >
              <span className="font-semibold whitespace-nowrap">WhatsApp</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              </div>
            </motion.a>

            <motion.a
              href="tel:+916201486202"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex items-center gap-2 sm:gap-3 bg-blue-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-xl hover:bg-blue-700 transition-colors group text-xs sm:text-sm"
            >
              <span className="font-semibold whitespace-nowrap">Call Now</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Phone size={14} className="sm:w-4 sm:h-4" />
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ring-2 sm:ring-4 ring-[#FFD700]/40 ${
          isOpen ? 'bg-stone-800' : 'bg-[#800000]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full pointer-events-none"></div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="text-white w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="headset"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Headphones className="text-[#FFD700] w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const ServiceCard = ({ service, onBook, onToggleWishlist, isWishlisted, onViewDetails }) => {
  return (
    <motion.div 
      layout
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl sm:rounded-[2rem] border border-[#FFD700]/20 shadow-sm hover:shadow-[0_8px_30px_rgba(128,0,0,0.1)] transition-all duration-500 overflow-hidden relative h-full flex flex-col"
    >
      {/* Discount Ribbon */}
      {service.discount && (
        <div className="absolute top-0 right-0 z-20 overflow-hidden rounded-tr-xl sm:rounded-tr-[2rem]">
          <div className="bg-[#800000] text-white text-[10px] font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-bl-lg sm:rounded-bl-2xl shadow-md">
            {service.discount}% OFF
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-40 sm:h-48 lg:h-64 overflow-hidden cursor-pointer" onClick={onViewDetails}>
        <img 
          src={service.img} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/80 via-[#1a0505]/20 to-transparent opacity-80"></div>

        {/* Floating Heart */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(service.id); }}
          className="absolute top-2 sm:top-4 left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white transition-all z-20 group/heart shadow-lg"
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
            isWishlisted ? 'fill-[#800000] text-[#800000]' : 'text-white group-hover/heart:text-[#800000]'
          }`} />
        </motion.button>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-end text-white z-10">
          <div>
            <span className="inline-block px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[9px] sm:text-[10px] font-semibold mb-1 sm:mb-1.5 tracking-wide uppercase text-[#FFD700]">
              {service.category}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 opacity-90">
              <MapPin size={10} className="sm:w-3 sm:h-3 text-[#FFD700]" />
              <span className="text-[10px] sm:text-xs font-medium text-white">{service.location || 'India'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-lg text-[#1a0505]">
            <Star size={10} className="sm:w-3 sm:h-3 fill-[#1a0505] text-[#1a0505]" />
            <span className="text-[10px] sm:text-xs font-bold">{service.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-[#FFD700]/30 rounded-b-full opacity-50"></div>
        
        <h3 
          className="font-serif font-bold text-base sm:text-lg text-[#1a0505] mb-1 sm:mb-2 group-hover:text-[#800000] transition-colors leading-tight cursor-pointer line-clamp-2"
          onClick={onViewDetails}
        >
          {service.name}
        </h3>
        
        <p className="text-stone-500 text-xs leading-relaxed mb-3 sm:mb-4 lg:mb-5 line-clamp-2">
          {service.description || "Experience the finest traditional service crafted for your special day."}
        </p>
        
        <div className="mt-auto pt-3 sm:pt-4 border-t border-dashed border-[#FFD700]/30 flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] text-[#800000]/70 font-bold uppercase tracking-wider mb-0.5">
              Starting From
            </p>
            <p className="text-lg sm:text-xl font-bold text-[#800000]">
              ₹{service.price.toLocaleString()}
              {service.unit && <span className="text-xs text-stone-400 font-normal ml-1">{service.unit}</span>}
            </p>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewDetails}
              className="px-2 sm:px-3 py-1.5 sm:py-2 border border-[#800000] text-[#800000] rounded-full text-xs font-semibold hover:bg-[#800000] hover:text-white transition-all whitespace-nowrap"
            >
              Details
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBook(service)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white rounded-full text-xs font-semibold shadow-lg shadow-[#800000]/20 hover:shadow-[#800000]/40 transition-all flex items-center gap-1 whitespace-nowrap"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = ({ query, setQuery, location, setLocation }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden flex flex-col items-center justify-center text-center px-3 sm:px-4 bg-[#1a0505]">
      {/* Background */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&fit=crop" 
          alt="Indian Wedding" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FAF9F6]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
      </motion.div>
      
      <FloatingParticles />

      {/* Logo in Hero */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-4 sm:top-6 lg:top-8 left-0 w-full flex justify-center z-20 px-3"
      >
         <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full border border-white/20 shadow-2xl">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[#800000] rounded-full flex items-center justify-center shadow-inner border border-[#FFD700]/50">
                <span className="text-[#FFD700] font-serif font-bold text-lg sm:text-xl lg:text-xl">S</span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-2xl font-serif font-bold text-white tracking-tight">
              Sanskaraa
            </span>
         </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mt-8 sm:mt-10 lg:mt-12 px-2">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="inline-block py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-6 uppercase shadow-lg">
              India's Premium Wedding Platform
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl px-2">
              Tradition Meets <span className="text-[#FFD700] italic font-serif">Luxury</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#FAF9F6]/95 backdrop-blur-xl p-1.5 sm:p-2 rounded-2xl sm:rounded-[2rem] shadow-2xl flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 max-w-3xl mx-auto border border-[#FFD700]/50 relative z-20"
        >
            <div className="flex items-center px-3 sm:px-4 lg:px-6 h-12 sm:h-14 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-[#FFD700]/30">
                <MapPin size={16} className="sm:w-5 sm:h-5 text-[#800000] mr-2 sm:mr-3" />
                <select 
                  className="w-full bg-transparent outline-none text-sm font-semibold text-[#800000] cursor-pointer appearance-none text-xs sm:text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>All Cities</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Udaipur</option>
                  <option>Bangalore</option>
                </select>
                <ChevronDown size={12} className="sm:w-3 sm:h-3 text-[#800000]/60 ml-1 sm:ml-2" />
            </div>
            <div className="flex items-center px-3 sm:px-4 lg:px-6 h-12 sm:h-14 w-full flex-1">
                <Search size={16} className="sm:w-5 sm:h-5 text-[#800000] mr-2 sm:mr-3" />
                <input 
                    type="text" 
                    placeholder="Search venues, decor, catering..." 
                    className="w-full bg-transparent outline-none text-[#1a0505] placeholder-[#800000]/50 text-sm font-medium text-xs sm:text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-br from-[#800000] to-[#A52A2A] hover:to-[#5a1010] text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-xl sm:rounded-[1.5rem] font-semibold transition-all shadow-lg shadow-[#800000]/30 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transform active:scale-95">
                <span>Search</span>
            </button>
        </motion.div>

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 text-white/90 text-xs font-medium px-2"
        >
          <span className="opacity-70 text-[#FFD700]">Trending:</span>
          {['Banquet Halls', 'Bridal Makeup', 'Pre-wedding Shoot', 'Mehndi'].map(tag => (
            <button 
              key={tag} 
              className="px-2 sm:px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-[#FFD700]/30 text-[#FFD700] transition-colors backdrop-blur-sm text-xs"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const FilterBar = ({ onSortChange, activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="bg-white px-3 sm:px-4 lg:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl lg:rounded-[1.5rem] shadow-sm border border-[#FFD700]/20 mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 sticky top-2 sm:top-4 z-30 mx-1 sm:mx-0">
      
      {/* Categories Bar */}
      <div className="w-full overflow-x-auto scrollbar-hide flex gap-2 sm:gap-3 items-center pb-1 sm:pb-2">
         {categories.map((cat) => {
             const Icon = cat.icon;
             const isActive = activeCategory === cat.key;
             return (
                 <button 
                     key={cat.key}
                     onClick={() => setActiveCategory(cat.key)}
                     className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap border ${
                       isActive 
                         ? 'bg-[#800000] text-white border-[#800000] shadow-md transform scale-105' 
                         : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                     }`}
                 >
                     <Icon size={12} className="sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                     <span className="text-xs">{cat.label}</span>
                 </button>
             )
         })}
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between w-full border-t border-stone-100 pt-2 sm:pt-3">
        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-[#800000] text-white rounded-full text-xs font-semibold shadow-md whitespace-nowrap">
              <Filter size={12} className="sm:w-3 sm:h-3" /> 
              <span>Filters</span>
            </button>
            <button className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border border-[#FFD700]/30 rounded-full text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Price Range
            </button>
            <button className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border border-[#FFD700]/30 rounded-full text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Location
            </button>
            <button className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border border-[#FFD700]/30 rounded-full text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Availability
            </button>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-medium text-[#800000]/60 uppercase tracking-wide hidden sm:block">
              Sort By:
            </span>
            <div className="relative">
                <select 
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-[#FAF9F6] pl-2 sm:pl-3 pr-6 sm:pr-8 py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-[#800000] outline-none cursor-pointer border border-[#FFD700]/30 focus:border-[#800000] appearance-none"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="trending">Trending</option>
                </select>
                <ChevronDown size={12} className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-[#800000] pointer-events-none" />
            </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------- Updated Main App ---------------------------

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
        if (s.serviceCategory === 'printedItems' && activeCategory === 'all') return false;
        
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
        className="min-h-screen font-sans text-[#1a0505] selection:bg-[#FFD700] selection:text-[#800000]"
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

        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-20 pb-16 sm:pb-20 -mt-16 sm:-mt-20">
            
            {/* Sanskaraa Shop (Selling Items) */}
            {(activeCategory === 'all' || activeCategory === 'printedItems') && (
              <section className="mb-16 sm:mb-20 pt-6 sm:pt-8">
                  <div className="flex items-end justify-between mb-6 sm:mb-8 px-1 sm:px-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#800000] flex items-center gap-2 sm:gap-3">
                        Sanskaraa Shop 
                        <span className="bg-[#FFD700] text-[#800000] text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-sans font-bold tracking-widest uppercase shadow-sm">
                          Store
                        </span>
                      </h2>
                      <p className="text-stone-500 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
                        Exclusive wedding essentials, delivered to your doorstep.
                      </p>
                    </div>
                    <button className="hidden sm:flex items-center gap-1 sm:gap-2 text-[#800000] font-semibold hover:gap-2 sm:hover:gap-3 transition-all text-xs sm:text-sm">
                      View Full Store <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    {/* Fade Shadows */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none rounded-l-xl"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none rounded-r-xl"></div>

                    <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 sm:pb-10 pt-1 sm:pt-2 px-1 sm:px-2 scrollbar-hide">
                        {servicesData.printedItems.map(item => (
                            <motion.div 
                              whileHover={{ y: -4 }} 
                              key={item.id} 
                              className="min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] xl:min-w-[260px] bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] transition-all cursor-pointer group border border-[#FFD700]/20 relative"
                            >
                                <div className="h-36 sm:h-44 lg:h-48 xl:h-56 rounded-lg sm:rounded-xl lg:rounded-2xl bg-stone-100 overflow-hidden mb-3 sm:mb-4 relative">
                                    <img 
                                      src={item.img} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                      alt={item.name} 
                                    />
                                    {item.trending && (
                                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#800000]/90 backdrop-blur text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                                        BESTSELLER
                                      </div>
                                    )}
                                    <button className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-[#800000] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-[#800000] hover:text-white">
                                      <Plus size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                                    </button>
                                </div>
                                <h4 className="font-serif font-bold text-[#1a0505] text-sm sm:text-base lg:text-lg leading-tight mb-1 sm:mb-2 line-clamp-1">
                                  {item.name}
                                </h4>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[#800000] font-bold text-lg sm:text-xl">₹{item.price}</p>
                                        {item.unit && (
                                          <p className="text-[9px] sm:text-[10px] text-stone-400">
                                            {item.unit}
                                          </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-semibold text-stone-500 bg-[#FFF7E0] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                                        <Star size={10} className="sm:w-3 sm:h-3 fill-[#FFD700] text-[#FFD700]" /> 
                                        {item.rating}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="min-w-[140px] sm:min-w-[160px] lg:min-w-[180px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#FFD700]/50 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-[#FFF7E0] transition-colors gap-2 sm:gap-3 lg:gap-4 group p-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#800000] group-hover:scale-110 transition-transform border border-[#FFD700]/20">
                              <ArrowRight size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                            </div>
                            <span className="font-serif font-bold text-[#800000] text-sm sm:text-base lg:text-lg text-center">
                              View Shop
                            </span>
                        </div>
                    </div>
                  </div>
              </section>
            )}

            {/* Services Grid */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 px-1 sm:px-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#800000] mb-1 sm:mb-2">
                      {activeCategory === 'all' ? "Curated Services" : `${categories.find(c => c.key === activeCategory)?.label}`}
                    </h2>
                    <p className="text-stone-500 text-sm sm:text-base">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
                  </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                    <div className="text-center py-20 sm:py-28 lg:py-32 bg-white rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-dashed border-[#FFD700]/30 shadow-sm">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#FFF7E0] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Search size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#FFD700]" />
                          </div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#800000] mb-1 sm:mb-2">
                            No services found
                          </h3>
                          <p className="text-stone-500 text-sm sm:text-base px-4">
                            Try adjusting your search or filters to find what you need.
                          </p>
                    </div>
                )}
            </section>

            {/* Trust Section */}
            <section className="mt-20 sm:mt-28 lg:mt-32 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1a0505] shadow-2xl border-t border-[#FFD700]/20">
                {/* Decorative Wave SVGs */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
                  <svg className="relative block w-full h-12 sm:h-16 lg:h-20 xl:h-24 text-[#FAF9F6]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
                  </svg>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

                <div className="relative z-20 px-4 sm:px-6 lg:px-8 xl:px-16 py-16 sm:py-20 lg:py-24 text-center sm:text-left grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-1">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto lg:mx-0 shadow-lg shadow-[#FFD700]/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Shield className="text-[#1a0505] w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 sm:mb-4">
                        Why Sanskaraa?
                      </h3>
                      <p className="text-[#FFD700] text-xs sm:text-sm leading-relaxed opacity-90">
                        We don't just plan events; we curate timeless memories rooted in tradition and executed with modern perfection.
                      </p>
                    </div>
                    
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                       <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <CountUp end={2500} label="Weddings Planned" />
                       </div>
                       <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <CountUp end={120} label="Verified Vendors" />
                       </div>
                       <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <CountUp end={15} label="Cities Covered" />
                       </div>
                    </div>
                </div>
            </section>

        </main>

        {/* Booking Flow Modals */}
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

// --------------------------- Services Data ---------------------------

const servicesData = {
  venues: [
    { id: 1, name: "Luxury Wedding Hall", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&fit=crop", rating: 4.9, price: 150000, reviews: 156, category: "Luxury", location: "Delhi", trending: true, discount: 15 },
    { id: 2, name: "Garden Wedding Venue", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&fit=crop", rating: 4.7, price: 120000, reviews: 89, category: "Outdoor", location: "Mumbai" },
  ],
  // ... (rest of your services data remains exactly the same)
  decorations: [
    { id: 3, name: "Royal Mandap Decor", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&fit=crop", rating: 4.7, price: 25000, reviews: 128, category: "Mandap", location: "Delhi", discount: 10, trending: true },
    { id: 4, name: "Floral Stage Decoration", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&fit=crop", rating: 4.5, price: 18000, reviews: 89, category: "Floral", location: "Mumbai" },
  ],
  catering: [
    { id: 5, name: "Premium Vegetarian", img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&fit=crop", rating: 4.8, price: 499, unit: "/plate", reviews: 245, category: "Vegetarian", location: "Delhi" },
    { id: 6, name: "Non-Veg Feast", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&fit=crop", rating: 4.7, price: 699, unit: "/plate", reviews: 178, category: "Non-Veg", location: "Mumbai" },
  ],
  photography: [
    { id: 7, name: "Cinematic Weddings", img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&fit=crop", rating: 4.9, price: 45000, reviews: 203, category: "Premium", location: "Mumbai", trending: true },
  ],
  entertainment: [
    { id: 8, name: "DJ Night", img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&fit=crop", rating: 4.5, price: 25000, category: "DJ", location: "Bangalore" },
    { id: 9, name: "Live Orchestra", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&fit=crop", rating: 4.6, price: 50000, category: "Band", location: "Delhi" },
  ],
  artist: [
    { id: 10, name: "Wedding Anchor", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&fit=crop", rating: 4.8, price: 35000, category: "Anchor", location: "Delhi", trending: true },
    { id: 11, name: "Folk Dancers", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&fit=crop", rating: 4.7, price: 45000, category: "Dance", location: "Mumbai" },
  ],
  printedItems: [
    { id: 12, name: "Acrylic Welcome Sign", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop", rating: 4.8, price: 5000, category: "Signage", trending: true },
    { id: 13, name: "Graphical Poster", img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&fit=crop", rating: 4.7, price: 3000, category: "Design" },
    { id: 14, name: "Digital Invites", img: "https://images.unsplash.com/photo-1565689228803-69d705515d2f?w=800&fit=crop", rating: 4.9, price: 2000, category: "Digital", trending: true },
    { id: 15, name: "Custom Tags", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop", rating: 4.6, price: 1500, unit: "/100 pcs", category: "Printed" },
    { id: 16, name: "Boutique Items", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop", rating: 4.5, price: 8000, category: "Gifts" },
    { id: 17, name: "Event T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop", rating: 4.4, price: 600, category: "Apparel" },
    { id: 18, name: "Custom Bottles", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&fit=crop", rating: 4.3, price: 200, category: "Essentials" },
    { id: 19, name: "Royal Invitations", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop", rating: 4.7, price: 12000, category: "Cards" }
  ],
  other: [
    { id: 20, name: "Full Planning", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&fit=crop", rating: 4.9, price: 100000, category: "Planning", trending: true },
    { id: 21, name: "Bridal Makeup", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&fit=crop", rating: 4.8, price: 25000, category: "Beauty" },
    { id: 22, name: "Mehndi Art", img: "https://images.unsplash.com/photo-1618517351616-38d9dd3b1c67?w=800&fit=crop", rating: 4.7, price: 15000, category: "Beauty" },
    { id: 23, name: "Car Decor", img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&fit=crop", rating: 4.5, price: 8000, category: "Decor" },
  ]
};

const categories = [
  { key: "all", label: "All Services", icon: Sparkles },
  { key: "venues", label: "Venues", icon: Building2 },
  { key: "decorations", label: "Decor", icon: Flower2 },
  { key: "catering", label: "Catering", icon: Utensils },
  { key: "photography", label: "Photography", icon: Camera },
  { key: "entertainment", label: "Entertainment", icon: Music },
  { key: "artist", label: "Artist", icon: User },
  { key: "printedItems", label: "Shop", icon: ShoppingBag },
  { key: "other", label: "Other Services", icon: Gift },
];