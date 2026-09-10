import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
} from "../../lib/firebase";
import { getOrCreateUserProfile, persistProfile } from "../../lib/profile";

export default function MobileNumber() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
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

      const userRef = doc(db, "users", user.uid);

      const updatedUser = {
        ...(await getOrCreateUserProfile(user)),
        phone: "+91" + phone,
        phoneVerified: false,
        lastLogin: new Date().toISOString(),
      };

      await setDoc(userRef, updatedUser, {
        merge: true,
      });

      persistProfile(updatedUser);

      toast.success("Mobile Number Saved");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    setLoading(false);
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

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition"
        >

          {loading ? "Saving..." : "Continue"}

        </button>

      </motion.div>

    </div>
  );
}