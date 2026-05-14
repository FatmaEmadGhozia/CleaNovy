import { Shirt, Grid3X3, Wind, Bed, Footprints, Baby } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "ملابس", icon: <Shirt className="h-8 w-8" />, id: "cat-1", desc: "كل أنواع الملابس" },
  { name: "سجاد", icon: <Grid3X3 className="h-8 w-8" />, id: "cat-2", desc: "تنظيف عميق" },
  { name: "ستائر", icon: <Wind className="h-8 w-8" />, id: "cat-3", desc: "غسيل ومكو" },
  { name: "مفروشات", icon: <Bed className="h-8 w-8" />, id: "cat-4", desc: "عناية خاصة" },
  { name: "أحذية", icon: <Footprints className="h-8 w-8" />, id: "cat-5", desc: "تنظيف وتلميع" },
  { name: "منتجات أطفال", icon: <Baby className="h-8 w-8" />, id: "cat-6", desc: "آمن وصحي" },
];

export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-14">
        <div className="text-right space-y-2">
          <p className="text-sm font-semibold" style={{ color: "#00C9B1" }}>ما نقدمه</p>
          <h2 className="text-4xl font-bold" style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}>
            خدماتنا المتنوعة
          </h2>
          <p style={{ color: "#777779" }}>نعتني بكل شيء، من ملابسك اليومية إلى السجاد والمفروشات</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative group rounded-3xl text-center cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                padding: "32px 16px",
                backgroundColor: hovered === cat.id ? "#0D1F3C" : "#F8FAFB",
                transform: hovered === cat.id ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                boxShadow: hovered === cat.id
                  ? "0 20px 50px #0D1F3C25"
                  : "0 2px 12px #0D1F3C06",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                style={{
                  backgroundColor: hovered === cat.id ? "#00C9B120" : "#fff",
                  color: hovered === cat.id ? "#00C9B1" : "#00C9B1",
                  boxShadow: "0 4px 12px #0D1F3C08",
                }}
              >
                {cat.icon}
              </div>
              <h4
                className="font-bold text-sm transition-colors duration-300"
                style={{
                  color: hovered === cat.id ? "#ffffff" : "#0D1F3C",
                  fontFamily: "Tajawal, sans-serif",
                }}
              >
                {cat.name}
              </h4>
              <p
                className="text-xs mt-1 transition-all duration-300"
                style={{
                  color: hovered === cat.id ? "#ffffff80" : "#777779",
                  opacity: hovered === cat.id ? 1 : 0.7,
                }}
              >
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
