import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Package, Star, TrendingUp, Sparkles,
  ShoppingBag, ArrowRight,
  X, Eye, CheckCircle,
  Truck, RotateCcw, ShieldCheck,
  Clock, Phone, Mail,
  Heart, Users, Gift, Camera,
  Home, Calendar, MapPin, User,
  MessageCircle, ChevronLeft, ChevronRight,
  Award, ThumbsUp, Quote
} from "lucide-react";

// --------------------------- Theme Constants ---------------------------
const THEME = {
  royalRed: "#800000",
  hoverRed: "#A52A2A",
  gold: "#FFD700",
  accentOrange: "#FFA500",
  lightGold: "#FFF7E0",
  goldGradient: "linear-gradient(to right, #FFD700, #FFA500)",
  bgGradient: "linear-gradient(to bottom right, #FFF7E0, #FFE8B2, #FFD7A3)",
  darkBg: "#1a0505",
  offWhite: "#FAF9F6"
};

const WHATSAPP_NUMBER = "916201486202";

// --------------------------- Wedding Testimonials Data ---------------------------
const testimonials = [
  {
    id: 1,
    name: "Priya & Rajesh",
    wedding: "Royal Wedding, Udaipur",
    text: "Sanskaraa's premium invitations and decor made our wedding unforgettable. The attention to detail was exceptional!",
    rating: 5,
    date: "Jan 2024",
    avatar: "P"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    wedding: "Destination Wedding, Goa",
    text: "From digital invites to mandap decor - everything was perfectly coordinated. Highly recommended!",
    rating: 5,
    date: "Dec 2023",
    avatar: "A"
  },
  {
    id: 3,
    name: "The Kapoor Family",
    wedding: "Grand Reception, Delhi",
    text: "The gold foil invitations were stunning. Our guests couldn't stop complimenting them!",
    rating: 5,
    date: "Feb 2024",
    avatar: "K"
  },
  {
    id: 4,
    name: "Meera & Vikram",
    wedding: "Traditional Wedding, Chennai",
    text: "Excellent service and quality. The customization options made our wedding uniquely ours.",
    rating: 5,
    date: "Nov 2023",
    avatar: "M"
  }
];

// --------------------------- Luxury Categories ---------------------------
const luxuryCategories = [
  {
    id: 1,
    title: "Premium Invitations",
    icon: "✉️",
    count: "45+ Designs",
    color: "from-[#800000] to-[#A52A2A]",
    bgColor: "bg-[#FFF7E0]",
    description: "Gold foil, embossed & custom designs"
  },
  {
    id: 2,
    title: "Wedding Decor",
    icon: "🌸",
    count: "60+ Items",
    color: "from-[#D4AF37] to-[#FFD700]",
    bgColor: "bg-[#FFF0F0]",
    description: "Mandap, stage & venue decoration"
  },
  {
    id: 3,
    title: "Bridal Essentials",
    icon: "👰",
    count: "30+ Collections",
    color: "from-[#C2185B] to-[#E91E63]",
    bgColor: "bg-[#FFF0F5]",
    description: "Hampers, gifts & personal care"
  },
  {
    id: 4,
    title: "Digital Suite",
    icon: "💻",
    count: "25+ Templates",
    color: "from-[#1565C0] to-[#42A5F5]",
    bgColor: "bg-[#F0F8FF]",
    description: "Invites, websites & social media"
  },
  {
    id: 5,
    title: "Guest Favors",
    icon: "🎁",
    count: "50+ Options",
    color: "from-[#388E3C] to-[#4CAF50]",
    bgColor: "bg-[#F0FFF4]",
    description: "Personalized gifts & souvenirs"
  },
  {
    id: 6,
    title: "Signage & Stationery",
    icon: "🪧",
    count: "35+ Products",
    color: "from-[#5D4037] to-[#8D6E63]",
    bgColor: "bg-[#F5F5F5]",
    description: "Welcome signs, menus & more"
  }
];

// --------------------------- Toast Context ---------------------------
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id) =>
    setToasts(prev => prev.filter(toast => toast.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-xs pointer-events-none">
    <AnimatePresence>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </AnimatePresence>
  </div>
);

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration);
    return () => clearTimeout(timer);
  }, [onClose, toast.duration]);

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      className="pointer-events-auto p-3 rounded-xl shadow-xl bg-white border-l-4 border-[#800000] flex items-center gap-3 text-sm font-medium text-gray-800 min-w-[260px]"
    >
      <Sparkles size={16} className="text-[#FFD700] flex-shrink-0" />
      <span className="text-sm">{toast.message}</span>
    </motion.div>
  );
};

// --------------------------- Animated Hero Section ---------------------------
const HeroSection = () => {
  const mandalaPattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z' fill='none' stroke='%23800000' stroke-width='2'/%3E%3C/svg%3E")`;
  const floralPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50,10 Q60,40 90,50 Q60,60 50,90 Q40,60 10,50 Q40,40 50,10 Z' fill='%23800000'/%3E%3C/svg%3E")`;

  return (
    <section className="relative overflow-hidden rounded-3xl mb-10">
      {/* Mandala Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] bg-repeat bg-center"
        style={{ backgroundImage: mandalaPattern }}
      />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3]" />
      
      {/* Floral Edges */}
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-32 -translate-y-32 opacity-20">
        <div 
          className="w-full h-full bg-contain bg-no-repeat"
          style={{ backgroundImage: floralPattern }}
        />
      </div>
      
      <div className="relative z-10 px-8 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#FFD700]/50 mb-6">
            <Sparkles className="text-[#800000] w-4 h-4" />
            <span className="text-sm font-semibold text-[#800000]">Since 2010 • Trusted by 5000+ Couples</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#800000] mb-6 leading-tight">
            Curated Wedding Essentials
            <span className="block text-3xl md:text-4xl lg:text-5xl text-[#5D4037] mt-2">
              for Royal Celebrations
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover premium decor, invitations & wedding gifting – meticulously crafted for your special day
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 group"
            >
              Explore Essentials
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#800000] rounded-full font-bold text-lg border-2 border-[#800000] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 group"
            >
              <Phone className="w-5 h-5" />
              Talk to Wedding Expert
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Gold Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
    </section>
  );
};

// --------------------------- Modern Category Slider (Bento Grid) ---------------------------
const ModernCategorySlider = ({ setSelectedCategory }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#800000]">
            Luxury Collections
          </h2>
          <p className="text-gray-600 text-sm">
            Browse our curated wedding essentials
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory('all')}
          className="hidden sm:flex items-center gap-2 text-[#800000] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#FFF7E0] transition-colors"
        >
          View All Collections
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {luxuryCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onClick={() => setSelectedCategory(category.title.split(' ')[0])}
            className="group cursor-pointer"
          >
            <div className={`${category.bgColor} rounded-2xl p-5 border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
              <div className="flex flex-col items-center text-center h-full">
                <div className={`text-3xl mb-4 transition-transform group-hover:scale-110 duration-300`}>
                  {category.icon}
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-sm mb-2">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="mt-auto">
                  <span className="text-xs font-semibold text-[#800000]">
                    {category.count}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --------------------------- Shop Products Data ---------------------------
const shopProducts = [
  {
    id: 1,
    name: "Acrylic Welcome Sign with Gold Foil",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&fit=crop",
    rating: 4.8,
    price: 4500,
    originalPrice: 6000,
    category: "Signage",
    trending: true,
    discount: 25,
    unit: "/piece",
    description: "Premium acrylic welcome sign with elegant gold foil lettering. Perfect for wedding entrances.",
    features: ["Acrylic Material", "Gold Foil Lettering", "Customizable", "Elegant Design"],
    inStock: true,
    tags: ["Wedding", "Welcome", "Premium"]
  },
  {
    id: 2,
    name: "Premium Wedding Invitation Set",
    img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&fit=crop",
    rating: 4.7,
    price: 12000,
    category: "Stationery",
    unit: "/100 sets",
    description: "Luxury wedding invitation set with intricate designs and premium paper quality.",
    features: ["Premium Paper", "Intricate Design", "Complete Set", "Free Samples"],
    inStock: true,
    tags: ["Invitation", "Stationery", "Luxury"]
  },
  {
    id: 3,
    name: "Digital Invitation Design Package",
    img: "https://images.unsplash.com/photo-1565689228803-69d705515d2f?w=800&fit=crop",
    rating: 4.9,
    price: 8000,
    category: "Digital",
    trending: true,
    discount: 15,
    description: "Complete digital invitation design package with unlimited revisions.",
    features: ["Unlimited Revisions", "Multiple Formats", "Social Media Ready", "Fast Delivery"],
    inStock: true,
    tags: ["Digital", "Invitation", "Modern"]
  },
  {
    id: 4,
    name: "Custom Wedding Favor Tags",
    img: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&fit=crop",
    rating: 4.6,
    price: 1800,
    originalPrice: 2500,
    category: "Favors",
    unit: "/100 pcs",
    discount: 28,
    description: "Personalized wedding favor tags for your special day.",
    features: ["Customizable", "Multiple Designs", "Premium Quality", "Quick Delivery"],
    inStock: true,
    tags: ["Favors", "Custom", "Gifts"]
  },
  {
    id: 5,
    name: "Bridal Sangeet Gift Box Set",
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&fit=crop",
    rating: 4.5,
    price: 9500,
    category: "Gifts",
    trending: true,
    description: "Exclusive bridal sangeet gift box with premium items.",
    features: ["Premium Items", "Elegant Packaging", "Customizable", "Ready to Gift"],
    inStock: true,
    tags: ["Bridal", "Gift", "Premium"]
  },
  {
    id: 6,
    name: "Wedding Crew T-Shirts",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&fit=crop",
    rating: 4.4,
    price: 850,
    originalPrice: 1200,
    category: "Apparel",
    unit: "/piece",
    discount: 30,
    description: "Custom wedding crew t-shirts for the entire team.",
    features: ["Custom Design", "Multiple Sizes", "Quick Delivery", "Premium Fabric"],
    inStock: true,
    tags: ["Apparel", "Custom", "Crew"]
  },
  {
    id: 7,
    name: "Personalized Water Bottles",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&fit=crop",
    rating: 4.3,
    price: 350,
    category: "Essentials",
    unit: "/piece",
    description: "Personalized water bottles for wedding guests.",
    features: ["Customizable", "Eco-friendly", "Multiple Colors", "Bulk Discount"],
    inStock: true,
    tags: ["Essentials", "Eco-friendly", "Guests"]
  },
  {
    id: 8,
    name: "Royal Gold Foil Invitations",
    img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&fit=crop",
    rating: 4.7,
    price: 15000,
    originalPrice: 20000,
    category: "Premium Cards",
    trending: true,
    discount: 25,
    unit: "/50 sets",
    description: "Royal gold foil wedding invitations with premium packaging.",
    features: ["Gold Foil", "Premium Paper", "Elegant Box", "Free Envelopes"],
    inStock: true,
    tags: ["Premium", "Invitation", "Luxury"]
  },
  {
    id: 9,
    name: "Mandap Decoration Kit",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&fit=crop",
    rating: 4.8,
    price: 25000,
    category: "Decor",
    trending: true,
    description: "Complete mandap decoration kit with flowers and lights.",
    features: ["Complete Kit", "Easy Setup", "Premium Quality", "Reusable"],
    inStock: true,
    tags: ["Mandap", "Decor", "Premium"]
  },
  {
    id: 10,
    name: "Bridal Mehndi Kit",
    img: "https://images.unsplash.com/photo-1618517351616-38d9dd3b1c67?w=800&fit=crop",
    rating: 4.6,
    price: 2800,
    originalPrice: 3500,
    category: "Beauty",
    discount: 20,
    description: "Premium bridal mehndi kit with natural ingredients.",
    features: ["Natural Ingredients", "Complete Set", "Long-lasting", "Easy Application"],
    inStock: true,
    tags: ["Bridal", "Mehndi", "Beauty"]
  },
  {
    id: 11,
    name: "Wedding Photo Frame Set",
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&fit=crop",
    rating: 4.5,
    price: 3200,
    category: "Memories",
    unit: "/set of 3",
    description: "Elegant photo frame set for wedding memories.",
    features: ["3 Frame Set", "Premium Quality", "Elegant Design", "Ready to Use"],
    inStock: true,
    tags: ["Photo", "Memories", "Home Decor"]
  },
  {
    id: 12,
    name: "Personalized Champagne Glasses",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop",
    rating: 4.7,
    price: 2200,
    originalPrice: 3000,
    category: "Tableware",
    discount: 27,
    unit: "/pair",
    description: "Personalized champagne glasses for the bride and groom.",
    features: ["Customizable", "Crystal Clear", "Elegant Design", "Gift Box"],
    inStock: true,
    tags: ["Champagne", "Personalized", "Tableware"]
  }
];

// --------------------------- Shop Categories ---------------------------
const shopCategories = [
  { key: 'all', label: 'All Products', count: shopProducts.length },
  { key: 'Signage', label: 'Signage', count: shopProducts.filter(p => p.category === 'Signage').length },
  { key: 'Stationery', label: 'Stationery', count: shopProducts.filter(p => p.category === 'Stationery').length },
  { key: 'Digital', label: 'Digital', count: shopProducts.filter(p => p.category === 'Digital').length },
  { key: 'Favors', label: 'Favors', count: shopProducts.filter(p => p.category === 'Favors').length },
  { key: 'Gifts', label: 'Gifts', count: shopProducts.filter(p => p.category === 'Gifts').length },
  { key: 'Apparel', label: 'Apparel', count: shopProducts.filter(p => p.category === 'Apparel').length },
  { key: 'Essentials', label: 'Essentials', count: shopProducts.filter(p => p.category === 'Essentials').length },
  { key: 'Premium Cards', label: 'Premium Cards', count: shopProducts.filter(p => p.category === 'Premium Cards').length },
  { key: 'Decor', label: 'Decor', count: shopProducts.filter(p => p.category === 'Decor').length },
  { key: 'Beauty', label: 'Beauty', count: shopProducts.filter(p => p.category === 'Beauty').length },
  { key: 'Memories', label: 'Memories', count: shopProducts.filter(p => p.category === 'Memories').length },
  { key: 'Tableware', label: 'Tableware', count: shopProducts.filter(p => p.category === 'Tableware').length },
];

// --------------------------- Testimonials Slider ---------------------------
const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#800000]">
            Stories of Joy
          </h2>
          <p className="text-gray-600 text-sm">
            What couples say about their Sanskaraa experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === currentSlide % testimonials.length ? 1 : 0.7,
                y: 0,
                scale: index === currentSlide % testimonials.length ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#800000] to-[#A52A2A] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.wedding}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFD700] fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <Quote className="w-8 h-8 text-[#FFD700] mb-3" />
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="text-sm text-gray-500">{testimonial.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --------------------------- WhatsApp Quick Chat Button ---------------------------
const WhatsAppQuickChat = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#FFD700] animate-ping opacity-50" />
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#800000] text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Quick Chat
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#800000] rotate-45" />
      </div>
    </motion.a>
  );
};

// --------------------------- Shop Header ---------------------------
const ShopHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-[#800000] to-[#A52A2A] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <ShoppingBag className="text-white w-6 h-6" />
              </motion.div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#800000]">
                  Sanskaraa — Wedding Essentials
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Premium decor, invitations & wedding gifting – all in one place
                </p>
              </div>
            </div>

            {/* Help / WhatsApp CTA */}
            <div className="hidden sm:flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck size={16} className="text-green-600" />
                <span>Verified Premium Partners</span>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Phone size={16} />
                Talk to Wedding Expert
              </motion.a>
            </div>
          </div>

          {/* Search & trust row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Search bar with micro-interaction */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                type="text"
                placeholder="Search by product, category or keyword..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-600 justify-between">
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Truck size={16} className="text-green-600" />
                <span>Pan-India Delivery</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <RotateCcw size={16} className="text-purple-600" />
                <span>Customisation</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Clock size={16} className="text-blue-600" />
                <span>30 mins Response</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// --------------------------- Category Filter ---------------------------
const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif font-semibold text-gray-700">Browse by Category</h3>
        <button
          onClick={() => setSelectedCategory('all')}
          className="text-xs text-[#800000] hover:underline"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {shopCategories.map((cat) => (
          <motion.button
            key={cat.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
              selectedCategory === cat.key
                ? 'bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">{cat.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.key
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {cat.count}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// --------------------------- Product Card with Upgrades ---------------------------
const ProductCard = ({ product, index, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  // Skeleton shimmer effect
  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm h-full">
        <div className="relative pt-[80%] bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-shimmer" />
        </div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{
        y: -8,
        rotateX: 2,
        transition: { type: "spring", stiffness: 320, damping: 24 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Hover Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/25 via-[#FFA500]/10 to-[#FFD700]/25 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

      {/* Card Container with Gold Border on Hover */}
      <div className={`relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 h-full flex flex-col ${
        isHovered ? 'border-[#FFD700] shadow-2xl' : 'border-gray-100 shadow-sm'
      }`}>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.trending && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wide"
            >
              <TrendingUp size={11} />
              <span>Trending</span>
            </motion.div>
          )}
          {product.discount && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-[#FFF7E0] text-[#800000] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-[#FFD700]/50"
            >
              Save {product.discount}%
            </motion.div>
          )}
        </div>

        {/* Image with Gold Border Glow */}
        <div
          className="relative pt-[80%] overflow-hidden bg-gray-100"
          onClick={() => onQuickView(product)}
        >
          <img
            src={product.img}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 transition-all duration-300 ${
            isHovered ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent' : 'bg-gradient-to-t from-black/25 via-transparent to-transparent'
          }`} />

          {/* Quick View overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white text-xs font-semibold bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5"
            >
              <Eye size={14} />
              View details & enquire
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-[#FFF7E0] text-[#800000] text-[11px] font-semibold px-2 py-1 rounded-full border border-[#FFD700]/30">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-[#FFD700] fill-current" />
              <span className="text-xs font-semibold text-gray-700">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Serif Font for Title */}
          <h3
            className="font-serif font-semibold text-gray-900 text-base mb-1.5 line-clamp-2 hover:text-[#800000] transition-colors"
            onClick={() => onQuickView(product)}
          >
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-auto pt-2 border-t border-gray-100 mb-3">
            <div className="flex items-baseline gap-2">
              <div>
                {product.originalPrice && (
                  <p className="text-[11px] text-gray-400 line-through mb-0.5">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-[#800000]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.unit && (
                    <span className="text-[11px] text-gray-500">
                      {product.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA with Ripple Effect */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onQuickView(product)}
            className="relative w-full py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white hover:shadow-xl hover:shadow-[#800000]/30 transition-all flex items-center justify-center gap-1.5 overflow-hidden group/button"
          >
            {/* Ripple Animation */}
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300" />
            <CheckCircle size={14} />
            <span className="relative z-10">Enquire / Book Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------- Quick View Modal (Cinematic Upgrade) ---------------------------
const QuickViewModal = ({ product, onClose }) => {
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    eventType: "",
    date: "",
    notes: ""
  });

  const steps = ["Details", "Event", "Contact"];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.eventType) {
      addToast("Please fill name, phone & event type to proceed.", "error");
      return;
    }

    const message = `
*Sanskaraa — New Wedding Enquiry* 💍

*Product Details:*
• ${product.name}
• Category: ${product.category}
• Price: ₹${product.price.toLocaleString()}${product.unit ? ` ${product.unit}` : ""}
• Quantity: ${quantity}

*Event Details:*
• Event Type: ${form.eventType || "-"}
• Preferred Date: ${form.date || "-"}
• City: ${form.city || "-"}

*Customer Details:*
• Name: ${form.name}
• Phone: ${form.phone}

*Notes / Customisation:*
${form.notes || "-"}

Please share package options & availability for this enquiry.
    `.trim();

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, "_blank");
    addToast("Opening WhatsApp to send your enquiry ✨", "success");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden mx-2 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#800000] to-[#A52A2A] flex items-center justify-center border border-[#FFD700]"
              >
                <ShoppingBag size={22} className="text-white" />
              </motion.div>
              <div>
                <h2 className="font-serif text-lg md:text-xl font-bold text-[#800000]">
                  Enquire / Book — {product.name}
                </h2>
                <p className="text-xs md:text-sm text-gray-600">
                  Share your details and we'll confirm pricing & availability
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Stepper */}
          <div className="px-5 pt-4 border-b border-gray-100">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`flex flex-col items-center ${index <= activeStep ? 'text-[#800000]' : 'text-gray-400'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                      index <= activeStep 
                        ? 'bg-[#800000] text-white' 
                        : 'bg-gray-200'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-xs font-medium">{step}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${index < activeStep ? 'bg-[#800000]' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 md:p-7">
              {/* Left: Product Preview with Gold Border */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3] border-4 border-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-1">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FFF7E0] text-[#800000] text-xs font-semibold border border-[#FFD700]/60">
                      {product.category}
                    </span>
                    {product.trending && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white text-xs font-semibold flex items-center gap-1.5">
                        <TrendingUp size={13} />
                        Popular Choice
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <p className="font-serif text-2xl font-bold text-[#800000]">
                      ₹{product.price.toLocaleString()}
                      {product.unit && (
                        <span className="text-xs text-gray-500 ml-1">
                          {product.unit}
                        </span>
                      )}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && (
                    <div>
                      <h3 className="font-serif font-semibold text-gray-900 text-sm mb-2">
                        Highlights
                      </h3>
                      <div className="space-y-1.5">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Form with Vertical Divider */}
              <div className="relative">
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent -translate-x-3" />
                
                <div className="space-y-5">
                  {/* Quantity */}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-semibold text-gray-900 text-sm">
                        Quantity / Units
                      </h4>
                      <p className="text-xs text-gray-600">
                        Adjust as per your requirement
                      </p>
                    </div>
                    <div className="flex items-center bg-white rounded-lg border border-gray-300">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-lg font-semibold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Step 1: Event Details */}
                  {activeStep >= 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <h4 className="font-serif font-semibold text-gray-900 text-sm">
                        Event Details
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Event Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={form.eventType}
                            onChange={(e) => handleChange("eventType", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
                          >
                            <option value="">Select</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Sangeet / Mehndi">Sangeet / Mehndi</option>
                            <option value="Reception">Reception</option>
                            <option value="Puja / Ritual">Puja / Ritual</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Preferred Event Date
                          </label>
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          City / Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Mumbai, Pune, Delhi..."
                          value={form.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Customer Details */}
                  {activeStep >= 1 && (
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <h4 className="font-serif font-semibold text-gray-900 text-sm">
                        Your Details
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="relative">
                            <input
                              className="peer px-3 pt-5 pb-2 w-full border border-gray-300 rounded-lg focus:ring-[#800000] focus:border-[#800000] outline-none text-sm"
                              placeholder=" "
                              value={form.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#800000]">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <input
                              type="tel"
                              className="peer px-3 pt-5 pb-2 w-full border border-gray-300 rounded-lg focus:ring-[#800000] focus:border-[#800000] outline-none text-sm"
                              placeholder=" "
                              value={form.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#800000]">
                              WhatsApp Number <span className="text-red-500">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Customisation Notes
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Share theme, colours, quantity details or any special requirements..."
                          value={form.notes}
                          onChange={(e) => handleChange("notes", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-gray-100 p-4 md:p-5 bg-white sticky bottom-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-xs text-gray-500">
                Your enquiry will be sent to Sanskaraa team on WhatsApp.
              </div>
              <div className="flex gap-2 justify-end">
                {activeStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#800000] to-[#A52A2A] text-sm font-semibold text-white hover:shadow-lg transition-shadow"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] text-sm font-semibold text-white flex items-center gap-2 hover:shadow-lg transition-shadow"
                  >
                    <Phone size={16} />
                    Send Enquiry on WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --------------------------- Featured Products ---------------------------
const FeaturedProducts = ({ onQuickView }) => {
  const featuredProducts = shopProducts.filter(p => p.trending).slice(0, 4);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#800000]">
            Featured Wedding Essentials
          </h2>
          <p className="text-gray-600 text-sm">
            Handpicked pieces couples love the most
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[#800000] text-sm font-medium cursor-default">
          <Sparkles size={16} />
          <span>Curated for premium weddings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};

// --------------------------- Product Grid ---------------------------
const ProductGrid = ({ products, onQuickView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

// --------------------------- Newsletter ---------------------------
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useToast();
  const mandalaPattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z' fill='none' stroke='%23800000' stroke-width='2'/%3E%3C/svg%3E")`;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter your email address", "error");
      return;
    }
    addToast("Thank you! We'll share our latest wedding ideas with you.", "success");
    setEmail("");
  };

  return (
    <section className="mt-14 mb-10">
      <div className="bg-gradient-to-r from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] rounded-3xl p-8 md:p-10 text-center relative overflow-hidden border border-[#FFD700]/40">
        {/* Mandala Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] bg-repeat bg-center"
          style={{ backgroundImage: mandalaPattern }}
        />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#800000] mb-2">
            Get Wedding Inspiration & Offers
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-5">
            Subscribe to receive curated ideas, decor trends & exclusive Sanskaraa perks.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#800000] text-sm bg-white/90"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white rounded-full font-semibold hover:shadow-lg transition-shadow text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --------------------------- Footer ---------------------------
const ShopFooter = () => {
  return (
    <footer className="bg-[#1a0505] text-white pt-10 pb-7 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#800000] to-[#A52A2A] rounded-full flex items-center justify-center">
                <ShoppingBag className="text-[#FFD700] w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Sanskaraa Shop
                </h3>
                <p className="text-[#FFD700] text-xs">
                  Wedding Essentials & Services
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              From invites to decor & gifting – we help you curate a beautiful,
              culturally rich wedding experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-base mb-3 text-[#FFD700]">
              Discover
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>Wedding Invitations</li>
              <li>Decor & Mandap Essentials</li>
              <li>Bridal Hampers & Gifts</li>
              <li>Digital Designs</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif font-bold text-base mb-3 text-[#FFD700]">
              Help & Support
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>How Booking Works</li>
              <li>Customisation Support</li>
              <li>Vendor Partnership</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-base mb-3 text-[#FFD700]">
              Contact
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-xs">WhatsApp / Call</p>
                  <p className="text-gray-300 text-sm">+91 {WHATSAPP_NUMBER}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-xs">Email</p>
                  <p className="text-gray-300 text-sm">shop@sanskaraa.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#FFD700] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-xs">Timings</p>
                  <p className="text-gray-300 text-sm">Mon–Sun: 9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="border-t border-white/10 mt-7 pt-4 text-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Sanskaraa. All rights reserved.
          </p>
          <p className="text-gray-500 text-[11px] mt-1">
            Crafted with love for meaningful, culturally rooted celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --------------------------- Main App ---------------------------
export default function SanskaraaShopApp() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const mandalaPattern = `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100,20 C130,20 180,30 180,100 C180,170 130,180 100,180 C70,180 20,170 20,100 C20,30 70,20 100,20 Z' fill='none' stroke='%23800000' stroke-width='3'/%3E%3C/svg%3E")`;

  // filtered products
  const filteredProducts = useMemo(() => {
    return shopProducts.filter(product => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#FFF7E0]/30 to-white font-sans relative">
        {/* Mandala Background Overlays */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
            <div 
              className="w-full h-full bg-contain bg-no-repeat"
              style={{ backgroundImage: mandalaPattern }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.03]">
            <div 
              className="w-full h-full bg-contain bg-no-repeat"
              style={{ backgroundImage: mandalaPattern }}
            />
          </div>
        </div>

        <ShopHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="max-w-7xl mx-auto px-4 py-6 pb-10 relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* Modern Category Slider */}
          <ModernCategorySlider setSelectedCategory={setSelectedCategory} />

          {/* Featured Products */}
          <FeaturedProducts onQuickView={setCurrentProduct} />

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Testimonials Slider */}
          <TestimonialsSlider />

          {/* Products Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
              {selectedCategory !== "all" && (
                <>
                  {" "}in <span className="font-semibold">{selectedCategory}</span>
                </>
              )}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              onQuickView={setCurrentProduct}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#FFD700]/40">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFF7E0] to-[#FFE8B2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-[#800000]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-5 text-sm">
                Try changing category or search keyword. You can also directly contact us on WhatsApp for custom requirements.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white rounded-full text-sm font-semibold hover:shadow-lg transition-shadow"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Newsletter */}
          <Newsletter />
        </main>

        {/* Footer */}
        <ShopFooter />

        {/* WhatsApp Quick Chat Button */}
        <WhatsAppQuickChat />

        {/* QuickView / Enquiry Modal */}
        <AnimatePresence>
          {currentProduct && (
            <QuickViewModal
              product={currentProduct}
              onClose={() => setCurrentProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}