import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";


// --- Category Data ---
const categories = [
  { name: "All", img: "https://img.icons8.com/color/96/000000/categorize.png" },
  { name: "Ghar ke Sanskaar", img: "https://img.icons8.com/emoji/96/000000/house-emoji.png" },
  { name: "Bacchon ke Sanskaar", img: "https://img.icons8.com/emoji/96/000000/baby-emoji.png" },
  { name: "Vivah Sanskar", img: "src/assets/images/catering1.jpg" },
  { name: "Pitrakarya", img: "https://img.icons8.com/emoji/96/000000/coffin-emoji.png" },
  { name: "Festival Pujas", img: "https://img.icons8.com/emoji/96/000000/festival-emoji.png" },
  { name: "Temple / Special Pujas", img: "https://img.icons8.com/emoji/96/000000/temple-emoji.png" },
  { name: "Others / Custom Options", img: "https://img.icons8.com/emoji/96/000000/memo-emoji.png" },
];

// --- Kits Data ---
const kits = [
  // 🏡 Ghar ke Sanskaar
  { id: 1, name: "Griha Pravesh / गृह प्रवेश", price: 1500, category: "Ghar ke Sanskaar", img: "https://th.bing.com/th/id/OIP.v9bx4BEkqD3o1qgOCHgsqAAAAA?w=222&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=320" },
  { id: 2, name: "Vastu Shanti / वास्तु शांति", price: 1300, category: "Ghar ke Sanskaar", img: "https://tse3.mm.bing.net/th/id/OIP.SbpIf9v7T5UKq2MZDZBqKwHaHa?pid=ImgDet&w=173&h=173&c=7&dpr=1.3&o=7&rm=3" },
  { id: 3, name: "Navagraha Shanti / नवग्रह शांति", price: 1400, category: "Ghar ke Sanskaar", img: "src/assets/images/navagraha.jpg" },
  { id: 4, name: "Sundarkand Path / सुंदरकांड पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "src/assets/images/sundarkand.jpg" },
  { id: 5, name: "Ramayan Path / रामायण पाठ", price: 1000, category: "Ghar ke Sanskaar", img: "src/assets/images/ramayan.jpg" },
  { id: 6, name: "Satyanarayan Katha / सत्यनारायण कथा", price: 1200, category: "Ghar ke Sanskaar", img: "src/assets/images/satyanarayan.jpg" },
  { id: 7, name: "Lakshmi Puja / लक्ष्मी पूजा", price: 800, category: "Ghar ke Sanskaar", img: "src/assets/images/lakshmi.jpg" },
  { id: 8, name: "Ganesh Puja / गणेश पूजा", price: 800, category: "Ghar ke Sanskaar", img: "src/assets/images/ganesh.jpg" },
  { id: 9, name: "Durga Saptashati / दुर्गा सप्तशती पाठ", price: 900, category: "Ghar ke Sanskaar", img: "src/assets/images/durga.jpg" },
  { id: 10, name: "Hanuman Chalisa Path / हनुमान चालीसा पाठ", price: 700, category: "Ghar ke Sanskaar", img: "src/assets/images/hanuman.jpg" },

  // 👶 Bacchon ke Sanskaar
  { id: 11, name: "Naamkaran Sanskar / नामकरण संस्कार", price: 1200, category: "Bacchon ke Sanskaar", img: "src/assets/images/naamkaran.jpg" },
  { id: 12, name: "Annaprashan / अन्नप्राशन", price: 1100, category: "Bacchon ke Sanskaar", img: "src/assets/images/annaprashan.jpg" },
  { id: 13, name: "Mundan Sanskar / मुंडन संस्कार", price: 1000, category: "Bacchon ke Sanskaar", img: "src/assets/images/mundan.jpg" },
  { id: 14, name: "Janamdin Puja / जन्मदिन पूजा", price: 900, category: "Bacchon ke Sanskaar", img: "src/assets/images/birthday.jpg" },

  // 💑 Vivah Sanskar
  { id: 15, name: "Vivah / विवाह", price: 2500, category: "Vivah Sanskar", img: "src/assets/images/vivah.jpg" },
  { id: 16, name: "Roka / रोका समारोह", price: 2000, category: "Vivah Sanskar", img: "src/assets/images/roka.jpg" },
  { id: 17, name: "Sagai / सगाई", price: 1800, category: "Vivah Sanskar", img: "src/assets/images/sagai.jpg" },
  { id: 18, name: "Haldi / हल्दी रस्म", price: 900, category: "Vivah Sanskar", img: "src/assets/images/haldi.jpg" },
  { id: 19, name: "Mehendi / मेहंदी", price: 1200, category: "Vivah Sanskar", img: "src/assets/images/mehendi.jpg" },
  { id: 20, name: "Sangeet / संगीत", price: 1500, category: "Vivah Sanskar", img: "src/assets/images/sangeet.jpg" },
  { id: 21, name: "Reception / रिसेप्शन", price: 2000, category: "Vivah Sanskar", img: "src/assets/images/reception.jpg" },
  { id: 22, name: "Wedding Anniversary Puja / विवाह वर्षगांठ पूजा", price: 1500, category: "Vivah Sanskar", img: "src/assets/images/anniversary.jpg" },

  // ⚰ Pitrakarya
  { id: 23, name: "Antim Sanskar / अंतिम संस्कार", price: 2000, category: "Pitrakarya", img: "src/assets/images/antim.jpg" },
  { id: 24, name: "Pind Daan / पिंडदान", price: 1800, category: "Pitrakarya", img: "src/assets/images/pind-daan.jpg" },
  { id: 25, name: "Shraddh / श्राद्ध पूजा", price: 1500, category: "Pitrakarya", img: "src/assets/images/shraddh.jpg" },
  { id: 26, name: "Asthi Visarjan / अस्थि विसर्जन", price: 1300, category: "Pitrakarya", img: "src/assets/images/asthi.jpg" },
  { id: 27, name: "Tehravin / तेरहवीं संस्कार", price: 1200, category: "Pitrakarya", img: "src/assets/images/tehravin.jpg" },

  // 📿 Festival Pujas
  { id: 28, name: "Karwa Chauth Puja / करवा चौथ पूजा", price: 900, category: "Festival Pujas", img: "src/assets/images/karwa.jpg" },
  { id: 29, name: "Diwali Lakshmi Ganesh Puja / दिवाली लक्ष्मी गणेश पूजा", price: 1200, category: "Festival Pujas", img: "src/assets/images/diwali.jpg" },
  { id: 30, name: "Raksha Bandhan / रक्षा बंधन पूजा", price: 800, category: "Festival Pujas", img: "src/assets/images/raksha.jpg" },
  { id: 31, name: "Navratri Puja / नवरात्रि पूजा", price: 1000, category: "Festival Pujas", img: "src/assets/images/navratri.jpg" },
  { id: 32, name: "Saraswati Puja / सरस्वती पूजा", price: 1000, category: "Festival Pujas", img: "src/assets/images/saraswati.jpg" },
  { id: 33, name: "Mahashivratri Puja / महाशिवरात्रि पूजा", price: 1100, category: "Festival Pujas", img: "src/assets/images/shivratri.jpg" },
  { id: 34, name: "Chhath Puja / छठ पूजा", price: 1000, category: "Festival Pujas", img: "src/assets/images/chhath.jpg" },
  { id: 35, name: "Holi Dahan Puja / होली दहन पूजा", price: 900, category: "Festival Pujas", img: "src/assets/images/holi.jpg" },
  { id: 36, name: "Janmashtami Puja / जन्माष्टमी पूजा", price: 1000, category: "Festival Pujas", img: "src/assets/images/janmashtami.jpg" },

  // 🛕 Temple / Special Pujas
  { id: 37, name: "Rudrabhishek / रुद्राभिषेक", price: 2200, category: "Temple / Special Pujas", img: "src/assets/images/rudrabhishek.jpg" },
  { id: 38, name: "Mahamrityunjaya Jaap / महामृत्युंजय जाप", price: 2500, category: "Temple / Special Pujas", img: "src/assets/images/mahamrityunjaya.jpg" },
  { id: 39, name: "Bhumi Pujan / भूमि पूजन", price: 2000, category: "Temple / Special Pujas", img: "src/assets/images/bhumi.jpg" },
  { id: 40, name: "Kundali Shanti / कुंडली शांति", price: 1800, category: "Temple / Special Pujas", img: "src/assets/images/kundali.jpg" },
  { id: 41, name: "Upanayan Sanskar / उपनयन संस्कार", price: 1700, category: "Temple / Special Pujas", img: "src/assets/images/upnayan.jpg" },
  { id: 42, name: "Kalash Sthapana / कलश स्थापना", price: 1600, category: "Temple / Special Pujas", img: "src/assets/images/kalash.jpg" },
  { id: 43, name: "Ayushya Homam / आयुष्य हवन", price: 1500, category: "Temple / Special Pujas", img: "src/assets/images/ayushya.jpg" },

  // 🧾 Others / Custom Options
  { id: 44, name: "Personalized Puja Package / व्यक्तिगत पूजा पैकेज", price: 3000, category: "Others / Custom Options", img: "src/assets/images/custom-package.jpg" },
  { id: 45, name: "Online Puja Seva / ऑनलाइन पूजा सेवा", price: 2500, category: "Others / Custom Options", img: "src/assets/images/online.jpg" },
  { id: 46, name: "Customized Event Plan / कस्टम इवेंट प्लान", price: 3500, category: "Others / Custom Options", img: "src/assets/images/custom-plan.jpg" },
];

export default function KitStoreWithCart() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [buyKit, setBuyKit] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const filteredKits = kits.filter(
    (kit) =>
      (selectedCategory === "All" || kit.category === selectedCategory) &&
      (kit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kit.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToCart = (kit) => setCart([...cart, kit]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleBuyNow = (kit) => {
    setBuyKit(kit);
    setQuantity(1);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleProceedPayment = () => {
    alert(`Payment Successful! You bought ${quantity} x ${buyKit.name} for ₹${buyKit.price * quantity}`);
    setBuyKit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E8] via-[#FDF0D5] to-[#FFE4B3] mt-14 p-6">
      {/* Hero Video Section */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="src/assets/images/sanskaravideo1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 flex items-end p-4">
          <h1 className="text-white text-2xl md:text-4xl font-bold">
            Celebrate Traditions with Complete Kits
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Puja Kits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-yellow-300"
        />
      </div>

      {/* Category Scroll */}
      <div className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center min-w-[90px] cursor-pointer rounded-xl shadow p-2 transition ${
              selectedCategory === cat.name ? "bg-yellow-200 border border-yellow-600" : "bg-white"
            }`}
          >
            <img src={cat.img} alt={cat.name} className="w-12 h-12 object-contain" />
            <p className="text-sm font-medium mt-1 text-[#5C3A21] text-center">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredKits.map((kit) => (
          <div key={kit.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
            <div className="h-40 w-full mb-4 bg-gray-100 flex items-center justify-center rounded-lg">
              <img
                src={kit.img}
                alt={kit.name}
                className="h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{kit.name}</h2>
            <p className="text-gray-600 mb-3">₹{kit.price}</p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(kit)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(kit)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Icon Button */}
      <motion.button
  drag
  dragMomentum={true} // inertia effect
  className="fixed bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 hover:scale-110 hover:shadow-2xl transition transform duration-200 z-50"
  style={{ top: 100, right: 20 }} // initial position
  onClick={() => setShowCart(!showCart)}
>
  <FiShoppingCart size={28} />
  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
      {cart.length}
    </span>
  )}
</motion.button>


      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white rounded-l-xl shadow-xl p-4 z-40 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <ul className="divide-y mb-4">
              {cart.map((item, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span>₹{item.price}</span>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 font-bold">
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <div className="border-t pt-2">
              <p className="text-lg font-semibold mb-2">Total: ₹{totalPrice}</p>
              <button
                onClick={() => handleBuyNow(cart[0])} // opens modal for first item in cart
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* Buy Now Modal */}
      {buyKit && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full sm:w-96 rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setBuyKit(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Confirm Your Purchase</h2>

            <div className="flex gap-4 mb-4">
              <img
                src={buyKit.img}
                alt={buyKit.name}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{buyKit.name}</h3>
                <p className="text-gray-600 mb-2">₹{buyKit.price}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total */}
            <p className="text-lg font-semibold mb-4">Total: ₹{buyKit.price * quantity}</p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleProceedPayment}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setBuyKit(null)}
                className="flex-1 border border-yellow-500 text-yellow-600 py-2 rounded-lg font-medium hover:bg-yellow-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
