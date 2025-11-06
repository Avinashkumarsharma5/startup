import React from "react";
import { FiShoppingCart, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const trustBadges = [
  { icon: "🔰", text: "100% Authentic" },
  { icon: "🌿", text: "Eco-friendly" },
  { icon: "🕉️", text: "Sanctified by Pandits" },
  { icon: "🚚", text: "Same Day Delivery" },
];

export default function EventKitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7e0] via-[#ffe9b4] to-[#ffdca2] flex flex-col items-center justify-center px-4 py-12">
      
      {/* 🎉 Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#fff3e0] border border-amber-200 rounded-3xl shadow-lg p-10 max-w-3xl w-full text-center"
      >
        <h2 className="text-3xl font-extrabold text-[#8b0000] mb-3 flex items-center justify-center gap-2">
          🎉 <span>More Events Coming Soon!</span>
        </h2>
        <p className="text-gray-700 mb-8 text-base">
          We’re preparing something exciting for you! Until then, explore our available services below 👇
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/pujakits")}
            className="flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md"
          >
            <FiShoppingCart className="w-5 h-5" />
            Explore Puja Kits
          </button>

          <button
            onClick={() => (window.location.href = "/panditbooking")}
            className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-green-50 transition-all shadow-sm"
          >
            <FiCalendar className="w-5 h-5" />
            Book Pandit Ji
          </button>
        </div>
      </motion.div>

      {/* 🌿 Trust Badges */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {trustBadges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-amber-100"
          >
            <span className="text-lg">{badge.icon}</span>
            <span className="text-sm font-medium text-[#800000]">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}