// src/pages/BookingsPage.jsx
import React, { useEffect, useState } from "react";
import { Star, Calendar, MapPin, Clock, User, Edit } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  const handleEdit = (index) => {
    alert(`Edit booking at index ${index}`);
    // Here you can navigate to edit page or open modal
  };

  return (
    <div className="p-4 mt-14 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3]">
      <h1 className="text-3xl font-bold text-[#800000] mb-6 text-center">
        Your Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b, i) => (
            <div
              key={i}
              className="relative p-6 bg-[#FFF2D1] border border-[#FFD7A3] rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h2 className="text-[#800000] font-bold text-xl mb-3">{b.event || "N/A"}</h2>

              <div className="space-y-2 text-gray-700 mb-3">
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#800000]" /> 
                  <span className="font-semibold">Pandit:</span> {b.pandit?.name || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> 
                  <span className="font-semibold">Service:</span> {b.service || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" /> 
                  <span className="font-semibold">Date:</span> {b.date || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> 
                  <span className="font-semibold">Time:</span> {b.time || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" /> 
                  <span className="font-semibold">Location:</span> {b.address || "N/A"}
                </p>
                {b.notes && (
                  <p className="flex items-start gap-2">
                    <span className="font-semibold">Notes:</span> {b.notes}
                  </p>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(i)}
                className="flex items-center gap-1 text-sm text-white bg-[#800000] px-3 py-1 rounded-full hover:bg-[#A00000] transition"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
