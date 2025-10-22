import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Heart, Eye, EyeOff, Mail, User, Lock, Loader2, Calendar } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = { 
        name, 
        email, 
        password, 
        role: "customer",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Account created successfully! Welcome to Sanskaraa.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const quotes = [
    "Begin your spiritual journey with Sanskaraa 🪷",
    "Connect with divine traditions and rituals",
    "Your path to spiritual enlightenment starts here",
    "Embrace the wisdom of ancient traditions",
    "Start your day with blessings and prayers"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E1] via-[#FFE4B5] to-[#FFD580] overflow-hidden p-4">
      {/* Mandala Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/src/assets/images/mandala-bg.png"
          alt=""
          className="absolute opacity-10 w-[600px] h-[600px] top-10 right-10 animate-spin-slow"
        />
        <img
          src="/src/assets/images/mandala-bg.png"
          alt=""
          className="absolute opacity-5 w-[500px] h-[500px] -bottom-20 -left-20 animate-spin-slow"
          style={{ animationDirection: 'reverse', animationDuration: '100s' }}
        />
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#5C3A21',
            color: '#fff',
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding & Quote */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-[#8B4513] to-[#5C3A21] p-8 text-white flex flex-col justify-between relative hidden md:flex">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center mb-8"
              >
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  src="/src/assets/images/sanskaraa-logo.png"
                  alt="Sanskaraa"
                  className="w-16 h-16 object-contain mb-3"
                />
                <h1 className="text-3xl font-bold text-white">Sanskaraa</h1>
                <p className="text-sm italic text-yellow-100 mt-1">"Preserving Traditions. Celebrating Culture."</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                  <img 
                    src="/src/assets/icons/diya.png" 
                    alt="Diya" 
                    className="w-6 h-6" 
                  />
                  Start Your Journey
                </h2>
                <p className="text-yellow-100 text-lg leading-relaxed">{randomQuote}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center text-yellow-100 text-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </motion.div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full md:w-3/5 bg-white/80 backdrop-blur-md border border-yellow-200 p-6 sm:p-8">
            {/* Mobile Branding */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center mb-6 md:hidden"
            >
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                src="/src/assets/images/sanskaraa-logo.png"
                alt="Sanskaraa"
                className="w-12 h-12 object-contain mb-2"
              />
              <h1 className="text-xl font-bold text-[#5C3A21]">Sanskaraa</h1>
              <p className="text-xs italic text-[#8B4513]/70">"Preserving Traditions. Celebrating Culture."</p>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-[#5C3A21] flex items-center gap-2">
                <img 
                  src="/src/assets/icons/diya.png" 
                  alt="Diya" 
                  className="w-5 h-5" 
                />
                Create Your Account
              </h2>
              <p className="text-sm text-[#8B4513]/70">
                Join our spiritual community today
              </p>
            </motion.div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 pr-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] py-2.5 transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] py-2.5 transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] py-2.5 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513] transition"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Sign Up Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-4 bg-gradient-to-r from-[#8B4513] to-[#5C3A21] hover:from-[#5C3A21] hover:to-[#8B4513] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    Create Spiritual Account
                  </>
                )}
              </motion.button>
            </form>

            {/* Terms & Privacy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-[#8B4513] hover:underline">Terms</a> and{" "}
                <a href="/privacy" className="text-[#8B4513] hover:underline">Privacy Policy</a>
              </p>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-[#8B4513] font-semibold hover:underline transition-colors">
                  Login Here
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* AI Chatbot Integration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toast.success("Om Sanskaraa assistant activated!")}
          className="bg-gradient-to-r from-[#8B4513] to-[#5C3A21] text-white p-3 rounded-full shadow-lg transition-all"
          title="Om Sanskaraa Assistant"
        >
          <span className="text-sm font-semibold">🪷 Om</span>
        </motion.button>
      </motion.div>
    </div>
  );
}