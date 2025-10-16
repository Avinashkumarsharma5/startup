import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mic,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Loader,
  AlertCircle,
} from "lucide-react";

export default function PanditBookingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    pujaDate: "",
    pujaTime: "",
    specialRequest: "",
    paymentMethod: "cod",
  });

  const fee = 1500; // Pandit booking fee

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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.pujaDate) newErrors.pujaDate = "Select a puja date";
    if (!formData.pujaTime) newErrors.pujaTime = "Select a puja time";
    if (!termsAccepted) newErrors.terms = "Please accept terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleBooking = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      const generatedId = `PANDIT${Date.now()}`;
      setBookingId(generatedId);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/booking-success", {
          state: {
            bookingId: generatedId,
            details: formData,
            fee,
          },
        });
      }, 3000);
    } catch (error) {
      alert("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FFF7E0] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h2>
          <p className="text-gray-600 mb-4">Your booking ID: <strong>{bookingId}</strong></p>
          <p className="text-gray-500">Redirecting to booking details...</p>
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
        <h1 className="text-lg font-semibold">Pandit Booking</h1>
        <Mic size={22} />
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#800000]" />
            Booking Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              maxLength={10}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <textarea
              id="address"
              rows={3}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pincode *</label>
              <input
                id="pincode"
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                maxLength={6}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.pincode ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
                }`}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.pincode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Puja Date *</label>
              <input
                id="pujaDate"
                type="date"
                value={formData.pujaDate}
                onChange={(e) => handleInputChange("pujaDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.pujaDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
                }`}
              />
              {errors.pujaDate && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.pujaDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Puja Time *</label>
              <input
                id="pujaTime"
                type="time"
                value={formData.pujaTime}
                onChange={(e) => handleInputChange("pujaTime", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.pujaTime ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#800000]"
                }`}
              />
              {errors.pujaTime && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.pujaTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Requests</label>
            <textarea
              id="specialRequest"
              rows={2}
              value={formData.specialRequest}
              onChange={(e) => handleInputChange("specialRequest", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#800000]"
              placeholder="Any specific requirements"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#800000]" />
            Payment
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-[#800000]"
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={formData.paymentMethod === "online"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-[#800000]"
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-2xl shadow p-4 border border-orange-100">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
              }}
              className="mt-1 text-[#800000]"
            />
            <div>
              <span className="font-medium">I agree to Terms & Conditions</span>
              {errors.terms && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.terms}</p>}
            </div>
          </label>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full bg-[#800000] text-white py-3 rounded-xl text-center font-semibold hover:bg-[#a30000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? <><Loader className="w-5 h-5 animate-spin"/> Processing...</> : `Book Pandit - ₹${fee}`}
        </button>
      </div>
    </div>
  );
}
