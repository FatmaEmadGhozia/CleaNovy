import { useState } from "react";
import { Check, X, Eye, MapPin, Trash2 } from "lucide-react";

const approvedProviders = [
  { id: 1, name: "مغسلة النظافة المثالية", email: "info@cleanpro.sa", phone: "+966 50 111 2222", location: "الرياض، حي النرجس", services: "غسيل ملابس، كوي", rating: 4.8, joinDate: "2026-01-10" },
  { id: 2, name: "مغسلة الماسية", email: "contact@diamond.sa", phone: "+966 55 222 3333", location: "جدة، حي الزهراء", services: "تنظيف جاف، تنظيف سجاد", rating: 4.9, joinDate: "2026-02-15" },
  { id: 3, name: "مغسلة السريعة", email: "hello@quick.sa", phone: "+966 50 333 4444", location: "الدمام، حي الفيصلية", services: "غسيل ملابس", rating: 4.6, joinDate: "2026-03-01" },
  { id: 4, name: "مغسلة النخبة", email: "info@elite.sa", phone: "+966 55 444 5555", location: "مكة، حي العزيزية", services: "تنظيف جاف، كوي، تنظيف ستائر", rating: 4.9, joinDate: "2026-03-20" },
];

const pendingProviders = [
  { id: 5, name: "مغسلة اللمعان", email: "contact@sparkle.sa", phone: "+966 50 555 6666", location: "المدينة المنورة، حي السلام", services: "غسيل ملابس، كوي", submitDate: "2026-05-14", documents: "مكتمل" },
  { id: 6, name: "مغسلة التنظيف الفاخر", email: "info@premium.sa", phone: "+966 55 666 7777", location: "الطائف، حي الشفا", services: "تنظيف جاف، تنظيف سجاد", submitDate: "2026-05-15", documents: "مكتمل" },
  { id: 7, name: "مغسلة النظافة السريعة", email: "hello@fresh.sa", phone: "+966 50 777 8888", location: "أبها، حي الموظفين", services: "غسيل ملابس، عناية بالحقائب", submitDate: "2026-05-16", documents: "قيد الانتظار" },
];

function DocumentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "قيد الانتظار": "bg-[#F4C542] text-[#0D1F3C]",
    "مكتمل": "bg-[#00C9B1] text-white",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
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
        <p className="text-[#777779] mb-6">هل أنت متأكد أنك تريد حذف هذا العنصر؟</p>
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

export function ProvidersManagement() {
  const [activeTab, setActiveTab] = useState<"approved" | "pending">("approved");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [providers, setProviders] = useState(approvedProviders);

  function handleDelete(id: number) {
    setProviders((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6" dir="rtl">
      {deleteTarget !== null && (
        <ConfirmDeleteModal
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <h1 className="text-3xl text-[#0D1F3C]">إدارة المغاسل</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#F4F6F9]">
        <button
          onClick={() => setActiveTab("approved")}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === "approved"
              ? "text-[#00C9B1] border-b-2 border-[#00C9B1]"
              : "text-[#777779] hover:text-[#0D1F3C]"
          }`}
        >
          المغاسل المعتمدة
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 px-1 font-medium transition-colors flex items-center gap-2 ${
            activeTab === "pending"
              ? "text-[#00C9B1] border-b-2 border-[#00C9B1]"
              : "text-[#777779] hover:text-[#0D1F3C]"
          }`}
        >
          قيد الموافقة
          <span className="bg-[#F4C542] text-[#0D1F3C] text-xs px-2 py-1 rounded-full font-medium">
            {pendingProviders.length}
          </span>
        </button>
      </div>

      {/* Approved Providers Table */}
      {activeTab === "approved" && (
        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F4F6F9] bg-[#F4F6F9]">
                  <th className="text-right text-[#777779] text-sm py-4 px-6">اسم المغسلة</th>
                  <th className="text-right text-[#777779] text-sm py-4 px-6">معلومات التواصل</th>
                  <th className="text-right text-[#777779] text-sm py-4 px-6">الموقع</th>
                  <th className="text-right text-[#777779] text-sm py-4 px-6">الخدمات</th>
                  <th className="text-right text-[#777779] text-sm py-4 px-6">التقييم</th>
                  <th className="text-right text-[#777779] text-sm py-4 px-6">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider, index) => (
                  <tr
                    key={provider.id}
                    className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#0D1F3C]">{provider.name}</div>
                      <div className="text-xs text-[#777779]">انضم في {provider.joinDate}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[#777779] text-sm">{provider.email}</div>
                      <div className="text-[#777779] text-sm">{provider.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-[#777779]">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{provider.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#777779] text-sm max-w-xs">{provider.services}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <span className="text-[#F4C542]">★</span>
                        <span className="text-[#0D1F3C] font-medium">{provider.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors" title="عرض التفاصيل">
                          <Eye className="w-4 h-4 text-[#00C9B1]" />
                        </button>
                        <button
                          className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                          title="حذف"
                          onClick={() => setDeleteTarget(provider.id)}
                        >
                          <Trash2 className="w-4 h-4 text-[#FF4D4D]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pending Providers */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg text-[#0D1F3C] font-medium mb-1">{provider.name}</h3>
                      <div className="flex items-center gap-1 text-[#777779] text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-[#777779] mb-1">تاريخ التقديم</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.submitDate}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
                    <div>
                      <div className="text-xs text-[#777779] mb-1">البريد الإلكتروني</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">رقم الجوال</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.phone}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">الخدمات المقدمة</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.services}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">حالة المستندات</div>
                      <DocumentBadge status={provider.documents} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#F4F6F9]">
                <button className="flex-1 bg-[#00C9B1] text-white px-6 py-3 rounded-lg hover:bg-[#00b39d] transition-colors flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  قبول المغسلة
                </button>
                <button className="flex-1 border-2 border-[#FF4D4D] text-[#FF4D4D] px-6 py-3 rounded-lg hover:bg-[#FF4D4D] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <X className="w-5 h-5" />
                  رفض الطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
