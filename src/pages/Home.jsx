import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  User,
  Calendar,
  Package,
  Sparkles,
  Bookmark,
  Menu,
  ShoppingCart,
  Mic,
  Phone,
  MessageCircle,
  Gift,
  Star,
  Clock,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sanskrit shlokas and quotes for different times of day
const dailyShlokas = {
  morning: [
    "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्।",
    "कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले स्थितो ब्रह्मा प्रभाते करदर्शनम्॥",
    "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत। क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति॥"
  ],
  afternoon: [
    "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
    "असंखेयाः समुद्रस्य शीकराः पर्वतस्य च। उपमा लोकरक्षितुर्नास्ति तुल्यः प्रभुर्हरिः॥"
  ],
  evening: [
    "शांति मंत्र: ॐ द्यौ: शान्तिरन्तरिक्षं शान्ति: पृथिवी शान्तिराप: शान्तिरोषधय: शान्ति:।",
    "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥"
  ],
  night: [
    "शुभरात्रि, ध्यान और आशीर्वाद",
    "करजये वसते लक्ष्मी, करमध्ये सरस्वती, करमूले तु गोविन्दः, प्रभाते करदर्शनम्।",
    "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्विनावधीतमस्तु मा विद्विषावहै। ॐ शान्तिः शान्तिः शान्तिः॥"
  ]
};

// Sample events data
const upcomingEvents = [
  { id: 1, name: "Ganesh Chaturthi", date: "2025-09-12", type: "festival" },
  { id: 2, name: "Satyanarayan Puja", date: "2025-08-25", type: "booking" },
  { id: 3, name: "Navratri", date: "2025-09-30", type: "festival" },
  { id: 4, name: "Griha Pravesh", date: "2025-08-20", type: "booking" }
];

// Sample testimonials
const testimonials = [
  { id: 1, name: "Rajesh Kumar", rating: 5, review: "Excellent service, very satisfied with the puja arrangements.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Priya Singh", rating: 4, review: "Pandit ji was very knowledgeable and punctual.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Vikram Mehta", rating: 5, review: "The puja kit was complete and of good quality.", image: "https://randomuser.me/api/portraits/men/67.jpg" }
];

// Sample offers
const specialOffers = [
  { id: 1, title: "Ganesh Puja Kits", discount: "20% off", expiry: "2025-09-10" },
  { id: 2, title: "Navratri Special", discount: "15% off", expiry: "2025-09-25" },
  { id: 3, title: "Wedding Puja Package", discount: "25% off", expiry: "2025-10-15" }
];

// Sample past bookings
const pastBookings = [
  { id: 1, name: "Satyanarayan Puja", date: "2025-07-15", status: "completed" },
  { id: 2, name: "Griha Pravesh", date: "2025-06-20", status: "completed" }
];

// ----------------- Dynamic Greeting Component -----------------
function DynamicGreeting() {
  const [greeting, setGreeting] = useState("");
  const [shloka, setShloka] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let timeOfDay;
      
      if (hour >= 5 && hour < 12) {
        timeOfDay = "morning";
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = "afternoon";
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        timeOfDay = "evening";
        setGreeting("Good evening");
      } else {
        timeOfDay = "night";
        setGreeting("Good night");
      }

      // Select a random shloka for the time of day
      const shlokas = dailyShlokas[timeOfDay];
      const randomIndex = Math.floor(Math.random() * shlokas.length);
      setShloka(shlokas[randomIndex]);
    };

    updateGreeting();
    // Update every hour
    const interval = setInterval(updateGreeting, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12"
    >
      <p className="text-gray-600 text-sm">{greeting},</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#800000]">Avinash Sharma</h2>
      <p className="mt-2 text-sm text-amber-800 bg-amber-100 p-2 rounded-lg">{shloka}</p>
    </motion.div>
  );
}

// ----------------- Daily Panchang Widget -----------------
function PanchangWidget() {
  const [panchang, setPanchang] = useState({
    tithi: "Shukla Paksha Dwadashi",
    nakshatra: "Uttara Phalguni",
    yoga: "Vyaghata",
    muhurat: "09:00 AM - 11:30 AM"
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 bg-white rounded-xl p-3 shadow-md border border-orange-200"
    >
      <h3 className="font-semibold text-[#800000] text-center mb-2">Today's Panchang</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="font-medium">Tithi:</span> {panchang.tithi}
        </div>
        <div>
          <span className="font-medium">Nakshatra:</span> {panchang.nakshatra}
        </div>
        <div>
          <span className="font-medium">Yoga:</span> {panchang.yoga}
        </div>
        <div>
          <span className="font-medium">Muhurat:</span> {panchang.muhurat}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------- Search Bar with Voice -----------------
function AnimatedSearch({ onVoiceSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-4"
    >
      <div className="flex items-center bg-[#FFF7E0] rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-amber-400 transition-all shadow-sm">
        <Search className="w-5 h-5 text-orange-500" />
        <input
          type="text"
          placeholder="Search pujas, pandits..."
          className="ml-2 bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
        />
        <button onClick={onVoiceSearch} className="p-1">
          <Mic className="w-5 h-5 text-orange-500" />
        </button>
      </div>
    </motion.div>
  );
}

// ----------------- Hero Banner -----------------
function HeroBanner() {
  const slides = [
    {
      id: 1,
      img: "src/assets/images/grrih prews 1.png",
      title: "Griha Pravesh Puja",
      subtitle: "Sacred beginnings with blessings",
    },
    {
      id: 2,
      img: "src/assets/images/ganesh puja 1.jpeg",
      title: "Satyanarayan Puja",
      subtitle: "Invoke prosperity & harmony",
    },
    {
      id: 3,
      img: "src/assets/images/decor2.png",
      title: "Wedding Rituals",
      subtitle: "Memorable sacred unions",
    },
  ];

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const start = () => {
    stop();
    timerRef.current = setInterval(next, 4000);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    start();
    return stop;
  }, []);

  return (
    <div
      className="relative mt-6 rounded-3xl overflow-hidden shadow-lg"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className="flex w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="w-full shrink-0 relative h-64 sm:h-72 md:h-80">
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-5 bottom-5 text-white drop-shadow-md">
              <p className="text-sm opacity-90">{s.subtitle}</p>
              <h3 className="text-xl sm:text-2xl font-bold">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-2 shadow-md hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-2 shadow-md hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              index === i ? "w-6 bg-orange-500" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ----------------- Services -----------------
function ServicesSection() {
  const navigate = useNavigate();

  const services = [
    { name: "Book Event", icon: Calendar, path: "/EventsPage" },
    { name: "Book Pandit", icon: User, path: "/panditbooking" },
    { name: "Puja Kits", icon: Package, path: "/pujakits" },
    { name: "services", icon: Sparkles, path: "/services" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={service.name}
            onClick={() => navigate(service.path)}
            className="bg-[#FFF7E0] rounded-2xl p-4 text-center shadow hover:shadow-lg border border-orange-200 transition"
          >
            <Icon className="mx-auto w-7 h-7 text-orange-500" />
            <p className="font-medium text-gray-800 mt-2">{service.name}</p>
          </motion.button>
        );
      })}
    </div>
  );
}

// ----------------- Upcoming Events Section -----------------
function UpcomingEvents() {
  const navigate = useNavigate();

  // Calculate days until event
  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#800000]">Upcoming Events</h3>
        <button 
          onClick={() => navigate('/bookings')}
          className="text-sm text-orange-600 font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-4">
        {upcomingEvents.map(event => (
          <div 
            key={event.id} 
            className="inline-block w-64 bg-white rounded-2xl p-4 shadow-md border border-orange-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{event.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(event.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
              {event.type === 'festival' && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  Festival
                </span>
              )}
            </div>
            
            <div className="mt-3 flex items-center">
              <Clock className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-sm font-medium text-amber-700">
                {getDaysUntil(event.date)} days left
              </span>
            </div>
            
            <button className="mt-3 w-full bg-amber-100 text-amber-800 py-2 rounded-lg text-sm font-medium hover:bg-amber-200">
              {event.type === 'festival' ? 'Learn More' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Promo Banner -----------------
function GaneshPromo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-5 flex items-center justify-between shadow-lg"
    >
      <div className="flex items-center gap-4">
        <img
          src="src/assets/images/ganesh puja 1.jpeg"
          alt="Ganesh Ji"
          className="w-14 h-14"
        />
        <h3 className="text-lg font-bold text-[#800000]">
          Ganesh Chaturthi Puja
        </h3>
      </div>
      <button className="bg-[#800000] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A52A2A]">
        Book Now
      </button>
    </motion.div>
  );
}

// ----------------- Pandit Availability -----------------
function PanditAvailability() {
  const [panditAvailable, setPanditAvailable] = useState(true);
  
  return (
    <div className="mt-6 bg-white rounded-2xl p-4 shadow-md border border-orange-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#800000]">Pandit Assistance</h3>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${panditAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">{panditAvailable ? 'Available' : 'Busy'}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Connect with our expert pandits for guidance and booking assistance.
      </p>
      
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-amber-100 text-amber-800 py-2 rounded-lg font-medium hover:bg-amber-200">
          <Phone size={16} />
          Call Now
        </button>
        <button className="flex-1 bg-[#800000] text-white py-2 rounded-lg font-medium hover:bg-[#A52A2A]">
          Schedule Call
        </button>
      </div>
    </div>
  );
}

// ----------------- Personalized Dashboard -----------------
function DashboardSection() {
  const navigate = useNavigate();
  const [loyaltyPoints] = useState(350);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-3">Your Dashboard</h3>
      
      <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-800">Loyalty Points</h4>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            {loyaltyPoints} points
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Earn 50 points for every booking. Redeem points for discounts on future pujas.
        </p>
        
        <div className="mb-5">
          <h4 className="font-medium text-gray-800 mb-2">Past Bookings</h4>
          <div className="space-y-2">
            {pastBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{booking.name}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(booking.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/bookings')}
          className="w-full bg-amber-100 text-amber-800 py-2 rounded-lg font-medium hover:bg-amber-200"
        >
          View All Bookings
        </button>
      </div>
    </div>
  );
}

// ----------------- Pandit Profile -----------------
function PanditProfile() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-5">Pandit Ji Profile</h3>
      <div className="bg-[#FFF7E0] rounded-2xl p-4 shadow-md border border-orange-200 space-y-4">
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src="src/assets/images/panditji 3.png"
            alt="Pandit Ji"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-base font-semibold text-gray-800">Pandit Ram Sharma</p>
        <p className="text-sm text-gray-600">
          Specializes in Satyanarayan, Griha Pravesh, Marriage
        </p>
        <div className="flex justify-between">
          <button className="border border-gray-400 px-4 py-1 rounded text-gray-700 hover:bg-gray-100">
            Call
          </button>
          <button className="bg-[#800000] text-white px-4 py-1 rounded hover:bg-[#A52A2A]">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------- Puja Kits -----------------
function PujaKits() {
  const kits = [
    { title: "Grih Pravesh Kit", price: "₹999" },
    { title: "Satyanarayan Kit", price: "₹799" },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-2">Puja Kits</h3>
      <div className="grid grid-cols-2 gap-4">
        {kits.map((kit) => (
          <motion.div
            key={kit.title}
            whileHover={{ scale: 1.03 }}
            className="bg-[#FFF7E0] p-4 rounded-2xl shadow-md border border-orange-200 transition"
          >
            <h4 className="font-medium text-gray-800">{kit.title}</h4>
            <p className="text-sm text-gray-600">{kit.price}</p>
            <button className="mt-3 w-full bg-[#800000] text-white py-2 rounded hover:bg-[#A52A2A]">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Testimonials Section -----------------
function TestimonialsSection() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-3">Testimonials</h3>
      
      <div className="overflow-x-auto whitespace-nowrap pb-6 space-x-8">
        {testimonials.map(testimonial => (
          <div 
            key={testimonial.id} 
            className="inline-block w-64 bg-white rounded-2xl p-6 shadow-md border border-orange-200"
          >
            <div className="flex items-center mb-5">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-15 h-12 rounded-full object-cover mr-7"
              />
              <div>
                <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < testimonial.rating ? "text-amber-500 fill-amber-300" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------- Festival Offers Section -----------------
function FestivalOffers() {
  // Calculate time until offer expires
  const getTimeUntil = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry - now;
    
    if (diffTime <= 0) return "Expired";
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#800000] mb-3">Special Offers</h3>
      
      <div className="overflow-x-auto whitespace-nowrap pb-4 space-x-4">
        {specialOffers.map(offer => {
          const timeLeft = getTimeUntil(offer.expiry);
          const isExpired = timeLeft === "Expired";
          
          return (
            <div 
              key={offer.id} 
              className="inline-block w-56 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-md text-white"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold">{offer.title}</h4>
                <span className="bg-white text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                  {offer.discount}
                </span>
              </div>
              
              <p className="text-sm opacity-90 mb-3">Limited time offer</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${isExpired ? 'text-red-100' : 'text-white'}`}>
                  {timeLeft}
                </span>
                <button 
                  disabled={isExpired}
                  className={`text-xs font-bold py-1 px-3 rounded-full ${isExpired ? 'bg-gray-300' : 'bg-white text-amber-700'}`}
                >
                  {isExpired ? 'Expired' : 'Grab Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------- Quick Actions Floating Buttons -----------------
function QuickActions() {
  const [expanded, setExpanded] = useState(false);
  
  const actions = [
    { icon: MessageCircle, label: "WhatsApp Support", color: "bg-green-500" },
    { icon: Gift, label: "Request Puja", color: "bg-amber-500" },
    { icon: Sparkles, label: "Donate", color: "bg-[#800000]" },
  ];

  const handleAction = (index) => {
    setExpanded(false);
    // Add actual functionality here
    if (index === 0) window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="fixed left-5 bottom-28 z-50 flex flex-col items-center gap-3">
      {expanded && actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 bg-white rounded-full shadow-lg pl-4 pr-5 py-2"
        >
          <span className="text-xs font-medium whitespace-nowrap">{action.label}</span>
          <button 
            onClick={() => handleAction(index)}
            className={`${action.color} rounded-full p-2 text-white`}
          >
            <action.icon size={18} />
          </button>
        </motion.div>
      ))}
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)}
        className="rounded-full p-3 bg-[#800000] text-white shadow-lg"
      >
        {expanded ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
}

// ----------------- Floating Cart with Badge -----------------
function FloatingCart({ itemCount }) {
  return (
    <motion.div
      className="fixed bottom-20 right-5 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <button className="bg-[#800000] text-white rounded-full p-3 shadow-lg hover:bg-[#A52A2A] relative">
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </motion.div>
  );
}

// ----------------- Bottom Navbar -----------------
function BottomNavbar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: HomeIcon, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "kits", icon: Package, label: "Kits" },
    { id: "bookings", icon: Bookmark, label: "Bookings" },
    { id: "more", icon: Menu, label: "More" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFF7E0] shadow-lg rounded-t-2xl px-6 py-3 z-50 border-t border-orange-200">
      <div className="flex justify-between items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "bookings") navigate("/bookings");
              }}
              className="flex flex-col items-center"
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-[#800000]" : "text-gray-600"}`} />
              <span className={`text-xs ${isActive ? "text-[#800000] font-medium" : "text-gray-600"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----------------- Voice Search Modal -----------------
function VoiceSearchModal({ isOpen, onClose, onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const startListening = () => {
    setIsListening(true);
    setTranscript("Listening...");
    
    // Simulate voice recognition
    setTimeout(() => {
      const commands = [
        "Book Satyanarayan Puja",
        "Book Pandit for Griha Pravesh",
        "Buy Puja Kit",
        "Schedule Call with Pandit"
      ];
      
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(`You said: ${randomCommand}`);
      setIsListening(false);
      
      // Auto-close after result
      setTimeout(() => onResult(randomCommand), 1500);
    }, 2000);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${isListening ? 'bg-red-100 animate-pulse' : 'bg-gray-100'}`}>
              <Mic className={`w-8 h-8 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Voice Search</h3>
          <p className="text-gray-600 mb-4">{transcript || "Click the mic and speak your command"}</p>
          
          <div className="flex gap-3 justify-center">
            {!isListening ? (
              <button 
                onClick={startListening}
                className="bg-[#800000] text-white px-6 py-2 rounded-full font-medium flex items-center gap-2"
              >
                <Mic size={18} /> Start Listening
              </button>
            ) : (
              <button 
                onClick={() => setIsListening(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-full font-medium"
              >
                Stop
              </button>
            )}
            <button 
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ----------------- Main Home Component -----------------
export default function Home() {
  const navigate = useNavigate();
  const [cartItems] = useState(2); // Sample cart items count
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleVoiceSearch = () => {
    setVoiceModalOpen(true);
  };

  const handleVoiceResult = (command) => {
    setVoiceModalOpen(false);
    
    // Navigate based on command
    if (command.includes("Satyanarayan")) {
      navigate("/puja-booking", { state: { pujaType: "Satyanarayan" } });
    } else if (command.includes("Griha Pravesh")) {
      navigate("/puja-booking", { state: { pujaType: "Griha Pravesh" } });
    } else if (command.includes("Puja Kit")) {
      navigate("/pujakits");
    } else if (command.includes("Schedule Call")) {
      // Logic to schedule call
    }
  };

  return (
    <main className="min-h-screen pb-24 p-6 bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] font-sans text-gray-800 relative">
      <DynamicGreeting />
      <PanchangWidget />
      <AnimatedSearch onVoiceSearch={handleVoiceSearch} />
      
      <HeroBanner />
      <ServicesSection />
      <UpcomingEvents />
      <GaneshPromo />
      <PanditAvailability />
      <DashboardSection />
      <PanditProfile />
      <PujaKits />
      <TestimonialsSection />
      <FestivalOffers />

      <QuickActions />
      <FloatingCart itemCount={cartItems} />
      <BottomNavbar />
      
      <VoiceSearchModal 
        isOpen={voiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </main>
  );
}