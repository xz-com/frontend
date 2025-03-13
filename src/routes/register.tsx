import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/components/register-form";
import { guestGuard } from "@/lib/auth-context";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    return guestGuard();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </main>
  );
}
