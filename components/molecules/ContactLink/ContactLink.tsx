"use client";

import Image from "next/image";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { Text } from "@/components/atoms/Text/Text";

type ContactLinkProps = {
  href: string;
  iconAlt?: string;
  iconSrc?: string;
  label: string;
  testId: string;
};

export function ContactLink({
  href,
  iconAlt,
  iconSrc,
  label,
  testId,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center gap-2 px-2 py-[8.5px] text-neutral-0 transition-colors hover:text-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover"
      data-testid={testId}
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={iconAlt ?? label}
          width={18}
          height={18}
        />
      ) : null}

      <Text size={14} weight={700} className="text-inherit">
        <RevealText>{label}</RevealText>
      </Text>
    </a>
  );
}
