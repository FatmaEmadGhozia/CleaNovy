import { Landmark, Hotel, Building2, School, ArrowLeft } from "lucide-react";
import { useState } from "react";

const b2bItems = [
  { name: "مساجد", icon: <Landmark className="h-6 w-6" />, id: "b2b-1" },
  { name: "فنادق", icon: <Hotel className="h-6 w-6" />, id: "b2b-2" },
  { name: "شركات", icon: <Building2 className="h-6 w-6" />, id: "b2b-3" },
  { name: "مدارس", icon: <School className="h-6 w-6" />, id: "b2b-4" },
];

export default function PromoSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="promo" className="py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-[40px] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden"
          style={{ backgroundColor: "#0D1F3C" }}
        >
          {/* Animated blobs */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[120px] opacity-20 animate-pulse"
            style={{ backgroundColor: "#00C9B1" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-15"
            style={{ backgroundColor: "#F4C542" }}
          />

          {/* Text */}
          <div className="relative z-10 space-y-7 text-right flex-grow">
            <span
              className="inline-block text-xs font-semibold px-4 py-2 rounded-2xl"
              style={{ backgroundColor: "#F4C54220", color: "#F4C542" }}
            >
              للمؤسسات والشركات
            </span>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "#fff", fontFamily: "Tajawal, sans-serif" }}
            >
              عروض خاصة
              <br />
              <span style={{ color: "#F4C542" }}>للمؤسسات</span>
            </h2>
            <p className="text-lg leading-relaxed max-w-md mr-0 ml-auto" style={{ color: "#ffffff99" }}>
              نوفر حلول تنظيف احترافية للمساجد، المدارس، الفنادق، والشركات مع باقات
              اشتراك مرنة وأسعار تنافسية.
            </p>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300"
              style={{
                backgroundColor: hovered ? "#e6b02e" : "#F4C542",
                color: "#0D1F3C",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hovered ? "0 12px 30px #F4C54250" : "0 4px 16px #F4C54230",
              }}
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200"
                style={{ transform: hovered ? "translateX(-4px)" : "translateX(0)" }}
              />
              اطلب عرض سعر الآن
            </button>
          </div>

          {/* Grid cards */}
          <div className="relative z-10 grid grid-cols-2 gap-4 shrink-0">
            {b2bItems.map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-3xl text-center flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: "#ffffff08",
                  border: "1px solid #ffffff12",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#ffffff15";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#F4C54240";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#ffffff08";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#ffffff12";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                <div style={{ color: "#F4C542" }}>{item.icon}</div>
                <p className="text-white text-sm font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
