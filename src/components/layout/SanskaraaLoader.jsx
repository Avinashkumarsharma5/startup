import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const messages = [
  "Invoking divine energies...",
  "Preparing sacred rituals...",
  "Aligning traditions...",
  "Blessing your journey..."
];

const SanskaraaLoader = () => {
  const reduceMotion = useReducedMotion();
  const [msgIndex, setMsgIndex] = useState(0);

  /* 🔁 Rotate messages */
  useEffect(() => {
    const i = setInterval(
      () => setMsgIndex((v) => (v + 1) % messages.length),
      3000
    );
    return () => clearInterval(i);
  }, []);

  /* ✨ Sacred floating particles */
  const floaters = useMemo(() => {
    const symbols = ["•", "◦", "○"];
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 10,
      delay: Math.random() * 4,
      duration: 12 + Math.random() * 6,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: 0.12 + Math.random() * 0.2
    }));
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.9 }}
        className="
          fixed inset-0 z-[9999]
          flex items-center justify-center
          bg-gradient-to-br
          from-[#2b1b14] via-[#3a2418] to-[#1f130d]
          overflow-hidden select-none
        "
      >
        {/* 🌌 Cinematic vignette */}
        <div className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.45))]
        " />

        {/* ✨ Ambient divine glow */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_70%)]"
            animate={{ opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        )}

        {/* 🌬️ Incense-like particles */}
        {!reduceMotion &&
          floaters.map((f) => (
            <motion.span
              key={f.id}
              className="absolute text-[#d4af37]"
              style={{
                left: f.left,
                fontSize: f.size,
                opacity: f.opacity
              }}
              initial={{ y: 260, x: 0 }}
              animate={{
                y: -420,
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, f.opacity, 0]
              }}
              transition={{
                duration: f.duration,
                repeat: Infinity,
                delay: f.delay,
                ease: "easeInOut"
              }}
            >
              {f.symbol}
            </motion.span>
          ))}

        <div className="relative flex flex-col items-center gap-8">

          {/* 🕉️ Sacred Mandala Logo */}
          <div className="relative">

            {/* Outer rotating mandala */}
            <motion.div
              className="
                absolute -inset-6 rounded-full
                border border-dashed border-[#d4af37]/40
                shadow-[0_0_50px_rgba(212,175,55,0.35)]
              "
              animate={{
                rotate: reduceMotion ? 0 : 360,
                scale: [1, 1.04, 1]
              }}
              transition={{
                rotate: { duration: 36, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Inner sacred ring */}
            <motion.div
              className="
                absolute -inset-3 rounded-full
                border border-[#d4af37]/30
              "
              animate={{ rotate: reduceMotion ? 0 : -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo container */}
            <div
              className="
                relative w-40 h-40 rounded-full
                bg-gradient-to-br from-[#3a2418] to-[#1f130d]
                border border-[#d4af37]/40
                flex items-center justify-center
              "
            >
              <motion.img
                src="/images/sanskaraa-logo.png"
                alt="Sanskaraa Logo"
                className="w-20 h-20 object-contain"
                animate={{
                  scale: reduceMotion ? 1 : [0.92, 1.06, 0.92],
                  opacity: [0.85, 1, 0.85],
                  filter: [
                    "drop-shadow(0 0 10px rgba(212,175,55,0.4))",
                    "drop-shadow(0 0 30px rgba(212,175,55,0.9))",
                    "drop-shadow(0 0 10px rgba(212,175,55,0.4))"
                  ]
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          {/* 🏷 Brand */}
          <h1
            className="
              text-2xl tracking-[0.35em] font-light
              bg-gradient-to-r from-[#f5deb3] via-[#d4af37] to-[#f5deb3]
              bg-clip-text text-transparent
            "
          >
            SANSKARAA
          </h1>

          {/* 📜 Tagline */}
          <p className="text-xs tracking-[0.3em] text-[#d4af37]/60 italic">
            Ārambh se Sampūrṇ tak
          </p>

          {/* ⏳ Loader info */}
          <div className="flex flex-col items-center gap-3 mt-1">

            {/* Divine flow progress */}
            <div className="relative w-32 h-1 rounded-full bg-[#3a2418] overflow-hidden">
              <motion.div
                className="
                  absolute inset-y-0 w-12 rounded-full
                  bg-gradient-to-r
                  from-transparent via-[#d4af37] to-transparent
                "
                animate={{ x: ["-50%", "150%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Message */}
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
                className="
                  text-xs tracking-[0.15em]
                  text-[#d4af37]/55
                  text-center min-h-[18px]
                "
              >
                {messages[msgIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SanskaraaLoader;
