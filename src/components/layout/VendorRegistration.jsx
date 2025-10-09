import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiCamera, FiFile, FiCheck, FiChevronLeft, FiChevronRight, FiInfo, FiGlobe, FiMoon, FiSun } from "react-icons/fi";

export default function VendorRegistration({ role, vendorType, setRole, setServiceProviderType, setShowMore }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const formRefs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Vendor types with icons
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

  // Services multi-select options
  const serviceOptions = [
    "Wedding Ceremonies", "House Warming", "Birthday Pujas", "Festival Events",
    "Mundan Ceremony", "Engagement Events", "Full Event Planning", "Live Streaming",
    "HD Photography", "Drone Shots", "Traditional Decor", "Modern Theme Decor",
    "Catering Services", "Prasad Preparation", "Vedic Rituals", "Horoscope Services"
  ];

  // Translations
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
    }
  };

  const t = translations[language];

  // Initial form values
  const initialValues = {
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
  };

  // Validation schemas
  const validationSchema = [
    Yup.object({
      name: Yup.string().min(2, "Name too short").max(50, "Name too long").required(t.name + " आवश्यक है"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required(t.phone + " आवश्यक है"),
      email: Yup.string().email("Invalid email address"),
      location: Yup.string().required(t.location + " आवश्यक है"),
    }),
    Yup.object({
      vendorType: Yup.string().required(t.vendorType + " का चयन करें"),
      services: Yup.array().min(1, "कम से कम एक सेवा चुनें"),
      experience: Yup.number().min(0, "Invalid experience").max(50, "Too many years").required("Experience is required"),
    }),
    Yup.object({
      bankAccount: Yup.string()
        .matches(/^\d{9,18}$/, "Invalid account number")
        .required(t.bankAccount + " आवश्यक है"),
      ifsc: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
        .required(t.ifsc + " आवश्यक है"),
    }),
  ];

  // Auto-focus first field on step change
  useEffect(() => {
    if (formRefs[step - 1]?.current) {
      const firstInput = formRefs[step - 1].current.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }
  }, [step]);

  // Handle file changes with preview and validation
  const handleFileChange = (e, key) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file sizes (max 5MB)
    const validFiles = selectedFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 5MB.`);
        return false;
      }
      return true;
    });

    setFiles(prev => ({ ...prev, [key]: validFiles }));

    // Generate preview URLs for images
    if (key === "profilePhoto" && validFiles.length > 0) {
      const file = validFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls(prev => ({ ...prev, [key]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    // Use the files from the dataTransfer object for drag/drop
    const fileList = Array.from(e.dataTransfer.files);
    const mockEvent = { target: { files: fileList } };
    handleFileChange(mockEvent, key);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = (key, index) => {
    setFiles(prev => {
      const updatedFiles = { ...prev };
      if (updatedFiles[key]) {
        updatedFiles[key] = updatedFiles[key].filter((_, i) => i !== index);
        if (updatedFiles[key].length === 0) delete updatedFiles[key];
      }
      return updatedFiles;
    });
    if (key === "profilePhoto") {
      setPreviewUrls(prev => ({ ...prev, profilePhoto: null }));
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    // Check if step 3 requirements (bank details + documents) are met before final submit
    if (step === 3 && Object.keys(files).length === 0) {
      alert("Please upload at least one document (like PAN/Aadhaar) and profile photo.");
      return;
    }
    
    // Final submission logic (only runs when step 3 validation passes or when confirmed from preview)
    if (step === 3 || showPreview) {
      // Simulate API call...
      try {
        const formData = new FormData();
        
        Object.entries(values).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });

        Object.entries(files).forEach(([key, fileList]) => {
          fileList.forEach(file => {
            formData.append(key, file);
          });
        });

        const allData = { 
          ...values, 
          files: Object.keys(files).reduce((acc, key) => {
            acc[key] = files[key].map(f => f.name);
            return acc;
          }, {}),
          timestamp: new Date().toISOString(),
          status: "pending"
        };
        
        localStorage.setItem("vendorRegistration", JSON.stringify(allData));
        
        setSubmitted(true);
        setShowPreview(false);
        
        setTimeout(() => {
          // Reset or navigate after success
          // setRole(null);
          // setServiceProviderType(null);
          // setShowMore(false);
        }, 3000);
        
      } catch (error) {
        alert("Submission failed. Please try again.");
      }
    }
  };

  // Progress steps component
  const ProgressSteps = () => (
    <div className="flex justify-between mb-8 relative px-4 md:px-12">
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10 mx-10 md:mx-20">
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
            stepNum === step ? "bg-amber-600 scale-110" : "bg-gray-300 dark:bg-gray-600"
          }`}>
            {stepNum < step ? <FiCheck /> : stepNum}
          </div>
          <span className={`text-xs sm:text-sm mt-2 text-center ${stepNum === step ? "text-amber-600 font-bold dark:text-amber-400" : "text-gray-500 dark:text-gray-400"}`}>
            {t.steps[stepNum - 1]}
          </span>
        </div>
      ))}
    </div>
  );

  // Success animation component
  const SuccessAnimation = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", damping: 50 }}
        className="text-6xl mb-4"
      >
        🎉
      </motion.div>
      <h3 className="text-2xl font-bold text-green-600 mb-4">{t.success}</h3>
      <p className="text-gray-600 dark:text-gray-400">Your registration is under review. We will contact you soon!</p>
    </motion.div>
  );

  if (submitted) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gradient-to-br from-amber-50 to-rose-50 p-4 flex items-center justify-center`}>
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full">
          <SuccessAnimation />
        </div>
      </div>
    );
  }

  // Preview component (Now responsive)
  const PreviewComponent = ({ values }) => (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 border-b pb-2 mb-4">1. {t.steps[0]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        <p><strong>{t.name}:</strong> {values.name}</p>
        <p><strong>{t.phone}:</strong> {values.phone}</p>
        <p><strong>{t.email}:</strong> {values.email || 'N/A'}</p>
        <p><strong>{t.location}:</strong> {values.location}</p>
      </div>

      <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 border-b pb-2 mb-4 pt-4">2. {t.steps[1]}</h3>
      <p><strong>{t.vendorType}:</strong> {vendorTypes.find(t => t.value === values.vendorType)?.label || 'N/A'}</p>
      <p><strong>Experience:</strong> {values.experience || 'N/A'} {values.experience && 'Years'}</p>
      <p><strong>{t.services}:</strong> <span className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">{values.services.join(', ') || 'None selected'}</span></p>
      <p><strong>Documents:</strong> <span className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">{Object.values(files).flat().map(f => f.name).join(', ') || 'No files uploaded'}</span></p>
      
      <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 border-b pb-2 mb-4 pt-4">3. {t.steps[2]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>{t.bankAccount}:</strong> {values.bankAccount.slice(0, 4)}...{values.bankAccount.slice(-4)}</p>
        <p><strong>{t.ifsc}:</strong> {values.ifsc}</p>
      </div>
      <p><strong>{t.additionalInfo}:</strong> <span className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-pre-wrap">{values.additionalInfo || 'N/A'}</span></p>
    </div>
  );

  return (
    // Top-level container always has the light background gradient
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 sm:p-6 flex justify-center`}>
      {/* Apply dark class to the main form wrapper ONLY when darkMode is true */}
      <div className={`max-w-4xl mx-auto w-full mt-12 mb-12 ${darkMode ? 'dark' : ''}`}>
        
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {setRole(null); setServiceProviderType(null); setShowMore(false);}}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <FiSun className="text-amber-500 w-5 h-5" /> : <FiMoon className="text-gray-600 w-5 h-5" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
              className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <FiGlobe className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'english' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Main Form Card - This is where the dark mode style is applied now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-10 text-gray-800 dark:text-gray-100"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-amber-700 dark:text-amber-400 mb-2 font-serif">
            {t.title}
          </h2>
          <p className="text-center text-sm mb-8 text-gray-500 dark:text-gray-400">
            {t.steps[step - 1]}
          </p>
          
          <ProgressSteps />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <>
                <Form id="vendor-form" className="space-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: (step > 1 ? 50 : -50) }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: (step > 1 ? -50 : 50) }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step 1: Basic Info */}
                      {step === 1 && (
                        <div ref={formRefs[0]} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.name}
                              <FiInfo className="inline ml-1 text-gray-400" title="As per official documents" />
                            </label>
                            <Field 
                              name="name" 
                              placeholder={t.namePlaceholder}
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.phone}
                            </label>
                            <Field 
                              name="phone" 
                              type="tel"
                              placeholder="10-digit mobile number"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.email}
                            </label>
                            <Field 
                              name="email" 
                              type="email"
                              placeholder="optional@email.com"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.location}
                            </label>
                            <Field 
                              name="location" 
                              placeholder="Enter your city"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                            <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Services & Documents */}
                      {step === 2 && (
                        <div ref={formRefs[1]} className="space-y-6">
                          
                          {/* Vendor Type Selection */}
                          <div>
                            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                              {t.vendorType}
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                              {vendorTypes.map(type => (
                                <motion.button
                                  key={type.value}
                                  type="button"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setFieldValue("vendorType", type.value)}
                                  className={`p-3 sm:p-4 rounded-xl border-2 shadow-md flex flex-col items-center justify-center transition-all min-h-[90px] ${
                                    values.vendorType === type.value
                                      ? "border-amber-500 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-amber-300 dark:hover:border-amber-400"
                                  }`}
                                >
                                  <div className="text-2xl sm:text-3xl mb-1">{type.icon}</div>
                                  <div className="text-xs sm:text-sm font-medium text-center">{type.label}</div>
                                </motion.button>
                              ))}
                            </div>
                            <Field name="vendorType" type="hidden" />
                            <ErrorMessage name="vendorType" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {/* Services Offered */}
                          <div>
                            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              {t.services}
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 shadow-inner">
                              {serviceOptions.map(service => (
                                <label key={service} className="flex items-center space-x-3 p-1 hover:bg-white dark:hover:bg-gray-600 rounded-lg cursor-pointer transition">
                                  <Field
                                    type="checkbox"
                                    name="services"
                                    value={service}
                                    className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{service}</span>
                                </label>
                              ))}
                            </div>
                            <ErrorMessage name="services" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {/* Experience and Certifications */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Experience (Years)
                              </label>
                              <Field 
                                name="experience" 
                                type="number"
                                placeholder="e.g., 5"
                                className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                              />
                              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Certifications
                              </label>
                              <Field 
                                name="certifications" 
                                placeholder="Awards & certifications (Optional)"
                                className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                              />
                            </div>
                          </div>

                          {/* File Upload Sections */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Photo Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Profile Photo
                              </label>
                              <div
                                onDrop={(e) => handleDrop(e, "profilePhoto")}
                                onDragOver={handleDragOver}
                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700 min-h-[180px] flex flex-col justify-center items-center"
                                onClick={() => document.getElementById('profilePhoto').click()}
                              >
                                <input
                                  id="profilePhoto"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, "profilePhoto")}
                                  className="hidden"
                                  multiple={false}
                                />
                                {previewUrls.profilePhoto ? (
                                  <div className="relative">
                                    <img src={previewUrls.profilePhoto} alt="Preview" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-amber-300 shadow-lg" />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewUrls(prev => ({ ...prev, profilePhoto: null }));
                                        setFiles(prev => ({ ...prev, profilePhoto: [] }));
                                      }}
                                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Click or drag profile photo</p>
                                    <p className="text-xs text-gray-500 mt-1">Max 5MB • JPG, PNG</p>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Documents Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Documents & Samples (Optional)
                              </label>
                              <div
                                onDrop={(e) => handleDrop(e, "documents")}
                                onDragOver={handleDragOver}
                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700 min-h-[180px] flex flex-col justify-center items-center"
                                onClick={() => document.getElementById('documents').click()}
                              >
                                <input
                                  id="documents"
                                  type="file"
                                  multiple
                                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                  onChange={(e) => handleFileChange(e, "documents")}
                                  className="hidden"
                                />
                                <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Click or drag documents/samples</p>
                                <p className="text-xs text-gray-500 mt-1">Max 5MB per file</p>
                              </div>
                              
                              {/* Selected files list */}
                              <div className="space-y-1 mt-3 max-h-24 overflow-y-auto">
                                {files.documents?.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2 truncate">
                                      <FiFile className="text-amber-500 flex-shrink-0" />
                                      <span className="text-sm truncate">{file.name}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile("documents", index)}
                                      className="text-red-500 hover:text-red-700 flex-shrink-0 p-1"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Bank Details */}
                      {step === 3 && (
                        <div ref={formRefs[2]} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t.bankAccount}
                              </label>
                              <Field 
                                name="bankAccount" 
                                placeholder="Enter full account number"
                                className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                              />
                              <ErrorMessage name="bankAccount" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t.ifsc}
                                <FiInfo className="inline ml-1 text-gray-400" title="Format: ABCD0123456" />
                              </label>
                              <Field 
                                name="ifsc" 
                                placeholder="e.g., SBIN0000123 (CAPS)"
                                className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                              />
                              <ErrorMessage name="ifsc" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          </div>
                          
                          {/* Profile Photo/Documents Check reminder */}
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-300 dark:border-red-700 flex items-start gap-3">
                            <FiInfo className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                              **Important:** Please ensure you have uploaded your **Profile Photo** and relevant **Documents** (PAN/Aadhaar/Business Proof) in the previous step (Step 2) for verification.
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Pricing Information (Optional)
                            </label>
                            <Field 
                              name="pricing" 
                              as="textarea"
                              rows={3}
                              placeholder="Describe your pricing structure, packages, etc."
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.additionalInfo} (Optional)
                            </label>
                            <Field 
                              name="additionalInfo" 
                              as="textarea"
                              rows={4}
                              placeholder="Any additional information about your services, expertise, or special offers..."
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-all shadow-sm" 
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      {step > 1 && (
                        <motion.button
                          type="button"
                          onClick={prevStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors text-sm sm:text-base"
                        >
                          <FiChevronLeft />
                          {t.back}
                        </motion.button>
                      )}
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      {step === 3 && (
                        <motion.button
                          type="button"
                          onClick={() => isValid ? setShowPreview(true) : alert("Please complete the required fields.")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!isValid || !dirty}
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors text-sm sm:text-base"
                        >
                          {t.preview}
                        </motion.button>
                      )}
                      
                      {step < 3 ? (
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!isValid || !dirty}
                          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                        >
                          {t.next}
                          <FiChevronRight />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!isValid}
                          className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors text-sm sm:text-base"
                        >
                          {t.submit}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </Form>

                {/* Preview Modal (Used Formik context for submission) */}
                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                      onClick={() => setShowPreview(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h2 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 mb-6">
                          Registration Preview
                        </h2>
                        
                        <PreviewComponent values={values} />
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-4 border-t dark:border-gray-700">
                          <motion.button 
                            type="button"
                            onClick={() => setShowPreview(false)}
                            className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {t.back}
                          </motion.button>
                          <motion.button 
                            type="submit"
                            form="vendor-form"
                            onClick={() => {
                              // Custom submit handler runs, setting submitted=true
                              handleSubmit(values);
                            }}
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Confirm Submission
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}