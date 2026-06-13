import { useEffect, useRef, useState } from "react";
import { Star, Building2, Users } from "lucide-react";

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const laundries = useCountUp(500, 1200, started);
  const clients = useCountUp(50, 1400, started);
  const rating = useCountUp(48, 1000, started);

  const stats = [
    {
      icon: <Building2 className="h-7 w-7" style={{ color: "#00C9B1" }} />,
      value: `+${laundries}`,
      label: "مغسلة معتمدة",
    },
    {
      icon: <Users className="h-7 w-7" style={{ color: "#00C9B1" }} />,
      value: `${clients}k+`,
      label: "عميل سعيد",
    },
    {
      icon: <Star className="h-7 w-7" style={{ color: "#F4C542", fill: "#F4C542" }} />,
      value: (rating / 10).toFixed(1),
      label: "تقييم الخدمات",
    },
  ];

  return (
    <section ref={ref} id="stats" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl p-8"
          style={{
            background: "linear-gradient(135deg, #F8FAFB 0%, #fff 100%)",
            boxShadow: "0 4px 40px #0D1F3C08",
            border: "1px solid #f0f0f0",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-3 text-center py-4 transition-all duration-300 hover:-translate-y-1 ${
                i !== 2 ? "md:border-l border-gray-100" : ""
              }`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: i === 1 ? "#00C9B110" : i === 2 ? "#F4C54215" : "#00C9B110" }}
              >
                {s.icon}
              </div>
              <p
                className="text-4xl font-extrabold tabular-nums"
                style={{ color: "#0D1F3C", fontFamily: "Tajawal, sans-serif" }}
              >
                {s.value}
              </p>
              <p className="text-sm" style={{ color: "#777779" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
