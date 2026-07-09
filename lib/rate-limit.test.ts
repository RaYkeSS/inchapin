import { describe, expect, it } from "vitest";

import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows up to max requests then blocks within the window", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(false);
  });

  it("resets after the window elapses", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 1, -1)).toBe(true);
    expect(rateLimit(key, 1, -1)).toBe(true);
  });
});
