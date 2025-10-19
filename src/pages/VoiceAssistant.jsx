import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, X, Brain, Languages, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MiniAssistant({ onClose }) {
  const [listening, setListening] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Ask me anything...");
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef(null);
  const selectedVoice = useRef(null);

  // 🌐 Initialize voices
  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    selectedVoice.current =
      voices.find((v) => v.name.includes("Female")) || voices[0];
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      selectedVoice.current =
        voices.find((v) => v.name.includes("Female")) || voices[0];
    };
  }, []);

  // 🎤 Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setResponse("Speech recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "Hindi" ? "hi-IN" : "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setResponse(language === "Hindi" ? "सुन रहा हूँ..." : "Listening...");
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      handleUserInput(transcript);
    };

    recognition.onerror = (e) => {
      setListening(false);
      setResponse(`Error: ${e.error}`);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, [language]);

  // 🎧 Speak Function
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = selectedVoice.current;
    utter.rate = 1;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  // 💡 Handle Query Logic
  const handleUserInput = async (userInput) => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    let res = "";
    const input = userInput.toLowerCase();

    if (input.includes("date")) {
      const today = new Date().toLocaleDateString(
        language === "Hindi" ? "hi-IN" : "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      );
      res =
        language === "Hindi"
          ? `आज की तारीख है ${today}`
          : `Today's date is ${today}`;
    } else if (input.includes("quote")) {
      const quotes =
        language === "Hindi"
          ? [
              "मन ही सब कुछ है। जो आप सोचते हैं, वही आप बन जाते हैं।",
              "शांति भीतर से आती है। इसे बाहर मत ढूंढो।",
            ]
          : [
              "The mind is everything. What you think, you become.",
              "Peace comes from within. Do not seek it without.",
            ];
      res =
        language === "Hindi"
          ? `आपके लिए एक प्रेरणादायक संदेश: ${
              quotes[Math.floor(Math.random() * quotes.length)]
            }`
          : `Here's an inspirational quote: ${
              quotes[Math.floor(Math.random() * quotes.length)]
            }`;
    } else {
      res =
        language === "Hindi"
          ? "मैं आपकी मदद करने के लिए तैयार हूं।"
          : "I'm here to help you with that.";
    }

    setResponse(res);
    speak(res);
    setIsLoading(false);
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    handleUserInput(query);
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) recognitionRef.current.start();
  };

  const toggleLanguage = () => {
    const newLang = language === "English" ? "Hindi" : "English";
    setLanguage(newLang);
    const msg =
      newLang === "Hindi"
        ? "भाषा हिंदी में बदल गई है"
        : "Language changed to English";
    speak(msg);
    setResponse(msg);
  };

  return (
    <motion.div
      drag
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 right-6 w-80 bg-white border border-gray-300 rounded-2xl shadow-xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1 rounded-lg">
            <Brain size={16} />
          </div>
          <span className="font-semibold text-sm">Guru Mini AI</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={toggleLanguage}
            className="p-1.5 hover:bg-white/20 rounded-lg"
            title="Switch Language"
          >
            <Languages size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 text-center">
        <div
          className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${
            listening
              ? "bg-green-500"
              : isLoading
              ? "bg-purple-500"
              : "bg-blue-500"
          }`}
        >
          {isLoading ? (
            <Loader2 size={20} className="text-white animate-spin" />
          ) : (
            <Brain size={20} className="text-white" />
          )}
        </div>
        <p className="text-sm text-gray-700 min-h-[40px]">{response}</p>
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-200 p-3 bg-gray-50"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            language === "Hindi" ? "कुछ पूछें..." : "Ask something..."
          }
          className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={startListening}
          className={`p-2 rounded-lg ${
            listening
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Mic size={16} />
        </button>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}
