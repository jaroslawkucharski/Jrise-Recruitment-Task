import Image from "next/image";
import HeroImage from "@/public/hero.webp";
import Logo01 from "@/public/logo_01.webp";
import Logo02 from "@/public/logo_02.png";
import Logo03 from "@/public/logo_03.webp";
import Logo04 from "@/public/logo_04.png";
import Logo05 from "@/public/logo_05.webp";
import { Heading } from "@/components/atoms/Heading/Heading";
import { getAppTranslations } from "@/i18n/translations";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { getAnchorHref } from "@/utils/getAnchorHref";

export async function HeroSection() {
  const t = await getAppTranslations();

  return (
    <section
      aria-label={t("home_section_aria")}
      className="relative flex min-h-[calc(100svh-72px)] w-full items-center justify-center overflow-hidden bg-neutral-hover"
      data-testid="hero-section"
    >
      <Image
        src={HeroImage}
        alt=""
        fill
        preload
        placeholder="blur"
        quality={70}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-neutral-hover"
      />

      <div className="relative flex w-full items-center justify-center px-6">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-25 text-center">
          <div className="flex w-full max-w-2xl flex-col items-center gap-6">
            <Heading className="leading-[114%]">
              <RevealText>{t("home_heading")}</RevealText>
            </Heading>

            <Heading level="h5" className="leading-[120%]">
              <RevealText>{t("home_description")}</RevealText>
            </Heading>

            <LinkButton
              variant="secondary"
              href={getAnchorHref(t("anchor_contact"))}
              data-testid="hero-cta-link"
            >
              <RevealText>{t("home_button")}</RevealText>
            </LinkButton>
          </div>

          <div
            aria-hidden="true"
            className="flex w-full flex-wrap items-center justify-center gap-10"
          >
            <Image src={Logo01} alt="" width={63} height={32} preload />

            <Image src={Logo02} alt="" width={30} height={32} preload />

            <Image src={Logo03} alt="" width={97} height={32} preload />

            <Image src={Logo04} alt="" width={58} height={32} preload />

            <Image src={Logo05} alt="" width={80} height={32} preload />
          </div>
        </div>
      </div>
    </section>
  );
}
