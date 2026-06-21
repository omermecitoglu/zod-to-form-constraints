import { describe, expect, it } from "vitest";
import z from "zod";
import { determineMaxLength } from "./determineMaxLength";

describe("determineMaxLength", () => {
  it("returns undefined when the schema has no maximum length constraint", () => {
    expect(determineMaxLength(z.string())).toBeUndefined();
  });

  it("returns the maximum length from a string schema", () => {
    expect(determineMaxLength(z.string().max(12))).toBe(12);
  });

  it("preserves the maximum length for optional schemas", () => {
    expect(determineMaxLength(z.string().max(20).optional())).toBe(20);
  });
});
