import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { navigationItems } from "@/data/navigation";

describe("Navigation", () => {
  it("renders all navigation links and CTA", () => {
    render(<Navigation items={navigationItems} />);

    navigationItems.forEach(({ href, label }) => {
      expect(
        screen.getByRole("link", { name: label }).getAttribute("href"),
      ).toBe(href);
    });
  });
});
