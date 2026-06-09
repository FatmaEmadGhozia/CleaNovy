// components/ScheduleSummary.tsx
import { fmtDate } from "../../Pages/orders/types";

interface Props {
  pickupTime:   string;
  deliveryTime: string;
  selectedSlot: string;
}

export default function ScheduleSummary({ pickupTime, deliveryTime, selectedSlot }: Props) {
  if (!pickupTime) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
      <h3 className="font-bold text-gray-800 text-sm">مواعيد الطلب</h3>

      {/* Pickup */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-[#0F6E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] text-gray-400">استلام</p>
          <p className="text-sm font-bold text-gray-800">
            {fmtDate(pickupTime)} — {selectedSlot}
          </p>
        </div>
      </div>

      {/* Delivery */}
      {deliveryTime && (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#0F6E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] text-gray-400">تسليم</p>
            <p className="text-sm font-bold text-[#0F6E56]">{fmtDate(deliveryTime)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
