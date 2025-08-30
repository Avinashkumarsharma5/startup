// src/pages/BookEvent.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Star } from "lucide-react";

export default function BookEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventName = decodeURIComponent(searchParams.get("event") || "Sanskaraa Event");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    address: "",
    notes: "",
  });
  const [bookingDone, setBookingDone] = useState(false);

  // Vertical carousel index
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInterval = useRef(null);

  const event = {
    name: eventName,
    mainImages: [
      "src/assets/images/pujakit2.jpg",
      "src/assets/images/sadi1.jpg",
      "src/assets/images/havan.jpg",
      "src/assets/images/decoration.jpg",
      "src/assets/images/catering.jpg",
    ],
    description:
      "Is puja/event ke madhyam se aapke ghar me shanti aur mangal ka vataavaran hota hai. Sanskaraa se professional Pandit ji aur samagri uplabdh hoti hai.",
    price: "₹5100",
    rating: 4.7,
    video: "src/assets/images/sanskaravideo1.mp4",
    services: [
      "Catering",
      "Tent",
      "Decoration",
      "Videography",
      "Hall",
      "Pandit Ji",
      "Puja Kits",
    ],
    gallery: [
      "src/assets/images/pujakit2.jpg",
      "src/assets/images/sadi1.jpg",
      "src/assets/images/havan.jpg",
    ],
    reviews: [
      { user: "Rahul Sharma", text: "Bahut hi acha anubhav raha 🙏" },
      { user: "Priya Verma", text: "Pandit ji samay par aaye aur puja shanti se hui." },
    ],
  };

  // Vertical carousel auto-rotation
  useEffect(() => {
    carouselInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % event.mainImages.length);
    }, 3000);
    return () => clearInterval(carouselInterval.current);
  }, [event.mainImages.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = { ...formData, event: event.name, id: Date.now() };
    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-6 md:p-12 space-y-12">
      {/* Hero Image (previously video section) */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl mt-12">
        <img
          src={event.mainImages[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            {event.name}
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl drop-shadow">
            {event.description.slice(0, 120)}...
          </p>
        </div>
      </div>

      {/* Video Section (previously image carousel) + Event Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            src={event.video}
            autoPlay
            loop
            muted
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </motion.div>

        {/* Event Info + Services + Booking */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          {/* Event Name & Rating */}
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-2">
            <h2 className="text-3xl font-bold text-orange-600">{event.name}</h2>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(event.rating) ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-gray-700 font-semibold">{event.rating}</span>
            </div>

            {/* Services Offered */}
            <div className="mt-4 flex flex-wrap gap-2">
              {event.services.map((srv, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm shadow-sm"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <motion.div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
            {!bookingDone ? (
              <>
                <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                  Confirm Your Booking
                </h2>
                <form className="space-y-4" onSubmit={handleBooking}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Event Location"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    required
                  />
                  <textarea
                    name="notes"
                    placeholder="Additional Notes (optional)"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 shadow-lg transform hover:-translate-y-1 transition-all"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <Confetti numberOfPieces={200} />
                <p className="text-green-700 font-semibold text-lg">
                  🎉 Your booking has been confirmed successfully!
                </p>
                <button
                  onClick={() => navigate("/events")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-xl shadow hover:bg-orange-600 transition"
                >
                  Back to Events
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">About the Event</h2>
        <p className="text-gray-700">{event.description}</p>
        <div className="flex items-center gap-6 mt-4">
          <span className="text-xl font-semibold text-green-700">
            Price: {event.price}
          </span>
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
            ⭐ {event.rating}
          </span>
        </div>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {event.gallery.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              className="w-full h-40 object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Customer Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {event.reviews.map((rev, i) => (
            <motion.div
              key={i}
              className="bg-orange-50 p-4 rounded-xl shadow hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-orange-700">{rev.user}</p>
              <p className="text-gray-700">{rev.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
