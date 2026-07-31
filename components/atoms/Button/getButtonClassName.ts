import clsx from "clsx";
import type { ButtonSize, ButtonVariant } from "./types";

const sizeClassNames: Record<ButtonSize, string> = {
  14: "px-[22px] py-[10.5px]",
  16: "px-[22px] py-[13px]",
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-green bg-brand-green/5 text-neutral-0 hover:bg-brand-green hover:text-neutral-hover disabled:opacity-20 disabled:hover:bg-brand-green/5",
  secondary:
    "relative isolate border border-[rgba(98,104,104,0.38)] bg-neutral-hover/35 hover:bg-brand-green/10 text-neutral-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(90deg,transparent_0%,transparent_62%,rgba(0,255,0,0.88)_90%,rgba(0,255,0,0.22)_100%),linear-gradient(180deg,rgba(0,255,0,0.72)_0%,rgba(0,255,0,0)_28%),linear-gradient(90deg,rgba(0,255,0,0.78)_0%,rgba(0,255,0,0)_30%),linear-gradient(180deg,rgba(0,255,0,0)_72%,rgba(0,255,0,0.72)_100%)] before:[background-size:100%_1px,1px_100%,100%_1px,1px_100%] before:[background-position:top,right,bottom,left] before:bg-no-repeat after:pointer-events-none after:absolute after:inset-[-4px] after:-z-10 after:content-[''] after:bg-[radial-gradient(circle_at_top_right,rgba(0,255,0,0.045),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(0,255,0,0.04),transparent_18%)] hover:border-[rgba(118,124,124,0.46)] hover:after:bg-[radial-gradient(circle_at_top_right,rgba(0,255,0,0.06),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(0,255,0,0.055),transparent_20%)] disabled:opacity-35 disabled:hover:border-[rgba(98,104,104,0.38)]",
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
