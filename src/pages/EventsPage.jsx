import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Filter, Heart, Share, Star, Calendar, Clock, MapPin, Users, Globe, X, Search, Phone, Mail, User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data Setup ---
const banners = [
  "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800",
  "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800",
  "https://images.unsplash.com/photo-1621461133947-f63381c2f7f8?w=800"
];

const eventImages = {
  // 🏡 Ghar ke Sanskaar
  "Griha Pravesh / गृह प्रवेश": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  "Vastu Shanti / वास्तु शांति": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Navagraha Shanti / नवग्रह शांति": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Sundarkand Path / सुंदरकांड पाठ": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Ramayan Path / रामायण पाठ": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Satyanarayan Katha / सत्यनारायण कथा": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  "Lakshmi Puja / लक्ष्मी पूजा": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Ganesh Puja / गणेश पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Durga Saptashati / दुर्गा सप्तशती पाठ": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  "Hanuman Chalisa Path / हनुमान चालीसा पाठ": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  // 👶 Bacchon ke Sanskaar
  "Naamkaran Sanskar / नामकरण संस्कार": "https://images.unsplash.com/photo-1577897113772-37dfa8dcee33?w=400",
  "Annaprashan / अन्नप्राशन": "https://images.unsplash.com/photo-1577897113772-37dfa8dcee33?w=400",
  "Mundan Sanskar / मुंडन संस्कार": "https://images.unsplash.com/photo-1577897113772-37dfa8dcee33?w=400",
  "Janamdin Puja / जन्मदिन पूजा": "https://images.unsplash.com/photo-1577897113772-37dfa8dcee33?w=400",
  // 💑 Vivah Sanskar
  "Vivah / विवाह": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
  "Roka / रोका समारोह": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Sagai / सगाई": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Haldi / हल्दी रस्म": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Mehendi / मेहंदी": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Sangeet / संगीत": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Reception / रिसेप्शन": "https://images.unsplash.com/photo-1465495976272-67d81d24b6d5?w=400",
  "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
  // ⚰ Pitrakarya
  "Antim Sanskar / अंतिम संस्कार": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Pind Daan / पिंडदान": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Shraddh / श्राद्ध पूजा": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Asthi Visarjan / अस्थि विसर्जन": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Tehravin / तेरहवीं संस्कार": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  // 📿 Festival Pujas
  "Karwa Chauth Puja / करवा चौथ पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Raksha Bandhan / रक्षा बंधन पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Navratri Puja / नवरात्रि पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Saraswati Puja / सरस्वती पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Mahashivratri Puja / महाशिवरात्रि पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Chhath Puja / छठ पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Holi Dahan Puja / होली दहन पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  "Janmashtami Puja / जन्माष्टमी पूजा": "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=400",
  // 🛕 Temple / Special Pujas
  "Rudrabhishek / रुद्राभिषेक": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Mahamrityunjaya Jaap / महामृत्युंजय जाप": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Bhumi Pujan / भूमि पूजन": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Kundali Shanti / कुंडली शांति": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Upanayan Sanskar / उपनयन संस्कार": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Kalash Sthapana / कलश स्थापना": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  "Ayushya Homam / आयुष्य हवन": "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400",
  // 🧾 Others / Custom Options
  "Personalized Puja Package / व्यक्तिगत पूजा पैकेज": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
  "Online Puja Seva / ऑनलाइन पूजा सेवा": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
  "Customized Event Plan / कस्टम इवेंट प्लान": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
};

const getEventData = () => {
  const baseEvents = [
    {
      category: "🏡 Ghar ke Sanskaar",
      events: [
        { name: "Griha Pravesh / गृह प्रवेश", price: 2500, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 95 },
        { name: "Vastu Shanti / वास्तु शांति", price: 3500, duration: "3-4 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 88 },
        { name: "Navagraha Shanti / नवग्रह शांति", price: 4200, duration: "4-5 hours", location: "ghar", groupSize: "small", rating: 4.9, popularity: 92 },
        { name: "Sundarkand Path / सुंदरकांड पाठ", price: 1800, duration: "1-2 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 85 },
        { name: "Ramayan Path / रामायण पाठ", price: 5000, duration: "Full day", location: "ghar", groupSize: "medium", rating: 4.9, popularity: 96 },
        { name: "Satyanarayan Katha / सत्यनारायण कथा", price: 2200, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 90 },
        { name: "Lakshmi Puja / लक्ष्मी पूजा", price: 2000, duration: "1-2 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 93 },
        { name: "Ganesh Puja / गणेश पूजा", price: 1800, duration: "1-2 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 89 },
        { name: "Durga Saptashati / दुर्गा सप्तशती पाठ", price: 2800, duration: "3-4 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 91 },
        { name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ", price: 1500, duration: "1 hour", location: "ghar", groupSize: "small", rating: 4.6, popularity: 87 },
      ],
    },
    {
      category: "👶 Bacchon ke Sanskaar",
      events: [
        { name: "Naamkaran Sanskar / नामकरण संस्कार", price: 3000, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 90 },
        { name: "Annaprashan / अन्नप्राशन", price: 2500, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 86 },
        { name: "Mundan Sanskar / मुंडन संस्कार", price: 2200, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 84 },
        { name: "Janamdin Puja / जन्मदिन पूजा", price: 1800, duration: "1 hour", location: "ghar", groupSize: "small", rating: 4.5, popularity: 82 },
      ],
    },
    {
      category: "💑 Vivah Sanskar",
      events: [
        { name: "Vivah / विवाह", price: 15000, duration: "Full day", location: "mandir", groupSize: "large", rating: 4.9, popularity: 98 },
        { name: "Roka / रोका समारोह", price: 5000, duration: "2-3 hours", location: "ghar", groupSize: "medium", rating: 4.7, popularity: 87 },
        { name: "Sagai / सगाई", price: 6000, duration: "3-4 hours", location: "ghar", groupSize: "medium", rating: 4.8, popularity: 89 },
        { name: "Haldi / हल्दी रस्म", price: 4000, duration: "2 hours", location: "ghar", groupSize: "medium", rating: 4.7, popularity: 88 },
        { name: "Mehendi / मेहंदी", price: 4500, duration: "3-4 hours", location: "ghar", groupSize: "medium", rating: 4.8, popularity: 90 },
        { name: "Sangeet / संगीत", price: 8000, duration: "4-5 hours", location: "ghar", groupSize: "large", rating: 4.9, popularity: 95 },
        { name: "Reception / रिसेप्शन", price: 7000, duration: "4-5 hours", location: "mandir", groupSize: "large", rating: 4.8, popularity: 92 },
        { name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा", price: 3000, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 86 },
      ],
    },
    {
      category: "⚰ Pitrakarya",
      events: [
        { name: "Antim Sanskar / अंतिम संस्कार", price: 5000, duration: "3-4 hours", location: "ghat", groupSize: "medium", rating: 4.8, popularity: 85 },
        { name: "Pind Daan / पिंडदान", price: 4500, duration: "3 hours", location: "ghat", groupSize: "medium", rating: 4.7, popularity: 83 },
        { name: "Shraddh / श्राद्ध पूजा", price: 3500, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 82 },
        { name: "Asthi Visarjan / अस्थि विसर्जन", price: 4000, duration: "2-3 hours", location: "river", groupSize: "medium", rating: 4.7, popularity: 84 },
        { name: "Tehravin / तेरहवीं संस्कार", price: 3800, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 81 },
      ],
    },
    {
      category: "📿 Festival Pujas",
      events: [
        { name: "Karwa Chauth Puja / करवा चौथ पूजा", price: 1800, duration: "1-2 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 93 },
        { name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा", price: 2200, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.9, popularity: 97 },
        { name: "Raksha Bandhan / रक्षा बंधन पूजा", price: 1500, duration: "1 hour", location: "ghar", groupSize: "small", rating: 4.7, popularity: 89 },
        { name: "Navratri Puja / नवरात्रि पूजा", price: 3500, duration: "3-4 hours", location: "ghar", groupSize: "medium", rating: 4.8, popularity: 92 },
        { name: "Saraswati Puja / सरस्वती पूजा", price: 2000, duration: "2 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 88 },
        { name: "Mahashivratri Puja / महाशिवरात्रि पूजा", price: 2500, duration: "2-3 hours", location: "mandir", groupSize: "medium", rating: 4.9, popularity: 95 },
        { name: "Chhath Puja / छठ पूजा", price: 3000, duration: "3-4 hours", location: "river", groupSize: "medium", rating: 4.8, popularity: 94 },
        { name: "Holi Dahan Puja / होली दहन पूजा", price: 1800, duration: "1-2 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 86 },
        { name: "Janmashtami Puja / जन्माष्टमी पूजा", price: 2200, duration: "2 hours", location: "mandir", groupSize: "medium", rating: 4.8, popularity: 91 },
      ],
    },
    {
      category: "🛕 Temple / Special Pujas",
      events: [
        { name: "Rudrabhishek / रुद्राभिषेक", price: 4500, duration: "3-4 hours", location: "mandir", groupSize: "medium", rating: 4.9, popularity: 96 },
        { name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप", price: 3800, duration: "3 hours", location: "mandir", groupSize: "medium", rating: 4.8, popularity: 92 },
        { name: "Bhumi Pujan / भूमि पूजन", price: 3200, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 89 },
        { name: "Kundali Shanti / कुंडली शांति", price: 5000, duration: "4-5 hours", location: "ghar", groupSize: "small", rating: 4.8, popularity: 93 },
        { name: "Upanayan Sanskar / उपनयन संस्कार", price: 4200, duration: "3-4 hours", location: "ghar", groupSize: "medium", rating: 4.7, popularity: 90 },
        { name: "Kalash Sthapana / कलश स्थापना", price: 2800, duration: "2-3 hours", location: "ghar", groupSize: "small", rating: 4.6, popularity: 87 },
        { name: "Ayushya Homam / आयुष्य हवन", price: 3500, duration: "3 hours", location: "ghar", groupSize: "small", rating: 4.7, popularity: 88 },
      ],
    },
    {
      category: "🧾 Others / Custom Options",
      events: [
        { name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज", price: 0, duration: "Custom", location: "custom", groupSize: "custom", rating: 4.5, popularity: 80, isCustom: true },
        { name: "Online Puja Seva / ऑनलाइन पूजा सेवा", price: 1000, duration: "1 hour", location: "online", groupSize: "small", rating: 4.4, popularity: 78 },
        { name: "Customized Event Plan / कस्टम इवेंट प्लान", price: 0, duration: "Custom", location: "custom", groupSize: "custom", rating: 4.6, popularity: 82, isCustom: true },
      ],
    },
  ];

  return baseEvents;
};

const panditsData = [
  { id: 1, name: "Pandit Ravi Shankar", experience: "15 years", languages: ["Hindi", "English"], rating: 4.9, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150" },
  { id: 2, name: "Pandit Vijay Kumar", experience: "12 years", languages: ["Hindi", "Marathi"], rating: 4.8, image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150" },
  { id: 3, name: "Pandit Suresh Sharma", experience: "10 years", languages: ["Hindi", "Tamil"], rating: 4.7, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150" },
  { id: 4, name: "Pandit Anil Joshi", experience: "18 years", languages: ["Hindi", "Gujarati"], rating: 4.9, image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150" },
  { id: 5, name: "Pandit Mohan Lal", experience: "8 years", languages: ["Hindi", "Telugu"], rating: 4.6, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150" },
];

const packagesData = {
  "Starter": { price: 1500, includes: ["Basic Puja Samagri", "1 Hour Ceremony", "Prasad"] },
  "Premium": { price: 3500, includes: ["Premium Puja Samagri", "3-4 Hour Ceremony", "Prasad", "Pandit Travel"] },
  "Custom": { price: "Custom", includes: ["Tailored to your needs", "Flexible duration", "All inclusive"] }
};

const reviewsData = [
  { user: "Rajesh K.", rating: 5, comment: "Excellent service. Pandit ji was very knowledgeable and punctual.", event: "Griha Pravesh" },
  { user: "Priya M.", rating: 4, comment: "Good experience. Would have liked more explanation during the ceremony.", event: "Satyanarayan Katha" },
  { user: "Amit S.", rating: 5, comment: "Wonderful ceremony. Everything was arranged perfectly.", event: "Vivah" },
  { user: "Sneha P.", rating: 5, comment: "Highly recommend! The puja kit was complete and of good quality.", event: "Lakshmi Puja" },
];

const festivalCountdown = [
  { name: "Diwali", date: "2024-11-12", image: "https://images.unsplash.com/photo-1602488257137-53c8a867c893?w=300" },
  { name: "Holi", date: "2024-03-25", image: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=300" },
  { name: "Navratri", date: "2024-10-15", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=300" },
];

// --- Booking Modal Component ---
const BookingModal = ({ isOpen, onClose, event, language }) => {
  const [step, setStep] = useState(1);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const timeSlots = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

  const handleSubmit = () => {
    alert(language === "Hindi" ? "बुकिंग सफलतापूर्वक की गई!" : "Booking Successful!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-700">
              {language === "Hindi" ? "इवेंट बुक करें" : "Book Event"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ">
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 ">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-600"
                }`}>
                  {step > stepNum ? <CheckCircle size={16} /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 ${step > stepNum ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Event Details */}
          {step === 1 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {language === "Hindi" ? "इवेंट विवरण" : "Event Details"}
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg ">
                <h4 className="font-bold text-orange-800">{event.name}</h4>
                <p className="text-orange-600 font-semibold">₹{event.price}</p>
                <p className="text-sm text-gray-600">{event.duration}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
              >
                {language === "Hindi" ? "अगला कदम" : "Next Step"}
              </button>
            </div>
          )}

          {/* Step 2: Select Pandit */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {language === "Hindi" ? "पंडित जी चुनें" : "Select Pandit"}
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {panditsData.map((pandit) => (
                  <div
                    key={pandit.id}
                    className={`p-3 border rounded-lg cursor-pointer transition ${
                      selectedPandit?.id === pandit.id ? "border-orange-500 bg-orange-50" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPandit(pandit)}
                  >
                    <div className="flex items-center">
                      <img src={pandit.image} alt={pandit.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{pandit.name}</h4>
                        <p className="text-sm text-gray-600">{pandit.experience} • {pandit.rating} ⭐</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  {language === "Hindi" ? "पिछला" : "Back"}
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedPandit}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400"
                >
                  {language === "Hindi" ? "अगला कदम" : "Next Step"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {language === "Hindi" ? "तारीख और समय चुनें" : "Select Date & Time"}
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "Hindi" ? "तारीख" : "Date"}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "Hindi" ? "समय" : "Time"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 border rounded-lg ${
                        selectedTime === time ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  {language === "Hindi" ? "पिछला" : "Back"}
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400"
                >
                  {language === "Hindi" ? "अगला कदम" : "Next Step"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Customer Details */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {language === "Hindi" ? "आपका विवरण" : "Your Details"}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === "Hindi" ? "पूरा नाम" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder={language === "Hindi" ? "आपका पूरा नाम" : "Your full name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === "Hindi" ? "फोन नंबर" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder={language === "Hindi" ? "आपका फोन नंबर" : "Your phone number"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === "Hindi" ? "ईमेल" : "Email"}
                  </label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder={language === "Hindi" ? "आपका ईमेल" : "Your email"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === "Hindi" ? "पता" : "Address"}
                  </label>
                  <textarea
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    rows="3"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder={language === "Hindi" ? "आपका पूरा पता" : "Your complete address"}
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  {language === "Hindi" ? "पिछला" : "Back"}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!customerDetails.name || !customerDetails.phone || !customerDetails.address}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400"
                >
                  {language === "Hindi" ? "बुकिंग पूरी करें" : "Complete Booking"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- EventCard Component ---
function EventCard({ event, onBook, onWishlist, isInWishlist, language }) {
  const [showPackages, setShowPackages] = useState(false);
  const [showPandits, setShowPandits] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex flex-col hover:shadow-xl transition relative border border-orange-100">
      <button 
        onClick={onWishlist}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 p-1 bg-white/70 rounded-full"
      >
        <Heart size={20} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
      </button>
      
      <img
        src={eventImages[event.name] || "https://images.unsplash.com/photo-1546387903-6d71d4d0d0ba?w=400"}
        alt={event.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      
      <span className="text-gray-800 text-base font-semibold mb-2 truncate">
        {event.name}
      </span>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star className="fill-yellow-400 text-yellow-400 mr-1" size={16} />
          <span className="text-sm font-medium">{event.rating}</span>
        </div>
        <div className="text-lg font-bold text-orange-600">
          {event.isCustom ? (language === "Hindi" ? "कस्टम" : "Custom") : `₹${event.price}`}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 gap-x-1 mb-4 text-xs text-gray-600">
        <div className="flex items-center">
          <Clock size={12} className="mr-1 text-orange-400 flex-shrink-0" />
          <span className="truncate">{event.duration}</span>
        </div>
        <div className="flex items-center">
          <MapPin size={12} className="mr-1 text-orange-400 flex-shrink-0" />
          <span className="truncate">
            {event.location === "ghar" ? (language === "Hindi" ? "घर" : "Home") : 
             event.location === "mandir" ? (language === "Hindi" ? "मंदिर" : "Temple") : 
             event.location === "online" ? (language === "Hindi" ? "ऑनलाइन" : "Online") : 
             event.location}
          </span>
        </div>
        <div className="flex items-center">
          <Users size={12} className="mr-1 text-orange-400 flex-shrink-0" />
          <span className="truncate">
            {event.groupSize === "small" ? (language === "Hindi" ? "छोटा समूह" : "Small Group") : 
             event.groupSize === "medium" ? (language === "Hindi" ? "मध्यम समूह" : "Medium Group") : 
             event.groupSize === "large" ? (language === "Hindi" ? "बड़ा समूह" : "Large Group") : 
             event.groupSize}
          </span>
        </div>
        <div className="flex items-center">
          <Globe size={12} className="mr-1 text-orange-400 flex-shrink-0" />
          <span className="truncate">{event.popularity}% {language === "Hindi" ? "लोकप्रिय" : "Popular"}</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-auto">
        <button
          onClick={onBook}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg px-3 py-2 shadow-md font-semibold transition"
        >
          {language === "Hindi" ? "अभी बुक करें" : "Book Now"}
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPackages(!showPackages)}
            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-md px-2 py-1 font-medium flex items-center justify-center"
          >
            <span>{language === "Hindi" ? "पैकेज" : "Packages"}</span>
          </button>
          <button
            onClick={() => setShowPandits(!showPandits)}
            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-md px-2 py-1 font-medium flex items-center justify-center"
          >
            <span>{language === "Hindi" ? "पंडित" : "Pandits"}</span>
          </button>
        </div>
      </div>
      
      {/* Packages Accordion */}
      <AnimatePresence>
        {showPackages && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3"
          >
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <h4 className="font-bold text-sm text-orange-800 mb-2">
                {language === "Hindi" ? "पूजा पैकेज" : "Puja Packages"}
              </h4>
              {Object.entries(packagesData).map(([name, pkg]) => (
                <div key={name} className="text-xs mb-2 p-1 border-b last:border-b-0">
                  <div className="font-semibold text-gray-700">
                    {name}: {typeof pkg.price === "number" ? `₹${pkg.price}` : pkg.price}
                  </div>
                  <ul className="text-gray-600 list-disc list-inside mt-1 space-y-0.5">
                    {pkg.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pandits Accordion */}
      <AnimatePresence>
        {showPandits && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3"
          >
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <h4 className="font-bold text-sm text-orange-800 mb-2">
                {language === "Hindi" ? "उपलब्ध पंडित" : "Available Pandits"}
              </h4>
              <div className="space-y-2">
                {panditsData.slice(0, 2).map(pandit => (
                  <div key={pandit.id} className="flex items-center text-xs p-1 bg-white rounded-md shadow-sm">
                    <img 
                      src={pandit.image} 
                      alt={pandit.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-700">{pandit.name}</div>
                      <div className="text-gray-600">
                        {pandit.experience} • {pandit.rating}⭐
                      </div>
                    </div>
                  </div>
                ))}
                <button className="text-xs text-orange-600 font-semibold pt-1 block w-full text-center hover:text-orange-800">
                  {language === "Hindi" ? "सभी पंडितों को देखें" : "View all Pandits"} →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- EventsPage Main Component ---
export default function EventsPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [filterPrice, setFilterPrice] = useState([0, 20000]);
  const [filterDuration, setFilterDuration] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterGroupSize, setFilterGroupSize] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const eventsData = getEventData();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleCategory = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };

  const toggleWishlist = (eventName) => {
    if (wishlist.includes(eventName)) {
      setWishlist(wishlist.filter(item => item !== eventName));
    } else {
      setWishlist([...wishlist, eventName]);
    }
  };

  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const filterEvents = (events) => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesPrice = event.price >= filterPrice[0] && event.price <= filterPrice[1];
      const matchesDuration = filterDuration === "all" || 
        (filterDuration === "short" && event.duration.includes("1-2")) ||
        (filterDuration === "medium" && (event.duration.includes("2-3") || event.duration.includes("3-4"))) ||
        (filterDuration === "long" && (event.duration.includes("Full") || event.duration.includes("4-5")));
      const matchesLocation = filterLocation === "all" || event.location === filterLocation;
      const matchesGroupSize = filterGroupSize === "all" || event.groupSize === filterGroupSize;
      
      return matchesSearch && matchesPrice && matchesDuration && matchesLocation && matchesGroupSize;
    });
  };

  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      if (sortOption === "popularity") return b.popularity - a.popularity;
      else if (sortOption === "rating") return b.rating - a.rating;
      else if (sortOption === "price-low") return a.price - b.price;
      else if (sortOption === "price-high") return b.price - a.price;
      return 0;
    });
  };

  const allFilteredEvents = sortEvents(eventsData.flatMap(cat => 
    filterEvents(cat.events).map(event => ({ ...event, category: cat.category }))
  ));

  const getRecommendations = () => {
    if (allFilteredEvents.length === 0) return [];
    const relatedEvents = eventsData.flatMap(cat => 
      cat.events.filter(event => 
        !allFilteredEvents.some(e => e.name === event.name) && 
        (event.category === allFilteredEvents[0].category || 
          event.location === allFilteredEvents[0].location)
      )
    );
    return relatedEvents.slice(0, 4);
  };

  const recommendations = getRecommendations();

  const getDaysUntilFestival = (date) => {
    const today = new Date();
    const festivalDate = new Date(date);
    const diffTime = festivalDate - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : "Soon";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto">
      
      {/* Language Selector */}
      <div className="flex justify-end mt-12">
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-white border border-orange-300 rounded-lg px-3 py-2 text-sm shadow-lg focus:ring-2 focus:ring-orange-400 font-medium mt-12"
        >
          <option value="Hindi">हिंदी</option>
          <option value="English">English</option>
          <option value="Marathi">मराठी</option>
          <option value="Tamil">தமிழ்</option>
          <option value="Telugu">తెలుగు</option>
        </select>
      </div>

      {/* Hero Carousel */}
      <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={banners[bannerIndex]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 drop-shadow-lg">
            {selectedLanguage === "Hindi" ? "आपका कार्यक्रम सहजता से आयोजित करें" : "Organize Your Event Effortlessly"}
          </h1>
          <p className="text-white text-sm md:text-xl mb-4 md:mb-6 drop-shadow">
            {selectedLanguage === "Hindi" ? "हर अवसर के लिए संस्कारा इवेंट सेवाएं" : "Sanskaraa Event Services for Every Occasion"}
          </p>
          <div className="flex space-x-3 md:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookingModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg shadow-xl font-semibold text-sm md:text-base flex items-center"
            >
              <Calendar size={18} className="mr-2" />
              {selectedLanguage === "Hindi" ? "अभी बुक करें" : "Book Now"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-orange-600 px-4 py-2 sm:px-6 sm:py-2 rounded-lg shadow-xl font-semibold text-sm md:text-base flex items-center"
            >
              <Search size={18} className="mr-2" />
              {selectedLanguage === "Hindi" ? "इवेंट्स देखें" : "Explore Events"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Festival Countdown */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
          <Calendar className="mr-2" size={24} />
          {selectedLanguage === "Hindi" ? "आगामी त्योहार" : "Upcoming Festivals"}
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {festivalCountdown.map((festival, index) => (
            <div key={index} className="flex-shrink-0 w-40 sm:w-52 bg-orange-100 rounded-lg overflow-hidden shadow-md border border-orange-200">
              <img src={festival.image} alt={festival.name} className="w-full h-20 sm:h-24 object-cover" />
              <div className="p-3">
                <h3 className="font-bold text-orange-800 text-sm sm:text-base">{festival.name}</h3>
                <p className="text-xs sm:text-sm text-orange-600 font-medium">
                  {getDaysUntilFestival(festival.date)} {selectedLanguage === "Hindi" ? "दिन बाकी" : "days to go"}
                </p>
                <button 
                  onClick={() => handleBookEvent({ name: festival.name + " Puja", price: 2000, duration: "2 hours" })}
                  className="mt-2 text-xs bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition flex items-center"
                >
                  <Calendar size={12} className="mr-1" />
                  {selectedLanguage === "Hindi" ? "पूजा बुक करें" : "Book Puja"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-orange-50/95 rounded-xl p-3 shadow-lg border border-orange-200">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={selectedLanguage === "Hindi" ? "इवेंट या सेवा का नाम खोजें..." : "Search by event or service name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-full px-10 py-2 shadow-sm text-sm focus:ring-2 focus:ring-orange-400"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition flex items-center"
            >
              <Filter size={18} />
            </button>
          </div>
          <div className="w-full md:w-auto">
            <span className="text-sm font-medium text-orange-700 whitespace-nowrap flex items-center">
              <Users className="mr-1" size={16} />
              {selectedLanguage === "Hindi" ? "कुल इवेंट:" : "Total Events:"} {allFilteredEvents.length}
            </span>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pt-4 mt-3 border-t border-orange-200 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 text-sm">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {selectedLanguage === "Hindi" ? "मूल्य सीमा" : "Price Range"} (₹{filterPrice[0]})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="100"
                    value={filterPrice[0]}
                    onChange={(e) => setFilterPrice([parseInt(e.target.value), 20000])}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {selectedLanguage === "Hindi" ? "अवधि" : "Duration"}
                  </label>
                  <select
                    value={filterDuration}
                    onChange={(e) => setFilterDuration(e.target.value)}
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  >
                    <option value="all">{selectedLanguage === "Hindi" ? "सभी" : "All"}</option>
                    <option value="short">{selectedLanguage === "Hindi" ? "छोटी" : "Short"}</option>
                    <option value="medium">{selectedLanguage === "Hindi" ? "मध्यम" : "Medium"}</option>
                    <option value="long">{selectedLanguage === "Hindi" ? "लंबी" : "Long"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {selectedLanguage === "Hindi" ? "स्थान" : "Location"}
                  </label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  >
                    <option value="all">{selectedLanguage === "Hindi" ? "सभी" : "All"}</option>
                    <option value="ghar">{selectedLanguage === "Hindi" ? "घर" : "Home"}</option>
                    <option value="mandir">{selectedLanguage === "Hindi" ? "मंदिर" : "Temple"}</option>
                    <option value="online">{selectedLanguage === "Hindi" ? "ऑनलाइन" : "Online"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {selectedLanguage === "Hindi" ? "समूह आकार" : "Group Size"}
                  </label>
                  <select
                    value={filterGroupSize}
                    onChange={(e) => setFilterGroupSize(e.target.value)}
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  >
                    <option value="all">{selectedLanguage === "Hindi" ? "सभी" : "All"}</option>
                    <option value="small">{selectedLanguage === "Hindi" ? "छोटा" : "Small"}</option>
                    <option value="medium">{selectedLanguage === "Hindi" ? "मध्यम" : "Medium"}</option>
                    <option value="large">{selectedLanguage === "Hindi" ? "बड़ा" : "Large"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {selectedLanguage === "Hindi" ? "क्रमबद्ध करें" : "Sort By"}
                  </label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full border rounded-lg px-2 py-1.5 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                  >
                    <option value="popularity">{selectedLanguage === "Hindi" ? "लोकप्रियता" : "Popularity"}</option>
                    <option value="rating">{selectedLanguage === "Hindi" ? "रेटिंग" : "Rating"}</option>
                    <option value="price-low">{selectedLanguage === "Hindi" ? "कम मूल्य" : "Price: Low"}</option>
                    <option value="price-high">{selectedLanguage === "Hindi" ? "उच्च मूल्य" : "Price: High"}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wishlist Section */}
      {wishlist.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <Heart className="mr-2 fill-red-500 text-red-500" size={24} />
            {selectedLanguage === "Hindi" ? "आपकी विशलिस्ट" : "Your Wishlist"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((eventName, i) => {
              const event = eventsData.flatMap(cat => cat.events).find(e => e.name === eventName);
              if (!event) return null;
              
              return (
                <div key={i} className="bg-white rounded-xl shadow-md p-3 flex flex-col text-center transition relative border border-orange-100">
                  <button 
                    onClick={() => toggleWishlist(eventName)}
                    className="absolute top-2 right-2 text-red-500 p-1 bg-white/70 rounded-full"
                  >
                    <Heart className="fill-red-500" size={20} />
                  </button>
                  <img
                    src={eventImages[eventName]}
                    alt={eventName}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <span className="text-gray-800 text-sm font-semibold mb-2 truncate">
                    {eventName.split('/')[0].trim()}
                  </span>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                    <span className="text-xs">{event.rating}</span>
                  </div>
                  <button
                    onClick={() => handleBookEvent(event)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md px-3 py-1.5 shadow mt-auto flex items-center justify-center"
                  >
                    <Calendar size={12} className="mr-1" />
                    {selectedLanguage === "Hindi" ? "बुक करें" : "Book Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Results OR Event Categories */}
      <div id="events-section">
        {searchQuery.trim() !== "" || showFilters ? (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl font-bold text-orange-700 mb-4">
              {selectedLanguage === "Hindi" ? "खोज परिणाम" : "Search Results"} 
              {allFilteredEvents.length > 0 && ` (${allFilteredEvents.length})`}
            </h2>
            {allFilteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFilteredEvents.map((event, i) => (
                  <EventCard 
                    key={i} 
                    event={event} 
                    onBook={() => handleBookEvent(event)}
                    onWishlist={() => toggleWishlist(event.name)}
                    isInWishlist={wishlist.includes(event.name)}
                    language={selectedLanguage}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 p-4 text-center border-2 border-dashed border-gray-200 rounded-lg">
                {selectedLanguage === "Hindi" ? "आपकी खोज से कोई इवेंट नहीं मिला।" : "No events found for your search."}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-800 flex items-center">
              <Star className="mr-2 fill-orange-500 text-orange-500" size={28} />
              {selectedLanguage === "Hindi" ? "सभी संस्कृतिक इवेंट्स" : "All Cultural Events"}
            </h2>
            {eventsData.map((category, idx) => {
              const filtered = filterEvents(category.events);
              if (filtered.length === 0) return null;

              return (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-t-4 border-orange-500">
                  <button
                    onClick={() => toggleCategory(idx)}
                    className="w-full flex justify-between items-center text-lg md:text-xl font-bold text-orange-700 hover:text-orange-900 transition"
                  >
                    <span className="flex items-center">
                      {category.category.split(' ')[0]} {category.category.split(' ')[1]}
                    </span>
                    {openCategory === idx ? (
                      <ChevronUp className="h-6 w-6 text-orange-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-orange-600" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openCategory === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sortEvents(filtered).map((event, i) => (
                            <EventCard 
                              key={i} 
                              event={event} 
                              onBook={() => handleBookEvent(event)}
                              onWishlist={() => toggleWishlist(event.name)}
                              isInWishlist={wishlist.includes(event.name)}
                              language={selectedLanguage}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <Users className="mr-2" size={24} />
            {selectedLanguage === "Hindi" 
              ? "आपके लिए सुझावित इवेंट" 
              : "Recommended Events for You"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.map((event, i) => (
              <div key={i} className="bg-orange-50 rounded-xl shadow-md p-3 flex flex-col text-center transition relative border border-orange-200">
                <img
                  src={eventImages[event.name]}
                  alt={event.name}
                  className="w-full h-24 object-cover rounded-lg mb-3"
                />
                <span className="text-gray-800 text-xs sm:text-sm mb-2 font-semibold truncate">
                  {event.name.split('/')[0].trim()}
                </span>
                <div className="flex items-center justify-center mb-2">
                  <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                  <span className="text-xs">{event.rating}</span>
                </div>
                <button
                  onClick={() => handleBookEvent(event)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md px-2 py-1.5 shadow mt-auto flex items-center justify-center"
                >
                  <Calendar size={12} className="mr-1" />
                  {selectedLanguage === "Hindi" ? "बुक करें" : "Book Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
          <Star className="mr-2 fill-yellow-400 text-yellow-400" size={24} />
          {selectedLanguage === "Hindi" ? "हमारे ग्राहकों की समीक्षाएं" : "Customer Reviews"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsData.map((review, i) => (
            <div key={i} className="bg-orange-50 rounded-lg p-4 shadow-sm border-l-4 border-orange-400">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, starIdx) => (
                  <Star 
                    key={starIdx} 
                    size={16} 
                    className={starIdx < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                ))}
                <span className="text-sm font-semibold ml-2 text-gray-800">{review.rating}.0</span>
              </div>
              <p className="text-gray-700 text-sm italic mb-2">"{review.comment}"</p>
              <p className="text-gray-600 text-xs font-medium">- {review.user} ({review.event.split('/')[0].trim()})</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-orange-200 rounded-xl p-6 shadow-2xl border-t-8 border-orange-500">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-orange-700">
            {selectedLanguage === "Hindi" ? "कोई प्रश्न है?" : "Have Questions?"}
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            {selectedLanguage === "Hindi" 
              ? "हमारी टीम आपकी मदद के लिए यहाँ है!" 
              : "Our team is here to help you!"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Phone className="mx-auto mb-2 text-orange-500" size={24} />
            <h3 className="font-semibold text-orange-700">Call Us</h3>
            <p className="text-sm text-gray-600">+91 98765 43210</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Mail className="mx-auto mb-2 text-orange-500" size={24} />
            <h3 className="font-semibold text-orange-700">Email Us</h3>
            <p className="text-sm text-gray-600">support@sanskaraa.com</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <User className="mx-auto mb-2 text-orange-500" size={24} />
            <h3 className="font-semibold text-orange-700">Live Chat</h3>
            <p className="text-sm text-gray-600">24/7 Available</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-center p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
          {selectedLanguage === "Hindi" ? "आज ही अपना इवेंट बुक करें!" : "Book Your Event Today!"}
        </h2>
        <p className="text-orange-100 mb-6 text-sm sm:text-base">
          {selectedLanguage === "Hindi" 
            ? "विशेषज्ञ पंडित जी और संपूर्ण पूजा किट आपके द्वार पर उपलब्ध!" 
            : "Expert Pandit Ji & Complete Puja Kit Delivered to Your Doorstep!"}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBookingModal(true)}
          className="bg-white text-orange-600 px-8 py-3 rounded-xl shadow-xl hover:bg-orange-50 font-bold transition text-base flex items-center mx-auto"
        >
          <Calendar className="mr-2" size={20} />
          {selectedLanguage === "Hindi" ? "बुकिंग शुरू करें" : "Start Booking"}
        </motion.button>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        event={selectedEvent}
        language={selectedLanguage}
      />
    </div>
  );
}