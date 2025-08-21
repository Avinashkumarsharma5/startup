import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-50 to-orange-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo + About */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="/sanskaraa-logo.png" alt="Sanskaraa Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-orange-600">Sanskaraa</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0 text-sm font-medium">
          <a href="/" className="hover:text-orange-600">Home</a>
          <a href="/services" className="hover:text-orange-600">Services</a>
          <a href="/book" className="hover:text-orange-600">Book Pandit</a>
          <a href="/contact" className="hover:text-orange-600">Contact</a>
          <a href="/about" className="hover:text-orange-600">About</a>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-orange-600"><Facebook size={20} /></a>
          <a href="#" className="hover:text-orange-600"><Instagram size={20} /></a>
          <a href="#" className="hover:text-orange-600"><Twitter size={20} /></a>
          <a href="#" className="hover:text-orange-600"><Youtube size={20} /></a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} Sanskaraa. All Rights Reserved.
      </div>
    </footer>
  );
}
