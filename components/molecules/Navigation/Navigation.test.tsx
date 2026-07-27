import { screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { navigationItems } from "@/data/navigation";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("Navigation", () => {
  it("renders all navigation links and CTA", () => {
    renderWithIntl(<Navigation items={navigationItems} />);

    navigationItems.forEach(({ href, labelKey }) => {
      expect(
        screen.getByRole("link", { name: t(labelKey) }).getAttribute("href"),
      ).toBe(href);
    });
  });
});
