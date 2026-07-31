import { fireEvent, screen } from "@testing-library/react";
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

    expect(screen.getByTestId("primary-navigation")).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: t("header_nav_aria") }),
    ).toBeDefined();
  });

  it("opens and closes the mobile navigation", async () => {
    renderWithIntl(await Navigation({ items: navigationItems }));

    const toggle = screen.getByTestId("mobile-navigation-toggle");

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-label")).toBe(t("header_nav_open_aria"));
    expect(screen.queryByTestId("mobile-navigation-panel")).toBeNull();

    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.getAttribute("aria-label")).toBe(t("header_nav_close_aria"));
    expect(screen.getByTestId("mobile-navigation-panel")).toBeDefined();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByTestId("mobile-navigation-panel")).toBeNull();
  });
});
