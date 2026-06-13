// components/orders/DeliverySelector.tsx

interface Props {
  deliveryType:    "pickup" | "delivery";
  deliveryAddress: string;
  onTypeChange:    (t: "pickup" | "delivery") => void;
  onAddressChange: (a: string) => void;
}

export default function DeliverySelector({
  deliveryType, deliveryAddress, onTypeChange, onAddressChange,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="font-bold text-gray-800 text-sm mb-4">طريقة الاستلام</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Pickup */}
        <button
          onClick={() => onTypeChange("pickup")}
          className={`p-4 rounded-xl border-2 transition-all text-right ${
            deliveryType === "pickup"
              ? "border-[#0F6E56] bg-[#E8F5EF]"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="text-2xl mb-2">🏪</div>
          <p className={`text-sm font-bold ${deliveryType === "pickup" ? "text-[#0F6E56]" : "text-gray-800"}`}>
            استلام من المغسلة
          </p>
          <p className="text-xs text-gray-400 mt-1">مجاناً</p>
        </button>

        {/* Delivery */}
        <button
          onClick={() => onTypeChange("delivery")}
          className={`p-4 rounded-xl border-2 transition-all text-right ${
            deliveryType === "delivery"
              ? "border-[#0F6E56] bg-[#E8F5EF]"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="text-2xl mb-2">🚚</div>
          <p className={`text-sm font-bold ${deliveryType === "delivery" ? "text-[#0F6E56]" : "text-gray-800"}`}>
            توصيل لحد البيت
          </p>
          <p className="text-xs text-gray-400 mt-1">+ رسوم التوصيل</p>
        </button>
      </div>

      {/* Address field — بيظهر بس لو delivery */}
      {deliveryType === "delivery" && (
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1.5">
            عنوان التوصيل
          </label>
          <input
            value={deliveryAddress}
            onChange={e => onAddressChange(e.target.value)}
            placeholder="مثال: القاهرة، مدينة نصر، شارع عباس العقاد..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-[#0F6E56] transition-colors"
          />
        </div>
      )}
    </div>
  );
}