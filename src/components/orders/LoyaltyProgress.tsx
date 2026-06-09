// components/LoyaltyProgress.tsx

interface Props {
  totalQty:     number;
  totalDisc:    number;
  subtotal:     number;
  shippingPrice: number;
}

export default function LoyaltyProgress({ totalQty, totalDisc, subtotal, shippingPrice }: Props) {
  const discPct    = totalDisc > 0 ? `${Math.round((totalDisc / subtotal) * 100)}%` : "0%";
  const savedNow   = subtotal > 0 ? Math.round((totalDisc / (subtotal + shippingPrice)) * 100) : 0;
  const toGold     = Math.max(0, 10 - totalQty);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-gray-800 text-sm">وفّر أكثر مع نظيف</h3>
        <span className="text-xs bg-[#E8F5EF] text-[#0F6E56] px-2 py-1 rounded-full font-bold">
          {discPct}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-3">المستوى الحالي: فضي (5%)</p>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-[#0F6E56] to-[#2DBE8A] rounded-full transition-all"
          style={{ width: `${Math.min((totalQty / 10) * 100, 100)}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-gray-400">
        <span>توفير حالي: {savedNow} ج.م</span>
        <span className="text-[#0F6E56] font-semibold">
          أضف {toGold} قطعة للمستوى الذهبي
        </span>
      </div>
    </div>
  );
}
