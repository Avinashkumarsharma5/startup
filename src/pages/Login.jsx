import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Calendar, Heart } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate();

  // Check if user was previously logged in with "Remember Me"
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setEmail(userData.email);
      setPassword(userData.password);
      setRememberMe(true);
    }
  }, []);

  // Set inactivity timeout
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      }, 1800000); // 30 minutes
    };

    const events = ["mousedown", "keypress", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError(
        language === "Hindi"
          ? "कृपया ईमेल और पासवर्ड दर्ज करें"
          : "Please enter both email and password"
      );
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(
        language === "Hindi"
          ? "कृपया एक वैध ईमेल पता दर्ज करें"
          : "Please enter a valid email address"
      );
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(
        language === "Hindi"
          ? "पासवर्ड कम से कम 6 वर्णों का होना चाहिए"
          : "Password must be at least 6 characters"
      );
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError(
          language === "Hindi"
            ? "कोई खाता नहीं मिला। कृपया पहले साइन अप करें।"
            : "No account found. Please sign up first."
        );
        setIsLoading(false);
        return;
      }

      if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...storedUser, isLoggedIn: true })
        );

        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        navigate("/UserProfile");
      } else {
        setError(
          language === "Hindi" ? "अमान्य ईमेल या पासवर्ड" : "Invalid email or password"
        );
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(
        language === "Hindi"
          ? "कृपया पासवर्ड रीसेट करने के लिए अपना ईमेल दर्ज करें"
          : "Please enter your email to reset password"
      );
      return;
    }

    // OTP simulation
    alert(
      language === "Hindi"
        ? `कृपया ${email} पर भेजे गए OTP की जांच करें`
        : `Please check your email ${email} for OTP instructions`
    );

    navigate("/forget-password");
  };

  const handleSocialLogin = (provider) => {
    alert(
      language === "Hindi"
        ? `${provider} लॉगिन जल्द ही उपलब्ध होगा!`
        : `${provider} login coming soon!`
    );
  };

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Hindi" : "English");
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

  const randomQuote =
    quotes[language][Math.floor(Math.random() * quotes[language].length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-2 sm:px-4 py-4 sm:py-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-orange-200 to-yellow-200 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-orange-200 rounded-full blur-2xl opacity-30"></div>

      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-xl sm:rounded-2xl shadow-xl overflow-hidden z-10">
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
              {language === "Hindi" ? "आपका आध्यात्मिक सहयोगी" : "Your Spiritual Companion"}
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
        <div className="w-full md:w-3/5 bg-white p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center md:hidden">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Sanskaraa</h1>
            </div>

            <button
              onClick={toggleLanguage}
              className="text-xs sm:text-sm bg-orange-100 text-orange-600 px-2 sm:px-3 py-1 rounded-full hover:bg-orange-200 transition"
            >
              {language === "English" ? "हिंदी" : "English"}
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {language === "Hindi" ? "अपने खाते में लॉगिन करें" : "Login to your account"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {language === "Hindi" ? "अपनी आध्यात्मिक यात्रा जारी रखें" : "Continue your spiritual journey"}
          </p>

          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder={language === "Hindi" ? "ईमेल पता" : "Email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={language === "Hindi" ? "पासवर्ड" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm sm:text-base"
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700">
                  {language === "Hindi" ? "मुझे याद रखें" : "Remember me"}
                </span>
              </label>

              <button type="button" onClick={handleForgotPassword}>
                {language === "Hindi" ? "पासवर्ड भूल गए?" : "Forgot password?"}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

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
                  {language === "Hindi" ? "लॉगिन हो रहा है..." : "Logging in..."}
                </>
              ) : (
                language === "Hindi" ? "लॉगिन करें" : "Login"
              )}
            </button>
          </form>

          {/* Social login & signup */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === "Hindi" ? "या के साथ जारी रखें" : "Or continue with"}
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-full inline-flex justify-center py-1.5 sm:py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Google
              </button>
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full inline-flex justify-center py-1.5 sm:py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Facebook
              </button>
              <button
                onClick={() => handleSocialLogin("Apple")}
                className="w-full inline-flex justify-center py-1.5 sm:py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Apple
              </button>
            </div>
          </div>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-700">
            {language === "Hindi" ? "खाता नहीं है?" : "Don't have an account?"}{" "}
            <Link to="/signup" className="text-orange-500 font-medium hover:underline">
              {language === "Hindi" ? "साइन अप करें" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
