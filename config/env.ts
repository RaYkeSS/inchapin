import { z } from "zod";

const envSchema = z.object({
  SITE_URL: z.url(),
  SITE_NAME: z.string().min(1),
  LEADS_WEBHOOK_URL: z.url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error(
    "Invalid environment variables — errors above. Copy .env.example to .env.local.",
  );
}

export const env = parsed.data;
