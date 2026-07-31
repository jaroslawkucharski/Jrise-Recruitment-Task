"use client";

import Image from "next/image";
import type { Ref } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { RevealText } from "@/components/atoms/RevealText/RevealText";

type ConsentCheckboxProps = {
  checkboxAlt: string;
  checked: boolean;
  error?: string;
  id: string;
  inputRef?: Ref<HTMLInputElement>;
  label: React.ReactNode;
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  testId: string;
};

export function ConsentCheckbox({
  checkboxAlt,
  checked,
  error,
  id,
  inputRef,
  label,
  name,
  onBlur,
  onChange,
  testId,
}: ConsentCheckboxProps) {
  return (
    <div className="flex flex-col gap-2" data-testid={testId}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 text-left"
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            ref={inputRef}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer sr-only"
            data-testid={`${testId}-control`}
          />

          <span className="absolute inset-0 rounded-[5px] border border-neutral-700 bg-black transition-colors peer-checked:border-brand-green peer-focus-visible:ring-2 peer-focus-visible:ring-brand-green peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-hover" />

          {checked ? (
            <Image
              src="/checkbox.svg"
              alt={checkboxAlt}
              width={20}
              height={20}
              className="relative z-10"
            />
          ) : null}
        </span>

        <Text size={14} className="text-neutral-300">
          {label}
        </Text>
      </label>

      {error ? (
        <Text
          id={`${id}-error`}
          size={14}
          className="text-red-400"
          data-testid={`${testId}-error`}
        >
          <RevealText>{error}</RevealText>
        </Text>
      ) : null}
    </div>
  );
}
