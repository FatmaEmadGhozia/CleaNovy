import { useState } from "react";
import { Search, Eye, Trash2, X } from "lucide-react";

const laundries = ["مغسلة النظافة المثالية", "مغسلة الماسية", "مغسلة السريعة", "مغسلة النخبة", "مغسلة اللمعان", "مغسلة التنظيف الفاخر"];

const usersData = [
  { id: 1, name: "سارة أحمد الشمري", email: "sarah.a@email.sa", phone: "+966 50 123 4567", joinDate: "2026-01-15", laundry: "مغسلة النظافة المثالية", avatar: "س" },
  { id: 2, name: "محمد علي السعيد", email: "mohammed.ali@email.sa", phone: "+966 55 234 5678", joinDate: "2026-02-20", laundry: "مغسلة الماسية", avatar: "م" },
  { id: 3, name: "فاطمة خالد المطيري", email: "fatima.k@email.sa", phone: "+966 50 345 6789", joinDate: "2026-03-10", laundry: "مغسلة السريعة", avatar: "ف" },
  { id: 4, name: "عبدالله محمود العتيبي", email: "abdullah.m@email.sa", phone: "+966 55 456 7890", joinDate: "2026-03-25", laundry: "مغسلة النخبة", avatar: "ع" },
  { id: 5, name: "نورة سعد القحطاني", email: "noura.s@email.sa", phone: "+966 50 567 8901", joinDate: "2026-04-05", laundry: "مغسلة النظافة المثالية", avatar: "ن" },
  { id: 6, name: "خالد عبدالعزيز الدوسري", email: "khaled.a@email.sa", phone: "+966 55 678 9012", joinDate: "2026-04-18", laundry: "مغسلة اللمعان", avatar: "خ" },
  { id: 7, name: "مريم حسن الغامدي", email: "maryam.h@email.sa", phone: "+966 50 789 0123", joinDate: "2026-05-01", laundry: "مغسلة التنظيف الفاخر", avatar: "م" },
  { id: 8, name: "يوسف إبراهيم العمري", email: "yousef.i@email.sa", phone: "+966 55 890 1234", joinDate: "2026-05-12", laundry: "مغسلة الماسية", avatar: "ي" },
];

function ConfirmDeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#0D1F3C]">تأكيد الحذف</h3>
          <button onClick={onCancel} className="p-1 hover:bg-[#F4F6F9] rounded-lg transition-colors">
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

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLaundry, setSelectedLaundry] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [users, setUsers] = useState(usersData);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLaundry = selectedLaundry === "" || user.laundry === selectedLaundry;
    return matchesSearch && matchesLaundry;
  });

  function handleDelete(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
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

      <h1 className="text-3xl text-[#0D1F3C]">إدارة المستخدمين</h1>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#777779] w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن مستخدم بالاسم أو البريد الإلكتروني..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white"
          />
        </div>
        <select
          value={selectedLaundry}
          onChange={(e) => setSelectedLaundry(e.target.value)}
          className="px-4 py-2 border border-[#F4F6F9] rounded-lg focus:outline-none focus:border-[#00C9B1] bg-white text-[#777779]"
        >
          <option value="">تصفية حسب المغسلة</option>
          {laundries.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
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
                <th className="text-right text-[#777779] text-sm py-4 px-6">المغسلة التابعة لها</th>
                <th className="text-right text-[#777779] text-sm py-4 px-6">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-[#F4F6F9] hover:bg-[#F4F6F9] transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 rounded-full bg-[#00C9B1] flex items-center justify-center text-white font-medium">
                      {user.avatar}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#0D1F3C] font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-[#777779]">{user.email}</td>
                  <td className="py-4 px-6 text-[#777779]">{user.phone}</td>
                  <td className="py-4 px-6 text-[#777779]">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00C9B1]/10 text-[#00C9B1] border border-[#00C9B1]/20">
                      {user.laundry}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors" title="عرض">
                        <Eye className="w-4 h-4 text-[#00C9B1]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors"
                        title="حذف"
                        onClick={() => setDeleteTarget(user.id)}
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

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-[#777779] text-sm">
          عرض {filteredUsers.length} من {users.length} مستخدم
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9]">
            السابق
          </button>
          <button className="px-4 py-2 bg-[#00C9B1] text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9]">
            2
          </button>
          <button className="px-4 py-2 border border-[#F4F6F9] rounded-lg text-[#777779] hover:bg-[#F4F6F9]">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
