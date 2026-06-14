// CheckoutPage.tsx — يجمع كل الـ components مع بعض
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { PayMethod } from "./types";
 import { createOrder, payOrder } from "../../services/api";

import CheckoutHeader      from "../../components/orders/CheckoutHeader";
import InstitutionalBanner from "../../components/orders/InstitutionalBanner";
import OrderReview         from "../../components/orders/OrderReview";
import PaymentSection      from "../../components/orders/PaymentSection";
import LoyaltyProgress     from "../../components/orders/LoyaltyProgress";
import ScheduleSummary     from "../../components/orders/ScheduleSummary";
import OrderSummary        from "../../components/orders/OrderSummary";
import SuccessScreen       from "../../components/orders/SuccessScreen";

export default function CheckoutPage() {
  const location = useLocation();
  const state    = location.state as any;

  // ── State ──────────────────────────────────────────
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [cardNum,   setCardNum]   = useState("");
  const [expiry,    setExpiry]    = useState("");
  const [cvv,       setCvv]       = useState("");
  const [phone,     setPhone]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [error,     setError]     = useState("");

  // ── Data from previous page ────────────────────────
  const cart          = state?.cart          ?? [];
  const subtotal      = state?.subtotal      ?? 0;
  const totalDisc     = state?.totalDisc     ?? 0;
  const total         = state?.total         ?? 0;
  const shippingPrice = state?.shippingPrice ?? 20;
  const pickupTime    = state?.pickupTime    ?? "";
  const deliveryTime  = state?.deliveryTime  ?? "";
  const selectedSlot  = state?.selectedSlot  ?? "";
  const providerId    = state?.providerId    ?? "";
  const totalQty      = cart.reduce((s: number, i: any) => s + i.quantity, 0);

  // ── Validation & confirm ───────────────────────────
  const handleConfirm = async () => {
  setError("");

  // Validation — عنوان التوصيل
  const deliveryType = state?.deliveryType ?? "delivery";
  const deliveryAddress = state?.deliveryAddress ?? "";
  if (deliveryType === "delivery" && !deliveryAddress.trim()) {
    setError("من فضلك ارجع وادخل عنوان التوصيل");
    return;
  }

  if (payMethod === "card") {
    if (!cardNum || cardNum.replace(/\s/g, "").length < 16) { setError("ادخل رقم البطاقة كاملاً"); return; }
    if (!expiry)                                             { setError("ادخل تاريخ الانتهاء");    return; }
    if (!cvv || cvv.length < 3)                             { setError("ادخل رمز CVV");            return; }
  }
  if (payMethod === "vodafone_cash") {
    if (phone.length !== 11) { setError("رقم الموبايل لازم يكون 11 خانة"); return; }
  }

  setLoading(true);
  try {
    // 1. Create order
   
const orderRes = await createOrder({
  cart,
  pickupTime,
  deliveryTime,
  shippingPrice,
  couponCode:      null,
  paymentMethod:   payMethod,
  deliveryType:    state?.deliveryType    ?? "delivery",
  deliveryAddress: state?.deliveryAddress ?? "",
  providerId:      providerId,
});
    const orderId = orderRes.data.order._id;

    // 2. Pay order
    await payOrder(orderId, {
      paymentMethod: payMethod,
      cardNumber:    cardNum.replace(/\s/g, ""),
      cardExpiry:    expiry,
      cardCvv:       cvv,
      phoneNumber:   phone,
    });

    setSuccess(true);
  } catch (e: any) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};
  // ── Success screen ─────────────────────────────────
  if (success) {
    return (
      <SuccessScreen
        pickupTime={pickupTime}
        deliveryTime={deliveryTime}
        selectedSlot={selectedSlot}
        shippingPrice={shippingPrice}

        total={total}
      />
    );
  }

  // ── Main render ────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans" dir="rtl">

      {/* 1. Header */}
      <CheckoutHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT col ───────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* 2. Institutional discount banner */}
          <InstitutionalBanner />

          {/* 3. Read-only order items */}
          <OrderReview cart={cart} />

          {/* 4. Payment method selector + forms */}
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

        {/* ── RIGHT col ──────────────────────────────── */}
        <div className="space-y-4">

          {/* 5. Loyalty progress bar */}
          <LoyaltyProgress
            totalQty={totalQty}
            totalDisc={totalDisc}
            subtotal={subtotal}
            shippingPrice={shippingPrice}
          />

          {/* 6. Pickup / delivery schedule */}
          <ScheduleSummary
            pickupTime={pickupTime}
            deliveryTime={deliveryTime}
            selectedSlot={selectedSlot}
          />

          {/* 7. Price breakdown + CTA + trust badges */}
          <OrderSummary
            totalQty={totalQty}
            subtotal={subtotal}
            shippingPrice={shippingPrice}
            totalDisc={totalDisc}
            total={total}
            loading={loading}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
