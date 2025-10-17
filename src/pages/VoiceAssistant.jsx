import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mic, X, MessageCircle, Volume2, Languages, Calendar, User, 
  LogIn, BookOpen, Clock, Heart, Search, Send, Loader2,
  ExternalLink, Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceAssistant({ onClose }) {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [content, setContent] = useState("Ask me anything...");
  const [language, setLanguage] = useState("English");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);

  const recognitionRef = useRef(null);
  const assistantRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced quotes database
  const quotes = {
    English: [
      "The mind is everything. What you think you become.",
      "Peace comes from within. Do not seek it without.",
      "The only impossible journey is the one you never begin.",
      "Happiness never decreases by being shared.",
    ],
    Hindi: [
      "मन ही सब कुछ है। जो आप सोचते हैं, वही आप बन जाते हैं।",
      "शांति भीतर से आती है। इसे बाहर मत ढूंढो।",
      "असंभव यात्रा वह है जो आप कभी शुरू नहीं करते।",
      "खुशी बांटने से कभी कम नहीं होती।",
    ]
  };

  // Initialize voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const preferredVoice = availableVoices.find(voice => 
        voice.name.includes("Female") || voice.name.includes("Google UK English Female")
      ) || availableVoices[0];
      setSelectedVoice(preferredVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setContent("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "Hindi" ? "hi-IN" : "en-US";

    recognition.onstart = () => {
      setListening(true);
      setContent("🎤 Listening... Speak now");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setContent(`🗣️ ${transcript}`);
      handleUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setContent(`❌ Error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [language]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !listening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Recognition already started");
      }
    }
  }, [listening]);

  const speak = useCallback((text, options = {}) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = options.rate || 0.9;
    utter.pitch = options.pitch || 1.1;
    utter.volume = options.volume || 1;
    
    if (selectedVoice) utter.voice = selectedVoice;

    utter.onstart = () => setContent("🔊 Speaking...");
    utter.onend = () => setContent("✅ Ready");

    window.speechSynthesis.speak(utter);
  }, [selectedVoice]);

  // AI Query Handler - Simulated GPT API
  const handleAIQuery = async (userQuery) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI responses based on query type
    let aiResponse = "";
    
    if (userQuery.includes("who is") || userQuery.includes("what is")) {
      aiResponse = language === "Hindi" 
        ? `यह एक महत्वपूर्ण प्रश्न है। ${userQuery} के बारे में जानकारी के लिए मैंने वेब खोज की है। नीचे परिणाम देखें।`
        : `That's an important question. I've searched the web for information about ${userQuery}. See results below.`;
    } else if (userQuery.includes("how to") || userQuery.includes("how do")) {
      aiResponse = language === "Hindi"
        ? "मैं आपको चरण-दर-चरण मार्गदर्शन प्रदान कर सकता हूं। कृपया विस्तृत जानकारी के लिए खोज परिणाम देखें।"
        : "I can provide step-by-step guidance. Please see search results for detailed information.";
    } else {
      aiResponse = language === "Hindi"
        ? "मैं आपकी query को समझ गया हूं। यहां कुछ relevant information है।"
        : "I understand your query. Here's some relevant information.";
    }
    
    return aiResponse;
  };

  // Web Search Simulation
  const performWebSearch = async (query) => {
    // Simulate search API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock search results
    return [
      {
        title: language === "Hindi" ? "विकिपीडिया - संपूर्ण जानकारी" : "Wikipedia - Complete Information",
        snippet: language === "Hindi" 
          ? "विश्वसनीय स्रोत से विस्तृत जानकारी और ऐतिहासिक संदर्भ।" 
          : "Detailed information from reliable source with historical context.",
        link: "https://wikipedia.org"
      },
      {
        title: language === "Hindi" ? "आधिकारिक वेबसाइट" : "Official Website",
        snippet: language === "Hindi"
          ? "आधिकारिक संसाधन और प्रामाणिक विवरण।"
          : "Official resources and authentic descriptions.",
        link: "https://example.com"
      },
      {
        title: language === "Hindi" ? "शैक्षिक संसाधन" : "Educational Resource",
        snippet: language === "Hindi"
          ? "गहन अध्ययन और शोध सामग्री के लिए शैक्षिक पोर्टल।"
          : "Educational portal for in-depth study and research materials.",
        link: "https://educational.org"
      }
    ];
  };

  // Main input handler
  const handleUserInput = async (userInput) => {
    const input = userInput.toLowerCase().trim();
    if (!input) return;

    let response = "";
    let action = null;
    let shouldSearch = false;

    // 🔄 Predefined Commands (Existing functionality)
    if (input.includes("go to login") || input.includes("open login")) {
      response = language === "Hindi" ? "लॉगिन पेज खोल रहा हूं..." : "Opening login page...";
      action = () => navigate("/login");
    }
    else if (input.includes("user profile") || input.includes("my profile")) {
      response = language === "Hindi" ? "आपका प्रोफाइल पेज खोल रहा हूं..." : "Opening your profile page...";
      action = () => navigate("/UserProfile");
    }
    else if (input.includes("sign up") || input.includes("signup")) {
      response = language === "Hindi" ? "साइनअप पेज खोल रहा हूं..." : "Opening signup page...";
      action = () => navigate("/signup");
    }
    else if (input.includes("book a puja") || input.includes("book puja")) {
      response = language === "Hindi" ? "पूजा बुकिंग पेज खोल रहा हूं..." : "Opening puja booking page...";
      action = () => navigate("/booking");
    }
    else if (input.includes("my bookings") || input.includes("show bookings")) {
      response = language === "Hindi" ? "आपकी बुकिंग्स दिखा रहा हूं..." : "Showing your bookings...";
      action = () => navigate("/bookings");
    }
    else if (input.includes("go to cart") || input.includes("open cart")) {
      response = language === "Hindi" ? "आपकी कार्ट खोल रहा हूं..." : "Opening your cart...";
      action = () => navigate("/cart");
    }
    else if (input.includes("go home") || input.includes("home page")) {
      response = language === "Hindi" ? "होम पेज पर जा रहा हूं..." : "Going to home page...";
      action = () => navigate("/");
    }
    // 🙏 Spiritual Commands
    else if (input.includes("quote") || input.includes("inspiration")) {
      const quoteList = quotes[language];
      const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
      response = language === "Hindi" 
        ? `आपके लिए एक प्रेरणादायक संदेश: ${randomQuote}`
        : `Here's an inspirational quote for you: ${randomQuote}`;
    }
    else if (input.includes("today's date") || input.includes("date today")) {
      const today = new Date().toLocaleDateString(language === "Hindi" ? 'hi-IN' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      response = language === "Hindi" ? `आज की तारीख है: ${today}` : `Today's date is: ${today}`;
    }
    else if (input.includes("start meditation") || input.includes("meditate")) {
      response = language === "Hindi" 
        ? "ध्यान सत्र शुरू कर रहा हूं... 5 मिनट के लिए श्वास पर ध्यान केंद्रित करें।"
        : "Starting meditation session... Focus on your breath for 5 minutes.";
    }
    // 🧠 AI/Free Text Queries
    else {
      shouldSearch = true;
      response = await handleAIQuery(input);
    }

    // Add to conversation history
    setHistory(prev => [...prev.slice(-9), { 
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString() 
    }]);

    if (response) {
      setHistory(prev => [...prev.slice(-9), { 
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString() 
      }]);
    }

    // Execute navigation actions
    if (action) {
      setTimeout(action, 1000);
    }

    // Perform web search for informational queries
    if (shouldSearch) {
      const results = await performWebSearch(input);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }

    // Speak the response
    if (response) {
      speak(response);
    }

    setIsLoading(false);
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      handleUserInput(query);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "English" ? "Hindi" : "English";
    setLanguage(newLanguage);
    speak(newLanguage === "Hindi" ? "भाषा हिंदी में बदल गई है" : "Language changed to English");
  };

  const quickActions = [
    { icon: LogIn, label: "Login", command: "go to login" },
    { icon: BookOpen, label: "Book Puja", command: "book a puja" },
    { icon: User, label: "Profile", command: "open user profile" },
    { icon: Calendar, label: "Date", command: "today's date" },
    { icon: Heart, label: "Quote", command: "give me a quote" },
    { icon: Brain, label: "Ask AI", command: "what is meditation" },
  ];

  return (
    <motion.div
      ref={assistantRef}
      drag
      dragConstraints={{
        top: 60,
        left: 20,
        right: window.innerWidth - 400,
        bottom: window.innerHeight - 500
      }}
      dragElastic={0.1}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-300 z-50 cursor-grab overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Brain size={16} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Guru AI Assistant</h3>
            <p className="text-xs opacity-90">{language} • Drag me</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={toggleLanguage}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title={`Switch to ${language === "English" ? "Hindi" : "English"}`}
          >
            <Languages size={16} />
          </button>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="View History"
          >
            <MessageCircle size={16} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Close Assistant"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 bg-gray-50 max-h-96 overflow-y-auto">
        {showHistory ? (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p>No conversation history yet</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className={`flex gap-3 ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {item.type === 'assistant' && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    item.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-sm">{item.content}</p>
                    <p className={`text-xs mt-1 ${
                      item.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {item.timestamp}
                    </p>
                  </div>
                  {item.type === 'user' && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            {/* Current Status */}
            <div className="bg-white rounded-xl p-4 mb-4 border text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center transition-all ${
                listening 
                  ? "bg-green-500 shadow-lg scale-110" 
                  : isLoading
                  ? "bg-purple-500"
                  : "bg-gradient-to-r from-purple-500 to-blue-500"
              }`}>
                {listening ? (
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 bg-white rounded-full mx-0.5"
                        style={{ height: 8 + i * 4 }}
                      />
                    ))}
                  </div>
                ) : isLoading ? (
                  <Loader2 className="text-white animate-spin" size={20} />
                ) : (
                  <Brain className="text-white" size={20} />
                )}
              </div>
              <p className="text-sm font-medium text-gray-700">{content}</p>
            </div>

            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Search size={14} />
                  {language === "Hindi" ? "वेब खोज परिणाम" : "Web Search Results"}
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <a
                      key={index}
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-xs font-medium text-blue-700 line-clamp-1">{result.title}</p>
                        <ExternalLink size={12} className="text-gray-400 flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{result.snippet}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(action.command);
                      handleUserInput(action.command);
                    }}
                    className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Icon size={14} className="text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === "Hindi" ? "कुछ पूछें..." : "Ask anything..."}
              className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 size={16} className="animate-spin text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={startListening}
              disabled={listening || isLoading}
              className={`p-3 rounded-xl transition-all ${
                listening 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Mic size={18} />
            </button>
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        
        {/* Voice Selection */}
        {voices.length > 0 && (
          <div className="mt-3">
            <select 
              value={selectedVoice?.name || ""}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
              className="w-full text-xs p-2 border rounded-lg bg-white"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </motion.div>
  );
}