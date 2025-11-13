// src/components/VendorRegistration.jsx
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiCamera, FiFile, FiCheck, FiChevronLeft, FiChevronRight, FiInfo, FiGlobe } from "react-icons/fi";

/**
 * Enhanced Vendor Registration (features added):
 * - OTP verification (simulated)
 * - Autosave Draft (localStorage)
 * - Geolocation autofill
 * - Categorized document uploads (profilePhoto, aadhaar, pan, businessProof, portfolio)
 * - Camera capture (mobile)
 * - IFSC mock lookup autofill (bank name)
 * - Duplicate vendor check by phone
 * - Vendor ID generator
 * - Save & Continue Later
 * - Signature upload
 * - Estimated approval time messaging
 */

export default function VendorRegistration({ role, vendorType, setRole, setServiceProviderType, setShowMore }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({}); // { profilePhoto: [File], aadhaar: [File], pan: [File], business: [File], portfolio: [File], signature: [File] }
  const [previewUrls, setPreviewUrls] = useState({});
  const [language, setLanguage] = useState("english");
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(null); // generated OTP (for dev)
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [ifscBankName, setIfscBankName] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [useLocationLoading, setUseLocationLoading] = useState(false);

  const formRefs = [useRef(null), useRef(null), useRef(null)];

  // tiny mock IFSC map (replace with real API)
  const IFSC_MAP = {
    "SBIN0000123": { bank: "State Bank of India", branch: "Main Branch" },
    "HDFC0000456": { bank: "HDFC Bank", branch: "MG Road" },
    "ICIC0000789": { bank: "ICICI Bank", branch: "Park Street" }
  };

  // translations
  const translations = {
    english: {
      title: "Vendor Registration",
      steps: ["Basic Info", "Services & Documents", "Bank Details"],
      name: "Full Name",
      namePlaceholder: "Enter full name as per PAN card",
      phone: "Phone Number",
      email: "Email Address",
      location: "City / Location",
      vendorType: "Vendor Type",
      services: "Services Offered",
      bankAccount: "Bank Account Number",
      ifsc: "IFSC Code",
      additionalInfo: "Additional Information",
      next: "Next",
      back: "Back",
      submit: "Submit",
      preview: "Preview",
      success: "Registration Successful!",
      saveDraft: "Save & Continue Later",
      otpSend: "Send OTP",
      otpVerify: "Verify OTP",
      useLocation: "Use My Current Location",
      vendorIdLabel: "Vendor ID"
    },
    hindi: {
      title: "विक्रेता पंजीकरण",
      steps: ["मूल जानकारी", "सेवाएं और दस्तावेज़", "बैंक विवरण"],
      name: "पूरा नाम",
      namePlaceholder: "पैन कार्ड के अनुसार पूरा नाम दर्ज करें",
      phone: "फोन नंबर",
      email: "ईमेल पता",
      location: "शहर / स्थान",
      vendorType: "विक्रेता प्रकार",
      services: "प्रदान की जाने वाली सेवाएं",
      bankAccount: "बैंक खाता नंबर",
      ifsc: "आईएफएससी कोड",
      additionalInfo: "अतिरिक्त जानकारी",
      next: "अगला",
      back: "पिछला",
      submit: "जमा करें",
      preview: "पूर्वावलोकन",
      success: "पंजीकरण सफल!",
      saveDraft: "ड्राफ्ट सहेजें",
      otpSend: "OTP भेजें",
      otpVerify: "OTP सत्यापित करें",
      useLocation: "मौजूदा स्थान उपयोग करें",
      vendorIdLabel: "वेंडर आईडी"
    }
  };
  const t = translations[language];

  // vendor types and services (kept from your original)
  const vendorTypes = [
    { value: "pandit", label: "Pandit Ji", icon: "🕉️" },
    { value: "lighting", label: "Lighting Provider", icon: "💡" },
    { value: "videographer", label: "Videographer / Photographer", icon: "📷" },
    { value: "sound", label: "Sound System", icon: "🔊" },
    { value: "decorator", label: "Flower / Stage Decorator", icon: "🌸" },
    { value: "event_planner", label: "Event Manager / Planner", icon: "📋" },
    { value: "shopkeeper", label: "Shopkeeper / Caterer", icon: "🏪" },
    { value: "astrologer", label: "Astrologer / Priest", icon: "🔮" },
    { value: "caterer", label: "Caterer", icon: "🍽️" },
    { value: "transport", label: "Transport Provider", icon: "🚗" }
  ];
  const serviceOptions = [
    "Wedding Ceremonies", "House Warming", "Birthday Pujas", "Festival Events",
    "Mundan Ceremony", "Engagement Events", "Full Event Planning", "Live Streaming",
    "HD Photography", "Drone Shots", "Traditional Decor", "Modern Theme Decor",
    "Catering Services", "Prasad Preparation", "Vedic Rituals", "Horoscope Services"
  ];

  // load draft from localStorage if exists
  const savedDraft = JSON.parse(localStorage.getItem("vendorDraft") || "null");
  const initialValues = savedDraft || {
    name: "",
    phone: "",
    email: "",
    location: "",
    vendorType: vendorType || "",
    services: [],
    bankAccount: "",
    ifsc: "",
    additionalInfo: "",
    experience: "",
    certifications: "",
    pricing: "",
    gst: "",
    vendorId: ""
  };

  // small helper to generate Vendor ID
  const generateVendorId = () => `SKR-VDR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;

  // Validation schemas (texts kept simple)
  const validationSchema = [
    Yup.object({
      name: Yup.string().min(2).max(50).required(t.name + " required"),
      phone: Yup.string().matches(/^\d{10}$/, "Must be 10 digits").required(t.phone + " required"),
      email: Yup.string().email("Invalid email address"),
      location: Yup.string().required(t.location + " required"),
    }),
    Yup.object({
      vendorType: Yup.string().required(t.vendorType + " required"),
      services: Yup.array().min(1, "Select at least one service"),
      experience: Yup.number().min(0).max(50).required("Experience required"),
    }),
    Yup.object({
      bankAccount: Yup.string().matches(/^\d{9,18}$/, "Invalid account number").required(t.bankAccount + " required"),
      ifsc: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code").required(t.ifsc + " required"),
    }),
  ];

  useEffect(() => {
    // If saved draft exists, ensure vendorId exists
    if (savedDraft && !savedDraft.vendorId) {
      savedDraft.vendorId = generateVendorId();
      localStorage.setItem("vendorDraft", JSON.stringify(savedDraft));
    }
  }, []); // run once

  // Auto-focus first field on step change
  useEffect(() => {
    if (formRefs[step - 1]?.current) {
      const firstInput = formRefs[step - 1].current.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }, [step]);

  // Handle file changes with preview & validation (categorized)
  const handleFileChange = (e, key, single = false) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 5MB.`);
        return false;
      }
      return true;
    });
    setFiles(prev => {
      const next = { ...prev };
      if (single) next[key] = validFiles.slice(0, 1);
      else next[key] = [...(next[key] || []), ...validFiles];
      return next;
    });

    // preview for images
    if (validFiles.length > 0) {
      const file = validFiles[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreviewUrls(prev => ({ ...prev, [key]: ev.target.result }));
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (key, index) => {
    setFiles(prev => {
      const updated = { ...prev };
      if (!updated[key]) return prev;
      updated[key] = updated[key].filter((_, i) => i !== index);
      if (updated[key].length === 0) delete updated[key];
      return updated;
    });
    if (key === "profilePhoto") setPreviewUrls(prev => ({ ...prev, profilePhoto: null }));
    if (key === "signature") setPreviewUrls(prev => ({ ...prev, signature: null }));
  };

  // Drag-drop handlers (reused)
  const handleDrop = (e, key, single = false) => {
    e.preventDefault();
    e.stopPropagation();
    const fileList = Array.from(e.dataTransfer.files);
    const mock = { target: { files: fileList } };
    handleFileChange(mock, key, single);
  };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };

  // OTP simulation: generate and 'send'
  const sendOtp = (phone) => {
    if (!/^\d{10}$/.test(phone)) { alert("Enter a valid 10-digit phone first."); return; }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setOtpSent(true);
    setOtpVerified(false);
    // In production: call SMS API here
    alert(`(DEV) OTP for ${phone}: ${code} — use it to verify`);
  };

  const verifyOtp = () => {
    if (otpInput === otpCode) {
      setOtpVerified(true);
      alert("OTP verified!");
    } else {
      alert("Invalid OTP.");
    }
  };

  // Save draft to localStorage
  const saveDraft = async (values) => {
    setSavingDraft(true);
    const draft = {
      ...values,
      filesMeta: Object.keys(files).reduce((acc, k) => {
        acc[k] = (files[k] || []).map(f => ({ name: f.name, size: f.size, type: f.type }));
        return acc;
      }, {}),
      vendorId: values.vendorId || generateVendorId(),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem("vendorDraft", JSON.stringify(draft));
    setTimeout(() => setSavingDraft(false), 400);
    alert("Draft saved locally. You can continue later.");
  };

  // Duplicate check by phone (simple)
  const checkDuplicate = (phone) => {
    const regs = JSON.parse(localStorage.getItem("vendorRegistrations") || "[]");
    const found = regs.find(r => r.phone === phone);
    if (found) {
      setDuplicateWarning(`An account already exists for ${phone} (Vendor ID: ${found.vendorId}).`);
    } else {
      setDuplicateWarning("");
    }
  };

  // IFSC lookup (mock)
  const lookupIfsc = (ifsc) => {
    if (!ifsc) { setIfscBankName(""); return; }
    const up = ifsc.toUpperCase();
    if (IFSC_MAP[up]) {
      setIfscBankName(`${IFSC_MAP[up].bank} — ${IFSC_MAP[up].branch}`);
    } else {
      setIfscBankName("");
    }
  };

  // Geolocation autofill
  const useMyLocation = async (setFieldValue) => {
    if (!navigator.geolocation) { alert("Geolocation not supported by browser."); return; }
    setUseLocationLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      // Try a simple reverse geocode with a public endpoint would be ideal.
      // For offline/dev: we will fill lat/lng & a placeholder location.
      const locStr = `Lat:${latitude.toFixed(3)},Lng:${longitude.toFixed(3)}`;
      setFieldValue("location", locStr);
      alert("Location filled (lat/lng). Replace with full address using reverse-geocoding API in production.");
      setUseLocationLoading(false);
    }, (err) => {
      alert("Could not access location: " + err.message);
      setUseLocationLoading(false);
    });
  };

  // handle final submit
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!otpVerified) {
      alert("Please verify your phone with OTP before final submission.");
      setSubmitting(false);
      return;
    }
    // basic files check: require profilePhoto and one ID doc
    if (!(files.profilePhoto && files.profilePhoto.length > 0) || !(files.aadhaar || files.pan)) {
      alert("Please upload a profile photo and at least one ID document (Aadhaar or PAN).");
      setSubmitting(false);
      return;
    }

    try {
      // prepare registration object (in real app, send formData to backend)
      const regs = JSON.parse(localStorage.getItem("vendorRegistrations") || "[]");
      // duplicate check
      if (regs.some(r => r.phone === values.phone)) {
        alert("An account with this phone already exists.");
        setSubmitting(false);
        return;
      }

      const vendorId = values.vendorId || generateVendorId();
      const registration = {
        ...values,
        vendorId,
        filesMeta: Object.keys(files).reduce((acc, k) => {
          acc[k] = (files[k] || []).map(f => f.name);
          return acc;
        }, {}),
        ifscBankName,
        status: "pending",
        submittedAt: new Date().toISOString(),
        estimatedApproval: new Date(Date.now() + 48 * 3600 * 1000).toISOString() // 48 hours
      };

      regs.push(registration);
      localStorage.setItem("vendorRegistrations", JSON.stringify(regs));
      // clear draft
      localStorage.removeItem("vendorDraft");

      setSubmitted(true);
      setShowPreview(false);
      resetForm();
      setFiles({});
      setPreviewUrls({});
      setOtpSent(false);
      setOtpCode(null);
      setOtpInput("");
      setOtpVerified(false);
      alert(`Registration submitted. Your Vendor ID: ${vendorId}. Estimated review: within 48 hours.`);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // autosave: whenever files or language change, keep draft updated
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDraft = JSON.parse(localStorage.getItem("vendorDraft") || "null");
      if (currentDraft) {
        // update timestamp only
        currentDraft.savedAt = new Date().toISOString();
        localStorage.setItem("vendorDraft", JSON.stringify(currentDraft));
      }
    }, 30000); // update savedAt every 30s if draft exists
    return () => clearInterval(interval);
  }, []);

  // Progress Steps UI
  const ProgressSteps = () => (
    <div className="flex justify-between mb-8 relative px-4 md:px-12">
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10 mx-10 md:mx-20">
        <motion.div 
          className="h-full bg-amber-600"
          initial={{ width: "0%" }}
          animate={{ width: `${((step - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex flex-col items-center z-20 w-1/3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-300 ${
            stepNum < step ? "bg-green-500" : 
            stepNum === step ? "bg-amber-600 scale-110" : "bg-gray-300"
          }`}>
            {stepNum < step ? <FiCheck /> : stepNum}
          </div>
          <span className={`text-xs sm:text-sm mt-2 text-center ${stepNum === step ? "text-amber-600 font-bold" : "text-gray-500"}`}>
            {t.steps[stepNum - 1]}
          </span>
        </div>
      ))}
    </div>
  );

  const SuccessAnimation = () => (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-12">
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} className="text-6xl mb-4">🎉</motion.div>
      <h3 className="text-2xl font-bold text-green-600 mb-4">{t.success}</h3>
      <p className="text-gray-600">Your registration is under review. Estimated approval within 24–48 hours. We'll contact you soon!</p>
    </motion.div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl w-full">
          <SuccessAnimation />
        </div>
      </div>
    );
  }

  // Preview component (small adjustments to mask account)
  const PreviewComponent = ({ values }) => (
    <div className="space-y-4 text-gray-700">
      <h3 className="text-xl font-bold text-amber-700 border-b pb-2 mb-4">1. {t.steps[0]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        <p><strong>{t.name}:</strong> {values.name}</p>
        <p><strong>{t.phone}:</strong> {values.phone}</p>
        <p><strong>{t.email}:</strong> {values.email || 'N/A'}</p>
        <p><strong>{t.location}:</strong> {values.location}</p>
      </div>

      <h3 className="text-xl font-bold text-amber-700 border-b pb-2 mb-4 pt-4">2. {t.steps[1]}</h3>
      <p><strong>{t.vendorType}:</strong> {vendorTypes.find(t => t.value === values.vendorType)?.label || 'N/A'}</p>
      <p><strong>Experience:</strong> {values.experience || 'N/A'} {values.experience && 'Years'}</p>
      <p><strong>{t.services}:</strong> <span className="block mt-1 p-2 bg-gray-100 rounded-lg">{values.services.join(', ') || 'None selected'}</span></p>
      <p><strong>Documents:</strong> <span className="block mt-1 p-2 bg-gray-100 rounded-lg">{Object.values(files).flat().map(f => f.name).join(', ') || 'No files uploaded'}</span></p>
      
      <h3 className="text-xl font-bold text-amber-700 border-b pb-2 mb-4 pt-4">3. {t.steps[2]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>{t.bankAccount}:</strong> {values.bankAccount ? `${values.bankAccount.slice(0,4)}...${values.bankAccount.slice(-4)}` : 'N/A'}</p>
        <p><strong>{t.ifsc}:</strong> {values.ifsc} {ifscBankName && <span className="text-xs text-gray-500"> — {ifscBankName}</span>}</p>
      </div>
      <p><strong>{t.additionalInfo}:</strong> <span className="block mt-1 p-2 bg-gray-100 rounded-lg whitespace-pre-wrap">{values.additionalInfo || 'N/A'}</span></p>
      <p className="text-sm text-gray-600">Estimated review time: <strong>24–48 hours</strong>. Your Vendor ID will be shared after approval.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 sm:p-6 flex justify-center">
      <div className="max-w-4xl mx-auto w-full mt-12 mb-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => { setRole(null); setServiceProviderType(null); setShowMore(false); }} className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition">
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-4">
            <button onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')} className="p-3 rounded-full bg-white shadow-lg flex items-center gap-2 text-gray-700 text-sm hover:bg-gray-100 transition">
              <FiGlobe className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'english' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 text-gray-800">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-amber-700 mb-2 font-serif">{t.title}</h2>
          <p className="text-center text-sm mb-4 text-gray-500">{t.steps[step - 1]}</p>
          <ProgressSteps />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, isValid, dirty, isSubmitting, resetForm }) => (
              <>
                <Form id="vendor-form" className="space-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: (step > 1 ? 50 : -50) }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: (step > 1 ? -50 : 50) }} transition={{ duration: 0.3 }}>
                      {/* Step 1 */}
                      {step === 1 && (
                        <div ref={formRefs[0]} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.name} <FiInfo className="inline ml-1 text-gray-400" title="As per official documents" /></label>
                            <Field name="name" placeholder={t.namePlaceholder} className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all shadow-sm" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
                            <div className="flex gap-2">
                              <Field name="phone" type="tel" placeholder="10-digit mobile number" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" onBlur={(e) => { checkDuplicate(e.target.value); }} />
                              <button type="button" onClick={() => sendOtp(values.phone)} disabled={!/^\d{10}$/.test(values.phone)} className="px-3 py-2 bg-amber-600 text-white rounded-xl"> {t.otpSend} </button>
                            </div>
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            {duplicateWarning && <div className="text-yellow-600 text-sm mt-2">{duplicateWarning}</div>}
                            {/* OTP Input */}
                            {otpSent && !otpVerified && (
                              <div className="mt-3 flex gap-2 items-center">
                                <input value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP" className="px-3 py-2 border rounded-xl w-40" />
                                <button type="button" onClick={verifyOtp} className="px-3 py-2 bg-green-600 text-white rounded-xl"> {t.otpVerify} </button>
                                <button type="button" onClick={() => sendOtp(values.phone)} className="px-2 py-1 text-sm text-gray-600">Resend</button>
                              </div>
                            )}
                            {otpVerified && <div className="text-green-600 mt-2">Phone verified ✓</div>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                            <Field name="email" type="email" placeholder="optional@email.com" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.location}</label>
                            <div className="flex gap-2">
                              <Field name="location" placeholder="Enter your city or use location" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                              <button type="button" onClick={() => useMyLocation(setFieldValue)} className="px-3 py-2 bg-white border rounded-xl" disabled={useLocationLoading}>{useLocationLoading ? "Locating..." : t.useLocation}</button>
                            </div>
                            <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>
                      )}

                      {/* Step 2 */}
                      {step === 2 && (
                        <div ref={formRefs[1]} className="space-y-6">
                          <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-4">{t.vendorType}</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                              {vendorTypes.map(type => (
                                <motion.button key={type.value} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFieldValue("vendorType", type.value)} className={`p-3 sm:p-4 rounded-xl border-2 shadow-md flex flex-col items-center justify-center transition-all min-h-[90px] ${values.vendorType === type.value ? "border-amber-500 bg-amber-100 text-amber-700" : "border-gray-300 bg-gray-50 hover:border-amber-300"}`}>
                                  <div className="text-2xl sm:text-3xl mb-1">{type.icon}</div>
                                  <div className="text-xs sm:text-sm font-medium text-center">{type.label}</div>
                                </motion.button>
                              ))}
                            </div>
                            <Field name="vendorType" type="hidden" />
                            <ErrorMessage name="vendorType" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-3">{t.services}</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-3 border rounded-xl bg-gray-50 shadow-inner">
                              {serviceOptions.map(service => (
                                <label key={service} className="flex items-center space-x-3 p-1 hover:bg-white rounded-lg cursor-pointer transition">
                                  <Field type="checkbox" name="services" value={service} className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
                                  <span className="text-sm text-gray-700 select-none">{service}</span>
                                </label>
                              ))}
                            </div>
                            <ErrorMessage name="services" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                              <Field name="experience" type="number" placeholder="e.g., 5" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                              <Field name="certifications" placeholder="Awards & certifications (Optional)" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                            </div>
                          </div>

                          {/* Document Uploads (categorized) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo (Camera friendly)</label>
                              <div onDrop={(e) => handleDrop(e, "profilePhoto", true)} onDragOver={handleDragOver} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-50 min-h-[160px] flex flex-col justify-center items-center" onClick={() => document.getElementById('profilePhoto').click()}>
                                <input id="profilePhoto" type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, "profilePhoto", true)} className="hidden" />
                                {previewUrls.profilePhoto ? (
                                  <div className="relative">
                                    <img src={previewUrls.profilePhoto} alt="Preview" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-300 shadow-lg" />
                                    <button type="button" onClick={(ev) => { ev.stopPropagation(); removeFile("profilePhoto", 0); setPreviewUrls(prev => ({ ...prev, profilePhoto: null })); }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">✕</button>
                                  </div>
                                ) : (
                                  <>
                                    <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 font-medium">Click or take profile photo</p>
                                    <p className="text-xs text-gray-500 mt-1">Max 5MB • JPG, PNG</p>
                                  </>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">ID Documents (Aadhaar / PAN)</label>
                              <div className="grid grid-cols-1 gap-3">
                                <div onDrop={(e) => handleDrop(e, "aadhaar", true)} onDragOver={handleDragOver} className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 cursor-pointer" onClick={() => document.getElementById('aadhaar').click()}>
                                  <input id="aadhaar" type="file" accept="image/*,.pdf" capture="environment" onChange={(e) => handleFileChange(e, "aadhaar", true)} className="hidden" />
                                  <div className="text-sm">Upload Aadhaar (front/back) • JPG, PNG, PDF</div>
                                </div>
                                <div onDrop={(e) => handleDrop(e, "pan", true)} onDragOver={handleDragOver} className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 cursor-pointer" onClick={() => document.getElementById('pan').click()}>
                                  <input id="pan" type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "pan", true)} className="hidden" />
                                  <div className="text-sm">Upload PAN • JPG, PNG, PDF</div>
                                </div>
                                <div onDrop={(e) => handleDrop(e, "business", false)} onDragOver={handleDragOver} className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 cursor-pointer" onClick={() => document.getElementById('business').click()}>
                                  <input id="business" type="file" accept="image/*,.pdf" multiple onChange={(e) => handleFileChange(e, "business", false)} className="hidden" />
                                  <div className="text-sm">Business Proof (optional)</div>
                                </div>
                              </div>

                              {/* selected files list */}
                              <div className="space-y-2 mt-3">
                                {Object.entries(files).map(([k, arr]) => (
                                  arr.map((f, idx) => (
                                    <div key={`${k}-${idx}`} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm text-sm">
                                      <div className="truncate">{k} • {f.name}</div>
                                      <button type="button" onClick={() => removeFile(k, idx)} className="text-red-500">✕</button>
                                    </div>
                                  ))
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3 */}
                      {step === 3 && (
                        <div ref={formRefs[2]} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{t.bankAccount}</label>
                              <Field name="bankAccount" placeholder="Enter full account number" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all shadow-sm" />
                              <ErrorMessage name="bankAccount" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{t.ifsc} <FiInfo className="inline ml-1 text-gray-400" title="Format: ABCD0123456" /></label>
                              <div className="flex gap-2">
                                <Field name="ifsc" placeholder="e.g., SBIN0000123 (CAPS)" onBlur={(e) => lookupIfsc(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all shadow-sm" />
                                <div className="px-3 py-2 rounded-xl border bg-white text-sm">{ifscBankName || 'Bank not found'}</div>
                              </div>
                              <ErrorMessage name="ifsc" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (Optional)</label>
                            <Field name="gst" placeholder="Optional GSTIN" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Signature (Optional)</label>
                            <div onClick={() => document.getElementById('signature').click()} className="border-2 border-dashed p-4 rounded-xl text-center bg-gray-50 cursor-pointer">
                              <input id="signature" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "signature", true)} className="hidden" />
                              {previewUrls.signature ? <img src={previewUrls.signature} alt="sig" className="mx-auto w-48" /> : <div className="text-sm">Upload signature image (PNG/JPG)</div>}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Information (Optional)</label>
                            <Field name="pricing" as="textarea" rows={3} placeholder="Describe your pricing structure, packages, etc." className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.additionalInfo} (Optional)</label>
                            <Field name="additionalInfo" as="textarea" rows={4} placeholder="Any additional information about your services..." className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div>
                      {step > 1 && (
                        <motion.button type="button" onClick={() => setStep(s => s - 1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors text-sm sm:text-base">
                          <FiChevronLeft />
                          {t.back}
                        </motion.button>
                      )}
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <button type="button" onClick={() => saveDraft(values)} className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-amber-500 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 text-sm sm:text-base">{savingDraft ? "Saving..." : t.saveDraft}</button>

                      {step === 3 && (
                        <motion.button type="button" onClick={() => setShowPreview(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={!isValid} className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors text-sm sm:text-base">
                          {t.preview}
                        </motion.button>
                      )}

                      {step < 3 ? (
                        <motion.button type="button" onClick={() => { if (isValid) setStep(s => s + 1); else alert("Please complete required fields."); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors text-sm sm:text-base">
                          {t.next}
                          <FiChevronRight />
                        </motion.button>
                      ) : (
                        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isSubmitting || !isValid || !otpVerified} className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors text-sm sm:text-base">
                          {t.submit}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </Form>

                {/* Preview Modal */}
                <AnimatePresence>
                  {showPreview && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowPreview(false)}>
                      <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} transition={{ duration: 0.3 }} className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">Registration Preview</h2>
                        <PreviewComponent values={values} />
                        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-4 border-t">
                          <motion.button type="button" onClick={() => setShowPreview(false)} className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"> {t.back} </motion.button>
                          <motion.button type="button" onClick={() => { setShowPreview(false); document.getElementById('vendor-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }} className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"> Confirm Submission </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Formik>

          {/* estimated approval / vendor id area */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <div>{t.vendorIdLabel}: <strong>{(savedDraft && savedDraft.vendorId) || "Assigned after submission"}</strong></div>
            <div className="mt-2">Estimated review time: <strong>24–48 hours</strong> — we'll verify your documents and contact you.</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
