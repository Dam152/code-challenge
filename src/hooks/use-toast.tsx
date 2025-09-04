"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type Toast = {
  id: string;
  message: string;
  type: "success" | "info";
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, type?: "success" | "info") => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 11);
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = {
    toasts,
    showToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
