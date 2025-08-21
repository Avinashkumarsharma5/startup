import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Create an account
          </h2>

          <form className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
              <FcGoogle size={22} />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
              <FaFacebook size={22} className="text-blue-600" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
              <FaApple size={22} />
            </button>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 p-6">
          <img
            src="/illustration.png" // apna logo/ritual theme yaha laga lena
            alt="Sanskaraa Illustration"
            className="w-4/5 h-4/5 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
