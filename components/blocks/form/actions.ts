"use server";

import { env } from "~/config/env";

import { type SubmitResult, formSchema } from "./schema";

export async function submitLead(input: unknown): Promise<SubmitResult> {
  const parsed = formSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Некорректные данные",
    };
  }

  const webhook = env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        return {
          ok: false,
          error: "Не удалось отправить заявку. Попробуйте позже.",
        };
      }
    } catch {
      return {
        ok: false,
        error: "Не удалось отправить заявку. Попробуйте позже.",
      };
    }
  }

  return { ok: true };
}
