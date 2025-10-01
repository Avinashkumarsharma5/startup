import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Upload,
  History,
  User,
  Video,
  Image,
  Star,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ServiceProviderProfile() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [images, setImages] = useState([]);
  const [availability, setAvailability] = useState([]);

  // Dummy data
  const upcomingBookings = [
    { id: 1, customer: "Ravi Kumar", service: "Satyanarayan Puja", date: "2025-10-10", time: "10:00 AM", status: "Pending" },
    { id: 2, customer: "Priya Sharma", service: "Wedding Decoration", date: "2025-10-15", time: "6:00 PM", status: "Pending" },
  ];

  const bookingHistory = [
    { id: 1, customer: "Amit Singh", service: "Griha Pravesh Puja", date: "2025-09-20", status: "Completed" },
    { id: 2, customer: "Anjali Verma", service: "Catering", date: "2025-09-10", status: "Completed" },
  ];

  const reviews = [
    { id: 1, customer: "Ramesh Kumar", rating: 5, comment: "Excellent service!" },
    { id: 2, customer: "Sita Devi", rating: 4, comment: "Very professional." },
  ];

  const earningsData = [
    { month: "Jan", earnings: 2000 },
    { month: "Feb", earnings: 2500 },
    { month: "Mar", earnings: 1800 },
    { month: "Apr", earnings: 3000 },
  ];

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), content: newPost }, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 mt-12">
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

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { key: "upcoming", label: "Upcoming Bookings" },
          { key: "history", label: "Booking History" },
          { key: "posts", label: "Posts" },
          { key: "earnings", label: "Earnings" },
          { key: "reviews", label: "Reviews" },
          { key: "gallery", label: "Media Gallery" },
          { key: "availability", label: "Availability" },
          { key: "chat", label: "Chat" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 rounded-xl font-semibold whitespace-nowrap ${
              activeTab === tab.key ? "bg-[#FFD700] text-[#5C3A21]" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4 mt-4">
        {/* Upcoming Bookings */}
        {activeTab === "upcoming" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
            {upcomingBookings.map((b) => (
              <div key={b.id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold">{b.customer}</p>
                  <p className="text-sm">{b.service}</p>
                  <p className="text-xs text-gray-500">{b.date} • {b.time}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded">Accept</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking History */}
        {activeTab === "history" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
            {bookingHistory.map((b) => (
              <div key={b.id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold">{b.customer}</p>
                  <p className="text-sm">{b.service}</p>
                  <p className="text-xs text-gray-500">{b.date}</p>
                </div>
                <span className={`font-semibold ${b.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{b.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {activeTab === "posts" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
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
            <div className="mt-4 space-y-3">
              {posts.map((p) => (
                <div key={p.id} className="p-3 bg-yellow-50 rounded-lg shadow-sm">{p.content}</div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings */}
        {activeTab === "earnings" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5 text-[#5C3A21]" /> Earnings Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#5C3A21" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
            {reviews.map((r) => (
              <div key={r.id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold">{r.customer}</p>
                  <p className="text-sm">{r.comment}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400" />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media Gallery */}
        {activeTab === "gallery" && (
          <div className="bg-white p-4 rounded-2xl shadow-md flex overflow-x-auto gap-2">
            {images.length === 0 && <p className="text-gray-500">No media uploaded yet.</p>}
            {images.map((img) => (
              <img key={img.id} src={img.url} className="w-32 h-32 rounded-lg object-cover" />
            ))}
          </div>
        )}

        {/* Availability */}
        {activeTab === "availability" && (
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold flex items-center gap-2 mb-2"><Calendar className="w-5 h-5 text-[#5C3A21]" /> Set Availability</h3>
            <p className="text-sm text-gray-500 mb-2">Select dates and time slots when you are available for bookings.</p>
            <div className="flex flex-col gap-2">
              {["10:00 AM - 12:00 PM","12:00 PM - 02:00 PM","02:00 PM - 04:00 PM","04:00 PM - 06:00 PM"].map((slot) => (
                <label key={slot} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.includes(slot)}
                    onChange={(e) => {
                      if (e.target.checked) setAvailability([...availability, slot]);
                      else setAvailability(availability.filter((s) => s !== slot));
                    }}
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Chat */}
        {activeTab === "chat" && (
          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-3">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-[#5C3A21]" /> Customer Messages
            </h3>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto border rounded-lg p-2">
              <div className="bg-gray-100 p-2 rounded self-start">Ravi Kumar: Hello, I want to book Satyanarayan Puja.</div>
              <div className="bg-[#FFD700]/20 p-2 rounded self-end">You: Sure! Available on 10th Oct at 10 AM.</div>
              <div className="bg-gray-100 p-2 rounded self-start">Priya Sharma: Need decoration for wedding.</div>
            </div>
            <div className="flex gap-2 mt-2">
              <input type="text" placeholder="Type your message..." className="flex-1 border p-2 rounded-lg"/>
              <button className="bg-[#5C3A21] text-white px-4 py-2 rounded-lg">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
