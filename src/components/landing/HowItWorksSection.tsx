import { MapPin, Truck, CheckCircle2, Package } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "حدد موقعك",
    desc: "ابحث عن أفضل المغاسل القريبة منك بسهولة",
    icon: <MapPin className="h-7 w-7" />,
    id: "step-1",
    color: "#00C9B1",
    bg: "#00C9B115",
  },
  {
    title: "اختر الخدمة",
    desc: "حدد أنواع الملابس والخدمات المطلوبة",
    icon: <CheckCircle2 className="h-7 w-7" />,
    id: "step-2",
    color: "#F4C542",
    bg: "#F4C54218",
  },
  {
    title: "الاستلام",
    desc: "مندوبنا يستلم ملابسك من باب منزلك",
    icon: <Package className="h-7 w-7" />,
    id: "step-3",
    color: "#00C9B1",
    bg: "#00C9B115",
  },
  {
    title: "التوصيل",
    desc: "نعيدها لك نظيفة، معطرة ومكوية",
    icon: <Truck className="h-7 w-7" />,
    id: "step-4",
    color: "#F4C542",
    bg: "#F4C54218",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="py-24" style={{ backgroundColor: "#F8FAFB" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-16">
        <div className="space-y-3">
          <p className="text-sm font-semibold" style={{ color: "#00C9B1" }}>العملية بسيطة</p>
          <h2
            className="text-4xl font-bold"
            style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}
          >
            كيف يعمل نظيف؟
          </h2>
          <p style={{ color: "#777779" }}>أربع خطوات بسيطة تفصلك عن ملابس نظيفة وجاهزة</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connector line - desktop only */}
          <div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 hidden md:block"
            style={{
              background: "linear-gradient(to left, #F4C542, #00C9B1, #F4C542, #00C9B1)",
              opacity: visible ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-5 group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.6s ease ${i * 150}ms`,
              }}
            >
              {/* Icon circle */}
              <div className="relative z-10">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: step.bg,
                    color: step.color,
                    boxShadow: `0 8px 30px ${step.color}25`,
                  }}
                >
                  {step.icon}
                </div>
                {/* Step number */}
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  {i + 1}
                </span>
              </div>

              <div className="space-y-2">
                <h3
                  className="text-lg font-bold"
                  style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777779" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
