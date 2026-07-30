import { createTranslator } from "next-intl";
import { screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { navigationItems } from "@/data/navigation";
import { messages } from "@/i18n/messages";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { vi } from "vitest";

const translator = createTranslator({
  locale: "pl",
  messages,
});

vi.mock("@/i18n/translations", () => ({
  getAppTranslations: async () => translator,
}));

describe("Navigation", () => {
  it("renders all navigation links and CTA", async () => {
    renderWithIntl(await Navigation({ items: navigationItems }));

    navigationItems.forEach(({ href, label }) => {
      expect(
        screen.getByRole("link", { name: t(label) }).getAttribute("href"),
      ).toBe(href);
    });
  });

  it("renders navigation landmark with translated label", async () => {
    renderWithIntl(await Navigation({ items: navigationItems }));

    expect(
      screen.getByRole("navigation", { name: t("header_nav_aria") }),
    ).toBeDefined();
  });
});
