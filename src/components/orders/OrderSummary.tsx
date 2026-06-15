// components/OrderSummary.tsx

interface Props {
  totalQty:     number;
  subtotal:     number;
  shippingPrice: number;
  totalDisc:    number;
  total:        number;
  loading:      boolean;
  deliveryType?: "pickup" | "delivery";
  onConfirm:    () => void;
}

export default function OrderSummary({
  totalQty, subtotal, shippingPrice, totalDisc, total, loading, deliveryType = "pickup", onConfirm,
}: Props) {
  const discPct = totalDisc > 0 ? Math.round((totalDisc / subtotal) * 100) : 0;

  return (
    <>
      {/* Price breakdown */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-3 mb-3">
          ملخص الحساب
        </h3>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>إجمالي المنتجات ({totalQty})</span>
            <span>{subtotal} ج.م</span>
          </div>
          {deliveryType === "delivery" && (
            <div className="flex justify-between text-gray-500">
              <span>رسوم التوصيل</span>
              <span className={shippingPrice === 0 ? "text-[#0F6E56] font-semibold" : ""}>{shippingPrice === 0 ? "مجاني" : `${shippingPrice} ج.م`}</span>
            </div>
          )}
          {totalDisc > 0 && (
            <div className="flex justify-between text-[#0F6E56] font-semibold">
              <span>خصم الحجم ({discPct}%)</span>
              <span>- {totalDisc} ج.م</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-end">
          <div>
            <p className="font-bold text-gray-900">الإجمالي النهائي</p>
            <p className="text-[11px] text-gray-400">ضريبة القيمة المضافة مشمولة</p>
          </div>
          <p className="text-2xl font-black text-gray-900">
            {total} <span className="text-sm text-gray-400">ج.م</span>
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full bg-[#0F6E56] text-white font-bold py-4 rounded-2xl hover:bg-[#0a5240] active:scale-95 transition-all shadow-lg shadow-[#0F6E56]/25 disabled:opacity-50 flex items-center justify-center gap-2 text-base"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            تأكيد الطلب والدفع
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
          <span>🌿</span>
          <span className="text-xs text-gray-500">مواد صديقة للبيئة</span>
        </div>
        <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
          <span>✅</span>
          <span className="text-xs text-gray-500">دفع آمن 100%</span>
        </div>
      </div>

      {/* Terms */}
      <p className="text-[11px] text-center text-gray-400">
        بالضغط على تأكيد الطلب أنت توافق على{" "}
        <a href="#" className="text-[#0F6E56] underline">شروط الاستخدام</a>
        {" "}و{" "}
        <a href="#" className="text-[#0F6E56] underline">سياسة الخصوصية</a>
        {" "}الخاصة بنظيف
      </p>
    </>
  );
}
