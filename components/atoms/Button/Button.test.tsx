import { screen } from "@testing-library/react";
import { Button } from "./Button";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("Button", () => {
  it("renders with default variant classes", () => {
    renderWithIntl(<Button>{t("home_button")}</Button>);

    const button = screen.getByRole("button", { name: t("home_button") });
    const text = screen.getByText(t("home_button"));

    expect(button.getAttribute("type")).toBe("button");
    expect(button.classList.contains("border-brand-green")).toBe(true);
    expect(button.classList.contains("bg-brand-green/5")).toBe(true);
    expect(text.classList.contains("text-[16px]")).toBe(true);
    expect(text.classList.contains("font-medium")).toBe(true);
  });

  it("supports custom variant, size and className", () => {
    renderWithIntl(
      <Button className="w-full" size={14} type="submit" variant="secondary">
        {t("contact_section_footer_privacy")}
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: t("contact_section_footer_privacy"),
    });
    const text = screen.getByText(t("contact_section_footer_privacy"));

    expect(button.getAttribute("type")).toBe("submit");
    expect(button.classList.contains("relative")).toBe(true);
    expect(button.classList.contains("bg-black")).toBe(true);
    expect(button.classList.contains("before:bg-no-repeat")).toBe(true);
    expect(text.classList.contains("text-[14px]")).toBe(true);
    expect(text.classList.contains("font-medium")).toBe(true);
    expect(button.classList.contains("w-full")).toBe(true);
  });

  it("renders square button styles when isSquare is enabled", () => {
    renderWithIntl(<Button isSquare>{t("section_slides_next")}</Button>);

    const button = screen.getByRole("button", { name: t("section_slides_next") });

    expect(button.classList.contains("h-[56px]")).toBe(true);
    expect(button.classList.contains("w-[56px]")).toBe(true);
    expect(button.classList.contains("p-0")).toBe(true);
  });
});
