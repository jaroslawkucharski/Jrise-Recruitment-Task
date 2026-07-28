import { screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { navigationItems } from "@/data/navigation";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("Navigation", () => {
  it("renders all navigation links and CTA", () => {
    renderWithIntl(<Navigation items={navigationItems} />);

    navigationItems.forEach(({ href, label }) => {
      expect(
        screen.getByRole("link", { name: t(label) }).getAttribute("href"),
      ).toBe(href);
    });
  });

  it("renders navigation landmark with translated label", () => {
    renderWithIntl(<Navigation items={navigationItems} />);

    expect(
      screen.getByRole("navigation", { name: t("header_nav_aria") }),
    ).toBeDefined();
  });
});
