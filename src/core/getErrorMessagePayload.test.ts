import { describe, expect, it } from "vitest";
import z from "zod";
import { getErrorMessagePayload } from "./getErrorMessagePayload";

describe("getErrorMessagePayload", () => {
  it("returns the max length for 'tooLong'", () => {
    expect(getErrorMessagePayload(z.string().max(256), "tooLong")).toBe(256);
  });

  it("returns the min length for 'tooShort'", () => {
    expect(getErrorMessagePayload(z.string().min(8), "tooShort")).toBe(8);
  });

  it("returns null for 'tooLong' when schema has no max", () => {
    expect(getErrorMessagePayload(z.string(), "tooLong")).toBeNull();
  });

  it("returns null for 'tooShort' when schema has no min", () => {
    expect(getErrorMessagePayload(z.string(), "tooShort")).toBeNull();
  });

  it("returns the max value for 'rangeOverflow'", () => {
    expect(getErrorMessagePayload(z.number().max(100), "rangeOverflow")).toBe(100);
  });

  it("returns the min value for 'rangeUnderflow'", () => {
    expect(getErrorMessagePayload(z.number().min(1), "rangeUnderflow")).toBe(1);
  });

  it("returns null for 'rangeOverflow' when schema has no max", () => {
    expect(getErrorMessagePayload(z.number(), "rangeOverflow")).toBeNull();
  });

  it("returns null for 'patternMismatch'", () => {
    expect(getErrorMessagePayload(z.string(), "patternMismatch")).toBeNull();
  });

  it("returns null for 'valueMissing' (no payload needed)", () => {
    expect(getErrorMessagePayload(z.string(), "valueMissing")).toBeNull();
  });

  it("returns null for keys with no matching Zod check (e.g. 'badInput')", () => {
    expect(getErrorMessagePayload(z.string(), "badInput")).toBeNull();
  });

  it("returns null for 'valid'", () => {
    expect(getErrorMessagePayload(z.string(), "valid")).toBeNull();
  });

  it("picks the correct value when schema has both min and max", () => {
    const schema = z.string().min(4).max(256);
    expect(getErrorMessagePayload(schema, "tooShort")).toBe(4);
    expect(getErrorMessagePayload(schema, "tooLong")).toBe(256);
  });
});
