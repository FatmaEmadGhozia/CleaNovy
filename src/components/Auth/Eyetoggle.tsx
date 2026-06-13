interface EyeToggleProps {
  visible: boolean;
  onClick: () => void;
}

export default function EyeToggle({ visible, onClick }: EyeToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75777e] hover:text-[#006b5d] transition-colors focus:outline-none"
    >
      <span
        className="material-symbols-outlined select-none text-[22px]"
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
      >
        {visible ? "visibility_off" : "visibility"}
      </span>
    </button>
  );
}