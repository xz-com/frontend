import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "./auth-store";
import { Spinner } from "@/components/ui/spinner";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const initialize = useAuthStore((state) => state.initialize);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-500">
        <Spinner size="lg" className="text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
