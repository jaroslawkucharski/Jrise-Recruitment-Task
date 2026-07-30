import { createTranslator } from "next-intl";
import { screen } from "@testing-library/react";
import { messages } from "@/i18n/messages";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { vi } from "vitest";

import { Header } from "./Header";

const translator = createTranslator({
  locale: "pl",
  messages,
});

vi.mock("@/i18n/translations", () => ({
  getAppTranslations: async () => translator,
}));

vi.mock("@/components/atoms/Logo/Logo", () => ({
  Logo: function MockLogo() {
    return <div data-testid="logo" />;
  },
}));

vi.mock("@/components/molecules/Navigation/Navigation", () => ({
  Navigation: function MockNavigation() {
    return <nav aria-label={t("header_nav_aria")} />;
  },
}));

describe("Header", () => {
  it("renders home link, logo and primary navigation", async () => {
    renderWithIntl(await Header());

    expect(screen.getByRole("banner")).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: t("header_homeAria") })
        .getAttribute("href"),
    ).toBe("/");
    expect(screen.getByTestId("logo")).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: t("header_nav_aria") }),
    ).toBeDefined();
  });
});
