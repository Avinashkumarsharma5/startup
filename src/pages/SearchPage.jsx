import React, { useState } from "react";
import { FiSearch, FiMic, FiCalendar, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

// ================= MOCK DATA =================
const data = [
  // Puja
  {
    id: 1,
    name: "Griha Pravesh Puja",
    category: "Home Ritual",
    categoryType: "PUJA",
    icon: "🏡",
  },
  {
    id: 2,
    name: "Vastu Shanti Puja",
    category: "Home Ritual",
    categoryType: "PUJA",
    icon: "🪔",
  },

  // Pandit
  {
    id: 3,
    name: "Pandit Ji for Puja",
    category: "Pandit Service",
    categoryType: "PANDIT",
    icon: "👳‍♂️",
  },

  // Catering
  {
    id: 4,
    name: "Wedding Catering Service",
    category: "Catering",
    categoryType: "CATERING",
    icon: "🍽️",
  },

  // Decoration
  {
    id: 5,
    name: "Wedding Decoration",
    category: "Decoration",
    categoryType: "DECORATION",
    icon: "🎊",
  },

  // Puja Kits
  {
    id: 6,
    name: "Lakshmi Puja Kit",
    category: "Puja Kits",
    categoryType: "PUJA_KIT",
    icon: "🎁",
  },
  {
    id: 7,
    name: "Ganesh Puja Kit",
    category: "Puja Kits",
    categoryType: "PUJA_KIT",
    icon: "🎁",
  },
];

// ================= SMART CATEGORY DETECTION =================
const detectCategoryFromQuery = (query) => {
  const q = query.toLowerCase();

  if (q.includes("cater") || q.includes("food")) return "CATERING";
  if (q.includes("decor")) return "DECORATION";
  if (q.includes("pandit") || q.includes("priest")) return "PANDIT";
  if (q.includes("kit")) return "PUJA_KIT";
  if (q.includes("puja") || q.includes("katha")) return "PUJA";

  return null;
};

// ================= COMPONENT =================
export default function SearchPage() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [listening, setListening] = useState(false);

  // ================= VOICE SEARCH =================
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (e) => {
      setQuery(e.results[0][0].transcript);
    };

    recognition.start();
  };

  // ================= FILTER LOGIC =================
  const detectedCategory = detectCategoryFromQuery(query);

  const results = data.filter((item) => {
    const textMatch =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());

    const categoryMatch = detectedCategory
      ? item.categoryType === detectedCategory
      : true;

    return textMatch && categoryMatch;
  });

  // ================= CLICK HANDLER =================
  const handleResultClick = (item) => {
    switch (item.categoryType) {
      case "CATERING":
        window.location.href = "/catering-booking";
        break;
      case "DECORATION":
        window.location.href = "/decoration-booking";
        break;
      case "PANDIT":
        window.location.href = "/pandit-booking";
        break;
      case "PUJA_KIT":
        window.location.href = `/puja-kits?kit=${encodeURIComponent(
          item.name
        )}`;
        break;
      default:
        alert(item.name);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7e0] via-[#ffe8b3] to-[#ffd9a2] flex flex-col items-center pt-20 px-4 pb-12">
      
      {/* SEARCH BAR */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-full shadow-md flex items-center px-4 py-3 border border-amber-300"
      >
        <FiSearch className="text-amber-600 mr-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Catering, Pandit, Puja Kits..."
          className="flex-1 outline-none text-sm bg-transparent"
        />
        <button
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full ${
            listening ? "animate-pulse bg-amber-100" : ""
          }`}
        >
          <FiMic
            className={listening ? "text-red-500" : "text-orange-500"}
          />
        </button>
      </motion.div>

      {/* RESULTS */}
      <div className="mt-10 w-full max-w-3xl">
        {query === "" ? (
          <p className="text-center text-gray-500">
            Type or speak to search Sanskaraa 🔍
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-600">
            No results found 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.04 }}
                className="bg-white p-5 rounded-2xl shadow-md border border-amber-200 flex gap-4 cursor-pointer"
                onClick={() => handleResultClick(item)}
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-rose-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK LINKS */}
      <div className="flex gap-4 mt-14">
        <button
          onClick={() => (window.location.href = "/puja-kits")}
          className="flex items-center gap-2 bg-white px-5 py-2 rounded-full border shadow-sm"
        >
          <FiShoppingBag /> Puja Kits
        </button>
        <button
          onClick={() => (window.location.href = "/pandit-booking")}
          className="flex items-center gap-2 bg-white px-5 py-2 rounded-full border shadow-sm"
        >
          <FiCalendar /> Book Pandit Ji
        </button>
      </div>
    </div>
  );
}
