"use client";

import { getButtonClassName } from "./getButtonClassName";
import type { ButtonProps } from "./types";
import { Text } from "@/components/atoms/Text/Text";

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  size = 16,
  onClick,
  isSquare,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, size, variant, isSquare })}
      type={type}
      onClick={onClick}
      {...props}
    >
      <Text size={size} weight={500}>
        {children}
      </Text>
    </button>
  );
}
