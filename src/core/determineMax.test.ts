import { describe, expect, it } from "vitest";
import z from "zod";
import { determineMax } from "./determineMax";

describe("determineMax", () => {
  it("returns undefined when the schema has no maximum constraint", () => {
    expect(determineMax(z.string())).toBeUndefined();
  });

  it("returns the maximum value from a number schema", () => {
    expect(determineMax(z.number().max(10))).toBe(10);
  });

  it("preserves the maximum constraint for optional schemas", () => {
    expect(determineMax(z.number().max(20).optional())).toBe(20);
  });
});
