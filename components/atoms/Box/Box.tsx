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
      data-testid="box"
    >
      <div className={clsx("space-y-5", contentClassName)}>
        {title ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <Heading level="h5" weight={500} data-testid="box-title">
                {t(title)}
              </Heading>

              {currentStep ? (
                <span
                  aria-label={`${t("box_step_label")} ${String(currentStep).padStart(2, "0")}`}
                  className="flex h-9 w-9 items-center justify-center border border-neutral-700"
                  data-testid="box-step"
                >
                  <Text size={14} weight={700}>
                    {String(currentStep).padStart(2, "0")}
                  </Text>
                </span>
              ) : null}
            </div>

            <div className="border-t border-white/10" />
          </>
        ) : null}

        <Text className="text-neutral-300" data-testid="box-description">
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
