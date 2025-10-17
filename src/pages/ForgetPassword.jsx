// src/pages/ForgetPassword.jsx
import React, { useState } from "react";
import { Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
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

        // API-ready reset simulation
        setLoading(true);
        try {
            // Simulate API call - replace with actual API endpoint
            const response = await fetch("/api/send-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            
            setLoading(false);
            setSuccess(true);
            setEmail("");
            
            // Show success toast
            toast.success("Reset link sent successfully! Check your email.");
            
        } catch (error) {
            setLoading(false);
            setError("Failed to send reset link. Please try again.");
            toast.error("Failed to send reset link. Please try again.");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E1] via-[#FFE4B5] to-[#FFD580] overflow-hidden p-4">
            {/* Mandala Background */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/src/assets/images/mandala-bg.png"
                    alt=""
                    className="absolute opacity-10 w-[600px] h-[600px] top-10 right-10 animate-spin-slow"
                />
                <img
                    src="/src/assets/images/mandala-bg.png"
                    alt=""
                    className="absolute opacity-5 w-[500px] h-[500px] -bottom-20 -left-20 animate-spin-slow"
                    style={{ animationDirection: 'reverse', animationDuration: '100s' }}
                />
            </div>

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#5C3A21',
                        color: '#fff',
                    },
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md sm:w-96 md:w-[400px]"
            >
                {/* Sanskaraa Branding Header */}
                <div className="flex flex-col items-center mb-8">
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        src="/src/assets/images/sanskaraa-logo.png"
                        alt="Sanskaraa"
                        className="w-14 h-14 object-contain mb-2"
                    />
                    <h1 className="text-2xl font-bold text-[#5C3A21]">Sanskaraa</h1>
                    <p className="text-sm italic text-[#8B4513]/70">"Preserving Traditions. Celebrating Culture."</p>
                </div>

                {/* Premium Glassmorphism Form Card */}
                <div className="bg-white/80 backdrop-blur-md border border-yellow-200 shadow-xl p-6 sm:p-8 rounded-2xl w-full relative">
                    {/* Back Button */}
                    <motion.a
                        href="/login"
                        whileHover={{ x: -2 }}
                        className="flex items-center text-sm text-[#8B4513] hover:text-[#5C3A21] mb-6 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Login
                    </motion.a>

                    {/* Form Header with Cultural Touch */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-[#5C3A21] mb-4 flex items-center justify-center gap-2">
                            <img 
                                src="/src/assets/icons/diya.png" 
                                alt="Diya" 
                                className="w-6 h-6" 
                            />
                            Forgot Password
                        </h2>
                        <p className="text-center text-sm text-[#8B4513]/70 mb-6">
                            Enter your registered email to receive a password reset link.
                        </p>
                    </motion.div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center mb-4 bg-green-100 p-4 rounded-lg text-green-800 border border-green-200"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CheckCircle className="w-6 h-6 mb-2" />
                                </motion.div>
                                <p className="text-center text-sm font-medium">Password reset link sent successfully!</p>
                                <p className="text-center text-xs mt-1">Check your email for further instructions</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Reset Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 pr-3 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700] transition-all duration-200"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.button 
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className={`w-full py-3 px-4 bg-gradient-to-r from-[#8B4513] to-[#5C3A21] hover:from-[#5C3A21] hover:to-[#8B4513] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader2 className="w-4 h-4" />
                                    </motion.div>
                                    Sending Reset Link...
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Mail className="w-4 h-4" />
                                    </motion.div>
                                    Send Reset Link
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Support Links */}
                    <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
                        <p>
                            Remember your password?{" "}
                            <a href="/login" className="text-[#8B4513] font-semibold hover:underline transition-colors">
                                Login
                            </a>
                        </p>
                        <p>
                            Need help?{" "}
                            <a href="/contact" className="text-[#8B4513] font-semibold hover:underline transition-colors">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}