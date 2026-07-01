import { describe, expect, it } from "vitest";
import { getErrorMessagePayload, getFieldConstraints } from "./index";

describe("getFieldConstraints", () => {
  it("should be a function", () => {
    expect(typeof getFieldConstraints).toBe("function");
  });
});

describe("getErrorMessagePayload", () => {
  it("should be a function", () => {
    expect(typeof getErrorMessagePayload).toBe("function");
  });
});
