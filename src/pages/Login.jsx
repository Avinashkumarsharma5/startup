import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Calendar, Heart, Sun, Moon, Volume2, Mic, Loader2 } from "lucide-react";

// Validation schema
const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean()
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setValue('email', transcript, { shouldValidate: true });
        setIsListening(false);
        toast.success("Email captured via voice!");
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error("Voice recognition failed");
      };
    }
  }, []);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const watchedPassword = watch("password");
  const watchedRememberMe = watch("rememberMe");

  // Check for remembered user and preferences
  useEffect(() => {
    // Dark mode
    const savedDarkMode = localStorage.getItem("sanskaraa-darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Remembered user
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setValue("rememberMe", true);
      
      // Show welcome back message
      toast.success(`Welcome back, ${userData.name || 'User'} 👋`);
    }

    // Auto-redirect if already logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser && JSON.parse(loggedInUser).isLoggedIn) {
      navigate("/UserProfile");
    }
  }, [navigate, setValue]);

  // Password strength calculator
  useEffect(() => {
    if (!watchedPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (watchedPassword.length >= 6) strength += 25;
    if (watchedPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchedPassword)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(watchedPassword)) strength += 25;

    setPasswordStrength(strength);
  }, [watchedPassword]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("sanskaraa-darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogin = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual Supabase/Firebase auth
      const response = await mockAuthAPI(data.email, data.password);
      
      if (response.success) {
        const userData = {
          ...response.user,
          isLoggedIn: true,
          lastLogin: new Date().toISOString(),
          tokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };

        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        if (data.rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify({
            email: data.email,
            password: data.password,
            name: response.user.name
          }));
        } else {
          localStorage.removeItem("rememberedUser");
        }

        // Personalization features
        const greeting = getSpiritualGreeting(response.user.name);
        toast.success(greeting);
        
        // Text-to-speech welcome
        if (localStorage.getItem("sanskaraa-tts") === "true") {
          speakText(greeting);
        }

        navigate("/UserProfile");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const mockAuthAPI = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser && storedUser.email === email && storedUser.password === password) {
          resolve({
            success: true,
            user: {
              ...storedUser,
              role: storedUser.role || "Customer"
            }
          });
        } else {
          resolve({
            success: false,
            message: "Invalid email or password"
          });
        }
      }, 1500);
    });
  };

  const handleForgotPassword = () => {
    const email = watch("email");
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }
    navigate("/forget-password");
  };

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login integration coming soon!`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      toast.loading("Listening for email...");
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getSpiritualGreeting = (name) => {
    const hour = new Date().getHours();
    let timeGreeting = "Good day";
    let emoji = "🪔";
    
    if (hour < 12) {
      timeGreeting = "Good Morning";
      emoji = "🌞";
    } else if (hour < 17) {
      timeGreeting = "Good Afternoon";
      emoji = "☀️";
    } else {
      timeGreeting = "Good Evening";
      emoji = "🌙";
    }

    const blessings = [
      "May your day be blessed!",
      "May divine energy guide you!",
      "Peace and prosperity to you!",
      "May your prayers be answered!"
    ];

    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    
    return `${timeGreeting}, ${name || "User"} ${emoji} — ${randomBlessing}`;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const quotes = [
    "Start your day with a prayer ✨ Book your puja with Sanskaraa.",
    "Connect with divine energy through traditional rituals.",
    "Your spiritual journey begins with a single prayer.",
    "Embrace the divine within you every day.",
    "Traditional rituals for modern spiritual seekers."
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
                  Your Spiritual Companion
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

          {/* Right Side - Login Form */}
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

            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-[#5C3A21] flex items-center gap-2">
                  <img 
                    src="/src/assets/icons/diya.png" 
                    alt="Diya" 
                    className="w-5 h-5" 
                  />
                  Welcome Back
                </h2>
                <p className="text-sm text-[#8B4513]/70">
                  Continue your spiritual journey
                </p>
              </motion.div>

              <div className="flex items-center gap-2">
                {/* Voice Input Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const current = localStorage.getItem("sanskaraa-tts") !== "true";
                    localStorage.setItem("sanskaraa-tts", current.toString());
                    toast.success(`Text-to-speech ${current ? "enabled" : "disabled"}`);
                  }}
                  className="p-2 rounded-full bg-yellow-50 text-[#8B4513] hover:bg-yellow-100 transition"
                  title="Toggle text-to-speech"
                >
                  <Volume2 className="w-4 h-4" />
                </motion.button>

                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-yellow-50 text-[#8B4513] hover:bg-yellow-100 transition"
                  title="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] py-2.5 transition-all duration-200"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startVoiceInput}
                    disabled={isListening}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513] transition"
                  >
                    <Mic className={`w-4 h-4 ${isListening ? "text-[#8B4513] animate-pulse" : ""}`} />
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200 mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] py-2.5 transition-all duration-200"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513] transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200 mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Strength Meter */}
              <AnimatePresence>
                {watchedPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Password strength: {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Medium" : "Strong"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <label className="flex items-center">
                  <input
                    {...register("rememberMe")}
                    type="checkbox"
                    className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleForgotPassword}
                  className="text-[#8B4513] hover:text-[#5C3A21] text-sm font-medium transition-colors"
                >
                  Forgot password?
                </motion.button>
              </motion.div>

              {/* Login Button */}
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
                    Logging in...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Login to Your Account
                  </>
                )}
              </motion.button>
            </form>

            {/* Social Login Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Google", "Facebook", "Apple"].map((provider) => (
                  <motion.button
                    key={provider}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialLogin(provider)}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    {provider}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#8B4513] font-semibold hover:underline transition-colors">
                  Create Account
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