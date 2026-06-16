import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { PayMethod } from "./types";
import { ShopApi } from "../ShopPage/shopApi";

import CheckoutHeader      from "../../components/orders/CheckoutHeader";
import InstitutionalBanner from "../../components/orders/InstitutionalBanner";
import OrderReview         from "../../components/orders/OrderReview";
import PaymentSection      from "../../components/orders/PaymentSection";
import LoyaltyProgress     from "../../components/orders/LoyaltyProgress";
import ScheduleSummary     from "../../components/orders/ScheduleSummary";
import OrderSummary        from "../../components/orders/OrderSummary";
import SuccessScreen       from "../../components/orders/SuccessScreen";

const PAY_LABELS: Record<PayMethod, string> = {
  cash:          "الدفع نقداً عند الاستلام",
  card:          "بطاقة ائتمان",
  vodafone_cash: "Vodafone Cash / InstaPay",
};

export default function CheckoutPage() {
  const location = useLocation();
  const state    = location.state as any;

  const [payMethod, setPayMethod] = useState<PayMethod>("cash");
  const [cardNum,   setCardNum]   = useState("");
  const [expiry,    setExpiry]    = useState("");
  const [cvv,       setCvv]       = useState("");
  const [phone,     setPhone]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [error,     setError]     = useState("");
  const [showModal, setShowModal] = useState(false);

  // Data from previous pages (ShopPage → SchedulePage → CheckoutPage)
  const cart          = state?.cart          ?? [];
  const subtotal      = state?.subtotal      ?? 0;
  const totalDisc     = state?.totalDisc     ?? 0;
  const total         = state?.total         ?? 0;
  const shippingPrice = state?.shippingPrice ?? 0;
  const pickupTime    = state?.pickupTime    ?? "";
  const deliveryTime  = state?.deliveryTime  ?? "";
  const selectedSlot  = state?.selectedSlot  ?? "";
  const shopId        = state?.shopId        ?? "";
  const apiItems      = state?.apiItems      ?? [];
  const deliveryType    = state?.deliveryType    ?? "pickup";
  const deliveryAddress = state?.deliveryAddress ?? "";
  const totalQty      = cart.reduce((s: number, i: any) => s + i.quantity, 0);

  // Validate inputs then open confirmation modal
  const handleOpenModal = () => {
    setError("");

    if (payMethod === "card") {
      if (!cardNum || cardNum.replace(/\s/g, "").length < 16) { setError("ادخل رقم البطاقة كاملاً"); return; }
      if (!expiry)                                             { setError("ادخل تاريخ الانتهاء");    return; }
      if (!cvv || cvv.length < 3)                             { setError("ادخل رمز CVV");            return; }
    }
    if (payMethod === "vodafone_cash") {
      if (phone.length !== 11) { setError("رقم الموبايل لازم يكون 11 خانة"); return; }
    }
    if (!shopId)         { setError("بيانات الطلب ناقصة، ارجع واختار المغسلة"); return; }
    if (!apiItems.length){ setError("السلة فاضية"); return; }
    if (!pickupTime)     { setError("موعد الاستلام مطلوب، ارجع لاختيار الميعاد"); return; }

    setShowModal(true);
  };

  // Called from the confirmation modal
  const handleConfirm = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const result = await ShopApi.placeOrder({
        provider:      shopId,
        items:         apiItems.map((i: any) => ({ provider_service_id: i.serviceId, quantity: i.quantity })),
        pickup_time:   pickupTime,
        delivery_time: deliveryTime || undefined,
        payment_method: payMethod,
        delivery_type: deliveryType as "pickup" | "delivery",
        address:       deliveryType === "delivery" ? deliveryAddress : undefined,
        shipping_price: deliveryType === "delivery" ? shippingPrice : 0,
        notes:         deliveryType === "delivery" ? "توصيل للمنزل" : "استلام من المغسلة",
      });

      if (!result?.success) {
        const msg = result?.message || (result as any)?.message || "حدث خطأ في تأكيد الطلب";
        throw new Error(msg);
      }

      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "تعذر الاتصال بالسيرفر، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SuccessScreen
        pickupTime={pickupTime}
        deliveryTime={deliveryTime}
        selectedSlot={selectedSlot}
        total={total}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans" dir="rtl">

      <CheckoutHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main col (2/3) ── */}
        <div className="lg:col-span-2 space-y-5">
          <InstitutionalBanner />
          <OrderReview cart={cart} />
          <PaymentSection
            payMethod={payMethod}
            cardNum={cardNum}
            expiry={expiry}
            cvv={cvv}
            phone={phone}
            error={error}
            onMethodChange={m => { setPayMethod(m); setError(""); }}
            onCardNum={setCardNum}
            onExpiry={setExpiry}
            onCvv={setCvv}
            onPhone={setPhone}
          />
        </div>

        {/* ── Sidebar (1/3) ── */}
        <div className="space-y-4">
          <LoyaltyProgress
            totalQty={totalQty}
            totalDisc={totalDisc}
            subtotal={subtotal}
            shippingPrice={shippingPrice}
          />
          <ScheduleSummary
            pickupTime={pickupTime}
            deliveryTime={deliveryTime}
            selectedSlot={selectedSlot}
          />
          <OrderSummary
            totalQty={totalQty}
            subtotal={subtotal}
            shippingPrice={shippingPrice}
            totalDisc={totalDisc}
            total={total}
            loading={loading}
            deliveryType={deliveryType}
            onConfirm={handleOpenModal}
          />
        </div>
      </div>

      {/* ── Confirmation Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">تأكيد الطلب</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="px-6 py-4 max-h-64 overflow-y-auto space-y-3">
              {cart.map((item: any) => (
                <div key={item.service.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-lg shrink-0">
                    {item.service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{item.service.name}</p>
                    <p className="text-xs text-gray-400">{item.service.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-gray-900">{item.service.price * item.quantity} ج.م</p>
                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="mx-6 border-t border-gray-100 pt-3 pb-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>المجموع الفرعي</span><span>{subtotal} ج.م</span>
              </div>
              {totalDisc > 0 && (
                <div className="flex justify-between text-[#0F6E56] font-semibold">
                  <span>الخصم</span><span>- {totalDisc} ج.م</span>
                </div>
              )}
              {deliveryType === "delivery" && (
                <div className="flex justify-between text-gray-500">
                  <span>التوصيل</span>
                  <span className={shippingPrice === 0 ? "text-[#0F6E56] font-semibold" : ""}>{shippingPrice === 0 ? "مجاني" : `${shippingPrice} ج.م`}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                <span>الإجمالي</span><span>{total} ج.م</span>
              </div>
            </div>

            {/* Delivery type + address */}
            <div className="mx-6 mb-2 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base">{deliveryType === "delivery" ? "🚚" : "🏪"}</span>
                <span>{deliveryType === "delivery" ? "توصيل للمنزل" : "استلام من المغسلة"}</span>
              </div>
              {deliveryType === "delivery" && deliveryAddress && (
                <div className="flex items-start gap-2 pt-1 border-t border-gray-200 mt-1">
                  <span>📍</span>
                  <span className="text-gray-700 leading-snug">{deliveryAddress}</span>
                </div>
              )}
            </div>

            {/* Payment method */}
            <div className="mx-6 mb-4 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-gray-600">
              <span className="text-base">💳</span>
              <span>طريقة الدفع: <strong className="text-gray-900">{PAY_LABELS[payMethod]}</strong></span>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-[#0F6E56] text-white font-bold text-sm hover:bg-[#0a5240] transition-colors shadow-lg shadow-[#0F6E56]/20"
              >
                تأكيد الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
