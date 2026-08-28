"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onDismiss: () => void;
};

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="rounded-xl bg-[var(--error)] px-5 py-3 text-sm font-bold text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        {message}
      </div>
    </div>
  );
}
