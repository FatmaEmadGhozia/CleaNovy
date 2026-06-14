import { useState, useEffect } from "react";
import { Search, Eye, Ban, X, User as UserIcon, Mail, Phone, Calendar, CreditCard, RotateCcw } from "lucide-react";

export interface UserProfile {
  name: string;
  username: string | null;
  email: string;
  phone: string;
  nationalId: string | null;
  image: string | null;
  isActive: boolean;
  isBanned: boolean;
  joinedAt: string;
}

export interface User {
  id: string;
  profile: UserProfile;
}

// const usersData: User[] = [
//   {
//     id: "1",
//     profile: {
//       name: "سارة أحمد الشمري",
//       username: "sarah_sh",
//       email: "sarah.a@email.sa",
//       phone: "+966 50 123 4567",
//       nationalId: "1092837465",
//       image: null,
//       isActive: true,
//       isBanned: false,
//       joinedAt: "2026-01-15T08:30:00Z"
//     }
//   },
//   {
//     id: "2",
//     profile: {
//       name: "محمد علي السعيد",
//       username: null,
//       email: "mohammed.ali@email.sa",
//       phone: "+966 55 234 5678",
//       nationalId: null,
//       image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
//       isActive: true,
//       isBanned: false,
//       joinedAt: "2026-02-20T14:15:00Z"
//     }
//   },
//   {
//     id: "3",
//     profile: {
//       name: "فاطمة خالد المطيري",
//       username: "fatima_k",
//       email: "fatima.k@email.sa",
//       phone: "+966 50 345 6789",
//       nationalId: "1082736452",
//       image: null,
//       isActive: false,
//       isBanned: false,
//       joinedAt: "2026-03-10T11:00:00Z"
//     }
//   },
//   {
//     id: "4",
//     profile: {
//       name: "عبدالله محمود العتيبي",
//       username: "abdullah_m",
//       email: "abdullah.m@email.sa",
//       phone: "+966 55 456 7890",
//       nationalId: "1072635481",
//       image: null,
//       isActive: true,
//       isBanned: true,
//       joinedAt: "2026-03-25T09:45:00Z"
//     }
//   },
//   {
//     id: "5",
//     profile: {
//       name: "نورة سعد القحطاني",
//       username: null,
//       email: "noura.s@email.sa",
//       phone: "+966 50 567 8901",
//       nationalId: null,
//       image: null,
//       isActive: true,
//       isBanned: false,
//       joinedAt: "2026-04-05T16:20:00Z"
//     }
//   },
//   {
//     id: "6",
//     profile: {
//       name: "خالد عبدالعزيز الدوسري",
//       username: "khaled_d",
//       email: "khaled.a@email.sa",
//       phone: "+966 55 678 9012",
//       nationalId: "1062534897",
//       image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
//       isActive: true,
//       isBanned: false,
//       joinedAt: "2026-04-18T12:00:00Z"
//     }
//   },
//   {
//     id: "7",
//     profile: {
//       name: "مريم حسن الغامدي",
//       username: "maryam_g",
//       email: "maryam.h@email.sa",
//       phone: "+966 50 789 0123",
//       nationalId: null,
//       image: null,
//       isActive: false,
//       isBanned: true,
//       joinedAt: "2026-05-01T15:10:00Z"
//     }
//   },
//   {
//     id: "8",
//     profile: {
//       name: "يوسف إبراهيم العمري",
//       username: "yousef_o",
//       email: "yousef.i@email.sa",
//       phone: "+966 55 890 1234",
//       nationalId: "1052435768",
//       image: null,
//       isActive: true,
//       isBanned: false,
//       joinedAt: "2026-05-12T10:05:00Z"
//     }
//   }
// ];

function ConfirmSuspendModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#0D1F3C]">تأكيد التعطيل</h3>
          <button onClick={onCancel} aria-label="إغلاق النافذة" className="p-1 hover:bg-[#F4F6F9] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#777779]" />
          </button>
        </div>
        <p className="text-[#777779] mb-6">هل أنت متأكد أنك تريد تعطيل هذا المستخدم؟</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#FF4D4D] text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            تعطيل
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

interface UserProfileModalProps {
  data: User;
  onClose: () => void;
}

function UserProfileModal({ data, onClose }: UserProfileModalProps) {
  const { profile } = data;
  const formattedDate = profile.joinedAt ? profile.joinedAt.split("T")[0] : "—";
  const avatarLetter = profile.name ? profile.name.trim().charAt(0) : "U";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all duration-300 scale-100 relative"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#00C9B1] to-[#00A896]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 hover:bg-[#F4F6F9] rounded-full transition-colors group"
        >
          <X className="w-5 h-5 text-[#777779] group-hover:text-[#0D1F3C]" />
        </button>

        {/* Modal Header & Avatar */}
        <div className="p-6 pb-4 flex flex-col items-center border-b border-[#F4F6F9] text-center">
          <div className="relative mb-5">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00C9B1] to-[#00A896] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
                {avatarLetter}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-[#0D1F3C] mb-1">{profile.name}</h2>
          <p className="text-sm text-[#777779] mb-4">
            {profile.username ? `@${profile.username}` : "سجل عبر OAuth (No Username)"}
          </p>

          {/* Badges */}
          <div className="flex gap-2 justify-center">
            {profile.isActive ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 shadow-xs">
                نشط (Active)
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 shadow-xs">
                معطل (Suspended)
              </span>
            )}
            {profile.isBanned && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 shadow-xs">
                محظور (Banned)
              </span>
            )}
          </div>
        </div>

        {/* Modal Body / Profile Fields */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <UserIcon className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">الاسم الكامل (Full Name)</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{profile.name}</span>
              </div>
            </div>

            {/* Username */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <UserIcon className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">اسم المستخدم (Username)</span>
                <span className={`text-sm font-semibold ${profile.username ? 'text-[#0D1F3C]' : 'text-gray-400 italic'}`}>
                  {profile.username || "غير متوفر (OAuth User)"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">البريد الإلكتروني (Email Address)</span>
                <span className="text-sm font-semibold text-[#0D1F3C] select-all">{profile.email}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">رقم الجوال (Phone Number)</span>
                <span className="text-sm font-semibold text-[#0D1F3C] select-all" dir="ltr">{profile.phone}</span>
              </div>
            </div>

            {/* National ID */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">الهوية الوطنية (National ID)</span>
                <span className={`text-sm font-semibold ${profile.nationalId ? 'text-[#0D1F3C]' : 'text-gray-400 italic'}`}>
                  {profile.nationalId || "غير متوفر (N/A)"}
                </span>
              </div>
            </div>

            {/* Joined Date */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#F4F6F9] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#00C9B1] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-medium text-[#777779] mb-1">تاريخ الانضمام (Joined Date)</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
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

const ITEMS_PER_PAGE = 8;

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [suspendTarget, setSuspendTarget] = useState<string | null>(null);
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/admin/users?status=all&limit=1000`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const result = await res.json();
      if (result.status === "success" && result.data?.users) {
        const mapped = result.data.users.map((u: any) => ({
          id: String(u.id),
          profile: {
            name: u.name || "مستخدم جديد",
            username: u.username || null,
            email: u.email || "",
            phone: u.phone || "",
            nationalId: u.nationalId || null,
            image: u.image || null,
            isActive: u.isActive !== undefined ? u.isActive : true,
            isBanned: u.isBanned !== undefined ? u.isBanned : false,
            joinedAt: u.joinedAt || new Date().toISOString(),
          }
        }));
        setUsers(mapped);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.profile.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  async function handleSuspend(id: string) {
    const previousUsers = [...users];
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, profile: { ...u.profile, isActive: false } } : u
      )
    );
    setSuspendTarget(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to suspend user");
    } catch (err: any) {
      console.error(err);
      setUsers(previousUsers);
      alert("حدث خطأ أثناء تعطيل المستخدم، يرجى المحاولة مرة أخرى.");
    }
  }

  async function handleRestore(id: string) {
    const previousUsers = [...users];
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, profile: { ...u.profile, isActive: true } } : u
      )
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/restore`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to restore user");
    } catch (err: any) {
      console.error(err);
      setUsers(previousUsers);
      alert("حدث خطأ أثناء استعادة المستخدم، يرجى المحاولة مرة أخرى.");
    }
  }

  return (
    <div className="space-y-6" dir="rtl">
      {suspendTarget !== null && (
        <ConfirmSuspendModal
          onConfirm={() => handleSuspend(suspendTarget)}
          onCancel={() => setSuspendTarget(null)}
        />
      )}

      {selectedUserForView && (
        <UserProfileModal
          data={selectedUserForView}
          onClose={() => setSelectedUserForView(null)}
        />
      )}

      <h1 className="text-3xl text-[#0D1F3C]">إدارة المستخدمين</h1>

      {/* Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#777779] w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن مستخدم بالاسم أو البريد الإلكتروني..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F4F6F9] bg-[#F4F6F9]">
                <th className="text-right text-[#777779] text-sm py-4 px-6">الصورة</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الاسم</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">البريد الإلكتروني</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">رقم الجوال</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">تاريخ الانضمام</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#777779]">
                    جاري تحميل المستخدمين...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#FF4D4D] font-medium">
                    {error}
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#777779]">
                    لا يوجد مستخدمين.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => {
                  const formattedDate = user.profile.joinedAt ? user.profile.joinedAt.split("T")[0] : "—";
                  const avatarLetter = user.profile.name ? user.profile.name.trim().charAt(0) : "U";

                  return (
                    <tr
                      key={user.id}
                      className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${
                        !user.profile.isActive
                          ? "bg-gray-50/80 opacity-60 text-gray-400"
                          : index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                      }`}
                    >
                      <td className="py-4 px-6">
                        {user.profile.image ? (
                          <img
                            src={user.profile.image}
                            alt={user.profile.name}
                            className={`w-10 h-10 rounded-full object-cover border border-[#F4F6F9] ${
                              !user.profile.isActive ? "grayscale opacity-85" : ""
                            }`}
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full bg-[#00C9B1] flex items-center justify-center text-white font-medium ${
                            !user.profile.isActive ? "opacity-75" : ""
                          }`}>
                            {avatarLetter}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-[#0D1F3C] font-medium">{user.profile.name}</td>
                      <td className="py-4 px-6 text-[#777779]">{user.profile.email}</td>
                      <td className="py-4 px-6 text-[#777779]">{user.profile.phone}</td>
                      <td className="py-4 px-6 text-[#777779]">{formattedDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors"
                            title="عرض"
                            onClick={() => setSelectedUserForView(user)}
                          >
                            <Eye className="w-4 h-4 text-[#00C9B1]" />
                          </button>
                          {user.profile.isActive ? (
                            <button
                              className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                              title="تعطيل"
                              onClick={() => setSuspendTarget(user.id)}
                            >
                              <Ban className="w-4 h-4 text-[#FF4D4D]" />
                            </button>
                          ) : (
                            <button
                              className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                              title="استعادة"
                              onClick={() => handleRestore(user.id)}
                            >
                              <RotateCcw className="w-4 h-4 text-teal-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-[#777779] text-sm">
          عرض {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredUsers.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} من {filteredUsers.length} مستخدم
        </p>
        <div className="flex gap-2 items-center">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            السابق
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? "bg-[#00C9B1] text-white shadow-sm"
                  : "border border-[#F4F6F9] text-[#777779] hover:bg-[#F4F6F9]"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
