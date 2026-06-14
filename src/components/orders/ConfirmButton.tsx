// components/ConfirmButton.tsx

interface Props {
  disabled: boolean;
  onClick:  () => void;
}

export default function ConfirmButton({ disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-[#0F6E56] text-white font-bold py-4 rounded-2xl hover:bg-[#0a5240] active:scale-95 transition-all shadow-lg shadow-[#0F6E56]/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
    >
      <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
      تأكيد الموعد والمتابعة
    </button>
  );
}
