import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  X,
  Phone,
  Heart,
  Star,
  Home,
  Grid,
  User,
  Share2,
  ChevronRight,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  UserCircle,
  Mail,
  Package,
  Shield,
  Truck,
  Gift,
  Sparkles,
  Award,
  ThumbsUp
} from "lucide-react";

/* ==========================================================================
   1. DATA & ASSETS
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Royal Rajwada Invite",
    category: "Invitations",
    price: 15000,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1605218427368-35b0e50f305f?w=800&fit=crop&q=80",
    description: "Handcrafted velvet box invite with pure gold foil detailing and wax seal.",
    deliveryTime: "7-10 business days",
    customizations: ["Names", "Date", "Venue", "Monogram"],
    features: ["Gold Foil", "Velvet Box", "Wax Seal", "Customizable"],
    popular: true
  },
  {
    id: 2,
    name: "Golden Acrylic Sign",
    category: "Decor",
    price: 4500,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop&q=80",
    description: "Welcome your guests with this 24x36 mirror-gold acrylic signage.",
    deliveryTime: "5-7 business days",
    customizations: ["Text", "Design", "Size"],
    features: ["Acrylic Material", "Mirror Gold", "Stand Included", "Weather Resistant"],
    trending: true
  },
  {
    id: 3,
    name: "Saffron & Rose Hamper",
    category: "Gifting",
    price: 9500,
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1596464716127-f9a0859b4afd?w=800&fit=crop&q=80",
    description: "Premium Kashmiri saffron, dried roses, and artisanal sweets box.",
    deliveryTime: "3-5 business days",
    customizations: ["Message", "Ribbon Color", "Additional Items"],
    features: ["Premium Saffron", "Gift Wrapped", "Custom Message", "Fresh Roses"],
    bestseller: true
  },
  {
    id: 4,
    name: "Vintage Brass Lamps",
    category: "Decor",
    price: 12000,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1620311494747-16d4d42296d6?w=800&fit=crop&q=80",
    description: "Set of 4 antique-finish brass lamps (Diyas) for the perfect mandap glow.",
    deliveryTime: "10-14 business days",
    customizations: ["Engraving", "Finish Color"],
    features: ["Antique Finish", "Set of 4", "Brass Material", "Traditional Design"]
  },
  {
    id: 5,
    name: "Floral Varmala Set",
    category: "Essentials",
    price: 6500,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1583934555026-6f85ed3dd40f?w=800&fit=crop&q=80",
    description: "Fresh red roses and baby breath garlands, preserved for long-lasting freshness.",
    deliveryTime: "2-4 business days",
    customizations: ["Flower Type", "Length", "Additional Flowers"],
    features: ["Preserved Freshness", "Red Roses", "Baby Breath", "Adjustable Length"],
    trending: true
  },
  {
    id: 6,
    name: "Shagun Envelopes (100pc)",
    category: "Stationery",
    price: 2500,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1628151016056-b049389e1f57?w=800&fit=crop&q=80",
    description: "Silk fabric envelopes with coin holder and magnetic closure.",
    deliveryTime: "5-7 business days",
    customizations: ["Color", "Printing", "Quantity"],
    features: ["Silk Fabric", "Coin Holder", "Magnetic Closure", "Custom Printing"]
  }
];

const CATEGORIES = ["All", "Invitations", "Decor", "Gifting", "Essentials", "Stationery"];

/* ==========================================================================
   2. UI COMPONENTS
   ========================================================================== */



// --- Bottom Navigation Bar ---
const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe px-6 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
    <div className="flex justify-between items-center">
      <NavItem icon={Home} label="Home" active />
      <NavItem icon={Grid} label="Categories" />
      <NavItem icon={Heart} label="Saved" />
      <NavItem icon={User} label="Profile" />
    </div>
  </div>
);

const NavItem = ({ icon: Icon, label, active }) => (
  <button className={`flex flex-col items-center gap-1 p-2 w-16 ${active ? 'text-[#800000]' : 'text-gray-400'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

// --- Product Card (Grid Item) ---
const ProductCard = ({ product, onClick, onBookNow }) => (
  <motion.div 
    whileTap={{ scale: 0.96 }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full"
  >
    <div className="relative aspect-square bg-gray-100">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.popular && (
          <div className="bg-gradient-to-r from-[#800000] to-[#600000] text-white text-[8px] font-bold px-2 py-1 rounded-full">
            POPULAR
          </div>
        )}
        {product.trending && (
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[8px] font-bold px-2 py-1 rounded-full">
            TRENDING
          </div>
        )}
        {product.bestseller && (
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-[8px] font-bold px-2 py-1 rounded-full">
            BESTSELLER
          </div>
        )}
      </div>
      
      {/* Rating Badge */}
      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur rounded-full px-2 py-1 text-[10px] font-bold flex items-center gap-1 shadow-sm">
        <Star size={10} className="text-yellow-500 fill-yellow-500"/> {product.rating}
      </div>
    </div>
    
    <div className="p-3 flex flex-col flex-grow">
      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight mb-2">
        {product.name}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
      
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#800000]">₹{product.price.toLocaleString()}</span>
          <button 
            onClick={() => onClick(product)}
            className="text-[10px] text-[#800000] font-semibold underline"
          >
            View Details
          </button>
        </div>
        
        {/* Quick Book Button */}
        <button
          onClick={() => onBookNow(product)}
          className="w-full py-2.5 bg-gradient-to-r from-[#800000] to-[#600000] text-white text-xs font-bold rounded-xl active:scale-95 transition-transform shadow-md shadow-red-900/10"
        >
          Book Now
        </button>
      </div>
    </div>
  </motion.div>
);

// --- Bottom Sheet (Product Details Modal) ---
const ProductBottomSheet = ({ product, onClose, onBookNow }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        {/* Dark Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        />
        
        {/* The Sheet */}
        <motion.div 
          initial={{ y: "100%" }} 
          animate={{ y: 0 }} 
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full bg-white rounded-t-[30px] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle Indicator */}
          <div className="w-full flex justify-center pt-3 pb-1 absolute z-10 top-0 pointer-events-none">
            <div className="w-12 h-1.5 bg-white/80 rounded-full shadow-sm"></div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/20 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/30 transition-colors">
            <X size={20} />
          </button>

          {/* Large Image */}
          <div className="w-full h-80 shrink-0 bg-gray-100 relative">
             <img src={product.img} className="w-full h-full object-cover" />
             <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
               {product.category}
             </div>
          </div>

          {/* Scrollable Details */}
          <div className="p-6 overflow-y-auto pb-32">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h2 className="text-2xl font-serif text-[#4a0404] font-bold mt-3">{product.name}</h2>
                   <div className="flex items-center gap-2 mt-1">
                     <div className="flex items-center gap-1">
                       <Star size={14} className="text-yellow-500 fill-yellow-500" />
                       <span className="text-sm font-semibold">{product.rating}</span>
                     </div>
                     <span className="text-gray-400 text-sm">•</span>
                     <span className="text-sm text-gray-600">{product.deliveryTime} delivery</span>
                   </div>
                </div>
                <div className="flex gap-3 pt-2">
                   <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                     <Heart size={20} />
                   </button>
                   <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                     <Share2 size={20} />
                   </button>
                </div>
             </div>

             <div className="text-3xl font-bold text-gray-900 mb-6">
               ₹{product.price.toLocaleString()}
               <span className="text-sm font-normal text-gray-400 ml-2">/ per unit</span>
             </div>

             <div className="mb-6">
               <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
               <p className="text-gray-600 text-sm leading-relaxed">
                 {product.description} Designed to add a touch of royal elegance to your special day.
               </p>
             </div>

             {/* Features */}
             {product.features && (
               <div className="mb-6">
                 <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                 <div className="grid grid-cols-2 gap-2">
                   {product.features.map((feature, index) => (
                     <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                       <CheckCircle size={14} className="text-green-600" />
                       <span className="text-xs text-gray-700">{feature}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {/* Customizations */}
             {product.customizations && (
               <div className="mb-6">
                 <h4 className="font-semibold text-gray-900 mb-2">Available Customizations</h4>
                 <div className="flex flex-wrap gap-2">
                   {product.customizations.map((item, index) => (
                     <span key={index} className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                       {item}
                     </span>
                   ))}
                 </div>
               </div>
             )}

             {/* Trust Badges */}
             <div className="bg-[#FDFBF7] rounded-xl p-4 border border-[#800000]/10 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Why Choose Sanskaraa?</h4>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                       <CheckCircle size={16} className="text-green-600" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-900">Premium Handcrafted Finish</p>
                       <p className="text-xs text-gray-500">Every piece is meticulously crafted</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                       <Truck size={16} className="text-blue-600" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-900">Pan-India Insured Delivery</p>
                       <p className="text-xs text-gray-500">Safe & timely delivery guaranteed</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                       <Shield size={16} className="text-purple-600" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-900">Quality Assurance</p>
                       <p className="text-xs text-gray-500">100% satisfaction guarantee</p>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="sticky bottom-12 left-0 right-0 p-3 bg-white border-t border-gray-100 flex gap-3 z-30 rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">



             <a 
               href={`https://wa.me/916201486202?text=Hi, I am interested in ${product.name}`}
               target="_blank"
               rel="noreferrer"
               className="flex-1 bg-green-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-transform"
             >
               <Phone size={18} /> WhatsApp
             </a>
             <button 
               onClick={() => onBookNow(product)}
               className="flex-1 bg-gradient-to-r from-[#800000] to-[#600000] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
             >
               Book Now
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ==========================================================================
   3. BOOKING FLOW COMPONENTS
   ========================================================================== */

// Step definitions for the booking flow
const BOOKING_STEPS = [
  { id: "details", title: "Details", icon: Package },
  { id: "event", title: "Event", icon: Calendar },
  { id: "contact", title: "Contact", icon: UserCircle },
  { id: "confirm", title: "Confirm", icon: CheckCircle }
];

// --- Multi-Step Booking Form ---
const BookingFormSheet = ({ product, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Product Details
    quantity: 1,
    customizations: {},
    // Step 2: Event Details
    eventType: "Wedding",
    eventDate: "",
    eventCity: "",
    venueName: "",
    // Step 3: Contact Details
    fullName: "",
    whatsappNumber: "",
    email: "",
    // Step 4: Confirmation
    specialInstructions: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < BOOKING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Format date for WhatsApp message
    const formattedDate = formData.eventDate 
      ? new Date(formData.eventDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : "Not specified";

    // Construct WhatsApp message with all booking details
    const message = `*🎉 NEW BOOKING ENQUIRY - SANSKRAA WEDDING ESSENTIALS*%0A%0A
*📦 Product Details:*%0A
• Product: ${product.name}%0A
• Category: ${product.category}%0A
• Price: ₹${product.price.toLocaleString()}%0A
• Quantity: ${formData.quantity}%0A
• Subtotal: ₹${(product.price * formData.quantity).toLocaleString()}%0A%0A
*📅 Event Details:*%0A
• Event Type: ${formData.eventType}%0A
• Date: ${formattedDate}%0A
• City: ${formData.eventCity || "Not specified"}%0A
• Venue: ${formData.venueName || "Not specified"}%0A%0A
*👤 Contact Information:*%0A
• Name: ${formData.fullName}%0A
• WhatsApp: ${formData.whatsappNumber}%0A
• Email: ${formData.email || "Not provided"}%0A%0A
*📝 Special Instructions:*%0A${formData.specialInstructions || "None"}%0A%0A
_This enquiry was submitted via Sanskaraa Mobile App_`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/916201486202?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation and close
    onComplete();
    onClose();
  };

  // Step 1: Product Details
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
          <img src={product.img} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <div className="text-xl font-bold text-[#800000] mt-1">₹{product.price.toLocaleString()}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center bg-gray-50 rounded-lg p-1 w-32">
            <button 
              onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              −
            </button>
            <span className="flex-1 text-center text-lg font-semibold">{formData.quantity}</span>
            <button 
              onClick={() => handleInputChange('quantity', formData.quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>
        </div>

        {product.customizations && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customizations Needed
            </label>
            <div className="space-y-2">
              {product.customizations.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`custom-${index}`}
                    className="w-4 h-4 text-[#800000] border-gray-300 rounded focus:ring-[#800000]"
                    onChange={(e) => {
                      const newCustomizations = { ...formData.customizations };
                      if (e.target.checked) {
                        newCustomizations[item] = true;
                      } else {
                        delete newCustomizations[item];
                      }
                      handleInputChange('customizations', newCustomizations);
                    }}
                  />
                  <label htmlFor={`custom-${index}`} className="ml-2 text-sm text-gray-700">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Delivery Time</p>
              <p className="text-xs text-blue-700">{product.deliveryTime || "10-14 business days"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Event Details
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Event Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => handleInputChange('eventType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
          >
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Sangeet">Sangeet</option>
            <option value="Reception">Reception</option>
            <option value="Other">Other Celebration</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <input
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={formData.eventCity}
              onChange={(e) => handleInputChange('eventCity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Taj Palace Hotel"
            value={formData.venueName}
            onChange={(e) => handleInputChange('venueName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Contact Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Your Contact Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number *
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">+91</span>
            </div>
            <input
              type="tel"
              placeholder="98765 43210"
              value={formData.whatsappNumber}
              onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
              className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">We'll send booking confirmation here</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Confirmation
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Booking</h3>
        <p className="text-sm text-gray-600">Almost done! Review details before confirmation</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Product</span>
              <span className="text-sm font-medium">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Category</span>
              <span className="text-sm font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Quantity</span>
              <span className="text-sm font-medium">{formData.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Event Type</span>
              <span className="text-sm font-medium">{formData.eventType}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-[#800000]">
                  ₹{(product.price * formData.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Any specific requirements or notes..."
            value={formData.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">What happens next?</p>
              <ul className="text-xs text-green-700 mt-1 space-y-1">
                <li>• You'll be redirected to WhatsApp for confirmation</li>
                <li>• Our wedding expert will share final quote</li>
                <li>• We'll confirm delivery timeline</li>
                <li>• Secure payment options will be provided</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const stepComponents = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        />
        
        <motion.div 
          initial={{ y: "100%" }} 
          animate={{ y: 0 }} 
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full bg-white rounded-t-[30px] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Steps */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
            <div className="flex justify-between items-center px-6 pt-6 pb-4">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Book {product.name}</h2>
              <div className="w-10"></div> {/* Spacer for balance */}
            </div>
            
            {/* Step Indicators */}
            <div className="px-6 pb-4">
              <div className="flex justify-between items-center">
                {BOOKING_STEPS.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                      index === currentStep 
                        ? 'bg-[#800000] text-white border-2 border-[#800000]'
                        : index < currentStep
                        ? 'bg-green-100 text-green-600 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle size={14} />
                      ) : (
                        step.icon ? <step.icon size={14} /> : index + 1
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      index === currentStep ? 'text-[#800000]' : 
                      index < currentStep ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {stepComponents[currentStep]()}
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-8 bg-white border-t border-gray-100 p-6 pb-safe rounded-xl shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">

            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-transform"
                >
                  Back
                </button>
              )}
              
              {currentStep < BOOKING_STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#800000] to-[#600000] text-white font-semibold rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Confirm on WhatsApp
                </button>
              )}
            </div>
            
            {/* Step Indicator */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Step {currentStep + 1} of {BOOKING_STEPS.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Booking Confirmation Toast ---
const BookingConfirmationToast = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-20 left-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 shadow-2xl shadow-green-500/30"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm">Booking Started Successfully!</h3>
          <p className="text-white/90 text-xs mt-1">
            Check WhatsApp for confirmation. Our wedding expert will contact you within 30 minutes.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-white/20">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-white/80 text-[10px] font-medium">
            Response time: 30 minutes | Delivery: 7-10 days
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   4. MAIN COMPONENT
   ========================================================================== */

export default function SanskaraaMobileApp() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookingComplete = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-800 pb-20">
      
      

      {/* Main Content Area */}
      <main className="pt-6 px-4 max-w-md mx-auto md:max-w-none mt-12">


        {/* Search Input */}
        <div className="relative mb-6">
           <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
           <input 
             type="text" 
             placeholder="Search invites, décor..." 
             className="w-full pl-11 pr-4 py-3 bg-white rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[#800000]/20 outline-none border border-gray-100 placeholder-gray-400"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-[#800000] to-[#4a0000] p-6 text-white shadow-lg shadow-red-900/15 mb-8 relative overflow-hidden"
        >
           <div className="relative z-10">
             <p className="text-xs font-bold text-yellow-400 mb-1 tracking-wider">EASY BOOKING</p>
             <h2 className="font-serif text-2xl font-bold leading-tight mb-3">Book in 4 Simple Steps</h2>
             <p className="text-sm text-white/90 mb-4">Select → Customize → Confirm → WhatsApp</p>
             <button 
               onClick={() => setActiveCategory("All")}
               className="bg-white text-[#800000] text-xs font-bold px-5 py-2.5 rounded-full shadow-sm active:scale-95 transition-transform"
             >
               Shop Collection
             </button>
           </div>
           <div className="absolute -right-6 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Categories */}
        <div className="mb-8">
           <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-bold text-gray-800 text-sm">Shop by Category</h3>
              <span className="text-[10px] text-gray-500">{filteredProducts.length} items</span>
           </div>
           <div className="-mx-4 overflow-x-auto scrollbar-hide px-4 pb-2">
             <div className="flex gap-3 w-max">
               {CATEGORIES.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
                     activeCategory === cat 
                       ? "bg-[#800000] text-white border-[#800000] shadow-md shadow-red-900/10" 
                       : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* Product Grid */}
        <div className="mb-4">
           <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-bold text-gray-800 text-lg font-serif">Trending Now</h3>
              <button 
                onClick={() => setActiveCategory("All")}
                className="text-xs text-[#800000] font-semibold"
              >
                View All
              </button>
           </div>

           {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-2 gap-4 pb-8">
               {filteredProducts.map((product) => (
                 <ProductCard 
                   key={product.id} 
                   product={product} 
                   onClick={setSelectedProduct}
                   onBookNow={setBookingProduct}
                 />
               ))}
             </div>
           ) : (
             <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-6 h-6 text-gray-400" />
               </div>
               <p className="text-gray-400 text-sm">No items found for "{searchTerm}"</p>
               <button 
                 onClick={() => {setActiveCategory('All'); setSearchTerm('')}}
                 className="mt-2 text-[#800000] text-xs font-bold underline"
               >
                 Clear Filters
               </button>
             </div>
           )}
        </div>

        {/* Booking Benefits Section */}
        <div className="bg-white rounded-2xl p-5 mb-8 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Why Book With Us?</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">WhatsApp Confirmation</p>
                <p className="text-[10px] text-gray-500">Instant booking confirmation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Secure Process</p>
                <p className="text-[10px] text-gray-500">Verified WhatsApp business</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Quick Response</p>
                <p className="text-[10px] text-gray-500">Within 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Insured Delivery</p>
                <p className="text-[10px] text-gray-500">Pan-India coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Booking CTA */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 mb-8 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Need Help?</h3>
              <p className="text-xs text-gray-600">Our wedding experts are ready to assist</p>
            </div>
          </div>
          <a 
            href="https://wa.me/916201486202"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md shadow-green-600/20 active:scale-95 transition-transform"
          >
            <Phone size={16} />
            Chat with Expert
          </a>
        </div>
      </main>

      {/* Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductBottomSheet 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onBookNow={setBookingProduct}
        />
      )}

      {bookingProduct && (
        <BookingFormSheet
          product={bookingProduct}
          onClose={() => setBookingProduct(null)}
          onComplete={handleBookingComplete}
        />
      )}

      <BookingConfirmationToast 
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />

      {/* FIXED CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}