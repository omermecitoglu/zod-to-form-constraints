import { describe, expect, it } from "vitest";
import z from "zod";
import { determineMinLength } from "./determineMinLength";

describe("determineMinLength", () => {
  it("returns undefined when the schema has no minimum length constraint", () => {
    expect(determineMinLength(z.string())).toBeUndefined();
  });

  it("returns the minimum length from a string schema", () => {
    expect(determineMinLength(z.string().min(3))).toBe(3);
  });

  it("preserves the minimum length for optional schemas", () => {
    expect(determineMinLength(z.string().min(5).optional())).toBe(5);
  });
});
