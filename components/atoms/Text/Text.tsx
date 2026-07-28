import clsx from "clsx";
import type { ReactNode } from "react";

type TextSize = 12 | 14 | 16;
type TextWeight = 400 | 500 | 600 | 700;

type TextProps = {
  className?: string;
  children: ReactNode;
  size?: TextSize;
  weight?: TextWeight;
};

const sizeClassNames: Record<TextSize, string> = {
  12: "text-[12px]",
  14: "text-[14px]",
  16: "text-[16px]",
};

const weightClassNames: Record<TextWeight, string> = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
};

export function Text({
  children,
  className,
  size = 16,
  weight = 400,
}: TextProps) {
  return (
    <span
      className={clsx(
        sizeClassNames[size],
        weightClassNames[weight],
        className,
      )}
    >
      {children}
    </span>
  );
}
