// src/pages/BookingsPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { 
    Star, Calendar, MapPin, Clock, User, Edit, Trash2, Search, Filter,
    Share2, Download, QrCode, Bell, Plus, ChevronDown, ChevronUp, MapPinIcon,
    Package, Sun, Home, XCircle, CheckCircle, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

// --- Mock Data Setup (FIXED: Moved outside component) ---
const getMockBookings = () => [
    { 
        id: "1", event: "Satyanarayan Katha", service: "Full Puja Service", date: "2025-11-15", time: "10:00", 
        address: "Ranchi, Jharkhand", pandit: { name: "Pandit Ram Shastri", image: "/pandit1.jpg" }, 
        notes: "Bring ghee lamp & flowers.", status: "Confirmed", kitStatus: "Ready", decorationStatus: "Confirmed", isFestival: true, festivalName: "Diwali"
    },
    { 
        id: "2", event: "Navratri Kalash Sthapana", service: "Vedic Ritual", date: "2025-10-05", time: "07:30", 
        address: "Mumbai, Maharashtra", pandit: { name: "Acharya Mohan Verma", image: "/pandit2.jpg" }, 
        notes: "Early morning slot.", status: "Pending", kitStatus: "Pending", decorationStatus: "Pending", isFestival: true, festivalName: "Navratri"
    },
    { 
        id: "3", event: "Griha Pravesh", service: "House Warming Puja", date: "2025-09-01", time: "11:00", 
        address: "Delhi, NCR", pandit: { name: "Pandit Suresh Sharma", image: "/pandit3.jpg" }, 
        notes: "New home blessing.", status: "Completed", kitStatus: "Delivered", decorationStatus: "Confirmed", isFestival: false
    },
    { 
        id: "4", event: "Mundan Sanskar", service: "Child Ceremony", date: "2025-07-20", time: "12:00", 
        address: "Kolkata, WB", pandit: { name: "Pandit Ram Shastri", image: "/pandit1.jpg" }, 
        notes: "Completed successfully.", status: "Completed", kitStatus: "Delivered", decorationStatus: "N/A"
    },
    { 
        id: "5", event: "Diwali Lakshmi Puja", service: "Festival Ritual", date: "2024-11-01", time: "19:30", 
        address: "Ranchi, Jharkhand", pandit: { name: "Pandit Suresh Sharma", image: "/pandit3.jpg" }, 
        notes: "Cancelled due to personal emergency.", status: "Cancelled", kitStatus: "Returned", decorationStatus: "N/A", isFestival: true, festivalName: "Diwali"
    },
];

// Helper functions for date/time calculations
const getBookingDate = (date) => new Date(date);

const getCountdown = (bookingDate, bookingTime) => {
    const now = new Date();
    // Combine date and time for accurate comparison
    const eventDateTime = new Date(`${bookingDate}T${bookingTime}`);
    const diff = eventDateTime - now;
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
};

const getStatusColor = (status) => {
    switch (status) {
        case "Confirmed": return "bg-green-600 text-white";
        case "Pending": return "bg-yellow-500 text-white";
        case "Completed": return "bg-blue-600 text-white";
        case "Cancelled": return "bg-red-600 text-white";
        default: return "bg-gray-500 text-white";
    }
};

// --- Sub-Components (Unchanged) ---

// Countdown Timer (Moved out for brevity, definition remains correct)
const CountdownTimer = React.memo(({ targetDate, targetTime }) => {
    const [timeLeft, setTimeLeft] = useState(getCountdown(targetDate, targetTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getCountdown(targetDate, targetTime));
        }, 3600000); // Update every hour

        return () => clearInterval(timer);
    }, [targetDate, targetTime]);

    if (!timeLeft || timeLeft.days > 30) return null;

    const isUrgent = timeLeft.days < 2;

    return (
        <div className="mt-3 p-3 bg-white/70 border border-amber-300 rounded-lg shadow-inner text-maroon font-semibold">
            <h4 className="text-sm flex items-center gap-2">
                <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-blue-500'}`} />
                Puja starts in:
            </h4>
            <div className="flex justify-start text-center mt-1 text-maroon">
                <span className={`text-lg sm:text-xl font-extrabold ${isUrgent ? 'text-red-600' : 'text-amber-700'}`}>
                    {timeLeft.days} D, {timeLeft.hours} H
                </span>
            </div>
        </div>
    );
});

// Edit Booking Modal Component
function EditBookingModal({ booking, onSave, onClose }) {
    const [formData, setFormData] = useState(booking);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold text-[#800000] mb-4 border-b pb-2">Edit Booking: {booking.event}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-[#FFD7A3] rounded-lg focus:ring-[#800000] text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 border border-[#FFD7A3] rounded-lg focus:ring-[#800000] text-sm"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows="2"
                            className="w-full px-3 py-2 border border-[#FFD7A3] rounded-lg focus:ring-[#800000] text-sm"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows="3"
                            className="w-full px-3 py-2 border border-[#FFD7A3] rounded-lg focus:ring-[#800000] text-sm"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-[#800000] text-white py-2 rounded-xl hover:bg-[#A00000] transition font-semibold"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

// Delete Confirmation Modal
function DeleteConfirmationModal({ onConfirm, onCancel }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
                
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                        Delete Permanently
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// QR Code Modal
function QRCodeModal({ booking, onClose }) {
    const qrValue = JSON.stringify({
        event: booking.event,
        pandit: booking.pandit.name,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        status: booking.status
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-[#800000] mb-4 flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5" /> Booking QR Code
                </h3>
                
                <div className="flex justify-center mb-4 bg-gray-100 p-4 rounded-xl">
                    {/* FIXED: Using QRCodeSVG which was imported */}
                    <QRCodeSVG 
                        value={qrValue} 
                        size={200} 
                        level="L"
                        bgColor="#ffffff"
                        fgColor="#800000"
                    />
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code to confirm details with the Pandit Ji.
                </p>
                
                <button
                    onClick={onClose}
                    className="w-full bg-[#800000] text-white py-2 rounded-lg hover:bg-[#A00000] transition font-semibold"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
}


// --- Main Component ---
export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date");
    const [editingBooking, setEditingBooking] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [expandedNotes, setExpandedNotes] = useState({});
    const [showQR, setShowQR] = useState(null);

    // Sample festival dates (YYYY-MM-DD format)
    const festivals = {
        "2025-10-12": "Navratri",
        "2025-10-20": "Diwali",
        "2025-08-15": "Raksha Bandhan",
        "2025-11-04": "Chhath Puja"
    };

    // FIX APPLIED HERE: Calling getMockBookings
    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("sanskaraa_bookings")) || [];
        if (savedBookings.length === 0) {
            const sampleBookings = getMockBookings();
            localStorage.setItem("sanskaraa_bookings", JSON.stringify(sampleBookings));
            setBookings(sampleBookings);
        } else {
            setBookings(savedBookings);
        }
    }, []);

    const updateBookings = (updatedBookings) => {
        setBookings(updatedBookings);
        localStorage.setItem("sanskaraa_bookings", JSON.stringify(updatedBookings));
    };

    // Filter and sort bookings
    const filteredBookings = bookings
        .filter(booking => {
            const matchesSearch = 
                booking.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.pandit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.service.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "date":
                    return new Date(a.date) - new Date(b.date);
                case "name":
                    return a.event.localeCompare(b.event);
                case "status":
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

    const handleEdit = (booking) => {
        setEditingBooking(booking);
    };

    const handleSaveEdit = (updatedBooking) => {
        const updatedBookings = bookings.map(b => 
            b.id === updatedBooking.id ? updatedBooking : b
        );
        updateBookings(updatedBookings);
        setEditingBooking(null);
    };

    const handleDelete = (id) => {
        const updatedBookings = bookings.filter(b => b.id !== id);
        updateBookings(updatedBookings);
        setDeleteConfirm(null);
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedBookings = bookings.map(b =>
            b.id === id ? { ...b, status: newStatus } : b
        );
        updateBookings(updatedBookings);
    };

    const setReminder = (booking, hoursBefore = 24) => {
        if (Notification.permission === "granted") {
            const reminderText = `Reminder: Your ${booking.event} is in approx. ${hoursBefore} hours. Don't forget!`;
            new Notification(`Sanskaraa Puja Reminder`, { body: reminderText });
            alert('Reminder set successfully!');
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    setReminder(booking, hoursBefore);
                } else {
                    alert('Please enable browser notifications to set reminders.');
                }
            });
        } else {
             alert('Browser notifications are blocked. Please enable them in your browser settings.');
        }
    };

    const shareBooking = async (booking) => {
        const shareData = {
            title: `My ${booking.event} Booking`,
            text: `I've booked ${booking.event} with ${booking.pandit.name} on ${booking.date} at ${booking.time} via Sanskaraa.`,
            url: window.location.href,
        };
        
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareData.text + " " + shareData.url);
            alert('Booking details copied to clipboard!');
        }
    };

    const downloadInvoice = (booking) => {
        // Simple mock function for download
        const invoiceContent = `SANSAKRAA INVOICE\nEvent: ${booking.event}\nDate: ${booking.date}\nPandit: ${booking.pandit.name}\nStatus: ${booking.status}`;
        
        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Sanskaraa_Invoice_${booking.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Invoice download simulated (as a .txt file).');
    };
    
    const openGoogleMaps = (address) => {
        // Updated URL for valid Google Maps search
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

    const toggleNotes = (id) => {
        setExpandedNotes(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // UI helper for Kit/Decoration Status Icons
    const getKitStatusIcon = (kitStatus) => {
        const map = {
            Ready: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "Kit Ready", class: "bg-green-100 text-green-800" },
            Pending: { icon: <Clock className="w-4 h-4 text-yellow-500" />, text: "Kit Pending", class: "bg-yellow-100 text-yellow-800" },
            Delivered: { icon: <Download className="w-4 h-4 text-blue-500" />, text: "Kit Delivered", class: "bg-blue-100 text-blue-800" },
            Returned: { icon: <XCircle className="w-4 h-4 text-red-500" />, text: "Kit Returned", class: "bg-red-100 text-red-800" },
            Confirmed: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "Decor Confirmed", class: "bg-green-100 text-green-800" },
            'In Progress': { icon: <Clock className="w-4 h-4 text-purple-500" />, text: "Decor in Progress", class: "bg-purple-100 text-purple-800" },
            'N/A': { icon: <Home className="w-4 h-4 text-gray-500" />, text: "Self Arrangement", class: "bg-gray-100 text-gray-600" }
        };
        return map[kitStatus] || { icon: <Clock className="w-4 h-4 text-gray-500" />, text: kitStatus, class: "bg-gray-100 text-gray-600" };
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 pt-20 sm:pt-24 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#800000] dark:text-amber-400 mb-2">
                        Your Spiritual Journey
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Manage your puja bookings and ceremonies
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-8 shadow-xl border border-[#FFD7AA] dark:border-gray-700"
                >
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by event, pandit, or service..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#FFD7A3] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition"
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#FFD7A3] focus:ring-2 focus:ring-[#800000] bg-white dark:bg-gray-700 dark:text-white transition text-sm"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-[#FFD7A3] focus:ring-2 focus:ring-[#800000] bg-white dark:bg-gray-700 dark:text-white transition text-sm"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="name">Sort by Name</option>
                                <option value="status">Sort by Status</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Bookings Grid */}
                {filteredBookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                    >
                        <div className="text-6xl mb-4">🛕</div>
                        <h3 className="text-2xl font-semibold text-[#800000] dark:text-amber-400 mb-2">No Bookings Found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredBookings.map((booking, index) => {
                                const countdown = getCountdown(booking.date, booking.time);
                                const festival = festivals[booking.date];
                                
                                return (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="relative bg-[#FFF2D1] dark:bg-gray-800 border border-[#FFD7A3] dark:border-gray-700 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden text-gray-700 dark:text-gray-300"
                                    >
                                        {/* Status Badge */}
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </div>

                                        {/* Festival Banner */}
                                        {festival && booking.status !== "Cancelled" && (
                                            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold">
                                                🎉 Your booking coincides with {festival} — special blessings ahead!
                                            </div>
                                        )}

                                        {/* Blessing for Confirmed Bookings */}
                                        {booking.status === "Confirmed" && (
                                            <div className="bg-green-100 dark:bg-green-900/40 border-b border-green-200 px-4 py-2 text-center text-xs text-green-800 dark:text-green-300">
                                                🙏 May Lord Ganesha bless your ceremony with peace and prosperity.
                                            </div>
                                        )}

                                        <div className="p-4 sm:p-6">
                                            {/* Event Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-2xl">🛕</div>
                                                    <h2 className="text-xl sm:text-2xl font-bold text-[#800000] dark:text-amber-400">
                                                        {booking.event}
                                                    </h2>
                                                </div>
                                            </div>

                                            {/* Countdown Timer */}
                                            {countdown && booking.status === "Confirmed" && (
                                                <CountdownTimer targetDate={booking.date} targetTime={booking.time} />
                                            )}

                                            {/* Booking Details */}
                                            <div className="space-y-3 text-sm mb-4">
                                                <div className="flex items-center gap-3">
                                                    <User className="w-4 h-4 text-[#800000] dark:text-amber-400 flex-shrink-0" />
                                                    <span className="font-semibold">Pandit:</span> {booking.pandit.name}
                                                    {/* Optional: Pandit Image */}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                                    <span className="font-semibold">Service:</span> {booking.service}
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    <p className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-green-600" /> {booking.date}
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-blue-600" /> {booking.time}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1">
                                                        <span className="font-semibold">Location:</span> {booking.address}
                                                        <button
                                                            onClick={() => openGoogleMaps(booking.address)}
                                                            className="ml-2 text-[#800000] dark:text-amber-400 hover:text-[#A00000] text-sm flex items-center gap-1 font-medium"
                                                        >
                                                            <MapPinIcon className="w-3 h-3" /> View on Map
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Puja Kit & Decoration Status */}
                                                <div className="flex flex-wrap gap-2 text-xs pt-2">
                                                    <div className={`px-2 py-1 rounded-full font-semibold flex items-center gap-1 ${getKitStatusIcon(booking.kitStatus).class}`}>
                                                        {getKitStatusIcon(booking.kitStatus).icon} {getKitStatusIcon(booking.kitStatus).text}
                                                    </div>
                                                    <div className={`px-2 py-1 rounded-full font-semibold flex items-center gap-1 ${getKitStatusIcon(booking.decorationStatus).class}`}>
                                                        {getKitStatusIcon(booking.decorationStatus).icon} {getKitStatusIcon(booking.decorationStatus).text}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Notes Section (Collapsible) */}
                                            {booking.notes && (
                                                <div className="mb-4">
                                                    <button
                                                        onClick={() => toggleNotes(booking.id)}
                                                        className="flex items-center gap-1 text-sm text-[#800000] dark:text-amber-400 font-semibold hover:text-[#A00000]"
                                                    >
                                                        Notes {expandedNotes[booking.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </button>
                                                    {expandedNotes[booking.id] && (
                                                        <motion.p 
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700 rounded-lg p-3 border border-[#FFD7A3] dark:border-gray-600"
                                                        >
                                                            {booking.notes}
                                                        </motion.p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#FFD7A3] dark:border-gray-700">
                                                <button
                                                    onClick={() => handleEdit(booking)}
                                                    className="flex items-center justify-center gap-1 text-sm text-white bg-[#800000] px-3 py-2 rounded-lg hover:bg-[#A00000] transition flex-1 sm:flex-none"
                                                >
                                                    <Edit className="w-4 h-4" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => setReminder(booking, 24)}
                                                    className="flex items-center justify-center gap-1 text-sm text-gray-700 bg-white border border-[#FFD7A3] px-3 py-2 rounded-lg hover:bg-gray-50 transition flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Bell className="w-4 h-4" /> Remind
                                                </button>
                                                <button
                                                    onClick={() => shareBooking(booking)}
                                                    className="flex items-center justify-center gap-1 text-sm text-gray-700 bg-white border border-[#FFD7A3] px-3 py-2 rounded-lg hover:bg-gray-50 transition flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Share2 className="w-4 h-4" /> Share
                                                </button>
                                                <button
                                                    onClick={() => setShowQR(booking.id)}
                                                    className="flex items-center justify-center gap-1 text-sm text-gray-700 bg-white border border-[#FFD7A3] px-3 py-2 rounded-lg hover:bg-gray-50 transition flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <QrCode className="w-4 h-4" /> QR
                                                </button>
                                                <button
                                                    onClick={() => downloadInvoice(booking)}
                                                    className="flex items-center justify-center gap-1 text-sm text-gray-700 bg-white border border-[#FFD7A3] px-3 py-2 rounded-lg hover:bg-gray-50 transition flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    <Download className="w-4 h-4" /> Invoice
                                                </button>
                                                
                                                <button
                                                    onClick={() => setDeleteConfirm(booking.id)}
                                                    className="flex items-center justify-center gap-1 text-sm text-white bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700 transition flex-1 sm:flex-none"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </button>
                                            </div>

                                            {/* Status Management */}
                                            {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                                                <div className="flex gap-2 mt-3 pt-2 border-t border-dashed border-[#FFD7A3] dark:border-gray-700">
                                                    <select
                                                        value={booking.status}
                                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                        className="flex-1 text-sm border border-[#FFD7A3] rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#800000] dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="Pending">Mark as Pending</option>
                                                        <option value="Confirmed">Mark as Confirmed</option>
                                                        <option value="Completed">Mark as Completed</option>
                                                        <option value="Cancelled">Mark as Cancelled</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}

                {/* Floating Action Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 bg-[#800000] text-white p-4 rounded-full shadow-2xl hover:bg-[#A00000] transition z-50"
                    onClick={() => alert("Navigate to booking form")}
                >
                    <Plus className="w-6 h-6" />
                </motion.button>

                {/* Modals */}
                <AnimatePresence>
                    {editingBooking && (
                        <EditBookingModal
                            booking={editingBooking}
                            onSave={handleSaveEdit}
                            onClose={() => setEditingBooking(null)}
                        />
                    )}
                    {deleteConfirm && (
                        <DeleteConfirmationModal
                            onConfirm={() => handleDelete(deleteConfirm)}
                            onCancel={() => setDeleteConfirm(null)}
                        />
                    )}
                    {showQR && (
                        <QRCodeModal
                            booking={bookings.find(b => b.id === showQR)}
                            onClose={() => setShowQR(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}