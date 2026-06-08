import { useState, useRef, useEffect } from "react";
import { useProvider } from "../context/ProviderContext";
import type { Page } from "../types";
import { ORDER_STATUS_LABELS } from "../types";

const pageTitles: Record<Page, string> = {
  dashboard: "البحث عن أي شيء...",
  orders: "البحث عن رقم طلب أو اسم عميل...",
  services: "البحث عن خدمة أو سعر...",
  discounts: "بحث عن الفئات أو العروض...",
  settings: "البحث في الإعدادات...",
  profile: "البحث في الملف الشخصي...",
};

interface SearchResult {
  type: "order" | "service" | "category";
  label: string;
  sub: string;
  page: Page;
}

interface Props {
  page: Page;
  setPage: (p: Page) => void;
}

export default function TopBar({ page, setPage }: Props) {
  const {
    profile, setNotificationsOpen, unreadCount,
    searchQuery, setSearchQuery,
    orders, services, categories, showToast,
  } = useProvider();

  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getResults = (): SearchResult[] => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    orders.forEach((o) => {
      if (
        o.customerName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.items.toLowerCase().includes(q)
      ) {
        results.push({
          type: "order",
          label: `${o.customerName} — ${o.id}`,
          sub: `${ORDER_STATUS_LABELS[o.status]} • ${o.price} ر.س`,
          page: "orders",
        });
      }
    });

    services.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.price.includes(q)) {
        results.push({
          type: "service",
          label: s.name,
          sub: `${s.price} ر.س • ${s.duration}`,
          page: "services",
        });
      }
    });

    categories.forEach((c) => {
      if (c.label.toLowerCase().includes(q)) {
        results.push({
          type: "category",
          label: c.label,
          sub: `${c.count} خدمة`,
          page: "services",
        });
      }
    });

    return results.slice(0, 8);
  };

  const results = getResults();

  const handleSelect = (result: SearchResult) => {
    setPage(result.page);
    setShowResults(false);
    showToast(`تم العثور على: ${result.label}`, "info");
  };

  const typeIcons = {
    order: "local_laundry_service",
    service: "dry_cleaning",
    category: "category",
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white/85 backdrop-blur-md shadow-sm flex flex-row-reverse justify-between items-center px-8 py-4">
      {/* Profile + Notifications */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setNotificationsOpen(true)}
          className="p-2 text-slate-500 hover:text-[#006B5D] transition-colors relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setPage("profile")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-right">
            <p className="text-[#0D1F3C] font-bold text-sm">{profile.name}</p>
            <p className="text-slate-500 text-xs">{profile.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#00C9B1] bg-[#006B5D]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg ml-8" ref={searchRef}>
        <div className="relative">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input
            className="w-full bg-[#EFF4FA] border-none rounded-full py-2.5 pr-10 pl-10 focus:ring-2 focus:ring-[#006B5D]/20 transition-all text-sm outline-none"
            placeholder={pageTitles[page]}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setShowResults(false); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D1F3C]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}

          {showResults && searchQuery.trim() && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-[#E4E9EF] overflow-hidden z-50">
              {results.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-400">لا توجد نتائج لـ "{searchQuery}"</div>
              ) : (
                <div className="divide-y divide-[#E4E9EF]">
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(r)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-[#EFF4FA]/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[#006B5D] text-lg">{typeIcons[r.type]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#0D1F3C] truncate">{r.label}</p>
                        <p className="text-xs text-slate-400">{r.sub}</p>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 text-sm">chevron_left</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
