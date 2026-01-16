import React, { useState, useEffect, useRef,useMemo } from "react";
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
  Filter,
  ArrowRight 
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

const Badge = ({
  children,
  variant = "red",
  icon: Icon,
  size = "sm",
}) => {
  const variants = {
    red: "bg-[#800000]/90 text-white border border-[#600000]",
    amber: "bg-amber-50 text-amber-800 border border-amber-200",
    green: "bg-green-50 text-green-800 border border-green-200",
    blue: "bg-blue-50 text-blue-800 border border-blue-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full
        font-semibold tracking-wide
        shadow-sm backdrop-blur
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {Icon && <Icon size={12} className="opacity-80" />}
      {children}
    </span>
  );
};


const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: "bg-[#FFF7E0]",
      border: "border-orange-200",
      text: "text-[#800000]",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: AlertCircle,
      iconColor: "text-red-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: Info,
      iconColor: "text-blue-600",
    },
  };

  const { bg, border, text, icon: Icon, iconColor } = styles[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      role="alert"
      aria-live="assertive"
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] w-fit max-w-[90vw]"
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl
          shadow-xl border backdrop-blur
          ${bg} ${border} ${text}
        `}
      >
        <Icon size={18} className={iconColor} />

        <span className="text-sm font-medium leading-snug">
          {message}
        </span>

        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-black/5 transition"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ product, onClick, onBookNow }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // -------- SAFE DATA --------
  const price = product?.pricing?.basePrice ?? product?.price ?? 0;
  const rating = product?.rating?.value ?? product?.rating ?? 0;
  const image =
    product?.media?.thumbnail ||
    product?.img ||
    "/images/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group bg-[#FFF7E0] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-orange-200 flex flex-col h-full cursor-pointer transition-all"
      onClick={() => onClick?.(product)}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square bg-amber-50 overflow-hidden">
        <img
          src={image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
        />

        {/* STOCK ALERT */}
        {product?.inventory?.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
            Only {product.inventory.stock} left
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.popularity?.popular && <Badge variant="red">POPULAR</Badge>}
          {product?.popularity?.trending && (
            <Badge variant="amber">TRENDING</Badge>
          )}
          {product?.popularity?.bestseller && (
            <Badge variant="green">BESTSELLER</Badge>
          )}
        </div>

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted((p) => !p);
          }}
          className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-full p-2 shadow-md hover:scale-110 transition"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 flex flex-col flex-grow">
        {/* CATEGORY + RATING */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-wide uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            {product?.category}
          </span>

          {rating > 0 && (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-[#800000]">
                {rating}
              </span>
            </div>
          )}
        </div>

        {/* NAME */}
        <h3 className="font-bold text-[#800000] text-sm line-clamp-2 mb-1">
          {product?.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-xs line-clamp-2 mb-4 flex-grow font-medium">
          {product?.description}
        </p>

        {/* PRICE + DELIVERY */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-extrabold text-[#800000]">
                ₹{price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                / {product?.pricing?.priceUnit || "unit"}
              </span>
            </div>

            {product?.delivery?.time && (
              <div className="text-[10px] text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                <Truck size={11} />
                {product.delivery.time}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookNow?.(product);
            }}
            className="w-full py-2.5 bg-gradient-to-r from-[#800000] to-[#600000] text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={15} />
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
      <div
        className={`relative mt-2 transition-all ${
          isFocused ? "scale-[1.01]" : "scale-100"
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none">
          <Search size={18} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search invites, decor, gifts, puja items..."
          className={`
            w-full pl-11 pr-10 py-3
            bg-white rounded-full text-sm
            text-gray-800 placeholder-gray-400
            border transition-all duration-200
            ${
              isFocused
                ? "border-orange-400 ring-2 ring-orange-200 shadow-md"
                : "border-orange-200 shadow-inner"
            }
            focus:outline-none
          `}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Helper Text */}
      {isFocused && (
        <p className="mt-2 text-[11px] text-amber-700 px-2">
          Try searching: <span className="font-medium">Wedding invites</span>,{" "}
          <span className="font-medium">Diya</span>,{" "}
          <span className="font-medium">Puja gifts</span>
        </p>
      )}
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

  /* ================= FILTER LOGIC ================= */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const cat =
        activeCategory === "all" ||
        p.category?.toLowerCase().includes(activeCategory.toLowerCase());

      const search =
        !searchTerm ||
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return cat && search;
    });
  }, [activeCategory, searchTerm]);

  const handleBookNow = (product) => {
    setBookingProduct(product);
    setSelectedProduct(null);
  };

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow =
      selectedProduct || bookingProduct ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [selectedProduct, bookingProduct]);

  /* ================= CUSTOM SCROLL ================= */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .custom-scroll::-webkit-scrollbar { height: 4px; width: 4px; }
      .custom-scroll::-webkit-scrollbar-thumb { background:#f6ad55;border-radius:10px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE4B5] to-[#FFD7A3] text-gray-800">
      {/* ================= SEARCH ================= */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

<main className="pb-28">
  {/* ================= HERO ================= */}
  <section className="px-4 pt-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#800000] via-[#8b0000] to-[#a52a2a] p-7 text-white shadow-2xl border border-[#600000]"
    >
      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#fff,transparent_40%)]" />

      <span className="relative inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold mb-4 border border-white/30">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Serving 50+ Cities
      </span>

      <h1 className="relative text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
        Celebrate Traditions <br />
        <span className="text-amber-200">with Sanskaraa</span>
      </h1>

      <p className="relative text-amber-100 text-sm sm:text-base max-w-md mb-6">
        Premium wedding essentials, puja kits & cultural decor —
        thoughtfully curated with devotion.
      </p>

      <button
        onClick={() => setActiveCategory("all")}
        className="relative inline-flex items-center gap-2 px-6 py-3 bg-[#FFF7E0] text-[#800000] font-bold rounded-xl shadow-lg hover:bg-white active:scale-95 transition"
      >
        Explore Collection
        <ArrowRight size={16} />
      </button>
    </motion.div>
  </section>

  {/* ================= CATEGORIES ================= */}
  <section className="px-4 pt-8">
    <h2 className="font-bold text-[#800000] text-lg mb-4 flex items-center gap-2">
      <Grid size={18} className="text-amber-600" />
      Browse Categories
    </h2>

    <div className="flex gap-3 overflow-x-auto custom-scroll pb-3">
      {CATEGORIES.map((cat) => {
        const active = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`min-w-[95px] px-4 py-3 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold transition-all duration-300 ${
              active
                ? "bg-gradient-to-br from-[#800000] to-[#a52a2a] text-white shadow-xl scale-105"
                : "bg-[#FFF7E0] border border-orange-200 text-amber-900 hover:shadow-md hover:border-orange-400"
            }`}
          >
            <cat.icon size={22} />
            {cat.name}
          </button>
        );
      })}
    </div>
  </section>

  {/* ================= PRODUCTS ================= */}
  <section className="px-4 pt-8">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="font-bold text-[#800000] text-lg">
          {activeCategory === "all"
            ? "Featured Products"
            : CATEGORIES.find((c) => c.id === activeCategory)?.name}
        </h2>
        <p className="text-sm text-amber-800 font-medium mt-0.5">
          {filteredProducts.length} items found
        </p>
      </div>

      <button className="p-2.5 rounded-xl border border-orange-200 bg-[#FFF7E0] hover:bg-white shadow-sm hover:shadow-md transition">
        <Filter size={18} />
      </button>
    </div>

    {isLoading ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-orange-100 animate-pulse"
          />
        ))}
      </div>
    ) : filteredProducts.length ? (
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
      <div className="text-center py-14 border-2 border-dashed border-orange-300 rounded-3xl bg-[#FFF7E0]/70">
        <Search size={44} className="mx-auto text-orange-400 mb-4" />
        <p className="font-bold text-[#800000] text-lg">
          No products found
        </p>
        <p className="text-sm text-amber-800 mb-5">
          Try changing keywords or selecting another category
        </p>
        <button
          onClick={() => {
            setSearchTerm("");
            setActiveCategory("all");
          }}
          className="px-6 py-3 bg-gradient-to-r from-[#800000] to-[#a52a2a] text-white rounded-xl font-bold shadow-lg active:scale-95"
        >
          View All Products
        </button>
      </div>
    )}
  </section>



        {/* ================= TRUST ================= */}
        <section className="px-4 py-10">
          <h3 className="text-center text-xl font-bold text-[#800000] mb-6 flex justify-center items-center gap-2">
            <Sparkles className="text-amber-500" /> Why Sanskaraa
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, label: "Verified Quality" },
              { icon: Truck, label: "All India Delivery" },
              { icon: CheckCircle, label: "Secure Booking" },
              { icon: MessageCircle, label: "24/7 Support" },
            ].map((i, idx) => (
              <div
                key={idx}
                className="bg-[#FFF7E0] border border-orange-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <i.icon size={26} className="mx-auto text-amber-600 mb-2" />
                <p className="font-bold text-sm text-[#800000]">{i.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= MODALS ================= */}
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
                  type: "success",
                  message:
                    "Booking confirmed! Our team will contact you shortly.",
                });
              }}
              onCancel={() => setBookingProduct(null)}
            />
          </ResponsiveModal>
        )}
      </AnimatePresence>

      {/* ================= TOAST ================= */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
