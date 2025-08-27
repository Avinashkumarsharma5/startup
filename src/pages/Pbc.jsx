import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Pbc() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pandit info from PanditProfile
  const pandit = location.state?.pandit;

  const [booking, setBooking] = useState({
    date: "",
    time: "",
    service: pandit?.services[0] || "",
    name: "",
    phone: "",
    email: ""
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = () => {
    const { date, time, name, phone, email } = booking;
    if (!date || !time || !name || !phone || !email) {
      alert("Please fill all booking details!");
      return;
    }

    // Save booking to localStorage
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    savedBookings.push({ ...booking, pandit });
    localStorage.setItem("bookings", JSON.stringify(savedBookings));

    setBookingConfirmed(true);
  };

  if (!pandit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          No pandit selected. Go back to booking page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] p-4 space-y-6 mt-14">
      {/* Pandit Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFF7E0] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 border border-orange-200"
      >
        <img
          src={pandit.image}
          alt={pandit.name}
          className="w-28 h-28 rounded-2xl border-2 border-[#FFD700] object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-[#800000]">{pandit.name}</h1>
          <p className="text-gray-600">{pandit.experience} experience</p>
          <p className="text-gray-700">Services: {pandit.services.join(", ")}</p>
          <p className="text-gray-700">Languages: {pandit.languages.join(", ")}</p>
          <div className="flex items-center text-gray-700 gap-2 mt-1">
            <MapPin className="w-4 h-4" /> <span>{pandit.address}</span>
          </div>
          <div className="flex items-center text-gray-700 gap-2 mt-1">
            <Phone className="w-4 h-4" /> <span>{pandit.contact}</span>
          </div>
        </div>
      </motion.div>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFF7E0] rounded-2xl shadow-lg p-6 border border-orange-200"
      >
        <h2 className="text-xl font-bold text-[#800000] mb-4">Book Appointment</h2>

        {bookingConfirmed ? (
          <div className="bg-green-100 p-6 rounded-xl text-green-800 text-center font-semibold">
            ✅ Booking Confirmed! {pandit.name} will contact you shortly.
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-[#800000] text-white px-6 py-2 rounded-full hover:bg-[#A52A2A] transition"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Form */}
            <div className="space-y-3">
              <label className="block font-medium text-gray-700">Select Date</label>
              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              />

              <label className="block font-medium text-gray-700">Select Time Slot</label>
              <select
                name="time"
                value={booking.time}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Slot</option>
                <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
              </select>

              <label className="block font-medium text-gray-700">Select Service</label>
              <select
                name="service"
                value={booking.service}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              >
                {pandit.services.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <label className="block font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={booking.name}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              />

              <label className="block font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={booking.phone}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              />

              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={booking.email}
                onChange={handleBookingChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Right Summary & Confirm */}
            <div className="bg-yellow-50 p-4 rounded-xl flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-800 text-lg">Summary</h3>
                <p>
                  <span className="font-semibold">Pandit:</span> {pandit.name}
                </p>
                <p>
                  <span className="font-semibold">Service:</span> {booking.service}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {booking.date || "-"}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {booking.time || "-"}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {pandit.price}
                </p>
              </div>
              <button
                onClick={handleConfirmBooking}
                className="mt-4 bg-[#800000] text-white px-6 py-3 rounded-full font-bold hover:bg-[#A52A2A] transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
