import { useProvider } from "../context/ProviderContext";

export default function Toast() {
  const { toast } = useProvider();
  if (!toast) return null;

  const colors = {
    success: "bg-[#006B5D] text-white",
    info: "bg-[#0D1F3C] text-white",
    error: "bg-red-600 text-white",
  };

  const icons = {
    success: "check_circle",
    info: "info",
    error: "error",
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`${colors[toast.type]} px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm`}>
        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icons[toast.type]}
        </span>
        {toast.message}
      </div>
    </div>
  );
}
