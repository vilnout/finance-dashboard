import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  const confirmAction = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mt-2 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
            <AlertTriangle size={24} />
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>
          <p className="mb-6 text-sm text-slate-400">{message}</p>
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg bg-slate-800 py-2.5 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="flex-1 cursor-pointer rounded-lg bg-rose-600 py-2.5 font-medium text-white transition-colors hover:bg-rose-500 hover:ring-2 hover:ring-rose-800 hover:outline-none"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
