import { useProvider } from "../context/ProviderContext";

const typeConfig = {
  order: { icon: "local_laundry_service", bg: "bg-[#006B5D]/10", color: "text-[#006B5D]" },
  payment: { icon: "payments", bg: "bg-emerald-50", color: "text-emerald-600" },
  system: { icon: "info", bg: "bg-blue-50", color: "text-blue-600" },
  promo: { icon: "campaign", bg: "bg-amber-50", color: "text-amber-600" },
};

export default function NotificationsPanel() {
  const {
    notifications,
    notificationsOpen,
    setNotificationsOpen,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount,
  } = useProvider();

  if (!notificationsOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-[#0D1F3C]/30 backdrop-blur-[2px]" onClick={() => setNotificationsOpen(false)} />

      <div className="fixed top-0 left-0 h-full w-96 z-[95] bg-white shadow-2xl flex flex-col border-r border-[#E4E9EF] animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E4E9EF] flex justify-between items-center bg-gradient-to-l from-[#EFF4FA] to-white">
          <div>
            <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
              الإشعارات
            </h3>
            {unreadCount > 0 && (
              <p className="text-xs text-slate-500 mt-0.5">{unreadCount} إشعار غير مقروء</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-[#006B5D] font-bold hover:underline"
              >
                قراءة الكل
              </button>
            )}
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0D1F3C] hover:bg-[#EFF4FA] transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">notifications_off</span>
              <p className="font-bold text-[#0D1F3C]">لا توجد إشعارات</p>
              <p className="text-sm text-slate-400 mt-1">ستظهر الإشعارات الجديدة هنا</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E4E9EF]">
              {notifications.map((n) => {
                const cfg = typeConfig[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`w-full text-right p-5 flex gap-4 transition-colors hover:bg-[#EFF4FA]/50 ${
                      !n.read ? "bg-[#006B5D]/[0.03]" : ""
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {cfg.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-[#0D1F3C] truncate">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E4E9EF]">
          <button className="w-full py-3 text-sm font-bold text-[#006B5D] hover:bg-[#EFF4FA] rounded-xl transition-all">
            عرض كل الإشعارات
          </button>
        </div>
      </div>
    </>
  );
}
