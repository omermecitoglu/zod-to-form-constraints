import { deconstructureZodType } from "./deconstructureZodType";
import type { ComponentProps } from "react";
import type { $ZodType } from "zod/v4/core";

export function determineMax(schema: $ZodType): ComponentProps<"input">["max"] {
  const { type: inputType, max } = deconstructureZodType(schema);
  if (inputType !== "string") {
    return max;
  }
}
