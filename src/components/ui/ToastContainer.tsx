import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useToastStore } from "../../store/useToastStore";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToasts = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed right-4 bottom-4 z-100 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 opacity-100 shadow-xl shadow-black/20 transition-all duration-300 ${toast.type === "success" ? "border border-emerald-500/10 bg-emerald-500/10 text-emerald-500" : "border border-rose-500/20 bg-rose-500/10 text-rose-500"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="text-sm font-medium text-white">
            {toast.message}
          </span>
          <button
            onClick={() => removeToasts(toast.id)}
            className="ml-4 text-slate-400 transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
