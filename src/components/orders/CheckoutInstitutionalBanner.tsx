// components/InstitutionalBanner.tsx

export default function InstitutionalBanner() {
  return (
    <div className="bg-gradient-to-l from-[#0d1e3d] to-[#162d55] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
        🏫
      </div>
      <div className="flex-1">
        <p className="text-white font-bold text-sm">خصم المؤسسات التعليمية والدينية</p>
        <p className="text-gray-400 text-xs mt-0.5">احصل على خصم إضافي 8% — اختر "حصة مؤسسية"</p>
      </div>
      <button className="bg-[#0F6E56] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0a5240] transition-colors whitespace-nowrap">
        تفعيل الخصم
      </button>
    </div>
  );
}
