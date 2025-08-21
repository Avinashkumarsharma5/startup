import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import PujaKits from "./pages/PujaKits";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PanditBooking from "./pages/PanditBooking";
import KitStore from "./pages/KitStore";

export default function App() {
  const location = useLocation();

  // Jisme Navbar/Footer nahi chahiye
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
          <Route path="/KitStore" element={<KitStore />} />
          
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}
