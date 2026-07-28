import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TextSizeTypes = 12 | 14 | 16;
type TextWeightTypes = 400 | 500 | 600 | 700;

type TextProps = {
  className?: string;
  children: ReactNode;
  size?: TextSizeTypes;
  weight?: TextWeightTypes;
} & Omit<ComponentPropsWithoutRef<"span">, "children" | "className">;

const sizeClassNames: Record<TextSizeTypes, string> = {
  12: "text-[12px]",
  14: "text-[14px]",
  16: "text-[16px]",
};

const weightClassNames: Record<TextWeightTypes, string> = {
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
  ...props
}: TextProps) {
  return (
    <span
      {...props}
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
