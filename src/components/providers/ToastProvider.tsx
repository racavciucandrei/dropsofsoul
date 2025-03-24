
import React from 'react';
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

/**
 * Application-wide toast provider that includes both toast implementations
 * for maximum compatibility
 */
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <ShadcnToaster />
      <SonnerToaster 
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "group",
            title: "font-medium text-foreground group-[.toast]:text-white",
            description: "text-muted-foreground group-[.toast]:text-white/90",
            success: "bg-green-600 border-0 text-white",
            error: "bg-red-600 border-0 text-white",
            info: "bg-blue-600 border-0 text-white",
            warning: "bg-amber-600 border-0 text-white",
          },
        }}
      />
    </>
  );
};

export default ToastProvider;
