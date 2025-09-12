import React, { useState } from "react";
import { Bell, Edit, Heart, Calendar, Package, MapPin, CreditCard, LogOut, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

// ---------------- Editable Card Component ----------------
function EditableCard({ title, value, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white/80 rounded-xl p-4 shadow border border-orange-200 hover:shadow-md relative"
    >
      <h4 className="text-sm text-[#5C3A21] font-semibold">{title}</h4>
      {editMode ? (
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={() => { onSave(inputValue); setEditMode(false); }}
              className="bg-[#FFA500] text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-1 text-[#5C3A21]">{value}</p>
      )}
      {!editMode && (
        <button
          className="absolute top-3 right-3 text-[#FFA500]"
          onClick={() => setEditMode(true)}
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

// ---------------- Tabs Component ----------------
function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex overflow-x-auto space-x-2 mt-4 border-b border-orange-200 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 font-semibold rounded-full transition ${
            activeTab === tab
              ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow"
              : "bg-[#FFF7E0] text-[#5C3A21] border border-orange-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ---------------- Collapsible Section Card ----------------
function SectionCard({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/90 rounded-xl shadow border border-orange-200 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-[#FFF7E0]"
        onClick={() => setOpen(!open)}
      >
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5C3A21]">
          {icon}
          {title}
        </h3>
        <span className="text-[#5C3A21] font-bold">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

// ---------------- UserProfile Component ----------------
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Bookings");

  const userData = {
    name: "Avinash Kumar",
    email: "avinash@example.com",
    phone: "+91 9876543210",
    coverImage: "https://images.unsplash.com/photo-1603791452906-bb8de6f7da57?ixlib=rb-4.0.3",
    profileImage: "https://th.bing.com/th/id/OIP.EPUDQL3xjDfYLwuNm9L1fQHaLH?w=186&h=279&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    stats: { bookings: 5, wishlist: 3, orders: 2 },
    bookings: ["Ganesh Puja - 1 Sep", "Satyanarayan Puja - 5 Sep"],
    wishlist: ["Havan Kit", "Puja Thali Set"],
    orders: ["Ganesh Kit", "Decor Pack"],
    rituals: { favoritePujas: "Ganesh Puja, Satyanarayan", panditLanguage: "Hindi", timeSlot: "Morning", festivalNotifications: "Enabled" },
    personalInfo: { dob: "15 Aug 1995", payment: "UPI", address: "123, Mumbai, Maharashtra", language: "Hindi" },
    appSettings: { notifications: "Enabled", theme: "Light Mode", appVersion: "v1.2.3", privacy: "Standard" },
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20">

      {/* Cover Image */}
      <div className="relative h-40 bg-gradient-to-r from-orange-300 to-yellow-200">
        <img src={userData.coverImage} alt="Cover" className="w-full h-full object-cover opacity-60" />
      </div>

      {/* Profile Image & Info */}
      <div className="relative flex flex-col items-center -mt-16">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-[#FFD700] object-cover shadow-lg"
        />
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-[#5C3A21]">{userData.name}</h2>
          <p className="text-[#5C3A21] text-sm">{userData.email}</p>
          <p className="text-[#5C3A21] text-sm">{userData.phone}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 px-4 flex justify-around">
        {[
          { label: "Bookings", value: userData.stats.bookings, icon: <Calendar className="w-5 h-5" /> },
          { label: "Wishlist", value: userData.stats.wishlist, icon: <Heart className="w-5 h-5" /> },
          { label: "Orders", value: userData.stats.orders, icon: <Package className="w-5 h-5" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/90 border border-orange-200 rounded-xl px-5 py-3 shadow text-center">
            <div className="flex items-center justify-center text-orange-500">{stat.icon}</div>
            <p className="font-bold text-[#5C3A21] text-lg">{stat.value}</p>
            <p className="text-[#5C3A21] text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <Tabs tabs={["Bookings", "Wishlist", "Orders"]} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-4 space-y-3">
          {activeTab === "Bookings" && userData.bookings.map((b, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200">{b}</div>
          ))}
          {activeTab === "Wishlist" && userData.wishlist.map((w, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200">{w}</div>
          ))}
          {activeTab === "Orders" && userData.orders.map((o, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200">{o}</div>
          ))}
        </div>
      </div>

      {/* Collapsible Section Cards */}
      <div className="px-4 mt-6 space-y-4">
        <SectionCard title="Ritual Preferences" icon={<Calendar className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Favorite Pujas" value={userData.rituals.favoritePujas} onSave={(val)=>console.log(val)} />
          <EditableCard title="Pandit Language" value={userData.rituals.panditLanguage} onSave={(val)=>console.log(val)} />
          <EditableCard title="Time Slot" value={userData.rituals.timeSlot} onSave={(val)=>console.log(val)} />
          <EditableCard title="Festival Notifications" value={userData.rituals.festivalNotifications} onSave={(val)=>console.log(val)} />
        </SectionCard>

        <SectionCard title="Personal Info" icon={<MapPin className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Date of Birth" value={userData.personalInfo.dob} onSave={(val)=>console.log(val)} />
          <EditableCard title="Payment Method" value={userData.personalInfo.payment} onSave={(val)=>console.log(val)} />
          <EditableCard title="Address" value={userData.personalInfo.address} onSave={(val)=>console.log(val)} />
          <EditableCard title="Language" value={userData.personalInfo.language} onSave={(val)=>console.log(val)} />
        </SectionCard>

        <SectionCard title="App Settings" icon={<Bell className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Notifications" value={userData.appSettings.notifications} onSave={(val)=>console.log(val)} />
          <EditableCard title="Theme" value={userData.appSettings.theme} onSave={(val)=>console.log(val)} />
          <EditableCard title="App Version" value={userData.appSettings.appVersion} onSave={(val)=>console.log(val)} />
          <EditableCard title="Privacy" value={userData.appSettings.privacy} onSave={(val)=>console.log(val)} />
        </SectionCard>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.01] transition">
          <HelpCircle className="w-5 h-5" /> Help & Support
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-red-600 transition">
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
