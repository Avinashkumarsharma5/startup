import React, { useState } from "react";
import { Bell, X } from "lucide-react";

export default function SanskaraaNotifications() {
  const [showPopup, setShowPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Puja Booking Confirmed 🙏",
      message: "Your Satyanarayan Puja is confirmed for 20 Oct, 9 AM.",
      time: "2 hrs ago",
    },
    {
      id: 2,
      title: "Special Offer 🎉",
      message: "Get 10% off on Navratri Puja Kits. Limited time offer!",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Reminder ⏰",
      message: "Tomorrow: Ganesh Puja with Pandit Sharma Ji at 8 AM.",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6 font-serif text-[#5C3A21] mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-12">
        <h1 className="text-2xl font-bold">🔔 Notifications</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-[#C19A6B] text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          Show Popup
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
          >
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p className="text-sm text-[#7B5A38]">{note.message}</p>
            <p className="text-xs text-right text-[#A98A6E] mt-1">{note.time}</p>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-[#5C3A21] text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
          Booking Confirmed! 🙏
        </div>
      )}

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#FFF8E7] p-6 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <div className="flex justify-end">
              <button onClick={() => setShowPopup(false)}>
                <X className="text-[#5C3A21]" />
              </button>
            </div>
            <Bell className="mx-auto text-[#C19A6B] w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold mb-2">
              Puja Confirmed Successfully 🙏
            </h2>
            <p className="text-sm text-[#7B5A38] mb-4">
              Your booking with Pandit Sharma Ji is scheduled for 20 Oct, 9 AM.
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              }}
              className="bg-[#C19A6B] text-white px-6 py-2 rounded-xl hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
