import React, { useState, useEffect } from "react";
import { FiSearch, FiMic, FiCalendar, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

// ---------- Mock Data ----------
const data = [
  // Puja Services
  { id: 1, name: "Griha Pravesh Puja", category: "Home Ritual", icon: "🏡" },
  { id: 2, name: "Vastu Shanti Puja", category: "Home Ritual", icon: "🪔" },
  { id: 3, name: "Wedding Puja", category: "Vivah Sanskar", icon: "💑" },
  { id: 4, name: "Satyanarayan Katha", category: "Puja & Katha", icon: "📿" },
  { id: 5, name: "Pandit Ji for Puja", category: "Service", icon: "👳‍♂️" },
  { id: 7, name: "Festival Puja", category: "Special Event", icon: "🎉" },

  // Puja Kits (you can add more)
  { id: 10, name: "Lakshmi Puja Kit", category: "Puja Kits", icon: "🎁" },
  { id: 11, name: "Ganesh Puja Kit", category: "Puja Kits", icon: "🎁" },
  { id: 12, name: "Griha Pravesh Puja Kit", category: "Puja Kits", icon: "🎁" },
];

export default function SearchPage() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [listening, setListening] = useState(false);

  // ✅ Voice Search (Web Speech API)
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  // ✅ Dynamic Filter
  const results = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Function to handle click based on category/type
  const handleResultClick = (item) => {
    if (item.category === "Puja Kits") {
      // Redirect to Puja Kits Page with kit name
      window.location.href = `/puja-kits?kit=${encodeURIComponent(item.name)}`;
    } else if (item.name.includes("Pandit")) {
      window.location.href = "/pandit-booking";
    } else {
      alert(`Selected: ${item.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7e0] via-[#ffe8b3] to-[#ffd9a2] flex flex-col items-center pt-20 px-4 pb-12">

      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-full shadow-md flex items-center px-4 py-3 border border-amber-300 mt-4"
      >
        <FiSearch className="text-amber-600 w-5 h-5 mr-3" />
        <input
          type="text"
          placeholder="Search Puja Kits, Services or Pandit Ji..."
          className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full hover:bg-amber-100 transition-colors ${
            listening ? "animate-pulse bg-amber-50" : ""
          }`}
          title="Voice Search"
        >
          <FiMic className={`w-5 h-5 ${listening ? "text-red-500" : "text-orange-500"}`} />
        </button>
      </motion.div>

      {/* 🔮 Results Section */}
      <div className="mt-10 w-full max-w-3xl">
        {query === "" ? (
          <div className="text-center text-gray-500 mt-10">
            Type or speak to search Sanskaraa services 🔍
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
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl border border-amber-200 p-5 shadow-md flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleResultClick(item)}
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
          { icon: <FiShoppingBag />, text: "Puja Kits", link: "/puja-kits" },
          { icon: <FiCalendar />, text: "Book Pandit Ji", link: "/pandit-booking" },
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
