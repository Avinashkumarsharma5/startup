import React, { useEffect, useMemo, useState } from "react";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ---------- Mock Data (replace with your real kits/events) ----------
const kits = [
  // 🏡 Ghar ke Sanskaar
  { id: 1, name: "Griha Pravesh / गृह प्रवेश", price: 1500, category: "Ghar ke Sanskaar", img: "src/assets/images/grrih prews 1.png" },
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

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Persist cart & wishlist
  useEffect(() => saveToLocal("ska_cart", cart), [cart]);
  useEffect(() => saveToLocal("ska_wishlist", wishlist), [wishlist]);

  // Derived filtered list
  const filtered = useMemo(() => {
    let list = kits.filter((k) => {
      const matchCat = selectedCategory === "All" || k.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchSearch = q === "" || k.name.toLowerCase().includes(q) || k.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") list = list.sort((a, b) => b.id - a.id);
    return list;
  }, [search, selectedCategory, sortBy]);

  // Cart helpers
  const addToCart = (kit, qty = 1) => {
    const existingIdx = cart.findIndex((c) => c.id === kit.id);
    let newCart = [...cart];
    if (existingIdx === -1) newCart.push({ ...kit, qty });
    else newCart[existingIdx].qty += qty;
    setCart(newCart);
    setShowCart(true);
  };
  const updateQty = (id, qty) => { if (qty < 1) return; setCart(c => c.map(it => it.id === id ? { ...it, qty } : it)); };
  const removeFromCart = (id) => setCart(c => c.filter(it => it.id !== id));
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  // Pricing
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const couponDiscount = couponApplied === "FESTIVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const delivery = subtotal > 0 ? 50 : 0;
  const total = Math.round(subtotal - couponDiscount + gst + delivery);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FESTIVE10") { setCouponApplied("FESTIVE10"); alert("Coupon applied — 10% off!"); }
    else { setCouponApplied(null); alert("Invalid coupon"); }
  };

  const proceedPaymentMock = () => {
    if (cart.length === 0) return alert("Cart is empty");
    alert(`Payment successful! Amount: ₹${total}`);
    setCart([]); setCoupon(""); setCouponApplied(null); setShowCart(false);
  };

  const handleShare = async (kit) => {
    const data = { title: kit.name, text: `Check this Puja Kit: ${kit.name} — ₹${kit.price} from Sanskaraa`, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(`${data.text} - ${data.url}`); alert("Link copied!"); } } 
    catch (e) { console.log(e); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-6 md:mt-10">
        {/* Topbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-14">
          <div>
            <h1 className="text-xl md:text-4xl font-bold text-orange-700">Sanskaraa Puja Kits</h1>
            <p className="text-xs md:text-sm text-gray-600">Traditional kits, delivered with love. Book Pandit Ji along with kits (coming soon).</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 w-full md:w-72 rounded-full border shadow-sm" placeholder="Search puja kits..." />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button onClick={() => setShowCart(s => !s)} className="relative bg-yellow-500 text-white p-2.5 md:p-3 rounded-full shadow hover:scale-105 transition">
              <FiShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{cart.length}</span>}
            </button>
          </div>
        </div>

        {/* Category + Sort */}
        <div className="sticky top-16 md:top-20 z-20 bg-orange-50 py-2 mt-4 rounded-xl px-2 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(c => (
                <button key={c} className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === c ? "bg-yellow-200 border border-yellow-600" : "bg-white"}`} onClick={() => setSelectedCategory(c)}>{c}</button>
              ))}
            </div>
            <div className="flex items-center">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1.5 rounded-lg border text-sm">
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse h-48 bg-gray-200 rounded-xl"></div>
          )) : filtered.map(kit => (
            <motion.div layout key={kit.id} className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer relative overflow-hidden" whileHover={{ scale: 1.03 }}>
              <img src={kit.img} alt={kit.name} className="h-40 w-full object-cover rounded-t-xl" />
              <div className="p-3 flex flex-col gap-1">
                <h2 className="font-semibold text-sm md:text-base">{kit.name}</h2>
                <p className="text-orange-600 font-bold">₹{kit.price}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => addToCart(kit)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded-full text-sm">Add</button>
                  <button onClick={() => toggleWishlist(kit.id)} className="p-1 rounded-full hover:bg-gray-100">{wishlist.includes(kit.id) ? <FiHeart className="text-red-500" /> : <FiHeart />}</button>
                  <button onClick={() => handleShare(kit)} className="p-1 rounded-full hover:bg-gray-100">🔗</button>
                </div>
              </div>
              <button onClick={() => setDetailKit(kit)} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">👁️</button>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {detailKit && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-2xl p-4 w-11/12 md:w-2/3 lg:w-1/3">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold">{detailKit.name}</h2>
                  <button onClick={() => setDetailKit(null)} className="text-gray-500 font-bold text-xl">✕</button>
                </div>
                <img src={detailKit.img} alt={detailKit.name} className="h-48 w-full object-cover mt-3 rounded-xl" />
                <p className="mt-3 text-orange-600 font-bold text-lg">₹{detailKit.price}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => addToCart(detailKit)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full">Add to Cart</button>
                  <button onClick={() => toggleWishlist(detailKit.id)} className="p-2 rounded-full border">{wishlist.includes(detailKit.id) ? <FiHeart className="text-red-500" /> : <FiHeart />}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-500 font-bold text-xl">✕</button>
              </div>
              {cart.length === 0 ? <p>Cart is empty</p> : cart.map(it => (
                <div key={it.id} className="flex gap-2 items-center mb-3">
                  <img src={it.img} alt={it.name} className="h-14 w-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold">{it.name}</p>
                    <p>₹{it.price} × {it.qty}</p>
                    <div className="flex gap-2 mt-1">
                      <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-2 bg-gray-200 rounded">-</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 bg-gray-200 rounded">+</button>
                      <button onClick={() => removeFromCart(it.id)} className="ml-auto text-red-500 font-bold">✕</button>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <div className="mt-4 border-t pt-4 space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  {couponApplied && <div className="flex justify-between text-green-600"><span>Coupon ({couponApplied})</span><span>-₹{Math.round(couponDiscount)}</span></div>}
                  <div className="flex justify-between"><span>GST 18%</span><span>₹{Math.round(gst)}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>₹{delivery}</span></div>
                  <div className="flex justify-between font-bold text-lg">Total <span>₹{total}</span></div>
                  <div className="flex gap-2">
                    <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon" className="flex-1 border rounded px-2 py-1" />
                    <button onClick={applyCoupon} className="bg-green-500 text-white px-3 rounded">Apply</button>
                  </div>
                  <button onClick={proceedPaymentMock} className="w-full bg-yellow-500 text-white py-2 rounded-full mt-2">Proceed to Pay</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
