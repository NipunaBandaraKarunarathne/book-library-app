"use client";

import { ToastMessage } from "@/hooks/useToast";

interface Props {
  toasts: ToastMessage[];
}

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white font-medium transition transform ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          } animate-slide-in`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
