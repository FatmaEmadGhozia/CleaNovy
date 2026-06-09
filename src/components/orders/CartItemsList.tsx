// components/CartItemsList.tsx
import type { CartItem, Service } from "../../Pages/orders/types";

interface Props {
  cart: CartItem[];
  allServices: Service[];
  onUpdateQty: (id: string, delta: number) => void;
  onAddService: (svc: Service) => void;
}

export default function CartItemsList({ cart, allServices, onUpdateQty, onAddService }: Props) {
  const available = allServices.filter(s => !cart.find(c => c.service.id === s.id));

  return (
    <>
      {/* ── Selected services ───────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">الخدمات المختارة</h2>
          <span className="text-xs text-gray-400">{cart.length} خدمة</span>
        </div>

        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-5xl mb-3">🛒</p>
            <p className="text-gray-400 font-medium">السلة فارغة</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {cart.map(item => (
              <div
                key={item.service.id}
                className="px-6 py-5 flex items-center gap-4 hover:bg-gray-50/60 transition-colors group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-2xl flex-shrink-0">
                  {item.service.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{item.service.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.service.subtitle}</p>
                  <p className="text-[#0F6E56] font-bold text-sm mt-1">{item.service.price} جنيه</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onUpdateQty(item.service.id, -1)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all text-lg leading-none"
                  >−</button>
                  <span className="w-6 text-center font-black text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.service.id, 1)}
                    className="w-8 h-8 rounded-full bg-[#0F6E56] flex items-center justify-center font-bold text-white hover:bg-[#0a5240] transition-colors text-lg leading-none"
                  >+</button>
                </div>

                {/* Total + delete */}
                <div className="text-left min-w-[60px]">
                  <p className="font-black text-gray-900 text-right">{item.service.price * item.quantity}</p>
                  <p className="text-xs text-gray-400 text-right">جنيه</p>
                  <button
                    onClick={() => onUpdateQty(item.service.id, -item.quantity)}
                    className="text-[10px] text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 block text-right mt-1"
                  >حذف</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add more services ────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-800 text-sm">إضافة خدمات أخرى</h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {available.map(svc => (
            <button
              key={svc.id}
              onClick={() => onAddService(svc)}
              className="p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#0F6E56] hover:bg-[#E8F5EF] transition-all text-right group"
            >
              <p className="text-lg mb-1">{svc.icon}</p>
              <p className="text-xs font-bold text-gray-700 group-hover:text-[#0F6E56]">{svc.name}</p>
              <p className="text-xs text-gray-400">{svc.price} ج</p>
            </button>
          ))}
          {available.length === 0 && (
            <p className="col-span-3 text-center text-gray-400 text-sm py-4">كل الخدمات مضافة ✓</p>
          )}
        </div>
      </div>
    </>
  );
}
