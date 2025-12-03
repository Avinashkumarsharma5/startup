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
  ShoppingCart, Trash2, Minus
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
const servicesData = {
  venues: [
    { id: 1, name: "Luxury Wedding Hall", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&fit=crop", rating: 4.9, price: 150000, reviews: 156, category: "Luxury", location: "Delhi", trending: true, discount: 15 },
    { id: 2, name: "Garden Wedding Venue", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&fit=crop", rating: 4.7, price: 120000, reviews: 89, category: "Outdoor", location: "Mumbai" },
  ],
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
    { 
      id: 12, 
      name: "Acrylic Welcome Sign with Gold Foil", 
      img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop", 
      rating: 4.8, 
      price: 4500, 
      originalPrice: 6000,
      category: "Signage", 
      trending: true,
      discount: 25,
      unit: "/piece"
    },
    { 
      id: 13, 
      name: "Premium Wedding Invitation Set", 
      img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&fit=crop", 
      rating: 4.7, 
      price: 12000, 
      category: "Stationery",
      unit: "/100 sets"
    },
    { 
      id: 14, 
      name: "Digital Invitation Design Package", 
      img: "https://images.unsplash.com/photo-1565689228803-69d705515d2f?w=800&fit=crop", 
      rating: 4.9, 
      price: 8000, 
      category: "Digital", 
      trending: true,
      discount: 15
    },
    { 
      id: 15, 
      name: "Custom Wedding Favor Tags", 
      img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop", 
      rating: 4.6, 
      price: 1800, 
      originalPrice: 2500,
      category: "Favors", 
      unit: "/100 pcs",
      discount: 28
    },
    { 
      id: 16, 
      name: "Bridal Sangeet Gift Box Set", 
      img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop", 
      rating: 4.5, 
      price: 9500, 
      category: "Gifts",
      trending: true
    },
    { 
      id: 17, 
      name: "Wedding Crew T-Shirts", 
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop", 
      rating: 4.4, 
      price: 850, 
      originalPrice: 1200,
      category: "Apparel", 
      unit: "/piece",
      discount: 30
    },
    { 
      id: 18, 
      name: "Personalized Water Bottles", 
      img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&fit=crop", 
      rating: 4.3, 
      price: 350, 
      category: "Essentials",
      unit: "/piece"
    },
    { 
      id: 19, 
      name: "Royal Gold Foil Invitations", 
      img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&fit=crop", 
      rating: 4.7, 
      price: 15000, 
      originalPrice: 20000,
      category: "Premium Cards", 
      trending: true,
      discount: 25,
      unit: "/50 sets"
    }
  ],
  other: [
    { id: 20, name: "Full Planning", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&fit=crop", rating: 4.9, price: 100000, category: "Planning", trending: true },
    { id: 21, name: "Bridal Makeup", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&fit=crop", rating: 4.8, price: 25000, category: "Beauty" },
    { id: 22, name: "Mehndi Art", img: "https://images.unsplash.com/photo-1618517351616-38d9dd3b1c67?w=800&fit=crop", rating: 4.7, price: 15000, category: "Beauty" },
    { id: 23, name: "Car Decor", img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&fit=crop", rating: 4.5, price: 8000, category: "Decor" },
  ]
};

// --------------------------- Categories ---------------------------
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

// --------------------------- Cart Context ---------------------------
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      itemCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
      <CartModal />
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// --------------------------- Cart Floating Button ---------------------------
const CartFloatingButton = () => {
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-28 sm:bottom-32 right-3 sm:right-6 z-[89] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#800000] to-[#A52A2A] rounded-full shadow-2xl flex items-center justify-center hover:shadow-[#800000]/40 transition-all"
    >
      <ShoppingCart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#FFD700] text-[#800000] rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </motion.div>
      )}
    </motion.button>
  );
};

// --------------------------- Cart Modal ---------------------------
const CartModal = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    itemCount,
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  const { addToast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }

    const message = `🛍️ *CART CHECKOUT - Sanskaraa Store* 🛍️

*Order Summary:*
${cartItems.map((item, index) => `
${index + 1}. ${item.name}
   • Quantity: ${item.quantity}
   • Price: ₹${item.price.toLocaleString()}${item.unit ? ` ${item.unit}` : ''}
   • Subtotal: ₹${(item.price * item.quantity).toLocaleString()}
`).join('')}

*Total Items:* ${itemCount}
*Total Amount:* ₹${cartTotal.toLocaleString()}

*Customer Details:*
Please share your details for delivery:
👤 Name: 
📞 Phone: 
📧 Email: 
📍 Delivery Address: 

*Delivery Preferences:*
📅 Preferred Delivery Date: 
⏰ Time Slot: 
📝 Special Instructions: 

_This order was placed via Sanskaraa Store Cart_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "916201486202";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    addToast('Proceeding to WhatsApp checkout!', 'success');
  };

  if (!isCartOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={() => setIsCartOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden mx-2 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} className="text-[#800000]" />
            <div>
              <h2 className="text-xl font-serif font-bold text-[#800000]">Your Cart</h2>
              <p className="text-sm text-gray-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some beautiful wedding items to get started!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-lg font-bold text-[#800000]">
                        ₹{item.price.toLocaleString()}
                        {item.unit && <span className="text-sm text-gray-500 ml-1">{item.unit}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 sm:p-6 bg-white sticky bottom-0">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-[#800000] pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setIsCartOpen(false)}
                className="py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                className="py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-lg hover:shadow-lg transition-shadow font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Checkout on WhatsApp
              </button>
            </div>
          </div>
        )}
      </motion.div>
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
        className="bg-white rounded-xl sm:rounded-3xl max-w-md w-full p-4 sm:p-6 lg:p-8 text-center mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
        >
          <CheckCircle size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" />
        </motion.div>

        <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-[#800000] mb-3 sm:mb-4">
          Enquiry Submitted Successfully!
        </h2>

        <p className="text-gray-600 mb-2 text-xs sm:text-sm lg:text-base">
          Thank you <strong>{booking.customer.name}</strong> for your interest in
        </p>
        <p className="font-semibold text-[#800000] mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">{booking.service.name}</p>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <UserCheck size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#800000]" />
              <span>Our executive will contact you within 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#800000]" />
              <span>On your number: {booking.customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#800000]" />
              <span>Event Date: {booking.customer.eventDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF7E0] border border-[#FFD700] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-[#800000] font-medium">
            📞 Need immediate assistance? Call us at <strong>+91 6201486202</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 sm:py-3 bg-[#800000] text-white rounded-lg hover:bg-[#A52A2A] transition-colors font-semibold text-sm sm:text-base"
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-[#800000] truncate">{service.name}</h2>
              <div className="flex items-center gap-2 sm:gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#FFD700] fill-current" />
                  <span className="font-semibold text-xs sm:text-sm lg:text-base">{service.rating}</span>
                  <span className="text-gray-600 text-xs sm:text-sm">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#800000]" />
                  <span className="text-gray-600 text-xs sm:text-sm">{service.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2"
            >
              <X size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Image Gallery */}
            <div>
              <div className="rounded-lg sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
                <img 
                  src={service.img} 
                  alt={service.name}
                  className="w-full h-40 sm:h-48 lg:h-64 xl:h-80 object-cover"
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
                      <CheckCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Premium Quality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Professional Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">Timely Delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
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
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#800000]">
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
          <div className="flex gap-2 sm:gap-3 lg:gap-4">
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
              <MessageCircle size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
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
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-100%", opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          className="absolute text-[#FFD700]/20 font-serif"
          style={{ 
            left: `${Math.random() * 100}%`, 
            fontSize: `${Math.random() * 12 + 6}px` 
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
      <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FFD700] mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
        {count}+
      </div>
      <div className="text-stone-300 text-xs sm:text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl sm:rounded-[2rem] overflow-hidden shadow-sm h-full flex flex-col animate-pulse border border-[#FFD700]/20">
    <div className="h-32 sm:h-40 lg:h-48 bg-gray-100"></div>
    <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
      <div className="h-4 sm:h-5 lg:h-6 bg-gray-100 rounded w-3/4"></div>
      <div className="h-3 sm:h-4 bg-gray-100 rounded w-1/2"></div>
      <div className="flex justify-between mt-3 sm:mt-4 lg:mt-6">
         <div className="h-4 sm:h-5 lg:h-6 bg-gray-100 rounded w-1/3"></div>
         <div className="h-6 sm:h-8 bg-gray-100 rounded-full w-1/4"></div>
      </div>
    </div>
  </div>
);

const SupportFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-[90] flex flex-col items-end gap-2 sm:gap-3 lg:gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-1 sm:gap-2 lg:gap-3 items-end mb-2">
            <motion.a
              href="https://wa.me/916201486202" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-1 sm:gap-2 lg:gap-3 bg-[#25D366] text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-full shadow-xl hover:bg-[#128C7E] transition-colors group text-xs sm:text-sm"
            >
              <span className="font-semibold whitespace-nowrap">WhatsApp</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <MessageCircle size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              </div>
            </motion.a>

            <motion.a
              href="tel:+916201486202"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex items-center gap-1 sm:gap-2 lg:gap-3 bg-blue-600 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-full shadow-xl hover:bg-blue-700 transition-colors group text-xs sm:text-sm"
            >
              <span className="font-semibold whitespace-nowrap">Call Now</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Phone size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ring-2 sm:ring-3 lg:ring-4 ring-[#FFD700]/40 ${
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
              <X className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="headset"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Headphones className="text-[#FFD700] w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
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
      className="group bg-white rounded-lg sm:rounded-xl lg:rounded-[2rem] border border-[#FFD700]/20 shadow-sm hover:shadow-[0_8px_30px_rgba(128,0,0,0.1)] transition-all duration-500 overflow-hidden relative h-full flex flex-col"
    >
      {/* Discount Ribbon */}
      {service.discount && (
        <div className="absolute top-0 right-0 z-20 overflow-hidden rounded-tr-lg sm:rounded-tr-xl lg:rounded-tr-[2rem]">
          <div className="bg-[#800000] text-white text-[8px] sm:text-[9px] lg:text-[10px] font-bold px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-bl-md sm:rounded-bl-lg lg:rounded-bl-2xl shadow-md">
            {service.discount}% OFF
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-32 sm:h-36 lg:h-40 xl:h-48 overflow-hidden cursor-pointer" onClick={onViewDetails}>
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
          className="absolute top-1.5 sm:top-2 lg:top-3 left-1.5 sm:left-2 lg:left-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white transition-all z-20 group/heart shadow-lg"
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-colors ${
            isWishlisted ? 'fill-[#800000] text-[#800000]' : 'text-white group-hover/heart:text-[#800000]'
          }`} />
        </motion.button>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-1.5 sm:bottom-2 lg:bottom-3 left-1.5 sm:left-2 lg:left-3 right-1.5 sm:right-2 lg:right-3 flex justify-between items-end text-white z-10">
          <div>
            <span className="inline-block px-1 sm:px-1.5 lg:px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/30 rounded text-[8px] sm:text-[9px] lg:text-[10px] font-semibold mb-0.5 sm:mb-1 tracking-wide uppercase text-[#FFD700]">
              {service.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 opacity-90">
              <MapPin size={8} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-[#FFD700]" />
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-medium text-white">{service.location || 'India'}</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-1 sm:px-1.5 lg:px-2 py-0.5 sm:py-1 rounded text-[#1a0505]">
            <Star size={8} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 fill-[#1a0505] text-[#1a0505]" />
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold">{service.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 lg:p-4 flex flex-col flex-1 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 lg:w-10 h-0.5 sm:h-1 bg-[#FFD700]/30 rounded-b-full opacity-50"></div>
        
        <h3 
          className="font-serif font-bold text-sm sm:text-base lg:text-lg text-[#1a0505] mb-1 group-hover:text-[#800000] transition-colors leading-tight cursor-pointer line-clamp-2"
          onClick={onViewDetails}
        >
          {service.name}
        </h3>
        
        <p className="text-stone-500 text-xs leading-relaxed mb-2 sm:mb-3 lg:mb-4 line-clamp-2">
          {service.description || "Experience the finest traditional service crafted for your special day."}
        </p>
        
        <div className="mt-auto pt-2 sm:pt-3 border-t border-dashed border-[#FFD700]/30 flex items-center justify-between">
          <div>
            <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-[#800000]/70 font-bold uppercase tracking-wider mb-0.5">
              Starting From
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#800000]">
              ₹{service.price.toLocaleString()}
              {service.unit && <span className="text-xs text-stone-400 font-normal ml-0.5">{service.unit}</span>}
            </p>
          </div>
          
          <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewDetails}
              className="px-1.5 sm:px-2 lg:px-3 border border-[#800000] text-[#800000] rounded-full text-[10px] sm:text-xs font-semibold hover:bg-[#800000] hover:text-white transition-all whitespace-nowrap"
            >
              Details
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBook(service)}
              className="px-1.5 sm:px-2 lg:px-3 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white rounded-full text-[10px] sm:text-xs font-semibold shadow-lg shadow-[#800000]/20 hover:shadow-[#800000]/40 transition-all flex items-center gap-0.5 whitespace-nowrap"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------- Enhanced ShopItemCard for Mobile ---------------------------
const ShopItemCard = ({ item, onClick }) => {
  const { addToast } = useToast();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
    addToast(`${item.name} added to cart!`, 'success');
  };

  const handleQuickBuy = (e) => {
    e.stopPropagation();
    const message = `🛍️ *QUICK BUY - Sanskaraa Store* 🛍️

*Product Details:*
🏷️ Product: ${item.name}
💰 Price: ₹${item.price} ${item.unit || ''}
🏷️ Category: ${item.category}
⭐ Rating: ${item.rating}/5

*Customer Note:*
Hi, I want to buy this item immediately. Please confirm availability and share payment details.

_This is a quick buy request via Sanskaraa Store_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "916201486202";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    addToast('Opening WhatsApp for quick buy!', 'success');
  };

  return (
    <motion.div 
      layout
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden border border-[#FFD700]/20 shadow-sm hover:shadow-[0_8px_30px_rgba(128,0,0,0.1)] transition-all duration-500 relative cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Badges - Optimized for Mobile */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {item.trending && (
          <div className="bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white text-[8px] xs:text-[9px] sm:text-[10px] font-bold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full shadow-md flex items-center gap-0.5 xs:gap-1">
            <TrendingUp size={8} className="xs:w-2 xs:h-2" />
            <span className="whitespace-nowrap">TRENDING</span>
          </div>
        )}
        {item.discount && (
          <div className="bg-[#FFD700] text-[#800000] text-[8px] xs:text-[9px] sm:text-[10px] font-bold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full shadow-md">
            {item.discount}% OFF
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
        <button 
          onClick={handleAddToCart}
          className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#800000] hover:text-white active:scale-95 transition-all"
          title="Add to Cart"
        >
          <Plus size={14} className="sm:w-4 sm:h-4" />
        </button>
        <button 
          onClick={handleQuickBuy}
          className="w-8 h-8 sm:w-9 sm:h-9 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] active:scale-95 transition-all"
          title="Quick Buy"
        >
          <MessageCircle size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Image Container - Optimized Aspect Ratio for Mobile */}
      <div className="relative pt-[75%] sm:pt-[100%] overflow-hidden">
        <img 
          src={item.img} 
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Quick View Overlay for Mobile */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-xs sm:text-sm font-semibold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Quick View
          </div>
        </div>
      </div>

      {/* Content - Optimized for Mobile */}
      <div className="p-2 xs:p-3 sm:p-4 flex flex-col flex-1">
        <div className="mb-2 xs:mb-3">
          <div className="flex items-center gap-1 mb-1 xs:mb-1.5 flex-wrap">
            <div className="flex items-center gap-0.5">
              <Star size={10} className="xs:w-2 xs:h-2 sm:w-3 sm:h-3 text-[#FFD700] fill-current" />
              <span className="text-[10px] xs:text-xs font-semibold text-gray-700">{item.rating}</span>
            </div>
            <span className="text-[8px] xs:text-[10px] text-gray-400 mx-1">•</span>
            <span className="text-[8px] xs:text-[10px] text-gray-500 truncate">{item.category}</span>
          </div>
          
          <h3 className="font-serif font-bold text-[#1a0505] text-sm xs:text-base sm:text-lg leading-tight line-clamp-2 mb-1 xs:mb-2 min-h-[2.5em]">
            {item.name}
          </h3>
          
          <p className="text-gray-600 text-[10px] xs:text-xs leading-relaxed line-clamp-2 mb-2 xs:mb-3 min-h-[2.5em]">
            Premium wedding essential with traditional craftsmanship and modern design.
          </p>
        </div>

        {/* Price & Action - Optimized for Mobile */}
        <div className="mt-auto pt-2 xs:pt-3 border-t border-dashed border-gray-100 flex items-center justify-between">
          <div className="min-w-0">
            {item.originalPrice && (
              <p className="text-[10px] xs:text-xs text-gray-400 line-through mb-0.5 truncate">
                ₹{item.originalPrice.toLocaleString()}
              </p>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-base xs:text-lg sm:text-xl font-bold text-[#800000] truncate">
                ₹{item.price.toLocaleString()}
              </span>
              {item.unit && (
                <span className="text-[10px] xs:text-xs text-gray-500 truncate">{item.unit}</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-1">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="px-2 xs:px-3 py-1.5 xs:py-2 bg-white border border-[#800000] text-[#800000] text-[10px] xs:text-xs font-semibold rounded-lg hover:bg-[#800000] hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5 whitespace-nowrap active:scale-95"
              title="Add to Cart"
            >
              <Plus size={10} className="xs:w-3 xs:h-3" />
              <span className="hidden xs:inline">Cart</span>
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="px-2 xs:px-3 py-1.5 xs:py-2 bg-[#800000] text-white text-[10px] xs:text-xs font-semibold rounded-lg hover:bg-[#A52A2A] transition-colors flex items-center gap-1 xs:gap-1.5 whitespace-nowrap active:scale-95"
            >
              <ShoppingBag size={10} className="xs:w-3 xs:h-3" />
              <span className="hidden xs:inline">View</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FFD700]/30 rounded-full opacity-0 group-hover:opacity-100 md:hidden transition-opacity"></div>
    </motion.div>
  );
};

// --------------------------- Enhanced ProductDetailModal with Cart Options ---------------------------
const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToast } = useToast();
  const { addToCart, setIsCartOpen } = useCart();

  if (!isOpen || !product) return null;

  const productImages = [
    product.img,
    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&fit=crop",
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop"
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${quantity} × ${product.name} added to cart!`, 'success');
    onClose();
  };

  const handleBuyNow = () => {
    const message = `🛍️ *IMMEDIATE PURCHASE - Sanskaraa Store* 🛍️

*Product Details:*
🏷️ Product: ${product.name}
💰 Price: ₹${product.price} ${product.unit || ''}
📦 Quantity: ${quantity}
💵 Total: ₹${(product.price * quantity).toLocaleString()}
🏷️ Category: ${product.category}
⭐ Rating: ${product.rating}/5

*Customer Details:*
Please confirm availability and share payment options. I need this delivered as soon as possible.

*Delivery Details Required:*
👤 Name: 
📞 Phone: 
📧 Email: 
📍 Delivery Address: 
📅 Preferred Delivery Date: 

_This purchase request was made via Sanskaraa Store_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "916201486202";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    addToast('Opening WhatsApp for purchase!', 'success');
    onClose();
  };

  const handleQuickCheckout = () => {
    addToCart(product, quantity);
    addToast('Added to cart! Opening cart...', 'success');
    onClose();
    setTimeout(() => setIsCartOpen(true), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingBag size={20} className="text-[#800000]" />
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#800000]">Product Details</h2>
              <p className="text-xs sm:text-sm text-gray-600">Sanskaraa Shop • Premium Collection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 aspect-square">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.trending && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <TrendingUp size={12} />
                    TRENDING
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button 
                    onClick={() => addToCart(product, 1)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#800000] hover:text-white transition-colors shadow-lg"
                    title="Add to Cart"
                  >
                    <Plus size={16} className="text-gray-700" />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      addToast('Link copied to clipboard!', 'success');
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                    title="Share"
                  >
                    <Share2 size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#800000] ring-2 ring-[#800000]/20' 
                        : 'border-gray-200 hover:border-[#800000]/50'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FFF7E0] text-[#800000] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider border border-[#FFD700]/30">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#FFD700]">
                    <Star size={14} className="sm:w-4 sm:h-4 fill-current" />
                    <span className="text-gray-700 text-sm sm:text-base font-bold">{product.rating}</span>
                    <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1a0505] mb-3">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <div>
                    <span className="text-3xl sm:text-4xl font-bold text-[#800000]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.unit && (
                      <span className="text-gray-500 text-sm sm:text-base ml-1">
                        {product.unit}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Premium quality wedding essential crafted with attention to detail. Perfect for adding that special touch to your celebrations. Made with durable materials and exquisite finish that reflects traditional Indian craftsmanship with modern elegance.
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Premium Quality Material',
                    'Traditional Craftsmanship',
                    'Modern Design',
                    'Durable & Long-lasting',
                    'Easy to Setup',
                    'Customizable Options'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Select Quantity</h4>
                    <p className="text-gray-600 text-sm">Choose how many units you need</p>
                  </div>
                  <div className="flex items-center bg-white rounded-lg border border-gray-300">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-lg font-bold text-[#1a0505]">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-2xl font-bold text-[#800000]">
                        ₹{(product.price * quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                      <p className="text-xs text-green-600 font-semibold">Free Shipping</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-[#FFF7E0] rounded-xl border border-[#FFD700]/30">
                  <Truck size={20} className="mx-auto text-[#800000] mb-1" />
                  <p className="text-xs font-semibold text-[#800000]">Free Delivery</p>
                  <p className="text-[10px] text-gray-600">3-5 days</p>
                </div>
                <div className="text-center p-3 bg-[#FFF7E0] rounded-xl border border-[#FFD700]/30">
                  <RotateCcw size={20} className="mx-auto text-[#800000] mb-1" />
                  <p className="text-xs font-semibold text-[#800000]">7-Day Returns</p>
                  <p className="text-[10px] text-gray-600">Easy return policy</p>
                </div>
                <div className="text-center p-3 bg-[#FFF7E0] rounded-xl border border-[#FFD700]/30">
                  <ShieldCheck size={20} className="mx-auto text-[#800000] mb-1" />
                  <p className="text-xs font-semibold text-[#800000]">Quality Checked</p>
                  <p className="text-[10px] text-gray-600">100% authentic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons - Updated with Cart Options */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleAddToCart}
              className="py-3 sm:py-4 border border-[#800000] text-[#800000] rounded-xl font-semibold hover:bg-[#800000] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add to Cart
            </button>
            
            <button
              onClick={handleQuickCheckout}
              className="py-3 sm:py-4 bg-[#800000] text-white rounded-xl font-bold hover:bg-[#A52A2A] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Buy Now
            </button>
            
            <button
              onClick={handleBuyNow}
              className="py-3 sm:py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp Buy
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection = ({ query, setQuery, location, setLocation }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden flex flex-col items-center justify-center text-center px-2 sm:px-4 bg-[#1a0505] mt-11">
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
        className="absolute top-3 sm:top-4 lg:top-6 left-0 w-full flex justify-center z-20 px-2 "
      >
         <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-white/10 backdrop-blur-md px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full border border-white/20 shadow-2xl">
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-[#800000] rounded-full flex items-center justify-center shadow-inner border border-[#FFD700]/50">
                <span className="text-[#FFD700] font-serif font-bold text-sm sm:text-base lg:text-lg">S</span>
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-white tracking-tight">
              Sanskaraa
            </span>
         </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mt-6 sm:mt-8 lg:mt-10 px-2">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="inline-block py-0.5 px-2 sm:py-1 sm:px-3 lg:py-1.5 lg:px-4 rounded-full bg-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/40 text-[#FFD700] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 lg:mb-6 uppercase shadow-lg">
              India's Premium Wedding Platform
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight drop-shadow-2xl px-2">
              Tradition Meets <span className="text-[#FFD700] italic font-serif">Luxury</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#FAF9F6]/95 backdrop-blur-xl p-1 sm:p-1.5 lg:p-2 rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-2xl flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5 lg:gap-2 max-w-3xl mx-auto border border-[#FFD700]/50 relative z-20"
        >
            <div className="flex items-center px-2 sm:px-3 lg:px-4 xl:px-6 h-10 sm:h-11 lg:h-12 xl:h-14 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-[#FFD700]/30">
                <MapPin size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#800000] mr-1.5 sm:mr-2 lg:mr-3" />
                <select 
                  className="w-full bg-transparent outline-none text-xs sm:text-sm font-semibold text-[#800000] cursor-pointer appearance-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>All Cities</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Udaipur</option>
                  <option>Bangalore</option>
                </select>
                <ChevronDown size={10} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-[#800000]/60 ml-0.5 sm:ml-1 lg:ml-2" />
            </div>
            <div className="flex items-center px-2 sm:px-3 lg:px-4 xl:px-6 h-10 sm:h-11 lg:h-12 xl:h-14 w-full flex-1">
                <Search size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#800000] mr-1.5 sm:mr-2 lg:mr-3" />
                <input 
                    type="text" 
                    placeholder="Search venues, decor, catering..." 
                    className="w-full bg-transparent outline-none text-[#1a0505] placeholder-[#800000]/50 text-xs sm:text-sm font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-br from-[#800000] to-[#A52A2A] hover:to-[#5a1010] text-white px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-[1.5rem] font-semibold transition-all shadow-lg shadow-[#800000]/30 text-xs sm:text-sm flex items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 transform active:scale-95">
                <span>Search</span>
            </button>
        </motion.div>

        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-5 lg:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 text-white/90 text-xs font-medium px-2"
        >
          <span className="opacity-70 text-[#FFD700] text-[10px] sm:text-xs">Trending:</span>
          {['Banquet Halls', 'Bridal Makeup', 'Pre-wedding Shoot', 'Mehndi'].map(tag => (
            <button 
              key={tag} 
              className="px-1.5 sm:px-2 lg:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-[#FFD700]/30 text-[#FFD700] transition-colors backdrop-blur-sm text-[10px] sm:text-xs"
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
    <div className="bg-white px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-[1.5rem] shadow-sm border border-[#FFD700]/20 mb-4 sm:mb-6 lg:mb-8 flex flex-col gap-2 sm:gap-3 lg:gap-4 sticky top-0 z-40 mx-1 sm:mx-0">
      
      {/* Categories Bar */}
      <div className="w-full overflow-x-auto scrollbar-hide flex gap-1.5 sm:gap-2 lg:gap-3 items-center pb-1 sm:pb-1.5 lg:pb-2">
         {categories.map((cat) => {
             const Icon = cat.icon;
             const isActive = activeCategory === cat.key;
             return (
                 <button 
                     key={cat.key}
                     onClick={() => setActiveCategory(cat.key)}
                     className={`flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 xl:gap-2 px-1.5 sm:px-2 lg:px-3 xl:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 whitespace-nowrap border ${
                       isActive 
                         ? 'bg-[#800000] text-white border-[#800000] shadow-md transform scale-105' 
                         : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                     }`}
                 >
                     <Icon size={10} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5" />
                     <span className="text-[10px] sm:text-xs">{cat.label}</span>
                 </button>
             )
         })}
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 items-center justify-between w-full border-t border-stone-100 pt-2 sm:pt-2.5 lg:pt-3">
        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            <button className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1.5 sm:px-2 lg:px-3 xl:px-4 py-1 sm:py-1.5 lg:py-2 bg-[#800000] text-white rounded-full text-[10px] sm:text-xs font-semibold shadow-md whitespace-nowrap">
              <Filter size={10} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" /> 
              <span>Filters</span>
            </button>
            <button className="px-1.5 sm:px-2 lg:px-3 xl:px-4 py-1 sm:py-1.5 lg:py-2 border border-[#FFD700]/30 rounded-full text-[10px] sm:text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Price Range
            </button>
            <button className="px-1.5 sm:px-2 lg:px-3 xl:px-4 py-1 sm:py-1.5 lg:py-2 border border-[#FFD700]/30 rounded-full text-[10px] sm:text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Location
            </button>
            <button className="px-1.5 sm:px-2 lg:px-3 xl:px-4 py-1 sm:py-1.5 lg:py-2 border border-[#FFD700]/30 rounded-full text-[10px] sm:text-xs font-medium text-[#800000] hover:border-[#FFD700] hover:bg-[#FFF7E0] transition-colors whitespace-nowrap bg-[#FAF9F6]">
              Availability
            </button>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 w-full sm:w-auto justify-end">
            <span className="text-[10px] sm:text-xs font-medium text-[#800000]/60 uppercase tracking-wide hidden sm:block">
              Sort By:
            </span>
            <div className="relative">
                <select 
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-[#FAF9F6] pl-1.5 sm:pl-2 lg:pl-3 pr-5 sm:pr-6 lg:pr-7 xl:pr-8 py-1 sm:py-1.5 lg:py-2 rounded text-[10px] sm:text-xs font-semibold text-[#800000] outline-none cursor-pointer border border-[#FFD700]/30 focus:border-[#800000] appearance-none"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="trending">Trending</option>
                </select>
                <ChevronDown size={10} className="absolute right-1 sm:right-1.5 lg:right-2 top-1/2 -translate-y-1/2 text-[#800000] pointer-events-none" />
            </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------- Enhanced Sanskaraa Shop Section ---------------------------
const SanskaraaShopSection = ({ 
  items, 
  onViewProduct, 
  isExpanded, 
  setIsExpanded 
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = isExpanded ? 8 : 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const { itemCount, setIsCartOpen } = useCart();
  
  const displayedItems = isExpanded 
    ? items 
    : items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section className="mb-12 sm:mb-16 lg:mb-20 pt-4 sm:pt-6 lg:pt-8 mt-8 sm:mt-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-3 lg:px-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#800000] to-[#A52A2A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-[#800000]/30">
                <ShoppingBag className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              {/* Animated sparkle */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#FFD700]" />
              </motion.div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-[#800000] truncate">
                  Sanskaraa Shop
                </h2>
                {itemCount > 0 && (
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-3 py-1 bg-[#800000] text-white text-xs font-semibold rounded-full hover:bg-[#A52A2A] transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart size={12} />
                    <span>{itemCount} items</span>
                  </button>
                )}
              </div>
              <p className="text-stone-500 text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1">
                Premium wedding essentials & personalized gifts
              </p>
            </div>
          </div>
          
          {/* Trust Badges - Mobile Horizontal Scroll */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            {[
              { text: 'FREE DELIVERY', icon: Truck },
              { text: 'EASY RETURNS', icon: RotateCcw },
              { text: 'QUALITY CHECKED', icon: ShieldCheck },
              { text: 'CUSTOMIZABLE', icon: Package },
              { text: 'SECURE PAYMENT', icon: Shield }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#FFF7E0] to-[#FFE8B2] rounded-full border border-[#FFD700]/30 flex items-center gap-1.5 sm:gap-2 group cursor-default"
              >
                <badge.icon size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-[#800000] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] sm:text-xs font-bold text-[#800000] whitespace-nowrap">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 text-[#800000] font-semibold text-sm sm:text-base px-3 sm:px-4 py-2 rounded-full border border-[#800000]/20 hover:bg-[#800000] hover:text-white transition-all whitespace-nowrap"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">View Cart</span>
            {itemCount > 0 && (
              <span className="bg-[#FFD700] text-[#800000] text-xs font-bold px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 sm:gap-2 text-[#800000] font-semibold text-sm sm:text-base px-4 sm:px-5 py-2 rounded-full border border-[#800000]/20 hover:bg-[#800000] hover:text-white transition-all whitespace-nowrap"
          >
            <span>{isExpanded ? 'Show Less' : 'View All'}</span>
            {isExpanded ? (
              <ChevronDown className="rotate-180 transition-transform" size={16} />
            ) : (
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Shop Content */}
      <div className="relative">
        {/* Navigation Arrows for Mobile Carousel */}
        {!isExpanded && items.length > itemsPerPage && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-md border border-[#FFD700]/40 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#800000] rotate-90" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-md border border-[#FFD700]/40 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#800000] -rotate-90" />
            </motion.button>
          </>
        )}

        {/* Gradient Overlays for Mobile */}
        {!isExpanded && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none rounded-l-lg"></div>
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent z-20 pointer-events-none rounded-r-lg"></div>
          </>
        )}

        {/* Products Grid/Carousel */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 px-2"
            >
              {displayedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    y: -6,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  className="relative"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 via-[#FFA500]/10 to-[#FFD700]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
                  
                  <ShopItemCard 
                    item={item} 
                    onClick={() => onViewProduct(item)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Mobile Touch Scroll Container */}
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 sm:pb-8 pt-1 px-2 scrollbar-hide snap-x snap-mandatory">
                {displayedItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="snap-start min-w-[calc(100vw-2rem)] xs:min-w-[calc(50vw-1.5rem)] sm:min-w-[calc(33.333vw-1.5rem)] lg:min-w-[calc(25vw-1.5rem)] flex-shrink-0 px-0.5"
                  >
                    <ShopItemCard 
                      item={item} 
                      onClick={() => onViewProduct(item)}
                    />
                  </div>
                ))}
                
                {/* View All Card for Mobile */}
                {!isExpanded && (
                  <div className="snap-start min-w-[calc(100vw-2rem)] xs:min-w-[calc(50vw-1.5rem)] sm:min-w-[calc(33.333vw-1.5rem)] lg:min-w-[calc(25vw-1.5rem)] flex-shrink-0 px-0.5">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExpanded(true)}
                      className="relative h-full bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] border-2 border-dashed border-[#FFD700] rounded-xl sm:rounded-2xl cursor-pointer group overflow-hidden p-4 sm:p-6 flex flex-col justify-center items-center text-center"
                    >
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-16 h-16 bg-[#800000] rounded-full -translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#800000] rounded-full translate-x-12 translate-y-12"></div>
                      </div>
                      
                      {/* Floating Icons */}
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border border-[#FFD700]/30"
                      >
                        <ArrowRight className="text-[#800000] w-6 h-6 sm:w-8 sm:h-8" />
                      </motion.div>
                      
                      <h3 className="font-serif font-bold text-[#800000] text-lg sm:text-xl lg:text-2xl mb-2 relative z-10">
                        Explore More
                      </h3>
                      <p className="text-[#800000]/70 text-xs sm:text-sm mb-4 relative z-10">
                        {items.length}+ premium products
                      </p>
                      
                      <div className="flex items-center gap-1 text-[#800000] text-xs sm:text-sm font-semibold relative z-10 bg-white/80 px-3 py-1.5 rounded-full border border-[#FFD700]/40">
                        <span>Swipe to see more</span>
                        <ChevronDown size={12} className="ml-1" />
                      </div>
                      
                      {/* Product Counts */}
                      <div className="grid grid-cols-2 gap-2 mt-4 w-full relative z-10">
                        {[
                          { label: 'Invitations', count: '25+' },
                          { label: 'Gifts', count: '15+' },
                          { label: 'Decor', count: '20+' },
                          { label: 'Essentials', count: '10+' }
                        ].map((cat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-sm font-bold text-[#800000]">{cat.count}</div>
                            <div className="text-[10px] text-[#800000]/60">{cat.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Scroll Indicator Dots for Mobile */}
              {!isExpanded && totalPages > 1 && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4">
                  {Array.from({ length: totalPages + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index < totalPages) {
                          setCurrentPage(index);
                        } else {
                          setIsExpanded(true);
                        }
                      }}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentPage 
                          ? 'w-6 sm:w-8 bg-[#800000]' 
                          : index === totalPages
                          ? 'w-4 sm:w-5 bg-[#FFD700]'
                          : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Store Stats - Enhanced for Mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mt-12 lg:mt-16"
      >
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="font-serif font-bold text-[#800000] text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
            Why Shop With Us?
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm max-w-2xl mx-auto px-2">
            Trusted by thousands of couples for their wedding essentials
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 px-2">
          {[
            { 
              label: 'Products Available', 
              value: '50+', 
              icon: Package,
              description: 'Curated collection',
              color: 'from-[#800000] to-[#A52A2A]'
            },
            { 
              label: 'Happy Customers', 
              value: '2K+', 
              icon: Users,
              description: 'Across India',
              color: 'from-[#FFD700] to-[#FFA500]'
            },
            { 
              label: 'Cities Served', 
              value: '25+', 
              icon: MapPin,
              description: 'Pan-India delivery',
              color: 'from-[#1a0505] to-[#333]'
            },
            { 
              label: 'Customer Rating', 
              value: '4.8★', 
              icon: Star,
              description: 'Rated excellent',
              color: 'from-[#25D366] to-[#128C7E]'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#FFD700]/20 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group"
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10 p-3 sm:p-4 lg:p-5 text-center">
                <div className="relative inline-block mb-2 sm:mb-3">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative">
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto ${
                      index === 0 ? 'text-[#800000]' :
                      index === 1 ? 'text-[#FFA500]' :
                      index === 2 ? 'text-[#1a0505]' :
                      'text-[#25D366]'
                    }`} />
                  </div>
                </div>
                
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#800000] mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#800000] mb-0.5 sm:mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 sm:mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-[#800000]/30 hover:shadow-[#800000]/50 transition-all"
          >
            <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
            Browse All Products
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

// --------------------------- Footer Component ---------------------------
const Footer = () => {
  return (
    <footer className="bg-[#1a0505] text-white pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-12 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#800000] rounded-full flex items-center justify-center">
                <span className="text-[#FFD700] font-serif font-bold text-lg sm:text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Sanskaraa</h3>
                <p className="text-[#FFD700] text-xs sm:text-sm">India's Premium Wedding Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Creating timeless memories with traditional elegance and modern luxury.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-[#800000] rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={16} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg sm:text-xl mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['About Us', 'Services', 'Portfolio', 'Testimonials', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-[#FFD700] text-sm sm:text-base transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg sm:text-xl mb-4 text-[#FFD700]">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Venue Booking', 'Wedding Planning', 'Catering', 'Photography', 'Decor'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-[#FFD700] text-sm sm:text-base transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg sm:text-xl mb-4 text-[#FFD700]">Contact Us</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone size={16} className="sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Call Us</p>
                  <p className="text-gray-300 text-xs sm:text-sm">+91 6201486202</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail size={16} className="sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Email</p>
                  <p className="text-gray-300 text-xs sm:text-sm">info@sanskaraa.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin size={16} className="sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">Location</p>
                  <p className="text-gray-300 text-xs sm:text-sm">Delhi, Mumbai, Udaipur, Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Sanskaraa Weddings. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Crafted with ❤️ for your special moments
          </p>
        </div>
      </div>
    </footer>
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

  // Shop states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(false);

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

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <ToastProvider>
      <CartProvider>
        <div 
          className="min-h-screen font-sans text-[#1a0505] selection:bg-[#FFD700] selection:text-[#800000] pt-2 sm:pt-4"
          style={{
              background: "radial-gradient(circle at top, rgba(232,200,113,0.12), transparent 40%), radial-gradient(circle at bottom, rgba(122,26,26,0.08), transparent 50%), #FAF9F6"
          }}
        >
          
          {/* Support Floating Button */}
          <SupportFloatingButton />

          {/* Cart Floating Button */}
          <CartFloatingButton />

          {/* Hero Section */}
          <HeroSection 
              query={query} 
              setQuery={setQuery} 
              location={location}
              setLocation={setLocation}
          />

          <main className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 xl:px-6 relative z-20 pb-12 sm:pb-16 lg:pb-20 -mt-8 sm:-mt-12 lg:-mt-16">
              
              {/* Sanskaraa Shop with Enhanced Cart Integration */}
              {(activeCategory === 'all' || activeCategory === 'printedItems') && (
                <SanskaraaShopSection 
                  items={servicesData.printedItems}
                  onViewProduct={handleViewProduct}
                  isExpanded={isShopExpanded}
                  setIsExpanded={setIsShopExpanded}
                />
              )}

              {/* Services Grid */}
              <section>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 lg:mb-8 px-1">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-[#800000] mb-1 sm:mb-2">
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

          {/* Footer */}
          <Footer />

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

          <ProductDetailModal
            product={selectedProduct}
            isOpen={showProductModal}
            onClose={() => setShowProductModal(false)}
          />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}