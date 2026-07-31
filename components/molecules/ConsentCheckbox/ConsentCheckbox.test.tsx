import { fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

function ConsentCheckboxHarness({ error }: { error?: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <ConsentCheckbox
      checkboxAlt={t("contact_form_checkbox_icon_alt")}
      checked={checked}
      error={error}
      id="contact-form-consent"
      label={t.rich("contact_form_consent_label", {
        privacy: (chunks) => <>{chunks}</>,
      })}
      name="consent"
      onChange={(event) => setChecked(event.target.checked)}
      testId="contact-form-consent"
    />
  );
}

describe("ConsentCheckbox", () => {
  it("renders translated label and checkbox icon after checking", () => {
    renderWithIntl(<ConsentCheckboxHarness />);

    const checkbox = screen.getByTestId("contact-form-consent-control");

    expect(checkbox.getAttribute("type")).toBe("checkbox");

    fireEvent.click(checkbox);

    expect(
      screen.getByRole("img", {
        name: t("contact_form_checkbox_icon_alt"),
      }),
    ).toBeDefined();
  });

  it("renders translated error message when provided", () => {
    renderWithIntl(
      <ConsentCheckboxHarness error={t("contact_form_consent_error")} />,
    );

    expect(
      screen.getByTestId("contact-form-consent-error").textContent,
    ).toContain(t("contact_form_consent_error"));
  });
});
