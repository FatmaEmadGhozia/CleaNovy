// SchedulePage.tsx — يجمع كل الـ components مع بعض
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getWeekDays, getDeliveryDay, buildPickupISO, MONTHS_AR } from "./types";

import ScheduleHeader    from "../../components/orders/ScheduleHeader";
import DatePicker        from "../../components/orders/DatePicker";
import TimeSlots         from "../../components/orders/TimeSlots";
import SelectionSummary  from "../../components/orders/SelectionSummary";
import ConfirmButton     from "../../components/orders/ConfirmButton";

export default function SchedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state    = location.state as any;

  // ── State ──────────────────────────────────────────
  const [weekOff, setWeekOff] = useState(0);
  const [day,     setDay]     = useState<Date | null>(null);
  const [slot,    setSlot]    = useState<string | null>(null);

  // ── Derived ────────────────────────────────────────
  const days  = useMemo(() => getWeekDays(weekOff), [weekOff]);
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  const deliveryDay   = day ? getDeliveryDay(day) : null;
  const currentMonth  = days[0]
    ? `${MONTHS_AR[days[0].getMonth()]} ${days[0].getFullYear()}`
    : "";

  // ── Handlers ───────────────────────────────────────
  const handleSelectDay = (d: Date) => { setDay(d); setSlot(null); };

  const handleConfirm = () => {
    if (!day || !slot || !deliveryDay) return;
    navigate("/checkout", {
      state: {
        ...state,
        pickupTime:   buildPickupISO(day, slot),
        deliveryTime: new Date(deliveryDay.setHours(18, 0, 0, 0)).toISOString(),
        selectedSlot: slot,
        selectedDay:  day.toISOString(),
      },
    });
  };

  // ── Render ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans" dir="rtl">

      {/* 1. Header */}
      <ScheduleHeader />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* 2. Date picker — week nav + day buttons */}
        <DatePicker
          days={days}
          today={today}
          selectedDay={day}
          currentMonth={currentMonth}
          onSelectDay={handleSelectDay}
          onPrevWeek={() => setWeekOff(w => w + 1)}
          onNextWeek={() => setWeekOff(w => Math.max(0, w - 1))}
        />

        {/* 3. Time slots — shown only after day is picked */}
        {day && (
          <TimeSlots
            selectedSlot={slot}
            onSelectSlot={setSlot}
          />
        )}

        {/* 4. Selection summary — shown only after slot is picked */}
        {day && slot && deliveryDay && (
          <SelectionSummary
            day={day}
            slot={slot}
            deliveryDay={deliveryDay}
          />
        )}

        {/* 5. Confirm CTA */}
        <ConfirmButton
          disabled={!day || !slot}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}
