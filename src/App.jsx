import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNavbar from "./components/layout/BottomNavbar";  // import

import Home from "./pages/Home";
import Services from "./pages/Services";
import PujaKits from "./pages/PujaKits";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PanditBooking from "./pages/PanditBooking";
import EventsPage from "./pages/EventsPage";
import PanditProfile from "./pages/PanditProfile";
import Pbc from "./pages/Pbc";
import BookingsPage from "./pages/BookingsPage";
import UserProfile from "./pages/UserProfile";
import BookEvent from "./pages/BookEvents";





export default function App() {
  const location = useLocation();

  // Jisme Navbar/Footer/BottomNavbar nahi chahiye
  const noLayoutRoutes = ["/login", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
         <Route path="/pujakits" element={<PujaKits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/panditbooking" element={<PanditBooking />} />
         <Route path="/EventsPage" element={<EventsPage />} />
         <Route path="/PanditProfile" element={<PanditProfile />} />
         <Route path="/Pbc" element={<Pbc />} />
         <Route path="/BookingsPage" element={<BookingsPage />} />
        <Route path="/UserProfile" element={<UserProfile />} />
         <Route path="/book" element={<BookEvent />} />
          
        </Routes>
      </main>

      {/* Footer ke upar BottomNavbar dikhayenge */}
      {!hideLayout && <BottomNavbar />}
      {!hideLayout && <Footer />}
    </div>
  );
}
