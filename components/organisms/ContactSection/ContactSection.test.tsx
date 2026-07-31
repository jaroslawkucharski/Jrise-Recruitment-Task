import { screen } from "@testing-library/react";
import { ContactSection } from "./ContactSection";
import { contactSectionData } from "@/data/contact";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("ContactSection", () => {
  it("renders translated content, contact links and footer links", () => {
    renderWithIntl(<ContactSection {...contactSectionData} />);

    expect(
      screen.getByRole("region", { name: t("contact_section_aria") }),
    ).toBeDefined();
    expect(screen.getByTestId("contact-section").getAttribute("id")).toBe(
      t(contactSectionData.idKey),
    );
    expect(
      screen.getByRole("heading", { name: t("contact_section_title") }),
    ).toBeDefined();
    expect(
      screen.getByAltText(t("contact_section_background_alt")),
    ).toBeDefined();

    const ctaLink = screen.getByTestId("contact-cta-link");

    expect(ctaLink.getAttribute("href")).toBe(t(contactSectionData.ctaHrefKey));
    expect(ctaLink.classList.contains("relative")).toBe(true);
    expect(ctaLink.classList.contains("bg-black")).toBe(true);

    expect(screen.getByTestId("contact-phone-0").getAttribute("href")).toBe(
      t(contactSectionData.phones[0]?.hrefKey ?? "contact_section_phone_1_href"),
    );
    expect(screen.getByTestId("contact-phone-1").getAttribute("href")).toBe(
      t(contactSectionData.phones[1]?.hrefKey ?? "contact_section_phone_2_href"),
    );
    expect(screen.getByText(t("contact_section_phone_1"))).toBeDefined();
    expect(screen.getByText(t("contact_section_phone_2"))).toBeDefined();
    expect(screen.getByText(t(contactSectionData.emailKey))).toBeDefined();
    expect(screen.getByTestId("contact-email-link").getAttribute("href")).toBe(
      `mailto:${t(contactSectionData.emailKey)}`,
    );

    expect(
      screen.getByRole("link", {
        name: t("contact_section_social_facebook_aria"),
      }),
    ).toBeDefined();
    expect(
      screen.getByRole("link", {
        name: t("contact_section_social_instagram_aria"),
      }),
    ).toBeDefined();

    expect(screen.getByTestId("contact-footer")).toBeDefined();
    expect(screen.getByTestId("contact-site-link").getAttribute("href")).toBe(
      t(contactSectionData.siteHrefKey),
    );
    expect(
      screen.getByTestId("contact-privacy-link").getAttribute("href"),
    ).toBe(t(contactSectionData.footerPrivacyHrefKey));
  });
});
