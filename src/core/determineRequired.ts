import { deconstructureZodType } from "./deconstructureZodType";
import type { ComponentProps } from "react";
import type { $ZodType } from "zod/v4/core";

export function determineRequired(schema: $ZodType): ComponentProps<"input">["required"] {
  const { type: schemaType, min, isOptional } = deconstructureZodType(schema);
  if (schemaType === "string") {
    if (typeof min !== "undefined") {
      return min > 0;
    }
    return false;
  }
  return !isOptional;
}
