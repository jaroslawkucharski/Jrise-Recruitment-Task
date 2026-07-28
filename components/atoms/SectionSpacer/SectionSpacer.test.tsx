import { render, screen } from "@testing-library/react";
import { SectionSpacer } from "./SectionSpacer";

describe("SectionSpacer", () => {
  it("renders a single responsive spacer height between sections", () => {
    render(<SectionSpacer />);

    const spacer = screen.getByTestId("section-spacer");

    expect(spacer.getAttribute("aria-hidden")).toBe("true");
    expect(spacer.className).toContain("h-15");
    expect(spacer.className).toContain("md:h-30");
    expect(spacer.className).toContain("xl:h-60");
  });
});
