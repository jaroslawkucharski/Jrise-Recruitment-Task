import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => (
    <img {...props} alt={props.alt as string} />
  ),
}));

vi.mock("@/public/logo.svg", () => ({
  default: "/logo.svg",
}));

import { Header } from "./Header";

describe("Header", () => {
  it("renders home link, logo and primary navigation", () => {
    render(<Header />);

    expect(
      screen
        .getByRole("link", { name: "Przejdź na stronę główną" })
        .getAttribute("href"),
    ).toBe("/");
    expect(screen.getByAltText("POSTPRODUKCJADZWIEKU.PL")).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: "Główna nawigacja" }),
    ).toBeDefined();
  });
});
