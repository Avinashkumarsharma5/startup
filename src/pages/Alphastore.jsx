// src/pages/Alphastore.jsx
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
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ----------------- Mock Data: AlphaStore Products -----------------
const products = [
  {
    id: 1,
    name: "Nariyal / नारियल",
    price: 40,
    category: "Fruits & Offerings",
    unit: "पीस",
    img: "images/nariyal.jpg",
  },
  {
    id: 2,
    name: "Agarbatti Pack / अगरबत्ती",
    price: 30,
    category: "Fragrance",
    unit: "पैक",
    img: "images/agarbatti.jpg",
  },
  {
    id: 3,
    name: "Dhoop Sticks / धूप",
    price: 35,
    category: "Fragrance",
    unit: "पैक",
    img: "images/dhoop.jpg",
  },
  {
    id: 4,
    name: "Kapoor / कपूर",
    price: 25,
    category: "Havan & Aarti",
    unit: "पैक",
    img: "images/kapoor.jpg",
  },
  {
    id: 5,
    name: "Ghee Batti / घी बत्ती",
    price: 50,
    category: "Deepak & Diya",
    unit: "बॉक्स",
    img: "images/ghee-batti.jpg",
  },
  {
    id: 6,
    name: "Matchbox / माचिस",
    price: 10,
    category: "Others",
    unit: "पीस",
    img: "images/matchbox.jpg",
  },
  {
    id: 7,
    name: "Roli / रोली",
    price: 15,
    category: "Tilak & Kumkum",
    unit: "पैक",
    img: "images/roli.jpg",
  },
  {
    id: 8,
    name: "Chawal (Akshat) / चावल",
    price: 20,
    category: "Tilak & Kumkum",
    unit: "पैक",
    img: "images/chawal.jpg",
  },
  {
    id: 9,
    name: "Flower Garland / फूल माला",
    price: 80,
    category: "Fruits & Offerings",
    unit: "पीस",
    img: "images/garland.jpg",
  },
  {
    id: 10,
    name: "Panchamrit Pack / पंचामृत",
    price: 60,
    category: "Prasad",
    unit: "पैक",
    img: "images/panchamrit.jpg",
  },
];

const categories = [
  "All",
  "Fruits & Offerings",
  "Fragrance",
  "Havan & Aarti",
  "Deepak & Diya",
  "Tilak & Kumkum",
  "Prasad",
  "Others",
];

const formatINR = (amount) => `₹${amount}`;

// ----------------- ORDER WIZARD MODAL -----------------
const OrderWizardModal = ({
  mode, // 'single' | 'cart'
  product,
  qty,
  cartItems,
  onClose,
  onConfirm,
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    deliveryDate: "",
    deliverySlot: "",
  });

  const items = useMemo(() => {
    if (mode === "single" && product) {
      return [{ ...product, qty }];
    }
    return cartItems || [];
  }, [mode, product, qty, cartItems]);

  const pricing = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const gst = Math.round(subtotal * 0.18);
    const delivery = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;
    const total = subtotal + gst + delivery;
    return { subtotal, gst, delivery, total };
  }, [items]);

  const getTomorrowDate = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
        alert("Please fill all required fields (Name, Phone, Address, City, Pincode)");
        return;
      }
      if (form.phone.length < 8) {
        alert("Please enter valid phone number");
        return;
      }
    }
    if (step === 2) {
      if (!form.deliveryDate || !form.deliverySlot) {
        alert("Please select delivery date and time slot");
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
      },
      delivery: {
        date: form.deliveryDate,
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
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-rose-800 flex items-center gap-2">
              <FiShoppingCart />
              {mode === "single" ? "Quick Order" : "Complete Cart Order"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Daily puja items home delivery – address & delivery slot choose karein
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-rose-600 text-xl p-1"
          >
            <FiX />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            {[
              { no: 1, label: "Address" },
              { no: 2, label: "Delivery Slot" },
              { no: 3, label: "Review" },
            ].map((s) => (
              <div key={s.no} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${
                    step >= s.no
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step > s.no ? <FiCheckCircle /> : s.no}
                </div>
                <span
                  className={`mt-1 text-[11px] sm:text-xs ${
                    step >= s.no ? "text-rose-700 font-semibold" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-rose-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="min-h-[260px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Address */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800 flex items-center gap-2">
                  <FiMapPin />
                  Delivery Address Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1.5">
                      <FiUser className="text-gray-400 text-xs" />
                      <input
                        type="text"
                        className="w-full text-xs sm:text-sm outline-none"
                        placeholder="Your good name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1.5">
                      <FiPhone className="text-gray-400 text-xs" />
                      <input
                        type="tel"
                        className="w-full text-xs sm:text-sm outline-none"
                        placeholder="10 digit mobile"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                    placeholder="House no, street, area..."
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Landmark
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Near temple / chowk"
                      value={form.landmark}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, landmark: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, city: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, pincode: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-amber-800 flex items-center gap-2">
                  <FiShield className="text-amber-500" />
                  <span>
                    Your details are used only for delivery. No spam, no sharing.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Delivery Slot */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800 flex items-center gap-2">
                  <FiCalendar />
                  Delivery Date & Time Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      value={form.deliveryDate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Time Slot <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      value={form.deliverySlot}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, deliverySlot: e.target.value }))
                      }
                    >
                      <option value="">Select slot</option>
                      <option value="6 AM - 9 AM">6 AM - 9 AM</option>
                      <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                      <option value="12 PM - 3 PM">12 PM - 3 PM</option>
                      <option value="3 PM - 6 PM">3 PM - 6 PM</option>
                      <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                    </select>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-green-800 flex items-start gap-2">
                  <FiClock className="mt-0.5" />
                  <span>
                    We always try to deliver in selected slot. In rare cases, there
                    can be +/- 30 minutes variation based on traffic and location.
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
                <h3 className="text-sm sm:text-base font-semibold text-rose-800">
                  Review Your Order
                </h3>

                {/* Items Summary */}
                <div className="bg-rose-50 rounded-xl p-3 sm:p-4 max-h-48 sm:max-h-56 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs sm:text-sm mb-2 last:mb-0"
                    >
                      <span className="flex-1 pr-2">
                        {item.name}{" "}
                        <span className="text-gray-500">
                          ({item.qty} × {formatINR(item.price)})
                        </span>
                      </span>
                      <span className="font-semibold text-rose-700">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address & Delivery Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiHome className="text-rose-600" />
                      <span className="font-semibold text-gray-800">Delivery To</span>
                    </div>
                    <p className="font-medium text-gray-800">{form.name}</p>
                    <p className="text-gray-600">{form.phone}</p>
                    <p className="text-gray-600 text-[11px] sm:text-xs mt-1">
                      {form.address}
                      {form.landmark && `, ${form.landmark}`}
                      {form.city && `, ${form.city}`}{" "}
                      {form.pincode && `- ${form.pincode}`}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCalendar className="text-rose-600" />
                      <span className="font-semibold text-gray-800">
                        Delivery Schedule
                      </span>
                    </div>
                    <p className="text-gray-700">
                      Date:{" "}
                      {form.deliveryDate
                        ? new Date(form.deliveryDate).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })
                        : "-"}
                    </p>
                    <p className="text-gray-700">
                      Slot: {form.deliverySlot || "-"}
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-xs sm:text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatINR(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>{formatINR(pricing.gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Delivery{" "}
                      {pricing.delivery === 0 && (
                        <span className="text-green-600 text-[11px]">
                          (FREE above ₹499)
                        </span>
                      )}
                    </span>
                    <span>{formatINR(pricing.delivery)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg border-t border-gray-200 pt-2 sm:pt-3">
                    <span>Total Payable</span>
                    <span>{formatINR(pricing.total)}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-green-800 flex items-start gap-2">
                  <FiShield className="mt-0.5" />
                  <span>
                    Payment integration (UPI / Card / COD) Alpha version me test
                    ke liye rahega. Final app me pure secure payment gateway hoga.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm text-gray-700 flex items-center gap-1 hover:bg-gray-50"
            >
              <FiArrowLeft className="hidden sm:inline" />
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleConfirm : handleNext}
            className="flex-1 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs sm:text-sm font-semibold hover:shadow-lg flex items-center justify-center gap-2"
          >
            {step === 3 ? (
              <>
                <FiCheckCircle />
                Confirm Order
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ----------------- ORDER SUCCESS PAGE -----------------
const OrderSuccessPage = ({ order, onBack }) => {
  const [showAnim, setShowAnim] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowAnim(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleShare = () => {
    const itemsText = order.items
      .map((item) => `• ${item.name} (x${item.qty}) - ₹${item.price * item.qty}`)
      .join("\n");

    const msg = `🪷 *Sanskaraa AlphaStore Order Confirmed* 🪷

*Order ID:* ${order.id}
*Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}

*Items:*
${itemsText}

*Total:* ₹${order.pricing.total}

*Delivery:*
• Date: ${new Date(order.delivery.date).toLocaleDateString("en-IN")}
• Slot: ${order.delivery.slot}
• Address: ${order.customer.address}, ${order.customer.city} - ${
      order.customer.pincode
    }

_This order is placed via Sanskaraa AlphaStore (Puja Essentials)._`;

    const encoded = encodeURIComponent(msg);
    const supportNumber = "916201486202"; // aapka support / test number
    const url = `https://wa.me/${supportNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
      >
        {/* floating glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-200 rounded-full blur-3xl opacity-60" />

        {/* Big Animated Tick */}
        <AnimatePresence>
          {showAnim && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-100 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full flex items-center justify-center"
                >
                  <FiCheckCircle className="text-green-600 w-10 h-10 sm:w-12 sm:h-12" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static Success Icon */}
        <div className="relative flex flex-col items-center mb-3 sm:mb-4 mt-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-green-600 w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <div className="mt-2 text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Sanskaraa • Puja Essentials
          </div>
        </div>

        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center mb-1">
          Order Placed Successfully!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
          Thank you for choosing Sanskaraa for your daily puja needs.  
          May your home be filled with positivity and blessings.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Order ID</span>
            <span className="font-mono text-gray-800 font-semibold">
              #{order.id.toString().slice(-6)}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Items</span>
            <span className="font-medium text-gray-800">
              {order.items.length} item(s)
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-bold text-green-700">
              {formatINR(order.pricing.total)}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Delivery Date</span>
            <span className="font-medium text-gray-800">
              {new Date(order.delivery.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Slot</span>
            <span className="font-medium text-gray-800">
              {order.delivery.slot}
            </span>
          </div>
        </div>

        {/* Address small */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 mb-3 sm:mb-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 mb-1">
            <FiMapPin className="text-rose-600" />
            <span className="font-semibold text-gray-800">Delivery Address</span>
          </div>
          <p className="text-gray-700 font-medium">{order.customer.name}</p>
          <p className="text-gray-600">{order.customer.phone}</p>
          <p className="text-gray-600 mt-1">
            {order.customer.address}, {order.customer.city} -{" "}
            {order.customer.pincode}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 text-white py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-green-700"
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Share on WhatsApp
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 text-gray-700 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50"
          >
            <FiHome className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Store
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-center text-gray-500 italic mt-2">
          "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः"  
          May all be happy, may all be free from illness.
        </p>
      </motion.div>
    </div>
  );
};

// ----------------- MAIN ALPHASTORE PAGE -----------------
export default function Alphastore() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    products.forEach((p) => {
      initial[p.id] = 1;
    });
    return initial;
  });

  // NEW: order flow states
  const [showOrderWizard, setShowOrderWizard] = useState(false);
  const [orderMode, setOrderMode] = useState(null); // 'single' | 'cart'
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Filtered List
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  // Quantity handlers
  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = current + delta;
      return { ...prev, [id]: next < 1 ? 1 : next };
    });
  };

  const setQty = (id, value) => {
    const num = Number(value);
    if (Number.isNaN(num) || num < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  // Cart helpers
  const addToCart = (product, qty = 1) => {
    if (qty < 1) qty = 1;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, qty }];
      }
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        qty: updated[idx].qty + qty,
      };
      return updated;
    });
    setShowCart(true);
  };

  const updateCartQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing (for cart sidebar preview)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const delivery = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;
  const total = subtotal + gst + delivery;

  // Start order from cart
  const startCartOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Please add some items.");
      return;
    }
    setOrderMode("cart");
    setOrderProduct(null);
    setOrderQty(1);
    setShowOrderWizard(true);
    setShowCart(false);
  };

  // Start order from single product
  const startSingleOrder = (product, qty) => {
    if (qty < 1) qty = 1;
    setOrderMode("single");
    setOrderProduct(product);
    setOrderQty(qty);
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
      delivery: orderPayload.delivery,
      mode: orderPayload.mode,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const prev = JSON.parse(
        localStorage.getItem("sanskaraa_alpha_orders") || "[]"
      );
      localStorage.setItem(
        "sanskaraa_alpha_orders",
        JSON.stringify([...prev, order])
      );
    } catch (e) {
      console.error(e);
    }

    // If order from cart, clear cart
    if (order.mode === "cart") {
      setCart([]);
    }

    setShowOrderWizard(false);
    setOrderSuccess(order);

    // optional browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Sanskaraa AlphaStore", {
        body: `Order confirmed for ₹${order.pricing.total}. Delivery on ${new Date(
          order.delivery.date
        ).toLocaleDateString("en-IN")} (${order.delivery.slot}).`,
        icon: "/images/logo.png",
      });
    }
  };

  // Ask notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // If success page active, show only that
  if (orderSuccess) {
    return (
      <OrderSuccessPage
        order={orderSuccess}
        onBack={() => setOrderSuccess(null)}
      />
    );
  }

  // ----------------- UI -----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] pt-16 sm:pt-20 pb-6 px-2 sm:px-4 lg:px-6 relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-20 sm:w-24 h-20 sm:h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-24 sm:w-28 h-24 sm:h-28 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-10">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#800000] font-serif">
              Sanskaraa
            </h1>
            <p className="text-xs sm:text-sm text-[#800000] mt-1">
              Daily puja essentials – Nariyal, Agarbatti, Kapoor & more
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                placeholder="Search Nariyal, Agarbatti..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart((s) => !s)}
              className="relative bg-orange-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
                >
                  {cart.length}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 sm:mt-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium text-rose-800">
              Category:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap border ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white border-orange-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="ml-auto text-[11px] sm:text-xs text-gray-500 flex items-center gap-1">
              <FiShield className="text-green-600 w-3 h-3" />
              100% puja-ready items
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-6 sm:mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-white/80 rounded-2xl shadow">
              <p className="text-sm text-gray-600">
                No items found. Try changing category or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const qty = quantities[product.id] || 1;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-rose-100 overflow-hidden flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Image */}
                    <div className="h-24 sm:h-32 md:h-36 overflow-hidden bg-amber-50">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1 sm:gap-2 flex-grow">
                      <h2 className="font-semibold text-xs sm:text-sm text-rose-800 line-clamp-2 leading-tight">
                        {product.name}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-gray-500">
                        {product.category} • {product.unit}
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-amber-700 font-bold text-sm sm:text-base">
                          {formatINR(product.price)}
                          <span className="text-[11px] text-gray-500">
                            {" "}
                            / {product.unit}
                          </span>
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 bg-rose-50 rounded-full px-1 py-1 border border-rose-100">
                          <button
                            onClick={() => changeQty(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border text-xs hover:bg-gray-50"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={qty}
                            onChange={(e) =>
                              setQty(product.id, e.target.value)
                            }
                            className="w-10 text-center text-xs bg-transparent outline-none"
                          />
                          <button
                            onClick={() => changeQty(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border text-xs hover:bg-gray-50"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>

                        <p className="text-[11px] text-gray-500 text-right">
                          Total:{" "}
                          <span className="font-semibold text-rose-700">
                            {formatINR(product.price * qty)}
                          </span>
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="mt-2 flex flex-col gap-1">
                        <button
                          onClick={() => addToCart(product, qty)}
                          className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-1"
                        >
                          <FiShoppingCart className="w-3 h-3" />
                          Add {qty} to Cart
                        </button>

                        <button
                          onClick={() => startSingleOrder(product, qty)}
                          className="w-full py-1.5 sm:py-2 border border-amber-400 text-amber-700 rounded-lg text-[11px] sm:text-xs font-medium hover:bg-amber-50 transition-colors"
                        >
                          Buy Now (Single Item)
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
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-3 sm:p-4 border-b border-rose-100 flex items-center justify-between">
                <h2 className="font-bold text-lg sm:text-xl text-rose-800">
                  Your Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-rose-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">🛒</div>
                    <p className="text-sm text-gray-500">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="mt-4 bg-rose-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-rose-700"
                    >
                      Add items from AlphaStore
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-2 sm:gap-3 items-center mb-3 p-2 sm:p-3 bg-rose-50 rounded-xl"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg flex-shrink-0 bg-amber-50"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-rose-800 text-xs sm:text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {formatINR(item.price)} / {item.unit}
                          </p>
                          <div className="flex items-center gap-1 sm:gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateCartQty(item.id, item.qty - 1)
                              }
                              className="px-1.5 sm:px-2 bg-white rounded-lg border text-xs hover:bg-gray-100"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="px-1 text-xs sm:text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQty(item.id, item.qty + 1)
                              }
                              className="px-1.5 sm:px-2 bg-white rounded-lg border text-xs hover:bg-gray-100"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-rose-500 hover:text-rose-700 text-sm"
                            >
                              <FiX />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Price Summary */}
                    <div className="border-t border-rose-100 pt-3 sm:pt-4 mt-2 space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatINR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>{formatINR(gst)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Delivery{" "}
                          {delivery === 0 && (
                            <span className="text-green-600">
                              (FREE above ₹499)
                            </span>
                          )}
                        </span>
                        <span>{formatINR(delivery)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base sm:text-lg border-t border-rose-100 pt-2 sm:pt-3">
                        <span>Total</span>
                        <span>{formatINR(total)}</span>
                      </div>

                      <button
                        onClick={startCartOrder}
                        className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        Place Order
                      </button>

                      <div className="flex items-center gap-2 mt-3 text-[11px] sm:text-xs text-gray-500">
                        <FiShield className="text-green-600 w-3 h-3" />
                        <span>Secure checkout • UPI/Wallet (coming soon)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Wizard Modal (single + cart dono ke liye) */}
        <AnimatePresence>
          {showOrderWizard && (
            <OrderWizardModal
              mode={orderMode}
              product={orderProduct}
              qty={orderQty}
              cartItems={cart}
              onClose={() => setShowOrderWizard(false)}
              onConfirm={handleOrderConfirm}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
