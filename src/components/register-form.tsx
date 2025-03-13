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
import { register as registerUser, saveAuthData } from "@/lib/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth-store";

// Схема валидации с использованием Zod
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Имя пользователя должно содержать минимум 3 символа" }),
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({
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
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Отправляем запрос на сервер
      const response = await registerUser(data);

      // Сохраняем данные авторизации
      saveAuthData(response);

      // Обновляем состояние авторизации
      loginUser(response.user);

      // Показываем уведомление об успешной регистрации
      toast.success("Регистрация выполнена успешно");

      // Перенаправляем на главную страницу
      navigate({ to: "/" });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации"
      );
      toast.error(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации"
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
            <h1 className="text-xl font-bold">Создайте аккаунт</h1>
            <div className="text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link to="/auth" className="underline underline-offset-4">
                Войти
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
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                {...register("username")}
                aria-invalid={errors.username ? "true" : "false"}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

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
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с нашими{" "}
        <a href="#">Условиями использования</a> и{" "}
        <a href="#">Политикой конфиденциальности</a>.
      </div>
    </div>
  );
}
