import { create } from "zustand";
import {
  getProfile,
  isAuthenticated as checkIsAuthenticated,
  logout as logoutUser,
} from "./auth";
import { toast } from "sonner";
import { router } from "@/main";
import { useNavigate } from "@tanstack/react-router";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Создаем функцию logout, которая будет использоваться в компонентах
  const logoutWithRedirect = () => {
    logoutUser();
    set({ user: null, isAuthenticated: false });
    toast.success("Вы успешно вышли из системы");
    router.navigate({ to: "/auth" });
  };

  return {
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isInitialized: false,

    login: (user: User) => {
      set({ user, isAuthenticated: true });
    },

    logout: logoutWithRedirect,

    initialize: async () => {
      // Проверяем, была ли уже выполнена инициализация
      if (get().isInitialized) return;

      if (checkIsAuthenticated()) {
        try {
          const { user } = await getProfile();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
          });
        } catch (error) {
          console.error("Ошибка при получении профиля:", error);
          // Если токен недействителен, выходим из системы
          logoutUser();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
          });
          toast.error("Сессия истекла. Пожалуйста, войдите снова.");
        }
      } else {
        set({ isLoading: false, isInitialized: true });
      }
    },
  };
});
