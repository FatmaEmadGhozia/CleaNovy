// components/CouponInput.tsx

interface Props {
  coupon: string;
  appliedCoupon: string | null;
  couponErr: string;
  onChange: (val: string) => void;
  onApply: () => void;
  onRemove: () => void;
}

export default function CouponInput({
  coupon, appliedCoupon, couponErr, onChange, onApply, onRemove,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="font-bold text-gray-800 text-sm mb-3">كود الخصم</h3>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-[#E8F5EF] rounded-xl p-3">
          <span className="text-[#0F6E56] font-bold text-sm">✓ {appliedCoupon} — خصم 10%</span>
          <button
            onClick={onRemove}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >إزالة</button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={e => onChange(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && onApply()}
              placeholder="ادخل كود الخصم"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-[#0F6E56] transition-colors"
            />
            <button
              onClick={onApply}
              className="bg-[#162d55] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#0d1e3d] transition-colors"
            >تفعيل</button>
          </div>
          {couponErr && <p className="text-red-500 text-xs mt-1.5">{couponErr}</p>}
          <p className="text-xs text-gray-400 mt-1.5">جرّب الكود: <strong>SAVE10</strong></p>
        </div>
      )}
    </div>
  );
}
