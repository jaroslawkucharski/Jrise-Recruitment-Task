import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default variant classes", () => {
    render(<Button>Wycen projekt</Button>);

    const button = screen.getByRole("button", { name: "Wycen projekt" });

    expect(button.getAttribute("type")).toBe("button");
    expect(button.classList.contains("border-brand-green")).toBe(true);
    expect(button.classList.contains("bg-brand-green/5")).toBe(true);
    expect(button.classList.contains("text-[16px]")).toBe(true);
  });

  it("supports custom variant, size and className", () => {
    render(
      <Button className="w-full" size={14} type="submit" variant="secondary">
        Wyślij
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Wyślij" });

    expect(button.getAttribute("type")).toBe("submit");
    expect(button.classList.contains("bg-transparent")).toBe(true);
    expect(button.classList.contains("text-[14px]")).toBe(true);
    expect(button.classList.contains("w-full")).toBe(true);
  });
});
