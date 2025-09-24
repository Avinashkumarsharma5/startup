import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Package, Flower2, BookOpen, Star } from "lucide-react";

const data = {
  events: [
    { id: 1, name: "Griha Pravesh Puja", img: "/images/event1.jpg", rating: 4.5, price: 2000, action: "Book Now" },
    { id: 2, name: "Satyanarayan Katha", img: "/images/event2.jpg", rating: 4.0, price: 1500, action: "Book Now" },
  ],
  pandits: [
    { id: 3, name: "Pandit Sharma Ji", img: "/images/pandit1.jpg", rating: 4.8, price: 2500, action: "Hire Pandit" },
    { id: 4, name: "Pandit Mishra Ji", img: "/images/pandit2.jpg", rating: 4.6, price: 2200, action: "Hire Pandit" },
  ],
  kits: [
    { id: 5, name: "Ganesh Puja Kit", img: "/images/kit1.jpg", rating: 4.2, price: 800, action: "Buy Now" },
    { id: 6, name: "Navratri Puja Kit", img: "/images/kit2.jpg", rating: 4.4, price: 1000, action: "Buy Now" },
  ],
  decorations: [
    { id: 7, name: "Mandap Decoration", img: "/images/decor1.jpg", rating: 4.0, price: 5000, action: "Explore" },
    { id: 8, name: "Flower Decoration", img: "/images/decor2.jpg", rating: 4.3, price: 3000, action: "Explore" },
  ],
  bookings: [
    { id: 9, name: "Pandit Booking", img: "/images/booking1.jpg", rating: 4.5, price: 0, action: "View Booking" },
    { id: 10, name: "Event Booking", img: "/images/booking2.jpg", rating: 4.6, price: 0, action: "View Booking" },
  ],
};

const categories = [
  { key: "events", label: "Events", icon: Calendar },
  { key: "kits", label: "Kits", icon: Package },
  { key: "pandits", label: "Pandits", icon: User },
  { key: "decorations", label: "Decorations", icon: Flower2 },
  { key: "bookings", label: "Bookings", icon: BookOpen },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [visibleCount, setVisibleCount] = useState(6);
  const [filters, setFilters] = useState({ minRating: 0, maxPrice: Infinity });
  const containerRef = useRef(null);

  const lowerQuery = query.toLowerCase();

  const allItems = useMemo(
    () => Object.entries(data).flatMap(([cat, items]) => items.map(i => ({ ...i, category: cat }))),
    []
  );

  const filteredResults = useMemo(() => {
    let results = activeTab
      ? { [activeTab]: data[activeTab] }
      : Object.fromEntries(Object.entries(data));

    Object.keys(results).forEach(cat => {
      results[cat] = results[cat]
        .filter(item =>
          item.name.toLowerCase().includes(lowerQuery) &&
          item.rating >= filters.minRating &&
          item.price <= filters.maxPrice
        )
        .sort((a, b) =>
          sortBy === "rating" ? b.rating - a.rating : a.price - b.price
        );
    });
    return results;
  }, [activeTab, lowerQuery, filters, sortBy]);

  const hasResults = Object.values(filteredResults).some(arr => arr.length > 0);

  const navigateCategory = (category) => {
    switch(category) {
      case "events": navigate("/EventsPage"); break;
      case "pandits": navigate("/PanditBooking"); break;
      case "kits": navigate("/pujakits"); break;
      case "decorations": navigate("/services"); break;
      case "bookings": navigate("/BookingsPage"); break;
      default: break;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-4 pt-6 relative mt-8">
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-3">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search for Puja, Pandit or Kits..."
          className="w-full outline-none text-gray-700"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Sticky Category + Filters */}
      <div className="sticky top-0 bg-[#FFF8E7] z-20 py-2 flex justify-between items-center">
        <div className="flex space-x-3 overflow-x-auto">
          {categories.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border transition ${
                activeTab === key ? "bg-[#FFD700] text-[#5C3A21] border-[#FFD700]" : "bg-white text-gray-700 border-gray-300 hover:bg-[#FFF3CD]"
              }`}
              onClick={() => setActiveTab(activeTab === key ? null : key)}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded px-2 py-1 bg-white text-sm">
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
          </select>
          <input type="number" placeholder="Min Rating" className="border rounded px-2 py-1 w-20" 
            onChange={e => setFilters(f => ({ ...f, minRating: Number(e.target.value) || 0 }))} />
          <input type="number" placeholder="Max Price" className="border rounded px-2 py-1 w-24" 
            onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) || Infinity }))} />
        </div>
      </div>

      {/* Featured Sections (Carousel style) */}
      <div className="mt-4 space-y-6">
        {hasResults ? Object.entries(filteredResults).map(([cat, items]) => (
          items.length > 0 && (
            <div key={cat}>
              <h2 className="text-lg font-semibold text-[#5C3A21] mb-2 capitalize">{cat}</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {items.slice(0, visibleCount).map(item => (
                  <div key={item.id} className="min-w-[160px] bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:scale-105">
                    <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3 flex flex-col items-center">
                      <span className="font-semibold text-gray-800 text-center">{item.name}</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-700">{item.rating}</span>
                      </div>
                      {item.price > 0 && <span className="text-sm text-gray-500 mt-1">₹{item.price}</span>}
                      <button
                        className="mt-2 bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-[#5C3A21] px-3 py-1 text-sm rounded-full shadow hover:scale-105 transition"
                        onClick={() => navigateCategory(item.category)}
                      >
                        {item.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {items.length > visibleCount && (
                <button className="mt-2 text-[#5C3A21] font-semibold hover:text-[#FFD700]"
                  onClick={() => setVisibleCount(prev => prev + 4)}>
                  Load More
                </button>
              )}
            </div>
          )
        )) : <p className="text-center text-gray-500 mt-10">No results found 😔</p>}
      </div>
    </div>
  )
}
