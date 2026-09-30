// src/pages/RentalStore.jsx
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";


import {
  FiShoppingCart,
  FiSearch,
  FiPlus,
  FiMinus,
  FiX,
  FiCheckCircle,
  FiShield,
  FiPhone,
  FiUser,
  FiCalendar,
  FiHome,
  FiArrowLeft,
  FiShare2,
  FiInfo,
  FiStar,
  FiPackage,
  FiTruck,
  FiMenu,
  FiAlertTriangle,
  FiPlay,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { saveUserBooking } from "../lib/bookings";
import { getCurrentUser } from "../lib/supabaseAuth";

// ========== CULTURAL COLOR THEME ==========
const colors = {
  // Primary Cultural Colors
  culturalRed: "#800000",        // Headlines, Primary Buttons
  maroon: "#A52A2A",             // Hover states
  saffron: "#FFA500",            // Highlights, gradients
  deepSaffron: "#FF8C00",        // Icons, borders, accents
  goldenYellow: "#FFD700",       // Promo blocks, festival tone
  amber: "#FFE8B2",              // Soft backgrounds
  cream: "#FFF7E0",              // Main page background
  lightCream: "#FFF8E7",         // Card backgrounds, inputs
  white: "#FFFFFF",              // Cards, banners, sections
  
  // Semantic Colors
  success: "#059669",            // Green for success states
  error: "#DC2626",              // Red for errors
  warning: "#D97706",            // Amber for warnings
};

// ========== RENTAL PRODUCTS DATA ==========
const rentalProducts = [
  // ========== SOUND & AUDIO EQUIPMENT ==========
  {
    id: 101,
    name: "DJ Console Setup",
    price: 3000,
    category: "Sound & Audio",
    unit: "per day",
    imgGallery: [
      "https://www.recordcase.de/media/9d/15/76/1700594714/07-turntables-controller.jpg",
      "https://www.recordcase.de/media/9d/15/76/1700594714/07-turntables-controller.jpg",
      "https://m.media-amazon.com/images/I/71ci8C22A9L._AC_UF894%2C1000_QL80_.jpg"
    ],
    video: "images/Premium_DJ_Entertainment_Video_Generated.mp4",
    description: "Professional DJ controllers from Pioneer or Numark for seamless mixing",
    minRentalDays: 1,
    deposit: 15000,
    features: ["Professional Grade", "USB Connectivity", "Multi-channel Mixing"],
    popular: true,
    minQuantity: 1,
    icon: "🎵"
  },
  {
    id: 106,
    name: "Wireless Microphone System",
    price: 800,
    category: "Sound & Audio",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400"
    ],
    video: null,
    description: "Dual handheld wireless microphone system",
    minRentalDays: 1,
    deposit: 5000,
    features: ["Dual Handheld Mics", "100m Range", "Battery Backup"],
    popular: true,
    minQuantity: 1,
    icon: "🎤"
  },
  {
    id: 113,
    name: "PA System Complete",
    price: 3500,
    category: "Sound & Audio",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1571330663919-a5c0cfe3c8e9?w=400",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-audience-in-a-concert-venue-43559-large.mp4",
    description: "Complete public announcement system with speakers and mixer",
    minRentalDays: 1,
    deposit: 20000,
    features: ["All-in-One System", "Easy Operation", "Clear Announcements"],
    popular: true,
    minQuantity: 1,
    icon: "📢"
  },
  // ========== LIGHTING & EFFECTS ==========
  {
    id: 202,
    name: "Moving Head Lights",
    price: 1800,
    category: "Lighting & Effects",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-light-effects-on-a-dark-background-42951-large.mp4",
    description: "Professional moving head lights for dynamic effects",
    minRentalDays: 1,
    deposit: 9000,
    features: ["360° Movement", "Pattern Effects", "Sound Activation"],
    popular: true,
    minQuantity: 1,
    icon: "💡"
  },
  {
    id: 205,
    name: "LED Par Lights (Set of 6)",
    price: 1200,
    category: "Lighting & Effects",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
    ],
    video: null,
    description: "RGB LED par lights for vibrant color effects",
    minRentalDays: 1,
    deposit: 6000,
    features: ["RGB Colors", "DMX Control", "Energy Efficient"],
    popular: false,
    minQuantity: 1,
    icon: "🌈"
  },
  // ========== WEDDING & EVENT DECORATION ==========
  {
    id: 304,
    name: "Photo Booth Setup",
    price: 3000,
    category: "Wedding & Decor",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400"
    ],
    video: null,
    description: "Complete photo booth with props and backdrop",
    minRentalDays: 1,
    deposit: 15000,
    features: ["Instant Printing", "Props Included", "Backdrop Options"],
    popular: true,
    minQuantity: 1,
    icon: "📸"
  },
  {
    id: 308,
    name: "Mandap Decor Set",
    price: 5000,
    category: "Wedding & Decor",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
      "https://images.unsplash.com/photo-1465495976272-8ffeac1922a3?w=400"
    ],
    video: null,
    description: "Traditional mandap decoration with flowers and drapes",
    minRentalDays: 1,
    deposit: 25000,
    features: ["Fresh Flowers", "Silk Drapes", "Traditional Design"],
    popular: true,
    minQuantity: 1,
    icon: "🪷"
  },
  // ========== FURNITURE & SEATING ==========
  {
    id: 401,
    name: "Wedding Sofa/Couch",
    price: 1500,
    category: "Furniture & Seating",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400"
    ],
    video: null,
    description: "Elegant wedding sofa for couple seating",
    minRentalDays: 1,
    deposit: 8000,
    features: ["Premium Upholstery", "Comfortable", "Elegant Design"],
    popular: true,
    minQuantity: 1,
    icon: "🛋️"
  },
  {
    id: 411,
    name: "Tent & Shamiyana",
    price: 4500,
    category: "Furniture & Seating",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-wedding-ceremony-outdoors-43563-large.mp4",
    description: "Large tent or shamiyana for outdoor events",
    minRentalDays: 1,
    deposit: 25000,
    features: ["Waterproof", "Side Walls", "Professional Setup"],
    popular: true,
    minQuantity: 1,
    icon: "⛺"
  },
  // ========== CATERING EQUIPMENT ==========
  {
    id: 504,
    name: "Crockery Set (100 pax)",
    price: 800,
    category: "Catering Equipment",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
    ],
    video: null,
    description: "Complete crockery set for 100 people",
    minRentalDays: 1,
    deposit: 4000,
    features: ["Plates + Bowls", "Quality Ceramic", "Complete Set"],
    popular: true,
    minQuantity: 1,
    icon: "🍽️"
  },
  // ========== PHOTOGRAPHY & VIDEOGRAPHY ==========
  {
    id: 606,
    name: "Drone Camera",
    price: 2000,
    category: "Photography & Videography",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400",
      "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-and-a-forest-34455-large.mp4",
    description: "Professional drone for aerial photography",
    minRentalDays: 1,
    deposit: 30000,
    features: ["4K Video", "GPS Stabilization", "Long Flight Time"],
    popular: true,
    minQuantity: 1,
    icon: "🚁"
  },
  // ========== STAGE & EVENT STRUCTURES ==========
  {
    id: 905,
    name: "LED Wall Screen",
    price: 8000,
    category: "Stage & Structures",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-modern-stage-with-laser-light-show-43558-large.mp4",
    description: "High-resolution LED video wall",
    minRentalDays: 1,
    deposit: 50000,
    features: ["High Resolution", "Bright Display", "Professional Quality"],
    popular: true,
    minQuantity: 1,
    icon: "📺"
  },
];

const rentalCategories = [
  "All",
  "Sound & Audio",
  "Lighting & Effects",
  "Wedding & Decor",
  "Furniture & Seating",
  "Catering Equipment",
  "Photography & Videography",
  "Stage & Structures",
];

const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

// Helper to calculate days between two date strings (ISO format)
const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 0;
};

// Function to get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split("T")[0];
};

const ProductCarousel = ({ gallery = [], video, productName }) => {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const touchStartX = useRef(null);

  const hasVideo = video && !videoError;
  const slides = hasVideo ? ["__video__", ...gallery] : gallery;
  const total = slides.length;

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (isHovering || total <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovering, total]);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  /* ================= TOUCH SWIPE ================= */
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (!total) {
    return (
      <div className="h-44 rounded-xl bg-amber-100 flex items-center justify-center text-brown/50">
        No media available
      </div>
    );
  }

  return (
    <div
      className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-amber-100 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ================= SLIDER ================= */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((item, i) => (
          <div key={i} className="min-w-full h-full relative">
            {item === "__video__" ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoError(true)}
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={item}
                alt={`${productName} ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23FFF8E7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%235A3E2B'%3EImage%3C/text%3E%3C/svg%3E")
                }
              />
            )}

            {item === "__video__" && (
              <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiPlay size={12} /> Video
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ================= ARROWS ================= */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition rotate-180"
          >
            <FiArrowLeft />
          </button>
        </>
      )}

      {/* ================= DOTS ================= */}
      {total > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                index === i ? "w-6 bg-orange-500" : "w-2 bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* ================= COUNTER ================= */}
      {total > 1 && (
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
};

// ========== MOBILE FILTERS MODAL ==========
const MobileFiltersModal = ({ isOpen, onClose, selectedCategory, onCategoryChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-16 left-0 right-0 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"

            style={{backgroundColor: colors.cream}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-serif" style={{color: colors.culturalRed}}>Filter Categories</h3>
              <button onClick={onClose} style={{color: colors.culturalRed + 'A0'}} className="p-2">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {rentalCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "text-white shadow-lg"
                      : "bg-white hover:border-saffron/50"
                  }`}
                  style={{
  background: selectedCategory === cat
    ? `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`
    : colors.white,
  borderColor: selectedCategory === cat ? colors.saffron : colors.culturalRed + '20',
  color: selectedCategory === cat ? colors.white : colors.culturalRed
}}

                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ========== PRODUCT DETAIL MODAL COMPONENT (Premium Upgrade) ==========
const ProductDetailModal = ({ product, qty, days, onClose, onAddToCart, onRentNow }) => {
  const totalPrice = product.price * qty * days + product.deposit;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 80 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 120) onClose();
        }}
        className="
          rounded-2xl sm:rounded-3xl
          w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl
          max-h-[92vh] overflow-y-auto
          shadow-2xl relative
        "
        style={{
          background: colors.cream,
          border: `2px solid ${colors.saffron}20`,
        }}
        initial={{ y: 60, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div
          className="px-3 sm:px-4 py-3 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
          style={{
            background: `linear-gradient(to bottom, ${colors.white}EE, ${colors.white}99)`,
            borderBottom: `1px solid ${colors.saffron}30`,
          }}
        >
          <h2
            className="text-base sm:text-lg md:text-xl font-bold font-serif line-clamp-2 pr-3"
            style={{ color: colors.culturalRed }}
          >
            {product.name}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{
              backgroundColor: colors.saffron + "25",
              color: colors.culturalRed,
            }}
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-4">

          {/* Media */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <ProductCarousel
              gallery={product.imgGallery || [product.img]}
              video={product.video}
              productName={product.name}
            />

            <div
              className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-semibold rounded-full px-3 py-1"
              style={{ backgroundColor: colors.culturalRed, color: colors.white }}
            >
              {product.category}
            </div>

            <span className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full bg-black/50 text-white">
              Swipe to view
            </span>
          </div>

          {/* Pricing */}
          <div
            className="rounded-xl p-4 shadow"
            style={{
              background: `linear-gradient(135deg, ${colors.white}, ${colors.lightCream})`,
              border: `1px solid ${colors.saffron}30`,
            }}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xl font-bold" style={{ color: colors.saffron }}>
                  {formatINR(product.price)}
                </p>
                <p className="text-xs opacity-80">{product.unit}</p>
              </div>

              <div className="text-right text-xs">
                <p className="font-semibold text-green-600">
                  Deposit: {formatINR(product.deposit)}
                </p>
                <p className="text-yellow-700">
                  Min {product.minQuantity} qty • {product.minRentalDays} days
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed opacity-90">
            {product.description}
          </p>

          {/* Features */}
          {product?.features?.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-1">
                <FiCheckCircle className="text-saffron" />
                Features
              </h3>

              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: colors.saffron + "10",
                      border: `1px solid ${colors.saffron}25`,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <motion.div
          className="px-3 sm:px-4 pb-4 space-y-3 sticky bottom-0 backdrop-blur-xl border-t pt-3"
          style={{
            background: "linear-gradient(to top, #fff, #fff9)",
            borderColor: colors.saffron + "30",
          }}
        >
          {/* Cost Breakdown */}
          <div
            className="rounded-lg p-3 text-xs space-y-1"
            style={{
              background: colors.lightCream,
              border: `1px dashed ${colors.saffron}40`,
            }}
          >
            <div className="flex justify-between">
              <span>Rental</span>
              <span>{formatINR(product.price)} × {days} × {qty}</span>
            </div>
            <div className="flex justify-between">
              <span>Deposit</span>
              <span>{formatINR(product.deposit)}</span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t"
              style={{ color: colors.saffron }}
            >
              <span>Total</span>
              <span>{formatINR(totalPrice)}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onAddToCart(product, qty, days)}
            className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`,
              color: colors.white,
            }}
          >
            <FiShoppingCart />
            Add for Event
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onRentNow(product, qty, days)}
            className="w-full py-3 rounded-xl font-semibold border"
            style={{
              borderColor: colors.saffron,
              color: colors.saffron,
            }}
          >
            Book Now for Puja
          </motion.button>

          {/* Trust */}
          <p className="text-[10px] text-center opacity-80">
            ✓ Verified Quality • ✓ Hygienic • ✓ Refundable Deposit
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};



// ========== RENTAL ORDER WIZARD MODAL (FULLY SELF-CONTAINED) ==========
const RentalOrderWizardModal = ({
  mode,
  product,
  qty,
  rentalDays,
  cartItems,
  onClose,
  onConfirm,
  rentalDuration,
}) => {
  const [step, setStep] = React.useState(1);
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    eventType: "",
    guestCount: "",
    eventDate: rentalDuration?.eventDate || "",
    deliveryDate: rentalDuration?.deliveryDate || "",
    returnDate: rentalDuration?.returnDate || "",
    deliverySlot: "",
  });

  /* ---------------- ITEMS ---------------- */
  const items = React.useMemo(() => {
    if (mode === "single" && product) {
      return [{ ...product, qty, rentalDays }];
    }
    return cartItems || [];
  }, [mode, product, qty, rentalDays, cartItems]);

  /* ---------------- PRICING ---------------- */
  const pricing = React.useMemo(() => {
    const rentalTotal = items.reduce(
      (sum, i) => sum + i.price * i.qty * i.rentalDays,
      0
    );
    const depositTotal = items.reduce(
      (sum, i) => sum + i.deposit * i.qty,
      0
    );
    const gst = Math.round(rentalTotal * 0.18);
    const delivery = rentalTotal >= 4999 || rentalTotal === 0 ? 0 : 500;
    const pickup = rentalTotal >= 4999 || rentalTotal === 0 ? 0 : 500;

    return {
      rentalTotal,
      depositTotal,
      gst,
      delivery,
      pickup,
      total: rentalTotal + gst + delivery + pickup,
      payableNow: gst + delivery + pickup,
      refundable: depositTotal,
    };
  }, [items]);

  /* ---------------- VALIDATION ---------------- */
  const validateStep1 = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.phone || form.phone.length < 10) e.phone = "Invalid phone";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.pincode) e.pincode = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.eventDate) e.eventDate = "Required";
    if (!form.deliveryDate) e.deliveryDate = "Required";
    if (!form.returnDate) e.returnDate = "Required";
    if (!form.deliverySlot) e.deliverySlot = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleConfirm = () => {
    onConfirm({
      items,
      pricing,
      customer: form,
      schedule: {
        eventDate: form.eventDate,
        deliveryDate: form.deliveryDate,
        returnDate: form.returnDate,
        slot: form.deliverySlot,
      },
      mode,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-xl"
        style={{ background: colors.cream, borderColor: colors.saffron + "30" }}
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.96 }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="font-bold text-lg" style={{ color: colors.culturalRed }}>
            {mode === "single" ? "Quick Rental Order" : "Complete Rental Order"}
          </h2>
          <button onClick={onClose}><FiX /></button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4 min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SectionTitle title="Event & Contact Details" />
                <Input label="Full Name*" value={form.name} error={errors.name}
                  onChange={(v) => setForm(f => ({ ...f, name: v }))} />
                <Input label="Mobile Number*" value={form.phone} error={errors.phone}
                  onChange={(v) => setForm(f => ({ ...f, phone: v }))} />
                <Textarea label="Event Address*" value={form.address} error={errors.address}
                  onChange={(v) => setForm(f => ({ ...f, address: v }))} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City*" value={form.city} error={errors.city}
                    onChange={(v) => setForm(f => ({ ...f, city: v }))} />
                  <Input label="Pincode*" value={form.pincode} error={errors.pincode}
                    onChange={(v) => setForm(f => ({ ...f, pincode: v }))} />
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SectionTitle title="Delivery & Pickup Schedule" />
                <Input type="date" label="Event Date*" value={form.eventDate}
                  error={errors.eventDate}
                  onChange={(v) => setForm(f => ({ ...f, eventDate: v }))} />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" label="Delivery Date*" value={form.deliveryDate}
                    error={errors.deliveryDate}
                    onChange={(v) => setForm(f => ({ ...f, deliveryDate: v }))} />
                  <Input type="date" label="Return Date*" value={form.returnDate}
                    error={errors.returnDate}
                    onChange={(v) => setForm(f => ({ ...f, returnDate: v }))} />
                </div>
                <Select
                  label="Delivery Slot*"
                  value={form.deliverySlot}
                  error={errors.deliverySlot}
                  options={[
                    "6 AM - 9 AM",
                    "9 AM - 12 PM",
                    "12 PM - 3 PM",
                    "3 PM - 6 PM",
                    "6 PM - 9 PM",
                  ]}
                  onChange={(v) => setForm(f => ({ ...f, deliverySlot: v }))} />
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SectionTitle title="Review & Confirm" />
                <div className="rounded-xl p-4 bg-white space-y-2 border">
                  <Row label="Rental Charges" value={formatINR(pricing.rentalTotal)} />
                  <Row label="GST" value={formatINR(pricing.gst)} />
                  <Row label="Delivery + Pickup" value={formatINR(pricing.delivery + pricing.pickup)} />
                  <Row bold label="Total Payable" value={formatINR(pricing.total)} />
                  <Row green label="Refundable Deposit" value={formatINR(pricing.refundable)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-5 border-t bg-white/80 backdrop-blur sticky bottom-0">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-4 py-2 border rounded-lg"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleConfirm : handleNext}
            className="flex-1 py-2 rounded-lg text-white font-semibold"
            style={{ background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})` }}
          >
            {step === 3 ? "Confirm Rental" : "Next"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ========= HELPER COMPONENTS ========= */

const SectionTitle = ({ title }) => (
  <h3 className="font-semibold mb-3" style={{ color: colors.culturalRed }}>
    {title}
  </h3>
);

const Input = ({ label, value, onChange, type = "text", error }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
        error ? "border-red-400" : ""
      }`}
    />
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

const Textarea = ({ label, value, onChange, error }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium">{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
        error ? "border-red-400" : ""
      }`}
    />
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options, error }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
        error ? "border-red-400" : ""
      }`}
    >
      <option value="">Select</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

const Row = ({ label, value, bold, green }) => (
  <div className="flex justify-between text-sm">
    <span className={bold ? "font-semibold" : ""}>{label}</span>
    <span className={`${bold ? "font-semibold" : ""} ${green ? "text-green-600" : ""}`}>
      {value}
    </span>
  </div>
);

// ========== RENTAL SUCCESS PAGE (FINAL POLISHED) ==========
const RentalSuccessPage = ({ order, onBack }) => {
  const [showAnim, setShowAnim] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShowAnim(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleShare = () => {
    if (!order) return;

    const itemsText = order.items
      .map(
        (item) =>
          `• ${item.name} (x${item.qty}, ${item.rentalDays} days) – ₹${item.price * item.qty * item.rentalDays}`
      )
      .join("\n");

    const msg = `🎉 *Sanskaraa Rental Booking Request* 🎉

🆔 Booking ID: ${order.id}
👤 Name: ${order.customer.name}
📞 Phone: ${order.customer.phone}

📦 *Rental Items*
${itemsText}

💰 Total Amount: ₹${order.pricing.total}
🔁 Refundable Deposit: ₹${order.pricing.refundable}

📅 *Schedule*
• Event: ${new Date(order.schedule.eventDate).toLocaleDateString("en-IN")}
• Delivery: ${new Date(order.schedule.deliveryDate).toLocaleDateString("en-IN")} (${order.schedule.slot})
• Return: ${new Date(order.schedule.returnDate).toLocaleDateString("en-IN")}

📍 Address:
${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

🙏 Request received. It is awaiting provider confirmation.`;

    const url = `https://wa.me/916201486202?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  if (!order) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${colors.cream}, ${colors.lightCream})`,
      }}
    >
      <motion.div
        className="relative w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden"
        style={{
          backgroundColor: colors.cream,
          borderColor: colors.saffron + "25",
        }}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
      >
        {/* Celebration Animation */}
        {showAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.saffron + "25" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FiCheckCircle
                className="w-14 h-14"
                style={{ color: colors.saffron }}
              />
            </motion.div>
          </div>
        )}

        {/* Content */}
        <div className="relative p-6">
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{
                backgroundColor: colors.saffron + "20",
                borderColor: colors.saffron + "40",
              }}
            >
              <FiCheckCircle
                className="w-8 h-8"
                style={{ color: colors.saffron }}
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-xl font-bold text-center font-serif"
            style={{ color: colors.culturalRed }}
          >
            Rental request received 🎉
          </h1>

          <p
            className="text-sm text-center mt-1 mb-4"
            style={{ color: colors.culturalRed + "B0" }}
          >
            Your request is saved and is waiting for provider confirmation.
          </p>

          {/* Order Summary */}
          <div
            className="rounded-xl border p-4 text-sm space-y-2"
            style={{
              backgroundColor: colors.white,
              borderColor: colors.culturalRed + "15",
            }}
          >
            <SummaryRow label="Booking ID" value={order.id} />
            <SummaryRow
              label="Items"
              value={`${order.items.length} item(s)`}
            />
            <SummaryRow
              label="Rental Days"
              value={`${calculateDays(
                order.schedule.deliveryDate,
                order.schedule.returnDate
              )} days`}
            />
            <SummaryRow
              label="Total Amount"
              value={formatINR(order.pricing.total)}
              highlight
            />
            <SummaryRow
              label="Refundable Deposit"
              value={formatINR(order.pricing.refundable)}
              success
            />
            <SummaryRow
              label="Event Date"
              value={new Date(order.schedule.eventDate).toLocaleDateString(
                "en-IN"
              )}
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={handleShare}
              className="py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`,
              }}
            >
              <FiShare2 className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={onBack}
              className="py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2"
              style={{
                borderColor: colors.culturalRed + "30",
                color: colors.culturalRed,
              }}
            >
              <FiHome className="w-4 h-4" />
              Back
            </button>
          </div>

          {/* Footer Quote */}
          <p
            className="text-[11px] text-center italic mt-4"
            style={{ color: colors.culturalRed + "80" }}
          >
            “From setup to pickup — we take care of everything.”
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ===== Helper ===== */
const SummaryRow = ({ label, value, highlight, success }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span
      className={`font-semibold ${
        highlight ? "text-orange-600" : success ? "text-green-600" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

// ========== MAIN RENTAL STORE PAGE ==========
export default function RentalStore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Global rental duration for products
  const [rentalDuration, setRentalDuration] = useState({
    deliveryDate: getTomorrowDate(),
    returnDate: getTomorrowDate(),
    rentalDays: 1,
  });

  // State for product details modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    rentalProducts.forEach((p) => {
      initial[p.id] = p.minQuantity || 1;
    });
    return initial;
  });

  // Calculate global rental days based on dates
  useEffect(() => {
    const days = calculateDays(rentalDuration.deliveryDate, rentalDuration.returnDate);
    setRentalDuration((prev) => ({
      ...prev,
      rentalDays: days,
    }));
  }, [rentalDuration.deliveryDate, rentalDuration.returnDate]);

  // Filtered List
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rentalProducts.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  // Quantity handlers
  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const product = rentalProducts.find((p) => p.id === id);
      const minQty = product?.minQuantity || 1;
      const next = current + delta;
      return { ...prev, [id]: next < minQty ? minQty : next };
    });
  };

  const setQty = (id, value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    const product = rentalProducts.find((p) => p.id === id);
    const minQty = product?.minQuantity || 1;
    setQuantities((prev) => ({ ...prev, [id]: num < minQty ? minQty : num }));
  };

  // Cart helpers
  const addToCart = (product, qty, days) => {
    const minQty = product.minQuantity || 1;
    const minDays = product.minRentalDays || 1;
    if (qty < minQty) qty = minQty;
    if (days < minDays) days = minDays;
    
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx === -1) {
        return [{ ...product, qty, rentalDays: days }, ...prev];
      }
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        qty: updated[idx].qty + qty,
        rentalDays: days, 
      };
      return updated;
    });
    setShowProductDetails(false);
    setShowCart(true);
  };

  const updateCartQty = (id, qty) => {
    const product = rentalProducts.find((p) => p.id === id);
    const minQty = product?.minQuantity || 1;
    if (qty < minQty) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };
  
  const updateCartRentalDays = (id, days) => {
    const product = rentalProducts.find(p => p.id === id);
    const minDays = product?.minRentalDays || 1;
    if (days < minDays) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rentalDays: days } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing calculation
  const pricing = useMemo(() => {
    const rentalTotal = cart.reduce(
      (sum, item) => sum + item.price * item.qty * item.rentalDays,
      0
    );
    const depositTotal = cart.reduce(
      (sum, item) => sum + item.deposit * item.qty,
      0
    );
    const gst = Math.round(rentalTotal * 0.18);
    const delivery = rentalTotal === 0 ? 0 : rentalTotal >= 4999 ? 0 : 500;
    const pickup = rentalTotal === 0 ? 0 : rentalTotal >= 4999 ? 0 : 500;
    const total = rentalTotal + gst + delivery + pickup;
    return {
      rentalTotal,
      depositTotal,
      gst,
      delivery,
      pickup,
      total,
      payableNow: gst + delivery + pickup,
      refundable: depositTotal,
    };
  }, [cart]);

  // Rental order flow states
  const [showOrderWizard, setShowOrderWizard] = useState(false);
  const [orderMode, setOrderMode] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [orderRentalDays, setOrderRentalDays] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Start order from cart
  const startCartOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Please add some rental items.");
      return;
    }
    setOrderMode("cart");
    setOrderProduct(null);
    setShowOrderWizard(true);
    setShowCart(false);
  };

  // Start order from single product
  const startSingleOrder = (product, qty, days) => {
    setOrderMode("single");
    setOrderProduct(product);
    setOrderQty(qty);
    setOrderRentalDays(days);
    setShowProductDetails(false);
    setShowOrderWizard(true);
    setShowCart(false);
  };

  // Handle final confirm from wizard
  const handleOrderConfirm = async (orderPayload) => {
    const order = {
      id: Date.now(),
      items: orderPayload.items,
      pricing: orderPayload.pricing,
      customer: orderPayload.customer,
      schedule: orderPayload.schedule,
      mode: orderPayload.mode,
      createdAt: new Date().toISOString(),
    };

    const rentalBooking = {
      id: String(order.id),
      event: order.customer?.eventType || "Event Rental",
      service: "Event Decoration & Rental",
      date: order.schedule?.eventDate || order.createdAt.slice(0, 10),
      time: order.schedule?.slot || "Delivery",
      address: [
        order.customer?.address,
        order.customer?.city,
        order.customer?.pincode,
      ].filter(Boolean).join(", "),
      notes: `${order.items?.length || 0} rental item(s), ${order.schedule?.rentalDays || 1} day(s)`,
      pandit: { name: "Sanskaraa Event Rental", image: "" },
      status: "Confirmed",
      kitStatus: "Pending",
      decorationStatus: "Confirmed",
      totalAmount: order.pricing?.total || 0,
      type: "event-rental",
      details: order,
      createdAt: order.createdAt,
    };

    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("Please sign in before placing a rental booking request.");
        navigate("/login", { state: { returnTo: "/eventspage" } });
        return;
      }
      order.id = await saveUserBooking(rentalBooking);
      order.status = "PENDING";
    } catch (error) {
      console.error("Could not save rental order:", error);
      alert(error.message || "Rental order save nahi ho saka. Please try again.");
      return;
    }

    // If order from cart, clear cart
    if (order.mode === "cart") {
      setCart([]);
    }

    setShowOrderWizard(false);
    setOrderSuccess(order);

    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Sanskaraa Rental Service", {
        body: `Rental request saved for ₹${order.pricing.total}. Event on ${new Date(
          order.schedule.eventDate
        ).toLocaleDateString("en-IN")}.`,
        icon: "/images/logo.png",
      });
    }
  };

  // Ask notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Handle date change for global rental period
  const handleDateChange = (key, value) => {
    setRentalDuration((prev) => {
      let newDates = { ...prev, [key]: value };
      
      // Enforce Delivery <= Return
      if (key === 'deliveryDate' && newDates.returnDate && new Date(value) > new Date(newDates.returnDate)) {
        const nextDay = new Date(value);
        nextDay.setDate(nextDay.getDate() + 1);
        newDates.returnDate = nextDay.toISOString().split("T")[0];
      }
      // Enforce Return >= Delivery
      if (key === 'returnDate' && newDates.deliveryDate && new Date(value) < new Date(newDates.deliveryDate)) {
        newDates.returnDate = newDates.deliveryDate;
      }

      // Re-calculate rentalDays
      const days = calculateDays(newDates.deliveryDate, newDates.returnDate);
      newDates.rentalDays = days > 0 ? days : 1;

      return newDates;
    });
  };

  // If success page active, show only that
  if (orderSuccess) {
    return <RentalSuccessPage order={orderSuccess} onBack={() => setOrderSuccess(null)} />;
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-20 sm:pb-6 px-3 sm:px-4 lg:px-6 relative" style={{backgroundColor: colors.cream}}>
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%20%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M20%2C50%20Q50%2C20%2080%2C50%20Q50%2C80%2020%2C50%22%20fill%3D%22none%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%20%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2230%22%20fill%3D%22none%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%20%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M30%2C30%20L70%2C70%20M70%2C30%20L30%2C70%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
      </div>

      {/* Fixed Cart Button - Bottom Right (Mobile only) */}
      <button
  onClick={() => setShowCart((s) => !s)}
  className="sm:hidden fixed bottom-20 right-4 z-40 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
  style={{
    background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`,
    boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4), 0 10px 10px -5px rgba(249, 115, 22, 0.2)'
  }}
>
  <FiShoppingCart className="w-6 h-6" />

  {cart.length > 0 && (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-2 -right-2 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center border-2 border-white"
      style={{ backgroundColor: colors.maroon }}
    >
      {cart.length}
    </motion.span>
  )}
</button>



      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-6 lg:mt-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-serif truncate" style={{color: colors.culturalRed}}>
              Sanskaraa Rentals
            </h1>
            <p className="text-xs sm:text-sm mt-1 truncate" style={{color: colors.culturalRed + 'B0'}}>
              Complete event equipment rental – DJ, Lights, Furniture, Decor & more
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-48 lg:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 shadow-sm focus:ring-2 transition-all text-base sm:text-sm placeholder-brown/50 outline-none"
                style={{
                  borderColor: colors.saffron + '30',
                  backgroundColor: colors.white,
                  color: colors.culturalRed,
                  focusBorderColor: colors.saffron,
                  focusRingColor: colors.saffron + '20'
                }}
                placeholder="Search equipment..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{color: colors.saffron}} />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="sm:hidden text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
              style={{background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`}}
            >
              <FiMenu className="w-5 h-5" />
            </button>

            {/* Desktop Cart Button */}
            <button
              onClick={() => setShowCart((s) => !s)}
              className="hidden sm:flex relative text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
              style={{background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`}}
            >
              <FiShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={{backgroundColor: colors.maroon}}
                >
                  {cart.length}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Global Rental Date Picker */}
        <div className="mt-4 sm:mt-6 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border p-3 sm:p-4" style={{backgroundColor: colors.white + 'CC', borderColor: colors.saffron + '20'}}>
          <h3 className="text-sm font-bold flex items-center gap-2 mb-2" style={{color: colors.culturalRed}}>
            <FiCalendar className="w-4 h-4" style={{color: colors.saffron}} /> Select Rental Duration
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-center">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>Delivery Date</label>
              <input
                type="date"
                min={getTomorrowDate()}
                value={rentalDuration.deliveryDate}
                onChange={(e) => handleDateChange('deliveryDate', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-base sm:text-sm outline-none bg-white"
                style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>Return Date</label>
              <input
                type="date"
                min={rentalDuration.deliveryDate || getTomorrowDate()}
                value={rentalDuration.returnDate}
                onChange={(e) => handleDateChange('returnDate', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-base sm:text-sm outline-none bg-white"
                style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-center rounded-lg p-2 border" style={{backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '20'}}>
              <p className="text-lg font-bold leading-tight" style={{color: colors.saffron}}>{rentalDuration.rentalDays}</p>
              <p className="text-xs leading-tight" style={{color: colors.culturalRed + 'B0'}}>Total Rental Days</p>
            </div>
          </div>
          {rentalDuration.rentalDays === 0 && (
            <p className="text-xs mt-2 flex items-center gap-1" style={{color: colors.error}}>
              <FiAlertTriangle className="w-3 h-3"/> Please select a valid delivery and return date.
            </p>
          )}
        </div>

       
        
        {/* Category Icons & Filters */}
        <div className="mt-4 sm:mt-6 backdrop-blur-sm rounded-xl shadow-lg border px-3 sm:px-4 py-3 sm:py-4" style={{backgroundColor: colors.white + 'CC', borderColor: colors.saffron + '20'}}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium hidden sm:block" style={{color: colors.culturalRed}}>Category:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1 hide-scrollbar">
              {rentalCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border transition-all ${
                    selectedCategory === cat
                      ? "text-white shadow-md"
                      : "bg-white hover:bg-saffron/5"
                  }`}
                 style={{
  background: selectedCategory === cat
    ? `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`
    : colors.white,
  borderColor: selectedCategory === cat ? colors.saffron : colors.culturalRed + '20',
  color: selectedCategory === cat ? colors.white : colors.culturalRed
}}

                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
<div className="mt-4 sm:mt-6 lg:mt-8">
  {filteredProducts.length === 0 ? (
    <div className="text-center py-12 sm:py-16 rounded-2xl shadow border"
      style={{ backgroundColor: colors.white + 'CC', borderColor: colors.saffron + '20' }}>
      <div className="text-4xl mb-4">🎪</div>
      <p className="text-sm mb-2" style={{ color: colors.culturalRed }}>
        No rental items found matching your search.
      </p>
      <p className="text-xs" style={{ color: colors.culturalRed + '99' }}>
        Try changing category or search term
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {filteredProducts.map((product) => {
        const qty = quantities[product.id] || (product.minQuantity || 1);
        const days = rentalDuration.rentalDays;
        const rentalCost = product.price * qty * days;
        const deposit = product.deposit * qty;

        return (
          <motion.div
            key={product.id}
            layout
            className="bg-white rounded-2xl overflow-hidden shadow-lg border relative group flex flex-col transition-all"
            style={{ borderColor: colors.saffron + '25' }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            {/* Wishlist */}
            <button
              className="absolute top-2 right-2 z-30 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center transition hover:scale-110"
              style={{ color: colors.culturalRed }}
            >
              ❤️
            </button>

            {/* Carousel */}
            <div className="h-40 sm:h-48 relative bg-saffron/5 overflow-hidden">
              <ProductCarousel
                gallery={product.imgGallery || [product.img]}
                video={product.video}
                productName={product.name}
              />

              {product.popular && (
                <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[10px] px-2 py-1 rounded-full shadow font-semibold">
                  ⭐ Popular
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3 flex-grow">

              <h2
                className="font-bold text-sm sm:text-base line-clamp-2 font-serif"
                style={{ color: colors.culturalRed }}
              >
                {product.name}
              </h2>

              <p className="text-[11px] line-clamp-2 leading-snug"
                style={{ color: colors.culturalRed + 'AA' }}>
                {product.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[10px] rounded-full border"
                    style={{
                      backgroundColor: colors.saffron + '10',
                      borderColor: colors.saffron + '25',
                      color: colors.culturalRed
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg" style={{ color: colors.saffron }}>
                    {formatINR(product.price)}
                    <span className="text-[11px]" style={{ color: colors.culturalRed }}>
                      /day
                    </span>
                  </p>
                  <p className="text-[11px] font-semibold" style={{ color: colors.success }}>
                    Deposit: {formatINR(product.deposit)}
                  </p>
                </div>

                {product.minQuantity > 1 && (
                  <span className="text-[10px] px-2 py-1 border rounded-full"
                    style={{
                      backgroundColor: colors.warning + '10',
                      borderColor: colors.warning + '30',
                      color: colors.warning
                    }}>
                    Min {product.minQuantity}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: colors.culturalRed }}>Qty:</span>

                <div className="flex items-center px-2 py-1 rounded-full border shadow-sm gap-2"
                  style={{ borderColor: colors.saffron + "30" }}>

                  <button
                    onClick={() => changeQty(product.id, -1)}
                    disabled={qty <= (product.minQuantity || 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:scale-110 transition"
                    style={{ borderColor: colors.culturalRed + "40", color: colors.culturalRed }}
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>

                  <span className="text-sm font-bold" style={{ color: colors.culturalRed }}>
                    {qty}
                  </span>

                  <button
                    onClick={() => changeQty(product.id, 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:scale-110 transition"
                    style={{ borderColor: colors.culturalRed + "40", color: colors.culturalRed }}
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>

                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto pt-2">

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowProductDetails(true);
                  }}
                  className="py-2 border rounded-lg text-xs font-semibold hover:bg-saffron/10 transition"
                  style={{ borderColor: colors.saffron, color: colors.saffron }}
                >
                  Details
                </button>

                <button
                  onClick={() => addToCart(product, qty, days)}
                  disabled={!days}
                  className="py-2 text-white rounded-lg text-xs font-bold shadow hover:scale-105 transition flex items-center justify-center gap-1"
                  style={{ background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})` }}
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add
                </button>

              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  )}
</div>


        {/* Cart Sidebar */}
<AnimatePresence>
  {showCart && (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 backdrop-blur-xl"
      style={{
        background: `linear-gradient(135deg, ${colors.white}CC, ${colors.cream}EE)`,
        boxShadow: "0 0 35px rgba(0,0,0,0.25)"
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b shadow-sm"
        style={{ 
          background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`,
          borderColor: colors.saffron + "30"
        }}
      >
        <h2 className="font-bold text-lg text-white flex items-center gap-2 font-serif">
          <FiShoppingCart className="text-white" />
          Your Cart
        </h2>
        <button
          onClick={() => setShowCart(false)}
          className="p-1 rounded-full hover:bg-white/20 transition"
        >
          <FiX className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Items List */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ backgroundColor: colors.cream }}
      >
        {cart.length === 0 ? (
          <div className="text-center py-20 opacity-70">
            <div className="text-5xl mb-3">🪔</div>
            <p className="font-semibold" style={{color: colors.culturalRed}}>Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 flex gap-3 items-start rounded-xl shadow-lg border"
              style={{
                backgroundColor: colors.white,
                borderColor: colors.saffron + "30"
              }}
            >
              <img
                src={item.imgGallery?.[0]}
                className="h-16 w-16 rounded-lg object-cover border"
                style={{ borderColor: colors.saffron + "40" }}
              />
              <div className="flex-1">
                <p className="font-bold text-sm" style={{color: colors.culturalRed}}>
                  {item.name}
                </p>
                <p className="text-xs mb-2" style={{color: colors.culturalRed + "99"}}>
                  {item.qty} × {formatINR(item.price)} × {item.rentalDays} days
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="bg-white border rounded-full w-6 h-6 flex items-center justify-center"
                    style={{borderColor: colors.saffron, color: colors.culturalRed}}
                  >
                    <FiMinus className="text-xs" />
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateCartQty(item.id, item.qty + 1)}
                    className="bg-white border rounded-full w-6 h-6 flex items-center justify-center"
                    style={{borderColor: colors.saffron, color: colors.culturalRed}}
                  >
                    <FiPlus className="text-xs" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-error"
                    style={{ color: colors.error }}
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Price Summary Footer */}
      {cart.length > 0 && (
        <div
          className="p-4 border-t space-y-3 shadow-inner"
          style={{
            backgroundColor: colors.white,
            borderColor: colors.saffron + "30"
          }}
        >
          <div className="flex justify-between text-sm font-medium" style={{color: colors.culturalRed}}>
            <span>Total Payable:</span>
            <span style={{color: colors.saffron}}>{formatINR(pricing.total)}</span>
          </div>

          <button
            onClick={startCartOrder}
            className="w-full py-3 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            style={{background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`}}
          >
            <FiCheckCircle /> Proceed to Rent
          </button>

        </div>
      )}
    </motion.div>
  )}
</AnimatePresence>


        {/* Mobile Filters Modal */}
        <MobileFiltersModal
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Product Detail Modal */}
        <AnimatePresence>
          {showProductDetails && selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              qty={quantities[selectedProduct.id] || selectedProduct.minQuantity || 1}
              days={rentalDuration.rentalDays}
              onClose={() => setShowProductDetails(false)}
              onAddToCart={addToCart}
              onRentNow={startSingleOrder}
            />
          )}
        </AnimatePresence>

        {/* Rental Order Wizard Modal */}
        <AnimatePresence>
          {showOrderWizard && (
            <RentalOrderWizardModal
              mode={orderMode}
              product={orderProduct}
              qty={orderQty}
              rentalDays={orderRentalDays || rentalDuration.rentalDays}
              cartItems={cart}
              onClose={() => setShowOrderWizard(false)}
              onConfirm={handleOrderConfirm}
              rentalDuration={rentalDuration}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
