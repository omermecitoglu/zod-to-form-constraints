import type { ComponentProps } from "react";
import type { $ZodEmailDef, $ZodStringDef, $ZodType, $ZodURLDef } from "zod/v4/core";

export function determineInputType(schema: $ZodType): ComponentProps<"input">["type"] {
  switch (schema._zod.def.type) {
    case "string": {
      const { format } = schema._zod.def as $ZodEmailDef | $ZodURLDef | ($ZodStringDef & { format?: string });
      if (format === "email") return "email";
      if (format === "url") return "url";
      return "text";
    }
    case "number":
      return "number";
    default:
      return undefined;
  }
}
