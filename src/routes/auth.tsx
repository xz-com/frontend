import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";
import { guestGuard } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  // Добавляем проверку, что пользователь не авторизован
  beforeLoad: () => {
    // Проверяем, что пользователь не авторизован
    guestGuard();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
