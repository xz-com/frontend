import { Link, useNavigate } from "@tanstack/react-router";
import { GalleryVerticalEnd, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <GalleryVerticalEnd className="h-6 w-6" />
            <span className="font-bold">Acme Inc.</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              Главная
            </Link>
            {isAuthenticated && (
              <Link
                to="/notes"
                className="transition-colors hover:text-foreground/80"
              >
                Заметки
              </Link>
            )}
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80"
            >
              О нас
            </Link>
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden md:inline-block">
                Привет, {user?.username}
              </span>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="mr-2">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Профиль</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Войти
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </div>
          )}
          <button
            className="inline-flex items-center justify-center ml-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Меню</span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-3 py-4">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            {isAuthenticated && (
              <Link
                to="/notes"
                className="transition-colors hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                Заметки
              </Link>
            )}
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Мой профиль
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Выйти
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
