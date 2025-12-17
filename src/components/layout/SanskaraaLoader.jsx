import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const messages = [
  "Preparing sacred services…",
  "Arranging divine experiences…",
  "Connecting traditions with technology…"
];

const SanskaraaLoader = () => {
  const reduceMotion = useReducedMotion();
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  /* ⏱ Auto hide loader after 4 sec */
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  /* 🔔 Soft temple bell */
  useEffect(() => {
    const audio = new Audio("/sounds/temple-bell.mp3");
    audio.volume = 0.12;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  /* 🔁 Message rotation */
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ✨ Floating particles */
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        left: `${Math.random() * 100}%`,
        duration: 6 + Math.random() * 3,
        delay: Math.random() * 2
      })),
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-gradient-to-b from-[#1a0505] via-[#3a0a0a] to-[#000]
          overflow-hidden"
        >
          {/* 🌬 Soft breathing background */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 bg-amber-500/5"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* ✨ Floating particles */}
          {!reduceMotion &&
            particles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-amber-300/20 text-xl select-none"
                initial={{ y: 260, opacity: 0 }}
                animate={{ y: -280, opacity: [0, 0.7, 0] }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay
                }}
                style={{ left: p.left }}
              >
                ✦
              </motion.span>
            ))}

          {/* 🔱 Center Content */}
          <div className="relative flex flex-col items-center gap-7 text-center">

            {/* 🌕 Divine glow */}
            {!reduceMotion && (
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-amber-400/20 blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* 🕉 Static Logo */}
            <motion.img
              src="/images/sanskaraa-logo.png"
              alt="Sanskaraa Logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative w-24 h-24 object-contain
              drop-shadow-[0_0_30px_rgba(255,191,0,0.85)]"
            />

            {/* 🏷 Brand */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-semibold tracking-[0.25em] text-amber-200"
            >
              Sanskaraa
            </motion.h1>

            {/* ✨ Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm tracking-widest text-amber-300/80"
            >
              Ārambh se Sampūrṇ tak…
            </motion.p>

            {/* ⏳ Status Text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[11px] text-amber-300/60 tracking-widest"
              >
                {messages[msgIndex]}
              </motion.span>
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SanskaraaLoader;
