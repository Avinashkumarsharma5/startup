import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Calendar, Clock, Heart } from "lucide-react";

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
      // Set timeout for 30 minutes (1800000 ms)
      inactivityTimer = setTimeout(() => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      }, 1800000);
    };

    // Events that reset the timer
    const events = ["mousedown", "keypress", "scroll", "touchstart"];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError(language === "Hindi" ? "कृपया ईमेल और पासवर्ड दर्ज करें" : "Please enter both email and password");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(language === "Hindi" ? "कृपया एक वैध ईमेल पता दर्ज करें" : "Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(language === "Hindi" ? "पासवर्ड कम से कम 6 वर्णों का होना चाहिए" : "Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
      if (!storedUser) {
        setError(language === "Hindi" ? "कोई खाता नहीं मिला। कृपया पहले साइन अप करें।" : "No account found. Please sign up first.");
        setIsLoading(false);
        return;
      }

      if (storedUser.email === email && storedUser.password === password) {
        // Store login session
        localStorage.setItem("loggedInUser", JSON.stringify({ 
          ...storedUser, 
          isLoggedIn: true 
        }));
        
        // Remember user if checkbox is checked
        if (rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem("rememberedUser");
        }
        
        navigate("/UserProfile");
      } else {
        setError(language === "Hindi" ? "अमान्य ईमेल या पासवर्ड" : "Invalid email or password");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(language === "Hindi" ? "कृपया पासवर्ड रीसेट करने के लिए अपना ईमेल दर्ज करें" : "Please enter your email to reset password");
      return;
    }
    
    // Simulate OTP sending
    alert(language === "Hindi" 
      ? `कृपया ${email} पर भेजे गए OTP की जांच करें` 
      : `Please check your email ${email} for OTP instructions`);
    
    // In a real app, this would navigate to a password reset page
  };

  const handleSocialLogin = (provider) => {
    alert(language === "Hindi" 
      ? `${provider} लॉगिन जल्द ही उपलब्ध होगा!` 
      : `${provider} login coming soon!`);
  };

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Hindi" : "English");
  };

  // Motivational quotes in both languages
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

  const randomQuote = quotes[language][Math.floor(Math.random() * quotes[language].length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-orange-200 to-yellow-200 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-200 rounded-full blur-2xl opacity-30"></div>
      
      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden z-10">
        {/* Left side - Branding and motivational quote */}
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
            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="w-full md:w-3/5 bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center md:hidden">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sanskaraa</h1>
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-200 transition"
            >
              {language === "English" ? "हिंदी" : "English"}
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "Hindi" ? "अपने खाते में लॉगिन करें" : "Login to your account"}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === "Hindi" 
              ? "अपनी आध्यात्मिक यात्रा जारी रखें" 
              : "Continue your spiritual journey"}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder={language === "Hindi" ? "ईमेल पता" : "Email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={language === "Hindi" ? "पासवर्ड" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {language === "Hindi" ? "मुझे याद रखें" : "Remember me"}
                </span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition flex items-center justify-center disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === "Hindi" ? "लॉगिन हो रहा है..." : "Logging in..."}
                </>
              ) : (
                language === "Hindi" ? "लॉगिन करें" : "Login"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === "Hindi" ? "या के साथ जारी रखें" : "Or continue with"}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                </svg>
              </button>

              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              <button
                onClick={() => handleSocialLogin("Apple")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
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