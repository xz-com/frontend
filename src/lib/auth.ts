import { API_URL } from "@/config";

// Типы для запросов
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Типы для ответов
export interface AuthResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

// Функция для входа пользователя
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка при входе");
  }

  return response.json();
}

// Функция для регистрации пользователя
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка при регистрации");
  }

  return response.json();
}

// Функция для получения профиля пользователя
export async function getProfile(): Promise<{ user: any }> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен не найден");
  }

  const response = await fetch(`${API_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка при получении профиля");
  }

  return response.json();
}

// Функция для сохранения токена в localStorage
export function saveAuthData(data: AuthResponse): void {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

// Функция для проверки авторизации пользователя
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}

// Функция для выхода пользователя
export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
