import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function VendorRegistration({ role, vendorType, setRole, setServiceProviderType, setShowMore }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({});

  // Initial form values
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    location: "",
    vendorType: vendorType || "",
    services: "",
    bankAccount: "",
    ifsc: "",
    additionalInfo: "",
  };

  // Validation per step
  const validationSchema = [
    Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().matches(/^\d{10}$/, "Invalid phone").required("Required"),
      email: Yup.string().email("Invalid email"),
      location: Yup.string().required("Required"),
    }),
    Yup.object({
      vendorType: Yup.string().required("Select vendor type"),
      services: Yup.string().required("List your services"),
    }),
    Yup.object({
      bankAccount: Yup.string().required("Bank Account required"),
      ifsc: Yup.string().required("IFSC required"),
      additionalInfo: Yup.string(),
    }),
  ];

  const handleFileChange = (e, key) => {
    setFiles({ ...files, [key]: e.target.files });
  };

  const handleSubmit = (values) => {
    // Save to localStorage
    const allData = { ...values, files: files };
    localStorage.setItem("serviceProviderData", JSON.stringify(allData));
    alert("🎉 Registration submitted successfully!");
    // Reset state
    setRole(null);
    setServiceProviderType(null);
    setShowMore(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-12">
      <h2 className="text-2xl font-bold text-center text-[#5C3A21] mb-4">
        {vendorType ? vendorType : role} Registration
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[step - 1]}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-3">
                <Field name="name" placeholder="Full Name" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                <Field name="phone" placeholder="Phone Number" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

                <Field name="email" placeholder="Email Address" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                <Field name="location" placeholder="City / Location" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>
            )}

            {/* Step 2: Services & Vendor Type */}
            {step === 2 && (
              <div className="space-y-3">
                {!vendorType && (
                  <>
                    <label className="block font-semibold">Vendor Type</label>
                    <Field as="select" name="vendorType" className="w-full border p-2 rounded-lg">
                      <option value="">-- Select Type --</option>
                      <option value="Pandit Ji">Pandit Ji</option>
                      <option value="Shopkeeper">Shopkeeper</option>
                      <option value="Decorator">Decorator</option>
                      <option value="Caterer">Caterer</option>
                      <option value="Astrologer">Astrologer</option>
                    </Field>
                    <ErrorMessage name="vendorType" component="div" className="text-red-500 text-sm" />
                  </>
                )}

                <Field
                  as="textarea"
                  name="services"
                  rows={3}
                  placeholder="List your services / specializations"
                  className="w-full border p-2 rounded-lg"
                />
                <ErrorMessage name="services" component="div" className="text-red-500 text-sm" />

                <div>
                  <label className="block font-semibold mb-1">Profile Photo</label>
                  <input type="file" onChange={(e) => handleFileChange(e, "profilePhoto")} className="w-full" />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Sample Work / Documents</label>
                  <input type="file" multiple onChange={(e) => handleFileChange(e, "documents")} className="w-full" />
                </div>
              </div>
            )}

            {/* Step 3: Bank Details */}
            {step === 3 && (
              <div className="space-y-3">
                <Field name="bankAccount" placeholder="Bank Account Number" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="bankAccount" component="div" className="text-red-500 text-sm" />

                <Field name="ifsc" placeholder="IFSC Code" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="ifsc" component="div" className="text-red-500 text-sm" />

                <Field as="textarea" name="additionalInfo" rows={3} placeholder="Additional info (optional)" className="w-full border p-2 rounded-lg" />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded-lg">Back</button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-4 py-2 bg-[#FFD700] text-[#5C3A21] rounded-lg font-bold hover:bg-[#FFC107]">Next</button>
              ) : (
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Submit</button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
