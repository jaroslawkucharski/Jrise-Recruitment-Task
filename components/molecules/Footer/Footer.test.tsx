import { screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("Footer", () => {
  it("renders translated footer copy and links", () => {
    renderWithIntl(
      <Footer
        copyright={t("contact_section_footer_copyright")}
        siteHref={t("contact_section_footer_site_href")}
        siteLabel={t("contact_section_footer_site")}
        rightsLabel={t("contact_section_footer_rights")}
        privacyHref={t("contact_section_footer_privacy_href")}
        privacyLabel={t("contact_section_footer_privacy")}
      />,
    );

    expect(screen.getByTestId("contact-footer")).toBeDefined();
    expect(screen.getByTestId("contact-footer").textContent).toContain(
      t("contact_section_footer_copyright"),
    );
    expect(screen.getByTestId("contact-footer").textContent).toContain(
      t("contact_section_footer_rights"),
    );
    expect(screen.getByTestId("contact-site-link").getAttribute("href")).toBe(
      t("contact_section_footer_site_href"),
    );
    expect(
      screen.getByTestId("contact-privacy-link").getAttribute("href"),
    ).toBe(t("contact_section_footer_privacy_href"));
  });
});
