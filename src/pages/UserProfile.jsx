import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Edit, Calendar, Heart, Package, Bell, HelpCircle, LogOut, MapPin, 
  Users, Gift, Star, Download, Trash2, Languages, 
  Share2, MessageCircle, Award, Clock, CreditCard, UserPlus,
  Phone, TrendingUp, Check, Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- Enhanced Card Component ----------------
function EnhancedCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={`
        bg-white/95 rounded-2xl p-4 shadow-sm border border-white/50 
        hover:shadow-xl transition-all duration-300 ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// ---------------- Enhanced Tabs ----------------
function EnhancedTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="relative mt-8">
      <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 flex-shrink-0
              ${activeTab === tab
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                : "bg-white/80 text-gray-600 hover:bg-white border border-gray-200"
              }
            `}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Enhanced Input ----------------
function EnhancedInput({ type, placeholder, value, onChange, icon, rows = 1 }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          {icon}
        </div>
      )}
      {rows > 1 ? (
        <textarea
          placeholder={placeholder}
          className={`
            w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm 
            bg-white/80 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            transition-all duration-200 ${icon ? 'pl-10' : ''}
          `}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`
            w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm 
            bg-white/80 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            transition-all duration-200 ${icon ? 'pl-10' : ''}
          `}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

// ---------------- Empty State Component ----------------
function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {React.cloneElement(icon, { className: "w-8 h-8 text-gray-400" })}
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {action}
    </div>
  );
}

// ---------------- Editable Card ----------------
function EditableCard({ title, value, onSave, type = "text" }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <EnhancedCard className="hover:shadow-md relative">
      <h4 className="text-sm text-[#5C3A21] font-semibold">{title}</h4>
      {editMode ? (
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          {type === "textarea" ? (
            <textarea
              className="border rounded px-2 py-1 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={2}
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
        <p className="mt-1 text-[#5C3A21] text-sm break-words">{value}</p>
      )}
      {!editMode && (
        <button
          className="absolute top-3 right-3 text-[#FFA500] p-1"
          onClick={() => setEditMode(true)}
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
    </EnhancedCard>
  );
}

// ---------------- Collapsible Section ----------------
function SectionCard({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <EnhancedCard className="overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-[#FFF7E0] hover:bg-orange-50 transition"
        onClick={() => setOpen(!open)}
      >
        <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#5C3A21]">
          {React.cloneElement(icon, { className: "w-5 h-5 text-orange-500" })}
          {title}
        </h3>
        <span className="text-[#5C3A21] font-bold text-lg">{open ? "−" : "+"}</span>
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
    </EnhancedCard>
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
    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow-lg">
      <h3 className="font-bold text-base sm:text-lg mb-2">{eventName}</h3>
      <div className="flex justify-between gap-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center bg-white/20 p-2 rounded-lg flex-1 min-w-[50px]">
            <div className="text-xl sm:text-2xl font-bold">{value || 0}</div>
            <div className="text-xs sm:text-sm capitalize">{unit}</div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full bg-white text-orange-500 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition">
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
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full flex-shrink-0 ${achieved ? "bg-orange-500" : "bg-gray-400"}`}>
          {React.cloneElement(icon, { className: "w-4 h-4 text-white" })}
        </div>
        <div>
          <h4 className="font-semibold text-[#5C3A21] text-sm">{title}</h4>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------- Address Card ----------------
function AddressCard({ address, isDefault, onEdit, onDelete, onSetDefault }) {
  return (
    <EnhancedCard>
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <h4 className="font-semibold text-base text-[#5C3A21]">{address.name}</h4>
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
    </EnhancedCard>
  );
}

// ---------------- Family Member Card ----------------
function FamilyMemberCard({ member, onEdit, onDelete }) {
  return (
    <EnhancedCard>
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <h4 className="font-semibold text-base text-[#5C3A21]">{member.name}</h4>
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
    </EnhancedCard>
  );
}

// ---------------- Payment Method Card ----------------
function PaymentMethodCard({ payment, onDelete }) {
  return (
    <EnhancedCard>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-orange-500" />
          <div>
            <p className="font-semibold">{payment.type} •••• {payment.lastFour}</p>
            <p className="text-xs text-gray-500">Expires {payment.expiry}</p>
          </div>
        </div>
        <button onClick={() => onDelete(payment.id)} className="text-red-500 p-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </EnhancedCard>
  );
}

// ---------------- Review Card ----------------
function ReviewCard({ review }) {
  return (
    <EnhancedCard>
      <div className="flex justify-between">
        <span className="font-semibold">{review.pujaName}</span>
        <div className="flex text-yellow-400">
          {"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}
        </div>
      </div>
      <p className="text-sm mt-1">{review.comment}</p>
      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
    </EnhancedCard>
  );
}

// ---------------- Emergency Contact Card ----------------
function EmergencyContactCard({ contact, onCall }) {
  return (
    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
      <div>
        <p className="font-semibold">{contact.name}</p>
        <p className="text-sm text-gray-600">{contact.relation}</p>
        <p className="text-sm">{contact.phone}</p>
      </div>
      <button 
        onClick={() => onCall(contact.phone)}
        className="text-red-500 p-2 bg-white rounded-full hover:bg-red-100 transition"
      >
        <Phone className="w-4 h-4" />
      </button>
    </div>
  );
}

// ---------------- Main Profile ----------------
export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Bookings");
  const [language, setLanguage] = useState("English");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [newFamily, setNewFamily] = useState({});
  const [newPayment, setNewPayment] = useState({});
  const [notificationPrefs, setNotificationPrefs] = useState([
    { label: "Puja Reminders", enabled: true },
    { label: "Festival Alerts", enabled: true },
    { label: "Offer Notifications", enabled: false },
    { label: "New Service Updates", enabled: true }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    let initialUser = null;
    try {
        initialUser = JSON.parse(storedUser);
    } catch (e) {
        console.error("Error parsing user data:", e);
    }

    if (!initialUser || !initialUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(initialUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "English" ? "Hindi" : "English"));
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.pincode) {
      alert("Please fill required address fields.");
      return;
    }
    console.log("Adding address:", newAddress);
    setShowAddAddress(false);
    setNewAddress({});
  };

  const handleAddFamily = () => {
    if (!newFamily.name || !newFamily.relation || !newFamily.dob) {
      alert("Please fill required family member fields.");
      return;
    }
    console.log("Adding family member:", newFamily);
    setShowAddFamily(false);
    setNewFamily({});
  };

  const handleAddPayment = () => {
    if (!newPayment.type || !newPayment.lastFour) {
      alert("Please fill payment details.");
      return;
    }
    console.log("Adding payment method:", newPayment);
    setShowAddPayment(false);
    setNewPayment({});
  };

  const toggleNotification = (index) => {
    setNotificationPrefs(prev => 
      prev.map((pref, i) => 
        i === index ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleDataExport = () => {
    alert("Preparing your data for download...");
  };

  const handleAccountDeletion = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      handleLogout();
    }
  };

  const handleBackup = () => {
    alert("Starting cloud backup...");
  };

  const handleCallEmergency = (phone) => {
    alert(`Calling ${phone}...`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="h-56 bg-gray-300"></div>
        <div className="max-w-4xl mx-auto px-4 -mt-20">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-400 rounded-full border-4 border-white"></div>
            <div className="h-6 bg-gray-400 rounded w-48 mt-4"></div>
            <div className="h-4 bg-gray-400 rounded w-32 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Sample Data with new features
  const userData = {
    ...user,
    coverImage: "src/assets/images/team 1.png",
    profileImage: "src/assets/images/sanskaraa app.png",
    stats: { 
      bookings: 5, 
      wishlist: 3, 
      orders: 2, 
      pujasCompleted: 7, 
      contributions: 3,
      totalPujas: 12,
      completedPujas: 8,
      upcomingPujas: 4
    },
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
      dietType: "Vegetarian",
      allergies: "None",
      specialRequirements: "Wheelchair access needed"
    },
    appSettings: {
      notifications: "Enabled",
      theme: "Light Mode",
      appVersion: "v1.2.3",
      privacy: "Standard",
    },
    upcomingEvents: [
      { id: 1, name: "Ganesh Chaturthi Puja", date: "2025-10-15T10:00:00" },
      { id: 2, name: "Family Member Birthday", date: "2025-10-25T00:00:00" }
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
    ],
    // NEW FEATURES DATA
    paymentMethods: [
      { id: 1, type: "Credit Card", lastFour: "1234", expiry: "12/25" },
      { id: 2, type: "UPI", lastFour: "5678", expiry: "N/A" }
    ],
    loyaltyPoints: 5250,
    nextTier: "Gold",
    pointsNeeded: 750,
    reviews: [
      { id: 1, pujaName: "Ganesh Puja", rating: 5, comment: "Excellent service and very spiritual experience", date: "15 Aug 2023" },
      { id: 2, pujaName: "Satyanarayan Puja", rating: 4, comment: "Good arrangements, pandit was knowledgeable", date: "10 Aug 2023" }
    ],
    emergencyContacts: [
      { id: 1, name: "Emergency Helpline", relation: "24/7 Support", phone: "1800-123-4567" },
      { id: 2, name: "Family Doctor", relation: "Medical", phone: "+91-9876543210" }
    ],
    lastBackup: "2 hours ago"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20 pt-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0LjU2YzAgMS4xLS45IDItMiAyaC0yYy0xLjEgMC0yLS45LTItMnYtMmMwLTEuMS45LTIgMi0yaDJjMS4xIDAgMiAuOSAyIDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Enhanced Cover Image Section */}
        <div className="relative h-40 sm:h-56 bg-gradient-to-r from-orange-300 to-yellow-200 rounded-2xl overflow-hidden">
          <img
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md hover:scale-110 transition">
            <Edit className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        {/* Enhanced Profile Header */}
        <div className="relative flex flex-col items-center -mt-20 px-4">
          <div className="relative group">
            <div className="relative">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-2xl object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            
            {/* Online Status Indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-200 group">
              <Edit className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
            </button>
          </div>
          
          {/* Verification Badge */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{userData.name}</h2>
              <div className="bg-blue-500 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-600 mt-1">{userData.email}</p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ⭐ 4.8 Rating
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                👑 Premium Member
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-6 flex justify-center gap-3 sm:gap-4">
          <button 
            onClick={toggleLanguage}
            className="p-3 bg-white/90 border border-orange-200 rounded-full shadow-md hover:scale-105 transition"
          >
            <Languages className="w-5 h-5 text-orange-500" />
          </button>
          <button className="p-3 bg-white/90 border border-orange-200 rounded-full shadow-md hover:scale-105 transition">
            <Share2 className="w-5 h-5 text-orange-500" />
          </button>
        </div>

        {/* Quick Actions Dashboard */}
        <div className="px-4 mt-6">
          <h3 className="text-xl font-bold text-[#5C3A21] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <Calendar />, label: "Book Puja", color: "bg-orange-500" },
              { icon: <Package />, label: "My Orders", color: "bg-green-500" },
              { icon: <Gift />, label: "Donate", color: "bg-blue-500" },
              { icon: <Phone />, label: "Support", color: "bg-purple-500" }
            ].map((action, i) => (
              <motion.button 
                key={i} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} text-white p-3 rounded-xl text-center shadow-lg hover:shadow-xl transition-all`}
              >
                {React.cloneElement(action.icon, { className: "w-6 h-6 mx-auto" })}
                <p className="text-xs mt-1 font-medium">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-8 px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Bookings", value: userData.stats.bookings, icon: <Calendar />, progress: 75 },
            { label: "Wishlist", value: userData.stats.wishlist, icon: <Heart />, progress: 60 },
            { label: "Orders", value: userData.stats.orders, icon: <Package />, progress: 40 },
            { label: "Pujas Done", value: userData.stats.pujasCompleted, icon: <Award />, progress: 85 },
          ].map((stat, i) => (
            <EnhancedCard key={i} className="text-center group cursor-pointer">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="p-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                    {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                </div>
                <div className="pt-8">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  {stat.progress && (
                    <div className="mt-2 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </EnhancedCard>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="px-4 mt-6">
          <h3 className="text-xl font-bold text-[#5C3A21] mb-3">Upcoming Events</h3>
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

        {/* Enhanced Tab Navigation */}
        <div className="px-4 mt-6">
          <EnhancedTabs tabs={["Bookings", "Wishlist", "Orders", "Timeline"]} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4 space-y-3">
            {/* Tab Content */}
            {activeTab === "Bookings" && userData.bookings.map((b) => (
              <EnhancedCard key={b.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#5C3A21]">{b.name}</h4>
                    <p className="text-sm text-[#5C3A21]">{b.date} at {b.time}</p>
                    <p className="text-xs text-gray-500">With {b.pandit}</p>
                  </div>
                  <button className="text-orange-500 p-1">
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </EnhancedCard>
            ))}
            {activeTab === "Wishlist" && userData.wishlist.map((w, i) => (
              <EnhancedCard key={i}>
                <div className="flex justify-between items-center">
                  <span className="text-[#5C3A21] font-medium">{w}</span>
                  <button className="text-orange-500 p-1">
                    <Heart className="w-5 h-5" fill="currentColor" />
                  </button>
                </div>
              </EnhancedCard>
            ))}
            {activeTab === "Orders" && userData.orders.map((o, i) => (
              <EnhancedCard key={i}>
                <div className="flex justify-between items-center">
                  <span className="text-[#5C3A21] font-medium">{o}</span>
                  <button className="text-orange-500 p-1">
                    <Package className="w-5 h-5" />
                  </button>
                </div>
              </EnhancedCard>
            ))}
            {activeTab === "Timeline" && userData.activityTimeline.map((item) => (
              <EnhancedCard key={item.id}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#5C3A21] text-sm">{item.action}</h4>
                    <p className="text-xs text-[#5C3A21]">{item.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                </div>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* NEW FEATURES IMPLEMENTATION */}

        {/* Payment Methods Management */}
        <div className="px-4 mt-6">
          <SectionCard title="Payment Methods" icon={<CreditCard />}>
            <div className="space-y-3">
              {userData.paymentMethods?.map(payment => (
                <PaymentMethodCard 
                  key={payment.id}
                  payment={payment}
                  onDelete={(id) => console.log("Delete payment", id)}
                />
              ))}
              
              {showAddPayment ? (
                <EnhancedCard>
                  <h4 className="font-semibold text-lg text-[#5C3A21] mb-3">Add Payment Method</h4>
                  <div className="space-y-3">
                    <EnhancedInput 
                      type="text" 
                      placeholder="Payment Type (e.g., Credit Card, UPI)" 
                      value={newPayment.type || ""} 
                      onChange={(e) => setNewPayment({...newPayment, type: e.target.value})} 
                    />
                    <EnhancedInput 
                      type="text" 
                      placeholder="Last 4 Digits" 
                      value={newPayment.lastFour || ""} 
                      onChange={(e) => setNewPayment({...newPayment, lastFour: e.target.value})} 
                    />
                    <EnhancedInput 
                      type="text" 
                      placeholder="Expiry Date" 
                      value={newPayment.expiry || ""} 
                      onChange={(e) => setNewPayment({...newPayment, expiry: e.target.value})} 
                    />
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={handleAddPayment}
                        className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
                      >
                        Save Payment
                      </button>
                      <button 
                        onClick={() => setShowAddPayment(false)}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </EnhancedCard>
              ) : (
                <button 
                  onClick={() => setShowAddPayment(true)}
                  className="w-full border-2 border-dashed border-orange-300 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-50 transition"
                >
                  + Add Payment Method
                </button>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Loyalty Program */}
        <div className="px-4 mt-6">
          <SectionCard title="Loyalty Rewards" icon={<Star />}>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{userData.loyaltyPoints.toLocaleString()} Points</h4>
                  <p className="text-sm">Earned ₹2,500 worth rewards</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Next Tier: {userData.nextTier}</p>
                  <p className="text-xs">{userData.pointsNeeded} points needed</p>
                </div>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(userData.loyaltyPoints / (userData.loyaltyPoints + userData.pointsNeeded)) * 100}%` }}
                ></div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Puja Analytics */}
        <div className="px-4 mt-6">
          <SectionCard title="Puja Analytics" icon={<TrendingUp />}>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <p className="font-bold text-lg">{userData.stats.totalPujas}</p>
                <p className="text-xs">Total Pujas</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <p className="font-bold text-lg">{userData.stats.completedPujas}</p>
                <p className="text-xs">Completed</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <p className="font-bold text-lg">{userData.stats.upcomingPujas}</p>
                <p className="text-xs">Upcoming</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold">Most Frequent Puja: <span className="text-orange-600">Ganesh Puja</span></p>
            </div>
          </SectionCard>
        </div>

        {/* Review & Ratings */}
        <div className="px-4 mt-6">
          <SectionCard title="My Reviews & Ratings" icon={<Star />}>
            {userData.reviews?.length > 0 ? (
              userData.reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <EmptyState
                icon={<Star />}
                title="No Reviews Yet"
                description="Your reviews will appear here after you rate services"
                action={
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Write First Review
                  </button>
                }
              />
            )}
          </SectionCard>
        </div>

        {/* Emergency Contacts */}
        <div className="px-4 mt-6">
          <SectionCard title="Emergency Contacts" icon={<Phone />}>
            <div className="space-y-3">
              {userData.emergencyContacts?.map(contact => (
                <EmergencyContactCard 
                  key={contact.id}
                  contact={contact}
                  onCall={handleCallEmergency}
                />
              ))}
              <button className="w-full border-2 border-dashed border-red-300 py-3 rounded-lg text-red-500 font-semibold hover:bg-red-50 transition">
                + Add Emergency Contact
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Health & Preferences */}
        <div className="px-4 mt-6">
          <SectionCard title="Health & Dietary Preferences" icon={<Heart />}>
            <EditableCard title="Diet Type" value={userData.personalInfo.dietType} onSave={() => {}} />
            <EditableCard title="Allergies" value={userData.personalInfo.allergies} onSave={() => {}} />
            <EditableCard title="Special Requirements" value={userData.personalInfo.specialRequirements} onSave={() => {}} />
          </SectionCard>
        </div>

        {/* Referral Program */}
        <div className="px-4 mt-6">
          <SectionCard title="Refer & Earn" icon={<Gift />}>
            <div className="text-center p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl">
              <h4 className="font-bold text-lg">Invite Friends & Earn</h4>
              <p className="text-sm mt-1">Get ₹500 when your friend books first puja</p>
              <div className="mt-3 flex gap-2">
                <input 
                  type="text" 
                  value="REFER500" 
                  readOnly 
                  className="flex-1 text-center bg-white/20 rounded-lg py-2 text-white placeholder-white/70"
                  placeholder="Referral Code"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("REFER500");
                    alert("Referral code copied!");
                  }}
                  className="bg-white text-green-600 px-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Copy
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Notification Preferences */}
        <div className="px-4 mt-6">
          <SectionCard title="Notification Preferences" icon={<Bell />}>
            <div className="space-y-3">
              {notificationPrefs.map((pref, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-[#5C3A21]">{pref.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={pref.enabled} 
                      onChange={() => toggleNotification(i)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Backup & Sync */}
        <div className="px-4 mt-6">
          <SectionCard title="Backup & Sync" icon={<Cloud />}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#5C3A21]">Cloud Backup</span>
                <span className="text-xs text-green-600">Last backup: {userData.lastBackup}</span>
              </div>
              <button 
                onClick={handleBackup}
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Backup Now
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Rest of the existing sections... */}
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
                <EnhancedCard>
                  <h4 className="font-semibold text-lg text-[#5C3A21] mb-3">Add New Address</h4>
                  <div className="space-y-3">
                    <EnhancedInput type="text" placeholder="Address Name (e.g., Home)" value={newAddress.name || ""} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} />
                    <EnhancedInput type="text" placeholder="Full Address" rows={2} value={newAddress.address || ""} onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                      <EnhancedInput type="text" placeholder="City" value={newAddress.city || ""} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} />
                      <EnhancedInput type="text" placeholder="State" value={newAddress.state || ""} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <EnhancedInput type="text" placeholder="Pincode" value={newAddress.pincode || ""} onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})} />
                      <EnhancedInput type="tel" placeholder="Phone" value={newAddress.phone || ""} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} />
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
                </EnhancedCard>
              ) : (
                <button 
                  onClick={() => setShowAddAddress(true)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200 hover:bg-orange-200 transition text-sm sm:text-base"
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
              <EnhancedCard>
                <h4 className="font-semibold text-lg text-[#5C3A21] mb-3">Add Family Member</h4>
                <div className="space-y-3">
                  <EnhancedInput type="text" placeholder="Full Name" value={newFamily.name || ""} onChange={(e) => setNewFamily({...newFamily, name: e.target.value})} />
                  <select 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm bg-white/80 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
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
                    <EnhancedInput type="date" placeholder="Date of Birth" value={newFamily.dob || ""} onChange={(e) => setNewFamily({...newFamily, dob: e.target.value})} />
                    <EnhancedInput type="date" placeholder="Anniversary (if applicable)" value={newFamily.anniversary || ""} onChange={(e) => setNewFamily({...newFamily, anniversary: e.target.value})} />
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
              </EnhancedCard>
            ) : (
              <button 
                onClick={() => setShowAddFamily(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-100 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200 hover:bg-orange-200 transition text-sm sm:text-base"
              >
                <UserPlus className="w-5 h-5" /> Add Family Member
              </button>
            )}
          </SectionCard>
        </div>

        {/* Donations & Membership */}
        <div className="px-4 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donation History */}
          <SectionCard title="Donation History" icon={<Gift />}>
            <div className="space-y-3">
              {userData.donations.map(donation => (
                <EnhancedCard key={donation.id}>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <h4 className="font-semibold text-[#5C3A21]">{donation.cause}</h4>
                      <p className="text-xs text-gray-500">{donation.date}</p>
                    </div>
                    <span className="font-bold text-green-600">{donation.amount}</span>
                  </div>
                </EnhancedCard>
              ))}
            </div>
          </SectionCard>

          {/* Membership */}
          <SectionCard title="Membership" icon={<Star />}>
            <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-4 rounded-xl shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{userData.membership.type} Membership</h4>
                  <p className="text-sm">Renewal: {userData.membership.renewalDate}</p>
                  <p className="text-sm">Status: <span className="font-semibold">{userData.membership.status}</span></p>
                </div>
                <div className="text-right">
                  <button className="bg-white text-orange-500 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
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
              <EditableCard title="Theme" value={userData.appSettings.theme} onSave={(val) => console.log(val)} />
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
                className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-200 transition text-sm sm:text-base"
              >
                <Download className="w-5 h-5" /> Download My Data
              </button>
              <button 
                onClick={handleAccountDeletion}
                className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition text-sm sm:text-base"
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