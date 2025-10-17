// src/components/SanskaraaNotifications.jsx
import React, { useState, useEffect } from "react";
import { Bell, X, Clock, Calendar, Gift, CheckCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SanskaraaNotifications() {
  const [showPopup, setShowPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // Load notifications from localStorage or use default
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("sanskaraa-notifications");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Puja Booking Confirmed 🙏",
        message: "Your Satyanarayan Puja is confirmed for 20 Oct, 9 AM.",
        time: "2 hrs ago",
        type: "Booking",
        read: false,
        image: "/images/puja-icon.png",
        bookingId: "BK001",
        scheduled: false
      },
      {
        id: 2,
        title: "Special Offer 🎉",
        message: "Get 10% off on Navratri Puja Kits. Limited time offer!",
        time: "1 day ago",
        type: "Offer",
        read: false,
        image: "/images/offer-banner.png",
        offerCode: "NAVRATRI10",
        scheduled: false
      },
      {
        id: 3,
        title: "Reminder ⏰",
        message: "Tomorrow: Ganesh Puja with Pandit Sharma Ji at 8 AM.",
        time: "2 days ago",
        type: "Reminder",
        read: true,
        image: "/images/reminder-icon.png",
        scheduled: true
      },
      {
        id: 4,
        title: "Upcoming Puja 🔔",
        message: "Diwali Lakshmi Puja scheduled for next week.",
        time: "3 days ago",
        type: "Booking",
        read: false,
        image: "/images/diya-icon.png",
        scheduled: true
      }
    ];
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem("sanskaraa-notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "All" 
    ? notifications 
    : notifications.filter(note => note.type === activeTab);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(note => ({ ...note, read: true })));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Delete single notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(note => note.id !== id));
  };

  // Play notification sound
  const playNotificationSound = () => {
    const audio = new Audio("/sounds/notification-ding.mp3");
    audio.play().catch(() => console.log("Audio play failed"));
  };

  // Simulate new notification
  const addMockNotification = () => {
    const newNotification = {
      id: Date.now(),
      title: "New Puja Available! 🪔",
      message: "Special Ganesh Chaturthi puja just added to our services.",
      time: "Just now",
      type: "Offer",
      read: false,
      image: "/images/ganesh-icon.png",
      scheduled: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    playNotificationSound();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Get icon based on notification type
  const getTypeIcon = (type) => {
    switch (type) {
      case "Booking": return "🙏";
      case "Offer": return "🎉";
      case "Reminder": return "⏰";
      default: return "🔔";
    }
  };

  return (
    <div className="min-h-screen bg-glow p-4 sm:p-6 font-serif text-[#5C3A21] mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 mt-12 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#C19A6B] p-2 rounded-full">
            <Bell className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="bg-[#C19A6B] text-white px-4 py-2 rounded-xl hover:opacity-90 text-sm transition-all"
          >
            Mark All Read
          </button>
          <button
            onClick={addMockNotification}
            className="bg-[#5C3A21] text-white px-4 py-2 rounded-xl hover:opacity-90 text-sm transition-all"
          >
            Test Notification
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["All", "Booking", "Offer", "Reminder"].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[#C19A6B] text-white border-transparent shadow-lg"
                : "border-[#C19A6B] text-[#5C3A21] hover:bg-[#C19A6B]/10"
            }`}
          >
            {getTypeIcon(tab)} {tab}
          </motion.button>
        ))}
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={clearAllNotifications}
            className="text-sm underline text-[#C19A6B] hover:text-[#5C3A21] flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <AnimatePresence>
          {filteredNotifications.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 100 }}
              transition={{ duration: 0.3 }}
              className={`bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border-l-4 ${
                note.scheduled 
                  ? 'border-l-yellow-400 bg-yellow-50' 
                  : note.type === 'Booking' 
                    ? 'border-l-green-400' 
                    : note.type === 'Offer' 
                      ? 'border-l-orange-400' 
                      : 'border-l-blue-400'
              } ${!note.read ? 'ring-2 ring-[#C19A6B]/20' : ''}`}
            >
              <div className="flex items-start gap-3">
                {/* Notification Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={note.image} 
                    alt={note.type}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C19A6B]/20"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-semibold text-lg flex items-center gap-2">
                        {note.title}
                        {!note.read && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                      </h2>
                      <p className="text-sm text-[#7B5A38] mt-1">{note.message}</p>
                    </div>
                    
                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNotification(note.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Actions and Time */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      {(note.type === "Booking" || note.scheduled) && (
                        <button
                          onClick={() => navigate(`/booking/${note.bookingId || 'details'}`)}
                          className="text-sm text-[#C19A6B] underline hover:text-[#5C3A21] transition-colors"
                        >
                          View Details
                        </button>
                      )}
                      {note.type === "Offer" && note.offerCode && (
                        <button
                          onClick={() => navigate('/offers')}
                          className="text-sm text-[#C19A6B] underline hover:text-[#5C3A21] transition-colors"
                        >
                          Use Code: {note.offerCode}
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[#A98A6E] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.time}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 text-[#7B5A38] italic"
          >
            <div className="text-6xl mb-4">🕉️</div>
            <p className="text-xl">No notifications found</p>
            <p className="text-sm mt-2">Om Shanti - Peace and blessings to you</p>
            {activeTab !== "All" && (
              <button
                onClick={() => setActiveTab("All")}
                className="mt-4 text-[#C19A6B] underline hover:text-[#5C3A21]"
              >
                View all notifications
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-5 right-5 bg-[#5C3A21] text-white px-6 py-4 rounded-xl shadow-2xl max-w-sm z-50"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <div>
                <p className="font-semibold">New Notification! 🔔</p>
                <p className="text-sm text-gray-200">Check your notifications for updates</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#FFF8E7] p-6 rounded-2xl shadow-2xl max-w-md w-full text-center border-2 border-[#C19A6B]"
            >
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-[#5C3A21] hover:text-[#C19A6B] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <Bell className="mx-auto text-[#C19A6B] w-12 h-12 mb-4" />
              </motion.div>
              
              <h2 className="text-xl font-semibold mb-2">
                Puja Confirmed Successfully 🙏
              </h2>
              <p className="text-sm text-[#7B5A38] mb-6">
                Your booking with Pandit Sharma Ji is scheduled for 20 Oct, 9 AM.
                You'll receive a reminder 1 hour before the puja.
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  }}
                  className="bg-[#C19A6B] text-white px-6 py-2 rounded-xl hover:opacity-90 transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}