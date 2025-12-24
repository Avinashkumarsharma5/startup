import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Phone,
  Calendar,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin,
  Filter,
  Heart,
  MessageCircle,
  Bot,
  User,
  Camera,
  Music,
  UtensilsCrossed,
  X,
  ChevronRight
} from "lucide-react";

/* ================= DATA ================= */

const categories = [
  { 
    id: "all", 
    title: "All Events", 
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: "Wedding", 
    title: "Wedding", 
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: "Social", 
    title: "Birthday", 
    img: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: "Personal", 
    title: "Anniversary", 
    img: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: "Traditional", 
    title: "Puja", 
    img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=200&auto=format&fit=crop" 
  },
  { 
    id: "Corporate", 
    title: "Corporate", 
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=200&auto=format&fit=crop" 
  },
];

const events = [
  // ================= WEDDING =================
  {
    id: 1,
    title: "Royal Wedding Ceremony",
    desc: "Complete wedding planning with decor, catering, photography & rituals.",
    video: "https://cdn.coverr.co/videos/coverr-wedding-couple-hugging-5254/1080p.mp4",
    category: "Wedding",
    price: "₹1,50,000",
    rating: 4.9,
    reviews: 124,
    features: ["Decor", "Catering", "Photography"]
  },
  {
    id: 2,
    title: "Destination Wedding",
    desc: "Luxury destination wedding planning with stay & travel.",
    video: "https://cdn.coverr.co/videos/coverr-beach-wedding-5274/1080p.mp4",
    category: "Wedding",
    price: "₹5,00,000",
    rating: 4.8,
    reviews: 78,
    features: ["Resort", "Decor", "Logistics"]
  },
  {
    id: 3,
    title: "Pre-Wedding Shoot",
    desc: "Cinematic pre-wedding photos & reels.",
    video: "https://cdn.coverr.co/videos/coverr-couple-walking-1562/1080p.mp4",
    category: "Wedding",
    price: "₹25,000",
    rating: 4.7,
    reviews: 92,
    features: ["Photo", "Video", "Drone"]
  },

  // ================= SOCIAL EVENTS =================
  {
    id: 4,
    title: "Grand Birthday Bash",
    desc: "Theme decoration, cake, music & games.",
    video: "https://cdn.coverr.co/videos/coverr-birthday-candles-4509/1080p.mp4",
    category: "Social",
    price: "₹25,000",
    rating: 4.7,
    reviews: 85,
    features: ["Theme", "Cake", "Music"]
  },
  {
    id: 5,
    title: "Kids Birthday Party",
    desc: "Cartoons, magic show, balloons & fun games.",
    video: "https://cdn.coverr.co/videos/coverr-kids-party-6789/1080p.mp4",
    category: "Social",
    price: "₹15,000",
    rating: 4.8,
    reviews: 110,
    features: ["Games", "Magic", "Decor"]
  },
  {
    id: 6,
    title: "Bachelor / Bachelorette Party",
    desc: "DJ night, private venue & premium experience.",
    video: "https://cdn.coverr.co/videos/coverr-party-night-8891/1080p.mp4",
    category: "Social",
    price: "₹40,000",
    rating: 4.6,
    reviews: 66,
    features: ["DJ", "Drinks", "Lighting"]
  },

  // ================= PERSONAL =================
  {
    id: 7,
    title: "Anniversary Celebration",
    desc: "Romantic decor, dinner & music.",
    video: "https://cdn.coverr.co/videos/coverr-cheers-with-wine-glasses-5374/1080p.mp4",
    category: "Personal",
    price: "₹45,000",
    rating: 4.8,
    reviews: 56,
    features: ["Decor", "Dinner", "Music"]
  },
  {
    id: 8,
    title: "House Party",
    desc: "Home decor, catering & music setup.",
    video: "https://cdn.coverr.co/videos/coverr-home-party-3344/1080p.mp4",
    category: "Personal",
    price: "₹20,000",
    rating: 4.6,
    reviews: 49,
    features: ["Decor", "Food", "Sound"]
  },

  // ================= TRADITIONAL / PUJA =================
  {
    id: 9,
    title: "Griha Pravesh Puja",
    desc: "Complete puja with pandit ji & samagri.",
    video: "https://cdn.coverr.co/videos/coverr-hands-praying-5388/1080p.mp4",
    category: "Traditional",
    price: "₹15,000",
    rating: 5.0,
    reviews: 210,
    features: ["Pandit", "Samagri", "Prasad"]
  },
  {
    id: 10,
    title: "Satyanarayan Katha",
    desc: "Traditional Satyanarayan puja at home.",
    video: "https://cdn.coverr.co/videos/coverr-prayer-lamps-1123/1080p.mp4",
    category: "Traditional",
    price: "₹8,000",
    rating: 4.9,
    reviews: 160,
    features: ["Pandit", "Katha", "Prasad"]
  },
  {
    id: 11,
    title: "Mundan / Naamkaran",
    desc: "Child naming & mundan ceremony.",
    video: "https://cdn.coverr.co/videos/coverr-indian-ceremony-5544/1080p.mp4",
    category: "Traditional",
    price: "₹10,000",
    rating: 4.8,
    reviews: 95,
    features: ["Pandit", "Rituals", "Decor"]
  },
  {
    id: 12,
    title: "Shraddh / Pind Daan",
    desc: "Complete memorial rituals with guidance.",
    video: "https://cdn.coverr.co/videos/coverr-temple-prayer-3312/1080p.mp4",
    category: "Traditional",
    price: "₹12,000",
    rating: 4.9,
    reviews: 88,
    features: ["Pandit", "Rituals", "Samagri"]
  },

  // ================= CORPORATE =================
  {
    id: 13,
    title: "Corporate Meeting",
    desc: "Professional meeting setup with AV.",
    video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4627/1080p.mp4",
    category: "Corporate",
    price: "₹80,000",
    rating: 4.6,
    reviews: 42,
    features: ["AV", "Seating", "Lunch"]
  },
  {
    id: 14,
    title: "Product Launch",
    desc: "Stage, branding & media coverage.",
    video: "https://cdn.coverr.co/videos/coverr-product-launch-9991/1080p.mp4",
    category: "Corporate",
    price: "₹1,20,000",
    rating: 4.7,
    reviews: 38,
    features: ["Stage", "Branding", "Media"]
  },
  {
    id: 15,
    title: "Annual Day / Conference",
    desc: "Large scale corporate event management.",
    video: "https://cdn.coverr.co/videos/coverr-conference-hall-2233/1080p.mp4",
    category: "Corporate",
    price: "₹2,00,000",
    rating: 4.8,
    reviews: 54,
    features: ["Stage", "AV", "Catering"]
  },

  // ================= CULTURAL / ENTERTAINMENT =================
  {
    id: 16,
    title: "Live Sangeet Concert",
    desc: "Stage, lighting & artist management.",
    video: "https://cdn.coverr.co/videos/coverr-guitar-player-at-concert-5525/1080p.mp4",
    category: "Social",
    price: "₹60,000",
    rating: 4.7,
    reviews: 98,
    features: ["Stage", "Sound", "Lighting"]
  },
  {
    id: 17,
    title: "Garba / Navratri Night",
    desc: "Traditional garba setup with live music.",
    video: "https://cdn.coverr.co/videos/coverr-garba-night-7766/1080p.mp4",
    category: "Social",
    price: "₹50,000",
    rating: 4.8,
    reviews: 120,
    features: ["Stage", "Decor", "Music"]
  }
];


const testimonials = [
  { id: 1, name: "Anjali Sharma", event: "Wedding", text: "Sanskaraa made my dream wedding a reality! Highly recommended.", rating: 5 },
  { id: 2, name: "Rahul Verma", event: "Corporate", text: "Professional execution and transparent pricing.", rating: 5 },
  { id: 3, name: "Priya Singh", event: "Birthday", text: "The decor was exactly what we wanted. Great team!", rating: 4 },
];

/* ================= COMPONENT ================= */

const EventManagement = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Smart Filtering Logic
  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF2] font-body relative overflow-x-hidden pb-20 mt-12">
      
      

      <div className="p-4 md:p-6 max-w-7xl mx-auto mt-12">

        {/* ================= 1️⃣ CATEGORIES (AB SABSE UPAR) ================= */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-serif text-[#7A1A1A] font-bold">Explore Categories</h2>
            <span className="text-xs text-[#B23A48] font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center min-w-[85px] cursor-pointer group"
              >
                {/* Image Container with Gradient Ring */}
                <div className={`
                  relative p-[3px] rounded-full transition-transform duration-300 mt-8
                  ${activeCategory === cat.id 
                    ? 'bg-gradient-to-tr from-[#E8C871] via-[#FFD700] to-[#7A1A1A] scale-110' 
                    : 'bg-transparent border-2 border-transparent group-hover:border-[#E8C871]/50'}
                `}>
                  <div className="w-20 h-20 rounded-full border-[3px] border-white overflow-hidden shadow-sm relative bg-gray-100">
                    <img 
                      src={cat.img} 
                      alt={cat.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Dark Overlay on Inactive */}
                    {activeCategory !== cat.id && activeCategory !== "all" && (
                       <div className="absolute inset-0 bg-white/30 transition-opacity"></div>
                    )}
                  </div>
                </div>
                
                {/* Label */}
                <p className={`
                  mt-3 text-sm tracking-wide transition-all duration-300
                  ${activeCategory === cat.id ? 'text-[#7A1A1A] font-extrabold scale-105' : 'text-gray-600 font-medium group-hover:text-[#7A1A1A]'}
                `}>
                  {cat.title}
                </p>
                
                {/* Active Dot Indicator */}
                {activeCategory === cat.id && (
                  <motion.div layoutId="activeDot" className="mt-1 w-1.5 h-1.5 bg-[#7A1A1A] rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= 2️⃣ SEARCH + FILTER ================= */}
        <div className="mb-10 relative z-30">
          <div className="flex items-center bg-white border border-[#E8C871]/50 rounded-2xl px-4 py-4 shadow-lg shadow-[#E8C871]/10 focus-within:ring-2 focus-within:ring-[#7A1A1A]/20 transition-all">
            <Search className="text-[#7A1A1A] mr-3" />
            <input
              type="text"
              placeholder="Search events (e.g., Wedding, Puja)..."
              className="bg-transparent outline-none w-full text-[#7A1A1A] font-medium placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-[#FFF6EB] p-2 rounded-lg text-[#7A1A1A] hover:bg-[#E8C871]/30 transition ml-2"
            >
              <Filter size={20} />
            </button>
          </div>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8C871]/30 p-4 grid grid-cols-2 md:grid-cols-4 gap-3 z-30"
              >
                 {['Location', 'Date', 'Budget', 'Top Rated'].map((filter) => (
                   <div key={filter} className="bg-gray-50 p-2 rounded-lg text-sm text-gray-600 flex items-center justify-between cursor-pointer hover:bg-gray-100 border border-gray-100">
                     {filter} <ChevronRight size={14}/>
                   </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= 3️⃣ HERO BANNER (NICHE - BEFORE GRID) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_80px_rgba(122,26,26,0.35)] bg-gradient-to-br from-[#7A1A1A] via-[#8f2323] to-[#5e1212] mb-12"
        >
          {/* 🎨 Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />

          {/* ✨ Floating Golden Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E8C871] rounded-full blur-[140px] opacity-30" />
          <div className="absolute bottom-0 -left-24 w-72 h-72 bg-[#B23A48] rounded-full blur-[120px] opacity-30" />

          <div className="relative z-10 max-w-3xl">
            {/* 🕉 Tag */}
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-[#E8C871] text-xs tracking-widest uppercase backdrop-blur">
              Sanskaraa • Event Excellence
            </span>

            {/* 🖋 Headline */}
            <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-wide text-white mb-6">
              Create Memories,
              <br />
              <span className="bg-gradient-to-r from-[#FFD95A] to-[#E8C871] bg-clip-text text-transparent drop-shadow">
                Celebrate Traditions.
              </span>
            </h1>

            {/* 📜 Description */}
            <p className="text-white/85 text-sm md:text-lg max-w-xl leading-relaxed mb-8">
              India’s most trusted platform for weddings, sacred rituals, and corporate
              celebrations — crafted with culture, elegance, and precision.
            </p>

            {/* 🎯 CTA Buttons */}
            <div className="flex flex-wrap gap-5">
              <button className="group relative flex items-center gap-2 bg-[#E8C871] text-[#7A1A1A] px-7 py-3 rounded-xl font-bold shadow-xl transition transform hover:scale-105">
                <span className="absolute inset-0 rounded-xl ring-2 ring-[#E8C871]/50 opacity-0 group-hover:opacity-100 transition"></span>
                <Sparkles size={18} /> Plan My Event
              </button>

              <button className="flex items-center gap-2 px-7 py-3 rounded-xl border border-white/25 text-white backdrop-blur hover:bg-white/10 transition font-semibold">
                <Phone size={18} /> Talk to Expert
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= 4️⃣ EVENTS GRID ================= */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-serif text-[#7A1A1A]">
            {activeCategory === 'all' ? 'Trending Events' : `${activeCategory} Events`}
          </h2>
          <div className="h-[1px] flex-grow bg-[#E8C871]/40"></div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
             <Search size={48} className="mx-auto mb-4 text-[#E8C871]"/>
             <p className="text-gray-500 font-medium">No events found matching your search.</p>
             <button onClick={() => {setActiveCategory('all'); setSearchQuery('')}} className="mt-4 text-[#7A1A1A] font-bold underline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl shadow-gray-100 overflow-hidden border border-[#E8C871]/20 group flex flex-col h-full"
              >
                {/* Video Container */}
                <div className="h-56 bg-gray-900 relative overflow-hidden">
                  <video
                    src={event.video}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Gradient Overlay for Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white hover:text-red-500 text-white transition-all">
                    <Heart size={18} />
                  </div>
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-[#E8C871] text-[#7A1A1A] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {event.category}
                    </span>
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400"/> {event.rating}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-xl font-serif text-[#7A1A1A] font-bold leading-tight mb-1">
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                     {event.features.map((feat, i) => (
                       <span key={i} className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                         {feat}
                       </span>
                     ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow">{event.desc}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Starting from</p>
                      <p className="text-lg font-bold text-[#7A1A1A]">{event.price}</p>
                    </div>
                    <button className="bg-[#7A1A1A] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-[#7A1A1A]/30 hover:bg-[#5e1212] transition-all text-sm flex items-center gap-2">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ================= 5️⃣ TESTIMONIALS ================= */}
        <div className="mb-16">
           <div className="text-center mb-10">
              <h2 className="text-2xl font-serif text-[#7A1A1A] mb-2">Families Love Us ❤️</h2>
              <p className="text-gray-500 text-sm">Real stories from real celebrations</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
             {testimonials.map(review => (
               <div key={review.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
                  <div className="absolute -top-3 left-6 bg-[#E8C871] w-8 h-8 flex items-center justify-center rounded-full text-white shadow-md">
                    <span className="font-serif text-xl">“</span>
                  </div>
                  <p className="text-gray-600 italic mb-4 mt-2 text-sm leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-3 border-t pt-4 border-gray-100">
                    <div className="w-10 h-10 bg-[#7A1A1A]/10 rounded-full flex items-center justify-center text-[#7A1A1A] font-bold text-sm">
                       {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#7A1A1A]">{review.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_,i) => <Star key={i} size={10} fill="currentColor"/>)}
                      </div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        
        

      </div>

      {/* 9️⃣ FAB (Floating Action Button) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 mb-12">
        <AnimatePresence>
          {isFabOpen && (
            <motion.div 
              initial={{opacity:0, scale: 0.8, y: 10}} 
              animate={{opacity:1, scale: 1, y: 0}} 
              exit={{opacity:0, scale: 0.8, y: 10}}
              className="flex flex-col gap-3 items-end"
            >
              <button className="flex items-center gap-3 bg-white text-[#7A1A1A] pl-4 pr-2 py-2 rounded-full shadow-xl border border-gray-100 group">
                <span className="text-sm font-semibold">Call Us</span>
                <div className="bg-[#FFF6EB] p-2 rounded-full group-hover:bg-[#E8C871] transition"><Bot size={18} /></div>
              </button>
              <button className="flex items-center gap-3 bg-white text-[#7A1A1A] pl-4 pr-2 py-2 rounded-full shadow-xl border border-gray-100 group">
                <span className="text-sm font-semibold">WhatsApp Us</span>
                <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-500 group-hover:text-white transition"><MessageCircle size={18} /></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={() => setIsFabOpen(!isFabOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-full shadow-2xl border-4 border-[#FFF6EB] transition-all duration-300 ${isFabOpen ? 'bg-gray-800 rotate-45' : 'bg-[#7A1A1A]'}`}
        >
          {isFabOpen ? <X size={24} color="white"/> : <Phone size={24} color="white" />}
        </motion.button>
      </div>

    </div>
  );
};

export default EventManagement;