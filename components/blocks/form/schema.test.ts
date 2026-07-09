import { describe, expect, it } from "vitest";

import { formSchema, leadFormSchema } from "./schema";

const valid = { name: "Иван", phone: "+7 (912) 345-67-89", email: "a@b.ru" };

const firstMessage = (input: unknown) => {
  const r = formSchema.safeParse(input);
  return r.success ? null : r.error.issues[0]?.message;
};

describe("formSchema", () => {
  it("accepts a valid lead", () => {
    expect(formSchema.safeParse(valid).success).toBe(true);
  });

  it("reports required (not format) for an empty email", () => {
    expect(firstMessage({ ...valid, email: "" })).toBe(
      "E-mail обязателен для заполнения",
    );
  });

  it("reports format for a malformed email", () => {
    expect(firstMessage({ ...valid, email: "abc" })).toBe(
      "Введите корректный e-mail адрес",
    );
  });

  it("rejects an over-length name", () => {
    expect(formSchema.safeParse({ ...valid, name: "x".repeat(101) }).success).toBe(
      false,
    );
  });

  it.each([
    ["+7 912 345 67 89"],
    ["8 (912) 345-67-89"],
    ["+7 (912) 345-67-8"],
  ])("rejects malformed phone %s", (phone) => {
    expect(formSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it("strips unknown keys", () => {
    const r = formSchema.safeParse({ ...valid, role: "admin" });
    expect(r.success && Object.keys(r.data).sort()).toEqual([
      "email",
      "name",
      "phone",
    ]);
  });
});

describe("leadFormSchema honeypot", () => {
  it("accepts the honeypot field (bot detection happens in the action)", () => {
    expect(leadFormSchema.safeParse({ ...valid, company: "" }).success).toBe(true);
    expect(leadFormSchema.safeParse({ ...valid, company: "bot" }).success).toBe(
      true,
    );
  });
});
