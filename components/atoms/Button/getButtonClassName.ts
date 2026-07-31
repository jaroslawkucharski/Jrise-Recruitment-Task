import clsx from "clsx";
import type { ButtonSize, ButtonVariant } from "./types";
import {
  decorativeBorderClassName,
  decorativeBorderInteractiveClassName,
  decorativeGlowClassName,
} from "@/utils/decorativeBorder";

const sizeClassNames: Record<ButtonSize, string> = {
  14: "px-[22px] py-[10.5px]",
  16: "px-[22px] py-[13px]",
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-green bg-brand-green/5 text-neutral-0 hover:bg-brand-green hover:text-neutral-hover disabled:opacity-20 disabled:hover:bg-brand-green/5",
  secondary:
    clsx(
      decorativeBorderClassName,
      decorativeBorderInteractiveClassName,
      decorativeGlowClassName,
      "bg-neutral-hover/35 hover:bg-brand-green/10 text-neutral-0 shadow-[inset_0_1px_0_var(--color-neutral-0-4)] disabled:opacity-35",
    ),
};

export function getButtonClassName({
  className,
  size = 16,
  variant = "primary",
  isSquare,
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  isSquare?: boolean;
}) {
  return clsx(
    "flex cursor-pointer items-center justify-center transition-[background,color,box-shadow,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover disabled:cursor-not-allowed [&>*]:relative [&>*]:z-10",
    isSquare ? "h-[56px] w-[56px] p-0" : sizeClassNames[size],
    variantClassNames[variant],
    className,
  );
}
