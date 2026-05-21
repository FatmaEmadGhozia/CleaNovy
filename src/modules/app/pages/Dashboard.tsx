import { Users, Store, ShoppingBag, DollarSign, Check, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "إجمالي المستخدمين", value: "12,543", accent: "#00C9B1", icon: Users },
  { label: "إجمالي المغاسل", value: "487", accent: "#0D1F3C", icon: Store },
  { label: "إجمالي الطلبات", value: "8,234", accent: "#F4C542", icon: ShoppingBag },
  { label: "إجمالي الإيرادات", value: "127,450 ر.س", accent: "#00C9B1", icon: DollarSign },
];

const chartData = [
  { month: "يناير", revenue: 12000 },
  { month: "فبراير", revenue: 19000 },
  { month: "مارس", revenue: 15000 },
  { month: "أبريل", revenue: 25000 },
  { month: "مايو", revenue: 22000 },
  { month: "يونيو", revenue: 30000 },
];

const recentOrders = [
  { id: "#ORD-1234", customer: "سارة أحمد", provider: "مغسلة النظافة المثالية", amount: "45.00 ر.س", status: "مكتمل", date: "2026-05-15" },
  { id: "#ORD-1235", customer: "محمد علي", provider: "مغسلة الماسية", amount: "32.50 ر.س", status: "قيد التنفيذ", date: "2026-05-16" },
  { id: "#ORD-1236", customer: "فاطمة خالد", provider: "مغسلة السريعة", amount: "58.00 ر.س", status: "قيد الانتظار", date: "2026-05-16" },
  { id: "#ORD-1237", customer: "عبدالله محمود", provider: "مغسلة النخبة", amount: "72.00 ر.س", status: "مكتمل", date: "2026-05-17" },
];

const pendingProviders = [
  { name: "مغسلة اللمعان", email: "info@sparkle.sa", date: "2026-05-14", services: "غسيل ملابس، كوي" },
  { name: "مغسلة التنظيف الفاخر", email: "contact@premium.sa", date: "2026-05-15", services: "تنظيف جاف، تنظيف سجاد" },
  { name: "مغسلة النظافة السريعة", email: "hello@fresh.sa", date: "2026-05-16", services: "غسيل ملابس، تنظيف ستائر" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "قيد الانتظار": "bg-[#F4C542] text-[#0D1F3C]",
    "نشط": "bg-[#00C9B1] text-white",
    "قيد التنفيذ": "bg-[#0D1F3C] text-white",
    "مكتمل": "bg-[#00C9B1]/80 text-white",
    "ملغي": "bg-[#FF4D4D] text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-200"}`}>
      {status}
    </span>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl text-[#0D1F3C]">لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] border-r-4"
              style={{ borderRightColor: stat.accent }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#777779] text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl text-[#0D1F3C]">{stat.value}</p>
                </div>
                <Icon className="w-10 h-10" style={{ color: stat.accent }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <h2 className="text-xl text-[#0D1F3C] mb-4">نظرة عامة على الإيرادات</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F6F9" />
            <XAxis dataKey="month" stroke="#777779" />
            <YAxis stroke="#777779" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#00C9B1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
          <h2 className="text-xl text-[#0D1F3C] mb-4">الطلبات الأخيرة</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F4F6F9]">
                  <th className="text-right text-[#777779] text-sm py-3 px-2">رقم الطلب</th>
                  <th className="text-right text-[#777779] text-sm py-3 px-2">العميل</th>
                  <th className="text-right text-[#777779] text-sm py-3 px-2">المبلغ</th>
                  <th className="text-right text-[#777779] text-sm py-3 px-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]"}
                  >
                    <td className="py-3 px-2 text-[#777779] text-sm">{order.id}</td>
                    <td className="py-3 px-2 text-[#777779] text-sm">{order.customer}</td>
                    <td className="py-3 px-2 text-[#777779] text-sm">{order.amount}</td>
                    <td className="py-3 px-2">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Provider Requests */}
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
          <h2 className="text-xl text-[#0D1F3C] mb-4">طلبات المغاسل قيد الانتظار</h2>
          <div className="space-y-4">
            {pendingProviders.map((provider, index) => (
              <div
                key={index}
                className="border border-[#F4F6F9] rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[#0D1F3C] font-medium">{provider.name}</h3>
                    <p className="text-[#777779] text-sm">{provider.email}</p>
                  </div>
                  <span className="text-xs text-[#777779]">{provider.date}</span>
                </div>
                <p className="text-sm text-[#777779] mb-3">{provider.services}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#00C9B1] text-white px-4 py-2 rounded-lg hover:bg-[#00b39d] transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    قبول
                  </button>
                  <button className="flex-1 border-2 border-[#FF4D4D] text-[#FF4D4D] px-4 py-2 rounded-lg hover:bg-[#FF4D4D] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <X className="w-4 h-4" />
                    رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
