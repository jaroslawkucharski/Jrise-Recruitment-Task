import clsx from "clsx";
import type { ReactNode } from "react";

type LevelTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type WeightTypes = 400 | 500 | 600 | 700;

type HeadingProps = {
  children: ReactNode;
  className?: string;
  level: LevelTypes;
  weight?: WeightTypes;
};

const sizeClassNames: Record<LevelTypes, string> = {
  h1: "text-[38px]",
  h2: "text-[32px]",
  h3: "text-[28px]",
  h4: "text-[24px]",
  h5: "text-[21px]",
  h6: "text-[18px]",
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
}: HeadingProps) {
  const HeadingTag: LevelTypes = level;

  return (
    <HeadingTag
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
