export type NavigationItem = {
  href: string;
  label: string;
  linkButton?: boolean;
};

export const navigationItems: NavigationItem[] = [
  { href: "#kimjestem", label: "Kim jestem" },
  { href: "#jakpracuje", label: "Jak pracuję" },
  { href: "#corobie", label: "Co robię" },
  { href: "#mix51", label: "Mix 5.1" },
  { href: "#przedipo", label: "Przed i po" },
  { href: "#porozmawiajmy", label: "Porozmawiajmy", linkButton: true },
];
