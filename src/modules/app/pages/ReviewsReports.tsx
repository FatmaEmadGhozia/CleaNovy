import { useState } from "react";
import { Trash2, X, EyeOff, Eye } from "lucide-react";

const reviewsData = [
  { id: 1, customer: "سارة أحمد الشمري", provider: "مغسلة النظافة المثالية", rating: 5, comment: "خدمة ممتازة جداً! ملابسي رجعت نظيفة وريحتها حلوة. أكيد بستخدم الخدمة مرة ثانية.", date: "2026-05-15" },
  { id: 2, customer: "محمد علي السعيد", provider: "مغسلة الماسية", rating: 4, comment: "الخدمة جيدة بشكل عام. التوصيل كان بالوقت والجودة ممتازة.", date: "2026-05-14" },
  { id: 3, customer: "فاطمة خالد المطيري", provider: "مغسلة السريعة", rating: 3, comment: "الخدمة عادية لكن أخذت وقت أطول من المتوقع. ممكن يتحسنون أكثر.", date: "2026-05-13" },
  { id: 4, customer: "عبدالله محمود العتيبي", provider: "مغسلة النخبة", rating: 5, comment: "رائعون! تعاملوا مع قطعي الحساسة بعناية كبيرة. أنصح بهم بشدة.", date: "2026-05-12" },
  { id: 5, customer: "نورة سعد القحطاني", provider: "مغسلة التنظيف الفاخر", rating: 4, comment: "خدمة احترافية جداً. الموظفين متعاونين والنتيجة كانت ممتازة.", date: "2026-05-11" },
  { id: 6, customer: "خالد عبدالعزيز الدوسري", provider: "مغسلة اللمعان", rating: 5, comment: "أفضل مغسلة جربتها! السعر مناسب والخدمة سريعة ونظيفة.", date: "2026-05-10" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-lg ${star <= rating ? "text-[#F4C542]" : "text-[#D1D5DB]"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ConfirmDeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#0D1F3C]">تأكيد الحذف</h3>
          <button onClick={onCancel} aria-label="إغلاق النافذة" className="p-1 hover:bg-[#F4F6F9] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#777779]" />
          </button>
        </div>
        <p className="text-[#777779] mb-6">هل أنت متأكد أنك تريد حذف هذا التقييم؟</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#FF4D4D] text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            حذف
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-[#F4F6F9] text-[#777779] py-2 rounded-lg hover:bg-[#F4F6F9] transition-colors font-medium"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReviewsReports() {
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [reviews, setReviews] = useState(reviewsData);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "hidden">("active");
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [providerFilter, setProviderFilter] = useState<string>("");

  const uniqueProviders = Array.from(new Set(reviews.map((r) => r.provider)));

  const visibleReviews = reviews.filter((r) => !hiddenIds.includes(r.id));
  const hiddenReviews = reviews.filter((r) => hiddenIds.includes(r.id));

  const filteredVisible = visibleReviews.filter((r) => {
    const matchRating = ratingFilter === 0 || r.rating === ratingFilter;
    const matchProvider = providerFilter === "" || r.provider === providerFilter;
    return matchRating && matchProvider;
  });

  function handleDelete(id: number) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setHiddenIds((prev) => prev.filter((hid) => hid !== id));
    setDeleteTarget(null);
  }

  function handleHide(id: number) {
    setHiddenIds((prev) => [...prev, id]);
  }

  function handleRestore(id: number) {
    setHiddenIds((prev) => prev.filter((hid) => hid !== id));
  }

  return (
    <div className="space-y-6" dir="rtl">
      {deleteTarget !== null && (
        <ConfirmDeleteModal
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-[#0D1F3C]">التقييمات</h1>
        <div className="bg-white rounded-lg px-4 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
          <span className="text-[#777779] text-sm">إجمالي التقييمات: </span>
          <span className="text-[#0D1F3C] font-medium">{visibleReviews.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#F4F6F9]">
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "active"
              ? "border-[#00C9B1] text-[#00C9B1]"
              : "border-transparent text-[#777779] hover:text-[#0D1F3C]"
          }`}
        >
          التقييمات النشطة
          <span className="mr-2 bg-[#00C9B1]/10 text-[#00C9B1] text-xs px-2 py-0.5 rounded-full">
            {visibleReviews.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("hidden")}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === "hidden"
              ? "border-[#777779] text-[#0D1F3C]"
              : "border-transparent text-[#777779] hover:text-[#0D1F3C]"
          }`}
        >
          التقييمات المخفية
          {hiddenReviews.length > 0 && (
            <span className="mr-2 bg-[#F4F6F9] text-[#777779] text-xs px-2 py-0.5 rounded-full">
              {hiddenReviews.length}
            </span>
          )}
        </button>
      </div>

      {/* Filters — shown only on active tab */}
      {activeTab === "active" && (
        <div className="flex flex-wrap gap-4">
          {/* Rating filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <span className="text-[#777779] text-sm whitespace-nowrap">التقييم:</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setRatingFilter(0)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  ratingFilter === 0
                    ? "bg-[#00C9B1] text-white"
                    : "text-[#777779] hover:bg-[#F4F6F9]"
                }`}
              >
                الكل
              </button>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRatingFilter(star)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    ratingFilter === star
                      ? "bg-[#00C9B1] text-white"
                      : "text-[#777779] hover:bg-[#F4F6F9]"
                  }`}
                >
                  {star} <span className="text-[#F4C542]">★</span>
                </button>
              ))}
            </div>
          </div>

          {/* Provider filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <span className="text-[#777779] text-sm whitespace-nowrap">المغسلة:</span>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              aria-label="تصفية حسب المغسلة"
              className="text-sm text-[#0D1F3C] bg-transparent outline-none cursor-pointer min-w-40"
            >
              <option value="">كل المغاسل</option>
              {uniqueProviders.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active Reviews */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {filteredVisible.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <p className="text-[#777779]">لا توجد تقييمات تطابق الفلتر المحدد</p>
            </div>
          ) : (
            filteredVisible.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#00C9B1] flex items-center justify-center text-white font-medium text-lg">
                        {review.customer.split(" ")[0][0]}
                      </div>
                      <div>
                        <div className="text-[#0D1F3C] font-medium text-lg">{review.customer}</div>
                        <div className="text-[#777779] text-sm">{review.date}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-[#777779] text-sm mb-1">المغسلة</div>
                      <div className="text-[#0D1F3C] font-medium">{review.provider}</div>
                    </div>

                    <div className="mb-3">
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="bg-[#F4F6F9] rounded-lg p-4">
                      <p className="text-[#0D1F3C] leading-relaxed">{review.comment}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mr-4">
                    <button
                      type="button"
                      className="p-2 hover:bg-[#777779]/10 rounded-lg transition-colors"
                      title="إخفاء التقييم"
                      onClick={() => handleHide(review.id)}
                    >
                      <EyeOff className="w-5 h-5 text-[#777779]" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                      title="حذف التقييم"
                      onClick={() => setDeleteTarget(review.id)}
                    >
                      <Trash2 className="w-5 h-5 text-[#FF4D4D]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Hidden Reviews */}
      {activeTab === "hidden" && (
        <div className="space-y-4">
          {hiddenReviews.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <EyeOff className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
              <p className="text-[#777779]">لا توجد تقييمات مخفية</p>
            </div>
          ) : (
            hiddenReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-dashed border-[#D1D5DB] opacity-80"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#777779] flex items-center justify-center text-white font-medium text-lg">
                        {review.customer.split(" ")[0][0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-[#0D1F3C] font-medium text-lg">{review.customer}</div>
                          <span className="text-xs bg-[#F4F6F9] text-[#777779] px-2 py-0.5 rounded-full">مخفي</span>
                        </div>
                        <div className="text-[#777779] text-sm">{review.date}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-[#777779] text-sm mb-1">المغسلة</div>
                      <div className="text-[#0D1F3C] font-medium">{review.provider}</div>
                    </div>

                    <div className="mb-3">
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="bg-[#F4F6F9] rounded-lg p-4">
                      <p className="text-[#0D1F3C] leading-relaxed">{review.comment}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mr-4">
                    <button
                      type="button"
                      className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors"
                      title="إظهار التقييم مجدداً"
                      onClick={() => handleRestore(review.id)}
                    >
                      <Eye className="w-5 h-5 text-[#00C9B1]" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                      title="حذف التقييم"
                      onClick={() => setDeleteTarget(review.id)}
                    >
                      <Trash2 className="w-5 h-5 text-[#FF4D4D]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
