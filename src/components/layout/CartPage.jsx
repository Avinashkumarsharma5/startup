import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Package,
  Bookmark,
  ShoppingCart,
  ArrowLeft,
  Mic,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Loader,
  AlertCircle,
  X
} from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod"
  });

  const [cartItems] = useState([
    {
      id: 1,
      name: "Ganesh Puja Kit",
      price: 799,
      qty: 1,
      img: "https://cdn-icons-png.flaticon.com/512/5903/5903796.png",
    },
    {
      id: 2,
      name: "Lakshmi Puja Kit",
      price: 999,
      qty: 2,
      img: "https://cdn-icons-png.flaticon.com/512/5903/5903742.png",
    },
  ]);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.05;
  const shipping = 50;
  const total = subtotal + tax + shipping;

  // Scroll to first error
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!termsAccepted) {
      newErrors.terms = "Please accept terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random order ID
      const generatedOrderId = `ORD${Date.now()}`;
      setOrderId(generatedOrderId);
      setShowSuccess(true);
      
      // Redirect to success page after delay
      setTimeout(() => {
        navigate("/order-success", { 
          state: { 
            orderId: generatedOrderId,
            items: cartItems,
            total: total,
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
          }
        });
      }, 3000);
    } catch (error) {
      alert("Order failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate payment gateway integration
      const paymentSuccess = await simulatePaymentGateway();
      
      if (paymentSuccess) {
        handlePlaceOrder();
      } else {
        alert("Payment failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Payment processing failed. Please try again.");
      setIsLoading(false);
    }
  };

  const simulatePaymentGateway = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Simulate successful payment
      }, 2000);
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FFF7E0] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Your order ID: <strong>{orderId}</strong></p>
          <p className="text-gray-500">Redirecting to order details...</p>
          <div className="mt-6">
            <Loader className="w-8 h-8 text-[#800000] animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7E0] pb-28 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#800000] text-white shadow-md">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-lg font-semibold">Checkout</h1>
        <Mic size={22} className="text-white" />
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Delivery Information */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#800000]" />
            Delivery Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000] focus:border-[#800000]"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000] focus:border-[#800000]"
                }`}
                placeholder="10-digit phone number"
                maxLength={10}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000] focus:border-[#800000]"
                }`}
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.city ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000] focus:border-[#800000]"
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  id="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pincode ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000] focus:border-[#800000]"
                  }`}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg bg-[#FFF3C7] p-1"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-medium">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-2">
              <span>Total</span>
              <span className="text-[#800000]">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#800000]" />
            Payment Method
          </h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-[#800000] focus:ring-[#800000]"
              />
              <div>
                <span className="font-medium">Cash on Delivery</span>
                <p className="text-sm text-gray-500">Pay when you receive the order</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={formData.paymentMethod === "online"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-[#800000] focus:ring-[#800000]"
              />
              <div>
                <span className="font-medium">Online Payment</span>
                <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</p>
              </div>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: "" }));
                }
              }}
              className="mt-1 text-[#800000] focus:ring-[#800000]"
            />
            <div>
              <span className="font-medium text-gray-800">
                I agree to the Terms & Conditions
              </span>
              <p className="text-sm text-gray-500 mt-1">
                By placing this order, I agree to the cancellation and return policy
              </p>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.terms}
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={formData.paymentMethod === "online" ? handleOnlinePayment : handlePlaceOrder}
          disabled={isLoading}
          className="w-full bg-[#800000] text-white py-3 rounded-xl text-center font-semibold hover:bg-[#a30000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Place Order - ₹${total.toFixed(2)}`
          )}
        </button>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}

// Bottom Navbar Component (same as before)
function BottomNavbar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cart");

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "search", icon: Search, label: "Search", path: "/search" },
    { id: "kits", icon: Package, label: "Kits", path: "/pujakits" },
    { id: "bookings", icon: Bookmark, label: "Bookings", path: "/bookings" },
    { id: "cart", icon: ShoppingCart, label: "Cart", path: "/cart" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFF7E0] shadow-lg rounded-t-2xl px-6 py-2.5 z-50 border-t border-orange-200">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                navigate(item.path);
              }}
              className={`flex flex-col items-center ${
                activeTab === item.id ? "text-[#800000]" : "text-gray-500"
              }`}
            >
              <Icon size={22} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}