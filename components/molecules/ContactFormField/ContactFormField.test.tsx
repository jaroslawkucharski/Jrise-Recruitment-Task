import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { ContactFormField } from "./ContactFormField";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

function ContactFormFieldHarness({
  error,
  isTextarea = false,
}: {
  error?: string;
  isTextarea?: boolean;
}) {
  const { register } = useForm({
    defaultValues: {
      field: "",
    },
  });

  return (
    <ContactFormField
      as={isTextarea ? "textarea" : "input"}
      id="contact-form-field"
      isRequired
      label={t("contact_form_name_label")}
      placeholder={t("contact_form_name_placeholder")}
      registration={register("field")}
      testId="contact-form-field"
      error={error}
    />
  );
}

describe("ContactFormField", () => {
  it("renders a translated label and input control", () => {
    renderWithIntl(<ContactFormFieldHarness />);

    expect(screen.getByText(t("contact_form_name_label"))).toBeDefined();
    expect(
      screen.getByPlaceholderText(t("contact_form_name_placeholder")),
    ).toBeDefined();
    expect(
      screen.getByTestId("contact-form-field-control").tagName,
    ).toBe("INPUT");
  });

  it("renders textarea and translated error message when provided", () => {
    renderWithIntl(
      <ContactFormFieldHarness
        isTextarea
        error={t("contact_form_message_error_required")}
      />,
    );

    expect(
      screen.getByTestId("contact-form-field-control").tagName,
    ).toBe("TEXTAREA");
    expect(
      screen.getByTestId("contact-form-field-error").textContent,
    ).toContain(t("contact_form_message_error_required"));
  });
});
