import { deconstructureZodType } from "./deconstructureZodType";
import type { $ZodType } from "zod/v4/core";

export function getErrorMessagePayload(schema: $ZodType, key: keyof ValidityState): string | number | null {
  const { min, max } = deconstructureZodType(schema);
  switch (key) {
    case "tooLong":
    case "rangeOverflow":
      return max ?? null;
    case "tooShort":
    case "rangeUnderflow":
      return min ?? null;
    // case "badInput":
    // case "customError":
    // case "patternMismatch":
    // case "stepMismatch":
    // case "typeMismatch":
    // case "valueMissing":
    default:
      return null;
  }
}
