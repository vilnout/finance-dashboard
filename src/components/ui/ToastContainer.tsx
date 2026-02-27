import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useToastStore } from "../../store/useToastStore";
import type { ToastType } from "../../types";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToasts = useToastStore((state) => state.removeToast);

  const iconMap: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const styleMap: Record<ToastType, React.ReactNode> = {
    success: "border border-emerald-500/10 bg-emerald-500/10 text-emerald-500",
    error: "border border-rose-500/20 bg-rose-500/10 text-rose-500",
    info: "border border-blue-500/20 bg-blue-500/10 text-blue-500",
  };

  return (
    <div className="fixed right-4 bottom-4 z-100 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 opacity-100 shadow-xl shadow-black/20 transition-all duration-300 ${styleMap[toast.type] || styleMap["error"]} `}
        >
          {iconMap[toast.type] || iconMap["error"]}
          <span className="text-sm font-medium text-white">
            {toast.message}
          </span>
          <button
            onClick={() => removeToasts(toast.id)}
            className="ml-auto text-slate-400 transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
