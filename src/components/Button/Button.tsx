import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
