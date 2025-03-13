import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/_layout/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  // Если пользователь не авторизован, перенаправляем на страницу авторизации
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Мой профиль</h1>

      {user && (
        <div className="rounded-lg border p-6 max-w-md">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Имя пользователя
            </h2>
            <p className="text-lg">{user.username}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Email</h2>
            <p className="text-lg">{user.email}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              ID пользователя
            </h2>
            <p className="text-lg">{user.id}</p>
          </div>

          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground mt-4">
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  );
}
