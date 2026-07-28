import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageKey } from "@/i18n/messages";

type RichValueRenderer = (chunks?: ReactNode) => ReactNode;

export type AppRichValues = Record<string, RichValueRenderer>;

function getDefaultRichValues(): AppRichValues {
  return {
    br: () => <br />,
    p: (chunks) => <p>{chunks}</p>,
  };
}

function mergeRichValues(values: AppRichValues = {}) {
  return {
    ...getDefaultRichValues(),
    ...values,
  };
}

export function useAppTranslations() {
  const t = useTranslations();

  return {
    t,
    rich: (key: MessageKey, values?: AppRichValues) =>
      t.rich(key, mergeRichValues(values)),
  };
}

export async function getAppTranslations() {
  const t = await getTranslations();

  return {
    t,
    rich: (key: MessageKey, values?: AppRichValues) =>
      t.rich(key, mergeRichValues(values)),
  };
}
