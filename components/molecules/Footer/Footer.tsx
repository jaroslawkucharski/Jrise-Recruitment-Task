"use client";

import { Text } from "@/components/atoms/Text/Text";

type FooterProps = {
  copyright: string;
  privacyHref: string;
  privacyLabel: string;
  rightsLabel: string;
  siteHref: string;
  siteLabel: string;
};

export function Footer({
  copyright,
  privacyHref,
  privacyLabel,
  rightsLabel,
  siteHref,
  siteLabel,
}: FooterProps) {
  return (
    <footer
      className="mt-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-26 text-center"
      data-testid="contact-footer"
    >
      <Text size={14} className="text-neutral-300">
        {copyright}
      </Text>

      <a
        href={siteHref}
        className="text-neutral-300 transition-colors hover:text-neutral-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover"
        target="_blank"
        rel="noreferrer"
        data-testid="contact-site-link"
      >
        <Text size={14} className="text-inherit">
          {siteLabel}
        </Text>
      </a>

      <Text size={14} className="text-neutral-300">
        |
      </Text>

      <Text size={14} className="text-neutral-300">
        {rightsLabel}
      </Text>

      <Text size={14} className="text-neutral-300">
        |
      </Text>

      <a
        href={privacyHref}
        className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-neutral-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover"
        target="_blank"
        rel="noreferrer"
        data-testid="contact-privacy-link"
      >
        <Text size={14} className="text-inherit">
          {privacyLabel}
        </Text>
      </a>
    </footer>
  );
}
