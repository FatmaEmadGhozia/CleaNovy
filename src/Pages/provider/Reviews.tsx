// import { useState, useMemo } from "react";
// import { useProvider } from "./context/ProviderContext";
// import type  {Review } from "./types";

// type FilterRating = "all" | 1 | 2 | 3 | 4 | 5;

// export default function Reviews() {
//   const provider = useProvider() as any;
//   const reviews: Review[] = provider.reviews ?? [];
//   const replyToReview: (id: string, reply: string) => void = provider.replyToReview ?? (() => {});
//   const [filter, setFilter] = useState<FilterRating>("all");
//   const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
//   const [openReplyId, setOpenReplyId] = useState<string | null>(null);

//   const stats = useMemo(() => {
//     const total = reviews.length;
//     const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
//     const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviews.forEach((r) => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
//     return { total, avg, counts };
//   }, [reviews]);

//   const filtered = useMemo(() => {
//     if (filter === "all") return reviews;
//     return reviews.filter((r) => r.rating === filter);
//   }, [reviews, filter]);

//   const handleSendReply = (id: string) => {
//     const text = (replyDrafts[id] || "").trim();
//     if (!text) return;
//     replyToReview(id, text);
//     setOpenReplyId(null);
//   };

//   return (
//     <div className="p-8 min-h-[calc(100vh-80px)]">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
//           التقييمات
//         </h2>
//         <p className="text-slate-500 mt-1">آراء وتقييمات العملاء حول خدماتك</p>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         {/* Summary card */}
//         <div className="col-span-4">
//           <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6 sticky top-24">
//             <div className="text-center">
//               <p className="text-5xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
//                 {stats.avg.toFixed(1)}
//               </p>
//               <div className="flex items-center justify-center gap-1 mt-2">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <span
//                     key={i}
//                     className="material-symbols-outlined text-xl"
//                     style={{
//                       fontVariationSettings: "'FILL' 1",
//                       color: i <= Math.round(stats.avg) ? "#FBBF24" : "#E4E9EF",
//                     }}
//                   >
//                     star
//                   </span>
//                 ))}
//               </div>
//               <p className="text-sm text-slate-500 mt-2">{stats.total} تقييم</p>
//             </div>

//             <div className="mt-6 pt-6 border-t border-[#E4E9EF] space-y-3">
//               {[5, 4, 3, 2, 1].map((star) => {
//                 const count = stats.counts[star] || 0;
//                 const pct = stats.total ? (count / stats.total) * 100 : 0;
//                 return (
//                   <button
//                     key={star}
//                     onClick={() => setFilter(filter === star ? "all" : (star as FilterRating))}
//                     className={`w-full flex items-center gap-3 group transition-opacity ${
//                       filter !== "all" && filter !== star ? "opacity-40" : ""
//                     }`}
//                   >
//                     <span className="text-xs font-bold text-[#0D1F3C] w-3">{star}</span>
//                     <span className="material-symbols-outlined text-sm text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
//                       star
//                     </span>
//                     <div className="flex-1 h-2 bg-[#EFF4FA] rounded-full overflow-hidden">
//                       <div className="h-full bg-[#006B5D] rounded-full transition-all" style={{ width: `${pct}%` }} />
//                     </div>
//                     <span className="text-xs text-slate-500 w-6 text-left">{count}</span>
//                   </button>
//                 );
//               })}
//             </div>

//             {filter !== "all" && (
//               <button
//                 onClick={() => setFilter("all")}
//                 className="mt-4 w-full text-xs font-bold text-[#006B5D] hover:underline"
//               >
//                 إلغاء التصفية
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Reviews list */}
//         <div className="col-span-8 space-y-4">
//           {filtered.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-12 text-center">
//               <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">reviews</span>
//               <p className="font-bold text-[#0D1F3C]">لا توجد تقييمات</p>
//               <p className="text-sm text-slate-400 mt-1">ستظهر تقييمات العملاء هنا</p>
//             </div>
//           ) : (
//             filtered.map((review) => (
//               <ReviewCard
//                 key={review.id}
//                 review={review}
//                 isReplying={openReplyId === review.id}
//                 draft={replyDrafts[review.id] || ""}
//                 onDraftChange={(v) => setReplyDrafts((d) => ({ ...d, [review.id]: v }))}
//                 onToggleReply={() => setOpenReplyId(openReplyId === review.id ? null : review.id)}
//                 onSendReply={() => handleSendReply(review.id)}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ReviewCard({
//   review,
//   isReplying,
//   draft,
//   onDraftChange,
//   onToggleReply,
//   onSendReply,
// }: {
//   review: Review;
//   isReplying: boolean;
//   draft: string;
//   onDraftChange: (v: string) => void;
//   onToggleReply: () => void;
//   onSendReply: () => void;
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-full bg-[#006B5D]/10 flex items-center justify-center flex-shrink-0">
//             <span className="material-symbols-outlined text-[#006B5D]" style={{ fontVariationSettings: "'FILL' 1" }}>
//               person
//             </span>
//           </div>
//           <div>
//             <p className="font-bold text-sm text-[#0D1F3C]">{review.customerName}</p>
//             <p className="text-xs text-slate-400 mt-0.5">{review.orderId} • {review.date}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-0.5 flex-shrink-0">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <span
//               key={i}
//               className="material-symbols-outlined text-base"
//               style={{
//                 fontVariationSettings: "'FILL' 1",
//                 color: i <= review.rating ? "#FBBF24" : "#E4E9EF",
//               }}
//             >
//               star
//             </span>
//           ))}
//         </div>
//       </div>

//       <p className="text-sm text-slate-600 mt-4 leading-relaxed">{review.comment}</p>

//       {review.reply ? (
//         <div className="mt-4 mr-6 p-4 bg-[#EFF4FA] rounded-xl border-r-2 border-[#006B5D]">
//           <p className="text-xs font-bold text-[#006B5D] mb-1 flex items-center gap-1">
//             <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
//             ردك
//           </p>
//           <p className="text-sm text-slate-600">{review.reply}</p>
//         </div>
//       ) : (
//         <div className="mt-4">
//           {!isReplying ? (
//             <button
//               onClick={onToggleReply}
//               className="text-xs font-bold text-[#006B5D] hover:underline flex items-center gap-1"
//             >
//               <span className="material-symbols-outlined text-sm">reply</span>
//               الرد على التقييم
//             </button>
//           ) : (
//             <div className="flex gap-2 items-start">
//               <textarea
//                 value={draft}
//                 onChange={(e) => onDraftChange(e.target.value)}
//                 rows={2}
//                 placeholder="اكتب ردك هنا..."
//                 className="flex-1 bg-[#EFF4FA] border-none rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm resize-none"
//               />
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={onSendReply}
//                   className="bg-[#006B5D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005046] transition-all"
//                 >
//                   نشر
//                 </button>
//                 <button
//                   onClick={onToggleReply}
//                   className="bg-[#EFF4FA] text-slate-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useMemo } from "react";
import { useProvider } from "./context/ProviderContext";
import type  {Review } from "./types";

type FilterRating = "all" | 1 | 2 | 3 | 4 | 5;

export default function Reviews() {
  const { reviews, replyToReview, reviewsLoading } = useProvider();
  const [filter, setFilter] = useState<FilterRating>("all");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
    return { total, avg, counts };
  }, [reviews]);

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((r) => r.rating === filter);
  }, [reviews, filter]);

  const handleSendReply = (id: string) => {
    const text = (replyDrafts[id] || "").trim();
    if (!text) return;
    replyToReview(id, text);
    setOpenReplyId(null);
  };

  return (
    <div className="p-8 min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
          التقييمات
        </h2>
        <p className="text-slate-500 mt-1">آراء وتقييمات العملاء حول خدماتك</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Summary card */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6 sticky top-24">
            <div className="text-center">
              <p className="text-5xl font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
                {stats.avg.toFixed(1)}
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                      color: i <= Math.round(stats.avg) ? "#FBBF24" : "#E4E9EF",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">{stats.total} تقييم</p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E4E9EF] space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.counts[star] || 0;
                const pct = stats.total ? (count / stats.total) * 100 : 0;
                return (
                  <button
                    key={star}
                    onClick={() => setFilter(filter === star ? "all" : (star as FilterRating))}
                    className={`w-full flex items-center gap-3 group transition-opacity ${
                      filter !== "all" && filter !== star ? "opacity-40" : ""
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0D1F3C] w-3">{star}</span>
                    <span className="material-symbols-outlined text-sm text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <div className="flex-1 h-2 bg-[#EFF4FA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#006B5D] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 w-6 text-left">{count}</span>
                  </button>
                );
              })}
            </div>

            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="mt-4 w-full text-xs font-bold text-[#006B5D] hover:underline"
              >
                إلغاء التصفية
              </button>
            )}
          </div>
        </div>

        {/* Reviews list */}
        <div className="col-span-8 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">reviews</span>
              <p className="font-bold text-[#0D1F3C]">لا توجد تقييمات</p>
              <p className="text-sm text-slate-400 mt-1">ستظهر تقييمات العملاء هنا</p>
            </div>
          ) : (
            filtered.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isReplying={openReplyId === review.id}
                draft={replyDrafts[review.id] || ""}
                onDraftChange={(v) => setReplyDrafts((d) => ({ ...d, [review.id]: v }))}
                onToggleReply={() => setOpenReplyId(openReplyId === review.id ? null : review.id)}
                onSendReply={() => handleSendReply(review.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  isReplying,
  draft,
  onDraftChange,
  onToggleReply,
  onSendReply,
}: {
  review: Review;
  isReplying: boolean;
  draft: string;
  onDraftChange: (v: string) => void;
  onToggleReply: () => void;
  onSendReply: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#0D1F3C]/5 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#006B5D]/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[#006B5D]" style={{ fontVariationSettings: "'FILL' 1" }}>
              person
            </span>
          </div>
          <div>
            <p className="font-bold text-sm text-[#0D1F3C]">{review.customerName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{review.orderId} • {review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="material-symbols-outlined text-base"
              style={{
                fontVariationSettings: "'FILL' 1",
                color: i <= review.rating ? "#FBBF24" : "#E4E9EF",
              }}
            >
              star
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-4 leading-relaxed">{review.comment}</p>

      {review.reply ? (
        <div className="mt-4 mr-6 p-4 bg-[#EFF4FA] rounded-xl border-r-2 border-[#006B5D]">
          <p className="text-xs font-bold text-[#006B5D] mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
            ردك
          </p>
          <p className="text-sm text-slate-600">{review.reply}</p>
        </div>
      ) : (
        <div className="mt-4">
          {!isReplying ? (
            <button
              onClick={onToggleReply}
              className="text-xs font-bold text-[#006B5D] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">reply</span>
              الرد على التقييم
            </button>
          ) : (
            <div className="flex gap-2 items-start">
              <textarea
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                rows={2}
                placeholder="اكتب ردك هنا..."
                className="flex-1 bg-[#EFF4FA] border-none rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-[#006B5D]/20 outline-none text-sm resize-none"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={onSendReply}
                  className="bg-[#006B5D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005046] transition-all"
                >
                  نشر
                </button>
                <button
                  onClick={onToggleReply}
                  className="bg-[#EFF4FA] text-slate-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}