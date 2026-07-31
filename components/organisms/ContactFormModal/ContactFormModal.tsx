"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/atoms/Button/Button";
import { Heading } from "@/components/atoms/Heading/Heading";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { ConsentCheckbox } from "@/components/molecules/ConsentCheckbox/ConsentCheckbox";
import { ContactFormField } from "@/components/molecules/ContactFormField/ContactFormField";
import { useAppTranslations } from "@/i18n/translations";

type ContactFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function createContactFormSchema(t: ReturnType<typeof useAppTranslations>) {
  return z.object({
    consent: z.boolean().refine((value) => value, {
      message: t("contact_form_consent_error"),
    }),
    email: z
      .email(t("contact_form_email_error_invalid"))
      .min(1, t("contact_form_email_error_required")),
    message: z
      .string()
      .min(1, t("contact_form_message_error_required"))
      .min(10, t("contact_form_message_error_too_short")),
    name: z
      .string()
      .min(1, t("contact_form_name_error_required"))
      .min(2, t("contact_form_name_error_too_short")),
    subject: z
      .string()
      .min(1, t("contact_form_subject_error_required"))
      .min(3, t("contact_form_subject_error_too_short")),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const t = useAppTranslations();
  const schema = createContactFormSchema(t);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setFocus,
  } = useForm<ContactFormValues>({
    defaultValues: {
      consent: false,
      email: "",
      message: "",
      name: "",
      subject: "",
    },
    resolver: zodResolver(schema),
  });
  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setFocus("name");

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        reset();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, reset, setFocus]);

  const onSubmit = () => {
    window.alert(t("contact_form_submit_success"));
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-[3px]"
      onClick={handleClose}
      data-testid="contact-form-modal-overlay"
    >
      <div className="absolute inset-0 bg-brand-green/5" aria-hidden="true" />

      <div
        id="contact-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        aria-describedby="contact-form-description"
        className="relative isolate z-10 max-h-[calc(100vh-3rem)] w-full max-w-170 overflow-y-auto border border-[rgba(98,104,104,0.38)] bg-neutral-hover px-5 py-5 shadow-[0_0_40px_rgba(0,255,0,0.08),0_24px_80px_rgba(0,0,0,0.6)] [scrollbar-color:var(--color-neutral-700)_var(--color-neutral-hover)] [scrollbar-width:thin] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(90deg,transparent_0%,transparent_62%,rgba(0,255,0,0.88)_90%,rgba(0,255,0,0.22)_100%),linear-gradient(180deg,rgba(0,255,0,0.72)_0%,rgba(0,255,0,0)_28%),linear-gradient(90deg,rgba(0,255,0,0.78)_0%,rgba(0,255,0,0)_30%),linear-gradient(180deg,rgba(0,255,0,0)_72%,rgba(0,255,0,0.72)_100%)] before:bg-size-[100%_1px,1px_100%,100%_1px,1px_100%] before:bg-position-[top,right,bottom,left] before:bg-no-repeat [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-neutral-hover [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-neutral-hover [&::-webkit-scrollbar]:w-2 sm:px-10 sm:py-10"
        data-testid="contact-form-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-9 flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Heading
              id="contact-form-title"
              level="h2"
              weight={400}
              className="sm:text-[40px]!"
            >
              <RevealText>{t("contact_form_title")}</RevealText>
            </Heading>
          </div>

          <Button
            aria-label={t("contact_form_close_aria")}
            className="h-12! w-12! hover:[&_path]:fill-neutral-hover"
            isSquare
            onClick={handleClose}
            data-testid="contact-form-close-button"
          >
            <Image
              src="/close.svg"
              alt={t("contact_form_close_icon_alt")}
              width={24}
              height={24}
            />
          </Button>
        </div>

        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="contact-form"
        >
          <ContactFormField
            id="contact-form-name"
            isRequired
            label={t("contact_form_name_label")}
            placeholder={t("contact_form_name_placeholder")}
            registration={register("name")}
            testId="contact-form-name"
            error={errors.name?.message}
          />

          <ContactFormField
            id="contact-form-email"
            isRequired
            label={t("contact_form_email_label")}
            placeholder={t("contact_form_email_placeholder")}
            registration={register("email")}
            testId="contact-form-email"
            type="email"
            error={errors.email?.message}
          />

          <ContactFormField
            id="contact-form-subject"
            isRequired
            label={t("contact_form_subject_label")}
            placeholder={t("contact_form_subject_placeholder")}
            registration={register("subject")}
            testId="contact-form-subject"
            error={errors.subject?.message}
          />

          <ContactFormField
            as="textarea"
            id="contact-form-message"
            isRequired
            label={t("contact_form_message_label")}
            placeholder={t("contact_form_message_placeholder")}
            registration={register("message")}
            testId="contact-form-message"
            error={errors.message?.message}
          />

          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <ConsentCheckbox
                checkboxAlt={t("contact_form_checkbox_icon_alt")}
                id="contact-form-consent"
                checked={Boolean(field.value)}
                error={errors.consent?.message}
                inputRef={field.ref}
                label={t.rich("contact_form_consent_label", {
                  privacy: (chunks) => (
                    <a
                      href={t("contact_section_footer_privacy_href")}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-neutral-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {chunks}
                    </a>
                  ),
                })}
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                testId="contact-form-consent"
              />
            )}
          />

          <Button
            type="submit"
            className="mt-3 w-full"
            data-testid="contact-form-submit-button"
          >
            <RevealText>{t("contact_form_submit_label")}</RevealText>
          </Button>
        </form>
      </div>
    </div>
  );
}
