import { Share2, Camera, Globe, Smartphone, Play } from "lucide-react";
import { useState } from "react";

const links = {
  "الشركة": ["عن Cleanovy", "انضم كشريك", "الوظائف", "المدونة"],
  "المساعدة": ["خريطة الموقع", "الشروط والأحكام", "سياسة الخصوصية", "تواصل معنا"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      className="text-white pt-24 pb-10 px-6 lg:px-24"
      style={{
        backgroundColor: "#0D1F3C",
        borderRadius: "60px 60px 0 0",
        marginTop: "40px",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 text-right">
        {/* Brand */}
        <div className="space-y-5">
          <h3
            className="text-3xl font-extrabold"
            style={{ fontFamily: "Tajawal, sans-serif", color: "#fff" }}
          >
            Cleanovy
          </h3>
          <p className="leading-relaxed text-sm" style={{ color: "#ffffff70" }}>
            منصتكم الموثوقة للوصول لأفضل خدمات العناية بالملابس. نضمن الجودة، السرعة، والراحة.
          </p>
          <div className="flex items-center justify-end gap-3">
            {[Share2, Camera, Globe].map((Icon, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110"
                style={{ backgroundColor: "#ffffff12" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00C9B1")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff12")}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs mb-3" style={{ color: "#ffffff60" }}>اشترك لآخر الأخبار</p>
            {subscribed ? (
              <p className="text-sm font-semibold" style={{ color: "#00C9B1" }}>✓ تم الاشتراك!</p>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:opacity-90 shrink-0"
                  style={{ backgroundColor: "#00C9B1" }}
                >
                  اشترك
                </button>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  className="flex-grow bg-transparent outline-none text-right text-xs px-3 rounded-xl border"
                  style={{ borderColor: "#ffffff20", color: "#fff" }}
                  dir="rtl"
                />
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="space-y-5">
            <h4 className="font-bold text-base" style={{ color: "#00C9B1" }}>{title}</h4>
            <ul className="space-y-3">
              {items.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-all duration-200 hover:text-white hover:translate-x-1 inline-block"
                    style={{ color: "#ffffff60" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff60")}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* App Download */}
        <div className="space-y-5">
          <h4 className="font-bold text-base" style={{ color: "#00C9B1" }}>حمل التطبيق</h4>
          <p className="text-xs leading-relaxed" style={{ color: "#ffffff60" }}>
            احصل على خصم 20% على طلبك الأول عبر التطبيق
          </p>
          <div className="space-y-3">
            {[
              { label: "App Store", sub: "Download on the", Icon: Smartphone },
              { label: "Google Play", sub: "GET IT ON", Icon: Play },
            ].map(({ label, sub, Icon }) => (
              <button
                key={label}
                className="w-full rounded-2xl p-4 flex items-center justify-end gap-3 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "#ffffff08", border: "1px solid #ffffff12" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff15";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#00C9B140";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff08";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#ffffff12";
                }}
              >
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: "#ffffff40" }}>{sub}</p>
                  <p className="font-bold text-sm">{label}</p>
                </div>
                <Icon className="h-7 w-7" style={{ color: "#00C9B1" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="max-w-7xl mx-auto mt-16 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderColor: "#ffffff10" }}
      >
        <p className="text-xs" style={{ color: "#ffffff30" }}>
          © {new Date().getFullYear()} نظيف. جميع الحقوق محفوظة.
        </p>
        <div className="flex gap-4 text-xs" style={{ color: "#ffffff40" }}>
          <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
        </div>
      </div>
    </footer>
  );
}
