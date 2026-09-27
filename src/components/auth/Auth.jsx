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
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../lib/firebase";
import { getOrCreateUserProfile, persistProfile } from "../../lib/profile";
import { getVendorApplicationForUser } from "../../lib/roleAccess";

async function getPostLoginPath(user, profile) {
  const role = String(profile.role || "").toUpperCase();
  if (["ADMIN", "SUPER_ADMIN", "STAFF"].includes(role)) return "/admin/dashboard";

  const application = await getVendorApplicationForUser(user.uid);
  const status = String(application?.status || profile.vendorApplicationStatus || "").toUpperCase();
  if (status === "APPROVED") return "/vendor/dashboard";
  if (["PENDING", "REJECTED", "SUSPENDED"].includes(status)) return "/vendor-registration";
  return profile.phone ? "/" : "/mobile";
}

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const profile = await getOrCreateUserProfile(user);
        persistProfile(profile);
        navigate(await getPostLoginPath(user, profile), { replace: true });
      } catch (error) {
        console.error("Could not load user profile:", error);
        toast.error("Login succeeded, but your profile could not be loaded.");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

     const profile = await getOrCreateUserProfile(result.user);
     persistProfile(profile);
     toast.success("Welcome " + (profile.name || profile.email));
    navigate(await getPostLoginPath(result.user, profile));
} catch (err) {
  console.error(err);

  if (err.code === "auth/popup-closed-by-user") {
    toast.error("Google Sign In was cancelled.");
  } else if (err.code === "auth/unauthorized-domain") {
    toast.error(
      "Google login is not enabled for this address. Open the app using http://localhost:5173."
    );
  } else {
    toast.error(err.message);
  }
} finally {
  setLoading(false);
}
  };

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    if (!email || password.length < 6 || (isSignUp && !name.trim())) {
      toast.error(isSignUp
        ? "Name, email and a 6 character password are required."
        : "Enter a valid email and 6 character password.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (isSignUp) {
        result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(result.user, { displayName: name.trim() });
      } else {
        result = await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      const profile = await getOrCreateUserProfile(result.user);
      persistProfile(profile);
      navigate(await getPostLoginPath(result.user, profile));
    } catch (err) {
      console.error(err);
      toast.error(err.code === "auth/invalid-credential"
        ? "Email or password is incorrect."
        : err.message);
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

          <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" /> OR <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            {isSignUp && (
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password (min 6 characters)"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {isSignUp ? "Create Account" : "Login with Email"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsSignUp((value) => !value)}
            className="mt-4 w-full text-sm font-medium text-orange-600 hover:underline"
          >
            {isSignUp ? "Already have an account? Login" : "New user? Create Account"}
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