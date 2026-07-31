import { fireEvent, screen, waitFor } from "@testing-library/react";
import { ContactFormModal } from "./ContactFormModal";
import { renderWithIntl, t } from "@/utils/renderWithIntl";

describe("ContactFormModal", () => {
  it("does not render when closed", () => {
    renderWithIntl(<ContactFormModal isOpen={false} onClose={() => {}} />);

    expect(screen.queryByTestId("contact-form-modal")).toBeNull();
  });

  it("renders translated content when opened", () => {
    renderWithIntl(<ContactFormModal isOpen onClose={() => {}} />);

    expect(screen.getByTestId("contact-form-modal")).toBeDefined();
    expect(
      screen.getByRole("heading", { name: t("contact_form_title") }),
    ).toBeDefined();
  });

  it("shows translated validation errors on empty submit", async () => {
    renderWithIntl(<ContactFormModal isOpen onClose={() => {}} />);

    fireEvent.submit(screen.getByTestId("contact-form"));

    await waitFor(() => {
      expect(
        screen.getByText(t("contact_form_name_error_required")),
      ).toBeDefined();
      expect(
        screen.getByText(t("contact_form_email_error_required")),
      ).toBeDefined();
      expect(
        screen.getByText(t("contact_form_subject_error_required")),
      ).toBeDefined();
      expect(
        screen.getByText(t("contact_form_message_error_required")),
      ).toBeDefined();
      expect(
        screen.getByTestId("contact-form-consent-error").textContent,
      ).toContain(t("contact_form_consent_error"));
    });
  });

  it("submits a valid form and closes the modal", async () => {
    const onClose = vi.fn();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderWithIntl(<ContactFormModal isOpen onClose={onClose} />);

    fireEvent.change(screen.getByTestId("contact-form-name-control"), {
      target: { value: "Grzegorz Brzęszczykiewicz" },
    });
    fireEvent.change(screen.getByTestId("contact-form-email-control"), {
      target: { value: "grzegorz@example.com" },
    });
    fireEvent.change(screen.getByTestId("contact-form-subject-control"), {
      target: { value: "Nowy projekt" },
    });
    fireEvent.change(screen.getByTestId("contact-form-message-control"), {
      target: { value: "To jest przykładowa wiadomość o nowym projekcie." },
    });
    fireEvent.click(screen.getByTestId("contact-form-consent-control"));
    fireEvent.submit(screen.getByTestId("contact-form"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(t("contact_form_submit_success"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    alertSpy.mockRestore();
  });

  it("closes after clicking the close button", () => {
    const onClose = vi.fn();

    renderWithIntl(<ContactFormModal isOpen onClose={onClose} />);

    fireEvent.click(screen.getByTestId("contact-form-close-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes after pressing Escape", () => {
    const onClose = vi.fn();

    renderWithIntl(<ContactFormModal isOpen onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
