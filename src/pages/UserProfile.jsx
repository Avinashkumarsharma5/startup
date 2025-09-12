import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-orange-50 p-6 mt-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user.name}</h2>
        <p className="text-gray-700 mb-2">Email: {user.email}</p>
        <p className="text-gray-700 mb-6">Role: {user.role}</p>

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
