// components/SelectionSummary.tsx
import { DAYS_AR, MONTHS_AR } from "../../Pages/orders/types";

interface Props {
  day:         Date;
  slot:        string;
  deliveryDay: Date;
}

export default function SelectionSummary({ day, slot, deliveryDay }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#0F6E56]/20 p-4 flex items-center gap-4">
      {/* Calendar icon */}
      <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-[#0F6E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Pickup */}
      <div className="flex-1">
        <p className="text-xs text-gray-400">موعد الاستلام</p>
        <p className="text-sm font-bold text-gray-800">
          {DAYS_AR[day.getDay()]}، {day.getDate()} {MONTHS_AR[day.getMonth()]} — {slot}
        </p>
      </div>

      {/* Delivery */}
      <div className="text-left">
        <p className="text-xs text-gray-400">التسليم</p>
        <p className="text-sm font-bold text-[#0F6E56]">
          {DAYS_AR[deliveryDay.getDay()]}، {deliveryDay.getDate()} {MONTHS_AR[deliveryDay.getMonth()]}
        </p>
      </div>
    </div>
  );
}
