import { screen } from "@testing-library/react";
import { ImagesSection } from "./ImagesSection";
import { imagesSectionData } from "@/data/images";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("ImagesSection", () => {
  it("renders the translated anchor id and all image tiles", () => {
    renderWithIntl(<ImagesSection {...imagesSectionData} />);

    expect(screen.getByTestId("images-section").getAttribute("id")).toBe(
      t("anchor_beforeAfter"),
    );
    expect(
      screen.getByRole("region", { name: t("header_nav_beforeAfter") }),
    ).toBeDefined();
    expect(screen.getAllByTestId("hover-image")).toHaveLength(11);
  });
});
