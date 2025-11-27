// src/pages/RentalStore.jsx
import React, { useMemo, useState, useEffect } from "react";
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
    name: "DJ Console (Pioneer/Numark)",
    price: 3000,
    category: "Sound & Audio",
    unit: "per day",
    imgGallery: [
      "https://images.unsplash.com/photo-1571974599782-87624638275f?w=400",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400",
      "https://images.unsplash.com/photo-1601312247853-0637f7a22c89?w=400"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-in-a-night-club-5-large.mp4",
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

// ========== PRODUCT CAROUSEL COMPONENT ==========
const ProductCarousel = ({ gallery = [], video, productName }) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const total = (video && !videoError) ? gallery.length + 1 : gallery.length;

  // Auto slide with hover pause
  useEffect(() => {
    if (isHovering || total <= 1) return;
    
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(t);
  }, [total, isHovering]);

  // Swipe support
  const handleSwipe = (dir) => {
    if (dir === "left") {
      setIndex((prev) => (prev + 1) % total);
    } else {
      setIndex((prev) => (prev - 1 + total) % total);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        handleSwipe("left");
      } else {
        handleSwipe("right");
      }
    }
    setTouchStart(null);
  };

  const handleVideoError = () => {
    setVideoError(true);
    // If we're currently on the video and it fails, move to first image
    if (index === 0 && video) {
      setIndex(0);
    }
  };

  const currentMedia = () => {
    if (video && !videoError && index === 0) {
      return { type: "video", src: video };
    }
    const imgIndex = video && !videoError ? index - 1 : index;
    return { type: "image", src: gallery[imgIndex] || gallery[0] };
  };

  const active = currentMedia();

  // Handle dot click
  const handleDotClick = (i) => {
    setIndex(i);
  };

  // Handle hover over dots to preview
  const handleDotHover = (i) => {
    if (isHovering) {
      setIndex(i);
    }
  };

  if (total === 0) {
    return (
      <div className="h-40 sm:h-48 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center" style={{backgroundColor: colors.amber}}>
        <span className="text-brown/40 text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div
      className="relative h-40 sm:h-48 rounded-xl overflow-hidden bg-amber-100 group"
      style={{backgroundColor: colors.amber}}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Media Display */}
      <div className="w-full h-full relative">
        {active.type === "image" ? (
          <img
            src={active.src}
            alt={`${productName} - Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFF8E7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%235A3E2B'%3EImage%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
          >
            <source src={active.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Video Indicator */}
        {active.type === "video" && (
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <FiPlay className="w-3 h-3" />
            Video
          </div>
        )}
      </div>

      {/* Navigation Arrows - Show on hover (Hidden on touch devices via group-hover usually) */}
      {total > 1 && (
        <>
          <button
            onClick={() => handleSwipe("right")}
            className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:bg-white hover:scale-110"
            aria-label="Previous image"
          >
            <FiArrowLeft className="w-4 h-4" style={{color: colors.culturalRed}} />
          </button>
          <button
            onClick={() => handleSwipe("left")}
            className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:bg-white hover:scale-110"
            aria-label="Next image"
          >
            <FiArrowLeft className="w-4 h-4 rotate-180" style={{color: colors.culturalRed}} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {total > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 px-2">
          {[...Array(total)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              onMouseEnter={() => handleDotHover(i)}
              className={`flex-1 max-w-[20px] h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === i
                  ? "scale-110 shadow-sm"
                  : "bg-white/70 hover:bg-white/90"
              }`}
              style={{backgroundColor: index === i ? colors.saffron : undefined}}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {total > 1 && (
        <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold">
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

// ========== PRODUCT DETAIL MODAL COMPONENT (Fully Responsive Upgrade) ==========
const ProductDetailModal = ({ product, qty, days, onClose, onAddToCart, onRentNow }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="
          rounded-xl sm:rounded-3xl
          w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl
          max-h-[92vh] overflow-y-auto
          shadow-2xl relative
        "
        style={{
          background: colors.cream,
          border: `2px solid ${colors.saffron}20`,
        }}
        initial={{ y: 60, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            px-3 sm:px-4 py-3
            flex items-center justify-between
            sticky top-0 z-20
            backdrop-blur-md
          "
          style={{
            background: `linear-gradient(to bottom, ${colors.white}EE, ${colors.white}99)`,
            borderBottom: `1px solid ${colors.saffron}30`
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
            className="
              w-9 h-9 sm:w-10 sm:h-10
              rounded-full flex items-center justify-center
              hover:scale-110 transition-transform
            "
            style={{
              backgroundColor: colors.saffron + "25",
              color: colors.culturalRed
            }}
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">

          {/* Media Carousel */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <ProductCarousel
              gallery={product.imgGallery || [product.img]}
              video={product.video}
              productName={product.name}
            />

            <div
              className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-semibold rounded-full px-2 sm:px-3 py-1"
              style={{ backgroundColor: colors.culturalRed, color: colors.white }}
            >
              {product.category}
            </div>
          </div>

          {/* Pricing */}
          <div
            className="rounded-lg sm:rounded-xl p-3 sm:p-4 shadow"
            style={{
              background: `linear-gradient(135deg, ${colors.white}, ${colors.lightCream})`,
              border: `1px solid ${colors.saffron}30`,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-lg sm:text-xl font-bold" style={{ color: colors.saffron }}>
                  {formatINR(product.price)}
                </p>
                <p className="text-[10px] sm:text-xs" style={{ color: colors.culturalRed + "90" }}>
                  {product.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold" style={{ color: colors.success }}>
                  Deposit: {formatINR(product.deposit)}
                </p>
                <p className="text-[10px] sm:text-[11px]" style={{ color: colors.warning }}>
                  Min: {product.minQuantity} qty • {product.minRentalDays} days
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.culturalRed + "CC" }}>
            {product.description}
          </p>

          {/* Features */}
          {product?.features?.length > 0 && (
            <div className="space-y-2">
              <h3
                className="text-xs sm:text-sm font-semibold flex items-center gap-1"
                style={{ color: colors.culturalRed }}
              >
                <FiCheckCircle className="w-4 h-4" style={{ color: colors.saffron }} />
                Features
              </h3>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full"
                    style={{
                      backgroundColor: colors.saffron + "10",
                      color: colors.culturalRed,
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

        {/* Footer Buttons */}
        <div className="px-3 sm:px-4 pb-4 space-y-2 sticky bottom-0 bg-white/70 backdrop-blur-lg border-t border-saffron/20 pt-2">
          <p className="text-[11px] sm:text-xs flex justify-between font-semibold"
            style={{ color: colors.culturalRed }}
          >
            <span>Selected:</span>
            <span style={{ color: colors.saffron }}>{qty} qty • {days} days</span>
          </p>

          <button
            onClick={() => onAddToCart(product, qty, days)}
            className="w-full py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"
            style={{
              background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`,
              color: colors.white,
            }}
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            Add to Cart
          </button>

          <button
            onClick={() => onRentNow(product, qty, days)}
            className="w-full py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border hover:bg-saffron/10 transition"
            style={{
              borderColor: colors.saffron,
              color: colors.saffron,
            }}
          >
            Quick Rent Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};



// ========== RENTAL ORDER WIZARD MODAL ==========
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
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    eventType: "",
    guestCount: "",
    eventDate: rentalDuration.eventDate || "",
    deliveryDate: rentalDuration.deliveryDate || "",
    returnDate: rentalDuration.returnDate || "",
    deliverySlot: "",
  });

  const items = useMemo(() => {
    if (mode === "single" && product) {
      return [{ ...product, qty, rentalDays }];
    }
    return cartItems || [];
  }, [mode, product, qty, rentalDays, cartItems]);

  const pricing = useMemo(() => {
    const rentalTotal = items.reduce(
      (sum, item) => sum + item.price * item.qty * item.rentalDays,
      0
    );
    const depositTotal = items.reduce(
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
  }, [items]);

  const handleNext = () => {
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
        alert("Please fill all required fields (Name, Phone, Address, City, Pincode)");
        return;
      }
      if (form.phone.length < 10) {
        alert("Please enter valid 10-digit phone number");
        return;
      }
    }
    if (step === 2) {
      if (!form.eventDate || !form.deliveryDate || !form.returnDate || !form.deliverySlot) {
        alert("Please select all date fields and time slot");
        return;
      }
      const daysCheck = calculateDays(form.deliveryDate, form.returnDate);
      if (daysCheck <= 0) {
        alert("Return Date must be after Delivery Date.");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleConfirm = () => {
    onConfirm({
      items,
      pricing,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        landmark: form.landmark,
        city: form.city,
        pincode: form.pincode,
        eventType: form.eventType,
        guestCount: form.guestCount,
      },
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6 border"
        style={{backgroundColor: colors.cream, borderColor: colors.saffron + '20'}}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5 mt-2 sm:mt-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 truncate" style={{color: colors.culturalRed}}>
              <FiShoppingCart style={{color: colors.saffron}} className="flex-shrink-0" />
              <span className="truncate">
                {mode === "single" ? "Quick Rental Order" : "Complete Rental Order"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm truncate" style={{color: colors.culturalRed + 'B0'}}>
              Event equipment rental – delivery & pickup schedule
            </p>
          </div>
          <button
            onClick={onClose}
            style={{color: colors.culturalRed + 'A0'}}
            className="hover:text-brown text-xl p-1 flex-shrink-0 ml-2"
          >
            <FiX />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-4 sm:mb-6 relative">
          <div className="flex items-center justify-between mb-2 relative z-10">
            {[
              { no: 1, label: "Details" },
              { no: 2, label: "Schedule" },
              { no: 3, label: "Review" },
            ].map((s) => (
              <div key={s.no} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm transition-colors duration-300 ${
                    step >= s.no
                      ? "text-white"
                      : "text-brown/30"
                  }`}
                  style={{
                    backgroundColor: step >= s.no ? colors.saffron : colors.cream,
                    borderColor: step >= s.no ? colors.saffron : colors.culturalRed + '20'
                  }}
                >
                  {step > s.no ? <FiCheckCircle /> : s.no}
                </div>
                {/* Hide labels on very small screens if not active, to prevent overlap */}
                <span
                  className={`mt-1 text-[11px] sm:text-xs text-center ${
                    step >= s.no
                      ? "font-semibold"
                      : "text-brown/40"
                  } ${step === s.no ? 'block' : 'hidden sm:block'}`}
                  style={{color: step >= s.no ? colors.culturalRed : colors.culturalRed + '66'}}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-4 sm:top-5 left-0 right-0 h-1 rounded-full overflow-hidden z-0" style={{backgroundColor: colors.culturalRed + '10'}}>
            <motion.div
              className="h-full"
              style={{backgroundColor: colors.saffron}}
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="min-h-[300px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Event Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2" style={{color: colors.culturalRed}}>
                  <FiUser style={{color: colors.saffron}} />
                  Event & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Full Name <span style={{color: colors.error}}>*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2.5 bg-white" style={{borderColor: colors.culturalRed + '20'}}>
                      <FiUser className="text-sm" style={{color: colors.culturalRed + '66'}} />
                      <input
                        type="text"
                        className="w-full text-base sm:text-sm outline-none bg-transparent"
                        style={{color: colors.culturalRed}}
                        placeholder="Your good name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Mobile Number <span style={{color: colors.error}}>*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2.5 bg-white" style={{borderColor: colors.culturalRed + '20'}}>
                      <FiPhone className="text-sm" style={{color: colors.culturalRed + '66'}} />
                      <input
                        type="tel"
                        className="w-full text-base sm:text-sm outline-none bg-transparent"
                        style={{color: colors.culturalRed}}
                        placeholder="10 digit mobile"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="col-span-1">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Event Type
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Religious">Religious Ceremony</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      placeholder="Approximate count"
                      value={form.guestCount}
                      onChange={(e) => setForm((f) => ({ ...f, guestCount: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                    Event Address <span style={{color: colors.error}}>*</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white resize-none"
                    style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                    placeholder="Venue address with landmark..."
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="col-span-1 sm:col-span-3">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Landmark
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      placeholder="Near temple / hall"
                      value={form.landmark}
                      onChange={(e) => setForm((f) => ({ ...f, landmark: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      City <span style={{color: colors.error}}>*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Pincode <span style={{color: colors.error}}>*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="rounded-xl px-3 py-2 text-xs flex items-center gap-2" style={{backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '20'}}>
                  <FiShield style={{color: colors.saffron}} className="flex-shrink-0" />
                  <span className="text-xs" style={{color: colors.culturalRed}}>
                    Your details are secure. We'll contact to confirm event details.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Schedule */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2" style={{color: colors.culturalRed}}>
                  <FiCalendar style={{color: colors.saffron}} />
                  Delivery & Pickup Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Event Date <span style={{color: colors.error}}>*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      value={form.eventDate}
                      onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Delivery Date <span style={{color: colors.error}}>*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      value={form.deliveryDate}
                      onChange={(e) => setForm((f) => ({ ...f, deliveryDate: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                      Return Date <span style={{color: colors.error}}>*</span>
                    </label>
                    <input
                      type="date"
                      min={form.deliveryDate || getTomorrowDate()}
                      className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                      style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                      value={form.returnDate}
                      onChange={(e) => setForm((f) => ({ ...f, returnDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs mb-1 block" style={{color: colors.culturalRed + 'B0'}}>
                    Delivery Slot <span style={{color: colors.error}}>*</span>
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2.5 text-base sm:text-sm outline-none bg-white"
                    style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
                    value={form.deliverySlot}
                    onChange={(e) => setForm((f) => ({ ...f, deliverySlot: e.target.value }))}
                  >
                    <option value="">Select slot</option>
                    <option value="6 AM - 9 AM">6 AM - 9 AM</option>
                    <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                    <option value="12 PM - 3 PM">12 PM - 3 PM</option>
                    <option value="3 PM - 6 PM">3 PM - 6 PM</option>
                    <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                  </select>
                </div>

                <div className="rounded-xl px-3 py-2 text-xs flex items-start gap-2" style={{backgroundColor: colors.deepSaffron + '10', borderColor: colors.deepSaffron + '20'}}>
                  <FiInfo style={{color: colors.deepSaffron}} className="mt-0.5 flex-shrink-0" />
                  <span className="text-xs" style={{color: colors.culturalRed}}>
                    Delivery usually 1 day before event. Pickup 1 day after event.
                    Setup and teardown included in service.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold" style={{color: colors.culturalRed}}>
                  Review Your Rental Order
                </h3>

                {/* Items Summary */}
                <div className="rounded-xl p-3 sm:p-4 max-h-48 sm:max-h-56 overflow-y-auto border" style={{backgroundColor: colors.saffron + '05', borderColor: colors.saffron + '10'}}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm mb-2 last:mb-0"
                    >
                      <span className="flex-1 pr-2 text-xs sm:text-sm" style={{color: colors.culturalRed}}>
                        <span className="font-medium block">{item.name}</span>
                        <span className="text-xs" style={{color: colors.culturalRed + '99'}}>
                          {item.qty} × {formatINR(item.price)} × {item.rentalDays} days
                        </span>
                      </span>
                      <span className="font-semibold text-sm sm:text-base whitespace-nowrap" style={{color: colors.saffron}}>
                        {formatINR(item.price * item.qty * item.rentalDays)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Event & Schedule Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white border rounded-xl p-3 sm:p-4 text-sm" style={{borderColor: colors.culturalRed + '10'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <FiUser style={{color: colors.saffron}} />
                      <span className="font-semibold" style={{color: colors.culturalRed}}>Event Details</span>
                    </div>
                    <p className="font-medium text-sm" style={{color: colors.culturalRed}}>{form.name}</p>
                    <p className="text-sm" style={{color: colors.culturalRed + 'B0'}}>{form.phone}</p>
                    <p className="text-xs mt-1" style={{color: colors.culturalRed + 'B0'}}>
                      {form.eventType && `${form.eventType}`}
                      {form.guestCount && ` • ${form.guestCount} guests`}
                    </p>
                    <p className="text-xs mt-1 leading-tight" style={{color: colors.culturalRed + 'B0'}}>
                      {form.address}
                      {form.landmark && `, ${form.landmark}`}
                      {form.city && `, ${form.city}`} {form.pincode && `- ${form.pincode}`}
                    </p>
                  </div>

                  <div className="bg-white border rounded-xl p-3 sm:p-4 text-sm" style={{borderColor: colors.culturalRed + '10'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <FiCalendar style={{color: colors.saffron}} />
                      <span className="font-semibold" style={{color: colors.culturalRed}}>Rental Schedule</span>
                    </div>
                    <p className="text-sm" style={{color: colors.culturalRed + 'CC'}}>
                      Event:{" "}
                      {form.eventDate ? new Date(form.eventDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-sm" style={{color: colors.culturalRed + 'CC'}}>
                      Delivery:{" "}
                      {form.deliveryDate ? new Date(form.deliveryDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-sm" style={{color: colors.culturalRed + 'CC'}}>
                      Return:{" "}
                      {form.returnDate ? new Date(form.returnDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-sm" style={{color: colors.culturalRed + 'CC'}}>Slot: {form.deliverySlot || "-"}</p>
                    <p className="text-sm font-semibold mt-1" style={{color: colors.culturalRed + 'CC'}}>
                      Total Rental Days: {calculateDays(form.deliveryDate, form.returnDate)}
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-xl p-3 sm:p-4 text-sm space-y-2 border" style={{borderColor: colors.culturalRed + '10'}}>
                  <div className="flex justify-between" style={{color: colors.culturalRed}}>
                    <span>Rental Charges</span>
                    <span>{formatINR(pricing.rentalTotal)}</span>
                  </div>
                  <div className="flex justify-between" style={{color: colors.culturalRed}}>
                    <span>GST (18%)</span>
                    <span>{formatINR(pricing.gst)}</span>
                  </div>
                  <div className="flex justify-between" style={{color: colors.culturalRed}}>
                    <span>Delivery Charges</span>
                    <span>{formatINR(pricing.delivery)}</span>
                  </div>
                  <div className="flex justify-between" style={{color: colors.culturalRed}}>
                    <span>Pickup Charges</span>
                    <span>{formatINR(pricing.pickup)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2" style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}>
                    <span>Total Payable</span>
                    <span>{formatINR(pricing.total)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-sm" style={{borderColor: colors.culturalRed + '20', color: colors.success}}>
                    <span>Refundable Deposit</span>
                    <span className="font-semibold">{formatINR(pricing.refundable)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm" style={{color: colors.saffron}}>
                    <span>Pay Now (Taxes + Delivery)</span>
                    <span>{formatINR(pricing.payableNow)}</span>
                  </div>
                </div>

                <div className="rounded-xl px-3 py-2 text-xs flex items-start gap-2" style={{backgroundColor: colors.success + '10', borderColor: colors.success + '20'}}>
                  <FiShield style={{color: colors.success}} className="mt-0.5 flex-shrink-0" />
                  <span style={{color: colors.success + 'CC'}}>
                    Deposit refunded after equipment return in good condition.
                    Payment options: UPI, Card, or Bank Transfer.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 pb-2 sm:pb-4 border-t pt-4" style={{borderColor: colors.culturalRed + '10'}}>
          <div className="flex gap-2 sm:gap-3">
            {/* BACK BUTTON */}
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-3 sm:px-4 py-2.5 rounded-lg border text-sm flex items-center gap-1 hover:bg-white transition-colors flex-1 sm:flex-none justify-center"
                style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            {/* NEXT / CONFIRM BUTTON */}
            <button
              onClick={step === 3 ? handleConfirm : handleNext}
              className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold hover:shadow-lg flex items-center justify-center gap-2 transition-all"
              style={{background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`}}
            >
              {step === 3 ? (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Confirm Rental</span>
                </>
              ) : (
                <span>Next</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ========== RENTAL SUCCESS PAGE ==========
const RentalSuccessPage = ({ order, onBack }) => {
  const [showAnim, setShowAnim] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowAnim(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleShare = () => {
    const itemsText = order.items
      .map(
        (item) =>
          `• ${item.name} (x${item.qty} for ${item.rentalDays} days) - ₹${
            item.price * item.qty * item.rentalDays
          }`
      )
      .join("\n");

    const msg = `🎪 *Sanskaraa Rental Service Order Confirmed* 🎪

*Order ID:* R${order.id}
*Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*Event:* ${order.customer.eventType} (${order.customer.guestCount} guests)

*Rental Items:*
${itemsText}

*Rental Total:* ₹${order.pricing.total}
*Refundable Deposit:* ₹${order.pricing.refundable}

*Schedule:*
• Event Date: ${new Date(order.schedule.eventDate).toLocaleDateString("en-IN")}
• Delivery: ${new Date(order.schedule.deliveryDate).toLocaleDateString("en-IN")} (${
      order.schedule.slot
    })
• Return: ${new Date(order.schedule.returnDate).toLocaleDateString("en-IN")}
• Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

_Sent automatically from Sanskaraa Rental Service._`;

    const encoded = encodeURIComponent(msg);
    const supportNumber = "916201486202";
    const url = `https://wa.me/${supportNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{background: `linear-gradient(135deg, ${colors.cream}, ${colors.amber})`}}>
      <motion.div
        className="rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-4 sm:p-6 lg:p-8 relative overflow-hidden border"
        style={{backgroundColor: colors.cream, borderColor: colors.saffron + '20'}}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
      >
        {/* Cultural Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%20%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M50%2C10%20A40%2C40%200%201%2C1%2050%2C90%20A40%2C40%200%201%2C1%2050%2C10%22%20fill%3D%22none%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M20%2C50%20L80%2C50%20M50%2C20%20L50%2C80%22%20stroke%3D%22%235A3E2B%20%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
        </div>

        {/* Big Animated Tick */}
        {showAnim && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center"
              style={{backgroundColor: colors.saffron + '20'}}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center"
                style={{backgroundColor: colors.saffron + '40'}}
              >
                <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" style={{color: colors.saffron}} />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Static Success Icon */}
        <div className="relative flex flex-col items-center mb-3 sm:mb-4 mt-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center border" style={{backgroundColor: colors.saffron + '20', borderColor: colors.saffron + '30'}}>
            <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" style={{color: colors.saffron}} />
          </div>
          <div className="mt-2 text-xs sm:text-sm border px-3 py-1 rounded-full" style={{backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '20', color: colors.culturalRed}}>
            Sanskaraa • Rental Service
          </div>
        </div>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-1 font-serif" style={{color: colors.culturalRed}}>
          Rental Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-tight" style={{color: colors.culturalRed + 'B0'}}>
          Your event equipment rental is confirmed.
          <br className="hidden sm:block" />
          Our team will contact you for setup details.
        </p>

        {/* Order Summary */}
        <div className="rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm border" style={{backgroundColor: colors.white, borderColor: colors.culturalRed + '10'}}>
          <div className="flex justify-between mb-1" style={{color: colors.culturalRed}}>
            <span>Order ID</span>
            <span className="font-mono font-semibold">#R{order.id.toString().slice(-6)}</span>
          </div>
          <div className="flex justify-between mb-1" style={{color: colors.culturalRed}}>
            <span>Rental Items</span>
            <span className="font-medium">{order.items.length} item(s)</span>
          </div>
          <div className="flex justify-between mb-1" style={{color: colors.culturalRed}}>
            <span>Total Rental Days</span>
            <span className="font-medium">
              {calculateDays(order.schedule.deliveryDate, order.schedule.returnDate)} days
            </span>
          </div>
          <div className="flex justify-between mb-1" style={{color: colors.culturalRed}}>
            <span>Total Amount</span>
            <span className="font-bold" style={{color: colors.saffron}}>{formatINR(order.pricing.total)}</span>
          </div>
          <div className="flex justify-between mb-1" style={{color: colors.culturalRed}}>
            <span>Refundable Deposit</span>
            <span className="font-bold" style={{color: colors.success}}>{formatINR(order.pricing.refundable)}</span>
          </div>
          <div className="flex justify-between" style={{color: colors.culturalRed}}>
            <span>Event Date</span>
            <span className="font-medium">
              {new Date(order.schedule.eventDate).toLocaleDateString("en-IN")}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 sm:gap-2 text-white py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:shadow-lg transition-all"
            style={{background: `linear-gradient(135deg, ${colors.saffron}, ${colors.deepSaffron})`}}
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Share on WhatsApp</span>
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1 sm:gap-2 border py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-white transition-colors"
            style={{borderColor: colors.culturalRed + '20', color: colors.culturalRed}}
          >
            <FiHome className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back to Store</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-center italic mt-2 leading-tight" style={{color: colors.culturalRed + '99'}}>
          "We ensure your event shines with quality equipment and professional service."
        </p>
      </motion.div>
    </div>
  );
};

// ========== MAIN RENTAL STORE PAGE ==========
export default function RentalStore() {
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
  const handleOrderConfirm = (orderPayload) => {
    const order = {
      id: Date.now(),
      items: orderPayload.items,
      pricing: orderPayload.pricing,
      customer: orderPayload.customer,
      schedule: orderPayload.schedule,
      mode: orderPayload.mode,
      createdAt: new Date().toISOString(),
    };

    const itemsText = order.items
      .map(
        (item) =>
          `• ${item.name} (x${item.qty} for ${item.rentalDays} days) - ₹${
            item.price * item.qty * item.rentalDays
          }`
      )
      .join("\n");

    const msg = `🎪 *Sanskaraa Rental Service New Order* 🎪

*Order ID:* R${order.id}
*Customer:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*Event:* ${order.customer.eventType} (${order.customer.guestCount} guests)

*Rental Items:*
${itemsText}

*Total:* ₹${order.pricing.total}
*Refundable Deposit:* ₹${order.pricing.refundable}

*Schedule:*
• Event Date: ${new Date(order.schedule.eventDate).toLocaleDateString("en-IN")}
• Delivery: ${new Date(order.schedule.deliveryDate).toLocaleDateString("en-IN")} (${
      order.schedule.slot
    })
• Return: ${new Date(order.schedule.returnDate).toLocaleDateString("en-IN")}
• Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

_Sent automatically from Sanskaraa Rental Service_`;

    const encoded = encodeURIComponent(msg);
    const myWhatsapp = "916201486202";
    window.open(`https://wa.me/${myWhatsapp}?text=${encoded}`, "_blank");

    // Save to localStorage
    try {
      const prev = JSON.parse(localStorage.getItem("sanskaraa_rental_orders") || "[]");
      localStorage.setItem("sanskaraa_rental_orders", JSON.stringify([...prev, order]));
    } catch (e) {
      console.error(e);
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
        body: `Rental order confirmed for ₹${order.pricing.total}. Event on ${new Date(
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

        {/* Hero Section */}
        <div className="mt-4 sm:mt-6 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border p-3 sm:p-4 lg:p-6" style={{backgroundColor: colors.white + 'CC', borderColor: colors.saffron + '20'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border" style={{backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '20'}}>
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6" style={{color: colors.saffron}} />
              <div>
                <p className="font-semibold text-sm" style={{color: colors.culturalRed}}>80+ Equipment Types</p>
                <p className="text-xs" style={{color: colors.culturalRed + 'B0'}}>Complete event solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border" style={{backgroundColor: colors.success + '10', borderColor: colors.success + '20'}}>
              <FiTruck className="w-5 h-5 sm:w-6 sm:h-6" style={{color: colors.success}} />
              <div>
                <p className="font-semibold text-sm" style={{color: colors.culturalRed}}>Free Delivery</p>
                <p className="text-xs" style={{color: colors.culturalRed + 'B0'}}>Above ₹4999 rental</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border" style={{backgroundColor: colors.warning + '10', borderColor: colors.warning + '20'}}>
              <FiShield className="w-5 h-5 sm:w-6 sm:h-6" style={{color: colors.warning}} />
              <div>
                <p className="font-semibold text-sm" style={{color: colors.culturalRed}}>Quality Guaranteed</p>
                <p className="text-xs" style={{color: colors.culturalRed + 'B0'}}>Professional equipment</p>
              </div>
            </div>
          </div>
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