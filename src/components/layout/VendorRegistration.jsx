// src/components/VendorRegistration.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiCamera, FiFile, FiCheck, FiChevronLeft, FiChevronRight, FiInfo, FiGlobe } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { requireSupabase } from "../../lib/supabase";
import { getCurrentUser } from "../../lib/supabaseAuth";
import { createVendorApplication, findExistingVendorApplicationForUser } from "../../lib/vendors";

function readVendorDraft(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const { bankAccount: _discardedBankAccount, ...safeDraft } = value;
    return safeDraft;
  } catch {
    return null;
  }
}

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

export default function VendorRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({}); // { profilePhoto: [File], aadhaar: [File], pan: [File], business: [File], portfolio: [File], signature: [File] }
  const [previewUrls, setPreviewUrls] = useState({});
  const [language, setLanguage] = useState("english");
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [application, setApplication] = useState(null);
  const [applicationLoading, setApplicationLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [ifscBankName, setIfscBankName] = useState("");
  const [useLocationLoading, setUseLocationLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const draftKey = `vendorDraft:${currentUser?.id || "guest"}`;
  const [savedDraft, setSavedDraft] = useState(() => readVendorDraft(draftKey));

  useEffect(() => {
    let active = true;
    const loadApplication = async () => {
      try {
        const user = await getCurrentUser();
        if (!active) return;
        if (!user?.id) {
          setApplicationLoading(false);
          return;
        }
        setCurrentUser(user);
        const existing = await findExistingVendorApplicationForUser(user.id);
        if (active) setApplication(existing);
      } catch (error) {
        console.error("Unable to load vendor application:", error);
        if (active) toast.error("Your vendor application status could not be loaded.");
      } finally {
        if (active) setApplicationLoading(false);
      }
    };

    loadApplication();
    return () => { active = false; };
  }, []);

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

  // Remove any bank number saved by older versions, then load a safe draft.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && Object.prototype.hasOwnProperty.call(parsed, "bankAccount")) {
        delete parsed.bankAccount;
        localStorage.setItem(draftKey, JSON.stringify(parsed));
      }
    } catch (error) {
      console.warn("Could not restore the vendor application draft.", error);
    }
    setSavedDraft(readVendorDraft(draftKey));
  }, [draftKey]);

  const initialValues = useMemo(() => ({
    name: String(savedDraft?.name ?? application?.name ?? ""),
    phone: String(savedDraft?.phone ?? application?.phone ?? ""),
    email: String(savedDraft?.email ?? application?.email ?? currentUser?.email ?? ""),
    location: String(savedDraft?.location ?? application?.location ?? ""),
    vendorType: String(savedDraft?.vendorType ?? application?.vendorType ?? ""),
    services: Array.isArray(savedDraft?.services) ? savedDraft.services : Array.isArray(application?.services) ? application.services : [],
    bankAccount: "",
    ifsc: String(savedDraft?.ifsc ?? application?.ifsc ?? ""),
    additionalInfo: String(savedDraft?.additionalInfo ?? ""),
    experience: String(savedDraft?.experience ?? application?.experience ?? ""),
    certifications: String(savedDraft?.certifications ?? application?.certifications ?? ""),
    pricing: String(savedDraft?.pricing ?? application?.pricing ?? ""),
    gst: String(savedDraft?.gst ?? ""),
    vendorId: String(savedDraft?.vendorId ?? application?.vendorId ?? ""),
  }), [application, currentUser?.email, savedDraft]);

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
  const completeValidationSchema = validationSchema.reduce(
    (schema, currentSchema) => schema.concat(currentSchema),
    Yup.object()
  );
  const fieldsByStep = [
    ["name", "phone", "email", "location"],
    ["vendorType", "services", "experience"],
    ["bankAccount", "ifsc"],
  ];

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
      const allowed = key === "profilePhoto" || key === "portfolio"
        ? ["image/jpeg", "image/png", "image/webp"]
        : ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(file.type)) {
        alert(`File ${file.name} has an unsupported type.`);
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

  // Save non-sensitive form fields only. Bank numbers and document contents
  // are never stored in browser storage.
  const saveDraft = (values) => {
    setSavingDraft(true);
    const { bankAccount: _bankAccount, ...safeValues } = values;
    const draft = {
      ...safeValues,
      filesMeta: Object.keys(files).reduce((acc, k) => {
        acc[k] = (files[k] || []).map(f => ({ name: f.name, size: f.size, type: f.type }));
        return acc;
      }, {}),
      vendorId: values.vendorId || generateVendorId(),
      savedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(draftKey, JSON.stringify(draft));
      setSavedDraft(draft);
      toast.success("Draft saved on this device. Bank details and documents were not saved.");
    } catch (error) {
      console.error("Could not save vendor draft:", error);
      toast.error("Draft could not be saved in this browser.");
    } finally {
      setSavingDraft(false);
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
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors, setTouched }) => {
    try {
      await completeValidationSchema.validate(values, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      for (const issue of validationError.inner || []) {
        if (issue.path && !errors[issue.path]) errors[issue.path] = issue.message;
      }
      setErrors(errors);
      setTouched(Object.fromEntries(Object.keys(errors).map((field) => [field, true])));
      const firstInvalidStep = fieldsByStep.findIndex((fields) => fields.some((field) => errors[field]));
      if (firstInvalidStep >= 0) setStep(firstInvalidStep + 1);
      setSubmitting(false);
      return;
    }

    // basic files check: require profilePhoto and one ID doc
    const hasProfilePhoto = Boolean(files.profilePhoto?.length);
    const hasIdDocument = Boolean(files.aadhaar?.length || files.pan?.length);
    if (!hasProfilePhoto || !hasIdDocument) {
      alert("Please upload a profile photo and at least one ID document (Aadhaar or PAN).");
      setSubmitting(false);
      return;
    }

    try {
      const userId = currentUser?.id;
      if (!userId) throw new Error("Please sign in before submitting an application.");

      const applicationValues = {
        userId,
        name: values.name,
        phone: values.phone,
        email: values.email || currentUser.email || "",
        location: values.location,
        vendorType: values.vendorType,
        services: values.services,
        bankAccount: values.bankAccount,
        ifsc: values.ifsc,
        additionalInfo: values.additionalInfo || "",
        experience: values.experience,
        certifications: values.certifications || "",
        pricing: values.pricing || "",
        gst: values.gst || "",
        vendorId: values.vendorId || application?.vendorId || generateVendorId(),
        ifscBankName,
        estimatedApproval: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      };
      const filesMeta = { ...(application?.filesMeta || {}) };
      const uploadedFiles = [];
      try {
        for (const [category, selectedFiles] of Object.entries(files)) {
          if (!selectedFiles?.length) continue;
          const bucket = category === "portfolio" ? "vendor-portfolio" : "vendor-documents";
          filesMeta[category] = [];
          for (const file of selectedFiles) {
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            const uniqueId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
            const path = `${userId}/${applicationValues.vendorId}/${category}-${uniqueId}-${safeName}`;
            const { error } = await requireSupabase().storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
            if (error) throw error;
            uploadedFiles.push({ bucket, path });
            filesMeta[category].push({ name: file.name, path, bucket, contentType: file.type, size: file.size });
          }
        }

        const applicationId = await createVendorApplication(applicationValues, filesMeta);
        setApplication({ ...applicationValues, id: applicationId, status: "PENDING" });
      } catch (uploadOrSaveError) {
        await Promise.all(uploadedFiles.map(({ bucket, path }) =>
          requireSupabase().storage.from(bucket).remove([path])
            .catch((cleanupError) => console.warn("Could not clean up an incomplete vendor upload:", cleanupError))
        ));
        throw uploadOrSaveError;
      }

      // clear draft
      localStorage.removeItem(draftKey);

      setSubmitted(true);
      setShowPreview(false);
      resetForm();
      setFiles({});
      setPreviewUrls({});
      toast.success(`Application submitted. Vendor ID: ${applicationValues.vendorId}. Await admin approval.`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const advanceStep = async (validateForm, setTouched) => {
    const errors = await validateForm();
    if (Object.keys(errors).length) {
      setTouched(Object.fromEntries(fieldsByStep[step - 1].map((field) => [field, true])));
      return;
    }
    setStep((currentStep) => Math.min(3, currentStep + 1));
  };

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
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setSubmitted(false)} className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white">Track application</button>
            <button type="button" onClick={() => navigate("/")} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700">Back to home</button>
          </div>
        </div>
      </div>
    );
  }

  if (applicationLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6 text-slate-600">Loading your vendor application...</div>;
  }

  const applicationStatus = String(application?.status || "").toUpperCase();
  if (["PENDING", "APPROVED", "SUSPENDED"].includes(applicationStatus)) {
    const statusCopy = {
      PENDING: "Your application is with our admin team for review.",
      APPROVED: "Your vendor account is approved and your dashboard is ready.",
      SUSPENDED: "Your vendor account is currently suspended. Contact support for help.",
    };

    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50 p-4">
        <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700"><FiInfo className="h-7 w-7" /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Vendor application</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{applicationStatus === "APPROVED" ? "You're approved" : applicationStatus === "PENDING" ? "Application under review" : "Account suspended"}</h1>
          <p className="mt-3 text-slate-600">{statusCopy[applicationStatus]}</p>
          <p className="mt-4 text-sm text-slate-500">Application ID: <span className="font-semibold text-slate-700">{application.vendorId || application.id}</span></p>
          {applicationStatus === "APPROVED" ? (
            <button type="button" onClick={() => navigate("/vendor/dashboard")} className="mt-6 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white">Open vendor dashboard</button>
          ) : applicationStatus === "SUSPENDED" ? (
            <button type="button" onClick={() => navigate("/contact")} className="mt-6 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white">Contact support</button>
          ) : (
            <button type="button" onClick={() => navigate("/")} className="mt-6 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700">Back to home</button>
          )}
        </section>
      </main>
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
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition">
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
            {({ values, setFieldValue, isValid, isSubmitting, resetForm, validateForm, setTouched, submitForm }) => (
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
                            <Field name="phone" type="tel" placeholder="10-digit mobile number" className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-amber-500 transition-all shadow-sm" />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
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
                        <motion.button type="button" onClick={() => void advanceStep(validateForm, setTouched)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors text-sm sm:text-base">
                          {t.next}
                          <FiChevronRight />
                        </motion.button>
                      ) : (
                        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isSubmitting || !isValid} className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors text-sm sm:text-base">
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
                          <motion.button type="button" disabled={isSubmitting} onClick={() => { setShowPreview(false); void submitForm(); }} className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition-colors"> Confirm Submission </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Formik>

          {applicationStatus === "REJECTED" && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Your previous application was not approved. Update the details above and resubmit for review.
            </div>
          )}

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
