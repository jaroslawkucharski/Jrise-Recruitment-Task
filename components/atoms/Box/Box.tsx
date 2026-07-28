"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";

type BoxProps = {
  className?: string;
  contentClassName?: string;
  currentStep?: number;
  description: string;
  hasBackground?: boolean;
  padding?: 0 | 16;
  title?: string;
};

export function Box({
  className,
  contentClassName,
  currentStep,
  description,
  hasBackground = true,
  padding = 16,
  title,
}: BoxProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col justify-between",
        hasBackground && "bg-neutral-800",
        padding === 16 ? "p-4" : "p-0",
        className,
      )}
    >
      <div className={clsx("space-y-5", contentClassName)}>
        {title ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <Heading level="h5" weight={500}>
                {t(title)}
              </Heading>

              {currentStep ? (
                <span className="flex h-9 w-9 items-center justify-center border border-neutral-700">
                  <Text size={14} weight={700}>
                    {currentStep}
                  </Text>
                </span>
              ) : null}
            </div>

            <div className="border-t border-white/10" />
          </>
        ) : null}

        <Text className="text-neutral-300">
          {t.rich(description, {
            b: (chunks) => (
              <strong className="font-semibold text-white">{chunks}</strong>
            ),
          })}
        </Text>
      </div>
    </div>
  );
}
