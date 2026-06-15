import { useNavigate } from "react-router-dom"
import type { ShopInfo } from "../shopApi"

export default function ShopBanner({ shop }: { shop: ShopInfo }) {
  const navigate = useNavigate()
  const bannerStyle = shop.images?.[0]
    ? {
        backgroundImage: `linear-gradient(135deg,rgba(13,31,60,.6),rgba(26,47,82,.6)),url('${shop.images[0]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {}

  return (
    <section className="nv-banner" style={bannerStyle}>
      <div className="nv-banner-bg" />
      <button
        type="button"
        className="nv-back-btn"
        onClick={() => navigate(-1)}
      >
        &#8594; رجوع
      </button>
      <div className="nv-banner-content">
        <div className="nv-banner-text">
          <h1>{shop.name}</h1>
          <div className="nv-badges">
            <span className="nv-badge nv-badge-green">مفتوح الآن</span>
            {shop.is_verified && (
              <span className="nv-badge nv-badge-gold">موثّقة</span>
            )}
            {shop.avg_rating && (
              <span className="nv-badge nv-badge-rating">
                ⭐ {shop.avg_rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
        <div className="nv-shop-logo">
          <div className="nv-shop-logo-img">
            {shop.logo ? (
              <img src={shop.logo} alt={shop.name} />
            ) : (
              <div className="nv-logo-fallback">🧺</div>
            )}
          </div>
          {shop.avg_rating && (
            <div className="nv-shop-rating">
              ⭐ {shop.avg_rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
