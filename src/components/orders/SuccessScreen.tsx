
// }// components/orders/SuccessScreen.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fmtDate } from "../../Pages/orders/types";

interface Props {
  pickupTime:    string;
  deliveryTime:  string;
  selectedSlot:  string;
  shippingPrice: number;
  total:         number;
}

export default function SuccessScreen({ pickupTime, deliveryTime, selectedSlot, shippingPrice, total }: Props) {
  const navigate = useNavigate();
  const checkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (checkRef.current) {
      checkRef.current.style.strokeDasharray = "40";
      checkRef.current.style.strokeDashoffset = "40";
      setTimeout(() => {
        if (checkRef.current) checkRef.current.style.transition = "stroke-dashoffset 0.6s ease";
        if (checkRef.current) checkRef.current.style.strokeDashoffset = "0";
      }, 400);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-6" dir="rtl">
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ripple  { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.2);opacity:0} }
        .ss-fade-up  { opacity:0; animation:fadeUp  0.5s ease forwards; }
        .ss-scale-in { opacity:0; animation:scaleIn 0.5s cubic-bezier(.34,1.56,.64,1) forwards; }
        .ss-slide-in { opacity:0; animation:slideIn 0.4s ease forwards; }
        .ss-ripple   { position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,0.4);animation:ripple 1.6s ease-out infinite; }
        .ss-ripple2  { animation-delay:0.8s; }
      `}</style>

      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-[20px] border border-black/[0.06] overflow-hidden">

          {/* Header */}
          <div className="bg-[#0F6E56] px-6 py-10 text-center">
            <div className="ss-scale-in relative w-20 h-20 mx-auto mb-5" style={{animationDelay:"0.1s"}}>
              <div className="ss-ripple"></div>
              <div className="ss-ripple ss-ripple2"></div>
              <div className="w-20 h-20 rounded-full bg-white/[0.18] flex items-center justify-center relative z-10">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path ref={checkRef} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <h1 className="ss-fade-up text-white text-[22px] font-medium mb-1.5" style={{animationDelay:"0.35s"}}>تم الطلب بنجاح</h1>
            <p className="ss-fade-up text-white/75 text-sm" style={{animationDelay:"0.45s"}}>سيتم استلام ملابسك في الموعد المحدد</p>
          </div>

          {/* Body */}
          <div className="p-5 space-y-3">

            {/* Dates */}
            <div className="grid grid-cols-2 gap-2.5">
              {pickupTime && (
                <div className="ss-slide-in bg-[#F4F6F8] rounded-xl p-3.5" style={{animationDelay:"0.55s"}}>
                  <p className="text-[11px] text-gray-400 mb-1">موعد الاستلام</p>
                  <p className="text-sm font-medium text-gray-800">{fmtDate(pickupTime)}</p>
                </div>
              )}
              {deliveryTime && (
                <div className="ss-slide-in bg-[#F4F6F8] rounded-xl p-3.5" style={{animationDelay:"0.65s"}}>
                  <p className="text-[11px] text-gray-400 mb-1">موعد التسليم</p>
                  <p className="text-sm font-medium text-[#0F6E56]">{fmtDate(deliveryTime)}</p>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="ss-fade-up bg-[#F4F6F8] rounded-xl p-4 space-y-2" style={{animationDelay:"0.7s"}}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">رسوم التوصيل</span>
                <span className="text-gray-700 font-medium">{shippingPrice} ج.م</span>
              </div>
              <div className="border-t border-black/[0.06] pt-2 flex justify-between">
                <span className="text-gray-400 text-sm">المبلغ المدفوع</span>
                <span className="text-[#0F6E56] font-medium text-[15px]">{total} ج.م</span>
              </div>
            </div>

            {/* Slot */}
            {selectedSlot && (
              <div className="ss-fade-up flex items-center gap-2 bg-[#E8F5EF] rounded-xl px-4 py-3" style={{animationDelay:"0.8s"}}>
                <svg className="w-4 h-4 text-[#0F6E56] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                <p className="text-xs text-[#085041]">{selectedSlot}</p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => navigate("/")}
              className="ss-fade-up w-full bg-[#0F6E56] hover:bg-[#0a5240] active:scale-[0.98] text-white font-medium py-3.5 rounded-xl transition-all text-[15px] flex items-center justify-center gap-2"
              style={{animationDelay:"0.9s"}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10"/>
              </svg>
              العودة للرئيسية
            </button>

          </div>
        </div>

        <p className="ss-fade-up text-center text-xs text-gray-400 mt-3" style={{animationDelay:"1s"}}>
          طلبك محفوظ وسيتم تأكيده قريباً
        </p>
      </div>
    </div>
  );
}
