import { render, screen } from "@testing-library/react";
import { messages } from "@/i18n/messages";
import { createAppTranslator } from "@/i18n/translations";
import { t } from "@/utils/renderWithIntl";
import { vi } from "vitest";
import { Logo } from "./Logo";

const translator = createAppTranslator({
  locale: "pl",
  messages,
});

vi.mock("@/i18n/translations", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/i18n/translations")>();

  return {
    ...actual,
    getAppTranslations: async () => translator,
  };
});

describe("Logo", () => {
  it("renders the logo image with translated alt text", async () => {
    render(await Logo());

    const logo = screen.getByTestId("logo");

    expect(logo.getAttribute("alt")).toBe(t("meta_title"));
    expect(logo.getAttribute("width")).toBe("89");
    expect(logo.getAttribute("height")).toBe("40");
  });
});
