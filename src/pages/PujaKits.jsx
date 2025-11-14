import React, { useEffect, useMemo, useState } from "react";
import { FiShoppingCart, FiHeart, FiSearch, FiStar, FiShare2, FiPlay, FiCalendar, FiTruck, FiShield, FiCheckCircle, FiInfo, FiArrowRight, FiArrowLeft, FiHome, FiDownload, FiMapPin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Mock Data ----------
const kits = [
  // 🏡 Ghar ke Sanskaar
  { id: 1, name: "Griha Pravesh / गृह प्रवेश", price: 1500, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  //{ id: 2, name: "Vastu Shanti / वास्तु शांति", price: 1300, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  //{ id: 3, name: "Navagraha Shanti / नवग्रह शांति", price: 1400, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 4, name: "Sundarkand Path / सुंदरकांड पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 5, name: "Ramayan Path / रामायण पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 6, name: "Satyanarayan Katha / सत्यनारायण कथा", price: 1200, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 7, name: "Lakshmi Puja / लक्ष्मी पूजा", price: 800, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 8, name: "Ganesh Puja / गणेश पूजा", price: 800, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 9, name: "Durga Saptashati / दुर्गा सप्तशती पाठ", price: 900, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 10, name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ", price: 700, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },

  // 👶 Bacchon ke Sanskaar
  //{ id: 11, name: "Naamkaran Sanskar / नामकरण संस्कार", price: 1200, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  { id: 12, name: "Annaprashan / अन्नप्राशन", price: 1100, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  //{ id: 13, name: "Mundan Sanskar / मुंडन संस्कार", price: 1000, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  { id: 14, name: "Janamdin Puja / जन्मदिन पूजा", price: 900, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },

  // 💑 Vivah Sanskar
  { id: 15, name: "Vivah / विवाह", price: 2500, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  //{ id: 16, name: "Roka / रोका समारोह", price: 2000, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
  { id: 17, name: "Sagai / सगाई", price: 1800, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 18, name: "Haldi / हल्दी रस्म", price: 900, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
 // { id: 19, name: "Mehendi / मेहंदी", price: 1200, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  //{ id: 20, name: "Sangeet / संगीत", price: 1500, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
  { id: 21, name: "Reception / रिसेप्शन", price: 2000, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 22, name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा", price: 1500, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },

  // ⚰ Pitrakarya
  { id: 23, name: "Antim Sanskar / अंतिम संस्कार", price: 2000, category: "Pitrakarya", img: "images/pujakit2.jpg" },
  { id: 24, name: "Pind Daan / पिंडदान", price: 1800, category: "Pitrakarya", img: "images/pujakit.jpg" },
  { id: 25, name: "Shraddh / श्राद्ध पूजा", price: 1500, category: "Pitrakarya", img: "images/pujakit2.jpg" },
 // { id: 26, name: "Asthi Visarjan / अस्थि विसर्जन", price: 1300, category: "Pitrakarya", img: "images/pujakit.jpg" },
  { id: 27, name: "Tehravin / तेरहवीं संस्कार", price: 1200, category: "Pitrakarya", img: "images/pujakit2.jpg" },

  // 📿 Festival Pujas
  { id: 28, name: "Karwa Chauth Puja / करवा चौथ पूजा", price: 900, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 29, name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा", price: 1200, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 30, name: "Raksha Bandhan / रक्षा बंधन पूजा", price: 800, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 31, name: "Navratri Puja / नवरात्रि पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 32, name: "Saraswati Puja / सरस्वती पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 33, name: "Mahashivratri Puja / महाशिवरात्रि पूजा", price: 1100, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 34, name: "Chhath Puja / छठ पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit.jpg" },
  //{ id: 35, name: "Holi Dahan Puja / होली दहन पूजा", price: 900, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 36, name: "Janmashtami Puja / जन्माष्टमी पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit.jpg" },

  // 🛕 Temple / Special Pujas
  { id: 37, name: "Rudrabhishek / रुद्राभिषेक", price: 2200, category: "Temple / Special Pujas", img: "images/pujakit.jpg" },
  { id: 38, name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप", price: 2500, category: "Temple / Special Pujas", img: "images/pujakit2.jpg" },
  { id: 39, name: "Bhumi Pujan / भूमि पूजन", price: 2000, category: "Temple / Special Pujas", img: "images/pujakit.jpg" },
  { id: 40, name: "Kundali Shanti / कुंडली शांति", price: 1800, category: "Temple / Special Pujas", img: "images/pujakit2.jpg" },
  { id: 41, name: "Upanayan Sanskar / उपनयन संस्कार", price: 1700, category: "Temple / Special Pujas", img: "images/pujakit.jpg" },
  { id: 42, name: "Kalash Sthapana / कलश स्थापना", price: 1600, category: "Temple / Special Pujas", img: "images/pujakit2.jpg" },
  { id: 43, name: "Ayushya Homam / आयुष्य हवन", price: 1500, category: "Temple / Special Pujas", img: "images/pujakit.jpg" },

  // 🧾 Others / Custom Options
  { id: 44, name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज", price: 3000, category: "Others / Custom Options", img: "images/pujakit.jpg" },
  { id: 45, name: "Online Puja Seva / ऑनलाइन पूजा सेवा", price: 2500, category: "Others / Custom Options", img: "images/pujakit2.jpg" },
  { id: 46, name: "Customized Event Plan / कस्टम इवेंट प्लान", price: 3500, category: "Others / Custom Options", img: "images/pujakit.jpg" },
];

const comboPacks = [
  {
    id: 1,
    name: "Festival Combo Pack",
    price: 1999,
    originalPrice: 2799,
    img: "images/pujakit.jpg",
    items: [
      "Lakshmi Puja Kit",
      "Ganesh Puja Kit",
      "Dhoop & Agarbatti Pack",
      "Brass Diya Set"
    ],
    subscription: false
  },
  {
    id: 2,
    name: "Monthly Puja Essentials",
    price: 1499,
    originalPrice: 1999,
    img: "images/pujakit2.jpg",
    items: [
      "Agarbatti Pack",
      "Ghee Diya Set",
      "Panchamrit Kit",
      "Fresh Flowers"
    ],
    subscription: true
  },
  {
    id: 3,
    name: "Home Rituals Combo",
    price: 2499,
    originalPrice: 3299,
    img: "images/pujakit.jpg",
    items: [
      "Satyanarayan Kit",
      "Ganesh Puja Kit",
      "Haldi Kumkum Pack",
      "Kalash Set"
    ],
    subscription: false
  }
];
const categories = [
  "All",
  "Ghar ke Sanskaar",
  "Bacchon ke Sanskaar",
  "Vivah Sanskar",
  "Pitrakarya",
  "Festival Pujas",
  "Temple / Special Pujas",
  "Others / Custom Options",
];

const festivals = [
  "All Festivals",
  "Diwali",
  "Navratri",
  "Ganesh Chaturthi",
  "Holi",
  "Janmashtami",
  "Raksha Bandhan",
  "House Warming",
  "Wedding"
];

const trustBadges = [
  { icon: "🔰", text: "100% Authentic" },
  { icon: "🌿", text: "Eco-friendly" },
  { icon: "🕉️", text: "Sanctified by Pandits" },
  { icon: "🚚", text: "Same Day Delivery" }
];

// ---------- Puja Kit Items Details ----------
const pujaKitItems = {
  1: {
    name: "Griha Pravesh / गृह प्रवेश",
    items: [
      "Kalash (पीतल का कलश)",
      "Nariyal (नारियल)",
      "Moli (मोली) - 2 पीस",
      "Chawal (चावल)",
      "Haldi (हल्दी)",
      "Kumkum (कुमकुम)",
      "Sindoor (सिंदूर)",
      "Gangajal (गंगाजल)",
      "Dhoop (धूप)",
      "Deepak (दीपक)",
      "Kapoor (कपूर)",
      "Agarbatti (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Mishri (मिश्री)",
      "Panchamrit (पंचामृत)",
      "Vastu Purush Photo (वास्तु पुरुष फोटो)",
      "Puja Vidhi Booklet (पूजा विधि बुकलेट)"
    ],
    benefits: [
      "नए घर में सकारात्मक ऊर्जा का प्रवेश",
      "परिवार के सदस्यों के बीच सौहार्द",
      "धन और समृद्धि की प्राप्ति",
      "सुरक्षा और शांति का वातावरण"
    ]
  },
  2: {
    name: "Vastu Shanti / वास्तु शांति",
    items: [
      "Vastu Yantra (वास्तु यंत्र)",
      "9 Types of Grains (9 प्रकार के अनाज)",
      "Kalash (कलश)",
      "Red Cloth (लाल कपड़ा)",
      "Sandalwood Paste (चंदन)",
      "Incense Sticks (अगरबत्ती)",
      "Ghee Diya (घी का दीया)",
      "Camphor (कपूर)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Betel Leaves (पान के पत्ते)",
      "Betel Nuts (सुपारी)",
      "Coins (सिक्के)",
      "Havan Samagri (हवन सामग्री)",
      "Vastu Shanti Booklet (वास्तु शांति बुकलेट)"
    ],
    benefits: [
      "घर के वास्तु दोषों का निवारण",
      "सकारात्मक ऊर्जा का संचार",
      "पारिवारिक कलह में कमी",
      "स्वास्थ्य और समृद्धि में वृद्धि"
    ]
  },
  7: {
    name: "Lakshmi Puja / लक्ष्मी पूजा",
    items: [
      "Lakshmi Ji Idol (लक्ष्मी जी प्रतिमा)",
      "Gold Coin (सोने का सिक्का)",
      "Red Cloth (लाल कपड़ा)",
      "Kalash (कलश)",
      "Scented Diya (सुगंधित दीया)",
      "Incense Sticks (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Mishri (मिश्री)",
      "Batasha (बताशा)",
      "Lotus Flower (कमल का फूल)",
      "Lakshmi Mantra Booklet (लक्ष्मी मंत्र बुकलेट)"
    ],
    benefits: [
      "धन और समृद्धि की प्राप्ति",
      "व्यापार में सफलता",
      "आर्थिक स्थिरता",
      "घर में सुख-शांति"
    ]
  },
  8: {
    name: "Ganesh Puja / गणेश पूजा",
    items: [
      "Ganesh Ji Idol (गणेश जी प्रतिमा)",
      "Modak (मोदक)",
      "Durva Grass (दूर्वा घास)",
      "Red Cloth (लाल कपड़ा)",
      "Scented Diya (सुगंधित दीया)",
      "Incense Sticks (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Coconut (नारियल)",
      "Ganesh Mantra Booklet (गणेश मंत्र बुकलेट)"
    ],
    benefits: [
      "विघ्नों का नाश",
      "नए कार्यों में सफलता",
      "बुद्धि और ज्ञान में वृद्धि",
      "सुख और समृद्धि"
    ]
  }
};

// ---------- Helper Functions ----------
const saveToLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const readFromLocal = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch (e) {
    return fallback;
  }
};

// ---------- Diya Animation Component ----------
const DiyaAnimation = () => (
  <motion.div
    className="fixed inset-0 flex justify-center items-center pointer-events-none z-[60]"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0] }}
    transition={{ duration: 1.5 }}
  >
    <div className="w-8 h-8 bg-orange-500 rounded-full blur-lg"></div>
    <div className="absolute w-16 h-16 bg-yellow-200 rounded-full blur-xl"></div>
  </motion.div>
);

// ---------- Booking Wizard Modal ----------
const BookingWizardModal = ({ kit, onClose, onConfirm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    address: "",
    includePandit: false,
    additionalNotes: ""
  });

  const steps = [
    { number: 1, title: "Date & Time", icon: FiCalendar },
    { number: 2, title: "Address & Service", icon: FiMapPin },
    { number: 3, title: "Review & Confirm", icon: FiCheckCircle }
  ];

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 5; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const time12hr = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        timeSlots.push(time12hr);
      }
    }
    return timeSlots;
  };

  const allTimeSlots = generateTimeSlots();

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleNext = () => {
    if (currentStep === 1 && (!bookingData.date || !bookingData.time)) {
      alert("Please select date and time");
      return;
    }
    if (currentStep === 2 && !bookingData.address) {
      alert("Please enter your address");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    onConfirm(bookingData);
  };

  const totalAmount = kit.price + (bookingData.includePandit ? 500 : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-800">Book {kit.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number 
                    ? 'bg-rose-600 border-rose-600 text-white' 
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {currentStep > step.number ? (
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  currentStep >= step.number ? 'text-rose-600 font-semibold' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div 
              className="h-full bg-rose-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] sm:min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800">Select Date & Time</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                      value={bookingData.date}
                      onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    >
                      <option value="">Choose your preferred time</option>
                      {allTimeSlots.map(timeSlot => (
                        <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
                  <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">📅 Recommended Timings</h4>
                  <p className="text-xs sm:text-sm text-amber-700">
                    For best spiritual benefits, consider morning hours (5:00 AM - 9:00 AM) or evening hours (4:00 PM - 7:00 PM)
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Address & Service */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800">Address & Service Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Enter your complete address with landmark..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-sm"
                    value={bookingData.address}
                    onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-4 border border-amber-300 rounded-xl bg-amber-50">
                  <input
                    type="checkbox"
                    id="includePandit"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 focus:ring-rose-500 rounded mt-1"
                    checked={bookingData.includePandit}
                    onChange={(e) => setBookingData(prev => ({ ...prev, includePandit: e.target.checked }))}
                  />
                  <label htmlFor="includePandit" className="text-sm text-gray-700 flex-1">
                    <div className="font-semibold">Include Pandit Service (+₹500)</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Experienced pandit will perform the puja with proper rituals and mantras
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Any special requirements, dietary restrictions for prasad, or specific instructions..."
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-sm"
                    value={bookingData.additionalNotes}
                    onChange={(e) => setBookingData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800">Review Your Booking</h3>

                <div className="bg-rose-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-start border-b border-rose-200 pb-3">
                    <div>
                      <h4 className="font-bold text-rose-800 text-sm sm:text-base">{kit.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Puja Kit</p>
                    </div>
                    <span className="font-semibold text-rose-700 text-sm sm:text-base">₹{kit.price}</span>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pandit Service:</span>
                      <span className="font-medium">{bookingData.includePandit ? 'Yes (+₹500)' : 'No'}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-bold pt-2 sm:pt-3 border-t border-rose-200">
                      <span>Total Amount:</span>
                      <span className="text-rose-600">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">✅ What happens next?</h4>
                  <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                    <li>• You'll see a confirmation screen with booking details</li>
                    <li>• We'll share WhatsApp confirmation within 2-3 seconds</li>
                    <li>• Our team will contact you for any clarifications</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              <FiArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          
          <button
            onClick={currentStep === steps.length ? handleConfirm : handleNext}
            className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 text-white py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {currentStep === steps.length ? (
              <>
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Confirm Booking
              </>
            ) : (
              <>
                Next
                <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Booking Success Page ----------
const BookingSuccessPage = ({ booking, onBackToHome }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const message = `🪷 *Puja Booking Confirmed!* 🪷

I just booked a ${booking.name} through Sanskaraa!

📅 Date: ${new Date(booking.date).toLocaleDateString('en-IN')}
⏰ Time: ${booking.time}
💰 Total: ₹${booking.total}

Experience traditional puja services with Sanskaraa!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadReceipt = () => {
    alert("PDF receipt download will be implemented with backend integration");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center"
      >
        {/* Success Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-100 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full flex items-center justify-center"
                >
                  <FiCheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Icon */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs">🪷</span>
          </motion.div>
        </div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
        >
          Booking Confirmed!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6"
        >
          Your puja has been successfully scheduled. May God bless you with happiness and prosperity.
        </motion.p>

        {/* Booking Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-xl p-4 mb-4 sm:mb-6 text-left"
        >
          <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2 text-sm sm:text-base">Booking Details</h3>
          
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Puja Name:</span>
              <span className="font-medium text-right">{booking.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(booking.date).toLocaleDateString('en-IN', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{booking.time}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-green-600">₹{booking.total}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4"
        >
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:bg-green-700 transition-colors text-xs sm:text-sm"
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Share
          </button>
          
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
          >
            <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            PDF Receipt
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:bg-rose-700 transition-colors text-sm"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>

        {/* Blessing Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 mt-4 sm:mt-6 italic"
        >
          "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः"<br />
          May all be happy, may all be free from illness
        </motion.p>
      </motion.div>
    </div>
  );
};

// ---------- Kit Items Modal ----------
const KitItemsModal = ({ kit, onClose, onBookPuja, onAddToCart }) => {
  const kitDetails = pujaKitItems[kit.id];
  const [selectedOption, setSelectedOption] = useState("fullPuja");
  const [wishlisted, setWishlisted] = useState(false);

  const relatedKits = kits.filter(k => 
    k.category === kit.category && k.id !== kit.id
  ).slice(0, 2);

  const handleAddToWishlist = () => {
    setWishlisted(!wishlisted);
  };

  const handleQuickAction = () => {
    if (selectedOption === "kitOnly") {
      onAddToCart(kit);
    } else {
      onBookPuja(kit);
    }
    onClose();
  };

  if (!kitDetails) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-rose-800">Kit Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
          </div>
          <p className="text-gray-600 text-center py-8">Details for this kit are coming soon...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-800">{kitDetails.name} - Complete Details</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full ${
                wishlisted ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <FiHeart className={wishlisted ? "fill-rose-600" : ""} />
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Option Selection */}
            <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
              <h3 className="font-semibold text-amber-800 mb-2 sm:mb-3 text-sm sm:text-base">Select Service Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedOption("fullPuja")}
                  className={`p-3 rounded-lg border-2 text-left ${
                    selectedOption === "fullPuja" 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base">Book Full Puja</div>
                  <div className="text-xs sm:text-sm text-gray-600">Kit + Pandit Service</div>
                  <div className="text-rose-600 font-bold mt-1 text-sm sm:text-base">₹{kit.price + 500}</div>
                </button>
                
                <button
                  onClick={() => setSelectedOption("kitOnly")}
                  className={`p-3 rounded-lg border-2 text-left ${
                    selectedOption === "kitOnly" 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base">Buy Kit Only</div>
                  <div className="text-xs sm:text-sm text-gray-600">DIY Puja Kit</div>
                  <div className="text-rose-600 font-bold mt-1 text-sm sm:text-base">₹{kit.price}</div>
                </button>
              </div>
            </div>

            {/* Kit Items & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                  What's Included
                </h3>
                <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                  <ul className="space-y-2 sm:space-y-3">
                    {kitDetails.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <FiStar className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5" />
                  Benefits
                </h3>
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <ul className="space-y-2 sm:space-y-3">
                    {kitDetails.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-600 text-xs">✨</span>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Quick Actions</h4>
              
              <button
                onClick={handleQuickAction}
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white py-2 sm:py-3 rounded-lg font-semibold mb-2 sm:mb-3 hover:shadow-lg transition-all text-sm sm:text-base"
              >
                {selectedOption === "fullPuja" ? "Order Now" : "Add Kit to Cart"}
              </button>
              
              <button
                onClick={() => {
                  onAddToCart(kit);
                  onClose();
                }}
                className="w-full border border-rose-400 text-rose-700 py-2 rounded-lg font-medium hover:bg-rose-50 transition-colors mb-2 text-sm"
              >
                Add to Cart
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Recommended Add-ons */}
            {relatedKits.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">Recommended Add-ons</h4>
                <div className="space-y-2 sm:space-y-3">
                  {relatedKits.map(relatedKit => (
                    <div key={relatedKit.id} className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg">
                      <img src={relatedKit.img} alt={relatedKit.name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{relatedKit.name}</p>
                        <p className="text-xs text-rose-600 font-semibold">₹{relatedKit.price}</p>
                      </div>
                      <button 
                        onClick={() => onAddToCart(relatedKit)}
                        className="text-xs bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-700 transition-colors flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Why Choose Sanskaraa?</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✅ 100% Authentic Products</li>
                <li>✅ Expert Pandit Network</li>
                <li>✅ Same Day Delivery</li>
                <li>✅ Sanitized & Blessed</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Main Component ----------
export default function EventKitsPage() {
  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFestival, setSelectedFestival] = useState("All Festivals");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("kits");

  // Wishlist + Cart persisted
  const [wishlist, setWishlist] = useState(() => readFromLocal("sanskaraa_wishlist", []));
  const [cart, setCart] = useState(() => readFromLocal("sanskaraa_cart", []));

  // Modal + buy flow
  const [detailKit, setDetailKit] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [showDiyaAnimation, setShowDiyaAnimation] = useState(false);
  
  // NEW STATES FOR BOOKING AND KIT DETAILS
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [selectedKitForBooking, setSelectedKitForBooking] = useState(null);
  const [showKitItemsModal, setShowKitItemsModal] = useState(false);
  const [selectedKitForDetails, setSelectedKitForDetails] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Festival calendar
  const [nextFestival, setNextFestival] = useState({ name: "Navratri", days: 12 });

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Persist cart & wishlist
  useEffect(() => saveToLocal("sanskaraa_cart", cart), [cart]);
  useEffect(() => saveToLocal("sanskaraa_wishlist", wishlist), [wishlist]);

  // Browser notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = kits.filter((k) => {
      const matchCat = selectedCategory === "All" || k.category === selectedCategory;
      const matchFestival = selectedFestival === "All Festivals" || k.festival === selectedFestival;
      const matchPrice = k.price >= priceRange[0] && k.price <= priceRange[1];
      const q = search.trim().toLowerCase();
      const matchSearch = q === "" || k.name.toLowerCase().includes(q) || k.category.toLowerCase().includes(q);
      return matchCat && matchFestival && matchPrice && matchSearch;
    });

    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") list = list.sort((a, b) => b.id - a.id);
    return list;
  }, [search, selectedCategory, selectedFestival, priceRange, sortBy]);

  // Cart helpers
  const addToCart = (kit, qty = 1) => {
    const existingIdx = cart.findIndex((c) => c.id === kit.id);
    let newCart = [...cart];
    if (existingIdx === -1) newCart.push({ ...kit, qty });
    else newCart[existingIdx].qty += qty;
    setCart(newCart);
    setShowCart(true);
    // Show diya animation
    setShowDiyaAnimation(true);
    setTimeout(() => setShowDiyaAnimation(false), 1500);
  };

  const updateQty = (id, qty) => { 
    if (qty < 1) return; 
    setCart(c => c.map(it => it.id === id ? { ...it, qty } : it)); 
  };

  const removeFromCart = (id) => setCart(c => c.filter(it => it.id !== id));
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  // Quick view function
  const quickView = (kit) => {
    setDetailKit(kit);
  };

  // NEW: Book Puja Function
  const bookPuja = (kit) => {
    setSelectedKitForBooking(kit);
    setShowBookingWizard(true);
  };

  // NEW: Show Kit Items Details
  const showKitDetails = (kit) => {
    setSelectedKitForDetails(kit);
    setShowKitItemsModal(true);
  };

  // NEW: Enhanced Handle Booking Confirmation
  const handleBookingConfirm = (bookingData) => {
    const totalAmount = selectedKitForBooking.price + (bookingData.includePandit ? 500 : 0);
    
    // Save booking to localStorage
    const bookingRecord = {
      id: Date.now(),
      name: selectedKitForBooking.name,
      date: bookingData.date,
      time: bookingData.time,
      address: bookingData.address,
      total: totalAmount,
      includePandit: bookingData.includePandit,
      additionalNotes: bookingData.additionalNotes,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const prevBookings = JSON.parse(localStorage.getItem("sanskaraa_bookings") || "[]");
    localStorage.setItem("sanskaraa_bookings", JSON.stringify([...prevBookings, bookingRecord]));

    // Set booking success data
    setBookingSuccess(bookingRecord);
    setShowBookingWizard(false);
    setShowBookingSuccess(true);

    // Send WhatsApp message after 2.5 seconds
    setTimeout(() => {
      const message = `🪷 *Puja Booking Confirmed* 🪷

📅 *Booking Details:*
• *Puja Type:* ${selectedKitForBooking.name}
• *Date:* ${new Date(bookingData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• *Time:* ${bookingData.time}
• *Address:* ${bookingData.address}
• *Pandit Service:* ${bookingData.includePandit ? 'Yes (+₹500)' : 'No'}

💰 *Payment Summary:*
• Kit Price: ₹${selectedKitForBooking.price}
${bookingData.includePandit ? `• Pandit Service: ₹500` : ''}
• *Total Amount:* ₹${totalAmount}

📋 *Additional Notes:* ${bookingData.additionalNotes || 'None'}

_We wish you a blessed and prosperous puja!_
_For any queries, contact support._`;

      const encodedMessage = encodeURIComponent(message);
      const supportNumber = "916201486202"; 
      const whatsappUrl = `https://wa.me/${supportNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');

      // Browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🪔 Puja Reminder Set!", {
          body: `Your ${selectedKitForBooking.name} is scheduled for ${bookingData.date} at ${bookingData.time}.`,
          icon: "/images/logo.png",
        });
      }
    }, 2500);
  };

  // Pricing
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const couponDiscount = couponApplied === "FESTIVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const delivery = subtotal > 0 ? (subtotal > 999 ? 0 : 50) : 0;
  const total = Math.round(subtotal - couponDiscount + gst + delivery);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FESTIVE10") { 
      setCouponApplied("FESTIVE10"); 
    } else { 
      setCouponApplied(null); 
      alert("Invalid coupon"); 
    }
  };

  const proceedPaymentMock = () => {
    if (cart.length === 0) return alert("Cart is empty");
    alert(`Payment successful! Amount: ₹${total}`);
    setCart([]); setCoupon(""); setCouponApplied(null); setShowCart(false);
  };

  const handleShare = async (kit) => {
    const data = { title: kit.name, text: `Check this Puja Kit: ${kit.name} — ₹${kit.price} from Sanskaraa`, url: window.location.href };
    try { 
      if (navigator.share) await navigator.share(data); 
      else { 
        await navigator.clipboard.writeText(`${data.text} - ${data.url}`); 
        alert("Link copied!"); 
      } 
    } catch (e) { console.log(e); }
  };

  // One-click buy
  const oneClickBuy = (kit) => {
    addToCart(kit);
    setTimeout(() => {
      proceedPaymentMock();
    }, 500);
  };

  // If booking success page is shown, render only that
  if (showBookingSuccess && bookingSuccess) {
    return (
      <BookingSuccessPage 
        booking={bookingSuccess}
        onBackToHome={() => {
          setShowBookingSuccess(false);
          setBookingSuccess(null);
          setSelectedKitForBooking(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] pt-16 sm:pt-20 pb-6 px-2 sm:px-4 lg:px-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-20 sm:w-24 h-20 sm:h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 sm:w-28 h-24 sm:h-28 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-10 relative z-10">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
          {trustBadges.map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-1 sm:gap-2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border"
            >
              <span className="text-sm">{badge.icon}</span>
              <span className="text-xs font-medium text-[#800000]">{badge.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Topbar (Logo, Search, Cart) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-10 p-2 sm:p-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#800000] font-serif">Sanskaraa</h1>
            <p className="text-xs sm:text-sm text-[#800000] mt-1">Traditional puja kits, delivered with divine blessings</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Festival Calendar Widget */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-700 to-amber-700 text-white px-3 sm:px-4 py-2 rounded-full cursor-pointer flex-shrink-0"
              onClick={() => setSelectedFestival(nextFestival.name)}
            >
              <FiCalendar className="text-yellow-200 w-4 h-4" />
              <div className="text-xs">
                <div className="font-semibold">Next: {nextFestival.name}</div>
                <div className="text-yellow-200">{nextFestival.days} days</div>
              </div>
            </motion.div>

            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="pl-9 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-sm" 
                placeholder="Search puja kits..." 
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
            </div>
            
            {/* Cart Button */}
            <button onClick={() => setShowCart(s => !s)} className="relative bg-orange-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0">
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

        {/* Category + Festival + Sort Tabs */}
        <div className="sticky top-14 sm:top-16 z-20 bg-white/90 backdrop-blur-sm py-3 sm:py-4 mt-4 sm:mt-6 rounded-xl shadow-lg border border-orange-100 mx-2 sm:mx-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 px-2 sm:px-4">
            {/* Tab Navigation */}
            <div className="flex gap-1 sm:gap-2 border-b lg:border-none overflow-x-auto pb-2 lg:pb-0">
              {["kits", "combos", "subscription"].map(tab => (
                <button 
                  key={tab}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap capitalize flex-shrink-0 ${
                    activeTab === tab 
                    ? "bg-orange-600 text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "kits" ? "Puja Kits" : tab === "combos" ? "Combo Packs" : "Subscription"}
                </button>
              ))}
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select 
                value={selectedFestival} 
                onChange={e => setSelectedFestival(e.target.value)}
                className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]"
              >
                {festivals.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <span className="text-xs sm:text-sm text-rose-700 whitespace-nowrap">Max Price:</span>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  value={priceRange[1]} 
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-20 sm:w-24 md:w-32"
                />
                <span className="text-xs text-rose-600 font-medium">₹{priceRange[1]}</span>
              </div>
              
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]">
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Diya Animation */}
        <AnimatePresence>
          {showDiyaAnimation && <DiyaAnimation />}
        </AnimatePresence>

        {/* Product Grid / Combo Packs */}
        <div className="mt-6 sm:mt-8 px-2 sm:px-0">
          {activeTab === "kits" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {loading ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse h-48 sm:h-60 md:h-64 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl"></div>
              )) : filtered.map(kit => (
                <motion.div 
                  layout 
                  key={kit.id} 
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden border border-rose-100 group"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(kit.id)}
                    className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 bg-white/80 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${wishlist.includes(kit.id) ? "text-rose-500 fill-rose-500" : "text-gray-400"}`} />
                  </button>

                  {/* Image */}
                  <div className="h-24 sm:h-32 md:h-36 overflow-hidden">
                    <img 
                      src={kit.img} 
                      alt={kit.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1 sm:gap-2">
                    <h2 className="font-semibold text-xs sm:text-sm text-rose-800 group-hover:text-rose-900 transition-colors line-clamp-2 leading-tight">{kit.name}</h2>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-amber-700 font-bold text-sm sm:text-base">₹{kit.price}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="fill-amber-500 w-2 h-2 sm:w-3 sm:h-3" />
                        <span className="text-xs">4.8</span>
                      </div>
                    </div>

                    {/* Kit Details Button */}
                    <button 
                      onClick={() => showKitDetails(kit)}
                      className="w-full py-1.5 sm:py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-xs font-medium flex items-center justify-center gap-1 mb-2"
                    >
                      <FiInfo className="w-3 h-3" />
                      View Kit Items
                    </button>

                    {/* Order Now Button */}
                    <button 
                      onClick={() => bookPuja(kit)}
                      className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-xs font-medium"
                    >
                      Order Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Combo Packs */}
          {activeTab === "combos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {comboPacks.map(combo => (
                <motion.div 
                  key={combo.id}
                  className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-lg border border-amber-200 overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                    <img src={combo.img} alt={combo.name} className="h-full w-full object-cover" />
                    <div className="absolute top-2 right-2 bg-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      Save ₹{combo.originalPrice - combo.price}
                    </div>
                    {combo.subscription && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs">
                        🔔 Monthly
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg text-rose-800">{combo.name}</h3>
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <span className="text-amber-700 font-bold text-lg sm:text-xl">₹{combo.price}</span>
                      <span className="text-gray-500 line-through text-xs sm:text-sm">₹{combo.originalPrice}</span>
                    </div>
                    
                    <ul className="mt-2 sm:mt-3 space-y-1 text-xs sm:text-sm">
                      {combo.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <FiCheckCircle className="text-green-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => addToCart(combo)}
                      className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      {combo.subscription ? "Subscribe Now" : "Add Combo to Cart"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Subscription Section */}
          {activeTab === "subscription" && (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto shadow-xl border border-amber-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-800 mb-3 sm:mb-4">Monthly Puja Essentials Subscription</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">Never run out of puja essentials. Get curated items delivered monthly.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {["Basic Plan", "Standard Plan", "Premium Plan"].map((plan, idx) => (
                    <div key={idx} className="border border-amber-300 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow bg-amber-50">
                      <h4 className="font-bold text-amber-700 text-sm sm:text-base md:text-lg">{plan}</h4>
                      <p className="text-xl sm:text-2xl font-bold text-rose-800 my-1 sm:my-2">₹{800 + idx * 400}</p>
                      <p className="text-xs sm:text-sm text-gray-600">per month</p>
                      <button className="w-full mt-2 bg-amber-500 text-white py-1.5 sm:py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium text-xs sm:text-sm">
                        Subscribe
                      </button>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500">Cancel anytime • Free delivery • Customizable items</p>
              </div>
            </div>
          )}
        </div>

        {/* How-to Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-rose-100 mx-2 sm:mx-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-800 mb-4 sm:mb-6 text-center">How to Use Puja Kits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { title: "Unboxing", desc: "Watch how to properly open and arrange your puja kit", icon: "📦" },
              { title: "Setup Guide", desc: "Step-by-step puja setup instructions", icon: "🛠️" },
              { title: "Puja Process", desc: "Complete video guide for the ceremony", icon: "🎥" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-3 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-100">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                <h4 className="font-semibold text-sm sm:text-base md:text-lg text-rose-700 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-8 sm:mt-12 md:mt-16 px-2 sm:px-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-800 mb-4 sm:mb-6 text-center">Customer Puja Setups</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-rose-100">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-rose-800 text-xs sm:text-sm">Customer {i}</p>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2 sm:mb-3">"Beautiful kit, everything was perfect for our Diwali puja!"</p>
                <div className="h-16 sm:h-20 md:h-24 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg flex items-center justify-center">
                  <span className="text-rose-400 text-xs">📸 Customer Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW: Booking Wizard Modal */}
        <AnimatePresence>
          {showBookingWizard && selectedKitForBooking && (
            <BookingWizardModal 
              kit={selectedKitForBooking}
              onClose={() => {
                setShowBookingWizard(false);
                setSelectedKitForBooking(null);
              }}
              onConfirm={handleBookingConfirm}
            />
          )}
        </AnimatePresence>

        {/* NEW: Kit Items Details Modal */}
        <AnimatePresence>
          {showKitItemsModal && selectedKitForDetails && (
            <KitItemsModal 
              kit={selectedKitForDetails}
              onClose={() => {
                setShowKitItemsModal(false);
                setSelectedKitForDetails(null);
              }}
              onBookPuja={bookPuja}
              onAddToCart={addToCart}
            />
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-3 sm:p-4 border-b border-rose-100">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg sm:text-xl text-rose-800">Your Cart</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
                </div>
                {subtotal > 999 && (
                  <div className="mt-2 bg-green-50 text-green-700 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                    🎉 You qualify for FREE delivery!
                  </div>
                )}
              </div>
              
              <div className="p-3 sm:p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
                    <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="mt-3 sm:mt-4 bg-rose-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-rose-700 transition-colors text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.map(it => (
                      <div key={it.id} className="flex gap-2 sm:gap-3 items-center mb-3 p-2 sm:p-3 bg-rose-50 rounded-xl">
                        <img src={it.img} alt={it.name} className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-rose-800 text-xs sm:text-sm truncate">{it.name}</p>
                          <p className="text-amber-700 font-bold text-xs sm:text-sm">₹{it.price} × {it.qty}</p>
                          <div className="flex items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm">
                            <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-1.5 sm:px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors">-</button>
                            <span className="px-1">{it.qty}</span>
                            <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-1.5 sm:px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors">+</button>
                            <button onClick={() => removeFromCart(it.id)} className="ml-auto text-rose-500 hover:text-rose-700 text-base">✕</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-rose-100 pt-3 sm:pt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                      {couponApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon ({couponApplied})</span>
                          <span>-₹{Math.round(couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between"><span>GST 18%</span><span>₹{Math.round(gst)}</span></div>
                      <div className="flex justify-between">
                        <span>Delivery {delivery === 0 ? <span className="text-green-600">(FREE)</span> : ""}</span>
                        <span>₹{delivery}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base sm:text-lg border-t border-rose-100 pt-2 sm:pt-3">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-3 sm:mt-4">
                        <input 
                          value={coupon} 
                          onChange={e => setCoupon(e.target.value)} 
                          placeholder="Enter coupon" 
                          className="flex-1 border border-rose-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm" 
                        />
                        <button 
                          onClick={applyCoupon}
                          className="bg-rose-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-rose-700 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      
                      <div className="grid gap-2 sm:gap-3 mt-3 sm:mt-4">
                        <button 
                          onClick={proceedPaymentMock}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm"
                        >
                          Book Now
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-gray-600">
                        <FiShield className="text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Secure payment • 100% Safe</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}