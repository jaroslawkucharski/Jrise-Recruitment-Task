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

    const ctaLink = screen.getByTestId("contact-cta-link");

    expect(ctaLink.getAttribute("href")).toBe(contactSectionData.ctaHref);
    expect(ctaLink.classList.contains("relative")).toBe(true);
    expect(ctaLink.classList.contains("bg-black")).toBe(true);

    expect(screen.getByTestId("contact-phone-0").getAttribute("href")).toBe(
      contactSectionData.phones[0]?.href,
    );
    expect(screen.getByTestId("contact-phone-1").getAttribute("href")).toBe(
      contactSectionData.phones[1]?.href,
    );
    expect(screen.getByTestId("contact-email-link").getAttribute("href")).toBe(
      `mailto:${contactSectionData.email}`,
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
      contactSectionData.siteHref,
    );
    expect(
      screen.getByTestId("contact-privacy-link").getAttribute("href"),
    ).toBe(contactSectionData.footerPrivacyHref);
  });
});
