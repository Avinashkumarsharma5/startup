import React, { useEffect, useMemo, useState } from "react";
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
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ---------- Mock Data ----------
// Package Kits
const kits = [
  // 🏡 Ghar ke Sanskaar
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

  // 👶 Bacchon ke Sanskaar
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

  // 💑 Vivah Sanskar
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

  // ⚰ Pitrakarya
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

  // 📿 Festival Pujas
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

  // 🛕 Temple / Special Pujas
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

  // 🧾 Others / Custom Options
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
  // -------- Fruits & Offerings --------
  {
    id: 101,
    name: "Nariyal / नारियल",
    price: 40,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/coconut.png",
  },
  {
    id: 102,
    name: "Banana / केला",
    price: 10,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/banana.png",
  },
  {
    id: 103,
    name: "Apple / सेब",
    price: 30,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/apple.png",
  },
  {
    id: 104,
    name: "Pomegranate / अनार",
    price: 60,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/pomegranate.png",
  },
  {
    id: 105,
    name: "Flower Garland / फूल माला",
    price: 80,
    category: "Single Items",
    subcategory: "Fruits & Offerings",
    type: "single",
    unit: "पीस",
    img: "images/flower.png",
  },
  {
    id: 106,
    name: "Marigold Flowers / गेंदे के फूल",
    price: 50,
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

  // -------- Fragrance --------
  {
    id: 108,
    name: "Agarbatti / अगरबत्ती",
    price: 30,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/agarbati.png",
  },
  {
    id: 109,
    name: "Dhoop Sticks / धूप",
    price: 35,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/dhup.png",
  },
  {
    id: 110,
    name: "Guggal / गुग्गुल",
    price: 40,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/guggal.png",
  },
  {
    id: 111,
    name: "Loban / लोबान",
    price: 30,
    category: "Single Items",
    subcategory: "Fragrance",
    type: "single",
    unit: "पैक",
    img: "images/loban.png",
  },

  // -------- Havan & Aarti --------
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

  // -------- Deepak & Diya --------
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
    id: 120,
    name: "Brass Diya / पीतल का दिया",
    price: 80,
    category: "Single Items",
    subcategory: "Deepak & Diya",
    type: "single",
    unit: "पीस",
    img: "images/pital-diya.png",
  },

  // -------- Tilak & Kumkum --------
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

  // -------- Prasad --------
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

  // -------- Puja Cloth Items --------
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

  // -------- Puja Utensils --------
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

  // -------- Special Puja Items --------
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

  // -------- Miscellaneous --------
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

// Categories for filtering
const categories = [
  "All",
  "Package Kits",
  "Single Items",
  "Ghar ke Sanskaar",
  "Bacchon ke Sanskaar",
  "Vivah Sanskar",
  "Pitrakarya",
  "Festival Pujas",
  "Temple / Special Pujas",
  "Others / Custom Options",
  "Fruits & Offerings",
  "Fragrance",
  "Havan & Aarti",
  "Deepak & Diya",
  "Tilak & Kumkum",
  "Prasad",
  "Puja Cloth",
  "Puja Utensils",
  "Special Items",
  "Miscellaneous",
];

const festivals = [
  "All Festivals",
  "Diwali",
  "Navratri",
  "Ganesh Chaturthi",
  "Holi",
  "Janmashtami",
  "Raksha Bandhan",
  "House Warming",
  "Wedding",
];

const trustBadges = [
  { icon: "🔰", text: "100% Authentic" },
  { icon: "🌿", text: "Eco-friendly" },
  { icon: "🕉️", text: "Sanctified by Pandits" },
  { icon: "🚚", text: "Same Day Delivery" },
];

// ---------- Puja Kit Items Details ----------
const pujaKitItems = {
  1: {
    name: "Griha Pravesh / गृह प्रवेश",
    items: [
      "Kalash (पीतल का कलश)",
      "Nariyal (नारियल)",
      "Moli (मोली) - 2 पीस",
      "Chawal (चावल)",
      "Haldi (हल्दी)",
      "Kumkum (कुमकुम)",
      "Sindoor (सिंदूर)",
      "Gangajal (गंगाजल)",
      "Dhoop (धूप)",
      "Deepak (दीपक)",
      "Kapoor (कपूर)",
      "Agarbatti (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Mishri (मिश्री)",
      "Panchamrit (पंचामृत)",
      "Vastu Purush Photo (वास्तु पुरुष फोटो)",
      "Puja Vidhi Booklet (पूजा विधि बुकलेट)",
    ],
    benefits: [
      "नए घर में सकारात्मक ऊर्जा का प्रवेश",
      "परिवार के सदस्यों के बीच सौहार्द",
      "धन और समृद्धि की प्राप्ति",
      "सुरक्षा और शांति का वातावरण",
    ],
  },
  7: {
    name: "Lakshmi Puja / लक्ष्मी पूजा",
    items: [
      "Lakshmi Ji Idol (लक्ष्मी जी प्रतिमा)",
      "Gold Coin (सोने का सिक्का)",
      "Red Cloth (लाल कपड़ा)",
      "Kalash (कलश)",
      "Scented Diya (सुगंधित दीया)",
      "Incense Sticks (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Mishri (मिश्री)",
      "Batasha (बताशा)",
      "Lotus Flower (कमल का फूल)",
      "Lakshmi Mantra Booklet (लक्ष्मी मंत्र बुकलेट)",
    ],
    benefits: [
      "धन और समृद्धि की प्राप्ति",
      "व्यापार में सफलता",
      "आर्थिक स्थिरता",
      "घर में सुख-शांति",
    ],
  },
  8: {
    name: "Ganesh Puja / गणेश पूजा",
    items: [
      "Ganesh Ji Idol (गणेश जी प्रतिमा)",
      "Modak (मोदक)",
      "Durva Grass (दूर्वा घास)",
      "Red Cloth (लाल कपड़ा)",
      "Scented Diya (सुगंधित दीया)",
      "Incense Sticks (अगरबत्ती)",
      "Flowers (फूल)",
      "Fruits (फल)",
      "Coconut (नारियल)",
      "Ganesh Mantra Booklet (गणेश मंत्र बुकलेट)",
    ],
    benefits: [
      "विघ्नों का नाश",
      "नए कार्यों में सफलता",
      "बुद्धि और ज्ञान में वृद्धि",
      "सुख और समृद्धि",
    ],
  },
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

// ---------- Unified Order Wizard Modal ----------
const UnifiedOrderWizardModal = ({
  mode, // 'single' | 'package' | 'cart'
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-rose-800 flex items-center gap-2">
              {isPackage ? <FiCalendar /> : <FiShoppingCart />}
              {isPackage ? "Book Puja Package" : "Place Order"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
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
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            {[
              { no: 1, label: "Address" },
              { no: 2, label: isPackage ? "Puja Date & Time" : "Delivery Slot" },
              { no: 3, label: "Review" },
            ].map((s) => (
              <div key={s.no} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${
                    step >= s.no
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step > s.no ? <FiCheckCircle /> : s.no}
                </div>
                <span
                  className={`mt-1 text-[11px] sm:text-xs ${
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
        <div className="min-h-[260px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Address */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800 flex items-center gap-2">
                  <FiMapPin />
                  {isPackage ? "Puja Address Details" : "Delivery Address"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
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
                      Mobile Number <span className="text-red-500">*</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

                {isPackage && (
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none"
                      placeholder="Any special requirements, dietary restrictions for prasad..."
                      value={form.additionalNotes}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, additionalNotes: e.target.value }))
                      }
                    />
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-amber-800 flex items-center gap-2">
                  <FiShield className="text-amber-500" />
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
                className="space-y-3 sm:space-y-4"
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
                        <option value="">Choose your preferred time</option>
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
                  <div className="flex items-start gap-3 p-3 border border-amber-300 rounded-xl bg-amber-50">
                    <input
                      type="checkbox"
                      id="includePandit"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 focus:ring-rose-500 rounded mt-1"
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
                      <div className="font-semibold">
                        Include Pandit Service (+₹500)
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Experienced pandit will perform the puja with proper rituals
                      </div>
                    </label>
                  </div>
                )}

                <div className={`border rounded-xl px-3 py-2 text-[11px] sm:text-xs flex items-start gap-2 ${
                  isPackage ? "bg-green-50 border-green-200 text-green-800" : "bg-blue-50 border-blue-200 text-blue-800"
                }`}>
                  <FiClock className="mt-0.5" />
                  <span>
                    {isPackage 
                      ? "For best spiritual benefits, consider morning hours (5:00 AM - 9:00 AM) or evening hours (4:00 PM - 7:00 PM)"
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
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-rose-800">
                  Review Your {isPackage ? "Booking" : "Order"}
                </h3>

                {/* Items Summary */}
                <div className="bg-rose-50 rounded-xl p-3 sm:p-4 max-h-48 sm:max-h-56 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs sm:text-sm mb-2 last:mb-0"
                    >
                      <span className="flex-1 pr-2">
                        {item.name}
                        {item.type === 'single' && ` (${item.unit})`}
                        {item.type === 'package' && item.includePandit && " + Pandit"}
                        <span className="text-gray-500 ml-1">
                          ({item.qty} × {formatINR(item.type === 'package' && item.includePandit ? item.price + 500 : item.price)})
                        </span>
                      </span>
                      <span className="font-semibold text-rose-700">
                        {formatINR((item.type === 'package' && item.includePandit ? item.price + 500 : item.price) * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address & Delivery Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiHome className="text-rose-600" />
                      <span className="font-semibold text-gray-800">
                        {isPackage ? "Puja At" : "Delivery To"}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{form.name}</p>
                    <p className="text-gray-600">{form.phone}</p>
                    <p className="text-gray-600 text-[11px] sm:text-xs mt-1">
                      {form.address}
                      {form.landmark && `, ${form.landmark}`}
                      {form.city && `, ${form.city}`}{" "}
                      {form.pincode && `- ${form.pincode}`}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCalendar className="text-rose-600" />
                      <span className="font-semibold text-gray-800">
                        {isPackage ? "Puja Schedule" : "Delivery Schedule"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      Date:{" "}
                      {form.deliveryDate
                        ? new Date(form.deliveryDate).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })
                        : "-"}
                    </p>
                    <p className="text-gray-700">
                      {isPackage ? "Time" : "Slot"}: {form.deliverySlot || "-"}
                    </p>
                    {isPackage && form.includePandit && (
                      <p className="text-green-600 mt-1">✓ Pandit Service Included</p>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-xs sm:text-sm space-y-1">
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
                        <span className="text-green-600 text-[11px]">(FREE above ₹999)</span>
                      )}
                    </span>
                    <span>{formatINR(pricing.delivery)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg border-t border-gray-200 pt-2 sm:pt-3">
                    <span>Total Payable</span>
                    <span>{formatINR(pricing.total)}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-[11px] sm:text-xs text-green-800 flex items-start gap-2">
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
        <div className="mt-6 pb-6 sm:pb-8 border-t border-gray-100 pt-4">
          <div className="flex gap-2 sm:gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm text-gray-700 flex items-center gap-1 hover:bg-gray-50"
              >
                <FiArrowLeft className="hidden sm:inline" />
                Back
              </button>
            )}

            <button
              onClick={step === 3 ? handleConfirm : handleNext}
              className="flex-1 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs sm:text-sm font-semibold hover:shadow-lg flex items-center justify-center gap-2"
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
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-200 rounded-full blur-3xl opacity-60" />

        {/* Success Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-100 rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full flex items-center justify-center"
                >
                  <FiCheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Icon */}
        <div className="relative mb-4 sm:mb-6 mt-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <div className="mt-2 text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
            Sanskaraa • {isPackage ? 'Complete Puja Service' : 'Puja Essentials'}
          </div>
        </div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
        >
          {isPackage ? 'Puja Booked Successfully!' : 'Order Confirmed!'}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6"
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
          className="bg-gray-50 rounded-xl p-4 mb-4 sm:mb-6 text-left"
        >
          <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2 text-sm sm:text-base">
            {isPackage ? 'Booking' : 'Order'} Details
          </h3>

          <div className="space-y-2 text-xs sm:text-sm">
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
          className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4"
        >
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:bg-green-700 transition-colors text-xs sm:text-sm"
          >
            <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Share
          </button>

          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-xs sm:text-sm"
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
            className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:bg-rose-700 transition-colors text-sm"
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
          className="text-xs text-gray-500 mt-4 sm:mt-6 italic"
        >
          "सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः"
          <br />
          May all be happy, may all be free from illness
        </motion.p>
      </motion.div>
    </div>
  );
};

// ---------- Kit Items Modal (for package details) ----------
const KitItemsModal = ({ kit, onClose, onBookPuja, onAddToCart }) => {
  const kitDetails = pujaKitItems[kit.id];
  const [selectedOption, setSelectedOption] = useState("fullPuja");
  const [wishlisted, setWishlisted] = useState(false);

  const relatedKits = kits
    .filter((k) => k.subcategory === kit.subcategory && k.id !== kit.id)
    .slice(0, 2);

  const handleAddToWishlist = () => {
    setWishlisted(!wishlisted);
  };

  const handleQuickAction = () => {
    if (selectedOption === "kitOnly") {
      onAddToCart(kit);
    } else {
      onBookPuja(kit);
    }
    onClose();
  };

  if (!kitDetails) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-rose-800">Kit Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-rose-600 text-xl p-1"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-center py-8">
            Details for this kit are coming soon...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-800">
            {kitDetails.name} - Complete Details
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full ${
                wishlisted ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              <FiHeart className={wishlisted ? "fill-rose-600" : ""} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-rose-600 text-xl p-1"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Option Selection */}
            <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
              <h3 className="font-semibold text-amber-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Select Service Type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedOption("fullPuja")}
                  className={`p-3 rounded-lg border-2 text-left ${
                    selectedOption === "fullPuja"
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base">
                    Book Full Puja
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Kit + Pandit Service
                  </div>
                  <div className="text-rose-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{kit.price + 500}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedOption("kitOnly")}
                  className={`p-3 rounded-lg border-2 text-left ${
                    selectedOption === "kitOnly"
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-sm sm:text-base">
                    Buy Kit Only
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    DIY Puja Kit
                  </div>
                  <div className="text-rose-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{kit.price}
                  </div>
                </button>
              </div>
            </div>

            {/* Kit Items & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                  What's Included
                </h3>
                <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                  <ul className="space-y-2 sm:space-y-3">
                    {kitDetails.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold text-xs sm:text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-rose-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <FiStar className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5" />
                  Benefits
                </h3>
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <ul className="space-y-2 sm:space-y-3">
                    {kitDetails.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-600 text-xs">✨</span>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Quick Actions
              </h4>

              <button
                onClick={handleQuickAction}
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white py-2 sm:py-3 rounded-lg font-semibold mb-2 sm:mb-3 hover:shadow-lg transition-all text-sm sm:text-base"
              >
                {selectedOption === "fullPuja"
                  ? "Book Now"
                  : "Add Kit to Cart"}
              </button>

              <button
                onClick={() => {
                  onAddToCart(kit);
                  onClose();
                }}
                className="w-full border border-rose-400 text-rose-700 py-2 rounded-lg font-medium hover:bg-rose-50 transition-colors mb-2 text-sm"
              >
                Add to Cart
              </button>

              <button
                onClick={handleAddToWishlist}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Recommended Add-ons */}
            {relatedKits.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">
                  Recommended Add-ons
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {relatedKits.map((relatedKit) => (
                    <div
                      key={relatedKit.id}
                      className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-lg"
                    >
                      <img
                        src={relatedKit.img}
                        alt={relatedKit.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                          {relatedKit.name}
                        </p>
                        <p className="text-xs text-rose-600 font-semibold">
                          ₹{relatedKit.price}
                        </p>
                      </div>
                      <button
                        onClick={() => onAddToCart(relatedKit)}
                        className="text-xs bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-700 transition-colors flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Why Choose Sanskaraa?
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✅ 100% Authentic Products</li>
                <li>✅ Expert Pandit Network</li>
                <li>✅ Same Day Delivery</li>
                <li>✅ Sanitized & Blessed</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- Main Unified Component ----------
export default function UnifiedPujaStore() {
  const navigate = useNavigate();

  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFestival, setSelectedFestival] = useState("All Festivals");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("all"); // 'all', 'packages', 'single'
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

  // Modal + order flow
  const [detailKit, setDetailKit] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [showDiyaAnimation, setShowDiyaAnimation] = useState(false);

  // Order flow states
  const [showOrderWizard, setShowOrderWizard] = useState(false);
  const [orderMode, setOrderMode] = useState(null); // 'single', 'package', 'cart'
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(1);
  const [showKitItemsModal, setShowKitItemsModal] = useState(false);
  const [selectedKitForDetails, setSelectedKitForDetails] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Festival calendar
  const [nextFestival, setNextFestival] = useState({
    name: "Navratri",
    days: 12,
  });

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
      
      const matchFestival =
        selectedFestival === "All Festivals" ||
        p.festival === selectedFestival;
      
      const matchPrice =
        p.price >= priceRange[0] && p.price <= priceRange[1];
      
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q));
      
      return matchCat && matchFestival && matchPrice && matchSearch;
    });

    // Sorting
    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") list = list.sort((a, b) => b.id - a.id);
    
    return list;
  }, [search, selectedCategory, selectedFestival, priceRange, sortBy, viewMode]);

  // Quantity handlers for single items
  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = current + delta;
      return { ...prev, [id]: next < 1 ? 1 : next };
    });
  };

  const setQty = (id, value) => {
    const num = Number(value);
    if (Number.isNaN(num) || num < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  // Cart helpers
  const addToCart = (product, qty = 1) => {
    if (qty < 1) qty = 1;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
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

  // Show Kit Details
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] pt-16 sm:pt-20 pb-6 px-2 sm:px-4 lg:px-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-20 sm:w-24 h-20 sm:h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 sm:w-28 h-24 sm:h-28 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-10 relative z-10">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-1 sm:gap-2 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border"
            >
              <span className="text-sm">{badge.icon}</span>
              <span className="text-xs font-medium text-[#800000]">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Topbar (Logo, Search, Cart) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-10 p-2 sm:p-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#800000] font-serif">
              Sanskaraa
            </h1>
            <p className="text-xs sm:text-sm text-[#800000] mt-1">
              Complete Puja Solutions - Packages & Single Items
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Festival Calendar Widget */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-700 to-amber-700 text-white px-3 sm:px-4 py-2 rounded-full cursor-pointer flex-shrink-0"
              onClick={() => setSelectedFestival(nextFestival.name)}
            >
              <FiCalendar className="text-yellow-200 w-4 h-4" />
              <div className="text-xs">
                <div className="font-semibold">
                  Next: {nextFestival.name}
                </div>
                <div className="text-yellow-200">
                  {nextFestival.days} days
                </div>
              </div>
            </motion.div>

            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 sm:py-2.5 w-full rounded-full border-2 border-orange-200 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                placeholder="Search puja kits or items..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart((s) => !s)}
              className="relative bg-orange-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform flex-shrink-0"
            >
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
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

        {/* View Mode Tabs + Filters */}
        <div className="sticky top-14 sm:top-16 z-20 bg-white/90 backdrop-blur-sm py-3 sm:py-4 mt-4 sm:mt-6 rounded-xl shadow-lg border border-orange-100 mx-2 sm:mx-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 px-2 sm:px-4">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-2 border-b lg:border-none overflow-x-auto pb-2 lg:pb-0">
              <div className="flex gap-1 sm:gap-2">
                {[
                  { key: "all", label: "All Items", icon: FiGrid },
                  { key: "packages", label: "Puja Packages", icon: FiPackage },
                  { key: "single", label: "Single Items", icon: FiList },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap capitalize flex-shrink-0 flex items-center gap-1 ${
                      viewMode === tab.key
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                    }`}
                    onClick={() => setViewMode(tab.key)}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
                className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]"
              >
                {festivals.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <span className="text-xs sm:text-sm text-rose-700 whitespace-nowrap">
                  Max Price:
                </span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, parseInt(e.target.value)])
                  }
                  className="w-20 sm:w-24 md:w-32"
                />
                <span className="text-xs text-rose-600 font-medium">
                  ₹{priceRange[1]}
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-3 py-2 rounded-lg border border-rose-200 text-xs sm:text-sm bg-white flex-1 min-w-[120px] sm:min-w-[150px]"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Diya Animation */}
        <AnimatePresence>
          {showDiyaAnimation && <DiyaAnimation />}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="mt-6 sm:mt-8 px-2 sm:px-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-48 sm:h-60 md:h-64 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl"
                ></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 bg-white/80 rounded-2xl shadow">
              <p className="text-sm text-gray-600">
                No items found. Try changing filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filtered.map((product) => {
                const qty = quantities[product.id] || 1;
                const isPackage = product.type === 'package';
                
                return (
                  <motion.div
                    layout
                    key={product.id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden border border-rose-100 group flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Product Type Badge */}
                    <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium ${
                      isPackage 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {isPackage ? 'Package' : 'Single'}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 bg-white/80 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                    >
                      <FiHeart
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          wishlist.includes(product.id)
                            ? "text-rose-500 fill-rose-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Image */}
                    <div className="h-24 sm:h-32 md:h-36 overflow-hidden bg-amber-50">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement.classList.add("bg-gradient-to-br", "from-amber-100", "to-rose-100");
                        }}
                      />
                    </div>

                    <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1 sm:gap-2 flex-grow">
                      <h2 className="font-semibold text-xs sm:text-sm text-rose-800 group-hover:text-rose-900 transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h2>

                      <p className="text-[11px] sm:text-xs text-gray-500">
                        {isPackage ? product.subcategory : `${product.subcategory} • ${product.unit}`}
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-amber-700 font-bold text-sm sm:text-base">
                          ₹{product.price}
                          {!isPackage && <span className="text-[11px] text-gray-500"> / {product.unit}</span>}
                        </p>
                        <div className="flex items-center gap-1 text-amber-500">
                          <FiStar className="fill-amber-500 w-2 h-2 sm:w-3 sm:h-3" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>

                      {/* Quantity Selector for Single Items */}
                      {!isPackage && (
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 bg-rose-50 rounded-full px-1 py-1 border border-rose-100">
                            <button
                              onClick={() => changeQty(product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-white border text-xs hover:bg-gray-50"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) =>
                                setQty(product.id, e.target.value)
                              }
                              className="w-10 text-center text-xs bg-transparent outline-none"
                            />
                            <button
                              onClick={() => changeQty(product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-white border text-xs hover:bg-gray-50"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[11px] text-gray-500 text-right">
                            Total:{" "}
                            <span className="font-semibold text-rose-700">
                              {formatINR(product.price * qty)}
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-2 flex flex-col gap-1">
                        {isPackage ? (
                          <>
                            <button
                              onClick={() => showKitDetails(product)}
                              className="w-full py-1.5 sm:py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                            >
                              <FiInfo className="w-3 h-3" />
                              View Details
                            </button>
                            <button
                              onClick={() => bookPuja(product)}
                              className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all text-xs font-medium"
                            >
                              Book Puja
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => addToCart(product, qty)}
                              className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-1"
                            >
                              <FiShoppingCart className="w-3 h-3" />
                              Add {qty} to Cart
                            </button>
                            <button
                              onClick={() => startSingleOrder(product, qty)}
                              className="w-full py-1.5 sm:py-2 border border-amber-400 text-amber-700 rounded-lg text-[11px] sm:text-xs font-medium hover:bg-amber-50 transition-colors"
                            >
                              Buy Now
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* How-to Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-rose-100 mx-2 sm:mx-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-800 mb-4 sm:mb-6 text-center">
            Complete Puja Solutions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                title: "Ready Puja Packages",
                desc: "Complete kits for all rituals with optional pandit service",
                icon: "📦",
                color: "rose",
              },
              {
                title: "Individual Puja Items",
                desc: "Nariyal, Agarbatti, Kapoor, and all daily essentials",
                icon: "🛒",
                color: "amber",
              },
              {
                title: "Expert Guidance",
                desc: "Video guides and pandit support for perfect puja",
                icon: "🎓",
                color: "green",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-3 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-100"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-sm sm:text-base md:text-lg text-rose-700 mb-1 sm:mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-8 sm:mt-12 md:mt-16 px-2 sm:px-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-800 mb-4 sm:mb-6 text-center">
            Customer Experiences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                name: "Rajesh Sharma",
                review: "Perfect Griha Pravesh kit! Everything was well-packed and blessed.",
                type: "Package",
              },
              {
                name: "Priya Patel",
                review: "Daily puja items delivery is so convenient. Fresh and authentic!",
                type: "Single Items",
              },
              {
                name: "Amit Verma",
                review: "Pandit service was excellent. Very professional and knowledgeable.",
                type: "Service",
              },
              {
                name: "Sneha Reddy",
                review: "Navratri puja kit had all items mentioned. Highly recommended!",
                type: "Package",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-rose-100"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-rose-800 text-xs sm:text-sm">
                      {review.name}
                    </p>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2 sm:mb-3">
                  "{review.review}"
                </p>
                <div className="text-[11px] text-rose-600 font-medium">
                  {review.type}
                </div>
              </div>
            ))}
          </div>
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
              <div className="p-3 sm:p-4 border-b border-rose-100 flex items-center justify-between">
                <h2 className="font-bold text-lg sm:text-xl text-rose-800">
                  Your Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-rose-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="mt-3 sm:mt-4 bg-rose-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-rose-700 transition-colors text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-2 sm:gap-3 items-center mb-3 p-2 sm:p-3 bg-rose-50 rounded-xl"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg flex-shrink-0 bg-amber-50"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.classList.add("bg-gradient-to-br", "from-amber-100", "to-rose-100");
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-rose-800 text-xs sm:text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {item.type === 'single' ? `${item.unit}` : 'Package'}
                          </p>
                          <p className="text-amber-700 font-bold text-xs sm:text-sm">
                            ₹{item.price} × {item.qty}
                          </p>
                          <div className="flex items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm">
                            <button
                              onClick={() =>
                                updateCartQty(item.id, item.qty - 1)
                              }
                              className="px-1.5 sm:px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="px-1">{item.qty}</span>
                            <button
                              onClick={() =>
                                updateCartQty(item.id, item.qty + 1)
                              }
                              className="px-1.5 sm:px-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-rose-500 hover:text-rose-700 text-base"
                            >
                              <FiX />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Price Summary */}
                    <div className="border-t border-rose-100 pt-3 sm:pt-4 mt-2 space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatINR(subtotal)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon ({couponApplied})</span>
                          <span>
                            -₹{Math.round(couponDiscount)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>GST 18%</span>
                        <span>₹{Math.round(gst)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Delivery{" "}
                          {delivery === 0 && (
                            <span className="text-green-600">
                              (FREE above ₹999)
                            </span>
                          )}
                        </span>
                        <span>₹{delivery}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base sm:text-lg border-t border-rose-100 pt-2 sm:pt-3">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>

                      {/* Coupon Input */}
                      <div className="flex gap-2 mt-3 sm:mt-4">
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Enter coupon"
                          className="flex-1 border border-rose-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                        />
                        <button
                          onClick={applyCoupon}
                          className="bg-rose-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-rose-700 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Order Button */}
                      <button
                        onClick={startCartOrder}
                        className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 sm:py-3 rounded-xl font-medium hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        Place Order
                      </button>

                      <div className="flex items-center gap-2 mt-3 text-[11px] sm:text-xs text-gray-500">
                        <FiShield className="text-green-600 w-3 h-3" />
                        <span>Secure checkout • UPI/Wallet/Card</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
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

        {/* Kit Items Details Modal */}
        <AnimatePresence>
          {showKitItemsModal && selectedKitForDetails && (
            <KitItemsModal
              kit={selectedKitForDetails}
              onClose={() => {
                setShowKitItemsModal(false);
                setSelectedKitForDetails(null);
              }}
              onBookPuja={bookPuja}
              onAddToCart={addToCart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}