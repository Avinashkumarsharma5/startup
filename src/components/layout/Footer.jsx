/* ----------------- Elegant Sanskaraa Footer (Fixed Bottom Style) ----------------- */
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#4E2A12] via-[#6B3B1E] to-[#8B4513] text-[#FFD700] pt-8 pb-4 px-6 md:px-12 border-t border-[#FFD700]/30 shadow-[0_-4px_10px_rgba(255,215,0,0.1)] relative z-10">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8 md:gap-16">
        
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <img
              src="src/assets/images/sanskaraa-logo.png"
              alt="Sanskaraa"
              className="h-10 w-10 object-contain drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]"
            />
            <span className="font-bold text-xl tracking-wide">Sanskaraa</span>
          </div>
          <p className="text-sm italic mt-2 text-[#FFD700]/80 max-w-xs">
            "Ārambh se Sampūrṇ tak – har kadam mein saath!"
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
              <Icon
                key={idx}
                className="w-5 h-5 cursor-pointer hover:text-[#FFC107] transition-transform transform hover:scale-110"
              />
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-sm leading-relaxed space-y-1">
          <p className="flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-4 h-4" /> Patna, Bihar, India
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4" />
            <a
              href="tel:+919876543210"
              className="hover:text-[#FFC107] transition"
            >
              +91 98765 43210
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:support@sanskaraa.com"
              className="hover:text-[#FFC107] transition"
            >
              support@sanskaraa.com
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#FFD700]/20 my-5"></div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#FFD700]/80 gap-3">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Sanskaraa</span>.{" "}
          Made with <Heart className="inline w-3 h-3 text-[#FFC107] animate-pulse" /> for
          Indian Traditions.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="underline underline-offset-4 hover:text-[#FFC107] transition text-sm pb-14"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
