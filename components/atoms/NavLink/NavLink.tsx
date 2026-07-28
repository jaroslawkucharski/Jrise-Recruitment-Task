import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Text } from "@/components/atoms/Text/Text";

type NavLinkProps = {
  isActive?: boolean;
} & ComponentPropsWithoutRef<typeof Link>;

export function NavLink({
  children,
  className,
  href,
  isActive = false,
  ...props
}: NavLinkProps) {
  return (
    <Link
      className={clsx(
        "text-neutral-300 transition-colors hover:text-brand-green active:text-brand-green",
        isActive && "text-brand-green",
        className,
      )}
      href={href}
      {...props}
    >
      <Text size={14} weight={500}>
        {children}
      </Text>
    </Link>
  );
}
