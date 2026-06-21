import { describe, expect, it } from "vitest";
import z from "zod";
import { deconstructureZodType } from "./deconstructureZodType";

describe("deconstructureZodType", () => {
  it("should return the correct type", () => {
    expect(deconstructureZodType(z.string())).toEqual({
      type: "string",
      isOptional: false,
      isNullable: false,
    });
    expect(deconstructureZodType(z.number())).toEqual({
      type: "number",
      isOptional: false,
      isNullable: false,
    });
    expect(deconstructureZodType(z.boolean())).toEqual({
      type: "boolean",
      isOptional: false,
      isNullable: false,
    });
    expect(deconstructureZodType(z.object({}))).toEqual({
      type: "unknown",
      isOptional: false,
      isNullable: false,
    });
  });

  it("should return the correct isOptional value", () => {
    expect(deconstructureZodType(z.string().optional())).toEqual({
      type: "string",
      isOptional: true,
      isNullable: false,
    });
  });

  it("should return the correct isNullable value", () => {
    expect(deconstructureZodType(z.string().nullable())).toEqual({
      type: "string",
      isOptional: false,
      isNullable: true,
    });
  });

  it("should find the minimum and maximum length constraints", () => {
    expect(deconstructureZodType(z.string().min(3))).toEqual({
      type: "string",
      isOptional: false,
      isNullable: false,
      min: 3,
    });
    expect(deconstructureZodType(z.string().max(36))).toEqual({
      type: "string",
      isOptional: false,
      isNullable: false,
      max: 36,
    });
    expect(deconstructureZodType(z.number().min(3))).toEqual({
      type: "number",
      isOptional: false,
      isNullable: false,
      min: 3,
    });
    expect(deconstructureZodType(z.number().max(2147483647))).toEqual({
      type: "number",
      isOptional: false,
      isNullable: false,
      max: 2147483647,
    });
  });
});
