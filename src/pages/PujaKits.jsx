import React, { useEffect, useMemo, useState } from "react";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Mock Data (replace with your real kits/events) ----------
const kits = [
  // 🏡 Ghar ke Sanskaar
  { id: 1, name: "Griha Pravesh / गृह प्रवेश", price: 1500, category: "Ghar ke Sanskaar", img: "https://th.bing.com/th/id/OIP.v9bx4BEkqD3o1qgOCHgsqAAAAA?w=222&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=320" },
  { id: 2, name: "Vastu Shanti / वास्तु शांति", price: 1300, category: "Ghar ke Sanskaar", img: "https://tse3.mm.bing.net/th/id/OIP.SbpIf9v7T5UKq2MZDZBqKwHaHa?pid=ImgDet&w=173&h=173&c=7&dpr=1.3&o=7&rm=3" },
  { id: 3, name: "Navagraha Shanti / नवग्रह शांति", price: 1400, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 4, name: "Sundarkand Path / सुंदरकांड पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 5, name: "Ramayan Path / रामायण पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 6, name: "Satyanarayan Katha / सत्यनारायण कथा", price: 1200, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 7, name: "Lakshmi Puja / लक्ष्मी पूजा", price: 800, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 8, name: "Ganesh Puja / गणेश पूजा", price: 800, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 9, name: "Durga Saptashati / दुर्गा सप्तशती पाठ", price: 900, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 10, name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ", price: 700, category: "Ghar ke Sanskaar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },

  // 👶 Bacchon ke Sanskaar
  { id: 11, name: "Naamkaran Sanskar / नामकरण संस्कार", price: 1200, category: "Bacchon ke Sanskaar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 12, name: "Annaprashan / अन्नप्राशन", price: 1100, category: "Bacchon ke Sanskaar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 13, name: "Mundan Sanskar / मुंडन संस्कार", price: 1000, category: "Bacchon ke Sanskaar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 14, name: "Janamdin Puja / जन्मदिन पूजा", price: 900, category: "Bacchon ke Sanskaar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },

  // 💑 Vivah Sanskar
  { id: 15, name: "Vivah / विवाह", price: 2500, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 16, name: "Roka / रोका समारोह", price: 2000, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 17, name: "Sagai / सगाई", price: 1800, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 18, name: "Haldi / हल्दी रस्म", price: 900, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 19, name: "Mehendi / मेहंदी", price: 1200, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 20, name: "Sangeet / संगीत", price: 1500, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 21, name: "Reception / रिसेप्शन", price: 2000, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 22, name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा", price: 1500, category: "Vivah Sanskar", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },

  // ⚰ Pitrakarya
  { id: 23, name: "Antim Sanskar / अंतिम संस्कार", price: 2000, category: "Pitrakarya", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 24, name: "Pind Daan / पिंडदान", price: 1800, category: "Pitrakarya", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 25, name: "Shraddh / श्राद्ध पूजा", price: 1500, category: "Pitrakarya", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 26, name: "Asthi Visarjan / अस्थि विसर्जन", price: 1300, category: "Pitrakarya", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 27, name: "Tehravin / तेरहवीं संस्कार", price: 1200, category: "Pitrakarya", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },

  // 📿 Festival Pujas
  { id: 28, name: "Karwa Chauth Puja / करवा चौथ पूजा", price: 900, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 29, name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा", price: 1200, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 30, name: "Raksha Bandhan / रक्षा बंधन पूजा", price: 800, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 31, name: "Navratri Puja / नवरात्रि पूजा", price: 1000, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 32, name: "Saraswati Puja / सरस्वती पूजा", price: 1000, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 33, name: "Mahashivratri Puja / महाशिवरात्रि पूजा", price: 1100, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 34, name: "Chhath Puja / छठ पूजा", price: 1000, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 35, name: "Holi Dahan Puja / होली दहन पूजा", price: 900, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 36, name: "Janmashtami Puja / जन्माष्टमी पूजा", price: 1000, category: "Festival Pujas", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },

  // 🛕 Temple / Special Pujas
  { id: 37, name: "Rudrabhishek / रुद्राभिषेक", price: 2200, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 38, name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप", price: 2500, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 39, name: "Bhumi Pujan / भूमि पूजन", price: 2000, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 40, name: "Kundali Shanti / कुंडली शांति", price: 1800, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 41, name: "Upanayan Sanskar / उपनयन संस्कार", price: 1700, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 42, name: "Kalash Sthapana / कलश स्थापना", price: 1600, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 43, name: "Ayushya Homam / आयुष्य हवन", price: 1500, category: "Temple / Special Pujas", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },

  // 🧾 Others / Custom Options
  { id: 44, name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज", price: 3000, category: "Others / Custom Options", img: "https://images.unsplash.com/photo-1600080972464-8a96f7002e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 45, name: "Online Puja Seva / ऑनलाइन पूजा सेवа", price: 2500, category: "Others / Custom Options", img: "https://images.unsplash.com/photo-1581578021517-5d8ad8597856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVqYXxlänwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { id: 46, name: "Customized Event Plan / कस्टम इवेंट प्लान", price: 3500, category: "Others / Custom Options", img: "https://images.unsplash.com/photo-1596450229552-4be056d72a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1amF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
];

const categories = [
  "All",
  "Ghar ke Sanskaar",
  "Bacchon ke Sanskaar",
  "Vivah Sanskar",
  "Pitrakarya",
  "Festival Pujas",
  "Temple / Special Pujas",
  "Others / Custom Options",
];

// ---------- Helpers ----------
const saveToLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const readFromLocal = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch (e) {
    return fallback;
  }
};

export default function EventKitsPage() {
  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular"); // popular, price-low, price-high, newest
  const [loading, setLoading] = useState(true);

  // Wishlist + Cart persisted
  const [wishlist, setWishlist] = useState(() => readFromLocal("ska_wishlist", []));
  const [cart, setCart] = useState(() => readFromLocal("ska_cart", []));

  // Modal + buy flow
  const [detailKit, setDetailKit] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  // Simulate loading for skeletons
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // persist cart & wishlist
  useEffect(() => saveToLocal("ska_cart", cart), [cart]);
  useEffect(() => saveToLocal("ska_wishlist", wishlist), [wishlist]);

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = kits.filter((k) => {
      const matchCat = selectedCategory === "All" || k.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        k.name.toLowerCase().includes(q) ||
        k.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") list = list.sort((a, b) => b.id - a.id);
    // popular is default - keep order
    return list;
  }, [search, selectedCategory, sortBy]);

  // Cart helpers
  const addToCart = (kit, qty = 1) => {
    const existingIdx = cart.findIndex((c) => c.id === kit.id);
    let newCart = [...cart];
    if (existingIdx === -1) newCart.push({ ...kit, qty });
    else {
      newCart[existingIdx].qty += qty;
    }
    setCart(newCart);
    setShowCart(true);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty } : it)));
  };

  const removeFromCart = (id) => setCart((c) => c.filter((it) => it.id !== id));

  const toggleWishlist = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  };

  // Pricing: subtotal, coupon, GST(18%), delivery
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const couponDiscount = couponApplied === "FESTIVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const delivery = subtotal > 0 ? 50 : 0;
  const total = Math.round(subtotal - couponDiscount + gst + delivery);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FESTIVE10") {
      setCouponApplied("FESTIVE10");
      alert("Coupon FESTIVE10 applied — 10% off!");
    } else {
      setCouponApplied(null);
      alert("Invalid coupon");
    }
  };

  const proceedPaymentMock = () => {
    if (cart.length === 0) return alert("Cart is empty");
    // Demo payment success
    alert(`Payment successful! Amount: ₹${total}`);
    // Optionally add calendar link for first item
    const item = cart[0];
    const title = encodeURIComponent(`Puja: ${item.name}`);
    const details = encodeURIComponent(
      `Puja kit purchased from Sanskaraa. Items: ${item.items?.join(", ") || "-"}`
    );
    const start = new Date();
    const end = new Date(Date.now() + 60 * 60 * 1000);
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${start
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}/${end.toISOString().replace(/-|:|\.\d+/g, "")}`;
    if (window.confirm("Add a reminder to Google Calendar for your puja?"))
      window.open(calendarUrl, "_blank");

    // Clear cart for demo
    setCart([]);
    setCoupon("");
    setCouponApplied(null);
    setShowCart(false);
  };

  // Share function
  const handleShare = async (kit) => {
    const data = {
      title: kit.name,
      text: `Check this Puja Kit: ${kit.name} — ₹${kit.price} from Sanskaraa`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        // fallback copy
        await navigator.clipboard.writeText(`${data.text} - ${data.url}`);
        alert("Link copied to clipboard. Share it with your friends!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-6 md:mt-10">
        {/* 🔝 Topbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-14">
          <div>
            <h1 className="text-xl md:text-4xl font-bold text-orange-700">
              Sanskaraa Puja Kits
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              Traditional kits, delivered with love. Book Pandit Ji along with kits
              (coming soon).
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-72 rounded-full border shadow-sm"
                placeholder="Search puja kits..."
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowCart((s) => !s)}
              className="relative bg-yellow-500 text-white p-2.5 md:p-3 rounded-full shadow hover:scale-105 transition"
            >
              <FiShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 🔖 Category + Sort */}
        <div className="sticky top-16 md:top-20 z-20 bg-orange-50 py-2 mt-4 rounded-xl px-2 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === c
                      ? "bg-yellow-200 border border-yellow-600"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg border text-sm"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🛍 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow animate-pulse h-60"
                />
              ))
            : filtered.map((kit) => (
                <motion.div
                  key={kit.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow p-3 md:p-4 flex flex-col"
                >
                  <div className="h-36 md:h-40 w-full mb-3 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                    <img
                      src={kit.img}
                      alt={kit.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-sm md:text-lg font-semibold text-gray-800">
                    {kit.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">
                    {kit.category}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-base font-bold">₹{kit.price}</p>
                    <div className="flex gap-1.5 md:gap-2">
                      <button
                        onClick={() => toggleWishlist(kit.id)}
                        className={`p-1.5 rounded-md border ${
                          wishlist.includes(kit.id)
                            ? "bg-red-50 text-red-600"
                            : "bg-white"
                        }`}
                      >
                        <FiHeart size={16} />
                      </button>
                      <button
                        onClick={() => addToCart(kit)}
                        className="px-2 md:px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-xs md:text-sm font-medium"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setDetailKit(kit)}
                        className="px-2 md:px-3 py-1.5 rounded-lg border text-xs md:text-sm"
                      >
                        Details
                      </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* 🛒 Cart Sidebar / Drawer */}
        <AnimatePresence>
          {showCart && (
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="fixed md:right-4 top-0 md:top-24 w-full md:w-96 h-full md:h-auto bg-white rounded-t-xl md:rounded-xl shadow-lg p-4 z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="px-2 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="px-2 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {/* 🧾 Summary */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Coupon ({couponApplied})</span>
                        <span>-₹{couponDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{gst.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>₹{delivery}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {/* 🎟 Coupon */}
                  <div className="flex gap-2 mt-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon"
                      className="flex-1 border rounded px-3 py-1.5 text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded text-sm"
                    >
                      Apply
                    </button>
                  </div>

                  {/* ✅ Checkout */}
                  <button
                    onClick={proceedPaymentMock}
                    className="w-full py-2 mt-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    Proceed to Pay
                  </button>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* 📑 Detail Modal */}
        <AnimatePresence>
          {detailKit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: 40 }}
                className="bg-white rounded-t-xl md:rounded-xl p-4 md:p-6 w-full md:max-w-2xl max-h-[90vh] overflow-y-auto relative"
              >
                <button
                  onClick={() => setDetailKit(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={detailKit.img}
                    alt={detailKit.name}
                    className="w-full md:w-1/2 h-56 md:h-72 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{detailKit.name}</h2>
                    <p className="text-sm text-gray-500 mb-2">{detailKit.category}</p>
                    <p className="text-lg font-semibold text-orange-700 mb-3">
                      ₹{detailKit.price}
                    </p>

                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => toggleWishlist(detailKit.id)}
                        className={`px-3 py-1.5 rounded border text-sm ${
                          wishlist.includes(detailKit.id)
                            ? "bg-red-50 text-red-600"
                            : "bg-gray-100"
                        }`}
                      >
                        ❤️ Wishlist
                      </button>
                      <button
                        onClick={() => handleShare(detailKit)}
                        className="px-3 py-1.5 rounded border text-sm bg-gray-100"
                      >
                        📤 Share
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(detailKit);
                        setDetailKit(null);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700">About this Puja</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    This is a traditional {detailKit.category} kit offered by Sanskaraa. 
                    All essential samagri and items are included for the puja. 
                    You can also book a Pandit Ji separately (coming soon).
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}