"use client";

import type { ComponentType, SVGProps } from "react";

type SocialLinkProps = {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconAlt: string;
  label: string;
  testId: string;
};

export function SocialLink({
  href,
  icon: Icon,
  iconAlt,
  label,
  testId,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center text-neutral-0 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-hover"
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
    >
      <Icon role="img" aria-label={iconAlt} />
    </a>
  );
}
