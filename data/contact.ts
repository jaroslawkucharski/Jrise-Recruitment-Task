import { type ContactSectionProps } from "@/components/organisms/ContactSection/ContactSection";

export const contactSectionData: ContactSectionProps = {
  idKey: "anchor_contact",
  ariaLabelKey: "contact_section_aria",
  titleKey: "contact_section_title",
  descriptionKey: "contact_section_description",
  ctaLabelKey: "contact_section_cta",
  ctaHref: "mailto:k.bak@dzwiekwfilmie.pl",
  nameKey: "contact_section_name",
  phones: [
    {
      href: "tel:+48601234927",
      value: "+48 601 234 927",
    },
    {
      href: "tel:+48501555307",
      value: "+48 501 555 307",
    },
  ],
  email: "k.bak@dzwiekwfilmie.pl",
  socials: [
    {
      href: "https://www.facebook.com/",
      iconSrc: "/facebook.svg",
      labelKey: "contact_section_social_facebook_aria",
      testId: "contact-social-facebook",
    },
    {
      href: "https://www.instagram.com/",
      iconSrc: "/instagram.svg",
      labelKey: "contact_section_social_instagram_aria",
      testId: "contact-social-instagram",
    },
  ],
  siteHref: "https://dzwiekwfilmie.pl/",
  siteLabelKey: "contact_section_footer_site",
  footerCopyrightKey: "contact_section_footer_copyright",
  footerRightsKey: "contact_section_footer_rights",
  footerPrivacyKey: "contact_section_footer_privacy",
  footerPrivacyHref: "https://dzwiekwfilmie.pl/polityka-prywatnosci-i-cookies/",
};
