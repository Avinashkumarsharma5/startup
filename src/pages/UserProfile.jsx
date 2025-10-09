import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Edit, Calendar, Heart, Package, Bell, HelpCircle, LogOut, MapPin, 
  Users, Gift, Star, Download, Trash2, Moon, Sun, Languages, 
  Share2, MessageCircle, Award, Clock, CreditCard, UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- Editable Card ----------------
function EditableCard({ title, value, onSave, type = "text" }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white/90 dark:bg-gray-700 rounded-xl p-3 sm:p-4 shadow border border-orange-200 dark:border-gray-600 hover:shadow-md relative"
    >
      <h4 className="text-sm text-[#5C3A21] dark:text-gray-300 font-semibold">{title}</h4>
      {editMode ? (
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          {type === "textarea" ? (
            <textarea
              className="border rounded px-2 py-1 w-full dark:bg-gray-600 dark:text-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={2} // Reduced rows for better responsiveness
            />
          ) : (
            <input
              type={type}
              className="border rounded px-2 py-1 w-full dark:bg-gray-600 dark:text-white"
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
              className="bg-[#FFA500] text-white px-2 py-1 rounded text-sm flex-shrink-0"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm flex-shrink-0"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-1 text-[#5C3A21] dark:text-gray-200 text-sm break-words">{value}</p>
      )}
      {!editMode && (
        <button
          className="absolute top-3 right-3 text-[#FFA500] p-1"
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
    <div className="flex overflow-x-auto space-x-2 mt-4 border-b border-orange-200 dark:border-gray-700 pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-2 text-sm font-semibold rounded-full transition flex-shrink-0 whitespace-nowrap ${
            activeTab === tab
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-[#5C3A21] dark:text-gray-300 border border-orange-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-gray-700"
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
    <div className="bg-white/90 dark:bg-gray-800 rounded-xl shadow border border-orange-200 dark:border-gray-700 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-[#FFF7E0] dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 transition"
        onClick={() => setOpen(!open)}
      >
        <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#5C3A21] dark:text-orange-200">
          {React.cloneElement(icon, { className: "w-5 h-5 text-orange-500 dark:text-orange-300" })}
          {title}
        </h3>
        <span className="text-[#5C3A21] dark:text-orange-200 font-bold text-lg">{open ? "−" : "+"}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden p-4 space-y-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow-lg dark:from-orange-600 dark:to-yellow-600">
      <h3 className="font-bold text-base sm:text-lg mb-2">{eventName}</h3>
      <div className="flex justify-between gap-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center bg-white/20 p-2 rounded-lg flex-1 min-w-[50px]">
            <div className="text-xl sm:text-2xl font-bold">{value || 0}</div>
            <div className="text-xs sm:text-sm capitalize">{unit}</div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full bg-white text-orange-500 dark:text-orange-700 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition">
        Add to Calendar
      </button>
    </div>
  );
}

// ---------------- Badge Component ----------------
function Badge({ title, description, icon, achieved }) {
  return (
    <div className={`p-3 rounded-xl border ${achieved ? 
      "bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700" : 
      "bg-gray-100 border-gray-300 opacity-70 dark:bg-gray-700 dark:border-gray-600"}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full flex-shrink-0 ${achieved ? "bg-orange-500" : "bg-gray-400"}`}>
          {React.cloneElement(icon, { className: "w-4 h-4 text-white" })}
        </div>
        <div>
          <h4 className="font-semibold text-[#5C3A21] dark:text-gray-200 text-sm">{title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------- Address Card ----------------
function AddressCard({ address, isDefault, onEdit, onDelete, onSetDefault }) {
  return (
    <div className="bg-white/90 dark:bg-gray-700 rounded-xl p-4 shadow border border-orange-200 dark:border-gray-600">
      <div className="flex justify-between items-start">
        <div className="text-sm dark:text-gray-300">
          <h4 className="font-semibold text-base text-[#5C3A21] dark:text-orange-200">{address.name}</h4>
          <p className="mt-1">{address.address}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>Phone: {address.phone}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => onEdit(address)} className="text-orange-500 p-1">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(address.id)} className="text-red-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        {isDefault ? (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Default Address</span>
        ) : (
          <button 
            onClick={() => onSetDefault(address.id)}
            className="text-xs text-orange-500 underline hover:text-orange-700 transition"
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
    <div className="bg-white/90 dark:bg-gray-700 rounded-xl p-4 shadow border border-orange-200 dark:border-gray-600">
      <div className="flex justify-between items-start">
        <div className="text-sm dark:text-gray-300">
          <h4 className="font-semibold text-base text-[#5C3A21] dark:text-orange-200">{member.name}</h4>
          <p className="mt-1">Relation: <span className="font-medium">{member.relation}</span></p>
          <p>DOB: {member.dob}</p>
          <p>Anniversary: {member.anniversary || "N/A"}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => onEdit(member)} className="text-orange-500 p-1">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(member.id)} className="text-red-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
      </div>
    </div>
  );
}

// ---------------- Form Input Component (Reusable) ----------------
function FormInput({ type, placeholder, value, onChange, rows = 1 }) {
  return rows > 1 ? (
    <textarea
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
      rows={rows}
      value={value}
      onChange={onChange}
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
      value={value}
      onChange={onChange}
    />
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
    const storedUser = localStorage.getItem("loggedInUser");
    let initialUser = null;
    try {
        initialUser = JSON.parse(storedUser);
    } catch (e) {
        // console.error("Error parsing user data:", e);
    }

    if (!initialUser || !initialUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(initialUser);
      // Initialize dark mode from user settings if available
      if (initialUser.appSettings && initialUser.appSettings.theme === 'Dark Mode') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newState = !prev;
      document.documentElement.classList.toggle('dark', newState);
      // Update local storage/user state mock
      if (user) setUser(prevUser => ({ 
        ...prevUser, 
        appSettings: { 
          ...prevUser.appSettings, 
          theme: newState ? 'Dark Mode' : 'Light Mode' 
        } 
      }));
      return newState;
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "English" ? "Hindi" : "English"));
    // Implement language change logic here
  };

  const handleAddAddress = () => {
    // Simple validation mock
    if (!newAddress.name || !newAddress.address || !newAddress.pincode) {
      alert("Please fill required address fields.");
      return;
    }
    // Logic to add newAddress to userData.addresses
    console.log("Adding address:", newAddress);
    setShowAddAddress(false);
    setNewAddress({});
  };

  const handleAddFamily = () => {
    // Simple validation mock
    if (!newFamily.name || !newFamily.relation || !newFamily.dob) {
      alert("Please fill required family member fields.");
      return;
    }
    // Logic to add newFamily to userData.familyMembers
    console.log("Adding family member:", newFamily);
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

  // Sample data (mocked from initial state for demonstration)
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
      theme: darkMode ? "Dark Mode" : "Light Mode",
      appVersion: "v1.2.3",
      privacy: "Standard",
    },
    upcomingEvents: [
      { id: 1, name: "Ganesh Chaturthi Puja", date: "2025-10-15T10:00:00" }, // Updated date for demo
      { id: 2, name: "Family Member Birthday", date: "2025-10-25T00:00:00" } // Updated date for demo
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
    <div className="min-h-screen bg-[#FFF8F0] pb-20 pt-12 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image Section */}
        <div className="relative h-40 sm:h-56 bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-700 dark:to-yellow-700">
          <img
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md hover:scale-110 transition">
            <Edit className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        {/* Profile Info & Avatar */}
        <div className="relative flex flex-col items-center -mt-16 px-4">
          <div className="relative">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#FFD700] object-cover shadow-xl"
            />
            <button className="absolute bottom-0 right-0 bg-white/80 p-1 rounded-full shadow-md hover:scale-110 transition">
              <Edit className="w-4 h-4 text-orange-500" />
            </button>
            
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#5C3A21] dark:text-orange-200">{userData.name}</h2>
            <p className="text-[#5C3A21] dark:text-orange-200 text-sm sm:text-base">{userData.email}</p>
            <p className="text-[#5C3A21] dark:text-orange-200 text-sm italic">{userData.role}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6 flex justify-center gap-3 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-3 bg-white/90 dark:bg-gray-700 border border-orange-200 dark:border-gray-600 rounded-full shadow-md hover:scale-105 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-orange-500" />}
          </button>
          <button 
            onClick={toggleLanguage}
            className="p-3 bg-white/90 dark:bg-gray-700 border border-orange-200 dark:border-gray-600 rounded-full shadow-md hover:scale-105 transition"
          >
            <Languages className="w-5 h-5 text-orange-500" />
          </button>
          <button className="p-3 bg-white/90 dark:bg-gray-700 border border-orange-200 dark:border-gray-600 rounded-full shadow-md hover:scale-105 transition">
            <Share2 className="w-5 h-5 text-orange-500" />
          </button>
        </div>

        {/* Stats (Responsive Grid) */}
        <div className="mt-6 px-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Bookings", value: userData.stats.bookings, icon: <Calendar /> },
            { label: "Wishlist", value: userData.stats.wishlist, icon: <Heart /> },
            { label: "Orders", value: userData.stats.orders, icon: <Package /> },
            { label: "Pujas Done", value: userData.stats.pujasCompleted, icon: <Award /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/90 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 shadow text-center">
              <div className="flex items-center justify-center text-orange-500 dark:text-orange-300 w-full mb-1">
                {React.cloneElement(stat.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 mx-auto" })}
              </div>
              <p className="font-bold text-[#5C3A21] dark:text-orange-200 text-lg sm:text-xl">{stat.value}</p>
              <p className="text-[#5C3A21] dark:text-orange-200 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Events (Full Width) */}
        <div className="px-4 mt-6">
          <h3 className="text-xl font-bold text-[#5C3A21] dark:text-orange-200 mb-3">Upcoming Events</h3>
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

        {/* Main Content: Tabs and Collapsible Sections */}
        <div className="px-4 mt-6">
          {/* Tabs */}
          <Tabs tabs={["Bookings", "Wishlist", "Orders", "Timeline"]} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4 space-y-3">
            {/* Tab Content */}
            {activeTab === "Bookings" && userData.bookings.map((b) => (
              <div key={b.id} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#5C3A21] dark:text-orange-200">{b.name}</h4>
                    <p className="text-sm text-[#5C3A21] dark:text-orange-200">{b.date} at {b.time}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">With {b.pandit}</p>
                </div>
                <button className="text-orange-500 dark:text-orange-300 p-1">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Wishlist" && userData.wishlist.map((w, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex justify-between items-center">
                <span className="text-[#5C3A21] dark:text-orange-200 font-medium">{w}</span>
                <button className="text-orange-500 dark:text-orange-300 p-1">
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Orders" && userData.orders.map((o, i) => (
            <div key={i} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex justify-between items-center">
                <span className="text-[#5C3A21] dark:text-orange-200 font-medium">{o}</span>
                <button className="text-orange-500 dark:text-orange-300 p-1">
                  <Package className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === "Timeline" && userData.activityTimeline.map((item) => (
            <div key={item.id} className="bg-white/90 p-4 rounded-xl shadow border border-orange-200 dark:bg-gray-800 dark:border-orange-700">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-full dark:bg-orange-900 flex-shrink-0">
                  <Clock className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5C3A21] dark:text-orange-200 text-sm">{item.action}</h4>
                  <p className="text-xs text-[#5C3A21] dark:text-orange-200">{item.details}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Badges & Achievements */}
        <div className="px-4 mt-6">
          <SectionCard title="Badges & Achievements" icon={<Award />} defaultOpen={true}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
          <SectionCard title="Saved Addresses" icon={<MapPin />}>
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
                <div className="bg-white/90 dark:bg-gray-700 rounded-xl p-4 shadow border border-orange-200 dark:border-gray-600">
                  <h4 className="font-semibold text-lg text-[#5C3A21] dark:text-orange-200 mb-3">Add New Address</h4>
                  <div className="space-y-3">
                    <FormInput type="text" placeholder="Address Name (e.g., Home)" value={newAddress.name || ""} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} />
                    <FormInput type="text" placeholder="Full Address" rows={2} value={newAddress.address || ""} onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                      <FormInput type="text" placeholder="City" value={newAddress.city || ""} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} />
                      <FormInput type="text" placeholder="State" value={newAddress.state || ""} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormInput type="text" placeholder="Pincode" value={newAddress.pincode || ""} onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})} />
                      <FormInput type="tel" placeholder="Phone" value={newAddress.phone || ""} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={handleAddAddress}
                        className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
                      >
                        Save Address
                      </button>
                      <button 
                        onClick={() => setShowAddAddress(false)}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAddAddress(true)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200 dark:border-orange-700 hover:bg-orange-200 transition text-sm sm:text-base"
                >
                  <MapPin className="w-5 h-5" /> Add New Address
                </button>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Family Members */}
        <div className="px-4 mt-6">
          <SectionCard title="Family Members" icon={<Users />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.familyMembers.map(member => (
                <FamilyMemberCard 
                  key={member.id}
                  member={member}
                  onEdit={() => console.log("Edit member", member)}
                  onDelete={() => console.log("Delete member", member.id)}
                />
              ))}
            </div>
            
            {/* Add Family Member Form */}
            {showAddFamily ? (
              <div className="bg-white/90 dark:bg-gray-700 rounded-xl p-4 shadow border border-orange-200 dark:border-gray-600">
                <h4 className="font-semibold text-lg text-[#5C3A21] dark:text-orange-200 mb-3">Add Family Member</h4>
                <div className="space-y-3">
                  <FormInput type="text" placeholder="Full Name" value={newFamily.name || ""} onChange={(e) => setNewFamily({...newFamily, name: e.target.value})} />
                  <select 
                    className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    value={newFamily.relation || ""}
                    onChange={(e) => setNewFamily({...newFamily, relation: e.target.value})}
                  >
                    <option value="">Select Relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormInput type="date" placeholder="Date of Birth" value={newFamily.dob || ""} onChange={(e) => setNewFamily({...newFamily, dob: e.target.value})} />
                    <FormInput type="date" placeholder="Anniversary (if applicable)" value={newFamily.anniversary || ""} onChange={(e) => setNewFamily({...newFamily, anniversary: e.target.value})} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleAddFamily}
                      className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
                    >
                      Save Member
                    </button>
                    <button 
                      onClick={() => setShowAddFamily(false)}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAddFamily(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200 dark:border-orange-700 hover:bg-orange-200 transition text-sm sm:text-base"
              >
                <UserPlus className="w-5 h-5" /> Add Family Member
              </button>
            )}
          </SectionCard>
        </div>

        {/* Donations & Membership (Side by Side on Desktop) */}
        <div className="px-4 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donation History */}
          <SectionCard title="Donation History" icon={<Gift />}>
            <div className="space-y-3">
              {userData.donations.map(donation => (
                <div key={donation.id} className="bg-white/90 dark:bg-gray-700 rounded-xl p-3 shadow border border-orange-200 dark:border-gray-600">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <h4 className="font-semibold text-[#5C3A21] dark:text-orange-200">{donation.cause}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{donation.date}</p>
                    </div>
                    <span className="font-bold text-green-600">{donation.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Membership */}
          <SectionCard title="Membership" icon={<Star />}>
            <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow-lg dark:from-orange-600 dark:to-yellow-600">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{userData.membership.type} Membership</h4>
                  <p className="text-sm">Renewal: {userData.membership.renewalDate}</p>
                  <p className="text-sm">Status: <span className="font-semibold">{userData.membership.status}</span></p>
                </div>
                <div className="text-right">
                  <button className="bg-white text-orange-500 dark:text-orange-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
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

        {/* Editable Sections (Side by Side on Desktop) */}
        <div className="px-4 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Ritual Preferences" icon={<Calendar />}>
            <EditableCard title="Favorite Pujas" value={userData.rituals.favoritePujas} onSave={(val) => console.log(val)} />
            <EditableCard title="Pandit Language" value={userData.rituals.panditLanguage} onSave={(val) => console.log(val)} />
            <EditableCard title="Preferred Time Slot" value={userData.rituals.timeSlot} onSave={(val) => console.log(val)} />
            <EditableCard title="Festival Notifications" value={userData.rituals.festivalNotifications} onSave={(val) => console.log(val)} />
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="Personal Info" icon={<MapPin />}>
              <EditableCard title="Date of Birth" value={userData.personalInfo.dob} onSave={(val) => console.log(val)} />
              <EditableCard title="Payment Method" value={userData.personalInfo.payment} onSave={(val) => console.log(val)} />
              <EditableCard title="Address" value={userData.personalInfo.address} onSave={(val) => console.log(val)} type="textarea" />
              <EditableCard title="Language" value={userData.personalInfo.language} onSave={(val) => console.log(val)} />
            </SectionCard>

            <SectionCard title="App Settings" icon={<Bell />}>
              <EditableCard title="Notifications" value={userData.appSettings.notifications} onSave={(val) => console.log(val)} />
              <EditableCard title="Theme" value={darkMode ? "Dark Mode" : "Light Mode"} onSave={(val) => console.log(val)} />
              <EditableCard title="App Version" value={userData.appSettings.appVersion} onSave={(val) => console.log(val)} />
              <EditableCard title="Privacy" value={userData.appSettings.privacy} onSave={(val) => console.log(val)} />
            </SectionCard>
          </div>
        </div>

        {/* Data Privacy */}
        <div className="px-4 mt-6">
          <SectionCard title="Data & Account Management" icon={<Download />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button 
                onClick={handleDataExport}
                className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 py-3 rounded-xl font-semibold hover:bg-blue-200 transition text-sm sm:text-base"
              >
                <Download className="w-5 h-5" /> Download My Data
              </button>
              <button 
                onClick={handleAccountDeletion}
                className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300 py-3 rounded-xl font-semibold hover:bg-red-200 transition text-sm sm:text-base"
              >
                <Trash2 className="w-5 h-5" /> Delete Account
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Action Buttons (Footer) */}
        <div className="px-4 mt-8 space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-orange-600 transition text-base">
            <MessageCircle className="w-5 h-5" /> Community Forum
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-green-600 transition text-base">
            <HelpCircle className="w-5 h-5" /> Help & Support
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-600 transition text-base"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}