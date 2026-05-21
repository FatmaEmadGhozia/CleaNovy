import { useState } from "react";
import { Eye, Search } from "lucide-react";

const providersList = [
  "مغسلة النظافة المثالية",
  "مغسلة الماسية",
  "مغسلة السريعة",
  "مغسلة النخبة",
  "مغسلة التنظيف الفاخر",
];

const ordersData = [
  { id: "ORD-1234", customer: "سارة أحمد", provider: "مغسلة النظافة المثالية", services: "غسيل ملابس، كوي", price: "45.00 ر.س", date: "2026-05-15", status: "مكتمل" },
  { id: "ORD-1235", customer: "محمد علي", provider: "مغسلة الماسية", services: "تنظيف جاف", price: "32.50 ر.س", date: "2026-05-16", status: "قيد التنفيذ" },
  { id: "ORD-1236", customer: "فاطمة خالد", provider: "مغسلة السريعة", services: "غسيل ملابس", price: "58.00 ر.س", date: "2026-05-16", status: "قيد الانتظار" },
  { id: "ORD-1237", customer: "عبدالله محمود", provider: "مغسلة النخبة", services: "تنظيف سجاد", price: "72.00 ر.س", date: "2026-05-17", status: "مكتمل" },
  { id: "ORD-1238", customer: "نورة سعد", provider: "مغسلة النظافة المثالية", services: "تنظيف ستائر", price: "95.00 ر.س", date: "2026-05-17", status: "قيد التنفيذ" },
  { id: "ORD-1239", customer: "خالد عبدالعزيز", provider: "مغسلة التنظيف الفاخر", services: "عناية بالحقائب", price: "28.00 ر.س", date: "2026-05-17", status: "قيد الانتظار" },
  { id: "ORD-1240", customer: "مريم حسن", provider: "مغسلة النخبة", services: "كوي", price: "22.00 ر.س", date: "2026-05-17", status: "ملغي" },
  { id: "ORD-1241", customer: "يوسف إبراهيم", provider: "مغسلة السريعة", services: "غسيل ملابس، كوي", price: "48.50 ر.س", date: "2026-05-17", status: "مكتمل" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "قيد الانتظار": "bg-[#F4C542] text-[#0D1F3C]",
    "قيد التنفيذ": "bg-[#0D1F3C] text-white",
    "مكتمل": "bg-[#00C9B1]/80 text-white",
    "ملغي": "bg-[#FF4D4D] text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export function OrdersManagement() {
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState("");

  const filteredOrders = ordersData.filter((order) => {
    const matchesStatus = activeStatus === "all" || order.status === activeStatus;
    const matchesProvider = selectedProvider === "" || order.provider === selectedProvider;
    return matchesStatus && matchesProvider;
  });

  const statusCounts = {
    all: ordersData.length,
    "قيد الانتظار": ordersData.filter(o => o.status === "قيد الانتظار").length,
    "قيد التنفيذ": ordersData.filter(o => o.status === "قيد التنفيذ").length,
    "مكتمل": ordersData.filter(o => o.status === "مكتمل").length,
    "ملغي": ordersData.filter(o => o.status === "ملغي").length,
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl text-[#0D1F3C]">إدارة الطلبات</h1>

      {/* Status Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveStatus("all")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeStatus === "all"
              ? "bg-[#0D1F3C] text-white"
              : "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#00C9B1]"
          }`}
        >
          جميع الطلبات ({statusCounts.all})
        </button>
        <button
          onClick={() => setActiveStatus("قيد الانتظار")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeStatus === "قيد الانتظار"
              ? "bg-[#F4C542] text-[#0D1F3C]"
              : "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#F4C542]"
          }`}
        >
          قيد الانتظار ({statusCounts["قيد الانتظار"]})
        </button>
        <button
          onClick={() => setActiveStatus("قيد التنفيذ")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeStatus === "قيد التنفيذ"
              ? "bg-[#0D1F3C] text-white"
              : "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#0D1F3C]"
          }`}
        >
          قيد التنفيذ ({statusCounts["قيد التنفيذ"]})
        </button>
        <button
          onClick={() => setActiveStatus("مكتمل")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeStatus === "مكتمل"
              ? "bg-[#00C9B1] text-white"
              : "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#00C9B1]"
          }`}
        >
          مكتمل ({statusCounts["مكتمل"]})
        </button>
        <button
          onClick={() => setActiveStatus("ملغي")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeStatus === "ملغي"
              ? "bg-[#FF4D4D] text-white"
              : "bg-white text-[#777779] border border-[#F4F6F9] hover:border-[#FF4D4D]"
          }`}
        >
          ملغي ({statusCounts["ملغي"]})
        </button>
      </div>

      {/* Laundry Filter */}
      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-[#777779]" />
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="px-4 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white text-[#777779]"
        >
          <option value="">تصفية حسب اسم المغسلة</option>
          {providersList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {selectedProvider && (
          <button
            onClick={() => setSelectedProvider("")}
            className="text-sm text-[#777779] hover:text-[#FF4D4D] transition-colors"
          >
            مسح التصفية
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F4F6F9] bg-[#F4F6F9]">
                <th className="text-right text-[#777779] text-sm py-4 px-6">رقم الطلب</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">العميل</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">المغسلة</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الخدمات</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">المبلغ الإجمالي</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">التاريخ</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الحالة</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                  }`}
                >
                  <td className="py-4 px-6 text-[#0D1F3C] font-medium">{order.id}</td>
                  <td className="py-4 px-6 text-[#777779]">{order.customer}</td>
                  <td className="py-4 px-6 text-[#777779]">{order.provider}</td>
                  <td className="py-4 px-6 text-[#777779] max-w-xs">{order.services}</td>
                  <td className="py-4 px-6 text-[#0D1F3C] font-medium">{order.price}</td>
                  <td className="py-4 px-6 text-[#777779]">{order.date}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors" title="عرض التفاصيل">
                      <Eye className="w-4 h-4 text-[#00C9B1]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
