// components/PriceSummary.tsx

interface Props {
  totalQty: number;
  subtotal: number;
  shipping: number;
  tierDisc: number;
  tierPct: number;
  couponDisc: number;
  totalDisc: number;
  total: number;
  cartEmpty: boolean;
  onCheckout: () => void;
}

export default function PriceSummary({
  totalQty, subtotal, shipping,
  tierDisc, tierPct, couponDisc,
  totalDisc, total, cartEmpty, onCheckout,
}: Props) {
  return (
    <>
      {/* Express banner */}
      <div className="bg-[#162d55] rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0F6E56] flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">خدمة الغسيل السريع</p>
          <p className="text-gray-400 text-xs">استلام وتسليم في أقل من 6 ساعات</p>
        </div>
        <div className="text-left">
          <p className="text-[#C8960C] font-black text-sm">25.00+</p>
          <p className="text-gray-400 text-xs">ر.س</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        {totalDisc > 0 && (
          <div className="mb-3 bg-[#E8F5EF] rounded-xl p-3 text-center">
            <p className="text-[#0F6E56] font-bold text-sm">🎉 وفّرت {totalDisc} جنيه!</p>
            {subtotal > 0 && (
              <p className="text-xs text-gray-500 line-through mt-0.5">
                السعر الأصلي: {subtotal + shipping} ج.م
              </p>
            )}
          </div>
        )}

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>إجمالي الخدمات ({totalQty} قطعة)</span>
            <span>{subtotal} ج.م</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>رسوم التوصيل</span>
            <span>{shipping} ج.م</span>
          </div>
          {tierDisc > 0 && (
            <div className="flex justify-between text-[#0F6E56] font-semibold">
              <span>خصم الكمية ({tierPct}%)</span>
              <span>- {tierDisc} ج.م</span>
            </div>
          )}
          {couponDisc > 0 && (
            <div className="flex justify-between text-[#0F6E56] font-semibold">
              <span>خصم الكوبون (10%)</span>
              <span>- {couponDisc} ج.م</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-900">المجموع الكلي</span>
            <span className="text-2xl font-black text-gray-900">
              {total} <span className="text-sm text-gray-400 font-bold">ج.م</span>
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        disabled={cartEmpty}
        onClick={onCheckout}
        className="w-full bg-[#0F6E56] text-white font-bold py-4 rounded-2xl hover:bg-[#0a5240] active:scale-95 transition-all shadow-lg shadow-[#0F6E56]/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
      >
        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
        تأكيد الطلب والدفع
      </button>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
          <span className="text-xl">🌿</span>
          <span className="text-xs text-gray-500 font-medium">مواد صديقة للبيئة</span>
        </div>
        <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
          <span className="text-xl">✅</span>
          <span className="text-xs text-gray-500 font-medium">دفع آمن 100%</span>
        </div>
      </div>
    </>
  );
}
