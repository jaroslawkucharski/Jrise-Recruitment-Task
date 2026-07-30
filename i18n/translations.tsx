import type { ReactNode } from "react";
import {
  createTranslator,
  NextIntlClientProvider,
  useTranslations,
} from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageKey } from "@/i18n/messages";

type RichValueRenderer = (chunks?: ReactNode) => ReactNode;

export type AppRichValues = Record<string, RichValueRenderer>;
export type AppTranslationValues = Record<string, unknown>;
type BaseTranslator = ReturnType<typeof useTranslations>;
type AppTranslator = BaseTranslator;

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
  translator: BaseTranslator,
): AppTranslator {
  const rich = translator.rich.bind(translator);
  const translate = ((
    key: MessageKey,
    values?: AppTranslationValues,
  ) => rich(key, mergeRichValues(values as AppRichValues))) as BaseTranslator;

  return Object.assign(translate, translator, {
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

export function AppIntlProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function createAppTranslator({
  locale,
  messages,
}: {
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return withDefaultRichValues(
    createTranslator({
      locale,
      messages,
    }),
  );
}
