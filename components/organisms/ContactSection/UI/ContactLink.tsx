"use client";

import Image from "next/image";
import { Text } from "@/components/atoms/Text/Text";

type ContactLinkProps = {
  href: string;
  iconSrc?: string;
  label: string;
  testId: string;
};

export function ContactLink({
  href,
  iconSrc,
  label,
  testId,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-2 py-[8.5px] text-neutral-0 transition-colors hover:text-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover"
      data-testid={testId}
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          aria-hidden="true"
          width={18}
          height={18}
        />
      ) : null}

      <Text size={14} weight={700} className="text-inherit">
        {label}
      </Text>
    </a>
  );
}
