import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Edit, Calendar, Heart, Package, Bell, HelpCircle, LogOut, MapPin, 
  Users, Gift, Star, Download, Trash2, Moon, Sun, Languages, 
  Share2, MessageCircle, Award, Clock, CreditCard, UserPlus
} from "lucide-react";
import { motion } from "framer-motion";

// ---------------- Editable Card ----------------
function EditableCard({ title, value, onSave, type = "text" }) {
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
          {type === "textarea" ? (
            <textarea
              className="border rounded px-2 py-1 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={3}
            />
          ) : (
            <input
              type={type}
              className="border rounded px-2 py-1 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button
              onClick={() => {
                onSave(inputValue);
                setEditMode(false);
              }}
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
        <p className="mt-1 text-[#5C3A21] break-words">{value}</p>
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

// ---------------- Tabs ----------------
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

// ---------------- Collapsible Section ----------------
function SectionCard({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
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

// ---------------- Countdown Timer ----------------
function CountdownTimer({ targetDate, eventName }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow">
      <h3 className="font-bold text-lg mb-2">{eventName}</h3>
      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.days || 0}</div>
          <div className="text-sm">Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.hours || 0}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.minutes || 0}</div>
          <div className="text-sm">Mins</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.seconds || 0}</div>
          <div className="text-sm">Secs</div>
        </div>
      </div>
      <button className="mt-3 w-full bg-white text-orange-500 py-2 rounded-lg font-semibold">
        Add to Calendar
      </button>
    </div>
  );
}

// ---------------- Badge Component ----------------
function Badge({ title, description, icon, achieved }) {
  return (
    <div className={`p-3 rounded-xl border ${achieved ? 
      "bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300" : 
      "bg-gray-100 border-gray-300 opacity-70"}`}>
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${achieved ? "bg-orange-500" : "bg-gray-400"}`}>
          {React.cloneElement(icon, { className: "w-4 h-4 text-white" })}
        </div>
        <div>
          <h4 className="font-semibold text-[#5C3A21]">{title}</h4>
          <p className="text-sm text-[#5C3A21]">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------- Address Card ----------------
function AddressCard({ address, isDefault, onEdit, onDelete, onSetDefault }) {
  return (
    <div className="bg-white/80 rounded-xl p-4 shadow border border-orange-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-[#5C3A21]">{address.name}</h4>
          <p className="text-sm text-[#5C3A21] mt-1">{address.address}</p>
          <p className="text-sm text-[#5C3A21]">{address.city}, {address.state} - {address.pincode}</p>
          <p className="text-sm text-[#5C3A21]">Phone: {address.phone}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(address)} className="text-orange-500">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(address.id)} className="text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        {isDefault ? (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default Address</span>
        ) : (
          <button 
            onClick={() => onSetDefault(address.id)}
            className="text-xs text-orange-500 underline"
          >
            Set as default
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------- Family Member Card ----------------
function FamilyMemberCard({ member, onEdit, onDelete }) {
  return (
    <div className="bg-white/80 rounded-xl p-4 shadow border border-orange-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-[#5C3A21]">{member.name}</h4>
          <p className="text-sm text-[#5C3A21] mt-1">Relation: {member.relation}</p>
          <p className="text-sm text-[#5C3A21]">DOB: {member.dob}</p>
          <p className="text-sm text-[#5C3A21]">Anniversary: {member.anniversary || "N/A"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(member)} className="text-orange-500">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(member.id)} className="text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Main Profile ----------------
export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Bookings");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [newFamily, setNewFamily] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement theme change logic here
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Hindi" : "English");
    // Implement language change logic here
  };

  const handleAddAddress = () => {
    // Implement address addition logic here
    setShowAddAddress(false);
    setNewAddress({});
  };

  const handleAddFamily = () => {
    // Implement family member addition logic here
    setShowAddFamily(false);
    setNewFamily({});
  };

  const handleDataExport = () => {
    // Implement data export logic here
    alert("Preparing your data for download...");
  };

  const handleAccountDeletion = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Implement account deletion logic here
      handleLogout();
    }
  };

  if (!user) return null;

  // Sample data - in a real app, this would come from your backend
  const userData = {
    ...user,
    coverImage: "src/assets/images/team 1.png",
    profileImage: "src/assets/images/sanskaraa app.png",
    stats: { bookings: 5, wishlist: 3, orders: 2, pujasCompleted: 7, contributions: 3 },
    bookings: [
      { id: 1, name: "Ganesh Puja", date: "1 Sep 2023", time: "10:00 AM", pandit: "Sharma Ji" },
      { id: 2, name: "Satyanarayan Puja", date: "5 Sep 2023", time: "11:30 AM", pandit: "Verma Ji" }
    ],
    wishlist: ["Havan Kit", "Puja Thali Set", "Rudraksha Mala"],
    orders: ["Ganesh Kit", "Decor Pack", "Incense Set"],
    rituals: {
      favoritePujas: "Ganesh Puja, Satyanarayan",
      panditLanguage: "Hindi",
      timeSlot: "Morning",
      festivalNotifications: "Enabled",
    },
    personalInfo: {
      dob: "15 Aug 1995",
      payment: "UPI",
      address: "123, Mumbai, Maharashtra",
      language: "Hindi",
    },
    appSettings: {
      notifications: "Enabled",
      theme: "Light Mode",
      appVersion: "v1.2.3",
      privacy: "Standard",
    },
    upcomingEvents: [
      { id: 1, name: "Ganesh Chaturthi Puja", date: "2023-09-19T10:00:00" },
      { id: 2, name: "Family Member Birthday", date: "2023-09-25T00:00:00" }
    ],
    badges: [
      { id: 1, title: "Devotee Level", description: "Completed 5+ pujas", icon: <Award />, achieved: true },
      { id: 2, title: "Top Contributor", description: "Donated to 3+ causes", icon: <Gift />, achieved: true },
      { id: 3, title: "Regular Practitioner", description: "Monthly rituals for 6 months", icon: <Calendar />, achieved: false }
    ],
    addresses: [
      { id: 1, name: "Home", address: "123 Main Street", city: "Mumbai", state: "Maharashtra", pincode: "400001", phone: "9876543210", isDefault: true },
      { id: 2, name: "Work", address: "456 Office Road", city: "Mumbai", state: "Maharashtra", pincode: "400002", phone: "9876543210", isDefault: false }
    ],
    familyMembers: [
      { id: 1, name: "Ramesh Kumar", relation: "Father", dob: "12/03/1965", anniversary: "" },
      { id: 2, name: "Sita Devi", relation: "Mother", dob: "25/07/1968", anniversary: "" },
      { id: 3, name: "Priya Singh", relation: "Spouse", dob: "14/02/1995", anniversary: "10/06/2020" }
    ],
    donations: [
      { id: 1, cause: "Temple Renovation", amount: "₹2,500", date: "15 Aug 2023" },
      { id: 2, cause: "Gau Seva", amount: "₹1,000", date: "5 Aug 2023" },
      { id: 3, cause: "Community Kitchen", amount: "₹1,500", date: "1 Aug 2023" }
    ],
    membership: {
      type: "Premium",
      renewalDate: "15 Oct 2023",
      status: "Active",
      benefits: ["Monthly kits", "Priority pandit booking", "10% discount"]
    },
    activityTimeline: [
      { id: 1, action: "Completed Ganesh Puja", date: "2 Sep 2023", details: "With Sharma Ji" },
      { id: 2, action: "Purchased Puja Kit", date: "30 Aug 2023", details: "Ganesh Festival Special" },
      { id: 3, action: "Received Blessings", date: "28 Aug 2023", details: "From Pandit Verma" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20 mt-12 dark:bg-gray-900 dark:text-white">
      {/* Cover */}
      <div className="relative h-40 bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-700 dark:to-yellow-700">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md">
          <Edit className="w-4 h-4 text-orange-500" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative flex flex-col items-center -mt-16">
        <div className="relative">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#FFD700] object-cover shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-white/80 p-1 rounded-full shadow-md">
            <Edit className="w-4 h-4 text-orange-500" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-[#5C3A21] dark:text-orange-200">{userData.name}</h2>
          <p className="text-[#5C3A21] dark:text-orange-200 text-sm">{userData.email}</p>
          <p className="text-[#5C3A21] dark:text-orange-200 text-sm">{userData.role}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4 flex justify-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 bg-white/90 border border-orange-200 rounded-full shadow-md"
        >
          {darkMode ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-orange-500" />}
        </button>
        <button 
          onClick={toggleLanguage}
          className="p-2 bg-white/90 border border-orange-200 rounded-full shadow-md"
        >
          <Languages className="w-5 h-5 text-orange-500" />
        </button>
        <button className="p-2 bg-white/90 border border-orange-200 rounded-full shadow-md">
          <Share2 className="w-5 h-5 text-orange-500" />
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 px-4 grid grid-cols-2 gap-3">
        {[
          { label: "Bookings", value: userData.stats.bookings, icon: <Calendar className="w-5 h-5" /> },
          { label: "Wishlist", value: userData.stats.wishlist, icon: <Heart className="w-5 h-5" /> },
          { label: "Orders", value: userData.stats.orders, icon: <Package className="w-5 h-5" /> },
          { label: "Pujas Done", value: userData.stats.pujasCompleted, icon: <Award className="w-5 h-5" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/90 border border-orange-200 rounded-xl p-3 shadow text-center dark:bg-gray-800 dark:border-orange-700">
            <div className="flex items-center justify-center text-orange-500 dark:text-orange-300">{stat.icon}</div>
            <p className="font-bold text-[#5C3A21] dark:text-orange-200 text-lg">{stat.value}</p>
            <p className="text-[#5C3A21] dark:text-orange-200 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold text-[#5C3A21] dark:text-orange-200 mb-2">Upcoming Events</h3>
        <div className="space-y-3">
          {userData.upcomingEvents.map(event => (
            <CountdownTimer 
              key={event.id} 
              targetDate={event.date} 
              eventName={event.name} 
            />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <Tabs tabs={["Bookings", "Wishlist", "Orders", "Timeline"]} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-4 space-y-3">
          {activeTab === "Bookings" && userData.bookings.map((b) => (
            <div key={b.id} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold text-[#5C3A21] dark:text-orange-200">{b.name}</h4>
                  <p className="text-sm text-[#5C3A21] dark:text-orange-200">{b.date} at {b.time}</p>
                  <p className="text-sm text-[#5C3A21] dark:text-orange-200">With {b.pandit}</p>
                </div>
                <button className="text-orange-500 dark:text-orange-300">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Wishlist" && userData.wishlist.map((w, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex justify-between">
                <span className="text-[#5C3A21] dark:text-orange-200">{w}</span>
                <button className="text-orange-500 dark:text-orange-300">
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Orders" && userData.orders.map((o, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex justify-between">
                <span className="text-[#5C3A21] dark:text-orange-200">{o}</span>
                <button className="text-orange-500 dark:text-orange-300">
                  <Package className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Timeline" && userData.activityTimeline.map((item) => (
            <div key={item.id} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-full dark:bg-orange-900">
                  <Clock className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5C3A21] dark:text-orange-200">{item.action}</h4>
                  <p className="text-sm text-[#5C3A21] dark:text-orange-200">{item.details}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="px-4 mt-6">
        <SectionCard title="Badges & Achievements" icon={<Award className="w-5 h-5 text-orange-500" />} defaultOpen={true}>
          <div className="grid grid-cols-1 gap-3">
            {userData.badges.map(badge => (
              <Badge 
                key={badge.id}
                title={badge.title}
                description={badge.description}
                icon={badge.icon}
                achieved={badge.achieved}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Address Management */}
      <div className="px-4 mt-6">
        <SectionCard title="Saved Addresses" icon={<MapPin className="w-5 h-5 text-orange-500" />}>
          <div className="space-y-4">
            {userData.addresses.map(address => (
              <AddressCard 
                key={address.id}
                address={address}
                isDefault={address.isDefault}
                onEdit={() => console.log("Edit address", address)}
                onDelete={() => console.log("Delete address", address.id)}
                onSetDefault={() => console.log("Set default address", address.id)}
              />
            ))}
            
            {showAddAddress ? (
              <div className="bg-white/80 rounded-xl p-4 shadow border border-orange-200">
                <h4 className="font-semibold text-[#5C3A21] mb-3">Add New Address</h4>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Address Name" 
                    className="w-full border rounded-lg px-3 py-2"
                    value={newAddress.name || ""}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  />
                  <textarea 
                    placeholder="Full Address" 
                    className="w-full border rounded-lg px-3 py-2"
                    rows={2}
                    value={newAddress.address || ""}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="border rounded-lg px-3 py-2"
                      value={newAddress.city || ""}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="State" 
                      className="border rounded-lg px-3 py-2"
                      value={newAddress.state || ""}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Pincode" 
                      className="border rounded-lg px-3 py-2"
                      value={newAddress.pincode || ""}
                      onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Phone" 
                      className="border rounded-lg px-3 py-2"
                      value={newAddress.phone || ""}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddAddress}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    >
                      Save Address
                    </button>
                    <button 
                      onClick={() => setShowAddAddress(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAddAddress(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-500 py-3 rounded-xl font-semibold border border-orange-200"
              >
                <MapPin className="w-5 h-5" /> Add New Address
              </button>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Family Members */}
      <div className="px-4 mt-6">
        <SectionCard title="Family Members" icon={<Users className="w-5 h-5 text-orange-500" />}>
          <div className="space-y-4">
            {userData.familyMembers.map(member => (
              <FamilyMemberCard 
                key={member.id}
                member={member}
                onEdit={() => console.log("Edit member", member)}
                onDelete={() => console.log("Delete member", member.id)}
              />
            ))}
            
            {showAddFamily ? (
              <div className="bg-white/80 rounded-xl p-4 shadow border border-orange-200">
                <h4 className="font-semibold text-[#5C3A21] mb-3">Add Family Member</h4>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full border rounded-lg px-3 py-2"
                    value={newFamily.name || ""}
                    onChange={(e) => setNewFamily({...newFamily, name: e.target.value})}
                  />
                  <select 
                    className="w-full border rounded-lg px-3 py-2"
                    value={newFamily.relation || ""}
                    onChange={(e) => setNewFamily({...newFamily, relation: e.target.value})}
                  >
                    <option value="">Select Relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Grandparent">Grandparent</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      placeholder="Date of Birth" 
                      className="border rounded-lg px-3 py-2"
                      value={newFamily.dob || ""}
                      onChange={(e) => setNewFamily({...newFamily, dob: e.target.value})}
                    />
                    <input 
                      type="date" 
                      placeholder="Anniversary (if applicable)" 
                      className="border rounded-lg px-3 py-2"
                      value={newFamily.anniversary || ""}
                      onChange={(e) => setNewFamily({...newFamily, anniversary: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddFamily}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    >
                      Save Member
                    </button>
                    <button 
                      onClick={() => setShowAddFamily(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAddFamily(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-500 py-3 rounded-xl font-semibold border border-orange-200"
              >
                <UserPlus className="w-5 h-5" /> Add Family Member
              </button>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Donation History */}
      <div className="px-4 mt-6">
        <SectionCard title="Donation History" icon={<Gift className="w-5 h-5 text-orange-500" />}>
          <div className="space-y-3">
            {userData.donations.map(donation => (
              <div key={donation.id} className="bg-white/80 rounded-xl p-4 shadow border border-orange-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#5C3A21]">{donation.cause}</h4>
                    <p className="text-sm text-[#5C3A21]">{donation.date}</p>
                  </div>
                  <span className="font-bold text-green-600">{donation.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Membership */}
      <div className="px-4 mt-6">
        <SectionCard title="Membership" icon={<Star className="w-5 h-5 text-orange-500" />}>
          <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold">{userData.membership.type} Membership</h4>
                <p className="text-sm">Renewal: {userData.membership.renewalDate}</p>
                <p className="text-sm">Status: <span className="font-semibold">{userData.membership.status}</span></p>
              </div>
              <div className="text-right">
                <button className="bg-white text-orange-500 px-3 py-1 rounded-lg text-sm font-semibold">
                  Manage
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h5 className="font-semibold text-sm">Benefits:</h5>
              <ul className="text-sm mt-1 space-y-1">
                {userData.membership.benefits.map((benefit, i) => (
                  <li key={i}>• {benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Editable Sections */}
      <div className="px-4 mt-6 space-y-4">
        <SectionCard title="Ritual Preferences" icon={<Calendar className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Favorite Pujas" value={userData.rituals.favoritePujas} onSave={(val) => console.log(val)} />
          <EditableCard title="Pandit Language" value={userData.rituals.panditLanguage} onSave={(val) => console.log(val)} />
          <EditableCard title="Preferred Time Slot" value={userData.rituals.timeSlot} onSave={(val) => console.log(val)} />
          <EditableCard title="Festival Notifications" value={userData.rituals.festivalNotifications} onSave={(val) => console.log(val)} />
        </SectionCard>

        <SectionCard title="Personal Info" icon={<MapPin className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Date of Birth" value={userData.personalInfo.dob} onSave={(val) => console.log(val)} />
          <EditableCard title="Payment Method" value={userData.personalInfo.payment} onSave={(val) => console.log(val)} />
          <EditableCard title="Address" value={userData.personalInfo.address} onSave={(val) => console.log(val)} type="textarea" />
          <EditableCard title="Language" value={userData.personalInfo.language} onSave={(val) => console.log(val)} />
        </SectionCard>

        <SectionCard title="App Settings" icon={<Bell className="w-5 h-5 text-orange-500" />}>
          <EditableCard title="Notifications" value={userData.appSettings.notifications} onSave={(val) => console.log(val)} />
          <EditableCard title="Theme" value={darkMode ? "Dark Mode" : "Light Mode"} onSave={(val) => console.log(val)} />
          <EditableCard title="App Version" value={userData.appSettings.appVersion} onSave={(val) => console.log(val)} />
          <EditableCard title="Privacy" value={userData.appSettings.privacy} onSave={(val) => console.log(val)} />
        </SectionCard>
      </div>

      {/* Data Privacy */}
      <div className="px-4 mt-6">
        <SectionCard title="Data Privacy" icon={<Download className="w-5 h-5 text-orange-500" />}>
          <div className="space-y-3">
            <button 
              onClick={handleDataExport}
              className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-600 py-3 rounded-xl font-semibold"
            >
              <Download className="w-5 h-5" /> Download My Data
            </button>
            <button 
              onClick={handleAccountDeletion}
              className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-3 rounded-xl font-semibold"
            >
              <Trash2 className="w-5 h-5" /> Delete Account
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-3 mb-6">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.01] transition">
          <MessageCircle className="w-5 h-5" /> Community Forum
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-[1.01] transition">
          <HelpCircle className="w-5 h-5" /> Help & Support
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}