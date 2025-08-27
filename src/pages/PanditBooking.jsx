import React, { useState } from "react";
import { Search, MapPin, Star, Phone, Mail, Heart } from "lucide-react";

export default function PanditBooking() {
  const [filters, setFilters] = useState({ service: "", location: "", language: "" });


// --- Pandit Data ---
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
      image: "https://randomuser.me/api/portraits/men/92.jpg",
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
      image: "https://randomuser.me/api/portraits/men/72.jpg",
    },
    {
      name: "Pandit Mahesh Tiwari",
      experience: "12+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.7,
      reviews: 110,
      location: "Mumbai",
      services: ["Marriage Ceremony", "Griha Pravesh"],
      price: "₹2000 / service",
      image: "https://randomuser.me/api/portraits/men/73.jpg",
    },
    {
      name: "Pandit Dinesh Pathak",
      experience: "20+ years",
      languages: "Hindi, English",
      rating: 4.9,
      reviews: 150,
      location: "Jaipur",
      services: ["Maha Mrityunjaya Jaap", "Satyanarayan Katha"],
      price: "₹2500 / service",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      name: "Pandit Rajesh Dubey",
      experience: "8+ years",
      languages: "Hindi",
      rating: 4.5,
      reviews: 70,
      location: "Lucknow",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: "₹1500 / service",
      image: "https://randomuser.me/api/portraits/men/16.jpg",
    },
    {
      name: "Pandit Manoj Pandey",
      experience: "18+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.8,
      reviews: 140,
      location: "Prayagraj",
      services: ["Maha Mrityunjaya Jaap", "Marriage Ceremony"],
      price: "₹2300 / service",
      image: "https://randomuser.me/api/portraits/men/43.jpg",
    },
    {
      name: "Pandit Keshav Shastri",
      experience: "11+ years",
      languages: "Hindi, English",
      rating: 4.6,
      reviews: 95,
      location: "Pune",
      services: ["Satyanarayan Katha", "Griha Pravesh"],
      price: "₹1900 / service",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      name: "Pandit Vinod Mishra",
      experience: "16+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.7,
      reviews: 130,
      location: "Hyderabad",
      services: ["Marriage Ceremony", "Maha Mrityunjaya Jaap"],
      price: "₹2200 / service",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      name: "Pandit Harish Tripathi",
      experience: "14+ years",
      languages: "Hindi, English, Sanskrit",
      rating: 4.9,
      reviews: 160,
      location: "Bhopal",
      services: ["Griha Pravesh", "Satyanarayan Katha"],
      price: "₹2400 / service",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Pandit Prakash Joshi",
      experience: "9+ years",
      languages: "Hindi, English",
      rating: 4.5,
      reviews: 85,
      location: "Udaipur",
      services: ["Marriage Ceremony", "Satyanarayan Katha"],
      price: "₹1700 / service",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredPandits = pandits.filter((p) => {
    return (
      (!filters.service || p.services.includes(filters.service)) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.language || p.languages.includes(filters.language))
    );
  });

  return (
    <div className="min-h-screen bg-orange-100 flex flex-col font-sans">
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-r from-amber-800 to-yellow-900 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Rooted in Dharma, Guided by Devotion
          </h1>
          <p className="text-lg md:text-xl mb-10">
            Find Verified Pandits for Every Ritual and Ceremony
          </p>

          <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
            <select
              name="service"
              value={filters.service}
              onChange={handleFilterChange}
              className="flex-1 border px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select Service</option>
              <option value="Griha Pravesh">Griha Pravesh</option>
              <option value="Satyanarayan Katha">Satyanarayan Katha</option>
              <option value="Marriage Ceremony">Marriage Ceremony</option>
              <option value="Maha Mrityunjaya Jaap">Maha Mrityunjaya Jaap</option>
            </select>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="flex-1 border px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select Location</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Prayagraj">Prayagraj</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Udaipur">Udaipur</option>
            </select>
            <select
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
              className="flex-1 border px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select Language</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Sanskrit">Sanskrit</option>
            </select>
            <button className="bg-amber-700 hover:bg-yellow-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Popular Pandit Ji Section */}
      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🌟 Popular Pandit Ji
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {pandits.slice(0, 6).map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            >
              <div className="p-[3px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-full">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
              </div>
              <p className="text-sm font-semibold mt-2 text-gray-700">{p.name}</p>
              <p className="text-xs text-gray-500">{p.services[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pandit Cards Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPandits.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition"
          >
            <div className="flex gap-4 items-center mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.experience}</p>
                <p className="text-gray-500 text-sm">{p.languages}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 mb-3">
              <Star size={18} /> {p.rating} ({p.reviews} reviews)
            </div>
            <p className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={18} /> {p.location}
            </p>
            <ul className="mb-3 list-disc list-inside text-gray-700 text-sm">
              {p.services.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
            <p className="font-semibold text-amber-800 mb-4">{p.price}</p>
            <div className="flex justify-between items-center mt-auto">
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
      <section className="bg-gray-100 py-16 px-6 text-center grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">✅ Verified Pandits</h4>
          <p className="text-gray-600 text-sm">Trained and background-checked</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">📜 Authentic Rituals</h4>
          <p className="text-gray-600 text-sm">Performed with Vedic traditions</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-2">🙏 Peace of Mind</h4>
          <p className="text-gray-600 text-sm">End-to-end hassle free booking</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-white py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">PanditJi</h3>
            <p className="text-gray-200 text-sm">
              Serving families with devotion since 2020
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-sm">
              <li>Griha Pravesh</li>
              <li>Satyanarayan Katha</li>
              <li>Marriage Ceremony</li>
              <li>Maha Mrityunjaya Jaap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p className="flex items-center gap-2 text-sm">
              <Phone size={16} /> Chat with us
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Mail size={16} /> support@panditji.com
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-200 text-sm">
          © {new Date().getFullYear()} PanditJi 🙏 All rights reserved
        </div>
      </footer>
    </div>
  );
}
