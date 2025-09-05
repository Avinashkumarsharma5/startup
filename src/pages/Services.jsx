import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mic,
  Star,
  StarHalf,
  Bookmark,
  BookmarkCheck,
  PhoneCall,
  CalendarDays,
  MessageSquare,
  PlayCircle,
  Gift,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  PartyPopper,
  Camera,
  Tent,
  Building2,
  Lightbulb,
  Utensils,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Decoration",
      desc: "Traditional & theme-based decoration services.",
      icon: <PartyPopper className="w-5 h-5" />,
      basePrice: 4999,
      category: "Wedding",
      rating: 4.7,
      images: [
        "https://images.unsplash.com/photo-1546778313-8e3a6a8e8b0c?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "d1", name: "Royal Decor Co.", rating: 4.8 },
        { id: "d2", name: "Floral Fantasy", rating: 4.6 },
      ],
    },
    {
      id: 2,
      title: "Lighting",
      desc: "Festive and wedding lighting solutions.",
      icon: <Lightbulb className="w-5 h-5" />,
      basePrice: 2999,
      category: "Wedding",
      rating: 4.5,
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "l1", name: "Shine & Co.", rating: 4.5 },
        { id: "l2", name: "Glow Events", rating: 4.4 },
      ],
    },
    {
      id: 3,
      title: "Catering",
      desc: "Pure veg catering with regional specialities.",
      icon: <Utensils className="w-5 h-5" />,
      basePrice: 199,
      unit: "/plate",
      category: "Food",
      rating: 4.8,
      images: [
        "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "c1", name: "Sharma Caterers", rating: 4.8 },
        { id: "c2", name: "Gupta Caterers", rating: 4.6 },
        { id: "c3", name: "Verma Caterers", rating: 4.7 },
      ],
    },
    {
      id: 4,
      title: "Tents",
      desc: "Waterproof and stylish tent setups.",
      icon: <Tent className="w-5 h-5" />,
      basePrice: 8999,
      category: "Wedding",
      rating: 4.4,
      images: [
        "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "t1", name: "Deluxe Tent House", rating: 4.5 },
        { id: "t2", name: "Royal Tent Decor", rating: 4.4 },
      ],
    },
    {
      id: 5,
      title: "Videography",
      desc: "Professional wedding & event videography.",
      icon: <Camera className="w-5 h-5" />,
      basePrice: 14999,
      category: "Media",
      rating: 4.9,
      images: [
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "v1", name: "Pixel Studio", rating: 4.9 },
        { id: "v2", name: "Wedding Films", rating: 4.8 },
      ],
    },
    {
      id: 6,
      title: "Marriage Halls",
      desc: "Spacious halls for events & weddings.",
      icon: <Building2 className="w-5 h-5" />,
      basePrice: 49999,
      category: "Venue",
      rating: 4.6,
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
      ],
      vendors: [
        { id: "h1", name: "Sanskaraa Palace", rating: 4.7 },
        { id: "h2", name: "Grand Royale Hall", rating: 4.6 },
      ],
    },
  ];

  const reels = [
    {
      id: "r1",
      src:
        "https://cdn.coverr.co/videos/coverr-a-beautiful-wedding-ceremony-8799/1080p.mp4",
      title: "Wedding snippets",
    },
    {
      id: "r2",
      src:
        "https://cdn.coverr.co/videos/coverr-glittering-party-4341/1080p.mp4",
      title: "Lighting highlights",
    },
  ];

  const seasonal = [
    { id: "s1", tag: "Navratri", color: "bg-orange-100 text-orange-700" },
    { id: "s2", tag: "Wedding Season", color: "bg-rose-100 text-rose-700" },
    { id: "s3", tag: "Festive Offers", color: "bg-emerald-100 text-emerald-700" },
  ];

  const packages = [
    {
      id: "p1",
      name: "Classic Wedding Pack",
      includes: ["Decoration", "Lighting", "Catering"],
      price: 89999,
      savePercent: 14,
    },
    {
      id: "p2",
      name: "Royal Grand Pack",
      includes: ["Decoration", "Lighting", "Catering", "Videography", "Tents"],
      price: 199999,
      savePercent: 18,
    },
  ];

  const adsVideos = useMemo(
    () => [
      "https://cdn.coverr.co/videos/coverr-wedding-bouquet-5196/1080p.mp4",
      "https://cdn.coverr.co/videos/coverr-golden-festive-lights-6428/1080p.mp4",
      "https://cdn.coverr.co/videos/coverr-pretty-wedding-cake-0496/1080p.mp4",
    ],
    []
  );
  const [currentAd, setCurrentAd] = useState(0);
  const adRef = useRef(null);
  useEffect(() => {
    const v = adRef.current;
    if (!v) return;
    const handleEnd = () => setCurrentAd((p) => (p + 1) % adsVideos.length);
    v.addEventListener("ended", handleEnd);
    return () => v.removeEventListener("ended", handleEnd);
  }, [adsVideos.length]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [wish, setWish] = useState({});

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchQ = `${s.title} ${s.desc}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchC = category ? s.category === category : true;
      const matchR = s.rating >= minRating;
      return matchQ && matchC && matchR;
    });
  }, [query, category, minRating, services]);

  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const setupRecognition = () => {
    const Sr = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Sr) return null;
    const rec = new Sr();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      setQuery(text);
      setListening(false);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    return rec;
  };
  const onVoice = () => {
    if (!recognitionRef.current) recognitionRef.current = setupRecognition();
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      alert("Voice search not supported in this browser.");
    }
  };

  const [eventDate, setEventDate] = useState("");
  const [city, setCity] = useState("Your City");

  const [reviews, setReviews] = useState({});
  const addReview = (id, r) => {
    setReviews((prev) => ({ ...prev, [id]: [...(prev[id] || []), r] }));
  };

  const [coins, setCoins] = useState(0);
  const handleBook = (s) => {
    setCoins((c) => c + 50);
    alert(`Booked: ${s.title} — reward +50 Sanskaraa Coins!`);
  };

  const recommended = useMemo(() => {
    const picks = new Set();
    if (filtered.some((f) => f.title === "Decoration")) {
      picks.add("Lighting");
      picks.add("Tents");
    }
    if (filtered.some((f) => f.title === "Marriage Halls")) {
      picks.add("Catering");
      picks.add("Videography");
    }
    return services.filter((s) => picks.has(s.title));
  }, [filtered, services]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg.trim();
    setChatLog((l) => [...l, { from: "you", text: msg }, { from: "bot", text: "Thanks! A vendor will reply shortly." }]);
    setChatMsg("");
  };

  const rupee = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  const stars = (n) => {
    const full = Math.floor(n);
    const half = n - full >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {half && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-600" />
            <h1 className="font-bold text-lg">Sanskaraa Services</h1>
            <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Coins: {coins}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className={`px-3 py-1.5 rounded-xl border text-sm ${chatOpen ? "bg-rose-600 text-white" : "bg-white"}`} onClick={() => setChatOpen((v) => !v)}>
              <MessageSquare className="inline w-4 h-4 mr-1" /> Chat
            </button>
            <a href="tel:+911234567890" className="px-3 py-1.5 rounded-xl border text-sm bg-white">
              <PhoneCall className="inline w-4 h-4 mr-1" /> Call
            </a>
          </div>
        </div>
      </header>

      {/* Hero: Video Ads + Search */}
      <section className="max-w-7xl mx-auto px-4 pt-5 grid lg:grid-cols-3 gap-6">
        <motion.div layout className="lg:col-span-2 rounded-2xl overflow-hidden bg-black/90 relative shadow">
          <video
            ref={adRef}
            key={currentAd}
            src={adsVideos[currentAd]}
            className="w-full h-64 lg:h-[380px] object-cover"
            autoPlay
            muted
            playsInline
            controls={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="text-white/90 text-sm">Auto-playing ads • {currentAd + 1}/{adsVideos.length}</div>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-white/80 hover:bg-white"
                onClick={() => setCurrentAd((p) => (p - 1 + adsVideos.length) % adsVideos.length)}
                aria-label="Prev ad"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-white/80 hover:bg-white"
                onClick={() => setCurrentAd((p) => (p + 1) % adsVideos.length)}
                aria-label="Next ad"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div layout className="rounded-2xl p-4 bg-white shadow border">
          <div className="font-semibold flex items-center gap-2 mb-2">
            <Search className="w-4 h-4" /> Find a service
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (e.g., hall, catering, lights)"
                className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
            <button onClick={onVoice} className={`px-3 rounded-xl border ${listening ? "bg-emerald-50 border-emerald-300" : "bg-white"}`}>
              <Mic className={`w-4 h-4 ${listening ? "text-emerald-600 animate-pulse" : "text-slate-600"}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <select value={category || ""} onChange={(e) => setCategory(e.target.value || null)} className="px-3 py-2 rounded-xl border">
              <option value="">All Categories</option>
              {[...new Set(services.map((s) => s.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="px-3 py-2 rounded-xl border">
              <option value={0}>Any rating</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <input type="date" className="flex-1 px-3 py-2 rounded-xl border" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <input className="px-3 py-2 rounded-xl border" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="mt-3 text-xs text-slate-500">Tip: Set date & city to check availability on vendor cards.</div>
        </motion.div>
      </section>

      {/* Seasonal / Trending chips */}
      <section className="max-w-7xl mx-auto px-4 mt-6 flex flex-wrap gap-2">
        {seasonal.map((s) => (
          <span key={s.id} className={`text-xs px-2 py-1 rounded-full ${s.color} border`}>{s.tag}</span>
        ))}
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">All Services</h2>
          <span className="text-sm text-slate-500">{filtered.length} results</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((s) => (
            <motion.div key={s.id} layout className="rounded-2xl overflow-hidden bg-white border shadow-sm group">
              <div className="relative">
                <img src={s.images[0]} alt={s.title} className="w-full h-40 object-cover" />
                <button
                  onClick={() => setWish((w) => ({ ...w, [s.id]: !w[s.id] }))}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                >
                  {wish[s.id] ? <BookmarkCheck className="w-5 h-5 text-rose-600" /> : <Bookmark className="w-5 h-5" />}
                </button>
                <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded bg-black/50 text-white flex items-center gap-1">
                  {stars(s.rating)} <span className="ml-1">{s.rating.toFixed(1)}</span>
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="p-1.5 rounded-xl bg-slate-100">{s.icon}</span>
                  {s.title}
                </div>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{s.desc}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-bold">{rupee(s.basePrice)}</span>
                    {s.unit && <span className="text-slate-500"> {s.unit}</span>}
                  </div>
                  <button onClick={() => handleBook(s)} className="px-3 py-1.5 rounded-xl text-sm bg-rose-600 text-white hover:bg-rose-700">
                    Book Now
                  </button>
                </div>

                {/* Vendor mini carousel */}
                <div className="mt-3">
                  <div className="text-xs text-slate-500 mb-1">Vendors</div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {s.vendors.map((v) => (
                      <div key={v.id} className="min-w-[180px] p-2 rounded-xl border bg-slate-50">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>{v.name}</span>
                          <span className="flex items-center gap-1">{stars(v.rating)}<span>{v.rating}</span></span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <button className="px-2 py-1 text-xs rounded-lg bg-white border">Check</button>
                          <button className="px-2 py-1 text-xs rounded-lg bg-emerald-600 text-white">Ask</button>
                        </div>
                        {eventDate && (
                          <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                            Likely available on {eventDate} in {city}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="mt-3">
                  <details className="rounded-xl bg-slate-50 border p-2">
                    <summary className="text-sm font-medium cursor-pointer">Ratings & Reviews</summary>
                    <div className="mt-2 space-y-2">
                      {(reviews[s.id] || []).map((r, idx) => (
                        <div key={idx} className="text-sm p-2 rounded-lg bg-white border">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{r.name}</span>
                            <span className="flex items-center gap-1">{stars(r.stars)}<span>{r.stars.toFixed(1)}</span></span>
                          </div>
                          <p className="text-slate-600 text-sm mt-1">{r.msg}</p>
                        </div>
                      ))}
                      <ReviewForm onSubmit={(r) => addReview(s.id, r)} />
                    </div>
                  </details>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Smart Packages */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Gift className="w-5 h-5"/> Smart Packages</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {packages.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-600">Includes: {p.includes.join(", ")}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Save {p.savePercent}%</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-bold">{rupee(p.price)}</div>
                <button className="px-3 py-1.5 rounded-xl text-sm bg-rose-600 text-white">Book Package</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {recommended.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><HeartHandshake className="w-5 h-5"/> You may also need</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {recommended.map((r) => (
              <div key={r.id} className="min-w-[240px] rounded-2xl border bg-white p-3">
                <div className="font-semibold flex items-center gap-2">{r.icon} {r.title}</div>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{r.desc}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-sm">{rupee(r.basePrice)}</span>
                  <button onClick={() => handleBook(r)} className="px-3 py-1.5 rounded-xl text-sm bg-rose-600 text-white">Add</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reels / Shorts */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><PlayCircle className="w-5 h-5"/> Reels & Highlights</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {reels.map((r) => (
            <div key={r.id} className="min-w-[220px] rounded-2xl overflow-hidden border bg-black/90">
              <video src={r.src} playsInline controls muted className="w-[220px] h-[360px] object-cover" />
              <div className="text-white/90 text-sm p-2">{r.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 right-4 w-80 rounded-2xl border bg-white shadow-xl overflow-hidden"
          >
            <div className="px-3 py-2 border-b font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4"/> Instant Chat (demo)
            </div>
            <div className="h-64 p-3 space-y-2 overflow-auto">
              {chatLog.map((m, i) => (
                <div key={i} className={`text-sm max-w-[80%] px-3 py-2 rounded-2xl ${m.from === "you" ? "bg-rose-600 text-white ml-auto" : "bg-slate-100"}`}>{m.text}</div>
              ))}
              {chatLog.length === 0 && (
                <div className="text-xs text-slate-500">Ask anything like "Is 24 Nov available for Pixel Studio in Indore?"</div>
              )}
            </div>
            <div className="p-2 border-t flex gap-2">
              <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Type message..." className="flex-1 px-3 py-2 rounded-xl border"/>
              <button onClick={sendChat} className="px-3 py-2 rounded-xl bg-rose-600 text-white">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto px-4 my-10">
        <div className="rounded-2xl p-5 bg-gradient-to-r from-rose-50 to-amber-50 border text-center">
          <div className="font-semibold text-lg flex items-center justify-center gap-2"><Gift className="w-5 h-5"/> Sign up & get 200 Sanskaraa Coins</div>
          <p className="text-sm text-slate-600 mt-1">Use coins for discounts on any service or package.</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-rose-600 text-white">Create account</button>
            <button className="px-4 py-2 rounded-xl border bg-white">Know more</button>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-center mt-4">© {new Date().getFullYear()} Sanskaraa. All rights reserved.</div>
      </footer>
    </div>
  );
}

function ReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [stars, setStars] = useState(5);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !msg.trim()) return;
        onSubmit({ name: name.trim(), msg: msg.trim(), stars });
        setName("");
        setMsg("");
        setStars(5);
      }}
      className="mt-2 p-2 rounded-lg bg-white border"
    >
      <div className="text-xs font-medium mb-1">Add a review</div>
      <div className="grid grid-cols-2 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="px-3 py-2 rounded-xl border text-sm"
        />
        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          className="px-3 py-2 rounded-xl border text-sm"
        >
          {[5, 4.5, 4, 3.5, 3].map((s) => (
            <option key={s} value={s}>
              {s} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Share your experience..."
        className="w-full mt-2 px-3 py-2 rounded-xl border text-sm"
        rows={2}
      />
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-sm"
        >
          Post
        </button>
      </div>
    </form>
  );
}
