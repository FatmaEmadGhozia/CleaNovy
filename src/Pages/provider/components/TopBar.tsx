import type { Page } from "../ProviderLayout";

const pageTitles: Record<Page, string> = {
  dashboard: "البحث عن أي شيء...",
  orders: "البحث عن رقم طلب أو اسم عميل...",
  services: "البحث عن خدمة أو سعر...",
  discounts: "بحث عن الفئات أو العروض...",
};

export default function TopBar({ page }: { page: Page }) {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/85 backdrop-blur-md shadow-sm flex flex-row-reverse justify-between items-center px-8 py-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[#0D1F3C] font-bold text-sm">أحمد العامودي</p>
            <p className="text-slate-500 text-xs">مدير العمليات</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#00C9B1] bg-[#006B5D]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#00C9B1]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:text-[#006B5D] transition-colors">
            <span className="material-symbols-outlined">translate</span>
          </button>
          <button className="p-2 text-slate-500 hover:text-[#006B5D] transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button className="p-2 text-slate-500 hover:text-[#006B5D] transition-colors">
            <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      </div>
      <div className="flex-1 max-w-md ml-8">
        <div className="relative">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input
            className="w-full bg-[#EFF4FA] border-none rounded-full py-2 pr-10 pl-4 focus:ring-2 focus:ring-[#006B5D]/20 transition-all text-sm outline-none"
            placeholder={pageTitles[page]}
            type="text"
          />
        </div>
      </div>
    </header>
  );
}