import React, { useEffect, useMemo, useState } from "react";
import { FiShoppingCart, FiHeart, FiSearch, FiStar, FiShare2, FiPlay, FiCalendar, FiTruck, FiShield, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Mock Data (unchanged) ----------
const kits = [
  // 🏡 Ghar ke Sanskaar
  { id: 1, name: "Griha Pravesh / गृह प्रवेश", price: 1500, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 2, name: "Vastu Shanti / वास्तु शांति", price: 1300, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 3, name: "Navagraha Shanti / नवग्रह शांति", price: 1400, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 4, name: "Sundarkand Path / सुंदरकांड पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 5, name: "Ramayan Path / रामायण पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 6, name: "Satyanarayan Katha / सत्यनारायण कथा", price: 1200, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 7, name: "Lakshmi Puja / लक्ष्मी पूजा", price: 800, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 8, name: "Ganesh Puja / गणेश पूजा", price: 800, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 9, name: "Durga Saptashati / दुर्गा सप्तशती पाठ", price: 900, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },
  { id: 10, name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ", price: 700, category: "Ghar ke Sanskaar", img: "images/pujakit.jpg" },

  // 👶 Bacchon ke Sanskaar
  { id: 11, name: "Naamkaran Sanskar / नामकरण संस्कार", price: 1200, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  { id: 12, name: "Annaprashan / अन्नप्राशन", price: 1100, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  { id: 13, name: "Mundan Sanskar / मुंडन संस्कार", price: 1000, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },
  { id: 14, name: "Janamdin Puja / जन्मदिन पूजा", price: 900, category: "Bacchon ke Sanskaar", img: "images/pujakit2.jpg" },

  // 💑 Vivah Sanskar
  { id: 15, name: "Vivah / विवाह", price: 2500, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 16, name: "Roka / रोका समारोह", price: 2000, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
  { id: 17, name: "Sagai / सगाई", price: 1800, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 18, name: "Haldi / हल्दी रस्म", price: 900, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
  { id: 19, name: "Mehendi / मेहंदी", price: 1200, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 20, name: "Sangeet / संगीत", price: 1500, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },
  { id: 21, name: "Reception / रिसेप्शन", price: 2000, category: "Vivah Sanskar", img: "images/pujakit.jpg" },
  { id: 22, name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा", price: 1500, category: "Vivah Sanskar", img: "images/pujakit2.jpg" },

  // ⚰ Pitrakarya
  { id: 23, name: "Antim Sanskar / अंतिम संस्कार", price: 2000, category: "Pitrakarya", img: "images/pujakit2.jpg" },
  { id: 24, name: "Pind Daan / पिंडदान", price: 1800, category: "Pitrakarya", img: "images/pujakit.jpg" },
  { id: 25, name: "Shraddh / श्राद्ध पूजा", price: 1500, category: "Pitrakarya", img: "images/pujakit2.jpg" },
  { id: 26, name: "Asthi Visarjan / अस्थि विसर्जन", price: 1300, category: "Pitrakarya", img: "images/pujakit.jpg" },
  { id: 27, name: "Tehravin / तेरहवीं संस्कार", price: 1200, category: "Pitrakarya", img: "images/pujakit2.jpg" },

  // 📿 Festival Pujas
  { id: 28, name: "Karwa Chauth Puja / करवा चौथ पूजा", price: 900, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 29, name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा", price: 1200, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 30, name: "Raksha Bandhan / रक्षा बंधन पूजा", price: 800, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 31, name: "Navratri Puja / नवरात्रि पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 32, name: "Saraswati Puja / सरस्वती पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 33, name: "Mahashivratri Puja / महाशिवरात्रि पूजा", price: 1100, category: "Festival Pujas", img: "images/pujakit2.jpg" },
  { id: 34, name: "Chhath Puja / छठ पूजा", price: 1000, category: "Festival Pujas", img: "images/pujakit.jpg" },
  { id: 35, name: "Holi Dahan Puja / होली दहन पूजा", price: 900, category: "Festival Pujas", img: "images/pujakit2.jpg" },
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
  { id: 45, name: "Online Puja Seva / ऑनलाइन पूजा सेवа", price: 2500, category: "Others / Custom Options", img: "images/pujakit2.jpg" },
  { id: 46, name: "Customized Event Plan / कस्टम इवेंट प्लान", price: 3500, category: "Others / Custom Options", img: "images/pujakit.jpg" },
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

const comboPacks = [
  { id: 'combo1', name: "Diwali Special Combo", price: 3500, originalPrice: 4200, items: ["Lakshmi Puja Kit", "Ganesh Puja Kit", "Special Diyas", "Dhoop Set"], img: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e9?w=400" },
  { id: 'combo2', name: "Navratri Power Pack", price: 2800, originalPrice: 3400, items: ["Durga Puja Kit", "Kalash Sthapana Set", "9 Days Dhoop", "Prasad Box"], img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400" },
  { id: 'combo3', name: "Monthly Puja Essentials", price: 1800, originalPrice: 2200, items: ["Daily Puja Kit", "Incense Sticks", "Camphor", "Flowers"], subscription: true, img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?w=400" }
];

const trustBadges = [
  { icon: "🔰", text: "100% Authentic" },
  { icon: "🌿", text: "Eco-friendly" },
  { icon: "🕉️", text: "Sanctified by Pandits" },
  { icon: "🚚", text: "Same Day Delivery" }
];

// ---------- Helpers ----------
const saveToLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const readFromLocal = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch (e) {
    return fallback;
  }
};

// Diya flame animation component
const DiyaAnimation = () => (
  <motion.div
    className="fixed inset-0 flex justify-center items-center pointer-events-none z-[60]" // Fixed, higher z-index
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0] }}
    transition={{ duration: 1.5 }}
  >
    <div className="w-8 h-8 bg-orange-500 rounded-full blur-lg"></div>
    <div className="absolute w-16 h-16 bg-yellow-200 rounded-full blur-xl"></div>
  </motion.div>
);

export default function EventKitsPage() {
  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFestival, setSelectedFestival] = useState("All Festivals");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("kits"); // kits, combos, subscription

  // Wishlist + Cart persisted
  const [wishlist, setWishlist] = useState(() => readFromLocal("ska_wishlist", []));
  const [cart, setCart] = useState(() => readFromLocal("ska_cart", []));

  // Modal + buy flow
  const [detailKit, setDetailKit] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [showDiyaAnimation, setShowDiyaAnimation] = useState(false);

  // Festival calendar
  const [nextFestival, setNextFestival] = useState({ name: "Navratri", days: 12 });

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Persist cart & wishlist
  useEffect(() => saveToLocal("ska_cart", cart), [cart]);
  useEffect(() => saveToLocal("ska_wishlist", wishlist), [wishlist]);

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

  // Pricing
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const couponDiscount = couponApplied === "FESTIVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const delivery = subtotal > 0 ? (subtotal > 999 ? 0 : 50) : 0; // Free delivery above ₹999
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] pt-20 pb-6 px-2 sm:px-4 lg:px-6 relative">
      {/* Background pattern (responsive positioning) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-20 sm:w-24 h-20 sm:h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 sm:w-28 h-24 sm:h-28 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-10 relative z-10">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-8 sm:mt-14 p-2 sm:p-0">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#800000] font-serif">Sanskaraa</h1>
            <p className="text-sm md:text-base text-[#800000] mt-1">Traditional puja kits, delivered with divine blessings</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Festival Calendar Widget (Hidden on XS, Shown on SM+) */}
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
            <div className="relative flex-1">
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="pl-10 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-sm" 
                placeholder="Search puja kits..." 
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
            </div>
            
            {/* Cart Button */}
            <button onClick={() => setShowCart(s => !s)} className="relative bg-orange-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0">
              <FiShoppingCart size={18} className="w-5 h-5" />
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

        {/* Category + Festival + Sort Tabs (Sticky and Responsive) */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white/90 backdrop-blur-sm py-3 sm:py-4 mt-4 sm:mt-6 rounded-xl shadow-lg border border-orange-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 px-2 sm:px-0">
            {/* Tab Navigation (Responsive Horizontal Scroll) */}
            <div className="flex gap-2 border-b lg:border-none overflow-x-auto pb-2 lg:pb-0">
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

            {/* Filters and Sorting (Stacked on Mobile, Side-by-Side on Desktop) */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-rose-200 text-sm bg-white flex-1 min-w-[150px]"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select 
                value={selectedFestival} 
                onChange={e => setSelectedFestival(e.target.value)}
                className="px-3 py-2 rounded-lg border border-rose-200 text-sm bg-white flex-1 min-w-[150px]"
              >
                {festivals.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <span className="text-sm text-rose-700 whitespace-nowrap">Max Price:</span>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  value={priceRange[1]} 
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-24 md:w-32"
                />
                <span className="text-xs text-rose-600 font-medium">₹{priceRange[1]}</span>
              </div>
              
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-rose-200 text-sm bg-white flex-1 min-w-[150px]">
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
        <div className="mt-8">
          {activeTab === "kits" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {loading ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse h-64 sm:h-80 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl"></div>
              )) : filtered.map(kit => (
                <motion.div 
                  layout 
                  key={kit.id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer relative overflow-hidden border border-rose-100 group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(kit.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <FiHeart className={wishlist.includes(kit.id) ? "text-rose-500 fill-rose-500" : "text-gray-400"} />
                  </button>

                  {/* Image */}
                  <div className="h-36 sm:h-48 overflow-hidden">
                    <img 
                      src={kit.img} 
                      alt={kit.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="p-3 sm:p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-sm sm:text-base text-rose-800 group-hover:text-rose-900 transition-colors truncate">{kit.name}</h2>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-amber-700 font-bold text-base sm:text-lg">₹{kit.price}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="fill-amber-500 w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">4.8</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => addToCart(kit)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                      >
                        <span className="hidden sm:inline">Add to Cart</span>
                        <FiShoppingCart className="w-4 h-4 sm:hidden mx-auto" />
                      </button>
                      <button 
                        onClick={() => quickView(kit)}
                        className="px-3 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors text-sm"
                      >
                        <FiPlay className="w-4 h-4 transform rotate-180" />
                      </button>
                    </div>

                    {/* One-click Buy */}
                    <button 
                      onClick={() => oneClickBuy(kit)}
                      className="w-full py-2 border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-50 transition-colors text-sm font-medium"
                    >
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Combo Packs */}
          {activeTab === "combos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comboPacks.map(combo => (
                <motion.div 
                  key={combo.id}
                  className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl shadow-lg border border-amber-200 overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img src={combo.img} alt={combo.name} className="h-full w-full object-cover" />
                    <div className="absolute top-3 right-3 bg-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-bold sm:text-sm">
                      Save ₹{combo.originalPrice - combo.price}
                    </div>
                    {combo.subscription && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs sm:text-sm">
                        🔔 Monthly
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-base sm:text-lg text-rose-800">{combo.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-700 font-bold text-xl">₹{combo.price}</span>
                      <span className="text-gray-500 line-through text-sm">₹{combo.originalPrice}</span>
                    </div>
                    
                    <ul className="mt-3 space-y-1 text-sm">
                      {combo.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <FiCheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => addToCart(combo)}
                      className="w-full mt-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all text-base"
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
            <div className="text-center py-8 sm:py-12">
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl border border-amber-200">
                <h3 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4">Monthly Puja Essentials Subscription</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Never run out of puja essentials. Get curated items delivered monthly.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {["Basic Plan", "Standard Plan", "Premium Plan"].map((plan, idx) => (
                    <div key={idx} className="border border-amber-300 rounded-xl p-4 hover:shadow-lg transition-shadow bg-amber-50">
                      <h4 className="font-bold text-amber-700 text-lg">{plan}</h4>
                      <p className="text-2xl font-bold text-rose-800 my-2">₹{800 + idx * 400}</p>
                      <p className="text-sm text-gray-600">per month</p>
                      <button className="w-full mt-3 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm">
                        Subscribe
                      </button>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm text-gray-500">Cancel anytime • Free delivery • Customizable items</p>
              </div>
            </div>
          )}
        </div>

        {/* How-to Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-rose-100">
          <h3 className="text-xl sm:text-2xl font-bold text-rose-800 mb-6 text-center">How to Use Puja Kits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Unboxing", desc: "Watch how to properly open and arrange your puja kit", icon: "📦" },
              { title: "Setup Guide", desc: "Step-by-step puja setup instructions", icon: "🛠️" },
              { title: "Puja Process", desc: "Complete video guide for the ceremony", icon: "🎥" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-3 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-100">
                <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-base sm:text-lg text-rose-700 mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-rose-800 mb-6 text-center">Customer Puja Setups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-lg border border-rose-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-rose-800 text-sm">Customer {i}</p>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">"Beautiful kit, everything was perfect for our Diwali puja!"</p>
                <div className="h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg flex items-center justify-center">
                  <span className="text-rose-400 text-sm">📸 Customer Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Modal (Responsive width and height) */}
        <AnimatePresence>
          {detailKit && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
              onClick={() => setDetailKit(null)}
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.8, opacity: 0 }} 
                className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-rose-800">{detailKit.name}</h2>
                  <button onClick={() => setDetailKit(null)} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
                </div>
                
                <img src={detailKit.img} alt={detailKit.name} className="w-full h-48 sm:h-64 object-cover rounded-xl mb-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-amber-700 font-bold text-2xl sm:text-3xl mb-4">₹{detailKit.price}</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{detailKit.shortDesc}</p>
                    
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => addToCart(detailKit)} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
                        Add to Cart
                      </button>
                      <button onClick={() => oneClickBuy(detailKit)} className="flex-1 border border-rose-400 text-rose-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-rose-50 text-sm sm:text-base">
                        Buy Now
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-rose-800 text-lg mb-3">Kit Includes:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {["All essential puja items", "Step-by-step guide", "Mantra booklet", "Prasad material"].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar (Responsive width) */}
        <AnimatePresence>
          {showCart && (
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-rose-100">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl text-rose-800">Your Cart</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-rose-600 text-xl p-1">✕</button>
                </div>
                {subtotal > 999 && (
                  <div className="mt-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                    🎉 You qualify for FREE delivery!
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.map(it => (
                      <div key={it.id} className="flex gap-3 items-center mb-4 p-3 bg-rose-50 rounded-xl">
                        <img src={it.img} alt={it.name} className="h-16 w-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-rose-800 text-sm truncate">{it.name}</p>
                          <p className="text-amber-700 font-bold text-sm">₹{it.price} × {it.qty}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors">-</button>
                            <span className="px-1">{it.qty}</span>
                            <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors">+</button>
                            <button onClick={() => removeFromCart(it.id)} className="ml-auto text-rose-500 hover:text-rose-700 text-base">✕</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-rose-100 pt-4 space-y-3 text-sm">
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
                      <div className="flex justify-between font-bold text-lg border-t border-rose-100 pt-3">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <input 
                          value={coupon} 
                          onChange={e => setCoupon(e.target.value)} 
                          placeholder="Enter coupon" 
                          className="flex-1 border border-rose-200 rounded-lg px-3 py-2 text-sm" 
                        />
                        <button 
                          onClick={applyCoupon}
                          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-sm font-medium flex-shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button 
                          onClick={proceedPaymentMock}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all text-base"
                        >
                          Pay Now
                        </button>
                        <button className="border border-rose-400 text-rose-700 py-3 rounded-xl font-medium hover:bg-rose-50 transition-colors text-base">
                          COD
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                        <FiShield className="text-green-500 w-4 h-4" />
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