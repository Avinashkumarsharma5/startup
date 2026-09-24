import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MobileNumber from "./components/auth/mno";
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
import ForgetPassword from "./pages/ForgetPassword";
import SanskaraaShopApp from "./pages/SanskaraaShopApp";
import EventManagement from "./pages/EventManagement";
import ContactPage from "./components/layout/ContactPage";
import SanskaraaLoader from "./components/layout/SanskaraaLoader";
import AdminLeads from "./pages/AdminLeads";
import AdminVendors from "./pages/AdminVendors";
import { auth, onAuthStateChanged } from "./lib/firebase";
import { getOrCreateUserProfile, persistProfile } from "./lib/profile";

function AdminOnly({ children }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    const role = String(profile?.role || "").toUpperCase();
    if (auth.currentUser && ["ADMIN", "SUPER_ADMIN", "STAFF"].includes(role)) {
      setAllowed(true);
      return;
    }
    setAllowed(false);
    navigate("/", { replace: true });
  }, [navigate]);

  if (allowed === null) return <SanskaraaLoader />;
  return allowed ? children : null;
}

export default function App() {
  const location = useLocation();

  const [micOpen, setMicOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // 🔥 Show loader only once on app load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500); // loader duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const normalizePath = (path) => path.toLowerCase().replace(/\/+$/, "") || "/";
    const publicRoutes = new Set([
      "/",
      "/auth",
      "/login",
      "/signup",
      "/forget-password",
      "/contact",
      "/contactpage",
      "/services",
      "/pujakits",
      "/panditbooking",
      "/eventspage",
      "/search",
      "/vendor-registration",
      "/service-provider/profile",
    ]);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const currentPath = normalizePath(location.pathname);
        const isPublicRoute = publicRoutes.has(currentPath);

        if (!user && !isPublicRoute) {
          navigate("/login", { replace: true });
          return;
        }

        if (user) {
          const profile = await getOrCreateUserProfile(user);
          persistProfile(profile);
          if (
            !profile.phone &&
            !isPublicRoute &&
            currentPath !== "/mobile"
          ) {
            navigate("/mobile", { replace: true });
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        const currentPath = normalizePath(location.pathname);
        if (!publicRoutes.has(currentPath)) {
          navigate("/login", { replace: true });
        }
      } finally {
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [location.pathname, navigate]);

  // Pages where navbar & footer should NOT appear
  const noLayoutRoutes = [
    "/auth",
    "/login",
    "/signup",
     "/mobile",   
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
  if (showLoader || !authChecked) {
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
          <Route path="/pandit-booking" element={<PanditBooking />} />
          <Route path="/eventspage" element={<EventsPage />} />
          <Route path="/bookingspage" element={<BookingsPage />} />
          <Route path="/dashboard" element={<UserProfile />} />
          <Route path="/customer/dashboard" element={<UserProfile />} />
          <Route path="/vendor/dashboard" element={<ServiceProviderProfile />} />
          <Route path="/mobile" element={<MobileNumber />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/eventmanagement" element={<EventManagement />} />
          <Route path="/admin/leads" element={<AdminOnly><AdminLeads /></AdminOnly>} />
          <Route path="/admin/vendors" element={<AdminOnly><AdminVendors /></AdminOnly>} />
          <Route path="/admin/analytics" element={<AdminOnly><AdminLeads /></AdminOnly>} />
          <Route
            path="/service-provider/profile"
            element={<ServiceProviderProfile />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route
            path="/vendor-registration"
            element={<VendorRegistration />}
          />
          <Route
            path="/notifications"
            element={<SanskaraaNotifications />}
          />
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
