export const H = {
  toAr(n: number | string): string {
    return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
  },
  fmtPrice(n: number, cur = "ج.م"): string {
    return (
      Number(n).toLocaleString("ar-EG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      cur
    );
  },
  fmtQty(n: number): string {
    return this.toAr(n);
  },
  iconFor(name = ""): string {
    const n = name.toLowerCase();
    if (n.includes("قميص") || n.includes("shirt")) return "👔";
    if (n.includes("بدلة") || n.includes("suit")) return "🧥";
    if (n.includes("جاف") || n.includes("dry")) return "✨";
    if (n.includes("كوي") || n.includes("iron")) return "♨️";
    if (n.includes("غسيل") || n.includes("wash")) return "🫧";
    if (n.includes("بطانية") || n.includes("blanket")) return "🛏️";
    if (n.includes("بنطلون") || n.includes("pant")) return "👖";
    if (n.includes("فستان") || n.includes("dress")) return "👗";
    if (n.includes("حذاء") || n.includes("shoe")) return "👟";
    if (n.includes("سجادة") || n.includes("carpet")) return "🏠";
    return "🧺";
  },
  unitLabel(u = "per_piece"): string {
    const map: Record<string, string> = {
      per_piece: "لكل قطعة",
      per_kg: "لكل كجم",
      per_meter: "لكل متر",
      per_pair: "لكل زوج",
      per_set: "لكل طقم",
    };
    return map[u] || u;
  },
};
