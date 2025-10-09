import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Filter, Heart, Share, Star, Calendar, Clock, MapPin, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data Setup ---

const banners = [
  "src/assets/images/decor2.png",
  "src/assets/images/decor3.png",
  "src/assets/images/sanskaraa app.png",
];

const eventImages = {
  // 🏡 Ghar ke Sanskaar
  "Griha Pravesh / गृह प्रवेश": "src/assets/images/grrih prews 1.png",
  "Vastu Shanti / वास्तु शांति": "src/assets/images/havan.jpg",
  "Navagraha Shanti / नवग्रह शांति": "src/assets/images/navagraha.jpg",
  "Sundarkand Path / सुंदरकांड पाठ": "src/assets/images/sundarkand.jpg",
  "Ramayan Path / रामायण पाठ": "src/assets/images/ramayan.jpg",
  "Satyanarayan Katha / सत्यनारायण कथा": "src/assets/images/satyanarayan.jpg",
  "Lakshmi Puja / लक्ष्मी पूजा": "src/assets/images/lakshmi.jpg",
  "Ganesh Puja / गणेश पूजा": "src/assets/images/ganesh.jpg",
  "Durga Saptashati / दुर्गा सप्तशती पाठ": "src/assets/images/durga.jpg",
  "Hanuman Chalisa Path / हनुमान चालीसा पाठ": "src/assets/images/hanuman.jpg",
  // 👶 Bacchon ke Sanskaar
  "Naamkaran Sanskar / नामकरण संस्कार": "https://dhaarmi.com/wp-content/uploads/2024/03/vastu-pooja.webp",
  "Annaprashan / अन्नप्राशन": "src/assets/images/annaprashan.jpg",
  "Mundan Sanskar / मुंडन संस्कार": "src/assets/images/mundan.jpg",
  "Janamdin Puja / जन्मदिन पूजा": "src/assets/images/birthday.jpg",
  // 💑 Vivah Sanskar
  "Vivah / विवाह": "src/assets/images/vivah.jpg",
  "Roka / रोका समारोह": "src/assets/images/roka.jpg",
  "Sagai / सगाई": "src/assets/images/sagai.jpg",
  "Haldi / हल्दी रस्म": "src/assets/images/haldi.jpg",
  "Mehendi / मेहंदी": "src/assets/images/mehendi.jpg",
  "Sangeet / संगीत": "src/assets/images/sangeet.jpg",
  "Reception / रिसेप्शन": "src/assets/images/reception.jpg",
  "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा": "src/assets/images/anniversary.jpg",
  // ⚰ Pitrakarya
  "Antim Sanskar / अंतिम संस्कार": "src/assets/images/antim.jpg",
  "Pind Daan / पिंडदान": "src/assets/images/pind-daan.jpg",
  "Shraddh / श्राद्ध पूजा": "src/assets/images/shraddh.jpg",
  "Asthi Visarjan / अस्थि विसर्जन": "src/assets/images/asthi.jpg",
  "Tehravin / तेरहवीं संस्कार": "src/assets/images/tehravin.jpg",
  // 📿 Festival Pujas
  "Karwa Chauth Puja / करवा चौथ पूजा": "src/assets/images/karwa.jpg",
  "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा": "src/assets/images/diwali.jpg",
  "Raksha Bandhan / रक्षा बंधन पूजा": "src/assets/images/raksha.jpg",
  "Navratri Puja / नवरात्रि पूजा": "src/assets/images/navratri.jpg",
  "Saraswati Puja / सरस्वती पूजा": "src/assets/images/saraswati.jpg",
  "Mahashivratri Puja / महाशिवरात्रि पूजा": "src/assets/images/shivratri.jpg",
  "Chhath Puja / छठ पूजा": "src/assets/images/chhath.jpg",
  "Holi Dahan Puja / होली दहन पूजा": "src/assets/images/holi.jpg",
  "Janmashtami Puja / जन्माष्टमी पूजा": "src/assets/images/janmashtami.jpg",
  // 🛕 Temple / Special Pujas
  "Rudrabhishek / रुद्राभिषेक": "src/assets/images/rudrabhishek.jpg",
  "Mahamrityunjaya Jaap / महामृत्युंजय जाप": "src/assets/images/mahamrityunjaya.jpg",
  "Bhumi Pujan / भूमि पूजन": "src/assets/images/bhumi.jpg",
  "Kundali Shanti / कुंडली शांति": "src/assets/images/kundali.jpg",
  "Upanayan Sanskar / उपनयन संस्कार": "src/assets/images/upnayan.jpg",
  "Kalash Sthapana / कलश स्थापना": "src/assets/images/kalash.jpg",
  "Ayushya Homam / आयुष्य हवन": "src/assets/images/ayushya.jpg",
  // 🧾 Others / Custom Options
  "Personalized Puja Package / व्यक्तिगत पूजा पैकेज": "src/assets/images/custom-package.jpg",
  "Online Puja Seva / ऑनलाइन पूजा सेवा": "src/assets/images/online.jpg",
  "Customized Event Plan / कस्टम इवेंट प्लान": "src/assets/images/custom-plan.jpg",
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
  { id: 1, name: "Pandit Ravi Shankar", experience: "15 years", languages: ["Hindi", "English"], rating: 4.9, image: "src/assets/images/panditji 2.png" },
  { id: 2, name: "Pandit Vijay Kumar", experience: "12 years", languages: ["Hindi", "Marathi"], rating: 4.8, image: "src/assets/images/panditji 3.png" },
  { id: 3, name: "Pandit Suresh Sharma", experience: "10 years", languages: ["Hindi", "Tamil"], rating: 4.7, image: "src/assets/images/pandit.jpg" },
  { id: 4, name: "Pandit Anil Joshi", experience: "18 years", languages: ["Hindi", "Gujarati"], rating: 4.9, image: "ssrc/assets/images/panditji 2.png" },
  { id: 5, name: "Pandit Mohan Lal", experience: "8 years", languages: ["Hindi", "Telugu"], rating: 4.6, image: "src/assets/images/panditji 3.png" },
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
  { name: "Diwali", date: "2023-11-12", image: "src/assets/images/sadi1.jpg" },
  { name: "Holi", date: "2024-03-25", image: "src/assets/images/sanskaraa kit2.png" },
  { name: "Navratri", date: "2023-10-15", image: "src/assets/images/kit puja.png" },
];

// --- EventCard Component (Made Responsive) ---

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
        src={eventImages[event.name] || "src/assets/images/default.png"}
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
            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-md px-2 py-1 font-medium"
          >
            {language === "Hindi" ? "पैकेज विवरण" : "Package Details"}
          </button>
          <button
            onClick={() => setShowPandits(!showPandits)}
            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs rounded-md px-2 py-1 font-medium"
          >
            {language === "Hindi" ? "पंडित जानकारी" : "Pandit Info"}
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
                      onError={(e) => { e.target.onerror = null; e.target.src = "src/assets/images/pandit.jpg" }} // Fallback
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

// --- EventsPage Main Component (Made Responsive) ---

export default function EventsPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi"); // Defaulting to Hindi for Indian context
  const [filterPrice, setFilterPrice] = useState([0, 20000]);
  const [filterDuration, setFilterDuration] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterGroupSize, setFilterGroupSize] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
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

  const filterEvents = (events) => {
    return events.filter(event => {
      // Search filter
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      // Price filter
      const matchesPrice = event.price >= filterPrice[0] && event.price <= filterPrice[1];
      
      // Duration filter
      const matchesDuration = filterDuration === "all" || 
        (filterDuration === "short" && event.duration.includes("1-2")) ||
        (filterDuration === "medium" && (event.duration.includes("2-3") || event.duration.includes("3-4"))) ||
        (filterDuration === "long" && (event.duration.includes("Full") || event.duration.includes("4-5")));
      
      // Location filter
      const matchesLocation = filterLocation === "all" || event.location === filterLocation;
      
      // Group size filter
      const matchesGroupSize = filterGroupSize === "all" || event.groupSize === filterGroupSize;
      
      return matchesSearch && matchesPrice && matchesDuration && matchesLocation && matchesGroupSize;
    });
  };

  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      if (sortOption === "popularity") {
        return b.popularity - a.popularity;
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      } else if (sortOption === "price-low") {
        return a.price - b.price;
      } else if (sortOption === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });
  };

  // Collect all matching events for search
  const allFilteredEvents = sortEvents(eventsData.flatMap(cat => 
    filterEvents(cat.events).map(event => ({ ...event, category: cat.category }))
  ));

  // Get personalized recommendations based on wishlist and search
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

  // Calculate days until next festival
  const getDaysUntilFestival = (date) => {
    const today = new Date();
    const festivalDate = new Date(date);
    const diffTime = festivalDate - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days : "Soon";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto">
      
      {/* Language Selector (Fixed position for accessibility) */}
      <div className="fixed top-2 right-4 md:top-4 md:right-8 z-50">
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-white border border-orange-300 rounded-lg px-3 py-1 text-sm shadow-lg focus:ring-2 focus:ring-orange-400 font-medium"
        >
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Marathi">Marathi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
        </select>
      </div>

      {/* Hero Carousel */}
      <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl mt-12 md:mt-4">
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
              onClick={() => navigate("/book")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg shadow-xl font-semibold text-sm md:text-base"
            >
              {selectedLanguage === "Hindi" ? "अभी बुक करें" : "Book Now"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-orange-600 px-4 py-2 sm:px-6 sm:py-2 rounded-lg shadow-xl font-semibold text-sm md:text-base"
            >
              {selectedLanguage === "Hindi" ? "इवेंट्स देखें" : "Explore Events"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Festival Countdown */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-bold text-orange-700 mb-4">
          {selectedLanguage === "Hindi" ? "आगामी त्योहार" : "Upcoming Festivals"}
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {festivalCountdown.map((festival, index) => (
            <div key={index} className="flex-shrink-0 w-40 sm:w-52 bg-orange-100 rounded-lg overflow-hidden shadow-md border border-orange-200">
              <img src={festival.image} alt={festival.name} className="w-full h-20 sm:h-24 object-cover" loading="lazy" />
              <div className="p-3">
                <h3 className="font-bold text-orange-800 text-sm sm:text-base">{festival.name}</h3>
                <p className="text-xs sm:text-sm text-orange-600 font-medium">
                  {getDaysUntilFestival(festival.date)} {selectedLanguage === "Hindi" ? "दिन बाकी" : "days to go"}
                </p>
                <button 
                  onClick={() => navigate(`/book?event=${encodeURIComponent(festival.name + " Puja")}`)}
                  className="mt-2 text-xs bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition"
                >
                  {selectedLanguage === "Hindi" ? "पूजा बुक करें" : "Book Puja"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 md:top-4 z-20 bg-orange-50/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={selectedLanguage === "Hindi" ? "इवेंट या सेवा का नाम खोजें..." : "Search by event or service name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-full px-5 py-2 shadow-sm text-sm focus:ring-2 focus:ring-orange-400 pr-12"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition"
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter size={18} />
            </button>
          </div>
          <motion.div layout="position" className="w-full md:w-auto">
            <span className="text-sm font-medium text-orange-700 whitespace-nowrap">
              {selectedLanguage === "Hindi" ? "कुल इवेंट:" : "Total Events:"} {allFilteredEvents.length}
            </span>
          </motion.div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              id="filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4 mt-3 border-t border-orange-200 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 text-sm">
                
                {/* Price Filter */}
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
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer range-lg"
                  />
                </div>

                {/* Duration Filter */}
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
                    <option value="short">{selectedLanguage === "Hindi" ? "छोटी (1-2 घंटा)" : "Short (1-2 hrs)"}</option>
                    <option value="medium">{selectedLanguage === "Hindi" ? "मध्यम (2-4 घंटा)" : "Medium (2-4 hrs)"}</option>
                    <option value="long">{selectedLanguage === "Hindi" ? "लंबी (4+ घंटा)" : "Long (4+ hrs)"}</option>
                  </select>
                </div>

                {/* Location Filter */}
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
                    <option value="ghat">{selectedLanguage === "Hindi" ? "घाट/नदी" : "Ghat/River"}</option>
                  </select>
                </div>

                {/* Group Size Filter */}
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

                {/* Sort Options */}
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
                    <option value="price-low">{selectedLanguage === "Hindi" ? "कम मूल्य" : "Price: Low to High"}</option>
                    <option value="price-high">{selectedLanguage === "Hindi" ? "उच्च मूल्य" : "Price: High to Low"}</option>
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
                    src={eventImages[eventName] || "src/assets/images/default.png"}
                    alt={eventName}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <span className="text-gray-800 text-sm font-semibold mb-2 truncate">
                    {eventName.split('/')[0].trim()}
                  </span>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                    <span className="text-xs">{event.rating}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/book?event=${encodeURIComponent(eventName)}`)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md px-3 py-1.5 shadow mt-auto"
                  >
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
          // Search Results View
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
                    onBook={() => navigate(`/book?event=${encodeURIComponent(event.name)}`)}
                    onWishlist={() => toggleWishlist(event.name)}
                    isInWishlist={wishlist.includes(event.name)}
                    language={selectedLanguage}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 p-4 text-center border-2 border-dashed border-gray-200 rounded-lg">
                {selectedLanguage === "Hindi" ? "आपकी खोज से कोई इवेंट नहीं मिला। कृपया अपने फ़िल्टर समायोजित करें।" : "No events found for your search. Please adjust your filters."}
              </p>
            )}
          </div>
        ) : (
          // Category View (Accordion)
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-800">
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
                    {category.category}
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
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sortEvents(filtered).map((event, i) => (
                            <EventCard 
                              key={i} 
                              event={event} 
                              onBook={() => navigate(`/book?event=${encodeURIComponent(event.name)}`)}
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
          <h2 className="text-xl font-bold text-orange-700 mb-4">
            {selectedLanguage === "Hindi" 
              ? "आपके लिए सुझावित इवेंट" 
              : "Recommended Events for You"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendations.map((event, i) => (
              <div key={i} className="bg-orange-50 rounded-xl shadow-md p-3 flex flex-col text-center transition relative border border-orange-200">
                <img
                  src={eventImages[event.name] || "src/assets/images/default.png"}
                  alt={event.name}
                  className="w-full h-24 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <span className="text-gray-800 text-xs sm:text-sm mb-2 font-semibold truncate">
                  {event.name.split('/')[0].trim()}
                </span>
                <div className="flex items-center justify-center mb-2">
                    <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                    <span className="text-xs">{event.rating}</span>
                </div>
                <button
                  onClick={() => navigate(`/book?event=${encodeURIComponent(event.name)}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md px-2 py-1.5 shadow mt-auto"
                >
                  {selectedLanguage === "Hindi" ? "बुक करें" : "Book Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-xl font-bold text-orange-700 mb-4">
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

      {/* Final CTA */}
      <div className="bg-orange-200 rounded-xl text-center p-6 shadow-2xl border-t-8 border-orange-500">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-orange-700">
          {selectedLanguage === "Hindi" ? "आज ही अपना इवेंट बुक करें!" : "Book Your Event Today!"}
        </h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          {selectedLanguage === "Hindi" 
            ? "विशेषज्ञ पंडित जी और संपूर्ण पूजा किट आपके द्वार पर उपलब्ध!" 
            : "Expert Pandit Ji & Complete Puja Kit Delivered to Your Doorstep!"}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/book")}
          className="bg-orange-600 text-white px-8 py-3 rounded-xl shadow-xl hover:bg-orange-700 font-bold transition text-base"
        >
          {selectedLanguage === "Hindi" ? "बुकिंग शुरू करें" : "Start Booking"}
        </motion.button>
      </div>
    </div>
  );
}