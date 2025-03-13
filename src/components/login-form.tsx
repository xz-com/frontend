import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, saveAuthData } from "@/lib/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth-store";

// Схема валидации с использованием Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(1, { message: "Пароль обязателен" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Отправляем запрос на сервер
      const response = await login(data);

      // Сохраняем данные авторизации
      saveAuthData(response);

      // Обновляем состояние авторизации
      loginUser(response.user);

      // Показываем уведомление об успешном входе
      toast.success("Вход выполнен успешно");

      // Перенаправляем на главную страницу
      navigate({ to: "/" });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setError(
        error instanceof Error ? error.message : "Произошла ошибка при входе"
      );
      toast.error(
        error instanceof Error ? error.message : "Произошла ошибка при входе"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Добро пожаловать в Acme Inc.</h1>
            <div className="text-center text-sm">
              Нет аккаунта?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Зарегистрироваться
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 p-3 rounded-md text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Загрузка..." : "Войти"}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Или
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Продолжить с Apple
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Продолжить с Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Нажимая кнопку "Войти", вы соглашаетесь с нашими{" "}
        <a href="#">Условиями использования</a> и{" "}
        <a href="#">Политикой конфиденциальности</a>.
      </div>
    </div>
  );
}
