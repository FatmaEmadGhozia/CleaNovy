export default function ForgotPassword() {
  return (
    <main dir="rtl" className="min-h-screen flex flex-row-reverse font-tajawal bg-[#fbf8fc]">

      {/* RIGHT SIDE */}
      <section className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        {/* IMAGE */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJgS0LlTXWx0SN8ZDHxAAi1GFCfwAsQ4fXMCgZ5Jd_jHXeLwVOdujpWYm521EmhT1aZh2NiRh3Lvc-Z37j-lxqAfmF7npdK6Sjr1qyn9gvrddJo8ug4ppGsZSknk7DQeP9IaTe600lnCsSCa-YI2E4Go8gSGdR1Nsc05ztFwTXISI2cQCFLhThartIcJwnMEpztr-mAyBV0Va5wyinj2GqU-XbJku6NheSsuX2KiI_jKicWWcJtVV3AKkzyzh56soAklvv1BL3WeK9"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        {/* OVERLAY (IMPORTANT FIX) */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0d1f3c] via-[#0d1f3c]/80 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 text-center text-white px-10">

          <div className="text-[64px] font-bold text-[#5ffae0]">
            نظيف
          </div>

          <h2 className="text-3xl font-bold mt-4">
            نعتني بملابسك كأنها لنا
          </h2>

          <p className="mt-4 text-gray-200 max-w-md mx-auto">
            انضم إلى آلاف المستخدمين الذين يثقون في نظيف للحصول على أفضل خدمات الغسيل
          </p>

        </div>

      </section>

      {/* LEFT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8">

        <div className="w-full max-w-md text-right -mt-20">

          <h1 className="text-3xl font-bold mb-3 text-[#1b1b1e]">
            نسيت كلمة المرور؟
          </h1>

          <p className="text-gray-500 mb-10 text-md">
           لا تقلق ، ادخل  رقم هاتفك وسنرسل لك رابطاً لاستعادة حسابك.
          </p>

          <form className="space-y-6">

            <div>
              <label className="block mb-2 font-bold">
                 رقم الهاتف
              </label>
            

              <div className="relative">

                {/* <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400">
                  alternate_email
                </span> */}

                <input
                  className="w-full p-4 pr-5 border border-gray-300 rounded-xl text-right text-xl focus:outline-[#006b5d] focus:border-[#006b5d]"
                  type="text"
                  placeholder="015******52"
                  dir="ltr"
                />

              </div>
            </div>

            <button className="w-full bg-[#006b5d] text-white  text-lg py-4 rounded-full font-bold hover:opacity-90 transition">
              إرسال رابط الاستعادة
            </button>

          </form>

          <div className="mt-10 text-center space-y-4">

            <a className="flex justify-center items-center gap-2 text-[#006b5d] font-bold mb-17">
              <span className="material-symbols-outlined ">arrow_forward</span>
              العودة لتسجيل الدخول
            </a>


        <hr  className=" block text-gary-200 "/>
            <p className="text-sm text-gray-500">
              تواجه مشكلة؟ <span className="text-[#006b5d] font-bold">اتصل بالدعم الفني</span>
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}