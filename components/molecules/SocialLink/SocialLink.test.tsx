import { screen } from "@testing-library/react";
import { SocialLink } from "./SocialLink";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("SocialLink", () => {
  it("renders a social link with translated aria-label and icon alt", () => {
    renderWithIntl(
      <SocialLink
        href={t("contact_section_social_facebook_href")}
        iconAlt={t("contact_section_social_facebook_icon_alt")}
        iconSrc="/facebook.svg"
        label={t("contact_section_social_facebook_aria")}
        testId="contact-social-link"
      />,
    );

    const link = screen.getByTestId("contact-social-link");

    expect(link.getAttribute("href")).toBe(
      t("contact_section_social_facebook_href"),
    );
    expect(link.getAttribute("aria-label")).toBe(
      t("contact_section_social_facebook_aria"),
    );
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noreferrer");
    expect(screen.getByAltText(t("contact_section_social_facebook_icon_alt"))).toBeDefined();
  });
});
