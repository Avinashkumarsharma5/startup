import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Calendar, Mic, Loader2 } from "lucide-react";

// Validation schema
const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean()
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // Check for remembered user
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setValue("rememberMe", true);
      toast.success(`Welcome back, ${userData.name || 'User'} 👋`);
    }

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

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await mockAuthAPI(data.email, data.password);
      if (response.success) {
        const userData = {
          ...response.user,
          isLoggedIn: true,
          lastLogin: new Date().toISOString(),
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

        toast.success(`Welcome, ${response.user.name || 'User'} 🙏`);
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
            user: storedUser
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

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      toast.loading("Listening for email...");
    }
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
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="images/sanskaraa app.png"
          alt=""
          className="absolute opacity-10 w-[600px] h-[600px] top-10 right-10 animate-spin-slow"
        />
      </div>

      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-[#8B4513] to-[#5C3A21] p-8 text-white hidden md:flex flex-col justify-between">
            <div>
              <img src="images/sanskaraa-logo.png" alt="Sanskaraa" className="w-16 h-16 mx-auto mb-3" />
              <h1 className="text-3xl font-bold text-center">Sanskaraa</h1>
              <p className="text-sm italic text-center mt-1 text-yellow-100">"Preserving Traditions. Celebrating Culture."</p>
              <p className="text-center text-yellow-100 mt-6 text-lg leading-relaxed">{randomQuote}</p>
            </div>
            <div className="flex items-center justify-center text-yellow-100 text-sm mt-6">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-3/5 bg-white/80 backdrop-blur-md border border-yellow-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#5C3A21] mb-2 flex items-center gap-2">
              <img src="images/vivahsans03.png" alt="Diya" className="w-5 h-5" />
              Welcome Back
            </h2>
            <p className="text-sm text-[#8B4513]/70 mb-6">Continue your spiritual journey</p>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-[#FFD700]/60"
                  />
                  <button
                    type="button"
                    onClick={startVoiceInput}
                    disabled={isListening}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513]"
                  >
                    <Mic className={`w-4 h-4 ${isListening ? "text-[#8B4513] animate-pulse" : ""}`} />
                  </button>
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-[#FFD700]/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Password Strength */}
              {watchedPassword && (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Password strength: {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Medium" : "Strong"}
                  </p>
                </div>
              )}

              {/* Remember & Forgot */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="flex items-center">
                  <input {...register("rememberMe")} type="checkbox" className="h-4 w-4 text-[#8B4513]" />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#8B4513] hover:text-[#5C3A21] text-sm font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                className={`w-full py-3 bg-gradient-to-r from-[#8B4513] to-[#5C3A21] text-white rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
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

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#8B4513] font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
