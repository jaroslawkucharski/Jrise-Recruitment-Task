import { screen } from "@testing-library/react";
import { ImagesSection } from "./ImagesSection";
import { imagesSectionData } from "@/data/images";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("ImagesSection", () => {
  it("renders the translated anchor id and all image tiles", () => {
    renderWithIntl(<ImagesSection {...imagesSectionData} />);

    expect(
      screen.getByRole("region", { name: t("images_section_aria") }),
    ).toBeDefined();
    expect(screen.getAllByTestId("hover-image")).toHaveLength(11);
    expect(screen.getAllByAltText(t("images_tile_1_alt"))).toHaveLength(2);
    expect(screen.getAllByAltText(t("images_tile_11_alt"))).toHaveLength(2);
  });
});
