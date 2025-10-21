import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNavbar from "./components/layout/BottomNavbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import PujaKits from "./pages/PujaKits";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PanditBooking from "./pages/PanditBooking";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/BookingsPage";
import UserProfile from "./pages/UserProfile";
import BookEvent from "./pages/BookEvents";
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

  const noLayoutRoutes = ["/login", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  const handleMicClick = () => setMicOpen(true);
  const handleMicClose = () => setMicOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar onMicClick={handleMicClick} />}

      <main className="flex-grow relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pujakits" element={<PujaKits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/panditbooking" element={<PanditBooking />} />
          <Route path="/EventsPage" element={<EventsPage />} />
          
          <Route path="/BookingsPage" element={<BookingsPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/book" element={<BookEvent />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/service-provider/profile" element={<ServiceProviderProfile />} />
        <Route path="/vendor-registration" element={<VendorRegistration />} />
          <Route path="/notifications" element={<SanskaraaNotifications />} /> 
          <Route path="/cart" element={<CartPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
    

        </Routes>

        {/* VoiceAssistant Overlay */}
        {micOpen && <VoiceAssistant onClose={handleMicClose} />}
      </main>

      {!hideLayout && <BottomNavbar />}
      {!hideLayout && <Footer />}
    </div>
  );
}
