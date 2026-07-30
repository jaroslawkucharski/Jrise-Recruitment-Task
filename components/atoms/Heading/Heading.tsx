import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LevelTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type WeightTypes = 400 | 500 | 600 | 700;

type HeadingProps = {
  children: ReactNode;
  className?: string;
  level?: LevelTypes;
  weight?: WeightTypes;
} & Omit<ComponentPropsWithoutRef<"h1">, "children" | "className">;

const sizeClassNames: Record<LevelTypes, string> = {
  h1: "text-[42px] sm:text-[52px] lg:text-[64px]",
  h2: "text-[28px] sm:text-[30px] lg:text-[32px]",
  h3: "text-[24px] sm:text-[26px] lg:text-[28px]",
  h4: "text-[20px] sm:text-[22px] lg:text-[24px]",
  h5: "text-[18px] sm:text-[19px] lg:text-[21px]",
  h6: "text-[16px] sm:text-[17px] lg:text-[18px]",
};

const weightClassNames: Record<WeightTypes, string> = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
};

export function Heading({
  children,
  className,
  level = "h1",
  weight = 400,
  ...props
}: HeadingProps) {
  const HeadingTag: LevelTypes = level;

  return (
    <HeadingTag
      {...props}
      className={clsx(
        sizeClassNames[level],
        weightClassNames[weight],
        className,
      )}
    >
      {children}
    </HeadingTag>
  );
}
