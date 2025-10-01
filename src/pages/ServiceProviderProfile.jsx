import React, { useState } from "react";
import { Calendar, Clock, Upload, History, User, Video, Image } from "lucide-react";

export default function ServiceProviderProfile() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Dummy data for bookings
  const upcomingBookings = [
    { id: 1, customer: "Ravi Kumar", service: "Satyanarayan Puja", date: "2025-10-10", time: "10:00 AM" },
    { id: 2, customer: "Priya Sharma", service: "Wedding Decoration", date: "2025-10-15", time: "6:00 PM" },
  ];

  const bookingHistory = [
    { id: 1, customer: "Amit Singh", service: "Griha Pravesh Puja", date: "2025-09-20", status: "Completed" },
    { id: 2, customer: "Anjali Verma", service: "Catering", date: "2025-09-10", status: "Completed" },
  ];

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), content: newPost }, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 mt-12">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#5C3A21] to-[#8B4513] text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center text-[#5C3A21] font-bold text-xl">
            SP
          </div>
          <div>
            <h2 className="text-xl font-bold">Pandit Ji / Vendor / Shopkeeper</h2>
            <p className="text-sm">Location: Ranchi, Jharkhand</p>
            <p className="text-sm">Phone: +91 9876543210</p>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#5C3A21]" /> Upcoming Bookings
        </h3>
        <ul className="mt-3 space-y-2">
          {upcomingBookings.map((b) => (
            <li key={b.id} className="p-3 bg-gray-100 rounded-lg flex justify-between">
              <div>
                <p className="font-bold">{b.customer}</p>
                <p className="text-sm">{b.service}</p>
              </div>
              <div className="text-right text-sm">
                <p>{b.date}</p>
                <p className="text-gray-600">{b.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking History */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5 text-[#5C3A21]" /> Booking History
        </h3>
        <ul className="mt-3 space-y-2">
          {bookingHistory.map((b) => (
            <li key={b.id} className="p-3 bg-gray-100 rounded-lg flex justify-between">
              <div>
                <p className="font-bold">{b.customer}</p>
                <p className="text-sm">{b.service}</p>
              </div>
              <span className="text-green-600 font-semibold">{b.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Post Section */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#5C3A21]" /> Share Post / Banner / Reel
        </h3>

        <textarea
          className="w-full border p-2 rounded-lg mt-2"
          rows={3}
          placeholder="Write something about your service, festival offers, or share your event..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handlePost}
            className="bg-[#FFD700] text-[#5C3A21] px-4 py-2 rounded-lg font-bold hover:bg-[#FFC107]"
          >
            Post
          </button>
          <button className="bg-gray-200 flex items-center gap-2 px-3 py-2 rounded-lg">
            <Image className="w-4 h-4" /> Upload Banner
          </button>
          <button className="bg-gray-200 flex items-center gap-2 px-3 py-2 rounded-lg">
            <Video className="w-4 h-4" /> Upload Reel
          </button>
        </div>

        {/* Posted Content */}
        <div className="mt-4 space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="p-3 bg-yellow-50 rounded-lg shadow-sm">
              {p.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
