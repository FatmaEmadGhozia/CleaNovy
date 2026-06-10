 import { useState } from "react";
import { Send, Phone, MessageCircle, ShieldCheck, Zap, Headphones } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <Navbar />
      {/* Header */}
      <section className="pt-32 pb-12 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1F3C] mb-4">
          تواصل معنا
        </h1>
        <p className="text-[#0D1F3C]/60 max-w-xl mx-auto text-base leading-relaxed">
          نحن هنا لمساعدتك. سواء كان لديك استفسار عن خدماتنا أو ترغب في تقديم
          ملاحظات، فريقنا مستعد دائماً للرد عليك.
        </p>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - takes 2 cols */}
          <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-[#0D1F3C] text-right mb-6">
              أرسل لنا رسالة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#0D1F3C] text-right">
                  الاسم بالكامل
                </label>
                <input
                  type="text"
                  placeholder="ادخل اسمك هنا"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-right text-sm text-[#0D1F3C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": "rgb(0,201,177)" } as React.CSSProperties}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#0D1F3C] text-right">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-right text-sm text-[#0D1F3C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": "rgb(0,201,177)" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-[#0D1F3C] text-right">
                الرسالة
              </label>
              <textarea
                rows={6}
                placeholder="كيف يمكننا مساعدتك؟"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-right text-sm text-[#0D1F3C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{ "--tw-ring-color": "rgb(0,201,177)" } as React.CSSProperties}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
              style={{ backgroundColor: "rgb(0,201,177)" }}
            >
              <Send className="h-4 w-4" />
              {sent ? "تم الإرسال ✓" : "إرسال الرسالة"}
            </button>
          </div>

          {/* Quick contact sidebar */}
          <div className="flex flex-col gap-5">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-[#0D1F3C] text-right mb-5">
                وسائل اتصال سريعة
              </h2>

              {/* WhatsApp */}
              <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-2xl mb-3 hover:shadow-sm transition-shadow cursor-pointer">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgb(0,201,177,0.12)" }}
                >
                  <MessageCircle
                    className="h-5 w-5"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm font-semibold text-[#0D1F3C]">واتساب</p>
                  <p className="text-xs text-[#0D1F3C]/50">
                    تحدث معنا مباشرة عبر الواتساب
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-2xl hover:shadow-sm transition-shadow cursor-pointer">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgb(0,201,177,0.12)" }}
                >
                  <Phone
                    className="h-5 w-5"
                    style={{ color: "rgb(0,201,177)" }}
                  />
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm font-semibold text-[#0D1F3C]">
                    اتصال هاتفي
                  </p>
                  <p className="text-xs text-[#0D1F3C]/50">
                    متاحون للرد من 8 ص حتى 10 م
                  </p>
                </div>
              </div>
            </div>

            {/* Support image card */}
            <div className="rounded-3xl overflow-hidden relative h-44">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80"
                alt="support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/70 to-transparent" />
              <p className="absolute bottom-4 right-4 text-white text-sm font-semibold">
                فريقنا جاهز لخدمتك على مدار الساعة
              </p>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <ShieldCheck className="h-7 w-7" style={{ color: "rgb(0,201,177)" }} />,
              title: "أمن وسري",
              desc: "بياناتك دائماً في أمان",
            },
            {
              icon: <Zap className="h-7 w-7" style={{ color: "rgb(0,201,177)" }} />,
              title: "رد سريع",
              desc: "خلال أقل من 24 ساعة",
            },
            {
              icon: <Headphones className="h-7 w-7" style={{ color: "rgb(0,201,177)" }} />,
              title: "دعم مستمر",
              desc: "نساعدك خطوة بخطوة",
            },
          ].map((item, i) => (
            <div key={i} className="text-center py-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "rgb(0,201,177,0.1)" }}
              >
                {item.icon}
              </div>
              <p className="font-bold text-[#0D1F3C] text-sm mb-1">{item.title}</p>
              <p className="text-[#0D1F3C]/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}