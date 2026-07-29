import { NavLink } from "@/components/atoms/NavLink/NavLink";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import { MessageKey } from "@/i18n/messages";
import { getAppTranslations } from "@/i18n/translations";

export type NavigationItem = {
  href: string;
  label: MessageKey;
  linkButton?: boolean;
};

type NavMenuProps = {
  items: NavigationItem[];
};

export async function Navigation({ items }: NavMenuProps) {
  const { t } = await getAppTranslations();

  return (
    <nav
      aria-label={t("header_nav_aria")}
      className="hidden items-center md:flex"
    >
      <ul className="flex w-full items-center justify-end gap-6">
        {items.map(({ href, label, linkButton }) => (
          <li key={href}>
            {linkButton ? (
              <LinkButton href={href} size={14}>
                {t(label)}
              </LinkButton>
            ) : (
              <NavLink href={href}>{t(label)}</NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
