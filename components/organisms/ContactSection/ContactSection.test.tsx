import { fireEvent, screen, within } from "@testing-library/react";
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

    const ctaButton = screen.getByTestId("contact-cta-button");

    expect(ctaButton.getAttribute("aria-haspopup")).toBe("dialog");

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
      within(screen.getByTestId("contact-phone-0")).getByRole("img", {
        name: t("contact_section_phone_icon_alt"),
      }),
    ).toBeDefined();
    expect(
      within(screen.getByTestId("contact-email-link")).getByRole("img", {
        name: t("contact_section_email_icon_alt"),
      }),
    ).toBeDefined();
    expect(
      within(screen.getByTestId("contact-phone-1")).queryByRole("img"),
    ).toBeNull();

    contactSectionData.socials.forEach((social) => {
      const link = screen.getByTestId(social.testId);

      expect(link.getAttribute("href")).toBe(t(social.hrefKey));
      expect(link.getAttribute("aria-label")).toBe(t(social.labelKey));
      expect(
        within(link).getByRole("img", { name: t(social.iconAltKey) }),
      ).toBeDefined();
    });

    expect(screen.getByTestId("contact-footer")).toBeDefined();
    expect(screen.getByTestId("contact-site-link").getAttribute("href")).toBe(
      t(contactSectionData.siteHrefKey),
    );
    expect(
      screen.getByTestId("contact-privacy-link").getAttribute("href"),
    ).toBe(t(contactSectionData.footerPrivacyHrefKey));
  });

  it("opens the contact form modal after clicking the CTA button", () => {
    renderWithIntl(<ContactSection {...contactSectionData} />);

    const ctaButton = screen.getByTestId("contact-cta-button");

    expect(ctaButton.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(ctaButton);

    expect(screen.getByTestId("contact-form-modal")).toBeDefined();
    expect(ctaButton.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("heading", { name: t("contact_form_title") }),
    ).toBeDefined();
  });

  it("closes the contact form modal after clicking the overlay", () => {
    renderWithIntl(<ContactSection {...contactSectionData} />);

    const ctaButton = screen.getByTestId("contact-cta-button");

    fireEvent.click(ctaButton);

    expect(screen.getByTestId("contact-form-modal")).toBeDefined();
    expect(ctaButton.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(screen.getByTestId("contact-form-modal-overlay"));

    expect(screen.queryByTestId("contact-form-modal")).toBeNull();
    expect(ctaButton.getAttribute("aria-expanded")).toBe("false");
  });

  it("renders every social link from data without hardcoded assumptions", () => {
    renderWithIntl(<ContactSection {...contactSectionData} />);

    const socialLinks = contactSectionData.socials.map((social) =>
      screen.getByTestId(social.testId),
    );

    expect(socialLinks).toHaveLength(contactSectionData.socials.length);
  });
});
