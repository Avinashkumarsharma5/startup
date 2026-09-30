import { requireSupabase } from "./supabase";
import { getCurrentUser } from "./supabaseAuth";

export async function startProviderLocationSharing(bookingId, onError = console.error) {
  if (!navigator.geolocation) throw new Error("Geolocation is not available in this browser.");
  const client = requireSupabase();
  const user = await getCurrentUser();
  if (!user) throw new Error("Sign in before sharing your location.");
  let active = true;
  let watchId;
  watchId = navigator.geolocation.watchPosition(async ({ coords }) => {
    if (!active) return;
    const { error } = await client.from("live_locations").upsert({
      booking_id: bookingId, provider_id: user.id, latitude: coords.latitude, longitude: coords.longitude,
      accuracy: coords.accuracy, heading: coords.heading, speed: coords.speed, is_sharing: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "booking_id" });
    if (error && active) onError(error);
  }, onError, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });

  return async () => {
    if (!active) return;
    active = false;
    navigator.geolocation.clearWatch(watchId);
    const { error } = await client.from("live_locations").update({ is_sharing: false, updated_at: new Date().toISOString() }).eq("booking_id", bookingId).eq("provider_id", user.id);
    if (error) onError(error);
  };
}

export function subscribeToBookingLocation(bookingId, onChange, onError = console.error) {
  const client = requireSupabase();
  let active = true;
  const refresh = async () => {
    const { data, error } = await client.from("live_locations").select("latitude,longitude,accuracy,heading,speed,is_sharing,updated_at").eq("booking_id", bookingId).maybeSingle();
    if (error) { if (active) onError(error); return; }
    if (active) onChange(data);
  };
  void refresh();
  const channel = client.channel(`booking-location:${bookingId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "live_locations", filter: `booking_id=eq.${bookingId}` }, refresh)
    .subscribe((status, error) => { if (status === "CHANNEL_ERROR" && active) onError(error || new Error("Location updates could not be subscribed.")); });
  return () => { active = false; void client.removeChannel(channel); };
}
