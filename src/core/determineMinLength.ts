import { deconstructureZodType } from "./deconstructureZodType";
import type { ComponentProps } from "react";
import type { $ZodType } from "zod/v4/core";

export function determineMinLength(schema: $ZodType): ComponentProps<"input">["minLength"] {
  const { type: inputType, min } = deconstructureZodType(schema);
  if (inputType === "string") {
    return min;
  }
  return undefined;
}
