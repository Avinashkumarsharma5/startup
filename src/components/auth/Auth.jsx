import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "../../lib/firebase";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(
          ref,
          {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            photo: user.photoURL || "",
            phone: "",
            phoneVerified: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );

        navigate("/mobile");
        return;
      }

      const data = snap.data();

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data)
      );

      if (!data.phone) {
        navigate("/mobile");
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(
          userRef,
          {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            photo: user.photoURL || "",
            phone: "",
            phoneVerified: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );

        toast.success("Welcome " + user.displayName);

        navigate("/mobile");

        return;
      }

      await setDoc(
        userRef,
        {
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );

      const latest = await getDoc(userRef);

      const userData = latest.data();

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(userData)
      );

      toast.success(
        "Welcome " + user.displayName
      );
} catch (err) {
  console.error(err);

  if (err.code === "auth/popup-closed-by-user") {
    toast.error("Google Sign In was cancelled.");
  } else {
    toast.error(err.message);
  }
} finally {
  setLoading(false);
}
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">

          <div className="flex justify-center">
            <img
              src="/images/sanskaraa-logo.png"
              alt="Sanskaraa"
              className="w-20 h-20"
            />
          </div>

          <h1 className="text-4xl font-bold text-center mt-5 text-orange-600">
            Sanskaraa
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Har Karya Mein, Aapke Saath 🙏
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-10 w-full h-14 rounded-xl border border-gray-300 bg-white hover:border-orange-500 hover:shadow-lg transition-all flex items-center justify-center gap-4 disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-6 h-6"
                  alt="Google"
                />

                <span className="font-semibold text-gray-700">
                  Continue with Google
                </span>
              </>
            )}

          </button>

          <div className="mt-8 bg-orange-50 rounded-2xl p-5">

            <h3 className="font-semibold text-orange-700 mb-3">
              Why Google Login?
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">

              <li>✅ Secure Google Authentication</li>

              <li>✅ No Password Required</li>

              <li>✅ Fast & Easy Login</li>

              <li>✅ Mobile Number will be collected after login</li>

            </ul>

          </div>

          <p className="text-xs text-center text-gray-400 mt-8">
            By continuing you agree to our Terms of Service & Privacy Policy.
          </p>

        </div>

      </motion.div>

    </div>
  );
}