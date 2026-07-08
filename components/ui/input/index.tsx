"use client";

import { type ChangeEvent, ComponentPropsWithoutRef, useState } from "react";

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
  value?: string;
  name?: string;
  lazy?: boolean;
  className?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: PhoneChangeEvent) => void;
}

const PhoneInput = ({
  value,
  name,
  lazy,
  className,
  onFocus,
  onBlur,
  onChange,
}: PhoneInputProps) => {
  return (
    <IMaskInput
      mask="+{7} (000) 000-00-00"
      lazy={lazy}
      placeholderChar="_"
      placeholder=""
      value={value ?? ""}
      unmask={false}
      name={name}
      className={className}
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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  if (mask === "phone") {
    return (
      <div
        className={cn(
          styles.field,
          error && styles.fieldError,
          containerClassName,
        )}
      >
        <PhoneInput
          className={cn(styles.input, error && styles.inputError, className)}
          value={String(value ?? "")}
          name={name}
          lazy={!isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            const event = {
              target: { value: e.target.value, name },
            } as ChangeEvent<HTMLInputElement>;
            onChange?.(event);
          }}
        />
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.field,
        error && styles.fieldError,
        containerClassName,
      )}
    >
      <input
        id={id}
        name={name}
        value={value}
        className={cn(styles.input, error && styles.inputError, className)}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export { Input };
