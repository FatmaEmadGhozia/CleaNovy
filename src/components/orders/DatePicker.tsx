// components/DatePicker.tsx
import { DAYS_AR } from"../../Pages/orders/types";

interface Props {
  days:        Date[];
  today:       Date;
  selectedDay: Date | null;
  currentMonth: string;
  onSelectDay: (d: Date) => void;
  onPrevWeek:  () => void;
  onNextWeek:  () => void;
}

export default function DatePicker({
  days, today, selectedDay, currentMonth,
  onSelectDay, onPrevWeek, onNextWeek,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrevWeek}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-400">{currentMonth}</p>
          <p className="font-bold text-gray-800 text-sm mt-0.5">اختر اليوم</p>
        </div>

        <button
          onClick={onNextWeek}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const isPast  = d < today;
          const isSel   = selectedDay?.toDateString() === d.toDateString();
          const isToday = d.toDateString() === today.toDateString();

          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onSelectDay(d)}
              className={`flex flex-col items-center py-2.5 rounded-xl transition-all ${
                isSel   ? "bg-[#0F6E56] text-white shadow-lg shadow-[#0F6E56]/30"
                : isPast  ? "text-gray-300 cursor-not-allowed"
                : isToday ? "border-2 border-[#0F6E56] text-[#0F6E56]"
                : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-[10px] mb-1 font-medium opacity-70">
                {DAYS_AR[d.getDay()].slice(0, 2)}
              </span>
              <span className="text-base font-black">{d.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
