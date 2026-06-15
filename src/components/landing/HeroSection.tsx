
import { useState, useEffect } from "react";
import { Navigation, Truck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = () => {
    navigate("/cleannovy");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-12 pt-20"
      style={{ backgroundColor: "#F7F9FC" }} // 
    >
      {/* Animated background blobs */}
      <div
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ backgroundColor: "#00C9B1" }}
      />
      <div
        className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "#F4C542", animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: "#0D1F3C" }}
      />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <div
          className="space-y-8 text-right transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Badge */}
          <div className="flex justify-end">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold"
              style={{ backgroundColor: "#F4C54220", color: "#F4C542" }}
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              منصة الغسيل الأولى في المنطقة
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif", lineHeight: "1.2" }}
          >
            اختار مغسلتك
            <br />
            <span
              className="relative inline-block"
              style={{ color: "#00C9B1" }}
            >
              القريبة واطلب بسهولة
              <svg
                className="absolute -bottom-2 right-0 w-full"
                viewBox="0 0 300 12"
                style={{ height: 8 }}
              >
                <path
                  d="M0,6 Q75,0 150,6 Q225,12 300,6"
                  fill="none"
                  stroke="#F4C542"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="text-lg leading-relaxed max-w-lg mr-0 ml-auto"
            style={{ color: "#777779" }}
          >
            نظيف هو رفيقك الرقمي للعناية بملابسك. نجمع لك أفضل المغاسل المعتمدة
            في منطقتك مع خدمة الاستلام والتوصيل حتى باب منزلك.
          </p>

          {/* Search bar */}
          <div
            className="transition-all duration-300"
            style={{
              transform: focused ? "scale(1.02)" : "scale(1)",
            }}
          >
            <div
              className="relative bg-white rounded-2xl p-2 flex items-center gap-2 transition-all duration-300"
              style={{
                boxShadow: focused
                  ? "0 20px 60px #00C9B130, 0 4px 20px #0D1F3C10"
                  : "0 8px 40px #0D1F3C12, 0 2px 8px #0D1F3C08",
                border: focused ? "2px solid #00C9B1" : "2px solid #f0f0f0",
              }}
            >
              <Button
                size="lg"
                onClick={handleSearch}
                className="rounded-xl text-white font-semibold shrink-0 transition-all duration-200 hover:scale-95 active:scale-90"
                style={{ backgroundColor: "#00C9B1" }}
              >
                بحث
              </Button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="ما هي منطقتك الحالية؟"
                className="flex-grow bg-transparent outline-none text-right px-3 text-sm"
                style={{ color: "#0D1F3C" }}
                dir="rtl"
              />
              <button
                className="flex items-center gap-2 px-5 border-r border-gray-100 transition-colors shrink-0 rounded-xl py-2 hover:bg-[#00C9B1]/10"
                style={{ color: "#777779" }}
              >
                <span className="text-sm font-medium hidden sm:block">موقعي</span>
                <Navigation className="h-5 w-5" style={{ color: "#00C9B1" }} />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 justify-end flex-wrap">
            {[
              { val: "+500", label: "مغسلة" },
              { val: "50k+", label: "عميل" },
              { val: "4.8★", label: "تقييم" },
            ].map((b) => (
              <div
                key={b.val}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border"
                style={{ borderColor: "#e5e7eb", backgroundColor: "#FAFAFA" }}
              >
                <span className="text-sm font-bold" style={{ color: "#0D1F3C" }}>{b.val}</span>
                <span className="text-xs" style={{ color: "#777779" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div
          className="relative hidden md:block transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "200ms",
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-[40px] blur-2xl opacity-20"
            style={{ backgroundColor: "#00C9B1", transform: "scale(0.9)" }}
          />

          {/* Main card - تم إضافة تأثير الحركة يميناً ويساراً عند المرور بالماوس */}
          <div
            className="relative z-10 p-3 rounded-[40px] bg-white transition-transform duration-500 hover:animate-side-to-side"
            style={{ 
              boxShadow: "0 30px 80px #0D1F3C15, 0 8px 24px #0D1F3C08",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800"
              alt="Laundry service"
              className="rounded-[32px] w-full object-cover"
              style={{ height: 420 }}
            />
          </div>

          {/* Floating delivery badge */}
          <div
            className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl z-20 flex items-center gap-3 bg-white"
            style={{
              boxShadow: "0 20px 50px #0D1F3C15",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#00C9B115" }}
            >
              <Truck className="h-5 w-5" style={{ color: "#00C9B1" }} />
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "#777779" }}>أسرع توصيل</p>
              <p className="font-bold text-sm" style={{ color: "#0D1F3C" }}>أقل من 24 ساعة</p>
            </div>
          </div>

          {/* Floating rating badge */}
          <div
            className="absolute -top-4 -left-4 px-5 py-3 rounded-2xl z-20 flex items-center gap-2 bg-white"
            style={{
              boxShadow: "0 20px 50px #0D1F3C15",
              animation: "float 3s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
          >
            <Star className="h-5 w-5" style={{ color: "#F4C542", fill: "#F4C542" }} />
            <div className="text-right">
              <p className="font-bold text-sm" style={{ color: "#0D1F3C" }}>4.9</p>
              <p className="text-xs" style={{ color: "#777779" }}>تقييم المغاسل</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes side-to-side {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
        .hover\\:animate-side-to-side:hover {
          animation: side-to-side 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
