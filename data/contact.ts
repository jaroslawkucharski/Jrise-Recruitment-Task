import { type ContactSectionProps } from "@/components/organisms/ContactSection/ContactSection";

export const contactSectionData: ContactSectionProps = {
  idKey: "anchor_contact",
  ariaLabelKey: "contact_section_aria",
  titleKey: "contact_section_title",
  backgroundAltKey: "contact_section_background_alt",
  descriptionKey: "contact_section_description",
  ctaLabelKey: "contact_section_cta",
  nameKey: "contact_section_name",
  phones: [
    {
      hrefKey: "contact_section_phone_1_href",
      valueKey: "contact_section_phone_1",
    },
    {
      hrefKey: "contact_section_phone_2_href",
      valueKey: "contact_section_phone_2",
    },
  ],
  emailKey: "contact_section_email",
  socials: [
    {
      hrefKey: "contact_section_social_facebook_href",
      iconAltKey: "contact_section_social_facebook_icon_alt",
      labelKey: "contact_section_social_facebook_aria",
      testId: "contact-social-facebook",
    },
    {
      hrefKey: "contact_section_social_instagram_href",
      iconAltKey: "contact_section_social_instagram_icon_alt",
      labelKey: "contact_section_social_instagram_aria",
      testId: "contact-social-instagram",
    },
  ],
  siteHrefKey: "contact_section_footer_site_href",
  siteLabelKey: "contact_section_footer_site",
  footerCopyrightKey: "contact_section_footer_copyright",
  footerRightsKey: "contact_section_footer_rights",
  footerPrivacyKey: "contact_section_footer_privacy",
  footerPrivacyHrefKey: "contact_section_footer_privacy_href",
};
