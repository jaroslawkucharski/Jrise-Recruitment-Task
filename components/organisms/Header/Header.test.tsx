import { messages } from "@/i18n/messages";
import { createAppTranslator } from "@/i18n/translations";
import { t } from "@/utils/renderWithIntl";
import { vi } from "vitest";
import { Header } from "./Header";

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

describe("Header", () => {
  it("returns translated labels and test ids for the home link and navigation", async () => {
    const header = await Header();
    const wrapper = header.props.children;
    const [homeLink, navigation] = wrapper.props.children;

    expect(header.type).toBe("header");
    expect(header.props["data-testid"]).toBe("site-header");
    expect(homeLink.props.href).toBe("/");
    expect(homeLink.props["data-testid"]).toBe("header-home-link");
    expect(homeLink.props["aria-label"]).toBe(t("header_homeAria"));
    expect(navigation.props.items).toHaveLength(5);
  });
});
