import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Headphones,
  Loader2,
  CheckCircle,
  Send,
  Upload,
  Search,
  MessageSquare,
  FileText,
  Eye,
  X,
  ChevronRight,
  ChevronLeft,
  User,
  AlertCircle,
  Image as ImageIcon,
  File,
  Shield,
  Check,
  Circle,
  Clock4,
  AlertTriangle,
} from "lucide-react";

/* =====================================================
   ENHANCED SUPPORT PAGE WITH:
   ✅ Global State Management
   ✅ Step-based Flow (Zomato Style)
   ✅ Loading Skeletons & Empty States
   ✅ Enhanced Chat UX
   ✅ File Upload Preview
   ✅ Ticket Status Visualization
   ✅ Frontend Notifications
   ✅ Mobile UX Polish
===================================================== */

// ---------------- CONFIG ----------------
const SUPPORT_PHONE = "916201486202";
const SUPPORT_EMAIL = "support@sanskaraa.com";
const SUPPORT_ADDRESS = "India (Serving PAN India)";

// ---------------- STORAGE HELPERS ----------------
const getTickets = () =>
  JSON.parse(localStorage.getItem("sanskaraa_tickets") || "[]");

const saveTickets = (data) =>
  localStorage.setItem("sanskaraa_tickets", JSON.stringify(data));

// ---------------- GLOBAL STATE ----------------
const useSupportState = () => {
  const [state, setState] = useState({
    // Central state
    currentStep: 1, // 1: Choose Help, 2: Form, 3: Success, 4: Track/Chat
    tickets: getTickets(),
    activeTicket: null,
    chatOpen: false,
    notifications: [],
    chatMessages: [],
    uploadedFiles: [],
    isLoading: false,
    trackingId: "",
    trackedTicket: null,
  });

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return { state, updateState };
};

// ---------------- COMPONENTS ----------------

// Loading Skeleton
const LoadingSkeleton = ({ type = "card" }) => {
  if (type === "chat") {
    return (
      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-16 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "tracking") {
    return (
      <div className="space-y-3 p-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-4"></div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12 px-4">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6">{description}</p>
    {action}
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const config = {
    Open: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertCircle },
    "In Progress": { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock4 },
    Resolved: { color: "bg-green-100 text-green-800 border-green-200", icon: Check },
    Urgent: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle },
  };

  const { color, icon: Icon } = config[status] || config.Open;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${color}`}>
      <Icon size={14} />
      {status}
    </span>
  );
};

// Progress Steps
const ProgressSteps = ({ currentStep, steps }) => (
  <div className="relative mb-8">
    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center relative">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id ? 'bg-[#7A1A1A] border-[#7A1A1A] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
            {currentStep > step.id ? <Check size={18} /> : step.icon}
          </div>
          <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? 'text-[#7A1A1A]' : 'text-gray-500'}`}>
            {step.label}
          </span>
          <span className="text-xs text-gray-400 mt-1">{step.description}</span>
        </div>
      ))}
    </div>
  </div>
);

// Toast Notification
const ToastNotification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
        type === "success" 
          ? "bg-green-50 border border-green-200 text-green-800"
          : "bg-red-50 border border-red-200 text-red-800"
      }`}
    >
      {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
    </motion.div>
  );
};

// File Preview Component
const FilePreview = ({ files, onRemove }) => (
  <div className="space-y-2 mt-4">
    {files.map((file, index) => (
      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-3">
          {file.type.startsWith("image/") ? (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <ImageIcon size={20} className="text-gray-500" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
              <File size={20} className="text-gray-500" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
        <button
          onClick={() => onRemove(index)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>
    ))}
  </div>
);

// ---------------- MAIN PAGE ----------------
export default function ContactPage() {
  const { state, updateState } = useSupportState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "Normal",
    message: "",
  });
  const [notification, setNotification] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  // Scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current && state.chatOpen) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [state.chatMessages, state.chatOpen]);

  // Step Navigation
  const nextStep = () => {
    updateState({ currentStep: state.currentStep + 1 });
  };

  const prevStep = () => {
    updateState({ currentStep: state.currentStep - 1 });
  };

  const goToStep = (step) => {
    updateState({ currentStep: step });
  };

  // Generate Ticket ID
  const generateTicketId = () =>
    `SKR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Handle file upload
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 files
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
    
    if (validFiles.length < files.length) {
      showNotification("Some files exceed 5MB limit", "error");
    }
    
    updateState({ uploadedFiles: [...state.uploadedFiles, ...validFiles] });
  };

  const removeFile = (index) => {
    const newFiles = [...state.uploadedFiles];
    newFiles.splice(index, 1);
    updateState({ uploadedFiles: newFiles });
  };

  // Submit Ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (formData.message.length < 10) {
      showNotification("Message must be at least 10 characters", "error");
      return;
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showNotification("Please enter a valid email", "error");
      return;
    }

    updateState({ isLoading: true });

    const ticketData = {
      ticketId: generateTicketId(),
      ...formData,
      status: "Open",
      createdAt: new Date().toISOString(),
      chats: [],
      files: state.uploadedFiles.map(f => f.name),
    };

    setTimeout(() => {
      const allTickets = getTickets();
      saveTickets([ticketData, ...allTickets]);

      updateState({
        isLoading: false,
        tickets: [ticketData, ...allTickets],
        activeTicket: ticketData,
        currentStep: 3, // Go to success step
        uploadedFiles: [],
      });

      showNotification(`Ticket ${ticketData.ticketId} created successfully!`);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        category: "",
        priority: "Normal",
        message: "",
      });
    }, 1500);
  };

  // Track Ticket
  const handleTrackTicket = () => {
    if (!state.trackingId) {
      showNotification("Please enter a Ticket ID", "error");
      return;
    }

    updateState({ isLoading: true });

    setTimeout(() => {
      const allTickets = getTickets();
      const found = allTickets.find(t => t.ticketId === state.trackingId);
      
      updateState({
        isLoading: false,
        trackedTicket: found || null,
      });

      if (!found) {
        showNotification("Ticket not found", "error");
      }
    }, 800);
  };

  // Chat Functions
  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...state.chatMessages, message];
    updateState({ chatMessages: updatedMessages });
    setNewMessage("");

    // Simulate typing indicator
    setTimeout(() => {
      const supportMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our support team will get back to you shortly.",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
      };
      updateState({ chatMessages: [...updatedMessages, supportMessage] });
    }, 2000);
  };

  // Quick Actions
  const quickActions = [
    {
      label: "Call Now",
      icon: PhoneCall,
      action: () => (window.location.href = `tel:+${SUPPORT_PHONE}`),
      color: "from-blue-500 to-blue-700",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      action: () => window.open(`https://wa.me/${SUPPORT_PHONE}`, "_blank"),
      color: "from-green-500 to-green-700",
    },
    {
      label: "Raise Ticket",
      icon: FileText,
      action: () => goToStep(2),
      color: "from-amber-500 to-orange-600",
    },
    {
      label: "Track Ticket",
      icon: Search,
      action: () => goToStep(4),
      color: "from-[#7A1A1A] to-[#A52A2A]",
    },
  ];

  // Step Definitions
  const steps = [
    { id: 1, label: "Choose Help", description: "Select option", icon: <Headphones size={18} /> },
    { id: 2, label: "Fill Form", description: "Details", icon: <FileText size={18} /> },
    { id: 3, label: "Success", description: "Ticket Created", icon: <CheckCircle size={18} /> },
    { id: 4, label: "Track", description: "Status", icon: <Search size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFE8B2] to-[#FFD7A3] p-4 sm:p-6 font-sans mt-12">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <ToastNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <motion.section
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white rounded-3xl shadow-xl border border-orange-200 p-6 sm:p-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#7A1A1A] mb-3">
            Sanskaraa Help & Support
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get instant help from our dedicated support team. We're here to assist you every step of the way.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <Shield size={14} /> Secure & Private
            </span>
            <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <Clock size={14} /> 15 min avg response
            </span>
            <span className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
              <CheckCircle size={14} /> 24/7 Support
            </span>
          </div>
        </div>
      </motion.section>

      {/* PROGRESS STEPS */}
      <section className="max-w-4xl mx-auto mb-8">
        <ProgressSteps currentStep={state.currentStep} steps={steps} />
      </section>

      {/* STEP 1: CHOOSE HELP TYPE */}
      <AnimatePresence mode="wait">
        {state.currentStep === 1 && (
          <motion.section
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-[#7A1A1A] mb-6 text-center">
                How can we help you today?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    onClick={action.action}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-3 hover:shadow-xl transition-shadow`}
                  >
                    <action.icon size={28} />
                    <span className="font-semibold text-lg">{action.label}</span>
                    <p className="text-sm opacity-90 text-center">
                      {action.label === "Raise Ticket" 
                        ? "Create a new support request" 
                        : action.label === "Track Ticket"
                        ? "Check your ticket status"
                        : "Connect instantly with our team"}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Contact Info Card */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <MapPin size={18} /> Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <PhoneCall className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Call us</p>
                      <p className="font-semibold">+91 62014 86202</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Mail className="text-amber-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email us</p>
                      <p className="font-semibold">{SUPPORT_EMAIL}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => goToStep(4)}
                  className="text-[#7A1A1A] font-medium hover:text-[#A52A2A] transition-colors flex items-center gap-2"
                >
                  Already have a ticket? Track status
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* STEP 2: TICKET FORM */}
        {state.currentStep === 2 && (
          <motion.section
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#7A1A1A]">
                  Raise Support Ticket
                </h2>
                <button
                  onClick={prevStep}
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="Enter your name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none transition"
                    />
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Shield size={12} />
                      <span>Your email is secure with us</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none transition"
                    >
                      <option value="">Select Category</option>
                      <option>Pandit Booking</option>
                      <option>Puja Kit Order</option>
                      <option>Payment Issue</option>
                      <option>Event Services</option>
                      <option>General Query</option>
                      <option>Technical Issue</option>
                      <option>Feedback/Suggestion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none transition"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Issue *
                    <span className="text-gray-500 font-normal ml-2">
                      (Minimum 10 characters)
                    </span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    required
                    minLength="10"
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none transition"
                  />
                  <div className="flex justify-between mt-2">
                    <span className={`text-xs ${formData.message.length < 10 ? 'text-red-500' : 'text-green-500'}`}>
                      {formData.message.length}/10 characters
                    </span>
                    <span className="text-xs text-gray-500">
                      Be specific for faster resolution
                    </span>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Files (Optional)
                    <span className="text-gray-500 font-normal ml-2">
                      Max 5 files, 5MB each
                    </span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#7A1A1A] transition-colors"
                  >
                    <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                    <p className="text-gray-600">Click to upload files</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Images, PDF, DOC (Max 5MB each)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    />
                  </div>
                  
                  {/* File Previews */}
                  {state.uploadedFiles.length > 0 && (
                    <FilePreview files={state.uploadedFiles} onRemove={removeFile} />
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={state.isLoading || formData.message.length < 10}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                      state.isLoading || formData.message.length < 10
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-[#7A1A1A] to-[#A52A2A] text-white hover:opacity-90 hover:shadow-lg'
                    }`}
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={22} />
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <Send size={22} />
                        Submit Ticket
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting, you agree to our terms. We'll contact you within 15 minutes.
                  </p>
                </div>
              </form>
            </div>
          </motion.section>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {state.currentStep === 3 && state.activeTicket && (
          <motion.section
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40} />
              </div>
              
              <h2 className="text-2xl font-semibold text-[#7A1A1A] mb-3">
                Ticket Created Successfully!
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ticket ID:</span>
                    <span className="font-mono font-bold text-[#7A1A1A]">
                      {state.activeTicket.ticketId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <StatusBadge status={state.activeTicket.status} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Priority:</span>
                    <span className="font-medium">{state.activeTicket.priority}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(state.activeTicket.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We've received your ticket and will get back to you shortly. 
                You can track the status using your Ticket ID.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    updateState({ 
                      currentStep: 4,
                      trackingId: state.activeTicket.ticketId 
                    });
                    handleTrackTicket();
                  }}
                  className="bg-[#7A1A1A] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
                >
                  <Eye size={18} />
                  Track This Ticket
                </button>
                <button
                  onClick={() => goToStep(1)}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* STEP 4: TRACK & CHAT */}
        {state.currentStep === 4 && (
          <motion.section
            key="step4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left Side - Tracking */}
                <div className="lg:col-span-2 p-6 border-r">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-[#7A1A1A]">
                      Track Your Ticket
                    </h2>
                    <button
                      onClick={() => goToStep(1)}
                      className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="flex gap-3 mb-8">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={state.trackingId}
                        onChange={(e) => updateState({ trackingId: e.target.value })}
                        placeholder="Enter Ticket ID (e.g., SKR-2023-123456)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleTrackTicket()}
                      />
                    </div>
                    <button
                      onClick={handleTrackTicket}
                      disabled={state.isLoading || !state.trackingId}
                      className="bg-[#7A1A1A] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {state.isLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Search size={18} />
                      )}
                      Track
                    </button>
                  </div>

                  {/* Tracking Results */}
                  {state.isLoading ? (
                    <LoadingSkeleton type="tracking" />
                  ) : state.trackedTicket ? (
                    <div className="space-y-6">
                      {/* Ticket Info */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {state.trackedTicket.ticketId}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Created: {new Date(state.trackedTicket.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <StatusBadge status={state.trackedTicket.status} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">{state.trackedTicket.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Priority</p>
                            <p className="font-medium">{state.trackedTicket.priority}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Description</p>
                          <p className="text-gray-700">{state.trackedTicket.message}</p>
                        </div>
                        
                        {state.trackedTicket.files && state.trackedTicket.files.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Attachments</p>
                            <div className="flex flex-wrap gap-2">
                              {state.trackedTicket.files.map((file, index) => (
                                <span key={index} className="bg-white px-3 py-1 rounded-lg text-sm border flex items-center gap-2">
                                  <File size={14} />
                                  {file}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status Timeline */}
                      <div className="bg-white border rounded-xl p-6">
                        <h4 className="font-semibold text-gray-700 mb-4">Status Timeline</h4>
                        <div className="space-y-4">
                          {[
                            { status: "Open", time: state.trackedTicket.createdAt, description: "Ticket was created" },
                            { status: "In Progress", time: state.trackedTicket.status === "Resolved" ? new Date(Date.now() - 86400000).toISOString() : null, description: "Assigned to support team" },
                            { status: "Resolved", time: state.trackedTicket.status === "Resolved" ? new Date(Date.now() - 43200000).toISOString() : null, description: "Issue was resolved" },
                          ].map((step, index) => (
                            <div key={step.status} className="flex items-start gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                (state.trackedTicket.status === "Open" && index === 0) ||
                                (state.trackedTicket.status === "In Progress" && index <= 1) ||
                                (state.trackedTicket.status === "Resolved")
                                  ? 'bg-[#7A1A1A] text-white'
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <span className="font-medium">{step.status}</span>
                                  {step.time && (
                                    <span className="text-sm text-gray-500">
                                      {new Date(step.time).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chat Toggle */}
                      <button
                        onClick={() => updateState({ chatOpen: !state.chatOpen })}
                        className="w-full bg-gradient-to-r from-[#7A1A1A] to-[#A52A2A] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                      >
                        <MessageSquare size={20} />
                        {state.chatOpen ? "Close Chat" : "Open Chat for This Ticket"}
                      </button>
                    </div>
                  ) : state.trackingId ? (
                    <EmptyState
                      icon={AlertCircle}
                      title="Ticket Not Found"
                      description="Please check your Ticket ID and try again."
                      action={
                        <button
                          onClick={() => updateState({ trackingId: "" })}
                          className="text-[#7A1A1A] font-medium hover:underline"
                        >
                          Try another Ticket ID
                        </button>
                      }
                    />
                  ) : (
                    <EmptyState
                      icon={Search}
                      title="Track Your Ticket"
                      description="Enter your Ticket ID above to check status and communicate with support."
                      action={
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => {
                              const tickets = getTickets();
                              if (tickets.length > 0) {
                                updateState({ 
                                  trackingId: tickets[0].ticketId,
                                  trackedTicket: tickets[0]
                                });
                              }
                            }}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            View Latest Ticket
                          </button>
                          <button
                            onClick={() => goToStep(2)}
                            className="bg-[#7A1A1A] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                          >
                            Create New Ticket
                          </button>
                        </div>
                      }
                    />
                  )}
                </div>

                {/* Right Side - Chat (Conditional) */}
                {state.chatOpen && state.trackedTicket && (
                  <div className="lg:col-span-1 flex flex-col h-[600px] border-t lg:border-t-0 lg:border-l">
                    {/* Chat Header */}
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-800">Live Chat</h3>
                          <p className="text-xs text-gray-500">Ticket: {state.trackedTicket.ticketId}</p>
                        </div>
                        <button
                          onClick={() => updateState({ chatOpen: false })}
                          className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Support online</span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                    >
                      {state.chatMessages.length === 0 ? (
                        <EmptyState
                          icon={MessageSquare}
                          title="No messages yet"
                          description="Start the conversation with our support team."
                          action={null}
                        />
                      ) : (
                        <>
                          {state.chatMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-2xl p-3 ${
                                  msg.sender === "user"
                                    ? "bg-[#7A1A1A] text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none border"
                                }`}
                              >
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs opacity-70 mt-1 text-right">
                                  {msg.time}
                                </p>
                              </div>
                            </div>
                          ))}
                          {/* Typing Indicator */}
                          {state.chatMessages.length > 0 && 
                           state.chatMessages[state.chatMessages.length - 1].sender === "user" && (
                            <div className="flex justify-start">
                              <div className="bg-white rounded-2xl rounded-bl-none p-3 border">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t bg-white">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                          placeholder="Type your message..."
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A1A1A] focus:border-[#7A1A1A] outline-none"
                        />
                        <button
                          onClick={sendChatMessage}
                          disabled={!newMessage.trim()}
                          className="bg-[#7A1A1A] text-white p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Support typically replies within 15 minutes
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FLOATING CHAT BUTTON (MOBILE) */}
      <button
        onClick={() => {
          goToStep(4);
          updateState({ chatOpen: true });
        }}
        className="lg:hidden fixed bottom-6 right-6 bg-[#7A1A1A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
      >
        <MessageSquare size={24} />
      </button>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="text-[#7A1A1A]" size={20} />
            <span className="font-semibold text-gray-700">Your Data is Secure</span>
          </div>
          
          <p className="text-lg font-semibold text-[#7A1A1A] mb-2">
            🙏 Ārambh se Sampūrṇ tak, har kadam mein saath
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sanskaraa is here to support you every step of the way. 
            For urgent matters, please call us directly at +91 62014 86202.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} Sanskaraa</span>
            <span>•</span>
            <span>Support Hours: 9 AM – 9 PM (IST)</span>
            <span>•</span>
            <span>Email: {SUPPORT_EMAIL}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}