import Image from "next/image";
import { useTranslations } from "next-intl";
import LogoSrc from "@/public/logo.png";

export function Logo() {
  const t = useTranslations();

  return (
    <Image
      src={LogoSrc}
      alt={t("header_logoAlt")}
      height={40}
      loading="eager"
    />
  );
}
