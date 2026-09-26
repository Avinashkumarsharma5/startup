import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  auth,
  db,
  doc,
  updateDoc,
  serverTimestamp,
  RecaptchaVerifier,
  linkWithPhoneNumber,
} from "../../lib/firebase";
import { getOrCreateUserProfile, persistProfile } from "../../lib/profile";

export default function MobileNumber() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const recaptchaVerifier = useRef(null);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Enter a valid 10 digit mobile number");
      return;
    }

    if (!auth.currentUser) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!recaptchaVerifier.current) {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, "mobile-phone-recaptcha", {
          size: "invisible",
        });
      }
      const result = await linkWithPhoneNumber(
        user,
        `+91${phone}`,
        recaptchaVerifier.current
      );
      setConfirmation(result);
      setOtpSent(true);
      toast.success("Verification code sent to your phone.");
    } catch (err) {
      console.error(err);
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;
      toast.error(err.message || "Could not send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmation || !auth.currentUser) return;
    setLoading(true);
    try {
      const credential = await confirmation.confirm(otp);
      await credential.user.getIdToken(true);
      await updateDoc(doc(db, "users", credential.user.uid), {
        phone: credential.user.phoneNumber,
        phoneVerified: true,
        lastLogin: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      });
      const updatedProfile = await getOrCreateUserProfile(credential.user);
      persistProfile(updatedProfile);
      toast.success("Mobile number verified.");
      navigate("/");
    } catch (err) {
      console.error("Mobile number verification failed:", err);
      toast.error(err.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    let profile = null;
    try {
      profile = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch (error) {
      console.error("Could not read signed-in profile for navigation:", error);
    }

    const role = String(profile?.role || "").toUpperCase();
    if (["ADMIN", "SUPER_ADMIN", "STAFF"].includes(role)) {
      navigate("/admin/dashboard");
    } else if (role === "VENDOR" && profile?.vendorStatus === "APPROVED") {
      navigate("/vendor/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
      >

        <div className="flex justify-center">

          <img
            src="/images/sanskaraa-logo.png"
            className="w-20 h-20"
            alt=""
          />

        </div>

        <h1 className="text-3xl font-bold text-center mt-5 text-orange-600">
          Welcome 🙏
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Please enter your mobile number
        </p>

        <div className="relative mt-8">

          <Phone
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="tel"
            placeholder="9876543210"
            maxLength={10}
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            className="w-full border rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

        </div>

        <div id="mobile-phone-recaptcha" />
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading || phone.length !== 10}
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading ? "Sending code..." : "Send verification code"}
          </button>
        ) : (
          <>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit verification code"
              className="mt-5 w-full rounded-xl border px-4 py-3"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify and continue"}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={handleSkip}
          className="mt-4 w-full py-2 text-sm font-medium text-gray-500 hover:text-orange-700"
        >
          Skip for now — add phone later
        </button>

      </motion.div>

    </div>
  );
}