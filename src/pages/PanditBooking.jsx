import React from "react";
import { Search, MapPin, Star, Phone, Mail, Heart } from "lucide-react";

export default function PanditBooking() {
  const pandits = [
    {
      name: "Pandit Ramesh Sharma",
      experience: "15+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.8,
      reviews: 120,
      location: "Varanasi",
      services: ["Griha Pravesh", "Maha Mrityunjaya Jaap"],
      price: "₹2100 / service",
      image: "/pandit1.png",
    },
    {
      name: "Pandit Suresh Mishra",
      experience: "10+ years",
      languages: "Hindi, English",
      rating: 4.6,
      reviews: 90,
      location: "Delhi",
      services: ["Satyanarayan Katha", "Marriage Ceremony"],
      price: "₹1800 / service",
      image: "/pandit2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-yellow-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Rooted in Dharma, Guided by Devotion
        </h1>
        <p className="text-lg mb-6">
          Find Verified Pandits for All Your Ritual Needs
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button className="bg-white text-amber-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Book Blessings
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-amber-800 transition">
            Learn More
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-lg flex flex-wrap gap-3 items-center justify-center max-w-3xl mx-auto">
          <select className="border px-4 py-2 rounded-lg">
            <option>Service Type</option>
            <option>Griha Pravesh</option>
            <option>Satyanarayan Katha</option>
          </select>
          <select className="border px-4 py-2 rounded-lg">
            <option>Location</option>
            <option>Varanasi</option>
            <option>Delhi</option>
          </select>
          <select className="border px-4 py-2 rounded-lg">
            <option>Language</option>
            <option>Hindi</option>
            <option>Sanskrit</option>
          </select>
          <button className="bg-amber-800 hover:bg-yellow-900 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Search size={18} /> Search
          </button>
        </div>
      </section>

      {/* Pandit Cards Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {pandits.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
          >
            <div className="flex gap-4 items-center mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-gray-500">{p.experience}</p>
                <p className="text-gray-500">{p.languages}</p>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 text-yellow-600 mb-3">
              <Star size={18} /> {p.rating} ({p.reviews} reviews)
            </div>

            {/* Location */}
            <p className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={18} /> {p.location}
            </p>

            {/* Services */}
            <ul className="mb-3 list-disc list-inside text-gray-700">
              {p.services.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            {/* Price */}
            <p className="font-semibold text-amber-800 mb-4">{p.price}</p>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition">
                View Profile
              </button>
              <button className="text-gray-500 hover:text-red-500 transition">
                <Heart size={22} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Trust & Benefits */}
      <section className="bg-gray-100 py-12 text-center grid md:grid-cols-3 gap-6 px-6">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">✅ Verified Pandits</h4>
          <p className="text-gray-600">Trained and background-checked</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">📜 Authentic Rituals</h4>
          <p className="text-gray-600">Performed with Vedic traditions</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">🙏 Peace of Mind</h4>
          <p className="text-gray-600">End-to-end hassle free booking</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-white py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">PanditJi</h3>
            <p className="text-gray-200">
              Serving families with devotion since 2020
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-1">
              <li>Griha Pravesh</li>
              <li>Satyanarayan Katha</li>
              <li>Marriage Ceremony</li>
              <li>Maha Mrityunjaya Jaap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p className="flex items-center gap-2">
              <Phone size={16} /> Chat with us
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@panditji.com
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-200">
          © 2024 PanditJi 🙏 All rights reserved
        </div>
      </footer>
    </div>
  );
}
