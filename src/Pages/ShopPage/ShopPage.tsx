import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./shopStyles.css"

import ShopBanner from "./components/ShopBanner"
import ShopToolbar from "./components/ShopToolbar"
import ShopServiceRow from "./components/ShopServiceRow"
import ShopCartSidebar from "./components/ShopCartSidebar"
import type { DeliveryType } from "./components/ShopCartSidebar"
import ShopReviews from "./components/ShopReviews"

import { ShopApi } from "./shopApi"
import type { ShopInfo, ShopService, ShopReview, CartTotals } from "./shopApi"

const CATEGORIES_ALL = "الكل"

export default function ShopPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [shop, setShop] = useState<ShopInfo | null>(null)
  const [services, setServices] = useState<ShopService[]>([])
  const [reviews, setReviews] = useState<ShopReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeTab, setActiveTab] = useState("services")
  const [activeCategory, setActiveCategory] = useState(CATEGORIES_ALL)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [fastMap, setFastMap] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<string | null>(null)
  const [cartTotals, setCartTotals] = useState<CartTotals | null>(null)
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")

  // Load shop data
  useEffect(() => {
    if (!id) {
      navigate("/")
      return
    }
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const [shopData, svcs, revs] = await Promise.all([
          ShopApi.getShop(id),
          ShopApi.getShopServices(id),
          ShopApi.getShopReviews(id),
        ])
        if (!shopData) {
          setError("المغسلة غير موجودة")
          setLoading(false)
          return
        }
        setShop(shopData)
        setServices(svcs)
        setReviews(revs)
      } catch {
        setError("حدث خطأ في تحميل بيانات المغسلة")
      }
      setLoading(false)
    })()
  }, [id, navigate])

  const DELIVERY_FEE = 30

  // Recalculate cart totals (include delivery fee when delivery type is selected)
  useEffect(() => {
    const items = Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([serviceId, quantity]) => ({
        serviceId,
        quantity,
        fast: !!fastMap[serviceId],
      }))
    if (!items.length) {
      setCartTotals(null)
      return
    }
    const fee = deliveryType === "delivery" ? DELIVERY_FEE : 0
    ShopApi.calculateCart(items, fee).then((totals) => {
      if (totals) setCartTotals(totals)
    })
  }, [cart, fastMap, deliveryType])

  const categories = services.length
    ? [
        CATEGORIES_ALL,
        ...Array.from(new Set(services.map((s) => s.category || "عام"))),
      ]
    : []

  const filteredServices =
    activeCategory === CATEGORIES_ALL
      ? services
      : services.filter((s) => (s.category || "عام") === activeCategory)

  const incQty = useCallback((svcId: string) => {
    setCart((prev) => ({ ...prev, [svcId]: (prev[svcId] || 0) + 1 }))
  }, [])

  const decQty = useCallback((svcId: string) => {
    setCart((prev) => {
      const next = { ...prev }
      if (!next[svcId]) return prev
      next[svcId]--
      if (!next[svcId]) delete next[svcId]
      return next
    })
  }, [])

  const toggleFast = useCallback((svcId: string, val: boolean) => {
    setFastMap((prev) => ({ ...prev, [svcId]: val }))
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Navigate to schedule → checkout with full cart state
  const handleGoToCheckout = () => {
    const cartEntries = Object.entries(cart).filter(([, q]) => q > 0)
    if (!cartEntries.length || !shop) return

    const checkoutCart = cartEntries.map(([svcId, qty]) => {
      const svc = services.find((s) => String(s._id) === svcId)!
      const isFast = !!fastMap[svcId]
      const mult = isFast && svc.fast_service ? svc.fast_multiplier || 1 : 1
      return {
        service: {
          id: String(svc._id),
          name: svc.name,
          subtitle: isFast ? "خدمة سريعة" : svc.category || "خدمة عادية",
          price: Math.round(svc.price * mult),
          icon: "🧺",
        },
        quantity: qty,
      }
    })

    const apiItems = cartEntries.map(([serviceId, quantity]) => ({
      serviceId,
      quantity,
      fast: !!fastMap[serviceId],
    }))

    const subtotal =
      cartTotals?.subtotal ??
      checkoutCart.reduce((s, i) => s + i.service.price * i.quantity, 0)
    const totalDisc = cartTotals?.discount ?? 0
    const shippingPrice = cartTotals?.deliveryFee ?? 0
    const total = cartTotals?.total ?? subtotal

    navigate("/schedule", {
      state: {
        cart: checkoutCart,
        apiItems,
        shopId: shop._id,
        subtotal,
        totalDisc,
        total,
        shippingPrice,
        deliveryType,
        deliveryAddress,
      },
    })
  }

  const handleAddReview = async (payload: {
    rating: number
    comment: string
  }) => {
    const result = await ShopApi.addReview(shop!._id, payload)
    if (result?.data) {
      setReviews((prev) => [result.data as ShopReview, ...prev])
      showToast("✓ شكراً! تم إرسال تقييمك")
    } else {
      showToast("⚠ لم يتم إرسال التقييم، حاول مرة أخرى")
    }
  }

  if (loading)
    return (
      <div className="nv-page">
        <div className="nv-loading">جاري التحميل...</div>
      </div>
    )

  if (error || !shop) {
    return (
      <div className="nv-page">
        <div className="nv-loading">
          {error || "المغسلة غير موجودة"}
          <br />
          <button
            type="button"
            className="nv-error-back-btn"
            onClick={() => navigate("/")}
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    )
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
                { key: "about", label: "عن المغسلة" },
                { key: "reviews", label: `التقييمات (${reviews.length})` },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`nv-main-tab${activeTab === t.key ? "active" : ""}`}
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
                      type="button"
                      className={`nv-cat-tab${activeCategory === cat ? "active" : ""}`}
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
                            {services.length === 0
                              ? "لا توجد خدمات لهذه المغسلة"
                              : "لا توجد خدمات في هذه الفئة"}
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
                            onFastToggle={(val) =>
                              toggleFast(String(svc._id), val)
                            }
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
                <p className="nv-about-text">
                  {shop.description || "لا يوجد وصف لهذه المغسلة."}
                </p>
                <div className="nv-about-grid">
                  {[
                    { icon: "📍", label: "الموقع", val: shop.address },
                    { icon: "📞", label: "رقم الهاتف", val: shop.phone },
                    {
                      icon: "✔",
                      label: "حالة التوثيق",
                      val: shop.is_verified ? "مغسلة موثّقة ✓" : "غير موثّقة",
                    },
                  ]
                    .filter((i) => i.val)
                    .map((item) => (
                      <div key={item.label} className="nv-about-item">
                        <span className="nv-about-icon">{item.icon}</span>
                        <div>
                          <div className="nv-meta-label">{item.label}</div>
                          <div className="nv-meta-val nv-meta-val-start">
                            {item.val}
                          </div>
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
          deliveryType={deliveryType}
          deliveryAddress={deliveryAddress}
          onDeliveryTypeChange={setDeliveryType}
          onDeliveryAddressChange={setDeliveryAddress}
          onOrder={handleGoToCheckout}
        />
      </main>

      {toast && <div className="nv-toast">{toast}</div>}
    </div>
  )
}
