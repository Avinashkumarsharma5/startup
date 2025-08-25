import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleCategory = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-6 space-y-8">
      {/* Hero Carousel */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg  mt-20">
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
          placeholder="Search by name / city / date..."
          className="w-full md:w-2/3 border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Event Categories */}
      <div className="space-y-6">
        {eventsData.map((category, idx) => (
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

            {openCategory === idx && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.events.map((event, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between text-center hover:bg-orange-50 transition"
                  >
                    <span className="text-gray-800 text-sm md:text-base mb-3 font-medium">
                      {event}
                    </span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm rounded-md px-3 py-2 shadow">
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
