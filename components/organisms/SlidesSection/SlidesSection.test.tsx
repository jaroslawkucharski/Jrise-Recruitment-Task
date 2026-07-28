import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SlidesSection } from "./SlidesSection";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { sectionSecondSlides } from "@/data/slides";

vi.mock("@/public/arrow-left.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

vi.mock("@/public/arrow-right.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

vi.mock("@/public/rectangle.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("SlidesSection", () => {
  it("renders the first slide and updates content when navigating", () => {
    renderWithIntl(<SlidesSection {...sectionSecondSlides} />);

    expect(
      screen.getByRole("heading", { name: t(sectionSecondSlides.sectionName) }),
    ).toBeDefined();
    expect(screen.getByTestId("box-title").textContent).toBe(
      t("section_second_slides_slide_1_title"),
    );
    expect(screen.getByTestId("box-step").textContent).toBe("01");
    expect(
      screen.getByTestId("slides-prev-button").hasAttribute("disabled"),
    ).toBe(true);
    expect(
      screen.getByTestId("slides-next-button").hasAttribute("disabled"),
    ).toBe(false);

    fireEvent.click(screen.getByTestId("slides-next-button"));

    expect(screen.getByTestId("box-title").textContent).toBe(
      t("section_second_slides_slide_2_title"),
    );
    expect(screen.getByTestId("box-step").textContent).toBe("02");
  });

  it("disables next button on the last slide", () => {
    renderWithIntl(<SlidesSection {...sectionSecondSlides} />);

    const nextButton = screen.getByTestId("slides-next-button");

    for (let index = 1; index < sectionSecondSlides.slides.length; index += 1) {
      fireEvent.click(nextButton);
    }

    expect(screen.getByTestId("box-title").textContent).toBe(
      t("section_second_slides_slide_5_title"),
    );
    expect(nextButton.hasAttribute("disabled")).toBe(true);
    expect(screen.getByTestId("slides-prev-button").hasAttribute("disabled")).toBe(
      false,
    );
  });

  it("exposes accessible labels for navigation controls", () => {
    renderWithIntl(<SlidesSection {...sectionSecondSlides} />);

    expect(
      screen.getByRole("button", { name: t("section_slides_prev") }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: t("section_slides_next") }),
    ).toBeDefined();
  });

  it("can reverse desktop column order so the image is rendered second", () => {
    renderWithIntl(<SlidesSection {...sectionSecondSlides} reverse />);

    expect(screen.getByTestId("hover-image").className).toContain("lg:order-2");
    expect(screen.getByTestId("hover-image").nextElementSibling?.className).toContain(
      "lg:order-1",
    );
  });
});
