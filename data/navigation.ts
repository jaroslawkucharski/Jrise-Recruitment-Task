export type NavigationItem = {
  href: string;
  labelKey: string;
  linkButton?: boolean;
};

export const navigationItems: NavigationItem[] = [
  { href: "#kimjestem", labelKey: "header_nav_about" },
  { href: "#jakpracuje", labelKey: "header_nav_process" },
  { href: "#corobie", labelKey: "header_nav_services" },
  { href: "#mix51", labelKey: "header_nav_mix51" },
  { href: "#przedipo", labelKey: "header_nav_beforeAfter" },
  { href: "#porozmawiajmy", labelKey: "header_nav_contact", linkButton: true },
];
