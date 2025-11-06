import React, { useState } from "react";
import { FiSearch, FiHeart, FiCalendar, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

const data = [
  { id: 1, name: "Griha Pravesh Puja", category: "Home Ritual", icon: "🏡" },
  { id: 2, name: "Vastu Shanti Puja", category: "Home Ritual", icon: "🪔" },
  { id: 3, name: "Wedding Puja", category: "Vivah Sanskar", icon: "💑" },
  { id: 4, name: "Satyanarayan Katha", category: "Puja & Katha", icon: "📿" },
  { id: 5, name: "Pandit Ji for Puja", category: "Service", icon: "👳‍♂️" },
  { id: 6, name: "Puja Kits Delivery", category: "Shop", icon: "🎁" },
  { id: 7, name: "Festival Puja", category: "Special Event", icon: "🎉" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7e0] via-[#ffe8b3] to-[#ffd9a2] flex flex-col items-center pt-16 px-4 pb-12">
      
      {/* 🔍 Search Bar */}
      <div className="w-full max-w-2xl bg-white rounded-full shadow-md flex items-center px-4 py-3 border border-amber-300 mt-8">
        <FiSearch className="text-amber-600 w-5 h-5 mr-3" />
        <input
          type="text"
          placeholder="Search Puja, Services or Pandit Ji..."
          className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 🔮 Results Section */}
      <div className="mt-10 w-full max-w-3xl">
        {query === "" ? (
          <div className="text-center text-gray-500 mt-10">
            Type something to search Sanskaraa services 🔍
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No results found for “{query}” 😔
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl border border-amber-200 p-5 shadow-md flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-rose-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 💫 Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {[
          { icon: <FiShoppingBag />, text: "Puja Kits", link: "/pujakits" },
          { icon: <FiCalendar />, text: "Book Pandit Ji", link: "/panditbooking" },
          
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => (window.location.href = btn.link)}
            className="flex items-center gap-2 bg-white border border-amber-200 rounded-full px-5 py-2 shadow-sm text-sm font-medium text-[#8b0000] hover:bg-amber-50 transition-all"
          >
            {btn.icon}
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}
