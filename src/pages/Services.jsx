import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search, Package, Flower2, Star,
  MapPin, Filter, X, Heart, Phone, MessageCircle,
  TrendingUp, Gift, Sparkles, Plus,
  Award, Users, Camera, Building2, Utensils,
  Shield, PhoneCall, Music, ShoppingBag, ArrowRight,
  SlidersHorizontal, Facebook, Instagram, Twitter, Headphones, User
} from "lucide-react";

// --------------------------- Theme Constants ---------------------------
const THEME = {
  royalRed: "#7A1A1A",
  gold: "#E8C871",
  goldLight: "#F3E5AB",
  darkBg: "#1a0505",
  offWhite: "#FAF9F6"
};

// --------------------------- Toast Context ---------------------------
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(toast => toast.id !== id));
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[70] space-y-2 max-w-[90vw] sm:max-w-xs pointer-events-none">
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
      className="pointer-events-auto p-3 rounded-xl shadow-xl bg-white border-l-4 border-[#7A1A1A] flex items-center gap-3 text-sm font-medium text-gray-800"
    >
      <Sparkles size={16} className="text-[#E8C871]" />
      <span>{toast.message}</span>
    </motion.div>
  );
};

// --------------------------- FULL DATA INSERTED HERE ---------------------------
const servicesData = {
  venues: [
    { id: 1, name: "Luxury Wedding Hall", img: "https://images.unsplash.com/photo-1519677100203-0f0c8da7f8c1?w=800&fit=crop", rating: 4.9, price: 150000, reviews: 156, category: "Luxury", location: "Delhi", trending: true, description: "Grand luxury wedding hall with modern amenities.", inclusions: ["Main Hall", "Parking Space", "Dressing Rooms"] },
    { id: 2, name: "Garden Wedding Venue", img: "https://images.unsplash.com/photo-1532710093736-b822f59f9d26?w=800&fit=crop", rating: 4.7, price: 120000, reviews: 89, category: "Outdoor", location: "Mumbai", description: "Beautiful outdoor garden venue perfect for daytime weddings.", inclusions: ["Garden Area", "Seating", "Decoration"] },
  ],
  decorations: [
    { id: 3, name: "Traditional Mandap Decoration", img: "https://images.unsplash.com/photo-1581600140688-8de6c0d59f8c?w=800&fit=crop", rating: 4.7, price: 25000, reviews: 128, category: "Mandap", location: "Delhi", discount: 15, trending: true },
    { id: 4, name: "Floral Stage Decoration", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&fit=crop", rating: 4.5, price: 18000, reviews: 89, category: "Floral", location: "Mumbai", trending: true },
  ],
  catering: [
    { id: 5, name: "Premium Vegetarian Catering", img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&fit=crop", rating: 4.8, price: 499, unit: "/plate", reviews: 245, category: "Vegetarian", location: "Delhi" },
    { id: 6, name: "Non-Veg Catering Service", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&fit=crop", rating: 4.7, price: 699, unit: "/plate", reviews: 178, category: "Non-Vegetarian", location: "Mumbai" },
  ],
  photography: [
    { id: 7, name: "Wedding Photography & Videography", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&fit=crop", rating: 4.8, price: 45000, reviews: 203, category: "Premium", location: "Mumbai" },
  ],
  entertainment: [
    { id: 8, name: "Live DJ & Music", img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&fit=crop", rating: 4.5, price: 25000, reviews: 89, category: "DJ", location: "Bangalore" },
    { id: 9, name: "Orchestra Band", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&fit=crop", rating: 4.6, price: 50000, reviews: 67, category: "Band", location: "Delhi" },
  ],
  artist: [
    { id: 10, name: "Professional Wedding Anchor", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&fit=crop", rating: 4.8, price: 35000, reviews: 124, category: "Anchor", location: "Delhi", trending: true },
    { id: 11, name: "Traditional Dance Group", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&fit=crop", rating: 4.7, price: 45000, reviews: 89, category: "Dance", location: "Mumbai" },
  ],
  printedItems: [
    { id: 12, name: "Welcome Board Printing", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop", rating: 4.8, price: 5000, reviews: 89, category: "Printed Items", location: "Delhi", trending: true },
    { id: 13, name: "Graphical Poster Design", img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&fit=crop", rating: 4.7, price: 3000, reviews: 67, category: "Printed Items", location: "Mumbai" },
    { id: 14, name: "Digital Wedding Cards", img: "https://images.unsplash.com/photo-1565689228803-69d705515d2f?w=800&fit=crop", rating: 4.9, price: 2000, reviews: 156, category: "Digital Items", location: "Bangalore", trending: true },
    { id: 15, name: "Wedding Tags & Batches", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop", rating: 4.6, price: 1500, unit: "/100 pcs", reviews: 45, category: "Printed Items", location: "Pune" },
    { id: 16, name: "Printed Bootics Items", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop", rating: 4.5, price: 8000, reviews: 78, category: "Printed Items", location: "Delhi" },
    { id: 17, name: "Printed T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop", rating: 4.4, price: 600, unit: "/piece", reviews: 234, category: "Printed Items", location: "Mumbai", trending: true },
    { id: 18, name: "Printed Water Bottles", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&fit=crop", rating: 4.3, price: 200, unit: "/piece", reviews: 167, category: "Printed Items", location: "Bangalore" },
    { id: 19, name: "Wedding Invitation Cards", img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop", rating: 4.7, price: 12000, unit: "/100 cards", reviews: 134, category: "Printed Items", location: "Delhi" }
  ],
  other: [
    { id: 20, name: "Wedding Planning Services", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&fit=crop", rating: 4.9, price: 100000, reviews: 203, category: "Planning", location: "Delhi", trending: true },
    { id: 21, name: "Makeup & Hairstyling", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&fit=crop", rating: 4.8, price: 25000, reviews: 178, category: "Beauty", location: "Mumbai" },
    { id: 22, name: "Mehndi Artist", img: "https://images.unsplash.com/photo-1618517351616-38d9dd3b1c67?w=800&fit=crop", rating: 4.7, price: 15000, reviews: 145, category: "Beauty", location: "Bangalore" },
    { id: 23, name: "Wedding Car Decorations", img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&fit=crop", rating: 4.5, price: 8000, reviews: 98, category: "Decoration", location: "Pune" },
  ]
};

const categories = [
  { key: "all", label: "All Services", icon: Sparkles, color: "bg-blue-600" },
  { key: "venues", label: "Venues", icon: Building2, color: "bg-red-500" },
  { key: "decorations", label: "Decorations", icon: Flower2, color: "bg-green-500" },
  { key: "catering", label: "Catering", icon: Utensils, color: "bg-orange-500" },
  { key: "photography", label: "Photography", icon: Camera, color: "bg-indigo-500" },
  { key: "entertainment", label: "Entertainment", icon: Music, color: "bg-teal-500" },
  { key: "artist", label: "Artist", icon: User, color: "bg-purple-500" },
  { key: "printedItems", label: "Printed Items", icon: Package, color: "bg-pink-500" },
  { key: "other", label: "Other Services", icon: Gift, color: "bg-yellow-500" },
];

// --------------------------- Micro-Components ---------------------------

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-100%", opacity: [0, 0.6, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          className="absolute text-[#E8C871]/30"
          style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 20 + 10}px` }}
        >
          ✿
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
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-[#E8C871] mb-1">{count}+</div>
      <div className="text-stone-300 text-xs sm:text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
    <div className="h-56 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  </div>
);

// --------------------------- Support Floating Button ---------------------------

const SupportFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 items-end mb-2">
            <motion.a
              href="https://wa.me/916201486202" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
              <span className="font-semibold text-sm">WhatsApp</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
            </motion.a>

            <motion.a
              href="tel:+916201486202"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <span className="font-semibold text-sm">Call Now</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Phone size={18} />
              </div>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${isOpen ? 'bg-stone-800' : 'bg-[#7A1A1A]'}`}
      >
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse pointer-events-none"></div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="text-white" size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="headset"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Headphones className="text-[#E8C871]" size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

// --------------------------- Components ---------------------------

const HeroSection = ({ query, setQuery, location, setLocation }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] overflow-hidden flex flex-col items-center justify-center text-center px-4">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&fit=crop" alt="Indian Wedding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAF9F6]"></div>
      </motion.div>
      
      <FloatingParticles />

      <div className="absolute top-6 left-0 w-full flex justify-center z-20">
         <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#7A1A1A]">
  <img 
    src="images/sanskaraa-logo.png" 
    alt="Sanskaraa Logo" 
    className="w-full h-full object-contain"
  />
</div>

            <span className="text-xl font-serif font-bold text-white tracking-tight">Sanskaraa</span>
         </div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-[#E8C871]/50 text-[#E8C871] text-xs font-semibold tracking-[0.2em] mb-4 uppercase">
              India's Premium Wedding Platform
          </span>
          <h1 className="text-4xl sm:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Tradition Meets <span className="text-[#E8C871] italic">Luxury</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-white p-2 rounded-[2rem] shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto"
        >
            <div className="flex items-center px-4 h-12 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-stone-100">
                <MapPin size={18} className="text-[#7A1A1A] mr-2" />
                <select 
                  className="w-full bg-transparent outline-none text-sm font-medium text-stone-700 cursor-pointer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>All Cities</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Udaipur</option>
                  <option>Bangalore</option>
                </select>
            </div>
            <div className="flex items-center px-4 h-12 w-full flex-1">
                <Search size={18} className="text-[#7A1A1A] mr-2" />
                <input 
                    type="text" 
                    placeholder="Search for venues, makeup..." 
                    className="w-full bg-transparent outline-none text-stone-700 placeholder-stone-400 text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button className="w-full sm:w-auto bg-[#7A1A1A] hover:bg-[#601010] text-white px-8 py-3 rounded-[1.5rem] font-medium transition-all shadow-lg text-sm flex items-center justify-center gap-2">
                <span>Search</span>
            </button>
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-white/80 text-xs sm:text-sm">
          <span>Popular:</span>
          {['Banquet Halls', 'Bridal Makeup', 'Pre-wedding Shoot', 'Mehndi'].map(tag => (
            <button key={tag} className="hover:text-[#E8C871] underline decoration-dotted underline-offset-4 transition-colors">{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, onBook, onToggleWishlist, isWishlisted }) => {
  return (
    <motion.div 
      layout
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-stone-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden relative h-full flex flex-col"
    >
      {service.discount && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-[#7A1A1A] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
            {service.discount}% OFF
          </div>
        </div>
      )}

      <div className="relative h-64 overflow-hidden">
        <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(service.id); }}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white transition-all z-20"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7A1A1A] text-[#7A1A1A]' : 'text-white'}`} />
        </motion.button>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white z-10">
          <div>
            <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/30 rounded text-[10px] font-medium mb-1">
              {service.category}
            </span>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-[#E8C871]" />
              <span className="text-xs text-gray-200">{service.location || 'India'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-[#E8C871] px-2 py-1 rounded-lg shadow-lg">
            <Star size={10} className="fill-white text-white" />
            <span className="text-xs font-bold text-[#7A1A1A]">{service.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-1 group-hover:text-[#7A1A1A] transition-colors">{service.name}</h3>
        <p className="text-stone-500 text-xs line-clamp-2 mb-4">{service.description || "Experience the finest traditional service for your special day."}</p>
        
        <div className="mt-auto pt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Starting From</p>
            <p className="text-xl font-bold text-[#7A1A1A]">₹{service.price.toLocaleString()}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(service)}
            className="bg-[#7A1A1A] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg shadow-[#7A1A1A]/30 hover:bg-[#902020] transition-colors"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ onSortChange }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs font-medium hover:border-[#7A1A1A] hover:text-[#7A1A1A] transition-colors whitespace-nowrap">
          <Filter size={14} /> Filter
        </button>
        <button className="px-4 py-2 border border-stone-200 rounded-full text-xs text-stone-600 whitespace-nowrap">Price Range</button>
        <button className="px-4 py-2 border border-stone-200 rounded-full text-xs text-stone-600 whitespace-nowrap">Location</button>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <SlidersHorizontal size={14} className="text-stone-400" />
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-transparent text-xs font-medium text-stone-700 outline-none cursor-pointer"
        >
          <option value="rating">Sort by: Rating</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="trending">Trending First</option>
        </select>
      </div>
    </div>
  );
};

// --------------------------- Main App ---------------------------

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Cities");
  const [wishlist, setWishlist] = useState(new Set());
  const [sortOption, setSortOption] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);

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
        // Exclude printedItems from the main grid because they have their own section
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

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FAF9F6] font-sans text-stone-900 selection:bg-[#E8C871] selection:text-[#7A1A1A] mt-12">
        
        {/* Support Floating Button */}
        <SupportFloatingButton />

        {/* Hero Section */}
        <HeroSection 
            query={query} 
            setQuery={setQuery} 
            location={location}
            setLocation={setLocation}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 pb-20">
            
            {/* Categories Carousel */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-16 border border-stone-100">
                <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.key;
                        return (
                            <button 
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className="group flex flex-col items-center gap-3 min-w-[70px]"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative ${isActive ? 'bg-[#7A1A1A] text-[#E8C871] shadow-lg scale-110' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}>
                                    <Icon size={24} strokeWidth={1.5} />
                                    {isActive && <motion.div layoutId="glow" className="absolute inset-0 rounded-full border-2 border-[#E8C871] animate-ping opacity-20" />}
                                </div>
                                <span className={`text-xs font-semibold tracking-wide ${isActive ? 'text-[#7A1A1A]' : 'text-stone-500'}`}>{cat.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Sanskaraa Shop (Selling Items) */}
            {(activeCategory === 'all' || activeCategory === 'printedItems') && (
              <section className="mb-20">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-[#7A1A1A] flex items-center gap-3">
                        Sanskaraa Shop <span className="bg-[#E8C871] text-[#7A1A1A] text-[10px] px-2 py-1 rounded font-sans font-bold tracking-widest uppercase">New</span>
                      </h2>
                      <p className="text-stone-500 mt-1">Exclusive wedding essentials delivered to your doorstep</p>
                    </div>
                    <button className="hidden sm:flex items-center gap-2 text-[#7A1A1A] font-semibold hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none sm:hidden"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none sm:hidden"></div>

                    <div className="flex gap-5 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                        {servicesData.printedItems.map(item => (
                            <motion.div whileHover={{ y: -5 }} key={item.id} className="min-w-[180px] sm:min-w-[240px] bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer group border border-stone-100">
                                <div className="h-40 sm:h-48 rounded-2xl bg-stone-100 overflow-hidden mb-4 relative">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                    {item.trending && <div className="absolute top-2 left-2 bg-[#7A1A1A]/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">HOT</div>}
                                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#7A1A1A] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                      <Plus size={16} />
                                    </button>
                                </div>
                                <h4 className="font-serif font-bold text-stone-800 text-lg leading-tight mb-1">{item.name}</h4>
                                <div className="flex justify-between items-center">
                                    <p className="text-[#7A1A1A] font-bold">₹{item.price}</p>
                                    <div className="flex items-center gap-1 text-xs text-stone-400">
                                        <Star size={12} className="fill-[#E8C871] text-[#E8C871]" /> {item.rating}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="min-w-[150px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#E8C871] rounded-3xl cursor-pointer hover:bg-[#fff9e6] transition-colors gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-[#E8C871]/20 flex items-center justify-center text-[#7A1A1A] group-hover:scale-110 transition-transform">
                              <ArrowRight size={20} />
                            </div>
                            <span className="font-serif font-bold text-[#7A1A1A]">View Shop</span>
                        </div>
                    </div>
                  </div>
              </section>
            )}

            {/* Services Grid */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#7A1A1A] mb-2">
                      {activeCategory === 'all' ? "Recommended Services" : `${categories.find(c => c.key === activeCategory)?.label}`}
                    </h2>
                    <p className="text-stone-500">Handpicked vendors verified for quality</p>
                  </div>
                </div>

                <FilterBar onSortChange={setSortOption} />
                
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
                  </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {filteredServices.map(service => (
                            <ServiceCard 
                                key={service.id} 
                                service={service} 
                                isWishlisted={wishlist.has(service.id)}
                                onToggleWishlist={toggleWishlist}
                                onBook={(s) => console.log('Book', s.name)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-stone-200">
                          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-stone-300" />
                          </div>
                          <h3 className="text-xl font-serif font-bold text-stone-800">No services found</h3>
                          <p className="text-stone-500 mt-2">Try changing your location or filters</p>
                    </div>
                )}
            </section>

            {/* Trust Section */}
            <section className="mt-24 relative rounded-[3rem] overflow-hidden bg-[#1a0505]">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                  <svg className="relative block w-full h-12 text-[#FAF9F6]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
                  </svg>
                </div>

                <div className="relative z-10 px-6 py-20 sm:px-12 text-center sm:text-left grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                    <div className="md:col-span-1">
                      <div className="w-16 h-16 bg-[#E8C871] rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 shadow-lg shadow-[#E8C871]/20">
                        <Shield className="text-[#7A1A1A]" size={32} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-white mb-2">Why Sanskaraa?</h3>
                      <p className="text-[#E8C871] text-sm">We don't just plan events; we craft memories.</p>
                    </div>
                    
                    <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
                       <CountUp end={2500} label="Weddings Planned" />
                       <CountUp end={120} label="Verified Vendors" />
                       <CountUp end={15} label="Cities Covered" />
                    </div>
                </div>
            </section>

        </main>
        
       
      </div>
    </ToastProvider>
  );
}