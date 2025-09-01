import React, { useEffect, useState, useRef } from "react";
import { Mic, X } from "lucide-react";
import { motion } from "framer-motion";

export default function VoiceAssistant({ onClose }) {
  const [listening, setListening] = useState(false);
  const [content, setContent] = useState("Listening...");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setContent(transcript);
      speakThis(transcript);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    // Start listening once
    startListening();

    // Cleanup on unmount
    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        console.warn("Recognition already started");
      }
    }
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  };

  const speakThis = (message) => {
    let response = "I did not understand, please try again";
    if (message.includes("hello")) response = "Hello Avinash";
    else if (message.includes("how are you")) response = "I am fine Avinash, how can I help you?";
    else if (message.includes("your name")) response = "My name is Guru, your Sanskaraa assistant";
    speak(response);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, bottom: window.innerHeight - 200, left: 0, right: window.innerWidth - 250 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-20 right-6 w-64 bg-white rounded-xl shadow-xl p-4 z-50 cursor-grab"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Guru Assistant</h3>
        <button onClick={onClose}><X /></button>
      </div>
      <div className="h-16 bg-gray-100 rounded-md p-2 text-sm overflow-y-auto">{content}</div>
      <button
        onClick={startListening}
        className={`w-full mt-2 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 ${
          listening ? "animate-pulse" : ""
        }`}
      >
        <Mic /> {listening ? "Listening..." : "Start Listening"}
      </button>
    </motion.div>
  );
}
