import clsx from "clsx";
import type { ButtonSize, ButtonVariant } from "./types";

const sizeClassNames: Record<ButtonSize, string> = {
  14: "px-[22px] py-[10.5px] text-[14px]",
  16: "px-[22px] py-[13px] text-[16px]",
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-green bg-brand-green/5 text-neutral-0 hover:bg-brand-green/10",
  secondary:
    "border border-brand-green bg-transparent text-neutral-0 hover:bg-brand-green/10",
};

export function getButtonClassName({
  className,
  size = 16,
  variant = "primary",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return clsx(
    "inline-flex cursor-pointer items-center justify-center font-bold transition-colors duration-200",
    sizeClassNames[size],
    variantClassNames[variant],
    className,
  );
}
