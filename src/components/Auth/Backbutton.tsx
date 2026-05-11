interface BackButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function BackButton({
  label = "العودة لتسجيل الدخول",
  onClick,
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 group anim-fsu d1"
      style={{ color: "#44474d", background: "none", border: "none", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#006b5d")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#44474d")}
    >
      <span
        className="material-symbols-outlined transition-transform duration-200 group-hover:-translate-x-1"
        style={{ fontSize: 22 }}
      >
        arrow_back
      </span>
      <span style={{ fontFamily: "Tajawal", fontSize: 16 }}>{label}</span>
    </button>
  );
}