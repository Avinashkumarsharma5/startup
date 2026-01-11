import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiStar,
  FiShare2,
  FiCalendar,
  FiShield,
  FiCheckCircle,
  FiInfo,
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiDownload,
  FiMapPin,
  FiPlus,
  FiMinus,
  FiX,
  FiUser,
  FiPhone,
  FiClock,
  FiPackage,
  FiGrid,
  FiList,
  FiFilter,
  FiDollarSign,
  FiTrendingUp,
  FiBookOpen,
  FiVideo,
  FiHeadphones,
  FiTruck,
  FiAward,
  FiSun,
  FiMoon,
  FiGift,
  FiPercent,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ---------- Price Resolver Function ----------
const resolveItemPrice = (itemName) => {
  const priceMap = {
    // Fruits & Offerings
    "नारियल": 25,
    "नारियल (nariyal)": 25,
    "coconut": 25,
    "फूल माला": 40,
    "flower": 40,
    "गेंदे के फूल": 40,
    "marigold": 40,
    "गुलाब की पंखुड़ी": 30,
    "rose": 30,
    // Fragrance
    "अगरबत्ती": 15,
    "agarbatti": 15,
    "धूप": 60,
    "dhoop": 60,
    "गुग्गुल": 10,
    "guggal": 10,
    "लोबान": 45,
    "loban": 45,
    // Havan & Aarti
    "कपूर": 25,
    "kapoor": 25,
    "हवन सामग्री": 60,
    "havan": 60,
    "समिधा": 30,
    "samidha": 30,
    "घी": 120,
    "ghee": 120,
    "कपूर टेबलेट": 40,
    "camphor": 40,
    // Deepak & Diya
    "घी बत्ती": 50,
    "ghee batti": 50,
    "बाती": 20,
    "cotton wick": 20,
    "मिट्टी का दिया": 10,
    "clay diya": 10,
    // Tilak & Kumkum
    "रोली": 15,
    "roli": 15,
    "अक्षत": 20,
    "akshata": 20,
    "चावल": 20,
    "rice": 20,
    "सिंदूर": 20,
    "sindoor": 20,
    "हल्दी": 20,
    "haldi": 20,
    "कुमकुम": 20,
    "kumkum": 20,
    // Prasad
    "पंचामृत": 60,
    "panchamrit": 60,
    "मिश्री": 20,
    "mishri": 20,
    "ड्राई फ्रूट्स": 70,
    "dry fruits": 70,
    "लड्डू": 50,
    "laddu": 50,
    "गुड़": 30,
    "jaggery": 30,
    // Cloth
    "लाल कपड़ा": 40,
    "red cloth": 40,
    "पीला कपड़ा": 40,
    "yellow cloth": 40,
    "चुनरी": 50,
    "chunri": 50,
    // Utensils
    "घंटी": 60,
    "bell": 60,
    "कलश": 120,
    "kalash": 120,
    "थाली": 80,
    "plate": 80,
    // Special Items
    "गंगाजल": 25,
    "gangajal": 25,
    "शहद": 30,
    "honey": 30,
    "काला तिल": 20,
    "black sesame": 20,
    "शक्कर": 20,
    "sugar": 20,
    // Miscellaneous
    "माचिस": 10,
    "matchbox": 10,
    "मौली": 10,
    "moli": 10,
    "सुपारी": 15,
    "supari": 15,
    "पान के पत्ते": 10,
    "betel leaves": 10,
    "कपूर तेल": 50,
    "camphor oil": 50,
  };

  const lowerName = itemName.toLowerCase();
  
  // Check for exact matches first
  for (const [key, price] of Object.entries(priceMap)) {
    if (lowerName.includes(key.toLowerCase())) {
      return price;
    }
  }
  
  // Check for number patterns
  if (/\b(two|2|दो)\b/i.test(itemName)) return 40;
  if (/\b(five|5|पांच)\b/i.test(itemName)) return 100;
  if (/\b(ten|10|दस)\b/i.test(itemName)) return 200;
  
  // Default price
  return 30;
};

// ---------- Mock Data ----------
// Package Kits
// ---------- Mock Data ----------
// Package Kits
const kits = [
  {
    id: 1,
    name: "Griha Pravesh / गृह प्रवेश",
    price: 1500,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 4,
    name: "Sundarkand Path / सुंदरकांड पाठ",
    price: 1000,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 5,
    name: "Ramayan Path / रामायण पाठ",
    price: 1000,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 6,
    name: "Satyanarayan Katha / सत्यनारायण कथा",
    price: 1200,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 7,
    name: "Lakshmi Puja / लक्ष्मी पूजा",
    price: 800,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 8,
    name: "Ganesh Puja / गणेश पूजा",
    price: 800,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 9,
    name: "Durga Saptashati / दुर्गा सप्तशती पाठ",
    price: 900,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 10,
    name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ",
    price: 700,
    category: "Package Kits",
    subcategory: "Ghar ke Sanskaar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 12,
    name: "Annaprashan / अन्नप्राशन",
    price: 1100,
    category: "Package Kits",
    subcategory: "Bacchon ke Sanskaar",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 14,
    name: "Janamdin Puja / जन्मदिन पूजा",
    price: 900,
    category: "Package Kits",
    subcategory: "Bacchon ke Sanskaar",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 15,
    name: "Vivah / विवाह",
    price: 2500,
    category: "Package Kits",
    subcategory: "Vivah Sanskar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 17,
    name: "Sagai / सगाई",
    price: 1800,
    category: "Package Kits",
    subcategory: "Vivah Sanskar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 18,
    name: "Haldi / हल्दी रस्म",
    price: 900,
    category: "Package Kits",
    subcategory: "Vivah Sanskar",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 21,
    name: "Reception / रिसेप्शन",
    price: 2000,
    category: "Package Kits",
    subcategory: "Vivah Sanskar",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 22,
    name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा",
    price: 1500,
    category: "Package Kits",
    subcategory: "Vivah Sanskar",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 23,
    name: "Antim Sanskar / अंतिम संस्कार",
    price: 2000,
    category: "Package Kits",
    subcategory: "Pitrakarya",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 24,
    name: "Pind Daan / पिंडदान",
    price: 1800,
    category: "Package Kits",
    subcategory: "Pitrakarya",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 25,
    name: "Shraddh / श्राद्ध पूजा",
    price: 1500,
    category: "Package Kits",
    subcategory: "Pitrakarya",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 27,
    name: "Tehravin / तेरहवीं संस्कार",
    price: 1200,
    category: "Package Kits",
    subcategory: "Pitrakarya",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 28,
    name: "Karwa Chauth Puja / करवा चौथ पूजा",
    price: 900,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 29,
    name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा",
    price: 1200,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 30,
    name: "Raksha Bandhan / रक्षा बंधन पूजा",
    price: 800,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 31,
    name: "Navratri Puja / नवरात्रि पूजा",
    price: 1000,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 32,
    name: "Saraswati Puja / सरस्वती पूजा",
    price: 1000,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 33,
    name: "Mahashivratri Puja / महाशिवरात्रि पूजा",
    price: 1100,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 34,
    name: "Chhath Puja / छठ पूजा",
    price: 1000,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 36,
    name: "Janmashtami Puja / जन्माष्टमी पूजा",
    price: 1000,
    category: "Package Kits",
    subcategory: "Festival Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 37,
    name: "Rudrabhishek / रुद्राभिषेक",
    price: 2200,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 38,
    name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप",
    price: 2500,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 39,
    name: "Bhumi Pujan / भूमि पूजन",
    price: 2000,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 40,
    name: "Kundali Shanti / कुंडली शांति",
    price: 1800,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 41,
    name: "Upanayan Sanskar / उपनयन संस्कार",
    price: 1700,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 42,
    name: "Kalash Sthapana / कलश स्थापना",
    price: 1600,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 43,
    name: "Ayushya Homam / आयुष्य हवन",
    price: 1500,
    category: "Package Kits",
    subcategory: "Temple / Special Pujas",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 44,
    name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज",
    price: 3000,
    category: "Package Kits",
    subcategory: "Others / Custom Options",
    type: "package",
    img: "images/pujakit.jpg",
  },
  {
    id: 45,
    name: "Online Puja Seva / ऑनलाइन पूजा सेवा",
    price: 2500,
    category: "Package Kits",
    subcategory: "Others / Custom Options",
    type: "package",
    img: "images/pujakit2.jpg",
  },
  {
    id: 46,
    name: "Customized Event Plan / कस्टम इवेंट प्लान",
    price: 3500,
    category: "Package Kits",
    subcategory: "Others / Custom Options",
    type: "package",
    img: "images/pujakit.jpg",
  },
];

// Single Items (Alpha Store Products)
const singleItems = [
  {
    id: 101,
    name: "Nariyal / नारियल",
    price: 25,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/coconut.png",
  },
  
  
  {
    id: 105,
    name: "Flower Garland / फूल माला",
    price: 40,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/flower.png",
  },
  {
    id: 106,
    name: "Marigold Flowers / गेंदे के फूल",
    price: 40,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "गुच्छा",
    img: "images/marigold.png",
  },
  {
    id: 107,
    name: "Rose Petals / गुलाब की पंखुड़ी",
    price: 30,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पैक",
    img: "images/rose.png",
  },
  {
    id: 108,
    name: "Agarbatti / अगरबत्ती",
    price: 15,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/agarbati.png",
  },
  {
    id: 109,
    name: "Dhoop Sticks / धूप",
    price: 60,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "kg",
    img: "images/dhup.png",
  },
  {
    id: 110,
    name: "Guggal / गुग्गुल",
    price: 10,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/guggal.png",
  },
  {
    id: 111,
    name: "Loban / लोबान",
    price: 45,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/loban.png",
  },
  {
    id: 112,
    name: "Kapoor / कपूर",
    price: 25,
    category: "Single Items",
    subcategory: "Havan & Aarti",
    type: "single",
    unit: "पैक",
    img: "images/kapoor.png",
  },
  {
    id: 113,
    name: "Havan Samagri / हवन सामग्री",
    price: 60,
    category: "Single Items",
    subcategory: "Havan & Aarti",
    type: "single",
    unit: "पैक",
    img: "images/havan-samagri.png",
  },
  {
    id: 114,
    name: "Samidha Sticks / समिधा",
    price: 30,
    category: "Single Items",
    subcategory: "Havan & Aarti",
    type: "single",
    unit: "बंडल",
    img: "images/samidha.png",
  },
  {
    id: 115,
    name: "Ghee Bottle / घी",
    price: 120,
    category: "Single Items",
    subcategory: "Havan & Aarti",
    type: "single",
    unit: "100ml",
    img: "images/ghee.png",
  },
  {
    id: 116,
    name: "Camphor Tablets / कपूर टेबलेट",
    price: 40,
    category: "Single Items",
    subcategory: "Havan & Aarti",
    type: "single",
    unit: "पैक",
    img: "images/capoor-table.png",
  },
  {
    id: 117,
    name: "Ghee Batti / घी बत्ती",
    price: 50,
    category: "Single Items",
    subcategory: "Deepak & Diya",
    type: "single",
    unit: "बॉक्स",
    img: "images/capoor-table.png",
  },
  {
    id: 118,
    name: "Cotton Wick / बाती",
    price: 20,
    category: "Single Items",
    subcategory: "Deepak & Diya",
    type: "single",
    unit: "पैक",
    img: "images/cotton-bati.png",
  },
  {
    id: 119,
    name: "Clay Diya / मिट्टी का दिया",
    price: 10,
    category: "Single Items",
    subcategory: "Deepak & Diya",
    type: "single",
    unit: "पीस",
    img: "images/clay-diya.png",
  },
  
  {
    id: 121,
    name: "Roli / रोली",
    price: 15,
    category: "Single Items",
    subcategory: "Tilak & Kumkum",
    type: "single",
    unit: "पैक",
    img: "images/roli.png",
  },
  {
    id: 122,
    name: "Chawal (Akshat) / अक्षत",
    price: 20,
    category: "Single Items",
    subcategory: "Tilak & Kumkum",
    type: "single",
    unit: "पैक",
    img: "images/akchat.png",
  },
  {
    id: 123,
    name: "Sindoor / सिंदूर",
    price: 20,
    category: "Single Items",
    subcategory: "Tilak & Kumkum",
    type: "single",
    unit: "डिब्बा",
    img: "images/sindoor.png",
  },
  {
    id: 124,
    name: "Haldi Powder / हल्दी",
    price: 20,
    category: "Single Items",
    subcategory: "Tilak & Kumkum",
    type: "single",
    unit: "पैक",
    img: "images/haldi.png",
  },
  {
    id: 125,
    name: "Kumkum / कुमकुम",
    price: 20,
    category: "Single Items",
    subcategory: "Tilak & Kumkum",
    type: "single",
    unit: "पैक",
    img: "images/kumkum.png",
  },
  {
    id: 126,
    name: "Panchamrit Pack / पंचामृत",
    price: 60,
    category: "Single Items",
    subcategory: "Prasad",
    type: "single",
    unit: "पैक",
    img: "images/panchamrit.png",
  },
  {
    id: 127,
    name: "Mishri / मिश्री",
    price: 20,
    category: "Single Items",
    subcategory: "Prasad",
    type: "single",
    unit: "पैक",
    img: "images/misri.png",
  },
  {
    id: 128,
    name: "Dry Fruits Mix / ड्राई फ्रूट्स",
    price: 70,
    category: "Single Items",
    subcategory: "Prasad",
    type: "single",
    unit: "पैक",
    img: "images/dry-fruit.png",
  },
  {
    id: 129,
    name: "Laddu Prasad / लड्डू प्रसाद",
    price: 50,
    category: "Single Items",
    subcategory: "Prasad",
    type: "single",
    unit: "डिब्बा",
    img: "images/ladoo.png",
  },
  {
    id: 130,
    name: "Jaggery / गुड़",
    price: 30,
    category: "Single Items",
    subcategory: "Prasad",
    type: "single",
    unit: "पैक",
    img: "images/jaggery.png",
  },
  {
    id: 131,
    name: "Red Cloth / लाल कपड़ा",
    price: 40,
    category: "Single Items",
    subcategory: "Puja Cloth",
    type: "single",
    unit: "मीटर",
    img: "images/lal-cloth.png",
  },
  {
    id: 132,
    name: "Yellow Cloth / पीला कपड़ा",
    price: 40,
    category: "Single Items",
    subcategory: "Puja Cloth",
    type: "single",
    unit: "मीटर",
    img: "images/yellow-cloths.png",
  },
  {
    id: 133,
    name: "Dupatta Chunri / चुनरी",
    price: 50,
    category: "Single Items",
    subcategory: "Puja Cloth",
    type: "single",
    unit: "पीस",
    img: "images/chunri.png",
  },
  {
    id: 134,
    name: "Puja Bell / घंटी",
    price: 60,
    category: "Single Items",
    subcategory: "Puja Utensils",
    type: "single",
    unit: "पीस",
    img: "images/bell.png",
  },
  {
    id: 135,
    name: "Kalash / कलश",
    price: 120,
    category: "Single Items",
    subcategory: "Puja Utensils",
    type: "single",
    unit: "पीस",
    img: "images/kalas.png",
  },
  {
    id: 136,
    name: "Steel Plate / थाली",
    price: 80,
    category: "Single Items",
    subcategory: "Puja Utensils",
    type: "single",
    unit: "पीस",
    img: "images/steel-plate.png",
  },
  {
    id: 137,
    name: "Gangajal / गंगाजल",
    price: 25,
    category: "Single Items",
    subcategory: "Special Items",
    type: "single",
    unit: "बोतल",
    img: "images/ganga-jal.png",
  },
  {
    id: 138,
    name: "Honey / शहद",
    price: 30,
    category: "Single Items",
    subcategory: "Special Items",
    type: "single",
    unit: "बोतल",
    img: "images/honey.png",
  },
  {
    id: 139,
    name: "Black Sesame / काला तिल",
    price: 20,
    category: "Single Items",
    subcategory: "Special Items",
    type: "single",
    unit: "पैक",
    img: "images/kala-til.png",
  },
  {
    id: 140,
    name: "Sugar / शक्कर",
    price: 20,
    category: "Single Items",
    subcategory: "Special Items",
    type: "single",
    unit: "पैक",
    img: "images/suger.png",
  },
  {
    id: 141,
    name: "Matchbox / माचिस",
    price: 10,
    category: "Single Items",
    subcategory: "Miscellaneous",
    type: "single",
    unit: "पीस",
    img: "images/matchbox.png",
  },
  {
    id: 142,
    name: "Moli / मौली",
    price: 10,
    category: "Single Items",
    subcategory: "Miscellaneous",
    type: "single",
    unit: "रोल",
    img: "images/moli.png",
  },
  {
    id: 143,
    name: "Supari / सुपारी",
    price: 15,
    category: "Single Items",
    subcategory: "Miscellaneous",
    type: "single",
    unit: "पैक",
    img: "images/supari.png",
  },
  {
    id: 144,
    name: "Betel Leaves / पान के पत्ते",
    price: 10,
    category: "Single Items",
    subcategory: "Miscellaneous",
    type: "single",
    unit: "पीस",
    img: "images/pan-patta.png",
  },
  {
    id: 145,
    name: "Camphor Oil / कपूर तेल",
    price: 50,
    category: "Single Items",
    subcategory: "Miscellaneous",
    type: "single",
    unit: "बोतल",
    img: "images/kapoor-oil.png",
  },
];

// Combine all products
const allProducts = [...kits, ...singleItems];

// ---------- Kit Items Details ----------
const pujaKitItems = {
  1: {
    name: "Griha Pravesh / गृह प्रवेश",
    items: [
      "Kalash (पीतल/ताम्बा)",
      "Nariyal (नारियल) - 2 to 5",
      "Moli / Kalawa (मोली) - 1 रोल",
      "Chawal / Akshat (चावल/अक्षत)",
      "Haldi (हल्दी) - पैकेट",
      "Kumkum (कुमकुम)",
      "Sindoor (सिंदूर)",
      "Gangajal (गंगाजल)",
      "Ghee / Oil Diya (घी/तेल का दिया)",
      "Deepak (दीपक) - 2",
      "Kapoor (कपूर)",
      "Agarbatti (अगरबत्ती)",
      "Matchbox (माचिस)",
      "Flowers / Garland (फूल/माला)",
      "Fruits (फल) - 5 प्रकार",
      "Dry Fruits (सूखा मेवा)",
      "Mishri (मिश्री / शक्कर)",
      "Doodh (दूध)",
      "Dahi (दही)",
      "Ghee (घी)",
      "Honey (शहद)",
      "Sugar (शक्कर)",
      "Mango Leaves (आम के पत्ते) - 11",
      "Vastu Purush Photo (वास्तु पुरुष चित्र)",
      "Swastik Sticker / Rangoli (स्वस्तिक स्टिकर/रंगोली)",
      "Toran (तोरण) - मुख्य द्वार हेतु",
      "Red & Yellow Cloth (लाल व पीला कपड़ा)",
      "Havan Kund (हवन कुंड)",
      "Havan Samagri (हवन सामग्री)",
      "Samidha (समिधा / लकड़ी की जलावन)",
      "Ghee for Havan (हवन घी)",
      "Jau / Til (जौ/तिल)",
      "Ganesh Ji Murti / Photo (गणेश जी)",
      "Lakshmi Photo / Coin (लक्ष्मी जी)",
      "Puja Vidhi Booklet (पूजा विधि पुस्तक)"
    ],
    benefits: [
      "नए घर में शुभता, सकारात्मक ऊर्जा और मंगल की स्थापना",
      "परिवार में सुख-समृद्धि और वैभव की वृद्धि",
      "घर में वास्तु दोषों का निवारण",
      "नकारात्मक ऊर्जा और बाधाओं को दूर करना",
      "परिवार के सदस्यों के बीच प्रेम और सौहार्द बनाए रखना"
    ]
  },
  4: {
    name: "Sundarkand Path / सुंदरकांड पाठ",
    items: [
      "Hanuman Ji Photo / Idol",
      "Sundarkand Path Book",
      "Ram Darbar Photo - शुद्ध वातावरण हेतु",
      "Chandan, Haldi, Kumkum, Sindoor",
      "Akshat (चावल)",
      "Gangajal (गंगाजल)",
      "Kalash + Nariyal + Mango Leaves",
      "Ghee/Oil Diya",
      "Kapoor (कपूर)",
      "Agarbatti (अगरबत्ती)",
      "Dhoop (धूप)",
      "Flowers, Garland",
      "Tulsi Leaves",
      "Fruits (5 प्रकार)",
      "Boondi / Ladoo / Panjeeri",
      "Havan Kund, Samidha, Havan Samagri, Ghee",
      "Ghanti (Bell)",
      "Puja Thali Set"
    ],
    benefits: [
      "बाधाओं, शत्रुओं व नकारात्मक शक्तियों से रक्षा",
      "भय, संकट, रोगों का निवारण",
      "शौर्य, आत्मविश्वास, साहस की प्राप्ति",
      "व्यक्तित्व में तेज व सकारात्मकता का उदय"
    ]
  },
  5: {
    name: "Ramayan Path / रामायण पाठ",
    items: [
      "Ramayan Book (Valmiki / Tulsi)",
      "Ram Darbar Photo",
      "Kalash + Nariyal + Mango Leaves",
      "Chandan, Haldi, Kumkum, Sindoor, Akshat",
      "Red Cloth",
      "Gangajal",
      "Ghee Diya, Agarbatti, Kapoor, Dhoop",
      "Flowers, Garland",
      "Panchamrit सामग्री",
      "Fruits + Mishri + Dry Fruits",
      "Havan Samagri + Samidha + Ghee",
      "Ghanti + Puja Thali"
    ],
    benefits: [
      "घर में शांति, सद्भाव और सकारात्मक ऊर्जा",
      "धर्म, मर्यादा और सदाचार की स्थापना",
      "परिवार में अन्न-वस्त्र-धन की वृद्धि",
      "संकटों से मुक्ति और ईश्वर की कृपा प्राप्ति"
    ]
  },
  6: {
    name: "Satyanarayan Katha / सत्यनारायण कथा",
    items: [
      "Satyanarayan Ji Photo/Idol",
      "Katha Book",
      "Banana Leaves (5)",
      "Kalash + Coconut + Mango Leaves",
      "Paan + Supari + Coin",
      "Chandan, Haldi, Kumkum, Akshat",
      "Sindoor, Mauli",
      "Gangajal",
      "Ghee Diya, Agarbatti, Kapoor, Dhoop",
      "Flowers + Garland",
      "Panchamrit सामग्री",
      "Suji Halwa / Prasad सामग्री",
      "Fruits (5 Prakar)",
      "Havan Samagri + Samidha + Ghee",
      "Ghanti + Puja Thali"
    ],
    benefits: [
      "सौभाग्य में वृद्धि और मनोकामना पूर्ण होती है",
      "धन, संतति और सुख-समृद्धि की प्राप्ति",
      "घर में शांति और स्थिरता बनी रहती है",
      "कठिनाइयों और अवरोधों का समाधान"
    ]
  },
  7: {
    name: "Lakshmi Puja / लक्ष्मी पूजा",
    items: [
      "Lakshmi Ji Idol / Photo (लक्ष्मी जी प्रतिमा/चित्र)",
      "Ganesh Ji Idol / Photo (गणेश जी) - शुभारंभ हेतु",
      "Gold / Silver Coin (सोने/चाँदी का सिक्का)",
      "Red Cloth (लाल कपड़ा) - आसन हेतु",
      "Kumkum (कुमकुम)",
      "Haldi (हल्दी)",
      "Akshat / Chawal (अक्षत/चावल)",
      "Sindoor (सिंदूर)",
      "Panchamrit Ingredients (दूध, दही, घी, शहद, शक्कर)",
      "Gangajal (गंगाजल)",
      "Diya (तेल/घी का दिया)",
      "Scented/Traditional Diya (सुगंधित/साधारण दिया)",
      "Kapoor (कपूर)",
      "Agarbatti / Dhoop (अगरबत्ती/धूप)",
      "Lotus Flower (कमल का फूल)",
      "Fresh Flowers / Mala (फूल/माला)",
      "Batasha (बताशा)",
      "Mishri / Sugar (मिश्री/चीनी)",
      "Dry Fruits (सूखा मेवा)",
      "Fruits (फल) - कम से कम 5 प्रकार",
      "Red Thread / Moli (मोली/कलावा)",
      "New Broom (नई झाड़ू - लक्ष्मी का वास हेतु)",
      "Rice Flour & Rangoli Colors (रंगोली के लिए)",
      "Kalash (कलश) + Mango Leaves (आम के पत्ते)",
      "Cowrie Shells (कौड़ी) - ऐच्छिक",
      "Shree Yantra (श्री यंत्र) - ऐच्छिक",
      "Coin Box / Bahi-Khata (व्यापारिक पुस्तिका)",
      "Lakshmi Mantra / Aarti Booklet (बुकलेट)",
      "Ghanti (घंटी)"
    ],
    benefits: [
      "धन, ऐश्वर्य और समृद्धि में निरंतर वृद्धि",
      "व्यापार एवं नौकरी में सफलता",
      "घर में लक्ष्मी का स्थिर वास",
      "कर्ज और आर्थिक बाधाओं से मुक्ति",
      "परिवार में शांति, सौभाग्य और सकारात्मक ऊर्जा"
    ]
  },
  8: {
    name: "Ganesh Puja / गणेश पूजा",
    items: [
      "Ganesh Ji Idol / Photo (गणेश जी प्रतिमा/चित्र)",
      "Durva Grass (दूर्वा घास) - 21 तिनके",
      "Modak / Laddu (मोदक / लड्डू) - प्रसाद हेतु",
      "Red Cloth (लाल कपड़ा)",
      "Red / Yellow Thread (मोली/कलावा)",
      "Haldi (हल्दी)",
      "Kumkum / Roli (कुमकुम / रोली)",
      "Akshat (चावल)",
      "Sindoor (सिंदूर)",
      "Gangajal (गंगाजल)",
      "Ghee / Oil Diya (घी/तेल का दिया)",
      "Scented Diya (सुगंधित दिया) - ऐच्छिक",
      "Agarbatti (अगरबत्ती)",
      "Dhoop (धूप)",
      "Kapoor (कपूर)",
      "Fresh Flowers (फूल)",
      "Flower Garland (फूलों की माला)",
      "Fruits (फल) - 5 प्रकार",
      "Coconut (नारियल)",
      "Betel Leaves & Supari (पान व सुपारी)",
      "Havan Samagri (हवन सामग्री) - ऐच्छिक",
      "Samidha (लकड़ी) - ऐच्छिक",
      "Ghee for Havan (हवन घी) - ऐच्छिक",
      "Ganesh Mantra / Aarti Booklet (गणेश मंत्र/आरती पुस्तक)",
      "Bell (घंटी)",
      "Kalash + Mango Leaves (कलश + आम के पत्ते)",
      "Rice Flour or Rangoli Colors (रंगोली हेतु)"
    ],
    benefits: [
      "सभी प्रकार के विघ्न, बाधा, नकारात्मकता का नाश",
      "नए कार्यों, व्यापार और परीक्षाओं में सफलता",
      "बुद्धि, विवेक और ज्ञान की वृद्धि",
      "घर और परिवार में सुख-समृद्धि एवं मंगल की स्थिरता",
      "सौभाग्य और सकारात्मक ऊर्जा में वृद्धि"
    ]
  },
  9: {
    name: "Durga Saptashati / दुर्गा सप्तशती पाठ",
    items: [
      "Durga Mata Idol/Photo",
      "Saptashati Book",
      "Red Cloth + Chunari",
      "Sindoor, Haldi, Kumkum, Akshat",
      "Bangali Sindoor (ऐच्छिक)",
      "Kalash + Coconut + Mango Leaves",
      "Gangajal",
      "Ghee Diya, Agarbatti, Kapoor, Dhoop",
      "Flowers, Garland",
      "Panchamrit सामग्री",
      "Fruits + Mishri + Dry Fruits",
      "Naivedyam (Kheer/Poha)",
      "Havan Samagri + Samidha + Ghee",
      "Trishul / Shankh (ऐच्छिक)",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "दुश्मनों पर विजय और रक्षा",
      "कठिन परिस्थितियों में माता का साथ",
      "साहस, आत्मविश्वास और शक्ति की प्राप्ति",
      "कुल-कुटुम्ब पर देवी की विशेष कृपा"
    ]
  },
  10: {
    name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ",
    items: [
      "Hanuman Ji Photo",
      "Hanuman Chalisa Book",
      "Sindoor (Orange)",
      "Jasmine Oil (ऐच्छिक)",
      "Chandan, Haldi, Kumkum, Akshat",
      "Tulsi Leaves",
      "Kalash + Coconut + Mango Leaves",
      "Gangajal",
      "Ghee Diya, Agarbatti, Kapoor",
      "Flowers, Garland",
      "Fruits + Boondi + Prasad सामग्री",
      "Havan Samagri + Samidha + Ghee",
      "Puja Thali + Bell"
    ],
    benefits: [
      "भय, रोग, संकट और शत्रुओं से मुक्ति",
      "मन में शक्ति, तेज व साहस की वृद्धि",
      "नकारात्मक उर्जा का निवारण",
      "घर में शुभ और मंगल का वास"
    ]
  },
  12: {
    name: "Annaprashan / अन्नप्राशन",
    items: [
      "Baby Feeding Bowl & Spoon (चांदी/स्टील)",
      "Kheer / Rice Prasad Ingredients (खीर सामग्री)",
      "Banana Leaves (केले का पत्ता)",
      "New Baby Dress (नए वस्त्र)",
      "Kalash + Coconut + Mango Leaves",
      "Chandan, Haldi, Kumkum, Sindoor",
      "Akshat (चावल)",
      "Gangajal",
      "Red Cloth",
      "Roli / Mauli",
      "Ghee / Oil Diya",
      "Kapoor",
      "Agarbatti",
      "Dhoop",
      "Fresh Flowers / Garland",
      "Dry Fruits (सूखा मेवा)",
      "Fruits (5 Prakar)",
      "Mishri (मिश्री)",
      "Havan Kund",
      "Havan Samagri",
      "Samidha",
      "Ghee for Havan",
      "Puja Thali",
      "Ghanti (Bell)",
      "Swastik Sticker",
      "Baby's Name Chant Card (ऐच्छिक)"
    ],
    benefits: [
      "शिशु के लिए मंगल, स्वास्थ्य और दीर्घायु का आशीर्वाद",
      "शिशु का अन्न ग्रहण आरंभ शुभ मुहूर्त में होता है",
      "बुद्धि, बल और रोग प्रतिरोधक क्षमता में वृद्धि",
      "माता-पिता व परिवार के आशीर्वाद का संचार"
    ]
  },
  14: {
    name: "Janamdin Puja / जन्मदिन पूजा",
    items: [
      "Birthday Kalash Setup (कुंडली/राशि अनुसार)",
      "Janamdin Puja Booklet (पूजा विधि)",
      "Navgrah Puja Samagri",
      "Chandan, Haldi, Kumkum, Sindoor, Akshat",
      "Gangajal",
      "Moli / Kalawa",
      "Red Cloth",
      "Ghee / Oil Diya",
      "Agarbatti",
      "Kapoor",
      "Dhoop",
      "Fresh Flowers / Garland",
      "Fruits (5 Prakar)",
      "Dry Fruits",
      "Mishri / Sweets / Birthday Cake",
      "Havan Kund",
      "Havan Samagri",
      "Samidha",
      "Ghee for Havan",
      "Balloon Decoration (Traditional + Modern Mix)",
      "Family Tilak Plate",
      "Ghanti + Puja Thali"
    ],
    benefits: [
      "आयु, स्वास्थ्य और सौभाग्य की वृद्धि",
      "बुरे ग्रहों का प्रभाव कम होता है",
      "नए वर्ष में सफलता और समृद्धि का आशीर्वाद",
      "घर में खुशी और उत्साह का वातावरण"
    ]
  },
  15: {
    name: "Vivah / विवाह",
    items: [
      "Mandap Setup Items (मंडप सामग्री)",
      "Varmala (वरमाला) - 2",
      "Mangal Sutra / Thaali",
      "Sindoor",
      "Wedding Garland",
      "Kalash + Coconut + Mango Leaves",
      "Chandan, Haldi, Kumkum, Akshat",
      "Mauli / Kalawa",
      "Gangajal",
      "Havan Kund",
      "Havan Samagri",
      "Samidha",
      "Ghee for Havan",
      "Ghee/Oil Diya",
      "Jau / Til / Rice",
      "Saath Phere Wood & Ghee Setup",
      "Supari",
      "Paan Patta",
      "Fruits (5 Types)",
      "Dry Fruits",
      "Mishri / Sweets",
      "Aarti Thali Set",
      "Ghanti",
      "Agarbatti / Dhoop / Kapoor",
      "Tying Cloth (Gathbandhan Dupatta)",
      "Rice Flour / Rangoli Colors"
    ],
    benefits: [
      "पवित्र वैवाहिक बंधन की स्थापना",
      "परिवार में प्रेम, विश्वास और सामंजस्य",
      "दंपत्ति के जीवन में सुख-समृद्धि",
      "संतान सौभाग्य और गृहस्थ जीवन की उन्नति"
    ]
  },
  17: {
    name: "Sagai / सगाई",
    items: [
      "Engagement Rings (अंगूठियां)",
      "Tilak Thali Setup",
      "Roli, Chawal, Haldi",
      "Sindoor",
      "Kalash + Nariyal",
      "Ghee / Oil Diya",
      "Kapoor",
      "Agarbatti / Dhoop",
      "Flowers + Garland",
      "Fruits (5 प्रकार)",
      "Sweet Box / Mishri",
      "Supari",
      "Paan Patta",
      "Coin / Dakshina",
      "Ghanti",
      "Puja Thali",
      "Swastik Sticker / Rangoli"
    ],
    benefits: [
      "दोनों परिवारों में प्रेम और सौहार्द बढ़ता है",
      "दंपत्ति के भविष्य को शुभता का आशीर्वाद",
      "नई शुरुआत में मंगल कार्य की स्थापना"
    ]
  },
  18: {
    name: "Haldi / हल्दी रस्म",
    items: [
      "Organic Haldi (हल्दी)",
      "Rose Water (गुलाब जल)",
      "Chandan Powder",
      "Milk / Curd",
      "Haldi Thali + Bowl",
      "New Cloth for Bride/Groom",
      "Turmeric Garland Decor",
      "Flower Petals",
      "Genda Phool Decoration",
      "Rangoli Powder",
      "Roli, Akshat",
      "Coconut",
      "Kalash + Water",
      "Ghee/Oil Diya",
      "Kapoor",
      "Agarbatti"
    ],
    benefits: [
      "शरीर को पवित्र और मन को शांत रखना",
      "त्वचा की चमक और सौंदर्य बढ़ाना",
      "दृष्टि दोष और नकारात्मक ऊर्जा से रक्षा"
    ]
  },
  21: {
    name: "Reception / रिसेप्शन",
    items: [
      "Diya (घी/तेल)",
      "Flowers / Garland",
      "Fruits",
      "Sweet Box",
      "Tilak Kit (Roli + Akshat)",
      "Aarti Thali",
      "Kalash Setup",
      "Rose Petals",
      "Entrance Toran",
      "Lighting & Sound Setup"
    ],
    benefits: [
      "नवविवाहित दंपत्ति के स्वागत और सम्मान हेतु",
      "नए जीवन के शुभारम्भ में मंगल आशीर्वाद",
      "परिवार और समाज में स्नेह की वृद्धि"
    ]
  },
  22: {
    name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा",
    items: [
      "Kalash + Coconut",
      "Chandan, Haldi, Kumkum, Akshat",
      "Mauli",
      "Gangajal",
      "Flowers, Garland",
      "Ghee/Oil Diya",
      "Kapoor",
      "Agarbatti/Dhoop",
      "Fruits (5 प्रकार)",
      "Sweet Prasad",
      "Ghanti + Puja Thali",
      "Swastik/Rangoli Colors"
    ],
    benefits: [
      "दंपत्ति के बीच प्रेम और विश्वास बढ़ता है",
      "जीवन में शांति, स्वास्थ्य और दीर्घायु",
      "विवाह बंधन और अधिक सुदृढ़ होता है"
    ]
  },
  23: {
    name: "Antim Sanskar / अंतिम संस्कार",
    items: [
      "Chandan / Sandalwood",
      "Dhoop / Agarbatti",
      "Kapoor",
      "Deepak",
      "Ganga Jal",
      "Kafan / White Cloth",
      "Moksha Path (Garuda Puran) Book",
      "Wood (Patcha Khaad)",
      "Ghee",
      "Havan Samagri",
      "Til, Jau, Akshat",
      "Darbha Grass",
      "Earthen Pot (Matka)",
      "Pind Daan Bowl",
      "Black Sesame (Kale Til)",
      "Rice Flour",
      "Barley",
      "Pinda for donation",
      "Flowers / Garland",
      "Clothes Donation Items",
      "Dakshina / Coins"
    ],
    benefits: [
      "आत्मा की शांति और सद्गति हेतु",
      "कर्म बंधन से मुक्ति",
      "पूर्ण विधि से अंतिम संस्कार होने पर मोक्ष मार्ग प्रशस्त"
    ]
  },
  24: {
    name: "Pind Daan / पिंडदान",
    items: [
      "Black Sesame (काले तिल)",
      "Rice (चावल)",
      "Jau (जौ)",
      "Pind Daan Atta / Boiled Rice",
      "Banana Leaves",
      "Tulsi Leaves",
      "Kalash + Water",
      "Chandan, Haldi, Kumkum",
      "Flowers",
      "Akshat (चावल)",
      "Ghee Diya",
      "Agarbatti / Kapoor",
      "Havan Samagri + Samidha + Ghee",
      "Clothes",
      "Blanket",
      "Dakshina"
    ],
    benefits: [
      "पितृ दोष से मुक्ति",
      "पितरों को तृप्ति और संतुष्टि प्राप्त होती है",
      "परिवार में शांति, स्वास्थ्य और संतोष"
    ]
  },
  25: {
    name: "Shraddh / श्राद्ध पूजा",
    items: [
      "Pitru Photo / Symbol",
      "Black Sesame (काले तिल)",
      "Rice (चावल)",
      "Jau (जौ)",
      "Pinda (चावल के गोले)",
      "Chandan, Haldi, Kumkum, Akshat",
      "Gangajal",
      "Kalash + Coconut",
      "White Cloth",
      "Flowers + Garland",
      "Panchamrit सामग्री",
      "Fruits + Prasad",
      "Ghee/Oil Diya",
      "Kapoor",
      "Agarbatti",
      "Havan Kund + Havan Samagri + Samidha + Ghee",
      "Brahman Bhoj Samagri",
      "Vastra Daan (कपड़े दान)",
      "Dakshina"
    ],
    benefits: [
      "पितरों की आत्मा की शांति और मोक्ष मार्ग",
      "पितरों का आशीर्वाद परिवार पर बना रहता है",
      "धन, स्वास्थ्य एवं समृद्धि में वृद्धि"
    ]
  },
  27: {
    name: "Tehravin / तेरहवीं संस्कार",
    items: [
      "Pitru Photo",
      "White Cloth",
      "Chawal, Akshat",
      "Black Til",
      "Flowers / Garland",
      "Kalash Setup",
      "Ganga Jal",
      "Panchamrit सामग्री",
      "Prasad Items",
      "Fruits & Sweets",
      "Ghee Diya",
      "Kapoor",
      "Agarbatti / Dhoop",
      "Havan Samagri + Samidha + Ghee",
      "Brahmin Bhoj Items",
      "Vastra Daan",
      "Anna Daan (Food donation)"
    ],
    benefits: [
      "पितरों की आत्मा को शांति और तृप्ति",
      "परिवार में अशांति व बाधाओं का निवारण",
      "जीवन में सकारात्मक ऊर्जा का आगमन"
    ]
  },
  28: {
    name: "Karwa Chauth Puja / करवा चौथ पूजा",
    items: [
      "Karwa Set (मिट्टी/स्टील का करवा + ढक्कन)",
      "Sieve / Channi (छलनी)",
      "Lota / Kalash",
      "Roli, Chawal, Haldi, Kumkum",
      "Mehndi Cone + Alta",
      "Sindoor (सिंदूर)",
      "Red Cloth (लाल कपड़ा)",
      "Gangajal",
      "Ghee Diya",
      "Agarbatti & Kapoor",
      "Flowers",
      "Sargi Thali Items",
      "Mathri / Sweet Prasad",
      "Havan Samagri + Samidha + Ghee",
      "Karwa Chauth Katha Book",
      "Chandrama Arghya Samagri",
      "Rice Flour for Rangoli",
      "Puja Thali & Ghanti"
    ],
    benefits: [
      "पति की दीर्घायु और आरोग्य",
      "विवाह में प्रेम, विश्वास और मजबूती",
      "घर में समृद्धि और मंगल का आशीर्वाद"
    ]
  },
  29: {
    name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा",
    items: [
      "Lakshmi Ji Idol",
      "Ganesh Ji Idol",
      "Kuber Idol (ऐच्छिक)",
      "Gold/Silver Coin",
      "Bahi-Khata / Account Book",
      "Shree Yantra / Cowrie Shells",
      "Chandan, Haldi, Kumkum, Sindoor, Akshat",
      "Panchamrit सामग्री",
      "Kalash + Coconut + Mango Leaves",
      "Scented Diya + Ghee Diya",
      "Agarbatti, Dhoop, Kapoor",
      "Gangajal",
      "Diyas (21+) Lights",
      "Torans",
      "Rangoli Colors",
      "Batasha, Mishri, Dry Fruits, Sweets",
      "Fruits (5 Types)",
      "Havan Kund, Samagri, Samidha, Ghee",
      "Lakshmi Puja Book",
      "Ghanti"
    ],
    benefits: [
      "धन-समृद्धि एवं ऐश्वर्य की प्राप्ति",
      "व्यापार और नौकरी में सफलता",
      "घर में देवी लक्ष्मी का स्थायी वास"
    ]
  },
  30: {
    name: "Raksha Bandhan Puja / रक्षा बंधन पूजा",
    items: [
      "Rakhi (राखी)",
      "Tilak Samagri (Roli + Akshat)",
      "Aarti Diya",
      "Kalawa (कलावा)",
      "Kalash",
      "Flowers & Garland",
      "Gangajal",
      "Mishri / Sweets",
      "Dry Fruits",
      "Fruits",
      "Kapoor + Agarbatti",
      "Puja Thali"
    ],
    benefits: [
      "भाई की रक्षा और दीर्घायु",
      "भाई-बहन के प्रेम में वृद्धि",
      "परिवार में सौहार्द और खुशहाली"
    ]
  },
  31: {
    name: "Navratri Puja / नवरात्रि पूजा",
    items: [
      "Durga Mata Idol",
      "Chunri",
      "Sindoor",
      "Chandan, Haldi, Kumkum, Akshat",
      "Flowers, Garland",
      "Ghee Diya, Agarbatti, Kapoor",
      "Dhoop",
      "Kalash + Coconut + Mango Leaves",
      "Sapta Dhanya (7 Anaj)",
      "Panchamrit सामग्री",
      "Fruits + Dry Fruits",
      "Kanya Puja Samagri",
      "Havan Setup (Kanya Pujan Day)",
      "Ghat Sthapana Samagri",
      "Rangoli Colors"
    ],
    benefits: [
      "दुर्गा शक्ति की कृपा, साहस और बल में वृद्धि",
      "नकारात्मक शक्तियों से सुरक्षा",
      "घर में सुख-शांति और सम्पन्नता"
    ]
  },
  32: {
    name: "Saraswati Puja / सरस्वती पूजा",
    items: [
      "Maa Saraswati Idol / Photo",
      "Books & Stationery",
      "Veena Symbol (ऐच्छिक)",
      "Chandan, Haldi, Kumkum, Akshat",
      "White Cloth",
      "Kalash + Coconut",
      "Gangajal",
      "Ghee Diya",
      "Kapoor, Agarbatti",
      "Flowers + Garland",
      "Sweet + Fruits",
      "Panchamrit सामग्री",
      "Ghanti + Thali",
      "Rangoli"
    ],
    benefits: [
      "अध्ययन, बुद्धि और कला में उन्नति",
      "विद्यार्थियों के लिए विशेष शुभ",
      "ज्ञान और विवेक की प्राप्ति"
    ]
  },
  33: {
    name: "Mahashivratri Puja / महाशिवरात्रि पूजा",
    items: [
      "Shivling (शिवलिंग)",
      "Bilva Patra (बेल पत्र)",
      "Bhasma / Vibhuti",
      "Panchamrit सामग्री",
      "Ganga Jal + Milk",
      "Chandan, Haldi, Kumkum, Akshat",
      "White Cloth",
      "Dhatura + Bael Fruit",
      "Flowers + Garland",
      "Ghee Diya + Kapoor",
      "Agarbatti + Dhoop",
      "Havan Setup (optional)",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "कष्टों का नाश, रोगों से मुक्ति",
      "सुख-शांति और आध्यात्मिक उन्नति",
      "परिवार में स्वास्थ्य और समृद्धि"
    ]
  },
  34: {
    name: "Chhath Puja / छठ पूजा",
    items: [
      "Arghya Lota",
      "Milk",
      "Ganga Jal",
      "Sugarcane",
      "Coconut",
      "Thekua Prasad",
      "Seasonal Fruits (11 Types)",
      "Banana Leaves",
      "Flowers + Garland",
      "Diya",
      "Soop + Daura Set",
      "Gangajali Bottle",
      "Havan Setup"
    ],
    benefits: [
      "आरोग्य, संतान और परिवार की समृद्धि",
      "सूर्य देव की कृपा और उन्नति",
      "जीवन में सकारात्मक ऊर्जा"
    ]
  },
  36: {
    name: "Janmashtami Puja / जन्माष्टमी पूजा",
    items: [
      "Baal Krishna Idol",
      "Jhula Setup",
      "Makhana, Mishri, Makhan",
      "Panchamrit सामग्री",
      "Chandan, Haldi, Kumkum, Akshat",
      "Gangajal",
      "Ghee Diya",
      "Agarbatti, Dhoop",
      "Flowers, Garland",
      "Rangoli",
      "Dry Fruits + Fruits",
      "Laddu Gopal Vastra"
    ],
    benefits: [
      "घर में सुख-समृद्धि और सौभाग्य",
      "नवीन ऊर्जा और धन की वृद्धि",
      "परिवार में खुशियां और प्रेम"
    ]
  },
  37: {
    name: "Rudrabhishek / रुद्राभिषेक",
    items: [
      "Shivling",
      "Bilva Patra",
      "Raw Milk",
      "Curd",
      "Honey",
      "Ghee",
      "Sugar",
      "Gangajal",
      "Bhasma / Vibhuti",
      "Chandan, Haldi, Kumkum, Akshat",
      "Dhatura / Bael Fruit",
      "White Cloth",
      "Flowers + Garland",
      "Ghee Diya + Kapoor",
      "Agarbatti + Dhoop",
      "Havan Kund + Samagri + Samidha + Ghee",
      "Rudra Mantra Booklet",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "कठिन रोगों और बाधाओं का निवारण",
      "धन, सफलता और मानसिक शांति",
      "पापों का नाश और आध्यात्मिक उन्नति"
    ]
  },
  38: {
    name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप",
    items: [
      "Shivling",
      "Rudraksha Mala",
      "Bilva Patra",
      "Milk, Curd, Honey, Sugar, Ghee",
      "Gangajal",
      "Haldi, Kumkum, Akshat",
      "Flowers & Garland",
      "Bhasma",
      "Ghee Diya, Kapoor",
      "Agarbatti, Dhoop",
      "Havan Kund + Samagri + Samidha + Ghee",
      "Pandit Asan Cloth",
      "Mantra Book / Jaap Mala",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "दीर्घायु, स्वास्थ्य और दुर्घटना शमन",
      "भय, रोग और संकटों से मुक्ति",
      "जीवन में सकारात्मक उर्जा और शांति"
    ]
  },
  39: {
    name: "Bhumi Pujan / भूमि पूजन",
    items: [
      "Shankh",
      "Bhumi Devi Idol",
      "Kalash + Coconut + Mango Leaves",
      "Durva Grass",
      "Haldi, Kumkum, Akshat, Sindoor",
      "Gangajal",
      "Havan Kund",
      "Samidha",
      "Havan Samagri",
      "Ghee",
      "Flowers, Garland",
      "Ghee Diya, Kapoor, Dhoop",
      "Navgrah Anaj",
      "Copper Nail",
      "Brick / Stone Placement",
      "Puja Thali, Ghanti",
      "Swastik Sticker"
    ],
    benefits: [
      "भूमि दोषों का निवारण",
      "निर्माण कार्य में सफलता",
      "घर में शांति, सकारात्मक ऊर्जा और समृद्धि"
    ]
  },
  40: {
    name: "Kundali Shanti / कुंडली शांति",
    items: [
      "Navgrah Photo / Yantra",
      "Kalash + Coconut",
      "Saptdhanya (7 Anaj)",
      "Haldi, Kumkum, Akshat",
      "Sindoor",
      "Ghee Diya",
      "Kapoor",
      "Agarbatti, Dhoop",
      "Dry Fruits",
      "Honey",
      "Fruits",
      "Havan Kund + Samagri + Samidha + Ghee",
      "Pandit Booklet for Grah Shanti",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "ग्रह दोषों का निवारण",
      "स्वास्थ्य और आर्थिक लाभ",
      "भागय में वृद्धि और सफलता"
    ]
  },
  41: {
    name: "Upanayan Sanskar / उपनयन संस्कार",
    items: [
      "Janeu / Sacred Thread",
      "Yajyopavit Vidhi Book",
      "Kalash + Coconut",
      "Haldi, Kumkum, Akshat",
      "Mauli",
      "Gangajal",
      "Havan Kund + Samagri + Samidha + Ghee",
      "Flowers + Garland",
      "Ghee Diya",
      "Kapoor + Agarbatti",
      "Guru Dakshina",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "बालक को धर्म, संस्कार और कर्तव्य ज्ञान की प्राप्ति",
      "आत्मिक, मानसिक और शारीरिक विकास"
    ]
  },
  42: {
    name: "Kalash Sthapana / कलश स्थापना",
    items: [
      "Kalash",
      "Coconut",
      "Mango Leaves",
      "Turmeric Powder",
      "Chandan, Kumkum, Akshat",
      "Gangajal",
      "Flowers",
      "Ghee Diya + Kapoor",
      "Agarbatti + Dhoop",
      "Panchamrit Items",
      "Puja Thali + Ghanti"
    ],
    benefits: [
      "घर और ऑफिस में सकारात्मक ऊर्जा का आगमन",
      "देवी-देवताओं का आह्वान",
      "दोष निवारण और सुख-समृद्धि"
    ]
  },
  44: {
    name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज",
    items: [
      "Custom Puja Samagri as per requirement",
      "Personalized Idol/Photo",
      "Special Ritual Items",
      "Custom Mantra Booklet",
      "Personalized Prasad Items",
      "Custom Decoration Items",
      "Special Havan Samagri",
      "Personalized Puja Vidhi Book"
    ],
    benefits: [
      "Completely customized as per your needs",
      "Perfect for specific requirements",
      "Tailored to your preferences",
      "Flexible and adaptable"
    ]
  },
  45: {
    name: "Online Puja Seva / ऑनलाइन पूजा सेवा",
    items: [
      "Virtual Puja Setup",
      "Online Streaming Access",
      "Digital Prasad Delivery",
      "E-Puja Booklet",
      "Virtual Darshan",
      "Online Consultation",
      "Digital Receipt & Certificate"
    ],
    benefits: [
      "Participate from anywhere in the world",
      "Convenient and accessible",
      "Live streaming of rituals",
      "Digital records and certificates"
    ]
  },
  46: {
    name: "Customized Event Plan / कस्टम इवेंट प्लान",
    items: [
      "Event Planning Consultation",
      "Custom Puja Schedule",
      "Special Decoration Items",
      "Guest Management Setup",
      "Catering Coordination",
      "Photography/Videography",
      "Complete Event Management"
    ],
    benefits: [
      "Stress-free event planning",
      "Professional management",
      "Customized to your event",
      "Complete end-to-end service"
    ]
  }
};
// ---------- Helper Functions ----------
const saveToLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const readFromLocal = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch (e) {
    return fallback;
  }
};

const formatINR = (amount) => `₹${amount}`;

// ---------- Diya Animation Component ----------
const DiyaAnimation = () => (
  <motion.div
    className="fixed inset-0 flex justify-center items-center pointer-events-none z-[60]"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0] }}
    transition={{ duration: 1.5 }}
  >
    <div className="w-8 h-8 bg-orange-500 rounded-full blur-lg"></div>
    <div className="absolute w-16 h-16 bg-yellow-200 rounded-full blur-xl"></div>
  </motion.div>
);

// ---------- Product Card Component ----------
const ProductCard = ({ product, qty, isPackage, wishlist, onWishlistToggle, onAddToCart, onBookPuja, onViewDetails, onBuyNow, onQuantityChange }) => {
  return (
    <motion.div
      layout
      className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg cursor-pointer relative overflow-hidden border border-rose-100 group flex flex-col h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
        <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
          isPackage 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
        }`}>
          {isPackage ? 'Puja Package' : 'Single Item'}
        </div>
        
        <button
          onClick={onWishlistToggle}
          className="p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <FiHeart
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
              wishlist
                ? "text-rose-500 fill-rose-500"
                : "text-gray-400 hover:text-rose-400"
            }`}
          />
        </button>
      </div>

      {/* Image Container */}
      <div className="h-28 sm:h-36 overflow-hidden bg-gradient-to-br from-amber-50 to-rose-50 relative">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.innerHTML = `
              <div class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl sm:text-4xl mb-1 sm:mb-2">${isPackage ? '📦' : '🛒'}</div>
                  <div class="text-xs text-gray-500 px-1">${product.name}</div>
                </div>
              </div>
            `;
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Category Tag */}
        <div className="mb-1 sm:mb-2">
          <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-amber-100 text-amber-800 text-[9px] sm:text-[10px] font-medium rounded-full">
            {product.subcategory}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-xs sm:text-sm text-gray-800 group-hover:text-rose-900 transition-colors line-clamp-2 leading-tight mb-1 h-8 sm:h-10">
          {product.name}
        </h3>

        {/* Unit/Type Info */}
        <p className="text-[10px] sm:text-[11px] text-gray-500 mb-2 sm:mb-3 flex items-center gap-1">
          {!isPackage && (
            <>
              <span>Unit:</span>
              <span className="font-medium text-gray-700">{product.unit}</span>
            </>
          )}
        </p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-bold text-amber-700">
                ₹{product.price}
              </span>
              {!isPackage && (
                <span className="text-[10px] sm:text-xs text-gray-500">/ {product.unit}</span>
              )}
            </div>
            {!isPackage && qty > 1 && (
              <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                Total: <span className="font-semibold text-rose-700">
                  ₹{product.price * qty}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400 text-[10px] sm:text-xs">
              {"★".repeat(5)}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500">(4.8)</span>
          </div>
        </div>

        {/* Quantity Selector for Single Items */}
        {!isPackage && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] sm:text-xs font-medium text-gray-700">Qty:</label>
              <div className="flex items-center gap-1 bg-gray-50 rounded-full px-1 py-1 border border-gray-200">
                <button
                  onClick={() => onQuantityChange(product.id, -1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-white border text-sm hover:bg-gray-50 transition-colors"
                >
                  <FiMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value) || 1)}
                  className="w-8 sm:w-12 text-center text-xs sm:text-sm bg-transparent outline-none font-medium"
                />
                <button
                  onClick={() => onQuantityChange(product.id, 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-white border text-sm hover:bg-gray-50 transition-colors"
                >
                  <FiPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto space-y-1.5 sm:space-y-2">
          {isPackage ? (
            <>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={onViewDetails}
                  className="flex-1 py-1.5 sm:py-2 border border-blue-500 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-[10px] sm:text-xs font-medium flex items-center justify-center gap-1"
                >
                  <FiInfo className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Details
                </button>
                <button
                  onClick={onBookPuja}
                  className="flex-1 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-[10px] sm:text-xs font-medium"
                >
                  Book Now
                </button>
              </div>
              <button
                onClick={onAddToCart}
                className="w-full py-1.5 sm:py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors text-[10px] sm:text-xs font-medium"
              >
                Add Kit to Cart
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onAddToCart}
                className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Add to Cart
              </button>
              <button
                onClick={onBuyNow}
                className="w-full py-2 sm:py-2.5 border border-amber-400 text-amber-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-amber-50 transition-colors"
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-lg sm:rounded-xl pointer-events-none transition-colors duration-300"></div>
    </motion.div>
  );
};

// ---------- Kit Items Modal with Complete Architecture ----------
const KitItemsModal = ({ kit, onClose, onAddToCart }) => {
  const kitDetails = pujaKitItems?.[kit?.id];

  /* ========== 1️⃣ DATA MODEL (Single Source of Truth) ========== */
  const createKitItems = useCallback((items) => {
    if (!items?.length) return [];
    return items.map((name, index) => ({
      id: `${kit.id}-${name}-${index}`, // Unique ID
      name: name.trim(),
      basePrice: resolveItemPrice(name), // default price
      customPrice: null, // user/admin edited price
      qty: /2|two|दो/i.test(name) ? 2 : 
           /5|five|पांच/i.test(name) ? 5 : 
           /10|ten|दस/i.test(name) ? 10 : 1,
      enabled: true
    }));
  }, [kit.id]);

  /* ========== 2️⃣ STATE INITIALIZATION ========== */
  const [kitItems, setKitItems] = useState(() => 
    createKitItems(kitDetails?.items)
  );

  /* ========== 3️⃣ QTY + ENABLE LOGIC ========== */
  const updateQty = useCallback((id, delta) => {
    setKitItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(0, item.qty + delta),
              enabled: item.qty + delta > 0, // qty = 0 → enabled = false
            }
          : item
      )
    );
  }, []);

  /* ========== 4️⃣ PRICE EDIT SYSTEM ========== */
  const updatePrice = useCallback((id, price) => {
    setKitItems((items) =>
      items.map((item) =>
        item.id === id
          ? { 
              ...item, 
              customPrice: price === item.basePrice ? null : price 
            }
          : item
      )
    );
  }, []);

  /* ========== 5️⃣ TOTAL PRICE CALCULATION ========== */
  const totalKitPrice = useMemo(() => {
    return kitItems
      .filter((item) => item.enabled) // Only enabled items
      .reduce(
        (sum, item) => 
          sum + (item.customPrice ?? item.basePrice) * item.qty,
        0
      );
  }, [kitItems]);

  /* ========== 6️⃣ CART PAYLOAD (Production Ready) ========== */
  const handleAddToCart = () => {
    const enabledItems = kitItems.filter((item) => item.enabled);
    
    const cartPayload = {
      kitId: kit.id,
      name: kitDetails.name,
      type: "puja-kit",
      price: totalKitPrice,
      items: enabledItems.map(({ name, qty, basePrice, customPrice }) => ({
        name,
        qty,
        basePrice,
        customPrice,
        finalPrice: customPrice ?? basePrice
      }))
    };

    onAddToCart(cartPayload);
    onClose();
  };

  /* ========== 7️⃣ BACKEND READY STRUCTURE ========== */
  const getBackendPayload = () => {
    const enabledItems = kitItems.filter((item) => item.enabled);
    
    return {
      kitId: kit.id,
      totalPrice: totalKitPrice,
      items: enabledItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.customPrice ?? item.basePrice,
        basePrice: item.basePrice,
        customPrice: item.customPrice
      }))
    };
  };

  if (!kitDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center md:justify-center"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white w-full max-w-3xl
          rounded-t-3xl md:rounded-3xl
          max-h-[85vh] md:max-h-[90vh]
          flex flex-col
        "
      >
        {/* ===== HEADER ===== */}
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2" />

          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={onClose} className="text-xl">←</button>
            <div>
              <h2 className="font-semibold text-base">
                {kitDetails.name}
              </h2>
              <p className="text-xs text-gray-500">
                Customize your kit • Items with qty = 0 will be excluded
              </p>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 overflow-y-auto px-4 pb-40">
          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 my-3">
            🪔 <strong>Quantity 0 = Item excluded</strong> • Click on price to edit
          </div>

          {/* Items List */}
          <div className="divide-y">
            {kitItems.map((item) => (
              <div
                key={item.id}
                className={`py-3 ${!item.enabled ? "opacity-40" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Item Name & Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Base: ₹{item.basePrice}
                          </span>
                          {item.customPrice !== null && (
                            <span className="text-xs text-green-600">
                              Custom: ₹{item.customPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Edit Input */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.customPrice ?? item.basePrice}
                        onChange={(e) => 
                          updatePrice(item.id, Number(e.target.value))
                        }
                        className="w-20 text-xs border rounded px-2 py-1 text-center"
                      />
                      <span className="text-xs text-gray-500">×</span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.qty === 0 
                            ? "bg-gray-100 text-gray-400" 
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => updateQty(item.id, -1)}
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      
                      <span className={`font-semibold w-6 text-center ${
                        item.qty === 0 ? "text-gray-400" : ""
                      }`}>
                        {item.qty}
                      </span>
                      
                      <button
                        className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 flex items-center justify-center"
                        onClick={() => updateQty(item.id, 1)}
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex justify-end mt-2">
                  <div className="text-xs text-gray-600">
                    Item Total:{" "}
                    <span className="font-semibold text-rose-700">
                      ₹{(item.customPrice ?? item.basePrice) * item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {kitItems.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-10">
              No items available
            </p>
          )}
        </div>

        {/* ===== FLOATING CTA ===== */}
        <div className="sticky bottom-0 z-30 pointer-events-none">
          <div className="px-4 pb-6">
            <div
              className="
                pointer-events-auto
                bg-white/95 backdrop-blur
                border
                rounded-3xl
                shadow-[0_-10px_30px_rgba(0,0,0,0.15)]
                px-4 py-4
                flex items-center justify-between gap-4
                translate-y-[-30px]
              "
            >
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                  Total Kit Price
                </p>
                <p className="text-xl font-bold text-rose-700">
                  ₹{totalKitPrice}
                </p>
                <p className="text-[10px] text-gray-500">
                  {kitItems.filter(i => i.enabled).length} items included
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={handleAddToCart}
                  className="
                    bg-gradient-to-r from-rose-600 to-pink-600
                    text-white
                    px-8 py-3.5
                    rounded-2xl
                    font-semibold
                    shadow-[0_8px_25px_rgba(244,63,94,0.45)]
                    hover:shadow-[0_12px_30px_rgba(244,63,94,0.6)]
                    transition-all
                  "
                >
                  Add Kit to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

// ---------- Unified Order Wizard Modal ----------
const UnifiedOrderWizardModal = ({
  mode,
  product,
  qty,
  cartItems,
  onClose,
  onConfirm,
}) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    deliveryDate: "",
    deliverySlot: "",
    includePandit: false,
    additionalNotes: "",
  });

  const items = useMemo(() => {
    if (mode === 'single' && product) {
      return [{ ...product, qty }];
    } else if (mode === 'package' && product) {
      return [{ ...product, qty, includePandit: form.includePandit }];
    }
    return cartItems || [];
  }, [mode, product, qty, cartItems, form.includePandit]);

  const pricing = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      let price = item.price;
      if (item.type === 'package' && item.includePandit) {
        price += 500;
      }
      return sum + price * item.qty;
    }, 0);
    
    const gst = Math.round(subtotal * 0.18);
    const delivery = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 50;
    const total = subtotal + gst + delivery;
    return { subtotal, gst, delivery, total };
  }, [items]);

  const getTomorrowDate = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 5; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const time12hr = new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
          "en-IN",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        );
        timeSlots.push(time12hr);
      }
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const handleNext = () => {
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
        alert("Please fill all required fields");
        return;
      }
      if (form.phone.length < 8) {
        alert("Please enter valid phone number");
        return;
      }
    }
    if (step === 2) {
      if (!form.deliveryDate || !form.deliverySlot) {
        alert("Please select delivery date and time slot");
        return;
      }
      if (mode === 'package' && !form.deliveryDate) {
        alert("Please select puja date");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleConfirm = () => {
    onConfirm({
      items,
      pricing,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        landmark: form.landmark,
        city: form.city,
        pincode: form.pincode,
      },
      delivery: {
        date: form.deliveryDate,
        slot: form.deliverySlot,
      },
      includePandit: form.includePandit,
      additionalNotes: form.additionalNotes,
      mode,
    });
  };

  const isPackage = mode === 'package';

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-3 sm:p-4 border-b border-rose-100 flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-rose-800 flex items-center gap-1 sm:gap-2">
              {isPackage ? <FiCalendar /> : <FiShoppingCart />}
              {isPackage ? "Book Puja Package" : "Place Order"}
            </h2>
            <p className="text-xs text-gray-500 hidden sm:block">
              {isPackage 
                ? "Complete puja service booking" 
                : "Daily puja items home delivery"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-rose-600 text-xl p-1"
          >
            <FiX />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            {[
              { no: 1, label: "Address" },
              { no: 2, label: isPackage ? "Date & Time" : "Delivery Slot" },
              { no: 3, label: "Review" },
            ].map((s) => (
              <div key={s.no} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${
                    step >= s.no
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step > s.no ? <FiCheckCircle /> : s.no}
                </div>
                <span
                  className={`mt-1 text-[10px] sm:text-xs text-center ${
                    step >= s.no
                      ? "text-rose-700 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-rose-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="px-3 sm:px-4 pb-3 min-h-[280px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Address */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800 flex items-center gap-2">
                  <FiMapPin />
                  {isPackage ? "Puja Address Details" : "Delivery Address"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs text-gray-600 mb-1 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1.5">
                      <FiUser className="text-gray-400 text-xs" />
                      <input
                        type="text"
                        className="w-full text-xs sm:text-sm outline-none"
                        placeholder="Your good name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1.5">
                      <FiPhone className="text-gray-400 text-xs" />
                      <input
                        type="tel"
                        className="w-full text-xs sm:text-sm outline-none"
                        placeholder="10 digit mobile"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, city: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, pincode: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    {isPackage ? "Puja Address" : "Full Address"} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                    placeholder={isPackage ? "Where should panditji come for puja?" : "House no, street, area..."}
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Landmark
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                    placeholder="Near temple / chowk"
                    value={form.landmark}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, landmark: e.target.value }))
                    }
                  />
                </div>

                {isPackage && (
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Any special requirements..."
                      value={form.additionalNotes}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, additionalNotes: e.target.value }))
                      }
                    />
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg px-2 py-2 text-[11px] text-amber-800 flex items-start gap-2">
                  <FiShield className="text-amber-500 mt-0.5" />
                  <span>
                    Your details are used only for service. No spam, no sharing.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800 flex items-center gap-2">
                  <FiCalendar />
                  {isPackage ? "Puja Date & Time" : "Delivery Schedule"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      {isPackage ? "Puja Date" : "Delivery Date"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      value={form.deliveryDate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      {isPackage ? "Puja Time" : "Time Slot"} <span className="text-red-500">*</span>
                    </label>
                    {isPackage ? (
                      <select
                        className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                        value={form.deliverySlot}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, deliverySlot: e.target.value }))
                        }
                      >
                        <option value="">Choose preferred time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    ) : (
                      <select
                        className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                        value={form.deliverySlot}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, deliverySlot: e.target.value }))
                        }
                      >
                        <option value="">Select slot</option>
                        <option value="6 AM - 9 AM">6 AM - 9 AM</option>
                        <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                        <option value="12 PM - 3 PM">12 PM - 3 PM</option>
                        <option value="3 PM - 6 PM">3 PM - 6 PM</option>
                        <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                      </select>
                    )}
                  </div>
                </div>

                {isPackage && product && (
                  <div className="flex items-start gap-3 p-3 border border-amber-300 rounded-lg bg-amber-50">
                    <input
                      type="checkbox"
                      id="includePandit"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 focus:ring-rose-500 rounded mt-0.5"
                      checked={form.includePandit}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          includePandit: e.target.checked,
                        }))
                      }
                    />
                    <label
                      htmlFor="includePandit"
                      className="text-sm text-gray-700 flex-1"
                    >
                      <div className="font-semibold text-xs sm:text-sm">
                        Include Pandit Service (+₹500)
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Experienced pandit will perform the puja with proper rituals
                      </div>
                    </label>
                  </div>
                )}

                <div className={`border rounded-lg px-2 py-2 text-[11px] flex items-start gap-2 ${
                  isPackage ? "bg-green-50 border-green-200 text-green-800" : "bg-blue-50 border-blue-200 text-blue-800"
                }`}>
                  <FiClock className="mt-0.5" />
                  <span>
                    {isPackage 
                      ? "For best spiritual benefits, consider morning hours (5:00 AM - 9:00 AM)"
                      : "We always try to deliver in selected slot. In rare cases, there can be +/- 30 minutes variation."}
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800">
                  Review Your {isPackage ? "Booking" : "Order"}
                </h3>

                {/* Items Summary */}
                <div className="bg-rose-50 rounded-lg p-3 max-h-40 sm:max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id || item.kitId}
                      className="flex items-center justify-between text-xs sm:text-sm mb-2 last:mb-0"
                    >
                      <span className="flex-1 pr-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-500 text-[10px] sm:text-xs">
                          {item.type === 'single' && ` (${item.unit})`}
                          {item.type === 'package' && item.includePandit && " + Pandit"}
                          {item.type === 'puja-kit' && ` (Custom Kit)`}
                          <span className="ml-1">
                            ({item.qty} × {formatINR(item.type === 'package' && item.includePandit ? item.price + 500 : item.price)})
                          </span>
                        </div>
                      </span>
                      <span className="font-semibold text-rose-700">
                        {formatINR((item.type === 'package' && item.includePandit ? item.price + 500 : item.price) * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address & Delivery Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-white border border-gray-100 rounded-lg p-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiHome className="text-rose-600" />
                      <span className="font-semibold text-gray-800">
                        {isPackage ? "Puja At" : "Delivery To"}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{form.name}</p>
                    <p className="text-gray-600">{form.phone}</p>
                    <p className="text-gray-600 text-[11px] mt-1">
                      {form.address}
                      {form.landmark && `, ${form.landmark}`}
                      {form.city && `, ${form.city}`}{" "}
                      {form.pincode && `- ${form.pincode}`}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-lg p-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCalendar className="text-rose-600" />
                      <span className="font-semibold text-gray-800">
                        {isPackage ? "Schedule" : "Delivery"}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Date:{" "}
                      {form.deliveryDate
                        ? new Date(form.deliveryDate).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })
                        : "-"}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {isPackage ? "Time" : "Slot"}: {form.deliverySlot || "-"}
                    </p>
                    {isPackage && form.includePandit && (
                      <p className="text-green-600 mt-1 text-xs">✓ Pandit Service Included</p>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-3 text-xs sm:text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatINR(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>{formatINR(pricing.gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {isPackage ? "Service Charges" : "Delivery"}{" "}
                      {!isPackage && pricing.delivery === 0 && (
                        <span className="text-green-600 text-[10px]">(FREE)</span>
                      )}
                    </span>
                    <span>{formatINR(pricing.delivery)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg border-t border-gray-200 pt-2 sm:pt-3 mt-2">
                    <span>Total Payable</span>
                    <span>{formatINR(pricing.total)}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-2 text-[11px] text-green-800 flex items-start gap-2">
                  <FiShield className="mt-0.5" />
                  <span>
                    Secure checkout. {isPackage ? "Booking" : "Order"} confirmation will be sent via WhatsApp.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm text-gray-700 flex items-center gap-1 hover:bg-gray-50"
              >
                <FiArrowLeft className="hidden sm:inline" />
                Back
              </button>
            )}

            <button
              onClick={step === 3 ? handleConfirm : handleNext}
              className="flex-1 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs sm:text-sm font-semibold hover:shadow-lg flex items-center justify-center gap-2"
            >
              {step === 3 ? (
                <>
                  <FiCheckCircle />
                  {isPackage ? "Confirm Booking" : "Confirm Order"}
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Unified Success Page ----------
const UnifiedSuccessPage = ({ order, onBackToHome }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const isPackage = order.mode === 'package';

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const itemsText = order.items
      .map((item) => 
        `• ${item.name}${item.type === 'single' ? ` (${item.unit})` : ''} (x${item.qty}) - ₹${(item.type === 'package' && item.includePandit ? item.price + 500 : item.price) * item.qty}`
      )
      .join("\n");

    const msg = `🪷 *Sanskaraa ${isPackage ? 'Puja Booking' : 'Order'} Confirmed* 🪷

*${isPackage ? 'Booking' : 'Order'} ID:* ${order.id}
*Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}

*${isPackage ? 'Service' : 'Items'}:*
${itemsText}

*Total:* ₹${order.pricing.total}

*${isPackage ? 'Puja' : 'Delivery'} Details:*
• Date: ${new Date(order.delivery.date).toLocaleDateString("en-IN")}
• ${isPackage ? 'Time' : 'Slot'}: ${order.delivery.slot}
• Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

${isPackage && order.includePandit ? '✓ Pandit Service Included\n' : ''}
_This ${isPackage ? 'booking' : 'order'} is placed via Sanskaraa - Your Complete Puja Solution._`;

    const encoded = encodeURIComponent(msg);
    const supportNumber = "916201486202";
    const url = `https://wa.me/${supportNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  const handleDownloadReceipt = () => {
    alert("PDF receipt download will be implemented with backend integration");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-lg max-w-md w-full p-4 sm:p-6 text-center relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-24 sm:h-24 bg-amber-200 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 sm:w-24 sm:h-24 bg-green-200 rounded-full blur-3xl opacity-60" />

        {/* Success Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-green-200 rounded-full flex items-center justify-center"
                >
                  <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Icon */}
        <div className="relative mb-4 mt-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <div className="mt-2 text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 px-2 sm:px-3 py-1 rounded-full inline-block">
            Sanskaraa • {isPackage ? 'Complete Puja Service' : 'Puja Essentials'}
          </div>
        </div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl font-bold text-gray-800 mb-2"
        >
          {isPackage ? 'Puja Booked Successfully!' : 'Order Confirmed!'}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm mb-3 sm:mb-4"
        >
          {isPackage 
            ? 'Your puja has been scheduled. May God bless you with happiness and prosperity.'
            : 'Thank you for choosing Sanskaraa. Your puja items will be delivered as per schedule.'}
        </motion.p>

        {/* Booking/Order Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-lg p-3 mb-3 text-left"
        >
          <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2 text-sm">
            {isPackage ? 'Booking' : 'Order'} Details
          </h3>

          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{isPackage ? 'Puja' : 'Items'}:</span>
              <span className="font-medium text-right">
                {order.items.length} {isPackage ? 'package' : 'item(s)'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(order.delivery.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{isPackage ? 'Time' : 'Slot'}:</span>
              <span className="font-medium">{order.delivery.slot}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-green-600">
                ₹{order.pricing.total}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-2 mb-3"
        >
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 text-white py-2 sm:py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors text-xs sm:text-sm"
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Share
          </button>

          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 text-gray-700 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
          >
            <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            PDF Receipt
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors text-sm"
          >
            <FiHome className="w-4 h-4" />
            Back to Store
          </button>
        </motion.div>

        {/* Blessing Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 mt-3 sm:mt-4 italic"
        >
          "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः"
          <br />
          May all be happy, may all be free from illness
        </motion.p>
      </motion.div>
    </div>
  );
};

// ---------- Main Component ----------
export default function UnifiedPujaStoreWithKitEditor() {
  const navigate = useNavigate();

  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("all");
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    allProducts.forEach((p) => {
      initial[p.id] = 1;
    });
    return initial;
  });

  // Wishlist + Cart persisted
  const [wishlist, setWishlist] = useState(() =>
    readFromLocal("sanskaraa_wishlist", [])
  );
  const [cart, setCart] = useState(() =>
    readFromLocal("sanskaraa_cart", [])
  );

  // Modal states
  const [showCart, setShowCart] = useState(false);
  const [showDiyaAnimation, setShowDiyaAnimation] = useState(false);
  const [showKitItemsModal, setShowKitItemsModal] = useState(false);
  const [selectedKitForDetails, setSelectedKitForDetails] = useState(null);

  // Order flow states
  const [showOrderWizard, setShowOrderWizard] = useState(false);
  const [orderMode, setOrderMode] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Persist cart & wishlist
  useEffect(() => saveToLocal("sanskaraa_cart", cart), [cart]);
  useEffect(() => saveToLocal("sanskaraa_wishlist", wishlist), [wishlist]);

  // Browser notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      // View mode filter
      if (viewMode === 'packages' && p.type !== 'package') return false;
      if (viewMode === 'single' && p.type !== 'single') return false;
      
      // Category filter
      const matchCat =
        selectedCategory === "All" || 
        p.category === selectedCategory || 
        p.subcategory === selectedCategory;
      
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q));
      
      return matchCat && matchSearch;
    });

    return list;
  }, [search, selectedCategory, viewMode]);

  // Quantity handlers for single items
  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = current + delta;
      return { ...prev, [id]: next < 1 ? 1 : next };
    });
  };

  // Cart handlers with proper kit support
  const addToCart = (product, qty = 1) => {
    if (qty < 1) qty = 1;
    setCart((prev) => {
      const idx = prev.findIndex((item) => 
        product.type === "puja-kit" 
          ? item.kitId === product.kitId 
          : item.id === product.id
      );
      
      if (idx === -1) {
        return [...prev, { ...product, qty }];
      }
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        qty: updated[idx].qty + qty,
      };
      return updated;
    });
    setShowCart(true);
    setShowDiyaAnimation(true);
    setTimeout(() => setShowDiyaAnimation(false), 1500);
  };

  const updateCartQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
    );

  // Order functions
  const bookPuja = (kit) => {
    setOrderMode('package');
    setOrderProduct(kit);
    setOrderQty(1);
    setShowOrderWizard(true);
  };

  const startSingleOrder = (product, qty) => {
    if (qty < 1) qty = 1;
    setOrderMode('single');
    setOrderProduct(product);
    setOrderQty(qty);
    setShowOrderWizard(true);
  };

  const startCartOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Please add some items.");
      return;
    }
    setOrderMode('cart');
    setOrderProduct(null);
    setOrderQty(1);
    setShowOrderWizard(true);
    setShowCart(false);
  };

  // Show Kit Details with editor
  const showKitDetails = (kit) => {
    setSelectedKitForDetails(kit);
    setShowKitItemsModal(true);
  };

  // Handle Order Confirmation
  const handleOrderConfirm = (orderPayload) => {
    const order = {
      id: Date.now(),
      items: orderPayload.items,
      pricing: orderPayload.pricing,
      customer: orderPayload.customer,
      delivery: orderPayload.delivery,
      includePandit: orderPayload.includePandit,
      additionalNotes: orderPayload.additionalNotes,
      mode: orderPayload.mode,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const prev = JSON.parse(
        localStorage.getItem("sanskaraa_orders") || "[]"
      );
      localStorage.setItem(
        "sanskaraa_orders",
        JSON.stringify([...prev, order])
      );
    } catch (e) {
      console.error(e);
    }

    // Clear cart if cart order
    if (order.mode === 'cart') {
      setCart([]);
    }

    setShowOrderWizard(false);
    setOrderSuccess(order);

    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Sanskaraa", {
        body: `${order.mode === 'package' ? 'Puja' : 'Order'} confirmed for ₹${order.pricing.total}`,
        icon: "/images/logo.png",
      });
    }
  };

  // Pricing for cart
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const couponDiscount =
    couponApplied === "FESTIVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const delivery =
    subtotal > 0 ? (subtotal > 999 ? 0 : 50) : 0;
  const total = Math.round(
    subtotal - couponDiscount + gst + delivery
  );

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FESTIVE10") {
      setCouponApplied("FESTIVE10");
    } else {
      setCouponApplied(null);
      alert("Invalid coupon");
    }
  };

  // If success page active, show only that
  if (orderSuccess) {
    return (
      <UnifiedSuccessPage
        order={orderSuccess}
        onBackToHome={() => {
          setOrderSuccess(null);
          setOrderMode(null);
          setOrderProduct(null);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700 font-medium">Loading Puja Store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] pt-16 pb-20 px-2 sm:px-4 lg:px-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 sm:w-24 sm:h-24 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-8 relative z-10">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-6 p-3 bg-white/80 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm border border-amber-100">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#800000] font-serif">
              Sanskaraa Puja Store
            </h1>
            <p className="text-xs sm:text-sm text-[#800000] mt-0.5">
              Complete Puja Solutions with Customizable Kits
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-48 lg:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 w-full rounded-full border border-orange-200 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                placeholder="Search puja kits or items..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart((s) => !s)}
              className="relative bg-orange-600 text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
                >
                  {cart.length}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="bg-white/95 backdrop-blur-md py-3 sm:py-4 mt-3 sm:mt-4 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-2 sm:px-4">
            
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              <div className="text-xs font-semibold text-gray-500 mr-2 hidden sm:block">View:</div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {[
                  { key: "all", label: "All", icon: FiGrid },
                  { key: "packages", label: "Puja Kits", icon: FiPackage },
                  { key: "single", label: "Single Items", icon: FiList },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-all ${
                      viewMode === tab.key
                        ? "bg-white text-rose-700 shadow-md"
                        : "text-gray-600 hover:text-rose-600"
                    }`}
                    onClick={() => setViewMode(tab.key)}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              <div className="relative">
                <FiGrid className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Package Kits">Puja Packages</option>
                  <option value="Single Items">Single Items</option>
                  <option value="Ghar ke Sanskaar">Ghar ke Sanskaar</option>
                  <option value="Festival Pujas">Festival Pujas</option>
                  <option value="Vivah Sanskar">Wedding Ceremonies</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Diya Animation */}
        <AnimatePresence>
          {showDiyaAnimation && <DiyaAnimation />}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="mt-4 sm:mt-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-white to-amber-50 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                No items found
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto mb-4 sm:mb-6 px-4">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearch("");
                }}
                className="px-4 sm:px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="text-xs sm:text-sm text-gray-600">
                  Showing <span className="font-semibold">{filtered.length}</span> items
                </div>
                <div className="text-xs text-gray-500">
                  {viewMode === 'all' ? 'All Items' : viewMode === 'packages' ? 'Customizable Puja Kits' : 'Single Items'}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    qty={quantities[product.id] || 1}
                    isPackage={product.type === 'package'}
                    wishlist={wishlist.includes(product.id)}
                    onWishlistToggle={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product, quantities[product.id] || 1)}
                    onBookPuja={() => bookPuja(product)}
                    onViewDetails={() => showKitDetails(product)}
                    onBuyNow={() => startSingleOrder(product, quantities[product.id] || 1)}
                    onQuantityChange={(id, delta) => changeQty(id, delta)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto mt-16"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 p-3 border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <FiShoppingCart className="w-5 h-5 text-rose-600" />
                    {cart.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        {cart.length}
                      </motion.span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-rose-800">Your Cart</h2>
                    <p className="text-xs text-gray-500">{cart.length} items</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500 hover:text-rose-600" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="p-3">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center">
                      <FiShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-700 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 text-xs mb-4">
                      Add some puja items to get started
                    </p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id || item.kitId}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2 items-start p-2 bg-white rounded-lg border border-gray-100 hover:border-rose-200 transition-colors"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-xl">
                                {item.type === 'puja-kit' ? '📦' : '🛒'}
                              </span>
                            </div>
                            {item.type === 'puja-kit' && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center">
                                📦
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4 className="font-semibold text-xs text-gray-800 line-clamp-2">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id || item.kitId)}
                                className="text-gray-400 hover:text-rose-600 ml-1"
                              >
                                <FiX className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
                                {item.type === 'single' ? item.unit : 'Custom Kit'}
                              </span>
                              <span className="text-amber-700 font-bold text-xs">
                                ₹{item.price}
                              </span>
                            </div>

                            {/* Kit Items Summary */}
                            {item.type === 'puja-kit' && item.items && (
                              <div className="mt-1 text-xs text-gray-600">
                                Contains {item.items.length} items
                              </div>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-1.5 py-1">
                                <button
                                  onClick={() => updateCartQty(item.id, item.qty - 1)}
                                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-white transition-colors"
                                >
                                  <FiMinus className="w-2.5 h-2.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-medium">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateCartQty(item.id, item.qty + 1)}
                                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-white transition-colors"
                                >
                                  <FiPlus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <span className="font-bold text-rose-700 text-sm">
                                ₹{item.price * item.qty}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Price Summary */}
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      {/* Coupon Section */}
                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Apply Coupon
                        </label>
                        <div className="flex gap-1">
                          <input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-xs font-medium whitespace-nowrap"
                          >
                            Apply
                          </button>
                        </div>
                        {couponApplied && (
                          <div className="mt-1 text-green-600 text-xs flex items-center gap-1">
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            Coupon {couponApplied} applied successfully!
                          </div>
                        )}
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-1.5 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">₹{subtotal}</span>
                        </div>
                        
                        {couponApplied && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Coupon Discount</span>
                            <span className="text-green-600 font-medium">
                              -₹{Math.round(couponDiscount)}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">GST (18%)</span>
                          <span className="font-medium">₹{Math.round(gst)}</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">
                            Delivery Charges
                            {delivery === 0 && (
                              <span className="text-green-600 ml-1">(FREE)</span>
                            )}
                          </span>
                          <span className={`font-medium ${delivery === 0 ? 'text-green-600' : ''}`}>
                            {delivery === 0 ? 'FREE' : `₹${delivery}`}
                          </span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-sm text-gray-900">Total</span>
                              <p className="text-[10px] text-gray-500">Inclusive of all taxes</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-rose-700">
                                ₹{total}
                              </div>
                              <p className="text-[10px] text-gray-500">Payable amount</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={startCartOrder}
                          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          Proceed to Checkout
                        </button>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowCart(false)}
                            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs"
                          >
                            Continue Shopping
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to clear cart?')) {
                                setCart([]);
                              }
                            }}
                            className="flex-1 py-2 border border-rose-200 text-rose-700 rounded-lg font-medium hover:bg-rose-50 transition-colors text-xs"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </div>

                      {/* Security Badge */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <FiShield className="text-green-600 w-3.5 h-3.5" />
                        <span>100% Secure • SSL Encrypted</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kit Items Modal */}
        <AnimatePresence>
          {showKitItemsModal && selectedKitForDetails && (
            <KitItemsModal
              kit={selectedKitForDetails}
              onClose={() => {
                setShowKitItemsModal(false);
                setSelectedKitForDetails(null);
              }}
              onAddToCart={addToCart}
            />
          )}
        </AnimatePresence>

        {/* Unified Order Wizard Modal */}
        <AnimatePresence>
          {showOrderWizard && (
            <UnifiedOrderWizardModal
              mode={orderMode}
              product={orderProduct}
              qty={orderQty}
              cartItems={cart}
              onClose={() => setShowOrderWizard(false)}
              onConfirm={handleOrderConfirm}
            />
          )}
        </AnimatePresence>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around items-center z-30 sm:hidden">
          <button
            onClick={() => setViewMode('all')}
            className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'all' ? 'text-rose-600 bg-rose-50' : 'text-gray-600'}`}
          >
            <FiGrid className="w-5 h-5" />
            <span className="text-xs mt-1">All</span>
          </button>
          
          <button
            onClick={() => setViewMode('packages')}
            className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'packages' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
          >
            <FiPackage className="w-5 h-5" />
            <span className="text-xs mt-1">Kits</span>
          </button>
          
          <button
            onClick={() => setViewMode('single')}
            className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'single' ? 'text-green-600 bg-green-50' : 'text-gray-600'}`}
          >
            <FiList className="w-5 h-5" />
            <span className="text-xs mt-1">Items</span>
          </button>
          
          <button
            onClick={() => setShowCart(true)}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 relative"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}