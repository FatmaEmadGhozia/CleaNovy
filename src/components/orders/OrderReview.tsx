// components/OrderReview.tsx
import type { CartItem } from "../../Pages/orders/types";

interface Props {
  cart: CartItem[];
}

export default function OrderReview({ cart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="font-bold text-gray-800">مراجعة الطلب</h2>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 py-10">لا توجد عناصر</p>
      ) : (
        <div className="divide-y divide-gray-50">
          {cart.map((item) => (
            <div key={item.service.id} className="px-6 py-4 flex items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-xl flex-shrink-0">
                {item.service.icon}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{item.service.name}</p>
                <p className="text-xs text-gray-400">{item.service.subtitle}</p>
              </div>

              {/* Qty + price */}
              <div className="flex items-center gap-3">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  × {item.quantity}
                </span>
                <div className="text-right min-w-[56px]">
                  <p className="font-black text-gray-900 text-sm">
                    {item.service.price * item.quantity}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    ج.م / قطعة {item.service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
