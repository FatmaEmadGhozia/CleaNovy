import { useState, useEffect } from "react";
import { Navigation, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "الرئيسية", href: "hero" },
  { label: "اكتشف", href: "gallery" },
  { label: "الخدمات", href: "services" },
  { label: "الشركاء", href: "promo" },
  { label: "كيف يعمل", href: "how-it-works" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#0D1F3C]/10 border-b border-gray-100"
          : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => scrollTo("hero")}
          className="text-2xl font-extrabold cursor-pointer transition-transform duration-200 hover:scale-105 select-none"
          style={{ color: "rgb(0, 201, 177)", fontFamily: "Tajawal, sans-serif" }}
        >
          نظيف
        </h1>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                active === item.href
                  ? "text-[#0D1F3C] bg-[rgb(0,201,177)]/10"
                  : "text-[#0D1F3C]/70 hover:text-[rgb(0,201,177)] hover:bg-[rgb(0,201,177)]/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="تحديد موقعي"
            className="p-2.5 rounded-xl text-[#0D1F3C]/70 hover:text-[rgb(0,201,177)] hover:bg-[rgb(0,201,177)]/10 transition-all duration-200"
            onClick={() => navigator.geolocation?.getCurrentPosition(() => {})}
          >
            <Navigation className="h-5 w-5" />
          </button>

          <Button
            className="rounded-2xl px-6 text-white font-semibold shadow-md shadow-[rgb(0,201,177)]/30 hover:shadow-lg hover:shadow-[rgb(0,201,177)]/40 hover:-translate-y-0.5 transition-all duration-200"
            style={{ backgroundColor: "rgb(0, 201, 177)" }}
          >
            تسجيل الدخول
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          className="md:hidden p-2 rounded-xl hover:bg-[rgb(0,201,177)]/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={cn("transition-all duration-300", menuOpen ? "rotate-90" : "rotate-0")}>
            {menuOpen ? (
              <X size={22} style={{ color: "#0D1F3C" }} />
            ) : (
              <Menu size={22} style={{ color: "#0D1F3C" }} />
            )}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={cn(
                "text-right py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200",
                active === item.href
                  ? "text-[#0D1F3C] bg-[rgb(0,201,177)]/10"
                  : "text-[#0D1F3C]/70 hover:bg-[rgb(0,201,177)]/10 hover:text-[rgb(0,201,177)]"
              )}
            >
              {item.label}
            </button>
          ))}

         <a href="/signup"> 
         <Button
            className="w-full mt-2 rounded-2xl text-white font-semibold"
            style={{ backgroundColor: "rgb(0, 201, 177)" }}
          >
            تسجيل الدخول
          </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}