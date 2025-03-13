import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div
      className={cn("animate-spin text-muted-foreground", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "sm" ? "16" : size === "md" ? "24" : "32"}
        height={size === "sm" ? "16" : size === "md" ? "24" : "32"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Загрузка...</span>
    </div>
  );
}
