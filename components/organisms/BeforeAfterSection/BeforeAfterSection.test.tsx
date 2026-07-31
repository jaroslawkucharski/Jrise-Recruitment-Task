import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BeforeAfterSection } from "./BeforeAfterSection";
import { beforeAfterSectionData } from "@/data/beforeAfter";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

vi.mock("@/public/rectangle.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("BeforeAfterSection", () => {
  it("renders the section and switches the active group", () => {
    renderWithIntl(<BeforeAfterSection {...beforeAfterSectionData} />);

    expect(
      screen.getByRole("region", { name: t("before_after_section_aria") }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: t("before_after_group_1_title") }),
    ).toBeDefined();

    fireEvent.click(screen.getByTestId("group-element-brand-spot"));

    expect(
      screen.getByRole("heading", { name: t("before_after_group_2_title") }),
    ).toBeDefined();
    expect(
      screen.getByTestId("group-element-brand-spot").getAttribute("aria-selected"),
    ).toBe("true");
  });
});
