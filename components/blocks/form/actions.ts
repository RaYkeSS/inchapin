"use server";

import { headers } from "next/headers";

import { env } from "~/config/env";

import { rateLimit } from "~/lib/rate-limit";

import { type SubmitResult, leadFormSchema } from "./schema";

const GENERIC_ERROR = "Не удалось отправить заявку. Попробуйте позже.";

export async function submitLead(input: unknown): Promise<SubmitResult> {
  const parsed = leadFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Некорректные данные",
    };
  }

  const { company, ...lead } = parsed.data;
  if (company) {
    return { ok: true };
  }

  const requestHeaders = await headers();
  const ip = (requestHeaders.get("x-forwarded-for") ?? "unknown")
    .split(",")[0]
    .trim();
  if (!rateLimit(`lead:${ip}`)) {
    return { ok: false, error: "Слишком много запросов. Попробуйте позже." };
  }

  const webhook = env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        console.error("submitFormm: webhook responded with non-2xx", {
          status: res.status,
        });
        return { ok: false, error: GENERIC_ERROR };
      }
    } catch (err) {
      console.error(
        "submitForm: webhook request failed",
        err instanceof Error ? err.message : err,
      );
      return { ok: false, error: GENERIC_ERROR };
    }
  }

  return { ok: true };
}
