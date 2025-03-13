import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Если пользователь авторизован, перенаправляем на главную
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
