// components/ScheduleHeader.tsx
import { useNavigate } from "react-router-dom";

export default function ScheduleHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h1 className="text-lg font-black text-gray-900">جدولة الاستلام</h1>
        <div className="w-9" />
      </div>
    </header>
  );
}
