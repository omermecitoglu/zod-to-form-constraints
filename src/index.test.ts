import { describe, expect, it } from "vitest";
import { getFieldConstraints } from "./index";

describe("getFieldConstraints", () => {
  it("should be a function", () => {
    expect(typeof getFieldConstraints).toBe("function");
  });
});
