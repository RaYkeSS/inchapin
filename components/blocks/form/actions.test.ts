import { afterEach, describe, expect, it, vi } from "vitest";

const { nextIp } = vi.hoisted(() => {
  let n = 0;
  return { nextIp: () => `10.20.${Math.floor(n / 250)}.${n++ % 250}` };
});

vi.mock("next/headers", () => ({
  headers: async () => ({ get: () => nextIp() }),
}));

vi.mock("~/config/env", () => ({
  env: { LEADS_WEBHOOK_URL: "https://hook.test/lead" },
}));

import { submitLead } from "./actions";

const valid = { name: "Иван", phone: "+7 (912) 345-67-89", email: "a@b.ru" };

afterEach(() => vi.restoreAllMocks());

describe("submitLead", () => {
  it("rejects invalid input without calling the webhook", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await submitLead({ name: "", phone: "", email: "" });
    expect(res.ok).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("forwards only name/phone/email (honeypot & unknown keys stripped)", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));
    const res = await submitLead({ ...valid, role: "admin" });
    expect(res.ok).toBe(true);
    const body = JSON.parse(
      (fetchSpy.mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body).toEqual(valid);
  });

  it("returns ok:false on a non-2xx webhook response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 }),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await submitLead(valid)).ok).toBe(false);
  });

  it("returns ok:false when the webhook request throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNRESET"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await submitLead(valid)).ok).toBe(false);
  });

  it("silently drops (ok:true, no webhook call) when the honeypot is filled", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await submitLead({ ...valid, company: "bot" });
    expect(res.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("does not log PII on failure", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("boom"));
    await submitLead(valid);
    const logged = JSON.stringify(errSpy.mock.calls);
    expect(logged).not.toMatch(/912|a@b\.ru|Иван/);
  });
});
