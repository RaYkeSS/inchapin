import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Имя обязательно для заполнения"),
  phone: z
    .string()
    .min(1, "Телефон обязателен для заполнения")
    .regex(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Введите корректный номер телефона",
    ),
  email: z
    .email("Введите корректный e-mail адрес")
    .min(1, "E-mail обязателен для заполнения"),
});

export type LeadData = z.infer<typeof formSchema>;

export type SubmitResult = { ok: true } | { ok: false; error: string };

export const FORM_DEFAULTS: LeadData = { name: "", phone: "", email: "" };
