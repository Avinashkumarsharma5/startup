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
      name: Yup.string().min(2, "Name too short").max(50, "Name too long").required("Required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required("Required"),
      email: Yup.string().email("Invalid email address"),
      location: Yup.string().required("Location is required"),
    }),
    Yup.object({
      vendorType: Yup.string().required("Please select vendor type"),
      services: Yup.array().min(1, "Select at least one service"),
      experience: Yup.number().min(0, "Invalid experience").max(50, "Too many years"),
    }),
    Yup.object({
      bankAccount: Yup.string()
        .matches(/^\d{9,18}$/, "Invalid account number")
        .required("Bank account is required"),
      ifsc: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
        .required("IFSC code is required"),
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
    handleFileChange(e, key);
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
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    // Simulate API call
    try {
      const formData = new FormData();
      
      // Append all form values
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      // Append files
      Object.entries(files).forEach(([key, fileList]) => {
        fileList.forEach(file => {
          formData.append(key, file);
        });
      });

      // Save to localStorage (replace with actual API call)
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
      
      // Show success animation
      setTimeout(() => {
        setRole(null);
        setServiceProviderType(null);
        setShowMore(false);
      }, 3000);
      
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  // Progress steps component
  const ProgressSteps = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
        <motion.div 
          className="h-full bg-amber-600"
          initial={{ width: "0%" }}
          animate={{ width: `${((step - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
            stepNum < step ? "bg-green-500" : 
            stepNum === step ? "bg-amber-600" : "bg-gray-300"
          }`}>
            {stepNum < step ? <FiCheck /> : stepNum}
          </div>
          <span className={`text-xs mt-2 ${stepNum === step ? "text-amber-600 font-bold" : "text-gray-500"}`}>
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
        transition={{ duration: 0.5 }}
        className="text-6xl mb-4"
      >
        🎉
      </motion.div>
      <h3 className="text-2xl font-bold text-green-600 mb-4">{t.success}</h3>
      <p className="text-gray-600">Your registration is under review</p>
    </motion.div>
  );

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl mt-12">
        <SuccessAnimation />
      </div>
    );
  }

  if (showPreview) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl mt-12">
        <h2 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 mb-6">
          Registration Preview
        </h2>
        {/* Preview content would go here */}
        <div className="flex gap-4 justify-center mt-6">
          <button 
            onClick={() => setShowPreview(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg"
          >
            Back to Edit
          </button>
          <button 
            type="submit"
            form="vendor-form"
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Confirm Submission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-rose-50'} p-4`}>
      <div className="max-w-4xl mx-auto mt-12">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg"
            >
              {darkMode ? <FiSun className="text-amber-500" /> : <FiMoon className="text-gray-600" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center gap-2"
            >
              <FiGlobe />
              <span>{language === 'english' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-3xl font-bold text-center text-amber-700 dark:text-amber-400 mb-2 font-serif">
            {t.title}
          </h2>
          
          <ProgressSteps />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <Form id="vendor-form" className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                      <div ref={formRefs[0]} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.name}
                            <FiInfo className="inline ml-1 text-gray-400" title="As per official documents" />
                          </label>
                          <Field 
                            name="name" 
                            placeholder={t.namePlaceholder}
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.phone}
                          </label>
                          <Field 
                            name="phone" 
                            placeholder="10-digit mobile number"
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.email}
                          </label>
                          <Field 
                            name="email" 
                            type="email"
                            placeholder="optional@email.com"
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.location}
                          </label>
                          <Field 
                            name="location" 
                            placeholder="Enter your city"
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
                          />
                          <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Services & Documents */}
                    {step === 2 && (
                      <div ref={formRefs[1]} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            {t.vendorType}
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {vendorTypes.map(type => (
                              <motion.button
                                key={type.value}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFieldValue("vendorType", type.value)}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${
                                  values.vendorType === type.value
                                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                                    : "border-gray-300 dark:border-gray-600 hover:border-amber-300"
                                }`}
                              >
                                <div className="text-2xl mb-1">{type.icon}</div>
                                <div className="text-xs font-medium">{type.label}</div>
                              </motion.button>
                            ))}
                          </div>
                          <Field name="vendorType" type="hidden" />
                          <ErrorMessage name="vendorType" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            {t.services}
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2">
                            {serviceOptions.map(service => (
                              <label key={service} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                <Field
                                  type="checkbox"
                                  name="services"
                                  value={service}
                                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                              </label>
                            ))}
                          </div>
                          <ErrorMessage name="services" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Experience (Years)
                            </label>
                            <Field 
                              name="experience" 
                              type="number"
                              placeholder="e.g., 5"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white" 
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Certifications
                            </label>
                            <Field 
                              name="certifications" 
                              placeholder="Awards & certifications"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white" 
                            />
                          </div>
                        </div>

                        {/* File Upload Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                              Profile Photo
                            </label>
                            <div
                              onDrop={(e) => handleDrop(e, "profilePhoto")}
                              onDragOver={handleDragOver}
                              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer"
                              onClick={() => document.getElementById('profilePhoto').click()}
                            >
                              <input
                                id="profilePhoto"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "profilePhoto")}
                                className="hidden"
                              />
                              {previewUrls.profilePhoto ? (
                                <div className="relative">
                                  <img src={previewUrls.profilePhoto} alt="Preview" className="w-32 h-32 rounded-full mx-auto object-cover" />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPreviewUrls(prev => ({ ...prev, profilePhoto: null }));
                                      setFiles(prev => ({ ...prev, profilePhoto: [] }));
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <FiCamera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Click or drag to upload profile photo</p>
                                  <p className="text-xs text-gray-500 mt-1">Max 5MB • JPG, PNG</p>
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                              Documents & Samples
                            </label>
                            <div
                              onDrop={(e) => handleDrop(e, "documents")}
                              onDragOver={handleDragOver}
                              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer"
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
                              <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                              <p className="text-sm text-gray-600 dark:text-gray-400">Click or drag to upload files</p>
                              <p className="text-xs text-gray-500 mt-1">Max 5MB per file</p>
                            </div>
                            
                            {/* Selected files list */}
                            {files.documents?.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
                                <div className="flex items-center gap-2">
                                  <FiFile className="text-gray-400" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile("documents", index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
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
                              placeholder="Enter account number"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
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
                              placeholder="e.g., SBIN0000123"
                              className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:bg-gray-700 dark:text-white transition-all" 
                            />
                            <ErrorMessage name="ifsc" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pricing Information
                          </label>
                          <Field 
                            name="pricing" 
                            as="textarea"
                            rows={3}
                            placeholder="Describe your pricing structure, packages, etc."
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white" 
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.additionalInfo}
                          </label>
                          <Field 
                            name="additionalInfo" 
                            as="textarea"
                            rows={4}
                            placeholder="Any additional information about your services, expertise, or special offers..."
                            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:border-amber-500 dark:bg-gray-700 dark:text-white" 
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
                        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                      >
                        <FiChevronLeft />
                        {t.back}
                      </motion.button>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {step === 3 && (
                      <motion.button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
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
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {t.next}
                        <FiChevronRight />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                      >
                        {t.submit}
                      </motion.button>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}