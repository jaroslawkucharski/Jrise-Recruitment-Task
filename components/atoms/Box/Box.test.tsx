import { screen } from "@testing-library/react";
import { Box } from "./Box";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("Box", () => {
  it("renders translated title, description and formatted step", () => {
    renderWithIntl(
      <Box
        currentStep={3}
        titleKey="section_second_slides_slide_1_title"
        descriptionKey="section_second_slides_slide_1_description"
      />,
    );

    expect(screen.getByTestId("box")).toBeDefined();
    expect(screen.getByTestId("box-title").textContent).toBe(
      t("section_second_slides_slide_1_title"),
    );
    expect(screen.getByTestId("box-description").textContent).toContain(
      t("section_second_slides_slide_1_description"),
    );
    expect(screen.getByTestId("box-step").textContent).toBe("03");
    expect(screen.getByTestId("box-step").getAttribute("aria-label")).toBe(
      `${t("box_step_label")} 03`,
    );
  });

  it("can render without title and without background padding", () => {
    renderWithIntl(
      <Box
        descriptionKey="section_second_slides_slide_2_description"
        hasBackground={false}
        padding={0}
      />,
    );

    const box = screen.getByTestId("box");
    const description = screen.getByTestId("box-description");

    expect(screen.queryByTestId("box-title")).toBeNull();
    expect(screen.queryByTestId("box-step")).toBeNull();
    expect(box.classList.contains("bg-neutral-800")).toBe(false);
    expect(box.classList.contains("p-[0px]")).toBe(true);
    expect(description.classList.contains("text-neutral-0")).toBe(true);
  });

  it("renders description paragraphs with spacing between them", () => {
    renderWithIntl(
      <Box
        descriptionKey="section_first_slides_slide_1_description"
        hasBackground={false}
        padding={0}
      />,
    );

    const description = screen.getByTestId("box-description");
    const paragraphs = description.querySelectorAll("p");

    expect(paragraphs).toHaveLength(2);
    expect(description.className).toContain("[&_p+p]:mt-6");
  });

  it("renders a title without the step indicator when currentStep is missing", () => {
    renderWithIntl(
      <Box
        titleKey="section_second_slides_slide_2_title"
        descriptionKey="section_second_slides_slide_2_description"
      />,
    );

    expect(screen.getByTestId("box-title").textContent).toBe(
      t("section_second_slides_slide_2_title"),
    );
    expect(screen.queryByTestId("box-step")).toBeNull();
  });
});
