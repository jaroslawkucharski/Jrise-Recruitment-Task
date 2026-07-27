import { NextIntlClientProvider, createTranslator } from "next-intl";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { messages } from "@/i18n/messages";

export function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="pl" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

export const t = createTranslator({
  locale: "pl",
  messages,
});
