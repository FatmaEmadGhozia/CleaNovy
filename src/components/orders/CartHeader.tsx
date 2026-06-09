// components/CartHeader.tsx
import { useNavigate } from "react-router-dom";

interface Props {
  totalQty: number;
}

export default function CartHeader({ totalQty }: Props) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="text-center">
          <h1 className="text-lg font-black text-gray-900 tracking-tight">سلة الخدمات</h1>
          <p className="text-xs text-gray-400">راجع طلبك قبل التأكيد</p>
        </div>

        <span className="bg-[#E8F5EF] text-[#0F6E56] text-xs font-bold px-3 py-1.5 rounded-full">
          {totalQty} قطعة
        </span>
      </div>
    </header>
  );
}
