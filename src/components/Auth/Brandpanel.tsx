interface BrandPanelProps {
  brandName?: string
  headline?: string
  subtext?: string
  imageUrl?: string
}

export default function BrandPanel({
  brandName = "نظيف",
  headline = "الرفيق الموثوق لملابسك",
  subtext = "نحن نضمن لك جودة استثنائية وعناية فائقة لكل قطعة ملابس، لأننا نؤمن أن النظافة هي مفتاح الثقة.",
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCwXQi0L8icod3p_r2oR-dii3EFFYhy4i8i956d_ql9xhB40BZM5Zf_5ZjbP2iOrJE445u4jAIuEgCn0IPUK8bQN3xNvv882DygdF0D68BaiLwg8-R1aJ9RAWekTq4pivKell8F-KH-1aYFGfBzLZmuVSS58QhFtiE2dXZnhen-5kctDKRO1kp-yI36rkOY2HfjQZ08UP3XYH6-59MznKre_vS0LCQwTrcR_RpdY6M13fAAEL2ebPwIfFunurS8awwI2trF3YdeMPaQ",
}: BrandPanelProps) {
  return (
    <aside
      className="relative hidden w-1/2 overflow-hidden lg:flex"
      style={{ backgroundColor: "#0d1f3c" }}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt="Brand Background"
          className="h-full w-full object-cover"
          style={{ opacity: 0.3, mixBlendMode: "luminosity" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0d1f3c 0%, transparent 50%, rgba(13,31,60,0.4) 100%)",
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: "-10%",
          left: "-10%",
          width: 500,
          height: 500,
          background: "rgba(0,107,93,0.1)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "-10%",
          right: "-10%",
          width: 300,
          height: 300,
          background: "rgba(95,250,224,0.05)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        style={{ padding: "0 48px", textAlign: "center" }}
      >
        {/* Logo card */}
        <div
          className="anim-si mb-8"
          style={{
            padding: 24,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "Cairo",
              fontSize: 64,
              fontWeight: 700,
              color: "#5ffae0",
              lineHeight: 1,
            }}
          >
            {brandName}
          </span>
        </div>

        <h2
          className="anim-fsu d2 mb-5"
          style={{
            fontFamily: "Cairo",
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {headline}
        </h2>

        <p
          className="anim-fsu d3"
          style={{
            fontFamily: "Tajawal",
            fontSize: 18,
            lineHeight: 1.6,
            color: "#7787aa",
            maxWidth: 400,
          }}
        >
          {subtext}
        </p>
      </div>
    </aside>
  )
}
