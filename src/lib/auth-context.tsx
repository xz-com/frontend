import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useAuthStore } from "./auth-store";
import { router } from "@/main";

// Тип для контекста авторизации
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
}

// Создаем контекст авторизации
const AuthContext = createContext<AuthContextType | null>(null);

// Хук для использования контекста авторизации
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
}

// Провайдер контекста авторизации
export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user, login, logout, initialize } =
    useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализируем авторизацию при монтировании компонента
  useEffect(() => {
    const init = async () => {
      await initialize();
      setIsInitialized(true);
    };

    init();
  }, [initialize]);

  // Значение контекста авторизации
  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  // Если инициализация не завершена, показываем загрузчик
  if (!isInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Функция для проверки авторизации в роутах
export function authGuard() {
  const { isAuthenticated, isLoading } = useAuthStore.getState();

  // Если идет загрузка, разрешаем доступ (проверка будет выполнена в компоненте)
  if (isLoading) return true;

  // Если пользователь не авторизован, перенаправляем на страницу авторизации
  if (!isAuthenticated) {
    router.navigate({ to: "/auth" });
    return false;
  }

  return true;
}

// Функция для проверки, что пользователь не авторизован (для страниц авторизации и регистрации)
export function guestGuard() {
  const { isAuthenticated, isLoading } = useAuthStore.getState();

  // Если идет загрузка, разрешаем доступ (проверка будет выполнена в компоненте)
  if (isLoading) return true;

  // Если пользователь авторизован, перенаправляем на главную страницу
  if (isAuthenticated) {
    router.navigate({ to: "/" });
    return false;
  }

  return true;
}
