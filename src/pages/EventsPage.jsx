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
  FiMapPin,
  FiPhone,
  FiUser,
  FiCalendar,
  FiClock,
  FiHome,
  FiArrowLeft,
  FiShare2,
  FiInfo,
  FiStar,
  FiPackage,
  FiTruck,
  FiMusic,
  FiSun,
  FiCoffee,
  FiCamera,
  FiZap,
  FiHeart,
  FiMenu,
  FiChevronDown,
  FiAlertTriangle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ========== RENTAL PRODUCTS DATA ==========
const rentalProducts = [
  // ========== SOUND & AUDIO EQUIPMENT ==========
  {
    id: 101,
    name: "DJ Console (Pioneer/Numark)",
    price: 3000,
    category: "Sound & Audio",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=400&h=300&fit=crop",
    description: "Professional DJ controllers from Pioneer or Numark for seamless mixing",
    minRentalDays: 1,
    deposit: 15000,
    features: ["Professional Grade", "USB Connectivity", "Multi-channel Mixing"],
    popular: true,
    minQuantity: 1,
  },
  {
    id: 106,
    name: "Wireless Microphone System",
    price: 800,
    category: "Sound & Audio",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop",
    description: "Dual handheld wireless microphone system",
    minRentalDays: 1,
    deposit: 5000,
    features: ["Dual Handheld Mics", "100m Range", "Battery Backup"],
    popular: true,
    minQuantity: 1,
  },
  {
    id: 113,
    name: "PA System Complete",
    price: 3500,
    category: "Sound & Audio",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1571330663919-a5c0cfe3c8e9?w=400&h=300&fit=crop",
    description: "Complete public announcement system with speakers and mixer",
    minRentalDays: 1,
    deposit: 20000,
    features: ["All-in-One System", "Easy Operation", "Clear Announcements"],
    popular: true,
    minQuantity: 1,
  },
  // ========== LIGHTING & EFFECTS ==========
  {
    id: 202,
    name: "Moving Head Lights",
    price: 1800,
    category: "Lighting & Effects",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    description: "Professional moving head lights for dynamic effects",
    minRentalDays: 1,
    deposit: 9000,
    features: ["360° Movement", "Pattern Effects", "Sound Activation"],
    popular: true,
    minQuantity: 1,
  },
  // ========== WEDDING & EVENT DECORATION ==========
  {
    id: 304,
    name: "Photo Booth Setup",
    price: 3000,
    category: "Wedding & Decor",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=300&fit=crop",
    description: "Complete photo booth with props and backdrop",
    minRentalDays: 1,
    deposit: 15000,
    features: ["Instant Printing", "Props Included", "Backdrop Options"],
    popular: true,
    minQuantity: 1,
  },
  // ========== FURNITURE & SEATING ==========
  {
    id: 401,
    name: "Wedding Sofa/Couch",
    price: 1500,
    category: "Furniture & Seating",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    description: "Elegant wedding sofa for couple seating",
    minRentalDays: 1,
    deposit: 8000,
    features: ["Premium Upholstery", "Comfortable", "Elegant Design"],
    popular: true,
    minQuantity: 1,
  },
  {
    id: 411,
    name: "Tent & Shamiyana",
    price: 4500,
    category: "Furniture & Seating",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    description: "Large tent or shamiyana for outdoor events",
    minRentalDays: 1,
    deposit: 25000,
    features: ["Waterproof", "Side Walls", "Professional Setup"],
    popular: true,
    minQuantity: 1,
  },
  // ========== CATERING EQUIPMENT ==========
  {
    id: 504,
    name: "Crockery Set (100 pax)",
    price: 800,
    category: "Catering Equipment",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    description: "Complete crockery set for 100 people",
    minRentalDays: 1,
    deposit: 4000,
    features: ["Plates + Bowls", "Quality Ceramic", "Complete Set"],
    popular: true,
    minQuantity: 1,
  },
  // ========== PHOTOGRAPHY & VIDEOGRAPHY ==========
  {
    id: 606,
    name: "Drone Camera",
    price: 2000,
    category: "Photography & Videography",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    description: "Professional drone for aerial photography",
    minRentalDays: 1,
    deposit: 30000,
    features: ["4K Video", "GPS Stabilization", "Long Flight Time"],
    popular: true,
    minQuantity: 1,
  },
  // ========== STAGE & EVENT STRUCTURES ==========
  {
    id: 905,
    name: "LED Wall Screen",
    price: 8000,
    category: "Stage & Structures",
    unit: "per day",
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    description: "High-resolution LED video wall",
    minRentalDays: 1,
    deposit: 50000,
    features: ["High Resolution", "Bright Display", "Professional Quality"],
    popular: true,
    minQuantity: 1,
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

// ========== MOBILE FILTERS MODAL ==========
const MobileFiltersModal = ({ isOpen, onClose, selectedCategory, onCategoryChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-cream rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-brown font-serif">Filter Categories</h3>
              <button onClick={onClose} className="text-brown/60 p-2">
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
                      ? "bg-gradient-to-r from-saffron to-temple text-white border-saffron shadow-lg"
                      : "bg-white text-brown border-brown/20 hover:border-saffron/50"
                  }`}
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

// ========== PRODUCT DETAIL MODAL COMPONENT ==========
const ProductDetailModal = ({ product, qty, days, onClose, onAddToCart, onRentNow }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-cream rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90dvh] overflow-y-auto p-4 sm:p-6 border border-saffron/20"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-brown font-serif flex-1 pr-4">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-brown/60 hover:text-brown text-xl p-1 flex-shrink-0"
          >
            <FiX />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="h-40 sm:h-56 overflow-hidden bg-saffron/5 rounded-xl relative">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFF8E7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%235A3E2B'%3EImage%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute bottom-2 left-2 bg-brown text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </div>
          </div>

          <p className="text-sm text-brown/80">{product.description}</p>

          <div className="bg-white rounded-xl p-3 border border-brown/10 shadow-sm">
            <h3 className="font-semibold text-brown mb-2 text-sm flex items-center gap-1">
              <FiInfo className="text-saffron w-4 h-4" /> Key Features
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-brown/80">
                  <FiCheckCircle className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center bg-saffron/10 p-3 rounded-xl border border-saffron/20">
            <div>
              <p className="text-xl font-bold text-saffron">
                {formatINR(product.price)}
              </p>
              <p className="text-xs text-brown/60">
                {product.unit} Price
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">
                Refundable Deposit: {formatINR(product.deposit)}
              </p>
              <p className="text-xs text-amber-600">
                Min Qty: {product.minQuantity || 1} • Min Days: {product.minRentalDays || 1}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 border-t border-brown/10 pt-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-brown">
             Currently Selected: <span className="text-saffron">{qty} Qty</span> for <span className="text-saffron">{days} Days</span>
          </p>
          <button
            onClick={() => onAddToCart(product, qty, days)}
            className="w-full py-3 bg-gradient-to-r from-saffron to-temple text-white rounded-xl text-base font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="w-5 h-5" />
            Add {qty} Item(s) to Cart
          </button>
          <button
            onClick={() => onRentNow(product, qty, days)}
            className="w-full py-3 border border-saffron text-saffron rounded-xl text-base font-medium hover:bg-saffron/5 transition-colors"
          >
            Rent Now (Quick Checkout)
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
        className="bg-cream rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6 border border-saffron/20"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5 mt-4 sm:mt-12">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-brown flex items-center gap-2 truncate">
              <FiShoppingCart className="text-saffron flex-shrink-0" />
              <span className="truncate">
                {mode === "single" ? "Quick Rental Order" : "Complete Rental Order"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-brown/70 truncate">
              Event equipment rental – delivery & pickup schedule
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-brown/60 hover:text-brown text-xl p-1 flex-shrink-0 ml-2"
          >
            <FiX />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            {[
              { no: 1, label: "Details" },
              { no: 2, label: "Schedule" },
              { no: 3, label: "Review" },
            ].map((s) => (
              <div key={s.no} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${
                    step >= s.no
                      ? "bg-saffron border-saffron text-white"
                      : "border-brown/20 text-brown/30"
                  }`}
                >
                  {step > s.no ? <FiCheckCircle /> : s.no}
                </div>
                <span
                  className={`mt-1 text-[11px] sm:text-xs text-center ${
                    step >= s.no
                      ? "text-brown font-semibold"
                      : "text-brown/40"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="h-1.5 bg-brown/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-saffron"
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
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-brown flex items-center gap-2">
                  <FiUser className="text-saffron" />
                  Event & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-brown/20 rounded-lg px-3 py-2.5 bg-white">
                      <FiUser className="text-brown/40 text-sm" />
                      <input
                        type="text"
                        className="w-full text-sm outline-none bg-transparent"
                        placeholder="Your good name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-brown/20 rounded-lg px-3 py-2.5 bg-white">
                      <FiPhone className="text-brown/40 text-sm" />
                      <input
                        type="tel"
                        className="w-full text-sm outline-none bg-transparent"
                        placeholder="10 digit mobile"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-1">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Event Type
                    </label>
                    <select
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
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

                  <div className="sm:col-span-1">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      placeholder="Approximate count"
                      value={form.guestCount}
                      onChange={(e) => setForm((f) => ({ ...f, guestCount: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-brown/70 mb-1 block">
                    Event Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white resize-none"
                    placeholder="Venue address with landmark..."
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Landmark
                    </label>
                    <input
                      type="text"
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      placeholder="Near temple / hall"
                      value={form.landmark}
                      onChange={(e) => setForm((f) => ({ ...f, landmark: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-brown/70 mb-1 block">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="bg-saffron/10 border border-saffron/20 rounded-xl px-3 py-2 text-xs text-brown flex items-center gap-2">
                  <FiShield className="text-saffron flex-shrink-0" />
                  <span className="text-xs">
                    Your details are secure. We'll contact to confirm event details.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Schedule */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-brown flex items-center gap-2">
                  <FiCalendar className="text-saffron" />
                  Delivery & Pickup Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      value={form.eventDate}
                      onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      value={form.deliveryDate}
                      onChange={(e) => setForm((f) => ({ ...f, deliveryDate: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs text-brown/70 mb-1 block">
                      Return Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={form.deliveryDate || getTomorrowDate()}
                      className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
                      value={form.returnDate}
                      onChange={(e) => setForm((f) => ({ ...f, returnDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-brown/70 mb-1 block">
                    Delivery Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-brown/20 rounded-lg px-3 py-2.5 text-sm outline-none bg-white"
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

                <div className="bg-temple/10 border border-temple/20 rounded-xl px-3 py-2 text-xs text-brown flex items-start gap-2">
                  <FiInfo className="text-temple mt-0.5 flex-shrink-0" />
                  <span className="text-xs">
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
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-brown">
                  Review Your Rental Order
                </h3>

                {/* Items Summary */}
                <div className="bg-saffron/5 rounded-xl p-3 sm:p-4 max-h-48 sm:max-h-56 overflow-y-auto border border-saffron/10">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm mb-2 last:mb-0"
                    >
                      <span className="flex-1 pr-2 text-brown text-xs sm:text-sm">
                        <span className="font-medium block">{item.name}</span>
                        <span className="text-brown/60 text-xs">
                          {item.qty} × {formatINR(item.price)} × {item.rentalDays} days
                        </span>
                      </span>
                      <span className="font-semibold text-saffron text-sm sm:text-base whitespace-nowrap">
                        {formatINR(item.price * item.qty * item.rentalDays)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Event & Schedule Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white border border-brown/10 rounded-xl p-3 sm:p-4 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiUser className="text-saffron" />
                      <span className="font-semibold text-brown">Event Details</span>
                    </div>
                    <p className="font-medium text-brown text-sm">{form.name}</p>
                    <p className="text-brown/70 text-sm">{form.phone}</p>
                    <p className="text-brown/70 text-xs mt-1">
                      {form.eventType && `${form.eventType}`}
                      {form.guestCount && ` • ${form.guestCount} guests`}
                    </p>
                    <p className="text-brown/70 text-xs mt-1 leading-tight">
                      {form.address}
                      {form.landmark && `, ${form.landmark}`}
                      {form.city && `, ${form.city}`} {form.pincode && `- ${form.pincode}`}
                    </p>
                  </div>

                  <div className="bg-white border border-brown/10 rounded-xl p-3 sm:p-4 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCalendar className="text-saffron" />
                      <span className="font-semibold text-brown">Rental Schedule</span>
                    </div>
                    <p className="text-brown/80 text-sm">
                      Event:{" "}
                      {form.eventDate ? new Date(form.eventDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-brown/80 text-sm">
                      Delivery:{" "}
                      {form.deliveryDate ? new Date(form.deliveryDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-brown/80 text-sm">
                      Return:{" "}
                      {form.returnDate ? new Date(form.returnDate).toLocaleDateString("en-IN") : "-"}
                    </p>
                    <p className="text-brown/80 text-sm">Slot: {form.deliverySlot || "-"}</p>
                    <p className="text-brown/80 text-sm font-semibold mt-1">
                      Total Rental Days: {calculateDays(form.deliveryDate, form.returnDate)}
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-xl p-3 sm:p-4 text-sm space-y-2 border border-brown/10">
                  <div className="flex justify-between text-brown">
                    <span>Rental Charges</span>
                    <span>{formatINR(pricing.rentalTotal)}</span>
                  </div>
                  <div className="flex justify-between text-brown">
                    <span>GST (18%)</span>
                    <span>{formatINR(pricing.gst)}</span>
                  </div>
                  <div className="flex justify-between text-brown">
                    <span>Delivery Charges</span>
                    <span>{formatINR(pricing.delivery)}</span>
                  </div>
                  <div className="flex justify-between text-brown">
                    <span>Pickup Charges</span>
                    <span>{formatINR(pricing.pickup)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg border-t border-brown/20 pt-2 text-brown">
                    <span>Total Payable</span>
                    <span>{formatINR(pricing.total)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 border-t border-brown/20 pt-2 text-sm">
                    <span>Refundable Deposit</span>
                    <span className="font-semibold">{formatINR(pricing.refundable)}</span>
                  </div>
                  <div className="flex justify-between text-saffron font-semibold text-sm">
                    <span>Pay Now (Taxes + Delivery)</span>
                    <span>{formatINR(pricing.payableNow)}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs text-green-800 flex items-start gap-2">
                  <FiShield className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Deposit refunded after equipment return in good condition.
                    Payment options: UPI, Card, or Bank Transfer.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 pb-4 sm:pb-6 border-t border-brown/10 pt-4">
          <div className="flex gap-2 sm:gap-3">
            {/* BACK BUTTON */}
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-3 sm:px-4 py-2.5 rounded-lg border border-brown/20 text-sm text-brown flex items-center gap-1 hover:bg-white transition-colors flex-1 sm:flex-none justify-center"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            {/* NEXT / CONFIRM BUTTON */}
            <button
              onClick={step === 3 ? handleConfirm : handleNext}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-saffron to-temple text-white text-sm font-semibold hover:shadow-lg flex items-center justify-center gap-2 transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-amber-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="bg-cream rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-saffron/20"
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
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-saffron/20 rounded-full flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-saffron/40 rounded-full flex items-center justify-center"
              >
                <FiCheckCircle className="text-saffron w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Static Success Icon */}
        <div className="relative flex flex-col items-center mb-3 sm:mb-4 mt-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-saffron/20 rounded-full flex items-center justify-center border border-saffron/30">
            <FiCheckCircle className="text-saffron w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
          </div>
          <div className="mt-2 text-xs sm:text-sm text-brown bg-saffron/10 border border-saffron/20 px-3 py-1 rounded-full">
            Sanskaraa • Rental Service
          </div>
        </div>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-brown text-center mb-1 font-serif">
          Rental Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-brown/70 text-center mb-3 sm:mb-4 leading-tight">
          Your event equipment rental is confirmed.
          <br className="hidden sm:block" />
          Our team will contact you for setup details.
        </p>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm border border-brown/10">
          <div className="flex justify-between mb-1 text-brown">
            <span>Order ID</span>
            <span className="font-mono font-semibold">#R{order.id.toString().slice(-6)}</span>
          </div>
          <div className="flex justify-between mb-1 text-brown">
            <span>Rental Items</span>
            <span className="font-medium">{order.items.length} item(s)</span>
          </div>
          <div className="flex justify-between mb-1 text-brown">
            <span>Total Rental Days</span>
            <span className="font-medium">
              {calculateDays(order.schedule.deliveryDate, order.schedule.returnDate)} days
            </span>
          </div>
          <div className="flex justify-between mb-1 text-brown">
            <span>Total Amount</span>
            <span className="font-bold text-saffron">{formatINR(order.pricing.total)}</span>
          </div>
          <div className="flex justify-between mb-1 text-brown">
            <span>Refundable Deposit</span>
            <span className="font-bold text-green-600">{formatINR(order.pricing.refundable)}</span>
          </div>
          <div className="flex justify-between text-brown">
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
            className="flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-saffron to-temple text-white py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:shadow-lg transition-all"
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Share on WhatsApp</span>
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1 sm:gap-2 border border-brown/20 text-brown py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-white transition-colors"
          >
            <FiHome className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back to Store</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-center text-brown/60 italic mt-2 leading-tight">
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
    <div className="min-h-screen bg-cream pt-16 sm:pt-20 pb-20 sm:pb-6 px-3 sm:px-4 lg:px-6 relative">
      {/* Cultural Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M20%2C50%20Q50%2C20%2080%2C50%20Q50%2C80%2020%2C50%22%20fill%3D%22none%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2230%22%20fill%3D%22none%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M30%2C30%20L70%2C70%20M70%2C30%20L30%2C70%22%20stroke%3D%22%235A3E2B%22%20stroke-width%3D%222%22/%3E%3C/svg%3E')]"></div>
      </div>

 {/* Fixed Cart Button - Top Right */}
<button
  onClick={() => setShowCart((s) => !s)}
  className="fixed top-[40rem] right-6 z-20 bg-gradient-to-r from-saffron to-temple text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
  style={{
    boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4), 0 10px 10px -5px rgba(249, 115, 22, 0.2)'
  }}
>
  <FiShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
  {cart.length > 0 && (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center border-2 border-white"
    >
      {cart.length}
    </motion.span>
  )}
</button>

<div className="max-w-7xl mx-auto relative z-10">
  {/*header*/}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-6 lg:mt-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-brown font-serif truncate">
              Sanskaraa Rentals
            </h1>
            <p className="text-xs sm:text-sm text-brown/70 mt-1 truncate">
              Complete event equipment rental – DJ, Lights, Furniture, Decor & more
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-48 lg:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 border-saffron/30 bg-white shadow-sm focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all text-sm text-brown placeholder-brown/50"
                placeholder="Search equipment..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-saffron w-4 h-4" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="sm:hidden bg-gradient-to-r from-saffron to-temple text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              <FiMenu className="w-4 h-4" />
            </button>

            {/* Desktop Cart Button - Hidden on mobile since we have fixed button */}
            <button
              onClick={() => setShowCart((s) => !s)}
              className="hidden sm:flex relative bg-gradient-to-r from-saffron to-temple text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-maroon text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                >
                  {cart.length}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Global Rental Date Picker */}
        <div className="mt-4 sm:mt-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-saffron/20 p-3 sm:p-4">
          <h3 className="text-sm font-bold text-brown flex items-center gap-2 mb-2">
            <FiCalendar className="text-saffron w-4 h-4" /> Select Rental Duration
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-center">
            <div className="col-span-1">
              <label className="text-xs text-brown/70 mb-1 block">Delivery Date</label>
              <input
                type="date"
                min={getTomorrowDate()}
                value={rentalDuration.deliveryDate}
                onChange={(e) => handleDateChange('deliveryDate', e.target.value)}
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm outline-none bg-white"
              />
            </div>
            <div className="col-span-1">
              <label className="text-xs text-brown/70 mb-1 block">Return Date</label>
              <input
                type="date"
                min={rentalDuration.deliveryDate || getTomorrowDate()}
                value={rentalDuration.returnDate}
                onChange={(e) => handleDateChange('returnDate', e.target.value)}
                className="w-full border border-brown/20 rounded-lg px-3 py-2 text-sm outline-none bg-white"
              />
            </div>
            <div className="col-span-2 md:col-span-1 text-center bg-saffron/10 rounded-lg p-2 border border-saffron/20">
              <p className="text-lg font-bold text-saffron leading-tight">{rentalDuration.rentalDays}</p>
              <p className="text-xs text-brown/70 leading-tight">Total Rental Days</p>
            </div>
          </div>
          {rentalDuration.rentalDays === 0 && (
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <FiAlertTriangle className="w-3 h-3"/> Please select a valid delivery and return date.
            </p>
          )}
        </div>

        {/* Hero Section */}
        <div className="mt-4 sm:mt-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-saffron/20 p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-xl border border-saffron/20">
              <FiPackage className="text-saffron w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-semibold text-brown text-xs sm:text-sm">80+ Equipment Types</p>
                <p className="text-xs text-brown/70">Complete event solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
              <FiTruck className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-semibold text-brown text-xs sm:text-sm">Free Delivery</p>
                <p className="text-xs text-brown/70">Above ₹4999 rental</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <FiShield className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-semibold text-brown text-xs sm:text-sm">Quality Guaranteed</p>
                <p className="text-xs text-brown/70">Professional equipment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Icons & Filters */}
        <div className="mt-4 sm:mt-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-saffron/20 px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium text-brown hidden sm:block">Category:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1 hide-scrollbar">
              {rentalCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-saffron to-temple text-white border-saffron shadow-md"
                      : "bg-white text-brown border-brown/20 hover:bg-saffron/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-4 sm:mt-6 lg:mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white/80 rounded-2xl shadow border border-saffron/20">
              <div className="text-4xl mb-4">🎪</div>
              <p className="text-sm text-brown mb-2">No rental items found matching your search.</p>
              <p className="text-xs text-brown/60">Try changing category or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product) => {
                const qty = quantities[product.id] || (product.minQuantity || 1);
                const days = rentalDuration.rentalDays;
                const rentalCost = product.price * qty * days;
                const deposit = product.deposit * qty;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-saffron/20 overflow-hidden flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Image */}
                    <div className="h-36 sm:h-40 lg:h-48 overflow-hidden bg-saffron/5 relative">
                      {product.popular && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-saffron to-temple text-white px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                          <FiStar className="w-3 h-3" />
                          Popular
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-brown text-white px-2 py-1 rounded-full text-[10px] font-semibold">
                        {product.category.split(" ")[0]}
                      </div>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFF8E7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%235A3E2B'%3EImage%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-grow">
                      <h2 className="font-bold text-sm sm:text-base text-brown line-clamp-2 leading-tight font-serif">
                        {product.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-brown/70 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-saffron/10 text-brown px-2 py-1 rounded text-[10px] border border-saffron/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-saffron font-bold text-base sm:text-lg">
                            {formatINR(product.price)}
                            <span className="text-xs text-brown/50 font-normal">/ day</span>
                          </p>
                          <p className="text-[11px] text-green-600">Deposit: {formatINR(product.deposit)}</p>
                        </div>
                        {product.minQuantity > 1 && (
                          <p className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                            Min: {product.minQuantity}
                          </p>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-brown/70 font-medium">Quantity:</span>
                        <div className="flex items-center gap-1 bg-saffron/5 rounded-full px-2 py-1 border border-saffron/20">
                          <button
                            onClick={() => changeQty(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-brown/20 text-brown text-xs hover:bg-saffron/10 transition-colors"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min={product.minQuantity || 1}
                            value={qty}
                            onChange={(e) => setQty(product.id, e.target.value)}
                            className="w-8 text-center text-xs bg-transparent outline-none font-medium text-brown"
                          />
                          <button
                            onClick={() => changeQty(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-brown/20 text-brown text-xs hover:bg-saffron/10 transition-colors"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Cost Summary */}
                      <div className="mt-2 p-2 sm:p-3 bg-saffron/5 rounded-lg border border-saffron/20">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-brown/70">Total Rental Cost ({days} days):</span>
                          <span className="font-semibold text-saffron">{formatINR(rentalCost)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">Total Deposit:</span>
                          <span className="font-semibold text-green-600">{formatINR(deposit)}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="mt-2 flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(product, qty, days)}
                          className="w-full py-2 bg-gradient-to-r from-saffron to-temple text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                          disabled={rentalDuration.rentalDays === 0}
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductDetails(true);
                          }}
                          className="w-full py-2 border border-saffron text-saffron rounded-lg text-sm font-medium hover:bg-saffron/5 transition-colors"
                        >
                          View Details
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto border-l border-saffron/20"
            >
              <div className="p-4 border-b border-saffron/20 flex items-center justify-between bg-gradient-to-r from-saffron to-temple text-white">
                <h2 className="font-bold text-lg flex items-center gap-2 font-serif">
                  <FiShoppingCart />
                  Rental Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:text-amber-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-cream min-h-full">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-2">🎪</div>
                    <p className="text-sm text-brown mb-1">Your rental cart is empty</p>
                    <p className="text-xs text-brown/60 mb-3">Add equipment for your event</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="bg-gradient-to-r from-saffron to-temple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      Browse Equipment
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {cart.map((item) => {
                        const minQty = item.minQuantity || 1;
                        const currentDays = rentalDuration.rentalDays;
                        const currentCost = item.price * item.qty * currentDays;
                        
                        if(item.rentalDays !== currentDays && currentDays > 0) {
                          updateCartRentalDays(item.id, currentDays);
                        }

                        return (
                          <div
                            key={item.id}
                            className="flex gap-2 items-start p-3 bg-white rounded-lg border border-saffron/20"
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-12 w-12 object-cover rounded flex-shrink-0 bg-saffron/5"
                              onError={(e) => {
                                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23FFF8E7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='6' fill='%235A3E2B'%3EImage%3C/text%3E%3C/svg%3E`;
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-brown text-sm truncate">{item.name}</p>
                              <p className="text-xs text-brown/60 mb-1">
                                {formatINR(item.price)}/day x {currentDays} days ={" "}
                                <span className="text-saffron font-bold">{formatINR(currentCost)}</span>
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-brown/70">Qty:</span>
                                  <div className="flex items-center gap-0.5">
                                    <button
                                      onClick={() => updateCartQty(item.id, item.qty - 1)}
                                      className="w-5 h-5 flex items-center justify-center rounded bg-white border border-brown/20 text-brown text-xs hover:bg-saffron/10"
                                      disabled={item.qty <= minQty}
                                    >
                                      <FiMinus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="px-1 text-xs font-medium text-brown">{item.qty}</span>
                                    <button
                                      onClick={() => updateCartQty(item.id, item.qty + 1)}
                                      className="w-5 h-5 flex items-center justify-center rounded bg-white border border-brown/20 text-brown text-xs hover:bg-saffron/10"
                                    >
                                      <FiPlus className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-red-500 hover:text-red-700 text-sm p-0.5"
                                >
                                  <FiX />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price Summary */}
                    <div className="border-t border-saffron/20 pt-4 mt-6 space-y-3 text-sm">
                      <div className="flex justify-between text-brown">
                        <span>Rental Charges</span>
                        <span className="font-medium">{formatINR(pricing.rentalTotal)}</span>
                      </div>
                      <div className="flex justify-between text-brown">
                        <span>GST (18%)</span>
                        <span className="font-medium">{formatINR(pricing.gst)}</span>
                      </div>
                      <div className="flex justify-between text-brown">
                        <span>
                          Delivery Charges
                          {pricing.delivery === 0 && (
                            <span className="text-green-600 text-xs ml-1">(FREE above ₹4999)</span>
                          )}
                        </span>
                        <span className="font-medium">{formatINR(pricing.delivery)}</span>
                      </div>
                      <div className="flex justify-between text-brown">
                        <span>Pickup Charges</span>
                        <span className="font-medium">{formatINR(pricing.pickup)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-saffron/20 pt-3 text-brown">
                        <span>Total Payable</span>
                        <span className="text-saffron">{formatINR(pricing.total)}</span>
                      </div>
                      <div className="flex justify-between text-green-600 border-t border-saffron/20 pt-3">
                        <span>Refundable Deposit</span>
                        <span className="font-semibold">{formatINR(pricing.refundable)}</span>
                      </div>

                      <button
                        onClick={startCartOrder}
                        className="w-full mt-4 bg-gradient-to-r from-saffron to-temple text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all text-sm flex items-center justify-center gap-3"
                        disabled={rentalDuration.rentalDays === 0}
                      >
                        <FiCheckCircle className="w-5 h-5" />
                        Proceed to Rental
                      </button>

                      <div className="flex items-center gap-2 mt-3 text-xs text-brown/60">
                        <FiShield className="text-green-600 w-4 h-4" />
                        <span>Deposit refunded after equipment return in good condition</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
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