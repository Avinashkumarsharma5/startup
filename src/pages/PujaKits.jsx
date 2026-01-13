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

// ---------- Premium Product Card ----------
const ProductCard = ({
  product,
  qty,
  isPackage,
  wishlist,
  onWishlistToggle,
  onAddToCart,
  onBookPuja,
  onViewDetails,
  onBuyNow,
  onQuantityChange,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative bg-white/90 backdrop-blur rounded-xl shadow-md hover:shadow-xl border border-amber-100 overflow-hidden flex flex-col group"
    >
      {/* 🔖 Top Bar */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-10">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shadow ${
            isPackage
              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"
              : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
          }`}
        >
          {isPackage ? "Puja Package" : "Single Item"}
        </span>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onWishlistToggle}
          className="p-1.5 bg-white/90 rounded-full shadow"
        >
          <FiHeart
            className={`w-3.5 h-3.5 ${
              wishlist
                ? "text-rose-500 fill-rose-500"
                : "text-gray-400 hover:text-rose-400"
            }`}
          />
        </motion.button>
      </div>

      {/* 🖼 Image */}
      <div className="h-36 bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <motion.img
            src={product.img}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-1">{isPackage ? "📦" : "🛒"}</div>
            <div className="text-xs px-2">{product.name}</div>
          </div>
        )}
      </div>

      {/* 📦 Content */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] bg-amber-100 text-amber-800 w-fit px-2 py-0.5 rounded-full mb-2">
          {product.subcategory}
        </span>

        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1 group-hover:text-rose-800">
          {product.name}
        </h3>

        {!isPackage && (
          <p className="text-[11px] text-gray-500 mb-2">
            Unit: <span className="font-medium">{product.unit}</span>
          </p>
        )}

        {/* 💰 Price */}
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-lg font-bold text-amber-700">
              ₹{product.price}
              {!isPackage && (
                <span className="text-xs text-gray-500"> / {product.unit}</span>
              )}
            </div>
            {!isPackage && qty > 1 && (
              <div className="text-xs text-rose-700">
                Total ₹{product.price * qty}
              </div>
            )}
          </div>

          <div className="text-xs text-amber-500">★★★★★ <span className="text-gray-400">(4.8)</span></div>
        </div>

        {/* 🔢 Quantity */}
        {!isPackage && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-600">Quantity</span>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1">
              <button onClick={() => onQuantityChange(product.id, -1)} className="p-1">
                <FiMinus size={12} />
              </button>
              <span className="px-2 text-xs font-semibold">{qty}</span>
              <button onClick={() => onQuantityChange(product.id, 1)} className="p-1">
                <FiPlus size={12} />
              </button>
            </div>
          </div>
        )}

        {/* 🚀 Actions */}
        <div className="mt-auto space-y-2">
          {isPackage ? (
            <>
              <button
                onClick={onViewDetails}
                className="w-full border border-indigo-500 text-indigo-600 rounded-lg py-2 text-xs hover:bg-indigo-50"
              >
                View Details
              </button>
              <button
                onClick={onBookPuja}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg py-2 text-xs font-semibold"
              >
                Book Puja
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onAddToCart}
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg py-2 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                onClick={onBuyNow}
                className="w-full border border-amber-400 text-amber-700 rounded-lg py-2 text-sm hover:bg-amber-50"
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✨ Glow Border */}
      <div className="absolute inset-0 pointer-events-none rounded-xl border border-transparent group-hover:border-amber-300 transition" />
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
        <div className="sticky top-0 bg-white z-10 border-b mt-8">
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

// ======================================================
// FINAL Input Component (CALENDAR WORKS + DATE SAFE)
// ======================================================
const Input = ({ label, value, onChange, error, type = "text", min }) => {
  const isDate = type === "date";

  return (
    <div>
      <label className="text-xs text-gray-600 mb-1 block">
        {label}
      </label>

      <input
        type={type}
        value={value}
        min={isDate ? min : undefined}

        // ✅ Allow calendar
        onFocus={(e) => {
          if (isDate && e.target.showPicker) {
            e.target.showPicker(); // 🔥 force calendar open (Chrome)
          }
        }}

        // 🚫 Block manual typing
        onKeyDown={(e) => isDate && e.preventDefault()}
        onPaste={(e) => isDate && e.preventDefault()}
        inputMode={isDate ? "none" : undefined}

        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full border rounded-lg px-2 py-2 text-xs sm:text-sm outline-none
          focus:ring-2 focus:ring-rose-400 cursor-pointer
          ${error ? "border-red-400" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-[10px] text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};


const Textarea = ({ label, value, onChange, error, rows = 2 }) => (
  <div>
    <label className="text-xs text-gray-600 mb-1 block">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full border rounded-lg px-2 py-2 text-xs sm:text-sm outline-none
        focus:ring-2 focus:ring-rose-400
        ${error ? "border-red-400" : "border-gray-300"}
      `}
    />
    {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options = [], error }) => (
  <div>
    <label className="text-xs text-gray-600 mb-1 block">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full border rounded-lg px-2 py-2 text-xs sm:text-sm outline-none
        focus:ring-2 focus:ring-rose-400
        ${error ? "border-red-400" : "border-gray-300"}
      `}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
  </div>
);

// ======================================================
// Unified Order Wizard Modal (FINAL – FULLY REPLACED)
// ======================================================
const UnifiedOrderWizardModal = ({
  mode,
  product,
  qty,
  cartItems,
  onClose,
  onConfirm,
}) => {
  const isPackage = mode === "package";

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
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

  // ---------------- ITEMS ----------------
  const items = useMemo(() => {
    if (mode === "single" && product) return [{ ...product, qty }];
    if (mode === "package" && product)
      return [{ ...product, qty, includePandit: form.includePandit }];
    return cartItems || [];
  }, [mode, product, qty, cartItems, form.includePandit]);

  // ---------------- PRICING ----------------
  const pricing = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      let price = item.price;
      if (item.type === "package" && item.includePandit) price += 500;
      return sum + price * item.qty;
    }, 0);

    const gst = Math.round(subtotal * 0.18);
    const delivery = subtotal >= 999 || isPackage ? 0 : 50;

    return {
      subtotal,
      gst,
      delivery,
      total: subtotal + gst + delivery,
    };
  }, [items, isPackage]);

  // ---------------- DATE HELPERS ----------------
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 5; h <= 21; h++) {
      ["00", "30"].forEach((m) => {
        slots.push(
          new Date(`2000-01-01T${String(h).padStart(2, "0")}:${m}`)
            .toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
        );
      });
    }
    return slots;
  }, []);

  // ---------------- VALIDATION ----------------
  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Invalid mobile number";
    if (!form.city.trim()) e.city = "Required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Invalid pincode";
    if (!form.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.deliveryDate) e.deliveryDate = "Select date";
    if (!form.deliverySlot) e.deliverySlot = "Select time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleConfirm = () => {
    onConfirm({
      mode,
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
    });
  };

  // ---------------- UI ----------------
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.96 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-rose-50 to-amber-50">
          <h2 className="font-bold text-rose-800">
            {isPackage ? "Puja Booking" : "Place Order"}
          </h2>
          <button onClick={onClose} className="text-xl text-gray-500">✕</button>
        </div>

        {/* CONTENT */}
        <div className="px-4 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <Input label="Full Name" value={form.name} error={errors.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Input label="Mobile" value={form.phone} error={errors.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Input label="City" value={form.city} error={errors.city} onChange={(v) => setForm({ ...form, city: v })} />
                <Input label="Pincode" value={form.pincode} error={errors.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />
                <Textarea label="Address" value={form.address} error={errors.address} onChange={(v) => setForm({ ...form, address: v })} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <Input
                  type="date"
                  min={tomorrow}
                  label={isPackage ? "Puja Date" : "Delivery Date"}
                  value={form.deliveryDate}
                  error={errors.deliveryDate}
                  onChange={(v) => setForm({ ...form, deliveryDate: v })}
                />
                <Select
                  label="Time Slot"
                  value={form.deliverySlot}
                  error={errors.deliverySlot}
                  options={isPackage ? timeSlots : ["6 AM - 9 AM", "9 AM - 12 PM", "12 PM - 3 PM", "3 PM - 6 PM", "6 PM - 9 PM"]}
                  onChange={(v) => setForm({ ...form, deliverySlot: v })}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <p className="font-semibold text-rose-700">
                    Total Payable: ₹{pricing.total}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex gap-2">
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="px-4 py-2 border rounded-lg text-sm">
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleConfirm : handleNext}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold"
          >
            {step === 3 ? (isPackage ? "Confirm Booking" : "Confirm Order") : "Next"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Enhanced Unified Success Page (AUTO WHATSAPP) ----------
const UnifiedSuccessPage = ({ order, onBackToHome }) => {
  const [sent, setSent] = useState(false);
  const isPackage = order?.mode === "package";

  const safe = {
    id: order?.id || `SK-${Date.now()}`,
    items: order?.items || [],
    pricing: order?.pricing || { total: 0 },
    customer: order?.customer || {},
    delivery: order?.delivery || {},
    includePandit: order?.includePandit,
  };

  // 🔥 AUTO WHATSAPP SEND (ON LOAD)
  useEffect(() => {
    if (sent) return;

    const itemsText = safe.items
      .map(
        (item) =>
          `• ${item.name} (x${item.qty}) - ₹${
            (item.type === "package" && item.includePandit
              ? item.price + 500
              : item.price) * item.qty
          }`
      )
      .join("\n");

    const message = `🪷 *Sanskaraa ${isPackage ? "Puja Booking" : "Order"} Confirmed* 🪷

🆔 *ID:* ${safe.id}
👤 *Name:* ${safe.customer.name || "-"}
📞 *Phone:* ${safe.customer.phone || "-"}

📦 *${isPackage ? "Puja Details" : "Items"}*
${itemsText}

📅 *Date:* ${
      safe.delivery.date
        ? new Date(safe.delivery.date).toLocaleDateString("en-IN")
        : "-"
    }
⏰ *${isPackage ? "Time" : "Slot"}:* ${safe.delivery.slot || "-"}

📍 *Address:* ${safe.customer.address || "-"}, ${safe.customer.city || ""} ${
      safe.customer.pincode ? `- ${safe.customer.pincode}` : ""
    }

💰 *Total:* ₹${safe.pricing.total}

${isPackage && safe.includePandit ? "✅ Pandit Service Included\n" : ""}
🙏 Thank you for trusting *Sanskaraa*`;

    const url = `https://wa.me/916201486202?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
    setSent(true);
  }, [sent]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 text-center relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-300/40 blur-3xl rounded-full" />

        {/* Diya */}
        <div className="relative mb-4">
          <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-8 rounded-full bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-200"
            animate={{ scaleY: [1, 1.2, 0.95] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
          />
        </div>

        <h1 className="text-2xl font-extrabold text-rose-800">
          {isPackage ? "Puja Booked Successfully 🙏" : "Order Confirmed 🎉"}
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          {isPackage
            ? "Pandit & samagri will be arranged as per your booking."
            : "Your puja items will reach you on time."}
        </p>

        {/* Confirmation Banner */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
          ✅ Confirmation has been sent to your WhatsApp
        </div>

        {/* Summary */}
        <div className="mt-4 bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2">
          <div className="flex justify-between">
            <span>ID</span>
            <span className="font-semibold">{safe.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>
              {safe.delivery.date
                ? new Date(safe.delivery.date).toLocaleDateString("en-IN")
                : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{isPackage ? "Time" : "Slot"}</span>
            <span>{safe.delivery.slot || "-"}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-green-600">
              ₹{safe.pricing.total}
            </span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="mt-5 w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition"
        >
          Continue Shopping
        </button>

        <p className="text-xs text-gray-500 mt-4 italic">
          “सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः”
        </p>
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

  const removeFromCart = (removeId) => {
  setCart(prevCart =>
    prevCart.filter(
      item => (item.id || item.kitId) !== removeId
    )
  );
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

        {/* ================= CART SIDEBAR (PREMIUM) ================= */}
<AnimatePresence>
  {showCart && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-50 flex flex-col"
    >
      {/* ================= ENHANCED CART HEADER ================= */}
<div className="sticky top-0 z-30 mt-12 backdrop-blur-xl bg-white/70 border-b border-rose-100 shadow-sm ">
  <div className="px-4 py-3 flex items-center justify-between mt-6">

    {/* Left: Cart Info */}
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100">
        <FiShoppingCart className="w-6 h-6 text-rose-700" />

        {cart.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-rose-600 text-white text-[11px] font-semibold rounded-full flex items-center justify-center shadow">
            {cart.length}
          </span>
        )}
      </div>

      <div>
        <h2 className="font-semibold text-base md:text-lg text-rose-900 leading-tight">
          Your Cart
        </h2>
        <p className="text-xs text-gray-500">
          {cart.length} item{cart.length !== 1 && "s"} selected
        </p>
      </div>
    </div>

    {/* Right: Close Button */}
    <button
      onClick={() => setShowCart(false)}
      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-rose-50 transition active:scale-95"
      aria-label="Close Cart"
    >
      <FiX className="w-5 h-5 text-gray-600" />
    </button>

  </div>
</div>


      {/* ================= ENHANCED CONTENT ================= */}
<div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

  {/* ================= EMPTY CART ================= */}
  {cart.length === 0 ? (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-amber-50 flex items-center justify-center mb-5 shadow-inner">
        <span className="text-4xl">🛒</span>
      </div>

      <h3 className="font-semibold text-gray-800 text-lg mb-1">
        Your Cart is Empty
      </h3>

      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        Add puja items or curated kits to begin your sacred journey with Sanskaraa.
      </p>

      <button
        onClick={() => setShowCart(false)}
        className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-medium shadow hover:opacity-95 active:scale-95 transition"
      >
        Explore Puja Essentials
      </button>

    </div>
  ) : (
    <>
      {/* ================= CART ITEMS ================= */}
      <div className="space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item.id || item.kitId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl border border-rose-100 p-4 shadow-sm hover:shadow-md transition"
          >

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id || item.kitId)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <FiX size={16} />
            </button>

            <div className="flex gap-4">

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center text-2xl shrink-0">
                {item.type === "puja-kit" ? "📦" : "🪔"}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="font-semibold text-sm md:text-base text-gray-800 leading-snug line-clamp-2">
                  {item.name}
                </h4>

                <p className="text-xs text-gray-500 mt-0.5">
                  {item.type === "single" ? item.unit : "Custom Puja Kit"}
                </p>

                {/* Qty & Price */}
                <div className="flex items-center justify-between mt-4">

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-3 bg-gray-50 border rounded-xl px-3 py-1.5">
                    <button
                      onClick={() => updateCartQty(item.id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition"
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="min-w-[20px] text-center text-sm font-semibold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateCartQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <span className="text-base font-bold text-rose-700">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )}
</div>

      {/* ================= STICKY FOOTER ================= */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
          {/* Total */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Total Payable</p>
              <p className="text-xl font-bold text-rose-700">₹{total}</p>
            </div>
            {delivery === 0 && (
              <span className="text-xs text-green-600 font-medium">
                🚚 Free Delivery
              </span>
            )}
          </div>

          {/* Checkout */}
          <button
            onClick={startCartOrder}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold text-sm hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FiCheckCircle />
            Proceed to Checkout
          </button>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowCart(false)}
              className="flex-1 py-2 border rounded-lg text-xs hover:bg-gray-50"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                if (window.confirm("Clear all items from cart?")) {
                  setCart([]);
                }
              }}
              className="flex-1 py-2 border border-rose-200 text-rose-700 rounded-lg text-xs hover:bg-rose-50"
            >
              Clear Cart
            </button>
          </div>

          {/* Security */}
<div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
  <FiShield className="text-green-600 mb-14" />
  <span>100% Secure Checkout</span>
</div>
        </div>
      )}
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