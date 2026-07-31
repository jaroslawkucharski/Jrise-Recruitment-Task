import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { RevealText } from "@/components/atoms/RevealText/RevealText";

type GroupElementProps = {
  isActive?: boolean;
  title: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function GroupElement({
  className,
  isActive = false,
  title,
  ...props
}: GroupElementProps) {
  return (
    <button
      {...props}
      className={clsx(
        "cursor-pointer flex w-full items-center gap-3 border px-5.5 py-3.25 text-left transition-[background-color,border-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover",
        isActive
          ? "border-brand-green bg-brand-green text-neutral-hover"
          : "border-neutral-0 bg-transparent text-neutral-0 hover:border-brand-green hover:text-brand-green",
        className,
      )}
    >
      <Text
        size={16}
        weight={700}
        className={clsx(isActive ? "text-neutral-hover" : "text-inherit")}
      >
        <RevealText>{title}</RevealText>
      </Text>
    </button>
  );
}
