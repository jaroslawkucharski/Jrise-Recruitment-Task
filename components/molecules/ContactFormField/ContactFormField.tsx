"use client";

import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Text } from "@/components/atoms/Text/Text";
import { RevealText } from "@/components/atoms/RevealText/RevealText";

type ContactFormFieldProps = {
  error?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  testId: string;
  type?: "email" | "text";
  as?: "input" | "textarea";
};

export function ContactFormField({
  as = "input",
  error,
  id,
  isRequired = false,
  label,
  placeholder,
  registration,
  testId,
  type = "text",
}: ContactFormFieldProps) {
  const sharedClassName = clsx(
    "w-full border border-neutral-700 bg-black px-4 py-3.75 text-neutral-0 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-0 focus-visible:border-neutral-0",
    as === "textarea" ? "min-h-50 resize-none py-4" : "h-[52px]",
    error && "border-error-400",
  );

  return (
    <div className="flex flex-col gap-2" data-testid={testId}>
      <label htmlFor={id}>
        <Text size={14}>
          <RevealText>{label}</RevealText>
          {isRequired ? <span className="text-error-400">*</span> : null}
        </Text>
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          {...registration}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={sharedClassName}
          data-testid={`${testId}-control`}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...registration}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={sharedClassName}
          data-testid={`${testId}-control`}
        />
      )}

      {error ? (
        <Text
          id={`${id}-error`}
          size={14}
          className="text-error-400"
          data-testid={`${testId}-error`}
        >
          <RevealText>{error}</RevealText>
        </Text>
      ) : null}
    </div>
  );
}
