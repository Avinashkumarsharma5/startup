import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNavbar from "./components/layout/BottomNavbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import PujaKits from "./pages/PujaKits";
import Auth from "./components/auth/Auth";
import PanditBooking from "./pages/PanditBooking";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/BookingsPage";
import UserProfile from "./pages/UserProfile";
import VoiceAssistant from "./pages/VoiceAssistant";
import SearchPage from "./pages/SearchPage";
import ServiceProviderProfile from "./pages/ServiceProviderProfile";
import VendorRegistration from "./components/layout/VendorRegistration";
import SanskaraaNotifications from "./pages/Notification";
import CartPage from "./components/layout/CartPage";
import ForgetPassword from "./pages/ForgetPassword";






export default function App() {
  const location = useLocation();
  const [micOpen, setMicOpen] = useState(false);

  // Pages where navbar & footer should NOT appear
  const noLayoutRoutes = [
    "/auth",
    "/login",
    "/signup",
    "/forget-password",
    "/vendor-registration",
    "/service-provider/profile",
    "/alphastore/checkout",
    "/alphastore/order-success"
  ];

  // Convert URL to lowercase to avoid mismatch issues
  const hideLayout = noLayoutRoutes.includes(location.pathname.toLowerCase());

  const handleMicClick = () => setMicOpen(true);
  const handleMicClose = () => setMicOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      {!hideLayout && <Navbar onMicClick={handleMicClick} />}

      <main className="flex-grow relative">
        <Routes>
          {/* Default */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pujakits" element={<PujaKits />} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Pages */}
          <Route path="/panditbooking" element={<PanditBooking />} />
          <Route path="/EventsPage" element={<EventsPage />} />
          <Route path="/BookingsPage" element={<BookingsPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/service-provider/profile" element={<ServiceProviderProfile />} />
          <Route path="/vendor-registration" element={<VendorRegistration />} />
          <Route path="/notifications" element={<SanskaraaNotifications />} />
          <Route path="/cart" element={<CartPage />} />

          

         
        </Routes>

        {/* Voice Assistant */}
        {micOpen && <VoiceAssistant onClose={handleMicClose} />}
      </main>

      {!hideLayout && <BottomNavbar />}
      {!hideLayout && <Footer />}
    </div>
  );
}
