// components/TierProgress.tsx

interface Props {
  totalQty: number;
  tierPct: number;
  nextTierPct?: number;
}

export default function TierProgress({ totalQty, tierPct, nextTierPct }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-gray-800">
          {tierPct > 0 ? `🎉 أضف 5 قطع ووفّر ${tierPct}%!` : "أضف 5 قطع ووفّر 10%!"}
        </p>
        <div className="flex gap-3 text-xs">
          <span className="text-gray-400">
            الحالي <strong className="text-gray-700">{tierPct}%</strong>
          </span>
          <span className="text-gray-400">
            التالي <strong className="text-[#0F6E56]">{nextTierPct ?? tierPct}%</strong>
          </span>
          <span className="bg-[#E8F5EF] text-[#0F6E56] px-2 py-0.5 rounded-full font-bold">
            توفير ذكي
          </span>
        </div>
      </div>

      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0F6E56] to-[#2DBE8A] transition-all duration-700"
          style={{ width: `${Math.min((totalQty / 10) * 100, 100)}%` }}
        />
      </div>

      <div className="flex justify-between mt-1.5 text-[11px] text-gray-400">
        <span>الحالي: <strong>{totalQty}</strong> قطعة</span>
        <span>5 قطع → 10%</span>
        <span>10 قطع → 15%</span>
      </div>
    </div>
  );
}
