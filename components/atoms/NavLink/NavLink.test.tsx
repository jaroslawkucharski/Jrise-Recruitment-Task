import { screen } from "@testing-library/react";
import { NavLink } from "./NavLink";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { getAnchorHref } from "@/utils/getAnchorHref";

describe("NavLink", () => {
  it("renders link text and href", () => {
    renderWithIntl(
      <NavLink href={getAnchorHref(t("anchor_services"))}>
        {t("header_nav_services")}
      </NavLink>,
    );

    const link = screen.getByRole("link", { name: t("header_nav_services") });

    expect(link.getAttribute("href")).toBe(getAnchorHref(t("anchor_services")));
  });

  it("applies active class when active", () => {
    renderWithIntl(
      <NavLink href={getAnchorHref(t("anchor_services"))} isActive>
        {t("header_nav_services")}
      </NavLink>,
    );

    expect(
      screen.getByRole("link", { name: t("header_nav_services") }).classList.contains(
        "text-brand-green",
      ),
    ).toBe(true);
  });
});
