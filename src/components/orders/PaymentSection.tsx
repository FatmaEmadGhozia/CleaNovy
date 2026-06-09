// components/PaymentSection.tsx
import type { PayMethod } from "../../Pages/orders/types";
import { formatCard, formatExpiry } from "../../Pages/orders/types";

interface Props {
  payMethod:    PayMethod;
  cardNum:      string;
  expiry:       string;
  cvv:          string;
  phone:        string;
  error:        string;
  onMethodChange: (m: PayMethod) => void;
  onCardNum:    (v: string) => void;
  onExpiry:     (v: string) => void;
  onCvv:        (v: string) => void;
  onPhone:      (v: string) => void;
}

export default function PaymentSection({
  payMethod, cardNum, expiry, cvv, phone, error,
  onMethodChange, onCardNum, onExpiry, onCvv, onPhone,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-bold text-gray-800 mb-4">طريقة الدفع</h2>

      {/* Method cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {(["card", "vodafone_cash", "cash"] as PayMethod[]).map(m => (
          <PayCard
            key={m}
            method={m}
            selected={payMethod === m}
            onClick={() => onMethodChange(m)}
          />
        ))}
      </div>

      {/* Card form */}
      {payMethod === "card" && (
        <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">رقم البطاقة</label>
              <input
                value={cardNum}
                onChange={e => onCardNum(formatCard(e.target.value))}
                placeholder="0000 0000 0000 0000"
                className="w-full border text-gray-900 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-[#0F6E56] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">الاسم على البطاقة</label>
              <input
                placeholder="الاسم بالكامل"
                className="w-full border text-gray-900 border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#0F6E56] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">تاريخ الانتهاء</label>
              <input
                value={expiry}
                onChange={e => onExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className="w-full border text-gray-900 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-[#0F6E56] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">رمز التحقق (CVV)</label>
              <input
                value={cvv}
                onChange={e => onCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                type="password"
                placeholder="***"
                className="w-full border text-gray-900 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-[#0F6E56] transition-colors"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400">💡 للتجربة: أي رقم لا ينتهي بـ 0000</p>
        </div>
      )}

      {/* Vodafone Cash form */}
      {payMethod === "vodafone_cash" && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">رقم الموبايل</label>
          <input
            value={phone}
            onChange={e => onPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="01xxxxxxxxx"
            className="w-full border text-gray-900 border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-[#0F6E56] transition-colors"
          />
          <p className="text-[11px] text-gray-400 mt-1.5">الرقم لازم يكون 11 خانة</p>
        </div>
      )}

      {/* Cash note */}
      {payMethod === "cash" && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-center gap-3">
          <span className="text-2xl">💵</span>
          <p className="text-sm text-amber-700">سيتم الدفع نقداً عند استلام ملابسك من المندوب</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2">
          <span className="text-red-500 text-sm">⚠️ {error}</span>
        </div>
      )}
    </div>
  );
}

// ── PayCard sub-component ─────────────────────────────
function PayCard({
  method, selected, onClick,
}: {
  method: PayMethod;
  selected: boolean;
  onClick: () => void;
}) {
  const cfg: Record<PayMethod, { icon: string; label: string; sub: string }> = {
    card:          { icon: "💳", label: "بطاقة ائتمان",            sub: "Visa, Mastercard, Meeza" },
    vodafone_cash: { icon: "📱", label: "Vodafone Cash / InstaPay", sub: "دفع إلكتروني سريع" },
    cash:          { icon: "💵", label: "الدفع نقداً",              sub: "عند الاستلام" },
  };
  const c = cfg[method];

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-right ${
        selected
          ? "border-[#0F6E56] bg-[#E8F5EF] shadow-md shadow-[#0F6E56]/10"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${selected ? "bg-[#0F6E56]/10" : "bg-gray-100"}`}>
          {c.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold truncate ${selected ? "text-[#0F6E56]" : "text-gray-800"}`}>{c.label}</p>
          <p className="text-[10px] text-gray-400 truncate">{c.sub}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${selected ? "border-[#0F6E56] bg-[#0F6E56]" : "border-gray-300"}`} />
      </div>
    </button>
  );
}
