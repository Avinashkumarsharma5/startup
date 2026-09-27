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
import AdminDashboard from "./pages/AdminDashboard";
import { auth, onAuthStateChanged } from "./lib/firebase";
import { getOrCreateUserProfile, persistProfile } from "./lib/profile";
import {
  getCurrentUserProfile,
  getRoleFromProfile,
  getVendorApplicationForUser,
  ROLE,
} from "./lib/roleAccess";

function ProtectedRoute({
  children,
  allowRoles = null,
  requireVendorApproved = false,
  redirectTo = "/login",
}) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (active) {
          setIsAuthorized(false);
          navigate(redirectTo, { replace: true });
        }
        return;
      }

      try {
        const profile = (await getCurrentUserProfile()) || (await getOrCreateUserProfile(user));
        const role = getRoleFromProfile(profile);
        const vendorStatus = String(profile?.vendorApplicationStatus || "").toUpperCase();
        const roleAllowed = !allowRoles || allowRoles.includes(role);
        const vendorAllowed = !requireVendorApproved || (role === ROLE.VENDOR && vendorStatus === "APPROVED");
        const allowed = roleAllowed && vendorAllowed;

        if (active) {
          setIsAuthorized(allowed);
          if (!allowed) {
            const redirect = role === ROLE.ADMIN || role === ROLE.SUPER_ADMIN || role === ROLE.STAFF
              ? "/admin/dashboard"
              : role === ROLE.VENDOR
                ? "/vendor-registration"
                : "/";
            navigate(redirect, { replace: true });
          }
        }
      } catch (error) {
        console.error("Access check failed:", error);
        if (active) {
          setIsAuthorized(false);
          navigate(redirectTo, { replace: true });
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [allowRoles, navigate, redirectTo, requireVendorApproved]);

  if (isAuthorized === null) return <SanskaraaLoader />;
  return isAuthorized ? children : null;
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
          <Route path="/dashboard" element={<ProtectedRoute allowRoles={[ROLE.CUSTOMER, ROLE.VENDOR, ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><UserProfile /></ProtectedRoute>} />
          <Route path="/customer/dashboard" element={<ProtectedRoute allowRoles={[ROLE.CUSTOMER, ROLE.VENDOR, ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><UserProfile /></ProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowRoles={[ROLE.VENDOR]} requireVendorApproved><ServiceProviderProfile /></ProtectedRoute>} />
          <Route path="/mobile" element={<MobileNumber />} />
          <Route path="/userprofile" element={<ProtectedRoute allowRoles={[ROLE.CUSTOMER, ROLE.VENDOR, ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><UserProfile /></ProtectedRoute>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/eventmanagement" element={<EventManagement />} />
          <Route path="/admin/leads" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><AdminLeads /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/AdminLeads" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.STAFF]}><AdminLeads /></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN]}><AdminVendors /></ProtectedRoute>} />
          <Route path="/AdminVendors" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN]}><AdminVendors /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN]}><AdminLeads /></ProtectedRoute>} />
          <Route
            path="/service-provider/profile"
            element={<ProtectedRoute allowRoles={[ROLE.VENDOR]} requireVendorApproved><ServiceProviderProfile /></ProtectedRoute>}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route
            path="/vendor-registration"
            element={<ProtectedRoute allowRoles={[ROLE.CUSTOMER, ROLE.VENDOR]}><VendorRegistration /></ProtectedRoute>}
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
