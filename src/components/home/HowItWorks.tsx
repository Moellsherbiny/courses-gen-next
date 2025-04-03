"use client";
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">كيف يعمل الموقع</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* الخطوة 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4 text-center">
              <span className="inline-block bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">التسجيل</h3>
            <p className="text-gray-600 text-center">قم بإنشاء حساب جديد بسهولة.</p>
          </div>
          {/* الخطوة 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4 text-center">
              <span className="inline-block bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">اختيار الخدمة</h3>
            <p className="text-gray-600 text-center">اختر الخدمة المناسبة لاحتياجاتك.</p>
          </div>
          {/* الخطوة 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4 text-center">
              <span className="inline-block bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">الاستمتاع</h3>
            <p className="text-gray-600 text-center">ابدأ استخدام الخدمة واستمتع بالمزايا.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
