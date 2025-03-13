import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/components/register-form";
import { guestGuard } from "@/lib/auth-context";

export const Route = createFileRoute("/register")({
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
        <RegisterForm />
      </div>
    </div>
  );
}
