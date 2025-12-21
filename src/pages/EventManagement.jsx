import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  CheckCircle,
  Shield,
  Star,
  Phone,
  Calendar,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  Home,
  Heart,
  User,
  MapPin,
  Filter,
  MessageCircle,
  Bell,
  Clock,
  Award,
  Users,
  Sparkles,
  Camera,
  Music,
  Flower2,
  Utensils,
  Hotel,
  Car,
  Gem,
  Gift,
  FileText,
  ThumbsUp,
  IndianRupee,
  TrendingUp,
  MapPin as MapIcon,
  Video,
  BookOpen,
  PhoneCall,
  MessageSquare,
  ChefHat,
  Palmtree
} from "lucide-react";

// ================= COMPONENTS =================

const Section = ({ title, children, icon, showViewAll = false, color = "default", isCompact = false }) => {
  const colors = {
    bride: "border-l-pink-400",
    groom: "border-l-amber-700",
    default: "border-l-royalRed"
  };
  
  return (
    <section className={`mt-6 ${isCompact ? 'mt-4' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-6 ${isCompact ? 'h-5' : ''} rounded-full ${colors[color]}`}></div>
          <h2 className={`font-bold text-gray-800 flex items-center gap-1.5 font-serif ${isCompact ? 'text-lg' : 'text-xl'}`}>
            {icon && <span className={`${isCompact ? 'text-base' : ''} text-royalRed`}>{icon}</span>}
            {title}
          </h2>
        </div>
        {showViewAll && (
          <button className="text-royalRed font-medium text-xs flex items-center gap-0.5 hover:gap-1 transition-all hover:text-goldDark">
            View All <ChevronRight size={14} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
};

// 6️⃣ Category Cards with Verified Badge
const CategoryCard = ({ img, label, vendorCount, startingPrice, isCompact = false, onClick, isVerified = false }) => (
  <div 
    onClick={onClick}
    className={`group relative ${isCompact ? 'min-w-[120px]' : 'min-w-[140px]'} bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95 active:transition-transform`}
  >
    {isVerified && (
      <div className="absolute top-2 left-2 z-20 bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
        <CheckCircle size={8} /> Verified
      </div>
    )}
    <div className="relative overflow-hidden">
      <img
        src={img}
        alt={label}
        className={`w-full ${isCompact ? 'h-20' : 'h-24'} object-cover group-hover:scale-105 transition-transform duration-300`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
    </div>
    <div className="p-2">
      <p className={`text-center font-semibold text-gray-800 ${isCompact ? 'text-xs' : 'text-sm'}`}>{label}</p>
      <div className="flex justify-between items-center mt-1.5">
        {vendorCount && (
          <span className="text-green-600 font-medium text-xs flex items-center gap-0.5">
            <Users size={10} /> {vendorCount}
          </span>
        )}
        {startingPrice && (
          <span className="text-royalRed font-bold text-xs">₹{startingPrice}</span>
        )}
      </div>
    </div>
    {/* 7️⃣ Hover/Tap Surprise */}
    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gold/50 transition-colors duration-300 pointer-events-none"></div>
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      View Details →
    </div>
  </div>
);

// 1️⃣ How Sanskaraa Works Section
const HowItWorks = () => {
  const steps = [
    { icon: "📝", title: "Tell Us Your Date", desc: "Share your wedding date & preferences" },
    { icon: "🤝", title: "Get Matched Vendors", desc: "Personalized vendor recommendations" },
    { icon: "🛕", title: "Ritual + Event Planning", desc: "Complete wedding journey planning" },
    { icon: "🎉", title: "Enjoy Your Big Day", desc: "Stress-free, memorable celebration" }
  ];

  return (
    <div className="bg-gradient-to-br from-goldLight/20 to-white rounded-xl p-5 my-6 border border-gold">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center font-serif">
        How Sanskaraa Works ✨
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-royalRed/10 to-gold/10 rounded-full flex items-center justify-center text-xl mb-2 border border-gold/30">
              {step.icon}
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">{step.title}</h4>
            <p className="text-gray-600 text-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2️⃣ Budget Range Selector
const BudgetRangeSelector = ({ selectedBudget, onBudgetSelect }) => {
  const budgetRanges = [
    { label: "5-10L", value: "5-10", emoji: "💰" },
    { label: "10-20L", value: "10-20", emoji: "💎" },
    { label: "20-50L", value: "20-50", emoji: "👑" },
    { label: "Luxury", value: "luxury", emoji: "✨" }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gold/30 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <IndianRupee size={18} className="text-royalRed" />
        <h3 className="font-bold text-gray-800 font-serif">Select Your Budget Range</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">Find vendors that match your budget</p>
      <div className="grid grid-cols-4 gap-2">
        {budgetRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => onBudgetSelect(range.value)}
            className={`p-3 rounded-lg border transition-all ${selectedBudget === range.value ? 'bg-gradient-to-r from-royalRed to-goldDark text-white border-royalRed' : 'bg-gray-50 border-gray-200 hover:border-gold'}`}
          >
            <div className="text-lg mb-1">{range.emoji}</div>
            <span className="font-semibold text-xs">{range.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 3️⃣ Real Wedding Stories
const WeddingStories = () => {
  const stories = [
    { 
      city: "Jaipur", 
      quote: "Sanskaraa ne hamara sapna wedding banaya", 
      couple: "Neha & Aman",
      rating: 5,
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop"
    },
    { 
      city: "Delhi", 
      quote: "Every ritual was perfectly planned", 
      couple: "Priya & Raj",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop"
    },
    { 
      city: "Mumbai", 
      quote: "Stress-free wedding experience", 
      couple: "Anjali & Rohit",
      rating: 5,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-xl font-serif flex items-center gap-2">
          <Video size={20} className="text-royalRed" />
          Real Wedding Stories
        </h3>
        <button className="text-royalRed text-sm flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 pb-4">
          {stories.map((story, index) => (
            <div key={index} className="min-w-[280px] bg-white rounded-xl overflow-hidden shadow-sm border border-orange-100">
              <div className="relative h-40">
                <img src={story.image} alt={story.couple} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-royalRed font-bold text-xs">{story.city}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-800 italic text-sm mb-2">"{story.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-sm">- {story.couple}</span>
                  <button className="text-royalRed text-xs font-medium flex items-center gap-1">
                    Full Story <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4️⃣ Expert Assistance Strip
const ExpertAssistanceStrip = () => (
  <div className="fixed bottom-16 left-0 right-0 bg-gradient-to-r from-royalRed to-royalRed/90 text-white p-3 z-30 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle size={16} />
          <span className="font-bold text-sm">Talk to Wedding Expert</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gold">
          <Clock size={12} />
          <span>Available Today | Free Consultation</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="bg-gold text-royalRed px-3 py-1.5 rounded-full text-sm font-bold hover:bg-goldDark transition-colors active:scale-95">
          <PhoneCall size={14} className="inline mr-1" />
          Call
        </button>
        <button className="bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-bold hover:bg-white/30 transition-colors active:scale-95">
          <MessageSquare size={14} className="inline mr-1" />
          Chat
        </button>
      </div>
    </div>
  </div>
);

// 5️⃣ What's Included Section
const WhatsIncluded = () => {
  const inclusions = [
    { icon: "🕉️", label: "Pandit Ji" },
    { icon: "🌸", label: "Decorations" },
    { icon: "🍽️", label: "Catering" },
    { icon: "📸", label: "Photography" },
    { icon: "✅", label: "Ritual Checklist" },
    { icon: "🎵", label: "Entertainment" }
  ];

  return (
    <div className="bg-gradient-to-r from-goldLight/20 to-goldLight/10 rounded-xl p-4 my-5 border border-gold">
      <h3 className="text-sm font-bold text-gray-800 mb-3 text-center font-serif">
        Everything Included in Your Plan ✅
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {inclusions.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-lg mb-1 border border-gold shadow-sm">
              {item.icon}
            </div>
            <span className="text-xs text-gray-700 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 8️⃣ Seasonal Banner
const SeasonalBanner = () => (
  <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-4 my-5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
      <div className="text-5xl">🪔</div>
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-yellow-300" />
        <span className="text-yellow-300 text-sm font-bold">Wedding Muhurat Season Offer</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-1">Get Free Pandit Consultation</h3>
      <p className="text-purple-200 text-sm mb-3">Book any venue and get free ritual planning</p>
      <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors active:scale-95">
        Claim Offer →
      </button>
    </div>
  </div>
);

// 9️⃣ Location-Based Suggestions
const LocationSuggestions = () => {
  const suggestions = [
    { label: "Banquets", count: "120+", icon: <Hotel size={14} /> },
    { label: "Decorators", count: "85+", icon: <Flower2 size={14} /> },
    { label: "Photographers", count: "150+", icon: <Camera size={14} /> },
    { label: "Caterers", count: "90+", icon: <ChefHat size={14} /> }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapIcon size={16} className="text-royalRed" />
          <h3 className="font-bold text-gray-800">Popular in Delhi NCR</h3>
        </div>
        <span className="text-xs text-gray-500">Based on your location</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="text-royalRed">{suggestion.icon}</div>
                <span className="font-semibold text-gray-800 text-sm">{suggestion.label}</span>
              </div>
              <span className="bg-royalRed text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {suggestion.count}
              </span>
            </div>
            <button className="w-full mt-2 text-royalRed text-xs font-medium hover:text-goldDark">
              Explore options →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🔟 Empty State Component
const EmptyState = ({ message, actionText, onAction }) => (
  <div className="text-center py-8">
    <div className="text-4xl mb-3">😔</div>
    <h3 className="font-bold text-gray-800 mb-2">{message}</h3>
    <p className="text-gray-600 text-sm mb-4">But our expert can help you find the perfect match</p>
    <button 
      onClick={onAction}
      className="bg-gradient-to-r from-royalRed to-goldDark text-white px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
    >
      {actionText}
    </button>
  </div>
);

// 1️⃣1️⃣ Enhanced Loading Component
const EnhancedLoading = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royalRed mx-auto mb-3"></div>
    <p className="text-gray-600 font-serif">Finding divine vendors...</p>
    <p className="text-goldDark text-sm mt-2">ॐ सा विधा नमः</p>
  </div>
);

// Rest of the components remain the same...
const ServiceCard = ({ icon, label, color, onClick }) => {
  const colorClasses = {
    pink: "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    gold: "bg-gradient-to-br from-goldLight/30 to-goldLight/10 border-gold",
    default: "bg-white border-orange-200"
  };

  return (
    <div 
      onClick={onClick}
      className={`group rounded-xl p-3 text-center shadow-sm border hover:shadow-md transition-all duration-200 active:scale-95 ${colorClasses[color] || colorClasses.default}`}
    >
      <div className="mb-2">
        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${color === 'pink' ? 'bg-pink-50' : color === 'blue' ? 'bg-blue-50' : color === 'amber' ? 'bg-amber-50' : color === 'purple' ? 'bg-purple-50' : color === 'gold' ? 'bg-goldLight/20' : 'bg-white'} border`}>
          <span className="text-royalRed">{icon}</span>
        </div>
      </div>
      <p className="font-medium text-gray-800 text-xs">{label}</p>
    </div>
  );
};

const HorizontalList = ({ items, isCompact = false, title = "", showTitle = false, showVerified = false }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
      }
    };
  }, [items]);

  return (
    <div className="relative">
      {showTitle && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          <button className="text-royalRed text-xs flex items-center gap-0.5">
            See all <ChevronRight size={12} />
          </button>
        </div>
      )}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-gray-200"
          style={{ transform: 'translateY(-50%)' }}
        >
          <ChevronLeft size={16} className="text-royalRed" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-3 scroll-smooth"
        style={{ scrollPadding: '0 16px' }}
      >
        {items.map((item, i) => (
          <CategoryCard
            key={i}
            {...item}
            isCompact={isCompact}
            isVerified={showVerified && i % 3 === 0} // Every 3rd card shows verified badge
          />
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-gray-200"
          style={{ transform: 'translateY(-50%)' }}
        >
          <ChevronRight size={16} className="text-royalRed" />
        </button>
      )}
    </div>
  );
};

const WeddingProgress = ({ activeStep }) => {
  const steps = [
    { id: 1, label: "Engage", icon: <Gem size={14} /> },
    { id: 2, label: "Pre-Wed", icon: <Calendar size={14} /> },
    { id: 3, label: "Wedding", icon: <Sparkles size={14} /> },
    { id: 4, label: "Reception", icon: <Gift size={14} /> }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 font-serif">Your Wedding Journey</h3>
        <span className="text-xs text-gray-500">Step {activeStep} of 4</span>
      </div>
      <div className="flex justify-between relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= step.id ? 'bg-gradient-to-r from-royalRed to-goldDark text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${activeStep >= step.id ? 'text-royalRed' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-[20%] right-[20%] h-0.5 bg-gray-200">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: activeStep > step.id ? '100%' : '0%',
                    background: 'linear-gradient(to right, #7A1A1A, #E8C871)'
                  }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const TrustSection = () => (
  <div className="bg-gradient-to-r from-goldLight/20 to-goldLight/10 rounded-xl p-4 my-5 border border-gold">
    <h3 className="text-sm font-bold text-gray-800 mb-3 text-center font-serif">
      Why Families Trust Sanskaraa
    </h3>
    <div className="grid grid-cols-4 gap-2">
      {[
        { icon: <CheckCircle size={14} />, label: "Verified", value: "5k+", bg: "bg-green-50", text: "text-green-600" },
        { icon: <Award size={14} />, label: "Experts", value: "300+", bg: "bg-blue-50", text: "text-blue-600" },
        { icon: <Shield size={14} />, label: "Secure", value: "100%", bg: "bg-purple-50", text: "text-purple-600" },
        { icon: <Star size={14} />, label: "Rating", value: "4.9", bg: "bg-amber-50", text: "text-amber-600" }
      ].map((item, i) => (
        <div key={i} className={`${item.bg} rounded-lg p-2 text-center border`}>
          <div className={`${item.text} mb-1 flex justify-center`}>{item.icon}</div>
          <div className="font-bold text-gray-800 text-xs">{item.value}</div>
          <div className="text-[10px] text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ================= MAIN COMPONENT =================

export default function EventManagement() {
  const navigate = useNavigate();
  const [progressStep, setProgressStep] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Sample data arrays remain the same...
  const quickCategories = [
    { label: "Venues", icon: <Hotel size={16} />, color: "amber" },
    { label: "Catering", icon: <Utensils size={16} />, color: "pink" },
    { label: "Photography", icon: <Camera size={16} />, color: "blue" },
    { label: "Decoration", icon: <Flower2 size={16} />, color: "purple" },
    { label: "Entertainment", icon: <Music size={16} />, color: "gold" },
    { label: "Transport", icon: <Car size={16} />, color: "amber" },
  ];

  const brideServices = [
    { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop", label: "Bridal Wear", vendorCount: "200+", startingPrice: "10k" },
    { img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop", label: "Jewellery", vendorCount: "90+", startingPrice: "30k" },
    { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop", label: "Makeup", vendorCount: "120+", startingPrice: "8k" },
    { img: "https://images.unsplash.com/photo-1590412200988-a300de517b5e?w=400&auto=format&fit=crop", label: "Mehendi", vendorCount: "75+", startingPrice: "3k" },
    { img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&auto=format&fit=crop", label: "Hair Styling", vendorCount: "60+", startingPrice: "5k" },
  ];

  const groomServices = [
    { img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&auto=format&fit=crop", label: "Wedding Wear", vendorCount: "80+", startingPrice: "8k" },
    { img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&auto=format&fit=crop", label: "Salons", vendorCount: "50+", startingPrice: "1.5k" },
    { img: "https://images.unsplash.com/photo-1513279927540-4bc1a87b6b6b?w=400&auto=format&fit=crop", label: "Horses", vendorCount: "30+", startingPrice: "15k" },
    { img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&auto=format&fit=crop", label: "Bachelor Party", vendorCount: "40+", startingPrice: "20k" },
    { img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&auto=format&fit=crop", label: "Makeup", vendorCount: "35+", startingPrice: "3k" },
  ];

  const weddingEssentials = [
    { label: "Wedding Astrologer", icon: "🔮", color: "purple" },
    { label: "Marriage Certificate", icon: "📄", color: "blue" },
    { label: "Jewellery Showroom", icon: "💎", color: "pink" },
    { label: "Readymade Garments", icon: "👔", color: "amber" },
    { label: "Haldi Stage Decor", icon: "🎨", color: "gold" },
    { label: "Wedding Card Printers", icon: "🎴", color: "blue" },
    { label: "Hotels", icon: "🏨", color: "amber" },
    { label: "Honeymoon Packages", icon: "✈️", color: "purple" },
  ];

  const bigDayServices = [
    { label: "Stage Decor", icon: "🎭", color: "pink" },
    { label: "Wedding Catering", icon: "🍽️", color: "amber" },
    { label: "DJ Services", icon: "🎧", color: "purple" },
    { label: "Live Band", icon: "🎷", color: "blue" },
    { label: "Bridal Makeup", icon: "💄", color: "pink" },
    { label: "Choreography", icon: "💃", color: "purple" },
    { label: "Party Planning", icon: "🎊", color: "gold" },
    { label: "Transport", icon: "🚗", color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFEFD1] to-[#FFFDF7] font-body safe-area-bottom">
      

      {/* Sidebar Drawer */}
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 animate-slideInLeft shadow-xl">
            <div className="p-4 border-b bg-gradient-to-r from-royalRed to-royalRed/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-goldLight flex items-center justify-center shadow-gold">
                    <span className="text-royalRed font-bold">S</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-white font-serif">Sanskaraa</h2>
                    <p className="text-xs text-gold">Divine Wedding Planning</p>
                  </div>
                </div>
                <button onClick={() => setShowSidebar(false)} className="text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="mt-4 text-white">
                <p className="text-sm">Welcome back, Priya & Raj!</p>
                <p className="text-xs text-gold mt-1">Wedding Date: Dec 15, 2024</p>
              </div>
            </div>
            <div className="p-4">
              <nav className="space-y-1">
                {[
                  { icon: <Home size={18} />, label: "Dashboard" },
                  { icon: <Calendar size={18} />, label: "My Weddings" },
                  { icon: <Users size={18} />, label: "Vendors" },
                  { icon: <Award size={18} />, label: "Bookings" },
                  { icon: <MessageCircle size={18} />, label: "Chat with Expert" },
                  { icon: <Heart size={18} />, label: "Saved Items" },
                  { icon: <Filter size={18} />, label: "Budget Planner" },
                  { icon: <User size={18} />, label: "Profile & Settings" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full text-left p-3 rounded-lg hover:bg-orange-50 flex items-center gap-3 text-gray-700"
                  >
                    <span className="text-royalRed">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      <main className="px-4 pt-24 pb-32">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {['Quick Plan', 'Budget Calc', 'Checklist', 'Guest List', 'Timeline'].map((action) => (
            <button
              key={action}
              className="flex-shrink-0 px-3 py-1.5 bg-white border border-gold rounded-full text-xs font-medium hover:bg-goldLight/20 active:scale-95 transition-all"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Wedding Progress */}
        <WeddingProgress activeStep={progressStep} />

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-royalRed to-royalRed/90 rounded-2xl overflow-hidden mb-5 shadow-royal">
          <div className="absolute inset-0 bg-sanskaraa-pattern opacity-10"></div>
          <div className="p-4 text-white relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-gold" />
              <span className="text-xs font-medium text-gold">Premium Service</span>
            </div>
            <h1 className="text-xl font-bold leading-tight font-serif">
              Divine Wedding Planning Made Easy ✨
            </h1>
            <p className="mt-1 text-sm text-goldLight">
              From rituals to celebrations — we handle everything
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate("/book-wedding")}
                className="flex-1 bg-gold text-royalRed px-4 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-goldDark active:scale-95 transition-all"
              >
                Book Wedding
              </button>
              <button
                onClick={() => navigate("/expert")}
                className="flex-1 bg-transparent border-2 border-gold text-gold px-4 py-2.5 rounded-full font-bold text-sm hover:bg-gold/10 active:scale-95"
              >
                Talk to Expert
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-32">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop"
              alt="Wedding"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-royalRed/60 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* 5️⃣ What's Included Section */}
        <WhatsIncluded />

        {/* 2️⃣ Budget Range Selector */}
        <BudgetRangeSelector 
          selectedBudget={selectedBudget} 
          onBudgetSelect={setSelectedBudget} 
        />

        {/* 9️⃣ Location-Based Suggestions */}
        <LocationSuggestions />

        {/* Trust Section */}
        <TrustSection />

        {/* 1️⃣ How Sanskaraa Works */}
        <HowItWorks />

        {/* 8️⃣ Seasonal Banner */}
        <SeasonalBanner />

        {/* Quick Categories */}
        <Section title="Quick Categories" icon="⚡" showViewAll={true} isCompact>
          <div className="grid grid-cols-3 gap-2">
            {quickCategories.map((item, i) => (
              <ServiceCard
                key={i}
                icon={item.icon}
                label={item.label}
                color={item.color}
                onClick={() => handleCategoryClick(item.label)}
              />
            ))}
          </div>
        </Section>

        {/* Loading or Content */}
        {isLoading ? (
          <EnhancedLoading />
        ) : showEmptyState ? (
          <EmptyState 
            message="No vendors found"
            actionText="Talk to Expert"
            onAction={() => navigate("/expert")}
          />
        ) : (
          <>
            {/* Featured Vendor */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-royalRed to-royalRed/90 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop"
                    alt="Vendor"
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center bg-white/20 px-2 py-0.5 rounded-full">
                      <Star size={10} fill="white" />
                      <span className="text-[10px] ml-1">4.9</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-2 py-0.5 rounded-full">
                      <Award size={10} />
                      <span className="text-[10px] ml-1">Top Rated</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Elite Wedding Photographers</h3>
                  <p className="text-xs text-gold mb-3">Capture your special moments with our award-winning team</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs flex items-center gap-1">
                      <Users size={12} /> 150+ Pros
                    </span>
                    <span className="text-xs flex items-center gap-1">
                      <Clock size={12} /> 10+ Years
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate("/photographers")}
                    className="w-full bg-gold text-royalRed py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-goldDark transition-colors active:scale-95"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Bride Section */}
            <Section title="For the Bride" icon="👰" color="bride" showViewAll={true} isCompact>
              <HorizontalList items={brideServices} isCompact showVerified />
            </Section>

            {/* Groom Section */}
            <Section title="For the Groom" icon="🤵" color="groom" showViewAll={true} isCompact>
              <HorizontalList items={groomServices} isCompact showVerified />
            </Section>

            {/* 3️⃣ Real Wedding Stories */}
            <WeddingStories />

            {/* Wedding Essentials */}
            <Section title="Wedding Essentials" icon="📦" showViewAll={true} isCompact>
              <div className="grid grid-cols-4 gap-2">
                {weddingEssentials.map((item, i) => (
                  <ServiceCard
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    color={item.color}
                    onClick={() => handleCategoryClick(item.label)}
                  />
                ))}
              </div>
            </Section>

            {/* Big Day Services */}
            <Section title="Big Day Services" icon="🎉" showViewAll={true} isCompact>
              <div className="grid grid-cols-4 gap-2">
                {bigDayServices.map((item, i) => (
                  <ServiceCard
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    color={item.color}
                    onClick={() => handleCategoryClick(item.label)}
                  />
                ))}
              </div>
            </Section>

            {/* Recommended Vendors */}
            <Section title="Recommended for You" icon="💫" showViewAll={true}>
              <HorizontalList 
                items={[
                  { img: "https://images.unsplash.com/photo-1562259929-b4e3e5d10ca0?w=400&auto=format&fit=crop", label: "Grand Banquet", vendorCount: "4.8★", startingPrice: "75k" },
                  { img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop", label: "Royal Caterers", vendorCount: "4.9★", startingPrice: "45k" },
                  { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop", label: "Luxury Decor", vendorCount: "4.7★", startingPrice: "35k" },
                ]}
                title="Top Rated Vendors"
                showTitle={false}
              />
            </Section>
          </>
        )}

        {/* 4️⃣ Expert Assistance Strip */}
        <ExpertAssistanceStrip />

        {/* Floating Action Button */}
        <button 
          onClick={() => navigate("/plan-wedding")}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-royalRed to-gold rounded-full shadow-xl flex items-center justify-center z-30 active:scale-95 shadow-gold"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-orange-200 z-40 safe-area-bottom shadow-lg">
        <div className="flex justify-around items-center px-2 py-2">
          {[
            { icon: <Home size={20} />, label: "Home", active: true, path: "/" },
            { icon: <Search size={20} />, label: "Explore", active: false, path: "/explore" },
            { icon: <Heart size={20} />, label: "Saved", active: false, path: "/saved" },
            { icon: <Calendar size={20} />, label: "Planner", active: false, path: "/planner" },
            { icon: <User size={20} />, label: "Profile", active: false, path: "/profile" },
          ].map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-2 rounded-lg active:bg-orange-50 transition-colors"
              onClick={() => navigate(item.path)}
            >
              <div className={`${item.active ? 'text-royalRed' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] mt-0.5 ${item.active ? 'text-royalRed font-semibold' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}