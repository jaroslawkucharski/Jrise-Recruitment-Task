import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { messages } from "@/i18n/messages";
import { AppIntlProvider, createAppTranslator } from "@/i18n/translations";

export function renderWithIntl(ui: ReactElement) {
  return render(
    <AppIntlProvider locale="pl" messages={messages}>
      {ui}
    </AppIntlProvider>,
  );
}

export const t = createAppTranslator({
  locale: "pl",
  messages,
});
