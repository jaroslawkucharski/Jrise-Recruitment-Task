import Link from "next/link";
import { getButtonClassName } from "./getButtonClassName";
import type { LinkButtonProps } from "./types";

export function LinkButton({
  className,
  children,
  variant = "primary",
  size = 16,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={getButtonClassName({ className, size, variant })}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
