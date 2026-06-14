// components/SuccessScreen.tsx
import { useNavigate } from "react-router-dom";
import { fmtDate } from "../../Pages/orders/types";

interface Props {
  pickupTime:   string;
  deliveryTime: string;
  selectedSlot: string;
  total:        number;
}

export default function SuccessScreen({ pickupTime, deliveryTime, selectedSlot, total }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-6" dir="rtl">
      <div className="max-w-sm w-full text-center space-y-6">

        {/* Check icon */}
        <div className="w-24 h-24 rounded-full bg-[#E8F5EF] flex items-center justify-center mx-auto shadow-lg shadow-[#0F6E56]/15">
          <svg className="w-12 h-12 text-[#0F6E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">تم الطلب! 🎉</h1>
          <p className="text-gray-500 text-sm">سيتم استلام ملابسك في الموعد المحدد</p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm text-right space-y-3">
          {pickupTime && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">موعد الاستلام</span>
              <span className="font-bold text-gray-800">
                {fmtDate(pickupTime)} — {selectedSlot}
              </span>
            </div>
          )}
          {deliveryTime && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">موعد التسليم</span>
              <span className="font-bold text-[#0F6E56]">{fmtDate(deliveryTime)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
            <span className="text-gray-400">المبلغ المدفوع</span>
            <span className="font-black text-gray-900">{total} ج.م</span>
          </div>
        </div>

        {/* Back home */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#0F6E56] text-white font-bold py-4 rounded-2xl hover:bg-[#0a5240] transition-all shadow-lg shadow-[#0F6E56]/25"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
