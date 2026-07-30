import { Logo } from "@/components/atoms/Logo/Logo";
import { Navigation } from "@/components/molecules/Navigation/Navigation";
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
  it("returns the home link, logo and primary navigation structure", async () => {
    const header = await Header();
    const wrapper = header.props.children;
    const [homeLink, navigation] = wrapper.props.children;

    expect(header.type).toBe("header");
    expect(homeLink.props.href).toBe("/");
    expect(homeLink.props["aria-label"]).toBe(t("header_homeAria"));
    expect(homeLink.props.children.type).toBe(Logo);
    expect(navigation.type).toBe(Navigation);
  });
});
