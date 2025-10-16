// src/pages/ForgetPassword.jsx
import React, { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setEmail("");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
                <h2 className="text-2xl font-bold text-maroon mb-6 text-center">Forgot Password</h2>

                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center mb-4 bg-green-100 p-4 rounded-lg text-green-800"
                        >
                            <CheckCircle className="w-6 h-6 mb-2" />
                            <p className="text-center text-sm">Password reset link sent successfully!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-maroon hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <a href="/login" className="text-maroon font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
