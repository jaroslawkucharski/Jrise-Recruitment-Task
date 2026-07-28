import Image from "next/image";
import { useTranslations } from "next-intl";
import LogoSrc from "@/public/logo.png";

export function Logo() {
  const t = useTranslations();

  return (
    <Image
      src={LogoSrc}
      alt={t("header_logoAlt")}
      width={89}
      height={40}
      loading="eager"
      data-testid="logo"
    />
  );
}
