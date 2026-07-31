"use client";

import Image from "next/image";
import { Heading } from "@/components/atoms/Heading/Heading";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { Text } from "@/components/atoms/Text/Text";
import { type MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";
import { ContactFooter } from "./UI/ContactFooter";
import { ContactLink } from "./UI/ContactLink";
import { SocialLink } from "./UI/SocialLink";

export type ContactPhone = {
  href: string;
  value: string;
};

export type ContactSocialLink = {
  href: string;
  iconSrc: string;
  labelKey: MessageKey;
  testId: string;
};

export type ContactSectionProps = {
  ariaLabelKey: MessageKey;
  ctaHref: string;
  ctaLabelKey: MessageKey;
  descriptionKey: MessageKey;
  email: string;
  footerCopyrightKey: MessageKey;
  footerPrivacyHref: string;
  footerPrivacyKey: MessageKey;
  footerRightsKey: MessageKey;
  idKey: MessageKey;
  nameKey: MessageKey;
  phones: ContactPhone[];
  siteHref: string;
  siteLabelKey: MessageKey;
  socials: ContactSocialLink[];
  titleKey: MessageKey;
};

export function ContactSection({
  ariaLabelKey,
  ctaHref,
  ctaLabelKey,
  descriptionKey,
  email,
  footerCopyrightKey,
  footerPrivacyHref,
  footerPrivacyKey,
  footerRightsKey,
  idKey,
  nameKey,
  phones,
  siteHref,
  siteLabelKey,
  socials,
  titleKey,
}: ContactSectionProps) {
  const t = useAppTranslations();

  return (
    <section
      id={t(idKey)}
      aria-label={t(ariaLabelKey)}
      className="relative overflow-hidden bg-neutral-hover"
      data-testid="contact-section"
    >
      <Image
        src="/contact_section.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.56)_30%,rgba(0,0,0,0.8)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[min(100svh,980px)] w-full max-w-300 flex-col items-center px-4 pt-18 pb-8 text-center sm:px-6 md:px-12 lg:pt-24 xl:px-0">
        <div className="flex w-full max-w-[824px] flex-col items-center gap-10 lg:gap-12">
          <Heading
            level="h2"
            weight={400}
            className="text-[54px] leading-none sm:text-[68px] lg:text-[76px]"
          >
            <RevealText>{t(titleKey)}</RevealText>
          </Heading>

          <div className="w-full border border-brand-green bg-black/58 px-6 py-6 shadow-[0_0_34px_rgba(0,0,0,0.55)] backdrop-blur-[8px] sm:px-10 sm:py-7">
            <p>
              <Text
                size={16}
                className="leading-[1.45] text-neutral-0 sm:text-[18px]"
              >
                <RevealText>{t(descriptionKey)}</RevealText>
              </Text>
            </p>
          </div>

          <LinkButton
            href={ctaHref}
            variant="secondary"
            className="w-full sm:w-auto"
            data-testid="contact-cta-link"
          >
            <RevealText>{t(ctaLabelKey)}</RevealText>
          </LinkButton>
        </div>

        <address className="mt-14 flex not-italic flex-col items-center gap-5 lg:mt-16">
          <Heading
            level="h3"
            weight={700}
            className="text-brand-green sm:text-[34px] lg:text-[40px]"
          >
            <RevealText>{t(nameKey)}</RevealText>
          </Heading>

          <div>
            <div className="flex flex-wrap items-center justify-center gap-x-1">
              {phones.map((phone, index) => (
                <div key={phone.href} className="flex items-center gap-1">
                  <ContactLink
                    href={phone.href}
                    iconSrc={index === 0 ? "/contact.svg" : undefined}
                    label={phone.value}
                    testId={`contact-phone-${index}`}
                  />

                  {index < phones.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden text-neutral-300 sm:inline"
                    >
                      |
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <ContactLink
              href={`mailto:${email}`}
              iconSrc="/envelope.svg"
              label={email}
              testId="contact-email-link"
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-7">
            <SocialLink
              href={socials[0]?.href ?? "#"}
              iconSrc={socials[0]?.iconSrc ?? "/facebook.svg"}
              label={socials[0] ? t(socials[0].labelKey) : ""}
              testId={socials[0]?.testId ?? "contact-social-0"}
            />

            <span aria-hidden="true" className="h-6 w-px bg-neutral-300/65" />

            <SocialLink
              href={socials[1]?.href ?? "#"}
              iconSrc={socials[1]?.iconSrc ?? "/instagram.svg"}
              label={socials[1] ? t(socials[1].labelKey) : ""}
              testId={socials[1]?.testId ?? "contact-social-1"}
            />
          </div>
        </address>

        <ContactFooter
          copyright={t(footerCopyrightKey)}
          siteHref={siteHref}
          siteLabel={t(siteLabelKey)}
          rightsLabel={t(footerRightsKey)}
          privacyHref={footerPrivacyHref}
          privacyLabel={t(footerPrivacyKey)}
        />
      </div>
    </section>
  );
}
