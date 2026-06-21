import { deconstructureZodType } from "./deconstructureZodType";
import type { ComponentProps } from "react";
import type { $ZodType } from "zod/v4/core";

export function determineMaxLength(schema: $ZodType): ComponentProps<"input">["maxLength"] {
  const { type: inputType, max } = deconstructureZodType(schema);
  if (inputType === "string") {
    return max;
  }
}
