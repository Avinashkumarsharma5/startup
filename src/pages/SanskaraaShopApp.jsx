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
   1. DATA LAYER (Unchanged)
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Royal Rajwada Invite",
    category: "Invitations",
    price: 15000,
    rating: 4.8,
    reviews: 128,
    img: "images/invitation01.png",
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
    img: "images/invitation02.png",
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
    img: "images/invitation03.png",
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
    img: "images/invitation04.png",
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
    img: "images/invitation05.png",
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
    img: "images/invitation06.png",
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
   2. UI COMPONENTS (Restyled)
   ========================================================================== */

const Badge = ({ children, color, icon: Icon }) => {
  const colors = {
    red: "bg-[#800000] text-white border border-[#600000]",
    amber: "bg-amber-100 text-amber-800 border border-amber-200",
    green: "bg-green-100 text-green-800 border border-green-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200"
  };
  
  return (
    <div className={`${colors[color]} text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm`}>
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
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-[90vw]"
    >
      <div className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2 ${
        type === "success" ? "bg-[#FFF7E0] border-orange-200 text-[#800000]" :
        type === "error" ? "bg-red-50 border-red-200 text-red-800" :
        "bg-blue-50 border-blue-200 text-blue-800"
      }`}>
        {type === "success" ? <CheckCircle size={18} className="text-green-600" /> : <AlertCircle size={18} />}
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
      className="group bg-[#FFF7E0] rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-orange-200 flex flex-col h-full cursor-pointer transition-all duration-300"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square bg-amber-50 overflow-hidden">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
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
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-medium text-amber-800 uppercase bg-amber-100 px-1.5 py-0.5 rounded">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-500 fill-amber-500"/>
            <span className="text-xs font-bold text-[#800000]">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-[#800000] text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-xs line-clamp-2 mb-3 flex-grow font-medium">
          {product.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#800000]">₹{product.price.toLocaleString()}</span>
              <span className="text-xs text-gray-500 ml-1">/ unit</span>
            </div>
            <div className="text-[10px] text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
              <Truck size={10} />
              {product.deliveryTime}
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(product);
            }}
            className="w-full py-2 bg-[#800000] text-white text-sm font-bold rounded-lg hover:bg-[#600000] hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   3. MODAL COMPONENTS (Restyled)
   ========================================================================== */

const ModalBackdrop = ({ onClick }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
    className="fixed inset-0 z-50 bg-[#800000]/20 backdrop-blur-sm"
  />
);

const ResponsiveModal = ({ children, onClose, title, size = "md" }) => {
  const modalRef = useRef();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const modalSizes = { sm: "md:max-w-md", md: "md:max-w-2xl", lg: "md:max-w-4xl" };

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
          className={`pointer-events-auto relative w-full ${modalSizes[size]} bg-[#FFF7E0] rounded-t-2xl md:rounded-2xl overflow-hidden max-h-[85vh] md:max-h-[80vh] flex flex-col shadow-2xl border border-orange-200`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-orange-200 bg-[#FFF7E0]">
            <h2 className="text-lg font-bold text-[#800000]">{title}</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-amber-100 rounded-full transition-colors">
              <X size={18} className="text-amber-800"/>
            </button>
          </div>
          <div className="overflow-y-auto flex-1 custom-scroll bg-white/50">
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

  const images = [product.img, "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&fit=crop&q=80", "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&fit=crop&q=80"];

  return (
    <div className="pb-4">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="h-56 md:h-64 rounded-xl overflow-hidden bg-amber-50 mb-3 border border-orange-100 shadow-sm">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-[#800000]' : 'border-orange-100'
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
                <Badge color="amber">{product.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-[#800000]">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews})</span>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-[#800000] mb-1">{product.name}</h1>
              <p className="text-gray-700 text-sm mb-3">{product.description}</p>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-orange-100">
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[#800000]">₹{(product.price * quantity).toLocaleString()}</span>
                <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.2 * quantity).toLocaleString()}</span>
                <span className="text-sm text-green-600 font-bold">20% OFF</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-amber-800">
                <Truck size={14} />
                <span>{product.deliveryTime} delivery</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Quantity (Min. {product.minOrder || 1})</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(q => Math.max(product.minOrder || 1, q - 1))} className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center">
                  <Minus size={14} />
                </button>
                <span className="text-lg font-bold w-8 text-center text-[#800000]">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center">
                  <Plus size={14} />
                </button>
                <span className="text-xs text-amber-700 ml-2">{product.stock} available</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#800000] mb-2">Key Features</h3>
              <div className="space-y-1">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-orange-200">
            <div className="flex flex-col gap-2">
              <a 
                href={`https://wa.me/916201486202?text=Hi, I'm interested in ${product.name} (${product.id})`}
                target="_blank" rel="noreferrer"
                className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <button 
                onClick={() => onBookNow({ ...product, quantity })}
                className="bg-[#800000] hover:bg-[#600000] text-white font-bold py-2.5 rounded-lg active:scale-95 transition-transform shadow-md mb-12"
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
    quantity: product.minOrder || 1, name: "", phone: "", email: "", address: "", city: "", pincode: ""
  });

  const steps = [
    { id: 1, title: "Details", icon: ShoppingBag },
    { id: 2, title: "Contact", icon: MessageCircle },
    { id: 3, title: "Delivery", icon: Truck },
    { id: 4, title: "Confirm", icon: CheckCircle }
  ];

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    const message = `New Booking: ${product.name}\nQuantity: ${formData.quantity}\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\nTotal: ₹${(product.price * formData.quantity).toLocaleString()}`;
    window.open(`https://wa.me/916201486202?text=${encodeURIComponent(message)}`, '_blank');
    onComplete();
  };

  return (
    <div className="p-4 h-full flex flex-col bg-[#FFF7E0]/50">
      {/* Stepper */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                step >= s.id ? 'bg-[#800000] text-white shadow-md' : 'bg-orange-100 text-orange-300'
              }`}>
                {step > s.id ? <Check size={14} /> : <s.icon size={14} />}
              </div>
              <span className={`text-[10px] mt-1 font-medium text-center ${
                step >= s.id ? 'text-[#800000]' : 'text-gray-400'
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
            <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-sm">
              <div className="flex gap-3">
                <img src={product.img} className="w-14 h-14 rounded-lg object-cover" alt={product.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-[#800000] text-sm">{product.name}</h4>
                  <p className="text-amber-600 font-bold">₹{product.price.toLocaleString()} / unit</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3 justify-center bg-white p-4 rounded-xl border border-orange-100">
                <button onClick={() => handleInputChange('quantity', Math.max(product.minOrder || 1, formData.quantity - 1))} className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200">
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min={product.minOrder || 1}
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || product.minOrder || 1)}
                  className="w-16 text-center text-lg font-bold border-b-2 border-orange-300 py-1 bg-transparent focus:outline-none"
                />
                <button onClick={() => handleInputChange('quantity', formData.quantity + 1)} className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="bg-amber-100 p-3 rounded-xl border border-amber-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-900">Total Amount</span>
                <span className="text-xl font-bold text-[#800000]">₹{(product.price * formData.quantity).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
             {['name', 'phone', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field} *</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-3 bg-white rounded-lg border border-orange-200 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    placeholder={`Enter ${field}`}
                    required
                  />
                </div>
             ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 bg-white rounded-lg border border-orange-200 text-sm h-24 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                placeholder="Enter complete address"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['city', 'pincode'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field} *</label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-3 bg-white rounded-lg border border-orange-200 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    placeholder={field}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-[#800000] mb-1">Ready to Confirm!</h3>
              <p className="text-gray-600 text-sm">Review your order details below</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-200 space-y-2 shadow-sm">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Product</span><span className="font-bold text-[#800000]">{product.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Quantity</span><span className="font-bold">{formData.quantity} units</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-orange-100"><span className="font-bold text-amber-900">Total Amount</span><span className="text-lg font-bold text-[#800000]">₹{(product.price * formData.quantity).toLocaleString()}</span></div>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Booking</p>
                  <p className="text-xs text-blue-700 mt-0.5">Your booking will be confirmed via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 pt-4 border-t border-orange-200 flex gap-2">
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className="px-4 py-2.5 border border-orange-300 rounded-lg font-medium text-amber-900 text-sm hover:bg-amber-50 mb-12"
          >
            Back
          </button>
        )}
        
        <button 
          onClick={() => step < 4 ? setStep(s => s + 1) : handleSubmit()}
          className="flex-1 bg-[#800000] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#600000] active:scale-95 transition-transform mb-12 shadow-md"
        >
          {step === 4 ? "Confirm & Send" : "Continue"}
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. SEARCH BAR COMPONENT (Updated to match Warm Theme)
   ========================================================================== */

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-[#FFF7E0]/95 backdrop-blur-md border-b border-orange-200 py-3 px-4 mt-12 shadow-sm">
      <div className="relative mt-2">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search invitations, decor, gifts..." 
          className="w-full pl-10 pr-8 py-2.5 bg-white border border-orange-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 shadow-inner"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   5. MAIN APP COMPONENT (Gradient Background Applied)
   ========================================================================== */

export default function SanskaraaApp() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (product) => {
    setBookingProduct(product);
    setSelectedProduct(null);
  };

  useEffect(() => {
    document.body.style.overflow = (selectedProduct || bookingProduct) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct, bookingProduct]);

  // Add scrollbar styles dynamically
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
      .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      .custom-scroll::-webkit-scrollbar-thumb { background-color: #fbd38d; border-radius: 20px; }
      .custom-scroll::-webkit-scrollbar-thumb:hover { background-color: #f6ad55; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] font-sans text-gray-800">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="pb-24">
        {/* Hero Banner */}
        <div className="px-4 py-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#800000] to-[#A52A2A] p-5 text-white shadow-lg border border-[#600000]">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full mb-4 border border-white/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-wider">SERVING 50+ CITIES</span>
              </div>
              <h1 className="text-2xl font-bold mb-3 leading-tight">Celebrate Traditions with Sanskaraa</h1>
              <p className="text-amber-100 text-sm mb-5 font-medium">Premium wedding essentials, puja kits, and traditional decor delivered across India</p>
              <button 
                onClick={() => setActiveCategory("all")}
                className="px-5 py-2.5 bg-[#FFF7E0] text-[#800000] font-bold rounded-lg active:scale-95 transition-transform shadow-md hover:bg-white"
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-2">
          <h2 className="font-bold text-[#800000] text-lg mb-3 flex items-center gap-2">
            <Grid size={18} className="text-amber-600"/> Browse Categories
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 custom-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center p-3 rounded-xl min-w-[85px] transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#800000] text-white shadow-lg scale-105 border border-[#600000]"
                    : "bg-[#FFF7E0] text-amber-900 border border-orange-200 hover:border-orange-400 hover:shadow-md"
                }`}
              >
                <cat.icon size={22} className="mb-2" />
                <span className="text-xs font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#800000] text-lg">
                {activeCategory === "all" ? "Featured Products" : CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-amber-800 text-sm mt-1 font-medium">
                {filteredProducts.length} products found
              </p>
            </div>
            <button className="p-2.5 rounded-lg border border-orange-200 bg-[#FFF7E0] text-amber-800 hover:bg-white transition-colors shadow-sm">
              <Filter size={18} />
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-[#FFF7E0] rounded-xl p-3 animate-pulse border border-orange-200">
                  <div className="aspect-square bg-orange-100 rounded-lg mb-3"></div>
                  <div className="h-3 bg-orange-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-orange-100 rounded w-1/2 mb-3"></div>
                  <div className="h-9 bg-orange-100 rounded"></div>
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
            <div className="text-center py-10 bg-[#FFF7E0]/50 rounded-xl border-2 border-dashed border-orange-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-[#800000] font-bold text-lg">No products found</p>
              <p className="text-amber-800 text-sm mt-1 mb-4">Try different keywords or categories</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('all')}}
                className="px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg active:scale-95 transition-transform hover:bg-[#A52A2A]"
              >
                View All Products
              </button>
            </div>
          )}
        </div>

        {/* Trust Section */}
        <div className="px-4 py-8">
          <h3 className="text-center font-bold text-[#800000] text-xl mb-6 flex items-center justify-center gap-2">
            <Sparkles size={20} className="text-amber-500"/> Why Choose Sanskaraa
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
                {icon: ShieldCheck, title: "Verified Quality", desc: "100% Authentic", color: "text-green-600", bg: "bg-green-50"},
                {icon: Truck, title: "All India Delivery", desc: "Fast & Insured", color: "text-blue-600", bg: "bg-blue-50"},
                {icon: CheckCircle, title: "Secure Payment", desc: "100% Safe", color: "text-purple-600", bg: "bg-purple-50"},
                {icon: MessageCircle, title: "24/7 Support", desc: "Always Available", color: "text-orange-600", bg: "bg-orange-50"}
            ].map((item, idx) => (
                <div key={idx} className="bg-[#FFF7E0] p-4 rounded-xl border border-orange-200 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-3 border border-opacity-20 border-gray-400`}>
                        <item.icon size={24} />
                    </div>
                    <p className="font-bold text-[#800000] mb-1 text-sm">{item.title}</p>
                    <p className="text-xs text-amber-800">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 py-4 mb-20">
          <div className="rounded-xl bg-gradient-to-r from-gray-900 via-[#2d1b1b] to-[#4a0404] p-5 text-white shadow-xl border border-gray-700">
            <h3 className="font-bold text-xl mb-2 text-amber-100">Need Help Planning?</h3>
            <p className="text-gray-300 text-sm mb-5 max-w-md">Book a free consultation with our wedding experts for personalized guidance</p>
            <button className="w-full py-3 bg-gradient-to-r from-[#FFF7E0] to-[#FFD7A3] text-[#800000] font-bold rounded-lg active:scale-95 transition-transform shadow-md">
              Book Free Consultation
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedProduct && (
          <ResponsiveModal title="Product Details" onClose={() => setSelectedProduct(null)} size="lg">
            <ProductDetailsView product={selectedProduct} onBookNow={handleBookNow} />
          </ResponsiveModal>
        )}
        {bookingProduct && (
          <ResponsiveModal title="Complete Booking" onClose={() => setBookingProduct(null)} size="md">
            <BookingWizard product={bookingProduct} onComplete={() => {
                setBookingProduct(null);
                setToast({ message: "Booking confirmed! Our team will contact you shortly.", type: "success" });
              }} 
              onCancel={() => setBookingProduct(null)} 
            />
          </ResponsiveModal>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}