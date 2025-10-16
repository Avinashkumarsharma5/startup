/* ----------------- Footer ----------------- */
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#5C3A21] to-[#8B4513] text-[#FFD700] py-6 px-8 mt- border-t-2 border-[#FFD700] ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <img
            src="src/assets/images/sanskaraa-logo.png"
            alt="Sanskaraa"
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg">Sanskaraa</span>
        </div>

        {/* Links */}
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-[#FFC107] cursor-pointer">About Us</li>
          <li className="hover:text-[#FFC107] cursor-pointer">Services</li>
          <li className="hover:text-[#FFC107] cursor-pointer">Contact</li>
          <li className="hover:text-[#FFC107] cursor-pointer">Privacy</li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Facebook className="w-5 h-5 hover:text-[#FFC107] cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-[#FFC107] cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-[#FFC107] cursor-pointer" />
        </div>
      </div>

      <p className="text-center text-xs mt-10 text-[#FFD700]/80">
        &copy; 2025 Sanskaraa. All Rights Reserved.
      </p>
    </footer>
  );
}