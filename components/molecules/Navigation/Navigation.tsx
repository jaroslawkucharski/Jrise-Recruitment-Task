import { NavLink } from "@/components/atoms/NavLink/NavLink";
import type { NavigationItem } from "@/data/navigation";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import { useTranslations } from "next-intl";

type NavMenuProps = {
  items: NavigationItem[];
};

export function Navigation({ items }: NavMenuProps) {
  const t = useTranslations();

  return (
    <nav
      aria-label={t("header_nav_aria")}
      className="hidden items-center md:flex"
    >
      <ul className="flex w-full items-center justify-end gap-6">
        {items.map(({ href, labelKey, linkButton }) => (
          <li key={href}>
            {linkButton ? (
              <LinkButton href={href} size={14}>
                {t(labelKey)}
              </LinkButton>
            ) : (
              <NavLink href={href}>{t(labelKey)}</NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
