// src/pages/SearchPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mic,
  X,
  Star,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Flower2,
  Lightbulb,
  Utensils,
  Tent,
  Building2,
  BookOpen,
  User,
  Package
} from "lucide-react";

/* ---------------- Mock Data ---------------- */
const searchData = {
  events: [
    { id: 1, name: "Griha Pravesh Puja", img: "/images/event1.jpg", rating: 4.6, price: 5100, reviews: 120, category: "events" },
    { id: 2, name: "Satyanarayan Katha", img: "/images/event2.jpg", rating: 4.7, price: 3500, reviews: 90, category: "events" },
  ],
  pandits: [
    { id: 3, name: "Pandit Rajesh Sharma", img: "/images/pandit1.jpg", rating: 4.9, price: 2100, reviews: 200, category: "pandits" },
  ],
  kits: [
    { id: 4, name: "Satyanarayan Puja Kit", img: "/images/kit1.jpg", rating: 4.5, price: 1500, reviews: 140, category: "kits" },
  ],
  decorations: [
    { id: 5, name: "Mandap Decoration", img: "/images/decor1.jpg", rating: 4.8, price: 25000, reviews: 80, category: "decorations" },
  ]
};

const categories = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "events", label: "Events", icon: BookOpen },
  { key: "pandits", label: "Pandits", icon: User },
  { key: "kits", label: "Puja Kits", icon: Package },
  { key: "decorations", label: "Decorations", icon: Flower2 },
  { key: "lighting", label: "Lighting", icon: Lightbulb },
  { key: "catering", label: "Catering", icon: Utensils },
  { key: "tents", label: "Tents", icon: Tent },
  { key: "venues", label: "Venues", icon: Building2 },
];

/* ---------------- Skeleton Loader ---------------- */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-amber-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-amber-200 rounded w-3/4"></div>
      <div className="h-3 bg-amber-200 rounded w-1/2"></div>
      <div className="h-3 bg-amber-200 rounded w-1/4"></div>
      <div className="h-8 bg-amber-200 rounded-xl"></div>
    </div>
  </div>
);

/* ---------------- Result Card ---------------- */
const ResultCard = ({ item, onBook, onToggleWishlist, isWishlisted }) => {
  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-amber-200"}`} />
      ))}
      <span className="text-sm text-amber-600 ml-1">{rating}</span>
    </div>
  );

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
        <button
          onClick={() => onToggleWishlist(item.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 shadow-lg"
        >
          {isWishlisted ? (
            <BookmarkCheck className="w-5 h-5 text-amber-600" fill="currentColor" />
          ) : (
            <Bookmark className="w-5 h-5 text-amber-600" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-amber-900 text-lg line-clamp-2">{item.name}</h3>
        <div className="flex items-center justify-between mb-3">
          {renderStars(item.rating)}
          <span className="text-amber-600 text-sm">({item.reviews})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-amber-800">₹{item.price.toLocaleString()}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBook(item)}
          className="w-full px-4 py-2 bg-amber-500 text-white rounded-xl"
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ---------------- Main Page ---------------- */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());

  const allItems = useMemo(
    () =>
      Object.entries(searchData).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, searchCategory: category }))
      ),
    []
  );

  const filteredResults = useMemo(
    () =>
      allItems.filter(
        (item) =>
          (activeCategory === "all" || item.searchCategory === activeCategory) &&
          item.name.toLowerCase().includes(query.toLowerCase())
      ),
    [allItems, query, activeCategory]
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Search Header (starts below your navbar) */}
      <div className="bg-white shadow-sm sticky top-0 z-40 p-4 mt-16 ">
        <div className="relative flex items-center bg-white rounded-2xl shadow px-4 py-3 border border-amber-200">
          <Search className="text-amber-600 w-5 h-5 mr-3" />
          <input
            type="text"
            placeholder="Search rituals, pandits, kits..."
            className="w-full outline-none text-amber-800"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} className="ml-3">
              <X className="w-5 h-5 text-amber-500" />
            </button>
          )}
          <button className="ml-2">
            <Mic className="w-5 h-5 text-amber-500" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto mt-4">
          {categories.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === key
                  ? "bg-amber-500 text-white"
                  : "bg-white border border-amber-200"
              }`}
              onClick={() => setActiveCategory(key)}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((item) => (
              <ResultCard
                key={item.id}
                item={item}
                onBook={() => alert("Booking...")}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.has(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-amber-700">
            <p className="text-lg font-medium">No results found 🔍</p>
            <p className="text-sm opacity-75">Try a different keyword or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
