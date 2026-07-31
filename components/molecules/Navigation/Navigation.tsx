import { NavLink } from "@/components/atoms/NavLink/NavLink";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import {
  MobileNavigation,
  type MobileNavigationItem,
} from "@/components/molecules/MobileNavigation/MobileNavigation";
import { MessageKey } from "@/i18n/messages";
import { getAppTranslations } from "@/i18n/translations";
import { getAnchorHref } from "@/utils/getAnchorHref";

export type NavigationItem = {
  hrefKey: MessageKey;
  labelKey: MessageKey;
  linkButton?: boolean;
};

type NavMenuProps = {
  items: NavigationItem[];
};

export async function Navigation({ items }: NavMenuProps) {
  const t = await getAppTranslations();

  const navigationItems: MobileNavigationItem[] = items.map(
    ({ hrefKey, labelKey, linkButton }) => ({
      href: getAnchorHref(t(hrefKey)),
      label: t(labelKey),
      linkButton,
    }),
  );

  return (
    <>
      <nav
        aria-label={t("header_nav_aria")}
        className="hidden items-center md:flex"
        data-testid="primary-navigation"
      >
        <ul className="flex w-full items-center justify-end gap-6">
          {navigationItems.map(({ href, label, linkButton }) => (
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

      <MobileNavigation
        ariaLabel={t("header_nav_aria")}
        closeLabel={t("header_nav_close_aria")}
        items={navigationItems}
        openLabel={t("header_nav_open_aria")}
      />
    </>
  );
}
