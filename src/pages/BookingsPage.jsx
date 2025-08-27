import React, { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  return (
    <div className="p-4 mt-14 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] min-h-screen">
      <h1 className="text-2xl font-bold text-[#800000] mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        bookings.map((b, i) => (
          <div
            key={i}
            className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm"
          >
            <p><span className="font-semibold">Pandit:</span> {b.pandit.name}</p>
            <p><span className="font-semibold">Service:</span> {b.service}</p>
            <p><span className="font-semibold">Date:</span> {b.date}</p>
            <p><span className="font-semibold">Time:</span> {b.time}</p>
          </div>
        ))
      )}
    </div>
  );
}
