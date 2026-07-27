import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

const items = [
  { href: "#about", label: "Kim jesteśmy?" },
  { href: "#offer", label: "Oferta" },
  { href: "#projects", label: "Realizacje" },
  { href: "#contact", label: "Kontakt" },
];

describe("Navigation", () => {
  it("renders all navigation links and CTA", () => {
    render(<Navigation items={items} />);

    expect(screen.getByRole("link", { name: "Kim jesteśmy?" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Oferta" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Realizacje" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Kontakt" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Porozmawiajmy" })).toBeDefined();
  });
});
