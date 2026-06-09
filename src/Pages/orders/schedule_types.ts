// types.ts
// ── Types + Constants + Helpers ───────────────────────

export const DAYS_AR   = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
export const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

export const SLOTS = {
  morning:   ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"],
  afternoon: ["01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00", "05:00 - 06:00"],
  evening:   ["07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00"],
};

export function getWeekDays(offset = 0): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset * 7 + i);
    return d;
  });
}

export function getDeliveryDay(day: Date): Date {
  return new Date(new Date(day).setDate(day.getDate() + 2));
}

export function buildPickupISO(day: Date, slot: string): string {
  const d = new Date(day);
  const [h] = slot.split(" - ")[0].split(":");
  d.setHours(+h, 0, 0, 0);
  return d.toISOString();
}
