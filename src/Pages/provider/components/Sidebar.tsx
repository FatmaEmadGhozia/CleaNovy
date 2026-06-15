
// import type { Page } from "../types";

// interface Props {
//   page: Page;
//   setPage: (p: Page) => void;
// }

// const navItems: { id: Page; label: string; icon: string }[] = [
//   { id: "dashboard", label: "لوحة القيادة", icon: "dashboard" },
//   { id: "orders", label: "الطلبات", icon: "local_laundry_service" },
//   { id: "services", label: "الخدمات", icon: "list_alt" },
//   { id: "discounts", label: "الخصومات", icon: "payments" },
//   { id: "reviews", label: "التقييمات", icon: "star" },
// ];

// export default function Sidebar({ page, setPage }: Props) {
//   return (
//     <aside className="fixed top-0 right-0 h-screen w-64 bg-[#0D1F3C] flex flex-col z-50 shadow-[0px_10px_40px_rgba(13,31,60,0.25)]">
//       {/* Logo */}
//       <div className="p-6 flex flex-col items-center gap-2">
//         <div className="w-16 h-16 rounded-2xl bg-[#006B5D]/20 flex items-center justify-center mb-2">
//           <span
//             className="material-symbols-outlined text-[#00C9B1] text-4xl"
//             style={{ fontVariationSettings: "'FILL' 1" }}
//           >
//             local_laundry_service
//           </span>
//         </div>
//         <h1
//           className="text-2xl font-bold text-white tracking-tight"
//           style={{ fontFamily: "Cairo, sans-serif" }}
//         >
//           نظيف
//         </h1>
//         <span className="text-slate-400 text-xs">لوحة التحكم</span>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 px-2 space-y-1">
//         {navItems.map((item) => {
//           const isActive = page === item.id;
//           return (
//             <button
//               key={item.id}
//               onClick={() => setPage(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-right ${
//                 isActive
//                   ? "bg-[#006B5D]/10 text-[#00C9B1] rounded-l-full mr-4"
//                   : "text-slate-400 hover:text-white hover:bg-white/5"
//               }`}
//             >
//               <span
//                 className="material-symbols-outlined"
//                 style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
//               >
//                 {item.icon}
//               </span>
//               <span className="font-medium text-sm">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       {/* Bottom */}
//       <div className="p-6">
//         <button
//           onClick={() => setPage("profile")}
//           className={`w-full py-3 px-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
//             page === "profile"
//               ? "bg-[#00C9B1] text-[#0D1F3C]"
//               : "bg-white/10 text-white hover:bg-[#00C9B1] hover:text-[#0D1F3C]"
//           }`}
//         >
//           <span className="material-symbols-outlined">person</span>
//           <span className="text-sm">الملف الشخصي</span>
//         </button>
//         <div className="mt-6 pt-6 border-t border-white/10">
//           <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors w-full">
//             <span className="material-symbols-outlined">logout</span>
//             <span className="font-medium text-sm">تسجيل الخروج</span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }




import { useState } from "react";
import type { Page } from "../types";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  page: Page;
  setPage: (p: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "لوحة القيادة", icon: "dashboard" },
  { id: "orders", label: "الطلبات", icon: "local_laundry_service" },
  { id: "services", label: "الخدمات", icon: "list_alt" },
  { id: "discounts", label: "الخصومات", icon: "payments" },
  { id: "reviews", label: "التقييمات", icon: "star" },
];

export default function Sidebar({ page, setPage }: Props) {
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      <aside className="fixed top-0 right-0 h-screen w-64 bg-[#0D1F3C] flex flex-col z-50 shadow-[0px_10px_40px_rgba(13,31,60,0.25)]">
        {/* Logo */}
        <div className="p-6 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-[#006B5D]/20 flex items-center justify-center mb-2">
            <span
              className="material-symbols-outlined text-[#00C9B1] text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_laundry_service
            </span>
          </div>
          <h1
            className="text-2xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            نظيف
          </h1>
          <span className="text-slate-400 text-xs">لوحة التحكم</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-right ${
                  isActive
                    ? "bg-[#006B5D]/10 text-[#00C9B1] rounded-l-full mr-4"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-6">
          <button
            onClick={() => setPage("profile")}
            className={`w-full py-3 px-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
              page === "profile"
                ? "bg-[#00C9B1] text-[#0D1F3C]"
                : "bg-white/10 text-white hover:bg-[#00C9B1] hover:text-[#0D1F3C]"
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm">الملف الشخصي</span>
          </button>
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors w-full"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium text-sm">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <>
          <div
            className="fixed inset-0 z-[150] bg-[#0D1F3C]/40 backdrop-blur-sm"
            onClick={() => !loggingOut && setShowLogoutConfirm(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[160] w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                logout
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: "Cairo, sans-serif" }}>
              تسجيل الخروج
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-[#0D1F3C] bg-[#EFF4FA] hover:bg-[#E4E9EF] transition-all disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loggingOut ? (
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                ) : (
                  "تسجيل الخروج"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}