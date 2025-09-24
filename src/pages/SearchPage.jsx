import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Package, Flower2, BookOpen } from "lucide-react";

const data = {
  events: [
    { id: 1, name: "Griha Pravesh Puja", img: "/images/event1.jpg", action: "Book Now" },
    { id: 2, name: "Satyanarayan Katha", img: "/images/event2.jpg", action: "Book Now" },
  ],
  pandits: [
    { id: 3, name: "Pandit Sharma Ji", img: "/images/pandit1.jpg", action: "Hire Pandit" },
    { id: 4, name: "Pandit Mishra Ji", img: "/images/pandit2.jpg", action: "Hire Pandit" },
  ],
  kits: [
    { id: 5, name: "Ganesh Puja Kit", img: "/images/kit1.jpg", action: "Buy Now" },
    { id: 6, name: "Navratri Puja Kit", img: "/images/kit2.jpg", action: "Buy Now" },
  ],
  decorations: [
    { id: 7, name: "Mandap Decoration", img: "/images/decor1.jpg", action: "Explore" },
    { id: 8, name: "Flower Decoration", img: "/images/decor2.jpg", action: "Explore" },
  ],
  bookings: [
    { id: 9, name: "Pandit Booking", img: "/images/booking1.jpg", action: "View Booking" },
    { id: 10, name: "Event Booking", img: "/images/booking2.jpg", action: "View Booking" },
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(6); // infinite scroll
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const lowerQuery = query.toLowerCase();

  const allItems = useMemo(
    () => Object.entries(data).flatMap(([cat, items]) => items.map((i) => ({ ...i, category: cat }))),
    []
  );

  const suggestions = useMemo(
    () => allItems.filter((i) => i.name.toLowerCase().includes(lowerQuery)),
    [allItems, lowerQuery]
  );

  const groupedSuggestions = useMemo(
    () =>
      suggestions.reduce((acc, i) => {
        acc[i.category] = acc[i.category] || [];
        acc[i.category].push(i);
        return acc;
      }, {}),
    [suggestions]
  );

  const results = useMemo(() => {
    return activeTab
      ? { [activeTab]: data[activeTab].filter((i) => i.name.toLowerCase().includes(lowerQuery)) }
      : Object.fromEntries(
          Object.entries(data).map(([cat, items]) => [
            cat,
            items.filter((i) => i.name.toLowerCase().includes(lowerQuery)),
          ])
        );
  }, [activeTab, lowerQuery]);

  const hasResults = Object.values(results).some((arr) => arr.length > 0);
  const suggestionList = suggestions.flat();

  useEffect(() => setHighlightIndex(-1), [query]);

  // Infinite scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") e.preventDefault(), setHighlightIndex((prev) => (prev + 1) % suggestionList.length);
    if (e.key === "ArrowUp") e.preventDefault(), setHighlightIndex((prev) => (prev - 1 + suggestionList.length) % suggestionList.length);
    if (e.key === "Enter" && highlightIndex >= 0) {
      const selected = suggestionList[highlightIndex];
      setQuery(selected.name);
      setActiveTab(selected.category);
      setShowSuggestions(false);
      navigateItem(selected.category);
    }
    if (e.key === "Escape") setShowSuggestions(false);
  };

  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="font-bold text-[#5C3A21]">{part}</span>
        : part
    );
  };

  const navigateItem = (category) => {
    switch (category) {
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
      <div className="flex flex-col relative mt-12">
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-2">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Sanskaraa..."
            className="w-full outline-none text-gray-700"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>

        {/* Sticky Category Tabs */}
        <div className="sticky top-0 bg-[#FFF8E7] z-20 py-2">
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
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && query.length > 0 && (
          <div className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-50 p-2">
            {suggestionList.length > 0 ? (
              Object.entries(groupedSuggestions).map(([cat, items]) => (
                <div key={cat} className="mb-2">
                  <h3 className="font-semibold text-[#5C3A21] px-2 capitalize">{cat}</h3>
                  {items.map((item) => {
                    const globalIdx = suggestionList.findIndex((i) => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                          highlightIndex === globalIdx ? "bg-[#FFF3CD]" : "hover:bg-[#FFF8E7]"
                        }`}
                        onMouseDown={() => { setQuery(item.name); setActiveTab(item.category); navigateItem(item.category); }}
                      >
                        <img src={item.img} alt={item.name} className="w-6 h-6 mr-2 object-cover rounded" />
                        <span>{highlightMatch(item.name)}</span>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-center">No suggestions found 😔</p>
            )}
          </div>
        )}
      </div>

      {/* Search Results with infinite scroll */}
      <div ref={containerRef} onScroll={handleScroll} className="space-y-6 mt-4 overflow-y-auto max-h-[70vh]">
        {hasResults && query.length > 0 && Object.entries(results).map(([cat, items]) => (
          items.length > 0 && <CategorySection key={cat} category={cat} items={items.slice(0, visibleCount)} navigate={navigateItem} />
        ))}
        {!hasResults && query.length > 0 && <p className="text-gray-500 text-center mt-10">No results found 😔</p>}
      </div>
    </div>
  );
}

function CategorySection({ category, items, navigate }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#5C3A21] mb-2 capitalize">{category}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <img src={item.img} alt={item.name} className="w-full h-28 object-cover" />
            <div className="p-3 flex flex-col items-center">
              <span className="font-medium text-gray-800 text-center">{item.name}</span>
              <button
                className="mt-2 bg-[#FFD700] text-[#5C3A21] px-3 py-1 text-sm rounded-lg shadow hover:bg-[#FFC107] transition"
                onClick={() => navigate(category)}
              >
                {item.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
