import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Heart,
  Star,
  Grid,
  Share2,
  Calendar,
  CheckCircle,
  Truck,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  Gift,
  Tag,
  Package,
  Check,
  Plus,
  Minus,
  Filter
} from "lucide-react";

/* ==========================================================================
   1. DATA LAYER
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Royal Rajwada Invite",
    category: "Invitations",
    price: 15000,
    rating: 4.8,
    reviews: 128,
    img: "https://images.unsplash.com/photo-1605218427368-35b0e50f305f?w=800&fit=crop&q=80",
    description: "Handcrafted velvet box invite with pure gold foil detailing and custom wax seal.",
    deliveryTime: "7-10 days",
    customizations: ["Names", "Date", "Venue", "Monogram"],
    features: ["Gold Foil", "Velvet Box", "Wax Seal", "Customizable"],
    popular: true,
    stock: 15,
    minOrder: 50,
    tags: ["Premium", "Luxury"]
  },
  {
    id: 2,
    name: "Golden Acrylic Signage",
    category: "Decor",
    price: 4500,
    rating: 4.9,
    reviews: 89,
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop&q=80",
    description: "Welcome guests with elegant 24x36 mirror-gold acrylic signage.",
    deliveryTime: "5-7 days",
    customizations: ["Text", "Design", "Size", "Font"],
    features: ["Acrylic Material", "Mirror Gold", "Stand Included"],
    trending: true,
    stock: 42,
    minOrder: 1,
    tags: ["Modern", "Elegant"]
  },
  {
    id: 3,
    name: "Saffron & Rose Hamper",
    category: "Gifting",
    price: 9500,
    rating: 5.0,
    reviews: 56,
    img: "https://images.unsplash.com/photo-1596464716127-f9a0859b4afd?w=800&fit=crop&q=80",
    description: "Premium Kashmiri saffron, dried roses, and artisanal sweets.",
    deliveryTime: "3-5 days",
    customizations: ["Message", "Ribbon Color", "Add-ons"],
    features: ["Premium Saffron", "Gift Wrapped", "Custom Message"],
    bestseller: true,
    stock: 28,
    minOrder: 10,
    tags: ["Premium", "Gourmet"]
  },
  {
    id: 4,
    name: "Vintage Brass Diya Set",
    category: "Decor",
    price: 12000,
    rating: 4.7,
    reviews: 203,
    img: "https://images.unsplash.com/photo-1620311494747-16d4d42296d6?w=800&fit=crop&q=80",
    description: "Set of 4 antique-finish brass lamps with traditional carvings.",
    deliveryTime: "10-14 days",
    customizations: ["Engraving", "Finish", "Size"],
    features: ["Antique Finish", "Set of 4", "Brass Material"],
    stock: 8,
    minOrder: 1,
    tags: ["Traditional", "Handcrafted"]
  },
  {
    id: 5,
    name: "Floral Varmala Set",
    category: "Essentials",
    price: 6500,
    rating: 4.6,
    reviews: 167,
    img: "https://images.unsplash.com/photo-1583934555026-6f85ed3dd40f?w=800&fit=crop&q=80",
    description: "Fresh red roses and baby breath garlands, preserved for freshness.",
    deliveryTime: "2-4 days",
    customizations: ["Flower Type", "Length", "Colors"],
    features: ["Preserved Freshness", "Red Roses", "Baby Breath"],
    trending: true,
    stock: 35,
    minOrder: 2,
    tags: ["Fresh", "Traditional"]
  },
  {
    id: 6,
    name: "Shagun Envelopes (100pc)",
    category: "Stationery",
    price: 2500,
    rating: 4.9,
    reviews: 312,
    img: "https://images.unsplash.com/photo-1628151016056-b049389e1f57?w=800&fit=crop&q=80",
    description: "Silk fabric envelopes with coin holder and magnetic closure.",
    deliveryTime: "5-7 days",
    customizations: ["Color", "Printing", "Quantity"],
    features: ["Silk Fabric", "Coin Holder", "Magnetic Closure"],
    stock: 150,
    minOrder: 50,
    tags: ["Practical", "Traditional"]
  }
];

const CATEGORIES = [
  { id: "all", name: "All", icon: Grid },
  { id: "invitations", name: "Invites", icon: Calendar },
  { id: "decor", name: "Decor", icon: Sparkles },
  { id: "gifting", name: "Gifts", icon: Gift },
  { id: "essentials", name: "Essentials", icon: Package },
  { id: "stationery", name: "Stationery", icon: Tag }
];

/* ==========================================================================
   2. UI COMPONENTS
   ========================================================================== */

const Badge = ({ children, color, icon: Icon }) => {
  const colors = {
    red: "bg-[#800000] text-white",
    amber: "bg-amber-500 text-white",
    green: "bg-emerald-500 text-white",
    blue: "bg-blue-500 text-white"
  };
  
  return (
    <div className={`${colors[color]} text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
      {Icon && <Icon size={10} />}
      {children}
    </div>
  );
};

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-[90vw]"
    >
      <div className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 ${
        type === "success" ? "bg-green-500 text-white" :
        type === "error" ? "bg-red-500 text-white" :
        "bg-blue-500 text-white"
      }`}>
        {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ product, onClick, onBookNow }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            Only {product.stock}
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.popular && <Badge color="red">POPULAR</Badge>}
          {product.trending && <Badge color="amber">TRENDING</Badge>}
          {product.bestseller && <Badge color="green">BEST</Badge>}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-500 uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-yellow-500 fill-yellow-500"/>
            <span className="text-xs font-bold text-gray-900">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-xs line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#800000]">₹{product.price.toLocaleString()}</span>
              <span className="text-xs text-gray-500 ml-1">/ unit</span>
            </div>
            <div className="text-[10px] text-gray-500 flex items-center gap-1">
              <Truck size={10} />
              {product.deliveryTime}
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(product);
            }}
            className="w-full py-2 bg-gradient-to-r from-[#800000] to-[#600000] text-white text-sm font-bold rounded-lg hover:shadow transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   3. MODAL COMPONENTS
   ========================================================================== */

const ModalBackdrop = ({ onClick }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
    className="fixed inset-0 z-50 bg-black/60"
  />
);

const ResponsiveModal = ({ children, onClose, title, size = "md" }) => {
  const modalRef = useRef();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const modalSizes = {
    sm: "md:max-w-md",
    md: "md:max-w-2xl",
    lg: "md:max-w-4xl"
  };

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-2 md:p-4">
        <motion.div 
          ref={modalRef}
          initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`pointer-events-auto relative w-full ${modalSizes[size]} bg-white rounded-t-2xl md:rounded-2xl overflow-hidden max-h-[85vh] md:max-h-[80vh] flex flex-col shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <X size={18} className="text-gray-500"/>
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </div>
    </>
  );
};

const ProductDetailsView = ({ product, onBookNow }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrder || 1);

  const images = [
    product.img,
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&fit=crop&q=80"
  ];

  return (
    <div className="pb-4">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 mb-3">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border ${
                  selectedImage === idx ? 'border-2 border-[#800000]' : 'border-gray-200'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge color="blue">{product.category}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews})</span>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-sm mb-3">
                {product.description}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[#800000]">
                  ₹{(product.price * quantity).toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.2 * quantity).toLocaleString()}</span>
                <span className="text-sm text-green-600 font-bold">20% OFF</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Truck size={14} />
                <span>{product.deliveryTime} delivery</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Min. {product.minOrder || 1})
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(q => Math.max(product.minOrder || 1, q - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
                >
                  <Minus size={14} />
                </button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
                >
                  <Plus size={14} />
                </button>
                <span className="text-xs text-gray-500 ml-2">
                  {product.stock} available
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Key Features</h3>
              <div className="space-y-1">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <a 
                href={`https://wa.me/916201486202?text=Hi, I'm interested in ${product.name} (${product.id})`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <button 
                onClick={() => onBookNow({ ...product, quantity })}
                className="bg-gradient-to-r from-[#800000] to-[#600000] text-white font-bold py-2.5 rounded-lg active:scale-95 transition-transform shadow-md mb-12"
              >
                Book Now - ₹{(product.price * quantity).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingWizard = ({ product, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    quantity: product.minOrder || 1,
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: ""
  });

  const steps = [
    { id: 1, title: "Details", icon: ShoppingBag },
    { id: 2, title: "Contact", icon: MessageCircle },
    { id: 3, title: "Delivery", icon: Truck },
    { id: 4, title: "Confirm", icon: CheckCircle }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const message = `New Booking: ${product.name}
Quantity: ${formData.quantity}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}, ${formData.city} - ${formData.pincode}

Total: ₹${(product.price * formData.quantity).toLocaleString()}`;
    
    window.open(`https://wa.me/916201486202?text=${encodeURIComponent(message)}`, '_blank');
    onComplete();
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Stepper */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                step >= s.id
                  ? 'bg-[#800000] text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step > s.id ? <Check size={12} /> : <s.icon size={12} />}
              </div>
              <span className={`text-[10px] mt-1 font-medium text-center ${
                step >= s.id ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex gap-3">
                <img src={product.img} className="w-14 h-14 rounded-lg object-cover" alt={product.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-[#800000] font-bold">₹{product.price.toLocaleString()} / unit</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleInputChange('quantity', Math.max(product.minOrder || 1, formData.quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min={product.minOrder || 1}
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || product.minOrder || 1)}
                  className="w-14 text-center text-base font-bold border rounded-lg py-1"
                />
                <button 
                  onClick={() => handleInputChange('quantity', formData.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold text-[#800000]">
                  ₹{(product.price * formData.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm h-20"
                placeholder="Enter complete address"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 rounded-lg border text-sm"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to Confirm!</h3>
              <p className="text-gray-600 text-sm">
                Review your order details below
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Product</span>
                <span className="font-bold">{product.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity</span>
                <span className="font-bold">{formData.quantity} units</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-bold">Total Amount</span>
                <span className="text-lg font-bold text-[#800000]">
                  ₹{(product.price * formData.quantity).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Booking</p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Your booking will be confirmed via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm active:bg-gray-50"
          >
            Back
          </button>
        )}
        
        <button 
          onClick={() => step < 4 ? setStep(s => s + 1) : handleSubmit()}
          className="flex-1 bg-gradient-to-r from-[#800000] to-[#600000] text-white py-2.5 rounded-lg font-bold text-sm active:scale-95 transition-transform mb-12"
        >
          {step === 4 ? "Confirm & Send" : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. SEARCH BAR COMPONENT (Simple - No Header Navbar)
   ========================================================================== */

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 py-3 px-4 mt-12">
      <div className="relative  mt-12">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400  ">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search invitations, decor, gifts..." 
          className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#800000] focus:bg-white"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   5. MAIN APP COMPONENT (No Header/Footer Navbar)
   ========================================================================== */

export default function SanskaraaApp() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "all" || 
      p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (product) => {
    setBookingProduct(product);
    setSelectedProduct(null);
  };

  const handleAddToWishlist = (product) => {
    setToast({
      message: `Added ${product.name} to wishlist`,
      type: "success"
    });
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProduct || bookingProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct, bookingProduct]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Simple Search Bar Only */}
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main>
        {/* Hero Banner */}
        <div className="px-4 py-6 ">
          <div className="rounded-xl bg-gradient-to-r from-[#800000] to-[#600000] p-5 text-white">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-bold">SERVING 50+ CITIES</span>
              </div>
              <h1 className="text-2xl font-bold mb-3">Celebrate Traditions with Sanskaraa</h1>
              <p className="text-white/90 text-sm mb-5">
                Premium wedding essentials, puja kits, and traditional decor delivered across India
              </p>
              <button 
                onClick={() => setActiveCategory("all")}
                className="px-5 py-2.5 bg-white text-[#800000] font-bold rounded-lg active:scale-95 transition-transform shadow-md"
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-4">
          <h2 className="font-bold text-gray-900 text-lg mb-3">Browse Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center p-3 rounded-xl min-w-[80px] transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#800000] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                <cat.icon size={20} className="mb-2" />
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">
                {activeCategory === "all" ? "Featured Products" : CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredProducts.length} products found
              </p>
            </div>
            <button className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-gray-300">
              <Filter size={18} />
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-9 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct}
                    onBookNow={handleBookNow}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No products found</p>
              <p className="text-gray-400 text-sm mt-1 mb-4">Try different keywords or categories</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('all')}}
                className="px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg active:scale-95 transition-transform"
              >
                View All Products
              </button>
            </div>
          )}
        </div>

        {/* Trust Section */}
        <div className="px-4 py-8">
          <h3 className="text-center font-bold text-gray-900 text-xl mb-6">Why Choose Us</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={24} />
              </div>
              <p className="font-medium text-gray-900 mb-1">Verified Quality</p>
              <p className="text-xs text-gray-500">100% Authentic Products</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Truck size={24} />
              </div>
              <p className="font-medium text-gray-900 mb-1">All India Delivery</p>
              <p className="text-xs text-gray-500">Fast & Insured Shipping</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} />
              </div>
              <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
              <p className="text-xs text-gray-500">100% Safe Transactions</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-3">
                <MessageCircle size={24} />
              </div>
              <p className="font-medium text-gray-900 mb-1">24/7 Support</p>
              <p className="text-xs text-gray-500">Always Available to Help</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 py-8">
          <div className="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-5 text-white">
            <h3 className="font-bold text-xl mb-3">Need Help Planning?</h3>
            <p className="text-white/80 text-sm mb-5 max-w-md">
              Book a free consultation with our wedding experts for personalized guidance
            </p>
            <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg active:scale-95 transition-transform shadow-md">
              Book Free Consultation
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedProduct && (
          <ResponsiveModal 
            title="Product Details" 
            onClose={() => setSelectedProduct(null)}
            size="lg"
          >
            <ProductDetailsView 
              product={selectedProduct} 
              onBookNow={handleBookNow}
            />
          </ResponsiveModal>
        )}

        {bookingProduct && (
          <ResponsiveModal 
            title="Complete Booking" 
            onClose={() => setBookingProduct(null)}
            size="md"
          >
            <BookingWizard 
              product={bookingProduct} 
              onComplete={() => {
                setBookingProduct(null);
                setToast({
                  message: "Booking confirmed! Our team will contact you shortly.",
                  type: "success"
                });
              }}
              onCancel={() => setBookingProduct(null)}
            />
          </ResponsiveModal>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Prevent pull-to-refresh on mobile */
        @media (max-width: 768px) {
          body {
            overscroll-behavior-y: none;
          }
        }
        
        /* Custom scrollbar */
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}