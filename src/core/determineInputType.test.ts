import { describe, expect, it } from "vitest";
import z from "zod";
import { determineInputType } from "./determineInputType";

describe("determineInputType", () => {
  it("should return the correct input type for each schema", () => {
    expect(determineInputType(z.string())).toBe("text");
    expect(determineInputType(z.email())).toBe("email");
    expect(determineInputType(z.url())).toBe("url");
    expect(determineInputType(z.number())).toBe("number");
  });
});
