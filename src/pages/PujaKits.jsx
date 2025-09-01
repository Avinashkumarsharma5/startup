import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

// --- Category Data ---
const categories = [
  { name: "All", img: "https://img.icons8.com/color/96/000000/categorize.png" },
  { name: "Ghar ke Sanskaar", img: "https://img.icons8.com/emoji/96/000000/house-emoji.png" },
  { name: "Bacchon ke Sanskaar", img: "https://img.icons8.com/emoji/96/000000/baby-emoji.png" },
  { name: "Vivah Sanskar", img: "https://img.icons8.com/emoji/96/000000/couple-emoji.png" },
  { name: "Pitrakarya", img: "https://img.icons8.com/emoji/96/000000/coffin-emoji.png" },
  { name: "Festival Pujas", img: "https://img.icons8.com/emoji/96/000000/festival-emoji.png" },
  { name: "Temple / Special Pujas", img: "https://img.icons8.com/emoji/96/000000/temple-emoji.png" },
  { name: "Others / Custom Options", img: "https://img.icons8.com/emoji/96/000000/memo-emoji.png" },
];

// --- Kits Data ---
const kits = [
  { id: 1, name: "Griha Pravesh Kit", price: 1500, category: "Ghar ke Sanskaar" },
  { id: 2, name: "Vastu Shanti Kit", price: 1300, category: "Ghar ke Sanskaar" },
  { id: 3, name: "Navagraha Shanti Kit", price: 1400, category: "Ghar ke Sanskaar" },
  { id: 4, name: "Naamkaran Kit", price: 1200, category: "Bacchon ke Sanskaar" },
  { id: 5, name: "Annaprashan Kit", price: 1100, category: "Bacchon ke Sanskaar" },
  { id: 6, name: "Vivah Ceremony Kit", price: 2500, category: "Vivah Sanskar" },
  { id: 7, name: "Haldi Kit", price: 900, category: "Vivah Sanskar" },
  { id: 8, name: "Antim Sanskar Kit", price: 2000, category: "Pitrakarya" },
  { id: 9, name: "Chhath Puja Kit", price: 1000, category: "Festival Pujas" },
  { id: 10, name: "Rudrabhishek Kit", price: 2200, category: "Temple / Special Pujas" },
  { id: 11, name: "Personalized Puja Kit", price: 3000, category: "Others / Custom Options" },
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
          <source src="/videos/puja_hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
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
                src={`https://via.placeholder.com/150?text=${kit.name}`}
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
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition z-50"
      >
        <FiShoppingCart size={28} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

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
                src={`https://via.placeholder.com/100?text=${buyKit.name}`}
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
