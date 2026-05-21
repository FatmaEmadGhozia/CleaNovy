import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Store,
  ClipboardList,
  Star,
  Droplet
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { path: "/users", label: "إدارة المستخدمين", icon: Users },
  { path: "/providers", label: "إدارة المغاسل", icon: Store },
  { path: "/orders", label: "إدارة الطلبات", icon: ClipboardList },
  { path: "/reviews", label: "التقييمات", icon: Star },
];

export function Layout() {
  return (
    <div className="flex h-screen bg-[#F4F6F9]" dir="rtl">
      {/* Main Content */}
      <div className="flex-1 mr-64 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl text-[#0D1F3C]">لوحة الإدارة</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#00C9B1] flex items-center justify-center text-white">
              م
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>

      {/* Sidebar - Right Side for RTL */}
      <aside className="w-64 bg-[#0D1F3C] flex flex-col fixed h-full right-0">
        {/* Logo */}
        <div className="p-6 border-b border-[#1a2f4d]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-[#00C9B1]">كلينوفي</span>
            <Droplet className="w-6 h-6 text-[#00C9B1]" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[rgba(0,201,177,0.15)] text-white border-r-4 border-[#00C9B1] mr-0 pr-3"
                      : "text-[#777779] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#00C9B1]" : ""}`} />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
