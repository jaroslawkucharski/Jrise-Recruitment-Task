import Link from "next/link";
import { getButtonClassName } from "./getButtonClassName";
import type { LinkButtonProps } from "./types";
import { Text } from "@/components/atoms/Text/Text";

export function LinkButton({
  className,
  children,
  variant = "primary",
  size = 16,
  href,
  isSquare,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={getButtonClassName({ className, size, variant, isSquare })}
      href={href}
      {...props}
    >
      <Text size={size} weight={700}>
        {children}
      </Text>
    </Link>
  );
}
