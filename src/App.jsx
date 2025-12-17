import React, { useEffect, useState } from "react";
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
import SanskaraaShopApp from "./pages/SanskaraaShopApp";

import SanskaraaLoader from "./components/layout/SanskaraaLoader";

export default function App() {
  const location = useLocation();

  const [micOpen, setMicOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // 🔥 Show loader only once on app load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500); // loader duration

    return () => clearTimeout(timer);
  }, []);

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

  const hideLayout = noLayoutRoutes.includes(
    location.pathname.toLowerCase()
  );

  const handleMicClick = () => setMicOpen(true);
  const handleMicClose = () => setMicOpen(false);

  // 🔥 Loader Overlay (Top Priority)
  if (showLoader) {
    return <SanskaraaLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />

      {!hideLayout && <Navbar onMicClick={handleMicClick} />}

      <main className="flex-grow relative">
        <Routes>
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
          <Route path="/eventspage" element={<EventsPage />} />
          <Route path="/bookingspage" element={<BookingsPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/service-provider/profile"
            element={<ServiceProviderProfile />}
          />
          <Route
            path="/vendor-registration"
            element={<VendorRegistration />}
          />
          <Route
            path="/notifications"
            element={<SanskaraaNotifications />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/sanskaraashopapp"
            element={<SanskaraaShopApp />}
          />
        </Routes>

        {/* Voice Assistant */}
        {micOpen && <VoiceAssistant onClose={handleMicClose} />}
      </main>

      {!hideLayout && <BottomNavbar />}
      {!hideLayout && <Footer />}
    </div>
  );
}
