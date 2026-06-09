// components/TimeSlots.tsx
import { SLOTS } from "../../Pages/orders/types";

interface Props {
  selectedSlot: string | null;
  onSelectSlot: (s: string) => void;
}

const PERIODS = [
  { key: "morning"   as const, icon: "☀️",  label: "الفترة الصباحية"  },
  { key: "afternoon" as const, icon: "🌤️", label: "الفترة المسائية"  },
  { key: "evening"   as const, icon: "🌙",  label: "الفترة الليلية"   },
];

export default function TimeSlots({ selectedSlot, onSelectSlot }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <h2 className="font-bold text-gray-800">الوقت المفضل</h2>

      {PERIODS.map(p => (
        <div key={p.key}>
          <div className="flex items-center gap-2 mb-3">
            <span>{p.icon}</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {p.label}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS[p.key].map(s => (
              <SlotBtn
                key={s}
                slot={s}
                selected={selectedSlot === s}
                onClick={() => onSelectSlot(s)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SlotBtn sub-component ─────────────────────────────
function SlotBtn({
  slot, selected, onClick,
}: {
  slot: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all ${
        selected
          ? "bg-[#0F6E56] text-white border-[#0F6E56] shadow-md shadow-[#0F6E56]/20"
          : "border-gray-200 text-gray-600 hover:border-[#0F6E56] hover:text-[#0F6E56] bg-white"
      }`}
    >
      {slot}
    </button>
  );
}
