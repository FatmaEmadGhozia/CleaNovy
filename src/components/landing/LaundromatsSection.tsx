import { Star, MapPin, Truck, Clock, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";

const featuredLaundries = [
  {
    name: "مغسلة النور الحديثة",
    location: "حي الياسمين، الرياض",
    rating: "4.9",
    reviews: "248",
    tag: "بريميوم",
    tagStyle: { backgroundColor: "#00C9B115", color: "#00C9B1" },
    time: "24 ساعة",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
    id: "l-1",
  },
  {
    name: "اللمسة السريعة",
    location: "حي النرجس، الرياض",
    rating: "4.7",
    reviews: "186",
    tag: "ذهبي",
    tagStyle: { backgroundColor: "#F4C54220", color: "#c49a10" },
    time: "إغلاق 11م",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800",
    id: "l-2",
  },
  {
    name: "مغسلة بياض الثلج",
    location: "حي الملقا، الرياض",
    rating: "4.8",
    reviews: "312",
    tag: "بريميوم",
    tagStyle: { backgroundColor: "#00C9B115", color: "#00C9B1" },
    time: "24 ساعة",
    image: "https://images.unsplash.com/photo-1521656693047-9ef817896b5a?auto=format&fit=crop&q=80&w=800",
    id: "l-3",
  },
];

export default function Gallery() {
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <section id="gallery" className="py-24" style={{ backgroundColor: "#F8FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-14">
        {/* Header */}
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="text-right">
            <p className="text-sm font-semibold mb-1" style={{ color: "#00C9B1" }}>المغاسل المميزة</p>
            <h2 className="text-4xl font-bold" style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}>
              نخبة المغاسل المعتمدة
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-2xl border transition-all duration-200 hover:bg-[#00C9B1] hover:text-white hover:border-[#00C9B1]"
            style={{ color: "#00C9B1", borderColor: "#00C9B1" }}
          >
            <ArrowLeft className="h-4 w-4" />
            عرض الكل
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLaundries.map((l) => (
            <div
              key={l.id}
              className="group bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
              style={{
                boxShadow: "0 4px 20px #0D1F3C08",
                border: "1px solid #f0f0f0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px #0D1F3C15";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px #0D1F3C08";
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={l.image}
                  alt={l.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #0D1F3C40 0%, transparent 60%)",
                  }}
                />

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                  <Star className="h-3.5 w-3.5" style={{ color: "#F4C542", fill: "#F4C542" }} />
                  <span className="text-xs font-bold" style={{ color: "#0D1F3C" }}>{l.rating}</span>
                  <span className="text-xs" style={{ color: "#777779" }}>({l.reviews})</span>
                </div>

                {/* Like button */}
                <button
                  className="absolute top-3 left-3 w-9 h-9 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 active:scale-90"
                  onClick={() => toggleLike(l.id)}
                >
                  <Heart
                    className="h-4 w-4 transition-colors duration-200"
                    style={{
                      color: liked.includes(l.id) ? "#ef4444" : "#777779",
                      fill: liked.includes(l.id) ? "#ef4444" : "none",
                    }}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-right">
                <div className="flex items-start justify-between flex-row-reverse gap-2">
                  <h3 className="text-lg font-bold leading-snug" style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}>
                    {l.name}
                  </h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl shrink-0" style={l.tagStyle}>
                    {l.tag}
                  </span>
                </div>

                <p className="flex items-center justify-end gap-1.5 text-sm" style={{ color: "#777779" }}>
                  {l.location}
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: "#00C9B1" }} />
                </p>

                <div
                  className="pt-4 border-t flex items-center justify-between flex-row-reverse"
                  style={{ borderColor: "#f5f5f5" }}
                >
                  <div className="flex items-center gap-1.5" style={{ color: "#777779" }}>
                    <Clock className="h-4 w-4" style={{ color: "#00C9B1" }} />
                    <span className="text-xs">{l.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: "#777779" }}>
                    <Truck className="h-4 w-4" style={{ color: "#00C9B1" }} />
                    <span className="text-xs">توصيل متاح</span>
                  </div>
                  <button
                    className="text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#00C9B1] hover:text-white"
                    style={{ color: "#00C9B1", backgroundColor: "#00C9B110" }}
                  >
                    اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
