import React from "react";

const kits = [
  {
    name: "Griha Pravesh Kit",
    description: "Complete set of essentials for Griha Pravesh Puja.",
    price: "₹1500",
    items: ["Kalash", "Moli", "Roli", "Dhoop", "Panchmeva"],
  },
  {
    name: "Vivah Ceremony Kit",
    description: "All required samagri for traditional Vivah Puja.",
    price: "₹2500",
    items: ["Haldi", "Sindoor", "Kumkum", "Paan Leaves", "Supari"],
  },
  {
    name: "Havan Kit",
    description: "Authentic samagri for Havan with proper mantras.",
    price: "₹1200",
    items: ["Havan Samidha", "Ghee", "Navgrah Samagri", "Kapoor"],
  },
];

export default function KitStore() {
  return (
    <section className="bg-gradient-to-b from-yellow-50 to-yellow-100 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Buy Authentic Pooja Kits
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Ready-made samagri kits curated by verified Pandits for all your rituals.
        </p>

        {/* Kit Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {kits.map((kit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="h-32 bg-yellow-200 rounded-lg mb-4 flex items-center justify-center text-4xl">
                📦
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {kit.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{kit.description}</p>

              {/* Items */}
              <ul className="text-sm text-gray-700 mb-4 flex flex-wrap gap-2">
                {kit.items.map((item, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price & Button */}
              <div className="mt-auto">
                <p className="text-lg font-bold text-gray-900 mb-3">
                  {kit.price}
                </p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
