import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  "src/assets/images/sanskaraa1.png",
  "src/assets/images/sanskaraa banner1.jpg",
  "src/assets/images/banner1.png",
];

// --- Event Images Mapping (replace with your real images) ---
const eventImages = {
  // 🏡 Ghar ke Sanskaar
  "Griha Pravesh / गृह प्रवेश": "https://th.bing.com/th/id/OIP.v9bx4BEkqD3o1qgOCHgsqAAAAA?w=222&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=320",
  "Vastu Shanti / वास्तु शांति": "src/assets/images/vastu-shanti.jpg",
  "Navagraha Shanti / नवग्रह शांति": "src/assets/images/navagraha.jpg",
  "Sundarkand Path / सुंदरकांड पाठ": "src/assets/images/sundarkand.jpg",
  "Ramayan Path / रामायण पाठ": "src/assets/images/ramayan.jpg",
  "Satyanarayan Katha / सत्यनारायण कथा": "src/assets/images/satyanarayan.jpg",
  "Lakshmi Puja / लक्ष्मी पूजा": "src/assets/images/lakshmi.jpg",
  "Ganesh Puja / गणेश पूजा": "src/assets/images/ganesh.jpg",
  "Durga Saptashati / दुर्गा सप्तशती पाठ": "src/assets/images/durga.jpg",
  "Hanuman Chalisa Path / हनुमान चालीसा पाठ": "src/assets/images/hanuman.jpg",

  // 👶 Bacchon ke Sanskaar
  "Naamkaran Sanskar / नामकरण संस्कार": "src/assets/images/naamkaran.jpg",
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

const eventsData = [
  {
    category: "🏡 Ghar ke Sanskaar",
    events: [
      "Griha Pravesh / गृह प्रवेश",
      "Vastu Shanti / वास्तु शांति",
      "Navagraha Shanti / नवग्रह शांति",
      "Sundarkand Path / सुंदरकांड पाठ",
      "Ramayan Path / रामायण पाठ",
      "Satyanarayan Katha / सत्यनारायण कथा",
      "Lakshmi Puja / लक्ष्मी पूजा",
      "Ganesh Puja / गणेश पूजा",
      "Durga Saptashati / दुर्गा सप्तशती पाठ",
      "Hanuman Chalisa Path / हनुमान चालीसा पाठ",
    ],
  },
  {
    category: "👶 Bacchon ke Sanskaar",
    events: [
      "Naamkaran Sanskar / नामकरण संस्कार",
      "Annaprashan / अन्नप्राशन",
      "Mundan Sanskar / मुंडन संस्कार",
      "Janamdin Puja / जन्मदिन पूजा",
    ],
  },
  {
    category: "💑 Vivah Sanskar",
    events: [
      "Vivah / विवाह",
      "Roka / रोका समारोह",
      "Sagai / सगाई",
      "Haldi / हल्दी रस्म",
      "Mehendi / मेहंदी",
      "Sangeet / संगीत",
      "Reception / रिसेप्शन",
      "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा",
    ],
  },
  {
    category: "⚰ Pitrakarya",
    events: [
      "Antim Sanskar / अंतिम संस्कार",
      "Pind Daan / पिंडदान",
      "Shraddh / श्राद्ध पूजा",
      "Asthi Visarjan / अस्थि विसर्जन",
      "Tehravin / तेरहवीं संस्कार",
    ],
  },
  {
    category: "📿 Festival Pujas",
    events: [
      "Karwa Chauth Puja / करवा चौथ पूजा",
      "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा",
      "Raksha Bandhan / रक्षा बंधन पूजा",
      "Navratri Puja / नवरात्रि पूजा",
      "Saraswati Puja / सरस्वती पूजा",
      "Mahashivratri Puja / महाशिवरात्रि पूजा",
      "Chhath Puja / छठ पूजा",
      "Holi Dahan Puja / होली दहन पूजा",
      "Janmashtami Puja / जन्माष्टमी पूजा",
    ],
  },
  {
    category: "🛕 Temple / Special Pujas",
    events: [
      "Rudrabhishek / रुद्राभिषेक",
      "Mahamrityunjaya Jaap / महामृत्युंजय जाप",
      "Bhumi Pujan / भूमि पूजन",
      "Kundali Shanti / कुंडली शांति",
      "Upanayan Sanskar / उपनयन संस्कार",
      "Kalash Sthapana / कलश स्थापना",
      "Ayushya Homam / आयुष्य हवन",
    ],
  },
  {
    category: "🧾 Others / Custom Options",
    events: [
      "Personalized Puja Package / व्यक्तिगत पूजा पैकेज",
      "Online Puja Seva / ऑनलाइन पूजा सेवा",
      "Customized Event Plan / कस्टम इवेंट प्लान",
    ],
  },
];

export default function EventsPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleCategory = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };

  const filterEvents = (events) =>
    events.filter((e) =>
      e.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-6 space-y-8">
      {/* Hero Carousel */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mt-20">
        <img
          src={banners[bannerIndex]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow">
            Organize Your Event Effortlessly
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 drop-shadow">
            Sanskaraa Event Services for Every Occasion
          </p>
          <div className="flex space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow">
              Book Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-orange-600 px-6 py-2 rounded-lg shadow">
              Explore Events
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by event name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-2/3 border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Event Categories */}
      <div className="space-y-6">
        {eventsData.map((category, idx) => {
          const filtered = filterEvents(category.events);
          if (filtered.length === 0) return null;

          return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-4">
              <button
                onClick={() => toggleCategory(idx)}
                className="w-full flex justify-between items-center text-lg font-semibold text-orange-700"
              >
                {category.category}
                {openCategory === idx ? (
                  <ChevronUp className="h-5 w-5 text-orange-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-orange-600" />
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
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {filtered.map((event, i) => (
    <div
      key={i}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col text-center hover:bg-orange-50 transition"
    >
      <img
        src={eventImages[event] || "src/assets/images/default.png"}
        alt={event}
        className="w-full h-28 object-cover rounded-lg mb-3"
      />
      <span className="text-gray-800 text-sm md:text-base mb-3 font-medium">
        {event}
      </span>
      <button
        onClick={() =>
          navigate(`/book?event=${encodeURIComponent(event)}`)
        }
        className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm rounded-md px-3 py-2 shadow"
      >
        Book Now
      </button>
    </div>
  ))}
</div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-orange-100 rounded-xl text-center p-6 shadow">
        <h2 className="text-2xl font-bold mb-2 text-orange-700">
          Book Your Event Today!
        </h2>
        <p className="text-gray-700 mb-4">
          Expert Pandit Ji & Complete Puja Kit Delivered!
        </p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600">
          Start Booking
        </button>
      </div>
    </div>
  );
}
