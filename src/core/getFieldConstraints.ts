import { type ComponentProps } from "react";
import { determineInputType } from "./determineInputType";
import { determineMax } from "./determineMax";
import { determineMaxLength } from "./determineMaxLength";
import { determineMin } from "./determineMin";
import { determineMinLength } from "./determineMinLength";
import { determineRequired } from "./determineRequired";
import type { $ZodType } from "zod/v4/core";

export function getFieldConstraints(schema: $ZodType): ComponentProps<"input"> {
  return {
    type: determineInputType(schema),
    required: determineRequired(schema),
    minLength: determineMinLength(schema),
    maxLength: determineMaxLength(schema),
    min: determineMin(schema),
    max: determineMax(schema),
  };
}
