import React from "react";
import { motion } from "framer-motion";

// --- Category Data ---
const categories = [
  { name: "Griha Pravesh Kits", img: "/assets/griha.png" },
  { name: "Satyanarayan Kits", img: "/assets/satya.png" },
  { name: "Wedding Kits", img: "/assets/wedding.png" },
  { name: "Festive Kits", img: "/assets/festive.png" },
  { name: "Daily Pooja Kits", img: "/assets/daily.png" },
];

// --- Kits Data ---
const kits = [
  {
    id: 1,
    name: "Griha Pravesh Kit",
    description: "Complete set of essentials for Griha Pravesh Puja.",
    price: "₹1500",
    image: "/kits/griha-pravesh.jpg",
  },
  {
    id: 2,
    name: "Vivah Ceremony Kit",
    description: "All required samagri for traditional Vivah Puja.",
    price: "₹2500",
    image: "/kits/vivah-kit.jpg",
  },
  {
    id: 3,
    name: "Havan Kit",
    description: "Authentic samagri for Havan with proper mantras.",
    price: "₹1200",
    image: "/kits/havan-kit.jpg",
  },
  {
    id: 4,
    name: "Satyanarayan Puja Kit",
    description: "Essential samagri for Satyanarayan Katha.",
    price: "₹1800",
    image: "/kits/satyanarayan-kit.jpg",
  },
  {
    id: 5,
    name: "Diwali Puja Kit",
    description: "Special kit for Lakshmi-Ganesh Puja on Diwali.",
    price: "₹999",
    image: "/kits/diwali-kit.jpg",
  },
  {
    id: 6,
    name: "Navratri Puja Kit",
    description: "Samagri for all 9 days of Navratri Puja.",
    price: "₹2200",
    image: "/kits/navratri-kit.jpg",
  },
];

// --- Final Page Component ---
export default function KitStorePage() {
  return (
    <div className="bg-gradient-to-br from-[#FFF7E8] via-[#FDF0D5] to-[#FFE4B3] min-h-screen">
      {/* --- Category Scroll --- */}
      <div className="flex gap-4 overflow-x-auto py-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center min-w-[90px] bg-white rounded-xl shadow p-2 hover:scale-105 transition-transform"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-12 h-12 object-contain"
            />
            <p className="text-sm font-medium mt-1 text-[#5C3A21] text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      {/* --- Hero Banner --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-4 mt-4 relative rounded-2xl overflow-hidden shadow-lg"
      >
        <img
          src="/assets/puja-hero.jpg"
          alt="Puja Banner"
          className="w-full h-52 sm:h-64 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-lg sm:text-2xl font-bold text-white">
            Special Puja Kit Offers
          </h2>
          <p className="text-sm sm:text-base text-white/90">
            Celebrate traditions with complete kits
          </p>
        </div>
      </motion.div>

      {/* --- Products Section --- */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Kit Store
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Buy ready-made authentic Pooja Kits curated by experts for every
            ritual.
          </p>

          {/* Product Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {kits.map((kit) => (
              <div
                key={kit.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {/* Image */}
                <div className="h-40 w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="h-full object-cover"
                  />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {kit.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {kit.description}
                </p>

                {/* Price + Button */}
                <div className="mt-auto">
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {kit.price}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition">
                      Buy Now
                    </button>
                    <button className="flex-1 border border-yellow-500 text-yellow-600 py-2 rounded-lg font-medium hover:bg-yellow-50 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}