import { render, screen } from "@testing-library/react";
import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("renders link text and href", () => {
    render(<NavLink href="#offer">Oferta</NavLink>);

    const link = screen.getByRole("link", { name: "Oferta" });

    expect(link.getAttribute("href")).toBe("#offer");
  });

  it("applies active class when active", () => {
    render(
      <NavLink href="#offer" isActive>
        Oferta
      </NavLink>,
    );

    expect(
      screen.getByRole("link", { name: "Oferta" }).classList.contains(
        "text-brand-green",
      ),
    ).toBe(true);
  });
});
