import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./shopStyles.css";

import ShopBanner      from "./components/ShopBanner";
import ShopToolbar     from "./components/ShopToolbar";
import ShopServiceRow  from "./components/ShopServiceRow";
import ShopCartSidebar from "./components/ShopCartSidebar";
import ShopReviews     from "./components/ShopReviews";
import ShopOrderModal  from "./components/ShopOrderModal";

import { ShopApi, ShopInfo, ShopService, ShopReview, CartTotals } from "./shopApi";

const CATEGORIES_ALL = "الكل";

export default function ShopPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [shop, setShop]       = useState<ShopInfo | null>(null);
  const [services, setServices] = useState<ShopService[]>([]);
  const [reviews, setReviews]   = useState<ShopReview[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const [activeTab, setActiveTab]           = useState("services");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES_ALL);
  const [cart, setCart]                     = useState<Record<string, number>>({});
  const [fastMap, setFastMap]               = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen]           = useState(false);
  const [toast, setToast]                   = useState<string | null>(null);
  const [cartTotals, setCartTotals]         = useState<CartTotals | null>(null);

  // Load shop data on mount
  useEffect(() => {
    if (!id) { navigate("/"); return; }

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [shopData, svcs, revs] = await Promise.all([
          ShopApi.getShop(id),
          ShopApi.getShopServices(id),
          ShopApi.getShopReviews(id),
        ]);
        if (!shopData) { setError("المغسلة غير موجودة"); setLoading(false); return; }
        setShop(shopData);
        setServices(svcs);
        setReviews(revs);
      } catch {
        setError("حدث خطأ في تحميل بيانات المغسلة");
      }
      setLoading(false);
    })();
  }, [id, navigate]);

  // Recalculate cart totals when cart or fastMap changes
  useEffect(() => {
    const items = Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([serviceId, quantity]) => ({ serviceId, quantity, fast: !!fastMap[serviceId] }));

    if (!items.length) { setCartTotals(null); return; }

    ShopApi.calculateCart(items).then((totals) => {
      if (totals) setCartTotals(totals);
    });
  }, [cart, fastMap]);

  const categories = services.length
    ? [CATEGORIES_ALL, ...Array.from(new Set(services.map((s) => s.category || "عام")))]
    : [];

  const filteredServices =
    activeCategory === CATEGORIES_ALL
      ? services
      : services.filter((s) => (s.category || "عام") === activeCategory);

  const incQty = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const decQty = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      next[id]--;
      if (!next[id]) delete next[id];
      return next;
    });
  }, []);

  const toggleFast = useCallback((svcId: string, val: boolean) => {
    setFastMap((prev) => ({ ...prev, [svcId]: val }));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOrder = async ({ name, phone, address }: { name: string; phone: string; address: string }) => {
    const items = Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([serviceId, quantity]) => ({ serviceId, quantity, fast: !!fastMap[serviceId] }));

    const result = await ShopApi.placeOrder({
      shopId: shop!._id,
      customerName: name,
      phone,
      address,
      items,
    });

    setModalOpen(false);
    if (result?.success !== false) {
      setCart({}); setFastMap({}); setCartTotals(null);
      showToast("✓ تم تأكيد طلبك بنجاح!");
    } else {
      showToast("⚠ " + (result.message || "حدث خطأ، حاول مرة أخرى"));
    }
  };

  const handleAddReview = async (payload: { rating: number; comment: string }) => {
    const result = await ShopApi.addReview(shop!._id, payload);
    if (result?.data) {
      setReviews((prev) => [result.data as ShopReview, ...prev]);
      showToast("✓ شكراً! تم إرسال تقييمك");
    } else {
      showToast("⚠ لم يتم إرسال التقييم، حاول مرة أخرى");
    }
  };

  if (loading) return <div className="nv-page"><div className="nv-loading">جاري التحميل...</div></div>;

  if (error || !shop) {
    return (
      <div className="nv-page">
        <div className="nv-loading" style={{ color: "var(--nv-muted)" }}>
          {error || "المغسلة غير موجودة"}
          <br />
          <button onClick={() => navigate("/")} style={{ marginTop: 16, padding: "8px 20px", background: "var(--nv-navy)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nv-page">
      <ShopBanner shop={shop} />
      <ShopToolbar shop={shop} />

      <main className="nv-main">
        <div>
          <div className="nv-panel">
            {/* Tabs */}
            <div className="nv-main-tabs">
              {[
                { key: "services", label: "الخدمات والأسعار" },
                { key: "about",    label: "عن المغسلة" },
                { key: "reviews",  label: `التقييمات (${reviews.length})` },
              ].map((t) => (
                <button
                  key={t.key}
                  className={`nv-main-tab${activeTab === t.key ? " active" : ""}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Services Tab */}
            {activeTab === "services" && (
              <>
                <div className="nv-cat-tabs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`nv-cat-tab${activeCategory === cat ? " active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="nv-table-wrap">
                  <table className="nv-svc-table">
                    <thead>
                      <tr>
                        <th>الخدمة</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>خدمة سريعة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="nv-loading-row">
                            {services.length === 0 ? "لا توجد خدمات لهذه المغسلة" : "لا توجد خدمات في هذه الفئة"}
                          </td>
                        </tr>
                      ) : (
                        filteredServices.map((svc) => (
                          <ShopServiceRow
                            key={svc._id}
                            service={svc}
                            qty={cart[String(svc._id)] || 0}
                            isFast={!!fastMap[String(svc._id)]}
                            onInc={() => incQty(String(svc._id))}
                            onDec={() => decQty(String(svc._id))}
                            onFastToggle={(val) => toggleFast(String(svc._id), val)}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div>
                <p className="nv-about-text">{shop.description || "لا يوجد وصف لهذه المغسلة."}</p>
                <div className="nv-about-grid">
                  {[
                    { icon: "📍", label: "الموقع",       val: shop.address },
                    { icon: "📞", label: "رقم الهاتف",   val: shop.phone },
                    { icon: "✔",  label: "حالة التوثيق", val: shop.is_verified ? "مغسلة موثّقة ✓" : "غير موثّقة" },
                  ]
                    .filter((i) => i.val)
                    .map((item) => (
                      <div key={item.label} className="nv-about-item">
                        <span style={{ fontSize: 22, color: "var(--nv-gold)" }}>{item.icon}</span>
                        <div>
                          <div className="nv-meta-label">{item.label}</div>
                          <div className="nv-meta-val" style={{ justifyContent: "flex-start" }}>{item.val}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <ShopReviews reviews={reviews} onAddReview={handleAddReview} />
            )}
          </div>
        </div>

        <ShopCartSidebar
          cart={cart}
          fastMap={fastMap}
          services={services}
          cartTotals={cartTotals}
          onOrder={() => setModalOpen(true)}
        />
      </main>

      <ShopOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cart={cart}
        fastMap={fastMap}
        services={services}
        cartTotals={cartTotals}
        onConfirm={handleOrder}
      />

      {toast && <div className="nv-toast">{toast}</div>}
    </div>
  );
}
