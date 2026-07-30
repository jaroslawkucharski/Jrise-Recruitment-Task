import { screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { navigationItems } from "@/data/navigation";
import { messages } from "@/i18n/messages";
import { createAppTranslator } from "@/i18n/translations";
import { getAnchorHref } from "@/utils/getAnchorHref";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { vi } from "vitest";

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

describe("Navigation", () => {
  it("renders all navigation links and CTA", async () => {
    renderWithIntl(await Navigation({ items: navigationItems }));

    navigationItems.forEach(({ hrefKey, labelKey }) => {
      expect(
        screen.getByRole("link", { name: t(labelKey) }).getAttribute("href"),
      ).toBe(getAnchorHref(t(hrefKey)));
    });
  });

  it("renders navigation landmark with translated label", async () => {
    renderWithIntl(await Navigation({ items: navigationItems }));

    expect(
      screen.getByRole("navigation", { name: t("header_nav_aria") }),
    ).toBeDefined();
  });
});
