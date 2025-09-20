import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

// Dummy data
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

const categories = ["events", "kits", "pandits", "decorations", "bookings"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null); // Category filter
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);

  const lowerQuery = query.toLowerCase();

  // Flatten all items with category info
  const allItems = Object.entries(data).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  );

  // Filter suggestions
  const suggestions = allItems.filter(item =>
    item.name.toLowerCase().includes(lowerQuery)
  );

  // Group suggestions by category
  const groupedSuggestions = suggestions.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Filter results based on query + activeTab
  const results = activeTab
    ? { [activeTab]: data[activeTab].filter(item => item.name.toLowerCase().includes(lowerQuery)) }
    : Object.fromEntries(
        Object.entries(data).map(([category, items]) => [
          category,
          items.filter(item => item.name.toLowerCase().includes(lowerQuery))
        ])
      );

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  // Keyboard navigation
  const suggestionList = suggestions.flat();
  useEffect(() => setHighlightIndex(-1), [query]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestionList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + suggestionList.length) % suggestionList.length);
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      setQuery(suggestionList[highlightIndex].name);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Highlight matched text
  const highlightMatch = (text) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="font-bold text-[#5C3A21]">{part}</span> : part
    );
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
            onChange={e => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-3 overflow-x-auto mb-2">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                activeTab === cat
                  ? "bg-[#FFD700] text-[#5C3A21] border-[#FFD700]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#FFF3CD]"
              }`}
              onClick={() => setActiveTab(activeTab === cat ? null : cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Auto-suggestions Dropdown */}
        {showSuggestions && query.length > 0 && (
          <div className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-50 p-2">
            {suggestionList.length > 0 ? (
              Object.entries(groupedSuggestions).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <h3 className="font-semibold text-[#5C3A21] px-2 capitalize">{category}</h3>
                  {items.map((item, idx) => {
                    const globalIdx = suggestionList.findIndex(i => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                          highlightIndex === globalIdx ? "bg-[#FFF3CD]" : ""
                        }`}
                        onMouseDown={() => setQuery(item.name)}
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

      {/* Search Results */}
      {hasResults && query.length > 0 && (
        <div className="space-y-6 mt-4">
          {Object.entries(results).map(([category, items]) =>
            items.length > 0 ? <CategorySection key={category} category={category} items={items} /> : null
          )}
        </div>
      )}

      {!hasResults && query.length > 0 && (
        <p className="text-gray-500 text-center mt-10">No results found 😔</p>
      )}
    </div>
  );
}

// Component to display results as cards
function CategorySection({ category, items }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#5C3A21] mb-2 capitalize">{category}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={item.img} alt={item.name} className="w-full h-28 object-cover" />
            <div className="p-3 flex flex-col items-center">
              <span className="font-medium text-gray-800 text-center">{item.name}</span>
              <button className="mt-2 bg-[#FFD700] text-[#5C3A21] px-3 py-1 text-sm rounded-lg shadow hover:bg-[#FFC107] transition">
                {item.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
