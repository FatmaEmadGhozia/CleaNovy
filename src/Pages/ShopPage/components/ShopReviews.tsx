import { useState } from "react"
import type { ShopReview } from "../shopApi"

function StarPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="nv-review-rating-input">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="nv-star-pick"
          style={{
            color:
              i <= (hover || value) ? "var(--nv-gold)" : "var(--nv-border)",
          }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

interface Props {
  reviews: ShopReview[]
  onAddReview: (payload: { rating: number; comment: string }) => Promise<void>
}

export default function ShopReviews({ reviews, onAddReview }: Props) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) return
    setSubmitting(true)
    await onAddReview({ rating, comment })
    setRating(0)
    setComment("")
    setSubmitting(false)
  }

  return (
    <div>
      <div className="nv-add-review-box">
        <div className="nv-side-title" style={{ marginBottom: 12 }}>
          أضف تقييمك
        </div>
        <StarPicker value={rating} onChange={setRating} />
        <textarea
          className="nv-review-textarea"
          placeholder="شاركنا تجربتك..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="nv-btn-order"
          style={{ marginTop: 12 }}
          disabled={!rating || !comment.trim() || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </div>

      {reviews.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--nv-muted)",
            padding: "24px 0",
          }}
        >
          لا توجد تقييمات بعد، كن أول من يقيّم!
        </p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="nv-review-card">
            <div className="nv-review-head">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="nv-review-stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--nv-navy)",
                  }}
                >
                  {r.client}
                </span>
              </div>
              <span className="nv-review-date">
                {new Date(r.createdAt).toLocaleDateString("ar-EG")}
              </span>
            </div>
            <p className="nv-review-comment">{r.comment}</p>
            {r.provider_reply && (
              <div className="nv-review-reply">
                <strong>رد المغسلة:</strong>
                <p>{r.provider_reply}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
