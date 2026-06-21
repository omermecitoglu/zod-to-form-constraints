import { describe, expect, it } from "vitest";
import z from "zod";
import { determineRequired } from "./determineRequired";

describe("determineRequired", () => {
  it("should determine if a string is really required", () => {
    expect(determineRequired(z.string())).toBe(false);
    expect(determineRequired(z.string().min(1))).toBe(true);
    expect(determineRequired(z.string().min(5))).toBe(true);
    expect(determineRequired(z.string().min(0))).toBe(false);
  });

  it("should determine if a number is required", () => {
    expect(determineRequired(z.number())).toBe(true);
    expect(determineRequired(z.number().optional())).toBe(false);
  });
});
