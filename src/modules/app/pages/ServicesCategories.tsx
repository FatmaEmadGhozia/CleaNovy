import { Plus, Edit2, Trash2, Shirt, Wind, Droplets, Home, Blinds, ShoppingBag } from "lucide-react";

const categories = [
  { id: 1, name: "غسيل ملابس", icon: Shirt, providers: 127, description: "خدمات غسيل الملابس الاحترافية", color: "#00C9B1" },
  { id: 2, name: "كوي", icon: Wind, providers: 89, description: "خدمات الكوي والكبس المتخصصة", color: "#0D1F3C" },
  { id: 3, name: "تنظيف جاف", icon: Droplets, providers: 65, description: "خدمات التنظيف الجاف المتخصصة", color: "#F4C542" },
  { id: 4, name: "تنظيف سجاد", icon: Home, providers: 42, description: "تنظيف عميق للسجاد والموكيت", color: "#00C9B1" },
  { id: 5, name: "تنظيف ستائر", icon: Blinds, providers: 38, description: "تنظيف الستائر والمفارش", color: "#0D1F3C" },
  { id: 6, name: "عناية بالحقائب", icon: ShoppingBag, providers: 51, description: "العناية بالحقائب والأحذية والإكسسوارات", color: "#F4C542" },
];

export function ServicesCategories() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-[#0D1F3C]">إدارة الخدمات والتصنيفات</h1>
        <button className="bg-[#00C9B1] text-white px-6 py-3 rounded-lg hover:bg-[#00b39d] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          إضافة تصنيف
        </button>
      </div>

      <p className="text-[#777779]">
        إدارة تصنيفات الخدمات المتاحة على المنصة. يمكنك إضافة أو تعديل أو حذف التصنيفات لتنظيم عروض السوق.
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-lg transition-shadow border-t-4"
              style={{ borderTopColor: category.color }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: category.color }} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#00C9B1]/10 rounded-lg transition-colors" title="تعديل">
                    <Edit2 className="w-4 h-4 text-[#00C9B1]" />
                  </button>
                  <button className="p-2 hover:bg-[#FF4D4D]/10 rounded-lg transition-colors" title="حذف">
                    <Trash2 className="w-4 h-4 text-[#FF4D4D]" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg text-[#0D1F3C] font-medium mb-2">{category.name}</h3>
              <p className="text-[#777779] text-sm mb-4">{category.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#F4F6F9]">
                <div className="text-[#777779] text-sm">المغاسل النشطة</div>
                <div className="text-[#00C9B1] text-xl font-medium">{category.providers}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Pricing Table */}
      <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#0D1F3C]">أسعار الخدمات الشائعة</h2>
          <button className="text-[#00C9B1] hover:text-[#00b39d] font-medium">
            عرض جميع الأسعار
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F4F6F9]">
                <th className="text-right text-[#777779] text-sm py-3 px-4">اسم الخدمة</th>
                <th className="text-right text-[#777779] text-sm py-3 px-4">التصنيف</th>
                <th className="text-right text-[#777779] text-sm py-3 px-4">متوسط السعر</th>
                <th className="text-right text-[#777779] text-sm py-3 px-4">نطاق السعر</th>
                <th className="text-right text-[#777779] text-sm py-3 px-4">الحجوزات</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "غسيل وطي عادي", category: "غسيل ملابس", avgPrice: "25.00 ر.س", range: "20-30 ر.س", bookings: 1245 },
                { service: "كوي سريع", category: "كوي", avgPrice: "18.00 ر.س", range: "15-22 ر.س", bookings: 892 },
                { service: "تنظيف جاف فاخر", category: "تنظيف جاف", avgPrice: "35.00 ر.س", range: "30-45 ر.س", bookings: 756 },
                { service: "تنظيف سجاد عميق", category: "تنظيف سجاد", avgPrice: "85.00 ر.س", range: "70-120 ر.س", bookings: 423 },
                { service: "غسيل وكبس ستائر", category: "تنظيف ستائر", avgPrice: "55.00 ر.س", range: "45-65 ر.س", bookings: 312 },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#F4F6F9] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]/50"
                  }`}
                >
                  <td className="py-3 px-4 text-[#0D1F3C] font-medium">{item.service}</td>
                  <td className="py-3 px-4 text-[#777779]">{item.category}</td>
                  <td className="py-3 px-4 text-[#0D1F3C] font-medium">{item.avgPrice}</td>
                  <td className="py-3 px-4 text-[#777779]">{item.range}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#00C9B1]/10 text-[#00C9B1] px-3 py-1 rounded-full text-sm font-medium">
                      {item.bookings}
                    </span>
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
