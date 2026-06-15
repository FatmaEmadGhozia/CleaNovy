import { ShopService, CartTotals } from "../shopApi";
import { H } from "../shopHelpers";

interface Props {
  cart: Record<string, number>;
  fastMap: Record<string, boolean>;
  services: ShopService[];
  cartTotals: CartTotals | null;
  onOrder: () => void;
}

export default function ShopCartSidebar({ cart, fastMap, services, cartTotals, onOrder }: Props) {
  const cartItems = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const svc = services.find((s) => String(s._id) === id);
      if (!svc) return null;
      const isF = !!fastMap[id];
      const mult = isF && svc.fast_service ? (svc.fast_multiplier || 1) : 1;
      return { svc, qty, isF, lineTotal: svc.price * mult * qty };
    })
    .filter(Boolean) as { svc: ShopService; qty: number; isF: boolean; lineTotal: number }[];

  const totalQty   = cartTotals?.totalQty  ?? cartItems.reduce((a, i) => a + i.qty, 0);
  const subtotal   = cartTotals?.subtotal  ?? cartItems.reduce((a, i) => a + i.lineTotal, 0);
  const discount   = cartTotals?.discount  ?? 0;
  const vat        = cartTotals?.vat       ?? 0;
  const total      = cartTotals?.total     ?? subtotal;
  const deliveryFee = cartTotals?.deliveryFee ?? 0;

  const progressPct = Math.min(100, (totalQty / 10) * 100);
  let discountLabel = "أضف ٥ قطع للحصول على خصم ١٠٪";
  if (totalQty >= 10) discountLabel = "حصلت على خصم ٢٠٪!";
  else if (totalQty >= 5) discountLabel = `باقي ${H.toAr(10 - totalQty)} قطع لخصم ٢٠٪`;
  else if (totalQty > 0) discountLabel = `باقي ${H.toAr(5 - totalQty)} قطع لخصم ١٠٪`;

  const isEmpty = cartItems.length === 0;

  return (
    <aside className="nv-sidebar">
      <div className="nv-side-title">
        ملخص الطلب{" "}
        {totalQty > 0 && (
          <span style={{ fontWeight: 400, fontSize: 13, color: "var(--nv-muted)" }}>
            ({H.toAr(totalQty)} قطع)
          </span>
        )}
      </div>

      <div className="nv-cart-items">
        {isEmpty ? (
          <p className="nv-empty-cart">لم تتم إضافة أي خدمات بعد</p>
        ) : (
          cartItems.map(({ svc, qty, isF, lineTotal }) => (
            <div key={svc._id} className="nv-cart-item">
              <div className="nv-cart-check">✓</div>
              <div className="nv-cart-item-info">
                <div className="nv-cart-item-name">
                  {svc.name} {qty > 1 && `× ${H.toAr(qty)}`}
                </div>
                <div className="nv-cart-item-sub">
                  {isF && svc.fast_service ? "خدمة سريعة" : H.unitLabel(svc.unit)}
                </div>
              </div>
              <div className="nv-cart-item-price">{H.fmtPrice(lineTotal)}</div>
            </div>
          ))
        )}
      </div>

      <div className="nv-discount-box">
        <div className="nv-discount-text">
          <span>{discountLabel}</span>
          <span>وفر أكثر</span>
        </div>
        <div className="nv-progress-track">
          <div className="nv-progress-fill" style={{ width: progressPct + "%" }} />
        </div>
        <div className="nv-progress-labels">
          <span>٠ قطعة</span>
          <span>٥ قطع (١٠٪)</span>
          <span>١٠ قطع (٢٠٪)</span>
        </div>
      </div>

      <div className="nv-totals-box">
        <div className="nv-tot-row"><span>المجموع الفرعي</span><span>{H.fmtPrice(subtotal)}</span></div>
        {discount > 0 && (
          <div className="nv-tot-row" style={{ color: "var(--nv-green)" }}>
            <span>الخصم ({cartTotals?.discountRate ? Math.round(cartTotals.discountRate * 100) + "٪" : ""})</span>
            <span>- {H.fmtPrice(discount)}</span>
          </div>
        )}
        {vat > 0 && (
          <div className="nv-tot-row"><span>الضريبة</span><span>{H.fmtPrice(vat)}</span></div>
        )}
        <div className="nv-tot-row">
          <span>التوصيل</span>
          <span className={deliveryFee === 0 ? "nv-free" : ""}>{deliveryFee === 0 ? "مجاني" : H.fmtPrice(deliveryFee)}</span>
        </div>
        <div className="nv-tot-row nv-grand-row">
          <span>الإجمالي</span><span>{H.fmtPrice(total)}</span>
        </div>
      </div>

      <button className="nv-btn-order" disabled={isEmpty} onClick={onOrder}>
        🛒 المتابعة لإتمام الطلب
      </button>
    </aside>
  );
}
