// components/ServicesSection.tsx
"use client";

export default function ServicesSection() {
  return (
    <section id="services" className="py-12" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">خدماتنا</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* خدمة 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4">
              <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m8-10h2M2 12h2m14.95-6.95l1.414 1.414M4.636 19.364l1.414-1.414m0-11.314L4.636 4.636M19.364 19.364l-1.414-1.414" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">خدمة 1</h3>
            <p className="text-gray-600 text-center">وصف مختصر للخدمة المميزة التي نقدمها.</p>
          </div>
          {/* خدمة 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4">
              <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">خدمة 2</h3>
            <p className="text-gray-600 text-center">وصف مختصر لميزة أخرى نقدمها لعملائنا.</p>
          </div>
          {/* خدمة 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4">
              <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 9h14l-1.68 7.091A2 2 0 0115.33 18H8.67a2 2 0 01-1.99-1.909L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">خدمة 3</h3>
            <p className="text-gray-600 text-center">شرح بسيط عن الخدمة وكيف يمكن أن تساعدك.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
