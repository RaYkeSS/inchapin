import { describe, expect, it } from "vitest";

import { getApartment } from "./apartments";

describe("getApartment", () => {
  it("returns a real apartment by slug", () => {
    expect(getApartment("first")?.title).toBe("Квартира 1");
  });

  it.each(["__proto__", "constructor", "toString", "unknown"])(
    "returns undefined for non-apartment slug %s",
    (slug) => {
      expect(getApartment(slug)).toBeUndefined();
    },
  );
});
