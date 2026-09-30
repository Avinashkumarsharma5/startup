import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

export const VENDOR_STATUSES = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"];

function toApplication(row) {
  if (!row) return null;
  return {
    ...row, userId: row.user_id, name: row.applicant_name || row.business_name,
    businessName: row.business_name, vendorType: row.vendor_type, location: row.location_text,
    submittedAt: row.submitted_at, updatedAt: row.updated_at, reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by, rejectionReason: row.rejection_reason,
    aadhaarDocumentUrl: row.aadhaar_document_url, panDocumentUrl: row.pan_document_url,
    businessProofUrl: row.business_proof_url, portfolioUrls: row.portfolio_urls,
    filesMeta: row.files_meta || {},
  };
}

export async function findExistingVendorApplicationForUser(userId) {
  if (!userId) return null;
  const { data, error } = await requireSupabase().from("vendor_applications").select("*").eq("user_id", userId).order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (error) throw error;
  return toApplication(data);
}

export async function createVendorApplication(values, filesMeta = {}) {
  const client = requireSupabase();
  const user = await getCurrentUser();
  if (!user) throw new Error("A logged-in user is required to submit a vendor application.");
  const existing = await findExistingVendorApplicationForUser(user.id);
  if (existing && existing.status !== "REJECTED") throw new Error("A vendor application already exists for this user.");

  const bankAccount = String(values.bankAccount || "").replace(/\s/g, "");
  const payload = {
    user_id: user.id,
    applicant_name: values.name || "",
    business_name: values.businessName || values.name || "Vendor business",
    vendor_type: values.vendorType || "OTHER",
    phone: values.phone || null,
    email: values.email || user.email || null,
    location_text: values.location || null,
    address: values.address || values.location || null,
    city: values.city || null, state: values.state || null, pincode: values.pincode || null,
    services: Array.isArray(values.services) ? values.services : [],
    experience: values.experience || null,
    certifications: values.certifications || null,
    pricing: values.pricing || null,
    bank_account_last4: bankAccount ? bankAccount.slice(-4) : null,
    ifsc: values.ifsc || null,
    bank_name: values.ifscBankName || null,
    gst_number: values.gst || null,
    files_meta: filesMeta,
    status: "PENDING",
    rejection_reason: null,
    reviewed_at: null,
    reviewed_by: null,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await client.from("vendor_applications").insert(payload).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function fetchVendorApplications() {
  const { data, error } = await requireSupabase().from("vendor_applications").select("*").order("submitted_at", { ascending: false });
  if (error) throw error;
  return data.map(toApplication);
}

export async function updateVendorApplicationStatus(application, status, _reviewerId, rejectionReason = null) {
  if (!["APPROVED", "REJECTED", "SUSPENDED"].includes(status)) throw new Error("Invalid vendor review status.");
  const { data, error } = await requireSupabase().rpc("review_vendor_application", {
    p_application_id: application.id,
    p_status: status,
    p_rejection_reason: rejectionReason,
  });
  if (error) throw error;
  return toApplication(data);
}
