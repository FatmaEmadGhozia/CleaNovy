import { Eye, Rocket, Leaf, Shield, Clock, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <Navbar />
      {/* Back button */}
      <div style={{ padding: "10px 24px", borderBottom: "1px solid #f1f5f9" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            color: "#0D1F3C", fontSize: 14,
            fontFamily: "Tajawal, sans-serif", fontWeight: 600,
            padding: "4px 10px", borderRadius: 8, transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#14b8a6"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#0D1F3C"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          رجوع
        </button>
      </div>
      {/* Hero Section */}
      <section className="relative h-[340px] md:h-[420px] flex items-center justify-end overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0D1F3C]/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-right">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            من نحن
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl ml-auto">
            في Cleanovy نعيد تعريف مفهوم العناية بالملابس من خلال الجمع بين
            التكنولوجيا الحديثة والخبرة التقليدية لنمنحك تجربة لا مثيل لها
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-[300px] md:h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80"
              alt="fabric"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {/* Vision */}
            <div className="bg-gray-50 rounded-2xl p-6 text-right">
              <div className="flex items-center justify-end gap-2 mb-3">
                <h2 className="text-xl font-bold text-[#0D1F3C]">رؤية الشركة</h2>
                <div
                  className="p-2 rounded-full"
                  style={{ backgroundColor: "rgb(0,201,177,0.15)" }}
                >
                  <Eye className="h-5 w-5" style={{ color: "rgb(0,201,177)" }} />
                </div>
              </div>
              <p className="text-[#0D1F3C]/70 text-sm leading-relaxed">
                أن نصبح الشريك الرقمي الأول والأكثر موثوقية في مجال العناية
                بالمنسوجات في المنطقة، من خلال تقديم خدمات ذكية تجعل حياة
                عملائنا أكثر سهولة وأناقة
              </p>
            </div>

            {/* Mission */}
            <div
              className="rounded-2xl p-6 text-right"
              style={{ backgroundColor: "#0D1F3C" }}
            >
              <div className="flex items-center justify-end gap-2 mb-3">
                <h2 className="text-xl font-bold text-white">رسالتنا</h2>
                <div
                  className="p-2 rounded-full"
                  style={{ backgroundColor: "rgb(0,201,177,0.2)" }}
                >
                  <Rocket
                    className="h-5 w-5"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                نلتزم بتقديم حلول غسيل وعناية فائقة الجودة، مع الحفاظ على وقت
                عملائنا الثمين من خلال السرعة، الأمان، والاستدامة البيئية في
                كل قطعة تلمسها
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nadheef */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-extrabold text-[#0D1F3C] mb-12">
            لماذا Cleanovy؟
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <Smartphone
                    className="h-7 w-7"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                ),
                title: "تطبيق سهل",
                desc: "واجهة مستخدم بسيطة تمكنك من طلب الخدمة وتتبع طلباتك بضغطة زر واحدة",
              },
              {
                icon: (
                  <Leaf
                    className="h-7 w-7"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                ),
                title: "مواد صديقة للبيئة",
                desc: "نقوم بأحدث التقنيات النظيفة، لذا نستخدم منظفات نظيفة وآمنة على بشرتك وعلى الطبيعة",
              },
              {
                icon: (
                  <Shield
                    className="h-7 w-7"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                ),
                title: "جودة مضمونة",
                desc: "نستخدم أحدث التقنيات لضمان أفضل نتائج التنظيف مع الاحتفاظ بالأنسجة الملابس",
              },
              {
                icon: (
                  <Clock
                    className="h-7 w-7"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                ),
                title: "سرعة فائقة",
                desc: "نصلك وتعود ملابسك في وقت قياسي مع الالتزام التام بالمواعيد المحددة",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgb(0,201,177,0.1)" }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#0D1F3C] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#0D1F3C]/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 md:py-24 text-center"
        style={{ backgroundColor: "#0D1F3C" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            جاهز لتجربة غسيل مختلفة؟
          </h2>
          <p className="text-white/60 mb-8">
            انضم إلى آلاف العملاء الراضين الذين وثقوا بـ "Cleanovy" للعناية بملابسهم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button
                className="px-8 py-3 rounded-2xl font-semibold text-white border-2 border-white/30 hover:border-white transition-all duration-200"
              >
                تواصل معنا
              </button>
            </a>
            <a href="/signup">
              <button
                className="px-8 py-3 rounded-2xl font-semibold text-[#0D1F3C] hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: "rgb(0,201,177)" }}
              >
                ابدأ الآن
              </button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}