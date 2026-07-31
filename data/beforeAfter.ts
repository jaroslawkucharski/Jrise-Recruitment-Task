import { type BeforeAfterSectionProps } from "@/components/organisms/BeforeAfterSection/BeforeAfterSection";

export const beforeAfterSectionData: BeforeAfterSectionProps = {
  idKey: "anchor_beforeAfter",
  ariaLabelKey: "before_after_section_aria",
  sectionNameKey: "before_after_section_title",
  descriptionKey: "before_after_section_description",
  groupsLabelKey: "before_after_groups_label",
  groups: [
    {
      id: "documentary-dialogue",
      titleKey: "before_after_group_1_title",
      before: {
        src: "/audio/example_before.wav",
      },
      after: {
        src: "/audio/example_after.wav",
      },
    },
    {
      id: "brand-spot",
      titleKey: "before_after_group_2_title",
      before: {
        src: "/audio/example_before.wav",
      },
      after: {
        src: "/audio/example_after.wav",
      },
    },
    {
      id: "social-cut",
      titleKey: "before_after_group_3_title",
      before: {
        src: "/audio/example_before.wav",
      },
      after: {
        src: "/audio/example_after.wav",
      },
    },
    {
      id: "interior-scene",
      titleKey: "before_after_group_4_title",
      before: {
        src: "/audio/example_before.wav",
      },
      after: {
        src: "/audio/example_after.wav",
      },
    },
  ],
};
