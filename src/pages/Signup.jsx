import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!agree) {
      setError("Please accept terms & conditions");
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Account created successfully!");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <p className="text-sm text-gray-600">
                I agree to the <span className="text-orange-500 font-medium">Terms & Conditions</span>
              </p>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full ${
                agree ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
              } text-white font-medium py-3 rounded-lg transition`}
              disabled={!agree}
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
            src="/illustration.png"
            alt="Sanskaraa Illustration"
            className="w-4/5 h-4/5 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
