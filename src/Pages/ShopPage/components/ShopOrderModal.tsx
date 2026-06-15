import { useState } from "react";
import { ShopService, CartTotals } from "../shopApi";
import { H } from "../shopHelpers";

interface Props {
  open: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  fastMap: Record<string, boolean>;
  services: ShopService[];
  cartTotals: CartTotals | null;
  onConfirm: (payload: { name: string; phone: string; address: string }) => Promise<void>;
}

export default function ShopOrderModal({ open, onClose, cart, fastMap, services, cartTotals, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const cartItems = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const svc = services.find((s) => String(s._id) === id);
      if (!svc) return null;
      const isF = !!fastMap[id];
      const mult = isF && svc.fast_service ? (svc.fast_multiplier || 1) : 1;
      return { svc, qty, lineTotal: svc.price * mult * qty };
    })
    .filter(Boolean) as { svc: ShopService; qty: number; lineTotal: number }[];

  const total    = cartTotals?.total    ?? cartItems.reduce((a, i) => a + i.lineTotal, 0);
  const discount = cartTotals?.discount ?? 0;
  const subtotal = cartTotals?.subtotal ?? total;

  const handleConfirm = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    await onConfirm({ name, phone, address });
    setSubmitting(false);
    setName(""); setPhone(""); setAddress("");
  };

  return (
    <div className="nv-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nv-modal-box">
        <div className="nv-modal-accent" />
        <div className="nv-modal-body">
          <button type="button" className="nv-modal-close" onClick={onClose}>✕</button>
          <div className="nv-modal-title">إتمام الطلب</div>

          <div className="nv-modal-form">
            <label>الاسم الكامل <span className="nv-required">*</span></label>
            <input type="text" placeholder="أدخل اسمك" value={name} onChange={(e) => setName(e.target.value)} />
            <label>رقم الهاتف <span className="nv-required">*</span></label>
            <input type="tel" placeholder="01xxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label>العنوان</label>
            <input type="text" placeholder="حي، شارع، رقم المبنى" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="nv-modal-summary">
            {cartItems.map(({ svc, qty, lineTotal }) => (
              <div key={svc._id} className="nv-modal-item-row">
                <span>{svc.name} × {H.toAr(qty)}</span>
                <span>{H.fmtPrice(lineTotal)}</span>
              </div>
            ))}
            {discount > 0 && (
              <div className="nv-modal-item-row nv-modal-discount-row">
                <span>الخصم</span>
                <span>- {H.fmtPrice(discount)}</span>
              </div>
            )}
            {subtotal !== total && (
              <div className="nv-modal-item-row">
                <span>المجموع الفرعي</span>
                <span>{H.fmtPrice(subtotal)}</span>
              </div>
            )}
            <div className="nv-modal-total-row">
              <span>الإجمالي</span>
              <span>{H.fmtPrice(total)}</span>
            </div>
          </div>

          <button
            type="button"
            className="nv-btn-confirm"
            disabled={!name.trim() || !phone.trim() || submitting}
            onClick={handleConfirm}
          >
            {submitting ? "جاري تأكيد الطلب..." : "تأكيد الطلب"}
          </button>
        </div>
      </div>
    </div>
  );
}
