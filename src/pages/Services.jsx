import React, { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

export default function ServicesPage() {
  // 🔥 Video Ads
  const adsVideos = ["/videos/ad1.mp4", "/videos/ad2.mp4", "/videos/ad3.mp4"];
  const [currentAd, setCurrentAd] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleEnded = () => {
      setCurrentAd((prev) => (prev + 1) % adsVideos.length);
    };
    const video = videoRef.current;
    if (video) video.addEventListener("ended", handleEnded);
    return () => video && video.removeEventListener("ended", handleEnded);
  }, [adsVideos.length]);

  // ✅ Services
  const services = [
    { title: "Decoration", desc: "Traditional & theme-based decoration services.", icon: "🎉" },
    { title: "Lighting", desc: "Festive and wedding lighting solutions.", icon: "💡" },
    { title: "Catering", desc: "Pure veg catering with regional specialities.", icon: "🍽️" },
    { title: "Tents", desc: "Waterproof and stylish tent setups.", icon: "⛺" },
    { title: "Videography", desc: "Professional wedding & event videography.", icon: "🎥" },
    { title: "Marriage Halls", desc: "Spacious halls for events & weddings.", icon: "🏛️" },
  ];

  // ✅ Vendors Data
  const famousCaterers = [
    { id: 1, name: "Sharma Caterers", img: "/images/catering1.jpg", rating: 4.8 },
    { id: 2, name: "Gupta Caterers", img: "/images/catering2.jpg", rating: 4.6 },
    { id: 3, name: "Verma Caterers", img: "/images/catering3.jpg", rating: 4.7 },
  ];
  const famousTents = [
    { id: 1, name: "Deluxe Tent House", img: "/images/tent1.jpg", rating: 4.5 },
    { id: 2, name: "Royal Tent Decor", img: "/images/tent2.jpg", rating: 4.4 },
  ];
  const famousVideographers = [
    { id: 1, name: "Pixel Studio", img: "/images/video1.jpg", rating: 4.9 },
    { id: 2, name: "Wedding Films", img: "/images/video2.jpg", rating: 4.7 },
  ];
  const famousDecorators = [
    { id: 1, name: "Floral Dreams", img: "/images/decor1.jpg", rating: 4.6 },
    { id: 2, name: "Elegant Events", img: "/images/decor2.jpg", rating: 4.8 },
  ];
  const marriageHalls = [
    { id: 1, name: "Sanskaraa Banquet Hall", img: "/images/hall1.jpg", rating: 4.9 },
    { id: 2, name: "Royal Palace", img: "/images/hall2.jpg", rating: 4.7 },
  ];

  // 🔥 Vendor Card Section
  const VendorSection = ({ title, data }) => (
    <section className="px-6 mb-10">
      <h2 className="text-xl font-bold text-orange-700 mb-3">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-3 scrollbar-hide snap-x">
        {data.map((item) => (
          <div
            key={item.id}
            className="min-w-[200px] snap-center bg-[#FFF8EC] rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img src={item.img} alt={item.name} className="h-32 w-full object-cover rounded-t-2xl" />
            <div className="p-3">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <div className="flex items-center text-orange-500 text-sm mt-1">
                <Star className="w-4 h-4 fill-orange-500" />
                <span className="ml-1">{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="bg-gradient-to-b from-[#FFF5E1] to-[#FFE5B4] min-h-screen font-sans">

      {/* 🔥 Hero Ads */}
      <section className="flex justify-center items-center mb-10 px-4 ">
        <div className="relative w-full max-w-4xl h-56 md:h-72 overflow-hidden rounded-3xl shadow-lg mt-40">
          <video
            key={currentAd}
            ref={videoRef}
            src={adsVideos[currentAd]}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center">
            <h1 className="text-white text-xl md:text-3xl font-bold pb-4">Celebrate with Sanskaraa</h1>
          </div>
        </div>
      </section>

      {/* ✅ Our Services */}
      <section className="px-6 mb-12">
        <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#FFF8EC] p-5 rounded-2xl shadow hover:shadow-lg transition text-center transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Vendor Sections */}
      <VendorSection title="Famous Caterers" data={famousCaterers} />
      <VendorSection title="Famous Tents" data={famousTents} />
      <VendorSection title="Famous Videographers" data={famousVideographers} />
      <VendorSection title="Famous Decorators" data={famousDecorators} />
      <VendorSection title="Marriage Halls" data={marriageHalls} />

      {/* Footer */}
      <footer className="bg-[#FFF8EC] shadow-inner py-6 mt-10 text-center text-gray-600 rounded-t-2xl">
        © 2025 <span className="text-orange-700 font-semibold">Sanskaraa</span>. All rights reserved.
      </footer>
    </div>
  );
}
