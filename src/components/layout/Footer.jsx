/* ----------------- Footer ----------------- */
import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#5C3A21] to-[#8B4513] text-[#FFD700] py-8 px-6 md:px-12 border-t-2 border-[#FFD700]/40 shadow-inner shadow-[#FFD700]/20 relative z-10">
      
      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 text-center md:text-left">
        
        {/* Logo & Tagline */}
        <div className="md:col-span-1">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <img
              src="src/assets/images/sanskaraa-logo.png"
              alt="Sanskaraa"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-xl tracking-wide">Sanskaraa</span>
          </div>
          <p className="mt-3 italic text-[#FFD700]/80 text-sm">
            "Preserving Traditions. Celebrating Culture."
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-5">
            <Facebook className="w-5 h-5 hover:text-[#FFC107] cursor-pointer transition" />
            <Instagram className="w-5 h-5 hover:text-[#FFC107] cursor-pointer transition" />
            <Twitter className="w-5 h-5 hover:text-[#FFC107] cursor-pointer transition" />
            <Youtube className="w-5 h-5 hover:text-[#FFC107] cursor-pointer transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-lg underline decoration-[#FFD700]/40">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#FFC107] cursor-pointer transition">Home</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Book a Puja</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Pandit Booking</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Puja Kits</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Decorations</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4 text-lg underline decoration-[#FFD700]/40">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#FFC107] cursor-pointer transition">Wedding Puja</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Griha Pravesh</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Satyanarayan Katha</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Festival Puja</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Online Consultation</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-4 text-lg underline decoration-[#FFD700]/40">
            Information
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#FFC107] cursor-pointer transition">About Us</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Terms of Service</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">Refund Policy</li>
            <li className="hover:text-[#FFC107] cursor-pointer transition">FAQs</li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-lg underline decoration-[#FFD700]/40">
            Contact Us
          </h3>
          <p className="text-sm leading-relaxed">
            <MapPin className="inline w-4 h-4 mr-1" /> Patna, Bihar, India <br />
            <Phone className="inline w-4 h-4 mr-1" />{" "}
            <a href="tel:+919876543210" className="hover:text-[#FFC107]">+91 98765 43210</a><br />
            <Mail className="inline w-4 h-4 mr-1" />{" "}
            <a href="mailto:support@sanskaraa.com" className="hover:text-[#FFC107]">support@sanskaraa.com</a>
          </p>

          <div className="mt-5">
            <p className="text-sm mb-2 font-medium">🪔 Subscribe for Ritual Updates:</p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-[#8B4513]/30 border border-[#FFD700]/40 text-[#FFD700] placeholder-[#FFD700]/70 focus:outline-none w-full"
              />
              <button className="bg-[#FFD700] text-[#5C3A21] font-semibold px-4 py-2 rounded-lg hover:bg-[#FFC107] transition w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#FFD700]/30 my-6"></div>

      {/* Trust badges / App links */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-[#FFD700]/70 mb-4">
        <span>🔒 100% Secure Payments</span>
        <span>📦 Free Delivery on Puja Kits</span>
        <span>🙏 Verified Pandits</span>
        <span>🌐 All India Service</span>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#FFD700]/80 gap-20">
        <p>
          © {new Date().getFullYear()} Sanskaraa. Made with{" "}
          <Heart className="inline w-3 h-3 text-[#FFC107]" /> for Indian Traditions.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="underline hover:text-[#FFC107] transition"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
