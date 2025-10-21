import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, Calendar, Heart, Sun, Moon, Volume2, Mic } from "lucide-react";

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
    // Language persistency
    const savedLanguage = localStorage.getItem("sanskaraa-language");
    if (savedLanguage) {
      // Set language state if you have one
    }

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

  // Inactivity timer with JWT expiry check
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Check token expiry if using JWT
        const user = localStorage.getItem("loggedInUser");
        if (user) {
          const userData = JSON.parse(user);
          if (userData.tokenExpiry && new Date() > new Date(userData.tokenExpiry)) {
            handleLogout();
          } else {
            // Regular inactivity logout
            handleLogout();
          }
        }
      }, 1800000); // 30 minutes
    };

    const events = ["mousedown", "keypress", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => document.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out due to inactivity");
    navigate("/login");
  };

  const handleForgotPassword = () => {
    const email = watch("email");
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    // Simulate password reset flow
    toast.success(`Password reset link sent to ${email}`);
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

  const quotes = {
    English: [
      "Start your day with a prayer ✨ Book your puja with Sanskaraa.",
      "Connect with divine energy through traditional rituals.",
      "Your spiritual journey begins with a single prayer."
    ],
    Hindi: [
      "अपने दिन की शुरुआत एक प्रार्थना के साथ करें ✨ संस्कारा के साथ अपनी पूजा बुक करें।",
      "पारंपरिक rituals के माध्यम से दिव्य ऊर्जा से जुड़ें।",
      "आपकी आध्यात्मिक यात्रा एक प्रार्थना से शुरू होती है।"
    ]
  };

  const randomQuote = quotes["English"][Math.floor(Math.random() * quotes["English"].length)];

  return (
    <div className={`min-h-screen flex items-center justify-center px-2 sm:px-4 py-4 sm:py-6 relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-orange-50 to-amber-100"
    }`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#374151' : '#fff',
            color: darkMode ? '#fff' : '#374151',
          },
        }}
      />
      
      {/* Background elements without Lottie */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-orange-200 to-yellow-200 opacity-30 dark:opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-orange-200 rounded-full blur-2xl opacity-30 dark:opacity-20"></div>

      <div className={`max-w-4xl w-full flex flex-col md:flex-row rounded-xl sm:rounded-2xl shadow-xl overflow-hidden z-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}>
        {/* Left side */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white flex flex-col justify-between relative hidden md:flex">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-orange-500" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold">Sanskaraa</h1>
            </div>
            <h2 className="text-xl font-semibold mb-4">
              Your Spiritual Companion
            </h2>
            <p className="text-orange-100 mb-6">{randomQuote}</p>
          </div>

          <div className="flex items-center text-orange-100 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className={`w-full md:w-3/5 p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center md:hidden">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold">Sanskaraa</h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Input Toggle */}
              <button
                onClick={() => {
                  const current = localStorage.getItem("sanskaraa-tts") !== "true";
                  localStorage.setItem("sanskaraa-tts", current.toString());
                  toast.success(`Text-to-speech ${current ? "enabled" : "disabled"}`);
                }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Toggle text-to-speech"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Login to your account
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            Continue your spiritual journey
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 sm:space-y-4">
            {/* Email Field with Voice Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm sm:text-base ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "border-gray-300 text-gray-900"
                } ${errors.email ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={startVoiceInput}
                disabled={isListening}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-orange-500 transition"
              >
                <Mic className={`h-4 w-4 ${isListening ? "text-orange-500 animate-pulse" : ""}`} />
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password Field with Strength Meter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm sm:text-base ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "border-gray-300 text-gray-900"
                } ${errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Password Strength Meter */}
            {watchedPassword && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Password strength: {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Medium" : "Strong"}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <label className="flex items-center">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm">Remember me</span>
              </label>

              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 sm:py-3 rounded-lg transition flex items-center justify-center disabled:opacity-75 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className={`px-2 ${
                  darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
                }`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {["Google", "Facebook", "Apple"].map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleSocialLogin(provider)}
                  className={`w-full inline-flex justify-center py-1.5 sm:py-2 px-2 sm:px-4 border rounded-md shadow-sm text-xs sm:text-sm font-medium transition ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600" 
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <p className={`mt-4 sm:mt-6 text-center text-xs sm:text-sm ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}>
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* AI Chatbot Integration (Corner) */}
      <div className="fixed bottom-4 right-4 z-20">
        <button
          onClick={() => toast.success("Om Sanskaraa assistant activated!")}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          title="Om Sanskaraa Assistant"
        >
          <span className="text-sm font-semibold">🪷 Om</span>
        </button>
      </div>
    </div>
  );
}