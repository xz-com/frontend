import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Если пользователь не авторизован, перенаправляем на страницу авторизации
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать в Acme Inc.</h1>
      <p className="text-lg mb-4">
        Это защищенная страница, доступная только авторизованным пользователям.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-2">Заметки</h2>
          <p className="text-muted-foreground mb-4">
            Создавайте и управляйте своими заметками.
          </p>
          <a
            href="/notes"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Перейти к заметкам
          </a>
        </div>
      </div>
    </div>
  );
}
