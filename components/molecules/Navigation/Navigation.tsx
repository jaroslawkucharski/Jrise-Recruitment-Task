import { NavLink } from "@/components/atoms/NavLink/NavLink";
import type { NavigationItem } from "@/data/navigation";
import { LinkButton } from "@/components/atoms/Button/LinkButton";

type NavMenuProps = {
  items: NavigationItem[];
};

export function Navigation({ items }: NavMenuProps) {
  return (
    <nav aria-label="Główna nawigacja" className="hidden items-center md:flex">
      <ul className="flex w-full items-center justify-end gap-6">
        {items.map(({ href, label, linkButton }) => (
          <li key={href}>
            {linkButton ? (
              <LinkButton href={href} size={14}>
                {label}
              </LinkButton>
            ) : (
              <NavLink href={href}>{label}</NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
