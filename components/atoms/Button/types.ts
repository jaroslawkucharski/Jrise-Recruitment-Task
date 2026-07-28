import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = 14 | 16;

export type ButtonBaseProps = {
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isSquare?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children">;

export type LinkButtonProps = ButtonBaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "children" | "href">;
