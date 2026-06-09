// components/InstitutionalBanner.tsx

export default function InstitutionalBanner() {
  return (
    <div className="bg-gradient-to-l from-[#0d1e3d] to-[#162d55] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
        💼
      </div>
      <div className="flex-1">
        <p className="text-white font-bold text-sm">طلب مؤسساتي (50+ قطعة)</p>
        <p className="text-gray-400 text-xs mt-0.5">خصومات خاصة للشركات والفنادق</p>
      </div>
      <button className="bg-[#C8960C] hover:bg-[#a87a08] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
        تواصل مع خبير
      </button>
    </div>
  );
}
