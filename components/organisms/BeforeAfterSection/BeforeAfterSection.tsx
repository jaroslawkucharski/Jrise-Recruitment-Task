"use client";

import { useState } from "react";
import { Heading } from "@/components/atoms/Heading/Heading";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { Text } from "@/components/atoms/Text/Text";
import { AudioWavePlayer } from "@/components/molecules/AudioWavePlayer/AudioWavePlayer";
import { Group } from "@/components/molecules/Group/Group";
import { type MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";
import Rectangle from "@/public/rectangle.svg";

export type BeforeAfterTrack = {
  src: string;
};

export type BeforeAfterGroup = {
  after: BeforeAfterTrack;
  before: BeforeAfterTrack;
  id: string;
  titleKey: MessageKey;
};

export type BeforeAfterSectionProps = {
  ariaLabelKey: MessageKey;
  descriptionKey: MessageKey;
  groups: BeforeAfterGroup[];
  groupsLabelKey: MessageKey;
  idKey: MessageKey;
  sectionNameKey: MessageKey;
};

export function BeforeAfterSection({
  ariaLabelKey,
  descriptionKey,
  groups,
  groupsLabelKey,
  idKey,
  sectionNameKey,
}: BeforeAfterSectionProps) {
  const t = useAppTranslations();

  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id);

  const activeGroup = groups.find((group) => group.id === activeGroupId);

  if (!activeGroup) {
    return null;
  }

  return (
    <section
      id={t(idKey)}
      aria-label={t(ariaLabelKey)}
      className="mx-auto grid w-full max-w-300 items-start gap-10 overflow-hidden bg-neutral-hover px-4 sm:px-6 md:px-12 lg:grid-cols-[minmax(0,580px)_minmax(0,1fr)] lg:gap-10 xl:gap-18 xl:px-0"
      data-testid="before-after-section"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 flex gap-3 items-center">
            <Rectangle aria-hidden="true" />

            <Heading level="h4" weight={500}>
              <RevealText>{t(sectionNameKey)}</RevealText>
            </Heading>
          </div>
        </div>

        <Text size={16}>
          <RevealText>{t(descriptionKey)}</RevealText>
        </Text>

        <Group
          activeGroupId={activeGroup.id}
          items={groups.map(({ id, titleKey }) => ({
            id,
            title: t(titleKey),
          }))}
          label={t(groupsLabelKey)}
          onSelect={setActiveGroupId}
        />
      </div>

      <div
        id={`${activeGroup.id}-panel`}
        role="tabpanel"
        aria-labelledby={activeGroup.id}
        className="flex min-h-full w-full flex-col justify-end items-stretch gap-13.5 lg:items-center"
      >
        <AudioWavePlayer
          key={`${activeGroup.id}-before`}
          label={t("before_after_label_before")}
          src={activeGroup.before.src}
        />

        <AudioWavePlayer
          key={`${activeGroup.id}-after`}
          label={t("before_after_label_after")}
          src={activeGroup.after.src}
        />
      </div>
    </section>
  );
}
