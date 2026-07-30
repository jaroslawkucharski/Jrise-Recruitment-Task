import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default variant classes", () => {
    render(<Button>Wycen projekt</Button>);

    const button = screen.getByRole("button", { name: "Wycen projekt" });
    const text = screen.getByText("Wycen projekt");

    expect(button.getAttribute("type")).toBe("button");
    expect(button.classList.contains("border-brand-green")).toBe(true);
    expect(button.classList.contains("bg-brand-green/5")).toBe(true);
    expect(text.classList.contains("text-[16px]")).toBe(true);
    expect(text.classList.contains("font-medium")).toBe(true);
  });

  it("supports custom variant, size and className", () => {
    render(
      <Button className="w-full" size={14} type="submit" variant="secondary">
        Wyślij
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Wyślij" });
    const text = screen.getByText("Wyślij");

    expect(button.getAttribute("type")).toBe("submit");
    expect(button.classList.contains("relative")).toBe(true);
    expect(button.classList.contains("bg-black")).toBe(true);
    expect(button.classList.contains("before:bg-no-repeat")).toBe(true);
    expect(text.classList.contains("text-[14px]")).toBe(true);
    expect(text.classList.contains("font-medium")).toBe(true);
    expect(button.classList.contains("w-full")).toBe(true);
  });

  it("renders square button styles when isSquare is enabled", () => {
    render(<Button isSquare>Akcja</Button>);

    const button = screen.getByRole("button", { name: "Akcja" });

    expect(button.classList.contains("h-[56px]")).toBe(true);
    expect(button.classList.contains("w-[56px]")).toBe(true);
    expect(button.classList.contains("p-0")).toBe(true);
  });
});
