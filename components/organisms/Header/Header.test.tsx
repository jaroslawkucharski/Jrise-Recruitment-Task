import { screen } from "@testing-library/react";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

import { Header } from "./Header";

describe("Header", () => {
  it("renders home link, logo and primary navigation", () => {
    renderWithIntl(<Header />);

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
