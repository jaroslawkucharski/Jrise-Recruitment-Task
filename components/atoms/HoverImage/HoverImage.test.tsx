import { screen } from "@testing-library/react";
import { HoverImage } from "./HoverImage";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("HoverImage", () => {
  it("renders base and hover image variants", () => {
    renderWithIntl(
      <HoverImage
        alt={t("section_third_slides_slide_1_alt")}
        hoverAlt={t("section_third_slides_slide_2_alt")}
        src="/base.webp"
        srcDimensions={{ width: 1160, height: 944 }}
        hoverSrc="/hover.webp"
        sizes="100vw"
        preload
      />,
    );

    expect(screen.getByTestId("hover-image")).toBeDefined();
    expect(screen.getByAltText(t("section_third_slides_slide_1_alt"))).toBeDefined();
    expect(
      decodeURIComponent(
        screen.getByTestId("hover-image-hover").getAttribute("src") ?? "",
      ),
    ).toContain("/hover.webp");
    expect(screen.getByTestId("hover-image-hover").getAttribute("alt")).toBe(
      t("section_third_slides_slide_2_alt"),
    );
  });

  it("does not render hover image when hoverSrc is missing", () => {
    renderWithIntl(
      <HoverImage
        alt={t("section_third_slides_slide_3_alt")}
        src="/base.webp"
        srcDimensions={{ width: 1160, height: 944 }}
        sizes="100vw"
      />,
    );

    expect(screen.queryByTestId("hover-image-hover")).toBeNull();
  });
});
