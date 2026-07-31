"use client";

import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { Text } from "@/components/atoms/Text/Text";
import { MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";

export type BoxPaddingTypes = 0 | 16;

type BoxProps = {
  className?: string;
  contentClassName?: string;
  currentStep?: number;
  descriptionKey: MessageKey;
  hasBackground?: boolean;
  padding?: BoxPaddingTypes;
  titleKey?: MessageKey;
};

export function Box({
  className,
  contentClassName,
  currentStep,
  descriptionKey,
  hasBackground = true,
  padding = 16,
  titleKey,
}: BoxProps) {
  const t = useAppTranslations();

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col justify-between",
        hasBackground && "bg-neutral-800",
        `p-[${padding}px]`,
        className,
      )}
      data-testid="box"
    >
      <div className={clsx("space-y-5", contentClassName)}>
        {titleKey ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <Heading level="h5" weight={500} data-testid="box-title">
                <RevealText>{t(titleKey)}</RevealText>
              </Heading>

              {currentStep ? (
                <span
                  aria-label={`${t("box_step_label")} ${String(currentStep).padStart(2, "0")}`}
                  className="flex h-9 w-9 items-center justify-center border border-neutral-700"
                  data-testid="box-step"
                >
                  <Text size={14} weight={700}>
                    <RevealText>{String(currentStep).padStart(2, "0")}</RevealText>
                  </Text>
                </span>
              ) : null}
            </div>

            <div className="border-t border-white/10" />
          </>
        ) : null}

        <RevealText
          as="div"
          className={clsx(
            "text-[16px] font-normal [&_p+p]:mt-6",
            hasBackground ? "text-neutral-300" : "text-neutral-0",
          )}
          data-testid="box-description"
        >
          {t(descriptionKey)}
        </RevealText>
      </div>
    </div>
  );
}
