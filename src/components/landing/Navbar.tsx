import { useState, useEffect } from "react";
import { Navigation, Menu, X, Droplets } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "الرئيسية",   type: "scroll", href: "hero"         },
  { label: "الخدمات",    type: "scroll", href: "services"     },
  { label: "كيف يعمل",   type: "scroll", href: "how-it-works" },
  { label: "من نحن",     type: "page",   path: "/about"       },
  { label: "تواصل معنا", type: "page",   path: "/contact"     },
] as const;

export default function Navbar() {
  const [active, setActive]     = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate  = useNavigate();
  const { user }  = useAuth();

  const isHome   = location.pathname === "/" || location.pathname === "/home";
  const isActive = (item: typeof NAV_LINKS[number]) =>
    item.type === "scroll"
      ? isHome && active === item.href
      : location.pathname === item.path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (item: typeof NAV_LINKS[number]) => {
    setMenuOpen(false);
    if (item.type === "page") { navigate(item.path); return; }
    setActive(item.href);
    if (!isHome) {
      navigate("/");
      setTimeout(() => document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      dir="rtl"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(13,31,60,.08)] border-b border-[#e8eaed]"
          : "bg-white border-b border-[#e8eaed]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-17 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 shrink-0 select-none"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br from-[#00C9B1] to-[#00A896]">
            <Droplets className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#0D1F3C] font-[Tajawal,sans-serif]">
            كلينوفي
          </span>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((item) => (
            <button
              key={item.type === "scroll" ? item.href : item.path}
              type="button"
              onClick={() => handleLink(item)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap",
                isActive(item)
                  ? "text-[#00C9B1] bg-[#00C9B1]/8"
                  : "text-[#777779] hover:text-[#0D1F3C] hover:bg-[#F4F6F9]"
              )}
            >
              {item.label}
              {isActive(item) && (
                <span className="absolute bottom-0 right-2 left-2 h-0.5 rounded-full bg-[#00C9B1]" />
              )}
            </button>
          ))}
        </div>

        {/* ── Right-side actions ── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">

          {/* استكشف المغاسل */}
          <button
            type="button"
            className={cn("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200",
              location.pathname === "/cleannovy"
                ? "bg-[#00C9B1] text-white border-[#00C9B1]"
                : "text-[#00C9B1] border-[#00C9B1] hover:bg-[#00C9B1] hover:text-white")}
            aria-label="تحديد موقعي"
            onClick={() => { navigate("/cleannovy"); return navigator.geolocation?.getCurrentPosition(() => {}) }}
          >
            <Navigation className="h-3.5 w-3.5" />
            استكشف المغاسل
          </button>

          {/* User / Login */}
          {user ? (
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F4F6F9] transition-all duration-200"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-linear-to-br from-[#00C9B1] to-[#00A896]">
                {user.fullName?.charAt(0) || "U"}
              </span>
              <span className="text-sm font-semibold text-[#0D1F3C] max-w-25 truncate">
                {user.fullName}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-px bg-linear-to-br from-[#00C9B1] to-[#00A896]"
            >
              تسجيل الدخول
            </button>
          )}
        </div>

        {/* ── Mobile toggle ── */}
        <button
          type="button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          className="md:hidden p-2 rounded-lg hover:bg-[#F4F6F9] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen
            ? <X    size={20} className="text-[#0D1F3C]" />
            : <Menu size={20} className="text-[#0D1F3C]" />
          }
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e8eaed]",
        menuOpen ? "max-h-105 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.type === "scroll" ? item.href : item.path}
              type="button"
              onClick={() => handleLink(item)}
              className={cn(
                "text-right py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive(item)
                  ? "text-[#00C9B1] bg-[#00C9B1]/8"
                  : "text-[#777779] hover:text-[#0D1F3C] hover:bg-[#F4F6F9]"
              )}
            >
              {item.label}
            </button>
          ))}

          <div className="border-t border-[#e8eaed] my-2" />

          <button
            type="button"
            onClick={() => { navigate("/cleannovy"); setMenuOpen(false); }}
            className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-[#00C9B1] rounded-lg hover:bg-[#00C9B1]/8 transition-all duration-200"
          >
            <Navigation className="h-4 w-4" />
            استكشف المغاسل
          </button>

          {user ? (
            <button
              type="button"
              onClick={() => { navigate("/settings"); setMenuOpen(false); }}
              className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-[#F4F6F9] transition-all duration-200 mt-1"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-linear-to-br from-[#00C9B1] to-[#00A896]">
                {user.fullName?.charAt(0) || "U"}
              </span>
              <span className="text-sm font-semibold text-[#0D1F3C]">
                {user.fullName}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="w-full mt-1 py-2.5 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity bg-linear-to-br from-[#00C9B1] to-[#00A896]"
            >
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
