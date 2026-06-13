import { useState, useEffect } from "react";
import { Check, X, Eye, MapPin, Ban, RotateCcw, Star, Phone, Mail, Calendar, Wrench } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface LaundryProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  services: string;
  rating: number;
  joinDate: string;
  isActive: boolean;
  documents?: string;
}

export interface Provider {
  id: string;
  status: "approved" | "pending";
  profile: LaundryProfile;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const initialProviders: Provider[] = [
  {
    id: 1, status: "approved",
    profile: { name: "مغسلة النظافة المثالية", email: "info@cleanpro.sa", phone: "+966 50 111 2222", location: "الرياض، حي النرجس", services: "غسيل ملابس، كوي", rating: 4.8, joinDate: "2026-01-10", isActive: true }
  },
  {
    id: 2, status: "approved",
    profile: { name: "مغسلة الماسية", email: "contact@diamond.sa", phone: "+966 55 222 3333", location: "جدة، حي الزهراء", services: "تنظيف جاف، تنظيف سجاد", rating: 4.9, joinDate: "2026-02-15", isActive: true }
  },
  {
    id: 3, status: "approved",
    profile: { name: "مغسلة السريعة", email: "hello@quick.sa", phone: "+966 50 333 4444", location: "الدمام، حي الفيصلية", services: "غسيل ملابس", rating: 4.6, joinDate: "2026-03-01", isActive: false }
  },
  {
    id: 4, status: "approved",
    profile: { name: "مغسلة النخبة", email: "info@elite.sa", phone: "+966 55 444 5555", location: "مكة، حي العزيزية", services: "تنظيف جاف، كوي، تنظيف ستائر", rating: 4.9, joinDate: "2026-03-20", isActive: true }
  },
  {
    id: 5, status: "pending",
    profile: { name: "مغسلة اللمعان", email: "contact@sparkle.sa", phone: "+966 50 555 6666", location: "المدينة المنورة، حي السلام", services: "غسيل ملابس، كوي", rating: 0, joinDate: "2026-05-14", isActive: true, documents: "مكتمل" }
  },
  {
    id: 6, status: "pending",
    profile: { name: "مغسلة التنظيف الفاخر", email: "info@premium.sa", phone: "+966 55 666 7777", location: "الطائف، حي الشفا", services: "تنظيف جاف، تنظيف سجاد", rating: 0, joinDate: "2026-05-15", isActive: true, documents: "مكتمل" }
  },
  {
    id: 7, status: "pending",
    profile: { name: "مغسلة النظافة السريعة", email: "hello@fresh.sa", phone: "+966 50 777 8888", location: "أبها، حي الموظفين", services: "غسيل ملابس، عناية بالحقائب", rating: 0, joinDate: "2026-05-16", isActive: true, documents: "قيد الانتظار" }
  },
];

const ITEMS_PER_PAGE = 5;

// ─── Document Badge ────────────────────────────────────────────────────────────
function DocumentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "قيد الانتظار": "bg-[#F4C542] text-[#0D1F3C]",
    "مكتمل": "bg-[#00C9B1] text-white",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ─── Confirm Suspend Modal ─────────────────────────────────────────────────────
function ConfirmSuspendModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#0D1F3C]">تأكيد التعطيل</h3>
          <button onClick={onCancel} aria-label="إغلاق" className="p-1 hover:bg-[#F4F6F9] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#777779]" />
          </button>
        </div>
        <p className="text-[#777779] mb-6">هل أنت متأكد أنك تريد تعطيل هذه المغسلة؟</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 bg-[#FF4D4D] text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
            تعطيل
          </button>
          <button onClick={onCancel} className="flex-1 border border-[#F4F6F9] text-[#777779] py-2 rounded-lg hover:bg-[#F4F6F9] transition-colors font-medium">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Laundry Profile Modal ─────────────────────────────────────────────────────
interface LaundryProfileModalProps {
  data: Provider;
  onClose: () => void;
}

function LaundryProfileModal({ data, onClose }: LaundryProfileModalProps) {
  const { profile } = data;
  const avatarLetter = profile.name ? profile.name.trim().charAt(0) : "م";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Accent bar */}
        <div className="h-2 bg-gradient-to-r from-[#00C9B1] to-[#00A896]" />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 hover:bg-[#F4F6F9] rounded-full transition-colors group"
        >
          <X className="w-5 h-5 text-[#777779] group-hover:text-[#0D1F3C]" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 flex flex-col items-center border-b border-[#F4F6F9] text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00C9B1] to-[#00A896] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md mb-5">
            {avatarLetter}
          </div>
          <h2 className="text-xl font-bold text-[#0D1F3C] mb-1">{profile.name}</h2>
          <p className="text-sm text-[#777779] mb-4 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {profile.location}
          </p>
          <div className="flex gap-2 justify-center">
            {profile.isActive ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                نشطة (Active)
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                معطلة (Suspended)
              </span>
            )}
            {profile.rating > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-500" /> {profile.rating}
              </span>
            )}
            {profile.documents && <DocumentBadge status={profile.documents} />}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">البريد الإلكتروني</span>
                <span className="text-sm font-semibold text-[#0D1F3C] select-all">{profile.email}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">رقم الجوال</span>
                <span className="text-sm font-semibold text-[#0D1F3C] select-all" dir="ltr">{profile.phone}</span>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">الموقع</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{profile.location}</span>
              </div>
            </div>

            {/* Services */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Wrench className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">الخدمات المقدمة</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{profile.services}</span>
              </div>
            </div>

            {/* Join Date */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">تاريخ الانضمام</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{profile.joinDate}</span>
              </div>
            </div>

            {/* Rating */}
            {profile.rating > 0 && (
              <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
                <Star className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-[#777779] mb-1">التقييم</span>
                  <span className="text-sm font-semibold text-[#0D1F3C] flex items-center gap-1">
                    <span className="text-[#F4C542]">★</span> {profile.rating} / 5
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#F4F6F9] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0D1F3C] hover:bg-[#162F56] text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
          >
            إغلاق (Close)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function ProvidersManagement() {
  const [activeTab, setActiveTab] = useState<"approved" | "pending">("approved");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [suspendTarget, setSuspendTarget] = useState<string | null>(null);
  const [selectedProviderForView, setSelectedProviderForView] = useState<Provider | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchProviders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [approvedRes, pendingRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/laundries?status=all&limit=1000`),
        fetch(`${API_BASE_URL}/api/admin/laundries/pending?limit=1000`)
      ]);

      if (!approvedRes.ok || !pendingRes.ok) {
        throw new Error("Failed to fetch providers");
      }

      const approvedJson = await approvedRes.json();
      const pendingJson = await pendingRes.json();

      let approvedMapped: Provider[] = [];
      let pendingMapped: Provider[] = [];

      if (approvedJson.status === "success" && approvedJson.data?.laundries) {
        approvedMapped = approvedJson.data.laundries.map((l: any) => ({
          id: String(l.id),
          status: "approved" as const,
          profile: {
            name: l.name || "",
            email: l.owner?.email || "",
            phone: l.phone || "",
            location: l.address || "",
            services: Array.isArray(l.services) ? l.services.join("، ") : "",
            rating: l.avgRating || 0,
            joinDate: l.joinedAt ? l.joinedAt.split("T")[0] : "",
            isActive: !l.isSuspended,
          }
        }));
      }

      if (pendingJson.status === "success" && pendingJson.data?.laundries) {
        pendingMapped = pendingJson.data.laundries.map((l: any) => ({
          id: String(l.id),
          status: "pending" as const,
          profile: {
            name: l.name || "",
            email: l.owner?.email || "",
            phone: l.phone || "",
            location: l.address || "",
            services: Array.isArray(l.services) ? l.services.map((s: any) => s.name || s).join("، ") : "",
            rating: 0,
            joinDate: l.appliedAt ? l.appliedAt.split("T")[0] : "",
            isActive: true,
            documents: "مكتمل",
          }
        }));
      }

      setProviders([...approvedMapped, ...pendingMapped]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const approvedProviders = providers.filter((p) => p.status === "approved");
  const pendingProviders = providers.filter((p) => p.status === "pending");

  const totalPages = Math.max(1, Math.ceil(approvedProviders.length / ITEMS_PER_PAGE));
  const paginatedRows = approvedProviders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleTabChange(tab: "approved" | "pending") {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  async function handleSuspend(id: string) {
    const previousProviders = [...providers];
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, profile: { ...p.profile, isActive: false } } : p
      )
    );
    setSuspendTarget(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/laundries/${id}/suspend`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "موقوفة بواسطة الأدمن" })
      });
      if (!res.ok) throw new Error("Failed to suspend provider");
    } catch (err: any) {
      console.error(err);
      setProviders(previousProviders);
      alert("حدث خطأ أثناء تعطيل المغسلة، يرجى المحاولة مرة أخرى.");
    }
  }

  async function handleRestore(id: string) {
    const previousProviders = [...providers];
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, profile: { ...p.profile, isActive: true } } : p
      )
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/laundries/${id}/restore`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to restore provider");
    } catch (err: any) {
      console.error(err);
      setProviders(previousProviders);
      alert("حدث خطأ أثناء استعادة المغسلة، يرجى المحاولة مرة أخرى.");
    }
  }

  async function handleApprove(id: string) {
    const previousProviders = [...providers];
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "approved" as const } : p
      )
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/laundries/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to approve provider");
      fetchProviders();
    } catch (err: any) {
      console.error(err);
      setProviders(previousProviders);
      alert("حدث خطأ أثناء قبول المغسلة، يرجى المحاولة مرة أخرى.");
    }
  }

  async function handleReject(id: string) {
    if (!confirm("هل أنت متأكد من رفض وحذف هذه المغسلة؟")) return;
    const previousProviders = [...providers];
    setProviders((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/laundries/${id}/reject`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to reject provider");
    } catch (err: any) {
      console.error(err);
      setProviders(previousProviders);
      alert("حدث خطأ أثناء رفض المغسلة، يرجى المحاولة مرة أخرى.");
    }
  }

  return (
    <div className="space-y-6" dir="rtl">

      {/* Confirm Suspend Modal */}
      {suspendTarget !== null && (
        <ConfirmSuspendModal
          onConfirm={() => handleSuspend(suspendTarget)}
          onCancel={() => setSuspendTarget(null)}
        />
      )}

      {/* Laundry Profile Modal */}
      {selectedProviderForView && (
        <LaundryProfileModal
          data={selectedProviderForView}
          onClose={() => setSelectedProviderForView(null)}
        />
      )}

      <h1 className="text-3xl text-[#0D1F3C]">إدارة المغاسل</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#F4F6F9]">
        <button
          onClick={() => handleTabChange("approved")}
          className={`pb-3 px-1 font-medium transition-colors ${activeTab === "approved"
              ? "text-[#00C9B1] border-b-2 border-[#00C9B1]"
              : "text-[#777779] hover:text-[#0D1F3C]"
            }`}
        >
          المغاسل المعتمدة
        </button>
        <button
          onClick={() => handleTabChange("pending")}
          className={`pb-3 px-1 font-medium transition-colors flex items-center gap-2 ${activeTab === "pending"
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

      {/* ── Approved Providers Table ── */}
      {activeTab === "approved" && (
        <>
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
                  {paginatedRows.map((provider, index) => (
                    <tr
                      key={provider.id}
                      className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${!provider.profile.isActive
                          ? "bg-gray-50/80 opacity-60 text-gray-400"
                          : index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                        }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#0D1F3C]">{provider.profile.name}</div>
                        <div className="text-xs text-[#777779]">انضم في {provider.profile.joinDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-[#777779] text-sm">{provider.profile.email}</div>
                        <div className="text-[#777779] text-sm">{provider.profile.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-[#777779]">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{provider.profile.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#777779] text-sm max-w-xs">{provider.profile.services}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-[#F4C542]">★</span>
                          <span className="text-[#0D1F3C] font-medium">{provider.profile.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {/* Eye → open details modal */}
                          <button
                            className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors"
                            title="عرض التفاصيل"
                            onClick={() => setSelectedProviderForView(provider)}
                          >
                            <Eye className="w-4 h-4 text-[#00C9B1]" />
                          </button>

                          {/* Ban / Restore */}
                          {provider.profile.isActive ? (
                            <button
                              className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                              title="تعطيل"
                              onClick={() => setSuspendTarget(provider.id)}
                            >
                              <Ban className="w-4 h-4 text-[#FF4D4D]" />
                            </button>
                          ) : (
                            <button
                              className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                              title="استعادة"
                              onClick={() => handleRestore(provider.id)}
                            >
                              <RotateCcw className="w-4 h-4 text-teal-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <p className="text-[#777779] text-sm">
              عرض {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, approvedProviders.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, approvedProviders.length)} من {approvedProviders.length} مغسلة
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${page === currentPage
                      ? "bg-[#00C9B1] text-white shadow-sm"
                      : "border border-[#F4F6F9] text-[#777779] hover:bg-[#F4F6F9]"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Pending Providers ── */}
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
                      <h3 className="text-lg text-[#0D1F3C] font-medium mb-1">{provider.profile.name}</h3>
                      <div className="flex items-center gap-1 text-[#777779] text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.profile.location}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-[#777779] mb-1">تاريخ التقديم</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.profile.joinDate}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
                    <div>
                      <div className="text-xs text-[#777779] mb-1">البريد الإلكتروني</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.profile.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">رقم الجوال</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.profile.phone}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">الخدمات المقدمة</div>
                      <div className="text-sm text-[#0D1F3C]">{provider.profile.services}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#777779] mb-1">حالة المستندات</div>
                      {provider.profile.documents && <DocumentBadge status={provider.profile.documents} />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#F4F6F9]">
                <button
                  onClick={() => handleApprove(provider.id)}
                  className="flex-1 bg-[#00C9B1] text-white px-6 py-3 rounded-lg hover:bg-[#00b39d] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  قبول المغسلة
                </button>
                <button
                  onClick={() => handleReject(provider.id)}
                  className="flex-1 border-2 border-[#FF4D4D] text-[#FF4D4D] px-6 py-3 rounded-lg hover:bg-[#FF4D4D] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
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
