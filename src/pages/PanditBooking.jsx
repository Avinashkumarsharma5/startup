import React, { useState } from "react";
import { Search, MapPin, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PanditBooking() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ service: "", location: "", language: "" });

  // --- Pandit Data (Total 15) ---
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
      address: "Varanasi, UP",
      contact: "+91 9876543210",
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
      address: "Delhi, India",
      contact: "+91 9123456780",
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
      address: "Mumbai, MH",
      contact: "+91 9988776655",
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
      address: "Jaipur, RJ",
      contact: "+91 9871122334",
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
      address: "Lucknow, UP",
      contact: "+91 9811223344",
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
      address: "Prayagraj, UP",
      contact: "+91 9877766554",
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
      address: "Pune, MH",
      contact: "+91 9922334455",
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
      address: "Hyderabad, TS",
      contact: "+91 9900112233",
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
      address: "Bhopal, MP",
      contact: "+91 9876541230",
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
      address: "Udaipur, RJ",
      contact: "+91 9811225566",
    },
    {
      name: "Pandit Ravi Verma",
      experience: "13+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.7,
      reviews: 105,
      location: "Chennai",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: "₹2100 / service",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      address: "Chennai, TN",
      contact: "+91 9876554433",
    },
    {
      name: "Pandit Sanjay Gupta",
      experience: "12+ years",
      languages: "Hindi, English",
      rating: 4.6,
      reviews: 92,
      location: "Kolkata",
      services: ["Satyanarayan Katha", "Maha Mrityunjaya Jaap"],
      price: "₹2000 / service",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
      address: "Kolkata, WB",
      contact: "+91 9911223344",
    },
    {
      name: "Pandit Anil Sharma",
      experience: "17+ years",
      languages: "Hindi",
      rating: 4.8,
      reviews: 135,
      location: "Bangalore",
      services: ["Marriage Ceremony", "Griha Pravesh"],
      price: "₹2250 / service",
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      address: "Bangalore, KA",
      contact: "+91 9877766553",
    },
    {
      name: "Pandit Deepak Tiwari",
      experience: "15+ years",
      languages: "Hindi, Sanskrit",
      rating: 4.7,
      reviews: 128,
      location: "Chandigarh",
      services: ["Maha Mrityunjaya Jaap", "Satyanarayan Katha"],
      price: "₹2150 / service",
      image: "https://randomuser.me/api/portraits/men/25.jpg",
      address: "Chandigarh, CH",
      contact: "+91 9888776655",
    },
    {
      name: "Pandit Ashok Pandey",
      experience: "19+ years",
      languages: "Hindi, English, Sanskrit",
      rating: 4.9,
      reviews: 165,
      location: "Ahmedabad",
      services: ["Griha Pravesh", "Marriage Ceremony"],
      price: "₹2500 / service",
      image: "https://randomuser.me/api/portraits/men/26.jpg",
      address: "Ahmedabad, GJ",
      contact: "+91 9876541122",
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

  const handleViewProfile = (pandit) => {
    navigate("/PanditProfile", { state: { pandit } });
  };

  return (
    <div className="min-h-screen bg-orange-100 flex flex-col font-sans">
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
              {Array.from(new Set(pandits.map((p) => p.location))).map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
              className="flex-1 border px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select Language</option>
              {["Hindi", "English", "Sanskrit"].map((lang, idx) => (
                <option key={idx} value={lang}>{lang}</option>
              ))}
            </select>
            <button className="bg-amber-700 hover:bg-yellow-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

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
            <div className="flex justify-between items-center mt-auto gap-2">
              <button
                onClick={() => handleViewProfile(p)}
                className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition"
              >
                View Profile
              </button>

              <button className="text-gray-500 hover:text-red-500 transition">
                <Heart size={22} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
