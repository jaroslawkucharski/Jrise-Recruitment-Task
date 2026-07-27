import { Logo } from "@/components/atoms/Logo/Logo";
import { Navigation } from "@/components/molecules/Navigation/Navigation";
import { navigationItems } from "@/data/navigation";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 w-full mx-auto flex max-w-300 items-center justify-between gap-6 px-4 py-4 sm:px-6 md:px-12 xl:px-30">
      <Link href={"/"} aria-label={"Przejdź na stronę główną"}>
        <Logo />
      </Link>

      <Navigation items={navigationItems} />
    </header>
  );
}
