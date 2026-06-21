import { describe, expect, it } from "vitest";
import z from "zod";
import { determineMin } from "./determineMin";

describe("determineMin", () => {
  it("returns undefined when the schema has no minimum constraint", () => {
    expect(determineMin(z.string())).toBeUndefined();
  });

  it("returns the minimum value from a number schema", () => {
    expect(determineMin(z.number().min(1))).toBe(1);
  });

  it("preserves the minimum constraint for optional schemas", () => {
    expect(determineMin(z.number().min(2).optional())).toBe(2);
  });
});
