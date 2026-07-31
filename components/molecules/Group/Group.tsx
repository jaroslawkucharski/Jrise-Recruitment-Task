"use client";

import { GroupElement } from "@/components/molecules/GroupElement/GroupElement";

export type GroupItem = {
  id: string;
  title: string;
};

type GroupProps = {
  activeGroupId: string;
  items: GroupItem[];
  label: string;
  onSelect: (groupId: string) => void;
};

export function Group({ activeGroupId, items, label, onSelect }: GroupProps) {
  return (
    <div
      aria-label={label}
      className="flex flex-col gap-3"
      role="tablist"
      aria-orientation="vertical"
    >
      {items.map((item) => {
        const isActive = item.id === activeGroupId;

        return (
          <GroupElement
            key={item.id}
            id={item.id}
            isActive={isActive}
            title={item.title}
            role="tab"
            aria-controls={`${item.id}-panel`}
            aria-selected={isActive}
            onClick={() => onSelect(item.id)}
            data-testid={`group-element-${item.id}`}
          />
        );
      })}
    </div>
  );
}
