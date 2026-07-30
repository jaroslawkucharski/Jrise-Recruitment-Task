import Image from "next/image";
import { getAppTranslations } from "@/i18n/translations";
import LogoSrc from "@/public/logo.png";

export async function Logo() {
  const t = await getAppTranslations();

  return (
    <Image
      src={LogoSrc}
      alt={t("meta_title")}
      width={89}
      height={40}
      preload
      data-testid="logo"
    />
  );
}
