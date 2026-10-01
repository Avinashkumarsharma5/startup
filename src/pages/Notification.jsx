import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Bell, Clock, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { subscribeToAuthState } from "../lib/supabaseAuth";
import { requireSupabase } from "../lib/supabase";

function categoryFor(type = "") {
  if (type.startsWith("BOOKING_") || type.startsWith("VENDOR_")) return "Booking";
  if (type.startsWith("APPLICATION_")) return "Vendor";
  if (type.startsWith("ORDER_")) return "Order";
  if (type.startsWith("PAYMENT_")) return "Payment";
  return "Notification";
}

function mapNotification(row) {
  return { ...row, category: categoryFor(row.type), read: row.is_read };
}

export default function SanskaraaNotifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    let channel = null;
    let client = null;
    let requestVersion = 0;
    let currentUserId = null;

    const unsubscribeAuth = subscribeToAuthState(async (_event, session) => {
      const user = session?.user || null;
      if (channel && client) {
        await client.removeChannel(channel);
        channel = null;
      }
      currentUserId = user?.id || null;
      requestVersion += 1;
      const version = requestVersion;
      if (!active) return;
      setNotifications([]);
      setErrorMessage("");
      setLoading(Boolean(user));
      if (!user) return;

      try {
        client = requireSupabase();
        const refresh = async () => {
          const { data, error } = await client
            .from("notifications")
            .select("id,recipient_id,type,title,message,data,is_read,created_at")
            .eq("recipient_id", user.id)
            .order("created_at", { ascending: false })
            .limit(100);
          if (error) throw error;
          if (active && requestVersion === version && currentUserId === user.id) {
            setNotifications((data || []).map(mapNotification));
            setErrorMessage("");
          }
        };

        await refresh();
        if (!active || requestVersion !== version || currentUserId !== user.id) return;
        channel = client
          .channel(`notifications:${user.id}`)
          .on("postgres_changes", {
            event: "*", schema: "public", table: "notifications", filter: `recipient_id=eq.${user.id}`,
          }, () => { void refresh().catch((cause) => {
            console.error("Could not refresh notifications:", cause);
            if (active && requestVersion === version) setErrorMessage("New notifications could not be loaded. Try refreshing this page.");
          }); })
          .subscribe((status, cause) => {
            if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
              console.error("Notification realtime subscription failed:", cause);
              if (active && requestVersion === version) setErrorMessage("Live updates are temporarily unavailable. Your notifications can still be refreshed.");
            }
          });
      } catch (cause) {
        console.error("Could not load notifications:", cause);
        if (active && requestVersion === version) setErrorMessage("Notifications could not be loaded. Please check your connection and try again.");
      } finally {
        if (active && requestVersion === version) setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribeAuth();
      if (channel && client) void client.removeChannel(channel);
    };
  }, [reloadKey]);

  const filteredNotifications = useMemo(() => activeTab === "All"
    ? notifications
    : notifications.filter((note) => note.category === activeTab), [activeTab, notifications]);
  const unreadCount = notifications.filter((note) => !note.read).length;

  const markAllAsRead = useCallback(async () => {
    try {
      const user = await getSignedInUser();
      if (!user) return;
      const { error } = await requireSupabase().from("notifications")
        .update({ is_read: true }).eq("recipient_id", user.id).eq("is_read", false);
      if (error) throw error;
      setNotifications((current) => current.map((note) => ({ ...note, is_read: true, read: true })));
      setErrorMessage("");
    } catch (cause) {
      console.error("Could not mark notifications as read:", cause);
      toast.error("Notifications could not be marked as read.");
    }
  }, []);

  const markOneAsRead = async (note) => {
    if (note.read) return;
    try {
      const { error } = await requireSupabase().from("notifications")
        .update({ is_read: true }).eq("id", note.id).eq("recipient_id", note.recipient_id);
      if (error) throw error;
      setNotifications((current) => current.map((item) => item.id === note.id ? { ...item, read: true, is_read: true } : item));
    } catch (cause) {
      console.error("Could not mark notification as read:", cause);
      toast.error("This notification could not be marked as read.");
    }
  };

  const clearAllNotifications = async () => {
    try {
      const user = await getSignedInUser();
      if (!user) return;
      const { error } = await requireSupabase().from("notifications").delete().eq("recipient_id", user.id);
      if (error) throw error;
      setNotifications([]);
      setErrorMessage("");
    } catch (cause) {
      console.error("Could not clear notifications:", cause);
      toast.error("Notifications could not be cleared.");
    }
  };

  const deleteNotification = async (note) => {
    try {
      const { error } = await requireSupabase().from("notifications")
        .delete().eq("id", note.id).eq("recipient_id", note.recipient_id);
      if (error) throw error;
      setNotifications((current) => current.filter((item) => item.id !== note.id));
    } catch (cause) {
      console.error("Could not delete notification:", cause);
      toast.error("This notification could not be deleted.");
    }
  };

  const openRelatedPage = async (note) => {
    await markOneAsRead(note);
    const path = note.type === "VENDOR_ASSIGNED"
      ? "/vendor/dashboard"
      : note.type === "APPLICATION_SUBMITTED"
        ? "/admin/vendors"
        : note.type === "APPLICATION_APPROVED" || note.type === "APPLICATION_REJECTED"
          ? "/vendor-registration"
          : note.category === "Booking" || note.category === "Order"
            ? "/bookingspage"
            : "/userprofile";
    navigate(path);
  };

  return (
    <main className="min-h-screen bg-glow px-4 pb-12 pt-20 font-serif text-[#5C3A21] sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#C19A6B] p-2"><Bell className="h-6 w-6 text-white" /></div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">{unreadCount}</span>}
          </div>
          <div className="flex gap-3">
            {unreadCount > 0 && <button type="button" onClick={() => void markAllAsRead()} className="rounded-xl bg-[#C19A6B] px-4 py-2 text-sm text-white hover:opacity-90">Mark all read</button>}
            {notifications.length > 0 && <button type="button" onClick={() => void clearAllNotifications()} className="flex items-center gap-1 rounded-xl border border-[#C19A6B] px-4 py-2 text-sm hover:bg-[#C19A6B]/10"><Trash2 className="h-4 w-4" /> Clear all</button>}
          </div>
        </header>

        {errorMessage && <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><span>{errorMessage}</span><button type="button" onClick={() => { setLoading(true); setReloadKey((key) => key + 1); }} className="rounded-lg border border-amber-400 px-3 py-1.5 font-semibold">Retry</button></div>}

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {["All", "Booking", "Order", "Vendor", "Payment", "Notification"].map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "border-transparent bg-[#C19A6B] text-white shadow" : "border-[#C19A6B] hover:bg-[#C19A6B]/10"}`}>
              {tab === "All" ? "🔔" : tab === "Booking" ? "🙏" : tab === "Order" ? "📦" : tab === "Vendor" ? "🏪" : tab === "Payment" ? "💳" : "🔔"} {tab}
            </button>
          ))}
        </div>

        {loading ? <p className="py-12 text-center text-sm text-[#7B5A38]">Loading notifications…</p> : filteredNotifications.length === 0 ? (
          <div className="rounded-2xl bg-white py-12 text-center text-[#7B5A38] shadow-sm">
            <div className="mb-4 text-5xl">🕉️</div><p className="text-xl">{notifications.length ? "No notifications in this category" : "No notifications yet"}</p>
            <p className="mt-2 text-sm">Booking and account updates will appear here.</p>
            {activeTab !== "All" && <button type="button" onClick={() => setActiveTab("All")} className="mt-4 underline">View all</button>}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredNotifications.map((note) => (
                <motion.article key={note.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} className={`rounded-2xl border-l-4 bg-white p-4 shadow-sm ${note.read ? "border-l-[#C19A6B]" : "border-l-green-500 ring-1 ring-[#C19A6B]/20"}`}>
                  <div className="flex items-start gap-3">
                    <button type="button" onClick={() => void openRelatedPage(note)} className="min-w-0 flex-1 text-left">
                      <h2 className="flex items-center gap-2 text-lg font-semibold">{note.title || "Sanskaraa update"}{!note.read && <span className="h-2 w-2 rounded-full bg-red-500" />}</h2>
                      <p className="mt-1 text-sm text-[#7B5A38]">{note.message}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#A98A6E]"><Clock className="h-3 w-3" />{new Date(note.created_at).toLocaleString("en-IN")}</span>
                    </button>
                    <button type="button" aria-label="Delete notification" onClick={() => void deleteNotification(note)} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"><X className="h-4 w-4" /></button>
                  </div>
                  {(note.category === "Booking" || note.category === "Order") && <button type="button" onClick={() => void openRelatedPage(note)} className="ml-11 mt-2 text-sm font-medium text-[#C19A6B] underline">View {note.category.toLowerCase()} details</button>}
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}

async function getSignedInUser() {
  const { data, error } = await requireSupabase().auth.getUser();
  if (error) throw error;
  return data.user || null;
}
