// CartPage.tsx — يجمع كل الـ components مع بعض
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { ALL_SERVICES, SHIPPING, TIERS, getTier } from "./types";
import { ALL_SERVICES, TIERS, getTier } from "./types";
import type { CartItem, Service } from "./types";

import CartHeader from "../../components/orders/CartHeader"
import TierProgress from "../../components/orders/TierProgress";
import InstitutionalBanner from "../../components/orders/InstitutionalBanner";
import CartItemsList from "../../components/orders/CartItemsList";
import CouponInput from "../../components/orders/CouponInput";
import PriceSummary from "../../components/orders/PriceSummary";
import DeliverySelector from "../../components/orders/DeliverySelector";

export default function CartPage() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────
  const [cart, setCart] = useState<CartItem[]>([
    { service: ALL_SERVICES[0], quantity: 1 },
    { service: ALL_SERVICES[1], quantity: 3 },
  ]);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setApplied] = useState<string | null>(null);
  const [couponErr, setCouponErr] = useState("");



  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const SHIPPING = deliveryType === "pickup" ? 0 : 20;
  // ── Calculations ───────────────────────────────────
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.service.price * i.quantity, 0);
  const tier = getTier(totalQty);
  const tierDisc = appliedCoupon ? 0 : Math.round(subtotal * tier.pct / 100);
  const couponDisc = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const totalDisc = tierDisc + couponDisc;
  const total = Math.max(subtotal + SHIPPING - totalDisc, 0);
  const nextTier = TIERS.slice().reverse().find(t => t.min > totalQty && t.pct > 0);

  // ── Handlers ───────────────────────────────────────
  const updateQty = (id: string, delta: number) =>
    setCart(p =>
      p.map(i => i.service.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );

  const addService = (svc: Service) =>
    setCart(p =>
      p.find(i => i.service.id === svc.id)
        ? p.map(i => i.service.id === svc.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...p, { service: svc, quantity: 1 }]
    );

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setApplied("SAVE10");
      setCouponErr("");
    } else {
      setCouponErr("كود الخصم غير صحيح");
    }
  };

  const handleRemoveCoupon = () => {
    setApplied(null);
    setCoupon("");
    setCouponErr("");
  };

  // const handleCheckout = () => {
  //   navigate("/schedule", {
  //     state: { cart, subtotal, totalDisc, couponCode: appliedCoupon, total, shippingPrice: SHIPPING },
  //   });
  // };
  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (deliveryType === "delivery" && !deliveryAddress.trim()) {
      alert("من فضلك ادخل عنوان التوصيل");
      return;
    }

    navigate("/schedule", {
      state: {
        cart, subtotal, totalDisc,
        couponCode: appliedCoupon,
        total, shippingPrice: SHIPPING,
        deliveryType,
        deliveryAddress,
      },
    });
  };
  // ── Render ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans" dir="rtl">

      {/* 1. Header */}
      <CartHeader totalQty={totalQty} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT col ───────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* 2. Tier progress bar */}
          <TierProgress
            totalQty={totalQty}
            tierPct={tier.pct}
            nextTierPct={nextTier?.pct}
          />

          {/* 3. Institutional banner */}
          <InstitutionalBanner />

          {/* 4. Cart items + add more */}
          <CartItemsList
            cart={cart}
            allServices={ALL_SERVICES}
            onUpdateQty={updateQty}
            onAddService={addService}
          />
        </div>

        {/* ── RIGHT col ──────────────────────────────── */}
        <div className="space-y-4">


          {/* Delivery selector */}
          <DeliverySelector
            deliveryType={deliveryType}
            deliveryAddress={deliveryAddress}
            onTypeChange={setDeliveryType}
            onAddressChange={setDeliveryAddress}
          />
          {/* 5. Coupon input */}
          <CouponInput
            coupon={coupon}
            appliedCoupon={appliedCoupon}
            couponErr={couponErr}
            onChange={val => { setCoupon(val); setCouponErr(""); }}
            onApply={handleCoupon}
            onRemove={handleRemoveCoupon}
          />

          {/* 6. Price summary + CTA + trust badges */}
          <PriceSummary
            totalQty={totalQty}
            subtotal={subtotal}
            shipping={SHIPPING}
            tierDisc={tierDisc}
            tierPct={tier.pct}
            couponDisc={couponDisc}
            totalDisc={totalDisc}
            total={total}
            cartEmpty={cart.length === 0}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
