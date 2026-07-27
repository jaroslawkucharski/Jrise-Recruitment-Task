import { getButtonClassName } from "./getButtonClassName";
import type { ButtonProps } from "./types";

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  size = 16,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, size, variant })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
