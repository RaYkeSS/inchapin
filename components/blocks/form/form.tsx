"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

import { UI } from "~/data/ui";

import { submitLead } from "./actions";
import styles from "./form.module.scss";
import {
  FORM_DEFAULTS,
  HONEYPOT_FIELD,
  type LeadFormData,
  type SubmitResult,
  leadFormSchema,
} from "./schema";

const Form = () => {
  const [result, setResult] = useState<SubmitResult | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: FORM_DEFAULTS,
  });

  const onSubmit = async (data: LeadFormData) => {
    const res = await submitLead(data);
    setResult(res);
    if (res.ok) reset();
  };

  if (result?.ok) {
    return (
      <p className={styles.success} role="status">
        {UI.form.success}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
        {...register(HONEYPOT_FIELD)}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={UI.form.fields.name.label}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={UI.form.fields.phone.label}
            mask="phone"
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={UI.form.fields.email.label}
            error={errors.email?.message}
          />
        )}
      />

      <Text as="span" size="note" className={styles.acceptance}>
        {UI.form.acceptance.prefix}{" "}
        <a href={UI.form.acceptance.href}>{UI.form.acceptance.linkLabel}</a>
      </Text>

      {result && !result.ok && (
        <span className={styles.error} role="alert">
          {result.error}
        </span>
      )}

      <Button
        className={styles.btn}
        type="submit"
        variant="primary"
        size="xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? UI.form.submitting : UI.form.submit}
      </Button>
    </form>
  );
};

export default Form;
