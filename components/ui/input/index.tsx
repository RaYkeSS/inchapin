"use client";

import {
  type ChangeEvent,
  ComponentPropsWithoutRef,
  useId,
  useState,
} from "react";

import { IMaskInput } from "react-imask";

import { cn } from "~/lib/utils";

import styles from "./input.module.scss";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "placeholder"> & {
  label: string;
  mask?: "phone";
  error?: string;
  className?: string;
  containerClassName?: string;
};

type PhoneChangeEvent = { target: { value: string; name?: string } };

interface PhoneInputProps {
  id?: string;
  value?: string;
  name?: string;
  lazy?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: PhoneChangeEvent) => void;
}

const PhoneInput = ({
  id,
  value,
  name,
  lazy,
  className,
  onFocus,
  onBlur,
  onChange,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: PhoneInputProps) => {
  return (
    <IMaskInput
      id={id}
      mask="+{7} (000) 000-00-00"
      lazy={lazy}
      placeholderChar="_"
      placeholder=""
      value={value ?? ""}
      unmask={false}
      name={name}
      className={className}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      onFocus={onFocus}
      onBlur={onBlur}
      onAccept={(v: string) => {
        onChange?.({ target: { value: v, name } });
      }}
    />
  );
};

const Input = ({
  label,
  id,
  className,
  containerClassName,
  mask,
  error,
  value,
  name,
  onFocus,
  onBlur,
  onChange,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const control =
    mask === "phone" ? (
      <PhoneInput
        id={inputId}
        className={cn(styles.input, error && styles.inputError, className)}
        value={String(value ?? "")}
        name={name}
        lazy={!isFocused}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          const event = {
            target: { value: e.target.value, name },
          } as ChangeEvent<HTMLInputElement>;
          onChange?.(event);
        }}
      />
    ) : (
      <input
        id={inputId}
        name={name}
        value={value}
        className={cn(styles.input, error && styles.inputError, className)}
        placeholder=""
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...props}
      />
    );

  return (
    <div
      className={cn(styles.field, error && styles.fieldError, containerClassName)}
    >
      {control}
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};

export { Input };
