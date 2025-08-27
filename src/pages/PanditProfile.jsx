import React from "react";
import { Star, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PanditProfile() {
  const navigate = useNavigate();

  const pandit = {
    name: "Pandit Rajesh Sharma",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    specialization: ["Satyanarayan Puja", "Griha Pravesh", "Wedding Rituals"],
    experience: "15+ years",
    languages: ["Hindi", "Sanskrit", "English"],
    address: "Bangalore, Karnataka",
    contact: "+91 9876543210",
    rating: 4.8,
    price: "₹2000 / service",
    reviews: [
      { name: "Amit", comment: "Very knowledgeable and punctual!" },
      { name: "Priya", comment: "Excellent puja arrangements, highly recommended." },
      { name: "Rohit", comment: "Highly professional!" },
      { name: "Sneha", comment: "Made our ceremony beautiful!" }
    ],
    videos: ["src/assets/images/sanskaravideo1.mp4"],
    gallery: ["src/assets/images/pandit.jpg"]
  };

  const handleBookNow = () => {
    navigate("/Pbc", {
      state: {
        pandit: {
          ...pandit,
          image: pandit.photo,
          services: pandit.specialization
        }
      }
    });
  };

  const CarouselSection = ({ title, items, isVideo }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FFF7E0] rounded-2xl shadow-lg p-4 border border-orange-200"
    >
      <h2 className="text-xl font-bold text-[#800000] mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl overflow-hidden shadow-lg relative"
          >
            {isVideo ? (
              <>
                <video
                  src={item}
                  controls
                  className="w-full h-56 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                  ▶ Play
                </div>
              </>
            ) : (
              <img
                src={item}
                alt={`Gallery ${i + 1}`}
                className="w-full h-56 object-cover rounded-2xl hover:scale-105 transition-transform"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] p-4 space-y-6 mt-14">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFF7E0] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 border border-orange-200"
      >
        <img
          src={pandit.photo}
          alt={pandit.name}
          className="w-28 h-28 rounded-2xl border-2 border-[#FFD700] object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-[#800000]">{pandit.name}</h1>
          <p className="text-gray-600">{pandit.experience} experience</p>
          <p className="text-gray-700">Specialization: {pandit.specialization.join(", ")}</p>
          <p className="text-gray-700">Languages: {pandit.languages.join(", ")}</p>
          <div className="flex items-center text-gray-700 gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{pandit.address}</span>
          </div>
          <div className="flex items-center text-gray-700 gap-2 mt-1">
            <Phone className="w-4 h-4" />
            <span>{pandit.contact}</span>
          </div>
        </div>
        <button
          onClick={handleBookNow}
          className="mt-4 md:mt-0 bg-[#800000] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-[#A52A2A]"
        >
          Book Now
        </button>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFF7E0] rounded-2xl shadow-lg p-4 border border-orange-200"
      >
        <h2 className="text-xl font-bold text-[#800000] mb-4">
          Reviews ({pandit.rating} <Star className="inline w-4 h-4 text-yellow-500" />)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pandit.reviews.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-[#FFE8B2] rounded-2xl p-4 shadow flex flex-col justify-between"
            >
              <div>
                <p className="font-semibold text-[#800000]">{r.name}</p>
                <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
              </div>
              <div className="flex mt-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < Math.round(pandit.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Videos Carousel */}
      <CarouselSection title="Previous Puja Videos" items={pandit.videos} isVideo={true} />

      {/* Gallery Carousel */}
      <CarouselSection title="Gallery" items={pandit.gallery} isVideo={false} />

    </div>
  );
}
