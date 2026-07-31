import { fireEvent, screen, within } from "@testing-library/react";
import { BeforeAfterSection } from "./BeforeAfterSection";
import { beforeAfterSectionData } from "@/data/beforeAfter";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("BeforeAfterSection", () => {
  it("renders translated content with the first group selected by default", () => {
    renderWithIntl(<BeforeAfterSection {...beforeAfterSectionData} />);

    const section = screen.getByRole("region", {
      name: t("before_after_section_aria"),
    });

    expect(section).toBeDefined();
    expect(screen.getByTestId("before-after-section").getAttribute("id")).toBe(
      t(beforeAfterSectionData.idKey),
    );
    expect(
      screen.getByRole("heading", {
        name: t("before_after_section_title"),
      }),
    ).toBeDefined();
    expect(
      screen.getByText(t("before_after_section_description")),
    ).toBeDefined();
    expect(
      screen.getByRole("tablist", { name: t("before_after_groups_label") }),
    ).toBeDefined();

    const firstTab = screen.getByTestId("group-element-documentary-dialogue");

    expect(firstTab.getAttribute("aria-selected")).toBe("true");
    expect(firstTab.getAttribute("aria-controls")).toBe(
      "documentary-dialogue-panel",
    );
    expect(screen.getByRole("tabpanel").getAttribute("id")).toBe(
      "documentary-dialogue-panel",
    );
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      "documentary-dialogue",
    );
    expect(
      within(screen.getByTestId(`audio-player-${t("before_after_label_before")}`))
        .getByRole("button", {
          name: t("before_after_player_play_aria", {
            label: t("before_after_label_before"),
          }),
        }),
    ).toBeDefined();
    expect(
      within(screen.getByTestId(`audio-player-${t("before_after_label_before")}`))
        .getByTestId("audio-player-toggle")
        .hasAttribute("disabled"),
    ).toBe(true);
    expect(
      within(screen.getByTestId(`audio-player-${t("before_after_label_after")}`))
        .getByRole("img", {
          name: t("before_after_waveform_aria", {
            label: t("before_after_label_after"),
          }),
        }),
    ).toBeDefined();
  });

  it("switches the active group and updates tabpanel wiring", () => {
    renderWithIntl(<BeforeAfterSection {...beforeAfterSectionData} />);

    fireEvent.click(screen.getByTestId("group-element-brand-spot"));

    expect(
      screen.getByRole("tab", { name: t("before_after_group_2_title") }),
    ).toBeDefined();
    expect(
      screen.getByTestId("group-element-brand-spot").getAttribute("aria-selected"),
    ).toBe("true");
    expect(
      screen.getByTestId("group-element-documentary-dialogue").getAttribute(
        "aria-selected",
      ),
    ).toBe("false");
    expect(screen.getByRole("tabpanel").getAttribute("id")).toBe(
      "brand-spot-panel",
    );
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      "brand-spot",
    );
  });

  it("renders all translated group tabs from data", () => {
    renderWithIntl(<BeforeAfterSection {...beforeAfterSectionData} />);

    beforeAfterSectionData.groups.forEach((group) => {
      expect(
        screen.getByRole("tab", { name: t(group.titleKey) }),
      ).toBeDefined();
    });
  });

  it("returns null when there is no active group to render", () => {
    renderWithIntl(
      <BeforeAfterSection
        {...beforeAfterSectionData}
        groups={[]}
      />,
    );

    expect(screen.queryByTestId("before-after-section")).toBeNull();
  });
});
