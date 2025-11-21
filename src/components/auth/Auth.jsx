import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, Calendar, Mic, Loader2, Heart } from "lucide-react";
import { supabase } from "../../lib/supabase";

// Validation schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean()
});

const signupSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      rememberMe: false
    }
  });

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
  }, [setValue]);

  const watchedPassword = watch("password");
  const watchedEmail = watch("email");

  // Check for current session and remembered user on login mode
  useEffect(() => {
    if (isLogin) {
      // Check if user is already logged in via Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate("/UserProfile");
        }
      });

      // Check for remembered email
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      if (rememberedEmail) {
        setValue("email", rememberedEmail);
        setValue("rememberMe", true);
      }
    }
  }, [isLogin, navigate, setValue]);

  // Reset form when switching between login/signup
  useEffect(() => {
    reset();
    setShowPassword(false);
    setPasswordStrength(0);
  }, [isLogin, reset]);

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
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      if (authData.user) {
        // Get user profile from Supabase
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        // Store user data
        const userData = {
          id: authData.user.id,
          email: authData.user.email,
          name: profile?.name || authData.user.email?.split('@')[0] || 'User',
          role: profile?.role || 'customer',
          isLoggedIn: true,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        // Handle remember me
        if (data.rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success(`Welcome back, ${userData.name} 🙏`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: 'customer'
          }
        }
      });

      if (signUpError) {
        toast.error(signUpError.message || "Failed to create account");
        return;
      }

      if (authData.user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              name: data.name,
              email: data.email,
              role: 'customer',
              created_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Continue anyway as profile might be created via trigger
        }

        const userData = {
          id: authData.user.id,
          email: authData.user.email,
          name: data.name,
          role: 'customer',
          isLoggedIn: true,
          lastLogin: new Date().toISOString(),
        };

        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        toast.success(`Welcome to Sanskaraa, ${data.name}!`);
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = watchedEmail;
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forget-password`,
      });

      if (error) {
        toast.error(error.message || "Failed to send reset email");
        return;
      }

      toast.success("Password reset email sent! Please check your inbox.");
      navigate("/forget-password");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
      console.error("Forgot password error:", error);
    }
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
    "Traditional rituals for modern spiritual seekers.",
    "Begin your spiritual journey with Sanskaraa 🪷",
    "Connect with divine traditions and rituals",
    "Your path to spiritual enlightenment starts here",
    "Embrace the wisdom of ancient traditions",
    "Start your day with blessings and prayers"
  ];

  const [quoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const randomQuote = quotes[quoteIndex];

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
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsLogin(true);
                  navigate("/login");
                }}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-[#8B4513] to-[#5C3A21] text-white shadow-md"
                    : "text-gray-600 hover:text-[#8B4513]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  navigate("/signup");
                }}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                  !isLogin
                    ? "bg-gradient-to-r from-[#8B4513] to-[#5C3A21] text-white shadow-md"
                    : "text-gray-600 hover:text-[#8B4513]"
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[#5C3A21] mb-2 flex items-center gap-2">
                    <img src="images/vivahsans03.png" alt="Diya" className="w-5 h-5" />
                    Create Your Account
                  </h2>
                  <p className="text-sm text-[#8B4513]/70 mb-6">Join our spiritual community today</p>

                  <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 pr-4 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-[#FFD700]/60"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 pr-4 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-[#FFD700]/60"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          {...register("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-[#FFD700]/60"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-[#8B4513]"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 6 characters long
                      </p>
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
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      By creating an account, you agree to our{" "}
                      <a href="/terms" className="text-[#8B4513] hover:underline">Terms</a> and{" "}
                      <a href="/privacy" className="text-[#8B4513] hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

