import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "./auth-store";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
