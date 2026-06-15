import { ShopInfo } from "../shopApi";

export default function ShopToolbar({ shop }: { shop: ShopInfo }) {
  return (
    <div className="nv-toolbar">
      <div className="nv-toolbar-inner">
        <div className="nv-toolbar-left">
          {shop.phone && (
            <a href={`tel:${shop.phone}`} className="nv-call-btn" style={{ textDecoration: "none" }}>
              📞 اتصل بنا
            </a>
          )}
          {shop.phone && (
            <a
              href={`https://wa.me/${shop.phone?.replace(/^0/, "20")}`}
              target="_blank"
              rel="noreferrer"
              className="nv-wa-btn"
              style={{ textDecoration: "none" }}
            >
              💬 واتساب
            </a>
          )}
        </div>
        <div className="nv-toolbar-right">
          {shop.address && (
            <div className="nv-meta-item">
              <div className="nv-meta-label">العنوان</div>
              <div className="nv-meta-val">📍 {shop.address}</div>
            </div>
          )}
          {shop.total_reviews !== undefined && (
            <div className="nv-meta-item">
              <div className="nv-meta-label">التقييمات</div>
              <div className="nv-meta-val">⭐ {shop.total_reviews} تقييم</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
