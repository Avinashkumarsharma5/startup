/* ----------------- Ultra Elegant Sanskaraa Footer ----------------- */
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
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#3B1F0E] via-[#6B3B1E] to-[#8B4513] text-[#FFD700] px-6 md:px-12 pt-10 pb-6 border-t border-[#FFD700]/30 shadow-[0_-6px_18px_rgba(255,215,0,0.15)]">
      
      {/* Decorative Mandala Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFD700]/30 text-2xl">
        ❂
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <img
              src="images/sanskaraa-logo.png"
              alt="Sanskaraa"
              className="h-11 w-11 drop-shadow-[0_0_8px_rgba(255,215,0,0.45)]"
            />
            <h2 className="text-2xl font-bold tracking-wide">Sanskaraa</h2>
          </div>

          <p className="mt-3 text-sm italic text-[#FFD700]/80 max-w-xs">
            “Ārambh se Sampūrṇ tak – har kadam mein saath!”
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <div
                key={i}
                className="p-2 rounded-full border border-[#FFD700]/40 hover:border-[#FFC107] hover:bg-[#FFD700]/10 transition"
              >
                <Icon className="w-5 h-5 hover:text-[#FFC107]" />
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-sm space-y-3">
          <h3 className="text-base font-semibold text-[#FFC107] mb-2">
            Contact Us
          </h3>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-4 h-4" />
            Ranchi, Jharkhand, India
          </p>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4" />
            <a href="tel:+916201486202" className="hover:text-[#FFC107]">
              +91 6201486202
            </a>
          </p>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:support@sanskaraa.com"
              className="hover:text-[#FFC107]"
            >
              support@sanskaraa.com
            </a>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-center md:items-end gap-3 text-sm">
          <h3 className="text-base font-semibold text-[#FFC107] mb-2">
            Quick Actions
          </h3>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center gap-2 px-4 py-2 border border-[#FFD700]/40 rounded-full hover:bg-[#FFD700]/10 hover:text-[#FFC107] transition"
          >
            Back to Top
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-[#FFD700]/20 my-6"></div>


     
    </footer>
  );
}
