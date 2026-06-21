import { describe, expect, it } from "vitest";
import z from "zod";
import { getFieldConstraints } from "./getFieldConstraints";

describe("getFieldConstraints", () => {
  it("returns native input constraints for a string schema", () => {
    expect(getFieldConstraints(z.string().min(3).max(10))).toEqual({
      type: "text",
      minLength: 3,
      maxLength: 10,
      required: true,
    });
  });

  it("returns a number schema configuration with numeric bounds", () => {
    expect(getFieldConstraints(z.number().min(0).max(100))).toEqual({
      type: "number",
      min: 0,
      max: 100,
      required: true,
    });
  });
});
