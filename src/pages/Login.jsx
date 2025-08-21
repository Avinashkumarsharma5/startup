import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 flex items-center justify-center">
      
      {/* Portrait Login Card */}
      <div className="w-full max-w-md bg-[#5c2b1d] rounded-2xl shadow-2xl flex flex-col items-center p-10">
        
        {/* Logo + Name */}
        <div className="flex items-center space-x-2 mb-8">
          <img
            src="/sanskaraa-logo.png"
            alt="Sanskaraa Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-3xl font-bold text-white">Sanskaraa</h1>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-semibold text-white mb-10">Log In</h2>

        {/* Form */}
        <form className="w-full space-y-6">
          <input
            type="text"
            placeholder="Phone number or email"
            className="w-full px-5 py-4 rounded-lg bg-transparent border border-yellow-500 text-white placeholder:text-yellow-200 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-lg bg-transparent border border-yellow-500 text-white placeholder:text-yellow-200 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <div className="text-right">
            <a href="#" className="text-yellow-300 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#5c2b1d] font-semibold py-4 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Sign Up */}
        <p className="mt-10 text-center text-sm text-white">
          Don’t have an account?{" "}
          <a href="#" className="text-yellow-400 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
