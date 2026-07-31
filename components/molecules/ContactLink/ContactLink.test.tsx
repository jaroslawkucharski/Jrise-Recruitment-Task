import { screen } from "@testing-library/react";
import { ContactLink } from "./ContactLink";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("ContactLink", () => {
  it("renders a contact link with translated label and icon alt", () => {
    renderWithIntl(
      <ContactLink
        href={t("contact_section_phone_1_href")}
        iconAlt={t("contact_section_phone_icon_alt")}
        iconSrc="/contact.svg"
        label={t("contact_section_phone_1")}
        testId="contact-link"
      />,
    );

    const link = screen.getByTestId("contact-link");

    expect(link.getAttribute("href")).toBe(t("contact_section_phone_1_href"));
    expect(link.textContent).toBe(t("contact_section_phone_1"));
    expect(screen.getByAltText(t("contact_section_phone_icon_alt"))).toBeDefined();
  });

  it("does not render an image when iconSrc is missing", () => {
    renderWithIntl(
      <ContactLink
        href={t("contact_section_phone_2_href")}
        label={t("contact_section_phone_2")}
        testId="contact-link-no-icon"
      />,
    );

    expect(screen.getByTestId("contact-link-no-icon").textContent).toBe(
      t("contact_section_phone_2"),
    );
    expect(screen.queryByRole("img")).toBeNull();
  });
});
