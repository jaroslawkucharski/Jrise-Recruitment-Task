import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type NavLinkProps = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

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
        "text-[14px] font-medium text-neutral-300 transition-colors hover:text-brand-green active:text-brand-green",
        isActive && "text-brand-green",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
