import { Logo } from "@/components/atoms/Logo/Logo";
import { Navigation } from "@/components/molecules/Navigation/Navigation";
import { navigationItems } from "@/data/navigation";
import { getAppTranslations } from "@/i18n/translations";
import Link from "next/link";

export async function Header() {
  const t = await getAppTranslations();

  return (
    <header className="sticky top-0 z-10 w-full bg-neutral-hover/70 shadow-xl/30 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between gap-6 px-4 py-4 sm:px-6 md:px-12 xl:px-0">
        <Link href={"/"} aria-label={t("header_homeAria")}>
          <Logo />
        </Link>

        <Navigation items={navigationItems} />
      </div>
    </header>
  );
}
