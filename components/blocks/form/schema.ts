import { z } from "zod";

export const HONEYPOT_FIELD = "company";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Имя обязательно для заполнения")
    .max(100, "Слишком длинное имя"),
  phone: z
    .string()
    .min(1, "Телефон обязателен для заполнения")
    .regex(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Введите корректный номер телефона",
    ),
  email: z
    .string()
    .min(1, "E-mail обязателен для заполнения")
    .max(254, "Слишком длинный e-mail")
    .pipe(z.email("Введите корректный e-mail адрес")),
});

export const leadFormSchema = formSchema.extend({
  [HONEYPOT_FIELD]: z.string().optional(),
});

export type LeadData = z.infer<typeof formSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;

export type SubmitResult = { ok: true } | { ok: false; error: string };

export const FORM_DEFAULTS: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  [HONEYPOT_FIELD]: "",
};
