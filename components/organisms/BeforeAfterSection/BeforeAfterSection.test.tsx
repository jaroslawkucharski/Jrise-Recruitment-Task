import { fireEvent, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { BeforeAfterSection } from "./BeforeAfterSection";
import { beforeAfterSectionData } from "@/data/beforeAfter";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

vi.mock("@/public/rectangle.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

vi.mock("@/public/play.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

vi.mock("@/public/pause.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("BeforeAfterSection", () => {
  it("renders translated labels and switches the active group", () => {
    renderWithIntl(<BeforeAfterSection {...beforeAfterSectionData} />);

    expect(
      screen.getByRole("region", { name: t("before_after_section_aria") }),
    ).toBeDefined();
    expect(
      screen.getByRole("tablist", { name: t("before_after_groups_label") }),
    ).toBeDefined();
    expect(
      screen.getByRole("tab", { name: t("before_after_group_1_title") }),
    ).toBeDefined();
    expect(
      within(screen.getByTestId(`audio-player-${t("before_after_label_before")}`))
        .getByRole("button", {
          name: t("before_after_player_play_aria", {
            label: t("before_after_label_before"),
          }),
        }),
    ).toBeDefined();
    expect(
      within(screen.getByTestId(`audio-player-${t("before_after_label_after")}`))
        .getByRole("img", {
          name: t("before_after_waveform_aria", {
            label: t("before_after_label_after"),
          }),
        }),
    ).toBeDefined();

    fireEvent.click(screen.getByTestId("group-element-brand-spot"));

    expect(
      screen.getByRole("tab", { name: t("before_after_group_2_title") }),
    ).toBeDefined();
    expect(
      screen.getByTestId("group-element-brand-spot").getAttribute("aria-selected"),
    ).toBe("true");
  });
});
