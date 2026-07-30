import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageKey } from "@/i18n/messages";

type RichValueRenderer = (chunks?: ReactNode) => ReactNode;

export type AppRichValues = Record<string, RichValueRenderer>;
type AppTranslator = ReturnType<typeof useTranslations> & {
  rich: (key: MessageKey, values?: AppRichValues) => ReactNode;
};

function getDefaultRichValues(): AppRichValues {
  return {
    br: () => <br />,
    p: (chunks) => <p>{chunks}</p>,
    green: (chunks) => <span className="text-brand-green">{chunks}</span>,
    white: (chunks) => <span className="text-neutral-0">{chunks}</span>,
  };
}

function mergeRichValues(values: AppRichValues = {}) {
  return {
    ...getDefaultRichValues(),
    ...values,
  };
}

function withDefaultRichValues(
  translator: ReturnType<typeof useTranslations>,
): AppTranslator {
  const rich = translator.rich.bind(translator);

  return Object.assign(translator, {
    rich: (key: MessageKey, values?: AppRichValues) =>
      rich(key, mergeRichValues(values)),
  }) as AppTranslator;
}

export function useAppTranslations() {
  return withDefaultRichValues(useTranslations());
}

export async function getAppTranslations() {
  return withDefaultRichValues(await getTranslations());
}
