"use client";

import { Fragment, type ComponentType, type SVGProps, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button/Button";
import { Heading } from "@/components/atoms/Heading/Heading";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { Text } from "@/components/atoms/Text/Text";
import { ContactFormModal } from "@/components/organisms/ContactFormModal/ContactFormModal";
import { Footer } from "@/components/molecules/Footer/Footer";
import { ContactLink } from "@/components/molecules/ContactLink/ContactLink";
import { SocialLink } from "@/components/molecules/SocialLink/SocialLink";
import { type MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";
import Contact from "@/public/contact.svg";
import Envelope from "@/public/envelope.svg";
import Facebook from "@/public/facebook.svg";
import Instagram from "@/public/instagram.svg";

export type ContactPhone = {
  hrefKey: MessageKey;
  valueKey: MessageKey;
};

export type ContactSocialLink = {
  hrefKey: MessageKey;
  iconAltKey: MessageKey;
  labelKey: MessageKey;
  testId: string;
};

export type ContactSectionProps = {
  ariaLabelKey: MessageKey;
  ctaLabelKey: MessageKey;
  backgroundAltKey: MessageKey;
  descriptionKey: MessageKey;
  emailKey: MessageKey;
  footerCopyrightKey: MessageKey;
  footerPrivacyHrefKey: MessageKey;
  footerPrivacyKey: MessageKey;
  footerRightsKey: MessageKey;
  idKey: MessageKey;
  nameKey: MessageKey;
  phones: ContactPhone[];
  siteHrefKey: MessageKey;
  siteLabelKey: MessageKey;
  socials: ContactSocialLink[];
  titleKey: MessageKey;
};

export function ContactSection({
  ariaLabelKey,
  ctaLabelKey,
  backgroundAltKey,
  descriptionKey,
  emailKey,
  footerCopyrightKey,
  footerPrivacyHrefKey,
  footerPrivacyKey,
  footerRightsKey,
  idKey,
  nameKey,
  phones,
  siteHrefKey,
  siteLabelKey,
  socials,
  titleKey,
}: ContactSectionProps) {
  const t = useAppTranslations();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const socialIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
    Facebook,
    Instagram,
  ];

  return (
    <section
      id={t(idKey)}
      aria-label={t(ariaLabelKey)}
      className="relative overflow-hidden bg-neutral-hover"
      data-testid="contact-section"
    >
      <Image
        src="/contact_section.webp"
        alt={t(backgroundAltKey)}
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-neutral-hover"
      />

      <div className="relative mx-auto flex w-full max-w-300 flex-col items-center px-4 pt-18 pb-8 text-center sm:px-6 md:px-12 lg:pt-24 xl:px-0">
        <div className="flex w-full max-w-206 flex-col items-center gap-10 lg:gap-12">
          <Heading level="h2" weight={400} className="text-[64px]!">
            <RevealText>{t(titleKey)}</RevealText>
          </Heading>

          <div className="w-full bg-black/58 px-6 py-6 shadow-[0_0_34px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-10 sm:py-7 relative isolate border border-[rgba(98,104,104,0.38)] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(90deg,transparent_0%,transparent_62%,rgba(0,255,0,0.88)_90%,rgba(0,255,0,0.22)_100%),linear-gradient(180deg,rgba(0,255,0,0.72)_0%,rgba(0,255,0,0)_28%),linear-gradient(90deg,rgba(0,255,0,0.78)_0%,rgba(0,255,0,0)_30%),linear-gradient(180deg,rgba(0,255,0,0)_72%,rgba(0,255,0,0.72)_100%)] before:bg-size-[100%_1px,1px_100%,100%_1px,1px_100%] before:bg-position-[top,right,bottom,left] before:bg-no-repeat">
            <Text size={16}>
              <RevealText>{t(descriptionKey)}</RevealText>
            </Text>
          </div>

          <Button
            aria-controls="contact-form-modal"
            aria-expanded={isContactFormOpen}
            aria-haspopup="dialog"
            className="w-full sm:w-auto"
            onClick={() => setIsContactFormOpen(true)}
            data-testid="contact-cta-button"
          >
            <RevealText>{t(ctaLabelKey)}</RevealText>
          </Button>
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
                <div key={phone.hrefKey} className="flex items-center gap-1">
                  <ContactLink
                    href={t(phone.hrefKey)}
                    icon={index === 0 ? Contact : undefined}
                    iconAlt={
                      index === 0
                        ? t("contact_section_phone_icon_alt")
                        : undefined
                    }
                    label={t(phone.valueKey)}
                    testId={`contact-phone-${index}`}
                  />

                  {index < phones.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden text-neutral-300 sm:inline"
                    >
                      <RevealText>|</RevealText>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <ContactLink
              href={`mailto:${t(emailKey)}`}
              icon={Envelope}
              iconAlt={t("contact_section_email_icon_alt")}
              label={t(emailKey)}
              testId="contact-email-link"
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-7">
            {socials.map((social, index) => {
              const Icon = socialIcons[index];

              if (!Icon) {
                return null;
              }

              return (
                <Fragment key={social.hrefKey}>
                  <SocialLink
                    href={t(social.hrefKey)}
                    icon={Icon}
                    iconAlt={t(social.iconAltKey)}
                    label={t(social.labelKey)}
                    testId={social.testId}
                  />

                  {index < socials.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-6 w-px bg-neutral-300/65"
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </address>

        <Footer
          copyright={t(footerCopyrightKey)}
          siteHref={t(siteHrefKey)}
          siteLabel={t(siteLabelKey)}
          rightsLabel={t(footerRightsKey)}
          privacyHref={t(footerPrivacyHrefKey)}
          privacyLabel={t(footerPrivacyKey)}
        />
      </div>

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </section>
  );
}
