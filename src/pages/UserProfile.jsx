import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && storedUser.isLoggedIn) {
      setUser(storedUser);
    } else {
      navigate("/login"); // ⚡ agar login nahi hai toh redirect
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // ✅ remove auth data
    navigate("/login");
  };

  if (!user) return null; // jab tak user load ho raha hai

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {user.name} 👋
        </h2>
        <p className="text-gray-600 mb-6">{user.email}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
