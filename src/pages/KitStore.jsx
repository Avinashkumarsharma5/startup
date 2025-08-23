import React from "react";

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

export default function KitStoreSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Kit Store
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Buy ready-made authentic Pooja Kits curated by experts for every ritual.
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
              <h3 className="text-lg font-semibold text-gray-800">{kit.name}</h3>
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
  );
}
